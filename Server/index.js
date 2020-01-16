import express from 'express';
import bodyparser from 'body-parser';
import path from 'path';
import AuthRoute from './AppRoutes/AuthRoute';
import EmployeeRoute from './AppRoutes/EmployeeRoute';
import UploadRoute from './AppRoutes/UploadRoute'

const app = express();

app.use(express.json());
app.use(bodyparser.json());
app.use(express.urlencoded({ extended: true }));
app.use('Server/public', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.send({
  status: (200),
  message: ' Welcome to Employee management REST API (Back-End)!'
}));

app.use('/api/auth', AuthRoute);
app.use('/api', EmployeeRoute);
app.use('/api', UploadRoute)

const port = process.env.PORT || 6000;

const server = app.listen(port, console.log(`Employee management App is running on port ${port}`));
export default server;
