export interface Meeting {
    id: string;
    recall_bot_id: string;
    meeting_url: string;
    updatedAt: string;
    createdAt: string;
}

export interface CreateBotRequest {
    meeting_url: string;
    name?: string;
}