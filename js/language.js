console.log("language.js loaded");
let selectedLanguage = localStorage.getItem("language") || null;

const textContent = {
  en: {
    nameTitle: "What should we call you?",
    namePlaceholder: "Enter your name",
    welcome: "Welcome back",
    homeTitle: "New Zealand Family Road Trip",
    homeSubtitle: "Your itinerary will appear here next."
  },
  zh: {
    nameTitle: "请问怎么称呼你？",
    namePlaceholder: "请输入你的名字",
    welcome: "欢迎回来",
    homeTitle: "新西兰家庭自驾游",
    homeSubtitle: "你的行程会显示在这里。"
  }
};

window.selectLanguage = function(language) {
  selectedLanguage = language;
  localStorage.setItem("language", language);

  document.getElementById("languageScreen").classList.add("hidden");
  document.getElementById("nameScreen").classList.remove("hidden");

  updateLanguageText();
};

window.updateLanguageText = function() {
  const t = textContent[selectedLanguage];

  document.getElementById("nameTitle").textContent = t.nameTitle;
  document.getElementById("nameInput").placeholder = t.namePlaceholder;
  document.getElementById("homeTitle").textContent = t.homeTitle;
  document.getElementById("homeSubtitle").textContent = t.homeSubtitle;
};

window.switchLanguage = function() {
  const newLanguage = selectedLanguage === "en" ? "zh" : "en";
  selectedLanguage = newLanguage;
  localStorage.setItem("language", newLanguage);
  updateLanguageText();
  showWelcomeText();
};