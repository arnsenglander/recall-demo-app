import { Request, Response, RequestHandler } from "express";
import RecallApi from "../services/recall.ts";

export const listJobs: RequestHandler = async (
  _req: Request,
  res: Response,
) => {
  const recallApi = new RecallApi(process.env.RECALL_API_KEY ?? "");

  try {
    const jobs = await recallApi.listJobs();
    console.log("Jobs", jobs);

    res.status(200).json({ jobs: jobs });
  } catch (e) {
    console.log("Error listing jobs:", e);
    res.status(500).json({ message: "Error listing jobs" });
  }
};

export const getJob: RequestHandler = async (req: Request, res: Response) => {
  const { jobId } = req.params;
  const recallApi = new RecallApi(process.env.RECALL_API_KEY ?? "");

  try {
    const job = await recallApi.getJob(jobId);
    console.log("Job", job);

    res.status(200).json({ job: job });
  } catch (e) {
    console.log("Error getting job:", e);
    res.status(500).json({ message: "Error getting job" });
  }
};
