import {getUserInfo, getDepartment} from "./apirequests.js"

const logoutHandle = () => {
    const logoutbutton = document.querySelector(".btn-logout")

    logoutbutton.addEventListener("click", (event) => {
        event.preventDefault()

        localStorage.removeItem("@kenzieEmpresas:token")

        window.location.replace(event.target.dataset.urlFor)
    })
}

const userInfoHandle = async () => {
    const user = await getUserInfo()
    console.log(user)
    const username = document.querySelector(".userInfo__username")
    username.innerText = user.name

    const email = document.querySelector(".userInfo__email")
    email.innerText = user.email

    // departamento

    if(user.department_id){
        console.log(user.department_id)
        const department = await getDepartment(user.department_id)

        const infoText = document.querySelector(".department__infoText")
        infoText.innerText = `${department.company.name} - ${department.name}`
    } else {
        const departmentInfo = document.querySelector(".department__info")
        departmentInfo.classList = "hidden"
        departmentInfo.innerHTML = ""

        const employeeList = document.querySelector(".employee__list")

        const h2 = document.createElement("h2")
        h2.classList = "text-1-bold"
        h2.innerText = "Você ainda não foi contratado"
        employeeList.appendChild(h2)
    }
}
// chamar funções abaixo
logoutHandle()


userInfoHandle()
