let selectedMemoryDay = "all";
let memoriesCache = [];

const TRIP_CODE = "NZ2026";

function getMemoriesText() {
  return {
    en: {
      subtitle: "Family Travel Scrapbook",
      title: "Memories",
      desc: "Upload and view family trip photos from your New Zealand adventure.",
      uploadTitle: "Upload Memories",
      uploadDesc: "Choose a trip day, add your name, and upload photos.",
      dayLabel: "Trip Day",
      nameLabel: "Your Name",
      captionLabel: "Caption",
      fileLabel: "Photos",
      namePlaceholder: "e.g. Sherie",
      captionPlaceholder: "Optional caption...",
      uploadButton: "Upload Photos",
      uploading: "Uploading...",
      albumsTitle: "Albums by Day",
      galleryTitle: "Photo Gallery",
      allDays: "All Days",
      noPhotos: "No photos uploaded yet.",
      noPhotosDesc: "Upload your first memory to start the scrapbook.",
      photos: "photos",
      photo: "photo",
      uploadedBy: "Uploaded by",
      untitled: "Untitled memory",
      deletePhoto: "Delete Photo"
    },

    zh: {
      subtitle: "家庭旅行相册",
      title: "回忆",
      desc: "上传并查看新西兰家庭旅行照片。",
      uploadTitle: "上传回忆",
      uploadDesc: "选择旅行日期，填写名字，然后上传照片。",
      dayLabel: "旅行天数",
      nameLabel: "你的名字",
      captionLabel: "文字说明",
      fileLabel: "照片",
      namePlaceholder: "例如：Sherie",
      captionPlaceholder: "可填写照片说明...",
      uploadButton: "上传照片",
      uploading: "上传中...",
      albumsTitle: "每日相册",
      galleryTitle: "照片图库",
      allDays: "全部天数",
      noPhotos: "还没有上传照片。",
      noPhotosDesc: "上传第一张照片，开始记录旅行回忆。",
      photos: "张照片",
      photo: "张照片",
      uploadedBy: "上传者",
      untitled: "未命名回忆",
      deletePhoto: "删除照片"
    }
  }[language];
}

function getFirebaseReady() {
  return window.nzFirebase && window.nzFirebase.getUser();
}

function getDayFolder(dayNumber) {
  return String(dayNumber).padStart(2, "0");
}

function getDayTitle(dayNumber) {
  const day = tripData.days.find(item => item.day === Number(dayNumber));

  if (!day) {
    return `Day ${dayNumber}`;
  }

  return `Day ${day.day} · ${day.city}`;
}

async function loadMemories() {
  if (!getFirebaseReady()) {
    return [];
  }

  const snapshot = await window.nzFirebase.db
    .collection("trips")
    .doc(TRIP_CODE)
    .collection("memories")
    .orderBy("createdAt", "desc")
    .get();

  memoriesCache = snapshot.docs
    .map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    .filter(memory => memory.url);

  return memoriesCache;
}

function getFilteredMemories() {
  if (selectedMemoryDay === "all") {
    return memoriesCache;
  }

  return memoriesCache.filter(memory => {
    return Number(memory.day) === Number(selectedMemoryDay);
  });
}

function getAlbumCount(dayNumber) {
  return memoriesCache.filter(memory => {
    return Number(memory.day) === Number(dayNumber);
  }).length;
}

function getAlbumCover(dayNumber) {
  const memory = memoriesCache.find(memory => {
    return Number(memory.day) === Number(dayNumber);
  });

  return memory ? memory.url : "";
}

function compressImage(file, maxWidth = 1600, quality = 0.82) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = event => {
      const image = new Image();

      image.onload = () => {
        let width = image.width;
        let height = image.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0, width, height);

        canvas.toBlob(
          blob => {
            if (!blob) {
              reject(new Error("Image compression failed."));
              return;
            }

            resolve(blob);
          },
          "image/jpeg",
          quality
        );
      };

      image.onerror = () => {
        reject(new Error("Could not load image."));
      };

      image.src = event.target.result;
    };

    reader.onerror = () => {
      reject(new Error("Could not read file."));
    };

    reader.readAsDataURL(file);
  });
}

