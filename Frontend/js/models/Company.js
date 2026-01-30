import {updateCompany, createJobOffer} from "./../api.js"; import JobOffer from "./JobOffer.js";
export default class Company{
    constructor(id, name, email, password, JobOffers, matches){
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.JobOffers = JobOffers;
        this.matches =  matches;

    }
    createJobOffer(details){
        //code
    }
    reserveCandidate(candidate, offer){
        this.createMatch(candidate, offer) //Creates a match, if contrated, is finally put inside the offer
        //code
    }
    createMatch(candidate, offer){
        //code
    }
    finalizeOffer(offer){
        //code
    }
    hireCandidate(candidate, offer){
        //code
    }
    discardCandidate(candidate, offer){
        //code
    }
    contactCandidate(candidate){
        //code
    }
}