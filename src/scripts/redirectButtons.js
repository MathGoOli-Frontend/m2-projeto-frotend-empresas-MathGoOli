
export const buttonsRedirectionsHandle = () => {
    const buttons = document.querySelectorAll(".btn-urlfor")

    buttons.forEach(button => {
        button.addEventListener("click", (event) =>{
            event.preventDefault()
            window.location.href = event.target.dataset.urlFor
        })
    });
    
}