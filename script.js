// ✅ Smooth Scroll Only for Internal Links
document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  });
});

// ✅ Image Carousel Auto-Slide
document.addEventListener("DOMContentLoaded", () => {
  new bootstrap.Carousel(document.getElementById("imageCarousel"), {
    interval: 3000,
    ride: "carousel"
  });
});

// ✅ YouTube Playlist Fetching & Display
const apiKey = "AIzaSyAJySKdCS1_BNrvFAf6hGtvMbU0TLgO_7w";
const playlists = {
  full: "PLs_uju7fb5bfmkbcSJJKFpm1DPe-B1Zhy",
  shorts: "PLs_uju7fb5bc2sg2kkgNeG8GCt7G5WypE"
};

async function fetchAllPlaylistVideos(playlistId, containerId) {
  let nextPageToken = "";
  do {
    const res = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${apiKey}&pageToken=${nextPageToken}`);
    const data = await res.json();
    
    for (const item of data.items) {
      const videoId = item.snippet.resourceId.videoId;
      const title = item.snippet.title;
      const thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

      const statsRes = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=${apiKey}`);
      const statsData = await statsRes.json();
      const views = statsData.items[0]?.statistics?.viewCount || 0;

      const card = document.createElement("div");
      card.className = "video-card";
      card.innerHTML = `
        <img class="video-thumb" src="${thumbnail}" alt="${title}">
        <div class="video-info">
          <div class="video-title">${title}</div>
          <div class="video-views">${parseInt(views).toLocaleString()} views</div>
        </div>
      `;

      card.onclick = () => {
        card.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1" allowfullscreen></iframe>`;
      };

      document.getElementById(containerId).appendChild(card);
    }

    nextPageToken = data.nextPageToken;
  } while (nextPageToken);
}

fetchAllPlaylistVideos(playlists.full, "fullVideoGrid");
fetchAllPlaylistVideos(playlists.shorts, "shortVideoGrid");

// ✅ Dark Mode Toggle
const toggle = document.getElementById('darkModeToggle');
toggle.addEventListener('change', () => {
  document.body.classList.toggle('dark-mode');
});

// ✅ Blog Modal SPA Popup
const modal = document.getElementById('blogModal');
const modalTitle = document.getElementById('modalTitle');
const modalDate = document.getElementById('modalDate');
const modalContent = document.getElementById('modalContent');
const closeBtn = document.querySelector('.close-btn');

document.querySelectorAll('.read-more').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const card = link.closest('.blog-card');
    modalTitle.textContent = card.getAttribute('data-title');
    modalDate.textContent = card.getAttribute('data-date');
    modalContent.textContent = card.getAttribute('data-content');
    modal.style.display = 'flex';
  });
});

closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target === modal) modal.style.display = 'none';
});