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
    static createCandidate({id, name, email, password, isOpen, isAvaiable}){
        //Verifications for candidate object 
        return new Candidate(id, name, email, password, isOpen, isAvaiable)
    }
    async openToWork(){
        this.openToWork = true;
        return await updateCandidate({id: this.id, isOpen:true})
    }
    closeToWork(){
        this.openToWork = false;
        updateUser({id: this.id, isOpen:false})
    }
    getHired(){
        //code
    }
    

}