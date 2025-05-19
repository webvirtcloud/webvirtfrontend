import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(auth)/confirm-email/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="text-center">
      <div className="space-y-2">
        <h1 className="text-xl font-semibold">Confirm Your Email</h1>
        <p className="text-muted-foreground">
          Please check your inbox and click the confirmation link we sent to verify your
          email address.
        </p>
      </div>
    </div>
  );
}
