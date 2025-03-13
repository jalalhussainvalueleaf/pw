document.addEventListener("DOMContentLoaded", function () {
    let userid = "8317";

    const payload = {
        userid: userid
    };
    console.log("payload",payload);

    fetch("https://prod.utils.buddyloan.in/poonawalla/poonawalla_fetch_offer_api.php", {
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

    const cardData = [
        { amount: "₹1,00,000", roi: "12%", tenure: "1Y", fee: "2%", insurance: "1Y", logo:"assets/resources/logoHeader.png",color:"#2D3575"},
        { amount: "₹2,00,000", roi: "10%", tenure: "2Y", fee: "1.5%", insurance: "1.5Y", logo:"assets/resources/logoHeader.png",color:"#0B8C4C"},
        { amount: "₹3,00,000", roi: "8%", tenure: "3Y", fee: "1%", insurance: "2Y", logo:"assets/resources/logoHeader.png",color:"#014C92"}
    ];

        // Select the card container
        const container = document.getElementById("cardContainer");

        // Loop through the array and create cards dynamically
        cardData.forEach((data,idx) => {
            const card = document.createElement("div");
            card.className = "relative rounded-xl shadow-lg w-full border overflow-hidden bg-white";

            card.innerHTML = `
                <!-- Top Pick Ribbon -->
                ${idx === 0 ? '<div class="absolute top-[10px] right-[-18px] bg-[#FBC02D] text-[#2D3575] font-bold text-xs py-1 px-3 rotate-45">Top Pick</div>':''}

                <!-- Logo and Title -->
                <div class="border-b pb-3 p-4 flex justify-center"  style="background-color: ${data.color};">
                    <img src="${data.logo}" alt="Company Logo" class="w-auto h-12" />
                </div>

                <!-- Card Content -->
                <div class="grid grid-cols-2 gap-4 p-4 bg-[url('assets/resources/cardbg.png')] bg-cover bg-center bg-no-repeat border rounded-b-5xl">
                    <div class="text-gray-700">
                        <p class="text-sm text-gray-600">Loan Amount</p>
                        <h3 class="text-[33px] font-bold" style="color: ${data.color};">${data.amount}</h3>
                        <button class="mt-3 w-full text-white py-2 rounded-[1.5rem] flex items-center justify-between pl-[30px] px-[2px] h-[34px]" style="background-color: ${data.color};">
                            Apply Now 
                            <span class="w-7 h-7 flex items-center justify-center bg-white text-[#2D3575] rounded-full font-bold ml-auto">
                                →
                            </span>
                        </button>
                    </div>
                    <div class="text-gray-700">
                        <div class="grid grid-cols-2 gap-5 text-sm">
                            <div>
                                <p class="text-gray-500">ROI (p.a)</p>
                                <p class="font-semibold" style="color: ${data.color};">${data.roi}</p>
                            </div>
                            <div>
                                <p class="text-gray-500">Tenure</p>
                                <p class="font-semibold" style="color: ${data.color};">${data.tenure}</p>
                            </div>
                            <div class="mt-4">
                                <p class="text-gray-500">Proc. Fee</p>
                                <p class="font-semibold" style="color: ${data.color};">${data.fee}</p>
                            </div>
                            <div class="mt-4">
                                <p class="text-gray-500">Insurance</p>
                                <p class="font-semibold" style="color: ${data.color};">${data.insurance}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            container.appendChild(card);
        });

});