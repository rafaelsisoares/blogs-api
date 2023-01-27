const express = require('express');

const loginRouter = require('./routes/Login.Router');
const userRouter = require('./routes/User.Router');
const categoryRouter = require('./routes/Category.Router');
const errorMiddleware = require('./middlewares/error');

// ...

const app = express();

app.use(express.json());
app.use('/login', loginRouter);
app.use('/user', userRouter);
app.use('/categories', categoryRouter);
app.use(errorMiddleware);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
