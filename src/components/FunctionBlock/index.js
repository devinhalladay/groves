// A function block is a block containiner special logic
// that accepts one or more channels as an input, and one channel
// as an output. This operates essentially as a filter on the blocks
// of one or more channels, outputting the filter result into a new channel.
// Requirements:
// Function blocks must be asynchronous and frequently refetch their inputs
// and update their outputs.
// Function blocks must be agnostic to the Groves backend. They must operate
// using API endpoints provided by Are.na
// Function blocks must look different from normal blocks.
// Function blocks must be able to be represented as a regular block on Are.na
// Function blocks must represent their operations visually.

import { Card } from '@blueprintjs/core';

const filterInput = (input) => {};

const combineInputs = (inputs) => {};

const syncOutput = (output) => {};

const FunctionBlock = (inputs, output, ...props) => {
  return (
    <Card className="draggable-block-container">
      <div className="block block--channel">
        <div class="status-indicator"></div>
      </div>
    </Card>
  );
};

export default FunctionBlock;
