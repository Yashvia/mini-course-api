# Mini Course Content Fetcher API

This project implements a Node.js/Express.js backend for Task 2: Mini Course Content Fetcher (APIs & Storage). It provides a RESTful API to manage course content, with data stored persistently in a modules.json file. The API supports GET, POST, and DELETE (bonus) endpoints for retrieving, adding, and removing course resources.


## Table of Contents

```
1. Features
2. Setup Instructions
3. API Endpoints
    a. GET /modules
    b. POST /modules
    c. DELETE /modules/:week/:title
4. About modules.json
5. Design Decisions
6. Testing the API
```



## 1. Features


```
a. Retrieve course content: Fetch all course modules and their resources with a single GET request.
b. Add new resources: Use POST to add resources to existing or new weeks.
c. Delete resources: Use DELETE to remove specific resources by title from a week (bonus feature).
d. Persistent storage: Data is stored in a modules.json file, included with sample data for testing.
e. Simple setup: Built with Node.js, Express.js, and minimal dependencies for easy deployment.
```



## 2. Setup Instructions
Follow these steps to set up and run the project locally.

a.  Clone the Repository (type the following into your terminal):
```terminal
git clone https://github.com/Yashvia/mini-course-api.git
cd mini-course-api
```


b.  Install Dependencies:(Ensure Node.js is installed on your system. Download from nodejs.org if needed)
Type the following into the terminal:

```terminal
npm install
```

This installs express and body-parser, as listed in package.json.

c.  Run the Application:Start the server with:
Type the following into the terminal:
```terminal
npm start
```

The server will run at http://localhost:3000.


3)  API Endpoints
All endpoints have been tested using Postman to ensure functionality. Below are the details, including Postman instructions and equivalent curl commands.

a.  GET /modules

       
Description: Retrieves all course modules and their resources, logging them to the console.

Method: GET
URL: http://localhost:3000/modules

Postman Request:
Set method to GET.
Enter URL: http://localhost:3000/modules.
Send the request and view the JSON response.

Curl alternative:
curl Command: curl http://localhost:3000/modules


Sample Response:

```json
{
"Week 1": [
    {
    "title": "Introduction to Node.js",
    "type": "video",
    "url": "https://www.youtube.com/watch?v=example1"
    },
    {
    "title": "REST API Basics",
    "type": "article",
    "url": "https://example.com/rest-api"
    }
],
"Week 2": [
    {
    "title": "Express.js Tutorial",
    "type": "video",
    "url": "https://www.youtube.com/watch?v=example2"
    }
]
}
```



b.  POST /modules

        
Description: Adds a new resource to a specified week. If the week doesn't exist, it is created.

Method: POST
URL: http://localhost:3000/modules
Headers: Content-Type: application/json
Body (raw, JSON):

```json
{
"week": "Week 1",
"resource": {
    "title": "Node.js Advanced",
    "type": "article",
    "url": "https://example.com/node-advanced"
}
}
```


Postman Request:
Set method to POST.
Enter URL: http://localhost:3000/modules.
Add header: Content-Type: application/json.
Set body to raw (JSON) and paste the sample body.
Send the request and view the response.

Curl alternative:
curl Command:curl -X POST http://localhost:3000/modules \
-H "Content-Type: application/json" \
-d '{"week":"Week 1","resource":{"title":"Node.js Advanced","type":"article","url":"https://example.com/node-advanced"}}'


Sample Response (Success):

```json
{
"message": "Resource added",
"modules": {
    "Week 1": [
    {
        "title": "Introduction to Node.js",
        "type": "video",
        "url": "https://www.youtube.com/watch?v=example1"
    },
    {
        "title": "REST API Basics",
        "type": "article",
        "url": "https://example.com/rest-api"
    },
    {
        "title": "Node.js Advanced",
        "type": "article",
        "url": "https://example.com/node-advanced"
    }
    ],
    "Week 2": [
    {
        "title": "Express.js Tutorial",
        "type": "video",
        "url": "https://www.youtube.com/watch?v=example2"
    }
    ]
}
}
```


Error Response (Missing Fields):

```json
{ "error": "Missing required fields" }
```
    



c.  DELETE /modules/:week/:title

Description: Removes a resource by title from the specified week (bonus feature).

Method: DELETE
URL: http://localhost:3000/modules/Week%201/REST%20API%20Basics

Postman Request:
Set method to DELETE.
Enter URL: http://localhost:3000/modules/Week%201/REST%20API%20Basics.
Send the request and view the response.

Curl alternative:
curl Command:curl -X DELETE http://localhost:3000/modules/Week%201/REST%20API%20Basics


Sample Response (Success):
        
```json
{ "message": "Deleted 'REST API Basics' from Week 1" }
```


Error Responses:

Week not found:

```json
{ "error": "Week not found" }
```


Resource not found:

```json
{ "error": "Resource not found" }
```
        





## 4. About modules.json
The modules.json file, included in the repository, serves as the persistent storage for course content. It contains sample data to facilitate testing and follows this structure:

```json
{
"Week 1": [
    {
     "title": "Introduction to Node.js",
    "type": "video",
    "url": "https://www.youtube.com/watch?v=example1"
    },
    {
    "title": "REST API Basics",
    "type": "article",
    "url": "https://example.com/rest-api"
    }
],
"Week 2": [
     {
     "title": "Express.js Tutorial",
     "type": "video",
    "url": "https://www.youtube.com/watch?v=example2"
     }
]
 }
 ```

Note: The file is modified by POST and DELETE requests. Ensure it remains valid JSON to avoid errors.


## 5.  Design Decisions

 Data is stored in modules.json for simplicity, using Node.js's fs module for synchronous read/write operations. No database is required, making the project lightweight.


## 6. Testing the API

```
a. Tools: Use Postman for a user-friendly interface or curl for command-line testing.
b. Sample Data: The provided modules.json file allows immediate testing of all endpoints.
c. Validation: All endpoints were tested with Postman to confirm correct behavior, including success and error cases.
 ```
