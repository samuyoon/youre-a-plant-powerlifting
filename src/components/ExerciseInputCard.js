import Card from "@/components/Card";
import { use, useEffect, useState } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

export default function ExerciseInputCard({
  currentWeek,
  currentSession,
  exercise,
}) {
  const supabase = useSupabaseClient();

  // create a function that marks workout_logs records as completed = true for all records in current session

  // update call on change if load, rpe and reps are filled in
  function handleInputChange() {
    const loadInput = document.getElementById(`${exercise.id}-load`);
    const repsInput = document.getElementById(`${exercise.id}-reps`);
    const rpeInput = document.getElementById(`${exercise.id}-rpe`);

    if (loadInput.value && repsInput.value && rpeInput.value) {
      // make database call using the values of the input fields
      const load = loadInput.value;
      const reps = repsInput.value;
      const rpe = rpeInput.value;

      // call a function that makes a database call with the input values
      updateLogRecord(load, reps, rpe);
    }
  }

  async function updateLogRecord(load, reps, rpe) {
    // updates workout_logs table in supabase
    console.log("update log records");
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
            <div className="">
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
                <div className="rounded-full h-8 w-8 bg-blue-500 text-white flex items-center justify-center ml-2 hidden md:block">
                  <div className="flex justify-center items-center">
                    {exercise.sets}
                  </div>
                </div>

                {/* lbs input */}
                <div className="flex ">
                  <input
                    placeholder={exercise.target_load ?? 0}
                    type="text"
                    name="load"
                    id={`${exercise.id}-load`} // contains the exercise id so that the querySelectAll only selects this id and not every ExerciseInputCard
                    className={"w-12 h-18 text-center"}
                    onBlur={handleInputChange}
                  />
                  <h3>lbs</h3>
                </div>

                {/* reps input */}
                <div className="flex">
                  <input
                    placeholder={exercise.target_reps ?? 0}
                    type="text"
                    name="reps"
                    id={`${exercise.id}-reps`}
                    className={"w-12 h-18 text-center"}
                    onBlur={handleInputChange}
                  />
                  <h3>reps</h3>
                </div>

                {/* rpe input */}
                <div className="flex -ml-6">
                  <input
                    placeholder={exercise.target_rpe ?? 0}
                    type="text"
                    name="rpe "
                    id={`${exercise.id}-rpe`}
                    className={"w-12 h-18 text-center ml-6"}
                    onBlur={handleInputChange}
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
