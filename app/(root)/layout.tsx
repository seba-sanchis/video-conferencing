import StreamProvider from "@/providers/StreamProvider";

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
