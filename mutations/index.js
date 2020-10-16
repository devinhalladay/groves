import { gql } from "apollo-boost";

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
