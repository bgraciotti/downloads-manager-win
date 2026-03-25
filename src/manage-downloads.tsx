import { ActionPanel, Action, List, Grid, Icon, useNavigation } from "@raycast/api";
import { basename } from "path";
import { useState } from "react";
import { defaultDownloadsLayout, downloadsFolder, getDownloads, isImageFile, hasAccessToDownloadsFolder } from "./utils";

interface FolderViewProps {
  folder: string;
}

function FolderView({ folder }: FolderViewProps) {
  const { pop } = useNavigation();
  const [downloads, setDownloads] = useState(getDownloads(folder));
  const [downloadsLayout, setDownloadsLayout] = useState<string>(defaultDownloadsLayout);

  function handleTrash(paths: string | string[]) {
    setDownloads((downloads) =>
      downloads.filter((download) => (Array.isArray(paths) ? !paths.includes(download.path) : paths !== download.path)),
    );
  }

  function handleReload() {
    setDownloads(getDownloads(folder));
  }

  const searchBarPlaceholder = folder === downloadsFolder
    ? "Search downloads..."
    : `Search in ${basename(folder)}...`;

  const actions = (download: ReturnType<typeof getDownloads>[number]) => (
    <ActionPanel>
      <ActionPanel.Section>
        {download.isDirectory ? (
          <>
            <Action.Push
              title="Open Folder"
              icon={Icon.ArrowRight}
              target={<FolderView folder={download.path} />}
            />
            <Action.Push
              title="Open Folder"
              icon={Icon.ArrowRight}
              shortcut={{ modifiers: [], key: "tab" }}
              target={<FolderView folder={download.path} />}
            />
          </>
        ) : (
          <Action.Open title="Open" icon={Icon.Document} target={download.path} />
        )}
        <Action.ShowInFinder
          title="Show in File Explorer"
          path={download.path}
          shortcut={{ modifiers: ["ctrl"], key: "enter" }}
        />
        {!download.isDirectory && (
          <Action.OpenWith path={download.path} shortcut={{ modifiers: ["ctrl"], key: "o" }} />
        )}
        <Action.CopyToClipboard
          title="Copy File"
          content={{ file: download.path }}
          shortcut={{ modifiers: ["ctrl", "shift"], key: "c" }}
        />
      </ActionPanel.Section>
      <ActionPanel.Section>
        {folder !== downloadsFolder && (
          <Action
            title="Go Back"
            icon={Icon.ArrowLeft}
            shortcut={{ modifiers: ["shift"], key: "tab" }}
            onAction={() => pop()}
          />
        )}
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
    icon: { fileIcon: folder },
    title: "No files found",
    description: folder === downloadsFolder ? "Well, first download some files ¯\\_(ツ)_/¯" : "This folder is empty",
  };

  const getItemProps = (download: ReturnType<typeof getDownloads>[number]) => ({
    title: download.file,
    quickLook: { path: download.path, name: download.file },
    actions: actions(download),
  });

  if (downloadsLayout === "grid") {
    return (
      <Grid columns={5} fit={Grid.Fit.Contain} inset={Grid.Inset.Medium} searchBarPlaceholder={searchBarPlaceholder}>
        {downloads.length === 0 && <Grid.EmptyView {...emptyViewProps} />}
        {downloads.map((download) => (
          <Grid.Item
            key={download.path}
            {...getItemProps(download)}
            content={
              download.isDirectory
                ? { fileIcon: download.path }
                : isImageFile(download.file)
                  ? { source: download.path }
                  : { fileIcon: download.path }
            }
          />
        ))}
      </Grid>
    );
  }

  return (
    <List searchBarPlaceholder={searchBarPlaceholder}>
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

export default function Command() {
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

  return <FolderView folder={downloadsFolder} />;
}
