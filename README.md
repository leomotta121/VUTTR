# VUTTR

This is a project done for [BossaBox](https://bossabox.com)'s challenge

## Set a .env file with:

MONGODB_URL, PASSPORT_SECRET

## Instructions:

In the project directory, you can run:

`npm install`

It should install all dependencies, now run:

`npm run dev`

It will start the server on port 3000.

or you may also run `docker-compose up`

_Just make sure you don't have anything on port 3000_

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

A better docmentation can be found [here](https://github.com/leomotta121/VUTTR/blob/master/docs/output.html). Download the html file and open on your browser.
