import {
  AnchorButton,
  Button,
  EditableText,
  MenuItem,
} from '@blueprintjs/core';
import { MultiSelect } from '@blueprintjs/select';
import { useRouter } from 'next/router';
import React from 'react';
import ChevronDown from '~/public/chevron-down.svg';
import ChevronUp from '~/public/chevron-up.svg';
import { useSelection } from '~/src/context/selection-context';
import { useUser } from '~/src/context/user-context';
import withChannel from '../../Channel';
import TypeModal from '../../TypeModal';
import { useChannelMutation, useConnectionMutation } from '../mutations';
import CreateNewTag from './CreateNewTag';
import ExplainTooltip from './ExplainTooltip';
import TagOption from './TagOption';

const Section = ({ children }) => {
  return (
    <div
      className="section"
      style={{
        position: 'relative',
      }}
    >
      {children}
    </div>
  );
};

const Meta = () => {
  const { selectedConnection } = useSelection();

  const { updateChannel } = useChannelMutation();
  const { updateConnection } = useConnectionMutation();

  const handleTitleChange = (e, connectable) => {
    if (connectable.__typename === 'Channel') {
      updateChannel({
        variables: {
          id: connectable.id,
          title: e,
        },
      });
    } else {
      updateConnection({
        variables: {
          connectable_id: connectable.id,
          title: e,
        },
      });
    }
  };

  return (
    <>
      <div className="inline-wrapper">
        <EditableText
          onConfirm={(e) => handleTitleChange(e, selectedConnection)}
          intent="primary"
          maxLength={45}
          placeholder="Edit title..."
          defaultValue={selectedConnection.title}
          selectAllOnFocus={true}
        />
      </div>
      <p className="meta small">
        {selectedConnection.__typename} •{' '}
        {`${selectedConnection.created_at} by ${selectedConnection.user.name}`}
      </p>
      <div
        style={{
          display: 'flex',
          marginTop: 15,
        }}
      >
        {selectedConnection.source_url && (
          <AnchorButton
            href={selectedConnection.source_url}
            icon="link"
            style={{ marginRight: 10 }}
          >
            Source
          </AnchorButton>
        )}
        <AnchorButton
          href={`https://are.na${selectedConnection.href}`}
          icon={<img src="/open.svg" alt="" />}
          target="_blank"
        >
          Open in Are.na
        </AnchorButton>
      </div>
    </>
  );
};

const Header = () => {
  const { setSelectedConnection } = useSelection();

  return (
    <div className="header">
      <p className="title">Selection</p>
      <button
        className="icon-button"
        onClick={() => {
          setSelectedConnection(null);
        }}
      >
        <svg
          width="17"
          height="17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
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
  );
};

const Type = ({ setTypeModalIsOpen, typeModalIsOpen }) => {
  return (
    <div className="section">
      <p className="section__title">Block Type</p>
      <Button onClick={() => setTypeModalIsOpen(!typeModalIsOpen)}>
        Create a new type
      </Button>
      <TypeModal
        type={[
          {
            title: 'Authors',
            id: 1,
          },
          {
            title: 'Subjects',
            id: 2,
          },
          { title: 'Publication Year', id: 3 },
        ]}
        isOpen={typeModalIsOpen}
        setTypeModalIsOpen={setTypeModalIsOpen}
      />
    </div>
  );
};

const ToggleHeight = ({ isExpanded, setIsExpanded }) => {
  return (
    <section
      onClick={() => setIsExpanded(!isExpanded)}
      style={{
        position: 'absolute',
        bottom: '0.3rem',
        left: '0',
        right: '0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: '10',
      }}
    >
      <p
        style={{
          fontSize: '0.7rem',
          letterSpacing: '0.6px',
          color: '#86878a',
          textTransform: 'uppercase',
        }}
      >
        {isExpanded ? 'Minimize' : 'Expand'}
      </p>
      {isExpanded ? (
        <ChevronUp style={{ color: '#86878a' }} />
      ) : (
        <ChevronDown style={{ color: '#86878a' }} />
      )}
    </section>
  );
};

const Description = ({ handleDescriptionChange }) => {
  const { selectedConnection } = useSelection();

  return (
    <div className="section">
      <p className="section__title">Description</p>

      <EditableText
        intent="primary"
        maxLines={24}
        minLines={2}
        className="description-field"
        onConfirm={(e) => handleDescriptionChange(e, selectedConnection)}
        style={{
          height: 60,
        }}
        multiline={true}
        placeholder="Add a description to this block…"
        defaultValue={selectedConnection && selectedConnection.description}
      />
    </div>
  );
};

