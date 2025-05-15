# Rust Isometric Game

A simple 2D isometric game written in Rust using the `ggez` game framework. This project demonstrates basic isometric rendering and movement in a grid-based world.

![Isometric Game Screenshot](screenshot.png)

## Features

- Isometric tile-based world rendering
- Smooth player movement with arrow keys
- Simple collision detection with map boundaries
- Clean separation of game logic and rendering

## Prerequisites

- [Rust](https://www.rust-lang.org/tools/install) (stable version)
- Cargo (comes with Rust)
- Basic graphics dependencies for ggez (see [ggez dependencies](https://github.com/ggez/ggez/blob/master/docs/BuildingForEveryPlatform.md) for your platform)

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/rust-isometric-game.git
   cd rust-isometric-game
   ```

2. Build the project:
   ```bash
   cargo build
   ```

3. Run the game:
   ```bash
   cargo run
   ```

## Project Structure

```
rust-isometric-game/
├── Cargo.toml         # Rust dependencies and project metadata
├── src/
│   └── main.rs        # Game code
└── resources/         # Game assets
    ├── player.png     # Player sprite
    └── floor.png      # Floor tile sprite
```

## Creating Resources

This game expects two image files in the `resources` directory:

1. `player.png` - A character sprite (recommended size: 32x48 pixels)
2. `floor.png` - An isometric floor tile (recommended size: 64x32 pixels)

You can create these images in any image editor or use placeholder graphics.

### Example Isometric Tile

For `floor.png`, you can create a simple diamond shape that is twice as wide as it is tall (e.g., 64x32 pixels). This maintains the standard 2:1 isometric ratio.

### Example Player Sprite

For `player.png`, create a simple character that will be positioned on top of the tiles. The origin point will be at the bottom center of the sprite.

## Controls

- **Up Arrow**: Move up-left in the isometric world
- **Down Arrow**: Move down-right in the isometric world
- **Left Arrow**: Move up-right in the isometric world
- **Right Arrow**: Move down-left in the isometric world

## Understanding Isometric Projection

This game uses a simple isometric projection where:

1. The x-axis runs from the bottom-left to the top-right of the screen
2. The y-axis runs from the top-left to the bottom-right of the screen

The conversion between isometric coordinates and screen coordinates is:
```
screen_x = (iso_x - iso_y) * tile_width / 2
screen_y = (iso_x + iso_y) * tile_height / 2
```

## Extending the Game

Here are some ideas for extending this basic implementation:

- Add different tile types (water, grass, walls)
- Implement basic collision detection with obstacles
- Add simple enemies or NPCs
- Implement a basic inventory system
- Add sound effects and background music using ggez's audio capabilities

## Troubleshooting

### Common Issues

1. **Missing dependencies**: If you encounter errors about missing system libraries, check the [ggez platform-specific dependencies](https://github.com/ggez/ggez/blob/master/docs/BuildingForEveryPlatform.md).

2. **Resource loading errors**: Make sure your images are in the correct format and placed in the `resources` directory. The paths are relative to the project root.

3. **Rendering issues**: If the isometric grid doesn't look right, try adjusting the tile dimensions in the `GameState` struct.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [ggez](https://ggez.rs/) game framework
- [Rust Game Development](https://arewegameyet.rs/) community
