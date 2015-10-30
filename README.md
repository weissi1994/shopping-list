# shopping-list

This project contains 4 diffrent parts that will be hosted in docker containers.  

__Web__  
A SPA site to view and handle shopping lists.

* Mithril
* ES6
* Babel + Webpack
* Bootstrap
* Express
* Gulp
* Docker

And together they serve a SPA site to view and handle diffrent shopping lists.

__Api__  
A web api with data storage.

* Express
* Express middleware: Body-Parser, Cors
* MongoDB node driver
* Docker

__Client__  
A cross platform client that will host the website localy on the machine.

* Electron <3

__Data store__  
A simple document database to host the data.

* Docker
* MongoDB

## Getting started

Download source files

```
git clone https://github.com/krilleha/shopping-list.git
```

## Build and run docker files

Build Api docker file

```
docker build -t shopping-list-api:1.0 api
docker run -d -p 3001:3001 shopping-list-api:1.0
```

Build Web docker file

```
docker build -t shopping-list-web:1.0 web
docker run -d -p 80:3000 shopping-list-web:1.0
```

Build Mongo docker file

```
docker build -t shopping-list-db:1.0 db
docker run -d -p 27017:27017 shopping-list-db:1.0
```
