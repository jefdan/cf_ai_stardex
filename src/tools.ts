/**
 * Tool definitions for the Stardex AI chat agent
 * Tools can either require human confirmation or execute automatically
 */
import { tool, type ToolSet } from "ai";
import { z } from "zod/v3";

import type { Chat } from "./server";
import { getCurrentAgent } from "agents";
import { scheduleSchema } from "agents/schedule";

/**
 * Celestial body information data
 */
const celestialBodiesData: Record<string, any> = {
  mercury: {
    name: "Mercury",
    type: "Planet",
    diameter: "4,879 km",
    mass: "3.285 × 10²³ kg",
    distanceFromSun: "57.9 million km",
    orbitalPeriod: "88 Earth days",
    rotationPeriod: "59 Earth days",
    moons: 0,
    atmosphere:
      "Extremely thin (traces of oxygen, sodium, hydrogen, helium, potassium)",
    description:
      "Mercury is the smallest planet in our solar system and the closest to the Sun. It has extreme temperature variations and a heavily cratered surface."
  },
  venus: {
    name: "Venus",
    type: "Planet",
    diameter: "12,104 km",
    mass: "4.867 × 10²⁴ kg",
    distanceFromSun: "108.2 million km",
    orbitalPeriod: "225 Earth days",
    rotationPeriod: "243 Earth days (retrograde)",
    moons: 0,
    atmosphere: "Thick, primarily CO₂ with sulfuric acid clouds",
    description:
      "Venus is the hottest planet in our solar system with surface temperatures around 465°C due to its thick atmosphere creating a runaway greenhouse effect."
  },
  earth: {
    name: "Earth",
    type: "Planet",
    diameter: "12,742 km",
    mass: "5.972 × 10²⁴ kg",
    distanceFromSun: "149.6 million km (1 AU)",
    orbitalPeriod: "365.25 days",
    rotationPeriod: "24 hours",
    moons: 1,
    atmosphere: "Nitrogen (78%), Oxygen (21%), trace gases",
    description:
      "Earth is the only known planet to harbor life. It has liquid water on its surface and a protective atmosphere with an ozone layer."
  },
  mars: {
    name: "Mars",
    type: "Planet",
    diameter: "6,779 km",
    mass: "6.39 × 10²³ kg",
    distanceFromSun: "227.9 million km",
    orbitalPeriod: "687 Earth days",
    rotationPeriod: "24.6 hours",
    moons: 2,
    atmosphere: "Thin, primarily CO₂",
    description:
      "Mars is known as the Red Planet due to iron oxide on its surface. It has the largest volcano in the solar system (Olympus Mons) and evidence of ancient water flow."
  },
  jupiter: {
    name: "Jupiter",
    type: "Planet",
    diameter: "139,820 km",
    mass: "1.898 × 10²⁷ kg",
    distanceFromSun: "778.5 million km",
    orbitalPeriod: "11.9 Earth years",
    rotationPeriod: "9.9 hours",
    moons: 95,
    atmosphere: "Hydrogen (90%), Helium (10%)",
    description:
      "Jupiter is the largest planet in our solar system. It has a Great Red Spot (a massive storm) and strong magnetic fields. Its four largest moons are called the Galilean moons."
  },
  saturn: {
    name: "Saturn",
    type: "Planet",
    diameter: "116,460 km",
    mass: "5.683 × 10²⁶ kg",
    distanceFromSun: "1.43 billion km",
    orbitalPeriod: "29.5 Earth years",
    rotationPeriod: "10.7 hours",
    moons: 146,
    atmosphere: "Hydrogen (96%), Helium (3%)",
    description:
      "Saturn is famous for its spectacular ring system made of ice and rock particles. It's the least dense planet and would float in water if there was an ocean big enough."
  },
  uranus: {
    name: "Uranus",
    type: "Planet",
    diameter: "50,724 km",
    mass: "8.681 × 10²⁵ kg",
    distanceFromSun: "2.87 billion km",
    orbitalPeriod: "84 Earth years",
    rotationPeriod: "17.2 hours (retrograde)",
    moons: 27,
    atmosphere: "Hydrogen (83%), Helium (15%), Methane (2%)",
    description:
      "Uranus rotates on its side with an axial tilt of 98 degrees. It has a blue-green color due to methane in its atmosphere and has a system of faint rings."
  },
  neptune: {
    name: "Neptune",
    type: "Planet",
    diameter: "49,244 km",
    mass: "1.024 × 10²⁶ kg",
    distanceFromSun: "4.50 billion km",
    orbitalPeriod: "165 Earth years",
    rotationPeriod: "16.1 hours",
    moons: 14,
    atmosphere: "Hydrogen (80%), Helium (19%), Methane (1%)",
    description:
      "Neptune is the windiest planet with speeds reaching 2,100 km/h. It has a Great Dark Spot similar to Jupiter's Great Red Spot and appears deep blue due to methane."
  },
  moon: {
    name: "Moon (Luna)",
    type: "Natural Satellite",
    diameter: "3,474 km",
    mass: "7.342 × 10²² kg",
    distanceFromEarth: "384,400 km",
    orbitalPeriod: "27.3 days",
    rotationPeriod: "27.3 days (tidally locked)",
    atmosphere: "Extremely thin exosphere",
    description:
      "Earth's only natural satellite. It influences tides and has been visited by humans during the Apollo missions. Always shows the same face to Earth due to tidal locking."
  },
  sun: {
    name: "Sun",
    type: "Star (G-type main-sequence)",
    diameter: "1.39 million km",
    mass: "1.989 × 10³⁰ kg",
    surfaceTemperature: "5,500°C",
    coreTemperature: "15 million°C",
    age: "4.6 billion years",
    composition: "Hydrogen (73%), Helium (25%), other elements (2%)",
    description:
      "The Sun is the star at the center of our solar system. It contains 99.86% of the solar system's mass and provides the energy that sustains life on Earth through nuclear fusion."
  }
};

