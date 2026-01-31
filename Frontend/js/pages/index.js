import Candidate from "../models/Candidate.js"
const renderCandidate = async ()=>{
    const candidate = Candidate.createCandidate(JSON.parse(sessionStorage.getItem("currentUser")))
    console.log(candidate)
    if(candidate===null)return
    document.querySelector("[data-user-name]").textContent = candidate.name;
    document.querySelector("[data-user-active]").textContent = candidate.isAvaiable ? "Activo" : "Inactivo";
    document.querySelector("[data-user-email]").textContent = candidate.email;
    const btn = document.querySelector("[data-user-work]");
    btn.textContent = candidate.isOpen ? "Desactivar" : "Activar";
    btn.addEventListener("click", ()=>{
        if(btn.textContent === "Desactivar"){
            candidate?.closeToWork()
            sessionStorage.setItem("currentUser", JSON.stringify(candidate))
            btn.textContent = "Activar";
        } else{
            candidate?.openToWork()
            btn.textContent = "Desactivar"
            sessionStorage.setItem("currentUser", JSON.stringify(candidate))
        }
    })
}

document.addEventListener("DOMContentLoaded", renderCandidate)