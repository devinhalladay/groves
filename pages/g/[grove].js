import { useRouter } from "next/router";
import { useSelection } from "../../context/selection-context";
import GrovesCanvas from "../../components/GrovesCanvas";
import { parseCookies } from "nookies";
import Layout from "../../components/Layout";
import { useState, Fragment } from "react";
import withApollo from "../../lib/withApollo";
import { gql, NetworkStatus } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import DraggableBlock from "../../components/DraggableBlock";
import { WorkspaceProvider } from "../../context/workspace-context";
import { CHANNEL_SKELETON } from '../../queries'

const Grove = (props) => {
  const router = useRouter();

  const [dragStates, setDragStates] = useState({
    maxZIndex: 1000,
  });

  const { selectedChannel, setSelectedChannel } = useSelection();

  const { loading, error, data, refetch, networkStatus } = useQuery(
    CHANNEL_SKELETON,
    {
      variables: { channelId: router.query.grove },
      notifyOnNetworkStatusChange: true,
      fetchPolicy: "no-cache",
    }
  );

  if (networkStatus === NetworkStatus.refetch) return "Refetching!";

  if (loading) {
    return "loading";
  } else if (error) {
    console.error(error);
    return `Error: ${error}`;
  }

  if (data && data.channel) {
    setSelectedChannel(data.channel);
  }

  return (
    <WorkspaceProvider>
      <Layout {...props}>
        {selectedChannel && (
          <GrovesCanvas {...props}>
            {data.channel.initial_contents.map((blokk, i) => {
              return (
                <>
                  <DraggableBlock
                    title={blokk.title ? blokk.title : null}
                    type={blokk.__typename}
                    dragStates={dragStates}
                    setDragStates={setDragStates}
                    key={blokk.id}
                    block={blokk}
                    {...props}
                  />
                </>
              );
            })}
          </GrovesCanvas>
        )}
      </Layout>
    </WorkspaceProvider>
  );
};

export async function getServerSideProps(context) {
  if (!parseCookies(context)["access_token"]) {
    context.res.writeHead(301, { Location: "/" });
    context.res.end();
  }

  return {
    props: {},
  };
}

export default withApollo(Grove);
