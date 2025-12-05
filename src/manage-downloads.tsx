import { ActionPanel, Action, List, Grid, Icon } from "@raycast/api";
import { PathLike } from "fs";
import { useState } from "react";
import { defaultDownloadsLayout, downloadsFolder, getDownloads, isImageFile, hasAccessToDownloadsFolder } from "./utils";

export default function Command() {
  // Check folder access
  if (!hasAccessToDownloadsFolder()) {
    return (
      <List>
        <List.EmptyView
          icon={Icon.ExclamationMark}
          title="Cannot Access Downloads Folder"
          description={`Please check if the folder exists:\n${downloadsFolder}`}
        />
      </List>
    );
  }

  const [downloads, setDownloads] = useState(getDownloads());
  const [downloadsLayout, setDownloadsLayout] = useState<string>(defaultDownloadsLayout);

  function handleTrash(paths: PathLike | PathLike[]) {
    setDownloads((downloads) =>
      downloads.filter((download) => (Array.isArray(paths) ? !paths.includes(download.path) : paths !== download.path)),
    );
  }

  function handleReload() {
    setDownloads(getDownloads());
  }

  const actions = (download: ReturnType<typeof getDownloads>[number]) => (
    <ActionPanel>
      <ActionPanel.Section>
        <Action.Open title="Open" icon={Icon.Document} target={download.path} />
        <Action.ShowInFinder
          title="Show in File Explorer"
          path={download.path}
          shortcut={{ modifiers: ["ctrl"], key: "enter" }}
        />
        <Action.OpenWith path={download.path} shortcut={{ modifiers: ["ctrl"], key: "o" }} />
        <Action.CopyToClipboard
          title="Copy File"
          content={{ file: download.path }}
          shortcut={{ modifiers: ["ctrl", "shift"], key: "c" }}
        />
      </ActionPanel.Section>
      <ActionPanel.Section>
        <Action
          title="Reload Downloads"
          icon={Icon.ArrowClockwise}
          shortcut={{ modifiers: ["ctrl"], key: "r" }}
          onAction={handleReload}
        />
        <Action
          title="Toggle Layout"
          icon={downloadsLayout === "list" ? Icon.AppWindowGrid3x3 : Icon.AppWindowList}
          shortcut={{ modifiers: ["ctrl"], key: "l" }}
          onAction={() => setDownloadsLayout(downloadsLayout === "list" ? "grid" : "list")}
        />
      </ActionPanel.Section>
      <ActionPanel.Section>
        <Action.Trash
          title="Delete Download"
          paths={download.path}
          shortcut={{ modifiers: ["ctrl"], key: "x" }}
          onTrash={handleTrash}
        />
        <Action.Trash
          title="Delete All Downloads"
          paths={downloads.map((d) => d.path)}
          shortcut={{ modifiers: ["ctrl", "shift"], key: "x" }}
          onTrash={handleTrash}
        />
      </ActionPanel.Section>
    </ActionPanel>
  );

  const emptyViewProps = {
    icon: { fileIcon: downloadsFolder },
    title: "No downloads found",
    description: "Well, first download some files ¯\\_(ツ)_/¯",
  };

  const getItemProps = (download: ReturnType<typeof getDownloads>[number]) => ({
    title: download.file,
    quickLook: { path: download.path, name: download.file },
    actions: actions(download),
  });

  if (downloadsLayout === "grid") {
    return (
      <Grid columns={5} fit={Grid.Fit.Contain} inset={Grid.Inset.Medium}>
        {downloads.length === 0 && <Grid.EmptyView {...emptyViewProps} />}
        {downloads.map((download) => (
          <Grid.Item
            key={download.path}
            {...getItemProps(download)}
            content={isImageFile(download.file) ? { source: download.path } : { fileIcon: download.path }}
          />
        ))}
      </Grid>
    );
  }

  return (
    <List>
      {downloads.length === 0 && <List.EmptyView {...emptyViewProps} />}
      {downloads.map((download) => (
        <List.Item
          key={download.path}
          {...getItemProps(download)}
          icon={{ fileIcon: download.path }}
          accessories={[
            {
              date: download.lastModifiedAt,
              tooltip: `Last modified: ${download.lastModifiedAt.toLocaleString()}`,
            },
          ]}
        />
      ))}
    </List>
  );
}
