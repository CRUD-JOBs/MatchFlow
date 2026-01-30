import {updateOffer} from "./../api.js";
export default class JobOffer{
    constructor(id, company, candidates, details, state){
        this.id = id;
        this.company = company;
        this.candidates =  candidates;
        this.details = details;
        this.state = state;
    }
    InitateJob(){
        this.state = "on-going"
    }
    closeJobOffer(){
        this.state = "closed";
    }

}