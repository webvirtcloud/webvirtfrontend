import { useAtom, useAtomValue } from 'jotai';
import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import tw, { css } from 'twin.macro';

import type { Project } from '@/api/projects';
import { CheckCircle, ChevronUpDown, Logout, Settings } from '@/components/Icons';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import { useProjectStore } from '@/store/project';
import { useProjectsStore } from '@/store/projects';

const ProjectSelector = (): JSX.Element => {
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
    <div css={tw`relative min-w-[132px]`} ref={ref}>
      <div css={tw`w-full flex items-center justify-between text-left`}>
        <div css={tw`flex items-center`}>
          <div css={tw`min-w-0 overflow-hidden`}>
            <h4 css={tw`font-bold`}>{project?.name}</h4>
          </div>
        </div>

        <button
          onClick={() => toggle(!isOpen)}
          type="button"
          css={tw`h-6 px-1 hover:bg-interactive-hover transition-colors rounded-md`}
        >
          <ChevronUpDown width={16} height={16} />
        </button>
      </div>
      {isOpen && (
        <div
          css={tw`bg-base absolute z-30 top-[calc(100% + 8px)] left-0 right-0 shadow-md rounded-md p-2`}
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
                      <span css={tw`flex-shrink-0 w-5 h-5 text-green-500`}>
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

export default ProjectSelector;
