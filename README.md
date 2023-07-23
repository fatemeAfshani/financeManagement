# Finance Management

This application is designed to help small stores and online shops with accounting and inventory management. Key features include:

* **Product Management**: add new products and generate invoices for them. Keep track of each product's stock.

* **User Management**: Add new users and define their access roles. Designate team members as stakeholders for better collaboration.

* **Customer Orders**: Record customer orders and automatically calculate the income for each stakeholder associated with the order.

* **Smooth Checkout**: Facilitate a seamless checkout process for financial transactions with stakeholders.

The application aims to streamline operations and financial management for small businesses. Its user-friendly interface ensures an easy experience for store owners and customers.



## Prerequisites
* node.js
* npm
* docker
* docker-compose


## Usage

```bash
 docker-compose --env-file ./server/src/config/conf.env  up --build
```
if it is the first time running the app, for creating database and running migrations, first find server container name:

```bash
docker ps
```

then go inside the container:
```bash
sudo docker exec -it <server-container-name> /bin/sh

```
then run below command to run migrations: 
```bash
yarn run migration
```
to explore the app, go to **http://localhost:3001/**.


## Documentation
After running the app, you can access the documentation by navigating to **http://localhost:3000/api-docs**



## Built With
* [typescript](https://www.typescriptlang.org/) - Programming language
* [express.js](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js
* [postgresql](https://www.postgresql.org/) - Relational database
* [knex](https://knexjs.org/) - SQL query builder
* [reactjs](https://react.dev/) - The library for web and native user interfaces



