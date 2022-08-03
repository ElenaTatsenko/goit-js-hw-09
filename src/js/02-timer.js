import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtn = document.querySelector('button[data-start]');

const DISABLED = 'disabled';
let choosedDate = null;

const timer = {
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    choosedDate = selectedDates[0].getTime();

    const deltaDate = choosedDate - Date.now();
    if (deltaDate <= 0) {
      Notify.failure('Please choose a date in the future!');
      return;
    }
    startBtn.removeAttribute(DISABLED);
  },
};

flatpickr('#datetime-picker', options);
const inputDate = document.querySelector('#datetime-picker')._flatpickr;

startBtn.addEventListener('click', onClickStartCount);
let timerId = null;

function onClickStartCount(event) {
  if (timerId > 0) {
    return;
  }
  timerId = setInterval(() => {
    const deltaTime = choosedDate - Date.now();
    console.log(deltaTime);

    const { days, hours, minutes, seconds } = convertMs(deltaTime);

    if (deltaTime >= 0) {
      timer.days.textContent = days;
      timer.hours.textContent = hours;
      timer.minutes.textContent = minutes;
      timer.seconds.textContent = seconds;
    } else {
      Notify.success('Sale starts NOW!', {
        timeout: 20000,
        clickToClose: true,
      });
      clearInterval(timerId);
      event.target.setAttribute(DISABLED, DISABLED);
    }
  }, 1000);
}

function convertMs(ms) {
  
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = padStart(Math.floor(ms / day));
  const hours = padStart(Math.floor((ms % day) / hour));
  const minutes = padStart(Math.floor(((ms % day) % hour) / minute));
  const seconds = padStart(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function padStart(value) {
  return String(value).padStart(2, '0');
}