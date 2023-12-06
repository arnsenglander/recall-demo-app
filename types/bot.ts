export interface CreateBotRequest {
  name: string;
  meeting_url: string;
  transcription_options?: {
    provider: 'default' | 'assembly_ai' | 'deepgram' | 'gladia' | 'rev' | 'aws_transcribe';
  }
}

export interface ListBotsResponse {
  bots: {
    count: number;
    next: string | null;
    previous: string | null;
    results: Bot[];
  }
}

export interface Bot {
  id: string;
  video_url: string;
  media_retention_end: string;
  status_changes: StatusChange[];
  meeting_metadata: MeetingMetadata;
  meeting_participants: MeetingParticipant[];
  meeting_url: RecordingUrl;
  join_at: string;
  calendar_meetings: CalendarMeeting[];
  recording: string;
  recordings: Recording[];
}

export enum TranscriptionOptions {
  Default = 'default',
  AssemblyAI = 'assembly_ai',
  DeepGram = 'deepgram',
  Gladia = 'gladia',
  Rev = 'rev',
  AWSTranscribe = 'aws_transcribe',
}

interface CalendarMeeting {
  id: string;
  start_time: string;
  end_time: string;
  calendar_user: {
    id: string;
    external_id: string;
  }
}
interface StatusChange {
  code: Code;
  message: null | string;
  created_at: string;
  sub_code: null | string;
}

interface MeetingParticipantEvent {
  code: string;
  created_at: string;
}

interface MeetingParticipant {
  id: number;
  name: string;
  events: MeetingParticipantEvent[];
  is_host: boolean;
  platform: string;
  extra_data: {
    zoom: {
      os: number;
      guest: boolean;
      user_guid: string;
      conf_user_id: string;
    };
    google_meet: any; // TODO:
  };
}

interface MeetingMetadata {
  title: string;
  zoom_meeting_uuid?: string;
}

interface Recording {
  id: string;
  started_at: string;
  completed_at: string;
}

interface RecordingUrl {
  meeting_id: string;
  meeting_password: string;
  platform: string;
}

enum Code {
  Ready = "ready",
  JoiningCall = "joining_call",
  InCallNotRecording = "in_call_not_recording",
  InCallRecording = "in_call_recording",
  CallEnded = "call_ended",
  RecordingDone = "recording_done",
  Done = "done",
  AnalysisDone = "analysis_done",
}