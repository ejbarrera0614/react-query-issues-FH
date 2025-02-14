import { FC } from "react";
import { IssueItem } from "./IssueItem";
import { Issue, State } from "../interfaces";
interface Props {
  issues?: Issue[];
  state?: State;

  onStateChange: (state?: State) => void;
}
export const IssueList: FC<Props> = ({ issues, state, onStateChange }) => {
  return (
    <div className="card border-white">
      <div className="card-header bg-dark">
        <ul className="nav nav-pills card-header-pills">
          <li className="nav-item">
            <a
              className={`nav-link ${!state ? "active" : ""}`}
              onClick={() => onStateChange()}
            >
              All
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${state === State.Open ? "active" : ""}`}
              onClick={() => onStateChange(State.Open)}
            >
              Open
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${state === State.Close ? "active" : ""}`}
              onClick={() => onStateChange(State.Close)}
            >
              Close
            </a>
          </li>
        </ul>
      </div>
      <div className="card-body text-dark">
        {issues?.map((issue) => (
          <IssueItem key={issue.id} issue={issue} />
        ))}
      </div>
    </div>
  );
};

import * as React from "react";

export interface IAppProps {
  name: string;
}

export function App() {
  return <div></div>;
}
