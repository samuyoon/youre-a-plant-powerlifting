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
      console.log(event, session);
      setSession(session);
      if (session) {
        router.push("/history"); // fix this-- this keeps pushing users to history page
      }
    });
  });

  return (
    <div className="items-center justify-center mx-12 h-screen">
      <Auth
        redirectTo={"http://localhost:3001/loginrouting/"}
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        theme="default"
        providers={["google"]}
      />
    </div>
  );
}
