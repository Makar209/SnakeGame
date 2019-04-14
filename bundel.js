var leftArrow = 37;
var upArrow = 38;
var rightArrow = 39;
var downArrow = 40;

var snakePartDirections = {
    // key: value, где key - это индекс части змеии, а value это направление движения этого куска змеии.
    
};

function randomInteger(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
}

function processStart() {
    var indexFood = setFood();
    setSnake(indexFood);
    moveSnake();
}


function setFood() {
    var cellFood = document.getElementsByClassName("food")[0];
    if (cellFood != null) {
        cellFood.classList.remove("food");
    }
    var randomIndex = randomInteger(0, 255);
    var cells = document.getElementsByClassName("cell");
    cells[randomIndex].classList.add("food");
    return randomIndex;
}

function setSnake(indexFood) {
    var headIndex = randomInteger(0, 255);
    while (headIndex === setFood) {
        headIndex = randomInteger(0, 255);
    }
    var idnexTail;
    if (headIndex - 1 !== indexFood && headIndex - 1 >= 0) {
        idnexTail = headIndex - 1;
    } else if (headIndex + 1 !== indexFood && headIndex + 1 <= 255) {
        idnexTail = headIndex + 1;
    } else if (headIndex + 17 !== indexFood && headIndex + 17 <= 255) {
        idnexTail = headIndex + 17;
    } else {
        idnexTail = headIndex - 17;
    }
    colorSnake([idnexTail, headIndex]);
    snakePartDirections[idnexTail] = 1;
    snakePartDirections[headIndex] = 1;
}



function moveSnake() {
    var prevDirectionHead;
    setInterval(() => {
        var cells = Array.from(document.getElementsByClassName("cell"));
        var bodies = Array.from(document.getElementsByClassName("snake-body"));
        var headIndex = getHeadIndex();
        var bodyIndexes = [];

        for (var i = 0; i < cells.length; i++) {
            if (bodies.includes(cells[i])) {
                bodyIndexes.push(i + snakePartDirections[i]);
            }
        }
        colorSnake([...bodyIndexes, headIndex + snakePartDirections[headIndex] ]);
        prevDirectionHead = snakePartDirections[headIndex];
    }, 500);
}

function colorSnake(indexes) {
    var headSnake = document.getElementsByClassName("snake-head")[0];
    var bodySnakes = document.getElementsByClassName("snake-body");
    if (headSnake != null) {
        headSnake.classList.remove("snake-head");
    }
    for (var i = 0; i < bodySnakes.length; i++) {
        bodySnakes[i].classList.remove("snake-body");
    }


    var cells = document.getElementsByClassName("cell");
    var headIndex = indexes[indexes.length - 1];
    cells[headIndex].classList.add("snake-head");
    for (var i = 0; i < indexes.length - 1; i++) {
        var cell = cells[indexes[i]];
        cell.classList.add("snake-body");
    }
}

document.addEventListener("keydown", function (event) {
    var headIndex = getHeadIndex();
    var direction = 1;
    switch (event.keyCode) {
        case leftArrow:
            direction = -1; 
            break;
        case upArrow:
            direction = -17; 
            
            break;
        case rightArrow:
            direction = 1; 
            break;
        case downArrow:
            direction = 17; 
            break;
    }

    snakePartDirections[headIndex] = direction;
})


function getHeadIndex() {
    var cells = Array.from(document.getElementsByClassName("cell"));
    var headSnake = document.getElementsByClassName("snake-head")[0];
    var headSnakeIndex = cells.findIndex((cell) => cell === headSnake);
    return headSnakeIndex;
}