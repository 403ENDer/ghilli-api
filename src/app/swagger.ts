import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Tournament API",
      version: "1.0.0",
    },
  },
  apis: ["./routes/**/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerSpec, swaggerUi };
