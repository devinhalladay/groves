import React, { useContext, createContext, useState, useEffect } from 'react'

const SelectionContext = createContext()

const SelectionProvider = (props) => {
  const [selectedChannel, setSelectedChannel] = useState(null)

  return (
    <SelectionContext.Provider value={{selectedChannel, setSelectedChannel}} {...props} />
  )
}

const useSelection = () => useContext(SelectionContext)


export { useSelection, SelectionProvider, SelectionContext }