# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0] - 2025-12-05

### Added
- 🚀 **Initial Release**: Windows-adapted version of the Downloads Manager extension
- 📋 **Manage Downloads Command**: View and organize downloads in List or Grid view
- ⚡ **Quick Action Commands**:
  - Open Latest Download - Instantly open your most recent file
  - Copy Latest Download - Copy to clipboard
  - Paste Latest Download - Paste to active application
  - Show Latest Download in Explorer - Navigate to file in Windows Explorer
  - Delete Latest Download - Delete or move to Recycle Bin
- 🎨 **Dual View Modes**: Toggle between List view (detailed) and Grid view (visual)
- 🖼️ **Image Preview Support**: Automatic thumbnails for PNG, JPG, GIF, WebP, BMP, TIFF, HEIC, and SVG
- 🔄 **Smart Sorting Options**: Sort by Modified Time, Created Time, or Added Time
- ⚙️ **Flexible Configuration**:
  - Custom downloads folder path
  - Show/hide hidden files
  - Choose deletion behavior (Recycle Bin or permanent)
  - Set default view layout
  - Configure latest download criteria
- ⌨️ **Windows-Optimized Keyboard Shortcuts**: All shortcuts use Ctrl instead of Cmd
- 📁 **Windows Explorer Integration**: Native integration with Windows file system

### Changed
- 🎯 **Grid Layout**: Optimized to 5 columns for Windows displays (from 8 columns on macOS)
- 🗑️ **Deletion Behavior**: Adapted to use Windows Recycle Bin instead of macOS Trash
- 📂 **Default Path**: Uses Windows-standard Downloads folder path

### Removed
- ❌ **QuickLook**: Removed macOS-only QuickLook feature (not available on Windows)

---

## Credits

Original macOS version by [thomas](https://github.com/raycast/extensions/tree/main/extensions/downloads-manager) and contributors from the Raycast community.

Windows adaptation by **Brenno Graciotti** ([@bgraciotti](https://github.com/bgraciotti))
