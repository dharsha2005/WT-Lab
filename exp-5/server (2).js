const http = require('http');
const mongoose = require("mongoose");
const fs = require('fs');
const path = require('path');

const dbUrl = "mongodb://localhost:27017/wt_5th_experiment";

const userSchema = new mongoose.Schema({
    username: String,
    password: String
});
const User = mongoose.model('User', userSchema);
const db = async () => {
    try {
        console.log("Connecting to MongoDB...");
        await mongoose.connect(dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            family: 4
        });
        console.log("Connected to MongoDB");
    } catch (err) {
        console.log("DB Connection Error:", err);
    }
};
db();

const server = http.createServer(async (req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        fs.createReadStream(path.join(__dirname, 'index.html')).pipe(res);
    } else if (req.method === 'GET' && req.url.startsWith('/signup')) {
        const urlParts = new URL(req.url, `http://${req.headers.host}`);
        const username = urlParts.searchParams.get("username");
        const password = urlParts.searchParams.get("password");

        res.writeHead(200, { 'Content-Type': 'text/html' });

        if (username && password) {
            try {
                const existingUser = await User.findOne({ username });
                if (existingUser) {
                    res.write("<h3>Signup Failed! Username already exists.</h3>");
                } else {
                    const newUser = new User({ username, password });
                    await newUser.save();
                    res.write("<h3>Signup Successful!</h3>");
                }
            } catch (error) {
                console.log("Signup Error:", error);
                res.write("<h3>Error during signup!</h3>");
            }
        } else {
            res.write("<h3>Signup Failed! Provide username and password.</h3>");
        }
        res.end();
    } else if (req.method === 'POST' && req.url === '/login') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', async () => {
            const postData = new URLSearchParams(body);
            const username = postData.get("username");
            const password = postData.get("password");

            res.writeHead(200, { 'Content-Type': 'text/html' });

            if (username && password) {
                try {
                    console.log("Checking login for:", username);
                    const user = await User.findOne({ username, password });

                    if (user) {
                        res.write("<h3>Login Successful!</h3>");
                    } else {
                        res.write("<h3>Invalid Username or Password</h3>");
                    }
                } catch (error) {
                    console.log("Login Error:", error);
                    res.write("<h3>Error during login!</h3>");
                }
            } else {
                res.write("<h3>Login Failed! Provide username and password.</h3>");
            }
            res.end();
        });

    } else {
        res.write("<h3>Invalid Request</h3>");
        res.end();
    }
});

server.listen(4001, () => {
    console.log('Server running on port 4001');
});