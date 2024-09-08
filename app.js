require('dotenv').config();
const express = require('express');
const app = express();
const createError = require('http-errors');
const path = require('node:path');
const cookieParser = require('cookie-parser')
const indexRouter = require('./routes/indexRouter');
const brandsRouter = require('./routes/brandsRouter');
const categoriesRouter = require('./routes/categoriesRouter');
const itemsRouter = require('./routes/itemsRouter');
const compression = require('compression');
const helmet = require('helmet');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Remove this line after adding a favicon
app.use('/favicon.ico', (req, res) => res.status(204).end());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());

const assetsPath = path.join(__dirname, 'public');
app.use(express.static(assetsPath));

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "script-src": ["'self'", "code.jquery.com", "cdn.jsdelivr.net"],
      "img-src": ["'self'", '*'],
    },
  }),
);

app.use('/', indexRouter);
app.use('/brands', brandsRouter);
app.use('/categories', categoriesRouter);
app.use('/items', itemsRouter);

app.use(function(req, res, next) {
    next(createError(404));
  });

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    console.log(res.locals.error);
    res.status(err.status || 500);
    res.render('error');
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));