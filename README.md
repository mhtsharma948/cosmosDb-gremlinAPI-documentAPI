# cosmosDb-gremlinAPI-documentAPI
It is a boilerplate for accessing the CosmosDB(Specifically Graph) with gremlin and document API, both in the single node.js app. The main purpose of creating this is that, you can't get all the features of cosmos DB (Graph) via only Gremlin API or only Document API. For example, you can't Access `Stored procedure` via gremlin API or you can't create `edges` or `vertex` via document API with that ease as you can do via gremlin API.
## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development.

[Note: The installation process provided below is for debian based linux system. for others, search how to install Node.js, NPM]
### Prerequisites

What things you need to install the software and how to install them

```
Node.js
NPM
Account on Microsoft Azure Cosmos DB
```

### Installing

**Installing Node.js**

A step by step series of examples that tell you have to get a development env running

 A package manager allows us to install most software pain-free from a repository maintained by Ubuntu. 

 For our purposes, we can get started by typing these commands:

```
sudo apt-get update
sudo apt-get install nodejs
```
**Installing NPM**
The npm basically comes with NodeJs package. to check if the NPM is install, use:
```
npm -v
```
If it dosen't return the version, hit the following command
```
sudo apt-get install npm
```
**Create Azure cosmos DB account**

## Running the Application

Go into the project directory and
1. Run `npm install` in a terminal to install required npm modules
2. Run `npm run start` in a terminal to start your node application.

## Built With
* [Node.js](https://nodejs.org/en/docs/) - Backend Language
* [Azure CosmosDB](https://docs.microsoft.com/en-us/azure/cosmos-db/) - Database

## Contributing

Please contact [mhtsharma948@gmail.com] for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning
We use [semver](http://semver.org/) for versioning.

## Authors

* **Mohit Sharma** - *Initial work* - [mhtsharma948](https://github.com/mhtsharma948)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone who's code was used
* Special thanks to [Azure-samples developers](https://github.com/Azure-Samples/azure-cosmos-db-graph-nodejs-getting-started)
