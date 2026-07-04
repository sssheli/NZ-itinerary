const app = document.getElementById("app");

let language = localStorage.getItem("language");
let travellerName = localStorage.getItem("travellerName");

const text = {
  en: {
    welcomeTitle: "Welcome to New Zealand",
    welcomeDesc: "Your family road trip companion for 9–23 October 2026.",
    getStarted: "Get Started",
    chooseLanguage: "Choose your language",
    nameTitle: "What should we call you?",
    namePlaceholder: "Enter your name",
    continue: "Continue",
    hello: "Hi",
    ready: "Ready for the adventure?",
    startJourney: "Start Journey",
    homeTitle: "New Zealand Adventure Awaits",
    homeDesc: "Auckland to Christchurch, planned day by day."
  },
  zh: {
    welcomeTitle: "欢迎来到新西兰",
    welcomeDesc: "你的家庭自驾游行程助手：2026年10月9日至23日。",
    getStarted: "开始",
    chooseLanguage: "请选择语言",
    nameTitle: "请问怎么称呼你？",
    namePlaceholder: "请输入你的名字",
    continue: "继续",
    hello: "你好",
    ready: "准备好开始旅程了吗？",
    startJourney: "开始旅程",
    homeTitle: "新西兰冒险之旅",
    homeDesc: "从奥克兰到基督城，每一天都为你规划好。"
  }
};

function renderWelcome() {
  app.innerHTML = `
    <section class="onboarding">
      <div class="card">
        <div class="logo">🇳🇿</div>
        <p class="eyebrow">NZ Itinerary</p>
        <h1>Welcome to New Zealand</h1>
        <p>Your family road trip companion for 9–23 October 2026.</p>
        <button id="getStartedBtn">Get Started</button>
      </div>
    </section>
  `;

  document.getElementById("getStartedBtn").addEventListener("click", renderLanguage);
}

function renderLanguage() {
  app.innerHTML = `
    <section class="onboarding">
      <div class="card">
        <p class="eyebrow">New Zealand 2026</p>
        <h1>Choose your language</h1>
        <p>请选择你的语言</p>

        <div class="btn-row">
          <button id="englishBtn">English</button>
          <button id="chineseBtn">中文</button>
        </div>
      </div>
    </section>
  `;

  document.getElementById("englishBtn").addEventListener("click", () => {
    saveLanguage("en");
  });

  document.getElementById("chineseBtn").addEventListener("click", () => {
    saveLanguage("zh");
  });
}

function saveLanguage(selected) {
  language = selected;
  localStorage.setItem("language", selected);
  renderName();
}

function renderName() {
  const t = text[language];

  app.innerHTML = `
    <section class="onboarding">
      <div class="card">
        <p class="eyebrow">NZ Itinerary</p>
        <h1>${t.nameTitle}</h1>
        <input id="nameInput" type="text" placeholder="${t.namePlaceholder}" />
        <button id="continueBtn">${t.continue}</button>
      </div>
    </section>
  `;

  document.getElementById("continueBtn").addEventListener("click", saveName);
}

function saveName() {
  const name = document.getElementById("nameInput").value.trim();

  if (name === "") {
    alert("Please enter your name.");
    return;
  }

  travellerName = name;
  localStorage.setItem("travellerName", name);
  renderReady();
}

function renderReady() {
  const t = text[language];

  app.innerHTML = `
    <section class="onboarding">
      <div class="card">
        <div class="logo">👋</div>
        <p class="eyebrow">NZ Itinerary</p>
        <h1>${t.hello}, ${travellerName}</h1>
        <p>${t.ready}</p>
        <button id="startJourneyBtn">${t.startJourney}</button>
      </div>
    </section>
  `;

  document.getElementById("startJourneyBtn").addEventListener("click", renderHome);
}

function renderHome() {
  const t = text[language];

  app.innerHTML = `
    <section class="home">
      <nav class="navbar">
        <strong>NZ Itinerary</strong>
        <button id="switchLanguageBtn">${language === "en" ? "中文" : "English"}</button>
      </nav>

      <section class="hero">
        <p class="eyebrow">Auckland → Christchurch</p>
        <h1>${t.homeTitle}</h1>
        <p>${t.homeDesc}</p>
      </section>
    </section>
  `;

  document.getElementById("switchLanguageBtn").addEventListener("click", switchLanguage);
}

function switchLanguage() {
  language = language === "en" ? "zh" : "en";
  localStorage.setItem("language", language);
  renderHome();
}

function init() {
  if (!language) {
    renderWelcome();
    return;
  }

  if (!travellerName) {
    renderName();
    return;
  }

  renderHome();
}

init();