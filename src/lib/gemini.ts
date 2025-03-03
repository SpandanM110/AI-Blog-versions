import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini with API key
const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY!;
const genAI = new GoogleGenerativeAI(apiKey);

// Define the model with the correct version and system instructions
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash-8b",
  systemInstruction: "Provide detailed responses in plain text format without using asterisks, bullet points, or markdown formatting.",
});

// Generation configuration
const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

// Helper function to generate blog content
export async function generateBlogContent(prompt: string) {
  try {
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    const result = await chatSession.sendMessage(`
      Write a well-structured blog post about the following topic: ${prompt}.

      The response should be in plain text without any asterisks or special formatting symbols. Ensure the blog includes:

      Title: A compelling and engaging headline.
      Introduction: A brief overview that hooks the reader.
      Body: Detailed paragraphs explaining the topic clearly.
      Conclusion: A meaningful summary that wraps up the blog effectively.

      Keep the word count under 200 words.
    `);

    return result.response.text();
  } catch (error) {
    console.error("Error generating content:", error);
    throw new Error("Failed to generate content");
  }
}

// Helper function to generate content suggestions
export async function generateContentSuggestions(topic: string) {
  try {
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    const result = await chatSession.sendMessage(`
      Provide five blog post ideas related to the topic: ${topic}.

      The response should be in plain text without using asterisks, markdown, or bullet points. Format each idea as follows:

      Title: A clear and engaging headline.
      Description: A brief explanation in two to three sentences.

      Ensure that the suggestions are creative and diverse.
    `);

    return result.response.text();
  } catch (error) {
    console.error("Error generating suggestions:", error);
    throw new Error("Failed to generate suggestions");
  }
}
