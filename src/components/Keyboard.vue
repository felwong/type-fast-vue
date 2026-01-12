<template>
  <div class="keyboard-container">
    <div
      v-for="(row, rowIndex) in displayedKeyboard"
      :key="rowIndex"
      class="keyboard-row"
    >
      <div
        v-for="key in row"
        :key="key"
        :class="getKeyClass(key)"
        @click="() => handleMouseClick(key)"
      >
        {{ key }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';

const props = defineProps({
  isPunctuation: Boolean,
});

const emit = defineEmits(['keyPress']);

const isShiftPressed = ref(false);
const isCapsLockOn = ref(false);

const lowercaseLayout = [
  ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
  ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
  ['Caps Lock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter'],
  ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'Shift'],
  ['Ctrl', 'Alt', ' ', 'Alt', 'Ctrl'],
];

const uppercaseLayout = [
  ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'Backspace'],
  ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '|'],
  ['Caps Lock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', 'Enter'],
  ['Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', 'Shift'],
  ['Ctrl', 'Alt', ' ', 'Alt', 'Ctrl'],
];

const activeKeys = ref({});

const displayedKeyboard = computed(() => {
  if (isShiftPressed.value) {
    return props.isPunctuation ? uppercaseLayout : lowercaseLayout.map(row => row.map(key => key.toUpperCase()));
  }
  if (isCapsLockOn.value) {
      const capsLockLayout = JSON.parse(JSON.stringify(lowercaseLayout));
      return capsLockLayout.map(row => row.map(key => {
          if (key.length === 1 && key >= 'a' && key <= 'z') {
              return key.toUpperCase();
          }
          return key;
      }));
  }
  return lowercaseLayout;
});

const getKeyClass = (key) => {
  const baseClass = 'keyboard-key';
  let specialClass = '';

  if (key.length > 1 && key !== ' ') {
      specialClass = 'special-key';
  }
  if (key === ' ') {
      specialClass = 'space-key';
  }

  const lowerKey = key.toLowerCase();
  const upperKey = key.toUpperCase();

  const isActive = activeKeys.value[lowerKey] || activeKeys.value[upperKey] || (key === ' ' && activeKeys.value[' ']);

  return [baseClass, specialClass, { active: isActive }];
};

const handleMouseClick = (key) => {
    if (key.length === 1) {
        emit('keyPress', key);
    }
}

const handleKeyDown = (event) => {
  const { key, code } = event;

  if (key === 'Shift') {
    isShiftPressed.value = true;
  }

  if (key === 'CapsLock') {
    isCapsLockOn.value = event.getModifierState("CapsLock");
  }

  let keyForActivity = key;
  if (code.startsWith('Key')) {
    keyForActivity = code.substring(3).toLowerCase();
  } else if (['Space', 'Tab', 'Enter', 'Backspace', 'Control', 'Alt', 'Shift'].includes(key)) {
      keyForActivity = key;
  } else {
      keyForActivity = key;
  } 

  if(key === " ") keyForActivity = key;

  activeKeys.value = { ...activeKeys.value, [keyForActivity]: true };
  emit('keyPress', key);
};

const handleKeyUp = (event) => {
  const { key, code } = event;

  if (key === 'Shift') {
    isShiftPressed.value = false;
  }

  if (key === 'CapsLock') {
    isCapsLockOn.value = event.getModifierState("CapsLock");
  }

  let keyForActivity = key;
  if (code.startsWith('Key')) {
    keyForActivity = code.substring(3).toLowerCase();
  } else if (['Space', 'Tab', 'Enter', 'Backspace', 'Control', 'Alt', 'Shift'].includes(key)) {
      keyForActivity = key;
  } else {
      keyForActivity = key;
  }

  if(key === " ") keyForActivity = key;
  
  activeKeys.value = { ...activeKeys.value, [keyForActivity]: false };

};

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);
  window.addEventListener('keyup', handleKeyUp);
  try {
    isCapsLockOn.value = event.getModifierState("CapsLock");
  } catch(e) {
    //
  }
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown);
  window.removeEventListener('keyup', handleKeyUp);
});
</script>

<style scoped>
.keyboard-container {
  padding: 20px;
  background-color: #2a2a2a;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
  width: fit-content;
  margin: 40px auto;
  border: 1px solid #444;
}

.keyboard-row {
  display: flex;
  justify-content: center;
  margin-bottom: 12px;
}

.keyboard-row:last-child {
  margin-bottom: 0;
}

.keyboard-key {
  padding: 12px 18px;
  margin: 0 6px;
  border: 1px solid #555;
  border-radius: 6px;
  background-color: #404040;
  color: #fff;
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  user-select: none;
  transition: all 0.2s ease-in-out;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);
  min-width: 45px;
  text-align: center;
}

.keyboard-key:hover {
  background-color: #555;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 123, 255, 0.3);
}

.keyboard-key.active {
  background: linear-gradient(145deg, #a0d8f0, #87c5de);
  color: #1a1a1a;
  transform: translateY(1px);
  box-shadow: 0 1px 3px rgba(0,0,0,0.3);
  border-color: #a0d8f0;
}

.keyboard-key.special-key {
  background-color: #5a5a5a;
  font-weight: 600;
  min-width: 70px;
  text-transform: capitalize;
}

.keyboard-key.space-key {
    min-width: 300px;
}

@media (width <= 1200px) {
  .keyboard-container {
    display:none;
  }
}
</style>
