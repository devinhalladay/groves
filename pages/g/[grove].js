import { useRouter } from "next/router";
import {
  useSelection,
  SelectionContext,
} from "../../context/selection-context";
import GrovesCanvas from "../../components/GrovesCanvas";
import { parseCookies } from "nookies";
import Layout from "../../components/Layout";
import { useEffect, useState } from "react";
import withApollo from "../../lib/withApollo";
import { gql, NetworkStatus } from "apollo-boost";
import { useLazyQuery, useQuery } from "@apollo/react-hooks";
import DraggableBlock from "../../components/DraggableBlock";
import { WorkspaceProvider } from "../../context/workspace-context";

const grovePageFragments = {
  channelContentsConnectable: gql`
    fragment ChannelContentsConnectable on Konnectable {
      ...KonnectableDisplay
    }

    fragment KonnectableDisplay on Konnectable {
      ...KonnectableChannel
      ...KonnectableText
      ...KonnectableImage
      ...KonnectableLink
      ...KonnectableEmbed
      ...KonnectableAttachment
      ...KonnectableMetadata
    }

    fragment KonnectableChannel on Channel {
      id
      title
      href
    }

    fragment KonnectableText on Text {
      id
      title
      href
      content(format: HTML)
    }

    fragment KonnectableImage on Image {
      id
      title
      href
      image_url(size: DISPLAY)
    }

    fragment KonnectableLink on Link {
      href
      title
      image_url(size: DISPLAY)
      source_url
    }

    fragment KonnectableEmbed on Embed {
      id
      title
      href
      image_url(size: DISPLAY)
    }

    fragment KonnectableAttachment on Attachment {
      id
      title
      href
      image_url(size: DISPLAY)
      file_extension
    }

    fragment KonnectableMetadata on Konnectable {
      ... on ConnectableInterface {
        __typename
        user {
          id
          name
        }
      }
    }
  `,
};

// const GET_SELECTED_CHANNEL = gql`
//   query ($channelId: ID!) {
//     channel (id: $channelId) {
//       id
//       title
//       blokks (type: IMAGE) {
//         ... on Image {
//           id
//           title
//           image_url
//         }
//       }
//     }
//   }
// `

const CHANNEL_SKELETON = gql`
  query ChannelSkeleton($channelId: ID!) {
    channel(id: $channelId) {
      id
      title
      initial_contents: blokks(
        page: 1
        per: 10
        sort_by: POSITION
        direction: DESC
      ) {
        ...ChannelContentsConnectable
      }
      skeleton {
        id
        type
      }
    }
  }
  ${grovePageFragments.channelContentsConnectable}
`;

const Grove = (props) => {
  const router = useRouter();

  const [dragStates, setDragStates] = useState({
    maxZIndex: 1000,
  });
  const [isDragging, setIsDragging] = useState(false);

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
          <GrovesCanvas>
            {data.channel.initial_contents.map((blokk, i) => {
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
