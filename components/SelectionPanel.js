import React, { Fragment } from "react";
import { useSelection } from "../context/selection-context";
import parse from "html-react-parser";
import { useQuery } from "@apollo/client";
import Loading from "./Loading";
import { SELECTED_BLOCK, SELECTED_CHANNEL } from "../queries";
import { NetworkStatus } from "@apollo/client";

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
          <button className="icon-button" onClick={() => {
            setSelectedConnection(null)
          }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.6211 4.04367L4.62109 12.0437" stroke="#BDC3CA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M4.62109 4.04367L12.6211 12.0437" stroke="#BDC3CA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
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
    <div className="selection-panel" style={{
      right: selectedConnection ? '15px' : '-315px'
    }}>
      <div className="header">
        <p className="title">Selection</p>
        <button className="icon-button" onClick={() => {
            setSelectedConnection(null)
          }}>
          <svg width="17" height="17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.6211 4.04367L4.62109 12.0437" stroke="#BDC3CA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M4.62109 4.04367L12.6211 12.0437" stroke="#BDC3CA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
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
