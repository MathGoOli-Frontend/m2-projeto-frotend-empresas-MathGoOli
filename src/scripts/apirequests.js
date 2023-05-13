import {toasterHandle} from "./toaster.js"

const baseURL = "http://localhost:3333"

// Rotas sem autenticação
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

export const postNewEmploye = async (data) => {
    const config = {
        method: "POST",
        headers: requestHeaders,

        body: JSON.stringify(data)
    }

    await fetch(`${baseURL}/employees/create`, config).then(async (res) => {
        if (res.ok){
        const employe = await res.json()

            toasterHandle(`Funcionario ${employe.name} criado`, "bg-green") 
            return employe
        } else {
            const message = await res.json()
            toasterHandle(`Erro: ${message.message}`, "bg-red")
        }
    })
}
// Rotas Token de Admin
// 
export const readAllEmployees = async () => { // /employees/readAll
    const token = JSON.parse(localStorage.getItem("@kenzieEmpresas:token"))

    const config = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token.authToken}`
        },

    }
    const employees = await fetch(`${baseURL}/employees/readAll`, config).then((res) =>{
        return res.json()
    })
    return employees
}

export const readAllEmployeesOutOfWork = async () => { // /employees/outOfWork
    const token = JSON.parse(localStorage.getItem("@kenzieEmpresas:token"))

    const config = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token.authToken}`
        },

    }
    const employees = await fetch(`${baseURL}/employees/outOfWork`, config).then((res) =>{
        return res.json()
    })
    return employees
}

export const patchUpdateEmployee = async (employee_id, data) => { // /employees/updateEmployee/{employee_id}
    const token = JSON.parse(localStorage.getItem("@kenzieEmpresas:token"))

    const config = {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token.authToken}`
        },
        body: JSON.stringify(data)

    }
    const employee = await fetch(`${baseURL}/employees/updateEmployee/${employee_id}`, config).then((res) =>{
        return res.json()
    })
    return employee
}

export const deleteEmployee = async (employee_id) => { // /employees/deleteEmployee/{employee_id}
    const token = JSON.parse(localStorage.getItem("@kenzieEmpresas:token"))

    const config = {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token.authToken}`
        },

    }
    const employee = await fetch(`${baseURL}/employees/deleteEmployee/${employee_id}`, config).then((res) =>{
        return res.json()
    })
    return employee
}

export const patchHireEmployee = async (employee_id, departmentId) => { // /employees/hireEmployee/{employee_id}
    const token = JSON.parse(localStorage.getItem("@kenzieEmpresas:token"))

    const config = {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token.authToken}`
        },
        body: JSON.stringify({
            department_id: departmentId
        })

    }
    const employee = await fetch(`${baseURL}/employees/hireEmployee/${employee_id}`, config).then((res) =>{
        if(res.ok){
            return res.json()
        }
        
    })
    return employee
}

export const patchDismissEmployee = async (employee_id) => { // /employees/dismissEmployee/{employee_id}
    const token = JSON.parse(localStorage.getItem("@kenzieEmpresas:token"))

    const config = {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token.authToken}`
        },

    }
    const employee = await fetch(`${baseURL}/employees/dismissEmployee/${employee_id}`, config).then((res) =>{
        if(res.ok){
            return res.json()
        }
        return false
    })
    return employee
}

export const getCompanyById = async (companyId) => { // /companies/readById/{company_id}
    const token = JSON.parse(localStorage.getItem("@kenzieEmpresas:token"))

    const config = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token.authToken}`
        },

    }
    const company = await fetch(`${baseURL}/companies/readById/${companyId}`, config).then((res) =>{
        return res.json()
    })
    return company
}

export const postCreateDepartment = async (data) => { // /departments/create
    /* 
        {
            "name": "Tecnologia da Informação",
            "description": "Departamento responsável pela parte de TI",
            "company_id": "86bffcd8-ff51-4b42-8dd2-e60639a3dc13"
        } 
    */

    const token = JSON.parse(localStorage.getItem("@kenzieEmpresas:token"))

    const config = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token.authToken}`,
        },
        body: JSON.stringify(data)

    }
    const department = await fetch(`${baseURL}/departments/create`, config).then((res) =>{
        if(res.ok){
            return res.json()
        }
    })
    return department
}

export const getdepartmentsReadAll = async () => {  // /departments/readAll
    const token = JSON.parse(localStorage.getItem("@kenzieEmpresas:token"))

    const config = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token.authToken}`
        },

    }
    const company = await fetch(`${baseURL}/departments/readAll`, config).then((res) =>{
        return res.json()
    })
    return company
}

export const readDepartmentsByCompany = async (companyId) => { // GET /departments/readByCompany/
    const token = JSON.parse(localStorage.getItem("@kenzieEmpresas:token"))

    const config = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token.authToken}`
        },

    }
    const departments = await fetch(`${baseURL}/departments/readByCompany/${companyId}`, config).then((res) =>{
        return res.json()
    })
    return departments
}


export const patchUpdateDepartment = async (department_id, data) => { // /departments/update/{department_id}
    /* 
        {
            "name": "Tecnologia da Informação",
            "description": "Departamento responsável pela parte de TI",
            "company_id": "86bffcd8-ff51-4b42-8dd2-e60639a3dc13"
        } 
    */

    const token = JSON.parse(localStorage.getItem("@kenzieEmpresas:token"))

    const config = {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token.authToken}`,
            
        },
        body: JSON.stringify(data)

    }
    const employee = await fetch(`${baseURL}/departments/update/${department_id}`, config).then((res) =>{
        return res.json()
    })
    return employee
}

export const deletedepartment = async (department_id) => { // /departments/delete/{department_id}
    const token = JSON.parse(localStorage.getItem("@kenzieEmpresas:token"))

    const config = {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token.authToken}`
        },

    }
    const department = await fetch(`${baseURL}/departments/delete/${department_id}`, config).then((res) =>{
        return res.json()
    })
    return department
}

// Rotas Funcionários

export const getUserInfo = async () => {
    const token = JSON.parse(localStorage.getItem("@kenzieEmpresas:token"))

    const config = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token.authToken}`
        },

    }
    const user = await fetch(`${baseURL}/employees/profile`, config).then((res) =>{
        return res.json()
    })
    return user
}

export const getDepartment = async (departmentId) => {
    const token = JSON.parse(localStorage.getItem("@kenzieEmpresas:token"))

    const config = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token.authToken}`
        },

    }
    const department = await fetch(`${baseURL}/departments/readById/${departmentId}`, config).then((res) =>{
        return res.json()
    })
    return department
}