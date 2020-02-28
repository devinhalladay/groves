import React, { Component, useState } from 'react'
import Downshift from "downshift";

const GrovesNavigator = props => {
  const [inputItems, setInputItems] = useState(props.channels)
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
          console.log(selection);
          props.setSelectedChannel(selection)
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
        }) => (
          <>
            <div
              {...getRootProps({}, { suppressRefError: true })}
              className="grove-navigation"
            >
              <input 
                {...getInputProps()}
                placeholder="Enter a channel title..."
              />
              <ul 
                {...getMenuProps()}
                className={`groves-dropdown panel ${isOpen ? 'open' : ''}`}
              >
              {isOpen &&
                inputItems.map((item, index) => (
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