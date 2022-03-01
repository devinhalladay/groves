import { useQuery } from '@apollo/client';
import Loading from '~/src/components/Loader';
import { CHANNEL_SKELETON } from '~/src/graphql/queries';
import withApollo from '~/src/hooks/withApollo';
import { Ervell } from '~/src/types';
import Grid from '../Formations/components/Grid';

const ChannelEmbed = ({
  channel,
  apollo,
  dragStates,
  setDragStates,
  parentDimensions,
  dismissInlineChannel,
  ...props
}) => {
  const { data, loading } = useQuery<
    Ervell.ChannelContext,
    Ervell.ChannelContextVariables
  >(CHANNEL_SKELETON, {
    variables: { id: channel.id },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'no-cache',
    client: apollo,
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="header">
        <p className="title">{channel.title}</p>
        <button className="icon-button" onClick={dismissInlineChannel}>
          <svg
            width="17"
            height="16"
            viewBox="0 0 17 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0)">
              <path
                d="M15.0132 10L10.0137 10L10.0137 15"
                stroke="#BDC3CA"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M1.01367 6.00001L6.01318 6.00001L6.01318 1"
                stroke="#BDC3CA"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0">
                <rect
                  width="16"
                  height="16"
                  fill="white"
                  transform="translate(0.0136719)"
                />
              </clipPath>
            </defs>
          </svg>
        </button>
      </div>
      <div className="nested-canvas">
        {data.channel && <Grid blocks={data.channel.initial_contents} />}
      </div>
    </>
  );
};

export default withApollo(ChannelEmbed);
