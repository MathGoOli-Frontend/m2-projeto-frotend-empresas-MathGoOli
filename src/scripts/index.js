import {checkCategories, getAllCompanies, getCompaniesByCategory} from "./apirequests.js"
import {buttonsRedirectionsHandle} from "./redirectButtons.js"

const selectionHandle = async () => {
    const selection = document.querySelector(".select__list")
    const selectContainer = document.querySelector(".select__container")
    const arrow = document.querySelector(".select__img")

    selectContainer.addEventListener("click", () => {
        selection.classList.toggle("hidden")
        arrow.classList.toggle("select__img-clicked")
    })

    const categories = await checkCategories()
    
    // localStorage.setItem("@kenzieEmpresas:categories", JSON.stringify(categories))

    // cria as categorias
    categories.forEach(category => {
        const li = document.createElement("li")
        li.classList.add("select__item")
        li.innerText = category.name
        li.dataset.categoryId = category.id
        li.dataset.categoryName = category.name

        selection.appendChild(li)
    });

    // da função as categorias
    const buttons = document.querySelectorAll(".select__item")

    buttons.forEach(button =>{
        button.addEventListener("click", async (event) => {
            if(event.target.dataset.categoryName === "all"){
                companiesHandle(await getAllCompanies())
            } else {
                const filter = await getCompaniesByCategory(event.target.dataset.categoryName)
                companiesHandle(filter)
            }
            selection.classList.toggle("hidden")
            arrow.classList.toggle("select__img-clicked")
        })
    })

}

const companiesHandle = async (array) => {
    // cria a lista de empresas dependendo da funçao
    const ul = document.querySelector(".companies__list")
    const categories = await checkCategories()

    ul.innerHTML = ""

    array.forEach(company => {
        const li = document.createElement("li")
        li.className = "company__card"

        const h4 = document.createElement("h4")
        h4.classList.add("company__title")
        h4.innerText = company.name
        

        const span = document.createElement("span")
        span.className = ("company__category chip")

        let companyCategory = ""
        categories.forEach(category =>{
            if(category.id === company.category_id){
                companyCategory = category.name
            }
        })
        span.innerText = companyCategory

        li.append(h4, span)

        ul.appendChild(li)

    });
}

buttonsRedirectionsHandle()
selectionHandle()

companiesHandle(await getAllCompanies())
