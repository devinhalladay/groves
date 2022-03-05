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
            id
            title
            href
            content(format: HTML)
            created_at(relative: true)
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
