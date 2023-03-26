export function State({ title, description }) {
  return (
    <div className="py-32 text-center">
      <h2 className="text-lg font-medium">{title}</h2>
      <p className="text-gray-500">{description}</p>
    </div>
  );
}
