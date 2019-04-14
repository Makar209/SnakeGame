var leftArrow = 37;
var upArrow = 38;
var rightArrow = 39;
var downArrow = 40;

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
}

function moveSnake() {
    setInterval(() => {
        var cells = document.getElementsByClassName("cell");
        cells = Array.from(cells);
        var headSnake = document.getElementsByClassName("snake-head")[0];
        var bodySnakes = Array.from(document.getElementsByClassName("snake-body"));
        var headSnakeIndex = cells.findIndex((cell) => cell === headSnake) + 1;
        var bodySnakeIndexes = [];
        for (var i = 0; i < cells.length; i++) {
            if (bodySnakes.includes(cells[i])) {
                bodySnakeIndexes.push(i + 1);
            }
        }
        colorSnake([...bodySnakeIndexes, headSnakeIndex]);
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
    switch (event.keyCode) {
        case leftArrow:
            
            break;
        case upArrow:

            break;
        case upArrow:

            break;
        case rightArrow:

            break;
        case downArrow:

            break;
        default:
            break;
    }
})