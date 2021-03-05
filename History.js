let historyList = document.querySelector('.history-list')

historyBtn.onclick = (e) => {
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
    clearTable()
}

function addCellToRow(data, tr) {
    const cell = tr.insertCell()
    cell.textContent = data
}

function createExpenseRow(data) {
    const tr = document.createElement('tr')
    addCellToRow(data.name, tr)
    addCellToRow(data.price, tr)

    var newDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

    addCellToRow(newDate, tr)
    addCellToRow(data.expensesCategories, tr)
    return tr;
}

function clearTable() {
    document.querySelectorAll('tr')
        .forEach(x => x.remove())
}

