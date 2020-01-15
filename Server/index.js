/* eslint-disable linebreak-style */
import express from 'express';
import bodyparser from 'body-parser';
import path from 'path';
import AuthRoute from './AppRoutes/AuthRoute';
import EmployeeRoute from './AppRoutes/EmployeeRoute';

const app = express();

app.use(express.json());
app.use(bodyparser.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, 'public')));

// eslint-disable-next-line linebreak-style
app.get('/', (req, res) => res.send({
  status: (200),
  message: ' Welcome to Employee management REST API (Back-End)!'
}));

app.use('/api/auth', AuthRoute);
app.use('/api', EmployeeRoute);

const port = process.env.PORT || 8000;

// eslint-disable-next-line no-console
const server = app.listen(port, console.log(`Employee management App is running on port ${port}`));
export default server;
