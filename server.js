const express = require('express')

const routers = require('./Routes/router')

const app = express();
app.use(express.json())

app.use('/',routers)

const port = 8080;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


module.exports = app;
