export interface IntelligenceResultsResponse {
    "assembly_ai.content_safety_labels": {
      status: string;
      results: any[]; // Replace with actual type
      summary: any; // Replace with actual type
    };
    "assembly_ai.iab_categories_result": {
      status: string;
      results: any[]; // Replace with actual type
      summary: any; // Replace with actual type
    };
    "assembly_ai.summary": string;
    "assembly_ai.language_code": string;
    "assembly_ai.id": string;
    
    // ... Add Other providers 
}

/**
 * Must specify at least one of: 
 * - summarization
 * - sentiment_analysis 
 * - entity_detection
 */
export interface AssemblyAiAsyncTranscriptionOptions {
    language?: string;
    language_code?: string;
    speaker_labels?: boolean;
    word_boost?: string[];
    boost_param?: string;
    custom_spelling?: any[];
    disfluencies?: boolean;
    language_detection?: boolean;
    punctuation?: boolean;
    format_text?: boolean;
    filter_profanity?: boolean;
    redact_pii_policies?: string[];
    auto_highlights?: boolean;
    content_safety?: boolean;
    iab_categories?: boolean;
    sentiment_analysis?: boolean;
    summarization?: boolean;
    // Default: 'informative'
    summary_model?: 'informative' | 'conversational' | 'catchy';
    // Default: 'bullets'
    summary_type?: 'bullets' | 'bullets_verbose' | 'gist' | 'headline' | 'paragraph';
    auto_chapters?: boolean;
    entity_detection?: boolean;
}


// Analysis Jobs

export interface ListJobsResponse {
    next: string | null;
    previous: string | null;
    results: Job[];
}

export interface Job {
    id: string;
    name: string | null;
    status: JobStatus;
    created_at: string;
    errors: any[];
}

enum JobStatus {
    IN_PROGRESS = 'in_progress',
    COMPLETED = 'completed',
    ERRORED = 'errored',
}

/**
 * Optional parameters for listing jobs.
 * created_at parameters must be in ISO 8601 format.
 */
export interface ListJobsOpts {
    created_at_after?: string;
    created_at_before?: string;
    status?: JobStatus[];
    cursor?: string;
}