
# Project Blueprint

## Overview

This project is a Vue.js typing game. A stream of characters from a sentence flows across the screen, and the player must type them before they disappear. The game features a modern and polished user interface with a dark theme, enhanced typography, and interactive elements. It includes a score, a game-over state, and an on-screen keyboard that provides visual feedback.

## Style and Design

*   **Aesthetics:** The application has a modern, visually balanced dark theme with a focus on creating a premium, tactile feel. It uses a consistent color palette, clean spacing, and interactive elements to provide a polished user experience.
*   **Typography:** The project uses the 'Poppins' font from Google Fonts for a clean and modern look.
*   **Color Palette:** The primary background color is a dark `#1a1a1a`, with components styled using shades of dark gray and white text for contrast. The score display has a distinct color (`#a0d8f0`) to stand out.
*   **Layout:** The application uses a vertical flexbox layout, centering the game elements.
*   **Text Stream:**
    *   The character boxes have a "lifted" feel, achieved with `box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2)`.
    *   They are styled with a dark background (`#2a2a2a`), white text, and rounded corners.
    *   The font is larger and bolder (`font-size: 24px`, `font-weight: 600`) for better readability.
    *   A game-over overlay provides clear feedback to the user.
*   **Keyboard:**
    *   The keyboard matches the dark theme and provides visual feedback for key presses.
    *   On hover, keys have a "glow" effect created with `box-shadow` and an accent color, and they "lift" slightly with a `transform` effect to provide interactive feedback.
*   **Controls:**
    *   A prominent "Start Game" button initiates the gameplay.
    *   The delay/speed of the character stream is adjustable.

## Features

*   **Typing Game Mechanics:**
    *   Characters from a predefined sentence stream across the screen from right to left.
    *   The player must type the correct characters before they reach the leftmost edge of the stream.
    *   The game correctly identifies the next character to be typed, even if there are empty spaces in the stream.
    *   Matching is case-insensitive.
*   **Scoring:** The player's score increases for each correctly typed character.
*   **Game State Management:** The application manages "not started", "in-progress", and "game over" states.
*   **Interactive Keyboard:** The on-screen keyboard reacts to the user's key presses.
*   **Adjustable Difficulty:** The speed of the character stream can be adjusted by changing the delay.
*   **Reset Functionality:** The game can be reset after a "game over" state.

## Current Plan

The core gameplay logic has been fixed and improved.

*   **Bug Fix:** The character matching logic in the `handleKeyPress` function has been corrected. It now accurately finds the first non-space character in the stream and compares it case-insensitively with the user's input. This resolves the issue where the game was not registering correct key presses.
*   **Improved Gameplay:** The `gameTick` function now correctly handles the game-over condition, ensuring the game ends if a character is missed. Characters are only cleared from the stream upon a successful match, making the game playable and challenging.
