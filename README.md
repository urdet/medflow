# MedFlow
MedFlow is a comprehensive pharmacy management system designed to streamline operations, manage inventory, and enhance customer service in pharmacies. Built with modern web technologies, MedFlow offers an intuitive interface and robust features to meet the needs of pharmacy professionals.

## Features
- Inventory Management
- Sales Tracking
- Supplier Management
- Dashboard Analytics

## Technologies Used
- HTML5
- Tailwind CSS
- JavaScript
- Lucide Icons
- Chart.js
- PostgreSQL
- Node.js

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/urdet/medflow.git
    ```
2. Navigate to the project directory:
   ```bash
   cd medflow
   ```
3. Install dependencies:
   ```bash
    npm install
    ```
4. Set up the database:
    - Ensure PostgreSQL is installed and running.
    - Create a new database for MedFlow.
    - Run the provided SQL scripts to set up the necessary tables.
5. Start the application:
    ```bash
    npm start
    ```
6. Open your web browser and navigate to `http://localhost:3000` to access MedFlow.
## .env Configuration
Create a `.env` file in the root directory of the project and add the following environment variables:
```
JWT_SECRET="YourSecretKey"
POSTGRES_USER="your_postgres_username"
POSTGRES_PASSWORD="your_postgres_password"
POSTGRES_DB="your_database_name"
POSTGRES_HOST="your_database_host"
POSTGRES_PORT="your_database_port"
```
Replace the placeholder values with your actual database credentials and desired JWT secret key.