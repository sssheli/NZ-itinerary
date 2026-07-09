let selectedMemoryDay = "all";
let activeMemoryAlbum = null;
let memoriesCache = [];

let memoriesScrollPosition = {
  windowY: 0,
  pageContentY: 0
};

let shouldRestoreMemoriesScroll = false;

const TRIP_CODE = "NZ2026";
const MAX_VIDEO_SIZE = 250 * 1024 * 1024;


function saveMemoriesScrollPosition() {
  const pageContent = document.getElementById("pageContent");

  memoriesScrollPosition = {
    windowY: window.scrollY,
    pageContentY: pageContent ? pageContent.scrollTop : 0
  };

  shouldRestoreMemoriesScroll = true;
}


function restoreMemoriesScrollPosition() {
  if (!shouldRestoreMemoriesScroll) {
    return;
  }

  const savedPosition = { ...memoriesScrollPosition };
  shouldRestoreMemoriesScroll = false;

  const applySavedScroll = () => {
    const pageContent = document.getElementById("pageContent");

    window.scrollTo(0, savedPosition.windowY);

    if (pageContent) {
      pageContent.scrollTop = savedPosition.pageContentY;
    }
  };

  applySavedScroll();
  requestAnimationFrame(applySavedScroll);
}


function scrollMemoriesToTop() {
  const pageContent = document.getElementById("pageContent");

  window.scrollTo({
    top: 0,
    behavior: "auto"
  });

  if (pageContent) {
    pageContent.scrollTop = 0;
  }
}


function escapeHTML(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}


function getMemoriesText() {
  return {
    en: {
      subtitle: "Family Travel Scrapbook",
      title: "Memories",
      desc: "Upload and view family trip photos and videos from your New Zealand adventure.",

      uploadTitle: "Upload Memories",
      uploadDesc: "Choose a trip day, add your name, and upload photos or videos.",

      dayLabel: "Trip Day",
      nameLabel: "Your Name",
      captionLabel: "Caption",
      fileLabel: "Photos & Videos",

      namePlaceholder: "e.g. Sherie",
      captionPlaceholder: "Optional caption...",

      uploadButton: "Upload Photos & Videos",
      uploading: "Uploading...",

      albumsTitle: "Albums by Day",
      galleryTitle: "Memory Gallery",
      allDays: "All Days",

      noMemories: "No memories uploaded yet.",
      noMemoriesDesc: "Upload your first photo or video to start the scrapbook.",

      memory: "memory",
      memories: "memories",

      uploadedBy: "Uploaded by",
      untitled: "Untitled memory",
      deleteMemory: "Delete Memory",
      backToAlbums: "Back to Albums",

      uploadComplete: "Upload complete ✅",
      noValidFiles: "No valid photo or video files were selected.",
      videoTooLarge: "One or more videos were too large to upload."
    },

    zh: {
      subtitle: "家庭旅行相册",
      title: "回忆",
      desc: "上传并查看新西兰家庭旅行的照片和视频。",

      uploadTitle: "上传回忆",
      uploadDesc: "选择旅行日期，填写名字，然后上传照片或视频。",

      dayLabel: "旅行天数",
      nameLabel: "你的名字",
      captionLabel: "文字说明",
      fileLabel: "照片和视频",

      namePlaceholder: "例如：Sherie",
      captionPlaceholder: "可填写说明...",

      uploadButton: "上传照片和视频",
      uploading: "上传中...",

      albumsTitle: "每日相册",
      galleryTitle: "回忆图库",
      allDays: "全部天数",

      noMemories: "还没有上传回忆。",
      noMemoriesDesc: "上传第一张照片或视频，开始记录旅行回忆。",

      memory: "个回忆",
      memories: "个回忆",

      uploadedBy: "上传者",
      untitled: "未命名回忆",
      deleteMemory: "删除回忆",
      backToAlbums: "返回相册",

      uploadComplete: "上传完成 ✅",
      noValidFiles: "没有选择有效的照片或视频。",
      videoTooLarge: "一个或多个视频太大，无法上传。"
    }
  }[language];
}


function getFirebaseReady() {
  return Boolean(
    window.nzFirebase &&
    window.nzFirebase.getUser()
  );
}


function getDayFolder(dayNumber) {
  return String(dayNumber).padStart(2, "0");
}


