import Card from "@/components/Card";
import HistoryExercise from "./HistoryExercise";

export default function HistoryCard({ session, sessionLog }) {
  return (
    <Card>
      <div className=" overflow-hidden rounded-md pb-4">
        <div className="flex flex-col items-center">
          {/* Session title in blue header */}
          <div className="h-12 w-full overflow-hidden flex items-center justify-center bg-blue-500 text-white">
            {`Session ${session}`}
          </div>
          <div className="w-11/12">
            <div>
              {sessionLog.map((log, index) => (
                <HistoryExercise key={index} log={log} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
