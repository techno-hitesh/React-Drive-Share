import DriveCompo from "./component/driveCompo";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-20">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-2xl mt-6">React Drive File Share App</h1> {/* Adjust text size as needed */}
        <div>
          <DriveCompo />
        </div>
      </div>
    </main>
  );
}
