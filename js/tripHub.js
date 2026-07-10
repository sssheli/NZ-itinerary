const CURRENCY_CACHE_MINUTES = 60;


function getTripHubText() {
  const tripHubText = {
    en: {
      subtitle:
        "Travel Control Centre",

      title:
        "Trip Hub",

      desc:
        "All the important travel details for your New Zealand family trip, kept in one place.",

      flights:
        "Flights",

      flightDetails:
        "Flight Details",

      singapore:
        "Singapore",

      auckland:
        "Auckland",

      wellington:
        "Wellington",

      queenstown:
        "Queenstown",

      christchurch:
        "Christchurch",

      arrives:
        "Arrives",

      transport:
        "Transport",

      carRental:
        "Car Rental",

      safety:
        "Safety",

      emergency:
        "Emergency",

      nzEmergency:
        "New Zealand Emergency",

      emergencyNote:
        "Use 111 for police, fire, or ambulance emergencies in New Zealand.",

      hotelBookings:
        "Hotel Bookings",

      checkIn:
        "Check-in",

      checkOut:
        "Check-out",

      openMaps:
        "Open Maps",

      documents:
        "Documents",

      importantDocs:
        "Important Docs",

      passport:
        "Passport",

      flightTickets:
        "Flight tickets",

      hotelConfirmations:
        "Hotel booking confirmations",

      carConfirmation:
        "Car rental confirmation",

      drivingLicence:
        "Driving licence",

      travelInsurance:
        "Travel insurance",

      links:
        "Links",

      usefulLinks:
        "Useful Links",

      googleMaps:
        "Google Maps",

      roadConditions:
        "NZTA Road Conditions",

      nzWeather:
        "New Zealand Weather",

      travelGuide:
        "New Zealand Travel Guide",

      notes:
        "Notes",

      reminders:
        "Family Reminders",

      reminder1:
        "Check highway conditions before long drives.",

      reminder2:
        "Pack food before remote road trips.",

      reminder3:
        "Charge phones and power banks every night.",

      reminder4:
        "Keep passports and documents together.",

      currency:
        "Currency",

      converter:
        "SGD ↔ NZD Converter",

      amount:
        "Amount",

      convertFrom:
        "From",

      convertTo:
        "To",

      loadingRate:
        "Loading exchange rate...",

      rateUnavailable:
        "Exchange rate is unavailable. Please try again later.",

      referenceRate:
        "Reference rate",

      rateDate:
        "Rate date",

      currencyNote:
        "This is a reference exchange rate. Banks and card providers may use a different rate.",

      invalidAmount:
        "Enter a valid amount."
    },

    zh: {
      subtitle:
        "旅行资料中心",

      title:
        "旅行中心",

      desc:
        "将新西兰家庭旅行的重要资料集中在同一个地方。",

      flights:
        "航班",

      flightDetails:
        "航班详情",

      singapore:
        "新加坡",

      auckland:
        "奥克兰",

      wellington:
        "惠灵顿",

      queenstown:
        "皇后镇",

      christchurch:
        "基督城",

      arrives:
        "抵达",

      transport:
        "交通",

      carRental:
        "租车详情",

      safety:
        "安全",

      emergency:
        "紧急联络",

      nzEmergency:
        "新西兰紧急服务",

      emergencyNote:
        "在新西兰如需警察、消防或救护车，请拨打111。",

      hotelBookings:
        "酒店预订",

      checkIn:
        "入住",

      checkOut:
        "退房",

      openMaps:
        "打开地图",

      documents:
        "文件",

      importantDocs:
        "重要文件",

      passport:
        "护照",

      flightTickets:
        "机票",

      hotelConfirmations:
        "酒店预订确认",

      carConfirmation:
        "租车确认",

      drivingLicence:
        "驾照",

      travelInsurance:
        "旅游保险",

      links:
        "链接",

      usefulLinks:
        "实用链接",

      googleMaps:
        "Google 地图",

      roadConditions:
        "NZTA 道路状况",

      nzWeather:
        "新西兰天气",

      travelGuide:
        "新西兰旅游指南",

      notes:
        "备注",

      reminders:
        "家庭提醒",

      reminder1:
        "长途驾驶前查看公路状况。",

      reminder2:
        "前往偏远地区自驾前准备好食物。",

      reminder3:
        "每晚为手机和移动电源充电。",

      reminder4:
        "将护照和重要文件放在一起。",

      currency:
        "货币",

      converter:
        "新币与纽币换算",

      amount:
        "金额",

      convertFrom:
        "从",

      convertTo:
        "换成",

      loadingRate:
        "正在加载汇率...",

      rateUnavailable:
        "暂时无法取得汇率，请稍后再试。",

      referenceRate:
        "参考汇率",

      rateDate:
        "汇率日期",

      currencyNote:
        "此为参考汇率，银行和信用卡公司实际使用的汇率可能不同。",

      invalidAmount:
        "请输入有效金额。"
    }
  };

  return (
    tripHubText[language] ||
    tripHubText.en
  );
}


