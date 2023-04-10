import NavigationCard from "@/components/NavigationCard";

export default function Layout({ children }) {
  return (
    <div>
      <div className="md:flex max-w-4xl gap-6 mx-12">
        {/* Left side nav bar */}
        <div className="fixed md:static w-full bottom-0 md:w-1/4 mt-28 -mb-5">
          <NavigationCard />
        </div>

        {/* Right side column with everything else */}
        <div className="md:w-3/4 mt-16">{children}</div>
      </div>
    </div>
  );
}
