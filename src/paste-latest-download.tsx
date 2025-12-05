import { getLatestDownload, hasAccessToDownloadsFolder } from "./utils";
import { Clipboard, popToRoot, showHUD } from "@raycast/api";

export default async function main() {
  if (!hasAccessToDownloadsFolder()) {
    await showHUD("❌ No permission to access the downloads folder");
    return;
  }

  const latestDownload = getLatestDownload();
  if (!latestDownload) {
    await showHUD("📂 No downloads found");
    return;
  }

  await Clipboard.paste({ file: latestDownload.path });
  await showHUD(`✅ Pasted: ${latestDownload.file}`);
  await popToRoot();
}
