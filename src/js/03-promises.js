import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('form');

form.addEventListener('submit', createSubmitPromises);

function createSubmitPromises(e) {
  e.preventDefault();
  const { delay, step, amount } = e.target;

  const delayTime = parseInt(delay.value);
  const stepTime = parseInt(step.value);
  const amountNumber = parseInt(amount.value);

  countPromises(amountNumber, delayTime, stepTime);
}

function countPromises(count, delay, step) {
  for (let i = 1; i <= count; i += 1) {
    let time = delay + step * (i - 1);
    createPromise(i, time)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, {
          timeout: 2000,
        });
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, {
          timeout: 2000,
        });
      });
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setInterval(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}