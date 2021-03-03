const historyList = document.querySelector('.history-list')

historyBtn.onclick = (e) => {
    e.preventDefault();

    fetch('https://localhost:44399/Expenses', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(repsonse => repsonse.json())
    .then(data => {
        let rows = data.map(x => createExpenseRow(x))
        let divTable = document.getElementById('divTable')
        rows.forEach(item => {
            divTable.appendChild(item)
        })
    })
    
}

function createExpenseRow(data){
    let row = document.createElement('tr')
    .appendChild(
        document.createElement('td')
    )
    return row;
}
