import { Fragment } from "react";
import parse from "html-react-parser";

export default ({ block }) => {

  if (block.__typename === "Image") {
    return (
      <Fragment>
        <img draggable={false} src={block.image_url} />
      </Fragment>
    );
  } else if (block.__typename === "Text") {
    return (
      <Fragment>
        <p className="title">{block.title || null}</p>
        {parse(`${block.content}`)}
      </Fragment>
    );
  } else if (block.__typename === "Link") {
    return (
      <Fragment>
            <img src={block.image_url} />
      </Fragment>
    );
  } else if (block.__typename === "Attachment") {
    return (
      <Fragment>
            <img src={block.image_url ? block.image_url : ""} />
      </Fragment>
    );
  } else if (block.__typename === "Embed") {
    return (
      <Fragment>
        <p>
          TODO: EMBED
          {block.title}
        </p>
      </Fragment>
    );
  } else if (block.__typename === "Channel") {
    return (
      <Fragment>
        <a target="_blank" rel="noopener noreferrer" href={block.href}>
          <p className="title">{block.title}</p>
        </a>
      </Fragment>
    );
  } else {
    console.error("unknown block type");
    return <p>unknown block type</p>;
  }
};
