'use client';
import React, { useState } from "react";
import axios from "axios";

const ChatGPTConverter = () => {
    const [inputText, setInputText] = useState("");
    const [outputText, setOutputText] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e) => {
        setInputText(e.target.value);
    };

    const convertWithChatGPT = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post("/api/chatgpt", { prompt: inputText });
            setOutputText(response.data.output);
        } catch (error) {
            console.error("Error converting with ChatGPT:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleConvertButtonClick = () => {
        convertWithChatGPT();
    };

    console.log('dsadas')
    console.log(process.env.NEXT_PUBLIC_REACT_APP_OPENAI_API_KEY)

    return (
        <div className="max-w-lg mx-auto mt-8 p-4 bg-white rounded-lg shadow-lg">
            <h1 className="text-2xl font-semibold mb-4">ChatGPT Converter</h1>
            <textarea
                className="border p-2 w-full rounded-md"
                rows="10"
                placeholder="Enter your text here..."
                value={inputText}
                onChange={handleInputChange}
            ></textarea>
            <div className="mt-4">
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
                    onClick={handleConvertButtonClick}
                    disabled={isLoading}
                >
                    {isLoading ? "Converting..." : "Convert with ChatGPT"}
                </button>
            </div>
            {outputText && (
                <div className="mt-4">
                    <p className="text-gray-500 mb-2">ChatGPT Output:</p>
                    <code className="border p-2 w-full rounded-md">{outputText}</code>
                </div>
            )}
        </div>
    );
};

export default ChatGPTConverter;