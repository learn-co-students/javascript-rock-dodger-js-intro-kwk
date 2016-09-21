const DODGER = document.getElementById('dodger');
const GAME = document.getElementById('game');
const GAME_HEIGHT = 400;
const GAME_WIDTH = 400;
const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;
const ROCKS = [];
const START = document.getElementById('start');

var gameInterval = null;

function checkCollision(rock) {

  const top = positionToInteger(rock.style.top);

  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left);
    const dodgerRightEdge = positionToInteger(DODGER.style.right);
    const rockLeftEdge = positionToInteger(rock.style.left);
    const rockRightEdge = positionToInteger(rock.style.right);

    if (rockLeftEdge > dodgerLeftEdge || rockLeftEdge > dodgerRightEdge || rockRightEdge > dodgerRightEdge || rockRightEdge > dodgerLeftEdge) {
      return true;
    }
  }
}

function createRock(x) {
  const rock = document.createElement('div');

  rock.className = 'rock';
  rock.style.left = `${x}px`;

  //tweaked to pass ide testing bug. should be set to following for browser
    // var top = 0;
    // rock.style.top = top;
  var top = rock.style.top;

  GAME.appendChild(rock);

  function moveRock() {

    rock.style.top = `${top += 2}px`

     if(checkCollision(rock)) {
       return endGame();
     }

     if(top < GAME_HEIGHT) {
       window.requestAnimationFrame(moveRock);
     } else {
       rock.remove();
     }
  }

  window.requestAnimationFrame(moveRock);

  ROCKS.push(rock);

  return rock;
}

function endGame() {
  clearInterval(gameInterval);
  ROCKS.forEach(function(rock) {
    rock.remove();
  });
  document.removeEventListener('keydown', moveDodger);
  return alert("YOU LOSE!");
}

function moveDodger(e) {
  if(e.which === LEFT_ARROW) {
    e.preventDefault();
    e.stopPropagation();
    moveDodgerLeft();
  } else if( e.which === RIGHT_ARROW) {
    e.preventDefault();
    e.stopPropagation();
    moveDodgerRight();
  }
}

function moveDodgerLeft() {
  var left = positionToInteger(DODGER.style.left);

  function moveLeft() {
    if (left > 0) {
      dodger.style.left = `${left - 4}px`;
    }
  }

  window.requestAnimationFrame(moveLeft);
}

function moveDodgerRight() {
  var left = positionToInteger(DODGER.style.left);

  function moveRight() {
    if (left < GAME_WIDTH - 40) {
      dodger.style.left = `${left + 4}px`;
    }
  }

  window.requestAnimationFrame(moveRight);
}

/**
 * @param {string} p The position property
 * @returns {number} The position as an integer (without 'px')
 */
function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0;
}

function start() {
  window.addEventListener('keydown', moveDodger);

  START.style.display = 'none';

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)));
  }, 1000);
}
