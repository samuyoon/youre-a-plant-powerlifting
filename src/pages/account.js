import { useState, useEffect } from "react";
import {
  useUser,
  useSupabaseClient,
  useSession,
} from "@supabase/auth-helpers-react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import Layout from "@/components/Layout";
import LoginPage from "@/pages/login";

export default function AccountPage() {
  const supabase = useSupabaseClient();
  // Hunch: there's something about useSession on this page that causes the logout button to not work
  const session = useSession();
  const user = useUser();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [website, setWebsite] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);

  useEffect(() => {
    getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`username, website, avatar_url`)
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({ username, website, avatar_url }) {
    try {
      setLoading(true);

      const updates = {
        id: user.id,
        username,
        website,
        avatar_url,
        updated_at: new Date().toISOString(),
      };

      let { error } = await supabase.from("profiles").upsert(updates);
      if (error) throw error;
      alert("Profile updated!");
    } catch (error) {
      alert("Error updating the data!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {!session ? (
        <LoginPage />
      ) : (
        // otherwise, go to the workoutpage
        <Layout>
          <div className="mt-16">
            <div className="grid grid-cols-2 gap-4">
              <div className="">
                <h2 className="px-4 py-2 mb-4 text-md">Email</h2>
                <h2 className="px-4 py-2 mb-4 text-md">Username</h2>
                <h2 className="px-4 py-2 mb-4 text-md">Website</h2>
              </div>
              <div>
                <input
                  id="email"
                  className="rounded-md px-4 py-2 mb-4"
                  type="text"
                  value={session.user.email}
                  disabled
                />
                <input
                  id="username"
                  className="border border-gray-300 rounded-md px-4 py-2 mb-4 text-md"
                  type="text"
                  value={username || ""}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  id="website"
                  className="border border-gray-300 rounded-md px-4 py-2 mb-4 text-md"
                  type="website"
                  value={website || ""}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-8 flex flex-col justify-center items-center">
              <div className="mb-4">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-8 rounded-md text-md shadow-md shadow-gray-300"
                  onClick={() =>
                    updateProfile({ username, website, avatar_url })
                  }
                  disabled={loading}
                >
                  Update
                </button>
              </div>
              <div className="mb-4">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-8 rounded-md text-md shadow-md shadow-gray-300"
                  onClick={() => supabase.auth.signOut()}
                >
                  Log Out
                </button>
              </div>
            </div>
          </div>
        </Layout>
      )}
    </div>
  );
}
