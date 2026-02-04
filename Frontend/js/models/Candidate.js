import {updateCandidate, getCandidate} from "./../api.js"
export default class Candidate{
    static _candidates = new Map();
    constructor(id, name, email, password, isOpen, isAvaiable, jobOffer){
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.isAvaiable = isAvaiable;
        this.isOpen = isOpen;
        this.jobOffer_id = jobOffer;
    }
    static createCandidate({id = null, name = null, email = null, password = null, isOpen = null, isAvaiable = null, jobOffer = null}){
        if(!id || !name || !email || !password)return null
        return new Candidate(id, name, email, password, isOpen || false, isAvaiable || false, jobOffer || null)
    }
    static get candidates(){
        return this._candidates
    }
    static async getCandidate(id){
        if(this._candidates.has(id)){
            return this._candidates.get(id)
        }
        try{
            const candidateProperties = await getCandidate(id);
            const newCandidate =  this.createCandidate(candidateProperties); 
            this._candidates.set(id, newCandidate)
            return newCandidate; //returns a promise -> use await
        } catch(error){
            console.error("HTTP Error while trying to fetch for candidate", error)
            return null
        }
    }
    async reserve(jobOffer_id){
        try{
            const response = await updateCandidate(this.id, {isAvaiable: false, jobOffer_id: jobOffer_id})
            this.isAvaiable = false
            this.jobOffer_id = jobOffer_id
            return response
        } catch{
            console.error("HTTP Error while trying to fetch candidate", error)
            return null
        }
    }
    async reject(){
        try{
            const response = await updateCandidate(this.id, {isAvaiable: true, jobOffer_id: null})
            this.isAvaiable = true
            this.jobOffer_id= null
            return response
        } catch{
            console.error("HTTP Error while trying to fetch candidate", error)
            return null
        }
    }
    async openToWork(){
        if(this.jobOffer_id !== null){
            console.error("Error! candidate can not open to work as it has already an offer")
            return null
        }
        try{
            const response = await updateCandidate(this.id, {isOpen:true})
            this.isOpen = true;
            return response
        } catch(error){
            console.error("HTTP Error while trying to fetch candidate", error)
            return null
        }
    }
    async closeToWork(){
        try{
            const response = await updateCandidate(this.id, {isOpen:false})
            this.isOpen = false;
            return response
        } catch(error){
            console.error("HTTP Error while trying to fetch candidate", error)
            return null
        }
    }
    resign(){ //This method requires workd, as the user currently is not being removed from the jobOffer
        this.isAvaiable = true; //Sets the property to true
        this.jobOffer = null; //Removes the job offer
        updateCandidate(this.id, {isAvaiable:true, jobOffer:null}) //Updates the database
        //An update could be creata a resign notice object, send to databse with the jobOfferid, and make the company accept the resignation
    }
    
}