
// alert("Hello");
    // student data
    // Get student data
function DisplaName()
{
    let studentName = document.getElementById('Sname').value;
    let matricNumber = document.getElementById('SmatricNumber').value;

    // alert(studentName);
    // alert(matricNumber);

    // image

    // validations
    if(studentName.trim() == null || studentName.trim() == "" || studentName == undefined){
        // alert("Student Name can't be empty \n Student : Firstname - Lastname");
    }else if (matricNumber.trim() == null || matricNumber.trim() == "" || matricNumber == undefined){
        // alert("Student Matric Number can't be empty \n format : CSE/1801/001");
    }
    
    // get display data
    const DName = document.getElementById('displaySname');
    const DMatricNumber = document.getElementById('displaySmatricNumber');


    // display to
    DName.innerHTML = studentName;
    DMatricNumber.innerHTML = matricNumber;
    }