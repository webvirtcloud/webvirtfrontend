import { useEffect } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { Spin } from 'ui/components/spin';

import { confirmEmail, useUser } from '@/entities/user';

export default function ConfirmEmail() {
  const params = useParams();
  const navigate = useNavigate();
  const { refetch, data: user } = useUser();

  if (user?.email_verified) {
    return <Navigate to="/" />;
  }

  async function confirmation(token: string) {
    try {
      await confirmEmail(token);
      toast.success('Your account confirmed', { description: 'Happy hacking' });
      await refetch();
      navigate('/');
    } catch (error) {
      toast.error('Something goes wrong', {
        description: 'Your link is wrong or it is expired',
      });
      navigate('/');
    }
  }

  useEffect(() => {
    if (params.token) {
      confirmation(params.token);
    }
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Spin size="default" />
    </div>
  );
}
