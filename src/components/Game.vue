<script setup>
import { ref, onUnmounted, computed, watch, onMounted } from 'vue';
import TextStream from './TextStream.vue'
import Keyboard from './Keyboard.vue'
import GameOver from './GameOver.vue'
import $ from 'jquery';


// --- State Management ---

const textStream = ref([]);
const chars = ref(Array(15).fill('')); // The character stream display
const delay = ref(0.8); // Time in seconds between character shifts
const score = ref(0);
const gameOver = ref(false);
const gameStarted = ref(false);
const wpm = ref(0);
const startTime = ref(0);

// --- New Game Mode Switches ---

const isCaseSensitive = ref(false);

const fetchTextStream = () => {
  $.ajax({
    url: '/api/game/start',
    type: 'POST',
    contentType: "application/json;charset=utf-8",
    dataType: "json",
    success: function(result) {
      textStream.value.push(...result);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.error("AJAX call failed:", textStatus, errorThrown);
      // Handle error, maybe with a default sentence
      if (textStream.value.length === 0) {
        textStream.value.push("The quick brown fox jumps over the lazy dog.");
      }
    }
  });
};

onMounted(() => {
    console.log("fetching");
    fetchTextStream();
});


// Internal state
let charIndex = 0; // Current position in the sentence
let currentSentence = '';
let gameInterval = null;
let wpmInterval = null;

// --- Watchers for Game Restarts ---

watch(isCaseSensitive, () => {
  if (gameStarted.value) {
    resetGame();
  }
});

watch(score, (newScore) => {
  if (newScore > 0 && newScore % 50 === 0) {
    const newDelay = Math.max(0.05, delay.value * 0.9);
    if (newDelay !== delay.value) {
      delay.value = newDelay;
      clearInterval(gameInterval);
      gameInterval = setInterval(gameTick, delay.value * 1000);
    }
  }
});


// --- Helper Functions ---

const calculateWPM = () => {
  const elapsedTime = (Date.now() - startTime.value) / 1000 / 60; // in minutes
  if (elapsedTime > 0) {
    wpm.value = Math.round((score.value / 5) / elapsedTime);
  }
}


// --- Game Lifecycle ---


const startGame = () => {
  gameStarted.value = true;
  resetGame();
};

const resetGame = () => {
  // Clear the game state
  chars.value = Array(15).fill('');
  score.value = 0;
  wpm.value = 0;
  charIndex = 0;
  currentSentence = '';
  gameOver.value = false;
  startTime.value = Date.now();

  // Clear any existing game loop
  if (gameInterval) {
    clearInterval(gameInterval);
  }
  if (wpmInterval) {
    clearInterval(wpmInterval);
  }

  if(textStream.value.length === 0) {
      fetchTextStream();
  }
  
  // Start the main game loop
  gameInterval = setInterval(gameTick, delay.value * 1000);
  wpmInterval = setInterval(calculateWPM, 2000);
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
    clearInterval(wpmInterval);
    return; // Stop the game
  }

  // 2. SHIFT THE STREAM
  chars.value.shift();
  
  // 3. ADD A NEW CHARACTER
  if (charIndex >= currentSentence.length) {
      if (textStream.value.length > 0) {
          currentSentence = textStream.value.shift();
          if (textStream.value.length < 5) {
              fetchTextStream();
          }
      } else {
          // If the stream is empty, fetch more and wait.
          fetchTextStream();
          currentSentence = ""; 
      }
      charIndex = 0;
  }
  
  const nextChar = currentSentence[charIndex];
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
    
    const isMatch = isCaseSensitive.value 
      ? targetChar === key
      : targetChar.toLowerCase() === key.toLowerCase();

    if (isMatch) {
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
  if (wpmInterval) {
    clearInterval(wpmInterval);
  }
});

</script>

<template>
  <div id="app-container">
    <div v-if="!gameStarted" class="start-container">
      <button @click="startGame" class="start-button">Start Game</button>
    </div>

    <div v-else-if="!gameOver" class="game-container">
      <div class="game-options">
        <div class="switch-container">
          <label class="switch">
            <input type="checkbox" v-model="isCaseSensitive">
            <span class="slider round"></span>
          </label>
          <span>Case Sensitive</span>
        </div>
      </div>

      <div class="score-display">Score: {{ score }} | WPM: {{ wpm }}</div>
      <TextStream 
          :chars="chars" 
          :gameOver="gameOver" 
          :delay="delay" 
          @update:delay="delay = $event" 
      />
      <Keyboard @keyPress="handleKeyPress" :isPunctuation="true" />
    </div>
    
    <GameOver 
      v-else 
      :score="score" 
      :wpm="wpm" 
      @play-again="resetGame" 
    />
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

.start-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
}

.game-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
}

.game-options {
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
  background-color: #2a2a2a;
  padding: 15px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  margin-bottom: 10px;
}

.switch-container {
  display: flex;
  align-items: center;
  gap: 10px;
  color: white;
  font-size: 14px;
}

.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 28px;
}

.switch input { 
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #4CAF50;
}

input:focus + .slider {
  box-shadow: 0 0 1px #4CAF50;
}

input:checked + .slider:before {
  -webkit-transform: translateX(22px);
  -ms-transform: translateX(22px);
  transform: translateX(22px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 28px;
}

.slider.round:before {
  border-radius: 50%;
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
  margin-bottom: 0;
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
}
</style>