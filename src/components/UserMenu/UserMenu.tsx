import { useAtom, useAtomValue } from 'jotai';
import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import tw, { css } from 'twin.macro';

import type { Profile } from '@/api/account';
import type { Project } from '@/api/projects';
import { CheckCircle, ChevronUpDown, Logout, Settings } from '@/components/Icons';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import { useProjectStore } from '@/store/project';
import { useProjectsStore } from '@/store/projects';

const UserMenu = ({ profile }: { profile: Profile }): JSX.Element => {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, toggle] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const projects = useAtomValue(useProjectsStore);
  const [project, setProject] = useAtom(useProjectStore);

  const handleLogout = () => {
    window.localStorage.removeItem('token');

    navigate('/sign-in');
  };

  const handleProjectSelect = (project: Project) => {
    setProject(project);
    navigate(`/projects/${project.uuid}`);
  };

  useEffect(() => {
    if (isOpen) {
      toggle(false);
    }
  }, [location]);

  useOnClickOutside(ref, () => toggle(false));

  return (
    <div css={tw`relative`} ref={ref}>
      <button
        onClick={() => toggle(!isOpen)}
        type="button"
        css={tw`w-full flex items-center justify-between text-left bg-alt hover:bg-interactive-hover transition-colors rounded-md p-2`}
      >
        <div css={tw`flex items-center space-x-2`}>
          <figure
            css={[
              tw`flex-shrink-0 flex items-center justify-center font-bold w-8 h-8 bg-white/20 rounded-md`,
              css({ backgroundColor: project?.color_hex }),
            ]}
          >
            {project?.name[0].toUpperCase()}
          </figure>
          <div css={tw`min-w-0 overflow-hidden`}>
            <h4 css={tw`font-bold`}>{project?.name}</h4>
            <p css={tw`truncate text-alt2 text-xs`}>Workspace</p>
          </div>
        </div>

        <ChevronUpDown />
      </button>
      {isOpen && (
        <div
          css={tw`bg-alt absolute bottom-[calc(100% + 8px)] left-0 right-0 rounded-md p-2`}
        >
          <ul>
            {projects &&
              projects.map((item) => (
                <li key={item.uuid}>
                  <button
                    onClick={() => handleProjectSelect(item)}
                    css={tw`flex items-center justify-between w-full text-left p-2 hover:bg-interactive-hover rounded space-x-2`}
                  >
                    <span css={tw`flex flex-1 space-x-2`}>
                      <span
                        css={[
                          css({ backgroundColor: item.color_hex }),
                          tw`flex-shrink-0 w-5 h-5 rounded`,
                        ]}
                      ></span>
                      <span>{item.name}</span>
                    </span>
                    {project?.uuid === item.uuid && (
                      <span css={tw`w-5 h-5 text-green-500`}>
                        <CheckCircle />
                      </span>
                    )}
                  </button>
                </li>
              ))}
          </ul>
          <ul>
            <li css={tw`border-b border-black/30 my-1`}></li>
            <li>
              <Link
                css={tw`flex items-center w-full text-left p-2 hover:bg-interactive-hover rounded space-x-2`}
                to="/settings"
              >
                <Settings />
                <span css={tw`font-bold`}>Settings</span>
              </Link>
            </li>
            <li>
              <button
                css={tw`flex items-center w-full text-left p-2 hover:bg-interactive-hover rounded space-x-2`}
                type="button"
                onClick={() => handleLogout()}
              >
                <Logout />
                <span css={tw`font-bold`}>Logout</span>
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
