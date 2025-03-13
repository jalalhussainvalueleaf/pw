document.addEventListener("DOMContentLoaded", function () {
    let userid = "8317";
    const loanSlider = document.getElementById("loanSlider");
    const emiOptionsContainer = document.getElementById("emiOptions");
    const loanAmountText = document.getElementById("loanAmount"); 
    const form = document.getElementById("loanForm");
    const checkbox = document.getElementById("acknowledge");
    const acknowledgeText = document.getElementById("acknowledgeText");

    const payload = {
        userid: userid
    };

    window.toggleAccordion = function (id) {
        let accordionContent = document.getElementById(id);
        let chevronIcon = accordionContent.previousElementSibling.querySelector("i");
        accordionContent.classList.toggle("hidden");

        if (accordionContent.classList.contains("hidden")) {
            chevronIcon.classList.remove("fa-chevron-up");
            chevronIcon.classList.add("fa-chevron-down");
        } else {
            chevronIcon.classList.remove("fa-chevron-down");
            chevronIcon.classList.add("fa-chevron-up");
        }
    };

    form.addEventListener("submit", function (event){
        event.preventDefault();
        let isValid = true; 
        if (!checkbox.checked) {
            acknowledgeText.classList.add("text-red-500");
            isValid = false;
          } else {
            acknowledgeText.classList.remove("text-red-500");
          }
          if (isValid) {
            submitLoanAmountForm();
          }
    });

    function submitLoanAmountForm() {
        
        window.location.href = "Initiating-kyc.html";
    }

    fetch("https://prod.utils.buddyloan.in/poonawalla/poonawalla_fetch_offer_api.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    })
    .then((response) => response.json())
    .then((data) => {
        const parsedData = data.response;
        const offerPersonalLoan = parsedData.Offer["Personal Loan"];
        offerPersonalLoan.monthly_emi=data.monthly_emi;

        document.getElementById("loanAmount").textContent = `₹${offerPersonalLoan.loan_amount.toLocaleString("en-IN")}`;
        document.getElementById("totalLoanAmount").textContent = `₹${offerPersonalLoan.loan_amount.toLocaleString("en-IN")}`;
        document.getElementById("loanAmountTotal").textContent = `₹${offerPersonalLoan.loan_amount.toLocaleString("en-IN")}`;

        let offersArray = [];
        offersArray.push(offerPersonalLoan);

        if (offerPersonalLoan.loan_amount) {
            loanSlider.value = offerPersonalLoan.loan_amount;
            loanAmountText.textContent = `₹${offerPersonalLoan.loan_amount.toLocaleString("en-IN")}`;
        }
        loanSlider.addEventListener("input", function () {
            loanAmountText.textContent = `₹${loanSlider.value.toLocaleString()}`;
        });

        const loanAmount = offerPersonalLoan.loan_amount;
        const processing_fee = parseFloat(offerPersonalLoan.Processing_Fee.slice(0, -1));
        const processingFee = (processing_fee / 100) * loanAmount;
        const tax = (0.8 / 100) * loanAmount;
        const totalFee = processingFee + tax;
        const totalloanAmountyouGet = ((loanAmount -totalFee)-500);

        const toatlInterestWithAmount = (offerPersonalLoan.Tenure * offerPersonalLoan.monthly_emi);
        const interestAmount = (toatlInterestWithAmount - loanAmount)
        
        document.getElementById("processingFee").textContent =`-₹${totalFee}`;
        document.getElementById("processingText").textContent = `Processing Fee (${offerPersonalLoan.Processing_Fee} + 0.8%)`;
        document.getElementById("amountGet").textContent = `₹${totalloanAmountyouGet}`;
        document.getElementById("interest").textContent = `Interest @ ${offerPersonalLoan.Interest_Rate}% p.m.*`;
        document.getElementById("CalculateMonths").textContent = `(${offerPersonalLoan.Tenure} Months x ₹${offerPersonalLoan.monthly_emi})`;
        document.getElementById("interestFee").textContent = `+₹${interestAmount}`;
        document.getElementById("amountRepay").textContent = `₹${toatlInterestWithAmount}`;

        emiOptionsContainer.innerHTML = "";
            offersArray.forEach((value, idx) => {
                emiOptionsContainer.innerHTML += `
                    <div class="relative flex items-center justify-between p-2 bg-white rounded-lg shadow-md mb-2 border ${idx === 0 ? 'border-[#0069B8]' : ''}">
                        <div class="flex items-center w-1/3">
                          <input type="radio" name="tenure" class="form-radio text-[#0069B8]" ${idx === 0 ? 'checked' : ''}/>
                          <span class="ml-2 text-[#0069B8] font-semibold ml-[25px]">${value.Tenure}</span>
                        </div>
                        <div class="text-center w-1/3">
                          <p class="text-[#0069B8] font-semibold">${value.Interest_Rate}%</p>
                        </div>
                        <div class="text-right w-1/3">
                          <p class="text-[#0069B8] font-semibold mr-[25px]">₹${value.monthly_emi}</p>
                        </div>
                          <div class="text-right w-[90px] absolute top-[-14px] right-0">
                             ${idx === 0 ? '<p class="bg-[#0069B8] text-white rounded-[4px] px-2 py-[3px] text-xs font-semibold w-[70px]">Top Pick</p>':''}
                          </div>
                    </div>`;
            });
    })
    .catch((error) => {
        console.error("Submission Error:", error);
    }); 
});