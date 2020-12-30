import { useMutation, useQuery } from '@apollo/client';
import { EditableText, Intent } from '@blueprintjs/core';
import parse from 'html-react-parser';
import React from 'react';
import Loading from '~/src/components/Loader';
import { useSelection } from '@context/selection-context';
import { SELECTED_BLOCK, SELECTED_CHANNEL } from '~/src/queries';
import { UPDATE_CONNECTION, UPDATE_CHANNEL } from '~/src/mutations';
import { Router } from 'next/router';

const SelectionPanel = React.memo((props) => {
  const { apollo } = props;
  const { selectedConnection, setSelectedConnection } = useSelection();

  const query = selectedConnection.__typename === 'Channel' ? SELECTED_CHANNEL : SELECTED_BLOCK;

  const [
    updateConnection,
    { loading: updatingConnection, error: errorUpdatingConnection }
  ] = useMutation(UPDATE_CONNECTION, {
    client: apollo,
    onCompleted: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    }
  });

  const [updateChannel, { loading: updatingChannel, error: errorUpdatingChannel }] = useMutation(
    UPDATE_CHANNEL,
    {
      client: apollo,
      onCompleted: (data) => {
        console.log(data);
      },
      onError: (error) => {
        console.log(error);
      }
    }
  );

  const handleTitleChange = (e, connectable) => {
    if (connectable.__typename === 'Channel') {
      updateChannel({
        variables: {
          id: connectable.id,
          title: e
        }
      });
    } else {
      updateConnection({
        variables: {
          connectable_id: connectable.id,
          title: e
        }
      });
    }
  };

  const handleDescriptionChange = (e, connectable) => {
    if (connectable.__typename === 'Channel') {
      updateChannel({
        variables: {
          id: connectable.id,
          description: e
        }
      });
    } else {
      updateConnection({
        variables: {
          connectable_id: connectable.id,
          description: e
        }
      });
    }
  };

  const { data, loading, error, networkStatus } = useQuery(query, {
    // notifyOnNetworkStatusChange: true,
    fetchPolicy: 'no-cache',
    variables: {
      id: selectedConnection.id
    }
  });

  if (loading) {
    return (
      <div className="selection-panel">
        <div className="header">
          <p className="title">Selection</p>
          <button
            className="icon-button"
            onClick={() => {
              setSelectedConnection(null);
            }}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12.6211 4.04367L4.62109 12.0437"
                stroke="#BDC3CA"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4.62109 4.04367L12.6211 12.0437"
                stroke="#BDC3CA"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
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
  return (
    <div
      className="selection-panel"
      style={{
        right: selectedConnection !== null ? '15px' : '-315px'
      }}>
      <div className="header">
        <p className="title">Selection</p>
        <button
          className="icon-button"
          onClick={() => {
            setSelectedConnection(null);
          }}>
          <svg width="17" height="17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12.6211 4.04367L4.62109 12.0437"
              stroke="#BDC3CA"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4.62109 4.04367L12.6211 12.0437"
              stroke="#BDC3CA"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      <div className="contents">
        <div
          className="section"
          style={{
            position: 'relative'
          }}>
          <p
            style={{
              marginRight: 40,
              fontSize: 18,
              width: '100%'
            }}>
            <EditableText
              onChange={(e) => handleTitleChange(e, selectedConnection)}
              fill={true}
              intent={Intent.PRIMARY}
              maxLength={45}
              placeholder="Edit title..."
              defaultValue={selectedConnection.title}
              selectAllOnFocus={true}
            />
          </p>
          <a
            style={{
              position: 'absolute',
              top: 0,
              right: 0
            }}
            href={`https://are.na${selectedConnection.href}`}
            target="_blank">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#707B8A"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </div>
        <div className="section">
          <p className="section__title">Description</p>
          <EditableText
            intent={Intent.PRIMARY}
            maxLines={24}
            minLines={2}
            className="description-field"
            onChange={(e) => handleDescriptionChange(e, selectedConnection)}
            style={{
              height: 60
            }}
            multiline={true}
            placeholder="Add a description to this block…"
            defaultValue={
              selectedConnection &&
              selectedConnection.description &&
              parse(`${selectedConnection.description}`)
            }
          />
        </div>
        <div className="section">
          <p className="meta">
            {selectedConnection &&
              `Added ${selectedConnection.created_at} by ${selectedConnection.user.name}`}
          </p>
        </div>
        <div className="section">
          <p className="section__title">Connected to</p>
          <ul>
            {selectedConnection &&
              selectedConnection.current_user_channels.map((channel) => (
                <li>
                  <a href={`${channel.href}`}>{channel.title}</a>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
});

export default SelectionPanel;
