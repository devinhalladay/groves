import React, { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import DraggableBlock from "../components/DraggableBlock";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client";
import withApollo from "../lib/withApollo";
import Panel from "../components/Panel";
import Loading from "../components/Loading";
import { SelectionProvider } from "../context/selection-context";
import { ToastContainer } from "react-toastify";

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
    return (
      <Loading
        fullScreen="true"
        description="Loading landing page channel..."
      />
    );
  } else if (error) {
    console.error(error);
    return `Error: ${error}`;
  }

  return (
    <SelectionProvider>
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
          return (
            <DraggableBlock
              title={blokk.title ? blokk.title : null}
              type={blokk.__typename}
              dragStates={dragStates}
              setDragStates={setDragStates}
              key={blokk.id}
              block={blokk}
              {...props}
            />
          );
        })}
      </Layout>
    </SelectionProvider>
  );
};

export default withApollo(Root);
