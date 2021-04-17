import Tippy from '@tippyjs/react';
import { useState, useRef, useEffect } from 'react';
import { useCombobox } from 'downshift';
import { useLazyQuery } from '@apollo/client';
import { SEARCH_ALL_CHANNELS } from '../../../graphql/queries';
import { Button } from '@blueprintjs/core';

const renderResult = (inputItem) => {
  return (
    <li>
      <p className="channel-title">{inputItem.title}</p>
      <p className="meta">
        {inputItem.user.name} • {inputItem.counts.contents}
      </p>
    </li>
  );
};

const StageConnections = () => {
  const [visible, setVisible] = useState(false);

  const show = () => setVisible(true);
  const hide = () => setVisible(false);

  const inputElement = useRef(null);

  useEffect(() => {
    if (inputElement.current) {
      inputElement.current.focus();
    }
  }, [inputElement.current]);

  const DropdownCombobox = () => {
    const [inputItems, setInputItems] = useState([]);

    const [loadChannels, { called, loading, data }] = useLazyQuery(SEARCH_ALL_CHANNELS);

    const {
      isOpen,
      defaultIsOpen,
      getLabelProps,
      getMenuProps,
      getInputProps,
      getComboboxProps,
      highlightedIndex,
      getItemProps
    } = useCombobox({
      items: inputItems,
      itemToString: (item) => (item && item.title ? item.title : ''),
      onInputValueChange: ({ inputValue }) => {
        loadChannels({
          variables: { q: inputValue, per: 10 },
          diplayName: 'Search All Channels'
        });

        if (data) {
          let items = data.ssearch;
          setInputItems(
            // items.filter((item) => {
            //   item.title.toLowerCase().startsWith(inputValue.toLowerCase());
            // })
            items
          );
        }
      }
    });

    return (
      <>
        <label {...getLabelProps()}>Search public channels:</label>
        <div {...getComboboxProps()}>
          <input
            {...getInputProps({
              placeholder: 'Channel title…'
            })}
          />
        </div>
        <ul {...getMenuProps()}>
          {inputItems.map((item, index) => (
            <li
              style={highlightedIndex === index ? { backgroundColor: '#bde4ff' } : {}}
              key={`${item}${index}`}
              {...getItemProps({ item, index })}>
              {item.titlea}
            </li>
          ))}
        </ul>
      </>
    );
  };

  return (
    <Tippy
      interactive={true}
      interactiveBorder={20}
      arrow={false}
      placement="top-end"
      delay={100}
      content={
        <>
          <p className="title">Connect to a channel</p>
          <div className="input--inline">
            <DropdownCombobox />
            {/* <label for="channel">Channel Name</label>
            <input type="text" name="channel" ref={inputElement} id="channel" /> */}
          </div>
        </>
      }
      visible={visible}
      onClickOutside={hide}>
      <Button className="action" minimal={true} onClick={visible ? hide : show}>
        <img src="/connect-from.svg" />
      </Button>
    </Tippy>
  );
};

export default StageConnections;
