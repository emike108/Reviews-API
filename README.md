# Reviews-API
---
## Synopsis

This repo is a RESTful API server created for Project Atelier. Specifically it is used to retreive the reviews specific data needed for the project. It house its data in a MySQL database and connects through a Node.js server running Express.

The server allows for GET requests of review data and review meta data for a specific product ID.
POST reqeusts of new review for a specific product.
PUT request to update helpful count and to report a review as inapproprite. 

---
## Motivation

This API server was created to replace the previously employed outdated backend server and to connect flawlessly with the already existing frontend of the application. 

---
## Endpoints

The following are the available endpoints on the API server:
(Replace local host with IP address when deployed, must provide requested parameters)

GET:<br/>
http://localhost:4000/reviews/:product_id <br/>
http://localhost:4000/reviews/meta/:product_id <br/>

POST:<br/>
http://localhost:4000/reviews/:product_id <br/>

PUT:<br/>
http://localhost:4000/reviews/:review_id/helpful <br/>
http://localhost:4000/reviews/:review_id/report <br/>
