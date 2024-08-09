document.addEventListener('DOMContentLoaded', function() {
    const tableBody = document.querySelector('#transactions-table tbody');
    const balanceElement = document.querySelector('#balance');
    const form = document.querySelector('#transaction-form');

    // Initialize all of thetransactions 
    let transactions = [];

    // Function to update the table with transactions
    function updateTable() {
        tableBody.innerHTML = '';
        transactions.forEach((transaction, index) => {
            const row = document.createElement('tr');

            const dateCell = document.createElement('td');
            dateCell.textContent = transaction.date;
            row.appendChild(dateCell);

            const descriptionCell = document.createElement('td');
            descriptionCell.textContent = transaction.description;
            row.appendChild(descriptionCell);

            const categoryCell = document.createElement('td');
            categoryCell.textContent = transaction.category;
            row.appendChild(categoryCell);

            const amountCell = document.createElement('td');
            amountCell.textContent = parseFloat(transaction.amount).toFixed(2);
            row.appendChild(amountCell);

            const actionCell = document.createElement('td');
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => {
                transactions.splice(index, 1); // Remove transaction delete on button click that is the delet button
                updateTable(); 
                updateBalance(); // Refresh bal..
            });
            actionCell.appendChild(deleteButton);
            row.appendChild(actionCell);

            tableBody.appendChild(row);
        });
    }

    // Function to update the balance
    function updateBalance() {
        const total = transactions.reduce((sum, transaction) => sum + parseFloat(transaction.amount), 0);
        balanceElement.textContent = total.toFixed(2);
    }

    // Fetch data from db.json
    fetch('db.json')
        .then(response => response.json())
        .then(data => {
            transactions = data.transactions.map(transaction => ({
                ...transaction,
                amount: parseFloat(transaction.amount) // Ensure amount is a number
            }));
            updateTable(); 
            // Set initial balance from db.json
            updateBalance(); // Set initial balance from db.json
        })
        .catch(error => {
            console.error('Error fetching transactions:', error);
        });

    // Handle form submission to add new transaction
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const date = document.querySelector('#date').value;
        const description = document.querySelector('#description').value;
        const category = document.querySelector('#category').value;
        const amount = parseFloat(document.querySelector('#amount').value);



        const newTransaction = { date, description, category, amount };
        transactions.push(newTransaction);
// Refresh table with new transaction
        updateTable(); 
        updateBalance();

        form.reset(); // Clear form inputs atersubmission of the form..
    });
});
