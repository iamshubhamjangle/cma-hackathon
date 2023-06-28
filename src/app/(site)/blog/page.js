"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";

const Blog = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const searchParams = useSearchParams();
  const search = searchParams.get("q");

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const response = await fetch("/api/stream/v1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userContent: search,
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
    }
    fetchData();
  }, []);

  return (
    <>
      {loading && !result && (
        <>
          <div
            role="status"
            className="max-w-3xl animate-pulse p-12 md:p-6 mx-auto"
          >
            <div className="flex items-center my-6 space-x-3">
              <svg
                className="text-gray-200 w-14 h-14 dark:text-gray-400"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-400 w-32 mb-2" />
                <div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-400 mb-1" />
                <div className="w-38 h-2 bg-gray-200 rounded-full dark:bg-gray-400" />
              </div>
            </div>
            <div className="flex items-center justify-center h-80 mb-4 bg-gray-300 rounded dark:bg-gray-400">
              <svg
                className="w-12 h-12 text-gray-200 dark:text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 640 512"
              >
                <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
              </svg>
            </div>
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-400 w-48 mb-4" />
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-400 mb-2.5" />
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-400 mb-2.5" />
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-400" />
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-400 my-2.5" />
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-400 mb-2.5" />
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-400" />
            <span className="sr-only">Loading...</span>
          </div>
        </>
      )}
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
                  {/* <h1 className="mb-4 text-3xl font-extrabold leading-tight lg:mb-6 lg:text-4xl">
                  {search}
                </h1> */}
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
                <div className="whitespace-pre-line">{result}</div>
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
    </>
  );
};

export default Blog;
