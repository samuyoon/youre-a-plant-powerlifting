import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Database } from "lib/database.types";
import OnboardingPage from "./onboarding";
import Image from "next/image";
import Layout from "@/components/Layout";

export default function LoginRoutingPage() {
  const [onboardingCreatedAt, setOnboardingCreatedAt] = useState(null);
  const [loading, setLoading] = useState(true);
  const supabase =
    createClient <
    Database >
    (process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
  async function getOnboardingRecord() {
    setLoading = true;

    let { data, status, statusText } = await supabase
      .from("onboarding")
      .select("created_at");

    if (status !== 200) {
      console.log(statusText);
    }

    if (data) {
      setOnboardingCreatedAt(data);
    }

    setLoading(false);
  }

  useEffect(() => {
    getOnboardingRecord();
  }, []);

  return (
    <div>
      {onboardingCreatedAt ? (
        <Layout>
          <div className="flex flex-col items-center h-screen mt-12">
            <h1 className="text-4xl font-bold mb-8">You are Vibing</h1>
            <div className="rounded-full bg-gray-200 flex items-center justify-center w-80 h-80 mb-8">
              <Image
                src="https://media.tenor.com/CeAHoeMZtzUAAAAC/jay-gp.gif"
                alt="Flower"
                width={350}
                height={350}
                className="object-cover rounded-full"
              />
            </div>

            <button className="bg-blue-500 hover:bg-blue-600 text-white py-4 px-8 rounded-md text-lg shadow-md shadow-gray-300">
              Start Next Workout
            </button>
          </div>
        </Layout>
      ) : (
        OnboardingPage
      )}
    </div>
  );
}
