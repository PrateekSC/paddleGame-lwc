# paddleGame-lwc

# Paddle Game - Lightning Web Component (LWC)

A fun, interactive Paddle Game built using Salesforce Lightning Web Components (LWC). This project demonstrates game logic, user input handling, animations, and responsive design all within the Salesforce ecosystem.


## Project Structure

### `paddleGame.html`
Defines the UI structure of the game using LWC's template syntax.  
- Game container
- Paddle and ball elements
- Game mode selector (easy, moderate, hard)
- Event bindings for mouse, touch, and click events

### `paddleGame.js`
Contains the main game logic and component state.  
Key responsibilities:
- Handling paddle and ball movement
- Tracking game state (start, restart, game over)
- Responding to user input via mouse, keyboard, or touch
- Implementing game difficulty based on selected mode
- Ensuring responsive resizing for mobile and desktop

### `paddleGame.css`
Styles the game's visual elements:
- Responsive game area using flexbox and aspect-ratio
- Custom paddle and ball styles
- Supports touch interaction and mobile-friendly layout
- Ensures visual consistency across devices

### `paddleGame.js-meta.xml`
Metadata configuration required by Salesforce.  
Specifies:
- API version
- Component visibility
- Supported targets (e.g. App Page, Home Page, Record Page)

---

## Features

- ⚡ Real-time paddle control using mouse, touch, or arrow keys
- 🔄 Dynamic game start and restart on user action
- 🧠 Game over detection with restart prompt
- 🎮 Game mode selector (Easy, Moderate, Hard) to adjust ball speed
- 📱 Responsive design (mobile/tablet/desktop)

