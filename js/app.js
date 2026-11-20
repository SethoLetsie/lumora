const fallbackCatalogue = [{"id": 1, "title": "The Last Horizon", "genre": "Adventure", "type": "Movie", "year": 2025, "duration": "2h 08m", "rating": "8.7", "description": "A fearless explorer follows a mysterious signal across an uncharted world, discovering that the greatest journey is the one that changes you.", "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=900&q=85", "trailer": "https://www.youtube.com/embed/aqz-KE-bpKQ", "featured": true}, {"id": 2, "title": "Midnight Protocol", "genre": "Thriller", "type": "Movie", "year": 2024, "duration": "1h 56m", "rating": "8.4", "description": "When a routine security update exposes a hidden conspiracy, one analyst has a single night to stop a global catastrophe.", "image": "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=900&q=85", "trailer": "https://www.youtube.com/embed/eRsGyueVLvQ"}, {"id": 3, "title": "Wild Earth", "genre": "Documentary", "type": "Documentary", "year": 2025, "duration": "52 min", "rating": "9.1", "description": "Journey through remarkable landscapes and meet the extraordinary wildlife that keeps our planet alive.", "image": "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=900&q=85", "trailer": "https://www.youtube.com/embed/R6MlUcmOul8"}, {"id": 4, "title": "Beyond the Code", "genre": "Education", "type": "Educational", "year": 2026, "duration": "44 min", "rating": "8.9", "description": "A beginner-friendly journey into the ideas, people and innovations shaping the digital world.", "image": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=85", "trailer": "https://www.youtube.com/embed/4eJVGqJhp40"}, {"id": 5, "title": "Neon District", "genre": "Action", "type": "Series", "year": 2025, "duration": "8 episodes", "rating": "8.5", "description": "In a city that never sleeps, a young mechanic gets pulled into a dangerous race for control of the streets.", "image": "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=900&q=85", "trailer": "https://www.youtube.com/embed/YE7VzlLtp-4"}, {"id": 6, "title": "Ocean of Secrets", "genre": "Documentary", "type": "Documentary", "year": 2024, "duration": "1h 12m", "rating": "8.8", "description": "Explore the deep ocean and uncover the hidden ecosystems thriving beneath the waves.", "image": "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=900&q=85", "trailer": "https://www.youtube.com/embed/aqz-KE-bpKQ"}, {"id": 7, "title": "The Silent Signal", "genre": "Thriller", "type": "Movie", "year": 2023, "duration": "1h 49m", "rating": "8.2", "description": "A radio host receives a message that should not exist, setting off a chain of events no one can explain.", "image": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=85", "trailer": "https://www.youtube.com/embed/eRsGyueVLvQ"}, {"id": 8, "title": "Small Steps, Big Ideas", "genre": "Education", "type": "Educational", "year": 2026, "duration": "36 min", "rating": "8.6", "description": "Short lessons that make big ideas in science, creativity and problem-solving easy to understand.", "image": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=85", "trailer": "https://www.youtube.com/embed/R6MlUcmOul8"}, {"id": 9, "title": "Kingdom of Ash", "genre": "Adventure", "type": "Movie", "year": 2024, "duration": "2h 14m", "rating": "8.3", "description": "An unlikely alliance must cross a forgotten kingdom to protect the last surviving city.", "image": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=900&q=85", "trailer": "https://www.youtube.com/embed/4eJVGqJhp40"}, {"id": 10, "title": "Velocity", "genre": "Action", "type": "Series", "year": 2026, "duration": "6 episodes", "rating": "8.7", "description": "A rising racing team fights for a place in the spotlight while navigating ambition, loyalty and risk.", "image": "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=85", "trailer": "https://www.youtube.com/embed/YE7VzlLtp-4"}, {"id": 11, "title": "Mountain Keepers", "genre": "Documentary", "type": "Documentary", "year": 2023, "duration": "48 min", "rating": "9.0", "description": "Meet the communities protecting mountain environments and preserving traditions for future generations.", "image": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=85", "trailer": "https://www.youtube.com/embed/aqz-KE-bpKQ"}, {"id": 12, "title": "Creative Minds", "genre": "Education", "type": "Educational", "year": 2025, "duration": "41 min", "rating": "8.5", "description": "Discover how designers, artists and inventors turn curiosity into meaningful creative work.", "image": "https://images.unsplash.com/photo-1455390582262-044c71d8f1b7?auto=format&fit=crop&w=900&q=85", "trailer": "https://www.youtube.com/embed/eRsGyueVLvQ"}];

let catalogue = [];
let selectedTitle = null;
let savedTitles = JSON.parse(localStorage.getItem("lumoraMyList") || "[]");

const catalogueGrid = document.getElementById("catalogueGrid");
const trendingGrid = document.getElementById("trendingGrid");
const myListGrid = document.getElementById("myListGrid");
const searchInput = document.getElementById("searchInput");
const genreFilter = document.getElementById("genreFilter");
const typeFilter = document.getElementById("typeFilter");
const resultsCount = document.getElementById("resultsCount");
const catalogueStatus = document.getElementById("catalogueStatus");
const emptyList = document.getElementById("emptyList");
const toastElement = document.getElementById("feedbackToast");
const feedbackToast = bootstrap.Toast.getOrCreateInstance(toastElement);

function showToast(message) {
  document.getElementById("toastMessage").textContent = message;
  feedbackToast.show();
}

function createCard(item, showActions = true) {
  const isSaved = savedTitles.includes(item.id);
  return `
    <article class="poster-card">
      <div class="poster-image" role="button" tabindex="0" aria-label="View details for ${item.title}" data-details="${item.id}">
        <img src="${item.image}" alt="Poster-style image for ${item.title}" loading="lazy"
          onerror="this.onerror=null;this.src='https://placehold.co/600x850/171b2d/ffffff?text=LUMORA';">
        <span class="poster-badge">${item.type.toUpperCase()}</span>
      </div>
      <div class="poster-info">
        <h3>${item.title}<span class="poster-rating">★ ${item.rating}</span></h3>
        <p>${item.genre} &nbsp;·&nbsp; ${item.year} &nbsp;·&nbsp; ${item.duration}</p>
      </div>
      ${showActions ? `<div class="card-actions">
        <button class="mini-action" data-details="${item.id}">View details</button>
        <button class="mini-action ${isSaved ? "saved" : ""}" data-save="${item.id}" aria-label="${isSaved ? "Remove" : "Add"} ${item.title} ${isSaved ? "from" : "to"} My List">${isSaved ? "✓ Saved" : "＋ My List"}</button>
      </div>` : ""}
    </article>`;
}

function renderTrending() {
  const trending = catalogue.filter(item => item.id !== 4 && item.id !== 8).slice(0, 4);
  trendingGrid.innerHTML = trending.map(item => createCard(item, true)).join("");
}

function renderCatalogue(items) {
  catalogueGrid.innerHTML = items.length
    ? items.map(item => createCard(item, true)).join("")
    : `<div class="empty-search"><h3>No titles found</h3><p>Try another search term or change your filters.</p></div>`;
  resultsCount.textContent = `${items.length} ${items.length === 1 ? "TITLE" : "TITLES"} FOUND`;
}

function filterCatalogue() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const selectedGenre = genreFilter.value;
  const selectedType = typeFilter.value;
  const filtered = catalogue.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm) ||
      item.description.toLowerCase().includes(searchTerm);
    const matchesGenre = selectedGenre === "all" || item.genre === selectedGenre;
    const matchesType = selectedType === "all" || item.type === selectedType;
    return matchesSearch && matchesGenre && matchesType;
  });
  renderCatalogue(filtered);
}

