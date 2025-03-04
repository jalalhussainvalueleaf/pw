const overlay = document.getElementById("overlay");
const locationModal = document.getElementById("locationModal");
const allowLocationBtn = document.getElementById("allowLocation");
const denyLocationBtn = document.getElementById("denyLocation");
const getLocationBtn = document.getElementById("getLocationBtn");
const resultElement = document.getElementById("result");
const countdownElement = document.getElementById("countdown");
const timerCount = document.getElementById("timerCount");

locationModal.classList.remove("hidden");
overlay.classList.remove("hidden");
let countdown = 1;
let timerInterval;

// Function to Start Timer
function startTimer() {
  countdown = 1;
  countdownElement.innerText = countdown;
  timerInterval = setInterval(() => {
    countdown++;
    countdownElement.innerText = countdown;
    if (countdown <= 0) {
      clearInterval(timerInterval);
    }
  }, 1000);
}
// Function to Stop Timer
function stopTimer() {
  clearInterval(timerInterval);
}

// Show modal and overlay
// getLocationBtn.addEventListener("click", () => {
//     locationModal.classList.remove("hidden");
//     overlay.classList.remove("hidden");
// });

// Hide modal and overlay when user makes a choice
function closeModal() {
  locationModal.classList.add("hidden");
  overlay.classList.add("hidden");
}

allowLocationBtn.addEventListener("click", () => {
  closeModal();
  startTimer();
  getLocation();
});

denyLocationBtn.addEventListener("click", () => {
  closeModal();
  stopTimer();
  resultElement.innerHTML =
    "<span class='text-red-500'>Location permission denied!</span>";
});

function getLocation() {
  resultElement.innerHTML =
    "<span class='text-[#0069B8] italic'>Please Wait...</span>";
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  } else {
    fetchUserIP();
  }
}

function successCallback(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  sendDataToServer(latitude, longitude, null);
}

function errorCallback(error) {
  console.warn("Geolocation denied. Fetching user IP...");
  fetchUserIP();
}

function fetchUserIP() {
  fetch("https://api64.ipify.org?format=json")
    .then((response) => response.json())
    .then((data) => {
      let userIP = data.ip;
      console.log("User IP:", userIP);
      sendDataToServer(null, null, userIP);
    })
    .catch((error) => {
      resultElement.innerHTML =
        "<span class='text-red-500'>Error fetching IP!</span>";
      console.error("Error fetching IP:", error);
    });
}

function sendDataToServer(latitude, longitude, ip) {
  const checkDone = document.getElementById("checkDone");
  const timerOff = document.getElementById("timerOff");
  const params = new URLSearchParams();
  if (latitude && longitude) {
    params.append("latitude", latitude);
    params.append("longitude", longitude);
  } else if (ip) {
    params.append("ip", ip);
  }

  fetch("proxy.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  })
    .then((response) => response.json())
    .then((result) => {
      stopTimer();
      checkDone.classList.remove("hidden");
      timerOff.classList.add("hidden");
      // const newWindow = window.open("address.html");
      history.pushState({lat: latitude, long: longitude}, "", "address.html");
      window.location.href = "address.html";
      setTimeout(() => {
        // newWindow.postMessage({ lat: latitude, long: longitude }, "*");
        window.location.href = "address.html";
      }, 1000);

      // resultElement.innerHTML = `
      //           <p><strong>IP Address:</strong> ${result.ip || "N/A"}</p>
      //           <p><strong>Latitude:</strong> ${
      //             result.latitude || "N/A"
      //           }, <strong>Longitude:</strong> ${result.longitude || "N/A"}</p>
      //           <p><strong>City:</strong> ${result.city || "N/A"}</p>
      //           <p><strong>Region:</strong> ${result.region || "N/A"}</p>
      //           <p><strong>Country:</strong> ${result.country || "N/A"}</p>
      //           <p><strong>Location:</strong> ${result.location || "N/A"}</p>
      //       `;
    })
    .catch((error) => {
      resultElement.innerHTML =
        "<span class='text-red-500'>Error fetching location!</span>";
      console.error("Error:", error);
    });
}
