import {getAllCompanies, readDepartmentsByCompany, getCompanyById, readAllEmployees, getDepartment, readAllEmployeesOutOfWork, patchHireEmployee, patchDismissEmployee} from "./apirequests.js"
import { toasterHandle } from "./toaster.js"
const logoutHandle = () => {
    const logoutbutton = document.querySelector(".btn-logout")

    logoutbutton.addEventListener("click", (event) => {
        event.preventDefault()

        localStorage.removeItem("@kenzieEmpresas:token")

        window.location.replace(event.target.dataset.urlFor)
    })
}

// render
const renderDepartment = (departments = [], companyName, companyId) =>{
    const deck = document.querySelector(".department__deck")
    deck.innerHTML = ""
    if(departments.length == 0){
        const li = document.createElement("li")
        li.className = "title-2-bold"
        li.innerText = `Empresa ${companyName} não possui departamentos`
        deck.appendChild(li)
    }
    departments.forEach(({id, name, description}) => {
        const li = document.createElement("li")
        li.classList.add("department__card")

        const textDiv = document.createElement("div")
        textDiv.classList.add("department__text_div")

        const h3 = document.createElement("h3")
        h3.classList.add("department__title", "title-2-bold")
        h3.innerText = name

        const pDescription = document.createElement("p")
        pDescription.classList.add = "department__text", "text-1-regular"
        pDescription.innerText = description

        const pCompany = document.createElement("p")
        pCompany.classList.add("department__text", "text-1-regular")
        pCompany.innerText = companyName

        textDiv.append(h3, pDescription, pCompany)

        // botoes
        const btnDiv = document.createElement("div")
        btnDiv.classList.add("department__buttons_div")

        const showImg = document.createElement("img")
        showImg.src = "../img/eye.svg"
        showImg.classList.add("department__buttons", "btn-show")
        showImg.dataset.companyId = companyId
        showImg.dataset.departmentId = id

        const writeImg = document.createElement("img")
        writeImg.src = "../img/pencil.svg"
        writeImg.classList.add("department__buttons", "btn-write")
        writeImg.dataset.companyId = companyId
        writeImg.dataset.departmentId = id

        const deleteImg = document.createElement("img")
        deleteImg.src = "../img/trash.svg"
        deleteImg.classList.add("department__buttons", "btn-delete")
        deleteImg.dataset.companyId = companyId
        deleteImg.dataset.departmentId = id

        btnDiv.append(showImg, writeImg, deleteImg)

        li.append(textDiv, btnDiv)

        deck.appendChild(li)


    });
    departmentButtonsHandle()
}
const renderUsers = (users = []) =>{
    const deck = document.querySelector(".user__deck")
    deck.innerHTML = ""
    if(users.length == 0){
        const li = document.createElement("li")
        li.className = "title-2-bold"
        li.innerText = `Empresa ${companyName} não possui Funcionarios`
        deck.appendChild(li)
    }
    users.forEach(async ({id, name, company_id}) => {
        
        const li = document.createElement("li")
        li.classList.add("department__card")

        const textDiv = document.createElement("div")
        textDiv.classList.add("department__text_div")

        const h3 = document.createElement("h3")
        h3.classList.add("department__title", "title-2-bold")
        h3.innerText = name

        // const pDescription = document.createElement("p")
        // pDescription.classList.add = "department__text", "text-1-regular"
        // pDescription.innerText = description

        const pCompany = document.createElement("p")
        pCompany.classList.add("department__text", "text-1-regular")
        if(company_id){
            const company = await getCompanyById(company_id)
            pCompany.innerText = company.name
        } else {
            pCompany.innerText = "Usuário Desempregado"
        }

        textDiv.append(h3, pCompany)

        // botoes
        const btnDiv = document.createElement("div")
        btnDiv.classList.add("department__buttons_div")

        // const showImg = document.createElement("img")
        // showImg.src = "../img/eye.svg"
        // showImg.classList.add("department__buttons", "btn-show")
        // showImg.dataset.companyId = companyId
        // showImg.dataset.departmentId = id

        const writeImg = document.createElement("img")
        writeImg.src = "../img/pencil.svg"
        writeImg.classList.add("department__buttons", "btn-write")
        writeImg.dataset.userId = id
        writeImg.dataset.departmentId = id

        const deleteImg = document.createElement("img")
        deleteImg.src = "../img/trash.svg"
        deleteImg.classList.add("department__buttons", "btn-delete")
        deleteImg.dataset.userId = id
        deleteImg.dataset.departmentId = id

        btnDiv.append(writeImg, deleteImg)

        li.append(textDiv, btnDiv)

        deck.appendChild(li)


    });
}

