import React, { useContext, createContext, useState } from "react";
import { useQuery } from "@apollo/client";
import { CHANNEL_SKELETON } from "../queries";
import { useRouter } from "next/router";
import withApollo from "../lib/withApollo";
import { NetworkStatus } from "apollo-boost";

const SelectionContext = createContext();

const SelectionProvider = withApollo((props) => {
  const router = useRouter();

  const [selectedChannel, setSelectedChannel] = useState(null);

  const {
    loading,
    error,
    data: channelSkeleton,
    refetch,
    networkStatus,
  } = useQuery(CHANNEL_SKELETON, {
    variables: {
      channelId:
        selectedChannel && selectedChannel.id
          ? selectedChannel.id
          : router.query.grove
    },
    fetchPolicy: "no-cache",
    client: props.apollo,
  });

  if (networkStatus === NetworkStatus.refetch) return "Refetching!";

  if (loading) {
    return "loading";
  } else if (error) {
    console.error(error);
    return `Error: ${error}`;
  }

  let initialSelection = channelSkeleton;

  console.log(channelSkeleton);

  return (
    <SelectionContext.Provider
      value={{ selectedChannel, setSelectedChannel, initialSelection }}
      {...props}
    />
  );
});

const useSelection = () => useContext(SelectionContext);

export { useSelection, SelectionProvider, SelectionContext };
