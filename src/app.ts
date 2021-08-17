import express from "express";
import routes from '../routes/routes.js'

const app = express();
const PORT = 3000;

app.use('/', routes)
app.use(express.json())

app.listen(PORT, () => console.log(`Server Running On http://localhost:${PORT}`))