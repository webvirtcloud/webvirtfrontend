import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="mb-8 text-4xl font-medium">Whoops, that page is gone.</h1>
        <Link to="/">Go Home</Link>
      </div>
    </div>
  );
}

export default NotFound;
