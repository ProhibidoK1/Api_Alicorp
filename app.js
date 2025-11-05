require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger/swagger');
const authRoutes = require('./routes/auth');
const blobRoutes = require('./routes/blob');

const app = express();
app.use(express.json());

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/login', authRoutes);
app.use('/api/blob', blobRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor en http://localhost:${PORT}`);
    console.log(`📘 Swagger en http://localhost:${PORT}/api/docs`);
});
