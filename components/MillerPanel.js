import { MillerColumns, Column } from './MillerColumns';
import Panel from './Panel';
import sampleTree from './sample/sampleTree';
import Model from './sample/model'
import { useState, useEffect } from 'react';
import Row from './sample/Row';

// const Row = (props) => {
//   const style = {
//     transition: 'background 200ms',
//     background: props.peekColumn && !props.transitioning
//       ? '#bae6f9'
//       : '',
//     height: '500px',
//     border: '1px solid salmon',
//     borderRadius: '5px',
//     display: 'flex',
//     fontSize: '14px',
//     flexDirection: 'column',
//     justifyContent: 'center',
//   }
//   return (
//     <div
//       onClick={props.peekColumn
//         ? props.onRemove
//         : props.onAdd}
//       style={style}>
//       Column {props.currentIndex}
//     </div>
//   );
// }

const MillerPanel = props => {
  const [tree, setTree] = useState(new Model(sampleTree))

  const onRowClick = (label) => {
    tree.FindAndSetSelected(label)
    setTree(tree)
    console.log(tree)
    setColumns(tree)
  }

  const getColumn = (localTree, index) => {
    return (
      <Column key={index}>
        <Row onRowClick={onRowClick} tree={localTree} />
      </Column>
    )
  }

  const getColumns = (localTree, columns = [], localIndex = 0) => {
    let index = localIndex || 0;
    columns.push(getColumn(tree, index));
    if (!localTree.selectedChild) return columns;
    
    return getColumns(localTree.NextNode, columns, ++localIndex);
  }

  const [columns, setColumns] = useState(getColumns(tree))
  
  return (
    <Panel pinSide="left" panelTitle={"Miller Columns"} defaultPosition={{x: 0, y: 0}} {...props}>
      <MillerColumns
        maxColumn={4}
        minColumnWidth={150}
        columnMagin={35}
        peekWidth={35}
      >
        {
          getColumns(tree)
        }
      </MillerColumns>
    </Panel>
  )
}

export default MillerPanel