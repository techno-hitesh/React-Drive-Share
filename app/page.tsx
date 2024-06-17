import DriveCompo from "./component/driveCompo";
import PdfDownload from "./component/PdfDownload"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-20">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-2xl mt-6">React Drive File Share App</h1> {/* Adjust text size as needed */}
        <div>
          <div id="pdf-content"> 
          <DriveCompo />
          </div>
          {/* <PdfDownload /> */}
        </div>
      </div>
    </main>
  );
}
