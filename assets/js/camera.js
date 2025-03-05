document.addEventListener("DOMContentLoaded", () => {
  let permissionGranted = false;
  let videoStream = null;

  // Selectors
  const videoElement = document.createElement("video");
  const canvasElement = document.createElement("canvas");
  const modal = document.getElementById("modal");
  const yesButton = document.getElementById("yesButton");
  const noButton = document.getElementById("noButton");
  const captureButton = document.getElementById("captureButton");
  const cameraMask = document.getElementById("cameraMask");
  const cameraOn = document.getElementById("cameraOn");
  const imageContainer = document.getElementById("imageContainer");
  const cameraContainer = document.getElementById("cameraContainer");
  const loader = document.getElementById("loader");
  const capture = document.getElementById("capture");
  const permission = document.getElementById("permission");

  // Request Camera Permission
  const requestCameraPermission = async () => {
    try {
      if (!videoStream) {
        videoStream = await navigator.mediaDevices.getUserMedia({video: true});
        videoElement.srcObject = videoStream;
        videoElement.autoplay = true;
        videoElement.className = "w-full max-w-md rounded-lg shadow-md";
        cameraContainer.innerHTML = "";
        cameraContainer.appendChild(videoElement);
      }
      permissionGranted = true;
      if (modal) modal.style.display = "none";

      // Hide mask and show camera
      if (cameraMask) cameraMask.classList.add("hidden");
      if (cameraOn) cameraOn.classList.remove("hidden");
      if (captureButton) captureButton.classList.remove("hidden");
    } catch (error) {
      console.error("Camera permission denied", error);
      permissionGranted = false;
    }
  };

  // Capture Image
  const captureImage = () => {
    if (!permissionGranted || !videoElement.srcObject) return;
    canvasElement.width = videoElement.videoWidth;
    canvasElement.height = videoElement.videoHeight;
    const context = canvasElement.getContext("2d");
    context.drawImage(
      videoElement,
      0,
      0,
      canvasElement.width,
      canvasElement.height
    );
    const imageData = canvasElement.toDataURL("image/png");

    const imgElement = document.createElement("img");
    imgElement.src = imageData;
    imgElement.className = "mt-4 w-20 h-14 rounded-lg";
    imageContainer.innerHTML = "";
    imageContainer.appendChild(imgElement);
    captureButton.innerHTML = "Submit Your Picture";
    captureButton.classList.add("bg-green-600");
  };

  // Send Image to Server (Mock API)
  const sendImage = async (imageData) => {
    try {
      const response = await fetch("https://your-api-endpoint.com/upload", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({image: imageData}),
      });
      const data = await response.json();
      console.log("Server Response:", data);
    } catch (error) {
      console.error("Error sending image:", error);
    }
  };

  // Event Listeners
  if (yesButton) {
    yesButton.addEventListener("click", () => {
      //   alert("Please wait while loading the camera...");
      capture.classList.remove("hidden");
      permission.classList.add("hidden");
      requestCameraPermission();
    });
  }

  if (noButton) {
    noButton.addEventListener("click", () => {
      if (modal) modal.style.display = "none";
    });
  }

  if (captureButton) {
    captureButton.addEventListener("click", captureImage);
  }
});
