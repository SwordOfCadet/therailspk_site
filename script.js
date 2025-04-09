// ✅ Smooth Scroll Effect for Navbar Links
document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href").substring(1);
        document.getElementById(targetId).scrollIntoView({ behavior: "smooth" });
    });
});

// ✅ Image Carousel Auto-Slide
document.addEventListener("DOMContentLoaded", function () {
    let imageCarousel = new bootstrap.Carousel(document.getElementById("imageCarousel"), {
        interval: 3000,
        ride: "carousel"
    });
});

// ✅ YouTube API Integration with Load More Feature
const API_KEY = "AIzaSyAJySKdCS1_BNrvFAf6hGtvMbU0TLgO_7w";  
const CHANNEL_ID = "UC0jiPBcE-2QbiBLt2m3MHSQ";  
let nextPageToken = ""; // To store next page token for pagination

let totalVideosLoaded = 0; // Track number of videos loaded

// ✅ Fetch Videos Function
async function fetchVideos(loadMore = false) {
    try {
        let apiURL = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=6`;

        if (loadMore && nextPageToken) {
            apiURL += `&pageToken=${nextPageToken}`;
        }

        const response = await fetch(apiURL);
        if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);

        const data = await response.json();
        console.log("API Response:", data); // Debugging Line

        nextPageToken = data.nextPageToken || "";

        if (!data.items || data.items.length === 0) {
            console.warn("No videos found.");
            return;
        }

        const videosContainer = document.getElementById("videosContainer");

        data.items.forEach(video => {
            if (video.id.videoId) {
                const videoElement = document.createElement("div");
                videoElement.classList.add("video-item");

                videoElement.innerHTML = `
                    <iframe width="100%" height="200" src="https://www.youtube.com/embed/${video.id.videoId}" frameborder="0" allowfullscreen></iframe>
                    <p>${video.snippet.title}</p>
                `;

                videosContainer.appendChild(videoElement);
            }
        });

        // Hide Load More button if no more videos are available
        if (!nextPageToken) {
            document.getElementById("loadMoreBtn").style.display = "none";
        }

    } catch (error) {
        console.error("YouTube API Error:", error);
    }
}

// ✅ Load Initial Videos on Page Load
document.addEventListener("DOMContentLoaded", () => fetchVideos());

// ✅ Load More Button Event
document.getElementById("loadMoreBtn").addEventListener("click", function () {
    fetchVideos(true);
});

document.addEventListener("DOMContentLoaded", function () {
    const blogCards = document.querySelectorAll(".blog-card");
    const blogPreview = document.getElementById("blogPreview");
    const previewImage = document.getElementById("previewImage");
    const previewTitle = document.getElementById("previewTitle");
    const previewDescription = document.getElementById("previewDescription");

    blogCards.forEach(card => {
        card.addEventListener("mouseenter", function () {
            // Get data attributes
            const title = this.getAttribute("data-title");
            const image = this.getAttribute("data-image");
            const description = this.getAttribute("data-description");

            // Update Preview Box
            previewTitle.innerText = title;
            previewImage.src = image;
            previewDescription.innerText = description;
            blogPreview.classList.remove("hidden");
        });

        card.addEventListener("mouseleave", function () {
            blogPreview.classList.add("hidden"); // Hide preview on mouse leave
        });
    });
});

var quill = new Quill('#editor-container', {
    theme: 'snow',
    modules: {
        toolbar: '#toolbar-container'
    }
});

function savePost() {
    var content = quill.root.innerHTML;
    console.log("Saved Post:", content);
    alert("Post Saved Successfully!");
}