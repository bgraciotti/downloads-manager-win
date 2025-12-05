/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {}

/** Preferences accessible in all the extension's commands */
declare type Preferences = ExtensionPreferences

declare namespace Preferences {
  /** Preferences accessible in the `manage-downloads` command */
  export type ManageDownloads = ExtensionPreferences & {
  /** Downloads Folder - Path to your downloads folder */
  "downloadsFolder": string,
  /** File Order - How to sort files in the list */
  "fileOrder": "modifiedTime" | "createTime" | "addTime",
  /** Latest Download Order - How to determine the latest download */
  "latestDownloadOrder": "modifiedTime" | "createTime" | "addTime" | "birthTime",
  /** Show Hidden Files - Show files starting with a dot */
  "showHiddenFiles": boolean,
  /** Layout - Choose between list or grid view */
  "downloadsLayout": "list" | "grid",
  /** Deletion Behavior - Choose how to delete files */
  "deletionBehavior": "trash" | "permanent"
}
  /** Preferences accessible in the `open-latest-download` command */
  export type OpenLatestDownload = ExtensionPreferences & {}
  /** Preferences accessible in the `copy-latest-download` command */
  export type CopyLatestDownload = ExtensionPreferences & {}
  /** Preferences accessible in the `paste-latest-download` command */
  export type PasteLatestDownload = ExtensionPreferences & {}
  /** Preferences accessible in the `show-latest-download` command */
  export type ShowLatestDownload = ExtensionPreferences & {}
  /** Preferences accessible in the `delete-latest-download` command */
  export type DeleteLatestDownload = ExtensionPreferences & {}
}

declare namespace Arguments {
  /** Arguments passed to the `manage-downloads` command */
  export type ManageDownloads = {}
  /** Arguments passed to the `open-latest-download` command */
  export type OpenLatestDownload = {}
  /** Arguments passed to the `copy-latest-download` command */
  export type CopyLatestDownload = {}
  /** Arguments passed to the `paste-latest-download` command */
  export type PasteLatestDownload = {}
  /** Arguments passed to the `show-latest-download` command */
  export type ShowLatestDownload = {}
  /** Arguments passed to the `delete-latest-download` command */
  export type DeleteLatestDownload = {}
}

