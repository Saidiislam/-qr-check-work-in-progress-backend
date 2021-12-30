const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');

dotenv.config();
connectDB();
const app = express();
const PORT = 5500;
app.use(express.json());
app.use(cors());

// api
app.use('/api/users', userRoutes);

app.get('/', (req,res) =>{
    res.send('api is runing');
});

app.listen(PORT, () => console.log(`server is runing on PORT ${PORT}`));

