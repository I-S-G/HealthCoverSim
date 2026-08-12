# HealthCoverSim

HealthCoverSim is a health insurance quote simulator that calculates an estimated insurance premium based on the selected cover type, hospital cover, extras cover, payment frequency, annual discount, and applicant information.
This project was made for CSE3CWA Assignment I using react(vite) + ts + tailwindcss + sqlite (Prisma ORM) + expressjs + nodejs.


## Requirements

Before running the project, make sure you have installed:

- [Node.js](https://nodejs.org/)
- npm
- Git

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/I-S-G/HealthCoverSim.git
cd HealthCoverSim
```

The project contains separate frontend and backend applications.

### 2. Install frontend dependencies

```bash
cd frontend
npm install
```

### 3. Install backend dependencies

Open another terminal:

```bash
cd backend
npm install
```

## Environment Variables

Create a `.env` file inside the backend directory.

For the SQLite database:

```env
DATABASE_URL="file:./dev.db"
```

## Database Setup

The backend uses **SQLite** with **Prisma ORM**.

After installing the backend dependencies, generate the Prisma Client:

```bash
npx prisma generate
```

The database is initialised using Prisma migrations:

```bash
npx prisma migrate dev
```

This creates the SQLite database file and applies the database schema defined in:

```text
prisma/schema.prisma
```

### Prisma Studio

To inspect the database using Prisma Studio:

```bash
npx prisma studio
```

## Running the Project

### Start the backend

From the `backend` directory:

```bash
npm run dev
```

The backend API will run on PORT 5001.

### Start the frontend

From the `frontend` directory:

```bash
npm run dev
```

The frontend can then be accessed through the local development URL shown by the frontend development server.

## Quote Calculation

The quote simulator calculates a premium using the information provided by the applicant.

The main inputs are:

- Cover type
- Hospital cover
- Extras cover
- Payment frequency
- Annual discount
- Applicant age
- Hospital cover history

The application first determines the base price for the selected hospital and extras cover for each applicant. Then it checks if the applicant is eligible for LHC (LHC is only applied to the hospital cover of the eligible applicant(s)) and applies 2% of (applicant's age - 30) extra fee if eligible. Then it checks if the cover is family and applies extra $30 charge for family cover. Finally monthly cost and yearly cost before discount is calculated and the total is checked for annual discount eligibility and the discount is applied if eligible.

The calculation is implemented in the backend so that the pricing logic is kept separate from the frontend. The main calculation logic is contained in the file "@/backend/src/lib/quoteCalculator.ts"


The application uses predefined pricing tables rather than retrieving prices from a real insurance provider.

## Family Cover Calculation

Family cover allows multiple applicants to be included in a single quote.
Pricing is only applied to adult applicants and the premiums for the children (no matter the number) is included for a fixed additional $30.


## Payment Frequency

The simulator supports:

- Monthly payments
- Yearly payments

Annual payment can also receive the configured annual discount (upto 10%).

## Hospital and Extras Cover

Hospital and extras cover use predefined prices stored in the application.

For example, hospital cover is represented using named cover levels such as:

```text
None
Basic
Bronze
Silver
Gold
...
```

The selected cover determines the corresponding base price used during the calculation.

Extras cover is handled in a similar way using the predefined extras pricing.

These values are simulation data and are not taken from a real health insurance provider.

## Forms & Validation

react-hook-forms is used for more efficient re-renders. Zod schemas are defined and used for form input validations in the front-end.

## AI Assistance

AI tools were used as a development assistant during the project.

AI assistance was used for tasks such as:

- Helping troubleshoot development errors.
- Suggesting improvements for the written code.
- Helping to write README content.

The final application logic, project structure, configuration, testing, integration, and decisions about how the simulator should work were completed and verified by the developer.

AI-generated suggestions were reviewed and adapted rather than being used blindly.


## Known Limitation

One limitation of HealthCoverSim is that the prices and calculation rules are **simulated and predefined**.
Another is, for a single quote, the maximum number of adult applicants is 2 and does not support more.


## Disclaimer

HealthCoverSim is an educational/software development project. It is not affiliated with or endorsed by an actual health insurance provider, and the calculated premiums are not real insurance quotes.
