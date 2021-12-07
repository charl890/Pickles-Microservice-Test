For this solution we follow the Onion Architecture (Layered architecture with seperation of concerns)
Domain Layer
At the center part of the Onion Architecture, the domain layer exists with individual resource/entity objects and without any cross resource dependencies. 
Repository Layer
This layer creates an abstraction between the domain entities and business logic of an application. This layer is the loosely coupled data access pattern implementation
Services Layer
The Service layer holds interfaces with common operations, such as Add, Save, Edit, and Delete (CRUD). Also, this layer is used to communicate between the UI layer and repository layer. The Service layer also could hold business logic. Here, service interfaces are kept separate from their implementations, ensuring loose coupling and separation of concerns
UI Layer
This outer-most layer keeps UIX and testability in focus using dependency injection principles so that the application builds a loosely coupled structure and can communicate to the internal layers via interfaces.

We could also add the Messaging Layer to ensure scalability and redundancy of the application services and servers.
We also could add the Security Layer to ensure appropriate Authentication and Authorization to the different entities.
We could deploy the microservice on the cloud in isolated clusters with closer proximity to targetted customers ensuring faster performance, response time and scalability.
For logging and auditing we could further utilize enterprise logging services based on ELK etc to ensure ease of monitoring and support.

Run the code:

1. Install using : npm install
2. Build and run using: npm start
3. Test using: npm test (all 12 test cases should pass ensuring 90% code coverage)
4. Runtime Test using CRUD operations run using curl command:

CRUD Operations: 

POST:
curl --request POST 'localhost:8889/users' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "test1@test.com",
    "password": "Pww2!#11#@1"
}'

Note -- the ID generated here is GkU421gyL - 
ID would be different on different executions

PUT:
curl --request PUT "localhost:8889/users/GkU421gyL" \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "test1@test.com",
    "password": "Pww2!#11#@1",
    "firstName": "Test",
    "lastName": "1",
    "permissionLevel": 9
}'

PATCH:
curl --request PATCH "localhost:8889/users/GkU421gyL" \
--header 'Content-Type: application/json' \
--data-raw '{
    "lastName": "1"
}'

GET:
curl --request GET "localhost:8889/users/GkU421gyL" \
--header 'Content-Type: application/json'

DELETE:
curl --request DELETE "localhost:8889/users/GkU421gyL" \
--header 'Content-Type: application/json'


For this microservice using typescript:
* The service listens on port 8889—instead of the standard ports 80 (HTTP) or 443 (HTTPS) because those would typically be used for an app’s front end.
* We could use nginx to re-route the user requests appropriately to a set of load balanced servers that host copies of this microservice for scalability
* we add the Express.js framework and some libraries:
     npm i express debug winston express-winston cors
* we also need to install some development dependencies:
     npm i --save-dev @types/cors @types/express @types/debug source-map-support tslint typescript

* Solution code folder structure follows standard REST API design:

app.ts -- main routine (entry point file)

common -- common functionality including common routes, Middleware for running specific request validations before the final controller of a route handles its specifics (common/middleware/body.validation.middleware.ts), etc.

package.json -- build, test, run and install config details 

README  -- readme

tsconfig.json - ts config 

external-services/email-service - supports posts to a dummy endpoint http://localhost:9100/ExtEmailService using route, interface and payload object

test  -- test code

users -- Models for defining data models matching a given database schema, to facilitate data storage and retrieval (users/dto/create.user.dto.ts), resource CRUD operations including Route configuration to define the requests our API can handle (users/users.routes.config.ts) and Controllers for separating the route configuration (concerns) from the code that finally (after any intercepting middleware) processes a route request, calls the above service functions as necessary, and sends responses to the clients (users/controllers/users.controller.ts) and related Services for connecting to our database, doing queries, or connecting to external services (users/services/users.service.ts)

node_modules -- npm imported libraries 

dist -- generated js files 


Compromises/shortcuts made due to time considerations:
* Messaging solution using RabbitMQ/Kafka with true Event driven scalable microservice pattern was not implemented here
* Database solution was also not implemented which would ensure consistency as well as persistence
* Security solution was also not implemented which would ensure appropriate authentication and authorization and encryption of email
* Nginx type of Http/s proxy was not implemented here which would ensure scalability and high availability
