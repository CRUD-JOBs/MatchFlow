import {updateMatch, getMatch, createMatch} from "./../api.js";
export default class Match{
    static _matches = new Map()
    constructor(id, candidate, company, jobOffer_id, state){
        this.id = id;
        this.candidate_id = candidate;
        this.company_id = company;
        this.jobOffer_id = jobOffer_id;
        this.state = state;
    }
    static createMatch({id, candidate_id, company_id, jobOffer_id, state}){
        if(!id||!candidate_id||!company_id||!state ||!jobOffer_id){
            console.error("Not all parameters for JobOffer provided");
            return null
        }
        return new Match(id, candidate_id, company_id, jobOffer_id, state)
    }
    static get matches(){
        return this._matches
    }
    static async getMatch(id){
        if(this._matches.has(id)){
            return this.matches.get(id)
        }
        try{
            const matchParams = await getMatch(id);
            const match = this.createMatch(matchParams)
            this._matches.set(id, match)
            return  match//Returns as promise, must use await
        } catch(error){
            console.error("HTTP error while trying to fetch Match", error)
            return null
        }
    }
    static async newMatch(candidate_id, company_id, jobOffer_id){
        try{
            const matchParams = await createMatch({candidate_id:candidate_id, company_id:company_id, jobOffer_id:jobOffer_id, state:"pending"});
            const match = this.createMatch(matchParams)
            this.matches.set(match.id, match)
            return match
        } catch(error){
            console.error("HTTP Error while trying to create match: ", error)
            return null
        }
    }
    async close(state){ //Gets state, hired or rejected
        try{
            const response = await updateMatch(this.id, {state: state})
            this.state = "completed"
            return response
        } catch(error){
            console.error("HTTP error while fetching to update match", error)
            return null
        }
    }
    async interview(){
        try{
            const response = await updateMatch(this.id, {state: "interview"})
            this.state = "interview"
            return response
        } catch(error){
            console.error("HTTP error while fetching to update match", error)
            return null
        }
    }
}