function renderMyList() {
  const savedItems = catalogue.filter(item => savedTitles.includes(item.id));
  myListGrid.innerHTML = savedItems.map(item => createCard(item, true)).join("");
  emptyList.style.display = savedItems.length ? "none" : "block";
  document.getElementById("navListCount").textContent = savedItems.length;
}

function toggleSaved(id) {
  if (savedTitles.includes(id)) {
    savedTitles = savedTitles.filter(savedId => savedId !== id);
    showToast("Removed from My List.");
  } else {
    savedTitles.push(id);
    showToast("Added to My List.");
  }
  localStorage.setItem("lumoraMyList", JSON.stringify(savedTitles));
  filterCatalogue();
  renderTrending();
  renderMyList();
  if (selectedTitle && selectedTitle.id === id) updateDetailSaveButton();
}

function openDetails(id) {
  selectedTitle = catalogue.find(item => item.id === Number(id));
  if (!selectedTitle) return;
  document.getElementById("detailImage").style.backgroundImage = `url("${selectedTitle.image}")`;
  document.getElementById("detailMeta").textContent = `${selectedTitle.type.toUpperCase()}  ·  ${selectedTitle.genre.toUpperCase()}  ·  ${selectedTitle.year}  ·  ${selectedTitle.duration}  ·  ★ ${selectedTitle.rating}`;
  document.getElementById("detailsTitle").textContent = selectedTitle.title;
  document.getElementById("detailDescription").textContent = selectedTitle.description;
  updateDetailSaveButton();
  bootstrap.Modal.getOrCreateInstance(document.getElementById("detailsModal")).show();
}

