import request from './fetch';

export type Server = {
  uuid: string;
  name: string;
  size: {
    name: string;
    vcpu: number;
    memory: number;
    storage: number;
  };
  distribution: {
    name: string;
  };
  status: 'active' | 'inactive';
  created_at: string;
  tags: string[];
};

const servers: Server[] = [
  {
    uuid: '98dfg0284ut90udgf',
    name: 'ubuntu-18.04',
    size: {
      name: '1gb-1vpcu-32gb',
      memory: 1,
      storage: 32,
      vcpu: 1,
    },
    distribution: { name: 'Ubuntu' },
    status: 'active',
    created_at: '2022-10-06T05:44:51.334101Z',
    tags: [],
  },
  {
    uuid: '89078924y79ghf',
    name: 'ubuntu-18.04',
    size: {
      name: '1gb-1vpcu-32gb',
      memory: 1,
      storage: 32,
      vcpu: 1,
    },
    distribution: { name: 'Ubuntu' },
    status: 'inactive',
    created_at: '2022-10-06T05:44:51.334101Z',
    tags: ['ubuntu'],
  },
  {
    uuid: '9dfyg6df79gy9dfgd',
    name: 'ubuntu-18.04',
    size: {
      name: '1gb-1vpcu-32gb',
      memory: 1,
      storage: 32,
      vcpu: 1,
    },
    distribution: { name: 'Fedora' },
    status: 'active',
    created_at: '2022-10-06T05:44:51.334101Z',
    tags: [],
  },
  {
    uuid: '98dfyg9dfg8dfug9dfg',
    name: 'ubuntu-18.04',
    size: {
      name: '1gb-1vpcu-32gb',
      memory: 1,
      storage: 32,
      vcpu: 1,
    },
    distribution: { name: 'Fedora' },
    status: 'active',
    created_at: '2022-10-06T05:44:51.334101Z',
    tags: ['ubuntu'],
  },
  {
    uuid: '0d8fugdf809gudf0g8',
    name: 'ubuntu-18.04',
    size: {
      name: '1gb-1vpcu-32gb',
      memory: 1,
      storage: 32,
      vcpu: 1,
    },
    distribution: { name: 'Ubuntu' },
    status: 'inactive',
    created_at: '2022-10-06T05:44:51.334101Z',
    tags: [],
  },
];

export const getServers = (): Promise<{ servers: Server[] }> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ servers }), 500);
  });
  // return request.get('/servers').json();
};

export const getServer = (uuid: string): Promise<{ server: Server }> => {
  return new Promise((resolve) => {
    setTimeout(
      () => resolve({ server: servers.find((server) => server.uuid === uuid) }),
      500,
    );
  });
  // return request.get('/server').json();
};
