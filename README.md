# Ricochet Rumble

-link to the [game](https://varunharsha64.github.io/RicochetRumble/)

Arjun, a tech enthusiast, was bored of playing chess. So he asked his nerd friend Vishrudh to suggest a two-player game that was new and more interesting. Vishrudh, who was lazy yet brilliant, came up with an immediate idea of Ricochet Rumble, where the game is played as follows:

## Game Logic

An 8x8 - 2 player turn-based board game consisting of 5 different pieces:
- Titan
- Tank
- Ricochets
- Semi Ricochets
- Cannon

### Piece Abilities
- Any piece can move one tile or rotate once.
- The cannon is allowed to move only in the horizontal direction and is positioned in the base rank.
- The aim of the game is to destroy the opponent’s Titan by striking the bullet through a series of various Ricochets.

## Modes

### Normal Mode
- Create an 8x8 grid for the game board.
- Make the base config as shown in the video.
- Make the cannon shoot a circular bullet.
- Implement movement logic and move validation for each piece: they can move to adjacent or diagonally adjacent cells or rotate.
- Add a time system: Each player gets a specific amount of time. The timer must decrement during the respective player’s turn. If the timer balls down to 0, the other player wins.
- Make the game mobile responsive.
- Add pause, resume, and reset feature.

### Hacker Mode
- Implement the feature to undo and redo moves.
- Make the bullet destroy semi Ricochets when hit in the non-reflecting surface.
- Display the history of moves of each player. Store the history once the game ends in local storage.
- Add game sound effects.
- Make the cannon shoot a Directional bullet (you can use an asset).
- Make the Ricochets swap with any piece (opponent's piece, too) except the Titans.
- Make the tanks allow the bullets to pass through from any one side.

### Hacker Mode++
- Using the stored game history, implement a game replay feature.
- Randomized Playable starting position.
- Animate the game movements (For e.g., smoother bullets).
- Create a single-player mode where the opponent is a bot.
- Add spells (For e.g., a spell which makes a piece passthrough for a move).
- NO frameworks are allowed. HTML canvas is prohibited for this task. Use only vanilla JS, CSS, and HTML.

## Deadline
3 June 2024 | 11.59 pm
