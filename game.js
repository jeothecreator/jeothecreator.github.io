//  ========= 1) PUZZLES =========

const PUZZLES = [
  {
    id: "p1",
    title: "Challenge 1: Find the hidden Banana in the depths of the underworld",
    story: "You'll need to solve the puzzle",
    question: "In the underworld, there is a hidden banana. try to find the cords, or die ",
    image: "bananahide.png", // optional: put image file in same folder as index.html
    answer: ["(2, 9)", "(2,9)", "2, 9", "2,9", "2 9"],
    success: "Correct! Cords are (2, 9). Remember the number 4."
  },

  {
    id: "p2",
    title: "Challenge 2: Try to decode the binary decimal to the underworld language",
    story: "use the table or your brain",
    question: "68, 69, 77, 79, 78, 83, space, 67, 79, 77, 73, 78, 71",
    image: "table.png", // optional: put image file in same folder as index.html
    answer: ["DEMONS COMING", "DEMONSCOMING", "DEMONS COMING", "DEMONSCOMING"],
    success: "CORRECT, The answer is 'DEMONS COMING'. REMEMBER THE NUMBER 98."
  },

  {
    id: "p3",
    title: "Challenge 3: the red numbers",
    story: "watch the video",
    question: "try to find the hidden number sequence in the underworld video",
    video: "movieclue.mp4", // optional: put video file in same folder as index.html
    answer: ["5327", "5 3 2 7", "53 27", "5,3,2,7", "53,27"],
    success: "CORRECT, The answer is '5327'. REMEMBER THE NUMBER 25."

  },
  {
    id: "p4",
    title: "Challenge 4: Find the bark that belongs to Cerberus",
    story: "listen to the sounds",
    question: "Which bark belongs to the three-headed dog of the underworld?",
    image: "dog3heads.png", // optional: put image file in same folder as index.html
    audio: ["dog.mp3", "cereberus.mp3", "tikibark.mp3"],
    answer: ["cereberus"],
    success: "CORRECT, You identified Cerberus's bark! REMEMBER THE NUMBER 7."
  },
  {
    id: "p5",
    title: "Challenge 5: Decode the Python message",
    story: "Use the Python decoder to find the hidden message",
    question: "01011001 01101111 01110101 00100000 01100001 01110010 01100101 00100000 01110011 01101111 00100000 01100011 01101100 01101111 01110011 01100101 00101100 00100000 01100111 01100101 01110100 00100000 01110010 01100101 01100001 01100100 01111001 00100000 01100110 01101111 01110010 00100000 01110100 01101000 01100101 00100000 01001000 01100001 01100100 01100101 01110011 00100000 01100011 01101000 01100001 01101100 01101100 01100101 01101110 01100111 01100101",
    isPythonDecoder: true,
    answer: ["You are so close, get ready for the Hades challenge"],
    success: "CORRECT, You decoded the message! REMEMBER THE NUMBER 76."
  },

  {
    id: "p6",
    title: "Challenge 6: Find the Location",
    story: "Use the street view to find the hidden location",
    question: "Where is the hidden location?",
    streetviewUrl: "https://www.google.com/maps/embed?pb=!4v1786574584613!6m8!1m7!1sZC762wti326MezYWZisNCA!2m2!1d23.2004016069724!2d-106.4299245549489!3f69.38971307816736!4f5.201273950772048!5f0.7479154445833827",
    answer: ["La Cueva Del Diablo", "la cueva del diablo", "Cueva Del Diablo", "cueva del diablo", "Cave of the Devil", "cave of the devil", "Cave of the Devil", "The Cave of the Devil", "the cave of the devil", "The cave of the devil", "the underworld", "underworld", "the underworld", "Underworld", "The Underworld", "the Underworld"],
    success: "CORRECT, You found the location! REMEMBER THE NUMBER 89."
  },
];

new cursoreffects.fairyDustCursor({
  colors: ["#ff0000", "#eefb00", "#000000"],
  fairySymbol: "★",
});




//  ========= 2) FINAL LOCK =========

