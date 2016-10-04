# Slides

Slides from the conference are [available online](http://www.slideshare.net/EvanSchultz1/evan-schultz-angular-summit-2016-66530584)

# NgSummit2016Shelter

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.11-webpack.8.

## Development server
Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/). 
Before running the tests make sure you are serving the app via `ng serve`.

## API

This application uses Horizion and Rethinkdb for handling storing of some information. To run this application you will need horizon installed, and rethink db.

## Horizion

```
  npm install -g horizon
```

## Rethinkdb

If using OSX and Homebrew

```
brew update && brew install rethinkdb
```

Otherwise, see the [RethinkDB](https://www.rethinkdb.com/docs/install/) install page for more information.
