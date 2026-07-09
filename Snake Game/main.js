const GRID_SIZE = 20;
const CELL_SIZE = 400 / GRID_SIZE;
const DEFAULT_MOVE_INTERVAL = 150;
const LEVEL_SCORE_STEP = 50;
const LEVEL_SPEED_BONUS = 10;
const MIN_MOVE_INTERVAL = 30;

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('score');
const levelEl = document.getElementById('level');
const highScoreEl = document.getElementById('highScore');
const overlay = document.getElementById('overlay');
const overlayMessage = document.getElementById('overlayMessage');
const startBtn = document.getElementById('startBtn');
const difficultySelect = document.getElementById('difficulty');
const pauseBtn = document.getElementById('pauseBtn');

let snake, direction, nextDirection, food, score, highScore, gameLoopId, running, paused, level, moveInterval;

function initApp() {
  highScore = Number(localStorage.getItem('snakeHighScore')) || 0;
  highScoreEl.textContent = highScore;
  running = false;
  paused = false;
  level = 1;
  moveInterval = DEFAULT_MOVE_INTERVAL;
  draw();

  startBtn.addEventListener('click', startGame);
  pauseBtn.addEventListener('click', togglePause);
  document.addEventListener('keydown', handleKeyDown);
}

function startGame() {
  snake = [{ x: 10, y: 10 }];
  direction = { x: 0, y: 0 };
  nextDirection = { x: 0, y: 0 };
  score = 0;
  level = 1;
  paused = false;
  moveInterval = Number(difficultySelect.value);
  scoreEl.textContent = score;
  levelEl.textContent = level;
  pauseBtn.textContent = '일시정지';
  pauseBtn.disabled = false;
  difficultySelect.disabled = true;
  placeFood();
  running = true;
  overlay.classList.add('hidden');

  restartGameLoop();
}

function placeFood() {
  let position;
  do {
    position = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
  } while (snake.some(seg => seg.x === position.x && seg.y === position.y));
  food = position;
}

function handleKeyDown(e) {
  if (!running || paused) return;

  const key = e.key;
  const goingUp = direction.y === -1;
  const goingDown = direction.y === 1;
  const goingLeft = direction.x === -1;
  const goingRight = direction.x === 1;

  if (key === 'ArrowUp' && !goingDown) nextDirection = { x: 0, y: -1 };
  else if (key === 'ArrowDown' && !goingUp) nextDirection = { x: 0, y: 1 };
  else if (key === 'ArrowLeft' && !goingRight) nextDirection = { x: -1, y: 0 };
  else if (key === 'ArrowRight' && !goingLeft) nextDirection = { x: 1, y: 0 };
}

function togglePause() {
  if (!running) return;

  paused = !paused;
  pauseBtn.textContent = paused ? '재개' : '일시정지';

  if (paused) {
    clearInterval(gameLoopId);
  } else {
    restartGameLoop();
  }
}

function restartGameLoop() {
  if (gameLoopId) clearInterval(gameLoopId);
  gameLoopId = setInterval(tick, moveInterval);
}

function tick() {
  direction = nextDirection;
  if (direction.x === 0 && direction.y === 0) {
    draw();
    return;
  }

  const head = {
    x: snake[0].x + direction.x,
    y: snake[0].y + direction.y,
  };

  if (
    head.x < 0 || head.x >= GRID_SIZE ||
    head.y < 0 || head.y >= GRID_SIZE ||
    snake.some(seg => seg.x === head.x && seg.y === head.y)
  ) {
    gameOver();
    return;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score += 10;
    scoreEl.textContent = score;
    updateLevel();
    placeFood();
  } else {
    snake.pop();
  }

  draw();
}

function updateLevel() {
  const nextLevel = Math.floor(score / LEVEL_SCORE_STEP) + 1;
  if (nextLevel <= level) return;

  level = nextLevel;
  levelEl.textContent = level;
  moveInterval = Math.max(MIN_MOVE_INTERVAL, moveInterval - LEVEL_SPEED_BONUS);
  restartGameLoop();
}

function gameOver() {
  running = false;
  paused = false;
  clearInterval(gameLoopId);
  pauseBtn.textContent = '일시정지';
  pauseBtn.disabled = true;
  difficultySelect.disabled = false;

  if (score > highScore) {
    highScore = score;
    localStorage.setItem('snakeHighScore', String(highScore));
  }
  highScoreEl.textContent = highScore;

  overlayMessage.textContent = `게임 오버!\n최종 점수: ${score}`;
  startBtn.textContent = '다시 시작';
  overlay.classList.remove('hidden');
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (food) {
    ctx.fillStyle = '#ff5252';
    ctx.fillRect(food.x * CELL_SIZE, food.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
  }

  if (snake) {
    snake.forEach((seg, i) => {
      ctx.fillStyle = i === 0 ? '#81c784' : '#4caf50';
      ctx.fillRect(seg.x * CELL_SIZE, seg.y * CELL_SIZE, CELL_SIZE - 1, CELL_SIZE - 1);
    });
  }
}

initApp();
