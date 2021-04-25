[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://GitHub.com/Naereen/StrapDown.js/graphs/commit-activity) 
[![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](https://github.com/Naereen/StrapDown.js/blob/master/LICENSE)
![Coverage](https://img.shields.io/badge/coverage-91%25-brightgreen)
 
 - [Welcome](https://github.com/KevinDaSilvaS/mongolia#welcome-to-mongolia)
 - [Docs](https://github.com/KevinDaSilvaS/mongolia/blob/main/README.md#docs)
 - 	- [Get started](https://github.com/KevinDaSilvaS/mongolia#getting-started)
 - 	- [Run mongodb](https://github.com/KevinDaSilvaS/mongolia#-run-mongo-db-instance)
 - 	- [Run mongolia](https://github.com/KevinDaSilvaS/mongolia#-run-mongolia-container)
 - 	- [Authenticating](https://github.com/KevinDaSilvaS/mongolia#-authenticating-to-mongolia)
 - 	- [Creating collections](https://github.com/KevinDaSilvaS/mongolia#-creating-a-collection)
 - 	- [Insert in collections](https://github.com/KevinDaSilvaS/mongolia#-inserting-in-collection)
 - 	- [Get registers](https://github.com/KevinDaSilvaS/mongolia#-get-info-in-collection)
 - 	- [Update registes](https://github.com/KevinDaSilvaS/mongolia#-update-info-in-collection)
 - 	- [Delete registers](https://github.com/KevinDaSilvaS/mongolia#-delete-info-in-collection)
 - [Supported types](https://github.com/KevinDaSilvaS/mongolia#currently-supported-types)
 - [Collection properties](https://github.com/KevinDaSilvaS/mongolia#collection-properties)
 - [Pagination](https://github.com/KevinDaSilvaS/mongolia#pagination)
 - [Contribute](https://github.com/KevinDaSilvaS/mongolia#contribute)
 - [Use cases examples](https://github.com/KevinDaSilvaS/mongolia#use-cases)
# Welcome to Mongolia!
**Mongolia** is a rest interface / data gateway built in node js and inspired by tools like stargate(cassandra) and prest(postgres).
  **Application types where Mongolia can be really useful:**
 - Dockerized apps (mongolia has a docker image that can be easily composable).
 - Small apps or simple projects that dont need a backend with business rules only bson storage.
 - Programming languages that dont have a good mongo db driver. Or languages where the drivers are not well documented.
 - Fast prototiping without having to worry about database configuration and pocs.

# DOCS

Mongolia readme **docs!**

## Getting Started

### > Run mongo db instance:
Using a default mongo db container  ``docker run -e MONGO_INITDB_ROOT_USERNAME=mongolia -e MONGO_INITDB_ROOT_PASSWORD=123 MONGO_INITDB_DATABASE=admin -p 27017:27017`` or by using a ``docker-compose up -d`` if you want to use the docker compose in the official project folder: [docker-compose mongo db](https://github.com/KevinDaSilvaS/mongolia/blob/main/docker-compose.yml)

### > Run mongolia container:
Run mongolia image: ``docker run -e MONGO_USERNAME=mongolia 
    -e MONGO_PASSWORD=123 
    -e MONGODB_NAME=admin 
    -e MONGODB_HOST=localhost 
    -e MONGODB_PORT=27017 
    -p 3170:3170 kevindasilvas/mongolia`` 
    or if you used the docker compose from the official project:
    ``docker run -e MONGO_USERNAME=mongolia
    -e MONGO_PASSWORD=123 
    -e MONGODB_NAME=admin 
    -e MONGODB_HOST=mongolia_mongo_1 
    -e MONGODB_PORT=27017 
    -p 3170:3170 --net mongolia_default kevindasilvas/mongolia
    ``
### > Authenticating to Mongolia:
Using a request manager like insomnia([we have a collection ready for insomnia](https://github.com/KevinDaSilvaS/mongolia/blob/main/collections/insomnia/mongolia_2021-04-23.json)), postman, curl or your own app if you want to, make a post request to``localhost:3170/auth `` , with a body containing the mongo username and password ``{
	"username": "mongolia",
	"password": "123"
}`` if successful mongolia will return a payload containing the http code and the auth token like this: ``{
  "code": 201,
  "details": {
    "mongolia_auth_token": "b61fddb0-622a-4b56-8144-4b116aa480cf"
  }
}
``

### > Creating a collection:
Now that we have the mongolia_auth_token in hands, we will set it as a header in our request ``"mongolia_auth_token": "b61fddb0-622a-4b56-8144-4b116aa480cf"
`` , we´ll set a body containing the collection name and the collection properties: ``{
 "collectionName": "users",
	"collectionProperties": {
		"name": {
			"type": "String",
			"required":true
		},
		"age": {
			"type": "Number"
		}
	}
}
``(more on [collection properties](https://github.com/KevinDaSilvaS/mongolia#collection-properties) and [allowed types](https://github.com/KevinDaSilvaS/mongolia#currently-supported-types)) and with our header and body set lets make a post request to``localhost:3170/collections``,if successful mongolia will return an 204 http code response.

### > Inserting in collection:
Set the``"mongolia_auth_token": "b61fddb0-622a-4b56-8144-4b116aa480cf" 
``in headers again , and lets add a body to the request``{
		"name": "kevin",
		"age": 21
}
`` and execute a post request to``localhost:3170/collections/users``,if successful mongolia will return an 201 http code response with the repective body: ``{
  "code": 201,
  "details": {
    "_id": "60843c79632f1dc33f3dbeaa",
    "name": "kevin",
    "age": 21,
    "__v": 0
  }
}``.

### > Get info in collection:
Set the``"mongolia_auth_token": "b61fddb0-622a-4b56-8144-4b116aa480cf" 
``in headers again , and lets set our GET url `` localhost:3170/collections/users?name=kevin``.You can add every collection field you set in collection properties + the default _id field in mongo to make your queries into mongo db (example:`` localhost:3170/collections/users?name=kevin&age=21&_id=random_mongo_id``), but lets run our query, if everything get well you will get a result like this: ``{
  "code": 200,
  "details": [{
  "_id": "60843c79632f1dc33f3dbeaa",
    "name": "kevin",
    "age": 21,
    "__v": 0
  }]
}``

### > Update info in collection:
Set the``"mongolia_auth_token": "b61fddb0-622a-4b56-8144-4b116aa480cf" 
``in headers, set the body using the collection fields that you set in collectionProperties that you want to update  ``{
		"name": "kevin updated this record"
}
`` and lets set our Path url `` localhost:3170/collections/users?name=kevin``. if everything went well you will get a response like this: ``{
  "code": 200,
  "details": {
    "n": 1,
    "nModified": 1,
    "ok": 1
  }
}``

### > Delete info in collection:
The steps are basically the same in the get you set ``"mongolia_auth_token": "b61fddb0-622a-4b56-8144-4b116aa480cf" 
``in headers and lets set our Path url `` localhost:3170/collections/users?name=kevin``. if everything went well you will get a response like this: ``{
  "code": 200,
  "details": {
    "n": 1,
    "ok": 1,
    "deletedCount": 1
  }
}``

## Currently Supported Types

Mongolia currently supports the following mongo types: [``"String"``, ``"Number"``,

``"Date"``, ``"Buffer"``, ``"Boolean"``,

``"Mixed"``, ``"ObjectId"``, ``"Array"``,

``"Decimal128"``, ``"Map"``, ``"Schema"``]. And array combinations with all the above types:  [``"[String]"``, ``"[Number]"``,

``"[Date]"``, ``"[Buffer]"``, ``"[Boolean]"``,

``"[Mixed]"``, ``"[ObjectId]"``, ``"[Array]"``,

``"[Decimal128]"``, ``"[Map]"``, ``"[Schema]"``]

## Collection properties:

Mongolia currenrly supports only the ``type``([supported types](https://github.com/KevinDaSilvaS/mongolia#currently-supported-types) for this field) and the ``required``(true, false) properties

## Pagination:

Mongolia in get registers in collection not only supports fields but also supports the ```?page=1``` and the ```&limit=10```,that you can customize to the amount of registers and pages do you need. Get example: `` localhost:3170/collections/users?name=kevin&page=2&limit=30``

## Comparitive Queries:

Since Mongolia 1.2 we allow the users to make queries using the following mongo comparative attributes( ```GT - greater than, GTE - greater than equal, LT - less than, LTE - less than equal, EQ - equal```). Get example: `` localhost:3170/collections/users?name=kevin&age=@>GT18`` mongolia also allow combinations of comparative attributes, like: `` localhost:3170/collections/users?name=kevin&age=@>GT18@>LT35``

# Contribute

The mongolia project is always open for contributions, issues and Q&As.
**The project will be more focused in the following topics:**
> Adding CI/CD to create an automated docker image push to docker hub
> Adding more collection properties like default value for example
But these are just suggestions we always try to be very community oriented so feel free to contribute with your PR.

# Use cases

Use cases where mongolia showed its value connecting applications and mongo db through rest.

> **ProTip:** More in the future.