const FINAL_LOCK = {
  title: "Final Lock",
  story: "You made it to the final lock. One last code to escape!",
  question: "Enter the final code now.",
  hint: "all the numbers you remembered from the puzzles in order, no spaces or commas.",
  answer: ["4,98,25,7,76,89", "4 98 25 7 76 89", "4982577689"],
  success: "✅ Final Lock solved! You escaped!",
  wrong: "❌ Incorrect final code. Try again."
};


//  ========= 3) TIMER + STORAGE =========

const TOTAL_SECONDS = 20 * 60;

const LS_STARTED = "ds_escape_started";
const LS_ENDTIME = "ds_escape_end_ms";
const LS_SOLVED  = "ds_escape_solved";


//  ========= 4) HELPERS =========

function loadJSON(key, fallback) {
  const raw = localStorage.getItem(key);
  if (!raw) return fallback;
  try { return JSON.parse(raw); } catch { return fallback; }
}

function saveJSON(key, obj) {
  localStorage.setItem(key, JSON.stringify(obj));
}

function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}


//  ========= 5) TIMER FUNCTIONALITY =========

function isGameRunning() {
  if (localStorage.getItem(LS_STARTED) !== "true") return false;

  const endRaw = localStorage.getItem(LS_ENDTIME);
  const endMs = parseInt(endRaw || "", 10);
  return Number.isFinite(endMs) && endMs > 0;
}

function getTimeLeftSeconds() {
  if (!isGameRunning()) return TOTAL_SECONDS;

  const endMs = parseInt(localStorage.getItem(LS_ENDTIME), 10);
  return Math.max(0, Math.floor((endMs - Date.now()) / 1000));
}

function formatTime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h}:${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
}

function updateTimerUI() {
  const el = document.getElementById("timer");
  if (!el) return;
  el.textContent = formatTime(getTimeLeftSeconds());
}

function runTimerLoop() {
  updateTimerUI();

  setInterval(() => {
    updateTimerUI();

    if (isGameRunning() && getTimeLeftSeconds() <= 0) {
      const successOn = document.getElementById("screen-success").classList.contains("active");
      if (!successOn) showScreen("screen-fail");
    }
  }, 250);
}


//  ========= 6) GAME START / RESTART =========
//  Start Game ALWAYS resets everything:
//  - timer
//  - solved status

function startNewGame() {
  localStorage.setItem(LS_STARTED, "true");
  localStorage.setItem(LS_ENDTIME, String(Date.now() + TOTAL_SECONDS * 1000));

  const solved = {};
  for (const p of PUZZLES) solved[p.id] = false;
  saveJSON(LS_SOLVED, solved);

  buildMenu();
  showScreen("screen-menu");
}


//  ========= 7) QUIT GAME =========
//  QUIT clears localStorage game data.
//  window.close() may be blocked by browsers, but the save data is still cleared.

function quitGame() {
  localStorage.removeItem(LS_STARTED);
  localStorage.removeItem(LS_ENDTIME);
  localStorage.removeItem(LS_SOLVED);

  window.close();

  showScreen("screen-start");
  updateTimerUI();
}


//  ========= 8) MENU BUILDING =========
//  Menu buttons are generated automatically from PUZZLES.

function buildMenu() {
  const grid = document.getElementById("menuGrid");
  const solved = loadJSON(LS_SOLVED, {});
  grid.innerHTML = "";

  for (const p of PUZZLES) {
    const btn = document.createElement("button");
    btn.className = "menuBtn";

    const status = solved[p.id] ? "✅ Solved" : "🔒 Not Solved";
    btn.innerHTML = `${p.title}<span class="status">${status}</span>`;

    btn.addEventListener("click", () => openPuzzle(p.id));

    grid.appendChild(btn);
  }

  updateFinalLockButton();
}


//  ========= 9) FINAL LOCK BUTTON UNLOCKING =========
//  Final Lock unlocks when ALL puzzles are solved.

function updateFinalLockButton() {
  const solved = loadJSON(LS_SOLVED, {});

  const allSolved = PUZZLES.every(p => solved[p.id] === true);

  const btnFinal = document.getElementById("btnFinalLock");
  const statusFinal = document.getElementById("statusFinal");

  btnFinal.disabled = !allSolved;
  statusFinal.textContent = allSolved ? "✅ Unlocked" : "🔒 Locked";
}


