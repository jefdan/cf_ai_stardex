# Celestial Object Information Panel Feature

## Overview

The Stardex application now includes a comprehensive information panel that displays detailed information about celestial objects when queried through the chat interface.

## Features Implemented

### 1. **Information Panel Component** (`CelestialInfoPanel.tsx`)

A responsive side panel that displays:

- **High-quality images** of celestial objects (from NASA's image library)
- **Physical properties**: diameter, mass, composition, atmosphere
- **Orbital properties**: distance from sun/earth, orbital period, rotation period, number of moons
- **Temperature data**: surface and core temperatures
- **Astronomical coordinates**: Right Ascension (RA), Declination (Dec), magnitude, distance
- **Additional information**: age, type, detailed description

### 2. **Enhanced Data Structure**

Updated the `CelestialBody` interface in `tools.ts` to include:

- `imageUrl`: NASA image URLs for visual representation
- `rightAscension`: RA coordinates for astronomical positioning
- `declination`: Dec coordinates for astronomical positioning
- `magnitude`: Apparent brightness magnitude
- `distance`: Distance information for various objects

### 3. **Complete Celestial Body Data**

All solar system objects now include:

- **Mercury**: Temperature range, magnitude, NASA Messenger image
- **Venus**: Surface temperature, magnitude, Mariner 10 image
- **Earth**: Blue Marble image, age, temperature range
- **Mars**: Temperature range, magnitude, full globe image
- **Jupiter**: Magnitude range, orbital characteristics, marble image
- **Saturn**: Magnificent ring system image, magnitude data
- **Uranus**: Voyager 2 image, tilted rotation details
- **Neptune**: Deep blue appearance, Voyager 2 image
- **Moon**: Surface temperature, magnitude, LRO image, age
- **Sun**: Core and surface temperatures, SDO image, composition

### 4. **Responsive Layout**

- The chat interface now uses a flexible layout
- When a celestial object is queried, the panel appears on the right (33% width)
- The chat area adjusts to 66% width to accommodate the panel
- Smooth transitions when opening/closing the panel
- Close button to dismiss the panel and return to full-width chat

### 5. **Automatic Detection**

- The app automatically detects when the `getCelestialBodyInfo` tool is invoked
- Parses the JSON response containing celestial body data
- Opens the info panel with the object's information
- Updates whenever a new object is queried

## How to Use

1. **Start the application**: `npm start`
2. **Ask about a celestial object**:
   - "Tell me about Jupiter"
   - "What is Mars like?"
   - "Show me information about the Moon"
3. **View the information panel**: The panel will automatically appear on the right side
4. **Close the panel**: Click the X button in the panel header
5. **Query another object**: The panel will update with the new object's data

## Technical Details

### State Management

- Uses React's `useState` to manage the selected celestial object
- `useEffect` hook monitors chat messages for tool invocations
- Parses tool results to extract celestial body data

### Styling

- Consistent with existing dark/light theme support
- Uses Tailwind CSS for responsive design
- Card components for organized information display
- Smooth transitions and animations

### Data Flow

1. User asks about a celestial object
2. AI invokes `getCelestialBodyInfo` tool
3. Tool returns JSON data with complete object information
4. React effect detects the tool result
5. Panel state updates and displays the object
6. User can close panel or query another object

## Image Sources

All images are sourced from NASA's Science website:

- High-quality, scientifically accurate representations
- Properly attributed to NASA missions and instruments
- Publicly available under NASA's media usage guidelines

## Future Enhancements

Potential additions:

- Support for constellation information panel
- Interactive 3D models of celestial objects
- Real-time position tracking
- Comparison view for multiple objects
- Historical data and mission timelines
- Export object information as PDF/image
