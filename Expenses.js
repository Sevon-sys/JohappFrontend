expensesForm.onsubmit = (e) => {
    e.preventDefault()
    console.log(e)
  
    let expensesObj = {
      name: e.target[0].value,
      price: e.target[1].value,
      date: e.target[2].value,
      expensesCategories: {name: e.target[3].value}
    }
  
    fetch('https://localhost:44399/Expenses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(expensesObj)

    })
    expensesForm.reset()
  }
  
  