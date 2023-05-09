import {buttonsRedirectionsHandle} from "./redirectButtons.js"
import {toasterHandle} from "./toaster.js"
import {getLoginToken} from "./apirequests.js"

const loginHandle = async () => {
    const inputs = document.querySelectorAll(".form__input")
    const submitButton = document.querySelector(".form__button")

    submitButton.addEventListener("click", async (event) =>{
        event.preventDefault()
        const data = {}
        let isValid = true

        inputs.forEach(input => {
            if(input.value === ""){
                isValid = false
            }
        });

        if(isValid){
            inputs.forEach(input => { data[input.name] = input.value });
            
            getLoginToken(data)
        } else {
            toasterHandle("Ooops preencha todos os campos", "bg-red")
        }

        

        
    })
}



buttonsRedirectionsHandle()
loginHandle()