//  ========= 10) PUZZLE SCREEN =========

let currentPuzzle = null;

function openPuzzle(id) {
  currentPuzzle = PUZZLES.find(p => p.id === id);
  if (!currentPuzzle) return;

  document.getElementById("pTitle").textContent = currentPuzzle.title;
  document.getElementById("pStory").textContent = currentPuzzle.story;
  document.getElementById("pQuestion").textContent = currentPuzzle.question;

  // Puzzle Images (optional per puzzle)
  const img = document.getElementById("pImage");
  if (img) {
    if (currentPuzzle.image) {
      img.src = currentPuzzle.image;
      img.style.display = "block";
    } else {
      img.src = "";
      img.style.display = "none";
    }
  }

  // Puzzle Videos (optional per puzzle)
  const vid = document.getElementById("pVideo");
  if (vid) {
    if (currentPuzzle.video) {
      vid.src = currentPuzzle.video;
      vid.style.display = "block";
    } else {
      vid.src = "";
      vid.style.display = "none";
    }
  }

  // Puzzle Audio (optional per puzzle)
  const audioContainer = document.getElementById("pAudioContainer");
  const audioButtonsContainer = document.getElementById("audioButtonsContainer");
  if (currentPuzzle.audio && currentPuzzle.audio.length > 0) {
    audioContainer.style.display = "block";
    audioButtonsContainer.innerHTML = "";
    currentPuzzle.audio.forEach((audioFile, index) => {
      const btn = document.createElement("button");
      btn.textContent = `🔊 Bark ${index + 1}`;
      btn.style.margin = "5px";
      btn.addEventListener("click", () => playAudio(audioFile, audioFile));
      audioButtonsContainer.appendChild(btn);
    });
  } else {
    audioContainer.style.display = "none";
  }

  // Puzzle Python Decoder (optional per puzzle)
  const pythonContainer = document.getElementById("pPythonContainer");
  if (currentPuzzle.isPythonDecoder) {
    pythonContainer.style.display = "block";
    const pythonCodeDiv = document.getElementById("pythonCode");
    pythonCodeDiv.textContent = `def decode_message(encoded_str):
    tokens = encoded_str.strip().split()
    decoded_chars = []

    for token in tokens:
        if set(token).issubset({"0", "1"}):
            decoded_chars.append(chr(int(token, 2)))
        else:
            decoded_chars.append(chr(int(token)))

    return "".join(decoded_chars)

user_input = input("Paste binary or decimal message: ")
print("Decoded Message:", decode_message(user_input))`;
    document.getElementById("pythonInput").value = "";
    document.getElementById("pythonOutput").textContent = "Decoded Message: ";
    document.getElementById("btnRunDecoder").addEventListener("click", runDecoder);
  } else {
    pythonContainer.style.display = "none";
  }

  // Street View embed (optional per puzzle)
  const mapContainer = document.getElementById("pMapContainer");
  if (mapContainer) {
    if (currentPuzzle.streetviewUrl) {
      mapContainer.style.display = "block";
      mapContainer.innerHTML = `<iframe src="${currentPuzzle.streetviewUrl}" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>`;
    } else {
      mapContainer.style.display = "none";
      mapContainer.innerHTML = "";
    }
  }

  document.getElementById("pAnswer").value = "";
  document.getElementById("pMsg").textContent = "";

  showScreen("screen-puzzle");
}

function decodeMessage(encodedStr) {
  const tokens = encodedStr.trim().split(/\s+/);
  const decodedChars = [];

  for (const token of tokens) {
    if (token === '') continue;
    // If token consists only of 0s and 1s, decode as binary
    if (/^[01]+$/.test(token)) {
      decodedChars.push(String.fromCharCode(parseInt(token, 2)));
    } else {
      // Otherwise treat as decimal
      decodedChars.push(String.fromCharCode(parseInt(token)));
    }
  }
  return decodedChars.join('');
}

