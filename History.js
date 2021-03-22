let historyList = document.querySelector('.history-list')
let summeryList = document.querySelector('.summary-list')
let fromDate = document.querySelector('#fromDate')
let toDate = document.querySelector('#toDate')
let summeryForm = document.querySelector('#summaryForm')
let selectCategory, option;
let optionClass = document.querySelector('.optionClass')



window.onload = (e) => {
  e.preventDefault();
  // clearList()
  fetch('https://localhost:44399/Expenses', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(resp => resp.json())
    .then(data => {
      let rows = data.map(x => populateHistoryTableExpenses(x))
      rows.forEach(item => {
        historyList.appendChild(item)
      })
  })

  fetch('https://localhost:44399/Income', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(resp => resp.json())
    .then(data => {
      let rows = data.map(x => populateHistoryTableIncome(x))
            rows.forEach(item => {
        historyList.appendChild(item)
      })
      // sum()
  })

  fetch('https://localhost:44399/ExpensesCategories', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
    }).then(resp => resp.json())
    .then(data => {
      data.forEach(category => {
        selectCategory = document.querySelector('#selectCategoryId')
        option = document.createElement('option')
        option.text = category.name
        selectCategory.add(option)
        // let x = document.getElementById('selectCategoryId').selectedIndex;
        // console.log(document.getElementsByClassName("optionClass")[x].text)
      });
    })
  }
let options = document.getElementsByTagName('option')
console.log(options.innerText())

// function sum() {
//   let rows = document.querySelectorAll("2Table tr");
//   let sum = 0;
//   for (let i = 0; i < rows.length-1; i++) {
//       sum += Number(rows[i].textContent);
//   }

//   document.getElementById('sum').textContent = sum;
//   return sum
// }

function addCellToRow(data, tr) {
  const cell = tr.insertCell()
  cell.textContent = data
}

function populateHistoryTableExpenses(data) {
  const tr = document.createElement('tr')
  addCellToRow(data.name, tr)
  addCellToRow('-' + data.price, tr)
  addCellToRow(data.expensesCategories.name, tr)
  addCellToRow(data.date.split('T')[0], tr)
  return tr;
}

function populateHistoryTableIncome(data1) {
  const tr = document.createElement('tr')
  addCellToRow(data1.name, tr)
  addCellToRow(data1.price, tr)
  addCellToRow('', tr)
  addCellToRow(data1.date.split('T')[0], tr)
  return tr;
}

function populateSummaryTable(data1) {
  const tr = document.createElement('tr')
  addCellToRow(data1.name, tr)
  addCellToRow(data1.price, tr)
  addCellToRow(data1.date.split('T')[0], tr)
  return tr;
}

summaryForm.onsubmit = (e) => {
  e.preventDefault()
  clearTable()
  // fromDate = e.target[0].value,
  // toDate = e.target[1].value
  
  fetch('https://localhost:44399/Expenses', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(repsonse => repsonse.json())
  .then(data => {
    // data.forEach(e.expensesCategories.name)
    // data.forEach(e => e.date >= fromDate && e.date <= toDate)
    // {
      let rows = data.map(x => populateSummaryTable(x))
      rows.forEach(item => {
        summeryList.appendChild(item)
      })
    // }
    searchDate()
    // console.log(data)
  })
}

function filterFunction() {
  let input, filter, table, tr, td, i, txtValue;
  input = document.getElementById('filter');
  filter = input.value.toUpperCase();
  table = document.getElementById('content2Table');
  tr = table.getElementsByTagName('tr');
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName('td')[2];
    if (td) {
      txtValue = td.textContent;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = '';
      } else {
        tr[i].style.display = 'none';
      }
    }
  }
}

// -------------- WORK IN PROGRESS ---------------
function searchDate() {
  let input_startDate, input_stopDate, td_date, table, tr, i;

  // get the values and convert to date
  input_startDate = document.getElementById('fromDate').value
  input_stopDate = document.getElementById('toDate').value

  table = document.getElementById('sumTable')
  tr = table.getElementsByTagName('tr')
  // console.log(input_startDate)
  // console.log(input_stopDate)

  for (i = 0; i < tr.length; i++) {
    // you need to get the text and convert to date
    td_date = tr[i].getElementsByTagName('td')[2].textContent            //  <----- Felmeddelande på textContent
    // console.log(td_date)                                                      //  <----- Invalid date från databasen utan .textContent
    // felmeddelandet på textContent är dels pga att det redan finns en td i tabellen, "<td>SUM: </td> <td id="sum"></td>
    // den här raden har bara två celler, så när du säger "let td_date = tr[i].getElementsByTagName('td')[3].textContent" så försöker den hitta en tredje cell som inte finns
    
    let startYear = new Date(input_startDate).getFullYear()
    let startMonth = new Date(input_startDate).getMonth()
    let stopYear = new Date(input_stopDate).getFullYear()
    let stopMonth = new Date(input_stopDate).getMonth()
    let dateYear = new Date(td_date).getFullYear()
    let dateMonth = new Date(td_date).getMonth()
    // console.log(start, stop, date)
    // console.log(start, stop)
    
    // now you can compare dates correctly
    if(td_date){
      if (dateYear >= startYear 
      && dateYear <= stopYear 
      && dateMonth >= startMonth 
      && dateMonth <= stopMonth) {
      // if (new Date(td_date).getFullYear() >= new Date(input_startDate).getFullYear() && new Date(td_date).getFullYear() <= new Date(input_stopDate).getFullYear()) {
          // show the row by setting the display property
          // console.log(tr)
          tr[i].style.display = 'tr'
      }else {
          // hide the row by setting the display property
          tr[i].style.display = 'none'
       }
    } 
  }
}

//-----------------------------------------------------

// Av någon anledning så Clearas 'th' och allt annat i tabellen när man kör searchDate().
// För 'th' ligger i en 'tr'
function clearTable() {
  document.querySelectorAll('.summary-list tr')
    .forEach(x => x.remove())
}

function clearList() {
  document.querySelectorAll('.selectCategory option')
    .forEach(x => x.remove())
}