/**
 * Get detailed information about a celestial body
 */
const getCelestialBodyInfo = tool({
  description:
    "Get detailed information about a planet, moon, star, or other celestial body in our solar system",
  inputSchema: z.object({
    bodyName: z
      .string()
      .describe(
        "The name of the celestial body (e.g., Mars, Jupiter, Moon, Sun)"
      )
  }),
  execute: async ({ bodyName }) => {
    const normalizedName = bodyName.toLowerCase().trim();
    const body = celestialBodiesData[normalizedName];

    if (!body) {
      return `I don't have detailed information about "${bodyName}" in my database. I have information about: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune, the Moon, and the Sun. Please try one of these.`;
    }

    return JSON.stringify(body, null, 2);
  }
});

/**
 * Get information about constellations
 */
const getConstellationInfo = tool({
  description:
    "Get information about a constellation including its stars, mythology, and visibility",
  inputSchema: z.object({
    constellationName: z.string().describe("The name of the constellation")
  }),
  execute: async ({ constellationName }) => {
    const constellations: Record<string, any> = {
      orion: {
        name: "Orion",
        brightest_stars: ["Betelgeuse", "Rigel", "Bellatrix"],
        mythology: "Named after Orion, a hunter in Greek mythology",
        visibility:
          "Visible worldwide, best seen in winter (Northern Hemisphere) or summer (Southern Hemisphere)",
        notable_features:
          "Contains the famous Orion Nebula (M42), a stellar nursery visible to the naked eye"
      },
      ursa_major: {
        name: "Ursa Major (Great Bear)",
        brightest_stars: ["Dubhe", "Merak", "Alioth"],
        mythology:
          "The Great Bear in Greek mythology, associated with Callisto",
        visibility:
          "Circumpolar in northern latitudes, visible year-round in the Northern Hemisphere",
        notable_features:
          "Contains the Big Dipper asterism, used for navigation to find Polaris"
      },
      cassiopeia: {
        name: "Cassiopeia",
        brightest_stars: ["Schedar", "Caph", "Navi"],
        mythology: "Named after the vain queen Cassiopeia in Greek mythology",
        visibility:
          "Circumpolar in northern latitudes, appears as a distinctive 'W' or 'M' shape",
        notable_features: "Contains several star clusters and the Heart Nebula"
      }
    };

    const normalizedName = constellationName.toLowerCase().replace(/\s+/g, "_");
    const constellation = constellations[normalizedName];

    if (!constellation) {
      return `I don't have detailed information about the "${constellationName}" constellation. Try asking about Orion, Ursa Major, or Cassiopeia.`;
    }

    return JSON.stringify(constellation, null, 2);
  }
});

