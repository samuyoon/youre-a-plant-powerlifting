import Card from "@/components/Card";
import { use, useEffect, useState } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

export default function ExerciseInputCard({
  currentWeek,
  currentSession,
  exercise,
}) {
  const supabase = useSupabaseClient();
  //   const [load, setLoad] = useState("");
  //   const [reps, setReps] = useState("");
  //   const [rpe, setRpe] = useState("");
  //   const inputs = [load, reps, rpe];

  // create a function that marks workout_logs records as completed = true for all records in current session

  // update call on change if load, rpe and reps are filled in

  const inputs = document.querySelectorAll(".overflow-hidden input"); // returns an array-like of all HTML elements === input within the div with overflow-hidden class
  inputs.forEach((input) => {
    // for each of the elements in the array-like called 'input'
    input.addEventListener("change", async () => {
      // listens for each time the value of the input field change (not after each keystroke)
      const load = document.getElementById(`${exercise.id}-load`).value; // gets the current value by it's unique id attribute
      const reps = document.getElementById(`${exercise.id}-reps`).value;
      const rpe = document.getElementById(`${exercise.id}-rpe`).value;

      await updateLogRecord(load, reps, rpe); // calls updateLogRecord
    });
  });

  async function updateLogRecord(load, reps, rpe) {
    // updates workout_logs table in supabase
    const { data, error } = await supabase
      .from("workout_logs")
      .update({ actual_load: load, actual_reps: reps, actual_rpe: rpe })
      .eq("id", exercise.id);
    if (error) {
      console.log(error);
    }
  }

  return (
    <Card>
      <div className=" overflow-hidden rounded-md pb-4">
        <div className="flex flex-col items-center">
          <div className="h-12 w-full overflow-hidden flex items-center justify-center bg-blue-500 text-white">
            <div className="ml-6">
              {/* Movement title blue header */}
              <h1> {exercise.exercise_name} </h1>
            </div>
          </div>
          <div className="w-11/12">
            <div>
              <div className="flex p-4 items-center justify-start w-full">
                {/* X sets by Y reps */}
                {`${exercise.sets} sets x ${exercise.target_reps} reps`}
              </div>
              {/* set row 1 */}
              <div className="flex justify-between items-center border-b border-gray-200 py-2 row-border">
                {/* set number circle */}
                <div className="rounded-full h-8 w-8 bg-blue-500 text-white flex items-center justify-center ml-6">
                  {exercise.sets}
                </div>
                {/* lbs input */}
                <div className="flex">
                  <input
                    placeholder={exercise.target_load}
                    type="text"
                    name="load"
                    id={`${exercise.id}-load`} // contains the exercise id so that the querySelectAll only selects this id and not every ExerciseInputCard
                    className={"w-16 h-18"}
                  />
                  <h3>lbs</h3>
                </div>

                {/* reps input */}
                <div className="flex">
                  <input
                    placeholder={exercise.target_reps}
                    type="text"
                    name="reps"
                    id={`${exercise.id}-reps`}
                    className={"w-16 h-18"}
                  />
                  <h3>reps</h3>
                </div>

                {/* rpe input */}
                <div className="flex">
                  <input
                    placeholder={exercise.target_rpe}
                    type="text"
                    name="rpe "
                    id={`${exercise.id}-rpe`}
                    className={"w-16 h-18 ml-6"}
                  />
                  <h3>RPE</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
