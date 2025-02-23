import type { Position, NumberPosition, Direction, GameConfig } from './types';
import { GameState } from './types';

export class SnakeGame {
	private snake: Position[];
	private numbers: NumberPosition[];
	private direction: Direction;
	private gameState: GameState;
	private collectedNumbers: string[];
	private config: GameConfig;
	private ctx: CanvasRenderingContext2D | null;

	constructor(config: GameConfig) {
		this.config = config;
		this.snake = [config.initialSnakePosition];
		this.numbers = [];
		this.direction = config.initialDirection;
		this.gameState = GameState.READY;
		this.collectedNumbers = [];
		this.ctx = null;
	}

	public setContext(ctx: CanvasRenderingContext2D): void {
		this.ctx = ctx;
	}

	public getState(): GameState {
		return this.gameState;
	}

	public getCollectedNumbers(): string[] {
		return this.collectedNumbers;
	}

	private get cells(): number {
		return this.config.canvasSize / this.config.gridSize;
	}

	private isNumberAtPosition(pos: Position): boolean {
		return this.numbers.some(num => num.x === pos.x && num.y === pos.y);
	}

	public generateNewNumber(collectedDigit: string): void {
		let newPos: Position;

		do {
			newPos = this.generateNumberPosition();
		} while (this.checkCollision(newPos) || this.isNumberAtPosition(newPos));

		this.numbers.push({ ...newPos, value: collectedDigit });
	}


	private generateNumberPosition(): Position {
		const x: number = Math.floor(Math.random() * (this.cells - 2)) + 1;
		const y: number = Math.floor(Math.random() * (this.cells - 2)) + 1;
		return { x, y };
	}

	public initialiseNumbers(): void {
		this.numbers = [];

		const digits = '0123456789'.split('');

		for (let i = digits.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[digits[i], digits[j]] = [digits[j], digits[i]];
		}

		while (this.numbers.length < 10) {
			const newPos = this.generateNumberPosition();

			// Ensure unique positions and no overlap with snake
			if (!this.checkCollision(newPos) && !this.isNumberAtPosition(newPos)) {
				this.numbers.push({
					...newPos,
					value: digits[this.numbers.length]  // Assign unique digit
				});
			}
		}
	}

	public changeDirection(newDirection: Direction): void {
		const invalidMoves = {
			up: 'down',
			down: 'up',
			left: 'right',
			right: 'left'
		};

		if (invalidMoves[newDirection] !== this.direction) {
			this.direction = newDirection;
		}
	}

	private checkCollision(position: Position): boolean {
		return this.snake.some(segment =>
			segment.x === position.x && segment.y === position.y
		);
	}

	private moveSnake(): void {
		const head: Position = { ...this.snake[0] };

		switch(this.direction) {
			case 'up':
				head.y--;
				break;
			case 'down':
				head.y++;
				break;
			case 'left':
				head.x--;
				break;
			case 'right':
				head.x++;
				break;
		}

		if (head.x < 0 || head.x >= this.cells || head.y < 0 || head.y >= this.cells) {
			this.gameState = GameState.GAME_OVER;
			return;
		}

		if (this.checkCollision(head)) {
			this.gameState = GameState.GAME_OVER;
			return;
		}

		this.snake.unshift(head);

		const numberIndex: number = this.numbers.findIndex(num =>
			num.x === head.x && num.y === head.y
		);

		if (numberIndex !== -1) {
			const collectedDigit = this.numbers[numberIndex].value;
			this.collectedNumbers.push(collectedDigit);
			this.numbers.splice(numberIndex, 1);

			if (this.collectedNumbers.length === 10) {
				this.gameState = GameState.SUCCESS;
				return;
			}

			this.generateNewNumber(collectedDigit);
		} else {
			this.snake.pop();
		}
	}

	public draw(): void {
		if (!this.ctx) return;

		this.ctx.fillStyle = '#1a1a1a';
		this.ctx.fillRect(0, 0, this.config.canvasSize, this.config.canvasSize);

		this.ctx.fillStyle = '#4ade80';
		this.snake.forEach(segment => {
			if (!this.ctx) return;
			this.ctx.fillRect(
				segment.x * this.config.gridSize,
				segment.y * this.config.gridSize,
				this.config.gridSize - 1,
				this.config.gridSize - 1
			);
		});

		if (!this.ctx) return;
		this.ctx.fillStyle = '#ffffff';
		this.ctx.font = '16px Arial';
		this.numbers.forEach(num => {
			if (!this.ctx) return;
			this.ctx.fillText(
				num.value,
				num.x * this.config.gridSize + 5,
				num.y * this.config.gridSize + 15
			);
		});
	}

	public update(): void {
		if (this.gameState === GameState.PLAYING) {
			this.moveSnake();
			this.draw();
		}
	}

	public start(): void {
		this.snake = [this.config.initialSnakePosition];
		this.direction = this.config.initialDirection;
		this.collectedNumbers = [];
		this.gameState = GameState.PLAYING;
		this.initialiseNumbers();
	}

	public pause(): void {
		this.gameState = GameState.PAUSED;
	}

	public resume(): void {
		this.gameState = GameState.PLAYING;
	}
}