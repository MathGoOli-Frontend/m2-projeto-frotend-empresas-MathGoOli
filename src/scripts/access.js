const verifyAccess = () => {
    const body = document.querySelector("body")
    body.classList.add("hidden")

    const token = JSON.parse(localStorage.getItem("@kenzieEmpresas:token"))

    console.log()
    if(token){
        if(token.isAdm){
            if(window.location.pathname === "/index.html"){
                window.location.replace("./src/pages/admin.html")
            }else{
                window.location.replace("../pages/admin.html")
            }
        }else {
            if(window.location.pathname === "/index.html"){
                window.location.replace("./src/pages/user.html")
            }else{
                window.location.replace("../pages/user.html")
            }
        }
    }
    body.classList.remove("hidden")
}

verifyAccess()