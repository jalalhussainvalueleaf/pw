document.addEventListener("DOMContentLoaded", function () {
  let lat = null;
  let long = null;
  let userid = "USER123"; // Replace with the actual user ID

  // Retrieve lat-long from history state
  const state = history.state;
  if (state && state.lat && state.long) {
    lat = state.lat;
    long = state.long;
    console.log("Latitude:", lat);
    console.log("Longitude:", long);
  } else {
    console.log("No location data found!");
  }

  const pincodeInput = document.getElementById("pincode");
  const cityStateInput = document.getElementById("cityState");
  const pincodeError = document.getElementById("pincodeError");
  const form = document.getElementById("addressForm");
  const acknowledgeCheckbox = document.getElementById("acknowledge");
  const termsCheckbox = document.getElementById("terms");
  const acknowledgeText = document.getElementById("acknowledgeText");
  const termsText = document.getElementById("termsText");
  const houseInput = document.getElementById("house");
  const localityInput = document.getElementById("locality");

  pincodeInput.addEventListener("input", function () {
    let pincode = pincodeInput.value.replace(/\D/g, ""); // Only numbers
    pincodeInput.value = pincode;

    if (pincode.length === 6) {
      fetchCityState(pincode);
    } else {
      cityStateInput.value = "";
    }
  });

  function fetchCityState(pincode) {
    fetch("https://utils.buddyloan.in/autopopulate_pincode_api.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      body: "pincode=" + pincode,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.data?.city && data?.data?.state) {
          console.log(data);
          cityStateInput.value = `${data.data.city}, ${data.data.state}`;
          pincodeError.classList.add("hidden");
        } else {
          pincodeError.classList.add("hidden");
        }
      })
      .catch(() => {
        pincodeError.classList.remove("hidden");
        cityStateInput.value = "";
      });
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    let isValid = true;

    if (!pincodeInput.value || pincodeInput.value.length !== 6) {
      pincodeError.classList.remove("hidden");
      isValid = false;
    }

    document.querySelectorAll("#house, #locality").forEach((input) => {
      if (!input.value.trim()) {
        input.classList.add("border-red-500");
        isValid = false;
      } else {
        input.classList.remove("border-red-500");
      }
    });

    if (!acknowledgeCheckbox.checked) {
      acknowledgeText.classList.add("text-red-500");
      isValid = false;
    } else {
      acknowledgeText.classList.remove("text-red-500");
    }

    if (!termsCheckbox.checked) {
      termsText.classList.add("text-red-500");
      isValid = false;
    } else {
      termsText.classList.remove("text-red-500");
    }

    if (isValid) {
      submitForm();
    }
  });

  function submitForm() {
    if (!lat || !long) {
      console.error("Latitude and Longitude are missing!");
      alert("Location data is missing. Please try again.");
      return;
    }

    console.log("Submitting with Latitude:", lat);
    console.log("Submitting with Longitude:", long);

    const address = `${houseInput.value}, ${localityInput.value}, ${cityStateInput.value}, ${pincodeInput.value}`;
    const consent =
      acknowledgeCheckbox.checked && termsCheckbox.checked ? "2" : "";

    const payload = {
      userid: userid,
      latitude: lat,
      longitude: long,
      address: address,
      consent: consent,
    };

    console.log("Payload:", payload);

    fetch("https://prod.utils.buddyloan.in/poonawalla/poonawalla_address.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Server Response:", data);
        alert("Form Submitted Successfully!");
      })
      .catch((error) => {
        console.error("Submission Error:", error);
        alert("Error submitting form. Please try again.");
      });
  }
});
