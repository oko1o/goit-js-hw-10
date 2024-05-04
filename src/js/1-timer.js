import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import '../css/timer.css';

const addFont = document.head.insertAdjacentHTML(
  'beforeend',
  '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet"></link>'
);

let userSelectedDate = null;

const timerElements = {
  inputDate: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  spanDay: document.querySelector('span[data-days]'),
  spanHours: document.querySelector('span[data-hours]'),
  spanMinutes: document.querySelector('span[data-minutes]'),
  spanSeconds: document.querySelector('span[data-seconds]'),
};

timerElements.startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const dateLater = selectedDates[0].getTime();
    const dateNow = options.defaultDate.getTime();
    if (dateLater <= dateNow) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      });
      timerElements.startBtn.disabled = true;
    } else {
      userSelectedDate = selectedDates[0].getTime();
      timerElements.startBtn.disabled = false;
    }
  },
};

flatpickr(timerElements.inputDate, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

timerElements.startBtn.addEventListener('click', () => {
  const currentDate = new Date();
  const deltaTime = userSelectedDate - currentDate;
  console.log(deltaTime);
  startTimer(deltaTime);
});

function startTimer(deltaTime) {
  timerElements.inputDate.disabled = true;
  timerElements.startBtn.disabled = true;
  const intervarId = setInterval(() => {
    const { days, hours, minutes, seconds } = convertMs(deltaTime);
    timerElements.spanDay.textContent = addLeadingZero(days);
    timerElements.spanHours.textContent = addLeadingZero(hours);
    timerElements.spanMinutes.textContent = addLeadingZero(minutes);
    timerElements.spanSeconds.textContent = addLeadingZero(seconds);
    deltaTime -= 1000;
    if (deltaTime < 0) {
      clearInterval(intervarId);
      timerElements.inputDate.disabled = false;
      timerElements.startBtn.disabled = false;
    }
  }, 1000);
}
