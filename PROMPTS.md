This is an application created using npm create cloudflare@latest agents-starter -- --template=cloudflare/agents-starter. I want to create an application called Stardex, which is an application that can be used to view information about different celestial bodies and stuff about space. It must be AI-powered, and have the following components:

/fix When sending a message, the application's profile picture appears, but it doesn't appear to send any content.

The result from tool-getCelestialBodyInfo is empty. Please fix this.

Please fix these issues:

Run npm run check

stardex@1.0.0 check
prettier . --check && biome lint && tsc

Checking formatting...
All matched files use Prettier code style!
src/app.tsx:430:9 lint/correctness/noUnusedVariables FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

! This variable hasOpenAiKey is unused.

430 │ const hasOpenAiKey = use(hasOpenAiKeyPromise);
│ ^^^^^^^^^^^^
431 │
432 │ // Workers AI doesn't require an API key, so we skip this check

i Unused variables are often the result of an incomplete refactoring, typos, or other sources of bugs.

i Unsafe fix: If this is intentional, prepend hasOpenAiKey with an underscore.

src/tools.ts:15:43 lint/suspicious/noExplicitAny ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

! Unexpected any. Specify a different type.

15 │ const celestialBodiesData: Record<string, any> = {
│ ^^^
16 │ mercury: {
17 │ name: "Mercury",

i any disables many type checking rules. Its use should be avoided.

src/tools.ts:182:42 lint/suspicious/noExplicitAny ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

! Unexpected any. Specify a different type.

182 │ const constellations: Record<string, any> = {
│ ^^^
183 │ orion: {
184 │ name: "Orion",

i any disables many type checking rules. Its use should be avoided.

src/tools.ts:265:36 lint/suspicious/noExplicitAny ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

! Unexpected any. Specify a different type.

265 │ const missions: Record<string, any> = {
│ ^^^
266 │ apollo_11: {
267 │ name: "Apollo 11",

i any disables many type checking rules. Its use should be avoided.

src/tools.ts:331:21 lint/correctness/noUnusedFunctionParameters ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

! This parameter is unused.

331 │ execute: async ({ eventType }) => {
│ ^^^^^^^^^
332 │ const events = {
333 │ message: "Astronomical event information",

i Unused parameters might be the result of an incomplete refactoring.

Checked 35 files in 22ms. No fixes applied.
Found 5 warnings.
Error: src/app.tsx(430,9): error TS6133: 'hasOpenAiKey' is declared but its value is never read.
Error: src/server.ts(34,29): error TS2345: Argument of type '"@cf/meta/llama-3.1-70b-instruct"' is not assignable to parameter of type 'TextGenerationModels'.
Error: Process completed with exit code 2.
