//Jose Manuel Vazquez Teles - 23136498
//JavaScript page



function updateProgress() {
  const total = 13;
  let answered = 0;



//For loop for progress bar


  for (let i = 1; i <= total; i++) {
      const radios = document.getElementsByName("q" + i);
      for (let r of radios) {
          if (r.checked) {
              answered++;
              break;
          }
      }
  }

  const percent = (answered / total) * 100;

  document.getElementById("progressBar").style.width = percent + "%";
  document.getElementById("progressText").innerText = Math.round(percent) + "% completed";
}



//Download report window print



function DownloadReport(){

  window.print();

}




//calculate assessment score



function calculateScore() {

    let score = 0;
    const total = 13;
    let answered = 0;
    let answers = {};

    for (let i = 1; i <= total; i++) {

        const radios = document.getElementsByName("q" + i);
        let selected = false;

        for (let r of radios) {

            if (r.checked) {

                selected = true;
                answered++;

                answers["q" + i] = r.value;

                if (r.value === "yes") {
                    score++;
                }

                break;
            }
        }

        if (!selected) {
            alert("Please answer all questions before submitting.");
            return;
        }
    }

    localStorage.setItem("score", score);
    localStorage.setItem("answers", JSON.stringify(answers));

    window.location.href = "results.html";
}


// Save checklist progress

function saveChecklist(id) {
  const checkbox = document.getElementById(id);
  localStorage.setItem(id, checkbox.checked);
}


// Load checklist progress

function loadChecklist() {
  const checkboxes = document.querySelectorAll(".check-item");
  checkboxes.forEach(cb => {
      const saved = localStorage.getItem(cb.id);
      if (saved === "true") cb.checked = true;
  });
}



// Check if previous data exists

function checkForSavedData() {
  const score = parseInt(localStorage.getItem("score"));

  if (!isNan(score)) {
      document.getElementById("resumeSection").style.display = "block";

      let risk = "";
      if (score >= 11) risk = "LOW";
      else if (score >= 6) risk = "MEDIUM";
      else risk = "HIGH";

      document.getElementById("lastScore").innerText =
          `Last Score: ${score}/13 (Risk: ${risk})`;
  }
}


// Resume assessment resumes to local storage data from previous assessment.

function resumeAssessment() {
  window.location.href = "results.html";
}


// Clear saved data 

function clearData() {
  localStorage.clear();
  location.reload();
}


// Run on page load

window.onload = function () {
  if (document.getElementById("resumeSection")) {
      checkForSavedData();
  }
};
