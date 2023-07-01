"use client";

import Image from "next/image";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { BiSolidCopyAlt } from "react-icons/bi";

const Input = ({ loading, setLoading, userInput, setUserInput, setResult }) => {
  const handleSendClick = async () => {
    if (userInput.length === 0) {
      toast.error("Please enter a valid query");
      return;
    }

    setResult("");
    setLoading(true);
    const response = await fetch("/api/stream/v1", {
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
    <div className="min-h-16">
      <textarea
        placeholder="Type your query here..."
        className="textarea border-slate-200 w-full m-0"
        onChange={(e) => setUserInput(e.target.value)}
        value={userInput}
        autoFocus
      ></textarea>
      <button
        className="btn btn-primary btn-block"
        loading={loading}
        onClick={handleSendClick}
      >
        Get Results
      </button>
    </div>
  );
};

const LoadingSkeleton = () => {
  return (
    <div role="status">
      <div className="card-body space-y-2.5 animate-pulse">
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
      </div>
      <div className="card-body space-y-2.5 animate-pulse">
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
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

const EmptyContainer = () => {
  return (
    <div className="block m-auto">
      <div className="flex flex-col items-center gap-8 my-16 max-w-xl">
        <Image
          src="empty.svg"
          height={360}
          width={360}
          alt="Try searching something!"
        />
        <p className="text-2xl text-slate-500 text-center">
          Discover the Answers You Seek: Unleash the Potential of Your Queries
          and Unlock Valuable Insights.
        </p>
      </div>
    </div>
  );
};

const HelpContainer = () => {
  const [checked, setChecked] = useState(false);

  return (
    <div
      className="collapse collapse-plus bg-base-200 cursor-pointer"
      onClick={() => setChecked((prev) => !prev)}
    >
      <input type="radio" defaultChecked={checked} />
      <div className="collapse-title font-medium">
        Discover how to use the Application:
      </div>
      <div className="collapse-content">
        <ul className="space-y-1 list-disc list-inside">
          <li>
            Simply enter your queries, topics, or ideas in the Input box below.
            The more detailed your query, the more accurate and desirable the
            generated output will be.
          </li>
          <li>
            For general queries, click the{" "}
            <span className="font-bold">&quot;Get Results&quot;</span> button to
            instantly view the results on the same page.
          </li>
          <li>
            To generate a blog based on your desired topic, click the{" "}
            <span className="font-bold">&quot;Generate a blog&quot;</span>{" "}
            button. Once the blog is generated, you will be redirected to the
            blog page.
          </li>
        </ul>
        <p className="mt-3 italic">
          Note: Kindly be aware that the generated responses may contain errors,
          and it may be necessary to manually verify the facts.
        </p>
      </div>
    </div>
  );
};

const Result = ({ result }) => {
  return (
    <div>
      <button
        className="block btn ml-auto m-2 tooltip tooltip-bottom"
        data-tip="Copy"
        onClick={() => navigator.clipboard.writeText(result)}
      >
        <BiSolidCopyAlt size={20} />
      </button>
      <div className="card-body pt-0 whitespace-pre-line">{result}</div>
    </div>
  );
};

const Content = () => {
  const [result, setResult] = useState("");
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleGenerateBlogClick = () => {
    if (userInput.length === 0) {
      toast.error("Please enter a valid query");
      return;
    }

    router.push("/blog?q=" + userInput);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
      <Input
        loading={loading}
        setLoading={setLoading}
        userInput={userInput}
        setUserInput={setUserInput}
        setResult={setResult}
      />
      <div className="h-screen card shadow-md card-bordered border-slate-200 my-2 p-2">
        {!result && !loading && <EmptyContainer />}
        {loading && !result && <LoadingSkeleton />}
        {result && <Result result={result} />}
      </div>
    </main>
  );
};

export default Content;
