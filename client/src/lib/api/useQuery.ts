import { useState, useEffect } from "react";
import { server } from "./server";

//the shape of data will be the type of TData
// our interface acccepts, passed through
//the useQuery function
// union type: (null : before api called data will be null)

interface State<TData> {
  data: TData | null;
}

export const useQuery = <TData = any>(query: string) => {
  const [state, setState] = useState<State<TData>>({
    data: null
  });
  useEffect(() => {
    const fetchApi = async () => {
      const { data } = await server.fetch<TData>({ query });
      setState({ data });
    };
    fetchApi();
  }, [query]); // query is being passed from elsewhere and is being used in the hook
  return state;
};
