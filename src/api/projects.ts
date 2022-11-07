import request from './fetch';

export type Project = {
  uuid: string;
  name: string;
  is_default: boolean;
  members: string[];
};

const projects: Project[] = [
  {
    uuid: '98dfg0284ut90udgf89dfg',
    name: 'Basic',
    is_default: true,
    members: [],
  },
  {
    uuid: '9dfg9dg9d90fg0fdg9d0fg',
    name: 'Frontend',
    is_default: false,
    members: [],
  },
  {
    uuid: 'fdg8d9fg89d8fg9dfgdfg9',
    name: 'Backend',
    is_default: false,
    members: [],
  },
];

export const getProjects = (): Promise<{ projects: Project[] }> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ projects }), 500);
  });
  // return request.get('/servers').json();
};

export const getProject = (uuid: string): Promise<{ project: Project }> => {
  return new Promise((resolve) => {
    setTimeout(
      () => resolve({ project: projects.find((project) => project.uuid === uuid) }),
      500,
    );
  });
  // return request.get('/server').json();
};
