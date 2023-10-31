const button = document.getElementById('button');
const itemList = document.getElementById('items-list');
var form=document.getElementById('MajorCon');

// fetching and initially hiding editrecord form in a variable called Show
var show=document.getElementById('editForm');
show.style.display='none';

//Array of all Records
let items = [];

//Adding onclick listner to add button and fetching records
button.addEventListener('click', function (event) {
    event.preventDefault();
    const idInput = document.getElementById('id');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    
    //object
    const newItem = {
        id: idInput.value.trim(),
        name: nameInput.value.trim(),
        email: emailInput.value.trim()
    };

    //checking not null constraint
    if (newItem.id !== '' && newItem.name !== '' && newItem.email !== '') {
        items.push(newItem);
        updateItemsList();
        saveItemsToCookies();
        idInput.value = '';
        nameInput.value = '';
        emailInput.value = '';
    }
});



//Function for updating Record
function updateItemsList() {
    itemList.innerHTML = '';
    const table = document.createElement('table');
    table.classList.add(
            );

    // Create table header
    const thead = document.createElement('thead');
    thead.classList.add(
    );
    const headerRow = document.createElement('tr');
    headerRow.innerHTML = `
        <th class="tablehead">
            ID
        </th>
        <th class="tablehead">
            Name
        </th>
        <th class="tablehead">
            Email
        </th>
        <th class="tablehead">
            Actions
        </th>
    `;
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create table body
    const tbody = document.createElement('tbody');
    items.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                ${item.id}
            </td>
            <td>
                ${item.name}
            </td>
            <td>
                ${item.email}
            </td>
            <td>
                <button class="ebtn" onclick="editItem(${index})">Edit</button>
                <button class="dbtn" onclick="deleteItem(${index})">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
    table.appendChild(tbody);

    itemList.appendChild(table);
}




const editForm = document.getElementById('editForm');
const editItemForm = document.getElementById('editItemForm');
const editedIdInput = document.getElementById('editedId');
const editedNameInput = document.getElementById('editedName');
const editedEmailInput = document.getElementById('editedEmail');

function editItem(index) {

    
    show.style.display='block';
    form.style.display='none';
    // Populate form fields with existing item data
    editedIdInput.value = items[index].id;
    editedNameInput.value = items[index].name;
    editedEmailInput.value = items[index].email;

    // Show the edit form
    editForm.classList.remove('hidden');

    // Handle form submission
    editItemForm.addEventListener('submit', function(event) {
        event.preventDefault();
        // Update item with edited data
        items[index] = {
            id: editedIdInput.value.trim(),
            name: editedNameInput.value.trim(),
            email: editedEmailInput.value.trim()
        };
        // Update UI and save to cookies
        updateItemsList();
        saveItemsToCookies();
        // Close the edit form
        editForm.classList.add('hidden');
    });
}
function savefn(){
    show.style.display='none';
    form.style.display='block';
}

function closeEditForm() {
    show.style.display='none';
    form.style.display='block';
}

function deleteItem(index) {
    if (confirm(`Are you sure you want to delete ID: ${items[index].id}, Name: ${items[index].name}, Email: ${items[index].email}?`)) {
        items.splice(index, 1);
        updateItemsList();
        saveItemsToCookies();
    }
}

function saveItemsToCookies() {
    document.cookie = `items=${JSON.stringify(items)}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
}

// Load items from cookies on page load
window.onload = function () {
    const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
        const [key, value] = cookie.split('=');
        acc[key] = value;
        return acc;
    }, {});

    if (cookies.items) {
        items = JSON.parse(cookies.items);
        updateItemsList();
    }
};

function toggle(){
    
}
