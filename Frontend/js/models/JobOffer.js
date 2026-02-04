import {updateJobOffer, getJobOffer, getJobOffers} from "./../api.js";
export default class JobOffer{
    static _jobOffers = new Map()
    constructor(id, company, candidates, details, state){
        this.id = id;
        this.company_id = company;
        this.candidates_id =  candidates;
        this.details = details;
        this.state = state;
    }
    static createJobOffer({id, company_id, candidates_id, details, state}){
        if(!id||!company_id||!candidates_id||!details||!state){
            console.error("Not all parameters for JobOffer provided")
            return null
        }
        return new JobOffer(id, company_id, candidates_id, details, state)
    }
    static get jobOffers(){
        return this._jobOffers
    }
    static async getJobOffer(id){
        if(this._jobOffers.has(id)){
            return this._jobOffers.get(id)
        }
        try{
            const jobOfferParams = await getJobOffer(id)
            const jobOffer = JobOffer.createJobOffer(jobOfferParams)
            this._jobOffers.set(id, jobOffer)
            return jobOffer
        } catch(error){
            console.error("HTTP Error while trying to fetch jobOffer: ", error)
            return null
        }
    }
    static async getJobOffers(...ids){
        const query = ids
            .filter(id=> !this._jobOffers.has(id))
            .map(id => `${id}`)
            .join(','); //Get the query for all offers not in memory
        const arQuery = query.split(",");
        try{
            const response = await getJobOffers(...arQuery)
            for (const offer of response){
                this._jobOffers.set(offer.id, this.createJobOffer(offer))
            }
            return ids.map(id=> this._jobOffers.get(id))
        } catch(error){
            console.error("HTTP Error while trying to fetch jobOffers: ", error)
            return null
        }
    }
    async addCandidate(candidate_id){
        try{
            const candidates = this.candidates_id.concat([candidate_id])
            const response = await updateJobOffer(this.id, {candidates_id: candidates})
            this.candidates_id.push(candidate_id)
            return response
        } catch(error){
            console.error("HTTP Error while trying to fetch jobOffer")
            return null
        }
    }
    async InitateJob(){
        try{
            this.state = "on-going"
            return await updateJobOffer(this.id, {state:this.state})
        } catch (error){
            console.error("Error fetching to update jobOffer: ", error)
            return null
        }
    }
    async closeJobOffer(){
        try{
            this.state = "closed";
            return await updateJobOffer(this.id, {state:this.state})
        } catch(error){
            console.error("Error fetching to update jobOffer: ", error)
            return null
        }
    }

}