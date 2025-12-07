# Stardex Quick Start Guide

## What is Stardex?

Stardex is an AI-powered space exploration assistant that helps you learn about celestial bodies, space missions, constellations, and astronomical phenomena. It uses Cloudflare's Workers AI with Llama 3.3 to provide intelligent, conversational responses about space and astronomy.

## Prerequisites

- Node.js 18 or later
- A Cloudflare account (for deployment)

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Locally

```bash
npm start
```

This will start the development server. Open your browser to the URL shown (typically http://localhost:5173 or similar).

### 3. Try These Example Questions

Once the app is running, try asking:

#### About Planets

- "Tell me about Mars"
- "What makes Jupiter special?"
- "How big is Saturn compared to Earth?"
- "What's the atmosphere like on Venus?"

#### About Constellations

- "What is the Orion constellation?"
- "Tell me about Ursa Major"
- "What's the mythology behind Cassiopeia?"

#### About Space Missions

- "What was the Apollo 11 mission?"
- "Tell me about the James Webb telescope"
- "What is Perseverance doing on Mars?"
- "Where is Voyager 1 now?"

#### Distance Calculations

- "How far is Earth from the Moon?"
- "What's the distance between Earth and Mars?"
- "How far is Neptune from the Sun?"

#### Astronomical Events

- "When are the next meteor showers?"
- "What are the Perseids?"

## Deploying to Cloudflare

### 1. Login to Cloudflare

```bash
npx wrangler login
```

### 2. Deploy

```bash
npm run deploy
```

Your Stardex app will be deployed to Cloudflare Workers and you'll get a public URL!

## Project Structure

```
cf_ai_stardex/
├── src/
│   ├── app.tsx           # React UI components
│   ├── server.ts         # Workers AI + Durable Objects backend
│   ├── tools.ts          # Space-related tool definitions
│   ├── utils.ts          # Helper functions
│   └── components/       # UI components
├── wrangler.jsonc        # Cloudflare configuration
├── package.json          # Dependencies
└── README.md            # Full documentation
```

## Key Features

### 🤖 AI-Powered

Uses Llama 3.3 70B running on Cloudflare Workers AI for intelligent responses.

### 💾 Persistent Memory

Your chat history is saved using Durable Objects, so you can continue conversations.

### ⚡ Real-time Streaming

Responses stream in real-time for a better experience.

### 🌓 Dark/Light Theme

Toggle between dark and light modes using the sun/moon icon.

### 🛠️ Smart Tools

The AI automatically uses the right tools to fetch information:

- Planet and celestial body data
- Constellation information
- Space mission details
- Distance calculations
- Astronomical events

## Understanding the Components

### 1. LLM (Language Model)

- **Model**: Llama 3.3 70B Instruct (FP8 Fast)
- **Provider**: Cloudflare Workers AI
- **Cost**: Included with Cloudflare Workers (no separate API key needed!)

### 2. Workflow/Coordination

- **Technology**: Durable Objects
- **Purpose**: Manages chat state and coordinates AI responses
- **Features**: Message persistence, task scheduling

### 3. User Input

- **Interface**: React-based chat UI
- **Features**: Text input, streaming responses, message history

### 4. Memory/State

- **Storage**: Durable Objects with SQLite
- **Purpose**: Stores conversation history across sessions

## Customizing Stardex

### Adding New Planets/Bodies

Edit `src/tools.ts` and add to the `celestialBodiesData` object:

```typescript
pluto: {
  name: "Pluto",
  type: "Dwarf Planet",
  diameter: "2,376 km",
  // ... more properties
}
```

### Adding New Space Missions

Edit the `missions` object in `src/tools.ts`:

```typescript
artemis: {
  name: "Artemis",
  agency: "NASA",
  launch_date: "TBD",
  // ... more properties
}
```

### Changing the AI Model

Edit `src/server.ts` to use a different Workers AI model:

```typescript
const model = workersai("@cf/mistral/mistral-7b-instruct-v0.1");
```

See available models: https://developers.cloudflare.com/workers-ai/models/

## Troubleshooting

### Build Errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors

```bash
# Regenerate types
npm run types
```

### Deployment Issues

```bash
# Make sure you're logged in
npx wrangler login

# Check your account
npx wrangler whoami
```

## Next Steps

1. **Explore the Data**: Try asking about different planets, missions, and constellations
2. **Customize**: Add more celestial bodies or space missions to the database
3. **Integrate APIs**: Connect to NASA APIs for real-time space data
4. **Add Features**: Implement image support, 3D visualizations, or voice input
5. **Share**: Deploy to Cloudflare and share your space exploration assistant!

## Resources

- [Cloudflare Workers AI](https://developers.cloudflare.com/workers-ai/)
- [Cloudflare Durable Objects](https://developers.cloudflare.com/durable-objects/)
- [Cloudflare Agents SDK](https://developers.cloudflare.com/agents/)
- [NASA APIs](https://api.nasa.gov/)
- [AI SDK Documentation](https://sdk.vercel.ai/docs)

## Need Help?

- Check the full [README.md](./README.md) for detailed documentation
- Review [STARDEX_IMPLEMENTATION.md](./STARDEX_IMPLEMENTATION.md) for technical details
- Cloudflare Discord: https://discord.gg/cloudflaredev

## License

MIT - Feel free to use and modify for your own projects!

---

**Happy Space Exploring! 🚀🌟**
