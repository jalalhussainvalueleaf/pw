document.addEventListener("DOMContentLoaded", function () {
    const fields = ["bank", "state", "city", "branch"];

    const banks = [
        { name: "ICICI Bank", states: ["Karnataka", "Kerala", "Maharashtra", "Tamil Nadu"] },
        { name: "Canara Bank", states: ["Karnataka", "Tamil Nadu", "Andhra Pradesh"] },
        { name: "HDFC Bank", states: ["Karnataka", "Telangana", "Maharashtra"] },
        { name: "Axis Bank", states: ["Kerala", "Maharashtra", "Delhi"] },
        { name: "SBI Bank", states: ["Karnataka", "Tamil Nadu", "Delhi", "Gujarat"] }
    ];
    
    const states = [
        { name: "Karnataka", cities: ["Bangalore", "Mysore", "Hubli", "Mangalore"] },
        { name: "Kerala", cities: ["Kochi", "Trivandrum", "Calicut", "Thrissur"] },
        { name: "Maharashtra", cities: ["Mumbai", "Pune", "Nagpur", "Nashik"] },
        { name: "Tamil Nadu", cities: ["Chennai", "Coimbatore", "Madurai", "Salem"] },
        { name: "Andhra Pradesh", cities: ["Vijayawada", "Visakhapatnam", "Tirupati", "Guntur"] },
        { name: "Telangana", cities: ["Hyderabad", "Warangal", "Karimnagar", "Nizamabad"] },
        { name: "Delhi", cities: ["New Delhi", "Dwarka", "Rohini", "Karol Bagh"] },
        { name: "Gujarat", cities: ["Ahmedabad", "Surat", "Vadodara", "Rajkot"] }
    ];
    
    const cities = [
        { name: "Bangalore", branches: ["Marathahalli", "Electronic City", "Madiwala", "Whitefield"] },
        { name: "Mysore", branches: ["Devaraja Market", "Vijayanagar", "Kuvempunagar", "Chamrajpura"] },
        { name: "Mumbai", branches: ["Andheri", "Bandra", "Dadar", "Thane"] },
        { name: "Chennai", branches: ["T. Nagar", "Guindy", "Velachery", "Adyar"] },
        { name: "Kochi", branches: ["Edappally", "MG Road", "Kadavanthra", "Vyttila"] },
        { name: "Hyderabad", branches: ["Banjara Hills", "Gachibowli", "Madhapur", "Ameerpet"] },
        { name: "Pune", branches: ["Shivajinagar", "Hinjewadi", "Kothrud", "Wakad"] },
        { name: "Ahmedabad", branches: ["Navrangpura", "Maninagar", "Bopal", "SG Highway"] },
        { name: "Surat", branches: ["Adajan", "Varachha", "Nanpura", "Udhna"] },
        { name: "New Delhi", branches: ["Connaught Place", "Lajpat Nagar", "Saket", "Janakpuri"] },
        { name: "Coimbatore", branches: ["Gandhipuram", "RS Puram", "Peelamedu", "Singanallur"] },
        { name: "Nagpur", branches: ["Dharampeth", "Sadar", "Wardha Road", "Sitabuldi"] }
    ];
    const bankSelect = document.getElementById("bank");
    const stateSelect = document.getElementById("state");
    const citySelect = document.getElementById("city");
    const branchSelect = document.getElementById("branch"); 
    
    banks.forEach(bank => {
        let option = document.createElement("option");
        option.value = bank.name;
        option.textContent = bank.name;
        bankSelect.appendChild(option);
    });

    bankSelect.addEventListener("change", function () {
        stateSelect.innerHTML = `<option value="">Select State</option>`;
        citySelect.innerHTML = `<option value="">Select City</option>`;
        branchSelect.innerHTML = `<option value="">Select Branch</option>`;

        stateSelect.disabled = true;
        citySelect.disabled = true;
        branchSelect.disabled = true;

        let selectedBank = banks.find(bank => bank.name === this.value);
        if (selectedBank) {
            selectedBank.states.forEach(state => {
                let option = document.createElement("option");
                option.value = state;
                option.textContent = state;
                stateSelect.appendChild(option);
            });
            stateSelect.disabled = false;
        }
    });
    stateSelect.addEventListener("change", function () {
        citySelect.innerHTML = `<option value="">Select City</option>`;
        branchSelect.innerHTML = `<option value="">Select Branch</option>`;

        citySelect.disabled = true;
        branchSelect.disabled = true;

        let selectedState = states.find(state => state.name === this.value);
        if (selectedState) {
            selectedState.cities.forEach(city => {
                let option = document.createElement("option");
                option.value = city;
                option.textContent = city;
                citySelect.appendChild(option);
            });
            citySelect.disabled = false;
        }
    });
    citySelect.addEventListener("change", function () {
        branchSelect.innerHTML = `<option value="">Select Branch</option>`;

        branchSelect.disabled = true;

        let selectedCity = cities.find(city => city.name === this.value);
        if (selectedCity) {
            selectedCity.branches.forEach(branch => {
                let option = document.createElement("option");
                option.value = branch;
                option.textContent = branch;
                branchSelect.appendChild(option);
            });
            branchSelect.disabled = false;
        }
    });

    function validateField(id, errorId, message) {
        let field = document.getElementById(id);
        let error = document.getElementById(errorId);

        if (!field || !error) {
            console.error(`Element not found: ${id} or ${errorId}`);
            return false;
        }

        if (!field.value) {
            error.textContent = message;
            field.classList.add("border-red-500");
            return false;
        } else {
            error.textContent = "";
            field.classList.remove("border-red-500");
            return true;
        }
    }

    document.getElementById("confirmBtn").addEventListener("click", function (event) {
        event.preventDefault();

        let isValid = true;
        let selectedValues = {};

        fields.forEach((id) => {
            let errorId = id + "Error";
            let message = `Please select ${id}.`;

            let field = document.getElementById(id);
            if (!validateField(id, errorId, message)) {
                isValid = false;
            } else {
                selectedValues[id] = field.value;
            }
        });

        if (isValid) {
            console.log("Selected Values:", selectedValues);
        }
    });

    // Remove error on change
    fields.forEach((id) => {
        let field = document.getElementById(id);
        field.addEventListener("change", function () {
            let error = document.getElementById(id + "Error");
            error.textContent = "";
            field.classList.remove("border-red-500");
        });
    });
});