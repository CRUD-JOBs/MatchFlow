const API_URL = "http://localhost:3000";
export default API_URL; // Basic URL for the API
/* API CANDIDATES METHODS */
export const getCandidates = async ()=>{
    return await fetch(API_URL+"/candidates")
}
export const getCandidate = async (id)=>{
    return await fetch(API_URL+"/candidates/"+id)
}
export const updateCandidate = async (id, params)=>{
    return await fetch(API_URL+"/candidates/"+id, {
        method:"PATCH",
        headers: {"Content-Type":"application/json"},
        body:JSON.stringify(params)
    })
}
export const createCandidate = async (params)=>{
    return await fetch(API_URL+"/candidates", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(params)
    })
}
export const deleteCandidate = async (id)=>{
    return await fetch(API_URL+"/candidates/"+id, {
        method:"DELETE",
        headers:{"Content-Type":"application/json"}
    })
}
/* API COMPANIES METHODS */
export const getCompanies = async ()=>{
    return await fetch(API_URL+"/companies")
}
export const getCompany = async (id)=>{
    return await fetch(API_URL+"/companies/"+id)
}
export const updateCompany = async (id, params)=>{
    return await fetch(API_URL+"/companies/"+id, {
        method:"PATCH",
        headers: {"Content-Type":"application/json"},
        body:JSON.stringify(params)
    })
}
export const createCompany = async (params)=>{
    return await fetch(API_URL+"/companies", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(params)
    })
}
export const deleteCompany = async (id)=>{
    return await fetch(API_URL+"/companies/"+id, {
        method:"DELETE",
        headers:{"Content-Type":"application/json"}
    })
}
/* API jobOffer Methods */
export const getJobOffers = async ()=>{
    return await fetch(API_URL+"/jobOffers")
}
export const getJobOffer = async (id)=>{
    return await fetch(API_URL+"/jobOffers/"+id)
}
export const updateJobOffer = async (id, params)=>{
    return await fetch(API_URL+"/jobOffers/"+id, {
        method:"PATCH",
        headers: {"Content-Type":"application/json"},
        body:JSON.stringify(params)
    })
}
export const createJobOffer = async (params)=>{
    return await fetch(API_URL+"/jobOffers", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(params)
    })
}
export const deleteJobOffer = async (id)=>{
    return await fetch(API_URL+"/jobOffers/"+id, {
        method:"DELETE",
        headers:{"Content-Type":"application/json"}
    })
}
/* API matches methods */
export const getMatches = async ()=>{
    return await fetch(API_URL+"/matches")
}
export const getMatch = async (id)=>{
    return await fetch(API_URL+"/matches/"+id)
}
export const updateMatch = async (id, params)=>{
    return await fetch(API_URL+"/matches/"+id, {
        method:"PATCH",
        headers: {"Content-Type":"application/json"},
        body:JSON.stringify(params)
    })
}
export const createMatch = async (params)=>{
    return await fetch(API_URL+"/matches", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(params)
    })
}
export const deleteMatch = async (id)=>{
    return await fetch(API_URL+"/matches/"+id, {
        method:"DELETE",
        headers:{"Content-Type":"application/json"}
    })
}
