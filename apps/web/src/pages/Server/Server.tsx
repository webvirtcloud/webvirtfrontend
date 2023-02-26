import 'twin.macro';

import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import tw from 'twin.macro';

import type { Server } from '@/api/servers';
import { getServer } from '@/api/servers';

const ServerPage = (): JSX.Element => {
  const { suuid } = useParams();
  const [server, setServer] = useState<Server>();

  const fetchServer = async () => {
    const response = await getServer(suuid as string);

    setServer(response.server);
  };

  useEffect(() => {
    fetchServer();
  });

  return (
    <>
      {server ? (
        <>
          <header>
            <Link css={tw`inline-block mb-4`} to={`/servers`}>
              Back to list
            </Link>
            <h1 css={tw`text-2xl font-bold mb-8`}>{server.name}</h1>
          </header>
          <div>content</div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default ServerPage;