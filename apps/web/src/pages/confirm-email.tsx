import { useEffect } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Spin } from 'ui/components/spin';
import { useToast } from 'ui/components/toast';

import { confirmEmail, useUser } from '@/entities/user';

export default function ConfirmEmail() {
  const params = useParams();
  const navigate = useNavigate();
  const { refetch, data: user } = useUser();
  const { toast } = useToast();

  if (user?.email_verified) {
    return <Navigate to="/" />;
  }

  async function confirmation(token: string) {
    try {
      await confirmEmail(token);
      toast({
        title: 'Your account confirmed',
        variant: 'default',
        description: 'Happy hacking',
      });
      await refetch();
      navigate('/');
    } catch (error) {
      toast({
        title: 'Something goes wrong',
        variant: 'destructive',
        description: `Your link is wrong or it's expired`,
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
