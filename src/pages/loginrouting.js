import { useEffect, useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import OnboardingPage from "./onboarding";
import Image from "next/image";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";

export default function LoginRoutingPage() {
  const router = useRouter();
  const [onboardingCreatedAt, setOnboardingCreatedAt] = useState(null);
  const [loading, setLoading] = useState(true);
  const supabase = useSupabaseClient();

  async function getOnboardingRecord() {
    setLoading(true);

    const { data, error } = await supabase
      .from("onboarding")
      .select("created_at");
    console.log(data);

    if (data.length > 0) {
      setOnboardingCreatedAt(data);
      router.push("/");
    }

    if (data.length === 0) {
      setOnboardingCreatedAt(null);
      router.push("/onboarding");
    }
  }

  useEffect(() => {
    getOnboardingRecord();
  }, []);

  return <div></div>;
}
