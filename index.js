import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { config } from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

config();

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_AI_API_KEY);

app.get('/', (req, res) => {
    res.send('Hello from Express!');
});

app.post('/chat', async (req, res) => {
    try {
        const { data } = req.body;
        // console.log(data);
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
        const result = await model.generateContent(data);
        const response = await result.response.text();
        // console.log(response);
        res.send(response);
    } catch (error) {
        res.send("Server error")
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
