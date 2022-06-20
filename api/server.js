const colors = require('colors');
const connectDB = require('./services/db');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middleware/error');
const express = require('express');
const helmet = require('helmet');
const hpp = require('hpp');
const mongoSanitize = require('express-mongo-sanitize');
const morgan = require('morgan');
const path = require('path');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');

colors.enable();

const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS),
  max: parseInt(process.env.RATE_LIMIT_MAX),
});

// Routes
const auth = require('./routes/auth');
const me = require('./routes/me');
const password = require('./routes/password');

// Database
connectDB();

// App
const app = express();

// Middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(helmet());
app.use(hpp());
app.use(mongoSanitize());
app.use(xss());
app.use(limiter);

if (process.env.NODE_ENV === 'developement') {
  console.log('Morgan logger set to developement mode'.yellow);
  app.use(morgan('dev'));
}

// Mount routes
app.use('/api/v1/auth', auth);
app.use('/api/v1/me', me);
app.use('/api/v1/password', password);
app.use(errorHandler);

// Server
const port = process.env.PORT;
const host = process.env.HOST;
app.listen(
  port,
  host,
  console.log(`Server running in ${process.env.NODE_ENV} on http://${host}:${port}`.green)
);

// Unhandled errors
process.on('unhandledRejection', (error) => {
  console.log(`Error: ${error.message}`.red);
});

// Jobs
const initJobs = require('./jobs');
initJobs();
