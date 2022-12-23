# Contacts API



## API

/register:
<ul>
<li> POST: Register a user</li>
<li>Input fields: name, phone, email, linkedin_url, password</li>
<li>All input fields are required</li>
</ul>

/login:
<ul>
<li>GET: Login a registered user.</li>
<li>Unique Identifier: email</li>
</ul>

/display-users
<ul>
<li>GET: Displays the list of registered users</li>
</ul>

/upload-csv
<ul>
<li>POST: Uploads and saves contact information from csv file to mongo db database</li>
<li>Single CSV file upload</li>
<li>CSV file can contain multiple entries</li>
</ul>