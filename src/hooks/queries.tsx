import { useQuery } from "react-query";

import { fetch } from "../helpers/queries";

/**
 * @returns {Object} useQuery object
 * @param {queryKeyPrefix}  queryKeyPrefix - unique string value
 * @param {axiosOptions} axiosOptions - axios options including url
 * @param {queryOptions} queryOptions - react-query options e.g staleTime to override default staleTime for this request.
 */
export const useAppQuery = (
  queryKeyPrefix = "",
  axiosOptions: any,
  queryOptions = {}
) => {
  const { data, error, isLoading, isFetched } = useQuery(
    [`${queryKeyPrefix}`],
    () => fetch(axiosOptions),
    {
      staleTime: 3600000,
      ...queryOptions,
    }
  );

  return { data, error, isLoading, isFetched };
};
