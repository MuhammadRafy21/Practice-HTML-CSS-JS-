const addBtn = document.getElementById('addSubjectBtn');
const tableBody = document.getElementById('tableBody');
const formContainer = document.getElementById('formContainer');

addBtn.addEventListener('click', () => {
    const id = parseInt(document.getElementById('subjectId').value);
    const name = document.getElementById('subjectName').value.trim();

    if (isNaN(id) || !name) {
        alert("Please enter valid Subject details!");
        return;
    }

    const subject = { id, name };

    if (!saveToLocal(subject)) return;

    displaySubjects();
    clearInputs();
});



function saveToLocal(subject) {
    let subjects = JSON.parse(localStorage.getItem('subjects')) || [];

    let exists = subjects.find(s => s.id === subject.id);
    if (exists) {
        alert("Subject ID already exists!");
        return false;
        clearInputs();
    }

    subjects.push(subject);
    localStorage.setItem('subjects', JSON.stringify(subjects));
    return true;
}


function displaySubjects() {
    let subjects = JSON.parse(localStorage.getItem('subjects')) || [];

    tableBody.innerHTML = "";

    if (subjects.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="3">No subjects found</td>
            </tr>
        `;
        return;
    }

    let rows = "";

    subjects.forEach((sub) => {
        rows += `
            <tr>
                <td>${sub.id}</td>
                <td>${sub.name}</td>
                <td>
                    <button onclick="deleteSubject(${sub.id})">Delete</button>
                </td>
            </tr>
        `;
    });

    tableBody.innerHTML = rows;
}



function deleteSubject(id) {
    if (!confirm("Are you sure?")) return;

    let subjects = JSON.parse(localStorage.getItem('subjects')) || [];

    subjects = subjects.filter(sub => sub.id !== id);

    localStorage.setItem('subjects', JSON.stringify(subjects));

    displaySubjects();
}

function clearInputs() {
    document.getElementById('subjectId').value = '';
    document.getElementById('subjectName').value = '';
}

function clearAllSubjects() {
    localStorage.removeItem('subjects');
    displaySubjects();
}
displaySubjects();


// let a = [1, 2, 3];
// let b = [1, 2, 3];



// // if (a === b) {
// //     console.log("Equal");
// // } else {
// //     console.log("Not Equal");
// // }

// const a =[1, 2, 3];
// let b = a;  
// b.push(4);

// console.log(b);
// console.log(a);

// // let a = 2;
// // let b = a;  
// // b = 3;

// // console.log(b);
// // console.log(a);
