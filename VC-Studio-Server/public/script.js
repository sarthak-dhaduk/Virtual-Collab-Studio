// Runtime counter logic
const runtimeElement = document.getElementById("runtime");
let startTime = new Date();

function updateRuntime() {
  const now = new Date();
  const elapsed = now - startTime;

  // Calculate time units
  const seconds = Math.floor((elapsed / 1000) % 60);
  const minutes = Math.floor((elapsed / (1000 * 60)) % 60);
  const hours = Math.floor((elapsed / (1000 * 60 * 60)) % 24);
  const days = Math.floor(elapsed / (1000 * 60 * 60 * 24));

  // Update runtime display
  runtimeElement.textContent = `[${days}D] : [${hours}H] : [${minutes}M] : [${seconds}S]`;
}

// Update every second
setInterval(updateRuntime, 1000);

// Function to format the date as "12 Jan' 2025"
function formatDate(date) {
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();
  return `${day} ${month}' ${year}`;
}

// Function to format the time as "10:00 AM"
function formatTime(date) {
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

// Get the current date and time
const now = new Date();

// Format the date and time
const formattedDate = formatDate(now);
const formattedTime = formatTime(now);

// Set the formatted date and time in the span
document.getElementById(
  "server-start-time"
).textContent = `${formattedDate} at ${formattedTime}`;

const globeRadius = 400; // Approximate radius of the visible half-globe
const globeCenterX = window.innerWidth / 2; // Center of the globe horizontally
const globeCenterY = window.innerHeight - 150; // Center of the globe vertically

const flag = document.querySelector(".flag");

function getFlagPosition() {
  const rect = flag.getBoundingClientRect();
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
  };
}

function randomPointOnGlobeSurface() {
  // Generate a random angle to get a random position on the hemisphere
  const angle = Math.random() * Math.PI; // 0 to π for half-globe
  const distance = Math.random() * globeRadius;

  const x = globeCenterX + Math.cos(angle) * distance;
  const y = globeCenterY - Math.sin(angle) * distance;

  return { x, y };
}

function generateSignal() {
  // Get the flag's current position
  const flagPos = getFlagPosition();

  // Decide whether the flag is the sender or receiver
  const isFlagSender = Math.random() > 0.5;

  // Generate random point for the other end
  const randomPoint = randomPointOnGlobeSurface();

  // Set signal start and end points
  const startX = isFlagSender ? flagPos.x : randomPoint.x;
  const startY = isFlagSender ? flagPos.y : randomPoint.y;
  const endX = isFlagSender ? randomPoint.x : flagPos.x;
  const endY = isFlagSender ? randomPoint.y : flagPos.y;

  // Create a new signal element
  const signal = document.createElement("div");
  signal.classList.add("signal");
  signal.style.left = `${startX}px`;
  signal.style.top = `${startY}px`;

  // Calculate travel offsets
  const offsetX = endX - startX;
  const offsetY = endY - startY;

  // Set custom animation properties
  signal.style.setProperty("--tx", `${offsetX}px`);
  signal.style.setProperty("--ty", `${offsetY}px`);

  // Append the signal to the body
  document.body.appendChild(signal);

  // Remove signal after animation completes
  setTimeout(() => {
    signal.remove();
  }, 2000);
}

// Trigger a signal every 2 seconds
setInterval(generateSignal, 1000);
