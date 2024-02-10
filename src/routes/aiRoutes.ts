import axios from "axios";
import express from "express"
import { openai } from "../lib/utils/openai";

const aiRouter = express.Router();


/**
 * @swagger
 *   /api/ai:
 *      get: 
 *          description: Get message
 *          responses: 
 *              200:
 *                  description: Success
 */
aiRouter.get("/", (req, res) => {

    res.send("all ai routes under here")
})


/**
 * @swagger
 *   /api/ai/models:
 *      get: 
 *          description: Gets all ai models
 *          responses: 
 *              200:
 *                  description: Success
 */


aiRouter.get("/models", async (req, res) => {
    const { data } = await axios.get("http://localhost:1234/v1/models")

    return res.json(data)
})

/**
 * @swagger
 *   /api/ai/chat:
 *      post: 
 *          description: Get ai response
 *          requestBody:
 *              description: Not optional
 *              required: true
 *              content:  
 *                  application/json:
 *                      schema:
 *                        type: object
 *                        properties:
 *                          messages:
 *                              type: array
 *                              items: 
 *                                  type: object
 *                                  properties:
 *                                      role: string
 *                                      content: string
 *          responses: 
 *              200:
 *                  description: Success
 */

aiRouter.post("/chat", async (req, res) => {
    const body = req.body
    console.log(body);
    
    const data = await openai.chat.completions.create({
        messages: [
            {"role": "system", "content": "Always answer in rhymes."},
            {"role": "user", "content": "Introduce yourself."}
        ],
        model: "mistral-ins-7b-q4"
    })

    console.log(data);
    return res.json(data)
})

export default aiRouter