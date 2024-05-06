require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const path = require('path');
const errorHandler = require('./middleware/ErrorHandlerMiddleware');
const fileUpload = require('express-fileupload');
const router = require('./routers/index');

const PORT = process.env.PORT || 5004;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({}));
app.use('/api', router);

// Middleware с ошибками должен регистрироваться в последнюю очередь!!!
app.use(errorHandler);

app.get(
    '/',
    (req, resp) => {
        resp.status(200).json(
            {
                message: 'Fintrack here!!!'
            }
        );
    }
)

const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        app.listen(PORT, () => console.log(`SERVER STARTED ON PORT ${PORT}`))
    } catch (error) {
        console.log(error)
    }
}
start();