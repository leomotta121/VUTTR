# VUTTR

This is a project done for [BossaBox](https://bossabox.com) challenge

## Instructions:

In the project directory, you can run:

`npm install`

It should install all dependencies, now run:

`npm run dev`

It will start the server on the port 3000

**Note: Do not forget to add the .env file on the root project:**

Notice on `bin/dev` file:

```
require('dotenv/config')
require('../src/app.js')
```

For more information about dotenv click [here](https://www.npmjs.com/package/dotenv)

environment variables:

`DB_PASSWORD, DB_NAME, DB_USER`
