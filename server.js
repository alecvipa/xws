require('dotenv').config();

// Dependencies
var express = require("express");
var exphbs = require("express-handlebars");
const nodemailer = require("nodemailer");
const email = process.env.email;
const superSecretPwd = process.env.superSecretPwd;
const tokenFb = process.env.tokenAccesoFB

// Create an instance of the express app.
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static("public"));

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 3000;

// Set Handlebars as the default templating engine.
app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Redirect to https://xyncs.com
// const targetBaseUrl = 'https://www.xyncs.com/inicio';



// Routes
app.get('/', function (req, res) {
    // res.redirect(targetBaseUrl);
    res.render('inicio');

});
// app.get('/:params?', function (req, res) {
//     var params = req.params.params;
//     res.render(params);
// })

app.get('/teamBuildings', function (req, res) {
    res.render('teamBuildings');

});
app.get('/gracias', function (req, res) {
    res.render('gracias');

});
app.get('/campaigns', function (req, res) {
    res.render('campaigns');

});
app.get('/contacto', function (req, res) {
    res.render('contacto');

});
app.get('/digital', function (req, res) {
    res.render('digital');

});
app.get('/inicio', function (req, res) {
    res.render('inicio');

});
app.get('/privacidad', function (req, res) {
    res.render('privacidad');

});
app.get('/proyectos', function (req, res) {
    res.render('proyectos');

});
app.get('/webdesign', function (req, res) {
    res.render('webdesign');

});

// Nodemailer route

app.post("/ajax/email", function (request, response) {
    console.log(email);
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: false,
        port: 25,
        auth: {
            user: email,
            pass: superSecretPwd
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    var textBody = `FROM: ${request.body.name}; EMAIL: ${request.body.email}; MESSAGE: ${request.body.message}`;
    var htmlBody = `<h2>Correo de contacto</h2><p>Nombre: ${request.body.name} </p> <p> Correo electrónico: <a href='mailto: ${request.body.email}'>${request.body.email}</a></p><p>Mensaje: ${request.body.message} </p>`;
    var mail = {
        from: '"Team: Xyncs Web Studio',
        to: 'hebrit_626@hotmail.com',
        subject: '¡Alguien ha llenado el formulario de contacto en Xyncs Web Studio!',
        html: htmlBody
    };
    transporter.sendMail(mail, function (err, info) {
        if (err) {
            return console.log(err);
        } else {
            console.log("message sent!");
        };
    });
});

app.post("/inicio/email", function (request, response) {
    console.log(email);
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: false,
        port: 25,
        auth: {
            user: email,
            pass: superSecretPwd
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    var textBody = `FROM: ${request.body.name}; EMAIL: ${request.body.email}; MESSAGE: ${request.body.message}`;
    var htmlBody = `<h2>Correo de contacto</h2><p>Nombre: ${request.body.name} </p> <p> Correo electrónico: <a href='mailto: ${request.body.email}'>${request.body.email}</a></p><p>Message: ${request.body.message} </p>`;
    var mail = {
        from: '"Team: Xyncs Web Studio',
        to: 'hebrit_626@hotmail.com',
        subject: '¡Alguien se registró en tu club, Alejandro Vilpa!',
        html: htmlBody
    };
    transporter.sendMail(mail, function (err, info) {
        if (err) {
            return console.log(err);
        } else {
            console.log("message sent!");
        };
    });
});


// Start our server so that it can begin listening to client requests.
app.listen(PORT, function () {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
});