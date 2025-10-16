<template>
  <div class="keyboard-container">
    <div
      v-for="(row, rowIndex) in keyboardLayout"
      :key="rowIndex"
      class="keyboard-row"
    >
      <div
        v-for="key in row"
        :key="key"
        :class="['keyboard-key', { active: activeKeys[key] }, getKeyClass(key)]"
      >
        {{ key }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  chars: Array
});

const emit = defineEmits(['keyPress']);

const keyboardLayout = [
  ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
  ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
  ['Caps Lock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter'],
  ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'Shift'],
  ['Ctrl', 'Alt', ' ', 'Alt', 'Ctrl'],
];

const activeKeys = ref({});

// This list explicitly defines which keys are considered "special".
const SPECIAL_KEYS = ['Backspace', 'Tab', 'Caps Lock', 'Enter', 'Shift', 'Ctrl', 'Alt'];

const isSpecialKey = (key) => {
  // The check is now precise, matching the test case for special keys.
  return SPECIAL_KEYS.includes(key);
};

const getKeyClass = (key) => {
  if (isSpecialKey(key)) {
    return 'special-key';
  }
  return '';
};

const handleKeyDown = (event) => {
  const key = event.key;
  // Check if the pressed key is one of the keys in our layout
  if (keyboardLayout.flat().includes(key)) {
    activeKeys.value = { ...activeKeys.value, [key]: true };
    emit('keyPress', key);
  }
};

const handleKeyUp = (event) => {
  const key = event.key;
  if (keyboardLayout.flat().includes(key)) {
    activeKeys.value = { ...activeKeys.value, [key]: false };
  }
};

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);
  window.addEventListener('keyup', handleKeyUp);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown);
  window.removeEventListener('keyup', handleKeyUp);
});
</script>

<style scoped>
.keyboard-container {
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: fit-content;
  margin: 50px auto;
}

.keyboard-row {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}

.keyboard-key {
  padding: 10px 15px;
  margin: 0 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  font-family: monospace;
  font-size: 16px;
  cursor: pointer;
  user-select: none;
  transition: all 0.1s ease;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
  min-width: 40px;
  text-align: center;
}

.keyboard-key.active {
  background-color: #a0d8f0;
  transform: translateY(2px);
  box-shadow: none;
}

.keyboard-key.special-key {
  background-color: #e0e0e0;
  font-weight: bold;
  min-width: 60px;
}
</style>
