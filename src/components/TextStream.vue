<template>
  <div class="main-container">
    <div v-if="gameOver" class="game-over">
      Game Over
    </div>
    <div class="text-stream-container">
      <div v-for="(char, index) in chars" :key="index" class="char-box">
        {{ char }}
      </div>
    </div>
    <div class="controls">
      <label for="delay-input">Animation Delay (s)</label>
      <input id="delay-input" type="number" :value="delay" @input="$emit('update:delay', parseFloat($event.target.value))" step="0.1" />
      <button @click="$emit('reset')">Reset</button>
    </div>
    <audio ref="losingAudio" src="https://soundbible.com/mp3/fail-trombone-01.mp3"></audio>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  chars: Array,
  gameOver: Boolean,
  delay: Number
});

defineEmits(['reset', 'update:delay']);

const losingAudio = ref(null);

watch(() => props.gameOver, (isGameOver) => {
  if (isGameOver) {
    if (losingAudio.value) {
      losingAudio.value.play();
    }
  }
});
</script>

<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.text-stream-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.char-box {
  background-color: #2a2a2a;
  border: 1px solid #444;
  border-radius: 6px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  color: #fff;
  padding: 10px;
  margin: 5px;
  width: 40px;
  height: 40px;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
}

.controls {
  margin-top: 20px;
  color: #fff;
  text-align: center;
}

#delay-input {
  background-color: #2a2a2a;
  border: 1px solid #444;
  border-radius: 5px;
  color: #fff;
  padding: 8px;
  margin-left: 10px;
  width: 70px;
}

label {
  font-weight: 600;
}

.game-over {
  color: red;
  font-size: 2em;
  font-weight: bold;
  margin-bottom: 20px;
}

button {
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 5px;
}
</style>
