document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("search-company");

    const form = document.getElementById("user-form");
    const companyInput = document.getElementById("search-company");
    const maritalStatus = document.getElementById("marital-status");
    const fatherNameInput = document.getElementById("father-name");
    const submitButton = document.getElementById("submit-btn");

    let companies = []; 

    fetch("https://dummy-json.mock.beeceptor.com/companies")
        .then(response => response.json())
        .then(data => {
            companies = data.map(company => company.name);
        })
        .catch(error => console.error("Error fetching companies:", error));

    // Function to display filtered suggestions
    function showSuggestions(filteredCompanies) {
        let suggestionBox = document.getElementById("suggestions");

        // If the suggestion box doesn't exist, create one
        if (!suggestionBox) {
            suggestionBox = document.createElement("div");
            suggestionBox.id = "suggestions";
            suggestionBox.className = "absolute bg-white border border-gray-300 rounded-lg mt-1 w-full max-h-40 overflow-y-auto z-10";
            searchInput.parentNode.appendChild(suggestionBox);
        }

        // Clear previous results
        suggestionBox.innerHTML = "";

        // Show suggestions only if input is not empty
        if (searchInput.value.trim() === "") {
            suggestionBox.remove();
            return;
        }

        // Display filtered companies
        filteredCompanies.forEach(company => {
            const option = document.createElement("div");
            option.className = "p-2 cursor-pointer hover:bg-gray-200";
            option.textContent = company;
            option.addEventListener("click", function () {
                searchInput.value = company;
                suggestionBox.innerHTML = "";
            });
            suggestionBox.appendChild(option);
        });

        // Hide suggestion box if no results
        if (filteredCompanies.length === 0) {
            suggestionBox.innerHTML = "<div class='p-2 text-gray-500'>No results found</div>";
        }
    }

    // Filter companies based on search input
    searchInput.addEventListener("input", function () {
        const query = this.value.toLowerCase().trim();
        if (query === "") {
            document.getElementById("suggestions")?.remove();
            return;
        }
        const filteredCompanies = companies.filter(company => 
            company.toLowerCase().includes(query)
        );
        showSuggestions(filteredCompanies);
    });

    // Hide suggestions when clicking outside
    document.addEventListener("click", function (event) {
        if (!searchInput.contains(event.target) && !document.getElementById("suggestions")?.contains(event.target)) {
            document.getElementById("suggestions")?.remove();
        }
    });


    function validateForm(event) {
        event.preventDefault(); 
        let isValid = true;
        if (companyInput.value.trim() === "") {
            showError(companyInput, "Company name is required.");
            isValid = false;
        } else {
            removeError(companyInput);
        }

        if (maritalStatus.value.trim() === "") {
            showError(maritalStatus, "Please select your marital status.");
            isValid = false;
        } else {
            removeError(maritalStatus);
        }

        if (fatherNameInput.value.trim() === "") {
            showError(fatherNameInput, "Father's name is required.");
            isValid = false;
        } else {
            removeError(fatherNameInput);
        }

        if (isValid) {
            const formData = {
                companyName: companyInput.value.trim(),
                maritalStatus: maritalStatus.value.trim(),
                fatherName: fatherNameInput.value.trim()
            };
            console.log("Form Data:", formData);
            window.location.href = "upload-selfie.html";

        }
    }
    function showError(input, message) {
        let errorElement = input.parentNode.querySelector(".error-message");
        if (!errorElement) {
            errorElement = document.createElement("p");
            errorElement.className = "error-message text-red-500 text-sm mt-1 absolute left-0 -bottom-5";
            input.parentNode.appendChild(errorElement);
        }
        errorElement.textContent = message;
        input.classList.add("border-red-500");
    }
    function removeError(input) {
        let errorElement = input.parentNode.querySelector(".error-message");
        if (errorElement) {
            errorElement.remove();
        }
        input.classList.remove("border-red-500");
    }
    companyInput.addEventListener("input", function () { removeError(companyInput); });
    maritalStatus.addEventListener("change", function () { removeError(maritalStatus); });
    fatherNameInput.addEventListener("input", function () { removeError(fatherNameInput); });
    submitButton.addEventListener("click", validateForm);
});
