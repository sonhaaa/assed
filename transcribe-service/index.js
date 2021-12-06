import express from 'express';
import routes from './routes/upload.route.js';


const app = express();

// global.__basedir = __dirname;


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.use(express.urlencoded({
    extended: true
}));

routes(app);

const port = process.env.PORT || 8888;
app.listen(port, () => {
    console.log('Connected to port ' + port)
})

// Handle error
app.use((req, res, next) => {
    setImmediate(() => {
        next(new Error('Error occured'));
    });
});

app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});