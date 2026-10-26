const progressBar = document.querySelector('.progress');
const totalTime = 60; // Altere para o tempo total da contagem regressiva em segundos

const renderProgressBar = (percentage) => {
  progressBar.style.width = `${percentage}%`;
};

const render = (days, hours, minutes, seconds) => {
  const timeLeft = days * 24 * 60 * 60 + hours * 60 * 60 + minutes * 60 + seconds;

  document.querySelector("[data-days]").textContent = String(days).padStart(2, '0');
  document.querySelector("[data-hours]").textContent = String(hours).padStart(2, '0');
  document.querySelector("[data-minutes]").textContent = String(minutes).padStart(2, '0');
  document.querySelector("[data-seconds]").textContent = String(seconds).padStart(2, '0');

  const elapsedPercentage = ((totalTime - timeLeft) / totalTime) * 100;
  renderProgressBar(elapsedPercentage);
};

const countdown = () => {
  const now = new Date();
  const targetDate = new Date("Novembro 27, 2023 00:00:00");

  const timeLeft = Math.max(0, Math.floor((targetDate - now) / 1000));

  const days = Math.floor(timeLeft / (24 * 60 * 60));
  const hours = Math.floor((timeLeft % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((timeLeft % (60 * 60)) / 60);
  const seconds = timeLeft % 60;

  render(days, hours, minutes, seconds);
};

countdown();
setInterval(countdown, 1000);
