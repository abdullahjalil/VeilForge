# Isometric Adventure Game

A 2D isometric adventure game created with Godot Engine. This project demonstrates how to build an isometric world with player movement, collision detection, and basic game mechanics.

![Isometric Game Screenshot](screenshots/game_preview.png)

## Features

- Isometric world with smooth character movement
- Tile-based map system with different terrain types
- Collision detection with walls and obstacles
- Character animation for different movement directions
- Simple UI elements including player stats and inventory
- Day/night cycle with dynamic lighting

## Getting Started

### Prerequisites

- [Godot Engine 4.2+](https://godotengine.org/download/) (Standard version, no need for the Mono/.NET version unless you want to use C#)

### Installation

1. Download or clone this repository
2. Open Godot Engine
3. Click "Import" and navigate to the project folder
4. Select the `project.godot` file and click "Open"
5. Once loaded, click the "Play" button in the top-right or press F5 to run the game

## Project Structure

```
isometric-adventure/
├── project.godot          # Godot project file
├── assets/                # Game assets
│   ├── sprites/           # Character and object sprites
│   ├── tileset/           # Isometric tiles
│   ├── ui/                # UI elements
│   └── audio/             # Sound effects and music
├── scenes/                # Game scenes
│   ├── Main.tscn          # Main game scene
│   ├── Player.tscn        # Player character scene
│   └── UI.tscn            # User interface scene
└── scripts/               # GDScript files
    ├── player.gd          # Player character logic
    ├── camera.gd          # Game camera behavior
    └── world.gd           # World generation and management
```

## Controls

- **W/Up Arrow**: Move up-left
- **S/Down Arrow**: Move down-right
- **A/Left Arrow**: Move up-right
- **D/Right Arrow**: Move down-left
- **Space**: Action/Interact
- **E**: Open inventory
- **Esc**: Pause menu

## Understanding Isometric in Godot

This project uses Godot's built-in support for isometric perspective through:

1. **TileMap with Isometric Mode**: Using Godot's TileMap node set to isometric mode
2. **YSort for Depth**: Using YSort nodes (or CanvasItem's y-sort enabled in Godot 4) to handle proper depth sorting
3. **Custom Movement**: Converting screen coordinates to isometric grid coordinates

### Key Concepts

- **Isometric Projection**: A method of visually representing 3D objects in 2D with a specific angle
- **Axonometric Grid**: The isometric coordinate system used for positioning objects
- **Z-Order/Depth Sorting**: Rendering objects in the correct order based on their Y position

## Extending the Game

Here are ideas for expanding this project:

- Add NPCs with dialogue systems
- Implement a quest system
- Add combat mechanics
- Create different biomes or regions
- Implement a day/night cycle
- Add crafting and resource gathering

## Creating Your Own Tiles

To create custom isometric tiles:

1. Use a standard diamond shape with 2:1 width-to-height ratio
2. Typically 64×32 pixels for base tiles
3. Align the corners to match the isometric grid

### Using In Godot

1. Import your tiles as images
2. Create a new TileSet resource
3. Add your tiles to the TileSet
4. Create a TileMap node and set it to Isometric mode
5. Assign your TileSet to the TileMap

## Troubleshooting

### Common Issues

1. **Objects not sorting correctly**: Ensure YSort is enabled on the parent node and that objects have the correct pivot points

2. **Character movement looks wrong**: Verify that you're converting screen coordinates to isometric coordinates correctly

3. **Performance issues with large maps**: Consider using occlusion culling or dividing your map into sectors

## Resources

- [Godot Documentation](https://docs.godotengine.org/en/stable/)
- [Godot Isometric Tutorial](https://docs.godotengine.org/en/stable/tutorials/2d/using_tilemaps.html#isometric-tilemaps)
- [GDScript Reference](https://docs.godotengine.org/en/stable/tutorials/scripting/gdscript/gdscript_basics.html)

## Credits

- Game art assets by [YOUR NAME]
- Sound effects from [SOURCE]
- Music by [COMPOSER]

## License

This project is licensed under the MIT License - see the LICENSE file for details.
