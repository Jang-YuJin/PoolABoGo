import { GoogleGenAI } from "@google/genai";
import { GEMINI_AI_KEY } from "../../configs/geminiAiConfig";
import z from "zod";
import zodToJsonSchema from "zod-to-json-schema";
import type { ZodTypeAny } from "zod/v3";
import { fileToBase64 } from "../../utils/file";
import type { AiResponse } from "../../models/ai";

const answerSchema = z.object({
  plantName: z.string().describe('식물의 이름'),
  plantDesc: z.string().describe('식물에 대한 설명'),
  plantStatus: z.string().describe('식물의 상태, healthy/warning/critical로 구분하며 healthys는 건강, warning은 주의, critical은 위험 상태를 의미'),
  plantCaution: z.string().describe('식물을 키우면서 주의해야하는 사항')
})

const ai = new GoogleGenAI({apiKey: GEMINI_AI_KEY});


const prompt = `당신은 식물에 대해서 아주 잘 알고있는 저명한 식물학 교수입니다.
보내준 이미지의 식물이 어떤 식물인지 알려주고 이 식물에 대한 간단한 설명을 100자 내외로 해주세요.
그리고 이 식물의 상태가 좋은지 나쁜지 healthy/warning/critical로 구분을 지어서 알려주세요. healthys는 건강, warning은 주의, critical은 위험 상태를 의미합니다.
또한 이 식물을 키우면서 주의해야하는 사항을 300자 내외로 알려주세요.
답변은 반드시 아래 JSON 스키마의 key 이름을 그대로 사용해서 응답하세요.
key를 번역하거나 변경하지 마세요.

{
  "plantName": string,
  "plantDesc": string,
  "plantStatus": string,
  "plantCaution": string
}`;

const getPlantInfo = async(img: File): Promise<AiResponse> => {
  const base64Image = await fileToBase64(img);
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      {
        role: "user",
        parts: [
          {
            inlineData: {
              data: base64Image,
              mimeType: img.type || "image/jpeg",
            },
          },
          { text: prompt },
        ],
      },
    ],
    config: {
      responseMimeType: "application/json",
      responseJsonSchema: zodToJsonSchema(answerSchema as unknown as ZodTypeAny),
    },
  });

  if(response.text !== undefined){
    return JSON.parse(response.text);
  } else{
    throw new Error('Fail to get answer from Gemini!');
  }

};

export default getPlantInfo;