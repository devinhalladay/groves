import React, { Fragment } from "react";
import { useSelection } from "../context/selection-context";
import parse from "html-react-parser";
import { useQuery } from "@apollo/react-hooks";
import Loading from "./Loading";
import { SELECTED_BLOCK, SELECTED_CHANNEL } from "../queries";
import { NetworkStatus } from "apollo-boost";

export default () => {
  const { selectedConnection, setSelectedConnection } = useSelection();

  const query =
    selectedConnection.__typename === "Channel"
      ? SELECTED_CHANNEL
      : SELECTED_BLOCK;

  const { data, loading, error, networkStatus } = useQuery(query, {
    // notifyOnNetworkStatusChange: true,
    fetchPolicy: "no-cache",
    variables: {
      id: selectedConnection.id,
    },
  });

  if (loading) {
    return (
      <div className="selection-panel">
        <div className="header">
          <p className="title">Selection</p>
        </div>
        <div className="contents">
          <Loading />
        </div>
      </div>
    );
  } else if (error) {
    console.log(error);
    return error;
  }

  // if (data && data.block) {
  //   console.log(data.block);
  // }

  // console.log(data);

  return (
    <div className="selection-panel">
      <div className="header">
        <p className="title">Selection</p>
      </div>
      <div className="contents">
        <p>
          <strong>{selectedConnection.title}</strong>
        </p>
        <div className="section">
          <p className="section__title">Description</p>
          <p>
            {selectedConnection &&
              selectedConnection.description &&
              parse(`${selectedConnection.description}`)}
          </p>
        </div>
      </div>
    </div>
  );
};
