# 🌟 Stardex - AI-Powered Space Explorer

![Cloudflare Agents](./npm-agents-banner.svg)

Stardex is an AI-powered application for exploring information about celestial bodies, space exploration, astronomy, and the cosmos. Built on Cloudflare's Agent platform using Llama 3.3 on Workers AI, it provides an interactive chat interface to learn about planets, stars, constellations, space missions, and astronomical phenomena.

## Features

- 🌌 **Celestial Body Information** - Get detailed data about planets, moons, stars, and other objects in our solar system
- ⭐ **Constellation Explorer** - Learn about constellations, their mythology, and visibility
- 🚀 **Space Mission Database** - Explore famous space missions and their achievements
- 🌠 **Astronomical Events** - Information about meteor showers, eclipses, and other phenomena
- 📏 **Distance Calculator** - Calculate distances between celestial bodies
- 💬 **Interactive Chat Interface** - Natural language conversations powered by Llama 3.3
- 🌓 **Dark/Light Theme** - Comfortable viewing in any environment
- ⚡ **Real-time Streaming** - Fast, streaming AI responses
- 🔄 **State Management** - Chat history and conversation persistence via Durable Objects
- 📅 **Task Scheduling** - Schedule astronomical reminders and tasks

## Architecture

Stardex is built using the following Cloudflare technologies:

1. **LLM**: Llama 3.3 70B Instruct (FP8 Fast) on Workers AI
2. **Workflow/Coordination**: Durable Objects for state management and chat persistence
3. **User Input**: React-based chat interface with real-time streaming
4. **Memory/State**: Durable Objects with SQLite for conversation history

## Prerequisites

- Cloudflare account
- Node.js 18+ installed

## Quick Start

1. Clone the repository:

```bash
git clone <repository-url>
cd cf_ai_stardex
```

2. Install dependencies:

```bash
npm install
```

3. Run locally:

```bash
npm start
```

4. Deploy to Cloudflare:

```bash
npm run deploy
```

## Project Structure

```
├── src/
│   ├── app.tsx        # Stardex UI implementation
│   ├── server.ts      # Chat agent with Llama 3.3
│   ├── tools.ts       # Space-related tool definitions
│   ├── utils.ts       # Helper functions
│   └── styles.css     # UI styling
├── wrangler.jsonc     # Cloudflare Workers configuration
└── package.json       # Project dependencies
```

## Available Tools

Stardex includes the following space exploration tools:

- **getCelestialBodyInfo** - Get detailed information about planets, moons, stars (Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune, Moon, Sun)
- **getConstellationInfo** - Learn about constellations including Orion, Ursa Major, and Cassiopeia
- **calculateDistance** - Calculate distances between celestial bodies
- **getSpaceMissionInfo** - Information about Apollo 11, Voyager 1, Perseverance, James Webb, and more
- **getAstronomicalEvents** - Data about meteor showers, eclipses, and other astronomical events
- **scheduleTask** - Schedule astronomy-related reminders and tasks
- **getScheduledTasks** - View all scheduled tasks
- **cancelScheduledTask** - Cancel a scheduled task

## Example Queries

Try asking Stardex:

- "Tell me about Jupiter"
- "What is the Orion constellation?"
- "How far is Earth from Mars?"
- "Tell me about the Apollo 11 mission"
- "What are the upcoming meteor showers?"
- "What's special about Saturn's rings?"
- "How big is the Sun compared to Earth?"

## Customization

### Adding New Celestial Bodies

Edit `src/tools.ts` and add new entries to the `celestialBodiesData` object:

```typescript
const celestialBodiesData = {
  // ... existing bodies
  pluto: {
    name: "Pluto",
    type: "Dwarf Planet"
    // ... more properties
  }
};
```

### Adding New Space Missions

Add entries to the `missions` object in the `getSpaceMissionInfo` tool:

```typescript
const missions = {
  // ... existing missions
  artemis: {
    name: "Artemis",
    agency: "NASA"
    // ... mission details
  }
};
```

### Modifying the AI Model

To use a different Workers AI model, edit `src/server.ts`:

```typescript
const model = workersai("@cf/meta/llama-3.3-70b-instruct-fp8-fast");
// Change to another model like:
// const model = workersai("@cf/mistral/mistral-7b-instruct-v0.1");
```

## Technology Stack

- **Frontend**: React 19, Tailwind CSS 4
- **Backend**: Cloudflare Workers, Durable Objects
- **AI**: Workers AI (Llama 3.3 70B Instruct)
- **Build Tool**: Vite
- **Agent Framework**: Cloudflare Agents SDK

## Learn More

- [Cloudflare Workers AI](https://developers.cloudflare.com/workers-ai/)
- [Cloudflare Agents Documentation](https://developers.cloudflare.com/agents/)
- [Cloudflare Durable Objects](https://developers.cloudflare.com/durable-objects/)
- [Llama 3.3 Model](https://developers.cloudflare.com/workers-ai/models/llama-3.3-70b-instruct-fp8-fast/)

## License

MIT
