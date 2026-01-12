<script setup>
import { defineProps, defineEmits } from 'vue';
import invite from './Invite.vue'
import rank from './Rank.vue'

defineProps({
  score: {
    type: Number,
    required: true,
  },
  wpm: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(['play-again']);

const playAgain = () => {
  emit('play-again');
};
</script>

<template>
  <div class="game-over-container">
    <h1>Game Over.</h1>
    <div class="stats-container">
      <div class="stat">
        <label>Score</label>
        <div class="value">{{ score }}</div>
      </div>
      <div class="stat">
        <label>WPM</label>
        <div class="value">{{ wpm }}</div>
      </div>
    </div>

    <div class="button-group">
      <button @click="playAgain" class="play-again-button">Play Again</button>
    </div>

    <div class="invite-section">
       <rank 
          :score="score"
          :wpm="wpm"/>
    </div>

    <div class="invite-section">
       <invite/>
    </div>
    <div class="footer">
      For support, please contact <a href="mailto:support@type-fast.net">support@type-fast.net</a> <br/>
      For advertising, please contact <a href="mailto:commerce@type-fast.net">commerce@type-fast.net</a>
    </div>
  </div>
</template>

<style scoped>
.game-over-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  background-color: #1a1a1a;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  color: white;
}

h1 {
  font-size: 3em;
  color: #a0d8f0;
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
  margin-bottom: 20px;
}

.stats-container {
  display: flex;
  gap: 40px;
  margin-bottom: 30px;
}

.stat {
  text-align: center;
}

.stat .label {
  font-size: 1.2em;
  color: #ccc;
}

.stat .value {
  font-size: 2.5em;
  font-weight: bold;
  color: #4CAF50;
}

.button-group {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
}

.play-again-button {
  border: none;
  padding: 15px 32px;
  text-align: center;
  font-size: 1.5em;
  cursor: pointer;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  transition: all 0.2s ease-in-out;
  background-color: #a0d8f0;
  color: #1a1a1a;
}

.play-again-button:hover {
    background-color: #8ac9e2;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0,0,0,0.3);
}


.invite-section {
  margin-top: 20px;
  text-align: center;
  padding: 20px;
  background-color: #2a2a2a;
  border-radius: 12px;
  width: 100%;
  max-width: 800px;
}

.invite-section p {
  color: #ccc;
  font-size: 1.1em;
  margin-bottom: 20px;
}

.invite-buttons {
  display: flex;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
}

button:hover {
  background-color: #ffca2c;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0,0,0,0.3);
}

.footer {
  font-size: 0.8em;
}
</style>