function runDecoder() {
  const input = document.getElementById("pythonInput").value;
  const output = document.getElementById("pythonOutput");
  
  if (!input.trim()) {
    output.textContent = "Decoded Message: ";
    return;
  }
  
  try {
    const result = decodeMessage(input);
    output.textContent = `Decoded Message: ${result}`;
    document.getElementById("pAnswer").value = result;
  } catch (e) {
    output.textContent = `Error: ${e.message}`;
  }
}
let audioPlayer = null;

function playAudio(audioFile, audioId) {
  selectedAudio = audioId;
  
  if (!audioPlayer) {
    audioPlayer = document.getElementById("pAudioPlayer");
  }
  
  if (audioPlayer) {
    audioPlayer.src = audioFile;
    audioPlayer.load();
    audioPlayer.play().catch(err => {
      console.error("Audio playback error:", err);
      document.getElementById("pMsg").textContent = "❌ Could not play audio. Check file path.";
    });
  }
  
  // Store just the filename without extension
  const filenameNoExt = audioId.replace(/\.[^/.]+$/, "");
  document.getElementById("pAnswer").value = filenameNoExt;
}

function normalizeAnswer(value) {
  return String(value).trim().replace(/\s+/g, " ").replace(/\s*,\s*/g, ",").toUpperCase();
}

function checkPuzzleAnswer() {
  if (!currentPuzzle) return;

  const user = normalizeAnswer(document.getElementById("pAnswer").value);
  const correctAnswer = currentPuzzle.answer;

  const msg = document.getElementById("pMsg");
  const isCorrect = Array.isArray(correctAnswer)
    ? correctAnswer.some(a => normalizeAnswer(a) === user)
    : normalizeAnswer(correctAnswer) === user;

  if (isCorrect) {
    msg.textContent = currentPuzzle.success;

    const solved = loadJSON(LS_SOLVED, {});
    solved[currentPuzzle.id] = true;
    saveJSON(LS_SOLVED, solved);

    // Rebuild menu + re-check Final Lock unlock conditions
    buildMenu();
    updateFinalLockButton();
  } else {
    msg.textContent = "❌ Not correct. Try again.";
  }
}

//  ========= 11) FINAL LOCK ROOM =========

function openFinalLock() {
  document.getElementById("finalInput").value = "";
  document.getElementById("finalMsg").textContent = `Hint: ${FINAL_LOCK.hint}`;
  showScreen("screen-final");
}

function checkFinalCode() {
  const solved = loadJSON(LS_SOLVED, {});
  const msg = document.getElementById("finalMsg");

  const allSolved = PUZZLES.every(p => solved[p.id] === true);
  if (!allSolved) {
    msg.textContent = "⚠ Solve all puzzles before attempting the Final Lock.";
    return;
  }

  const guess = document.getElementById("finalInput").value.trim().toUpperCase();
  const correct = String(FINAL_LOCK.answer).trim().toUpperCase();

  if (guess === correct) {
    showScreen("screen-success");
  } else {
    msg.textContent = FINAL_LOCK.wrong;
  }
}


//  ========= 12) WIRE BUTTONS =========

function wireUI() {
  document.getElementById("btnStartGame").addEventListener("click", startNewGame);

  document.getElementById("btnFinalLock").addEventListener("click", openFinalLock);
  document.getElementById("btnQuit").addEventListener("click", quitGame);

  document.getElementById("btnCheckAnswer").addEventListener("click", checkPuzzleAnswer);
  document.getElementById("btnBackToMenu").addEventListener("click", () => {
    buildMenu();
    showScreen("screen-menu");
  });

  document.getElementById("btnFinalCheck").addEventListener("click", checkFinalCode);
  document.getElementById("btnFinalBack").addEventListener("click", () => {
    buildMenu();
    showScreen("screen-menu");
  });

  document.getElementById("btnPlayAgain").addEventListener("click", startNewGame);
  document.getElementById("btnTryAgain").addEventListener("click", startNewGame);
}


//  ========= 13) INITIALIZE =========
//
//  Runs once when page loads.
//  Timer will display, but will not count down until Start Game is pressed.

wireUI();
runTimerLoop();
updateTimerUI();
