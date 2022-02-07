import { useLazyQuery } from '@apollo/client';
import { useSelection } from '@context/selection-context';
import React, { FC, useEffect, useState } from 'react';
import Loading from '~/src/components/Loader';
import { SELECTED_BLOCK, SELECTED_CHANNEL } from '~/src/graphql/queries';
import withChannel from '../Channel';
import { Section } from './components/Section';
import { useChannelMutation, useConnectionMutation } from './mutations';

const SelectionPanel = React.memo<FC>((): JSX.Element => {
  const { selectedConnection } = useSelection();
  const { updateConnection } = useConnectionMutation();
  const { updateChannel } = useChannelMutation();

  const [typeModalIsOpen, setTypeModalIsOpen] = useState(false);

  const [isExpanded, setIsExpanded] = useState(true);

  const handleDescriptionChange = (e, connectable) => {
    if (connectable.__typename === 'Channel') {
      updateChannel({
        variables: {
          id: connectable.id,
          description: e,
        },
      });
    } else {
      updateConnection({
        variables: {
          connectable_id: connectable.id,
          description: e,
        },
      });
    }
  };

  const query =
    selectedConnection?.__typename === 'Channel'
      ? SELECTED_CHANNEL
      : SELECTED_BLOCK;

  const [loadConnection, { called, loading, data, error }] = useLazyQuery(
    query,
    {
      fetchPolicy: 'no-cache',
      variables: {
        id: selectedConnection?.id,
      },
    },
  );

  useEffect(() => {
    if (selectedConnection?.id) {
      loadConnection();
    }
  }, []);

  if (!selectedConnection) {
    return (
      <div
        className="panel selection-panel"
        style={{
          right: '15px',
        }}
      >
        <div className="header">
          <p className="title">Selection</p>{' '}
        </div>
        <div className="contents">
          <div className="section">
            <p className="section__title">Description</p>
            <p>Nothing selected yet</p>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div
        className="selection-panel"
        style={{
          maxHeight: isExpanded ? 'unset' : '170px',
        }}
      >
        <Section.Header />
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
      className="panel selection-panel"
      style={{
        right: selectedConnection !== null ? '15px' : '-315px',
        maxHeight: isExpanded ? 'unset' : '170px',
      }}
    >
      <Section.Header />
      <div className="contents">
        <Section.Meta />
        <Section.Type
          setTypeModalIsOpen={setTypeModalIsOpen}
          typeModalIsOpen={typeModalIsOpen}
        />
        <Section.ToggleHeight
          setIsExpanded={setIsExpanded}
          isExpanded={isExpanded}
        />
        <Section.Description
          handleDescriptionChange={handleDescriptionChange}
        />
        <Section.Connections />
      </div>
    </div>
  );
});

export default withChannel()(SelectionPanel);
