import { useReducer, useEffect, useCallback } from "react";
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
interface QueryResult<TData> extends State<TData> {
  refetch: () => void;
}
type Action<TData> =
  | { type: "FETCH" }
  | { type: "FETCH_SUCCESS"; payload: TData }
  | { type: "FETCH_FAILED" };

const reducer = <TData>() => (
  state: State<TData>,
  action: Action<TData>
): State<TData> => {
  switch (action.type) {
    case "FETCH":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { data: action.payload, loading: false, error: false };
    case "FETCH_FAILED":
      return { ...state, loading: false, error: true };
    default:
      throw new Error();
  }
};
export const useQuery = <TData = any>(query: string): QueryResult<TData> => {
  const fetchReducer = reducer<TData>();
  const [state, dispatch] = useReducer(fetchReducer, {
    data: null,
    loading: false,
    error: false
  });

  const fetch = useCallback(() => {
    const fetchApi = async () => {
      try {
        dispatch({ type: "FETCH" });
        const { data, errors } = await server.fetch<TData>({ query });

        if (errors && errors.length) {
          throw new Error(errors[0].message);
        }
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (error) {
        dispatch({ type: "FETCH_FAILED" });
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
