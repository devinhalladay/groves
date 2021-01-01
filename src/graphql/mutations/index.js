import { gql } from '@apollo/client';

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
      ...KonnectableModel
    }

    fragment KonnectableChannel on Channel {
      id
      title
      description
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

    fragment KonnectableModel on Model {
      created_at(relative: true)
    }

    fragment KonnectableAttachment on Attachment {
      id
      title
      href
      image_url(size: DISPLAY)
      file_extension
    }

    fragment KonnectableMetadata on Konnectable {
      # TODO - Implement Deed in graphql
      ... on ConnectableInterface {
        __typename
        current_user_channels {
          __typename
          id
          title
          href
        }
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
  `
};

// export const ADD_BLOCK = gql`
//   mutation ConnectBlock($channelId: ID!, $value: String!) {
//     create_block(
//       input: {
//         clientMutationId: "groves"
//         channel_ids: [$channelId]
//         value: $value
//         description: "Added by groves"
//       }
//     ) {
//       clientMutationId
//       ... on CreateBlockPayload {
//         blokk {
//           ... on Text {
//             content
//             id
//           }
//           ... on Image {
//             id
//             image_url
//           }
//           ... on PendingBlock {
//             remote_source_url
//             id
//           }
//         }
//       }
//     }
//   }
// `;

export const UPDATE_CHANNEL = gql`
  mutation updateChannelMutation($id: ID!, $title: String, $description: String) {
    update_channel(input: { id: $id, title: $title, description: $description }) {
      ...ChannelContentsConnectable
    }
  }
  ${grovePageFragments.channelContentsConnectable}
`;

export const UPDATE_CONNECTION = gql`
  mutation updateConnectionMutation(
    $connectable_id: ID!
    $title: String
    $description: String
    $content: String
  ) {
    update_block(
      input: { id: $connectable_id, title: $title, content: $content, description: $description }
    ) {
      ...ChannelContentsConnectable
    }
  }
  ${grovePageFragments.channelContentsConnectable}
`;

export const CREATE_CONNECTION = gql`
  mutation createConnectionMutation(
    $channel_ids: [ID]!
    $connectable_id: ID!
    $connectable_type: BaseConnectableTypeEnum!
  ) {
    create_connection(
      input: {
        channel_ids: $channel_ids
        connectable_type: $connectable_type
        connectable_id: $connectable_id
      }
    ) {
      konnectable {
        ...SelectableChannel
      }
    }
  }

  # fragment SelectableChannel on Channel {
  #   __typename
  #   id
  #   title
  #   visibility
  # }

  fragment SelectableChannel on Konnectable {
    ... on Model {
      id
    }
    ... on ConnectableInterface {
      href
    }
    ...ChannelContentsConnectable
  }

  ${grovePageFragments.channelContentsConnectable}
`;

export const REMOVE_CONNECTION = gql`
  mutation removeConnectionMutation(
    $channel_id: ID!
    $connectable_id: ID!
    $connectable_type: BaseConnectableTypeEnum!
  ) {
    remove_connection(
      input: {
        channel_id: $channel_id
        connectable_type: $connectable_type
        connectable_id: $connectable_id
      }
    ) {
      status
    }
  }
`;

export const CREATE_CHANNEL = gql`
  mutation createChannelMutation($title: String!) {
    create_channel(input: { title: $title }) {
      channel {
        title
        id
      }
    }
  }
`;
