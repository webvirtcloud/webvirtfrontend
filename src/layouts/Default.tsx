import { useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import tw from 'twin.macro';

import { getProfile } from '@/api/account';
import { getProjects } from '@/api/projects';
import Sidebar from '@/components/Sidebar';
import { useProfileStore } from '@/store/profile';
import { useProjectStore } from '@/store/project';
import { useProjectsStore } from '@/store/projects';

const DefaultLayout = (): JSX.Element => {
  const setProfile = useSetAtom(useProfileStore);
  const setProjects = useSetAtom(useProjectsStore);
  const setProject = useSetAtom(useProjectStore);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isAuthenticated = !!window.localStorage.getItem('token');

  // if (
  //   pathname === '/sign-in' ||
  //   pathname === '/sign-up' ||
  //   pathname === '/reset-password'
  // ) {
  //   return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
  // }

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }

  const fetch = async () => {
    const response = await getProfile();

    const { projects } = await getProjects();

    const project = projects.find((item) => item.is_default);

    setProjects(projects);
    setProject(project);
    setProfile(response.profile);

    pathname === '/' && navigate({ pathname: `/projects/${project?.uuid}/servers` });
  };

  useEffect(() => {
    isAuthenticated && fetch().catch(console.error);
  }, []);

  useEffect(() => {
    if (pathname === '/') {
      fetch().catch(console.error);
    }
  }, [pathname]);

  return isAuthenticated ? (
    <main css={tw`min-h-screen flex`}>
      <Sidebar />
      <div css={tw`flex-1 p-8 pl-64`}>
        <Outlet />
      </div>
    </main>
  ) : (
    <Navigate to="/sign-in" replace />
  );
};

export default DefaultLayout;
