// Wait for the DOM to be fully loaded before running the script
document.addEventListener("DOMContentLoaded", () => {
  // --- HELPERS ---
  const elementId = (id) => document.getElementById(id);
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));

  // --- ELEMENT SELECTORS ---
  const introOverlay = elementId("introOverlay");
  const btnStart = elementId("btnStartExperiment");
  const elementLabel = elementId("elementLabel");

  const butterSlice = elementId("butter-slice");
  const butterSlice1 = elementId("butter-slice-1");
  const butter = elementId("butter-block");
  const knife = elementId("knife");
  const plate = elementId("plate");
  const flask = elementId("flask");
  const spatula = elementId("spatula");
  const bottleSoltiuonPouring = elementId("bottleSolutionPouringImage");
  const ethylAlcohol = elementId("EthylAlcohol");
  const ethylAlcoholSolution = elementId("EthylAlcoholSolutionImage");
  const ammonia = elementId("Ammonia");
  const petroleumEtherImage = elementId("PetroleumEtherImage");
  const ammoniaSolution = elementId("AmmoniaSolutionImage");
  const diethylEther = elementId("Diethyl-Ether");
  const diethylEtherSolution = elementId("DiethylEtherSolutionImage");
  const petroleumEther = elementId("Petroleum-Ether");
  const petroleumEtherSolution = elementId("PetroleumEtherSolutionImage");
  const buretteNozzel = elementId("buretteNozzel");
  const burette = elementId("burette");
  const buretteSolution = elementId("buretteSolution");
  const porcelainDishSolution = elementId("porcelainDishSolutionImage");
  const pipetteDiEthylEther = elementId("diethylEtherSolution");
  const drop = elementId("drop");
  const drop1 = elementId("drop1");
  const pipettePouring = elementId("pouring");
  const pouringButter = elementId("pouringButter");
  const pipette = elementId("pipette");
  const waterBath = elementId("waterBathWrapper");
  const stand = elementId("stand");
  const separatingFunnel = elementId("separatingFunnel");
  const weightingMachineWrapper = elementId("weightingMachineWrapper");
  const weightingMachine = elementId("weightingMachine");
  const porcelainDish = elementId("porcelainDish");
  const butterMelted = elementId("butterMelted");
  const flaskButter = elementId("flaskButter");

  const weightingPower = elementId("power");
  const weightingMachineScreen = elementId("screen");
  const weightingMachineTare = elementId("tare");

  const waterBathPower = elementId("waterBathPower");
  const waterBathScreen = elementId("waterBathScreen");
  const tempUp = elementId("tempUp");
  const tempDown = elementId("tempDown");
  const waterBathTimer = elementId("waterBathTimer");
  const waterBathStart = elementId("waterBathStart");
  const tempBtn = elementId("tempBtn");
  const mmBtn = elementId("mm");
  const ssBtn = elementId("ss");

  const btnNext0 = elementId("btnNext");
  const next1 = document.querySelector(".next");
  const next2 = document.querySelector(".next2");
  const next3 = document.querySelector(".next3");
  const next4 = document.querySelector(".next4");
  // next1.style.display="block";
  console.log(next1,"next1");
  const btnNext2 = elementId("btnNext2");
  const btnNext3 = elementId("btnNext3");
  const btnNext4 = elementId("btnNext4");

  // --- STATE ---
  let experimentStep = -1; // Locked initially for Intro
  let isON = false;
  let isTareOn = false;
  let isWaterBathOn = false;
  let currentTemp = 60;
  let timerMinutes = 0;
  let timerSeconds = 0;
  let activeMode = "temp";
  let timerInterval = null;
  let dropCount = 0;
  let isDropping = false;

  // --- INSTRUCTION LOGIC ---
  function updateInstruction(step) {
    const stepBox = document.querySelector(".stepBox");
    if (!stepBox) return;

    let msg = "";
    switch (step) {
      case 1: msg = "Click the knife to cut a butter slice."; break;
      case 2: msg = "Turn on the Weighing Machine."; break;
      case 3: msg = "Click the Empty Flask to weigh it."; break;
      case 4: msg = " Click 'Tare' to reset weight to 0.00g."; break;
      case 5: msg = "Click the Spatula to add butter to the flask."; break;
      case 6: msg = "Click the Flask to take it out of the weighting machine."; break;
      case 7: msg = "Click 'Next' (Bottom Right) to proceed."; break;
      case 8: msg = "Click on the Neutralized Ethanol to add 50ml of it in the flask."; break;
      case 9: msg = "Click 'Next' (Bottom Right) to proceed."; break;
      case 10: msg = "Click Flask to move to Water Bath."; break;
      case 11: msg = "Set Temp 50°C, Timer 3-4m, then Start."; break;
      case 12: msg = "Click 'Next' (Bottom Right) to proceed"; break;
      case 13: msg = "Click Pipette to add Phlagja."; break;
      case 14: msg = "Click Pipette to add drops."; break;
      case 15: msg = "Drops added. Click Pipette to move it aside."; break;
      case 16: msg = "Click 'Next' (Bottom Right) to proceed."; break;
      case 17: msg = "Click Flask to place under Burette."; break;
      case 18: msg = "Click on the Burette Nozzel to perfrom the titration"; break;
      default: msg = "Follow the on-screen procedures.";
    }
    stepBox.innerHTML = `<span style="color: rgb(187, 4, 4);">Instruction:</span> ${msg}`;
  }

  // --- 1. INTRO & START FUNCTIONALITY ---
  if (btnStart) {
    btnStart.addEventListener("click", async () => {
      if (introOverlay) {
        introOverlay.style.opacity = "0";
        await wait(800);
        introOverlay.style.display = "none";
      }

      await runIntroductionSequence();

      experimentStep = 1;
      updateInstruction(1);

      const stepBox = document.querySelector(".stepBox");
      if (stepBox) {
        stepBox.style.transform = "scale(1.1)";
        await wait(200);
        stepBox.style.transform = "scale(1)";
      }
    });
  } else {
    // Fallback if no button
    experimentStep = 1;
    updateInstruction(1);
  }

  async function runIntroductionSequence() {
    const introSequence = [
      { id: "butter-block", text: "Butter Sample" },
      { id: "knife", text: "Knife" },
      { id: "plate", text: "Porcelain Plate" },
      { id: "flask", text: "Conical Flask" },
      { id: "spatula", text: "Spatula" },
      { id: "weightingMachineWrapper", text: "Digital Balance" },
    ];

    for (const item of introSequence) {
      const el = elementId(item.id);
      if (!el || getComputedStyle(el).display === "none") continue;

      el.classList.add("intro-highlight");

      if (elementLabel) {
        const rect = el.getBoundingClientRect();
        const containerRect = elementId("container").getBoundingClientRect();
        const offsetTop = rect.top - containerRect.top;
        const offsetLeft = rect.left - containerRect.left;
        const labelTop = offsetTop - 40;
        const labelLeft = offsetLeft + rect.width / 2;

        elementLabel.style.top = `${labelTop}px`;
        elementLabel.style.left = `${labelLeft}px`;
        elementLabel.style.transform = "translateX(-50%)";
        elementLabel.innerText = item.text;
        elementLabel.classList.remove("label-hidden");
        elementLabel.classList.add("label-visible");
      }

      await wait(1500);

      el.classList.remove("intro-highlight");
      if (elementLabel) {
        elementLabel.classList.remove("label-visible");
        elementLabel.classList.add("label-hidden");
      }
      await wait(200);
    }
  }

  // --- 2. EXPERIMENT LOGIC ---

  knife.addEventListener("click", async () => {
    if (experimentStep !== 1) return;
    experimentStep = -1; // Lock

    knife.style.top = "50%";
    knife.style.left = "60%";
    await wait(1000);
    knife.style.top = "74%";
    await wait(600);
    butter.style.width = "10%";
    butterSlice.style.display = "block";
    await wait(1000);
    knife.style.top = "50%";
    await wait(1000);
    knife.style.left = "80%";
    await wait(1000);
    knife.style.top = "75%";
    console.log("Step 1 Complete: Butter sliced");

    experimentStep = 2; // Next: Power Machine
    updateInstruction(2);
  });

  weightingPower.addEventListener("click", () => {
    if (experimentStep === 2) {
      weightingMachineScreen.innerText = "0.00g";
      experimentStep = 3; // Next: Place Empty Flask
      updateInstruction(3);
      console.log("Step 2 Complete: Machine On. Next: Place Flask (Step 3)");
    }
  });

  // --- FLASK LISTENER ---
  flask.addEventListener("click", async () => {
    const originalTop = "55%";
    const originalLeft = "40%";

    // STEP 3: Move Empty Flask to Machine
    if (experimentStep === 3) {
      console.log("flask step", experimentStep);
      experimentStep = -1; // Lock

      flask.style.top = "22.5%";
      await wait(1000);
      flask.style.left = "11%";
      await wait(1000);

      // Value from your code: calc(69% - 18vw)
      flask.style.top = "calc(69% - 18vw)";

      await wait(1000);
      weightingMachineScreen.innerText = "250.00g";
      console.log("Step 3 Complete: Empty Flask Weighed");

      experimentStep = 4; // Next: Tare
      updateInstruction(4);
    }
    // STEP 6: Move Flask + Butter
    else if (experimentStep === 6) {
      console.log("flask step", experimentStep);
      experimentStep = -1; // Lock

      // Lift both
      flask.style.top = "10.5%";
      butterSlice.style.top = "44%";
      await wait(1000);

      // Move both
      flask.style.left = "40%";
      butterSlice.style.left = "43.6%";
      await wait(1000);

      // Drop - Values from your code
      flask.style.top = "calc(90% - 18vw)";
      butterSlice.style.top = "83.6%";

      await wait(1000);
      console.log("Step 6 Complete: Filled Flask Weighed");
      next1.style.display="block";

      experimentStep = 7; // Next: Move to Water Bath
      updateInstruction(7);
    }
    // STEP 7 (Logic was labeled as 10 in your file, preserving values)
    else if (experimentStep === 10) {
      console.log("flask step for the waterBath", experimentStep);
      experimentStep = -1; // Lock
      flask.style.top = "-7%";
      butterSlice.style.top = "26%";
      await wait(1000);
      flask.style.left = "68%";
      butterSlice.style.left = "71.6%";
      await wait(1000);
      flask.style.top = "29%";
      butterSlice.style.top = "62.5%";
      console.log("Step 7 Complete: Flask in Water Bath");

      experimentStep = 11; // Next: Start Water Bath
      updateInstruction(11);
    }
    // STEP 9: Move Melted Flask to Funnel Area
    else if (experimentStep === 9) {
      console.log("flask step", experimentStep);
      experimentStep = -1; // Lock
      flask.style.top = "20%";
      await wait(1000);
      flask.style.left = "25%";
      flask.style.transform = "rotate(-110deg)";
      await wait(1000);

      flaskButter.style.display = "block";
      flaskButter.classList.add("butterFlaskFilling");
      await wait(2000);

      flaskButter.classList.remove("butterFlaskFilling");
      flask.style.transform = "rotate(-120deg)";
      butterMelted.classList.add("reducing1");
      await wait(20);

      flaskButter.classList.add("reducingButter");
      pouringButter.style.display = "block";
      pouringButter.style.animationDuration = "2s";
      pouringButter.classList.add("reducing1");

      await wait(3000);

      // Reset
      flask.style.top = originalTop;
      flask.style.left = originalLeft;
      flask.style.transform = "rotate(0deg)";
      butterSlice.style.display = "none";
      console.log("Step 9 Complete: Butter Poured");

      experimentStep = 10; // Next: Add Diethyl Ether
      updateInstruction(10);
    }
    // STEP 17: Move to Burette (Values from your code)
    else if (experimentStep === 17) {
      console.log("Step 17: Scaling and Moving Flask under Burette");
      experimentStep = -1; // Lock UI

      // 1. Scale Down
      flask.style.transform = "scale(0.8)";
      flask.style.zIndex = 28;
      await wait(800);

      // 2. Move to position (Under Burette)
      flask.style.top = "55%";
      await wait(900);
      flask.style.left = "12%";

      // Wait for animation
      await wait(1000);
      flask.style.top = "52%";

      // Unlock next step (Titration)
      experimentStep = 18;
      updateInstruction(18);
    }
  });

  weightingMachineTare.addEventListener("click", () => {
    if (experimentStep === 4) {
      weightingMachineScreen.innerText = "0.00g";
      experimentStep = 5; // Next: Spatula
      updateInstruction(5);
      console.log("Step 4 Complete: Tare Pressed");
    }
  });

  spatula.addEventListener("click", async () => {
    if (experimentStep !== 5) return;
    experimentStep = -1; // Lock

    const originalTop = "85%";
    const originalLeft = "5%";

    spatula.style.top = "40%";
    await wait(1000);
    spatula.style.left = "68.4%";
    await wait(1000);
    spatula.style.top = "72%";
    spatula.style.transform = "rotate(-30deg)";
    await wait(1000);

    butterSlice.style.height = "6%";
    butterSlice1.style.display = "none";
    spatula.style.top = "25%";
    spatula.style.transform = "rotate(0deg)";
    butterSlice.style.top = "23%";
    await wait(1000);

    spatula.style.left = "14.7%";
    butterSlice.style.left = "14.7%";
    await wait(1000);

    spatula.style.top = "25%";
    butterSlice.style.top = "23%";
    spatula.style.transform = "rotate(-10deg)";
    await wait(300);

    butterSlice.style.zIndex = 10;
    butterSlice.style.top = "63%"; // Inside flask on machine

    await wait(1000);
    weightingMachineScreen.innerText = "5.00g";

    // Reset Spatula
    spatula.style.transform = "rotate(0deg)";
    await wait(1000);
    spatula.style.left = originalLeft;
    await wait(1000);
    spatula.style.top = originalTop;

    console.log("Step 5 Complete: Butter Added");
    experimentStep = 6; // Next: Weigh Filled Flask
    
    updateInstruction(6);
  });

  waterBathStart.addEventListener("click", async () => {
    if (experimentStep !== 11) return;

    if (!isWaterBathOn) {
      alert("Please turn on the water bath.");
      return;
    }
    if (currentTemp !== 50) {
      alert("Please set the temperature to 50°C.");
      return;
    }
    if (timerMinutes < 1 || timerMinutes > 2) {
      alert("Please set the timer between 3 and 4 minutes.");
      return;
    }

    experimentStep = -1; // Lock

    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      if (timerMinutes === 0 && timerSeconds === 0) {
        clearInterval(timerInterval);
        alert("Timer Done!");
      }
      if (timerSeconds === 0) {
        timerMinutes--;
        timerSeconds = 59;
      } else {
        timerSeconds--;
      }
      updateScreen();
    }, 100);

    // Animation
    butterSlice.classList.add("reducing1");
    butterMelted.style.display = "block";
    butterMelted.classList.add("filling");

    await wait(5000);
    butterSlice.classList.remove("reducing1");
    butterMelted.classList.remove("filling");

    // Move Flask Back to Table
    await wait(3000);
    flask.style.top = "-10%";
    await wait(1000);
    flask.style.left = "40%";
    await wait(1000);
    flask.style.top = "55%";

    experimentStep = 12; // Next Step
    next3.style.display="block";
    updateInstruction(12);
  });

  diethylEther.addEventListener("click", async () => {
    if (experimentStep !== 8) return;
    experimentStep = -1; // Lock

    diethylEther.style.top = "5%";
    await wait(1000);
    diethylEther.style.left = "44%";
    await wait(1000);
    diethylEther.style.top = "calc(66% - 18vw)";
    diethylEther.style.transform = "rotate(-90deg)";
    await wait(1000);
    diethylEther.style.transform = "rotate(-100deg)";
    await wait(2000);

    if (diethylEtherSolution) diethylEtherSolution.classList.add("reducing1");
    if (bottleSoltiuonPouring) {
      bottleSoltiuonPouring.style.display = "block";
      bottleSoltiuonPouring.classList.add("reducing2");
    }

    await wait(1200);

    if (pouring) {
      pouring.style.display = "block";
      pouring.classList.add("pouring-animation");
    }

    await wait(500);
    bottleSoltiuonPouring.classList.remove("reducing2");
    void bottleSoltiuonPouring.offsetWidth;
    bottleSoltiuonPouring.classList.add("reverseReducing");

    if (butterMelted) {
      butterMelted.style.display = "block";
      butterMelted.classList.add("filling");
    }
    await wait(2000);

    diethylEther.style.transform = "rotate(0deg)";
    diethylEther.style.top = "40%";
    diethylEther.style.left = "65%";

    console.log("Step 8 Complete: Diethyl Ether Added");
    next2.style.display="block";
    experimentStep = 9;
    updateInstruction(9);
  });

  pipette.addEventListener("click", async () => {
    pipette.style.transform = "rotate(0deg)";
    const originalTop = "72%";
    const originalLeft = "21.9%";

    // --- DROPPER LOGIC (Step 14) ---
    if (experimentStep === 14 && !isDropping) {
      isDropping = true; // Lock clicks

      // 1. Reduce Liquid Level
      if (dropCount === 0) {
        pipetteDiEthylEther.classList.add("reducingBurette1");
      } else if (dropCount === 1) {
        pipetteDiEthylEther.classList.remove("reducingBurette1");
        pipetteDiEthylEther.classList.add("reducingBurette2");
      }

      // 2. Drop Animation
      drop1.style.display = "block";
      drop1.classList.remove("drop-form", "drop-fall");
      void drop1.offsetWidth; // Force Reflow

      drop1.classList.add("drop-form");
      await wait(500);

      drop1.classList.remove("drop-form");
      drop1.classList.add("drop-fall");
      await wait(1000);

      drop1.style.display = "none";

      dropCount++;
      if (dropCount >= 2) {
        console.log("Two drops added. Moving to next step.");
        next4.style.display="block";
        experimentStep = 15;
        updateInstruction(15);
      }

      isDropping = false;
    }
    // --- STEP 15: Move Pipette Away ---
    else if (experimentStep === 15) {
      experimentStep = -1;
      pipette.style.top = "72%";
      pipette.style.left = "21%";
      pipette.style.transform = "rotate(90deg)";

      experimentStep = 16;
      updateInstruction(16);
    }
    // --- STEP 13: Reagent Logic ---
    else if (experimentStep === 13) {
      experimentStep = -1;
      pipette.style.top = "-10%";
      await wait(1000);
      pipette.style.left = "83%"; // Move over bottle
      await wait(1000);
      pipette.style.top = "40%"; // Move down to bottle
      await wait(1000);
      petroleumEtherSolution.classList.add("reducing");
      pipetteDiEthylEther.style.display = "block";
      pipetteDiEthylEther.classList.remove("filling", "reducing", "reducing1", "reducing2");
      void pipetteDiEthylEther.offsetWidth;
      pipetteDiEthylEther.classList.add("filling");
      await wait(2000);
      
      // Pour into funnel/flask
      pipette.style.top = "0%";
      await wait(1000);
      pipette.style.left = "43%";
      await wait(1000);
      pipette.style.top = "20%";
      pipetteDiEthylEther.classList.remove("filling");
      await wait(1200);
      
      pipettePouring.style.display = "none";
      console.log(experimentStep);
      experimentStep = 14; 
      updateInstruction(14);
      console.log(experimentStep);
    }
  });

  porcelainDish.addEventListener("click", async () => {
    if (experimentStep !== 13) return;
    experimentStep = -1;
    const originalTop = "72%";
    const originalLeft = "25%";
    porcelainDish.style.top = "20%";
    await wait(1000);
    porcelainDish.style.left = "65%";
    await wait(1000);
    porcelainDish.style.top = "60%";
    await wait(2000);
    porcelainDish.style.top = "20%";
    await wait(1000);
    porcelainDish.style.left = originalLeft;
    await wait(1000);
    porcelainDish.style.top = originalTop;
    experimentStep = 14;
    updateInstruction(14);
  });

  // --- UI CONTROLS ---
  function updateScreen() {
    waterBathScreen.innerText = isWaterBathOn ? `${currentTemp}°C` : "--°C";
    waterBathTimer.innerText = `${String(timerMinutes).padStart(2, "0")}:${String(timerSeconds).padStart(2, "0")}`;
  }

  waterBathPower.addEventListener("click", () => {
    isWaterBathOn = !isWaterBathOn;
    currentTemp = 60;
    timerMinutes = 0;
    timerSeconds = 0;
    if (timerInterval) clearInterval(timerInterval);
    waterBathPower.style.backgroundColor = isWaterBathOn ? "green" : "red";
    updateScreen();
  });

  tempBtn.addEventListener("click", () => (activeMode = "temp"));
  mmBtn.addEventListener("click", () => (activeMode = "mm"));
  ssBtn.addEventListener("click", () => (activeMode = "ss"));

  tempUp.addEventListener("click", () => {
    if (!isWaterBathOn) return;
    if (activeMode === "temp" && currentTemp < 100) currentTemp++;
    else if (activeMode === "mm" && timerMinutes < 99) timerMinutes++;
    else if (activeMode === "ss" && timerSeconds < 59) timerSeconds++;
    updateScreen();
  });

  tempDown.addEventListener("click", () => {
    if (!isWaterBathOn) return;
    if (activeMode === "temp" && currentTemp > 0) currentTemp--;
    else if (activeMode === "mm" && timerMinutes > 0) timerMinutes--;
    else if (activeMode === "ss" && timerSeconds > 0) timerSeconds--;
    updateScreen();
  });

  updateScreen();

  // --- DEBUG FUNCTIONS ---
  function setupScene(step) {
    if (step === "start") {
      if (experimentStep !== 7) return;
      // weightingMachine.style.display="none";
      next1.style.display="none";
      knife.style.display="none";
      butter.style.display="none";
      spatula.style.display="none";
      petroleumEther.style.display = "none";
      // stand.style.display = "block";
      waterBath.style.display = "none";
      diethylEther.style.display = "block";
      petroleumEther.style.display = "none";
      // knife.style.display = "block";
      plate.style.display = "none";
      butterSlice.style.display = "block";
      weightingMachineWrapper.style.display = "block";
      flask.style.display = "block";
      experimentStep = 8;
      updateInstruction(8);
    } 
    else if (step === "nextButton2") {
      if (experimentStep !== 9) return;
      next2.style.display="none";
      waterBath.style.display = "block";
      diethylEther.style.display = "none";
      petroleumEther.style.display = "none";
      knife.style.display = "none";
      flask.style.display = "block";
      butterSlice.style.display = "block";
      experimentStep = 10;
      updateInstruction(10);
    } 
    else if (step === "12") {
      if (experimentStep !== 12) return;
      next3.style.display="none";
      waterBath.style.display="none"
      butterSlice.style.display="none"
      pipette.style.display = "block";
      // diethylEther.style.display = "block";
      petroleumEther.style.display = "block";
      experimentStep = 13;
      updateInstruction(13);
      console.log(experimentStep);
    } 
    else if (step === "nextButton4") {
      // Direct testing enabled as per your Step 17 requirement
      experimentStep = -1;
      next4.style.display="none";
      weightingMachine.style.display="none";
      stand.style.display = "block";
      burette.style.display = "block";
      buretteSolution.style.display = "block";
      buretteNozzel.style.display = "block";
      flask.style.display = "block";
      
      // Default position before Step 17 animation
      flask.style.top = "55%";
      flask.style.left = "40%";
      flask.style.transform = "scale(1)";

      experimentStep = 17;
      updateInstruction(17);
    }
  }

  if (btnNext3) btnNext3.addEventListener("click", () => setupScene("12"));
  if (btnNext0) btnNext0.addEventListener("click", () => setupScene("start"));
  if (btnNext2) btnNext2.addEventListener("click", () => setupScene("nextButton2"));
  if (btnNext4) btnNext4.addEventListener("click", () => setupScene("nextButton4"));

  if (buretteNozzel) {
    buretteNozzel.addEventListener("click", async () => {
      if (experimentStep) {
        isDropping = true;
        drop.style.display = "block";
        drop.classList.remove("drop-form", "drop-fall");
        void drop1.offsetWidth;

        drop.classList.add("drop-form");
        await wait(500);

        drop.classList.remove("drop-form");
        drop.classList.add("drop-fall");
        await wait(1000);

        drop.style.display = "none";
        dropCount++;
        if (dropCount >= 2) {
          experimentStep = 10;
          dropCount = 0;
        }
        isDropping = false;
      }
    });
  }
});