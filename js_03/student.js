const addBtn = document.getElementById('addBtn');
const tableBody = document.getElementById('tableBody');
const searchBtn = document.getElementById('searchBtn');
const addSubjectBtn = document.getElementById('addSubjectBtn');

searchBtn.addEventListener('click', () => {
    const searchID = document.getElementById('searchInput').value.trim();

    if (searchID === '') {
        alert("Please enter a valid Student ID!");
        return;
    }
    let students = localStorage.getItem('students') 
        ? JSON.parse(localStorage.getItem('students')) 
        : [];
    const student = students.find(s => s["Student ID"] === searchID);
    tableBody.innerHTML = '';
    if (student) {

        let dynamicCells = '';
        let totalMarks = 0;
        for (let key in student) {
                        if (key !== 'Student ID' && key !== 'name') {
                dynamicCells += `<td>${student[key]}</td>`;
                totalMarks += parseInt(student[key]) || 0;
            }
        }
        const row = `
            <tr>
                <td>${student["Student ID"]}</td>
                ${dynamicCells}
                <td>${totalMarks}</td>
                <td>
                    <button class="delete-btn" onclick="deleteRecord(${students.indexOf(student)})">
                        Delete
                    </button>
                </td>
            </tr>
        `;
        tableBody.innerHTML = row;
    } else {
        tableBody.innerHTML = `
            <tr>
                <td colspan="7" style="color:red;">Student not found</td>
            </tr>
        `;
    }
});
 const submitForm = () => {

    const formData = document.getElementById('formContainer').querySelectorAll('input');
    let studentRecord = {};
    console.log("formContainer", formData);
    formData.forEach(input => {
        if (input.value === '') {
            alert("Please fill all fields!");
            return;
        }
        studentRecord[input.placeholder] = input.value;
    });

    saveToLocal(studentRecord);
    displayData();
    clearInputs();
};

function saveToLocal(record) {
    let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];
    let studentscheck = students.find(s => s["Student ID"] === record["Student ID"]);
    if (studentscheck) {
        alert("Student ID already exists!");
        return;
    }else{

        students.push(record);
        localStorage.setItem('students', JSON.stringify(students));
    }
}

function displayData() {
    let students = localStorage.getItem('students') 
        ? JSON.parse(localStorage.getItem('students')) 
        : [];

    tableBody.innerHTML = '';

    students.forEach((student, index) => {

        let dynamicCells = '';
        let totalMarks = 0;

        for (let key in student) {
            if (key !== 'id' && key !== 'name' && key !== 'total') {
                dynamicCells += `<td>${student[key]}</td>`;
            }
            if(key !== 'Student ID' && key !== 'name' && key !== 'total' ){

                totalMarks += parseInt(student[key]) || 0;
            }
        }
        
        
        const row = `
            <tr>
              ${dynamicCells}
              <td>${totalMarks}</td>
                <td><button class="delete-btn" onclick="deleteRecord(${index})">Delete</button></td>
            </tr>
        `;

        tableBody.innerHTML += row;
    });
}

   displayData();
function deleteRecord(index) {
    let students = JSON.parse(localStorage.getItem('students'));
     if (confirm("Are you sure you want to delete this record?")){
         students.splice(index, 1); 
 } 
    localStorage.setItem('students', JSON.stringify(students));
    displayData();
}

function clearInputs() {

  const formData = document.getElementById('formContainer').querySelectorAll('input');
    formData.forEach(input => {
        input.value = '';

  })
}
   

//input generation based on subjects
function showinput() {
    const formContainer = document.getElementById('formContainer');
    let subjects = localStorage.getItem('subjects') ? JSON.parse(localStorage.getItem('subjects')) : [];

    subjects.forEach(sub => {
        const input = document.createElement('input');
        input.type = 'number';
        input.id = sub.id;
        input.placeholder = sub.name +"-" +sub.id;
        formContainer.appendChild(input);
    });
     formContainer.innerHTML += `<button id="addBtn" onclick="submitForm()">Add Record</button>`;
     formContainer.innerHTML += `<button id ="updatebtn" onclick = "updateform()"> Update Button </button>`
}

// Header Creation
function showheader(){
      const unique  = document.getElementById('unique');
      let student2 =localStorage.getItem('students') 
        ? JSON.parse(localStorage.getItem('students')) 
        : [];

      let student1=localStorage.getItem('subjects') 
        ? JSON.parse(localStorage.getItem('subjects')) 
        : [];
        
        const thID = document.createElement('th');
        thID.innerText = "ID";
        unique.appendChild(thID);
        const thName = document.createElement('th');
        thName.innerText = "Student Name";
        unique.appendChild(thName);

        student1.forEach(sub => {
        const th = document.createElement('th');
        th.innerText =  sub.id;
        unique.appendChild(th);}
        )


        // const totalmks = 0;
        // student2.forEach(total => {
        //     totalmks +=(total.ID);
            
        // });
        
            

        console.log(student2.length);

 
        const thTotal = document.createElement('th');
        thTotal.innerText = "Total";
        unique.appendChild(thTotal); 

        const thAction = document.createElement('th');
        thAction.innerText = "Action";
        unique.appendChild(thAction);
        
        console.log(student1);
        
        console.log(student2);

        
}

function updateform(){
    let subjects = localStorage.getItem('subjects') ? JSON.parse(localStorage.getItem('subjects')) : [];
    
    console.log(subjects);





}


showinput();
clearInputs();
showheader();