function getUniqueHotels() {
  const hotels = [];
  const hotelNames = new Set();

  tripData.days.forEach(rawDay => {
    const rawHotel =
      rawDay.accommodation;

    if (
      !rawHotel ||
      !rawHotel.name
    ) {
      return;
    }

    if (
      hotelNames.has(rawHotel.name)
    ) {
      return;
    }

    hotelNames.add(rawHotel.name);

    const localizedDay =
      getLocalizedTripDay(rawDay);

    const localizedHotel =
      localizedDay.accommodation;

    hotels.push({
      name:
        localizedHotel.name,

      city:
        localizedDay.city,

      room:
        localizedHotel.room ||
        (
          language === "zh"
            ? "住宿预订"
            : "Accommodation booking"
        ),

      checkIn:
        localizedHotel.checkIn ||
        "-",

      checkOut:
        localizedHotel.checkOut ||
        "-",

      map:
        rawHotel.map ||
        "#"
    });
  });

  return hotels;
}


function getCurrencyCacheKey(
  fromCurrency,
  toCurrency
) {
  return (
    `nz-currency-${fromCurrency}-` +
    `${toCurrency}`
  );
}


function getCachedCurrencyRate(
  fromCurrency,
  toCurrency
) {
  try {
    const cacheKey =
      getCurrencyCacheKey(
        fromCurrency,
        toCurrency
      );

    const cachedValue =
      sessionStorage.getItem(
        cacheKey
      );

    if (!cachedValue) {
      return null;
    }

    const cachedData =
      JSON.parse(cachedValue);

    const maximumAge =
      CURRENCY_CACHE_MINUTES *
      60 *
      1000;

    if (
      Date.now() -
      cachedData.savedAt >
      maximumAge
    ) {
      sessionStorage.removeItem(
        cacheKey
      );

      return null;
    }

    return cachedData.data;
  } catch (error) {
    console.warn(
      "Could not read currency cache:",
      error
    );

    return null;
  }
}


function saveCurrencyRateToCache(
  fromCurrency,
  toCurrency,
  data
) {
  try {
    sessionStorage.setItem(
      getCurrencyCacheKey(
        fromCurrency,
        toCurrency
      ),

      JSON.stringify({
        savedAt: Date.now(),
        data
      })
    );
  } catch (error) {
    console.warn(
      "Could not save currency cache:",
      error
    );
  }
}


