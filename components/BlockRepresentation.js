import React from 'react'

export default function blockRepresentation(props) {
  const block = props.block;

  if (block.class === 'Image' && block.image) {
    return (
      <div className="block block--image">
        <img src={block.image.original.url} />
      </div>
    )
  } else if (block.class === 'Text') {
    return (
      <div className="block block--text">
        <p>
          {block.content}
        </p>
      </div>
    )
  } else if (block.class === 'Link' && block.source) {
    return (
      <div className="block block--link">
        <a href={block.source.url} target="_blank" rel="noopener noreferrer">
          <div className="block--link__thumbnail">
            <img src={block.image.display.url} />
            <p>{block.generated_title}</p>
          </div>
        </a>
      </div>
      )
  } else if (block.class === 'Attachment' && block.attachment) {
    return (
      <div className="block block--attachment">
        <a href={block.attachment.url} target="_blank" rel="noopener noreferrer">
          <div className="block--attachment__thumnbail">
            <img src={block.image ? block.image.display.url : ''} />
            <p>{block.generated_title}</p>
          </div>
        </a>
      </div>
      )
  } else if (block.class === 'Media' && block.embed) {
    return (
      <div className="block block--media">
        <p>
          {block.content}
        </p>
      </div>
    )
  } else if (block.class === 'Channel') {
    return (
      <div className={`block block--channel ${block.open ? 'open' : ''}`}>
        <a target="_blank" rel="noopener noreferrer" href={`http://are.na/${block.user.slug}/${block.slug}`}>
          <p>{block.title}</p>
          <p>{block.user.full_name}</p>
          <p>{block.length} blocks</p>
        </a>
      </div>
    )
  } else {
    console.error('unknown block type');
    return <p>unknown block type</p>
  }
}