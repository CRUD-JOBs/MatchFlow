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
- Discord (Canal de comunicación)
- Bootstrap5 (Librearía para Frontend)
- JSON-server (Mock REST API)

# Estandar Branches
- feature/us-&lt;ID-userStory&gt;-&lt;main-feature&gt; 
    - **Ejemplo:** feature/us-1-open-to-work
- 
# SCRUM
# User Stories - Proyecto In MatchFlow

A continuación las historias de usuario y criterios de aceptación para el proyecto MatchFlow, desarrollado en un sprint de 2 días.

---

- [ ] User story 1
    - Como **candidato**, quiero poder activar mi estado **Open to Work**, para que las empresas me vean como disponible.
        - [x] El candidato puede activar/desactivar el estado Open to Work.
        - [ ] Al activar Open to Work, el candidato aparece en la lista de candidatos visibles para las empresas.
        - [ ] Al desactivar Open to Work, el candidato deja de ser visible para las empresas.

- [ ] User story 2
    - Como **empresa**, quiero poder **crear ofertas de trabajo**, para publicar vacantes disponibles.
        - [ ] La empresa puede crear una oferta con título, descripción y tipo de puesto.
        - [ ] Las ofertas creadas se almacenan en json-server.
        - [ ] Las ofertas creadas aparecen en la lista de ofertas disponibles para la empresa.

- [ ] User story 3
    - Como **empresa**, quiero poder **buscar candidatos disponibles**, para encontrar perfiles que estén Open to Work.
        - [ ] La búsqueda solo muestra candidatos con estado Open to Work activo.
        - [ ] Los resultados de búsqueda se actualizan dinámicamente según los filtros aplicados (ej. skills, experiencia).
        - [ ] La búsqueda obtiene los datos desde json-server con caché para optimizar performance.

- [ ] User story 4
    - Como **empresa**, quiero poder **crear un match con un candidato**, para vincularlo a una oferta de trabajo específica.
        - [ ] El match se asocia a un candidato y a una oferta de trabajo.
        - [ ] Los matches se almacenan en json-server.
        - [ ] Un candidato solo puede estar reservado por una empresa a la vez (bloqueo de concurrencia).

- [ ] User story 5
    - Como **empresa**, quiero poder **reservar candidatos**, para que otros no puedan seleccionarlos mientras estoy evaluando la contratación.
        - [ ] Al reservar un candidato, este queda bloqueado para otras empresas.
        - [ ] La reserva se libera si la empresa cancela o completa el proceso.
        - [ ] La reserva se refleja correctamente en json-server y en la interfaz.

- [ ] User story 6
    - Como **empresa**, quiero que el **contacto con el candidato** solo sea posible cuando el match llegue al estado "Contacted", para mantener el flujo de contratación controlado.
        - [ ] La opción de contactar al candidato solo aparece en el estado Contacted.
        - [ ] Los intentos de contactar fuera de este estado están bloqueados.
        - [ ] El estado Contacted se puede actualizar desde la interfaz y se guarda en json-server.

- [ ] User story 7
    - Como **desarrollador**, quiero que **json-server y caching estén implementados**, para simular un backend funcional y rápido.
        - [ ] Todos los datos se obtienen y actualizan a través de json-server.
        - [ ] Los endpoints usan cache local para mejorar la performance.
        - [ ] Se documenta claramente cómo iniciar y usar json-server en el proyecto.

- [ ] User story 8
    - Como **equipo de desarrollo**, queremos que el proyecto esté **versionado y documentado**, para mantener claridad y control sobre el código.
        - [ ] El proyecto utiliza Git con commits claros.
        - [ ] Existe un README con instrucciones de instalación, uso y desarrollo.
        - [ ] Las decisiones técnicas importantes están documentadas (estructura de datos, endpoints, flujo de reserva, etc.).
