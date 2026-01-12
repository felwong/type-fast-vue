<template>
  <div class="main-container">
    <div v-if="gameOver" class="game-over">
      Game Over
    </div>
    <div class="text-stream-container">
      <div 
        v-for="(char, index) in chars"
        :key="index"
        :style="getBoxStyle(index)"
        :class="{'char-box':true,'glowing-textbox':glowing(index)}"
      >
        {{ char }}
      </div>
    </div>
    <div class="controls">
      <label for="delay-input">Animation Delay (s)</label>
      <input id="delay-input" type="number" :value="delay" @input="$emit('update:delay', parseFloat($event.target.value))" step="0.1" />
      <button @click="$emit('reset')">Reset</button>
    </div>
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

const getBoxStyle = (index) => {
    const gradientIntensity = 1 - (index / (props.chars.length -1));
    const redValue = Math.floor(255 * gradientIntensity * 0.3);
    return {
        background: `linear-gradient(to right, rgba(${redValue}, 0, 0, ${gradientIntensity * 0.5}), #2a2a2a)`
    }
}

const glowing = (index) => {
  return index==0;
}

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
  border: 1px solid #444;
  border-radius: 6px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  color: #fff;
  padding: 10px;
  margin: 5px;
  width: 40px;
  height: 40px;
  text-align: center;
  font-family: 'Roboto Mono', monospace;
  font-size: 24px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
}

.controls {
  margin-top: 20px;
  color: #fff;
  text-align: center;
  display:none;
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

.glowing-textbox {
  box-shadow: 0 0 10px rgba(255, 0, 0, 0.8); 
  
  /* Optional: you can also set a subtle red border to match */
  border: 1px solid red;
}
</style>
