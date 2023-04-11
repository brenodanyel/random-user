import { useState, useEffect } from "react";
import { User } from "../Types/User";
import { useRandomUser } from "../Hooks/useRandomUser";
import { UserCard } from "../Components/UserCard";
import { Loading } from "../Components/Loading";

export function Home() {
  const { getRandomUser } = useRandomUser();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  async function fetchUser() {
    try {
      setLoading(true);
      const user = await getRandomUser();
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      setUser(user);
    } catch (e: any) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="flex h-screen flex-col bg-[#F9F9F9]">
      <div className="relative h-1/3 bg-primary">
        <div className="absolute top-24 w-full">
          <div className="container mx-auto flex max-w-2xl flex-col gap-3 ">
            <div className="flex h-[400px] items-center justify-center gap-5 rounded-md bg-white p-5 shadow">
              {loading ? (
                <Loading className="w-1/2" />
              ) : (
                user && <UserCard user={user} />
              )}
            </div>
            <button
              className={`btn-primary btn ${loading ? "loading" : ""}`}
              onClick={() => fetchUser()}
            >
              {loading ? "Searching user" : "Search new user"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
