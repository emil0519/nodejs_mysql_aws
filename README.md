<div align="center">

  <h3 align="center">Emil - Node.js CRUD </h3>

  <p align="center">
    A mock of [https://finmindtrade.com/] (finmindtrade api), featuring CRUD, data validation on AWS cloud.
  </p>
    <div><a href="https://15.152.187.152/api-docs/">API Docs</a></div>
    <div><a href="https://nextjs-chart-delta.vercel.app/backOffice/">Frontend demo</a></div>
</div>
<hr>

### Set up in local environment:
Open terminal, copy & paste following command:
```
    mkdir emil_lau_nodejs_mysql_aws
    cd emil_lau_nodejs_mysql_aws
    git clone https://github.com/emil0519/nodejs_mysql_aws
    npm i
    npm run start
```
Test: Open Postman
GET: http://localhost:3002/api/basicInfo?dataset=TaiwanStockInfo

 ## 💡 Key Features
* CRUD service in express route, with code splitting base on logic
* Connect to AWS MySQL server
* Nodejs app uploaded to AWS EC2 instance with public IP accessible only for recongized site.
* CORs restrictions.

## 🌟 Upcoming
* Ambiguous search
* CRUD to relational table of stock revenue (one to many) 
* Schedule jobs to fetch data from Finmindtrade api and store to MySQL database.
* Member login & verificiations.

## 🛠 Tech Stack 
 * <img width="50" src="https://user-images.githubusercontent.com/25181517/183568594-85e280a7-0d7e-4d1a-9028-c8c2209e073c.png" alt="Node.js" title="Node.js"/>  **Node.js** : With express.js to create api route and data handling logic.
* <img src="https://user-images.githubusercontent.com/25181517/183890598-19a0ac2d-e88a-4005-a8df-1ee36782fde1.png" alt="Typescript"  width="14"/>    **Typescript** : Superset of Javascript, best for scalable project to perform type check before runtime.
* <img width="50" src="https://user-images.githubusercontent.com/25181517/183896128-ec99105a-ec1a-4d85-b08b-1aa1620b2046.png" alt="MySQL" title="MySQL"/>  **MySQL** : Steady relational database
* <img width="50" src="https://user-images.githubusercontent.com/25181517/183896132-54262f2e-6d98-41e3-8888-e40ab5a17326.png" alt="AWS" title="AWS"/>  **AWS** : Cloud service to serve both database and Node.js app

