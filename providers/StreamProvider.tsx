"use client";

import { ReactNode, useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { StreamVideo, StreamVideoClient } from "@stream-io/video-react-sdk";

import { tokenProvider } from "@/lib/actions/stream.actions";
import Loader from "@/components/Loader";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

type Props = {
  children: ReactNode;
};

export default function StreamProvider({ children }: Props) {
  const { user, isLoaded } = useUser();

  const [videoClient, setVideoClient] = useState<StreamVideoClient>();

  useEffect(() => {
    if (!isLoaded || !user) return;

    if (!apiKey) throw new Error("Stream API key missing");

    const client = new StreamVideoClient({
      apiKey,
      user: {
        id: user?.id,
        name: user?.username || "guest",
        image: user?.imageUrl,
      },
      tokenProvider,
    });

    setVideoClient(client);
  }, [user, isLoaded]);

  if (!videoClient) return <Loader />;

  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
}
