import { RawTranscriptionData, SpeakerData } from '../../../types';

export class Transcriber {

    static transcribe(data: RawTranscriptionData): Transcription {

        const transcription = new Transcription();
        for (const speakerData of data) {
            transcription.addSegment(new TranscriptionSegment(speakerData));
        }
       
        return transcription;
    }
}


export class Transcription {
    private segments: TranscriptionSegment[];

    constructor(segments: TranscriptionSegment[] = []) {
        this.segments = segments;
    }

    get getSegments(): TranscriptionSegment[] {
        return this.segments;
    }

    /**
     * The entire transcript, as a string.
     */
    asString(): string {
        let transcriptionString = "";
        this.segments.forEach((segment) => {
            transcriptionString += `${segment.asString()}\n`;
        });
        return transcriptionString;
    }

    addSegment(segment: TranscriptionSegment) {
        this.segments.push(segment);
    }

    /**
     * The total duration of the transcription, in seconds.
     */
    duration(): number {
        return this.segments.reduce((total, segment) => {
            return total + segment.duration();
        }, 0);
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

    constructor(private data: SpeakerData) {}

    speaker(): string {
        return this.data.speaker;
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
        })

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