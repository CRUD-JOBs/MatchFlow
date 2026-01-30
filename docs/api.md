# API LINK
localhost:3000

## elements:

- candidates : 
    - **Minimum properties:**{id, name, email, password, state}
    - **Extra properties:** {phone, city, registerDate, workArea, contratType, salary, abilities, role}
- companies:
    - **Minimum properties:** {id, name, email, password, jobOffers, matches}
    - **Extra properties:** {techSector, phone, direction}
- jobOffers:
    - **Minimum properties:** {id, company_id, candidates, details, state}
- matches:
    - **Minimum properties:** {id, company_id, candidate_id, state}