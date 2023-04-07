import { useState } from "react";
import { IssueList } from "../components/IssueList";
import { LabelPicker } from "../components/LabelPicker";
import { useIssues } from "../hooks";
import { LoadingIcon } from "../../shared/components/LoadingIcon";
import { State } from "../interfaces";
import { useIssuesInfinite } from "../hooks/useIssuesInfinite";

export const ListViewInfinite = () => {
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [state, setState] = useState<State>();

  const { issuesInfinityQuery } = useIssuesInfinite({
    state,
    labels: selectedLabels,
  });

  const onLabelChange = (label: string) => {
    selectedLabels.includes(label)
      ? setSelectedLabels(
          selectedLabels.filter((labelName) => labelName !== label)
        )
      : setSelectedLabels([...selectedLabels, label]);
  };

  return (
    <div className="row mt-5">
      <div className="col-8">
        {issuesInfinityQuery.isLoading ? (
          <LoadingIcon />
        ) : (
          <IssueList
            issues={issuesInfinityQuery?.data?.pages.flat()}
            state={state}
            onStateChange={(newState) => setState(newState)}
          />
        )}
        {issuesInfinityQuery.isFetching ? (
          <span>Cargando...</span>
        ) : (
          <button
            className="btn btn-outline-primary"
            onClick={() => issuesInfinityQuery.fetchNextPage()}
            disabled={!issuesInfinityQuery.hasNextPage}
          >
            Load More...
          </button>
        )}
      </div>

      <div className="col-4">
        <LabelPicker
          selectedLabels={selectedLabels}
          onChange={(labelName) => onLabelChange(labelName)}
        />
      </div>
    </div>
  );
};