function getDayTitle(dayNumber) {
  const day = tripData.days.find(item => {
    return Number(item.day) === Number(dayNumber);
  });

  if (!day) {
    return language === "zh"
      ? `第 ${dayNumber} 天`
      : `Day ${dayNumber}`;
  }

  if (language === "zh") {
    return `第 ${day.day} 天 · ${day.city}`;
  }

  return `Day ${day.day} · ${day.city}`;
}


function getMemoryDate(memory) {
  const timestamp = memory.createdAt;

  if (
    timestamp &&
    typeof timestamp.toDate === "function"
  ) {
    return timestamp.toDate();
  }

  if (
    timestamp &&
    typeof timestamp.seconds === "number"
  ) {
    return new Date(timestamp.seconds * 1000);
  }

  if (memory.createdAtClient) {
    return new Date(memory.createdAtClient);
  }

  return null;
}


function formatMemoryDate(memory) {
  const date = getMemoryDate(memory);

  if (!date || Number.isNaN(date.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat(
    language === "zh" ? "zh-SG" : "en-SG",
    {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Pacific/Auckland"
    }
  ).format(date);
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
  const memory = memoriesCache.find(item => {
    return (
      Number(item.day) === Number(dayNumber) &&
      item.fileType !== "video"
    );
  });

  return memory ? memory.url : "";
}


function albumHasVideo(dayNumber) {
  return memoriesCache.some(memory => {
    return (
      Number(memory.day) === Number(dayNumber) &&
      memory.fileType === "video"
    );
  });
}


function compressImage(
  file,
  maxWidth = 1600,
  quality = 0.82
) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = event => {
      const image = new Image();

      image.onload = () => {
        let width = image.width;
        let height = image.height;

        if (width > maxWidth) {
          height = Math.round(
            (height * maxWidth) / width
          );

          width = maxWidth;
        }

        const canvas = document.createElement("canvas");

        canvas.width = width;
        canvas.height = height;

        const context = canvas.getContext("2d");

        if (!context) {
          reject(
            new Error("Could not create image canvas.")
          );

          return;
        }

        context.drawImage(
          image,
          0,
          0,
          width,
          height
        );

        canvas.toBlob(
          blob => {
            if (!blob) {
              reject(
                new Error("Image compression failed.")
              );

              return;
            }

            resolve(blob);
          },
          "image/jpeg",
          quality
        );
      };

      image.onerror = () => {
        reject(
          new Error("Could not load image.")
        );
      };

      image.src = event.target.result;
    };

    reader.onerror = () => {
      reject(
        new Error("Could not read file.")
      );
    };

    reader.readAsDataURL(file);
  });
}


function getMemoryCardMedia(memory) {
  const safeUrl = escapeHTML(memory.url);

  const safeAlt = escapeHTML(
    memory.caption || "Trip memory"
  );

  if (memory.fileType === "video") {
    return `
      <div class="memory-video-preview">
        <video
          src="${safeUrl}"
          muted
          preload="metadata"
          playsinline
        ></video>

        <span class="memory-video-badge">
          ▶
        </span>
      </div>
    `;
  }

  return `
    <img
      src="${safeUrl}"
      alt="${safeAlt}"
      loading="lazy"
    />
  `;
}


