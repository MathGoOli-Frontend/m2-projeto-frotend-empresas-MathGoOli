const verifyAccess = () => {

    const token = JSON.parse(localStorage.getItem("@kenzieEmpresas:token"))

    if(token){
        if(token.isAdm){
            if(window.location.pathname === "/index.html" || window.location.pathname === "/"){
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
}

verifyAccess()