import React, { useContext, createContext, useState } from "react";
import { useQuery } from "@apollo/client";
import { CHANNEL_SKELETON } from "../queries";
import { useRouter } from "next/router";
import withApollo from "../lib/withApollo";
import { NetworkStatus } from "apollo-boost";
import Loading from "../components/Loading";

const SelectionContext = createContext();

const SelectionProvider = withApollo((props) => {
  const router = useRouter();

  const [selectedChannel, setSelectedChannel] = useState(null);

  const getChannelID = () => {
    if (selectedChannel && selectedChannel.id) {
      return selectedChannel.id
    } else if (router.query.grove) {
      return router.query.grove
    } else {
      return '757665'
    }      
  }

  const {
    loading,
    error,
    data: channelSkeleton,
    refetch,
    networkStatus,
  } = useQuery(CHANNEL_SKELETON, {
    variables: {
      channelId: getChannelID()
    },
    fetchPolicy: "no-cache",
    client: props.apollo,
  });

  if (networkStatus === NetworkStatus.refetch) return "Refetching!";

  if (loading) {
    return <Loading description={"Loading your Grove :)"} />
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
