import { useQuery } from "@tanstack/react-query";
import { githubApi } from "../../api/githubApi";
import { Issue } from "../interfaces";
import { sleep } from "../../helpers/sleep";
import { State } from "../interfaces/issue";
import { useEffect, useState } from "react";

interface Props {
  state?: State;
  labels: string[];
  page?: string | number;
}

const getIssues = async ({ page, labels, state }: Props): Promise<Issue[]> => {
  await sleep(2);
  const params = new URLSearchParams();
  if (state) params.append("state", state);
  if (labels.length > 0) {
    const labelString = labels.join(",");
    params.append("labels", labelString);
  }

  params.append("page", page!.toString());
  params.append("per_page", "5");

  const { data } = await githubApi.get<Promise<Issue[]>>("/issues", { params });
  return data;
};

export const useIssues = ({ labels, state }: Props) => {
  const [page, setPage] = useState(1);
  const issuesQuery = useQuery(["issues", { state, labels, page }], () =>
    getIssues({ page, labels, state })
  );
  useEffect(() => {
    setPage(1);
  }, [state, labels]);

  const nextPage = () => setPage(page + 1);
  const prevPage = () => {
    if (page > 1) setPage(page - 1);
  };
  return {
    issuesQuery,
    // getter
    page: issuesQuery.isFetching ? "Cargando..." : page,

    // methods
    nextPage,
    prevPage,
  };
};
