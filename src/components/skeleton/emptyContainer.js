import Image from "next/image";

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

export default EmptyContainer;
