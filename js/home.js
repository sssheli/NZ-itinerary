function renderHomePage(container) {
  const t = text[language];

  container.innerHTML = `
    <section class="home-page">
      <p class="eyebrow">Auckland → Christchurch</p>
      <h1>${t.homeTitle}</h1>
      <p>${t.homeDesc}</p>
    </section>
  `;
}