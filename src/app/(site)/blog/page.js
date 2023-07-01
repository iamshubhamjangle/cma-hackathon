"use client";

import React, { useState } from "react";
import Image from "next/image";
import { toast } from "react-hot-toast";
import BlogSkeleton from "@/components/skeleton/blog";

const Input = ({ loading, setLoading, userInput, setUserInput, setResult }) => {
  const handleSendClick = async () => {
    if (userInput.length === 0) {
      toast.error("Please enter a valid query");
      return;
    }

    setResult("");
    setLoading(true);
    const response = await fetch("/api/stream/v2", {
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
    let intermidiateResult = "";

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      // intermidiateResult = intermidiateResult + chunkValue;
      setResult((prev) => prev + chunkValue);
    }

    try {
      // setResult(JSON.parse(intermidiateResult));
    } catch (e) {
      console.info("-----------------intermidiateResult-------------------");
      console.info(intermidiateResult);
      console.error(
        "-----------------Unable to parse the results!-----------------"
      );
      console.error(e);
      toast.error("Unable to parse the results! 🙁");
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
        disabled={loading}
        onClick={handleSendClick}
      >
        Get Results
      </button>
    </div>
  );
};

const Blog = () => {
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [result, setResult] = useState("");

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
      <h2 className="text-xl font-mono text-primary font-bold mb-4">
        / Blog Generator
      </h2>
      <Input
        loading={loading}
        setLoading={setLoading}
        userInput={userInput}
        setUserInput={setUserInput}
        setResult={setResult}
      />
      {loading && !result && <BlogSkeleton />}
      {JSON.stringify(result)}
      {result && (
        <>
          <main className="pt-8 pb-16 lg:pt-16 lg:pb-24">
            <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
              <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue">
                <header className="mb-4 lg:mb-6 not-format">
                  <address className="flex items-center mb-6 not-italic">
                    <div className="inline-flex items-center mr-3 text-sm">
                      <Image
                        className="mr-4 rounded-full"
                        width={64}
                        height={64}
                        src="/user2.png"
                        alt="Jese Leos"
                      />
                      <div>
                        <a href="#" rel="author" className="text-xl font-bold ">
                          Your Name
                        </a>
                        <p className="text-base font-light">
                          Software Engineer, Cerence
                        </p>
                        <p className="text-base font-light">
                          <time
                            pubdate=""
                            dateTime="2022-02-08"
                            title="February 8th, 2022"
                          >
                            Jun. 30, 2022
                          </time>
                        </p>
                      </div>
                    </div>
                  </address>
                  {/*
                   ******** BLOG HEADING ********
                   */}
                  <h1 className="mb-4 text-3xl font-extrabold leading-tight lg:mb-6 lg:text-4xl">
                    {result.title}
                  </h1>
                </header>
                {/*
                 ******** BLOG BODY ********
                 */}
                <figure className="my-8">
                  <Image
                    src="https://flowbite.s3.amazonaws.com/typography-plugin/typography-image-1.png"
                    alt=""
                    width={1280}
                    height={720}
                  />
                  <figcaption className="text-center">
                    Digital art by AI
                  </figcaption>
                </figure>
                <br />
                <div className="whitespace-pre-line">{result.paragraph1}</div>
                <div className="whitespace-pre-line">{result.paragraph2}</div>
                <div className="whitespace-pre-line">{result.conclusion}</div>
                {/*
                 ********** DISCUSSION & COMMENTS **********
                 */}
                <section className="my-6">
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-lg lg:text-2xl font-bold">
                      Discussion
                    </h2>
                  </div>
                  <form>
                    <div className="mb-4 rounded-lg rounded-t-lg border border-gray-200-800-700">
                      <label htmlFor="comment" className="sr-only">
                        Your comment
                      </label>
                      <textarea
                        id="comment"
                        rows={6}
                        className="textarea w-full"
                        placeholder="Write a comment..."
                        required=""
                        defaultValue={""}
                      />
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Post comment
                    </button>
                  </form>
                </section>
              </article>
            </div>
          </main>
          {/*
           ********** RELATED ARTICLES **********
           */}
          <aside
            aria-label="Related articles"
            className="py-8 lg:py-24 bg-gray-50-800"
          >
            <div className="px-4 mx-auto max-w-screen-xl">
              <h2 className="mb-8 text-2xl font-bold">Related articles</h2>
              <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
                <article className="max-w-xs">
                  <a href="#">
                    <Image
                      src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/article/blog-1.png"
                      className="mb-5 rounded-lg"
                      width={720}
                      height={480}
                      alt="Image 1"
                    />
                  </a>
                  <h2 className="mb-2 text-xl font-bold leading-tight">
                    <a href="#">Our first office</a>
                  </h2>
                  <p className="mb-4 font-light text-gray-500-400">
                    Over the past year, Volosoft has undergone many changes!
                    After months of preparation.
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center font-medium underline underline-offset-4 text-primary-600-500 hover:no-underline"
                  >
                    Read in 2 minutes
                  </a>
                </article>
                <article className="max-w-xs">
                  <a href="#">
                    <Image
                      src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/article/blog-2.png"
                      className="mb-5 rounded-lg"
                      width={720}
                      height={480}
                      alt="Image 2"
                    />
                  </a>
                  <h2 className="mb-2 text-xl font-bold leading-tight">
                    <a href="#">Enterprise design tips</a>
                  </h2>
                  <p className="mb-4 font-light text-gray-500-400">
                    Over the past year, Volosoft has undergone many changes!
                    After months of preparation.
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center font-medium underline underline-offset-4 text-primary-600-500 hover:no-underline"
                  >
                    Read in 12 minutes
                  </a>
                </article>
                <article className="max-w-xs">
                  <a href="#">
                    <Image
                      src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/article/blog-3.png"
                      className="mb-5 rounded-lg"
                      width={720}
                      height={480}
                      alt="Image 3"
                    />
                  </a>
                  <h2 className="mb-2 text-xl font-bold leading-tight">
                    <a href="#">We partnered with Google</a>
                  </h2>
                  <p className="mb-4 font-light text-gray-500-400">
                    Over the past year, Volosoft has undergone many changes!
                    After months of preparation.
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center font-medium underline underline-offset-4 text-primary-600-500 hover:no-underline"
                  >
                    Read in 8 minutes
                  </a>
                </article>
                <article className="max-w-xs">
                  <a href="#">
                    <Image
                      src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/article/blog-4.png"
                      className="mb-5 rounded-lg"
                      width={720}
                      height={480}
                      alt="Image 4"
                    />
                  </a>
                  <h2 className="mb-2 text-xl font-bold leading-tight">
                    <a href="#">Our first project with React</a>
                  </h2>
                  <p className="mb-4 font-light text-gray-500-400">
                    Over the past year, Volosoft has undergone many changes!
                    After months of preparation.
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center font-medium underline underline-offset-4 text-primary-600-500 hover:no-underline"
                  >
                    Read in 4 minutes
                  </a>
                </article>
              </div>
            </div>
          </aside>
          {/*
           ********** SIGN UP FOR NEWSLETTER **********
           */}
          <section className="bg-white-900">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
              <div className="mx-auto max-w-screen-md sm:text-center">
                <h2 className="mb-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
                  Sign up for our newsletter
                </h2>
                <p className="mx-auto mb-8 max-w-2xl font-light text-gray-500 md:mb-12 sm:text-xl-400">
                  Stay up to date with the roadmap progress, announcements and
                  exclusive discounts feel free to sign up with your email.
                </p>
                <form action="#">
                  <div className="items-center mx-auto mb-3 space-y-4 max-w-screen-sm sm:flex sm:space-y-0">
                    <div className="relative w-full">
                      <label
                        htmlFor="email"
                        className="hidden mb-2 text-sm font-medium-300"
                      >
                        Email address
                      </label>
                      <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <svg
                          className="w-5 h-5 text-gray-500-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                      </div>
                      <input
                        className="block p-3 pl-10 w-full text-sm bg-white rounded-lg border border-gray-300 sm:rounded-none sm:rounded-l-lg focus:ring-primary-500 focus:border-primary-500-700-600-400-primary-500-primary-500"
                        placeholder="Enter your email"
                        type="email"
                        id="email"
                        required=""
                      />
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="py-3 px-5 w-full text-sm font-medium text-center rounded-lg border cursor-pointer bg-primary-700 border-primary-600 sm:rounded-none sm:rounded-r-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300-600-primary-700-primary-800"
                      >
                        Subscribe
                      </button>
                    </div>
                  </div>
                  <div className="mx-auto max-w-screen-sm text-sm text-left text-gray-500 newsletter-form-footer-300">
                    We care about the protection of your data.{" "}
                    <a
                      href="#"
                      className="font-medium text-primary-600-500 hover:underline"
                    >
                      Read our Privacy Policy
                    </a>
                    .
                  </div>
                </form>
              </div>
            </div>
          </section>
        </>
      )}
    </main>
  );
};

export default Blog;
