import Company from "../models/Company.js"
const initializeCompany = ()=>{
    const company = Company.createCompany(JSON.parse(sessionStorage.getItem("currentUser")))
    if(company===null)return
    sessionStorage.setItem("currentUser", JSON.stringify(company)) //set the company object to store the lists
    
}

document.addEventListener("DOMContentLoaded", initializeCompany)