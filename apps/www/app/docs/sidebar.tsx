import { type Doc } from 'contentlayer/generated';
import { SidebarNavItem } from './sidebar-nav-item';
import { toTitleCase } from '@/utils';

export function Sidebar({ navigation }: { navigation: Record<string, Doc[]> }) {
  return (
    <aside className="sticky top-32 hidden h-full w-64 shrink-0 lg:block">
      <ul className="space-y-8">
        {Object.entries(navigation).map(([category, docs]) => (
          <li key={category} className="space-y-3">
            <h5 className="font-medium">{toTitleCase(category)}</h5>
            <ul className="space-y-2 border-l dark:border-neutral-800">
              {docs.map((doc) => (
                <SidebarNavItem key={doc._id} doc={doc} />
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </aside>
  );
}
