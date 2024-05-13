class ProgressBlock {
  constructor(element) {
    this.element = element;
    this.circle = this.element.querySelector(".progress__ring-circle");
    this.radius = this.circle.r.baseVal.value;
    this.circumference = 2 * Math.PI * this.radius;
    this.circle.style.strokeDasharray = `${this.circumference} ${this.circumference}`;
    this.circle.style.strokeDashoffset = this.circumference;
  }

  setValue(value) {
    const offset = this.circumference - (value / 100) * this.circumference;
    this.circle.style.strokeDashoffset = offset;
  }

  setAnimated(isAnimate) {
    this.element.classList.toggle("progress--animated", isAnimate);
  }

  setHidden(isHidden) {
    this.element.classList.toggle("progress--hidden", isHidden);
  }
}

const progressBlockElement = document.querySelector(".progress");
const progressBlock = new ProgressBlock(progressBlockElement);

const api = document.querySelector(".api");
const input = api.querySelector(".api__item-value");
const animated = api.querySelector("#animated-box");
const hidden = api.querySelector("#hide-box");

progressBlock.setValue(input.value);
progressBlock.setAnimated(animated.checked);
progressBlock.setHidden(hidden.checked);

input.addEventListener("input", (e) => {
  const value = parseInt(e.target.value);
  const number = isNaN(value) ? 0 : value;
  const rangeNumber = number > 100 ? 100 : value < 0 ? 0 : number;

  e.target.value = rangeNumber;
  progressBlock.setValue(rangeNumber);
});

hidden.addEventListener("change", (e) => {
  progressBlock.setHidden(e.target.checked);
});

animated.addEventListener("change", (e) => {
  progressBlock.setAnimated(e.target.checked);
});
