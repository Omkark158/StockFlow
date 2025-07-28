
# StockFlow API

StockFlow is a B2B inventory management system designed for small to mid-sized businesses. It enables companies to manage products across multiple warehouses, monitor inventory levels, track suppliers, and receive low-stock alerts.

## Features:

* Add and manage products
* Track inventory levels per warehouse
* Associate products with multiple suppliers
* Automatic low-stock alerting system
* RESTful Express.js API

## Tech Stack:

* **Runtime:** Node.js (v18+)
* **Framework:** Express.js
* **ORM:** Sequelize
* **Database:** MySQL
* **Validation:** express-validator

## Project Structure:

stockflow-api/
├── controllers/
├── models/
├── routes/
├── middleware/
├── config/
├── .env                 (ignored)
├── .gitignore
├── README.md
└── Stockflow_Backend_CaseStudy.pdf


## Case Study Document:

This repository includes a detailed case study analysis:
📄 [Stockflow_Backend_CaseStudy.pdf](https://github.com/Omkark158/StockFlow/blob/main/Stockflow_Backend_CaseStudy.pdf)

It covers:

* Code review & debugging insights
* Implementation of low-stock alert API
* Core business logic and implementation approach
* Low-stock alert API implementation business logic

## Setup Instructions:

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/Omkark158/StockFlow.git](https://github.com/Omkark158/StockFlow.git) && cd StockFlow
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Create a `.env` file with the following structure:**
    ```
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=yourpassword
    DB_NAME=stockflow
    DB_PORT=3306
    ```
4.  **Start the server**
    ```bash
    npm start
    ```

## API Endpoints

| Method | Endpoint                             | Description               |
| :----- | :----------------------------------- | :------------------------ |
| `POST` | `/api/products`                      | Add a new product         |
| `GET`  | `/api/products`                      | Get all products          |
| `GET`  | `/api/products/:id`                  | Get product by ID         |
| `GET`  | `/api/companies/:company_id/alerts/low-stock` | Get low-stock alerts      |
