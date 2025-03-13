document.addEventListener("DOMContentLoaded", function () {
    
    function validateIFSC(input) {
        input.value = input.value.toUpperCase(); // Convert to uppercase
        const ifscPattern = /^[A-Z]{4}0[A-Z0-9]{6}$/; // IFSC format regex
        const errorElement = document.getElementById("ifscError");

        if (!ifscPattern.test(input.value)) {
            errorElement.textContent = "Invalid IFSC format (Eg. ICIC0000357)";
            input.classList.add("border-red-500");
            return false;
        } else {
            errorElement.textContent = "";
            input.classList.remove("border-red-500");
            return true;
        }
    }

    function validateAccountNumber(input) {
        const accountPattern = /^[0-9]{9,18}$/; // 9 to 18 digits
        const errorElement = document.getElementById("accountError");

        if (!accountPattern.test(input.value)) {
            errorElement.textContent = "Enter a valid account number.";
            input.classList.add("border-red-500");
            return false;
        } else {
            errorElement.textContent = "";
            input.classList.remove("border-red-500");
            return true;
        }
    }

    function validateBankSelect() {
        const bankSelect = document.getElementById("bankSelect");
        const bankError = document.getElementById("bankError");

        if (bankSelect.value === "") {
            bankError.textContent = "Please select a bank.";
            bankSelect.classList.add("border-red-500");
            return false;
        } else {
            bankError.textContent = "";
            bankSelect.classList.remove("border-red-500");
            return true;
        }
    }

    document.getElementById("bankSelect").addEventListener("change", validateBankSelect);
    document.getElementById("accountNumber").addEventListener("change", function () {
        validateAccountNumber(this);
    });
    document.getElementById("ifscCode").addEventListener("change", function () {
        validateIFSC(this);
    });

    document.getElementById("addBankAccount").addEventListener("click", function (event) {
        event.preventDefault();
        let isValid = true;

        if (!validateBankSelect()) isValid = false;
        if (!validateAccountNumber(document.getElementById("accountNumber"))) isValid = false;
        if (!validateIFSC(document.getElementById("ifscCode"))) isValid = false;

        if (isValid) {
            const bankDetails = {
                bank: document.getElementById("bankSelect").value,
                accountNumber: document.getElementById("accountNumber").value,
                ifscCode: document.getElementById("ifscCode").value
            };
            console.log("Bank Details:", bankDetails);    
            window.location.href = "ifsc.html"   
        }
    });
});