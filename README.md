# 🌌 3D Solar System – Frontend Assignment
**Submitted by: Veera Bhadhra**

This is a mobile-responsive 3D simulation of the solar system, built using [Three.js](https://threejs.org/). It fulfills the requirements of the Frontend Developer Assignment.

---

## 🚀 Features

- 🪐 Sun + 8 planets orbiting in 3D space
- 🌍 Realistic textures for Earth and others
- ☁️ Clouds, bump maps, night lights (Earth)
- 🌠 Starfield background (Three.js Points)
- 🌀 Orbital rings for each planet
- 🔄 Pause/Resume animation button
- 🎛️ Real-time speed control for each planet
- 📷 Top-down camera with orbit controls
- 🌌 Skybox environment

---

## 📁 Folder Structure

```
project-root/
├── index.html              # Main solar system viewer
├── planet.html             # Individual planet viewer (planet.html?name=mars)
├── style.css               # Shared styles
├── README.md               # This file
├── js/
│   └── main.js             # Planet loading, animation, controls
├── src/
│   ├── getStarfield.js     # Starfield background
│   └── getFresnelMat.js    # Fresnel shader for Earth glow
├── textures/               # Earth textures
│   ├── 00_earthmap1k.jpg
│   ├── 01_earthbump1k.jpg
│   ├── 02_earthspec1k.jpg
│   ├── 03_earthlights1k.jpg
│   ├── 04_earthcloudmap.jpg
│   └── 05_earthcloudmaptrans.jpg
├── img/                    # Skybox and other planet textures
│   ├── sun_hd.jpg
│   ├── saturn_ring.jpg
│   └── skybox/
│       ├── corona_ft.png
│       ├── corona_bk.png
│       ├── corona_up.png
│       ├── corona_dn.png
│       ├── corona_rt.png
│       └── corona_lf.png
```

---

## 🛠️ Technologies Used

- HTML, CSS, JavaScript
- Three.js (via Skypack CDN)
- OrbitControls, ShaderMaterial
- RequestAnimationFrame for updates

---

## 📺 Demo Video Includes

1. Solar system in motion  
2. Speed sliders in action  
3. Code and file structure walkthrough  
4. Voice explanation by Veera Bhadhra  

🎥 _See the video file in your submission package._

---

## 🧪 How to Run

1. Download or clone the repo
2. Open `index.html` in any modern browser
3. Use UI controls or open `planet.html?name=earth` to view a planet
4. Adjust orbital speeds using the sliders
5. Press "Pause" to stop motion

---

## ✅ Assignment Checklist

| Requirement                        | Status |
|------------------------------------|--------|
| Sun + 8 planets orbit              | ✅      |
| Real-time animation (rotation + orbit) | ✅  |
| Speed control sliders              | ✅      |
| Pause/Resume toggle                | ✅      |
| Background stars                   | ✅      |
| Planet viewer page with camera     | ✅      |
| Code structure + comments          | ✅      |
| Mobile-responsive design           | ✅      |

---

## 📄 License

MIT – Free to use and adapt with credit.

---

## 🙌 Thanks for reviewing!
