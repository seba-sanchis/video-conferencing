import { Metadata } from "next";
import StreamProvider from "@/providers/StreamProvider";

export const metadata: Metadata = {
  title: "Video Conferencing",
  description: "Video calling app.",
  icons: {
    icon: "/icons/logo.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <StreamProvider>{children}</StreamProvider>
    </main>
  );
}
