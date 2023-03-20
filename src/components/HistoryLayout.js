import NavigationCard from "@/components/NavigationCard";

export default function HistoryLayout({ children }) {
  return (
    <div>
      <div className="flex max-w-4xl mx-auto gap-6">
        {/* Left side nav bar */}
        <div className="w-1/4 mt-16">
          <NavigationCard />
        </div>

        {/* Right side column with everything else */}
        <div className="w-3/4">
          <div className="flex justify-center mb-4">
            <button className="flex gap-2 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>
            <div className="p-4 text-gray-400">Week 2</div>
            <button className="flex gap-2 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
          {children}
          <button>button</button>
        </div>
      </div>
    </div>
  );
}
