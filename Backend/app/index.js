const express = require('express');
const cors = require('cors');
const authUserRoutes = require('../routes/user.routes')
const captainRoutes = require('../routes/captain.routes')
const { authenticationMiddleware } = require('../middlewares/authMiddlewares');

const app = express();

app.use(cors());

app.use(express.json());


app.get('/', (req, res) => {
        res.json({status:"success", message:"Server is up an running"});
});
app.use(authenticationMiddleware);
app.use('/authUser',authUserRoutes);
app.use('/authCaptain', captainRoutes);

module.exports = app;