import withApollo from "../lib/withApollo";
import { useQuery, gql } from "@apollo/client";
import { WorkspaceProvider } from "../context/workspace-context";
import { useRouter } from "next/router";
import GrovesCanvas from "./GrovesCanvas";
import DraggableBlock from "./DraggableBlock";
import { CHANNEL_SKELETON } from "../queries";
import Loading from "./Loading";

export default withApollo(
  ({ channel, apollo, dragStates, setDragStates, parentDimensions,dismissInlineChannel, dragHandleClassName,...props }) => {
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
      <>
        <div className="header">
          <p className="title">{channel.title}</p>
          <button onClick={dismissInlineChannel}>
          <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0)">
<path d="M15.0132 10L10.0137 10L10.0137 15" stroke="#BDC3CA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M1.01367 6.00001L6.01318 6.00001L6.01318 1" stroke="#BDC3CA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0">
<rect width="16" height="16" fill="white" transform="translate(0.0136719)"/>
</clipPath>
</defs>
</svg>

          </button>
        </div>
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
                  dragHandleClassName={dragHandleClassName}
                  block={blokk}
                  {...props}
                ></DraggableBlock>
              );
            })}
        </GrovesCanvas>
      </>
    );
  }
);
