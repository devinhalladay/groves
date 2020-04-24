import MillerColumns from './MillerColumn';
import Column from './Column';

import { useState } from 'react';
import Model from './model'
import Row from './Row'

import sampleTree from './sampleTree'

export default () => {
  const [tree, setTree] = useState(new Model(sampleTree))

  const onRowClick = (label) => {
    tree.FindAndSetSelected(label);
    setTree(tree)
  }

  const getColumn = (tree, index) => {
    return (
      <Column key={index}>
        <Row onRowClick={onRowClick} tree={tree} />
      </Column>
    )
  }

  const getColumns = (tree, columns = [], localIndex = 0) => {
    let index = localIndex || 0;
    columns.push(getColumn(tree, index));
    if (!tree.selectedChild) return columns;
    return getColumns(tree.NextNode, columns, ++localIndex);
  }

  return (
    <div style={{ marginTop: '50px' }} className="App">
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
    </div>
  );
}