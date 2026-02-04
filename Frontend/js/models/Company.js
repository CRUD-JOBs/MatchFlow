import {updateCompany, createJobOffer, getCompany, updateJobOffer, getMatches} from "./../api.js"; 
import JobOffer from "./JobOffer.js"; import Match from "./Match.js"; import Candidate from "./Candidate.js";
export default class Company{
    static _companies = new Map()
    constructor(id, name, email, password, JobOffers, matches){
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.JobOffers = JobOffers;
        this.matches =  matches;

    }
    static async createCompany({id, name, email, password, jobOffers, matches}){
        if(!id || !name || !email || !password || !jobOffers || !matches){
            return null 
        }
        const matchesSet = new Set(matches) //Creates a Set as a match id can only appear once
        const jobOffersSet = new Set(jobOffers) //Creates a set as a jobOffer can only appear once
        return new Company(id, name, email, password, jobOffersSet, matchesSet)
    }
    static get companies(){
        return this._companies
    }
    static async getCompany(id){
        if(this._companies.has(id)){
            return this._companies.get(id)
        }
        try{
            const companyProperties = await getCompany(id);
            const newCompany = this.createCompany(companyProperties);
            this._companies.set(id, newCompany)
            return newCompany //returns the company object -> returns a promise, must use await
        } catch(error){
            console.error("Error fetching company:", error);
            return null; // Return null in case of error
        }
    }
    async createJobOffer(title, details){
        try{
            const offer = await createJobOffer({company_id: this.id, title: title, details: details, state: "on-going", candidates: []})
            this.JobOffers.add(offer.id)
            await updateCompany(this.id, {JobOffers: Array.from(this.JobOffers)}) //send an Array, as 
            return JobOffer.createJobOffer(offer) //returns the job offer object -> returns a promise, must use await
        } catch(error){
            console.error("Error creating job offer:", error);
            return null; // Return null in case of error
        }
    }
    async reserveCandidate(candidate_id, offer_id){
        try{
            const match = await Match.newMatch(candidate_id, this.id, offer_id)
            this.matches.add(match?.id)
            const candidate = await Candidate.getCandidate(candidate_id)
            if(!candidate){throw new Error("Error, candidate is null")}
            await candidate.reserve()
            await updateCompany(this.id, {matches: Array.from(this.matches)}) //Updates the company with the new match
            return match //returns the match object -> returns a promise, must use await
        } catch(error){
            console.error("Error reserving candidate:", error);
            return null; // Return null in case of error
        }
    }
    async rejectCandidate(match_id){
        try{
            const match = await Match.getMatch(match_id)
            if(!match){throw new Error("Error, match is null")}
            const candidate = Candidate.get(match.candidate_id)
            if(!candidate){throw new Error("Error, candidate us null")}
            await candidate.reject()
            return await match.close("rejected")
        }catch(error){
            console.error("Error rejecting candidate:", error);
            return null; // Return null in case of error
        }
    }
    async interviewCandidate(match_id){
        try{
            const match = await Match.getMatch(match_id)
            if(!match){throw new Error("Error, match is null")}
            return await match.interview()
        }catch(error){
            console.error("Error interviewing candidate:", error);
            return null; // Return null in case of error
        }
    }
    async hireCandidate(match_id){
        try{
            const match = await Match.getMatch(match_id)
            if(!match){throw new Error("Error, match is null")}
            const jobOffer = await JobOffer.getJobOffer(match.jobOffer_id)
            if(!jobOffer){throw new Error("Error, jobOffer is null")}
            await jobOffer.addCandidate() //adds candidate to jobOffer
            return await match.interview()
        }catch(error){
            console.error("Error interviewing candidate:", error);
            return null; // Return null in case of error
        }
    }
    async finalizeOffer(offer_id){
        try{
            const offer = await updateJobOffer(offer_id, {state: "finalized"})
            return JobOffer.createJobOffer(offer) //returns the job offer object -> returns a promise, must use await
        } catch(error){
            console.error("Error finalizing offer:", error);
            return null; // Return null in case of error
        }
    }
    async getJobOffers(){
        try{
            const jobOffers = await JobOffer.getJobOffers(...this.JobOffers);
            return jobOffers; //returns an array of job offer objects -> returns a promise, must use await
        } catch(error){
            console.error("Error fetching job offers:", error);
            return []; // Return an empty array in case of error
        }
    }
    async getMatches(){
        try{
            const allMatches = await getMatches(...this.matches);
            const matches = allMatches.map(match => Match.createMatch(match))
            return matches
        } catch(error){
            console.error("Error fetching matches:", error)
            return []
        }
    }
}