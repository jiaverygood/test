// 환율 API 주소 (USD 기준 환율)
const API_URL = "https://open.er-api.com/v6/latest/USD";

// DOM 요소
let amountInput;
let fromSelect;
let toSelect;
let convertBtn;
let swapBtn;
let resultArea;

// 통화 변환 버튼 클릭 시 실행
async function handleConvert() {
  const amount = parseFloat(amountInput.value);

  if (isNaN(amount)) {
    resultArea.textContent = "금액을 입력하세요.";
    return;
  }

  const fromCurrency = fromSelect.value;
  const toCurrency = toSelect.value;

  resultArea.textContent = "변환 중...";

  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    const rates = data.rates;
    // USD 기준 환율을 이용해 from -> to로 교차 계산
    const amountInUsd = amount / rates[fromCurrency];
    const converted = amountInUsd * rates[toCurrency];

    resultArea.textContent = `${amount} ${fromCurrency} = ${converted.toFixed(2)} ${toCurrency}`;
  } catch (error) {
    resultArea.textContent = "환율 정보를 가져오지 못했습니다.";
  }
}

// From/To 통화를 서로 교환
function handleSwap() {
  const temp = fromSelect.value;
  fromSelect.value = toSelect.value;
  toSelect.value = temp;

  // 금액이 입력되어 있으면 교환 후 바로 변환 실행
  if (amountInput.value.trim() !== "") {
    handleConvert();
  }
}

// 앱 초기화 함수
function initApp() {
  amountInput = document.getElementById("amount-input");
  fromSelect = document.getElementById("from-currency");
  toSelect = document.getElementById("to-currency");
  convertBtn = document.getElementById("convert-btn");
  swapBtn = document.getElementById("swap-btn");
  resultArea = document.getElementById("result");

  convertBtn.addEventListener("click", handleConvert);
  swapBtn.addEventListener("click", handleSwap);
}

initApp();
