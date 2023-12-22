<p align="center">
  <img src="/public/logo.png?raw=true" width="450" alt="😭😭😭">
</p>
<p align="center">
  <img src="/previews/banner.png?raw=true" width="700" alt="😭😭😭">
</p>
<p align="center">
  <em>4chan Media Gallery is a fusker used to aggregate and display images and videos from various 4chan boards</em>
</p>

## Features
- [x] Fetch media from [multiple boards](https://github.com/kpg-anon/4chan-Media-Gallery/blob/main/server.js#L20) (only mu and trash supported by default)
- [x] Download files with original filenames
- [x] Media preview on hover
- [x] Gif/Webm support
- [x] Gallery Mode

<p align="center">
  <img src="/previews/homepage.jpg?raw=true" alt="Homepage">
</p>

| | |
|:-------------------------:|:-------------------------:|
| ![Search Page](/previews/searchpage.jpg?raw=true "Search Page") | ![Image Hover](/previews/imagehover.jpg?raw=true "Image Hover") |
| ![Video Preview](/previews/videopreview.jpg?raw=true "Video Preview") | ![Gallery Mode](/previews/gallerymode.jpg?raw=true "Gallery Mode") |

## 🛠️ Requirements 🛠️
- git
- node.js ≥12.0
- npm ≥6.0

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
2. Navigate to `http://localhost:3000` in your web browser to view and interact with the media gallery. Search accepts multiple terms like `<term1>|<term2>`.

| Hotkey |                 Action                 |
|:------:|:--------------------------------------:|
| Alt+G  | Activate gallery mode                  |
| S      | Save media on thumbnail hover or in gallery      |
| Esc    | Exit gallery                           |

## TODO

- [ ] add gui support for additional boards
- [ ] implement regex filtering 
- [ ] add keyboard shortcuts for video playback speed in gallery mode
- [ ] press h in gallery mode to flip image horizontally
- [ ] fullscreen mode+slideshow feature
- [ ] general ui improvements