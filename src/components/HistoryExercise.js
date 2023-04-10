import HistorySetRow from "@/components/HistorySetRow";

export default function HistoryExercise({ log }) {
  return (
    <div>
      {/* exercise name */}
      <div className="flex p-4 items-center justify-start w-full">
        {log.exercise_name}
      </div>
      {/* set row 1 */}
      <HistorySetRow
        sets={log.sets}
        load={log.actual_load ?? 0}
        reps={log.actual_reps ?? 0}
        rpe={log.actual_rpe ?? 0}
      />
    </div>
  );
}
