import { GoogleGenAI } from "@google/genai";
import { GEMINI_AI_KEY } from "../configs/googleGenAiConfig";

const ai = new GoogleGenAI({apiKey: GEMINI_AI_KEY});

export default ai;
