import Layout from "@/components/Layout";
import React from "react";
import Image from "next/image";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import LoginPage from "@/pages/login";

export default function Home() {
  const session = useSession();
  const supabase = useSupabaseClient();
  return (
    <div>
      {/* if there's no session, display auth component */}
      {!session ? (
        <LoginPage />
      ) : (
        // otherwise, go to the homepage
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
      )}
    </div>
  );
}
