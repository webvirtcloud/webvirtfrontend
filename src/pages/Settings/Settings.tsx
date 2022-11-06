import { Link } from 'react-router-dom';
import tw from 'twin.macro';

import ChangePasswordForm from './ChangePasswordForm';
import UpdateProfileForm from './UpdateProfileForm';

const Settings = (): JSX.Element => {
  return (
    <>
      <h1 css={tw`text-xl font-bold mb-8`}>Settings</h1>

      <section css={tw`space-y-8`}>
        <div css={tw`bg-white/5 grid grid-cols-5 gap-8 rounded-xl p-8`}>
          <div css={tw`col-span-2`}>
            <h2 css={tw`text-lg font-bold mb-2`}>Profile</h2>
            <p css={tw`opacity-50`}>Update information about your profile.</p>
          </div>
          <div css={tw`col-span-3`}>
            <UpdateProfileForm />
          </div>
        </div>

        <div css={tw`bg-white/5 grid grid-cols-5 gap-8 rounded-xl p-8`}>
          <div css={tw`col-span-2`}>
            <h2 css={tw`text-lg font-bold mb-2`}>Password</h2>
            <p css={tw`opacity-50`}>
              You can change your current password to new one. After submitting the form
              you will be redirected to the Sign In page.
            </p>
          </div>
          <div css={tw`col-span-3`}>
            <ChangePasswordForm />
          </div>
        </div>
      </section>
    </>
  );
};

export default Settings;
