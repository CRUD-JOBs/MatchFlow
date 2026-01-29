# ¿Qué es este proyecto?
- MatchFlow, a hiring platform designed to reduce time-to-hire and eliminate the friction of traditional recruitment processes.

# ¿Qué problema resuelve?
- Unlike classic job platforms, MatchFlow does not rely on applications or waiting for candidates to apply.

# ¿Cómo se corre localmente?  
     matchflow/
     │
     ├── frontend/
     │   ├── index.html
     │   ├── login.html
     │   ├── signup.html
     │   ├── dashboard.html
     │
     │   ├── css/
     │   │   └── styles.css
     │
     │   ├── js/
     │   │   ├── api.js               # Comunicación con json-server
     │   │
     │   │   ├── initialize/          # Inicialización de objetos
     │   │   │   ├── initializeCandidate.js
     │   │   │   └── initializeCompany.js
     │   │   │
     │   │   ├── models/              # Modelos frontend reales
     │   │   │   ├── Candidate.js
     │   │   │   ├── Company.js
     │   │   │   └── JobOffer.js
     │   │   │
     │   │   ├── services/            # Lógica de negocio / orquestación
     │   │   │   ├── candidateService.js
     │   │   │   ├── companyService.js
     │   │   │   └── matchService.js
     │   │   │
     │   │   ├── pages/               # Código específico por página
     │   │   │   ├── login.js
     │   │   │   ├── signup.js
     │   │   │   └── dashboard.js
     │   │   │
     │   │   └── utils/               # Helpers, cache, constantes
     │   │       └── cache.js
     │
     ├── backend/
     │   ├── db.json                  # json-server mock
     │   └── server.js                # json-server config (si aplica)
     │
     ├── docs/
     │   ├── README.md
     │   ├── workflow.md
     │   └── api.md
     │
     ├── .gitignore
     ├── README.md
     └── package.json

# ¿Qué tecnologías usamos?
- Discord
