(function () {
  // --- CONFIGURATION ---
  const SELECTED_CLASS = "ytpds-selected";
  const INFO_BOX_ID = "ytpds-duration-box";
  const SELECT_RECT_CLASS = "ytpds-selection-rect";
  const CONTROLS_ID = "ytpds-controls-bar";

  // --- Prevent duplicate activation (runs once per page) ---
  if (window.__ytpds_active) return;
  window.__ytpds_active = true;

  // Store references for cleanup
  const __listeners = [];

  // --- Utility Functions ---
  function parseTime(t) {
    if (!t) return 0;
    t = t.replace(/[\u200E\u200F\u200B\s]/g, ""); // Remove LTR/RTL markers, spaces, ZWS
    const parts = t.split(":").map(Number);
    if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
    if (parts.length === 2) return parts[0] * 60 + parts[1];
    return isNaN(parts[0]) ? 0 : parts[0];
  }

  function formatSeconds(s) {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    if (h > 0)
      return `${h}:${String(m).padStart(2, "0")}:${String(sec).padStart(
        2,
        "0"
      )}`;
    return `${m}:${String(sec).padStart(2, "0")}`;
  }

  // --- Inject Floating Info Box and Controls ---
  function createDurationBox() {
    let box = document.getElementById(INFO_BOX_ID);
    if (!box) {
      box = document.createElement("div");
      box.id = INFO_BOX_ID;
      box.style.position = "fixed";
      box.style.top = "20px";
      box.style.right = "30px";
      box.style.background = "#fff";
      box.style.color = "#222";
      box.style.border = "2px solid #4285f4";
      box.style.borderRadius = "6px";
      box.style.fontSize = "16px";
      box.style.padding = "12px 20px 18px";
      box.style.zIndex = 99999;
      box.style.boxShadow = "0 6px 16px rgba(0,0,0,0.15)";
      box.style.fontFamily = "Roboto, Arial, sans-serif";

      const durationText = document.createElement("div");
      durationText.id = "ytpds-duration-text";
      durationText.textContent = "Select videos to see total duration";

      const controls = document.createElement("div");
      controls.id = CONTROLS_ID;
      controls.style.marginTop = "8px";
      controls.innerHTML = `
        <button id="ytpds-select-all" style="margin-right: 8px;">Select All</button>
        <button id="ytpds-reset" style="margin-right: 8px;">Reset</button>
        <button id="ytpds-turn-off">Turn Off</button>
      `;

      box.appendChild(durationText);
      box.appendChild(controls);
      document.body.appendChild(box);

      // Attach control handlers
      document
        .getElementById("ytpds-select-all")
        .addEventListener("click", selectAll);
      document
        .getElementById("ytpds-reset")
        .addEventListener("click", resetSelection);
      document
        .getElementById("ytpds-turn-off")
        .addEventListener("click", deactivateExtension);
    }

    return box;
  }

  function getDurationTextElement() {
    return document.getElementById("ytpds-duration-text");
  }

  // --- Get all playlist items and their durations ---
  function getVideoItems() {
    return Array.from(
      document.querySelectorAll(
        "ytd-playlist-video-renderer, ytd-playlist-panel-video-renderer"
      )
    ).filter(
      (item) =>
        item.querySelector("#thumbnail, a#thumbnail") &&
        item.querySelector(".ytd-thumbnail-overlay-time-status-renderer")
    );
  }

  // --- Selection Logic ---
  function updateDuration() {
    const durationBox = getDurationTextElement();
    const selected = Array.from(
      document.getElementsByClassName(SELECTED_CLASS)
    );
    let totalSeconds = 0;
    selected.forEach((item) => {
      const timeElem = item.querySelector(
        ".ytd-thumbnail-overlay-time-status-renderer span"
      );
      if (timeElem) {
        const timeText = timeElem.innerText || timeElem.textContent || "";
        totalSeconds += parseTime(timeText);
      }
    });
    if (selected.length === 0) {
      durationBox.textContent = "Select videos to see total duration";
    } else {
      durationBox.textContent = `Selected: ${
        selected.length
      } • Total: ${formatSeconds(totalSeconds)}`;
    }
  }

  // --- Click to Select/Deselect ---
  function setupClickHandlers(items) {
    items.forEach((item) => {
      if (item.__ytpds_handler_attached) return;
      item.__ytpds_handler_attached = true;

      const handler = function (e) {
        e.preventDefault();
        e.stopPropagation();
        const link = item.querySelector("a#thumbnail");
        if (link) link.removeAttribute("href");
        item.classList.toggle(SELECTED_CLASS);
        updateDuration();
      };

      item.addEventListener("click", handler, true);
      __listeners.push({ el: item, fn: handler });
    });
  }

  // --- ALT + Drag to Select ---
  function setupBoxSelection(items) {
    let isMouseDown = false,
      startX = 0,
      startY = 0,
      selectionRect = null;

    const onMouseDown = function (e) {
      if (!e.altKey) return;
      isMouseDown = true;
      startX = e.pageX;
      startY = e.pageY;
      selectionRect = document.createElement("div");
      selectionRect.className = SELECT_RECT_CLASS;
      selectionRect.style.position = "absolute";
      selectionRect.style.border = "2px dashed #4285f4";
      selectionRect.style.background = "rgba(66,133,244,0.17)";
      selectionRect.style.pointerEvents = "none";
      selectionRect.style.zIndex = 99998;
      document.body.appendChild(selectionRect);
      document.body.style.userSelect = "none";
    };

    const onMouseMove = function (e) {
      if (!isMouseDown || !selectionRect) return;
      let minX = Math.min(e.pageX, startX),
        minY = Math.min(e.pageY, startY);
      let width = Math.abs(e.pageX - startX),
        height = Math.abs(e.pageY - startY);
      Object.assign(selectionRect.style, {
        left: minX + "px",
        top: minY + "px",
        width: width + "px",
        height: height + "px",
      });
    };

    const onMouseUp = function (e) {
      if (!isMouseDown || !selectionRect) return;
      let rect = selectionRect.getBoundingClientRect();
      items.forEach((item) => {
        let itemRect = item.getBoundingClientRect();
        if (
          itemRect.right > rect.left &&
          itemRect.left < rect.right &&
          itemRect.bottom > rect.top &&
          itemRect.top < rect.bottom
        ) {
          item.classList.add(SELECTED_CLASS);
        }
      });
      selectionRect.remove();
      isMouseDown = false;
      selectionRect = null;
      document.body.style.userSelect = "";
      updateDuration();
    };

    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    __listeners.push({ el: document, fn: onMouseDown });
    __listeners.push({ el: document, fn: onMouseMove });
    __listeners.push({ el: document, fn: onMouseUp });
  }

  // --- Control Buttons ---
  function selectAll() {
    const items = getVideoItems();
    items.forEach((item) => item.classList.add(SELECTED_CLASS));
    updateDuration();
  }

  function resetSelection() {
    const items = getVideoItems();
    items.forEach((item) => item.classList.remove(SELECTED_CLASS));
    updateDuration();
  }

  function deactivateExtension() {
    // Remove all listeners
    __listeners.forEach(({ el, fn }) =>
      el.removeEventListener("click", fn, true)
    );
    __listeners.length = 0;
    // Remove selection and styling
    document
      .querySelectorAll(`.${SELECTED_CLASS}`)
      .forEach((el) => el.classList.remove(SELECTED_CLASS));
    // Remove duration box
    const box = document.getElementById(INFO_BOX_ID);
    if (box) box.remove();
    // Remove selection rectangles
    document
      .querySelectorAll(`.${SELECT_RECT_CLASS}`)
      .forEach((el) => el.remove());
    // Turn off flag
    window.__ytpds_active = false;
  }

  // --- Main Init ---
  function run() {
    const items = getVideoItems();
    if (items.length === 0) {
      setTimeout(run, 800);
      return;
    }
    createDurationBox();
    setupClickHandlers(items);
    setupBoxSelection(items);

    const observer = new MutationObserver(() => {
      const updatedItems = getVideoItems();
      setupClickHandlers(updatedItems);
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  run();
})();
