export default function LoadingSkeleton() {
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
}
