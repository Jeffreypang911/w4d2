const settings = require("./settings");
const options = {
    client: 'pg',
    connection: {
        user     : settings.user,
        password : settings.password,
        database : settings.database,
        host     : settings.hostname,
        port     : settings.port,
        ssl      : settings.ssl
    }
}

const knex = require('knex')(options);

knex.raw("SELECT VERSION()").then(
    (version) => console.log((version[0][0]))
).catch((err) => { console.log( err); throw err })
    .finally(() => {
        knex.destroy();
    });