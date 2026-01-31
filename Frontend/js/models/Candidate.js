import {updateCandidate} from "./../api.js"
export default class Candidate{
    constructor(id, name, email, password, isOpen, isAvaiable){
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.isAvaiable = isAvaiable;
        this.isOpen = isOpen;
    }
    static createCandidate({id = null, name = null, email = null, password = null, isOpen = null, isAvaiable = null}){
        if(!id || !name || !email || !password)return null
        return new Candidate(id, name, email, password, isOpen || false, isAvaiable || false)
    }
    async openToWork(){
        this.isOpen = true;
        return await updateCandidate(this.id, {isOpen:true})
    }
    async closeToWork(){
        this.isOpen = false;
        return await updateCandidate(this.id, {isOpen:false})
    }
    getHired(){
        //code
    }

}