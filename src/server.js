require('dotenv').config();
const app = require('./config/custom-express');

const HOST = process.env.HOST;
const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server is running at http://${HOST}:${PORT}`));
