import Tippy from '@tippyjs/react';
import { useState, useRef, useEffect, forwardRef } from 'react';
import { useCombobox } from 'downshift';
import { useLazyQuery, useMutation } from '@apollo/client';
import { SEARCH_ALL_CHANNELS } from '~/src/queries';
import { useUser } from '../../../context/user-context';
import { useRouter } from 'next/router';
import { CREATE_CONNECTION } from '~/src/mutations';
import { ToastContainer, toast } from 'react-toastify';
import { useSelection } from '../../../context/selection-context';
import { Button, Colors } from '@blueprintjs/core';
import LinkGrovesIcon from '~/public/link-groves.svg';
import { useTheme } from '~/src/context/theme-provider';

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

const ConnectTo = (props) => {
  const [visible, setVisible] = useState(false);

  const { theme } = useTheme();
  const { apollo } = props;

  const show = () => setVisible(true);
  const hide = () => setVisible(false);

  const router = useRouter();

  const { selectedConnection, setSelectedConnection } = useSelection();

  const inputElement = useRef(null);

  const connectedToast = (connectable) => {
    toast(`Connected to ${connectable.title}`);
  };

  const ActionButton = forwardRef((props, ref) => (
    <Button className="action" onClick={visible ? hide : show}>
      <LinkGrovesIcon
        fill={theme === 'dark' ? Colors.WHITE : Colors.GRAY1}
        stroke={theme === 'dark' ? Colors.WHITE : Colors.GRAY1}
      />
    </Button>
  ));

  const [connectTo, { loading: mutationLoading, error: mutationError }] = useMutation(
    CREATE_CONNECTION,
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

  useEffect(() => {
    if (inputElement.current) {
      inputElement.current.focus();
    }
  }, [inputElement.current]);

  const DropdownCombobox = () => {
    const { channels, index } = useUser();

    const allUserChannels = index.flatMap((channelSet) => channelSet.channels.flatMap((c) => c));

    const [inputItems, setInputItems] = useState(allUserChannels);

    // lazy query for all public channels search
    // const [loadChannels, { called, loading, data }] = useLazyQuery(
    //   SEARCH_ALL_CHANNELS
    // );

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
      onSelectedItemChange: ({ selectedItem }) => {
        connectTo({
          variables: {
            connectable_id: selectedConnection ? selectedConnection.id : router.query.grove,
            connectable_type: selectedConnection ? 'BLOCK' : 'CHANNEL',
            channel_ids: [selectedItem.id]
          }
        });

        connectTo({
          variables: {
            connectable_id: selectedItem ? selectedItem.id : router.query.grove,
            connectable_type: 'CHANNEL',
            channel_ids: [router.query.grove]
          }
        });

        connectedToast(selectedItem);
      },
      onInputValueChange: ({ inputValue }) => {
        // This is the load channels query for searching all public are.na channels
        // loadChannels({
        //   variables: { q: inputValue, per: 10 },
        //   diplayName: "Search All Channels",
        // });
        // if (data) {
        //   let items = data.ssearch;
        //   setInputItems(
        //     // items.filter((item) => {
        //     //   item.title.toLowerCase().startsWith(inputValue.toLowerCase());
        //     // })
        //     items
        //   );
        // }

        setInputItems(
          allUserChannels.filter((item) =>
            item.title
              .toLowerCase()
              .replace(/\W/g, '')
              .startsWith(inputValue.toLowerCase().replace(/\W/g, ''))
          )
        );
      }
    });

    return (
      <>
        <label {...getLabelProps()}>Grove Name</label>
        <div {...getComboboxProps()}>
          <input
            {...getInputProps({
              placeholder: 'Type here...'
            })}
          />
        </div>
        <ul {...getMenuProps()} className="inline-combobox">
          {inputItems.map((item, index) => (
            <li
              style={highlightedIndex === index ? { backgroundColor: '#e2e6ea' } : {}}
              key={`${item}${index}`}
              {...getItemProps({ item, index })}>
              {item.title}
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
      placement="bottom-end"
      delay={100}
      content={
        <>
          <p className="title">Link with another Grove</p>
          <div className="input--inline">
            <DropdownCombobox />
            {/* <label for="channel">Channel Name</label>
            <input type="text" name="channel" ref={inputElement} id="channel" /> */}
          </div>
        </>
      }
      visible={visible}
      onClickOutside={hide}>
      <ActionButton />
    </Tippy>
  );
};

export default ConnectTo;
