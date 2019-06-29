# VUTTR

This is a project done for [BossaBox](https://bossabox.com)'s challenge

## Set a .env file with:

MONGODB_URL, PASSPORT_SECRET & PORT

_Rember if you run docker-compose up the mongo url should be `mongodb://mongo:27017/some-name`_

## Instructions:

In the project directory, you can run:

`cd client`
`npm install`
`npm run start`

It should install all dependencies on the client and run the client on `http://localhost:3000` .

Now run:

`cd ..`
`cd server`
`npm install`
`npm run dev`

It will start the server on .env PORT variable or `3001`.

or you may also run `docker-compose up --build` on the root of the project and it will do what docker do.

## Routes

### Tools

- `[GET] /tools` : Will fetch all tools
- `[GET] /tools?tag=tagname` : Will fetch all tools by tag
- `[POST] /tools` : Create a new tool
- `[PATCH] /tools/:id` : Update an existing tool with ID parameter
- `[DELETE] /tools/:id` : Delete an existing tool with ID parameter

### Auth

- `[POST] /signup` : Create a new user
- `[POST] /signin` : Sign in a user

Better documentation can be found [here](https://github.com/leomotta121/VUTTR/blob/master/docs/output.html). Download the html file and open on your browser or read the [Markdown](https://github.com/leomotta121/VUTTR/blob/master/docs/documentation.apib).
