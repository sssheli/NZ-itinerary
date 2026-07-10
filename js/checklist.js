let selectedChecklistCategory = "all";

const defaultChecklistItems = [
  {
    id: "passport",
    category: "documents",
    icon: "🛂",
    en: "Passport",
    zh: "护照"
  },
  {
    id: "flight-tickets",
    category: "documents",
    icon: "✈️",
    en: "Flight tickets",
    zh: "机票"
  },
  {
    id: "hotel-bookings",
    category: "documents",
    icon: "🏨",
    en: "Hotel booking confirmations",
    zh: "酒店预订确认"
  },
  {
    id: "car-rental",
    category: "documents",
    icon: "🚗",
    en: "Car rental confirmation",
    zh: "租车确认"
  },
  {
    id: "travel-insurance",
    category: "documents",
    icon: "🛡️",
    en: "Travel insurance",
    zh: "旅游保险"
  },
  {
    id: "driving-license",
    category: "documents",
    icon: "💳",
    en: "Driving licence",
    zh: "驾照"
  },

  {
    id: "jacket",
    category: "clothing",
    icon: "🧥",
    en: "Warm jacket",
    zh: "保暖外套"
  },
  {
    id: "walking-shoes",
    category: "clothing",
    icon: "👟",
    en: "Comfortable walking shoes",
    zh: "舒适的步行鞋"
  },
  {
    id: "raincoat",
    category: "clothing",
    icon: "🌧️",
    en: "Raincoat / waterproof jacket",
    zh: "雨衣 / 防水外套"
  },
  {
    id: "thermal-wear",
    category: "clothing",
    icon: "🧣",
    en: "Thermal wear",
    zh: "保暖衣"
  },
  {
    id: "sleepwear",
    category: "clothing",
    icon: "🌙",
    en: "Sleepwear",
    zh: "睡衣"
  },

  {
    id: "phone-charger",
    category: "electronics",
    icon: "🔌",
    en: "Phone charger",
    zh: "手机充电器"
  },
  {
    id: "power-bank",
    category: "electronics",
    icon: "🔋",
    en: "Power bank",
    zh: "移动电源"
  },
  {
    id: "travel-adapter",
    category: "electronics",
    icon: "🔌",
    en: "Travel adapter",
    zh: "旅行转换插头"
  },
  {
    id: "camera",
    category: "electronics",
    icon: "📷",
    en: "Camera / extra storage",
    zh: "相机 / 额外储存卡"
  },

  {
    id: "medicine",
    category: "health",
    icon: "💊",
    en: "Medicine",
    zh: "药物"
  },
  {
    id: "plasters",
    category: "health",
    icon: "🩹",
    en: "Plasters / first aid",
    zh: "创可贴 / 急救用品"
  },
  {
    id: "sunscreen",
    category: "health",
    icon: "☀️",
    en: "Sunscreen",
    zh: "防晒霜"
  },
  {
    id: "moisturiser",
    category: "health",
    icon: "🧴",
    en: "Moisturiser",
    zh: "保湿霜"
  },

  {
    id: "snacks",
    category: "roadtrip",
    icon: "🍫",
    en: "Road trip snacks",
    zh: "自驾零食"
  },
  {
    id: "water-bottle",
    category: "roadtrip",
    icon: "💧",
    en: "Water bottle",
    zh: "水瓶"
  },
  {
    id: "rubbish-bags",
    category: "roadtrip",
    icon: "🗑️",
    en: "Small rubbish bags",
    zh: "小垃圾袋"
  },
  {
    id: "wet-tissues",
    category: "roadtrip",
    icon: "🧻",
    en: "Wet tissues",
    zh: "湿纸巾"
  }
];

function getChecklistText() {
  return {
    en: {
      subtitle: "Packing & Travel Prep",
      title: "Trip Checklist",
      desc: "Keep track of everything your family needs before flying to New Zealand.",
      progress: "Progress",
      completed: "completed",
      addTitle: "Add Custom Item",
      inputPlaceholder: "Add something else...",
      addButton: "Add",
      resetButton: "Reset checklist",
      all: "All",
      documents: "Documents",
      clothing: "Clothing",
      electronics: "Electronics",
      health: "Health",
      roadtrip: "Road Trip",
      custom: "Custom",
      deleteItem: "Delete item",
      resetConfirm: "Reset all checked items?"
    },

    zh: {
      subtitle: "打包与旅行准备",
      title: "旅行清单",
      desc: "记录全家去新西兰前需要准备的东西。",
      progress: "进度",
      completed: "已完成",
      addTitle: "添加自定义项目",
      inputPlaceholder: "添加其他物品...",
      addButton: "添加",
      resetButton: "重置清单",
      all: "全部",
      documents: "文件",
      clothing: "衣物",
      electronics: "电子用品",
      health: "健康用品",
      roadtrip: "自驾用品",
      custom: "自定义",
      deleteItem: "删除项目",
      resetConfirm: "确定要重置所有已勾选项目吗？"
    }
  }[language];
}

function getChecklistCategories() {
  const t = getChecklistText();

  return [
    { id: "all", icon: "🌍", label: t.all },
    { id: "documents", icon: "📄", label: t.documents },
    { id: "clothing", icon: "🧥", label: t.clothing },
    { id: "electronics", icon: "🔌", label: t.electronics },
    { id: "health", icon: "💊", label: t.health },
    { id: "roadtrip", icon: "🚗", label: t.roadtrip },
    { id: "custom", icon: "✨", label: t.custom }
  ];
}

