<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { browser } from '$app/environment';
	import type { Direction } from './types';
	import { GameState } from './types';
	import { SnakeGame } from './game';

	let canvas: HTMLCanvasElement;
	let gameLoop: number | null = null;
	let isLoaded: boolean = false;
	let game: SnakeGame | null = null;
	let isMounted: boolean = false;
	let collectedDigits: string[] = [];
	let currentGameState = GameState.READY;  // Add this line to track game state
	const TOTAL_DIGITS = 10;

	const gameConfig = {
		gridSize: 20,
		canvasSize: 400,
		gameSpeed: 150,
		initialSnakePosition: { x: 10, y: 10 },
		initialDirection: 'right' as Direction
	};

	function handleKeydown(event: KeyboardEvent): void {
		if (['w', 'a', 's', 'd', 'W', 'A', 'S', 'D'].includes(event.key)) {
			event.preventDefault();
		}

		const directions: { [key: string]: Direction } = {
			w: 'up',
			W: 'up',
			s: 'down',
			S: 'down',
			a: 'left',
			A: 'left',
			d: 'right',
			D: 'right'
		};

		const newDirection = directions[event.key];
		if (newDirection && game) {
			game.changeDirection(newDirection);
		}
	}

	function formatPhoneNumber(digits: string[]): string {
		const placeholder = Array(TOTAL_DIGITS).fill('_');
		digits.forEach((digit, index) => {
			placeholder[index] = digit;
		});
		return placeholder.join(' ');
	}

	function initializeGame(): void {
		if (!browser || !canvas) return;

		game = new SnakeGame(gameConfig);
		const ctx = canvas.getContext('2d');
		if (ctx) {
			game.setContext(ctx);
			game.draw();
		}
		currentGameState = GameState.READY;  // Set initial state
	}

	function checkGameState(): void {
		if (!game) return;

		const newState = game.getState();
		currentGameState = newState;  // Update the current state

		if (newState === GameState.GAME_OVER || newState === GameState.SUCCESS) {
			if (gameLoop) {
				clearInterval(gameLoop);
				gameLoop = null;
			}
		}

		// Update collected digits
		collectedDigits = game.getCollectedNumbers();
	}

	function startGame(): void {
		collectedDigits = [];
		currentGameState = GameState.PLAYING;  // Set state to playing

		initializeGame();

		if (!game) {
			console.error("Game failed to initialize");
			return;
		}

		if (gameLoop) {
			clearInterval(gameLoop);
			gameLoop = null;
		}

		game.start();

		gameLoop = window.setInterval(() => {
			if (game && game.getState() === GameState.PLAYING) {
				game.update();
				checkGameState();
			}
		}, gameConfig.gameSpeed);
	}

	onMount(() => {
		if (!browser) return;

		isMounted = true;
		initializeGame();

		window.addEventListener('keydown', handleKeydown);

		setTimeout(() => {
			isLoaded = true;
		}, 100);
	});

	onDestroy(() => {
		if (!browser) return;

		if (gameLoop) {
			clearInterval(gameLoop);
			gameLoop = null;
		}

		window.removeEventListener('keydown', handleKeydown);
	});
</script>

<div class="game-container">
	{#if isLoaded}
		<div in:fade={{ duration: 1000 }} class="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
			<h1 class="text-4xl font-bold text-white mb-8">Snake Dialer</h1>

			<div class="flex flex-col items-center space-y-8">
				<div class="relative">
					<canvas
						bind:this={canvas}
						width={gameConfig.canvasSize}
						height={gameConfig.canvasSize}
						class="border-4 border-gray-700 rounded-lg shadow-lg transform transition-transform hover:scale-[1.02]"
					/>

					{#if currentGameState === GameState.READY}
						<div
							class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 bg-gray-800/90 rounded-lg p-6 text-center"
							in:fly={{ y: 20, duration: 500 }}
						>
							<h2 class="text-2xl font-bold text-white mb-4">Ready to Play?</h2>
							<button
								on:click={startGame}
								class="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transform transition-transform hover:scale-105 active:scale-95 shadow-lg w-full"
							>
								Start Game
							</button>
						</div>
					{/if}

					{#if currentGameState === GameState.GAME_OVER}
						<div
							class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 bg-gray-800/90 rounded-lg p-6 text-center"
							in:fly={{ y: 20, duration: 500 }}
						>
							<h3 class="text-2xl font-bold text-red-400 mb-2">Failed!</h3>
							<p class="text-gray-300 mb-4">Couldn't dial a valid number, only {collectedDigits.length} digits found</p>
							<button
								on:click={startGame}
								class="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transform transition-transform hover:scale-105 active:scale-95 shadow-lg w-full"
							>
								Play Again
							</button>
						</div>
					{/if}

					{#if currentGameState === GameState.SUCCESS}
						<div
							class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 bg-gray-800/90 rounded-lg p-6 text-center"
							in:fly={{ y: 20, duration: 500 }}
						>
							<h3 class="text-2xl font-bold text-green-400 mb-2">Success!</h3>
							<p class="text-gray-300 mb-4">Calling the person right away!! :)</p>
							<button
								on:click={startGame}
								class="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transform transition-transform hover:scale-105 active:scale-95 shadow-lg w-full"
							>
								Play Again
							</button>
						</div>
					{/if}

					<div class="mt-8 text-center space-y-4">
						<div
							class="bg-gray-800 rounded-lg p-4 shadow-lg"
							in:fly={{ y: 20, duration: 1000 }}
						>
							<h2 class="text-xl font-semibold mb-2 text-white">Collected Digits</h2>
							<p class="text-2xl font-mono tracking-wider text-green-400">
								{formatPhoneNumber(collectedDigits)}
							</p>
						</div>
					</div>
				</div>

				<div
					class="bg-gray-800 rounded-lg p-4 max-w-md w-full"
					in:fly={{ y: 20, duration: 1000 }}
				>
					<h3 class="text-lg font-semibold mb-2 text-white">How to Play</h3>
					<ul class="space-y-2 text-gray-300">
						<li>• Use WASD keys to control the snake</li>
						<li>• Collect numbers to build a phone number</li>
						<li>• Avoid hitting walls and yourself</li>
					</ul>
				</div>
			</div>
		</div>
	{/if}
</div>