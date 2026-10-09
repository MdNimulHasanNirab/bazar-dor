export default function Loading() {
  return (
    <div className="container-main min-h-[60vh] py-10">
      <div className="mb-8 h-8 w-52 animate-pulse rounded-lg bg-gray-200" />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="loading-card" />
        ))}
      </div>
    </div>
  );
}