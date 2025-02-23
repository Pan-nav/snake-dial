export interface Position {
	x: number;
	y: number;
}

export interface NumberPosition extends Position {
	value: string;
}

export type Direction = 'up' | 'down' | 'left' | 'right';

export enum GameState {
	READY = 'ready',
	PLAYING = 'playing',
	PAUSED = 'paused',
	GAME_OVER = 'gameOver',
	SUCCESS = 'success'  // Added new state
}

export interface GameConfig {
	gridSize: number;
	canvasSize: number;
	gameSpeed: number;
	initialSnakePosition: Position;
	initialDirection: Direction;
}