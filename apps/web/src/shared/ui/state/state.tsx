export function State({ title, description }: { title: string; description: string }) {
  return (
    <div className="py-16 text-center">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
