import Tippy from "@tippyjs/react";
import { useState, useRef, useEffect } from "react";
import { useCombobox } from "downshift";
import { useLazyQuery } from "@apollo/react-hooks";
import { SEARCH_ALL_CHANNELS } from "../queries";

export default () => {
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
    const [inputItems, setInputItems] = useState();

    const [loadChannels, { called, loading, data }] = useLazyQuery(
      SEARCH_ALL_CHANNELS
    );

    const {
      isOpen,
      getToggleButtonProps,
      getLabelProps,
      getMenuProps,
      getInputProps,
      getComboboxProps,
      highlightedIndex,
      getItemProps,
    } = useCombobox({
      items: inputItems,
      onInputValueChange: ({ inputValue }) => {
        setInputItems(
          items.filter((item) =>
            item.toLowerCase().startsWith(inputValue.toLowerCase())
          )
        );
      },
    });
    return (
      <div>
        <label {...getLabelProps()}>Choose an element:</label>
        <div {...getComboboxProps()}>
          <input {...getInputProps()} />
          <button
            type="button"
            {...getToggleButtonProps()}
            aria-label="toggle menu"
          >
            &#8595;
          </button>
        </div>
        <ul {...getMenuProps()}>
          {isOpen &&
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
                {item}
              </li>
            ))}
        </ul>
      </div>
    );
  }

  return (
    <Tippy
      interactive={true}
      interactiveBorder={20}
      arrow={false}
      placement="top-end"
      delay={100}
      content={
        <>
          <p className="title">Connect a channel</p>
          <div className="input--inline">
            <DropdownCombobox />
            {/* <label for="channel">Channel Name</label>
            <input type="text" name="channel" ref={inputElement} id="channel" /> */}
          </div>
          <div className="results">
            <ul>
              <li>
                <p className="channel-title">
                  <strong>Liquid</strong> Disintegration
                </p>
                <p className="meta">Devin Halladay • 23 Blocks</p>
              </li>
              <li>
                <p className="channel-title">
                  <strong>Liquid</strong>ation Chronicles
                </p>
                <p className="meta">Tanvi Sharma • 47 Blocks</p>
              </li>
            </ul>
          </div>
        </>
      }
      visible={visible}
      onClickOutside={hide}
    >
      <button className="action" onClick={visible ? hide : show}>
        <img src="/connect.svg" />
      </button>
    </Tippy>
  );
};
