
**Beboppin**


**Background**
------------------
Beboppin is a vertical 2D scroller, ala the classic arcade game, 1942, and
using music and ships from "Cowboy Bebop".

The player will command a ship (Swordfish II) flying though space,
with the goal of avoiding obstacles.

Functionality and MVP
------------------------
Players will be able to:
- move the ship left/right using the keyboard, smoothly
- the game ends when the player's ship hits an obstacle
- can turn sound on/off
- can start /pause / restart the game

In addition, there will also be:
- a splash screen to give the player instruction on how to play the game
- a production README


**Wireframes**
The player's ship will start at the bottom of the screen. They will be able to move left and right.
Objects/asteroids will move from top to bottom. The player must dodge these objects. If
one of the objects hits the player's ship, the game is over.

[Image of sample game screen](images/beboppin.png)

**Architecture and Technologies**

This project will utilize the following:
- Vanilla JavaScript
- canvas to render graphics
- Webpack

We will also need the following scripts:
- ship.js Handles the player's ship movement
- asteroid.js Creates asteroids that move down the screen
- game.js Defines the basic game rules of winning/losing and updates the board

**Implementation**
Day 1: Setup webpack and node. Study HTML5 Canvas and get a basic shape on the screen.
- webpack
- node modules
- basic canvas object representing the player's ship on screen

Day 2: Get the player's character moving back and forth. Create asteroid objects.
- have the player's ship respond to key presses
- create asteroid objects that can appear on the screen and can move down

Day 3: Work on hit detection so when the player hits an asteroid, the game ends
- game registers when an asteroid object intersects with the player and then ends the game
- add basic soundtrack
- be able to mute the sound if so wished

Day 4: Start polishing the basic game
- Replace basic objects with more beautiful sprites
- Have a background
- Include sound effects possibly

Bonuses:
- player can shoot at asteroids
- have enemy ships which can shoot
- have levels
- power ups so the player has more than one weapon
