// app/chat-with-bot/layout.tsx
import "../globals.css";
// import Navbar from "../components/Navbar";

export default function ChatWithBotLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* <Navbar /> */}
        <div className="bg-primary min-h-screen">{children}</div>
      </body>
    </html>
  );
}
