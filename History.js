let historyList = document.querySelector('.history-list')
let summeryList = document.querySelector('.summary-list')
let fromDate = document.querySelector('#fromDate')
let toDate = document.querySelector('#toDate')
let summeryForm = document.querySelector('#summaryForm')



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
      let rows = data.map(x => createExpenseRow(x))
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
      let rows = data.map(x => createIncomeRow(x))
      rows.forEach(item => {
        historyList.appendChild(item)
      })
      // ExpensesSum()

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
        let selectCategory = document.querySelector('#selectCategoryId')
        let option = document.createElement('option')
        option.text = category.name
        selectCategory.add(option)
      });
      console.log(data)
  })
}

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

function createExpenseRow(data) {
  const tr = document.createElement('tr')
  addCellToRow(data.name, tr)
  addCellToRow('-' + data.price, tr)
  addCellToRow(data.expensesCategories.name, tr)
  addCellToRow(data.date.split('T')[0], tr)
  return tr;
}

function createIncomeRow(data1) {
  const tr = document.createElement('tr')
  addCellToRow(data1.name, tr)
  addCellToRow(data1.price, tr)
  addCellToRow('', tr)
  addCellToRow(data1.date.split('T')[0], tr)
  return tr;
}

function createExpenseRow2(data1) {
  const tr = document.createElement('tr')
  addCellToRow(data1.name, tr)
  addCellToRow(data1.price, tr)
  addCellToRow(data1.expensesCategories.name, tr)
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
    // data.forEach(e => e.date >= fromDate && e.date <= toDate)
    // {
      let rows = data.map(x => createExpenseRow2(x))
      rows.forEach(item => {
        summeryList.appendChild(item)
      })
    // }
      searchDate()
      // console.log(ExpensesSum())
  })
}

// function ExpensesSum() {
//   let expense, tr, sum, table
//   sum = document.querySelector('.sum')
//   table = document.getElementById('content2Table');
//   tr = table.getElementsByTagName('tr');
//   for (i = 0; i < tr.length; i++) {
//     expense = tr[i].getElementsByTagName('td')[1];
//     sum = expense + sum
//     console.log(expense)
//     console.log(sum)
//   }
//   return sum
// }

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
  let input_startDate, input_stopDate, td_date, table, tr, td_price, summa;

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
    // console.log(td_date[3])                                                      //  <----- Invalid date från databasen utan .textContent
    // felmeddelandet på textContent är dels pga att det redan finns en td i tabellen, "<td>SUM: </td> <td id="sum"></td>
    // den här raden har bara två celler, så när du säger "let td_date = tr[i].getElementsByTagName('td')[3].textContent" så försöker den hitta en tredje cell som inte finns
    
    let start = new Date(input_startDate).toISOString()
    let stop = new Date(input_stopDate).toISOString()
    let date = new Date(td_date).toISOString()
    // console.log(start, stop, date)
    // console.log(start, stop)

    // now you can compare dates correctly
    if(td_date){
      if (date >= start && date <= stop) {
      // if (new Date(td_date).getFullYear() >= new Date(input_startDate).getFullYear() && new Date(td_date).getFullYear() <= new Date(input_stopDate).getFullYear()) {
          // show the row by setting the display property
          // console.log(tr)
          td_price = tr[i].getElementsByTagName('td')[1].innerHTML
          // td_price.price
          tr[i].style.display = 'tr'
          // sum = parseInt(td_price + sum)
          td_price = parseInt(td_price)
          summa += td_price 
          // summa = parseInt(summa)
          console.log(typeof summa)
          console.log(summa)
        } else {
          // hide the row by setting the display property
          tr[i].style.display = 'none'
        }
    } 
  }
}

// function expenseSum() {
//   let table, tr, td_price, sum
//   let sumFoot = document.querySelector('.sum')
//   table = document.getElementById('sumTable')
//   tr = table.getElementsByTagName('tr')

//   for (i = 0; i < tr.length; i++) {
//     td_price = tr[i].getElementsByTagName('td')[1]
//     if (td_price){
//       sum = td_price + sum
//     }
//   }
//   console.log(sum)
// }

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


// var picker = new Lightpick({
//   field: document.getElementById('demo-7'),
//   singleDate: false,
//   selectForward: true,
//   onSelect: function(start, end){
//       var str = '';
//       str += start ? start.format('Do MMMM YYYY') + ' to ' : '';
//       str += end ? end.format('Do MMMM YYYY') : '...';
//       document.getElementById('result-7').innerHTML = str;
//   }
// });

// new Litepicker({
//   element: document.getElementById('datepicker'),
//   element: document.getElementById('start-date'),
//   elementEnd: document.getElementById('end-date'),
//   singleMode: false,
//   allowRepick: true,
// })

// function splitDate(date) {

//   return date
// }
// var picker = new Lightpick({
//   field: document.getElementById('datepicker'),
//   singleDate: false,
//   selectForward: true,
//   onSelect: function(start, end){
//       var str = '';
//       str += start ? start.format('Do MMMM YYYY') + ' to ' : '';
//       str += end ? end.format('Do MMMM YYYY') : '...';
//       document.getElementById('datePicker').innerHTML = str;
//   }
// });
// new Lightpick({
//   field: document.getElementById('demo-7'),
//   singleDate: false,
//   selectForward: true,
//   onSelect: function(start, end){
//       document.getElementById('result-7').innerHTML = rangeText(start, end);
//   }
// });

// var fromDate;
//         document.querySelector('#fromDate').addEventListener('change', function(){
//             fromDate = document.querySelector(this).value;
//             document.querySelector('#toDate').prop('min', function(){
//                 return fromDate;
//             })
//         });
//         var toDate;
//         document.querySelector('#toDate').addEventListener('change', function(){
//             toDate = document.querySelector(this).value;
//             document.querySelector('#fromDate').prop('max', function(){
//                 return toDate;
//             })
//         });



// new Litepicker({
//   element: document.getElementById('datepicker'),
//   element: document.getElementById('start-date'),
//   elementEnd: document.getElementById('end-date'),
//   singleMode: false,
//   allowRepick: true,
// })