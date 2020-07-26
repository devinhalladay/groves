import { gql } from "apollo-boost";

const CURRENT_USER = gql`
  {
    me {
      channels_index {
        channels {
          id
          title
          counts {
            contents
          }
        }
      }
      id
      slug
      name
    }
  }
`;

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
      id
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
        description
        user {
          id
          name
        }
      }
    }
  `,
  connectableMetadataPanel: gql`
    fragment ConnectableMetadataPanel on Konnectable {
      ... on Model {
        created_at(relative: true)
        updated_at(relative: true)
      }
      ... on ConnectableInterface {
        title
        description(format: HTML)
        user {
          id
          name
          href
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
      description
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

const SELECTED_CHANNEL = gql`
  query CurrentChannel($id: ID!) {
    channel(id: $id) {
      id
      title
      description
    }
  }
`;

const SELECTED_BLOCK = gql`
  query CurrentBlock($id: ID!) {
    block: blokk(id: $id) {
      ...ChannelContentsConnectable
    }
  },
  ${grovePageFragments.channelContentsConnectable}
`;

export { CHANNEL_SKELETON, CURRENT_USER, SELECTED_BLOCK, SELECTED_CHANNEL };
