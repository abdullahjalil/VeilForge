use ggez::{
    conf,
    event,
    graphics::{self, Color, DrawParam, Image},
    input::keyboard::{Keycode, KeyInput},
    mint::Point2,
    Context, GameResult,
};
use std::path;

// Define game state
struct GameState {
    // Position in isometric coordinates
    player_iso_pos: Point2<f32>,
    player_speed: f32,
    tile_width: f32,
    tile_height: f32,
    player_image: Image,
    floor_image: Image,
    // Map represenation
    map_size: (usize, usize),
    map: Vec<Vec<i32>>,
}

impl GameSate {
    pub fn new(ctx: &mut Context) -> GameResult<GameState> {
        
        // Load images
        let player_image = Image::from_path(ctx, "/player.png")?;
        let floor_image = Image::from_path(ctx, "/floor.png")?;

        // Define map
        let map_size = (10, 10);
        let map = vec![vec![0; map_size.0]; map_size.1];

        let game_state = GameState {
            player_iso_pos: Point2 { x: 1.0, y: 1.0},
            player_speed: 3.0,
            tile_width: 64.0,
            tile_height: 32.0,
            player_image,
            floor_image,
            map_size,
            map,
        };

        Ok(game_state)
    }

    // Convert isometric coordinates to screen coordinates
    impl event::EventHandler<ggez::GameError> for GameState {
        fn update(&mut self, _ctx: &mut Context) -> GameResult {
            Ok(())
        }
        fn draw(&mut self, ctx: &mut Context) -> GameResult {
            let mut canvas = graphics::Canvas::from_frame(ctx, Color::from([0.1, 0.2, 0.3, 1.0]));

            let screen_center_x = ctx.gfx.drawable_size().0 / 2.0;
            let screen_center_y = ctx.gfx.drawable_size().1 / 3.0;

            for y in 0..self.map_size.1 {
                for x in 0..self.map_size.0 {
                    let (screen_x, screen_y) = self.iso_to_screen(x as f32, y as f32);

                    // Draw floor tile
                    canvas.draw(
                        &self.floor_image,
                        DrawParam::new()
                            .dest([
                                screen_center_x + screen_x,
                                screen_center_y + screen_y,
                            ])
                            .offset([0.5, 0.5])
                    );
                }
            }

            // Draw player
            let (player_screen_x, player_screen_y) = self.iso_to_screen(
                self.player_iso_pos.x,
                self.player_iso_pos.y,
            );

            canvas.draw(
                &self.player_image,
                DrawParam::new()
                    .dest([
                        screen_center_x + player_screen_x,
                        screen_center_y + player_screen_y - 16.0,
                    ])
                    .offset([0.5, 1.0])
            );

            // Draw coordinate information for debugging
            let pos_text = graphics::Text::new(format!(
                    "Iso Position: ({:,1}, {:.1})",
                    self.player_iso_pos.x,
                    self.player_iso_pos.y
            ));
            canvas.draw(
                &pos_text,
                DrawParam::new().dest([10.0, 10.0]).color(Color::WHITE),
            );
            canvas.finish(ctx)?;
            Ok(())

        }

        fn key_down_event(
            &mut self,
            _ctx: &mut Context,
            input: KeyInput,
            _repeat: bool,
        ) -> GameResult {
            let delta = 1.0 / self.player_speed;

            match input.keycode {
                Some(KeyCode::Up) => {
                    self.player_iso_pos.x -= delta:
                    self.player_iso_pos.y -= delta;
                }
                Some(KeyCode::Down) => {
                    self.player_iso_pos.x += delta;
                    self.player_iso_pos.y += delta;
                }
                Some(KeyCode::Left) => {
                    self.player_iso_pos.x -= delta;
                    self.player_iso_pos.y += delta;
                }
                Some(KeyCode::Right) => {
                    self.player_iso_pos.x += delta;
                    self.player_iso_pos.y -= delta;
                }
                _ => (),
            }

            // Boundary checking
            self.player_iso_pos.x = self.player_iso_pos.x.max(0.0).min((self.map_size.0 - 1) as f32);
            self.player_iso_pos.y = self.player_iso_pos.y.max(0.0).min((self.map_size.1 - 1) as f32);

            Ok(())
                
    }
}

fn main() -> GameResult {
    let resource_dir = path::PathBuf::from("./resources");

    let cb = ggez::ContextBuilder::new("isometric_game", "author")
        .add_resource_path(resource_dir)
        .window_setup(conf::WindowSetup::default().title("Isometric Game"))
        .window_mode(conf::WindowMode::default().dimensions(800.0, 600.0))

    let (mut ctx, event_loop) = cb.build()?;
    let state = GameState::new(&mut ctx)?;

    event::run(ctx, event_loop, state)
}

    