//selection
const selectionHandle = async () => {
    const selection = document.querySelector(".select__list")
    const selectContainer = document.querySelector(".select__container")
    const arrow = document.querySelector(".select__img")

    selectContainer.addEventListener("click", () => {
        selection.classList.toggle("hidden")
        arrow.classList.toggle("select__img-clicked")
    })

    const companies = await getAllCompanies()
    

    // cria as categorias
    companies.forEach((company) => {
        const li = document.createElement("li")
        li.classList.add("select__item")
        li.innerText = company.name
        li.dataset.companyId = company.id
        li.dataset.companyName = company.name

        selection.appendChild(li)
    });

    // da função as categorias
    const buttons = document.querySelectorAll(".select__item")

    buttons.forEach(button => {
        button.addEventListener("click", async (event) => {
            event.preventDefault()
            
            const departments = await readDepartmentsByCompany(event.target.dataset.companyId)
            

            renderDepartment(departments, event.target.dataset.companyName, event.target.dataset.companyId)
            


            // esconde o select
            selection.classList.toggle("hidden")
            arrow.classList.toggle("select__img-clicked")
        })
    })

}
const renderAllEmployees = async () => {
    const employees = await readAllEmployees()
    renderUsers(employees)
}
// criar departamentos


// modal department
const closeModalButtonHandle = () =>{
    const buttons = document.querySelectorAll(".closeModal_button")

    buttons.forEach(button => {
        button.addEventListener("click", (event) =>{
            event.preventDefault()
            const modal = document.querySelector(event.target.dataset.dialogClass)
            modal.close()
        })
    });
}

const optionDepartmenthandle = async () => {
    const allEmployeesOutOfWork = await readAllEmployeesOutOfWork()
    const dialogDepartmentSelection = document.querySelector(".dialog_department__selection")

    dialogDepartmentSelection.innerHTML = '<option class="hidden" value="">Selecionar usuario</option>'

    allEmployeesOutOfWork.forEach(employee => {
        const option = document.createElement("option")
        option.innerText = employee.name
        option.value = employee.id

        dialogDepartmentSelection.appendChild(option)
    });
}

const dialogDepartmentEmployesDeck = (department) => {
    const ul = document.querySelector(".dialog_department__employesDeck")
    ul.innerHTML = ""
    const employees = department.employees
    
    employees.forEach(employe => {
        const li = document.createElement("li")
        li.className = "dialog_department__employesCard"
        const h2 = document.createElement("h2")
        h2.innerText = employe.name
        h2.className = "title-2-bold"
        const h3 = document.createElement("h3")
        h3.innerText = department.company.name
        h3.className = "title-2-medium"

        const button = document.createElement("button")
        button.innerText = "Desligar"
        button.classList.add("dialog_department__deleteEmployee", "btn", "btn-action-2")
        button.dataset.employeId = employe.id

        button.addEventListener("click", async (event) => {
            event.preventDefault()

            const result = await patchDismissEmployee(button.dataset.employeId)
            if(result){
                toasterHandle(result.message, "bg-green")
                event.target.parentElement.remove()
            } else {
                toasterHandle("Não foi possivel remover - tente atualizar a pagina", "bg-red")
            }

        })

        li.append(h2, h3, button)

        ul.appendChild(li)
    });
}

const hireDepartmentModal = async (data) => {
    const dialog = document.querySelector(".dialog_department__dialog")
    
    const departmentName = document.querySelector(".dialog_department__departmentName")
    const departmentDescription = document.querySelector(".dialog_department__departmentdescription")
    const departmentCompany = document.querySelector(".dialog_department__companyName")
    const hireButton = document.querySelector(".btn-hire")
    const option = document.querySelector(".dialog_department__selection")

    departmentName.innerText = data.name
    departmentDescription.innerText = data.description
    departmentCompany.innerText = data.company.name
    hireButton.dataset.companyId = data.company.id
    hireButton.dataset.departmentId = data.id

    hireButton.addEventListener("click", async (event) =>{
        event.preventDefault()
        if(option.value != ""){

            const res = await patchHireEmployee(option.value, event.target.dataset.departmentId)
            if(res){
                toasterHandle(res.message, "bg-green")

                optionDepartmenthandle()

                const department = await getDepartment(event.target.dataset.departmentId)
                dialogDepartmentEmployesDeck(department)
            }

        }
    })

    await optionDepartmenthandle()

    dialogDepartmentEmployesDeck(data)
    
    dialog.showModal()
}

const departmentButtonsHandle = () => {
    const viewButtons = document.querySelectorAll(".btn-show")
    const editButtons = document.querySelectorAll(".btn-write")
    const deleteButtons = document.querySelectorAll(".btn-delete")
    
    viewButtons.forEach(button => {
        button.addEventListener("click", async (event) => {
            event.preventDefault()
            const departmentId = event.target.dataset.departmentId

            const department = await getDepartment(departmentId)


            console.log(department)
            hireDepartmentModal(department)

        })
    });
}

//
logoutHandle()
selectionHandle()
renderAllEmployees()

// test dialog

// const dialog = document.querySelector(".dialog_department__dialog")
// dialog.showModal()
closeModalButtonHandle()