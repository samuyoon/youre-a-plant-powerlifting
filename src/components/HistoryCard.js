import Card from "@/components/Card";
import HistoryExercise from "./HistoryExercise";

export default function HistoryCard() {
  return (
    <Card>
      <div className=" overflow-hidden rounded-md pb-4">
        <div className="flex flex-col items-center">
          {/* Session title header */}
          <div className="h-12 w-full overflow-hidden flex items-center justify-center bg-blue-500 text-white">
            Session 1
          </div>
          <div className="w-11/12">
            <HistoryExercise />
            <HistoryExercise />
            <HistoryExercise />
          </div>
        </div>
      </div>
    </Card>
  );
}
