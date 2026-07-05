const navItems = [
  { id: "home", icon: "🏠" },
  { id: "itinerary", icon: "🗓" },
  { id: "explore", icon: "🧭" },
  { id: "memories", icon: "📸" },
  { id: "tripHub", icon: "🧳" },
  { id: "checklist", icon: "☑" }
];

function getSidebar(activePage) {
  return `
    <aside class="sidebar">
      <div>
        <div class="brand">
          <span class="brand-icon">🇳🇿</span>
          <div>
            <h2>NZ Itinerary</h2>
            <p>Family Trip 2026</p>
          </div>
        </div>

        <nav class="side-nav">
          ${navItems.map(item => `
            <button 
              class="nav-item ${activePage === item.id ? "active" : ""}" 
              data-page="${item.id}">
              <span>${item.icon}</span>
              ${text[language].nav[item.id]}
            </button>
          `).join("")}
        </nav>
      </div>

      <div class="sidebar-bottom">
        <p id="sidebarName"></p>
        <button id="sidebarLangBtn">中文 / EN</button>
      </div>
    </aside>
  `;
}