// 현재 카운트 값을 저장하는 변수
let count = 0;

// 화면에 숫자를 표시할 요소
const countDisplay = document.getElementById("count");

// 버튼 요소들
const increaseBtn = document.getElementById("increase-btn");
const decreaseBtn = document.getElementById("decrease-btn");
const resetBtn = document.getElementById("reset-btn");

// 화면에 현재 count 값을 반영하는 함수
function updateDisplay() {
  countDisplay.textContent = count;

  // 양수/음수/0에 따라 숫자 색상 클래스를 다르게 적용
  countDisplay.classList.remove("positive", "negative");
  if (count > 0) {
    countDisplay.classList.add("positive");
  } else if (count < 0) {
    countDisplay.classList.add("negative");
  }
}

// + 버튼 클릭 시 1 증가
increaseBtn.addEventListener("click", () => {
  count += 1;
  updateDisplay();
});

// - 버튼 클릭 시 1 감소
decreaseBtn.addEventListener("click", () => {
  count -= 1;
  updateDisplay();
});

// 리셋 버튼 클릭 시 0으로 초기화
resetBtn.addEventListener("click", () => {
  count = 0;
  updateDisplay();
});
