import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import TextStream from './TextStream.vue';

describe('TextStream.vue', () => {
  // Positive Test Cases
  it('renders the correct number of character boxes', () => {
    const chars = ['a', 'b', 'c'];
    const wrapper = mount(TextStream, {
      props: { chars, gameOver: false, delay: 1 },
    });
    const charBoxes = wrapper.findAll('.char-box');
    expect(charBoxes.length).toBe(chars.length);
  });

  it('displays the correct characters in the boxes', () => {
    const chars = ['x', 'y', 'z'];
    const wrapper = mount(TextStream, {
      props: { chars, gameOver: false, delay: 1 },
    });
    const charBoxes = wrapper.findAll('.char-box');
    chars.forEach((char, index) => {
      expect(charBoxes[index].text()).toBe(char);
    });
  });

  it('shows the game over message when gameOver is true', () => {
    const wrapper = mount(TextStream, {
      props: { chars: [], gameOver: true, delay: 1 },
    });
    const gameOverMessage = wrapper.find('.game-over');
    expect(gameOverMessage.exists()).toBe(true);
    expect(gameOverMessage.text()).toBe('Game Over');
  });

  it('emits "reset" event when the reset button is clicked', async () => {
    const wrapper = mount(TextStream, {
      props: { chars: [], gameOver: false, delay: 1 },
    });
    await wrapper.find('button').trigger('click');
    expect(wrapper.emitted().reset).toBeTruthy();
  });

  it('emits "update:delay" event with the correct value on input change', async () => {
    const wrapper = mount(TextStream, {
      props: { chars: [], gameOver: false, delay: 1 },
    });
    const input = wrapper.find('#delay-input');
    await input.setValue(0.5);
    expect(wrapper.emitted()['update:delay']).toBeTruthy();
    expect(wrapper.emitted()['update:delay'][0]).toEqual([0.5]);
  });

  // Negative Test Cases
  it('does not show the game over message when gameOver is false', () => {
    const wrapper = mount(TextStream, {
      props: { chars: [], gameOver: false, delay: 1 },
    });
    const gameOverMessage = wrapper.find('.game-over');
    expect(gameOverMessage.exists()).toBe(false);
  });

  it('renders no character boxes when the chars prop is an empty array', () => {
    const wrapper = mount(TextStream, {
      props: { chars: [], gameOver: false, delay: 1 },
    });
    const charBoxes = wrapper.findAll('.char-box');
    expect(charBoxes.length).toBe(0);
  });

  it('handles non-numeric input for delay gracefully', async () => {
    const wrapper = mount(TextStream, {
      props: { chars: [], gameOver: false, delay: 1 },
    });
    const input = wrapper.find('#delay-input');
    await input.setValue('abc');
    // Vue automatically handles this and the value becomes NaN
    expect(wrapper.emitted()['update:delay'][0]).toEqual([NaN]);
  });
});
