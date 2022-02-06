import parse from 'html-react-parser';
import { Fragment } from 'react';

const BlockRepresentation = ({ block }) => {
  if (block.__typename === 'Image') {
    return (
      <Fragment>
        <img draggable={false} src={block.image_url} />
      </Fragment>
    );
  } else if (block.__typename === 'Text') {
    return (
      <Fragment>
        {block.title && <p className="title">{block.title}</p>}
        {parse(`${block.content}`)}
      </Fragment>
    );
  } else if (block.__typename === 'Link') {
    return (
      <Fragment>
        <img src={block.image_url} />
      </Fragment>
    );
  } else if (block.__typename === 'Attachment') {
    return (
      <Fragment>
        <img src={block.image_url ? block.image_url : ''} />
      </Fragment>
    );
  } else if (block.__typename === 'Embed') {
    return (
      <Fragment>
        <img src={block.image_url ? block.image_url : ''} />
      </Fragment>
    );
  } else if (block.__typename === 'Channel') {
    return (
      <Fragment>
        <p className="block--title">{block.title}</p>
      </Fragment>
    );
  } else {
    console.error('unknown block type');
    return <p>unknown block type</p>;
  }
};

export default BlockRepresentation;
