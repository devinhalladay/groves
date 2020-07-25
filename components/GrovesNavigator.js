import React, { useState, useEffect } from "react";
import Downshift from "downshift";
import { useSelection } from "../context/selection-context";
import { useRouter } from "next/router";
import { useUser } from '../context/user-context'

const GrovesNavigator = ({selectedChannel, ...props}) => {
  const router = useRouter();

  const { channels, index } = useUser()

  // TODO: think about handling initial selection logic here
  // rather than in [grove].js itself. I think it would be
  // pretty nice to have all selection logic in one place,
  // and actually maybe I can create a state subscription in 
  // the SelectionProvider so subcomponents can subscribe to
  // SelectionProvider's state and re-render when selection changes.
  // This would prevent having to thread the selectedChannel
  // through to every child component that needs it.
  
  const allUserChannels = index.flatMap(channelSet => channelSet.channels.flatMap(c => c));
  const initialSelection = allUserChannels.find((item) => item.id == router.query.grove)
  
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
        router.push(`/g/[grove]`, `/g/${selection.id}`, { shallow: true });
      }}
      itemToString={(item) => (item ? item.title : "")}
      initialSelectedItem={
        initialSelection
      }
      initialInputValue={
        initialSelection.title
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
