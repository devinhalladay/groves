import { createContext, useState, useEffect, useContext } from 'react';

const SelectionContext = createContext();

const SelectionProvider = props => {
  const [selectedChannel, setSelectedChannel] = useState(null)

  const { children } = props

  return (
    <SelectionContext.Provider
      value={{
        selectedChannel,
        setSelectedChannel
      }}
    >
      {children}
    </SelectionContext.Provider>
  )
}

export const SelectionConsumer = SelectionContext.Consumer

export default SelectionContext

export { SelectionProvider }

export const useSelection = () => useContext(SelectionContext)