/**
 * Calculate distance between celestial bodies
 */
const calculateDistance = tool({
  description: "Calculate or provide the distance between two celestial bodies",
  inputSchema: z.object({
    from: z.string().describe("Starting celestial body"),
    to: z.string().describe("Destination celestial body")
  }),
  execute: async ({ from, to }) => {
    const distances: Record<string, string> = {
      "earth-moon": "384,400 km (average)",
      "earth-sun": "149.6 million km (1 AU)",
      "earth-mars": "225 million km (average, varies greatly)",
      "sun-mercury": "57.9 million km",
      "sun-venus": "108.2 million km",
      "sun-jupiter": "778.5 million km",
      "sun-saturn": "1.43 billion km",
      "sun-neptune": "4.50 billion km"
    };

    const key = `${from.toLowerCase()}-${to.toLowerCase()}`;
    const reverseKey = `${to.toLowerCase()}-${from.toLowerCase()}`;

    return (
      distances[key] ||
      distances[reverseKey] ||
      `Distance data between ${from} and ${to} is not available in my current database. You can ask about common distances like Earth-Moon, Earth-Sun, or Sun to any planet.`
    );
  }
});

/**
 * Get information about space missions
 */
const getSpaceMissionInfo = tool({
  description:
    "Get information about famous space missions and exploration programs",
  inputSchema: z.object({
    missionName: z.string().describe("The name of the space mission")
  }),
  execute: async ({ missionName }) => {
    const missions: Record<string, any> = {
      apollo_11: {
        name: "Apollo 11",
        agency: "NASA",
        launch_date: "July 16, 1969",
        mission_type: "Crewed lunar landing",
        crew: ["Neil Armstrong", "Buzz Aldrin", "Michael Collins"],
        achievements:
          "First crewed mission to land on the Moon. Armstrong and Aldrin walked on the lunar surface while Collins orbited above.",
        duration: "8 days, 3 hours, 18 minutes"
      },
      voyager_1: {
        name: "Voyager 1",
        agency: "NASA",
        launch_date: "September 5, 1977",
        mission_type: "Interstellar space probe",
        achievements:
          "First spacecraft to enter interstellar space (2012). Conducted flybys of Jupiter and Saturn, sending back detailed images and data.",
        current_status: "Still operational, over 24 billion km from Earth"
      },
      perseverance: {
        name: "Mars Perseverance Rover",
        agency: "NASA",
        launch_date: "July 30, 2020",
        landing_date: "February 18, 2021",
        mission_type: "Mars rover mission",
        achievements:
          "Searching for signs of ancient microbial life, collecting rock samples, testing new technology including the Ingenuity helicopter.",
        current_status: "Active on Mars"
      },
      james_webb: {
        name: "James Webb Space Telescope",
        agency: "NASA/ESA/CSA",
        launch_date: "December 25, 2021",
        mission_type: "Space telescope",
        achievements:
          "Observing the universe in infrared, capturing images of the earliest galaxies, studying exoplanet atmospheres, and revealing stunning cosmic structures.",
        current_status: "Operational at L2 Lagrange point"
      }
    };

    const normalizedName = missionName.toLowerCase().replace(/\s+/g, "_");
    const mission = missions[normalizedName];

    if (!mission) {
      return `I don't have information about "${missionName}". Try asking about Apollo 11, Voyager 1, Perseverance, or James Webb.`;
    }

    return JSON.stringify(mission, null, 2);
  }
});

/**
 * Get current astronomical events
 */
