export default function HistorySetRow({ sets, load, rpe, reps }) {
  return (
    <div>
      {/* set row 1 */}
      <div className="flex justify-between items-center border-b border-gray-200 py-2 row-border">
        <div className="rounded-full h-8 w-8 bg-blue-500 text-white flex items-center justify-center ml-6">
          {sets}
        </div>
        <div>{`${load} lbs`}</div>
        <div>{`${reps} reps`}</div>
        <div className="mr-6">{`${rpe} RPE`}</div>
      </div>
    </div>
  );
}
