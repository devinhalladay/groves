import withApollo from "../lib/withApollo";
import { useQuery, gql } from "@apollo/client";
import { WorkspaceProvider } from "../context/workspace-context";
import { useRouter } from "next/router";
import GrovesCanvas from "./GrovesCanvas";
import DraggableBlock from "./DraggableBlock";
import { CHANNEL_SKELETON } from '../queries'
import Loading from "./Loading";

export default withApollo(({ channel, apollo, dragStates, setDragStates, ...props }) => {
  const router = useRouter();

  const { data, loading, error } = useQuery(CHANNEL_SKELETON, {
    variables: { channelId: channel.id },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "no-cache",
    client: apollo,
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <GrovesCanvas>
      {data.channel &&
        data.channel.initial_contents.map((blokk, i) => {
          return (
            <DraggableBlock
            title={blokk.title ? blokk.title : null}
            type={blokk.__typename}
            dragStates={dragStates}
            setDragStates={setDragStates}
            key={blokk.id}
            block={blokk}
            ></DraggableBlock>
          );
        })}
    </GrovesCanvas>
  );
});
