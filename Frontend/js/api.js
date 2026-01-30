const API_URL = "http://localhost:3000";
export default API_URL; // Basic URL for the API
/* API CANDIDATES METHODS */
export const getCandidates = async ()=>{
    return (await fetch(API_URL+"/candidates")).json()
}
export const getCandidate = async (id)=>{
    return (await fetch(API_URL+"/candidates/"+id)).json()
}
export const getCandidatesByName = async (name)=>{
    return (await fetch(API_URL+"/candidates?name="+name, {
        method:"GET",
        headers:{"Content-Type":"application/json"}
    })).json()
}
export const getCandidateByEmail =  async (email)=>{
    const response = await fetch(API_URL+"/candidates?email="+email, {
        method:"GET",
        headers:{"Content-Type":"application/json"}
    })
    if(!response.ok)return response.status
    const data = await response.json()
    return data[0]
}
export const updateCandidate = async (id, params)=>{
    return (await fetch(API_URL+"/candidates/"+id, {
        method:"PATCH",
        headers: {"Content-Type":"application/json"},
        body:JSON.stringify(params)
    })).json()
}
export const createCandidate = async (params)=>{
    return (await fetch(API_URL+"/candidates", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(params)
    })).json()
}
export const deleteCandidate = async (id)=>{
    return (await fetch(API_URL+"/candidates/"+id, {
        method:"DELETE",
        headers:{"Content-Type":"application/json"}
    })).json()
}
/* API COMPANIES METHODS */
export const getCompanies = async ()=>{
    return (await fetch(API_URL+"/companies")).json()
}
export const getCompany = async (id)=>{
    return (await fetch(API_URL+"/companies/"+id)).json()
}
export const getCompaniesByName = async (name)=>{
    return (await fetch(API_URL+"/companies?name="+name, {
        method:"GET",
        headers:{"Content-Type":"application/json"}
    })).json()
}
export const getCompanyByEmail = async (email)=>{
    const response = await fetch(API_URL+"/companies?email="+email, {
        method: "GET",
        headers:{"Content-Type":"application/json"}
    })
    if(!response.ok) return response.status
    const data = await response.json()
    return data[0]
}
export const updateCompany = async (id, params)=>{
    return (await fetch(API_URL+"/companies/"+id, {
        method:"PATCH",
        headers: {"Content-Type":"application/json"},
        body:JSON.stringify(params)
    })).json()
}
export const createCompany = async (params)=>{
    return (await fetch(API_URL+"/companies", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(params)
    })).json()
}
export const deleteCompany = async (id)=>{
    return (await fetch(API_URL+"/companies/"+id, {
        method:"DELETE",
        headers:{"Content-Type":"application/json"}
    })).json()
}
/* API jobOffer Methods */
export const getJobOffers = async ()=>{
    return (await fetch(API_URL+"/jobOffers")).json()
}
export const getJobOffer = async (id)=>{
    return (await fetch(API_URL+"/jobOffers/"+id)).json()
}
export const updateJobOffer = async (id, params)=>{
    return (await fetch(API_URL+"/jobOffers/"+id, {
        method:"PATCH",
        headers: {"Content-Type":"application/json"},
        body:JSON.stringify(params)
    })).json()
}
export const createJobOffer = async (params)=>{
    return (await fetch(API_URL+"/jobOffers", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(params)
    })).json()
}
export const getJobOfferByCompany = async (company_id)=>{
    const response = await fetch(`${API_URL}/jobOffers?company=${company_id}`, {
        method:"GET", 
        headers:{"Content-Type":"application/json"}
    })
    if(!response.ok)return response.status
    const data = await response.json()
    return data[0]

}
export const deleteJobOffer = async (id)=>{
    return (await fetch(API_URL+"/jobOffers/"+id, {
        method:"DELETE",
        headers:{"Content-Type":"application/json"}
    })).json()
}
/* API matches methods */
export const getMatches = async ()=>{
    return (await fetch(API_URL+"/matches")).json()
}
export const getMatchesByCompany = async (company_id)=>{
    return (await fetch(API_URL+"matches?company="+company_id, {
        method:"GET",
        headers:{"Content-Type":"application/json"}
    }))
}
export const getMatchByCandidate = async(candidate_id)=>{
    const response = await fetch(API_URL+"/matches?=candidate="+candidate_id, {
        method:"GET",
        headers:{"Content-Type":"application/json"}
    })
    if(!response.ok)return response.status
    const data = await response.json()
    return data[0]
}
export const getMatch = async (id)=>{
    return (await fetch(API_URL+"/matches/"+id)).json()
}
export const updateMatch = async (id, params)=>{
    return (await fetch(API_URL+"/matches/"+id, {
        method:"PATCH",
        headers: {"Content-Type":"application/json"},
        body:JSON.stringify(params)
    })).json()
}
export const createMatch = async (params)=>{
    return (await fetch(API_URL+"/matches", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(params)
    })).json()
}
export const deleteMatch = async (id)=>{
    return (await fetch(API_URL+"/matches/"+id, {
        method:"DELETE",
        headers:{"Content-Type":"application/json"}
    })).json()
}
