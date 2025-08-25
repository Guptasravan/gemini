
const { GoogleGenAI } = require('@google/genai'); 
const dotenv = require('dotenv');
dotenv.config(); 

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const generate = async (req, res) => {
  console.log("yaha call aaya hai swwswsqws")
  try {
    const { content } = req.body;

    // console.log(content) 

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: [
        {
          parts: [
            { text: content.content } 
          ]
        }
      ]
    });

    console.log("yaha sab sahi hai");
    console.log(response.text);

    res.status(200).json({
      success: true,
      response: response.text,
    });
  } catch (error) {
    console.error("Gemini API Error:", error.message || error);

    if (error?.status === 503 || error?.message?.includes("overloaded")) {
      return res.status(503).json({
        success: false,
        message: "Model is overloaded. Please try again shortly.",
      });
    }

    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

module.exports = generate;  
