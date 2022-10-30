import tw, { css } from 'twin.macro';

const bg = css`
  background-color: var(--color-bg-sidebar);
`;

const Sidebar = (): JSX.Element => {
  return <aside css={[bg, tw`w-56 p-8`]}>sidebar</aside>;
};

export default Sidebar;