async function uploadMemoryFiles(
  files,
  day,
  uploaderName,
  caption,
  statusElement,
  container
) {
  const t = getMemoriesText();

  if (!getFirebaseReady()) {
    alert(
      "Firebase is still connecting. Please wait a few seconds and try again."
    );

    return;
  }

  if (!files || files.length === 0) {
    alert(
      "Please choose at least one photo or video."
    );

    return;
  }

  const user = window.nzFirebase.getUser();
  const uploadedAt = Date.now();

  let validFileCount = 0;
  let oversizedVideoCount = 0;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    const isImage =
      file.type.startsWith("image/");

    const isVideo =
      file.type.startsWith("video/");

    if (!isImage && !isVideo) {
      continue;
    }

    if (
      isVideo &&
      file.size > MAX_VIDEO_SIZE
    ) {
      oversizedVideoCount++;
      continue;
    }

    validFileCount++;

    statusElement.textContent =
      `Uploading ${i + 1} / ${files.length}...`;

    const originalNameWithoutExtension =
      file.name.replace(/\.[^/.]+$/, "");

    const safeBaseName =
      originalNameWithoutExtension
        .replace(/\s+/g, "-")
        .replace(/[^a-zA-Z0-9_-]/g, "") ||
      "memory";

    let uploadData;
    let contentType;
    let fileExtension;
    let fileType;

    if (isImage) {
      uploadData =
        await compressImage(file);

      contentType = "image/jpeg";
      fileExtension = "jpg";
      fileType = "image";
    } else {
      uploadData = file;

      contentType =
        file.type || "video/mp4";

      fileExtension =
        file.name.includes(".")
          ? file.name
              .split(".")
              .pop()
              .toLowerCase()
          : "mp4";

      fileType = "video";
    }

    const fileName =
      `${uploadedAt}-${i + 1}-${safeBaseName}.${fileExtension}`;

    const dayFolder =
      getDayFolder(day);

    const storagePath =
      `trips/${TRIP_CODE}/day${dayFolder}/${fileName}`;

    const storageReference =
      window.nzFirebase.storage.ref(storagePath);

    await storageReference.put(
      uploadData,
      {
        contentType
      }
    );

    const downloadUrl =
      await storageReference.getDownloadURL();

    await window.nzFirebase.db
      .collection("trips")
      .doc(TRIP_CODE)
      .collection("memories")
      .add({
        tripCode: TRIP_CODE,

        day: Number(day),

        uploaderName:
          uploaderName || "Family",

        caption:
          caption || "",

        url:
          downloadUrl,

        storagePath,

        originalFileName:
          file.name,

        fileType,

        contentType,

        createdBy:
          user.uid,

        createdAtClient:
          new Date().toISOString(),

        createdAt:
          firebase.firestore
            .FieldValue
            .serverTimestamp()
      });
  }

  if (validFileCount === 0) {
    statusElement.textContent =
      oversizedVideoCount > 0
        ? t.videoTooLarge
        : t.noValidFiles;

    return;
  }

  statusElement.textContent =
    oversizedVideoCount > 0
      ? `${t.uploadComplete} ${t.videoTooLarge}`
      : t.uploadComplete;

  selectedMemoryDay = String(day);

  await loadMemories();
  await renderMemoriesPage(container);
}


