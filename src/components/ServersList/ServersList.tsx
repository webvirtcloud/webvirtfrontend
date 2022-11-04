import { parseISO } from 'date-fns';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import tw from 'twin.macro';

import type { Server } from '@/api/servers';

interface Props {
  servers: Server[];
}

const ServersList = ({ servers }: Props): JSX.Element => {
  return (
    <section>
      <h2 css={tw`text-xl font-bold mb-8`}>Servers List</h2>

      {servers ? (
        <ul css={tw`grid grid-cols-3 gap-4`}>
          {servers.map((server) => (
            <li key={server.uuid}>
              <Link
                to={`/servers/${server.uuid}`}
                css={tw`min-h-[140px] flex flex-col justify-between bg-white/5 rounded-lg hover:ring-1 hover:ring-cyan-500 border border-transparent hover:border-cyan-500 transition-all p-4`}
              >
                <div>
                  <span
                    css={tw`inline-block bg-cyan-900/30 text-cyan-500 text-xs rounded-full px-2 py-1 mb-2`}
                  >
                    {server.size.name}
                  </span>
                  <h3 css={tw`font-bold`}>{server.name}</h3>
                </div>
                <div css={tw`opacity-50`}>
                  Created {format(parseISO(server.created_at), "E, MMMM d 'at' h:m a")}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div>Loading...</div>
      )}
    </section>
  );
};

export { ServersList };
