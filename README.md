<img align="center" src="http://www.cbnews.fr/var/media/hit/original/1540500701_logo-altima.jpg" width="250" alt="Altima">

# SPA Integration Test
This test consists in integrating a SPA (Single Page Application) which mockup has been made and provided by Altima°.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

#### Check for Node and npm
Make sure that you've installed Node and npm before attempting to install gulp.

```sh
node -v
```
```sh
npm -v
```


*If not, npm is distributed with Node.js- which means that when you download Node.js, you automatically get npm installed on your computer.*

Click [here](https://nodejs.org/en/) to install Node.js and npm on your machine.

#### Install the `gulp` command

```sh
npm install --global gulp-cli
```

## Installing

#### How to get a development env running?

Just, run this command and you will be ready to go *(this may take a while depending on your machine & download speed)*

```
git clone https://github.com/hazlr/integration-test.git
cd integration-test
npm i
```

Once all needed packages are installed, please run the following command to start a local Dev Server:

```
gulp run:dev
```

## Build

#### How to test production files from dist/ folder ?

```
gulp run:prod
```
# Demo

Click [here](https://hazlr.github.io/integration-test/dist/#/) to see live demo.

## Built With

* [Angular](https://angular.io/docs) - The web framework used
* [Gulp](https://github.com/gulpjs/gulp/blob/master/docs/API.md) - Task Runner


## Versioning

I use [Git](https://git-scm.com/documentation) for versioning.


## Author

* **Adel Ben Massaoud** - (https://github.com/hazlr/)


## License

This project has been made for Altima° - © copyright 2017 Altima°
