import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useEffect, useState } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import OnboardingPage from "./onboarding";
import Image from "next/image";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";

export default function LoginPage() {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const [session, setSession] = useState();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      if (!session) {
        router.push("/login"); // sends user to login screen if no session
      } else if (session) {
        router.push("/loginrouting"); // for email pw sign ins
      }
    });
  });

  return (
    <div className="items-center justify-center mx-12 h-screen">
      <Auth
        redirectTo={window.location.origin}
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        theme="default"
        providers={["google"]}
      />
    </div>
  );
}
