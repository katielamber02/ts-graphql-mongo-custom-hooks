interface Body<TVariables> {
  query: string;
  variables?: TVariables;
}

interface Error {
  message: string;
}
export const server = {
  fetch: async <TData = any, TVariables = any>(body: Body<TVariables>) => {
    const res = await fetch("http://localhost:4060/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    if (!res.ok) {
      // throw new Error("failed to fetch from server");
      // to check if server returns a status that is not successful
    }

    return res.json() as Promise<{
      data: TData;
      errors: Error[];
    }>;
  }
};
