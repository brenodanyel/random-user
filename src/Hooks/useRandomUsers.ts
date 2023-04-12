import { User } from "../Types/User";

export function useRandomUsers() {
  type GetRandomUsersResult = {
    results: User[];
    info: {
      seed: string;
      results: number;
      page: number;
      version: string;
    };
  };

  async function getRandomUsers(page: number, perPage: number) {
    const response = await fetch(
      `https://randomuser.me/api/?page=${page}&results=${perPage}&seed=abc`
    );

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data: GetRandomUsersResult = await response.json();

    return data.results;
  }

  return {
    getRandomUsers,
  };
}
