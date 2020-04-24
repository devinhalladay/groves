import React, { Component, useState } from 'react'
import Downshift from "downshift";
import { useSelection } from '../context/selection-context';
import { useUser } from '../context/user-context';

const GrovesNavigator = props => {
  const { selectedChannel, setSelectedChannel } = useSelection()
  const { channels } = useUser()

  const [inputItems, setInputItems] = useState(channels)
  

  // useEffect(() => {
  //   if (parseCookies()['arena_token'] && selectedChannel.id) {
  //     Arena = new ArenaClient(parseCookies()['arena_token'])
  //     Arena.getBlocksFromChannel(selectedChannel.id, selectedChannel.length).then(blocks => {
  //       setSelectedChannel({ ...selectedChannel, contents: [...blocks] })
  //     }).then(() => {
  //       setIsReady(true);
  //     })
  //   }
  // }, [selectedChannel.id])

  return (
    <Downshift
        onInputValueChange={inputValue => {
          setInputItems(
            channels.filter(item =>
              item.title.toLowerCase().replace(/\W/g, '').startsWith(inputValue.toLowerCase())
            )
          )
        }}
        onChange={selection => {
          if (selection === null) {
            setSelectedChannel(null)
          } else {
            setSelectedChannel(selection)
          }
        }}
        itemToString={item => (item ? item.title : '')}
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
          openMenu
        }) => (
          <>
            <div
              {...getRootProps({}, { suppressRefError: true })}
              className="grove-navigation"
            >
              <input 
                {...getInputProps({
                  onFocus: openMenu
                })}
                placeholder="Enter a channel title..."
              />
              <ul 
                {...getMenuProps()}
                className={`groves-dropdown panel ${isOpen ? 'open' : ''}`}
              >
              {isOpen &&
                inputItems.sort((a, b) => a.title.localeCompare(b.title)).map((item, index) => (
                    <li
                      style={
                        highlightedIndex === index
                          ? { backgroundColor: '#bde4ff' }
                          : {}
                      }z
                      key={`${item.id}${index}`}
                      {...getItemProps({
                        item,
                        index,
                        style: {
                          backgroundColor:
                            highlightedIndex === index ? "lightgray" : "white",
                          fontWeight: selectedItem === item ? "bold" : "normal"
                        }
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
  )
}

export default GrovesNavigator