function updateDetailSaveButton() {
  const button = document.getElementById("detailSaveBtn");
  const isSaved = savedTitles.includes(selectedTitle.id);
  button.textContent = isSaved ? "✓ Remove from My List" : "＋ Add to My List";
}

function getTrailerLinks(trailerUrl) {
  const videoIdMatch = trailerUrl.match(/(?:embed\/|watch\?v=)([A-Za-z0-9_-]{6,})/);
  if (!videoIdMatch) {
    return { embed: trailerUrl, watch: trailerUrl };
  }

  const videoId = videoIdMatch[1];
  return {
    embed: `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`,
    watch: `https://www.youtube.com/watch?v=${videoId}`
  };
}

function playTrailer(item) {
  if (!item || !item.trailer) {
    showToast("A trailer is not available for this title yet.");
    return;
  }

  const trailerLinks = getTrailerLinks(item.trailer);
  const frame = document.getElementById("trailerFrame");
  const fallback = document.getElementById("trailerFallback");
  const fallbackLink = document.getElementById("trailerFallbackLink");
  document.getElementById("openTrailerLink").href = trailerLinks.watch;
  fallbackLink.href = trailerLinks.watch;

  // YouTube refuses to play embedded videos on pages opened straight from disk (file://),
  // which causes "Error 153". Show a clear fallback instead of a broken player.
  const openedFromDisk = window.location.protocol === "file:";
  fallback.hidden = !openedFromDisk;
  frame.parentElement.hidden = openedFromDisk;
  frame.src = openedFromDisk ? "about:blank" : trailerLinks.embed;

  bootstrap.Modal.getOrCreateInstance(document.getElementById("trailerModal")).show();
}

async function loadCatalogue() {
  catalogueStatus.textContent = "Loading the LUMORA collection...";
  try {
    const response = await fetch("data/catalogue.json");
    if (!response.ok) throw new Error("The catalogue file could not be loaded.");
    catalogue = await response.json();
    catalogueStatus.textContent = "";
  } catch (error) {
    catalogue = fallbackCatalogue;
    catalogueStatus.textContent = "Using the built-in sample catalogue because the JSON file could not be fetched in this environment.";
  }
  renderCatalogue(catalogue);
  renderTrending();
  renderMyList();
}

document.addEventListener("click", event => {
  const detailsButton = event.target.closest("[data-details]");
  const saveButton = event.target.closest("[data-save]");
  if (detailsButton) openDetails(detailsButton.dataset.details);
  if (saveButton) toggleSaved(Number(saveButton.dataset.save));
});

document.addEventListener("keydown", event => {
  if ((event.key === "Enter" || event.key === " ") && event.target.matches("[data-details]")) {
    event.preventDefault();
    openDetails(event.target.dataset.details);
  }
});

searchInput.addEventListener("input", filterCatalogue);
genreFilter.addEventListener("change", filterCatalogue);
typeFilter.addEventListener("change", filterCatalogue);

document.getElementById("clearFilters").addEventListener("click", () => {
  searchInput.value = "";
  genreFilter.value = "all";
  typeFilter.value = "all";
  filterCatalogue();
});

document.getElementById("heroWatchBtn").addEventListener("click", () => {
  const featured = catalogue.find(item => item.featured);
  playTrailer(featured);
});

document.getElementById("heroDetailsBtn").addEventListener("click", () => {
  const featured = catalogue.find(item => item.featured);
  if (featured) openDetails(featured.id);
});

document.getElementById("detailWatchBtn").addEventListener("click", () => {
  const item = selectedTitle;
  bootstrap.Modal.getInstance(document.getElementById("detailsModal")).hide();
  playTrailer(item);
});

document.getElementById("detailSaveBtn").addEventListener("click", () => {
  if (selectedTitle) toggleSaved(selectedTitle.id);
});

document.getElementById("trailerModal").addEventListener("hidden.bs.modal", () => {
  document.getElementById("trailerFrame").src = "about:blank";
  document.getElementById("openTrailerLink").href = "#";
  document.getElementById("trailerFallback").hidden = true;
});

document.getElementById("demoForm").addEventListener("submit", event => {
  event.preventDefault();
  const nameInput = document.getElementById("demoName");
  const emailInput = document.getElementById("demoEmail");
  const message = document.getElementById("formMessage");
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();

  if (name.length < 2) {
    message.textContent = "Please enter a display name with at least 2 characters.";
    message.className = "form-message error";
    nameInput.focus();
    return;
  }
  if (!emailInput.checkValidity() || email === "") {
    message.textContent = "Please enter a valid email address.";
    message.className = "form-message error";
    emailInput.focus();
    return;
  }
  message.textContent = `Welcome, ${name}! This is a successful demo validation. No account was created.`;
  message.className = "form-message";
  event.target.reset();
});

loadCatalogue();
