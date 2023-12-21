<p align="center">
  <img src="/public/logo.png?raw=true" width="450" alt="😭😭😭">
</p>

<p align="center">
  <strong>🖼️ 4chan Media Gallery 🖼️</strong>
</p>

<p align="center">
  <em>4chan Media Gallery is a fusker used to aggregate and display images and videos from various 4chan boards</em>
</p>

## Features
- [x] Pull media from multiple boards (only mu and trash supported by default)
- [x] Download files with original filenames
- [x] Media preview on hover
- [x] Gif/Webm support
- [x] Gallery Mode

<p align="center">
  <img src="/previews/homepage.jpg?raw=true" width="600" alt="😭😭😭">
</p>
<p align="center">
  <img src="/previews/searchpage.jpg?raw=true" width="600" alt="😭😭😭">
</p>
<p align="center">
  <img src="/previews/imagehover.jpg?raw=true" width="600" alt="😭😭😭">
</p>
<p align="center">
  <img src="/previews/videopreview.jpg?raw=true" width="600" alt="😭😭😭">
</p>
<p align="center">
  <img src="/previews/gallerymode.jpg?raw=true" width="600" alt="😭😭😭">
</p>

## 🛠️ Requirements 🛠️
- node.js ≥12.0
- npm ≥6.0
- git

## 📥 Installation 📥
1. Clone the repository:
    ```
    git clone https://github.com/kpg-anon/4chan-Media-Gallery
    ```

2. Navigate to the project directory:
    ```
    cd 4chan-Media-Gallery
    ```

3. Install the dependencies:
    ```
    npm install
    ```

## 💻 Usage 💻
1. Start the server:
	```
	npm start
	```
2. Navigate to `http://localhost:3000` in your web browser to view and interact with the media gallery.

| Hotkey |                 Action                 |
|:------:|:--------------------------------------:|
| Alt+G  | Activate gallery mode                  |
| S      | Save media on hover or in gallery      |
| Esc    | Exit gallery                           |

## TODO

- [ ] add gui support for additional boards
- [ ] implement regex filtering 
- [ ] add keyboard shortcuts for video playback speed in gallery mode
- [ ] press h in gallery mode to flip image horizontally
- [ ] fullscreen mode+slideshow feature
- [ ] general ui improvements