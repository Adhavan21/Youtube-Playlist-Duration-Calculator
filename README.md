# 🎬 YouTube Playlist Duration Calculator Chrome Extension

A Chrome Extension that lets you select videos from any YouTube playlist and instantly shows you their total duration. Supports both individual clicking and drag-to-select via a rectangle.

---

## ✨ Features

✅ Click individual videos to select/deselect  
⬛ **ALT + Drag** a rectangle to select multiple videos  
🧮 Shows total duration and video count in a floating box  
🔘 "Select All", "Reset", and "Turn Off" buttons built-in  
🚫 Prevents clicking from navigating away during selection  
☝️ Works with both vertical & grid-style playlist views

---

## 📷 Screenshot

> ![Screenshot](https://drive.google.com/uc?export=view&id=1mG9xBAsoc_Ug-vPHdKNCgeJE9Xtq8rwx)

---

## ⚙️ How to Use

1. 🚀 Load a YouTube playlist in Chrome.  
   Example: `https://www.youtube.com/playlist?list=...`

2. 🔘 Click the extension icon in the Chrome toolbar to activate the tool.

3. 🖱️ Click on videos to select/deselect them.  
   🎯 Hold **ALT** and drag to select multiple videos using a box.

4. 👁️ See total duration and video count in a floating sidebar on the page.

---

## 🧩 Controls

| Action             | Shortcut / Button    |
| ------------------ | -------------------- |
| Select videos      | Click on video item  |
| Multi-select       | Hold **ALT** + Drag  |
| Select All Videos  | Click **Select All** |
| Reset selection    | Click **Reset**      |
| Turn off extension | Click **Turn Off**   |

---

## 🛠️ Developer Setup / Installation

1. **Clone the repository:**

```bash
git clone https://github.com/Adhavan21/youtube-playlist-duration-calculator.git
cd youtube-playlist-duration-selector
```

2. **Load the extension in Chrome:**

- Open `chrome://extensions/`
- Enable **Developer mode**
- Click **Load unpacked**
- Select the folder you just cloned

3. **Use the extension:**

- Navigate to a YouTube playlist page
- Click the extension icon
- Start selecting videos!

---

## 📁 File Structure

```
youtube-playlist-duration-selector/
│
├── content.js          # Main logic injected into the playlist page
├── background.js       # Injects content.js when extension is clicked
├── styles.css          # Visual styles for selection and floating box
├── manifest.json       # Chrome extension manifest
└── README.md           # This documentation file
```

---

## 🧪 Known Limitations

- May not work properly if YouTube changes its HTML structure
- Videos added dynamically during scroll may not be selectable until reprocessed
- Only designed for YouTube playlist pages (`youtube.com/playlist?...`)

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙌 Acknowledgments

- YouTube UI reversed and tested
- Inspired by the need for better playlist time management

---

## 📬 Contributions

Pull requests welcome!  
If you find bugs or want features, [open an issue](https://github.com/Adhavan21/youtube-playlist-duration-calculator/issues).
