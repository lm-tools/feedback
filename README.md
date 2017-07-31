# Feedback app

[![Build status][build status image]][ci]
[![Known Vulnerabilities][snyk badge]][snyk project]

A feedback app, based on [express], which looks like [gov.uk]

[![Deploy][heroku deploy image]][heroku deploy hook]

## Dev setup

Use node 6.11.1 and npm >5. Setup with [nvm](https://github.com/creationix/nvm):

```sh
$ nvm install 6.11.1
$ npm install -g npm@5.3
``` 

Make sure that [PostgreSQL] is running, and that your current user (`$ whoami`)
has full access. Alternatively, custom database details can be provided by setting
a `DATABASE_URL` environment variable to a valid [PostgreSQL connection string]

Setup the application:

```sh
$ psql -c "create database feedback;"
$ psql -c "create database feedback_test;"
$ npm install
$ npm run watch
```

## Mounting the application in a directory

The app will run mounted at `/` by default. To run within a directory, set the
`EXPRESS_BASE_PATH` environment variable.

For example, to mount the application at `/feedback`, run:

```sh
$ EXPRESS_BASE_PATH=/feedback npm run start
```

## Add new survey

### New version of existing survey

1. Create migration `$ npm run create-migration <survey-id>-definition`
2. Replace the body with migration for the previous version .i.e
[db/migrations/20160906161744_ewycd-survey-definition.js](db/migrations/20160906161744_ewycd-survey-definition.js)
3. Edit it and run it `$ npm run db-migrate`
4. If you want to iterate on the changes you will have to reapplied the already run migration with
```
$ npm run db-rollback
$ npm run db-migrate
```

## Troubleshooting

### Removing migration during development

Remove migration file results with fallowing error

> Error: The migration directory is corrupt, the following files are missing:

Best way to fix it is to delete all the tables in db and redo migrations

    $ NODE_ENV=test node scripts/clear-db.js
    $ NODE_ENV=test npm run db-migrate

## Vulnerabilities

Check if project has any vulnerabilities by executing `npm run snyk`. For more info go to [snyk][snyk]

[build status image]: https://api.travis-ci.org/lm-tools/feedback.svg
[ci]: https://travis-ci.org/lm-tools/feedback
[express]: http://expressjs.com/
[gov.uk]: https://www.gov.uk/
[heroku deploy image]: https://www.herokucdn.com/deploy/button.svg
[heroku deploy hook]: https://heroku.com/deploy
[snyk]: https://snyk.io/
[snyk badge]: https://snyk.io/test/github/lm-tools/feedback/badge.svg
[snyk project]: https://snyk.io/test/github/lm-tools/feedback
