import Tippy from "@tippyjs/react";
import { useState, useRef, useEffect } from "react";
import { useCombobox } from "downshift";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import { SEARCH_ALL_CHANNELS } from "../queries";
import { useUser } from "../context/user-context";
import { useRouter } from "next/router";
import { CREATE_CONNECTION } from "../mutations";
import { ToastContainer, toast } from "react-toastify";
import { useSelection } from "../context/selection-context";

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

export default (props) => {
  const [visible, setVisible] = useState(false);

  const { apollo } = props;

  const show = () => setVisible(true);
  const hide = () => setVisible(false);

  const router = useRouter();

  const { selectedConnection, setSelectedConnection } = useSelection();

  const inputElement = useRef(null);

  const connectedToast = (connectable) => {
    toast(`Connected to ${connectable.title}`)
  }

  const [
    connectTo,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(CREATE_CONNECTION, {
    client: apollo,
    onCompleted: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    if (inputElement.current) {
      inputElement.current.focus();
    }
  }, [inputElement.current]);

  const DropdownCombobox = () => {
    const { channels, index } = useUser();

    const allUserChannels = index.flatMap((channelSet) =>
      channelSet.channels.flatMap((c) => c)
    );

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
      getItemProps,
    } = useCombobox({
      items: inputItems,
      itemToString: (item) => (item && item.title ? item.title : ""),
      onSelectedItemChange: ({ selectedItem }) => {
        connectTo({
          variables: {
            connectable_id: selectedConnection ? selectedConnection.id : router.query.grove,
            connectable_type: selectedConnection ? "BLOCK" : "CHANNEL",
            channel_ids: [selectedItem.id],
          },
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
              .replace(/\W/g, "")
              .startsWith(inputValue.toLowerCase().replace(/\W/g, ""))
          )
        );
      },
    });

    return (
      <>
        <label {...getLabelProps()}>Grove Name</label>
        <div {...getComboboxProps()}>
          <input
            {...getInputProps({
              placeholder: "Type here...",
            })}
          />
        </div>
        <ul {...getMenuProps()}
          className="inline-combobox"
        >
          {
            inputItems.map((item, index) => (
              <li
                style={
                  highlightedIndex === index
                    ? { backgroundColor: "#bde4ff" }
                    : {}
                }
                key={`${item}${index}`}
                {...getItemProps({ item, index })}
              >
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
          <p className="title">Connect to a Grove</p>
          <div className="input--inline">
            <DropdownCombobox />
            {/* <label for="channel">Channel Name</label>
            <input type="text" name="channel" ref={inputElement} id="channel" /> */}
          </div>
        </>
      }
      visible={visible}
      onClickOutside={hide}
    >
      <button className="action" onClick={visible ? hide : show}>
        <img src="/connect-to.svg" />
      </button>
    </Tippy>
  );
};
