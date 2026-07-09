function renderLayout(
  activePage = "home"
) {
  updateDocumentLanguage();

  app.innerHTML = `
    <section class="app-shell">
      ${getSidebar(activePage)}

      <main
        class="page-content"
        id="pageContent"
      ></main>
    </section>
  `;

  document
    .getElementById("sidebarName")
    .textContent = travellerName;

  document
    .querySelectorAll(".nav-item")
    .forEach(button => {
      button.addEventListener(
        "click",
        () => {
          const page =
            button.dataset.page;

          renderLayout(page);
        }
      );
    });

  document
    .getElementById("sidebarLangBtn")
    .addEventListener(
      "click",
      () => {
        language =
          language === "en"
            ? "zh"
            : "en";

        localStorage.setItem(
          "language",
          language
        );

        updateDocumentLanguage();

        renderLayout(activePage);
      }
    );

  renderPage(activePage);
}


function renderPage(page) {
  const pageContent =
    document.getElementById(
      "pageContent"
    );

  const t =
    text[language] || text.en;

  if (page === "home") {
    renderHomePage(pageContent);
    return;
  }

  if (page === "itinerary") {
    renderItineraryPage(pageContent);
    return;
  }

  if (page === "explore") {
    renderExplorePage(pageContent);
    return;
  }

  if (page === "tripHub") {
    renderTripHubPage(pageContent);
    return;
  }

  if (page === "checklist") {
    renderChecklistPage(pageContent);
    return;
  }

  if (page === "memories") {
    renderMemoriesPage(pageContent);
    return;
  }

  pageContent.innerHTML = `
    <section class="placeholder-page">
      <p class="eyebrow">
        ${t.comingSoon}
      </p>

      <h1>
        ${t.nav[page]}
      </h1>

      <p>
        ${t.sectionBuiltNext}
      </p>
    </section>
  `;
}