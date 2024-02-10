import axios from "axios";
import express from "express"
import { openai } from "../lib/utils/openai";
import { ChatCompletionMessageParam } from "openai/resources";

const aiRouter = express.Router();


/**
 * @swagger
 *   /api/ai:
 *      get: 
 *          tags:
 *            - ai
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
 *          tags:
 *            - ai
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
 *          tags:
 *            - ai
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
 *                                  required:
 *                                    - role
 *                                    - content
 *                                  properties:
 *                                      role: 
 *                                          type: string
 *                                          default: "user"
 *                                      content: 
 *                                          type: string
 *                                          default: "Give me an array for all the days of the week"
 *          responses: 
 *              200:
 *                  description: Success
 */

type ResponseProps = {
    messages: ChatCompletionMessageParam[]
  }

aiRouter.post("/chat", async (req, res) => {
    const { messages }: ResponseProps = await req.body
    
    const data = await openai.chat.completions.create({
        messages: [
            {"role": "system", "content": "Answer back as short and precise as you can."},
            ...messages
        ],
        model: "mistral-ins-7b-q4"
    })

    console.log(data);
    return res.json(data)
})

export default aiRouter