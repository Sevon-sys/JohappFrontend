let historyList = document.querySelector('.history-list')

historyBtn.onclick = (e) => {
    e.preventDefault();
    clearTable()
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
}

function addCellToRow(data, tr) {
    const cell = tr.insertCell()
    cell.textContent = data
}

function createExpenseRow(data) {
    const tr = document.createElement('tr')
    addCellToRow(data.name, tr)
    addCellToRow(data.price, tr)
    addCellToRow(data.date, tr)
    addCellToRow(data.expensesCategories, tr)
    return tr;
}

function clearTable() {
    document.querySelectorAll('tr')
        .forEach(x => x.remove())
}

