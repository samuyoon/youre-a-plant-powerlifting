import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

export default function LoginPage() {
  const supabase = useSupabaseClient();

  return (
    <div className="items-center justify-center mx-12 h-screen">
      <Auth
        redirectTo="http://localhost:3001/loginrouting/"
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        theme="default"
        providers={["google"]}
      />
    </div>
  );
}
