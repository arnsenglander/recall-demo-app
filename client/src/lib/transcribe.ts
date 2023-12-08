import { RawTranscriptionData, SpeakerData, Word } from "../../../types";

export class Transcriber {
  static transcribe(data: RawTranscriptionData): Transcription {
    const transcription = new Transcription();
    for (const speakerData of data) {
      transcription.addSpeakerData(speakerData);
    }

    return transcription;
  }
}

export class Transcription {
  // The minimum time between words to consider a new segment.
  // Segments can be broken up as separate thoughts, and thus
  // this threshold can be thought of as a pause between thoughts.
  //
  // This is in seconds.
  private readonly segmentThreshold = 5;
  private segments: TranscriptionSegment[];

  constructor(segments: TranscriptionSegment[] = []) {
    this.segments = segments;
  }

  get getSegments(): TranscriptionSegment[] {
    return this.segments;
  }

  addSpeakerData(data: SpeakerData) {
    // Speaker data represents a sequence of words spoken by a single speaker.
    // We want to split this into segments, where the time between words is
    // greater than some threshold.

    let segment = new TranscriptionSegment(
      data.speaker,
      data.language || "english",
    );

    for (let i = 0; i < data.words.length; i++) {
      const word = data.words[i];
      segment.addWord(word);

      const nextWord = data.words[i + 1];

      // If there is no next word, then we have reached the end of the data.
      // Add the segment and return.
      if (!nextWord) {
        this.addSegment(segment);
        return;
      }

      // If the time between the current word and the next word is greater than
      // the threshold, then we have reached the end of a segment.
      // Add the current segment and start a new one.
      const timeBetweenWords = nextWord.start_timestamp - word.end_timestamp;
      if (timeBetweenWords > this.segmentThreshold) {
        this.addSegment(segment);
        segment = new TranscriptionSegment(
          data.speaker,
          data.language || "english",
        );
      }
    }
  }

  addSegment(segment: TranscriptionSegment) {
    this.segments.push(segment);
  }

  /**
   * The total duration of the transcription, in seconds.
   */
  duration(): number {
    // Just get the last timestamp of the last word in the last segment.
    // This is the total duration of the transcription.
    if (this.segments.length === 0) {
      return 0;
    }

    const lastSegment = this.segments[this.segments.length - 1];
    return lastSegment.end();
  }

  /**
   * The total duration of the transcription as a formatted string,
   * in the format `M`m `SS`s.
   */
  durationFormatted(): string {
    const minutes = Math.floor(this.duration() / 60);
    const seconds = Math.floor(this.duration() % 60);
    return `${minutes}m ${seconds}s`;
  }
}

export class TranscriptionSegment {
  private data: SpeakerData;

  constructor(speaker: string, language: string, words?: Word[]) {
    this.data = {
      speaker,
      language,
      words: words || [],
    };
  }

  speaker(): string {
    return this.data.speaker;
  }

  addWord(word: Word) {
    this.data.words.push(word);
  }

  /**
   * The start time of the first word in the segment, in the
   * form MM:SS.
   */
  startFormatted(): string {
    return formatTime(this.start());
  }

  /**
   * The start time of the first word in the segment, in seconds.
   */
  start(): number {
    return this.data.words[0].start_timestamp;
  }

  /**
   * The end time of the last word in the segment, in seconds.
   */
  end(): number {
    return this.data.words[this.data.words.length - 1].end_timestamp;
  }

  /**
   * The duration of the segment, in seconds.
   */
  duration(): number {
    return this.end() - this.start();
  }

  /**
   * The full transcript of this segment, as a string.
   */
  asString(): string {
    const chronologicalWords = this.data.words.sort((a, b) => {
      return a.start_timestamp - b.start_timestamp;
    });

    let segmentString = "";
    chronologicalWords.forEach((word) => {
      segmentString += `${word.text} `;
    });

    return segmentString;
  }
}

/**
 * Format a time as a string in the form: MM:SS
 * @param time The time in seconds.
 * @returns A formatted time string.
 */
function formatTime(time: number): string {
  const minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);

  if (seconds < 10) {
    return `${minutes}:0${seconds}`;
  }

  return `${minutes}:${seconds}`;
}
