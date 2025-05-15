use ggez::{
    conf,
    event,
    graphics::{self, Color, DrawParam, Image},
    input::keyboard::{Keycode, KeyInput},
    mint::Point2,
    Context, GameResult,
};
use std::path;

struct GameState {
    player_iso_pos: Point2<f32>,
    player_speed: f32,
    tile_width: f32,
    tile_height: f32,
    player_image: Image,
    floor_image: Image,
    map_size: (usize, usize),
    map: Vec<Vec<i32>>,
}

    
