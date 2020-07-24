import React, { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import DraggableBlock from "../../components/DraggableBlock";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import withApollo from "../../lib/withApollo";
import Panel from "../../components/Panel";

const GET_LANDING_BLOCKS = gql`
  {
    channel(id: 670488) {
      blokks {
        ... on Image {
          id
          image_url
          description
        }

        ... on Text {
          id
          title
          content(format: HTML)
          description
        }
      }
    }
  }
`;

const Root = (props) => {
  const router = useRouter();
  const { loading, error, data } = useQuery(GET_LANDING_BLOCKS);
  const [dragStates, setDragStates] = useState({
    maxZIndex: 1000,
  });
  const [isDragging, setIsDragging] = useState(false);

  if (loading) {
    return "loading";
  } else if (error) {
    console.error(error);
    return `Error: ${error}`;
  }

  return (
    <Layout>
      <Panel
        style={{
          width: "350px",
        }}
        canCollapse={false}
        className={"newsletter-panel"}
        defaultPosition={{ x: 25, y: 520 }}
        panelTitle={"Subscribe to updates"}
        {...props}
      >
        <p>
          Get very occasional updates on development, beta testing, and launch
          dates.
        </p>
        <form
          action="https://network.us18.list-manage.com/subscribe/post?u=488634612d3795996b128e2ba&amp;id=d3ad9e4e39"
          method="post"
        >
          <label htmlFor="EMAIL">Email address</label>
          <input name="EMAIL" type="email" placeholder="dev@groves.network" />
          <input type="submit" value="Submit" />
        </form>
      </Panel>
      {data.channel.blokks.map((blokk, i) => {
        const description = JSON.parse(blokk.description.replace("\n", ""));
        return (
          <DraggableBlock
            title={blokk.title ? blokk.title : null}
            type={blokk.image_url ? "image" : "text"}
            positionOffset={{ x: description.x, y: description.y }}
            block={blokk}
            dragStates={dragStates}
            setDragStates={setDragStates}
            key={blokk.id}
            ref={(ref) => {
              refsArray[i] = ref;
            }}
            onDrag={() => {
              setIsDragging(true);
            }}
            onStop={() => {
              setIsDragging(false);
            }}
          />
        );
      })}
    </Layout>
  );
};

export default withApollo(Root);
