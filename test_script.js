const pg = require("pg");
const settings = require("./settings"); // settings.json
userInput = process.argv.slice(2).join()


const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  
  client.query("SELECT * FROM famous_people WHERE first_name LIKE $1", [`%${userInput}%`], (err, result) => {
    if (err) {
        return console.error("error running query", err);
      }
    console.log("Searching...")
    for(i = 0; i < result.rows.length; i++) {
    counter = i + 1 
    output = `- ${counter}: ${result.rows[i].first_name} ${result.rows[i].last_name}, born '${result.rows[i].birthdate.toLocaleDateString()}'`
    console.log(output);
      }


    client.end();
  });
});

// "SELECT $1::int AS number", ["1"]
// rows.foreach