const getAstronomicalEvents = tool({
  description:
    "Get information about astronomical events like meteor showers, eclipses, and planetary alignments",
  inputSchema: z.object({
    eventType: z
      .string()
      .optional()
      .describe(
        "Type of event (e.g., 'meteor shower', 'eclipse', 'planetary alignment')"
      )
  }),
  execute: async ({ eventType }) => {
    const events = {
      message: "Astronomical event information",
      note: "This is sample data. In a production environment, this would connect to an astronomy API for real-time data.",
      common_events: {
        meteor_showers: [
          {
            name: "Perseids",
            peak: "August 11-13",
            rate: "60-100 meteors/hour"
          },
          {
            name: "Geminids",
            peak: "December 13-14",
            rate: "120 meteors/hour"
          },
          {
            name: "Quadrantids",
            peak: "January 3-4",
            rate: "40-120 meteors/hour"
          }
        ],
        moon_phases:
          "The Moon goes through 8 phases over approximately 29.5 days",
        upcoming_info:
          "For current astronomical events, check NASA's website or astronomy apps like SkySafari or Stellarium"
      }
    };

    return JSON.stringify(events, null, 2);
  }
});

const scheduleTask = tool({
  description: "A tool to schedule a task to be executed at a later time",
  inputSchema: scheduleSchema,
  execute: async ({ when, description }) => {
    // we can now read the agent context from the ALS store
    const { agent } = getCurrentAgent<Chat>();

    function throwError(msg: string): string {
      throw new Error(msg);
    }
    if (when.type === "no-schedule") {
      return "Not a valid schedule input";
    }
    const input =
      when.type === "scheduled"
        ? when.date // scheduled
        : when.type === "delayed"
          ? when.delayInSeconds // delayed
          : when.type === "cron"
            ? when.cron // cron
            : throwError("not a valid schedule input");
    try {
      agent!.schedule(input!, "executeTask", description);
    } catch (error) {
      console.error("error scheduling task", error);
      return `Error scheduling task: ${error}`;
    }
    return `Task scheduled for type "${when.type}" : ${input}`;
  }
});

/**
 * Tool to list all scheduled tasks
 * This executes automatically without requiring human confirmation
 */
const getScheduledTasks = tool({
  description: "List all tasks that have been scheduled",
  inputSchema: z.object({}),
  execute: async () => {
    const { agent } = getCurrentAgent<Chat>();

    try {
      const tasks = agent!.getSchedules();
      if (!tasks || tasks.length === 0) {
        return "No scheduled tasks found.";
      }
      return JSON.stringify(tasks, null, 2);
    } catch (error) {
      console.error("Error listing scheduled tasks", error);
      return `Error listing scheduled tasks: ${error}`;
    }
  }
});

/**
 * Tool to cancel a scheduled task by its ID
 * This executes automatically without requiring human confirmation
 */
const cancelScheduledTask = tool({
  description: "Cancel a scheduled task using its ID",
  inputSchema: z.object({
    taskId: z.string().describe("The ID of the task to cancel")
  }),
  execute: async ({ taskId }) => {
    const { agent } = getCurrentAgent<Chat>();
    try {
      await agent!.cancelSchedule(taskId);
      return `Task ${taskId} has been successfully canceled.`;
    } catch (error) {
      console.error("Error canceling scheduled task", error);
      return `Error canceling task ${taskId}: ${error}`;
    }
  }
});

/**
 * Export all available tools
 * These will be provided to the AI model to describe available capabilities
 */
export const tools = {
  getCelestialBodyInfo,
  getConstellationInfo,
  calculateDistance,
  getSpaceMissionInfo,
  getAstronomicalEvents,
  scheduleTask,
  getScheduledTasks,
  cancelScheduledTask
} satisfies ToolSet;

/**
 * Implementation of confirmation-required tools
 * This object contains the actual logic for tools that need human approval
 * Each function here corresponds to a tool above that doesn't have an execute function
 */
export const executions = {
  // Currently all tools auto-execute, but this is here for future expansion
};
