import {
  AnalysisOptions,
  IntelligenceResultsResponse,
  Job,
  ListJobsOpts,
  ListJobsResponse,
} from "../../types/intelligence.ts";
import { Bot, CreateBotRequest } from "./../../types/bot.ts";
import { RawTranscriptionData } from "./../../types/index.ts";
import fetch from "node-fetch";

class RecallApi {
  private BASE_URL = "https://api.recall.ai/api/v1";
  private V2_BASE_URL = "https://api.recall.ai/api/v2beta";

  constructor(private apiKey: string) {
    if (!apiKey) throw new Error("API key is required");
  }

  async sendBotToMeeting(meeting_url: string, name: string): Promise<Bot> {
    const body: CreateBotRequest = {
      meeting_url,
      name,
      transcription_options: {
        // Default to AssemblyAI
        provider: "assembly_ai",
      },
    };

    const resp = await fetch(this.BASE_URL + "/bot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + this.apiKey,
      },
      body: JSON.stringify(body),
    });

    if (!resp.ok) {
      const data = await resp.json();
      console.error("Error sending bot to meeting:", data);
      throw new Error("Error sending bot to meeting");
    }

    const data = (await resp.json()) as Bot;
    return data;
  }

  // Pagination is supported in the Recall API for large number of bots.
  async listBots(): Promise<Bot[]> {
    const resp = await fetch(this.BASE_URL + "/bot", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + this.apiKey,
      },
    });

    if (!resp.ok) {
      const data = await resp.json();
      console.error("Error listing bots:", data);
      throw new Error("Error listing bots");
    }

    const data = (await resp.json()) as Bot[];
    return data;
  }

  async getBot(botId: string): Promise<Bot> {
    const resp = await fetch(this.BASE_URL + `/bot/${botId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + this.apiKey,
      },
    });

    if (!resp.ok) {
      const data = await resp.json();
      console.error("Error getting bot:", data);
      throw new Error("Error getting bot");
    }

    const data = (await resp.json()) as Bot;
    return data;
  }

  /**
   * Asynchronously analyze the media of a bot using external AI providers.
   * Right now this only supports AssemblyAI, but could easily be extended to support other providers
   * through the use of a factory pattern.
   * @param botId ID of the bot for which to get the media analysis
   * @param opts (optional) Options for the media analysis (e.g. language, summarization, sentiment_analysis, entity_detection)
   */
  async analyzeBotMedia(botId: string, opts?: AnalysisOptions): Promise<void> {
    if (!opts) {
      // Use assemblyAI summary as defaults
      console.log("No options provided, using assemblyAI summary as defaults");

      opts = {
        assemblyai_async_transcription: {
          summarization: true,
          summary_model: "informative",
          summary_type: "paragraph",
          sentiment_analysis: true,
          entity_detection: true,
        },
      };
    }

    const resp = await fetch(this.V2_BASE_URL + `/bot/${botId}/analyze`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + this.apiKey,
      },
      body: JSON.stringify(opts),
    });

    if (!resp.ok) {
      const data = await resp.json();
      console.error("Error analyzing bot media:", data);
      throw new Error("Error analyzing bot media");
    }
  }

  async getBotIntelligence(
    botId: string,
  ): Promise<IntelligenceResultsResponse> {
    const resp = await fetch(this.BASE_URL + `/bot/${botId}/intelligence`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + this.apiKey,
      },
    });

    if (!resp.ok) {
      const data = await resp.json();
      console.error("Error getting bot intelligence:", data);
      throw new Error("Error getting bot intelligence");
    }

    // An empty object is returned if the bot has not been analyzed yet.
    const data = (await resp.json()) as IntelligenceResultsResponse;
    return data;
  }

  /**
   * List all analysis jobs.
   * @param opts (optional) Object containing options for filtering the list of jobs.
   */
  async listJobs(opts?: ListJobsOpts): Promise<ListJobsResponse> {
    let url = this.BASE_URL + "/analysis/job";

    for (const key in opts) {
      if (opts.hasOwnProperty(key)) {
        const val = opts[key as keyof ListJobsOpts];
        url += `?${key}=${val}`;
      }
    }

    const resp = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + this.apiKey,
      },
    });

    if (!resp.ok) {
      const data = await resp.json();
      console.error("Error listing jobs:", data);
      throw new Error("Error listing jobs");
    }

    const data = (await resp.json()) as ListJobsResponse;
    return data;
  }

  async getJob(id: string): Promise<Job> {
    const resp = await fetch(this.BASE_URL + `/analysis/job/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + this.apiKey,
      },
    });

    if (!resp.ok) {
      const data = await resp.json();
      console.error("Error getting job:", data);
      throw new Error("Error getting job");
    }

    const data = (await resp.json()) as Job;
    return data;
  }

  async getTranscriptionData(botId: string): Promise<RawTranscriptionData> {
    const API_KEY = process.env.RECALL_API_KEY;
    if (!API_KEY) throw new Error("RECALL_API_KEY not set");

    const url = `https://api.recall.ai/api/v1/bot/${botId}/transcript/`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        authorization: "Token " + API_KEY,
      },
    };

    return fetch(url, options)
      .then(async (res) => {
        const data = (await res.json()) as RawTranscriptionData;
        return data;
      })
      .catch((e) => {
        const err = `Error getting bot transcript: ${e}`;
        throw new Error(err);
      });
  }
}

export default RecallApi;
