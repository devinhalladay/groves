import { gql } from '@apollo/client';

export const ADD_BLOCK = gql`
  mutation ConnectBlock($channelId: ID!, $value: String!) {
    create_block(
      input: {
        clientMutationId: "groves"
        channel_ids: [$channelId]
        value: $value
        description: "Added by groves"
      }
    ) {
      clientMutationId
      ... on CreateBlockPayload {
        blokk {
          ... on Text {
            content
            id
          }
          ... on Image {
            id
            image_url
          }
          ... on PendingBlock {
            remote_source_url
            id
          }
        }
      }
    }
  }
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
    ...KonnectableDisplay
  }

  fragment KonnectableDisplay on Konnectable {
    ... on Model {
      id
    }
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
      title
      user {
        id
        name
      }

      ... on Attachment {
        file_extension
      }
    }
  }
`;
