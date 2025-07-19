🎬 YouTube Playlist Duration Selector Chrome Extension
A Chrome Extension that lets you select videos from any YouTube playlist and instantly shows you their total duration. Supports both individual clicking and drag-to-select via a rectangle.

✨ Features
✅ Click individual videos to select/deselect.

⬛ ALT + Drag a rectangle to select multiple videos.

🧮 Shows total duration and video count in a floating box.

🔘 "Select All", "Reset", and "Turn Off" buttons built-in.

🚫 Prevents clicking from navigating away during selection.

☝️ Works with both vertical & grid-style playlist views.

📷 Screenshot
![screenshotsub>Add a screenshot of the extension in action.</sub>

⚙️ How to Use
🚀 Load a YouTube playlist in Chrome. Example:
https://www.youtube.com/playlist?list=...

🔘 Click the extension icon in the Chrome toolbar to activate the tool.

🖱️ Click on videos to select/deselect them.
🎯 ALT + Drag with your mouse to select multiple videos using a box.

👁️ See total duration and video count in a floating sidebar on the page.

🧩 Controls
Action Shortcut / Button
Select videos Click on video item
Multi-select Hold ALT + Drag mouse
Select All Videos Click Select All
Reset selection Click Reset
Turn off extension Click Turn Off
🛠️ Developer Setup / Installation

1. Clone the repository:
   bash
   git clone https://github.com/yourusername/youtube-playlist-duration-selector.git
   cd youtube-playlist-duration-selector
2. Load the extension in Chrome:
   Open chrome://extensions/

Enable "Developer mode"

Click Load unpacked

Choose the folder you just cloned

3. Use the extension:
   Navigate to a YouTube playlist page

Click the Extension Icon

Start selecting videos!

📁 File Structure
text
youtube-playlist-duration-selector/
│
├── content.js # Main logic injected into the playlist page
├── background.js # Injects content.js when extension is clicked
├── styles.css # Visual styles for selection and floating box
├── manifest.json # Chrome extension manifest
└── README.md # This documentation file
🧪 Known Limitations
May not work properly if YouTube changes its HTML structure.

Videos added dynamically during scroll may not be selectable until reprocessed.

Only designed for YouTube playlist pages (youtube.com/playlist?...).

📜 License
This project is licensed under the MIT License.

🙌 Acknowledgments
YouTube UI reversed and tested

Inspired by the need for better playlist time management

📬 Contributions
Pull requests welcome!
If you find bugs or want features, open an issue.
