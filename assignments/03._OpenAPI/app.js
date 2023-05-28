import express from "express"
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import shopRoute from "./routes/shopRoute.js";
import rateLimit from 'express-rate-limit';


const app = express();
app.use(express.json());
app.use(shopRoute);

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

app.use(limiter)

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "OpenAPI handin API",
            version: "1.0.0",
            description: "A simple Express API that utilizes OpenAPI",
        },
        servers: [
            {
            url: "http://localhost:8080",
            }
        ],
    },
    apis: ["./routes/*.js"],
}

const specs = swaggerJsdoc(options);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

app.listen(8080, () => {
    console.log("app is running on port 8080")
});
