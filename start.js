
const inputRowsScoresContainer = document.getElementById('input-rows-scores');

for (let i = 0; i < 10; i++) {
  const row = document.createElement('tr');
  let studentNo = i + 1;

  let innerHTML = '';
  for (let j = 0; j < 7; j++) {
    innerHTML += `
      <td class="student-no" colspan="2" id="student-${studentNo}">${studentNo}</td>
      <td class="student-score" colspan="4"><input type="number" class="students-score"></td>
    `;
    studentNo += 10;
  }

  row.innerHTML = innerHTML;
  row.classList.add('table-width');
  inputRowsScoresContainer.appendChild(row);
}



const totalStudentsInput = document.getElementById('total-students-input');
const inputRowsContainer = document.getElementById('input-rows');
const inputRowsContainerError = document.getElementById('input-rows-error');
const inputRowsContainerRanking = document.getElementById('input-rows-ranking');


function calculatePercentage(totalStudents, numberOfStudents, percentageCell) {
  const percentage = (numberOfStudents / totalStudents) * 100 || 0;
  percentageCell.textContent = percentage.toFixed(2) + '%';
}


function handleInputChange() {
  const totalStudents = parseInt(totalStudentsInput.value);

  const inputRows = inputRowsContainer.querySelectorAll('tr');
  const inputRowsError = inputRowsContainerError.querySelectorAll('tr');
  
  let lowestNumberOfStudents = Infinity;
  let lowestFocNumber = '';

  for (let i = 0; i < inputRows.length; i++) {
    const numberCell = inputRows[i].querySelector('td:first-child');
    const numberOfStudentsInput = inputRows[i].querySelector('.number-of-students-input');
    const percentageCell = inputRows[i].querySelector('.percentage');
    const numberOfStudentsErrorCell = inputRowsError[i].querySelector('.number-of-students-error');
    const percentageErrorCell = inputRowsError[i].querySelector('.percentage-error');

    numberCell.textContent = (i + 1).toString();

    const numberOfStudents = parseInt(numberOfStudentsInput.value);
    calculatePercentage(totalStudents, numberOfStudents, percentageCell);

    const frequencyOfError = totalStudents - numberOfStudents;
    numberOfStudentsErrorCell.textContent = frequencyOfError.toString();
    calculatePercentage(totalStudents, frequencyOfError, percentageErrorCell);

    if (numberOfStudents < lowestNumberOfStudents) {
      lowestNumberOfStudents = numberOfStudents;
      lowestFocNumber = numberOfStudentsInput.getAttribute('foc-number');
    }
  }

  const lowestResponse = document.getElementById('lowest-response');
  lowestResponse.value = lowestNumberOfStudents.toString();

  const lowestCorrect = document.getElementById('lowest-correct');
  lowestCorrect.value = lowestFocNumber;
}


totalStudentsInput.addEventListener('input', handleInputChange);

const numRows = 70; 
for (let i = 1; i <= numRows; i++) {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td class="foc-number">${i}</td>
    <td class="number-of-students"><input type="number" class="number-of-students-input" foc-number='${i}'></td>
    <td class="percentage"></td>
  `;
  inputRowsContainer.appendChild(row);
}


for (let i = 1; i <= numRows; i++) {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td class="foc-number">${i}</td>
    <td class="number-of-students-error"></td>
    <td class="percentage-error"></td>
  `;
  inputRowsContainerError.appendChild(row);
}

for (let i = 1; i <= numRows; i++) {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td class="item-ranking-number">${i}</td>
    <td class="item-ranked"></td>
  `;
  inputRowsContainerRanking.appendChild(row);
}


const numberOfStudentsInputs = inputRowsContainer.querySelectorAll('.number-of-students-input');
numberOfStudentsInputs.forEach(input => {
  input.addEventListener('input', handleInputChange);
});

var inputFields = document.querySelectorAll('input[type="number"]');

inputFields.forEach(function (input) {
  
  
  

  input.addEventListener('click', function () {
    this.value = '';
  });
});


const studentsScores = document.querySelectorAll('.students-score');
const meanInput = document.getElementById('mean');
const sdInput = document.getElementById('sd');
const highScoreInput = document.getElementById('high-score');
const lowestScoreInput = document.getElementById('lowest-score');
const numberOfItemsInput = document.getElementById('num-of-items');
const masteryLevelInput = document.getElementById('mastery-level');

studentsScores.forEach((input, index) => {
  input.addEventListener('input', () => {
    calculateMean();
    calculateStandardDeviation();
    findHighScore();
    findLowestScore();
    calculateMasteryLevel();
  });
});

function calculateMean() {
  const scores = Array.from(studentsScores).map(input => parseFloat(input.value));
  const validScores = scores.filter(score => !isNaN(score));
  const mean = validScores.length > 0 ? validScores.reduce((a, b) => a + b) / validScores.length : 0;
  meanInput.value = mean.toFixed(2);
}

function calculateStandardDeviation() {
  const scores = Array.from(studentsScores).map(input => parseFloat(input.value));
  const validScores = scores.filter(score => !isNaN(score));
  const mean = validScores.length > 0 ? validScores.reduce((a, b) => a + b) / validScores.length : 0;
  const squaredDifferences = validScores.map(score => (score - mean) ** 2);
  const variance = squaredDifferences.length > 0 ? squaredDifferences.reduce((a, b) => a + b) / squaredDifferences.length : 0;
  const standardDeviation = Math.sqrt(variance);
  sdInput.value = standardDeviation.toFixed(2);
}

function findHighScore() {
  const scores = Array.from(studentsScores).map(input => parseFloat(input.value));
  const validScores = scores.filter(score => !isNaN(score));
  const highScore = Math.max(...validScores);
  highScoreInput.value = highScore;
}

function findLowestScore() {
  const scores = Array.from(studentsScores).map(input => parseFloat(input.value));
  const validScores = scores.filter(score => !isNaN(score));
  const lowScore = Math.min(...validScores);
  lowestScoreInput.value = lowScore;
}

function calculateMasteryLevel() {
  const mean = parseFloat(meanInput.value);
  const numberOfItems = parseFloat(numberOfItemsInput.value);
  const masteryLevel = (mean / numberOfItems) * 100;
  masteryLevelInput.value = masteryLevel.toFixed(2) + "%";
}


const printButton = document.getElementById("print");
printButton.addEventListener("click", function () {
  const contentToPrint = document.getElementById("main").innerHTML;
  const printWindow = window.open("", "_blank");
  printWindow.document.open();
  printWindow.document.write("<html><head><title>Print</title><link rel='stylesheet' href='style.css'><style>.scroll { overflow: visible !important; } .scroll-up { display: none;}</style></head><body>" + contentToPrint + "</body></html>");
  printWindow.document.close();
  printWindow.print();
});

