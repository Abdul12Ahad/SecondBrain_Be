const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const cookieParser = require('cookie-parser'); 
require('dotenv').config();
require('./config/passport');

const authRoutes = require('./routes/authRoutes');
const cardRoutes = require('./routes/cardRouter');

const app = express();

app.use(cors({
  origin: "https://sebrain.netlify.app",
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use(passport.initialize());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use('/api/auth', authRoutes);
app.use('/api/cards', cardRoutes);

async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
  }
}

main();
