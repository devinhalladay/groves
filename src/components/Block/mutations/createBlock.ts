import { gql } from '@apollo/client';

export default gql`
  mutation createBlock($id: ID!, $value: String!) {
    create_block(
      input: {
        clientMutationId: "groves"
        channel_ids: [$id]
        value: $value
        description: "Added by groves"
      }
    ) {
      clientMutationId
      ... on CreateBlockMutationPayload {
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
