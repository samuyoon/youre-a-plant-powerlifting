import Layout from "@/components/Layout";
import HistoryCard from "@/components/HistoryCard";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import LoginPage from "@/pages/login";
import { useEffect, useState } from "react";

export default function HistoryPage() {
  const supabase = useSupabaseClient();
  const session = useSession();

  const [numSessions, setNumSessions] = useState(0);
  const [workoutLogs, setWorkoutLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentWeek, setCurrentWeek] = useState(1);

  function handleNextWeek() {
    // need to make sure user can't go past available weeks
    setCurrentWeek(currentWeek + 1);
  }

  // decrecements the currentWeek by one unless already at week 1
  function handlePrevWeek() {
    if (currentWeek === 1) {
      console.log("already at week 1");
    } else {
      setCurrentWeek(currentWeek - 1);
    }
  }

  // get the number of session and set numSessions-- used later to know how many session arrays to create and store iin sessions[]
  const fetchWorkouts = async () => {
    const { data, error } = await supabase.from("workouts_users").select(
      `
		  id,
		  workouts (
			  frequency
		  )
		  `
    );
    if (error) {
      console.log("fetchworkout error");
      console.log(error);
    } else {
      console.log("fetchworkout data");
      console.log(data);
      const frequency = data[0].workouts.frequency; // if no error, get the frequency string out of the data response and do some string manipulation to set numSessions
      const frequencyAsNum = Number(frequency.charAt(0));
      setNumSessions(frequencyAsNum);
    }
  };

  const fetchWorkoutLogs = async () => {
    const { data, error } = await supabase
      .from("workouts_users")
      .select(
        `
			id,
			workout_logs (
				exercise_id,
				exercise_name,
				session,
				sets,
				target_reps,
				target_load,
				target_rpe,
				actual_reps,
				actual_load,
				actual_rpe,
				week,
				ordering,
				completed
			)
			
			`
      )
      .eq("workout_logs.week", currentWeek)
      .order("ordering", { foreignTable: "workout_logs", ascending: true });
    if (error) {
      console.log("fetchworkoutlogs error");

      console.log(error);
    } else {
      // if no error, get the list of workout_logs records out of the data response to set workoutLogs
      console.log("fetchworkoutlogs data");
      console.log(data);
      setWorkoutLogs(data[0].workout_logs);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchWorkouts();
    fetchWorkoutLogs();
    setIsLoading(false);
  }, [currentWeek]);

  // show loading screen while fetching Workouts and logs
  if (isLoading) return <div>Loading...</div>;

  // group the workout logs by session, creating an array of arrays of workout_logs records
  const sessions = [];
  for (let i = 1; i <= numSessions; i++) {
    sessions.push(workoutLogs.filter((log) => log.session === i));
  }

  return (
    <div>
      {!session ? (
        <LoginPage />
      ) : (
        // otherwise, go to the HistoryPage
        <Layout>
          <div className="flex justify-center mb-4">
            {/* Prev Week Arrow Button */}
            <button
              className="flex gap-2 items-center"
              onClick={handlePrevWeek}
            >
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
            <div className="p-4 text-gray-400">{`Week ${currentWeek}`}</div>
            {/* Next Week Arrow Button */}
            <button
              className="flex gap-2 items-center"
              onClick={handleNextWeek}
            >
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
          <div>
            {/* create a HistoryCard for each array in the session array */}
            {sessions.map((sessionLog, index) => (
              <HistoryCard
                key={index}
                session={index + 1}
                sessionLog={sessionLog}
              />
            ))}
          </div>
        </Layout>
      )}
    </div>
  );
}
