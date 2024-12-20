const formSteps = document.querySelectorAll(".form-step");
const steps = document.querySelectorAll(".step");
const nextBtns = document.querySelectorAll(".next");
const prevBtns = document.querySelectorAll(".prev");
const nameInput = document.getElementById("username");
const toggleBtn = document.getElementById("toggle");
const emailInput = document.getElementById("email");
const nextBtnOne = document.getElementById("next1");
const nextBtnTwo = document.getElementById("next2");
const nextBtnThree = document.getElementById("next3");
const changeBtn = document.getElementById("change");
const telephoneInput = document.getElementById("phone");
const yearlySpan = document.querySelector(".yearly");
const monthlySpan = document.querySelector(".monthly");
const priceTags = document.querySelectorAll(".price-tag");
const radios= document.querySelectorAll('input[type="radio"]');
const radioOutput = document.getElementById("radio-output");
const finalPriceSpan = document.querySelector(".final-price");
const checkBoxes = document.querySelectorAll(".check");
const checkOutput = document.getElementById("checkbox-output");
const totalSpan = document.querySelector(".total-amount");
const form = document.getElementById("multistep-form");
const confirmBtn = document.getElementById("confirm");
let totalAmount = 0;
let selectedPrice = 0;
let currentStep = 0;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\+?(\d{1,3})?[-.\s]?\(?\d{1,4}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;

const showNextStep = () =>{
   if(currentStep < formSteps.length - 1){
    steps[currentStep].classList.remove("active");
    formSteps[currentStep].classList.remove('active');
    currentStep++;
    steps[currentStep].classList.add('active');
    formSteps[currentStep].classList.add('active');
   }
}

const showPrevStep = () =>{
    if(currentStep > 0){
        steps[currentStep].classList.remove("active");
        formSteps[currentStep].classList.remove('active');
        currentStep--;
        steps[currentStep].classList.add('active');
        formSteps[currentStep].classList.add('active');
    }
}

const updatePrice = () =>{
    const prices = document.querySelectorAll(".plan-price");
    if(toggleBtn.checked){
        prices[0].textContent = "$90/yr";
        prices[1].textContent = "$120/yr";
        prices[2].textContent = "$150/yr";
        priceTags[0].textContent = "$10/yr";
        priceTags[1].textContent ="$20/yr";
        priceTags[2].textContent = "$20/yr";
        yearlySpan.style.color = "#000"
        monthlySpan.style.color = "gray"
    }else{
        prices[0].textContent = "$9/mo";
        prices[1].textContent = "$12/mo";
        prices[2].textContent = "$15/mo";
        priceTags[0].textContent = "$1/mo";
        priceTags[1].textContent ="$2/mo";
        priceTags[2].textContent = "$2/mo";
         yearlySpan.style.color = "gray"
        monthlySpan.style.color = "#000"
    }

}

const updateTotalAmount = () => {
    const monthOrYear = toggleBtn.checked ? "yr": "mo";
    totalSpan.innerText = `+$${totalAmount + selectedPrice}/${monthOrYear}`
}

const isEmailValid = (input) => emailRegex.test(input);
const isPhoneValid = (input) => phoneRegex.test(input);


const setError = (input, errMsg) =>{
    const parent = input.parentElement;
    if(parent.classList.contains("success")){
        parent.classList.remove("success")
    }
    parent.classList.add("error");
    const errTag = parent.querySelector(".error-msg")
    errTag.textContent = errMsg;
}

const setSuccess = (input) =>{
    const parent = input.parentElement;
     if(parent.classList.contains("error")){
        parent.classList.remove("error");
     }
     parent.classList.add("success");
     const errTag = parent.querySelector(".error-msg");
     errTag.textContent = "";
}
    const clear = (input) =>{
       const parent = input.parentElement;
       parent.classList.remove("success")
    }

nameInput.addEventListener("input", () => setSuccess(nameInput));
emailInput.addEventListener("input", () => setSuccess(emailInput));
telephoneInput.addEventListener("input", () => setSuccess(telephoneInput));

    nextBtnOne.addEventListener("click",(e) =>{

        let hasError = false;

        if(!nameInput.value.trim()){
            hasError = true;
           setError(nameInput, "please enter your name");
        }else{
            setSuccess(nameInput);
        }

        if(!isEmailValid(emailInput.value) || !emailInput.value.trim()){
            hasError = true;
            setError(emailInput, "please enter a valid email")
        }else{
            setSuccess(emailInput);
        }

        if(!isPhoneValid(telephoneInput.value) || !telephoneInput.value.trim()){
            hasError = true;
            setError(telephoneInput, "enter a valid phone number");
        }else{
            setSuccess(telephoneInput);
        }

        if(hasError){
            e.preventDefault()
        }else{
            showNextStep()
            nameInput.value = "";
            emailInput.value = ""
            telephoneInput.value = "";
            clear(nameInput)
            clear(emailInput)
            clear(telephoneInput)
        }
})

nextBtnTwo.addEventListener("click", () =>{
    showNextStep()
})

nextBtnThree.addEventListener("click", (showNextStep));
changeBtn.addEventListener("click", () =>{
    steps[currentStep].classList.remove("active");
    formSteps[currentStep].classList.remove('active');
    currentStep = 1;
    steps[currentStep].classList.add('active');
    formSteps[currentStep].classList.add('active');
})

prevBtns.forEach((btn) =>{
    btn.addEventListener("click", showPrevStep)
})

toggleBtn.addEventListener("change", updatePrice);

radios.forEach((radio) =>{
    radio.addEventListener("change", () =>{
        if(radio.checked){
            selectedPrice = 0;
            planValue = radio.value;
            planPrice = radio.closest(".plan").querySelector(".plan-price").textContent;
            const planPriceValue = parseFloat(planPrice.replace(/[^0-9.]/g, ""));
            selectedPrice += planPriceValue;
        }
        const monthlyOrYearly = toggleBtn.checked ? "(yearly)": "(monthly)";
        radioOutput.innerText = `${planValue} ${monthlyOrYearly}`;
        finalPriceSpan.textContent = planPrice;
        console.log(selectedPrice)
        updateTotalAmount();
    })
   })
   
   checkBoxes.forEach((checkbox) =>{
    checkbox.addEventListener("change", () =>{
        const checkValue = checkbox.value;
        const existingParagragh = document.getElementById(`${checkValue}-output`);
       const checkPrice = checkbox.closest(".add-on").querySelector(".price-tag").textContent;
       const checkPriceNumber = parseFloat(checkPrice.replace(/[^0-9.]/g, ""));
       console.log(checkPriceNumber)
    if(checkbox.checked){
        if(!existingParagragh){
            checkOutput.innerHTML += `
            <div class="checkbox-final" id="${checkValue}-output">
                              <span class="checkbox-value">${checkValue}</span>
                               <span class="checkbox-price">${checkPrice}</span>
                            </div>
           `
           totalAmount += checkPriceNumber;
        }

    }else{
        if(existingParagragh){
            totalAmount -= checkPriceNumber;
             existingParagragh.remove();
        }
    }
     updateTotalAmount();
    })
   })

   form.addEventListener("submit", (e) =>{
      e.preventDefault()
      const message = document.getElementById("message");
      form.style.display = "none";
      message.style.display = "block";

   })