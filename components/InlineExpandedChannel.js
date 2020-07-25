import withApollo from "../lib/withApollo";
import { useQuery, gql } from "@apollo/client";
import { WorkspaceProvider } from "../context/workspace-context";
import { useRouter } from "next/router";
import GrovesCanvas from "./GrovesCanvas";
import DraggableBlock from "./DraggableBlock";
import { Fragment } from "react";

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

export default withApollo(({ channel, apollo, dragStates, setDragStates, ...props }) => {
  const router = useRouter();

  const { data, loading, error } = useQuery(CHANNEL_SKELETON, {
    variables: { channelId: channel.id },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "no-cache",
    client: apollo,
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  console.log(data);

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
