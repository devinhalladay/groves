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
<<<<<<< HEAD
  
=======

>>>>>>> feature/actions-connect
  return (
    <div className="selection-panel" style={{
      right: selectedConnection ? '15px' : '-315px'
    }}>
      <div className="header">
        <p className="title">Selection</p>
        <button className="icon-button" onClick={() => {
            setSelectedConnection(null)
          }}>
          <svg
            width="17"
            height="17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.6211 4.04367L4.62109 12.0437"
              stroke="#BDC3CA"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M4.62109 4.04367L12.6211 12.0437"
              stroke="#BDC3CA"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
      <div className="contents">
        <div
          className="section"
          style={{
            position: "relative",
          }}
        >
          <p
            style={{
              marginRight: 40,
            }}
          >
            <strong>{selectedConnection.title}</strong>
          </p>
          <a
            style={{
              position: "absolute",
              top: 0,
              right: 0,
            }}
            href={`https://are.na${selectedConnection.href}`}
            target="_blank"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#707B8A"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </div>
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
