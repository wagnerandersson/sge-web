const express = require("express");
const { resolve } = require('path')

const app = express();


app.use('/', express.static(
    resolve(
        __dirname,
        './build'
    )
)
)
app.use('/menu', express.static(
    resolve(
        __dirname,
        './build'
    )
)
)
  // Express serve up index.html file if it doesn't recognize route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });


app.listen(process.env.PORT || 3000, (err) => {
    if (err) { return console.log(err)}
    console.log("Server is running")
})