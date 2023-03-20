import NavigationCard from "@/components/NavigationCard";

export default function Layout({ children }) {
  return (
    <div>
      <div className="flex max-w-4xl gap-6 mx-12">
        {/* Left side nav bar */}
        <div className="w-1/4 mt-16">
          <NavigationCard />
        </div>

        {/* Right side column with everything else */}
        <div className="w-3/4 mt-16">{children}</div>
      </div>
    </div>
  );
}
