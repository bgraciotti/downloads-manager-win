# Downloads Manager - Raycast Extension (Windows)

Search and organize your downloads with ease - Windows Edition.

## Description

Downloads Manager is a Raycast extension designed specifically for Windows users to quickly access, organize, and manage files in your Downloads folder. Navigate through your downloads with both List and Grid views, perform quick actions on your latest downloads, and keep your files organized.

## Features

- **📋 Manage Downloads** - View all your downloads in an intuitive List or Grid layout
- **⚡ Quick Actions** - Instant access to your latest downloaded file:
  - Open latest download
  - Copy latest download to clipboard
  - Paste latest download
  - Show latest download in Windows Explorer
  - Delete latest download
- **🎨 Dual View Modes** - Switch between List view (detailed) and Grid view (visual preview)
- **🖼️ Image Previews** - Automatic thumbnail generation for image files in Grid view
- **🔄 Smart Sorting** - Sort by Modified Time, Created Time, or Added Time
- **🗑️ Flexible Deletion** - Choose between moving to Recycle Bin or permanent deletion
- **👁️ Hidden Files Toggle** - Show or hide hidden files (starting with a dot)
- **📂 Folder Navigation** - Drill into subfolders and navigate back seamlessly
- **📁 Custom Folder** - Configure a custom downloads folder path

## How to Install

1. **Install Node.js** (if not already installed):
   ```bash
   winget install -e --id OpenJS.NodeJS
   ```

2. **Clone or download this repository**

3. **Navigate to the extension directory**:
   ```bash
   cd C:\Users\{username}\raycast-extensions\downloads-manager-win
   ```

4. **Install dependencies**:
   ```bash
   npm ci
   ```

5. **Run in development mode**:
   ```bash
   npm run dev
   ```

## Usage

### Manage Downloads Command

1. Open Raycast and search for **"Manage Downloads"**
2. Browse through your downloads in List or Grid view
3. Use keyboard shortcuts to perform actions on files
4. Toggle between List and Grid view with `Ctrl+L`

### Quick Action Commands

Use these commands for instant access to your latest download:

- **Open Latest Download** - Opens the most recently downloaded file
- **Copy Latest Download** - Copies the latest file to your clipboard
- **Paste Latest Download** - Pastes the latest file to the active application
- **Show Latest Download in Explorer** - Opens Windows Explorer and selects the file
- **Delete Latest Download** - Deletes or moves to Recycle Bin the latest file

## Keyboard Shortcuts

### Manage Downloads View

| Shortcut | Action |
|----------|--------|
| **Enter** | Open selected file / Enter folder |
| **Tab** | Enter folder |
| **Shift+Tab** | Go back to parent folder |
| **Esc** | Go back to parent folder |
| **Ctrl+O** | Open with... (choose application) |
| **Ctrl+Shift+C** | Copy file to clipboard |
| **Ctrl+L** | Toggle between List and Grid view |
| **Ctrl+R** | Reload downloads list |
| **Ctrl+X** | Delete selected download |
| **Ctrl+Shift+X** | Delete all downloads |

## Configuration

The extension supports the following preferences (accessible via Raycast Settings):

- **Downloads Folder** - Custom path to your downloads folder (default: `C:\Users\{username}\Downloads`)
- **File Order** - How to sort files: Modified Time, Created Time, or Added Time
- **Latest Download Order** - Criteria for determining the "latest" download
- **Show Hidden Files** - Toggle visibility of files starting with a dot
- **Layout** - Default view mode: List or Grid
- **Deletion Behavior** - Move to Recycle Bin or Permanently Delete

## File Structure

```
downloads-manager-win/
├── src/
│   ├── manage-downloads.tsx        # Main command component
│   ├── open-latest-download.tsx    # Open latest file
│   ├── copy-latest-download.tsx    # Copy latest file
│   ├── paste-latest-download.tsx   # Paste latest file
│   ├── show-latest-download.tsx    # Show in Explorer
│   ├── delete-latest-download.tsx  # Delete latest file
│   └── utils.ts                    # Utility functions
├── assets/
│   └── icon.png                    # Extension icon
├── package.json                    # Extension configuration
├── tsconfig.json                   # TypeScript configuration
└── README.md                       # This file
```

## Changelog

### Version 1.1.0
- 🚀 **Folder navigation**: Browse into subfolders directly within the extension
- ⌨️ **Navigation shortcuts**: Enter/Tab to open folder, Shift+Tab/Esc to go back
- 📂 **Folders first**: Folders are always sorted before files in the list
- ✨ **Native navigation stack**: Uses Raycast's built-in push/pop navigation for smooth drill-down

### Version 1.0.0
- 🚀 **Initial release**: Windows-adapted version of the Downloads Manager extension
- 📋 **Manage Downloads**: View and organize downloads in List or Grid view
- ⚡ **Quick actions**: Open, Copy, Paste, Show in Explorer, Delete latest download
- 🎨 **Dual view modes**: Toggle between List view (detailed) and Grid view (visual)
- 🖼️ **Image previews**: Automatic thumbnails for PNG, JPG, GIF, WebP, BMP, TIFF, HEIC, SVG
- 🔄 **Smart sorting**: Sort by Modified Time, Created Time, or Added Time
- ⚙️ **Flexible config**: Custom folder, hidden files, deletion behavior, default layout
- ⌨️ **Windows shortcuts**: All shortcuts use Ctrl instead of Cmd
- 📁 **Explorer integration**: Native integration with Windows file system

## Differences from macOS Version

This Windows edition includes the following adaptations:

- ✅ Windows-native Downloads folder path (`%USERPROFILE%\Downloads`)
- ✅ Windows Explorer integration (replaces Finder)
- ✅ Recycle Bin support (replaces macOS Trash)
- ✅ Ctrl-based keyboard shortcuts (replaces Cmd)
- ✅ Grid view optimized for Windows (5 columns)
- ❌ QuickLook not available (macOS-only feature)

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests.

## Credits

Original macOS version created by [thomas](https://github.com/raycast/extensions/tree/main/extensions/downloads-manager) and contributors.

Windows adaptation by **Brenno Graciotti** ([@bgraciotti](https://github.com/bgraciotti))

## License

MIT License

## Author

**Brenno Graciotti**
- GitHub: [@bgraciotti](https://github.com/bgraciotti)
