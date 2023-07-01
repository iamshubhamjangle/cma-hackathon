"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { toast } from "react-hot-toast";
import BlogSkeleton from "@/components/skeleton/blog";
import { AiOutlineMail } from "react-icons/ai";

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
    // let intermidiateResult = "";

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      // intermidiateResult = intermidiateResult + chunkValue;
      setResult((prev) => prev + chunkValue);
    }

    // console.info("-----------------intermidiateResult-------------------");
    // console.info(intermidiateResult);

    // try {
    //   const parsedJSON = JSON.parse(intermidiateResult);
    //   console.log(parsedJSON);
    //   setResult(parsedJSON);
    // } catch (e) {
    //   console.error(e);
    //   toast.error("Unable to parse the results! 🙁");
    // }

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
        {loading ? (
          <span className="loading loading-dots loading-lg"></span>
        ) : (
          "Generate Blog"
        )}
      </button>
    </div>
  );
};

const Blog = () => {
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [result, setResult] = useState("");
  const [date, setDate] = useState(null);

  useEffect(() => {
    setDate(new Date().toLocaleString());
  }, []);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
      <h2 className="text-xl font-mono text-primary font-bold mb-4">
        &gt; Blog Generator
      </h2>
      <Input
        loading={loading}
        setLoading={setLoading}
        userInput={userInput}
        setUserInput={setUserInput}
        setResult={setResult}
      />
      {loading && !result && <BlogSkeleton />}
      {!loading && !result && <div className="min-h-screen"></div>}
      {result && (
        <div className="card bg-base-100 shadow-2xl my-16 p-8 max-w-3xl mx-auto">
          <main>
            <div className="p-5 border border-primary rounded-lg mb-4">
              <p className="text-lg font-semibold mb-4">
                Share your blog as a post:
              </p>
              <div className="sharing-buttons flex flex-wrap">
                <button
                  onClick={() => toast.success("Post shared successfully! 😊")}
                  type="button"
                  className="w-full sm:w-fit text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
                >
                  <Image
                    width={24}
                    height={24}
                    alt=""
                    src="linkedIn.svg"
                    className="w-4 h-4 mr-2 -ml-1"
                  />
                  Share on LinkedIn
                </button>
                <button
                  onClick={() => toast.success("Post shared successfully! 😊")}
                  type="button"
                  className="w-full sm:w-fit text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2"
                >
                  <svg
                    className="w-4 h-4 mr-2 -ml-1"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fab"
                    data-icon="facebook-f"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 320 512"
                  >
                    <path
                      fill="currentColor"
                      d="M279.1 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.4 0 225.4 0c-73.22 0-121.1 44.38-121.1 124.7v70.62H22.89V288h81.39v224h100.2V288z"
                    ></path>
                  </svg>
                  Share on Facebook
                </button>
                <button
                  onClick={() => toast.success("Post shared successfully! 😊")}
                  type="button"
                  className="w-full sm:w-fit text-white bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 mr-2 mb-2"
                >
                  <svg
                    className="w-4 h-4 mr-2 -ml-1"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fab"
                    data-icon="twitter"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="currentColor"
                      d="M459.4 151.7c.325 4.548 .325 9.097 .325 13.65 0 138.7-105.6 298.6-298.6 298.6-59.45 0-114.7-17.22-161.1-47.11 8.447 .974 16.57 1.299 25.34 1.299 49.06 0 94.21-16.57 130.3-44.83-46.13-.975-84.79-31.19-98.11-72.77 6.498 .974 12.99 1.624 19.82 1.624 9.421 0 18.84-1.3 27.61-3.573-48.08-9.747-84.14-51.98-84.14-102.1v-1.299c13.97 7.797 30.21 12.67 47.43 13.32-28.26-18.84-46.78-51.01-46.78-87.39 0-19.49 5.197-37.36 14.29-52.95 51.65 63.67 129.3 105.3 216.4 109.8-1.624-7.797-2.599-15.92-2.599-24.04 0-57.83 46.78-104.9 104.9-104.9 30.21 0 57.5 12.67 76.67 33.14 23.72-4.548 46.46-13.32 66.6-25.34-7.798 24.37-24.37 44.83-46.13 57.83 21.12-2.273 41.58-8.122 60.43-16.24-14.29 20.79-32.16 39.31-52.63 54.25z"
                    ></path>
                  </svg>
                  Share on Twitter
                </button>

                <button
                  onClick={() => toast.success("Post shared successfully! 😊")}
                  type="button"
                  className="w-full sm:w-fit text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2 mb-2"
                >
                  <svg
                    className="w-4 h-4 mr-2 -ml-1"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fab"
                    data-icon="github"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 496 512"
                  >
                    <path
                      fill="currentColor"
                      d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
                    ></path>
                  </svg>
                  Share on Github
                </button>
                <button
                  onClick={() => toast.success("Post shared successfully! 😊")}
                  type="button"
                  className="w-full sm:w-fit text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
                >
                  <svg
                    className="w-4 h-4 mr-2 -ml-1"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fab"
                    data-icon="google"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 488 512"
                  >
                    <path
                      fill="currentColor"
                      d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                    ></path>
                  </svg>
                  Share on Google
                </button>
                <button
                  onClick={() => toast.success("Post shared successfully! 😊")}
                  type="button"
                  className="w-full sm:w-fit text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
                >
                  <AiOutlineMail size={20} className="mr-2" />
                  Share on Email
                </button>
              </div>
            </div>

            <header className="mb-4">
              <div className="inline-flex items-center text-sm">
                <Image
                  className="mr-4 rounded-full"
                  width={64}
                  height={64}
                  src="/user2.png"
                  alt="Jese Leos"
                />
                <div>
                  <p
                    className="text-xl font-bold"
                    contentEditable="true"
                    suppressContentEditableWarning={true}
                  >
                    Enter your Name
                  </p>
                  <p
                    className="text-base font-light"
                    contentEditable="true"
                    suppressContentEditableWarning={true}
                  >
                    Cerence
                  </p>
                  <p className="text-base font-light">
                    <span pubdate="">{date}</span>
                  </p>
                </div>
              </div>
              {/*
               ******** BLOG HEADING ********
               */}
              {/* <h1 className="mb-4 text-3xl font-extrabold leading-tight lg:mb-6 lg:text-4xl">
                    {result.title}
                  </h1> */}
            </header>
            {/*
             ******** BLOG BODY ********
             */}
            <div className="mb-4">
              <Image
                src="https://flowbite.s3.amazonaws.com/typography-plugin/typography-image-1.png"
                alt=""
                width={1280}
                height={720}
              />
              <p className="text-center">Digital art by AI</p>
              <br />
              <div
                className="whitespace-pre-line"
                contentEditable="true"
                suppressContentEditableWarning={true}
              >
                {result}
              </div>
            </div>
          </main>
          {/*
           ********** DISCUSSION & COMMENTS **********
           */}
          <section className="my-6">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg lg:text-2xl font-bold">Discussion</h2>
            </div>
            <form>
              <div className="mb-4 rounded-lg rounded-t-lg border border-gray-200-800-700">
                <label htmlFor="comment" className="sr-only">
                  Your comment
                </label>
                <textarea
                  id="comment"
                  rows={3}
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
        </div>
      )}
    </main>
  );
};

export default Blog;
