const path = require("path");
const express = require("express");
const app = express();
const PORT = 8000;
const test = "test";
const pg = require("pg");
app.use(express.static(__dirname + "/public/stylesheets"));
const head_html = `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />
      <link rel="stylesheet" type="text/css" href="./public/sytlesheets/style.css" />
      <title>Adopt A Pet</title>
    </head>
    <body>`;
const bottom_html = `</body>
     </html>`;

app.get("/", function (req, res) {
  res.send(`${head_html}<h1>Welcome</h1>${bottom_html}`);
});
//-------------creating database -----------
const sql_create = `CREATE TABLE IF NOT EXISTS Users (
    User_ID SERIAL PRIMARY KEY,
    FirstName VARCHAR(40) NOT NULL,
    SurName VARCHAR(40) NOT NULL
  );`;

const sql_insert = `INSERT INTO Users (User_ID, FirstName, SurName) VALUES
  (1, 'Marie', 'Curie'),
  (2, 'Albert', 'Einstein'),
  (3, 'Douglas', 'Adams')
ON CONFLICT DO NOTHING;`;

const sql = `SELECT * FROM Users;`;
//------------------------------------
const conString =
  "postgres://ibkugajb:aKs7NUvnZrMFIbYSaH95nHRApx0k_OGB@rogue.db.elephantsql.com/ibkugajb"; //Can be found in the Details page
const client = new pg.Client(conString);

app.get("/", (req, res) => {
  res.send("TEST");
});
// client.connect(function (err) {
//   if (err) {
//     return console.error("could not connect to postgres", err);
//   }
//   client.query(sql_create, function (err, result) {
//     if (err) {
//       return console.error("error running query", err);
//     }
//     console.log(result.rows);
//     // >> output: 2018-08-23T14:02:57.117Z
//     // client.end();
//   });
//   client.query(sql_insert, (err, result) => {
//     if (err) {
//       return console.error("Error inserting data into base", err);
//     }
//     console.log("Successful creation of 3 Users");
//   });
// });
// //---get reques /Users-------
// app.get("/Users", (req, res) => {
//   client.query(sql, (err, data) => {
//     if (err) {
//       console.log(404);
//     }
//     res.send(
//       `${head_html}
//         <div class="container text-center mt-5">
//           <h1>Userlist</h1>
//              ${data.rows.map(
//                (obj) =>
//                  `<div>
//                 <a href="/Users/${obj.id}">
//                   <button class="btn btn-info"> ${obj.firstname} ${obj.surname}</button>
//                 </a>
//               </div>
//               `
//              )}
//         ${bottom_html}`
//     );
//     // res.send("User", { model: data.rows });
//   });
// });

//-----------Server handler ------
// module.exports = client.connect;
let server = app.listen(PORT, function () {
  let host = server.address().address;
  let port = server.address().port;
  console.log("Server listening at http://%s:%s", host, port);
});
