const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 8080;
const usersRouter = require("./routes/user");
const foodRouter = require("./routes/food");
const commercialRouter = require("./routes/commercial");
const orderRouter = require("./routes/order");
const numberRouter = require("./routes/number");
const cors = require('cors')

app.use(cors())

app.use(bodyParser.json());

app.use('/users', usersRouter);
app.use('/food', foodRouter);
app.use('/commercial', commercialRouter);
app.use('/order', orderRouter);
app.use('/number', numberRouter);

app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});




