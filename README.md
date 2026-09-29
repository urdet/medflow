# MedFlow

MedFlow is a pharmacy management system designed to simplify daily pharmacy operations such as inventory management, sales tracking, supplier management, and dashboard analytics.

## Features

- Inventory Management
- Sales Tracking
- Supplier Management
- Dashboard Analytics
- Product and stock management
- PostgreSQL database integration
- Web-based user interface

## Technologies Used

- HTML5
- Tailwind CSS
- JavaScript
- Lucide Icons
- Chart.js
- Node.js
- PostgreSQL

---

# Getting Started

Follow the steps below to run MedFlow on your local machine.

## 1. Prerequisites

Before starting, make sure the following software is installed:

- Node.js
- npm
- PostgreSQL
- Git

Recommended:

- Node.js 18 or newer
- PostgreSQL 14 or newer

You can verify your installation using:

```bash
node --version
npm --version
git --version
psql --version
```

---

## 2. Clone the Repository

Open a terminal and run:

```bash
git clone https://github.com/urdet/medflow.git
```

Then enter the project directory:

```bash
cd medflow
```

---

## 3. Install Dependencies

Install the Node.js dependencies:

```bash
npm install
```

This will install all packages defined in `package.json`.

---

# Database Setup

## 4. Start PostgreSQL

Make sure the PostgreSQL service is running before starting MedFlow.

### Windows

You can start PostgreSQL from:

```text
Services → PostgreSQL → Start
```

Or use pgAdmin.

### Linux

Depending on your installation:

```bash
sudo systemctl start postgresql
```

Check its status:

```bash
sudo systemctl status postgresql
```

---

## 5. Create the Database

You can create the database using pgAdmin or the PostgreSQL command line.

Example:

```bash
psql -U postgres
```

Then:

```sql
CREATE DATABASE medflow;
```

Exit PostgreSQL:

```sql
\q
```

You can use another database name if you prefer. Just make sure the same name is configured in the `.env` file.

---

## 6. Configure Environment Variables

Create a file named:

```text
.env
```

in the root directory of the project.

Example project structure:

```text
medflow/
├── db/
├── routes/
├── view/
├── server.js
├── package.json
├── package-lock.json
└── .env
```

Add your PostgreSQL configuration:

```env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_password
POSTGRES_DB=medflow
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
```

For example:

```env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=admin123
POSTGRES_DB=medflow
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
```

Do not commit your real `.env` file to GitHub.

---

## 7. Initialize the Database

The project contains database-related files inside:

```text
db/
```

Run the SQL scripts provided by the project to create the required tables.

For example, if the project contains a file such as:

```text
db/schema.sql
```

you can run:

```bash
psql -U postgres -d medflow -f db/schema.sql
```

On Windows PowerShell, the same command can normally be used if PostgreSQL's `bin` directory is available in your PATH.

Alternatively, open the SQL file using pgAdmin and execute it manually.

---

# Running MedFlow

## 8. Start the Application

Run:

```bash
npm start
```

If the project uses a development script, you may also be able to use:

```bash
npm run dev
```

Check `package.json` to see the available scripts.

After the server starts successfully, you should see a message indicating that the application is running.

---

## 9. Open MedFlow

Open your browser and visit:

```text
http://localhost:3000
```

You should now see the MedFlow interface.

---

# Running the Project Again

After the initial setup, you normally do not need to recreate the database or reinstall dependencies every time.

For future launches:

```bash
cd medflow
npm start
```

Make sure PostgreSQL is running before starting MedFlow.

---

# Updating the Project

If you already cloned the project and want the latest version:

```bash
git pull
```

If dependencies changed, run:

```bash
npm install
```

Then restart the application:

```bash
npm start
```

---

# Common Problems

## `npm` is not recognized

Node.js is either not installed or is not available in your system PATH.

Verify with:

```bash
node --version
npm --version
```

Install Node.js and reopen your terminal if necessary.

---

## PostgreSQL connection refused

Example error:

```text
ECONNREFUSED 127.0.0.1:5432
```

Check that:

- PostgreSQL is running.
- `POSTGRES_HOST` is correct.
- `POSTGRES_PORT` is correct.
- PostgreSQL normally uses port `5432`.

For a local installation:

```env
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
```

---

## Password authentication failed

If you receive an error similar to:

```text
password authentication failed for user "postgres"
```

Verify:

```env
POSTGRES_USER
POSTGRES_PASSWORD
```

The credentials must correspond to an existing PostgreSQL user.

---

## Database does not exist

Example:

```text
database "medflow" does not exist
```

Create it:

```bash
psql -U postgres
```

Then:

```sql
CREATE DATABASE medflow;
```

---

## Tables do not exist

If the application connects successfully but reports missing tables, the database schema probably hasn't been initialized.

Run the SQL scripts inside the `db/` directory.

Example:

```bash
psql -U postgres -d medflow -f db/schema.sql
```

---

## Port 3000 is already in use

Another application may already be using port `3000`.

On Windows:

```bash
netstat -ano | findstr :3000
```

On Linux/macOS:

```bash
lsof -i :3000
```

Stop the conflicting application or configure MedFlow to use another port if supported.

---

# Project Structure

```text
medflow/
│
├── db/
│   └── Database scripts and PostgreSQL configuration
│
├── routes/
│   └── Application routes and database communication
│
├── view/
│   └── Server-side view templates and frontend pages
│
├── server.js
│   └── Main application entry point
│
├── package.json
│   └── Node.js project configuration and dependencies
│
├── package-lock.json
│   └── Locked dependency versions
│
├── .env
│   └── Local environment configuration
│
└── README.md
    └── Project documentation
```

---

# Quick Start

For experienced developers:

```bash
git clone https://github.com/urdet/medflow.git
cd medflow
npm install
```

Create `.env`:

```env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_password
POSTGRES_DB=medflow
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
```

Create the database:

```sql
CREATE DATABASE medflow;
```

Initialize the database using the SQL scripts inside `db/`, then start MedFlow:

```bash
npm start
```

Open:

```text
http://localhost:3000
```

---

# Security Notes

Never publish your real database password or `.env` file.

Make sure `.env` is included in `.gitignore`:

```gitignore
.env
node_modules/
```

For production deployments, use strong database credentials and configure the application behind HTTPS.

---

# Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a new branch:

```bash
git checkout -b feature/my-feature
```

3. Make your changes.
4. Commit them:

```bash
git commit -m "Add my feature"
```

5. Push your branch:

```bash
git push origin feature/my-feature
```

6. Open a Pull Request.

---

# License

Add the appropriate license for the project here.
