import React, { useState } from "react";
import Downshift from "downshift";
import { useSelection } from "../context/selection-context";
import { useRouter } from "next/router";
import { useUser } from '../context/user-context'

const GrovesNavigator = (props) => {
  const router = useRouter();

  const { channels, index } = useUser()

  const allUserChannels = index.flatMap(channelSet => channelSet.channels.flatMap(c => c));

  const {
    selectedChannel,
    setSelectedChannel,
  } = useSelection();

  const [inputItems, setInputItems] = useState(allUserChannels);

  return (
    <Downshift
      onInputValueChange={(inputValue) => {
        setInputItems(
          allUserChannels.filter((item) =>
            item.title
              .toLowerCase()
              .replace(/\W/g, "")
              .startsWith(inputValue.toLowerCase().replace(/\W/g, ""))
          )
        );
      }}
      onChange={(selection) => {
        if (selection === null) {
          setSelectedChannel(null);
        } else {
          router.push(`/g/[grove]`, `/g/${selection.id}`, { shallow: true });
        }
      }}
      itemToString={(item) => (item ? item.title : "")}
      initialSelectedItem={
        selectedChannel && selectedChannel.id
          ? allUserChannels.filter((item) => item.id == selectedChannel.id)
          : null
      }
      initialInputValue={
        selectedChannel && selectedChannel.id
          ? allUserChannels.filter((item) => item.id == selectedChannel.id).title
          : null
      }
    >
      {({
        getInputProps,
        getItemProps,
        getMenuProps,
        getLabelProps,
        getRootProps,
        getToggleButtonProps,
        highlightedIndex,
        selectedItem,
        isOpen,
        clearSelection,
        openMenu,
      }) => (
        <>
          <div
            {...getRootProps({}, { suppressRefError: true })}
            className="grove-navigation"
          >
            <input
              {...getInputProps({
                onFocus: openMenu,
              })}
              placeholder="Enter a channel title..."
            />
            <ul
              {...getMenuProps()}
              className={`groves-dropdown panel ${isOpen ? "open" : ""}`}
            >
              {isOpen &&
                [...inputItems]
                  .sort((a, b) => a.title.localeCompare(b.title))
                  .map((item, index) => (
                    <li
                      key={`${item.id}${index}`}
                      {...getItemProps({
                        item,
                        index,
                        style: {
                          cursor: "pointer",
                          backgroundColor:
                            highlightedIndex === index ? "lightgray" : "white",
                          fontWeight: selectedItem === item ? "bold" : "normal",
                        },
                      })}
                    >
                      {item.title}
                    </li>
                  ))}
            </ul>
          </div>
        </>
      )}
    </Downshift>
  );
};

export default GrovesNavigator;
