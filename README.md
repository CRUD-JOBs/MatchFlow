# MatchFlow

## Plataforma Inteligente de Reclutamiento
MatchFlow es una plataforma de contratación diseñada para reducir el tiempo de contratación y eliminar la fricción de los procesos tradicionales de reclutamiento.

---

## Tabla de Contenidos

1. [Acerca del Proyecto](#acerca-del-proyecto)
2. [Problema que Resuelve](#problema-que-resuelve)
3. [Características Principales](#características-principales)
4. [Tecnologías Utilizadas](#tecnologías-utilizadas)
5. [Estructura del Proyecto](#estructura-del-proyecto)
6. [Instalación y Ejecución](#instalación-y-ejecución)
7. [Documentación](#documentación)
8. [Flujo de Trabajo](#flujo-de-trabajo)
9. [API Reference](#api-reference)
10. [Modelo de Datos](#modelo-de-datos)
11. [Guía de Contribución](#guía-de-contribución)
12. [Licencia](#licencia)

---

## Acerca del Proyecto

MatchFlow revoluciona la forma en que empresas y candidatos se encuentran en el mercado laboral. A diferencia de las plataformas tradicionales que dependen depostulaciones pasivas, MatchFlow conecta directamente a empresas con candidatos disponibles que han activado su estado "Open to Work".

### Objetivos del Proyecto

- Reducir el tiempo de contratación de semanas a días
- Eliminar la fricción en procesos de reclutamiento tradicionales
- Conectar empresas directamente con candidatos disponibles
- Simplificar el proceso de match entre talento y oportunidades

---

## Problema que Resuelve

Las plataformas de empleo tradicionales presentan múltiples problemas:

| Problema Tradicional | Solución MatchFlow |
|---------------------|-------------------|
| El candidato debe buscar y postularse a ofertas | Las empresas buscan candidatos disponibles activamente |
| Proceso largo con múltiples etapas | Match directo y flujo controlado |
| Esperar a que los candidatos apliquen | Candidatos visibles inmediatamente al activar "Open to Work" |
| Falta de comunicación en tiempo real | Sistema de estados y reservas en tiempo real |

---

## Características Principales

### Para Candidatos
- **Registro y Autenticación** - Creación de perfil con credenciales seguras
- **Estado Open to Work** - Activar/desactivar visibilidad para empresas
- **Gestión de Perfil** - Información profesional, habilidades y experiencia
- **Control de Disponibilidad** - Gestionar cuándo estar visible

### Para Empresas
- **Registro y Autenticación** - Creación de perfil empresarial
- **Gestión de Ofertas** - Crear y administrar vacantes de empleo
- **Búsqueda de Candidatos** - Filtrar por habilidades, experiencia y estado
- **Sistema de Match** - Reservar y contactar candidatos
- **Dashboard** - Panel de control con métricas y procesos activos

### Sistema de Match
```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Open      │ → │  Reserved   │ → │  Contacted  │ → │   Hired     │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
```

---

## Tecnologías Utilizadas

### Frontend
- **HTML5** - Estructura semántica
- **CSS3** - Estilos personalizados
- **Bootstrap 5** - Framework CSS responsive
- **JavaScript (ES6+)** - Lógica de aplicación
- **ES6 Modules** - Modularidad del código

### Backend
- **JSON Server** - Mock REST API
- **Fetch API** - Comunicación HTTP

### Herramientas de Desarrollo
- **Git** - Control de versiones
- **Discord** - Comunicación del equipo
- **VS Code** - Editor de código

## Instalación y Ejecución

### Prerrequisitos

- Node.js (versión 14 o superior)
- NPM (incluido con Node.js)

### Paso 1: Clonar el Repositorio

```bash
git clone <URL-del-repositorio>
cd Crudzaso-MatchFlow
```

### Paso 2: Instalar Dependencias

```bash
# Instalar json-server globalmente
npm install -g json-server

# O instalar localmente
npm install json-server
```

### Paso 3: Iniciar el Servidor Backend

```bash
# Opción 1: Usando json-server directamente
json-server --watch Backend/db.json --port 3000

# Opción 2: Usando el script del package.json
npm start
```

El servidor se iniciará en: **http://localhost:3000**

### Paso 4: Iniciar la Aplicación Frontend

Simplemente abre el archivo `index.html` en tu navegador:

```bash
# Usando Python (si está disponible)
python3 -m http.server 8000

# O abre directamente el archivo en tu navegador
# Frontend/index.html
```

### URLs de Acceso

| Página | URL |
|--------|-----|
| Landing Page | `http://localhost:8000/Frontend/index.html` |
| Login | `http://localhost:8000/Frontend/login.html` |
| Registro | `http://localhost:8000/Frontend/signup.html` |
| Dashboard | `http://localhost:8000/Frontend/dashboard.html` |

---

## Documentación

### Documentación Adicional

- **[API Reference](./docs/api.md)** - Endpoints disponibles y métodos
- **[Flujo de Trabajo](./docs/workflow.md)** - Diagramas y procesos del sistema
- **[Documentación General](./docs/README.md)** - Guía completa del proyecto

---

## Flujo de Trabajo

### Flujo de Candidatos

```
1. Registro → 2. Login → 3. Completar Perfil → 4. Activar "Open to Work"
```

### Flujo de Empresas

```
1. Registro → 2. Login → 3. Crear Oferta → 4. Buscar Candidatos → 5. Crear Match
```

### Estados de un Match

| Estado | Descripción |
|--------|-------------|
| `Open` | Candidato visible y disponible |
| `Reserved` | Candidato reservado por una empresa |
| `Contacted` | Empresa ha contactado al candidato |
| `Hired` | Candidato contratado exitosamente |

---

## API Reference

### Base URL

```
http://localhost:3000
```

### Endpoints de Candidatos

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/candidates` | Obtener todos los candidatos |
| GET | `/candidates/:id` | Obtener candidato por ID |
| POST | `/candidates` | Crear nuevo candidato |
| PATCH | `/candidates/:id` | Actualizar candidato |
| DELETE | `/candidates/:id` | Eliminar candidato |
| GET | `/candidates?email=:email` | Buscar por email |

### Endpoints de Empresas

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/companies` | Obtener todas las empresas |
| GET | `/companies/:id` | Obtener empresa por ID |
| POST | `/companies` | Crear nueva empresa |
| PATCH | `/companies/:id` | Actualizar empresa |
| DELETE | `/companies/:id` | Eliminar empresa |

### Endpoints de Ofertas Laborales

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/jobOffers` | Obtener todas las ofertas |
| GET | `/jobOffers/:id` | Obtener oferta por ID |
| POST | `/jobOffers` | Crear nueva oferta |
| PATCH | `/jobOffers/:id` | Actualizar oferta |
| DELETE | `/jobOffers/:id` | Eliminar oferta |
| GET | `/jobOffers?company_id=:id` | Obtener ofertas de una empresa |

### Endpoints de Matches

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/matches` | Obtener todos los matches |
| GET | `/matches/:id` | Obtener match por ID |
| POST | `/matches` | Crear nuevo match |
| PATCH | `/matches/:id` | Actualizar match |
| DELETE | `/matches/:id` | Eliminar match |
| GET | `/matches?company=:id` | Obtener matches de una empresa |
| GET | `/matches?candidate=:id` | Obtener match de un candidato |

---

## Modelo de Datos

### Candidate (Candidato)

```json
{
  "id": "string",
  "name": "string",
  "email": "string",
  "password": "string",
  "isOpen": "boolean",
  "isAvaiable": "boolean",
  "phone": "string",
  "city": "string",
  "registerDate": "date",
  "workArea": "string",
  "contratType": "string",
  "salary": "number",
  "abilities": "array",
  "role": "string"
}
```

### Company (Empresa)

```json
{
  "id": "string",
  "name": "string",
  "email": "string",
  "password": "string",
  "jobOffers": "array",
  "matches": "array",
  "techSector": "string",
  "phone": "string",
  "direction": "string"
}
```

### JobOffer (Oferta Laboral)

```json
{
  "id": "string",
  "company_id": "string",
  "candidates": "array",
  "details": "string",
  "state": "string"
}
```

### Match (Emparejamiento)

```json
{
  "id": "string",
  "candidate": "string",
  "company": "string",
  "state": "string"
}
```

---

## Ramas y Control de Versiones

### Convención de Nombres de Ramas

```
feature/us-<ID-userStory>-<main-feature>
```

### Ejemplo

```
feature/us-1-open-to-work
feature/us-2-create-job-offers
```

### Ramas Principales

- `main` - Rama principal (producción)
- `develop` - Rama de desarrollo
- `feature/*` - Nuevas funcionalidades

---

## Historias de Usuario

| ID | Descripción | Criterios de Aceptación |
|----|-------------|------------------------|
| US-1 | Open to Work | Activar/desactivar estado, visibilidad en búsquedas |
| US-2 | Crear Ofertas | Crear con título, descripción y tipo de puesto |
| US-3 | Buscar Candidatos | Búsqueda filtrada por skills y experiencia |
| US-4 | Crear Match | Vincular candidato a oferta específica |
| US-5 | Reservar Candidatos | Bloqueo para otras empresas durante evaluación |
| US-6 | Contactar Candidato | Solo en estado "Contacted" |
| US-7 | JSON-Server | Backend mock funcional con caché |
| US-8 | Documentación | README y documentación técnica completa |

## Guía de Contribución

1. Fork el repositorio
2. Crea una rama: `git checkout -b feature/nueva-funcionalidad`
3. Commit tus cambios: `git commit -m "Agrega nueva funcionalidad"`
4. Push a la rama: `git push origin feature/nueva-funcionalidad`
5. Abre un Pull Request

---

## Licencia

Este proyecto está bajo la Licencia MIT.

---

## Equipo de Desarrollo

- **Desarrolladores** - Equipo CrudJobs
- **Scrum Master** - [Santiago-Sanches-Ruiz]
- **Product Owner** - [Juliana-Sofia-Valencia]

---

## Contacto

- **Discord:** https://discord.gg/twEJJYx7
- **GitHub:** https://github.com/CRUD-JOBs/MatchFlow.git

---

---

## Estructura del Proyecto

```
MatchFlow/
├── 📂 Frontend/
│   ├── 📄 index.html              # Landing page
│   ├── 📄 login.html              # Página de inicio de sesión
│   ├── 📄 signup.html             # Página de registro
│   ├── 📄 dashboard.html          # Panel principal (empresas)
│   ├── 📂 css/
│   │   └── 📄 style.css           # Estilos personalizados
│   ├── 📂 js/
│   │   ├── 📄 api.js              # Comunicación con API
│   │   ├── 📂 initialize/
│   │   │   ├── 📄 initializeCandidate.js
│   │   │   └── 📄 initializeCompany.js
│   │   ├── 📂 models/
│   │   │   ├── 📄 Candidate.js    # Modelo de candidato
│   │   │   ├── 📄 Company.js      # Modelo de empresa
│   │   │   ├── 📄 JobOffer.js     # Modelo de oferta laboral
│   │   │   └── 📄 Match.js        # Modelo de match
│   │   ├── 📂 services/
│   │   │   ├── 📄 candidateService.js
│   │   │   ├── 📄 companyService.js
│   │   │   └── 📄 matchService.js
│   │   ├── 📂 pages/
│   │   │   ├── 📄 login.js        # Lógica de login
│   │   │   ├── 📄 signup.js       # Lógica de registro
│   │   │   ├── 📄 dashboard.js    # Lógica del dashboard
│   │   │   └── 📄 signout.js      # Lógica de cierre de sesión
│   │   └── 📂 utils/
│   │       └── 📄 cache.js        # Sistema de caché
│   └── 📂 assets/
│       └── 📂 image/
│           └── 📄 logo.jpg
│
├── 📂 Backend/
│   ├── 📄 db.json                 # Base de datos JSON
│   └── 📄 server.js               # Configuración del servidor
│
├── 📂 docs/
│   ├── 📄 README.md               # Documentación general
│   ├── 📄 api.md                  # Documentación de API
│   └── 📄 workflow.md             # Flujo de trabajo
│
├── 📄 .gitignore
└── 📄 README.md                   # Este archivo
```

---

<div align="center">

**¡Gracias por usar MatchFlow!** 

*Revolutionizing the way talent meets opportunity*

</div>