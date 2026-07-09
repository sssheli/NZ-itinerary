const app = document.getElementById("app");

let language =
  localStorage.getItem("language");

let travellerName =
  localStorage.getItem("travellerName");


const text = {
  en: {
    welcomeTitle:
      "Welcome to New Zealand",

    welcomeDesc:
      "Your family road trip companion for 10–23 September 2026.",

    getStarted:
      "Get Started",

    chooseLanguage:
      "Choose your language",

    nameTitle:
      "What should we call you?",

    namePlaceholder:
      "Enter your name",

    continue:
      "Continue",

    nameRequired:
      "Please enter your name.",

    hello:
      "Hi",

    ready:
      "Ready for the adventure?",

    startJourney:
      "Start Journey",

    homeTitle:
      "New Zealand Adventure Awaits",

    homeDesc:
      "Auckland to Christchurch, planned day by day.",

    nav: {
      home: "Home",
      itinerary: "Itinerary",
      explore: "Explore",
      memories: "Memories",
      tripHub: "Trip Hub",
      checklist: "Checklist"
    },

    comingSoon:
      "Coming Soon",

    sectionBuiltNext:
      "This section will be built next."
  },


  zh: {
    welcomeTitle:
      "欢迎来到新西兰",

    welcomeDesc:
      "你的家庭自驾游行程助手：2026年9月10日至23日。",

    getStarted:
      "开始",

    chooseLanguage:
      "请选择语言",

    nameTitle:
      "请问怎么称呼你？",

    namePlaceholder:
      "请输入你的名字",

    continue:
      "继续",

    nameRequired:
      "请输入你的名字。",

    hello:
      "你好",

    ready:
      "准备好开始旅程了吗？",

    startJourney:
      "开始旅程",

    homeTitle:
      "新西兰冒险之旅",

    homeDesc:
      "从奥克兰到基督城，每一天都为你规划好。",

    nav: {
      home: "首页",
      itinerary: "行程",
      explore: "探索",
      memories: "回忆",
      tripHub: "旅行中心",
      checklist: "清单"
    },

    comingSoon:
      "即将推出",

    sectionBuiltNext:
      "这个部分会稍后完成。"
  }
};


function updateDocumentLanguage() {
  document.documentElement.lang =
    language === "zh"
      ? "zh-CN"
      : "en";
}


function renderWelcome() {
  document.documentElement.lang = "en";

  app.innerHTML = `
    <section class="onboarding">
      <div class="card">
        <div class="logo">
          🇳🇿
        </div>

        <p class="eyebrow">
          NZ Itinerary
        </p>

        <h1>
          Welcome to New Zealand
        </h1>

        <p>
          Your family road trip companion
          for 10–23 September 2026.
        </p>

        <p>
          2026年9月10日至23日的新西兰家庭自驾游行程助手。
        </p>

        <button id="getStartedBtn">
          Get Started · 开始
        </button>
      </div>
    </section>
  `;

  document
    .getElementById("getStartedBtn")
    .addEventListener(
      "click",
      renderLanguage
    );
}


function renderLanguage() {
  app.innerHTML = `
    <section class="onboarding">
      <div class="card">
        <p class="eyebrow">
          New Zealand 2026
        </p>

        <h1>
          Choose your language
        </h1>

        <p>
          请选择你的语言
        </p>

        <div class="btn-row">
          <button id="englishBtn">
            English
          </button>

          <button id="chineseBtn">
            中文
          </button>
        </div>
      </div>
    </section>
  `;

  document
    .getElementById("englishBtn")
    .addEventListener(
      "click",
      () => {
        saveLanguage("en");
      }
    );

  document
    .getElementById("chineseBtn")
    .addEventListener(
      "click",
      () => {
        saveLanguage("zh");
      }
    );
}


function saveLanguage(selected) {
  language = selected;

  localStorage.setItem(
    "language",
    selected
  );

  updateDocumentLanguage();
  renderName();
}


function renderName() {
  updateDocumentLanguage();

  const t =
    text[language] || text.en;

  app.innerHTML = `
    <section class="onboarding">
      <div class="card">
        <p class="eyebrow">
          NZ Itinerary
        </p>

        <h1>
          ${t.nameTitle}
        </h1>

        <input
          id="nameInput"
          type="text"
          placeholder="${t.namePlaceholder}"
          autocomplete="name"
        />

        <button id="continueBtn">
          ${t.continue}
        </button>
      </div>
    </section>
  `;

  const nameInput =
    document.getElementById(
      "nameInput"
    );

  document
    .getElementById("continueBtn")
    .addEventListener(
      "click",
      saveName
    );

  nameInput.addEventListener(
    "keydown",
    event => {
      if (event.key === "Enter") {
        saveName();
      }
    }
  );

  nameInput.focus();
}


function saveName() {
  const t =
    text[language] || text.en;

  const name =
    document
      .getElementById("nameInput")
      .value
      .trim();

  if (name === "") {
    alert(t.nameRequired);
    return;
  }

  travellerName = name;

  localStorage.setItem(
    "travellerName",
    name
  );

  renderReady();
}


function renderReady() {
  updateDocumentLanguage();

  const t =
    text[language] || text.en;

  app.innerHTML = `
    <section class="onboarding">
      <div class="card">
        <div class="logo">
          👋
        </div>

        <p class="eyebrow">
          NZ Itinerary
        </p>

        <h1>
          ${t.hello}, ${travellerName}
        </h1>

        <p>
          ${t.ready}
        </p>

        <button id="startJourneyBtn">
          ${t.startJourney}
        </button>
      </div>
    </section>
  `;

  document
    .getElementById("startJourneyBtn")
    .addEventListener(
      "click",
      renderHome
    );
}


function renderHome() {
  updateDocumentLanguage();
  renderLayout("home");
}


function switchLanguage() {
  language =
    language === "en"
      ? "zh"
      : "en";

  localStorage.setItem(
    "language",
    language
  );

  updateDocumentLanguage();
  renderHome();
}


function init() {
  if (!language) {
    renderWelcome();
    return;
  }

  updateDocumentLanguage();

  if (!travellerName) {
    renderName();
    return;
  }

  renderHome();
}


init();