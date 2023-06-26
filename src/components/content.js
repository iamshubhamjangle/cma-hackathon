"use client";

import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-hot-toast";

const Content = () => {
  const [result, setResult] = useState("");
  const [userInput, setUserInput] = useState(
    "Help me to write a video script that can help showcase the possible use cases for voice assistant in a car"
  );
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setResult("");
    setLoading(true);
    const response = await fetch("/api/v1", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userContent: userInput,
      }),
    });

    if (!response.ok) {
      return toast.error(response.statusText);
    }

    const data = response.body;
    if (!data) return;

    const reader = data.getReader();
    const decoder = new TextDecoder();

    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setResult((prev) => prev + chunkValue);
    }

    setLoading(false);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
      <div className="min-h-16">
        <textarea
          placeholder="Type your query here..."
          className="textarea textarea-primary shadow-md border-slate-200 w-full"
          onChange={(e) => setUserInput(e.target.value)}
          value={userInput}
          autoFocus
        ></textarea>
        <button
          className="btn btn-primary w-full"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <span className="loading loading-dots loading-md"></span>
          ) : (
            "Send"
          )}
        </button>
      </div>
      <div className="card shadow-md card-bordered border-slate-200 justify-center my-4">
        {!result && !loading && (
          <div className="flex flex-col items-center gap-8 my-16">
            <Image
              src="empty.svg"
              height={360}
              width={360}
              alt="Try searching something!"
            />
            <p className="font-bold text-xl">What&apos;s in you mind?</p>
          </div>
        )}

        {loading && !result && (
          <div role="status" className="card-body space-y-2.5 animate-pulse">
            <div className="flex items-center w-full space-x-2">
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-500 w-32"></div>
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-400 w-24"></div>
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-400 w-full"></div>
            </div>
            <div className="flex items-center w-full space-x-2 max-w-[720px]">
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-500 w-full"></div>
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-400 w-full"></div>
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-400 w-24"></div>
            </div>
            <div className="flex items-center w-full space-x-2 max-w-[480px]">
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-400 w-full"></div>
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-500 w-80"></div>
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-400 w-full"></div>
            </div>
            <span className="sr-only">Loading...</span>
          </div>
        )}

        {result && (
          <div className="card-body whitespace-pre-line">{result}</div>
        )}
      </div>
    </main>
  );
};

export default Content;
