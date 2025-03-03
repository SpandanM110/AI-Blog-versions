"use client";

import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function AIContentGenerator() {
  const [prompt, setPrompt] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isShared, setIsShared] = useState(false);
  const router = useRouter();

  const generateContent = async () => {
    if (!prompt.trim()) {
      setError("⚠️ Please enter a topic.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setIsShared(false); // Reset sharing state when generating new content

      const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY!);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-8b" });

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      setContent(text);
    } catch (error) {
      setError("❌ Failed to generate content. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const sharePost = async () => {
    if (isShared) return; // Prevent multiple submissions

    try {
      await addDoc(collection(db, "posts"), {
        prompt,
        content,
        createdAt: new Date(),
      });

      setIsShared(true); // Mark as shared
      router.push("/posts");
    } catch (error) {
      console.error("Error posting:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Generate AI Blog Content</h2>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your topic or idea..."
        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
      />

      {error && <p className="mt-2 text-red-500 text-sm font-medium">{error}</p>}

      <button
        onClick={generateContent}
        disabled={loading}
        className={`w-full mt-4 py-3 text-lg font-semibold rounded-lg transition ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600 text-white shadow-md"
        }`}
      >
        {loading ? "Generating..." : "Generate Content"}
      </button>

      {content && (
        <div className="mt-6 p-5 bg-gray-100 border-l-4 border-blue-500 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Generated Content:</h3>
          <p className="text-gray-700 leading-relaxed">{content}</p>

          <button
            onClick={sharePost}
            disabled={isShared}
            className={`mt-4 w-full text-white font-semibold py-2 rounded-lg shadow-md transition ${
              isShared
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {isShared ? "Post Shared ✅" : "Share Post"}
          </button>
        </div>
      )}
    </div>
  );
}
