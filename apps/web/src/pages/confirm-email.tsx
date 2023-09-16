import { confirmEmail, useUser } from '@/entities/user';
import { useEffect } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useToast } from 'ui/components/toast';
import { Spin } from 'ui/components/spin';

export default function ConfirmEmail() {
  const params = useParams();
  const navigate = useNavigate();
  const { mutate, data: user } = useUser();
  const { toast } = useToast();

  if (user?.email_verified) {
    return <Navigate to={'/'} />;
  }

  async function confirmation(token: string) {
    try {
      await confirmEmail(token);
      toast({
        title: 'Your account confirmed',
        variant: 'default',
        description: 'Happy hacking',
      });
      await mutate();
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
