export class Company {
    constructor(id, name, email, description = "") {
        this.id = id;
        this.name = name;
        this.email = email;
        this.description = description;
    }

    /**
     * Obtiene todas las empresas
     */
    static async getAll() {
        try {
            const response = await fetch('http://localhost:3000/companies');
            return await response.json();
        } catch (error) {
            console.error("Error al obtener empresas:", error);
            return [];
        }
    }

    /**
     * Crea una nueva oferta de trabajo
     * @param {Object} jobData { title, description, status }
     */
    async createJobOffer(jobData) {
        try {
            const response = await fetch('http://localhost:3000/jobs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...jobData,
                    companyId: this.id,
                    status: 'open'
                })
            });
            return await response.json();
        } catch (error) {
            console.error("Error al crear oferta:", error);
        }
    }

    /**
     * Obtiene las métricas para el dashboard
     */
    static async getMetrics() {
        try {
            const [jobs, candidates, apps] = await Promise.all([
                fetch('http://localhost:3000/jobs').then(r => r.json()),
                fetch('http://localhost:3000/candidates').then(r => r.json()),
                fetch('http://localhost:3000/applications').then(r => r.json())
            ]);

            return {
                totalJobs: jobs.length,
                totalCandidates: candidates.length,
                activeProcesses: apps.filter(a => a.status !== 'rejected').length
            };
        } catch (error) {
            console.error("Error al obtener métricas:", error);
        }
    }
}