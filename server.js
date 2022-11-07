const express = require("express");

require ('dotenv').config();

const app = express();

const userRoutes = require('./routes/api/user');
const driverRoutes = require('./routes/api/driver');
const authRoutes = require('./routes/api/auth');
const companyRoutes = require('./routes/api/company');

app.use(express.json({extended:false}));
app.use('/api/user',userRoutes);
app.use('/api/driver',driverRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/company',companyRoutes);
app.get('/', (req,res)=>res.send('API Running'));

const PORT = 6969;

app.listen(PORT, ()=>console.log(`Server started on PORT ${PORT}`));