function getSavedChecklist() {
  return JSON.parse(localStorage.getItem("nzChecklist")) || {};
}

function saveChecklist(checklist) {
  localStorage.setItem("nzChecklist", JSON.stringify(checklist));
}

function getCustomChecklistItems() {
  return JSON.parse(localStorage.getItem("nzCustomChecklistItems")) || [];
}

function saveCustomChecklistItems(items) {
  localStorage.setItem("nzCustomChecklistItems", JSON.stringify(items));
}

function getAllChecklistItems() {
  return [
    ...defaultChecklistItems,
    ...getCustomChecklistItems()
  ];
}

function getFilteredChecklistItems() {
  const items = getAllChecklistItems();

  if (selectedChecklistCategory === "all") {
    return items;
  }

  return items.filter(item => item.category === selectedChecklistCategory);
}

function getChecklistProgress() {
  const checklist = getSavedChecklist();
  const items = getAllChecklistItems();

  const completedCount = items.filter(item => checklist[item.id]).length;
  const totalCount = items.length;

  const percentage =
    totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  return {
    completedCount,
    totalCount,
    percentage
  };
}

function renderChecklistPage(container) {
  const t = getChecklistText();
  const checklist = getSavedChecklist();
  const items = getFilteredChecklistItems();
  const progress = getChecklistProgress();

  container.innerHTML = `
    <section class="checklist-page">

      <section class="checklist-hero">
        <div>
          <p class="checklist-subtitle">${t.subtitle}</p>
          <h1>${t.title}</h1>
          <p>${t.desc}</p>
        </div>

        <div class="progress-card">
          <p>${t.progress}</p>

          <h2>${progress.percentage}%</h2>

          <span>
            ${progress.completedCount} / ${progress.totalCount} ${t.completed}
          </span>

          <div class="progress-bar">
            <div style="width: ${progress.percentage}%"></div>
          </div>
        </div>
      </section>

      <section class="checklist-controls">
        <div class="checklist-filters">
          ${getChecklistCategories().map(category => `
            <button
              class="checklist-filter ${selectedChecklistCategory === category.id ? "active" : ""}"
              data-category="${category.id}"
            >
              ${category.icon} ${category.label}
            </button>
          `).join("")}
        </div>

        <form class="add-checklist-form" id="addChecklistForm">
          <input
            id="customChecklistInput"
            type="text"
            placeholder="${t.inputPlaceholder}"
          />

          <button type="submit">
            ${t.addButton}
          </button>
        </form>
      </section>

      <section class="checklist-card">
        <div class="checklist-list">
          ${items.map(item => `
            <article class="checklist-item ${checklist[item.id] ? "checked" : ""}">
              <label>
                <input
                  type="checkbox"
                  data-id="${item.id}"
                  ${checklist[item.id] ? "checked" : ""}
                />

                <span class="fake-checkbox"></span>

                <div class="checklist-item-icon">
                  ${item.icon}
                </div>

                <div>
                  <h3>${item[language] || item.en}</h3>
                  <p>${getCategoryLabel(item.category)}</p>
                </div>
              </label>

              ${item.isCustom ? `
                <button
                  class="delete-custom-item"
                  data-id="${item.id}"
                  title="${t.deleteItem}"
                >
                  ×
                </button>
              ` : ""}
            </article>
          `).join("")}
        </div>
      </section>

      <button class="reset-checklist-btn" id="resetChecklistBtn">
        ${t.resetButton}
      </button>

    </section>
  `;

  document.querySelectorAll(".checklist-filter").forEach(button => {
    button.addEventListener("click", () => {
      selectedChecklistCategory = button.dataset.category;
      renderChecklistPage(container);
    });
  });

  document.querySelectorAll(".checklist-item input").forEach(checkbox => {
    checkbox.addEventListener("change", () => {
      const checklist = getSavedChecklist();

      checklist[checkbox.dataset.id] = checkbox.checked;

      saveChecklist(checklist);
      renderChecklistPage(container);
    });
  });

  document.getElementById("addChecklistForm").addEventListener("submit", event => {
    event.preventDefault();

    const input = document.getElementById("customChecklistInput");
    const value = input.value.trim();

    if (value === "") {
      return;
    }

    const customItems = getCustomChecklistItems();

    customItems.push({
      id: `custom-${Date.now()}`,
      category: "custom",
      icon: "✨",
      en: value,
      zh: value,
      isCustom: true
    });

    saveCustomChecklistItems(customItems);

    selectedChecklistCategory = "custom";
    renderChecklistPage(container);
  });

  document.querySelectorAll(".delete-custom-item").forEach(button => {
    button.addEventListener("click", () => {
      const customItems = getCustomChecklistItems()
        .filter(item => item.id !== button.dataset.id);

      const checklist = getSavedChecklist();
      delete checklist[button.dataset.id];

      saveCustomChecklistItems(customItems);
      saveChecklist(checklist);

      renderChecklistPage(container);
    });
  });

  document.getElementById("resetChecklistBtn").addEventListener("click", () => {
    const confirmReset = confirm(t.resetConfirm);

    if (!confirmReset) {
      return;
    }

    saveChecklist({});
    renderChecklistPage(container);
  });
}

function getCategoryLabel(categoryId) {
  const category = getChecklistCategories().find(item => item.id === categoryId);

  return category ? category.label : categoryId;
}