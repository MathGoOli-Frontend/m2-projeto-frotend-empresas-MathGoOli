import {buttonsRedirectionsHandle} from "./redirectButtons.js"
import {toasterHandle} from "./toaster.js"
import {postNewEmploye} from "./apirequests.js"

const registerHandle = async () => {
    const inputs = document.querySelectorAll(".form__input")
    const submitButton = document.querySelector(".btn-submit")

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
            
            await postNewEmploye(data)
        } else {
            toasterHandle("Ooops preencha todos os campos", "bg-red")
        }

    })
}

// chamada das funções
registerHandle()
buttonsRedirectionsHandle()
