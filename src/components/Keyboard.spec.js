import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import Keyboard from './Keyboard.vue';

describe('Keyboard.vue', () => {
  // Positive Test Cases
  it('renders all keys in the keyboard layout', () => {
    const wrapper = mount(Keyboard);
    const keys = wrapper.findAll('.keyboard-key');
    const totalKeys = wrapper.vm.keyboardLayout.flat().length;
    expect(keys.length).toBe(totalKeys);
  });

  it('emits keyPress event with correct key on keydown', async () => {
    const wrapper = mount(Keyboard);
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));
    expect(wrapper.emitted().keyPress).toBeTruthy();
    expect(wrapper.emitted().keyPress[0]).toEqual(['a']);
  });

  it('emits keyPress event with correct key on click', async () => {
    const wrapper = mount(Keyboard);
    await wrapper.find('.keyboard-key').trigger('click');
    expect(wrapper.emitted().keyPress).toBeTruthy();
    // Assuming the first key is '`'
    expect(wrapper.emitted().keyPress[0]).toEqual(['`']);
  });

  it('applies the "active" class on keydown', async () => {
    const wrapper = mount(Keyboard);
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));
    await wrapper.vm.$nextTick();
    const activeKey = wrapper.find('.active');
    expect(activeKey.exists()).toBe(true);
    expect(activeKey.text()).toBe('a');
  });

  it('removes the "active" class on keyup', async () => {
    const wrapper = mount(Keyboard);
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));
    await wrapper.vm.$nextTick();
    window.dispatchEvent(new KeyboardEvent('keyup', { key: 'a' }));
    await wrapper.vm.$nextTick();
    const activeKey = wrapper.find('.active');
    expect(activeKey.exists()).toBe(false);
  });

  it('handles uppercase keydown events correctly', async () => {
    const wrapper = mount(Keyboard);
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'A' }));
    await wrapper.vm.$nextTick();
    const activeKey = wrapper.find('.active');
    expect(activeKey.exists()).toBe(true);
    expect(activeKey.text()).toBe('a');
    expect(wrapper.emitted().keyPress[0]).toEqual(['A']);
  });

  // Negative Test Cases
  it('does not emit keyPress event for special keys', async () => {
    const wrapper = mount(Keyboard);
    const specialKeys = ['Shift', 'Control', 'Alt', 'CapsLock', 'Tab', 'Enter'];
    for (const key of specialKeys) {
        window.dispatchEvent(new KeyboardEvent('keydown', { key }));
    }
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted().keyPress).toBeUndefined();
  });

  it('does not apply "active" class for keys not in the layout', async () => {
    const wrapper = mount(Keyboard);
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'F5' }));
    await wrapper.vm.$nextTick();
    const activeKey = wrapper.find('.active');
    expect(activeKey.exists()).toBe(false);
  });

  it('handles keyup without a preceding keydown gracefully', async () => {
    const wrapper = mount(Keyboard);
    // No keydown event here
    window.dispatchEvent(new KeyboardEvent('keyup', { key: 'a' }));
    await wrapper.vm.$nextTick();
    // No errors should be thrown, and no active class should be present
    const activeKey = wrapper.find('.active');
    expect(activeKey.exists()).toBe(false);
  });

  // Error Handling
  it('should not throw an error if keyboardLayout is empty', () => {
    const wrapper = mount(Keyboard, {
      data() {
        return { keyboardLayout: [] };
      },
    });
    const keys = wrapper.findAll('.keyboard-key');
    expect(keys.length).toBe(0);
    // Ensure no errors are thrown during render
  });
});