async function fetchCurrencyRate(
  fromCurrency,
  toCurrency
) {
  if (
    fromCurrency === toCurrency
  ) {
    return {
      rate: 1,
      date:
        new Date()
          .toISOString()
          .slice(0, 10)
    };
  }

  const cachedRate =
    getCachedCurrencyRate(
      fromCurrency,
      toCurrency
    );

  if (cachedRate) {
    return cachedRate;
  }

  const response =
    await fetch(
      `https://api.frankfurter.dev/v2/rate/${fromCurrency}/${toCurrency}`
    );

  if (!response.ok) {
    throw new Error(
      "Could not retrieve exchange rate."
    );
  }

  const data =
    await response.json();

  if (
    typeof data.rate !== "number"
  ) {
    throw new Error(
      "Exchange-rate data was invalid."
    );
  }

  const result = {
    rate:
      data.rate,

    date:
      data.date || ""
  };

  saveCurrencyRateToCache(
    fromCurrency,
    toCurrency,
    result
  );

  return result;
}


function formatCurrencyAmount(
  amount,
  currency
) {
  return new Intl.NumberFormat(
    language === "zh"
      ? "zh-SG"
      : "en-SG",

    {
      style: "currency",
      currency,
      maximumFractionDigits: 2
    }
  ).format(amount);
}


async function updateCurrencyConverter() {
  const t =
    getTripHubText();

  const amountInput =
    document.getElementById(
      "currencyAmount"
    );

  const fromSelect =
    document.getElementById(
      "currencyFrom"
    );

  const toSelect =
    document.getElementById(
      "currencyTo"
    );

  const resultElement =
    document.getElementById(
      "currencyResult"
    );

  const rateElement =
    document.getElementById(
      "currencyRateInfo"
    );

  if (
    !amountInput ||
    !fromSelect ||
    !toSelect ||
    !resultElement ||
    !rateElement
  ) {
    return;
  }

  const amount =
    Number(amountInput.value);

  const fromCurrency =
    fromSelect.value;

  const toCurrency =
    toSelect.value;

  if (
    !Number.isFinite(amount) ||
    amount < 0
  ) {
    resultElement.textContent =
      t.invalidAmount;

    rateElement.textContent = "";

    return;
  }

  resultElement.textContent =
    t.loadingRate;

  rateElement.textContent = "";

  try {
    const rateData =
      await fetchCurrencyRate(
        fromCurrency,
        toCurrency
      );

    const convertedAmount =
      amount * rateData.rate;

    if (
      !document.getElementById(
        "currencyResult"
      )
    ) {
      return;
    }

    resultElement.textContent =
      `${formatCurrencyAmount(
        amount,
        fromCurrency
      )} = ${formatCurrencyAmount(
        convertedAmount,
        toCurrency
      )}`;

    rateElement.textContent =
      `${t.referenceRate}: ` +
      `1 ${fromCurrency} = ` +
      `${rateData.rate.toFixed(4)} ` +
      `${toCurrency}` +
      (
        rateData.date
          ? ` · ${t.rateDate}: ${rateData.date}`
          : ""
      );
  } catch (error) {
    console.error(
      "Currency conversion failed:",
      error
    );

    resultElement.textContent =
      t.rateUnavailable;

    rateElement.textContent = "";
  }
}


