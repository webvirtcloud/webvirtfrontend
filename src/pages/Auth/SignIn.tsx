import Button from 'components/Button';
import Input from 'components/Input';
import { useState } from 'react';

const SignIn = (): JSX.Element => {
  const [form] = useState({
    email: '',
    password: '',
  });

  const onSubmit = () => {};
  
  return (
    <form onSubmit={onSubmit}>
      <Input 
        id="email" 
        label="Email" 
        type="email" 
        required={true}
        placeholder="personal@email.com" 
        value={form.email}
        onChange={(e) => form.email = e.currentTarget.value }
      />
      <Input 
        id="password" 
        label="Password" 
        type="password" 
        required={true}
        placeholder="*****" 
        value={form.password}
        onChange={(e) => form.password = e.currentTarget.value }
      />
      <Button>Submit</Button>
    </form>
  );
};

export default SignIn;