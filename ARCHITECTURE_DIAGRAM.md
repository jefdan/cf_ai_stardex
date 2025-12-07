# Celestial Info Panel - Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                        Stardex Application                          │
└─────────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         App.tsx (Main Layout)                       │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │                                                               │  │
│  │  State: selectedObject (CelestialObject | null)              │  │
│  │                                                               │  │
│  │  Layout: Flex Container (max-w-6xl)                          │  │
│  │  ┌─────────────────────────┬───────────────────────────────┐ │  │
│  │  │  Chat Area (66%)        │  Info Panel (33%)             │ │  │
│  │  │  ┌───────────────────┐  │  ┌────────────────────────┐   │ │  │
│  │  │  │ Header            │  │  │ Close Button           │   │ │  │
│  │  │  ├───────────────────┤  │  ├────────────────────────┤   │ │  │
│  │  │  │                   │  │  │ Object Image (NASA)    │   │ │  │
│  │  │  │ Messages          │  │  ├────────────────────────┤   │ │  │
│  │  │  │                   │  │  │ Physical Properties    │   │ │  │
│  │  │  │ - User Messages   │  │  │  • Diameter            │   │ │  │
│  │  │  │ - AI Responses    │  │  │  • Mass                │   │ │  │
│  │  │  │ - Tool Cards      │  │  │  • Composition         │   │ │  │
│  │  │  │                   │  │  │  • Atmosphere          │   │ │  │
│  │  │  │                   │  │  ├────────────────────────┤   │ │  │
│  │  │  │                   │  │  │ Orbital Properties     │   │ │  │
│  │  │  │                   │  │  │  • Distance from Sun   │   │ │  │
│  │  │  │                   │  │  │  • Orbital Period      │   │ │  │
│  │  │  │                   │  │  │  • Rotation Period     │   │ │  │
│  │  │  │                   │  │  │  • Moons               │   │ │  │
│  │  │  ├───────────────────┤  │  ├────────────────────────┤   │ │  │
│  │  │  │ Input Textarea    │  │  │ Temperature Data       │   │ │  │
│  │  │  └───────────────────┘  │  ├────────────────────────┤   │ │  │
│  │  │                          │  │ Astronomical Data      │   │ │  │
│  │  │  Expands to 100%         │  │  • RA (Right Asc.)     │   │ │  │
│  │  │  when panel is closed    │  │  • Dec (Declination)   │   │ │  │
│  │  │                          │  │  • Magnitude           │   │ │  │
│  │  │                          │  │  • Distance            │   │ │  │
│  │  └──────────────────────────┘  └────────────────────────┘   │ │  │
│  │                                                               │  │
│  │  Shows when selectedObject !== null                          │  │
│  └───────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        Data Flow                                    │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  1. User Query: "Tell me about Jupiter"                            │
│                        │                                            │
│                        ▼                                            │
│  2. AI Agent invokes getCelestialBodyInfo(bodyName: "Jupiter")     │
│                        │                                            │
│                        ▼                                            │
│  3. Tool returns JSON:                                             │
│     {                                                               │
│       name: "Jupiter",                                             │
│       type: "Planet",                                              │
│       diameter: "139,820 km",                                      │
│       imageUrl: "https://science.nasa.gov/...",                    │
│       magnitude: "-2.94 to -1.66",                                 │
│       rightAscension: "Varies (0h to 24h)",                        │
│       ...                                                           │
│     }                                                               │
│                        │                                            │
│                        ▼                                            │
│  4. useEffect detects tool result                                  │
│                        │                                            │
│                        ▼                                            │
│  5. setSelectedObject(celestialData)                               │
│                        │                                            │
│                        ▼                                            │
│  6. CelestialInfoPanel renders with data                           │
│                        │                                            │
│                        ▼                                            │
│  7. Panel displays image, properties, coordinates, etc.            │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        Components                                   │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  CelestialInfoPanel.tsx                                            │
│  ├─ Header (with close button)                                     │
│  ├─ Image display (NASA images)                                    │
│  ├─ Type card                                                       │
│  ├─ Description card                                               │
│  ├─ Physical Properties section                                    │
│  │  └─ Multiple info cards                                         │
│  ├─ Orbital Properties section                                     │
│  │  └─ Multiple info cards                                         │
│  ├─ Temperature section                                            │
│  │  └─ Surface & Core temp cards                                   │
│  ├─ Astronomical Data section                                      │
│  │  └─ RA, Dec, Magnitude, Distance cards                          │
│  └─ Age card (if available)                                        │
│                                                                     │
│  Uses existing components:                                         │
│  • Card (for info sections)                                        │
│  • Button (for close)                                              │
│  • Phosphor Icons (for close icon)                                 │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        Styling & Theme                              │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  • Supports both dark and light themes                             │
│  • Smooth transitions (300ms) when opening/closing                 │
│  • Responsive scrolling for long content                           │
│  • Consistent with existing UI design                              │
│  • Tailwind CSS utility classes                                    │
│  • Color scheme matches Stardex branding                           │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## Key Features

1. **Automatic Detection**: The panel automatically opens when celestial body info is retrieved
2. **Rich Data Display**: Shows comprehensive information including images, coordinates, and physical properties
3. **Responsive Layout**: Adapts between full-width chat and split view with panel
4. **Theme Support**: Works seamlessly with dark/light theme toggle
5. **User Control**: Easy-to-use close button to dismiss the panel
6. **NASA Images**: High-quality, scientifically accurate images from NASA's archives

## Data Coverage

All 10 celestial bodies include:

- Mercury, Venus, Earth, Mars (Terrestrial planets)
- Jupiter, Saturn, Uranus, Neptune (Gas/Ice giants)
- Moon (Earth's satellite)
- Sun (Our star)

Each with complete data including RA/Dec coordinates, magnitude, images, and more!
