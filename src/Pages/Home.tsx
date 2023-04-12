import { useState, useEffect } from "react";
import { User } from "../Types/User";
import { useRandomUsers } from "../Hooks/useRandomUsers";
import { UserCard } from "../Components/UserCard";
import { Loading } from "../Components/Loading";

export function Home() {
  const { getRandomUsers } = useRandomUsers();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [perPage] = useState(10);
  const [page, setPage] = useState(1);

  async function fetchUser() {
    try {
      setLoading(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
      // await new Promise((r) => setTimeout(r, 10000));
      const users = await getRandomUsers(page, perPage);
      setUsers(users);
    } catch (e: any) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  function addPage(value: number) {
    setPage((v) => Math.max(1, v + value));
  }

  useEffect(() => {
    fetchUser();
  }, [page]);

  return (
    <div className="flex flex-col" data-theme="light">
      <div className="relative h-56 bg-primary">
        <div className="absolute top-24 w-full">
          <div className="container mx-auto flex max-w-2xl flex-col items-center gap-3 p-3">
            {loading ? (
              <Loading title="Loading users..." />
            ) : (
              <>
                <div className="flex w-full flex-col gap-2">
                  {users.map((user) => (
                    <UserCard user={user} key={user.login.uuid} />
                  ))}
                </div>
                <div className="btn-group ">
                  <button className="btn" onClick={() => addPage(-1)}>
                    {`<`}
                  </button>
                  <button className={`btn-active btn`}>{page}</button>
                  <button className="btn" onClick={() => addPage(1)}>
                    {`>`}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
