import { useState, useEffect, useCallback } from "react";
import { server } from "./server";

//the shape of data will be the type of TData
// our interface acccepts, passed through
//the useQuery function
// union type: (null : before api called data will be null)

interface State<TData> {
  data: TData | null;
  loading: boolean;
  error: boolean;
}

export const useQuery = <TData = any>(query: string) => {
  const [state, setState] = useState<State<TData>>({
    data: null,
    loading: false,
    error: false
  });

  const fetch = useCallback(() => {
    const fetchApi = async () => {
      try {
        setState({ data: null, loading: true, error: false });
        const { data, errors } = await server.fetch<TData>({ query });

        if (errors && errors.length) {
          throw new Error(errors[0].message);
        }
        setState({ data, loading: false, error: false });
      } catch (error) {
        setState({
          data: null,
          loading: false,
          error: true
        });
        throw console.log(error);
      }
    };
    fetchApi();
  }, [query]);

  useEffect(() => {
    fetch();
  }, [query, fetch]); // query is being passed from elsewhere and is being used in the hook
  return { ...state, refetch: fetch };
};
