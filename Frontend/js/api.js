const API_URL = "http://localhost:3000";

/* API CANDIDATES METHODS */

export const getCandidates = async () => {
    try {
        const response = await fetch(`${API_URL}/candidates`);
        if (!response.ok) throw new Error('Error fetching candidates');
        return await response.json();
    } catch (error) {
        console.error('Error in getCandidates:', error);
        throw error;
    }
};

export const getCandidate = async (id) => {
    try {
        const response = await fetch(`${API_URL}/candidates/${id}`);
        if (!response.ok) throw new Error(`Error fetching candidate ${id}`);
        return await response.json();
    } catch (error) {
        console.error('Error in getCandidate:', error);
        throw error;
    }
};

export const getCandidatesByName = async (name) => {
    try {
        const response = await fetch(`${API_URL}/candidates?name=${name}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        if (!response.ok) throw new Error('Error fetching candidates by name');
        return await response.json();
    } catch (error) {
        console.error('Error in getCandidatesByName:', error);
        throw error;
    }
};

export const getCandidatesByEmail = async (email) => {
    try {
        const response = await fetch(`${API_URL}/candidates?email=${email}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        if (!response.ok) return null;
        const data = await response.json();
        return data.length > 0 ? data[0] : null;
    } catch (error) {
        console.error('Error in getCandidatesByEmail:', error);
        return null;
    }
};

export const updateCandidate = async (id, params) => {
    try {
        const response = await fetch(`${API_URL}/candidates/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(params)
        });
        if (!response.ok) throw new Error(`Error updating candidate ${id}`);
        return await response.json();
    } catch (error) {
        console.error('Error in updateCandidate:', error);
        throw error;
    }
};

export const createCandidate = async (params) => {
    try {
        const response = await fetch(`${API_URL}/candidates`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(params)
        });
        if (!response.ok) throw new Error('Error creating candidate');
        return await response.json();
    } catch (error) {
        console.error('Error in createCandidate:', error);
        throw error;
    }
};

export const deleteCandidate = async (id) => {
    try {
        const response = await fetch(`${API_URL}/candidates/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        });
        if (!response.ok) throw new Error(`Error deleting candidate ${id}`);
        return await response.json();
    } catch (error) {
        console.error('Error in deleteCandidate:', error);
        throw error;
    }
};

/* API COMPANIES METHODS */

export const getCompanies = async () => {
    try {
        const response = await fetch(`${API_URL}/companies`);
        if (!response.ok) throw new Error('Error fetching companies');
        return await response.json();
    } catch (error) {
        console.error('Error in getCompanies:', error);
        throw error;
    }
};

export const getCompany = async (id) => {
    try {
        const response = await fetch(`${API_URL}/companies/${id}`);
        if (!response.ok) throw new Error(`Error fetching company ${id}`);
        return await response.json();
    } catch (error) {
        console.error('Error in getCompany:', error);
        throw error;
    }
};

export const getCompaniesByName = async (name) => {
    try {
        const response = await fetch(`${API_URL}/companies?name=${name}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        if (!response.ok) throw new Error('Error fetching companies by name');
        return await response.json();
    } catch (error) {
        console.error('Error in getCompaniesByName:', error);
        throw error;
    }
};

export const getCompanyByEmail = async (email) => {
    try {
        const response = await fetch(`${API_URL}/companies?email=${email}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        if (!response.ok) return null;
        const data = await response.json();
        return data.length > 0 ? data[0] : null;
    } catch (error) {
        console.error('Error in getCompanyByEmail:', error);
        return null;
    }
};

export const updateCompany = async (id, params) => {
    try {
        const response = await fetch(`${API_URL}/companies/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(params)
        });
        if (!response.ok) throw new Error(`Error updating company ${id}`);
        return await response.json();
    } catch (error) {
        console.error('Error in updateCompany:', error);
        throw error;
    }
};

export const createCompany = async (params) => {
    try {
        const response = await fetch(`${API_URL}/companies`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(params)
        });
        if (!response.ok) throw new Error('Error creating company');
        return await response.json();
    } catch (error) {
        console.error('Error in createCompany:', error);
        throw error;
    }
};

export const deleteCompany = async (id) => {
    try {
        const response = await fetch(`${API_URL}/companies/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        });
        if (!response.ok) throw new Error(`Error deleting company ${id}`);
        return await response.json();
    } catch (error) {
        console.error('Error in deleteCompany:', error);
        throw error;
    }
};

/* API JOB OFFERS METHODS */
export const getJobOffers = async () => {
    try {
        const response = await fetch(`${API_URL}/jobOffers`);
        if (!response.ok) throw new Error('Error fetching job offers');
        return await response.json();
    } catch (error) {
        console.error('Error in getJobOffers:', error);
        throw error;
    }
};

export const getJobOffer = async (id) => {
    try {
        const response = await fetch(`${API_URL}/jobOffers/${id}`);
        if (!response.ok) throw new Error(`Error fetching job offer ${id}`);
        return await response.json();
    } catch (error) {
        console.error('Error in getJobOffer:', error);
        throw error;
    }
};

