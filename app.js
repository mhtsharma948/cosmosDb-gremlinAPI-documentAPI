"use strict";

var Gremlin = require('gremlin');
var documentClient = require("documentdb").DocumentClient;
var config = require("./config");
var async = require('async');
var url = require('url');

var databaseUrl = `dbs/${config.database}`;
var collectionUrl = `${databaseUrl}/colls/${config.collection}`;

//client for gremlin
const gremlinClient = Gremlin.createClient(
    443,
    config.gremlinEndpoint, {
        "session": false,
        "ssl": true,
        "user": `/dbs/${config.database}/colls/${config.collection}`,
        "password": config.primaryKey
    }
);

//client for DocumentDB
var Documentclient = new documentClient(config.documentEndpoint, { "masterKey": config.primaryKey });

/*
 * Drop graph via gremlin
 */
function dropGraph(callback) {
    console.log('Running Drop');
    gremlinClient.execute('g.V().drop()', {}, (err, results) => {
        if (err) {
            return callback(console.error(err));
        }

        console.log("Result: %s\n", JSON.stringify(results));
        callback(null)
    });
}
/*
 * Add vertex via gremlin
 */
function addVertex1(callback) {
    console.log('Running Add Vertex1');
    gremlinClient.execute("g.addV('person').property('id', 'thomas').property('firstName', 'Thomas').property('age', 44).property('userid', 1)", {}, (err, results) => {
        if (err) {
            return callback(console.error(err));
        }

        console.log("Result: %s\n", JSON.stringify(results));
        callback(null)
    });
}
/*
 * Add vertex via gremlin
 */
function addVertex2(callback) {
    console.log('Running Add Vertex2');
    gremlinClient.execute("g.addV('person').property('id', 'mary').property('firstName', 'Mary').property('lastName', 'Andersen').property('age', 39).property('userid', 2)", {}, (err, results) => {
        if (err) {
            return callback(console.error(err));
        }

        console.log("Result: %s\n", JSON.stringify(results));
        callback(null)
    });
}
/*
 * Add edge via gremlin
 */
function addEdge(callback) {
    console.log('Running Add Edge');
    gremlinClient.execute("g.V('thomas').addE('knows').to(g.V('mary'))", {}, (err, results) => {
        if (err) {
            return callback(console.error(err));
        }

        console.log("Result: %s\n", JSON.stringify(results));
        callback(null)
    });
}
/*
 * Count vertex via gremlin
 */
function countVertices(callback) {
    console.log('Running Count');
    gremlinClient.execute("g.V().count()", {}, (err, results) => {
        if (err) {
            return callback(console.error(err));
        }

        console.log("Result: %s\n", JSON.stringify(results));
        callback(null)
    });
}
/*
 * Finish
 */
function finish(err, result) {
    if (err) {
        return console.error(err);
    }
    console.log("Finished");
    console.log('Press any key to exit');

    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.on('data', process.exit.bind(process, 0));
}

/**
 * Query the collection using SQL
 */
function queryCollection() {
    console.log(`Querying collection through index:\n${config.collection}`);

    return new Promise((resolve, reject) => {
        Documentclient.queryDocuments(
            collectionUrl,
            'SELECT * FROM ROOT'
        ).toArray((err, results) => {
            if (err) reject(err)
            else {
                for (var queryResult of results) {
                    let resultString = JSON.stringify(queryResult);
                    console.log(`\tQuery returned ${resultString}`);
                }
                console.log();
                resolve(results);
            }
        });
    });
};

//calling the function of document DB API
queryCollection()
    .then(() => {
        console.log("oh yeah!!")
    })
    .catch((err) => {
        console.log("its an error dude!!")
        console.log(err);
    })

async.waterfall([
    dropGraph,
    addVertex1,
    addVertex2,
    addEdge,
    countVertices,
], finish);