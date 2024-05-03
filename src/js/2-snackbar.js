import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import '../css/snackbar.css';

const addFont = document.head.insertAdjacentHTML(
  'beforeend',
  '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet"></link>'
);

const form = document.querySelector('.form');
const inputDelay = document.querySelector('input[name="delay"]');
const submitBtn = document.querySelector('button[type="submit"]');

form.addEventListener('submit', event => {
  event.preventDefault();

  const delay = parseInt(inputDelay.value);
  const state = document.querySelector('input[name="state"]:checked').value;

  const promise = new Promise((resolve, reject) => {
    if (state === 'fulfilled') {
      setTimeout(() => {
        resolve(delay);
      }, delay);
    } else {
      setTimeout(() => {
        reject(delay);
      }, delay);
    }
  });
  promise
    .then(delay => {
      iziToast.success({
        title: 'OK',
        message: `Fulfilled promise in ${delay}ms`,
        position: 'topRight',
      });
    })
    .catch(delay => {
      iziToast.error({
        title: 'Error',
        message: `Rejected promise in ${delay}ms`,
        topRight: topRight,
      });
    });
  form.reset();
});
