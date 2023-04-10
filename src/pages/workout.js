import Layout from "@/components/Layout";
import ExerciseInputCard from "@/components/ExerciseInputCard";
import LoginPage from "@/pages/login";

import { useEffect, useState } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import MovementInputCard from "../components/ExerciseInputCard";

export default function WorkoutPage() {
  const supabase = useSupabaseClient();
  const session = useSession();
  const [currentWeek, setCurrentWeek] = useState("");
  const [currentSession, setCurrentSession] = useState("");
  const [currentExercises, setCurrentExercises] = useState([]);

  // get current week and session
  const getCurrentWeekAndSession = async () => {
    const { data, error } = await supabase
      .from("workout_logs")
      .select()
      .eq("completed", "FALSE")
      .order("week", { ascending: true })
      .order("session", { ascending: true })
      .limit(1);

    if (error) {
      console.log("we");

      console.log(error);
    } else {
      // if no error, set currentWeek to the minimum of the returned weeks
      console.log(data);
      setCurrentWeek(data[0].week);
      setCurrentSession(data[0].session);
    }
  };

  // get all of the exercises as array of arrays
  const getExercises = async () => {
    const { data, error } = await supabase
      .from("workout_logs")
      .select("*")
      .eq("week", currentWeek)
      .eq("session", currentSession)
      .order("ordering", { ascending: true });

    if (error) {
      console.log("ex");
      console.log(currentSession);
      console.log(currentWeek);

      console.log(error);
    } else {
      console.log("excercise data");

      console.log(data);

      setCurrentExercises(data);
    }
  };

  //mark each exercise as complete
  const handleFinishWorkout = async () => {
    const { data, error } = await supabase
      .from("workout_logs")
      .update({ completed: true })
      .eq("week", currentWeek)
      .eq("session", currentSession)
      .select();

    if (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        await getCurrentWeekAndSession();
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    if (currentWeek && currentSession) {
      const getExerciseData = async () => {
        try {
          await getExercises();
        } catch (error) {
          console.log(error);
        }
      };
      getExerciseData();
    }
  }, [currentWeek, currentSession]);
  return (
    <div>
      {!session ? (
        <LoginPage />
      ) : (
        // otherwise, go to the workoutpage
        <Layout>
          <div>{`Week ${currentWeek}, Session ${currentSession}`}</div>
          <div className="">
            {currentExercises.map((exercise, index) => (
              <ExerciseInputCard
                key={index}
                exercise={exercise}
                currentSession={currentSession}
                currentWeek={currentWeek}
              />
            ))}
          </div>
          <div className="flex justify-center mt-4 mb-16">
            <button
              onClick={handleFinishWorkout}
              className="bg-blue-500 hover:bg-blue-600 text-white py-4 px-8 rounded-md text-lg shadow-md shadow-gray-300"
            >
              Finish Workout
            </button>
          </div>
        </Layout>
      )}
    </div>
  );
}