async function uploadMemoryPhotos(files, day, uploaderName, caption, statusElement, container) {
  if (!getFirebaseReady()) {
    alert("Firebase is still connecting. Please wait a few seconds and try again.");
    return;
  }

  if (!files || files.length === 0) {
    alert("Please choose at least one photo.");
    return;
  }

  const user = window.nzFirebase.getUser();
  const uploadedAt = Date.now();

  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    if (!file.type.startsWith("image/")) {
      continue;
    }

    statusElement.textContent = `Uploading ${i + 1} / ${files.length}...`;

    const compressedBlob = await compressImage(file);

    const safeFileName = file.name
      .replace(/\s+/g, "-")
      .replace(/[^a-zA-Z0-9._-]/g, "");

    const fileName = `${uploadedAt}-${i + 1}-${safeFileName}.jpg`;
    const dayFolder = getDayFolder(day);

    const storagePath = `trips/${TRIP_CODE}/day${dayFolder}/${fileName}`;
    const storageRef = window.nzFirebase.storage.ref(storagePath);

    await storageRef.put(compressedBlob, {
      contentType: "image/jpeg"
    });

    const downloadUrl = await storageRef.getDownloadURL();

    await window.nzFirebase.db
      .collection("trips")
      .doc(TRIP_CODE)
      .collection("memories")
      .add({
        tripCode: TRIP_CODE,
        day: Number(day),
        uploaderName: uploaderName || "Family",
        caption: caption || "",
        url: downloadUrl,
        storagePath: storagePath,
        originalFileName: file.name,
        fileType: "image",
        createdBy: user.uid,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
  }

  statusElement.textContent = "Upload complete ✅";

  await loadMemories();
  renderMemoriesPage(container);
}

function openMemoryModal(memoryId, container) {
  const t = getMemoriesText();
  const memory = memoriesCache.find(item => item.id === memoryId);

  if (!memory) {
    return;
  }

  const modal = document.createElement("div");
  modal.className = "memory-modal";

  modal.innerHTML = `
    <div class="memory-modal-backdrop"></div>

    <div class="memory-modal-content">
      <button type="button" class="memory-modal-close">×</button>

      <img src="${memory.url}" alt="${memory.caption || "Trip memory"}" />

      <div class="memory-modal-info">
        <p>${getDayTitle(memory.day)}</p>
        <h2>${memory.caption || t.untitled}</h2>
        <span>${t.uploadedBy} ${memory.uploaderName || "Family"}</span>

        <button type="button" class="memory-modal-delete">
          ${t.deletePhoto}
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  modal.querySelector(".memory-modal-close").addEventListener("click", () => {
    modal.remove();
  });

  modal.querySelector(".memory-modal-backdrop").addEventListener("click", () => {
    modal.remove();
  });

  modal.querySelector(".memory-modal-delete").addEventListener("click", async () => {
    const deleted = await deleteMemory(memory, container);

    if (deleted) {
      modal.remove();
    }
  });
}

async function deleteMemory(memory, container) {
  const confirmDelete = confirm("Delete this photo?");

  if (!confirmDelete) {
    return false;
  }

  try {
    if (!memory.storagePath) {
      alert("This photo has no Storage path, so only the database record can be removed.");
      return false;
    }

    // Delete the actual image file from Firebase Storage first
    await window.nzFirebase.storage
      .ref(memory.storagePath)
      .delete();

    // Delete the Firestore record only after Storage delete succeeds
    await window.nzFirebase.db
      .collection("trips")
      .doc(TRIP_CODE)
      .collection("memories")
      .doc(memory.id)
      .delete();

    await loadMemories();
    renderMemoriesPage(container);

    return true;
  } catch (error) {
    console.error("Delete failed:", error);
    alert("Delete failed. Check the console. The photo was not fully deleted.");
    return false;
  }
}

async function renderMemoriesPage(container) {
  const t = getMemoriesText();

  container.innerHTML = `
    <section class="memories-page">
      <section class="memories-hero">
        <div>
          <p class="memories-subtitle">${t.subtitle}</p>
          <h1>${t.title}</h1>
          <p>${t.desc}</p>
        </div>

        <div class="memory-trip-code">
          <span>Trip Code</span>
          <strong>${TRIP_CODE}</strong>
        </div>
      </section>

      <section class="memories-loading-card">
        <p>Loading memories...</p>
      </section>
    </section>
  `;

  if (!getFirebaseReady()) {
    setTimeout(() => {
      renderMemoriesPage(container);
    }, 800);

    return;
  }

  await loadMemories();

  const filteredMemories = getFilteredMemories();

  container.innerHTML = `
    <section class="memories-page">

      <section class="memories-hero">
        <div>
          <p class="memories-subtitle">${t.subtitle}</p>
          <h1>${t.title}</h1>
          <p>${t.desc}</p>
        </div>

        <div class="memory-trip-code">
          <span>Trip Code</span>
          <strong>${TRIP_CODE}</strong>
        </div>
      </section>

      <section class="memory-upload-card">
        <div>
          <h2>${t.uploadTitle}</h2>
          <p>${t.uploadDesc}</p>
        </div>

        <form id="memoryUploadForm" class="memory-upload-form">
          <div class="form-row">
            <label>
              ${t.dayLabel}
              <select id="memoryDaySelect">
                ${tripData.days.map(day => `
                  <option value="${day.day}">
                    Day ${day.day} · ${day.city}
                  </option>
                `).join("")}
              </select>
            </label>

            <label>
              ${t.nameLabel}
              <input
                type="text"
                id="memoryUploaderName"
                placeholder="${t.namePlaceholder}"
              />
            </label>
          </div>

          <label>
            ${t.captionLabel}
            <input
              type="text"
              id="memoryCaption"
              placeholder="${t.captionPlaceholder}"
            />
          </label>

          <label>
            ${t.fileLabel}
            <input
              type="file"
              id="memoryFiles"
              accept="image/*"
              multiple
            />
          </label>

          <button type="submit" id="memoryUploadBtn">
            ${t.uploadButton}
          </button>

          <p class="upload-status" id="uploadStatus"></p>
        </form>
      </section>

      <section class="albums-section">
        <div class="section-title">
          <h2>${t.albumsTitle}</h2>
        </div>

        <div class="album-filter-row">
          <button
            class="album-filter ${selectedMemoryDay === "all" ? "active" : ""}"
            data-day="all"
          >
            🌍 ${t.allDays}
          </button>

          ${tripData.days.map(day => `
            <button
              class="album-filter ${Number(selectedMemoryDay) === Number(day.day) ? "active" : ""}"
              data-day="${day.day}"
            >
              Day ${day.day}
            </button>
          `).join("")}
        </div>

        <div class="album-grid">
          ${tripData.days.map(day => {
            const count = getAlbumCount(day.day);
            const cover = getAlbumCover(day.day);

            return `
              <button class="album-card" data-day="${day.day}">
                <div
                  class="album-cover ${cover ? "has-cover" : ""}"
                  style="${cover ? `background-image: url('${cover}')` : ""}"
                >
                  ${cover ? "" : "📷"}
                </div>

                <div class="album-body">
                  <p>Day ${day.day}</p>
                  <h3>${day.city}</h3>
                  <span>
                    ${count} ${count === 1 ? t.photo : t.photos}
                  </span>
                </div>
              </button>
            `;
          }).join("")}
        </div>
      </section>

      <section class="gallery-section">
        <div class="section-title">
          <h2>${t.galleryTitle}</h2>
          <p>
            ${selectedMemoryDay === "all" ? t.allDays : getDayTitle(selectedMemoryDay)}
          </p>
        </div>

        ${
          filteredMemories.length > 0
            ? `
              <div class="memory-gallery">
                ${filteredMemories.map(memory => `
                  <article class="memory-photo-card" data-id="${memory.id}">
                    <button
                      type="button"
                      class="memory-card-delete"
                      data-id="${memory.id}"
                      title="Delete photo"
                    >
                      ×
                    </button>

                    <img src="${memory.url}" alt="${memory.caption || "Trip memory"}" />

                    <div class="memory-photo-info">
                      <p>${getDayTitle(memory.day)}</p>
                      <h3>${memory.caption || t.untitled}</h3>
                      <span>${t.uploadedBy} ${memory.uploaderName || "Family"}</span>
                    </div>
                  </article>
                `).join("")}
              </div>
            `
            : `
              <article class="empty-memories">
                <h3>${t.noPhotos}</h3>
                <p>${t.noPhotosDesc}</p>
              </article>
            `
        }
      </section>

    </section>
  `;

  document.getElementById("memoryUploadForm").addEventListener("submit", async event => {
    event.preventDefault();

    const uploadButton = document.getElementById("memoryUploadBtn");
    const statusElement = document.getElementById("uploadStatus");

    const day = document.getElementById("memoryDaySelect").value;
    const uploaderName = document.getElementById("memoryUploaderName").value.trim();
    const caption = document.getElementById("memoryCaption").value.trim();
    const files = document.getElementById("memoryFiles").files;

    uploadButton.disabled = true;
    uploadButton.textContent = t.uploading;

    try {
      await uploadMemoryPhotos(files, day, uploaderName, caption, statusElement, container);
    } catch (error) {
      console.error(error);
      statusElement.textContent = "Upload failed. Check console.";
      uploadButton.disabled = false;
      uploadButton.textContent = t.uploadButton;
    }
  });

  document.querySelectorAll(".album-filter").forEach(button => {
    button.addEventListener("click", () => {
      selectedMemoryDay = button.dataset.day;
      renderMemoriesPage(container);
    });
  });

  document.querySelectorAll(".album-card").forEach(button => {
    button.addEventListener("click", () => {
      selectedMemoryDay = button.dataset.day;
      renderMemoriesPage(container);
    });
  });

  document.querySelectorAll(".memory-photo-card").forEach(card => {
    card.addEventListener("click", event => {
      if (event.target.closest(".memory-card-delete")) {
        return;
      }

      openMemoryModal(card.dataset.id, container);
    });
  });

  document.querySelectorAll(".memory-card-delete").forEach(button => {
    button.addEventListener("click", async event => {
      event.stopPropagation();

      const memory = memoriesCache.find(item => item.id === button.dataset.id);

      if (!memory) {
        return;
      }

      await deleteMemory(memory, container);
    });
  });
}