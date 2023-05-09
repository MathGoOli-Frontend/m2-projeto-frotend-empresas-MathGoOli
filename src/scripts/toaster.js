
export const toasterHandle =  (message, color, time=2000) => {
    const body = document.querySelector("main")

    const div = document.createElement("div")
    div.className = `toast__container ${color}`

    const p = document.createElement("p")
    p.class = "title-2-bold"
    p.innerText = message

    div.appendChild(p)

    body.appendChild(div)
    console.log("test")
    setTimeout(() => {
        div.remove()
    }, time)

}