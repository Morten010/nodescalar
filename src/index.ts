import { apiReference } from "@scalar/express-api-reference"
import Express from "express"
import swaggerJSDoc from "swagger-jsdoc"
import aiRouter from "./routes/aiRoutes"
import bodyParser from "body-parser"

const app = Express()

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json())

const swaggerOption: swaggerJSDoc.Options = {
    swaggerDefinition: {
        info: {
            title: "Local llm",
            version: "1.0.0",
            description: "Testing local llm",
            contact: {
                name: "Morten",
                url: "www.mortenra.me"
            },
        },
    },
    apis: ["index.ts", "src/index.ts", "src/routes/*.ts"],
}

const openapiSpecification = swaggerJSDoc(swaggerOption);
console.log(openapiSpecification);

app.use(
    "/docs",
    apiReference({
        theme: "bluePlanet",
        spec: {
            content: openapiSpecification
        }
    })
)

app.use("/api/ai", aiRouter)

app.listen(3000, () => {
    console.log("Listening on port 3000");
})