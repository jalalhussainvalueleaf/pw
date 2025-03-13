document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("kycForm");
    const checkbox = document.getElementById("acknowledgeKyc");
    const acknowledgeTextKyc = document.getElementById("acknowledgeTextKyc");
    const aadharContainer = document.querySelectorAll(".flex.items-center.justify-between.border")[0];
    const panContainer = document.querySelectorAll(".flex.items-center.justify-between.border")[1];
    const aadharCheckbox = document.querySelectorAll("input[type='checkbox']")[0];
    const panCheckbox = document.querySelectorAll("input[type='checkbox']")[1];

   

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        let isValid = true;
        let selectedCards = [];

        // Reset border styles before validation
        aadharContainer.classList.remove("border-red-500");
        panContainer.classList.remove("border-red-500");

        // Check which checkboxes are selected
        const formData = {
            aadhaar: {
                selected: aadharCheckbox.checked,
                name: "Aadhaar Card",
            },
            pan: {
                selected: panCheckbox.checked,
                name: "PAN Card",
            },
            acknowledged: checkbox.checked,
        };

        if (aadharCheckbox.checked) {
            selectedCards.push(formData.aadhaar.name);
        }
        if (panCheckbox.checked) {
            selectedCards.push(formData.pan.name);
        }

        // If neither is selected, mark invalid and add red border
        if (!aadharCheckbox.checked && !panCheckbox.checked) {
            isValid = false;
            aadharContainer.classList.add("border-red-500");
            panContainer.classList.add("border-red-500");
        }

        // Validate acknowledgment checkbox
        if (!checkbox.checked) {
            acknowledgeTextKyc.classList.add("text-red-500");
            isValid = false;
        } else {
            acknowledgeTextKyc.classList.remove("text-red-500");
        }

        // If validation passes, send data
        if (isValid) {
            console.log("Submitting Data:", formData);
            // fetch("your-api-endpoint", {
            //     method: "POST",
            //     headers: { "Content-Type": "application/json" },
            //     body: JSON.stringify(formData),
            // }).then(response => response.json()).then(data => console.log("Success:", data));
            // sessionStorage.setItem("redirectAfterLoad", "true");

            // Redirect to another page after successful validation
            window.location.href = "loading-kyc.html?redirect=true";
            // setTimeout(() => {
            //     window.location.href = "verify-kyc.html";
            // }, 5000);
        }
    });
});
