import Layout from "@/components/Layout";
import HistoryCard from "@/components/HistoryCard";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import LoginPage from "@/pages/login";

export default function HistoryPage() {
  const supabase = useSupabaseClient();

  const session = useSession();
  return (
    <div>
      {!session ? (
        <LoginPage />
      ) : (
        // otherwise, go to the HistoryPage
        <Layout>
          <div className="flex justify-center mb-4">
            <button className="flex gap-2 items-center">
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
            <div className="p-4 text-gray-400">Week 2</div>
            <button className="flex gap-2 items-center">
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
          <HistoryCard />
          <HistoryCard />
        </Layout>
      )}
    </div>
  );
}
