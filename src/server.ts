import { routeAgentRequest, type Schedule } from "agents";

import { getSchedulePrompt } from "agents/schedule";

import { AIChatAgent } from "agents/ai-chat-agent";
import {
  generateId,
  streamText,
  type StreamTextOnFinishCallback,
  stepCountIs,
  createUIMessageStream,
  convertToModelMessages,
  createUIMessageStreamResponse,
  type ToolSet
} from "ai";
import { createWorkersAI } from "workers-ai-provider";
import { processToolCalls, cleanupMessages } from "./utils";
import { tools, executions } from "./tools";

/**
 * Chat Agent implementation that handles real-time AI chat interactions
 */
export class Chat extends AIChatAgent<Env> {
  /**
   * Handles incoming chat messages and manages the response stream
   */
  async onChatMessage(
    onFinish: StreamTextOnFinishCallback<ToolSet>,
    _options?: { abortSignal?: AbortSignal }
  ) {
    // Initialize Workers AI with the binding from env
    const workersai = createWorkersAI({ binding: this.env.AI });
    // Using Llama 3.1 70B which has better streaming compatibility
    const model = workersai("@cf/meta/llama-3.1-70b-instruct" as any);

    // Use our space exploration tools
    const allTools = tools;

    const stream = createUIMessageStream({
      execute: async ({ writer }) => {
        // Clean up incomplete tool calls to prevent API errors
        const cleanedMessages = cleanupMessages(this.messages);

        // Process any pending tool calls from previous messages
        // This handles human-in-the-loop confirmations for tools
        const processedMessages = await processToolCalls({
          messages: cleanedMessages,
          dataStream: writer,
          tools: allTools,
          executions
        });

        const result = streamText({
          system: `You are Stardex, an AI assistant specialized in providing information about celestial bodies, space exploration, astronomy, and the cosmos.

When a user asks about a celestial body (planet, moon, star, etc.), you should:
1. Call the getCelestialBodyInfo tool with the body's name
2. After receiving the data, write a natural, engaging description

CRITICAL: After you receive tool results, you MUST write your response in natural, conversational language. DO NOT echo or display the JSON data structure. The user sees technical specifications in a separate info panel.

Your response should:
- Be enthusiastic and educational
- Highlight the most fascinating facts
- Use descriptive, flowing language
- Paint a vivid picture with words

BAD (never do this): {"name": "Saturn", "diameter": "116,460 km"...}

GOOD (always do this): Saturn is one of the most spectacular sights in our solar system! This magnificent gas giant is famous for its stunning ring system made of ice and rock particles. Despite being 116,460 km in diameter, Saturn is so light it would float in water! It takes 29.5 Earth years to orbit the Sun, but spins so fast that a day is only 10.7 hours. With 146 moons, it's like a miniature solar system.

${getSchedulePrompt({ date: new Date() })}`,

          messages: convertToModelMessages(processedMessages),
          model,
          tools: allTools,
          maxOutputTokens: 2048,
          // Type boundary: streamText expects specific tool types, but base class uses ToolSet
          // This is safe because our tools satisfy ToolSet interface (verified by 'satisfies' in tools.ts)
          onFinish: onFinish as unknown as StreamTextOnFinishCallback<
            typeof allTools
          >,
          stopWhen: stepCountIs(10)
        });

        writer.merge(result.toUIMessageStream());
      }
    });

    return createUIMessageStreamResponse({ stream });
  }
  async executeTask(description: string, _task: Schedule<string>) {
    await this.saveMessages([
      ...this.messages,
      {
        id: generateId(),
        role: "user",
        parts: [
          {
            type: "text",
            text: `Running scheduled task: ${description}`
          }
        ],
        metadata: {
          createdAt: new Date()
        }
      }
    ]);
  }
}

/**
 * Worker entry point that routes incoming requests to the appropriate handler
 */
export default {
  async fetch(request: Request, env: Env, _ctx: ExecutionContext) {
    return (
      // Route the request to our agent or return 404 if not found
      (await routeAgentRequest(request, env)) ||
      new Response("Not found", { status: 404 })
    );
  }
} satisfies ExportedHandler<Env>;
