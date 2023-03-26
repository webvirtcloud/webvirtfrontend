import { Link, useParams } from 'react-router-dom';

import { getVirtance } from '@/entities/virtance';
import useSWR from 'swr';

const ServerPage = (): JSX.Element => {
  const { suuid } = useParams();
  const { data: virtance } = useSWR(`/virtances/${suuid}`, () =>
    getVirtance(suuid as string).then((response) => response.virtance),
  );

  return (
    <>
      {virtance ? (
        <>
          <header>
            <Link className="mb-4 inline-block" to={`/virtances`}>
              Back to list
            </Link>
            <h1 className="mb-8 text-2xl font-medium">{virtance.name}</h1>
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
