
const pg = require("pg");
const settings = require("./settings"); // settings.json

var knex = require('knex')({
    client: 'pg',
    connection: {
        user     : settings.user,
        password : settings.password,
        database : settings.database,
        host     : settings.hostname,
        port     : settings.port,
        ssl      : settings.ssl
    }
  });

knex.select().from('famous_people').asCallback(print)

function print (err, result) {
    if (err) {
        console.error(err); 
    }

    for(i = 0; i < result.length; i++) {
        counter = i + 1 
        output = `- ${counter}: ${result[i].first_name} ${result[i].last_name}, born '${result[i].birthdate.toLocaleDateString()}'`
        console.log(output);

    }
}