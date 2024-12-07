// All of the variables
let programState = 'start';
let dif = 1;
let score = 0;
let readyUp = 0;
let spawner = 1;
let circleX = -50;
let circleY = -50;
let backgroundSpawner = 1;
let circleColor = 0;
let colorPicker = 1;
let timeKeeper = 0;

function setup() {
    //All the setup, including framerate
    createCanvas(800,800);
    rectMode(CENTER);
    frameRate(60);

}

function draw() {
    //What allows the program to switch between each state
    switch(programState) {
        case 'start':
            startScreen();
            break;
        case 'game':
            gameScreen();
            break;
        case 'fail':
            failScreen();
            break;
    }
}

function keyReleased() {
    // Determines whether its in "start" or "fail" screen. If it's in either, it will allow the player to press enter to switch to game
    if (keyCode === ENTER) {
        if (programState === 'start' || programState === 'fail') {
            readyUp = 0;
            backgroundSpawner = 1
            spawner = 1
            dif = 1;
            score = 0;
            programState = 'game';
            //startState();
        }
    }
}

function startScreen() {
    //Creates the start screen, which is what the player sees first.
    background(150,150,150);
    textSize(75);
    fill(0);
    textAlign(CENTER);
    text('T h i n k  Q u i c k', 400, 150);
    text('P r e s s  F a s t !', 400, 250);
    textSize(35);
    text('Press "ENTER" to play!', 400, 300);
    text('Objective: \n Press the circle on the screen in time! \n If green, you score! \n If red, you lose :( \n Wait out red circles to score! \n A new circle will appear after you score. \n Score as high as you can!', 400, 400)
}

function gameScreen() {
    // Ready up allows for timing certain events like the ball spawning, countdown, etc. The timeKeeper is there to keep track of time.
    readyUp++
    timeKeeper++

    //Background spawner is here when we need to get rid of old draw commands on the board
    if (backgroundSpawner == 1){
        background(150);
        backgroundSpawner = 0;
    }
    // The countdown
    if (readyUp < 180) {
        textSize(50)
        timeKeeper = 0;
        text('Ready?', 400, 400)
    }
    //Tells the player to go.
    else if (readyUp > 180 && readyUp < 270) {
        if (backgroundSpawner == 0){
            background(150);
            backgroundSpawner = 2
        }
        textSize(50)
        fill('green')
        if (readyUp > 260 && readyUp < 270) {
            fill(150)
        }
        text('Go!', 400, 400)
    }
    // The main game keeper. Allows for balls to spawn, keeps track of score and level, and determines the parameters of such.
    if (readyUp > 180) {
        fill(0)
        text("Score: " + score, 400, 50)
        text("Lvl: " + dif, 70, 780)
        if (spawner == 1) {
            timeKeeper = 0;
            circleColor = random(1,65)
            circleX = random(100,700)
            circleY = random(100,700)
            if (circleColor <= 59) {
                fill('green')
                console.log('test green')
            }
            else if (circleColor >= 60) {
                fill('red')
                console.log('test red')
            }
            circle(circleX, circleY, 100)
            spawner = 0
        }
        if (score >= 25 && score <= 49) {
            dif = 2;
        }
        else if (score >= 50 && score <= 74) {
            dif = 3;
        }
        else if (score >= 75 && score <= 99) {
            dif = 4;
        }
        else if (score >= 100){
            dif = 5
        }
        if (timeKeeper > 240 && dif == 1) {
            if (circleColor <= 59) {
                programState = 'fail'
            }
            else if (circleColor >= 60) {
                ridBalls();
                score++
                spawner = 1
            }
        }
        else if (timeKeeper > 180 && dif == 2) {
            if (circleColor <= 59) {
                programState = 'fail'
            }
            else if (circleColor >= 60) {
                ridBalls();
                score++;
                spawner = 1;
            }
        }
        else if (timeKeeper > 90 && dif == 3) {
            if (circleColor <= 59) {
                programState = 'fail'
            }
            else if (circleColor >= 60) {
                ridBalls();
                score++;
                spawner = 1;
            }
        }
        else if (timeKeeper > 60 && dif == 4) {
            if (circleColor <= 59) {
                programState = 'fail'
            }
            else if (circleColor >= 60) {
                ridBalls();
                score++;
                spawner = 1;
            }
        }
        else if (timeKeeper > 40 && dif == 5) {
            if (circleColor <= 59) {
                programState = 'fail'
            }
            else if (circleColor >= 60) {
                ridBalls();
                score++
                spawner = 1
            }
        }
    }
}

// This is here for when the red balls spawns, and the player successfully waits it out in the gameScreen function. 
function ridBalls() {
    background(150);
}
// The clicking functionality. Determines if the user has clicked on the ball, and what happens after.
function mousePressed() {
    if (mouseX >= circleX - 50 && mouseX <= circleX + 50){
        if (mouseY >= circleY - 50 && mouseY <= circleY + 50) {
            if (circleColor <= 59) {
                ridBalls();
                console.log('Big Test')
                score++
                spawner = 1
            }
            else if (circleColor >= 60) {
                programState = 'fail'
            }
        }
    }
}

// The fail Screen.
function failScreen() {
    background(150,150,150);
    textSize(75);
    fill(0);
    textAlign(CENTER);
    text('Y O U  F A I L E D !', 400, 150);
    textSize(35);
    text('Score: ' + score, 400, 250);
    text('Press "ENTER" to try again!', 400, 400);
}