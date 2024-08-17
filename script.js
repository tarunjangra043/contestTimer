document.getElementById("start-timer").addEventListener("click", startTimer);

let container = document.getElementById("container");
let noTimerMessage = document.createElement("p");
noTimerMessage.textContent = "You have no timers currently!";
container.appendChild(noTimerMessage);

let timers = [];

function startTimer() {
  const hours = parseInt(document.getElementById("hours").value) || 0;
  const minutes = parseInt(document.getElementById("minutes").value) || 0;
  const seconds = parseInt(document.getElementById("seconds").value) || 0;

  const totalSeconds = hours * 3600 + minutes * 60 + seconds;

  if (totalSeconds <= 0) {
    alert("Please enter a valid time!");
    return;
  }

  if (timers.length === 0) {
    container.removeChild(noTimerMessage);
  }

  const timer = {
    totalSeconds: totalSeconds,
    remainingSeconds: totalSeconds,
    intervalId: null,
    id: `timer-${timers.length}`, // Assign a unique id to the timer
  };

  timers.push(timer);
  addTimerToUI(timer);

  // Start the timer after it has been added to the UI
  timer.intervalId = setInterval(() => updateTimer(timer), 1000);
}

function updateTimer(timer) {
  if (timer.remainingSeconds > 0) {
    timer.remainingSeconds--;
    document.getElementById(timer.id).textContent = formatTime(
      timer.remainingSeconds
    );
  } else {
    clearInterval(timer.intervalId);
    document.getElementById(timer.id).parentNode.classList.add("timer-end");
    const timeEnd = document.querySelectorAll(".timer-end span");
    const button = document.querySelectorAll(".timer-end button");

    timeEnd.forEach((ele) => {
      ele.innerHTML = `Timer is Up!`;
      ele.style.cssText = `color: black`;
    });

    button.forEach((ele) => {
      ele.innerHTML = "Stop";
      ele.classList.add("stopButton");

      ele.parentElement.style.backgroundColor = "#f0f757";

      let p = ele.parentElement.firstElementChild;
      p.style.display = "none";
    });

    playEndSound();
  }
}

function addTimerToUI(timer) {
  const timerList = document.getElementById("timer-list");
  const timerItem = document.createElement("li");

  const timerText = document.createElement("span");
  timerText.id = timer.id;
  timerText.textContent = formatTime(timer.totalSeconds);

  const stopButton = document.createElement("button");
  stopButton.textContent = "Delete";
  stopButton.addEventListener("click", () => stopTimer(timer));

  const timeLeftText = document.createElement("p");
  timeLeftText.textContent = `Time Left : `;

  timerItem.appendChild(timeLeftText);
  timerItem.appendChild(timerText);
  timerItem.appendChild(stopButton);
  timerList.appendChild(timerItem);
}

function stopTimer(timer) {
  clearInterval(timer.intervalId);
  const timerItem = document.getElementById(timer.id).parentNode;
  timerItem.remove();

  timers = timers.filter((t) => t !== timer);

  if (timers.length === 0) {
    container.appendChild(noTimerMessage);
  }
}

function formatTime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(
    s
  ).padStart(2, "0")}`;
}

function playEndSound() {
  document.getElementById("timer-end-sound").play();
}
