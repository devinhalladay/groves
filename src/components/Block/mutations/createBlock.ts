import { gql } from '@apollo/client';

export default gql`
  mutation createBlock($channelId: ID!, $value: String!) {
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
