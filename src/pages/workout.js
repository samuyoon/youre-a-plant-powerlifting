import Layout from "@/components/Layout";
import Card from "@/components/Card";
import LoginPage from "@/pages/login";

import { useState } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

export default function WorkoutPage() {
  const supabase = useSupabaseClient();

  const session = useSession();

  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  const [rir, setRir] = useState("");

  return (
    <div>
      {!session ? (
        <LoginPage />
      ) : (
        // otherwise, go to the workoutpage
        <Layout>
          <div className="">
            <Card>
              <div className=" overflow-hidden rounded-md pb-4">
                <div className="flex flex-col items-center">
                  {/* Session title header */}
                  <div className="h-12 w-full overflow-hidden flex items-center bg-blue-500 text-white">
                    <div className="ml-6">
                      <h1> Squat w/ Belt </h1>
                    </div>
                  </div>
                  <div className="w-11/12">
                    <div>
                      {/* protocol */}
                      <div className="flex p-4 items-center justify-start w-full">
                        2 sets x 8 reps
                      </div>
                      {/* set row 1 */}
                      <div className="flex justify-between items-center border-b border-gray-200 py-2 row-border">
                        {/* set number circle */}
                        <div className="rounded-full h-8 w-8 bg-blue-500 text-white flex items-center justify-center ml-6">
                          1
                        </div>
                        {/* lbs input */}
                        <input
                          placeholder="lbs"
                          type="text"
                          name="weight"
                          id="weight"
                          value={weight}
                          onChange={(e) => setWeight(e.target.value)}
                          className="w-16 h-18"
                        />
                        {/* reps input */}
                        <input
                          placeholder="reps"
                          type="text"
                          name="reps"
                          id="reps"
                          value={reps}
                          onChange={(e) => setReps(e.target.value)}
                          className="w-16 h-18"
                        />
                        {/* rir input */}
                        <input
                          placeholder="RiR"
                          type="text"
                          name="rir"
                          id="rir"
                          value={rir}
                          onChange={(e) => setRir(e.target.value)}
                          className="w-16 h-18 ml-6"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          <div className="flex justify-center mt-4 mb-16">
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-4 px-8 rounded-md text-lg shadow-md shadow-gray-300">
              Finish Workout
            </button>
          </div>
        </Layout>
      )}
    </div>
  );
}
