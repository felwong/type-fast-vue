<script setup>
import { ref, onUnmounted } from 'vue';
import TextStream from './components/TextStream.vue'
import Keyboard from './components/Keyboard.vue'

// --- State Management ---
const sentence = "the quick brown fox jumps over the lazy dog";
const chars = ref(Array(15).fill('')); // The character stream display
const delay = ref(0.8); // Time in seconds between character shifts
const score = ref(0);
const gameOver = ref(false);
const gameStarted = ref(false);

// Internal state
let charIndex = 0; // Current position in the sentence
let gameInterval = null;

// --- Game Lifecycle ---

const startGame = () => {
  gameStarted.value = true;
  resetGame();
};

const resetGame = () => {
  // Clear the game state
  chars.value = Array(15).fill('');
  score.value = 0;
  charIndex = 0;
  gameOver.value = false;

  // Clear any existing game loop
  if (gameInterval) {
    clearInterval(gameInterval);
  }
  
  // Start the main game loop
  gameInterval = setInterval(gameTick, delay.value * 1000);
};

// --- Core Game Logic ---

// This function runs every `delay` seconds.
const gameTick = () => {
  // 1. CHECK FOR GAME OVER
  // If a character exists at the far left, it means the user failed to type it in time.
  const firstChar = chars.value[0];
  if (firstChar && firstChar !== ' ') {
    gameOver.value = true;
    clearInterval(gameInterval);
    return; // Stop the game
  }

  // 2. SHIFT THE STREAM
  chars.value.shift();
  
  // 3. ADD A NEW CHARACTER
  if (charIndex >= sentence.length) {
    charIndex = 0;
  }
  const nextChar = sentence[charIndex];
  chars.value.push(nextChar);
  charIndex++;
};

// This function runs every time the user presses a key.
const handleKeyPress = (key) => {
  if (gameOver.value || key.length > 1) {
    return;
  }

  // Find the first character in the stream that is not a space.
  const targetCharIndex = chars.value.findIndex(c => c && c !== ' ');
  
  if (targetCharIndex !== -1) {
    const targetChar = chars.value[targetCharIndex];
    
    // Check for a match with the target character, ignoring case.
    if (targetChar.toLowerCase() === key.toLowerCase()) {
      // SUCCESS!
      score.value++;
      
      // Clear the matched character from the stream.
      chars.value[targetCharIndex] = '';
    }
  }
};

// --- Component Cleanup ---
onUnmounted(() => {
  if (gameInterval) {
    clearInterval(gameInterval);
  }
});

</script>

<template>
  <div id="app-container">
    <div v-if="!gameStarted" class="start-container">
        <button @click="startGame" class="start-button">Start Game</button>
    </div>
    
    <div v-else>
      <div class="score-display">Score: {{ score }}</div>
      <TextStream 
        :chars="chars" 
        :gameOver="gameOver" 
        :delay="delay" 
        @reset="resetGame" 
        @update:delay="delay = $event" 
      />
      <Keyboard @keyPress="handleKeyPress" />
    </div>
  </div>
</template>

<style scoped>
#app-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 20px;
  box-sizing: border-box;
  text-align: center;
}

.start-button {
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 24px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  transition: all 0.2s ease-in-out;
}

.start-button:hover {
    background-color: #45a049;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0,0,0,0.3);
}

.score-display {
  color: #a0d8f0;
  font-size: 2em;
  font-weight: bold;
  margin-bottom: 20px;
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
}
</style>