# Alteryx Fullstack Project

Simple application with authentication and user management

## Installation

- install dependencies by running:

```
yarn
```

## Running the project

### Development mode

```
yarn dev
```

If you are running the application on your machine, it should be accessible [here](http://localhost:3000)

### Production mode

build the application first

```
yarn build
```

then run it

```
yarn start
```

If you are running the application on your machine, it should be accessible [here](http://localhost:3000)

If you want to run the application on different port than `3000`, set the `PORT` environment variable
### Run tests

```
yarn test
```

## Usage

- create a new user account before signing in
- after you create new user account, you should be redirected to the login page
- use your credentials to sign in
- you can create/edit/view/update users once you're signed in