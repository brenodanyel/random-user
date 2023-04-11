import { User } from "../Types/User";

export function useRandomUser() {
  type GetRandomUserResult = {
    results: User[];
    info: {
      seed: string;
      results: number;
      page: number;
      version: string;
    };
  };

  async function getRandomUser(): Promise<User> {
    const response = await fetch("https://randomuser.me/api");

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data: GetRandomUserResult = await response.json();

    const user = data.results?.at(0);

    if (!user) {
      throw new Error("No results found.");
    }

    return user;
  }

  return {
    getRandomUser,
  };
}
