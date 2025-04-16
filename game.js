var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
var score = 0;

// Sound effects
const sounds = {
    red: new Audio('sounds/red.mp3'),
    blue: new Audio('sounds/blue.mp3'),
    green: new Audio('sounds/green.mp3'),
    yellow: new Audio('sounds/yellow.mp3'),
    wrong: new Audio('sounds/wrong.mp3'),
    success: new Audio('sounds/success.mp3')
};

$(document).keypress(function() {
    if (!started) {
        startGame();
    }
});

$("#restart").click(function() {
    if (!started) {
        startGame();
    }
});

function startGame() {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
    score = 0;
    updateScore();
}

$(".btn").click(function() {
    if (!started) return;
    
    var userClickedColour = $(this).attr("id");
    userClickedPattern.push(userClickedColour);

    playSound(userClickedColour);
    animatePress(userClickedColour);
    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            score += level * 10;
            updateScore();
            playSound("success");
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over! Score: " + score);
        startOver();
    }
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name) {
    if (sounds[name]) {
        sounds[name].currentTime = 0;
        sounds[name].play();
    }
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function updateScore() {
    $("#score").text("Score: " + score);
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}


