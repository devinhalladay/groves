import { gql } from '@apollo/client';

export const GET_SKELETON = gql`
  query channelSkeleton($ids: [ID]!) {
    channels(ids: $ids) {
      title
      id
      skeleton {
        id
        type
      }
    }
  }
`;
