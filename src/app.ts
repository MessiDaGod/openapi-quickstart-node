import express from 'express';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import { OpenAPIV3 } from 'openapi-types';

const app = express();
const port = 3000;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Use the Swagger UI middleware to display the API documentation
const spec: OpenAPIV3.Document = require('./api/openapi.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(spec));

// Start the server
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