const Connections = ({ createChannel }) => {
  const { selectedConnection, setSelectedConnection } = useSelection();
  const router = useRouter();
  const { createConnection, removeConnection, updateConnection } =
    useConnectionMutation();
  const { index } = useUser();

  const filterTags = (query, tag) => {
    const text = `${tag.title}`;
    return text.toLowerCase().indexOf(query.toLowerCase()) >= 0;
  };

  const getSelectedTagIndex = (tag) => {
    return selectedConnection.current_user_channels.indexOf(tag);
  };

  const isTagSelected = (tag) => {
    return getSelectedTagIndex(tag) !== -1;
  };

  const selectTag = (tag) => {
    selectTags([tag]);
  };

  const selectTags = (tagsToSelect) => {
    const tags = selectedConnection.current_user_channels;

    let nextTags = tags.slice();

    tagsToSelect.forEach((tag) => {
      nextTags = !nextTags.includes(tag) ? [...nextTags, tag] : nextTags;

      createConnection({
        variables: {
          connectable_id: selectedConnection.id,
          connectable_type: 'BLOCK',
          channel_ids: [tag.id],
        },
      });

      let selected = selectedConnection;
      console.log(selectedConnection);
      selected.current_user_channels.push({
        title: tag.title,
      });

      setSelectedConnection(selected);
    });
  };

  const flatItems = index.flatMap((channelSet) =>
    channelSet.channels.flatMap((c) => c),
  );

  let deselectTag = (tag) => {
    let selected = selectedConnection;
    selected.current_user_channels = selected.current_user_channels.filter(
      (t) => t.id !== tag.id,
    );
    setSelectedConnection(selected);

    removeConnection({
      variables: {
        connectable_id: selectedConnection.id,
        connectable_type: 'BLOCK',
        channel_id: tag.id,
      },
    });
  };

  const handleTagSelect = async (tag) => {
    if (flatItems.filter((t) => t.title == tag.title).length > 0) {
      if (!isTagSelected(tag)) {
        selectTag(tag);
      } else {
        handleTagRemove(tag);
      }
    }
  };

  const handleTagRemove = (tag) => {
    deselectTag(tag);
  };

  const handleCreateChannel = async (title) => {
    await createChannel(
      { title: title },
      (data) => {
        let selected = selectedConnection;
        selected.current_user_channels.push({
          title: title,
        });

        setSelectedConnection(selected);
      },
      (error) => {
        console.log(error);
      },
    );
  };

  const createNewTagFromQuery = async (query) => {
    if (selectedConnection?.currentUserChannels) {
      await createChannel(
        { title: query },
        (data) => {
          console.log(data);
        },
        (error) => console.log(error),
      );

      let selected = selectedConnection;

      selected.currentUserChannels.push({
        title: query,
      });

      setSelectedConnection(selected);
    }

    return {
      title: query,
    };
  };

  return (
    <div className="section">
      <div className="section__title">Connected To</div>

      {selectedConnection.current_user_channels &&
        selectedConnection.current_user_channels
          .filter((channel) => channel.id !== parseInt(router.query.grove))
          .map((channel) => (
            <div
              key={channel.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: 5,
              }}
            >
              <span
                className="bp4-text-overflow-ellipsis"
                style={{
                  marginRight: 10,
                  flex: 1,
                }}
              >
                {channel.title}
              </span>
              <Button
                icon="cross"
                onClick={() => handleTagRemove({ id: channel.id })}
                minimal={true}
              ></Button>
            </div>
          ))}

      <MultiSelect
        className="position-relative"
        createNewItemFromQuery={createNewTagFromQuery}
        createNewItemRenderer={(query, active) => (
          <CreateNewTag
            active={active}
            query={query}
            handleCreateChannel={handleCreateChannel}
          />
        )}
        // selectedItems={tagState.tags}
        itemPredicate={filterTags}
        itemRenderer={(props) => <TagOption {...props} />}
        popoverProps={{
          minimal: true,
          style: {
            width: 300,
          },
          fill: true,
        }}
        items={flatItems}
        noResults={<MenuItem disabled={true} text="No results." />}
        onItemSelect={handleTagSelect}
        // onRemove={handleTagRemove}
        fill={true}
        tagRenderer={() => {
          return {};
        }}
        tagInputProps={{
          rightElement: (
            <div
              style={{
                display: 'flex',
                height: '100%',
                alignItems: 'center',
              }}
            >
              <ExplainTooltip />
            </div>
          ),
          leftIcon: 'add',
          tagProps: {
            minimal: true,
          },
        }}
        // selectedItems={tagState.tags}
        resetOnSelect={true}
      />
    </div>
  );
};

const SectionNamespace = Object.assign(Section, {
  Meta: Meta,
  Header: Header,
  Type: Type,
  ToggleHeight: ToggleHeight,
  Description: Description,
  Connections: withChannel()(Connections),
});

export { SectionNamespace as Section };
