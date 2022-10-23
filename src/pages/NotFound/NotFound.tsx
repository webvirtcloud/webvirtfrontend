import { Link } from 'react-router-dom';

const Home = (): JSX.Element => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="font-bold text-2xl space-y-4">Page is not found</h1>
        <Link to="/">Go Home</Link>
      </div>
    </div>
  );
};

export default Home;