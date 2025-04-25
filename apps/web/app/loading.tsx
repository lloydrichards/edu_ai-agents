export default function Loading() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="h-20 w-20 rounded-full animate-spin bg-linear-to-tr from-blue-500 via-purple-500 to-pink-500 p-1">
        <div className="rounded-full h-full w-full bg-background"></div>
      </div>
    </div>
  );
}
