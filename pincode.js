document.addEventListener("DOMContentLoaded", function () {
  const pincodeInput = document.getElementById("pincode");
  const cityStateInput = document.getElementById("cityState");
  const pincodeError = document.getElementById("pincodeError");
  const form = document.getElementById("addressForm");

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

    if (
      !document.getElementById("acknowledge").checked ||
      !document.getElementById("terms").checked
    ) {
      alert("Please agree to the terms and acknowledge the privacy policy.");
      isValid = false;
    }

    if (isValid) {
      submitForm();
    }
  });

  function submitForm() {
    // const payload = {
    //   pincode: pincodeInput.value,
    //   house: document.getElementById("house").value.trim(),
    //   locality: document.getElementById("locality").value.trim(),
    //   landmark: document.getElementById("landmark").value.trim() || null,
    //   cityState: cityStateInput.value,
    //   acknowledge: document.getElementById("acknowledge").checked,
    //   terms: document.getElementById("terms").checked,
    // };
    const payload = {
      userid: "",
      latitude: "",
      longitude: "",
      address: "",
      consent: "",
    };

    fetch("https://prod.utils.buddyloan.in/poonawalla/poonawalla_address.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Form Submitted Successfully!");
        console.log("Server Response:", data);
      })
      .catch((error) => {
        alert("Error submitting form. Please try again.");
        console.error("Submission Error:", error);
      });
  }
});
