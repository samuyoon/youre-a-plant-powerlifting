import HistorySetRow from "@/components/HistorySetRow";

export default function HistoryExercise() {
  return (
    <div>
      {/* exercise name */}
      <div className="flex p-4 items-center justify-start w-full">
        Squat w/Belt
      </div>
      {/* set row 1 */}
      <HistorySetRow />
      <HistorySetRow />
    </div>
  );
}
