(function initPlaceholderPage() {
  var yearElement = document.getElementById("current-year");
  if (yearElement) {
    yearElement.textContent = String(new Date().getFullYear());
  }

  var statusElement = document.querySelector("[data-status-text]");
  if (!statusElement) {
    return;
  }

  var baseText = "Setting up autonomous agents";
  var frame = 0;
  var suffixes = [".", "..", "..."];

  window.setInterval(function tickStatus() {
    statusElement.textContent = baseText + suffixes[frame];
    frame = (frame + 1) % suffixes.length;
  }, 700);
})();
