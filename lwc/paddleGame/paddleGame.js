import { LightningElement } from 'lwc';

export default class PaddleGame extends LightningElement {
    ballX = 100;
    ballY = 100;
    ballVX = 2;
    ballVY = 2;
    paddleX = 150;
    paddleWidth = 100;
    //gameWidth = 400;
    //gameHeight = 300;
    gameWidth = 0;
    gameHeight = 0;
    paddleSpeed = 10;
    gameOver = false;
    animationFrameId = null;
    readyToRestart = false;
    gameStarted = false;
    modeLocked = false;
    // Game mode
    selectedMode = 'easy';
    modeOptions = [
        { label: 'Easy', value: 'easy' },
        { label: 'Moderate', value: 'moderate' },
        { label: 'Hard', value: 'hard' }
    ];

    get ballStyle() {
        return `top: ${this.ballY}px; left: ${this.ballX}px;`;
    }

    get paddleStyle() {
        return `left: ${this.paddleX}px; width: ${this.paddleWidth}px;`;
    }

    connectedCallback() {
        //this.startGame();
        window.addEventListener('keydown', this.handleKeyDown);
        //window.addEventListener('click', this.handleRestart);
    }

    disconnectedCallback() {
        window.removeEventListener('keydown', this.handleKeyDown);
        //window.removeEventListener('click', this.handleRestart);
        if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
    }

    renderedCallback() {
        const container = this.template.querySelector('.game-container');
        if (container && (this.gameWidth === 0 || this.gameHeight === 0)) {
            this.gameWidth = container.offsetWidth;
            this.gameHeight = container.offsetHeight;
            this.paddleWidth = this.gameWidth * 0.25; // 25% of width
        }
    }


    get ballStyle() {
        return `top: ${this.ballY}px; left: ${this.ballX}px;`;
    }

    get paddleStyle() {
        return `left: ${this.paddleX}px;`;
    }


    // Handle dropdown change
    handleModeChange(event) {
        this.selectedMode = event.target.value;
    }

    movePaddle(event) {
        const rect = this.template.querySelector('.game-container').getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        this.paddleX = Math.min(Math.max(mouseX - this.paddleWidth / 2, 0), this.gameWidth - this.paddleWidth);
    }

    handleTouchMove(event) {
        const container = this.template.querySelector('.game-container');
        if (!container || !event.touches.length) return;

        const rect = container.getBoundingClientRect();
        const touchX = event.touches[0].clientX - rect.left;

        this.paddleX = Math.min(Math.max(touchX - this.paddleWidth / 2, 0), this.gameWidth - this.paddleWidth);
        const paddle = this.template.querySelector('.paddle');
        if (paddle) {
            paddle.style.left = `${this.paddleX}px`;
        }
    }

    handleKeyDown = (event) => {
        if (!this.gameStarted) {
            this.startGame();
            return;
        }
        if (this.gameOver && this.readyToRestart) {
            this.resetGame();
            return;
        }
        if (event.key === 'ArrowLeft') {
            this.paddleX = Math.max(0, this.paddleX - this.paddleSpeed);
        } else if (event.key === 'ArrowRight') {
            this.paddleX = Math.min(this.gameWidth - this.paddleWidth, this.paddleX + this.paddleSpeed);
        }

        // Update UI immediately
        const paddle = this.template.querySelector('.paddle');
        if (paddle) {
            paddle.style.left = `${this.paddleX}px`;
        }
    };

    handleRestart = (event) => {
        /*if (!this.gameOver) {
            this.resetGame();
        }*/
        //if (!this.gameOver || !this.readyToRestart) return;
        // Optional: check if the click happened inside .game-container
        const container = this.template.querySelector('.game-container');
        if (container && container.contains(event.target)) {
            //this.resetGame();
            if (!this.gameStarted) {
                this.startGame();
            } else if (this.gameOver && this.readyToRestart) {
                this.resetGame();
            }
        }
    };

    startGame() {
        this.gameOver = false;
        this.readyToRestart = false;
        this.gameStarted = true;
        this.modeLocked = true; // Lock mode on game start

        const loop = () => {
            if (this.gameOver) return;

            this.ballX += this.ballVX;
            this.ballY += this.ballVY;

            // Wall collision
            if (this.ballX <= 0 || this.ballX >= this.gameWidth - 20) this.ballVX *= -1;
            if (this.ballY <= 0) this.ballVY *= -1;

            // Paddle collision
            if (this.ballY >= this.gameHeight - 30 &&
                this.ballX >= this.paddleX &&
                this.ballX <= this.paddleX + this.paddleWidth) {
                this.ballVY *= -1;
            }

            // Game over (bottom)
            if (this.ballY > this.gameHeight) {
                //alert('Game Over');
                this.gameOver = true;

                //this.resetGame();
                // Defer readyToRestart to avoid alert click counting
                setTimeout(() => {
                    alert('Game Over');
                    this.readyToRestart = true;

        this.modeLocked = false; //  Re-enable combobox
        //this.gameStarted = false; // for restart detection
                }, 50); // small delay lets alert finish before restart enabled

                return;
            }

            // Update UI
            /*this.template.querySelector('.ball').style.top = `${this.ballY}px`;
            this.template.querySelector('.ball').style.left = `${this.ballX}px`;
            this.template.querySelector('.paddle').style.left = `${this.paddleX}px`;*/

            const ball = this.template.querySelector('.ball');
            if (ball) {
                ball.style.top = `${this.ballY}px`;
                ball.style.left = `${this.ballX}px`;
            }

            //requestAnimationFrame(loop);
            // Store the animation frame ID
            this.animationFrameId = requestAnimationFrame(loop);
        };
        //loop();
        //  Start the first frame
        this.animationFrameId = requestAnimationFrame(loop);
    }

    resetGame() {
        //  Cancel previous animation frame if any
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
        //this.ballX = 100;
        this.ballX = Math.floor(Math.random() * (this.gameWidth - 20));
        this.ballY = 100;
        //this.ballVX = 2;
        //this.ballVY = 2;
       // Set speed based on mode
        let speed = 2;
        switch (this.selectedMode) {
            case 'moderate':
                speed = 3;
                break;
            case 'hard':
                speed = 4;
                break;
        }
        // Randomize direction
        this.ballVX = Math.random() < 0.5 ? speed : -speed;
        this.ballVY = speed;
        this.gameOver = false;
        this.modeLocked = true;//Lock mode again for restart
        this.startGame();
    }
}
