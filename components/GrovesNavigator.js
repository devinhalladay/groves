import React, { Component, useState } from 'react'
import Downshift from "downshift";

const GrovesNavigator = props => {
  const [inputItems, setInputItems] = useState(props.channels)

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
            props.channels.filter(item =>
              item.title.toLowerCase().replace(/\W/g, '').startsWith(inputValue.toLowerCase())
            )
          )
        }}
        onChange={selection => {
          if (selection === null) {
            props.setSelectedChannel(null)
          } else {
            props.setSelectedChannel(selection)
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
                      }
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