import {toasterHandle} from "./toaster.js"

const baseURL = "http://localhost:3333"
const requestHeaders = {
    'Content-Type': 'application/json'
}

export const checkCategories = async () => {
    const categories = await fetch(`${baseURL}/categories/readAll`).then( async (res) => {
        if(res.ok){
            return res.json()
        }
    })

    return categories
}

export const getAllCompanies = async () => {
    const companies = await fetch(`${baseURL}/companies/readAll`).then( async (res) => {
        if(res.ok){
            return res.json()
        }
    })

    return companies
}

export const getCompaniesByCategory = async (categoryName) => {
    const companies = await fetch(`${baseURL}/companies/readByCategory/${categoryName}`).then( async (res) => {
        if(res.ok){
            return res.json()
        }
    })

    return companies
}

export const getLoginToken = async(data) => {

    const config = {
        method: "POST",
        headers: requestHeaders,

        body: JSON.stringify(data)
    }

    const token = await fetch(`${baseURL}/auth/login`, config).then(async (res) => {
        // console.log(res)
        if(res.ok){
            return res.json()
        } else {
            toasterHandle("Email ou senha Invalidos", "bg-red", 5000)
        }
    })
    if (token){
        localStorage.setItem("@kenzieEmpresas:token", JSON.stringify(token))

        if(token.isAdm){
            window.location.replace("../pages/admin.html")
        }else {
            window.location.replace("../pages/user.html")
        }
    }

}