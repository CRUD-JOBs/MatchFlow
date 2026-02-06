export class Candidate {
    constructor(id, name, email, isAvailable = true, skills = [], experience = "") {
        this.id = id;
        this.name = name;
        this.email = email;
        this.isAvailable = isAvailable;
        this.skills = skills;
        this.experience = experience;
    }

    /**
     * Actualiza la disponibilidad del candidato en el servidor
     * @param {boolean} status 
     */
    async updateAvailability(status) {
        try {
            const response = await fetch(`http://localhost:3000/candidates/${this.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ isAvailable: status })
            });
            if (!response.ok) throw new Error("Error al actualizar disponibilidad");
            this.isAvailable = status;
            return await response.json();
        } catch (error) {
            console.error("Error técnico:", error);
        }
    }

    /**
     * Obtiene todos los candidatos registrados
     */
    static async getAll() {
        try {
            const response = await fetch('http://localhost:3000/candidates');
            return await response.json();
        } catch (error) {
            console.error("Error al obtener candidatos:", error);
            return [];
        }
    }

    /**
     * Actualiza el perfil completo del candidato
     * @param {Object} newData 
     */
    async updateProfile(newData) {
        try {
            const response = await fetch(`http://localhost:3000/candidates/${this.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newData)
            });
            return await response.json();
        } catch (error) {
            console.error("Error al actualizar perfil:", error);
        }
    }
}