import { Link } from '@tanstack/react-router';

export function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="mb-8 text-4xl font-medium">Whoops, that page is gone.</h1>
        <Link className="text-highlight font-medium" to="/">
          Go Home
        </Link>
      </div>
    </div>
  );
}
