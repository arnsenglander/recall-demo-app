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
}

class TranscriptionSegment {

    constructor(private data: SpeakerData) {}

    // The start time of the first word in the segment.
    start(): number {
        console.log('WE MIGHT WANT TO SORT THIS');
        return this.data.words[0].start_timestamp;
    }

    asString(): string {
        const chronologicalWords = this.data.words.sort((a, b) => {
            return a.start_timestamp - b.start_timestamp;
        })

        let segmentString = "";
        chronologicalWords.forEach((word) => {
            segmentString += `${word} `;
        });

        return segmentString;
    }
}