export const updateJobOffer = async (id, params) => {
    try {
        const response = await fetch(`${API_URL}/jobOffers/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(params)
        });
        if (!response.ok) throw new Error(`Error updating job offer ${id}`);
        return await response.json();
    } catch (error) {
        console.error('Error in updateJobOffer:', error);
        throw error;
    }
};

export const createJobOffer = async (params) => {
    try {
        const response = await fetch(`${API_URL}/jobOffers`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(params)
        });
        if (!response.ok) throw new Error('Error creating job offer');
        return await response.json();
    } catch (error) {
        console.error('Error in createJobOffer:', error);
        throw error;
    }
};

export const getJobOffersByCompany = async (company_id) => {
    try {
        const response = await fetch(`${API_URL}/jobOffers?company_id=${company_id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        if (!response.ok) throw new Error('Error fetching job offers by company');
        return await response.json();
    } catch (error) {
        console.error('Error in getJobOffersByCompany:', error);
        throw error;
    }
};

export const deleteJobOffer = async (id) => {
    try {
        const response = await fetch(`${API_URL}/jobOffers/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        });
        if (!response.ok) throw new Error(`Error deleting job offer ${id}`);
        return await response.json();
    } catch (error) {
        console.error('Error in deleteJobOffer:', error);
        throw error;
    }
};

/* API MATCHES METHODS */
export const getMatches = async () => {
    try {
        const response = await fetch(`${API_URL}/matches`);
        if (!response.ok) throw new Error('Error fetching matches');
        return await response.json();
    } catch (error) {
        console.error('Error in getMatches:', error);
        throw error;
    }
};

export const getMatchesByCompany = async (company_id) => {
    try {
        const response = await fetch(`${API_URL}/matches?company=${company_id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        if (!response.ok) throw new Error('Error fetching matches by company');
        return await response.json();
    } catch (error) {
        console.error('Error in getMatchesByCompany:', error);
        throw error;
    }
};

export const getMatchByCandidate = async (candidate_id) => {
    try {
        const response = await fetch(`${API_URL}/matches?candidate=${candidate_id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        if (!response.ok) return null;
        const data = await response.json();
        return data.length > 0 ? data[0] : null;
    } catch (error) {
        console.error('Error in getMatchByCandidate:', error);
        return null;
    }
};

export const getMatch = async (id) => {
    try {
        const response = await fetch(`${API_URL}/matches/${id}`);
        if (!response.ok) throw new Error(`Error fetching match ${id}`);
        return await response.json();
    } catch (error) {
        console.error('Error in getMatch:', error);
        throw error;
    }
};

export const updateMatch = async (id, params) => {
    try {
        const response = await fetch(`${API_URL}/matches/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(params)
        });
        if (!response.ok) throw new Error(`Error updating match ${id}`);
        return await response.json();
    } catch (error) {
        console.error('Error in updateMatch:', error);
        throw error;
    }
};

export const createMatch = async (params) => {
    try {
        const response = await fetch(`${API_URL}/matches`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(params)
        });
        if (!response.ok) throw new Error('Error creating match');
        return await response.json();
    } catch (error) {
        console.error('Error in createMatch:', error);
        throw error;
    }
};

export const deleteMatch = async (id) => {
    try {
        const response = await fetch(`${API_URL}/matches/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        });
        if (!response.ok) throw new Error(`Error deleting match ${id}`);
        return await response.json();
    } catch (error) {
        console.error('Error in deleteMatch:', error);
        throw error;
    }
};

/* SESSION MANAGEMENT METHODS */
export const saveSession = (user) => {
    sessionStorage.setItem('currentUser', JSON.stringify({
        id: user.id,
        name: user.name,
        email: user.email,
        password : user.password,
        role: user.role || (user.jobOffers !== undefined ? 'company' : 'candidate')
    }));
};

export const getCurrentSession = () => {
    const session = sessionStorage.getItem('currentUser');
    return session ? JSON.parse(session) : null;
};

export const clearSession = () => {
    sessionStorage.removeItem('currentUser');
};

export const isAuthenticated = () => {
    return getCurrentSession() !== null;
};

/* AUTHENTICATION METHODS */
export const authenticateCandidate = async (email, password) => {
    try {
        const candidate = await getCandidatesByEmail(email);
        if (!candidate) {
            throw new Error('Candidate not found');
        }
        if (candidate.password !== password) {
            throw new Error('Invalid password');
        }
        return { ...candidate, role: 'candidate' };
    } catch (error) {
        console.error('Error in authenticateCandidate:', error);
        throw error;
    }
};

export const authenticateCompany = async (email, password) => {
    try {
        const company = await getCompanyByEmail(email);
        if (!company) {
            throw new Error('Company not found');
        }
        if (company.password !== password) {
            throw new Error('Invalid password');
        }
        return { ...company, role: 'company' };
    } catch (error) {
        console.error('Error in authenticateCompany:', error);
        throw error;
    }
};

export const registerCandidate = async (name, email, password) => {
    try {
        // Verificar si el email ya existe
        const existing = await getCandidatesByEmail(email);
        if (existing) {
            throw new Error('Email already registered');
        }
        // Crear nuevo candidato
        const newCandidate = await createCandidate({
            name,
            email,
            password,
            isOpen: false,
            isAvaiable: false
        });
        return { ...newCandidate, role: 'candidate' };
    } catch (error) {
        console.error('Error in registerCandidate:', error);
        throw error;
    }
};

export const registerCompany = async (name, email, password) => {
    try {
        // Verificar si el email ya existe
        const existing = await getCompanyByEmail(email);
        if (existing) {
            throw new Error('Email already registered');
        }
        // Crear nueva compañía
        const newCompany = await createCompany({
            name,
            email,
            password,
            jobOffers: [],
            matches: []
        });
        return { ...newCompany, role: 'company' };
    } catch (error) {
        console.error('Error in registerCompany:', error);
        throw error;
    }
};

export default API_URL;