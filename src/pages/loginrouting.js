import { useEffect, useState } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import OnboardingPage from "./onboarding";
import Image from "next/image";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";

export default function LoginRoutingPage() {
  const session = useSession();
  const router = useRouter();
  const [onboardingCreatedAt, setOnboardingCreatedAt] = useState(null);
  const [loading, setLoading] = useState(true);
  const supabase = useSupabaseClient();

  async function getOnboardingRecord() {
    setLoading(true);

    const { data, error } = await supabase // only works if RLS is enable on onboarding table
      .from("onboarding")
      .select("created_at");
    console.log(data);

    // if onboarding doc already exists, go to homepage
    if (data.length > 0) {
      setOnboardingCreatedAt(data);
      router.push("/");
    }
    // if no onboarding doc exists, go to onboarding
    if (data.length === 0) {
      setOnboardingCreatedAt(null);
      router.push("/onboarding");
    }
  }

  useEffect(() => {
    getOnboardingRecord();
  }, [session]);

  return <div></div>;
}