function renderTripHubPage(container) {
  const t =
    getTripHubText();

  const hotels =
    getUniqueHotels();

  container.innerHTML = `
    <section class="trip-hub-page">

      <section class="trip-hub-hero">
        <p class="trip-hub-subtitle">
          ${t.subtitle}
        </p>

        <h1>
          ${t.title}
        </h1>

        <p>
          ${t.desc}
        </p>
      </section>


      <section class="hub-grid">

        <article class="hub-card large-card">
          <div class="hub-card-header">
            <div class="hub-icon blue">
              ✈️
            </div>

            <div>
              <p>
                ${t.flights}
              </p>

              <h2>
                ${t.flightDetails}
              </h2>
            </div>
          </div>

          <div class="flight-list">
            <div class="flight-item">
              <div>
                <strong>
                  SQ285
                </strong>

                <p>
                  ${t.singapore}
                  →
                  ${t.auckland}
                </p>
              </div>

              <span>
                ${
                  language === "zh"
                    ? "9月10日下午12:20抵达"
                    : "Arrives 10 Sep, 12:20 PM"
                }
              </span>
            </div>

            <div class="flight-item">
              <div>
                <strong>
                  NZ607
                </strong>

                <p>
                  ${t.wellington}
                  →
                  ${t.queenstown}
                </p>
              </div>

              <span>
                ${
                  language === "zh"
                    ? "9月14日下午1:55 → 3:20"
                    : "14 Sep, 1:55 PM → 3:20 PM"
                }
              </span>
            </div>

            <div class="flight-item">
              <div>
                <strong>
                  SQ298
                </strong>

                <p>
                  ${t.christchurch}
                  →
                  ${t.singapore}
                </p>
              </div>

              <span>
                ${
                  language === "zh"
                    ? "9月23日上午10:50"
                    : "23 Sep, 10:50 AM"
                }
              </span>
            </div>
          </div>
        </article>


        <article class="hub-card">
          <div class="hub-card-header">
            <div class="hub-icon green">
              🚗
            </div>

            <div>
              <p>
                ${t.transport}
              </p>

              <h2>
                ${t.carRental}
              </h2>
            </div>
          </div>

          <div class="hub-detail">
            <span>
              ${t.auckland}
              →
              ${t.wellington}
            </span>

            <strong>
              ${
                language === "zh"
                  ? "9月10日至14日"
                  : "10 Sep – 14 Sep"
              }
            </strong>

            <small>
              NZ$781.68
            </small>
          </div>

          <div class="hub-detail">
            <span>
              ${t.queenstown}
              →
              ${t.christchurch}
            </span>

            <strong>
              ${
                language === "zh"
                  ? "9月14日至23日"
                  : "14 Sep – 23 Sep"
              }
            </strong>

            <small>
              NZ$1178.95
            </small>
          </div>
        </article>


        <article class="hub-card">
          <div class="hub-card-header">
            <div class="hub-icon red">
              🚨
            </div>

            <div>
              <p>
                ${t.safety}
              </p>

              <h2>
                ${t.emergency}
              </h2>
            </div>
          </div>

          <div class="emergency-number">
            <span>
              ${t.nzEmergency}
            </span>

            <strong>
              111
            </strong>
          </div>

          <p class="hub-note">
            ${t.emergencyNote}
          </p>
        </article>

      </section>


      <section class="hub-section">
        <div class="section-title">
          <h2>
            ${t.hotelBookings}
          </h2>
        </div>

        <div class="hotel-grid">
          ${hotels
            .map(hotel => `
              <article class="hotel-card">
                <div>
                  <p>
                    ${hotel.city}
                  </p>

                  <h3>
                    ${hotel.name}
                  </h3>

                  <span>
                    ${hotel.room}
                  </span>
                </div>

                <div class="hotel-info">
                  <small>
                    ${t.checkIn}:
                    ${hotel.checkIn}
                  </small>

                  <small>
                    ${t.checkOut}:
                    ${hotel.checkOut}
                  </small>
                </div>

                <a
                  href="${hotel.map}"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ${t.openMaps} →
                </a>
              </article>
            `)
            .join("")}
        </div>
      </section>


      <section class="hub-grid bottom-grid">

        <article class="hub-card">
          <div class="hub-card-header">
            <div class="hub-icon purple">
              📄
            </div>

            <div>
              <p>
                ${t.documents}
              </p>

              <h2>
                ${t.importantDocs}
              </h2>
            </div>
          </div>

          <ul class="document-list">
            <li>${t.passport}</li>
            <li>${t.flightTickets}</li>
            <li>${t.hotelConfirmations}</li>
            <li>${t.carConfirmation}</li>
            <li>${t.drivingLicence}</li>
            <li>${t.travelInsurance}</li>
          </ul>
        </article>


        <article class="hub-card">
          <div class="hub-card-header">
            <div class="hub-icon yellow">
              🔗
            </div>

            <div>
              <p>
                ${t.links}
              </p>

              <h2>
                ${t.usefulLinks}
              </h2>
            </div>
          </div>

          <div class="link-list">
            <a
              href="https://www.google.com/maps"
              target="_blank"
              rel="noopener noreferrer"
            >
              ${t.googleMaps} →
            </a>

            <a
              href="https://www.journeys.nzta.govt.nz"
              target="_blank"
              rel="noopener noreferrer"
            >
              ${t.roadConditions} →
            </a>

            <a
              href="https://www.metservice.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              ${t.nzWeather} →
            </a>

            <a
              href="https://www.newzealand.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              ${t.travelGuide} →
            </a>
          </div>
        </article>


        <article class="hub-card">
          <div class="hub-card-header">
            <div class="hub-icon pink">
              📝
            </div>

            <div>
              <p>
                ${t.notes}
              </p>

              <h2>
                ${t.reminders}
              </h2>
            </div>
          </div>

          <ul class="document-list">
            <li>${t.reminder1}</li>
            <li>${t.reminder2}</li>
            <li>${t.reminder3}</li>
            <li>${t.reminder4}</li>
          </ul>
        </article>

      </section>


      <section class="hub-section">
        <div class="section-title">
          <h2>
            ${t.converter}
          </h2>
        </div>

        <article class="hub-card currency-card">
          <div class="hub-card-header">
            <div class="hub-icon green">
              💱
            </div>

            <div>
              <p>
                ${t.currency}
              </p>

              <h2>
                ${t.converter}
              </h2>
            </div>
          </div>

          <div class="currency-converter">
            <label>
              ${t.amount}

              <input
                type="number"
                id="currencyAmount"
                value="100"
                min="0"
                step="0.01"
                inputmode="decimal"
              />
            </label>

            <div class="currency-select-row">
              <label>
                ${t.convertFrom}

                <select id="currencyFrom">
                  <option value="SGD">
                    SGD
                  </option>

                  <option value="NZD">
                    NZD
                  </option>
                </select>
              </label>

              <button
                type="button"
                class="currency-swap-btn"
                id="currencySwapBtn"
                aria-label="Swap currencies"
              >
                ⇄
              </button>

              <label>
                ${t.convertTo}

                <select id="currencyTo">
                  <option value="NZD">
                    NZD
                  </option>

                  <option value="SGD">
                    SGD
                  </option>
                </select>
              </label>
            </div>

            <div
              class="currency-result"
              id="currencyResult"
            >
              ${t.loadingRate}
            </div>

            <p
              class="currency-rate-info"
              id="currencyRateInfo"
            ></p>

            <small class="currency-note">
              ${t.currencyNote}
            </small>
          </div>
        </article>
      </section>

    </section>
  `;

  const amountInput =
    document.getElementById(
      "currencyAmount"
    );

  const fromSelect =
    document.getElementById(
      "currencyFrom"
    );

  const toSelect =
    document.getElementById(
      "currencyTo"
    );

  const swapButton =
    document.getElementById(
      "currencySwapBtn"
    );

  let currencyInputTimer;

  amountInput.addEventListener(
    "input",
    () => {
      clearTimeout(
        currencyInputTimer
      );

      currencyInputTimer =
        setTimeout(
          updateCurrencyConverter,
          250
        );
    }
  );

  fromSelect.addEventListener(
    "change",
    updateCurrencyConverter
  );

  toSelect.addEventListener(
    "change",
    updateCurrencyConverter
  );

  swapButton.addEventListener(
    "click",
    () => {
      const previousFrom =
        fromSelect.value;

      fromSelect.value =
        toSelect.value;

      toSelect.value =
        previousFrom;

      updateCurrencyConverter();
    }
  );

  updateCurrencyConverter();
}