function openMemoryModal(
  memoryId,
  container
) {
  const t = getMemoriesText();

  const memory = memoriesCache.find(item => {
    return item.id === memoryId;
  });

  if (!memory) {
    return;
  }

  const safeUrl =
    escapeHTML(memory.url);

  const safeCaption =
    escapeHTML(
      memory.caption || t.untitled
    );

  const safeUploader =
    escapeHTML(
      memory.uploaderName || "Family"
    );

  const uploadDate =
    formatMemoryDate(memory);

  const mediaMarkup =
    memory.fileType === "video"
      ? `
          <video
            class="memory-modal-media"
            src="${safeUrl}"
            controls
            autoplay
            playsinline
          ></video>
        `
      : `
          <img
            class="memory-modal-media"
            src="${safeUrl}"
            alt="${safeCaption}"
          />
        `;

  const modal =
    document.createElement("div");

  modal.className = "memory-modal";

  modal.innerHTML = `
    <div class="memory-modal-backdrop"></div>

    <div class="memory-modal-content">
      <button
        type="button"
        class="memory-modal-close"
        aria-label="Close memory"
      >
        ×
      </button>

      ${mediaMarkup}

      <div class="memory-modal-info">
        <p>
          ${getDayTitle(memory.day)}
        </p>

        <h2>
          ${safeCaption}
        </h2>

        <span>
          ${t.uploadedBy} ${safeUploader}
        </span>

        ${
          uploadDate
            ? `
                <small class="memory-upload-time">
                  ${escapeHTML(uploadDate)} · NZ time
                </small>
              `
            : ""
        }

        <button
          type="button"
          class="memory-modal-delete"
        >
          ${t.deleteMemory}
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  const handleEscape = event => {
    if (event.key === "Escape") {
      closeModal();
    }
  };

  const closeModal = () => {
    document.removeEventListener(
      "keydown",
      handleEscape
    );

    modal.remove();
  };

  document.addEventListener(
    "keydown",
    handleEscape
  );

  modal
    .querySelector(".memory-modal-close")
    .addEventListener(
      "click",
      closeModal
    );

  modal
    .querySelector(".memory-modal-backdrop")
    .addEventListener(
      "click",
      closeModal
    );

  modal
    .querySelector(".memory-modal-delete")
    .addEventListener(
      "click",
      async () => {
        saveMemoriesScrollPosition();

        const deleted =
          await deleteMemory(
            memory,
            container
          );

        if (deleted) {
          closeModal();
        }
      }
    );
}


async function deleteMemory(
  memory,
  container
) {
  const confirmDelete =
    confirm("Delete this memory?");

  if (!confirmDelete) {
    return false;
  }

  try {
    if (!memory.storagePath) {
      throw new Error(
        "This memory does not contain a Firebase Storage path."
      );
    }

    try {
      await window.nzFirebase.storage
        .ref(memory.storagePath)
        .delete();
    } catch (storageError) {
      if (
        storageError.code !==
        "storage/object-not-found"
      ) {
        throw storageError;
      }
    }

    await window.nzFirebase.db
      .collection("trips")
      .doc(TRIP_CODE)
      .collection("memories")
      .doc(memory.id)
      .delete();

    await loadMemories();
    await renderMemoriesPage(container);

    return true;
  } catch (error) {
    console.error(
      "Delete failed:",
      error
    );

    alert(
      "Delete failed. The memory was not completely deleted. Check the console."
    );

    return false;
  }
}


function renderMemoryCard(
  memory,
  t
) {
  const safeCaption =
    escapeHTML(
      memory.caption || t.untitled
    );

  const safeUploader =
    escapeHTML(
      memory.uploaderName || "Family"
    );

  const uploadDate =
    formatMemoryDate(memory);

  return `
    <article
      class="memory-photo-card"
      data-id="${escapeHTML(memory.id)}"
    >
      <button
        type="button"
        class="memory-card-delete"
        data-id="${escapeHTML(memory.id)}"
        title="Delete memory"
      >
        ×
      </button>

      ${getMemoryCardMedia(memory)}

      <div class="memory-photo-info">
        <p>
          ${getDayTitle(memory.day)}
        </p>

        <h3>
          ${safeCaption}
        </h3>

        <span>
          ${t.uploadedBy} ${safeUploader}
        </span>

        ${
          uploadDate
            ? `
                <small class="memory-upload-time">
                  ${escapeHTML(uploadDate)} · NZ time
                </small>
              `
            : ""
        }
      </div>
    </article>
  `;
}


function attachMemoryCardEvents(
  container
) {
  document
    .querySelectorAll(".memory-photo-card")
    .forEach(card => {
      card.addEventListener(
        "click",
        event => {
          if (
            event.target.closest(
              ".memory-card-delete"
            )
          ) {
            return;
          }

          openMemoryModal(
            card.dataset.id,
            container
          );
        }
      );
    });

  document
    .querySelectorAll(".memory-card-delete")
    .forEach(button => {
      button.addEventListener(
        "click",
        async event => {
          event.stopPropagation();

          const memory =
            memoriesCache.find(item => {
              return (
                item.id ===
                button.dataset.id
              );
            });

          if (!memory) {
            return;
          }

          saveMemoriesScrollPosition();

          await deleteMemory(
            memory,
            container
          );
        }
      );
    });
}


function renderMemoryAlbumView(
  container
) {
  const t = getMemoriesText();

  const day = tripData.days.find(item => {
    return (
      Number(item.day) ===
      Number(activeMemoryAlbum)
    );
  });

  if (!day) {
    activeMemoryAlbum = null;

    renderMemoriesPage(container);

    return;
  }

  const albumMemories =
    memoriesCache.filter(memory => {
      return (
        Number(memory.day) ===
        Number(day.day)
      );
    });

  container.innerHTML = `
    <section class="memories-page">
      <section
        class="memory-album-hero"
        style="background-image: url('${escapeHTML(day.banner)}')"
      >
        <div class="memory-album-overlay">
          <button
            type="button"
            class="back-to-albums-btn"
            id="backToAlbumsBtn"
          >
            ← ${t.backToAlbums}
          </button>

          <div>
            <p>
              ${getDayTitle(day.day)}
              ·
              ${escapeHTML(day.displayDate)}
            </p>

            <h1>
              ${escapeHTML(day.city)}
            </h1>

            <span>
              ${albumMemories.length}
              ${
                albumMemories.length === 1
                  ? t.memory
                  : t.memories
              }
            </span>
          </div>
        </div>
      </section>

      ${
        albumMemories.length > 0
          ? `
              <section class="memory-album-gallery">
                ${albumMemories
                  .map(memory => {
                    return renderMemoryCard(
                      memory,
                      t
                    );
                  })
                  .join("")}
              </section>
            `
          : `
              <article class="empty-memories album-empty-state">
                <div class="empty-memory-icon">
                  📷
                </div>

                <h3>
                  ${t.noMemories}
                </h3>

                <p>
                  ${t.noMemoriesDesc}
                </p>
              </article>
            `
      }
    </section>
  `;

  document
    .getElementById("backToAlbumsBtn")
    .addEventListener(
      "click",
      async () => {
        activeMemoryAlbum = null;
        selectedMemoryDay = "all";

        await renderMemoriesPage(container);

        scrollMemoriesToTop();
      }
    );

  attachMemoryCardEvents(container);

  restoreMemoriesScrollPosition();
}


async function renderMemoriesPage(
  container
) {
  const t = getMemoriesText();

  const shouldKeepCurrentPage =
    shouldRestoreMemoriesScroll &&
    container.innerHTML.trim() !== "";

  if (!shouldKeepCurrentPage) {
    container.innerHTML = `
      <section class="memories-page">
        <section class="memories-hero">
          <div>
            <p class="memories-subtitle">
              ${t.subtitle}
            </p>

            <h1>
              ${t.title}
            </h1>

            <p>
              ${t.desc}
            </p>
          </div>

          <div class="memory-trip-code">
            <span>
              Trip Code
            </span>

            <strong>
              ${TRIP_CODE}
            </strong>
          </div>
        </section>

        <section class="memories-loading-card">
          <p>
            Loading memories...
          </p>
        </section>
      </section>
    `;
  }

  if (!getFirebaseReady()) {
    setTimeout(() => {
      if (
        document.body.contains(container)
      ) {
        renderMemoriesPage(container);
      }
    }, 800);

    return;
  }

  try {
    await loadMemories();
  } catch (error) {
    console.error(
      "Could not load memories:",
      error
    );

    container.innerHTML = `
      <section class="memories-page">
        <article class="empty-memories">
          <h3>
            Could not load memories
          </h3>

          <p>
            Please refresh the page and try again.
          </p>
        </article>
      </section>
    `;

    return;
  }

  const filteredMemories =
    getFilteredMemories();

  const displayedAlbumDays =
    selectedMemoryDay === "all"
      ? tripData.days
      : tripData.days.filter(day => {
          return (
            Number(day.day) ===
            Number(selectedMemoryDay)
          );
        });

  if (activeMemoryAlbum !== null) {
    renderMemoryAlbumView(container);

    return;
  }

  container.innerHTML = `
    <section class="memories-page">
      <section class="memories-hero">
        <div>
          <p class="memories-subtitle">
            ${t.subtitle}
          </p>

          <h1>
            ${t.title}
          </h1>

          <p>
            ${t.desc}
          </p>
        </div>

        <div class="memory-trip-code">
          <span>
            Trip Code
          </span>

          <strong>
            ${TRIP_CODE}
          </strong>
        </div>
      </section>


      <section class="memory-upload-card">
        <div>
          <h2>
            ${t.uploadTitle}
          </h2>

          <p>
            ${t.uploadDesc}
          </p>
        </div>

        <form
          id="memoryUploadForm"
          class="memory-upload-form"
        >
          <div class="form-row">
            <label>
              ${t.dayLabel}

              <select id="memoryDaySelect">
                ${tripData.days
                  .map(day => {
                    return `
                      <option value="${day.day}">
                        Day ${day.day}
                        ·
                        ${escapeHTML(day.city)}
                      </option>
                    `;
                  })
                  .join("")}
              </select>
            </label>

            <label>
              ${t.nameLabel}

              <input
                type="text"
                id="memoryUploaderName"
                placeholder="${escapeHTML(t.namePlaceholder)}"
              />
            </label>
          </div>

          <label>
            ${t.captionLabel}

            <input
              type="text"
              id="memoryCaption"
              placeholder="${escapeHTML(t.captionPlaceholder)}"
            />
          </label>

          <label>
            ${t.fileLabel}

            <input
              type="file"
              id="memoryFiles"
              accept="image/*,video/*"
              multiple
            />
          </label>

          <button
            type="submit"
            id="memoryUploadBtn"
          >
            ${t.uploadButton}
          </button>

          <p
            class="upload-status"
            id="uploadStatus"
          ></p>
        </form>
      </section>


      <section class="albums-section">
        <div class="section-title">
          <h2>
            ${t.albumsTitle}
          </h2>
        </div>

        <div class="album-filter-row">
          <button
            type="button"
            class="album-filter ${
              selectedMemoryDay === "all"
                ? "active"
                : ""
            }"
            data-day="all"
          >
            🌍 ${t.allDays}
          </button>

          ${tripData.days
            .map(day => {
              return `
                <button
                  type="button"
                  class="album-filter ${
                    Number(selectedMemoryDay) ===
                    Number(day.day)
                      ? "active"
                      : ""
                  }"
                  data-day="${day.day}"
                >
                  Day ${day.day}
                </button>
              `;
            })
            .join("")}
        </div>

        <div class="album-grid">
          ${displayedAlbumDays
            .map(day => {
              const count =
                getAlbumCount(day.day);

              const cover =
                getAlbumCover(day.day);

              const videoOnly =
                !cover &&
                albumHasVideo(day.day);

              return `
                <button
                  type="button"
                  class="album-card"
                  data-day="${day.day}"
                >
                  <div
                    class="album-cover ${
                      cover
                        ? "has-cover"
                        : ""
                    }"
                    style="${
                      cover
                        ? `background-image: url('${escapeHTML(cover)}')`
                        : ""
                    }"
                  >
                    ${
                      cover
                        ? ""
                        : videoOnly
                          ? "🎥"
                          : "📷"
                    }
                  </div>

                  <div class="album-body">
                    <p>
                      Day ${day.day}
                    </p>

                    <h3>
                      ${escapeHTML(day.city)}
                    </h3>

                    <span>
                      ${count}
                      ${
                        count === 1
                          ? t.memory
                          : t.memories
                      }
                    </span>
                  </div>
                </button>
              `;
            })
            .join("")}
        </div>
      </section>


      <section class="gallery-section">
        <div class="section-title">
          <h2>
            ${t.galleryTitle}
          </h2>

          <p>
            ${
              selectedMemoryDay === "all"
                ? t.allDays
                : getDayTitle(
                    selectedMemoryDay
                  )
            }
          </p>
        </div>

        ${
          filteredMemories.length > 0
            ? `
                <div class="memory-gallery">
                  ${filteredMemories
                    .map(memory => {
                      return renderMemoryCard(
                        memory,
                        t
                      );
                    })
                    .join("")}
                </div>
              `
            : `
                <article class="empty-memories">
                  <h3>
                    ${t.noMemories}
                  </h3>

                  <p>
                    ${t.noMemoriesDesc}
                  </p>
                </article>
              `
        }
      </section>
    </section>
  `;


  document
    .getElementById("memoryUploadForm")
    .addEventListener(
      "submit",
      async event => {
        event.preventDefault();

        const uploadButton =
          document.getElementById(
            "memoryUploadBtn"
          );

        const statusElement =
          document.getElementById(
            "uploadStatus"
          );

        const day =
          document.getElementById(
            "memoryDaySelect"
          ).value;

        const uploaderName =
          document
            .getElementById(
              "memoryUploaderName"
            )
            .value
            .trim();

        const caption =
          document
            .getElementById(
              "memoryCaption"
            )
            .value
            .trim();

        const files =
          document.getElementById(
            "memoryFiles"
          ).files;

        uploadButton.disabled = true;
        uploadButton.textContent =
          t.uploading;

        try {
          await uploadMemoryFiles(
            files,
            day,
            uploaderName,
            caption,
            statusElement,
            container
          );
        } catch (error) {
          console.error(
            "Upload failed:",
            error
          );

          statusElement.textContent =
            "Upload failed. Check the console.";

          uploadButton.disabled = false;
          uploadButton.textContent =
            t.uploadButton;
        }
      }
    );


  document
    .querySelectorAll(".album-filter")
    .forEach(button => {
      button.addEventListener(
        "click",
        async () => {
          saveMemoriesScrollPosition();

          selectedMemoryDay =
            button.dataset.day;

          activeMemoryAlbum = null;

          await renderMemoriesPage(
            container
          );
        }
      );
    });


  document
    .querySelectorAll(".album-card")
    .forEach(button => {
      button.addEventListener(
        "click",
        async () => {
          activeMemoryAlbum =
            Number(button.dataset.day);

          await renderMemoriesPage(
            container
          );

          scrollMemoriesToTop();
        }
      );
    });


  attachMemoryCardEvents(container);

  restoreMemoriesScrollPosition();
}