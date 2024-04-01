"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import useGetCalls from "@/hooks/useGetCalls";
import { Call, CallRecording } from "@stream-io/video-react-sdk";
import MeetingCard from "./MeetingCard";
import Loader from "./Loader";

type Props = {
  type: "ended" | "upcoming" | "recordings";
};

export default function CallList({ type }: Props) {
  const router = useRouter();
  const { endedCalls, upcomingCalls, callRecordings, isLoading } =
    useGetCalls();

  const [recordings, setRecordings] = useState<CallRecording[]>([]);

  function getCalls() {
    switch (type) {
      case "ended":
        return endedCalls;
      case "recordings":
        return recordings;
      case "upcoming":
        return upcomingCalls;
      default:
        return [];
    }
  }

  function getNoCallsMessage() {
    switch (type) {
      case "ended":
        return "No previous calls.";
      case "recordings":
        return "No recordings.";
      case "upcoming":
        return "No upcoming calls.";
      default:
        return "";
    }
  }

  const calls = getCalls();
  const noCallsMessage = getNoCallsMessage();

  function handleClick(meeting: Call | CallRecording) {
    if (type === "recordings") {
      router.push(`${(meeting as CallRecording).url}`);
    } else {
      router.push(`/meeting/${(meeting as Call).id}`);
    }
  }

  if (isLoading) return <Loader />;

  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
      {calls && calls.length > 0 ? (
        calls.map((meeting: Call | CallRecording) => (
          <MeetingCard
            key={(meeting as Call).id}
            icon={
              type === "ended"
                ? "/icons/previous.svg"
                : type === "upcoming"
                ? "/icons/upcoming.svg"
                : "/icons/recordings/svg"
            }
            title={
              (meeting as Call).state.custom.description.substring(0, 26) ||
              "No description"
            }
            date={
              (meeting as Call).state.startsAt?.toLocaleString() ||
              (meeting as CallRecording).start_time.toLocaleString()
            }
            isPreviousMeeting={type === "ended"}
            buttonIcon1={type === "recordings" ? "/icons.play.svg" : undefined}
            buttonText={type === "recordings" ? "Play" : "Start"}
            handleClick={() => handleClick(meeting)}
            link={
              type === "recordings"
                ? (meeting as CallRecording).url
                : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${
                    (meeting as Call).id
                  }`
            }
          />
        ))
      ) : (
        <h1>{noCallsMessage}</h1>
      )}
    </div>
  );
}
