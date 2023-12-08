export function getPlatformLabel(platform: string) {
  switch (platform) {
    case "google_meet":
      return "Google Meet";
    case "zoom":
      return "Zoom";
    case "teams":
      return "Teams";
    default:
      return "Meeting";
  }
}
