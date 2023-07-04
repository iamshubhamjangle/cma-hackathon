import Link from "next/link";

export default function Home() {
  return (
    <div className="h-[83vh] flex items-center mx-auto max-w-4xl">
      <div className="flex flex-col items-center text-center mx-2">
        <h1 className="text-4xl md:text-6xl font-black py-1 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
          The Next-Generation Marketing Assistant
        </h1>
        <p className="mb-6 text-base md:text-2xl text-slate-400 font-medium">
          Supercharge your marketing strategy with our Next-Generation Marketing
          Assistant, harnessing the latest technologies to drive data-driven
          insights and boost brand&apos;s success.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 text-left ">
          <Link href="/assistant">
            <div className="w-full h-32 sm:h-40 sm:w-80 bg-gradient-to-br from-blue-700 via-blue-900 to-gray-900 px-6 flex flex-col justify-center rounded-lg">
              <p className="text-2xl font-bold text-white">Assistant</p>
              <span className="text-sm text-white">
                Your Marketing Virtual Assistant
              </span>
            </div>
          </Link>
          <Link href="/blog">
            <div className="w-full h-32 sm:h-40 sm:w-80 bg-gradient-to-br from-rose-700 via-amber-900 to-red-900 px-6 flex flex-col justify-center rounded-lg">
              <p className="text-2xl font-bold text-white">Blogger</p>
              <span className="text-sm text-white">AI Blog Generator</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
