# Contacts API

A set of APIs built using Node(Express) + MongoDB(mongoose) with
the following features:

- Authentication module using jwt
- Upload and save contact (csv file) through api in db using service workers.

## Structure
```

├── config
│   └── database.js       // Database configuration
├── middleware
│   └── auth.js           // User Authentication using token
├── model
│   └── user.js           // User schema
├── uploads               // Directory where Multer saves uploaded csv files 
├── app.js                // API implementation
└── index.js              //Server setup

```
## API

/register:
<ul>
<li> 
POST 
: Register a user</li>
<li>Input fields: name, phone, email, linkedin_url, password</li>
<li>All input fields are required</li>
</ul>

/login:
<ul>
<li>
GET  
: Login a registered user.</li>
<li>Unique Identifier: email</li>
</ul>

/display-users
<ul>
<li>
GET
: Displays the list of registered users</li>
</ul>

/home

- POST: Route that requires a user JWT token in the header.

/upload-csv
<ul>
<li>
POST
: Uploads and saves contact information from csv file to mongo db database</li>
<li>Single CSV file upload</li>
<li>CSV file can contain multiple entries</li>
</ul>


