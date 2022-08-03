const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
const DISABLE_CLASS = 'disabled';
let timerId = null;

startBtn.addEventListener('click', onClickStart);
stopBtn.addEventListener('click', onClickStop);

function getRandomColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onClickStart(e) {
  const currentEl = e.target;

  if (currentEl.classList.contains(DISABLE_CLASS)) {
    return;
  }
  chaeckDisableStatus(currentEl, stopBtn, DISABLE_CLASS);

  timerId = setInterval(() => {
    body.style.backgroundColor = getRandomColor();
  }, 1000);
}

function onClickStop(e) {
  if (timerId === null) {
    return;
  }
  const currentEl = e.target;
  chaeckDisableStatus(currentEl, startBtn, DISABLE_CLASS);
  clearInterval(timerId);
}

function chaeckDisableStatus(activeEl, disabledEl, classAdd) {
  if (activeEl.classList.contains(classAdd)) {
    return;
  }
  activeEl.classList.add(classAdd);
  disabledEl.classList.remove(classAdd);
}
