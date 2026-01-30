const API_URL = "http://localhost:3000";
export const getCandidates = async ()=>{
    return await fetch(API_URL+"/candidates")
}
export const getCompanies = async ()=>{
    return await fetch(API_URL+"/companies")
}
export const updateCompany = async (id, params)=>{
    //code
}