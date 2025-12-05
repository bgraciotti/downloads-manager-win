import { getLatestDownload, hasAccessToDownloadsFolder } from "./utils";
import { showHUD } from "@raycast/api";
import { exec } from "child_process";

export default async function main() {
  if (!hasAccessToDownloadsFolder()) {
    await showHUD("❌ No access to downloads folder");
    return;
  }

  const latestDownload = getLatestDownload();
  if (!latestDownload) {
    await showHUD("📂 No downloads found");
    return;
  }

  // Use 'start' command which brings window to foreground
  exec(`start "" explorer.exe /select,"${latestDownload.path}"`);
}
