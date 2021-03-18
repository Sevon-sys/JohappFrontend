let historyList = document.querySelector('.history-list')


window.onload = (e) => {
    e.preventDefault();
    fetch('https://localhost:44399/Expenses', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(repsonse => repsonse.json())
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
  }).then(repsonse => repsonse.json())
  .then(data1 => {
      let rows = data1.map(x => createExpenseRow1(x))
      rows.forEach(item => {
          historyList.appendChild(item)
      })
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

function addCellToRow(data, tr) {
    const cell = tr.insertCell()
    cell.textContent = data
}

function createExpenseRow(data) {
    const tr = document.createElement('tr')
    addCellToRow(data.name, tr)
    addCellToRow('-'+data.price, tr)
    addCellToRow(data.expensesCategories.name, tr)
    addCellToRow(data.date.split('T')[0], tr)
    return tr;
}

function addCellToRow1(data1, tr) {
  const cell = tr.insertCell()
  cell.textContent = data1
}

function createExpenseRow1(data1) {
  const tr = document.createElement('tr')
  addCellToRow1(data1.name, tr)
  addCellToRow1(data1.price, tr)
  addCellToRow1('', tr)
  addCellToRow1(data1.date.split('T')[0], tr)
  return tr;
}