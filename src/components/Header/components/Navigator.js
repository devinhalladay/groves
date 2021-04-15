import Downshift from 'downshift';
import { GlobalHotKeys, HotKeys } from 'react-hotkeys';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import { useSelection } from '@context/selection-context';
import { useUser } from '@context/user-context';
import KeyMaps from '~/src/constants/KeyMaps';

const GrovesNavigator = (props) => {
  const router = useRouter();

  const { channels, index } = useUser();
  const { selectedChannel, setSelectedChannel, initialSelection } = useSelection();

  // TODO: think about handling initial selection logic here
  // rather than in [grove].js itself. I think it would be
  // pretty nice to have all selection logic in one place,
  // and actually maybe I can create a state subscription in
  // the SelectionProvider so subcomponents can subscribe to
  // SelectionProvider's state and re-render when selection changes.
  // This would prevent having to thread the selectedChannel
  // through to every child component that needs it.

  const allUserChannels = index.flatMap((channelSet) => channelSet.channels.flatMap((c) => c));

  const [inputItems, setInputItems] = useState(allUserChannels);

  // const [isOpen, setIsOpen] = useState(false);

  const inputRef = useRef(null);

  const handleFocusInput = (e) => {
    e.preventDefault();
    inputRef.current.focus();
  };

  const keyHandlers = { FOCUS_NAVIGATOR: (e) => handleFocusInput(e) };

  return (
    <>
      <GlobalHotKeys handlers={keyHandlers} keyMap={KeyMaps} />
      <Downshift
        onInputValueChange={(inputValue) => {
          setInputItems(
            allUserChannels.filter((item) =>
              item.title
                .toLowerCase()
                .replace(/\W/g, '')
                .startsWith(inputValue.toLowerCase().replace(/\W/g, ''))
            )
          );
        }}
        onChange={(selection) => {
          if (selection) {
            router.push(`/g/[grove]`, `/g/${selection.id}`, { shallow: true });
          }
        }}
        itemToString={(item) => (item ? item.title : '')}
        initialSelectedItem={(typeof initialSelection !== 'undefined' && initialSelection !== null) ? initialSelection.channel : null}
        initialInputValue={(typeof initialSelection !== 'undefined' && initialSelection !== null) ? initialSelection.channel.title : null}>
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
          openMenu
        }) => (
          <>
            <div {...getRootProps({}, { suppressRefError: true })} className="grove-navigation">
              <input
                {...getInputProps({
                  onFocus: openMenu
                })}
                ref={inputRef}
                placeholder="Enter a channel title..."
              />
              <ul {...getMenuProps()} className={`groves-dropdown panel ${isOpen ? 'open' : ''}`}>
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
                            backgroundColor: highlightedIndex === index ? 'lightgray' : 'white',
                            fontWeight: selectedItem === item ? 'bold' : 'normal'
                          }
                        })}>
                        {item.title}
                      </li>
                    ))}
              </ul>
            </div>
          </>
        )}
      </Downshift>
    </>
  );
};

export default GrovesNavigator;
