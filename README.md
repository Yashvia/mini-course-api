This project implements Task 2: Mini Course Content Fetcher (APIs & Storage). It is a Node.js/Express.js backend that manages course content with persistence in a JSON file, including GET, POST, and bonus DELETE endpoints.
Setup Instructions

Clone the Repository:
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name


Install Dependencies:Ensure Node.js is installed (download from nodejs.org if needed). Then, run:
npm install

This installs the required dependencies (express and body-parser) listed in package.json.

Run the Application:Start the server with:
npm start

The server will run at http://localhost:3000.

Test the Endpoints:Use Postman to test the API endpoints (see below for details). Alternatively, curl commands are provided. The repository includes a modules.json file with sample data to get started.


About modules.json
The modules.json file is included in the repository and contains sample course content data for testing. It is used for persistent storage and is read/written by the API. The initial structure is:
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


Note: The file will be modified when adding (POST) or deleting (DELETE) resources. Ensure it remains valid JSON to avoid errors.

Endpoints
All endpoints were tested using Postman to ensure functionality, as required. Below are the details with Postman instructions and equivalent curl commands.
1. GET /modules

Description: Retrieves all modules and their resources, logging them to the console.
Postman Request:
Method: GET
URL: http://localhost:3000/modules
Send the request and view the JSON response.


curl Alternative:curl http://localhost:3000/modules


Sample Response (based on the provided modules.json):{
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



2. POST /modules

Description: Adds a new resource to a specified week. If the week doesn’t exist, it’s created.
Postman Request:
Method: POST
URL: http://localhost:3000/modules
Headers: Content-Type: application/json
Body (raw, JSON):{
  "week": "Week 1",
  "resource": {
    "title": "Node.js Advanced",
    "type": "article",
    "url": "https://example.com/node-advanced"
  }
}


Send the request and view the response.


curl Alternative:curl -X POST http://localhost:3000/modules \
-H "Content-Type: application/json" \
-d '{
  "week": "Week 1",
  "resource": {
    "title": "Node.js Advanced",
    "type": "article",
    "url": "https://example.com/node-advanced"
  }
}'


Sample Response (success):{
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


Error Response (missing fields):{
  "error": "Missing required fields"
}



3. DELETE /modules/:week/:title (Bonus)

Description: Removes a resource by title from the specified week.
Postman Request:
Method: DELETE
URL: http://localhost:3000/modules/Week%201/REST%20API%20Basics
Send the request and view the response.


curl Alternative:curl -X DELETE http://localhost:3000/modules/Week%201/REST%20API%20Basics


Sample Response (success):{
  "message": "Deleted 'REST API Basics' from Week 1"
}


Error Response (week not found):{
  "error": "Week not found"
}


Error Response (resource not found):{
  "error": "Resource not found"
}



Design Decisions

Persistence: Data is stored in modules.json, which is included in the repository with sample data to facilitate testing. The file is read/written synchronously using Node.js’s fs module for simplicity, as no database is required.
