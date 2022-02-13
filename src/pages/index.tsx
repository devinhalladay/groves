import { useSession } from 'next-auth/react';
import { gql, useQuery } from '@apollo/client';
import GrovesCanvas from '~/src/components/Canvas';
import { useSelection } from '@context/selection-context';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import React, { useEffect } from 'react';
import Loading from '~/src/components/Loader';
import Panel from '~/src/components/Panel';
import withApollo from '~/src/hooks/withApollo';

const GET_LANDING_BLOCKS = gql`
  {
    channel(id: 670488) {
      blokks {
        ... on Image {
          id
          image_url
          description
        }

        ... on Text {
          id
          title
          content(format: HTML)
          description
        }
      }
    }
  }
`;

const Root = (props) => {
  const { loading, error, data } = useQuery(GET_LANDING_BLOCKS);

  const { setCanvasBlocks } = useSelection();

  const { data: session } = useSession();
  // const { accessToken } = session;

  useEffect(() => {
    data && setCanvasBlocks(data.channel.blokks);
  }, [data]);

  console.log('test');

  if (loading) {
    return <Loading fullScreen={true} description="Loading your Grove :)" />;
  } else if (error) {
    console.error(error);
    return `Error: ${error}`;
  }

  return (
    <>
      <GrovesCanvas {...props} />
      <Panel
        pinSide="none"
        style={{
          width: '350px',
          position: 'absolute',
          bottom: 15,
          right: 15,
        }}
        canCollapse={false}
        className={'newsletter-panel'}
        panelTitle={'Subscribe to updates'}
        {...props}
      >
        <p>
          Get very occasional updates on development, beta testing, and launch
          dates.
        </p>
        <form
          action="https://network.us18.list-manage.com/subscribe/post?u=488634612d3795996b128e2ba&amp;id=d3ad9e4e39"
          method="post"
        >
          <label htmlFor="EMAIL">Email address</label>
          <input
            name="EMAIL"
            type="email"
            placeholder="dev@groves.network"
            style={{
              width: '100%',
            }}
          />
          <input
            type="submit"
            value="Submit"
            style={{
              width: '100%',
            }}
          />
        </form>
      </Panel>
    </>
  );
};

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   if (parseCookies(context)['access_token']) {
//     context.res.writeHead(301, { Location: '/g' });
//     context.res.end();
//   }

//   return {
//     props: {},
//   };
// };

export default withApollo(Root);
