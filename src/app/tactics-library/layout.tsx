
import "../globals.css";

export default function TacticsLibraryLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="bg-primary min-h-screen">{children}</div>
      </body>
    </html>
  );
}
