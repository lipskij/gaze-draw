window.saveDataAcrossSessions = true;

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

ctx.strokeStyle = "black";
ctx.lineWidth = 1;

let lastX, lastY;

// set canvas size of the screen size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Initialize Webgazer
webgazer.setGazeListener((data, timestamp) => {
  if (data == null) {
    return;
  }

  // Draw gaze data

  const x = Number(data.x.toFixed(0));
  const y = Number(data.y.toFixed(0));

  if (lastX !== undefined && lastY !== undefined) {
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();
  }

  lastX = x;
  lastY = y;
});

// ad event listener to clear canvas
document.querySelector(".clear").addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// add event listener to start webgazer
document.querySelector(".start").addEventListener("click", () => {
  webgazer.begin();
});
// add event listener to pause webgazer
document.querySelector(".pause").addEventListener("click", () => {
  webgazer.pause();
});
// add event listener to resume webgazer
document.querySelector(".continue").addEventListener("click", () => {
  webgazer.resume();
});

webgazer.showVideoPreview(false);
// Pause video when user is not focused on the page
window.addEventListener("blur", () => {
  webgazer.pause();
});

// Resume video when user is focused on the page
// window.addEventListener("focus", () => {
//   webgazer.resume();
// });
