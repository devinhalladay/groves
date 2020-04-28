import React, { Component, useState } from 'react'
import Downshift from "downshift";
import { useSelection } from '../context/selection-context';
import { useUser } from '../context/user-context';

const GrovesNavigator = props => {
  const { selectedChannel, setSelectedChannel } = useSelection()
  const { user, channels } = useUser()

  const [inputItems, setInputItems] = useState(channels)
  
  return (
    <Downshift
        onInputValueChange={inputValue => {
          setInputItems(
            channels.filter(item =>
              item.title.toLowerCase().replace(/\W/g, '').startsWith(inputValue.toLowerCase().replace(/\W/g, ''))
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
                [...inputItems].sort((a, b) => a.title.localeCompare(b.title)).map((item, index) => (
                    <li
                      key={`${item.id}${index}`}
                      {...getItemProps({
                        item,
                        index,
                        style: {
                          cursor: 'pointer',
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