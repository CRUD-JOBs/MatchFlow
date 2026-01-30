import {updateOffer} from "./../api.js";
export default class JobOffer{
    constructor(id, company_id, candidates, details, state){
        this.id = id;
        this.company_id = company_id;
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