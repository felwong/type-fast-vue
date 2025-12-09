<script setup>
import { defineProps, defineEmits } from 'vue';

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
    <h1>Game Over</h1>
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

    <div class="donation-section">
      <p>Your support is needed to keep our project running.</p>
      <div class="donation-buttons">
        <a href="https://buy.stripe.com/test_eVqeVceSF4us6oPb24g3601" target="_blank" rel="noopener noreferrer" class="donate-link">Donate AUD$1</a>
        <a href="https://buy.stripe.com/test_bJecN4dOB6CA5kL2vyg3602" target="_blank" rel="noopener noreferrer" class="donate-link">Donate AUD$2</a>
        <a href="https://buy.stripe.com/test_00w14m8uh3qo7sT7PSg3603" target="_blank" rel="noopener noreferrer" class="donate-link">Donate AUD$5</a>
      </div>
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

.donation-section {
  margin-top: 20px;
  text-align: center;
  padding: 20px;
  background-color: #2a2a2a;
  border-radius: 12px;
  width: 100%;
  max-width: 450px;
}

.donation-section p {
  color: #ccc;
  font-size: 1.1em;
  margin-bottom: 20px;
}

.donation-buttons {
  display: flex;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
}

.donate-link {
  display: inline-block;
  background-color: #ffc107;
  color: #1a1a1a;
  padding: 12px 24px;
  font-size: 1.1em;
  font-weight: bold;
  text-decoration: none;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  transition: all 0.2s ease-in-out;
}

.donate-link:hover {
  background-color: #ffca2c;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0,0,0,0.3);
}
</style>
