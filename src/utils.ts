import { confirmAlert, getPreferenceValues, showToast, Toast, trash } from "@raycast/api";
import { showFailureToast } from "@raycast/utils";
import { accessSync, constants, readdirSync, statSync } from "fs";
import { rm } from "fs/promises";
import { join } from "path";
import { homedir } from "os";

interface Preferences {
  downloadsFolder: string;
  showHiddenFiles: boolean;
  fileOrder: "modifiedTime" | "createTime" | "addTime";
  latestDownloadOrder: "modifiedTime" | "createTime" | "addTime" | "birthTime";
  downloadsLayout: "list" | "grid";
  deletionBehavior: "trash" | "permanent";
}

const preferences = getPreferenceValues<Preferences>();

// Windows Downloads folder path
export const downloadsFolder = preferences.downloadsFolder || join(homedir(), "Downloads");
const showHiddenFiles = preferences.showHiddenFiles;
const fileOrder = preferences.fileOrder;
const latestDownloadOrder = preferences.latestDownloadOrder;
export const defaultDownloadsLayout = preferences.downloadsLayout ?? "list";

const imageExtensions = [".png", ".jpg", ".jpeg", ".gif", ".webp", ".bmp", ".tiff", ".heic", ".svg"];

export function isImageFile(filename: string): boolean {
  const dotIndex = filename.lastIndexOf(".");
  if (dotIndex === -1) return false;
  const ext = filename.toLowerCase().slice(dotIndex);
  return imageExtensions.includes(ext);
}

export function getDownloads(folder?: string) {
  const targetFolder = folder || downloadsFolder;
  try {
    const files = readdirSync(targetFolder);
    const items = files
      .filter((file) => showHiddenFiles || !file.startsWith("."))
      .map((file) => {
        const path = join(targetFolder, file);
        const stats = statSync(path);
        return {
          file,
          path,
          isDirectory: stats.isDirectory(),
          lastModifiedAt: stats.mtime,
          createdAt: stats.ctime,
          addedAt: stats.atime,
          birthAt: stats.birthtime,
        };
      });

    // Sort: folders first, then by file order
    return items.sort((a, b) => {
      if (a.isDirectory !== b.isDirectory) {
        return a.isDirectory ? -1 : 1;
      }
      switch (fileOrder) {
        case "addTime":
          return b.addedAt.getTime() - a.addedAt.getTime();
        case "createTime":
          return b.createdAt.getTime() - a.createdAt.getTime();
        case "modifiedTime":
        default:
          return b.lastModifiedAt.getTime() - a.lastModifiedAt.getTime();
      }
    });
  } catch (error) {
    console.error("Error reading downloads folder:", error);
    return [];
  }
}

export function getLatestDownload() {
  const downloads = getDownloads();
  if (downloads.length < 1) {
    return undefined;
  }

  if (latestDownloadOrder === "addTime") {
    downloads.sort((a, b) => b.addedAt.getTime() - a.addedAt.getTime());
  } else if (latestDownloadOrder === "createTime") {
    downloads.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  } else if (latestDownloadOrder === "modifiedTime") {
    downloads.sort((a, b) => b.lastModifiedAt.getTime() - a.lastModifiedAt.getTime());
  } else if (latestDownloadOrder === "birthTime") {
    downloads.sort((a, b) => b.birthAt.getTime() - a.birthAt.getTime());
  }

  return downloads[0];
}

export function hasAccessToDownloadsFolder() {
  try {
    accessSync(downloadsFolder, constants.R_OK);
    return true;
  } catch (error) {
    console.error("No access to downloads folder:", error);
    return false;
  }
}

export async function deleteFileOrFolder(filePath: string) {
  if (preferences.deletionBehavior === "trash") {
    try {
      await trash(filePath);
      await showToast({ style: Toast.Style.Success, title: "Item Moved to Recycle Bin" });
    } catch (error) {
      await showFailureToast(error, { title: "Move to Recycle Bin Failed" });
    }
    return;
  }

  const shouldDelete = await confirmAlert({
    title: "Delete Item?",
    message: `Are you sure you want to permanently delete:\n${filePath}?`,
    primaryAction: {
      title: "Delete",
    },
  });

  if (!shouldDelete) {
    await showToast({ style: Toast.Style.Animated, title: "Cancelled" });
    return;
  }

  try {
    await rm(filePath, { recursive: true, force: true });
    await showToast({ style: Toast.Style.Success, title: "Item Deleted" });
  } catch (error) {
    if (error instanceof Error) {
      await showFailureToast(error, { title: "Deletion Failed" });
    }
  }
}
