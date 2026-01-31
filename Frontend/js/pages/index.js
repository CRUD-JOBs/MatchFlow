import Candidate from "../models/Candidate.js"
const renderCandidate = async ()=>{
    const candidate = Candidate.createCandidate(JSON.parse(sessionStorage.getItem("userData")))
    if(candidate===null)return
    document.querySelector("#candidate-name").textContent = candidate.name;
    document.querySelector("#candidate-isAvaiable").textContent = candidate.isAvaiable ? "Disponible" : "No disponible";
    document.querySelector("#candidate-email").textContent = candidate.email;
    const btn = document.querySelector("#candidate-openToWork");
    btn.textContent = candidate.isOpen ? "Desactivar" : "Activar";
    btn.addEventListener("click", ()=>{
        if(btn.textContent === "Desactivar"){
            candidate?.closeToWork()
            btn.textContent = "Activar"
        } else{
            candidate?.openToWork()
            btn.textContent = "Desactivar"
        }
    })
}

document.addEventListener("DOMContentLoaded", renderCandidate)