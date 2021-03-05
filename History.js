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
        console.log(data)
        let rows = data.map(x => createExpenseRow(x))
        rows.forEach(item => {
            historyList.appendChild(item)
        })
    })
    // clearTable()
}

function sortDates(data) {
    const sortDate = data.slice().sort((a, b) => b.date - a.date)
    return sortDate;
}

function addCellToRow(data, tr) {
    const cell = tr.insertCell()
    cell.textContent = data
}

function createExpenseRow(data) {
    const tr = document.createElement('tr')
    addCellToRow(data.name, tr)
    addCellToRow(data.price, tr)

    // var newDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    addCellToRow(data.expensesCategories.name, tr)
    addCellToRow(data.date, tr)
    return tr;
}

function clearTable() {
    document.querySelectorAll('tr')
        .forEach(x => x.remove())
}

// Pågående projekt----------------------------------
function convertDate(d) {
    var str = d.split("/", 1)[0].trim()
    var p = str.split("-")
    return new Date(p[0] + "-"+p[1]+"-" + p[2]+"-"+p[3])
  }

  function sortByDate() {
    var tbody = document.querySelector("#content2 tbody")
    // get trs as array for ease of use
    var rows = [].slice.call(tbody.querySelectorAll("tr"))

    rows.sort(function(a, b) {
      return convertDate(a.cells[3].innerHTML)})

    rows.forEach(function(v) {
      tbody.appendChild(v) // note that .appendChild() *moves* elements
    });
  }

  document.querySelector('.sortBtn').addEventListener('click', sortByDate)