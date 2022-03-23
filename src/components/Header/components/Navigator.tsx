import { MenuItem } from '@blueprintjs/core';
import { Select, Suggest } from '@blueprintjs/select';
import { useSelection } from '@context/selection-context';
import { useUser } from '@context/user-context';
import Downshift from 'downshift';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import { GlobalHotKeys } from 'react-hotkeys';
import KeyMaps from '~/src/constants/KeyMaps';
import { Ervell } from '~/src/types';

const GrovesNavigator = ({ initialSelection }) => {
  const router = useRouter();

  const { channels, index } = useUser();
  const { selectedChannel, setSelectedChannel, channelID } = useSelection();

  const allUserChannels = index.flatMap((channelSet) =>
    channelSet.channels.flatMap((c) => c),
  );

  const [inputItems, setInputItems] =
    useState<Ervell.ChannelMetadata[]>(allUserChannels);

  const inputRef = useRef(null);

  const handleFocusInput = (e) => {
    e.preventDefault();
    inputRef.current && inputRef.current.focus();
  };

  const keyHandlers = { FOCUS_NAVIGATOR: (e) => handleFocusInput(e) };

  return (
    <div className="grove-navigation">
      <GlobalHotKeys handlers={keyHandlers} keyMap={KeyMaps} />
      <Suggest
        className="flex"
        popoverProps={{
          fill: true,
          minimal: true,
          popoverClassName: 'max-h-72 overflow-scroll',
        }}
        fill={true}
        noResults={<MenuItem disabled={true} text="No results." />}
        items={inputItems}
        itemRenderer={(item) => <MenuItem text={item.title} key={item.id} />}
        onItemSelect={(item) => {
          console.log(item);
        }}
        defaultSelectedItem={
          inputItems.filter((item) => item.id === channelID)[0]
        }
      />
      {/* <Downshift
        onInputValueChange={(inputValue) => {
          setInputItems(
            allUserChannels.filter((item) =>
              item.title
                .toLowerCase()
                .replace(/\W/g, '')
                .startsWith(inputValue.toLowerCase().replace(/\W/g, '')),
            ),
          );
        }}
        onChange={(selection) => {
          if (selection) {
            router.push(`/g/[grove]`, `/g/${selection.id}`, { shallow: true });
          }
        }}
        itemToString={(item) => (item ? item.title : '')}
        initialSelectedItem={
          typeof initialSelection !== 'undefined' && initialSelection !== null
            ? initialSelection.channel
            : null
        }
        initialInputValue={
          typeof initialSelection !== 'undefined' && initialSelection !== null
            ? initialSelection.channel.title
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
                  onFocus: () => {
                    openMenu();
                    selectInputContents();
                  },

                  ref: (e) => {
                    inputRef.current = e;
                  },
                })}
                // ref={inputRef}
                placeholder="Enter a channel title..."
              />
              <ul
                {...getMenuProps({})}
                className={`groves-dropdown panel ${isOpen ? 'open' : ''}`}
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
                            cursor: 'pointer',
                            backgroundColor:
                              highlightedIndex === index
                                ? 'lightgray'
                                : 'white',
                            fontWeight:
                              selectedItem === item ? 'bold' : 'normal',
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
      </Downshift> */}
    </div>
  );
};

export default GrovesNavigator;
