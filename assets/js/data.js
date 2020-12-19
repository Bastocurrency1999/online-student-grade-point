var tracker = {
    sem1 : 1, points1 : 0, unit1 : 0,
    sem2 : 1, points2 : 0, unit2 : 0,
    sem3 : 1, points3 : 0, unit3 : 0,
    sem4 : 1, points4 : 0, unit4 : 0,
    sem5 : 1, points5 : 0, unit5 : 0,
    sem6 : 1, points6 : 0, unit6 : 0,
}

var data = { cgpa: 0 }

semesterClassNo = document.getElementsByClassName("semester");
semesterNo = semesterClassNo.length;
// console.log(x.length)

async function add(semester){
    subjectNo = tracker[`sem${semester}`];
    subjectNo += 1;
    tracker[`sem${semester}`] = subjectNo;
    content = `
    <td>${subjectNo}</td>
    <td><input type="text" placeholder="i.e CSE 202" id="subject${semester}_${subjectNo}" required class="form-control"></td>
    <td><select id="credit${semester}_${subjectNo}" class="custom-select" required>
        <option value="NONE" selected>Select Course Unit</option>
        <option value="5">5</option>
        <option value="4">4</option>
        <option value="3">3</option>
        <option value="2">2</option>
        <option value="1">1</option>
        <option value="0">0</option>
    </select></td>
    <td><select id="grade${semester}_${subjectNo}" onchange="pointsTot(${semester}, ${subjectNo})" selected class="custom-select" required>
        <option value="NONE">Select Grade</option>
        <option value="4.00">A</option>
        <option value="3.75">AB</option>
        <option value="3.50">B</option>
        <option value="3.25">BC</option>
        <option value="3.00">C</option>
        <option value="2.75">CD</option>
        <option value="2.50">D</option>
        <option value="2.25">DE</option>
        <option value="2.00">E</option>
        <option value="1.75">EF</option>
        <option value="1.00">FF</option>
        <option value="0.75">F</option>
        <option value="0.25">PF</option>
        <option value="0.00">HF</option>
    </select></td>
    <td><input type="text" id="points${semester}_${subjectNo}" readonly class="form-control ls-width"></td>
    <td><Button class="btn btn-danger text-white delete"><i class="fas fa-trash-alt"></i></Button></td>
    `;
   createTR = document.createElement("tr");
   createTR.class = `sub${semester}`;
   createTR.innerHTML = content;
   table =  document.getElementById(`table${semester}`)
   table.append(createTR);
}

function addSemester() {
    semesterNo += 1;
    newSem = `<div class="card w-100 semester" style="margin-top:10px;transition:600ms ease-in;" id="semester${semesterNo}">
    <div class="card-header">
    </div>
    <div class="card-body">
      <div class="table-responsive">
      <table class="table table-bordered w-100" id="table${semesterNo}">
      <thead>
      <tr>
          <th>S/N</th>
          <th class="text-center">Courses</th>
          <th class="text-center">Credit Hours</th>
          <th class="text-center">Grade</th>
         <th class="text-center">WGPoint</th>
          <th class="text-center">Delete</th>
          <!-- <th class="text-center">Edit</th>
          <th class="text-center">Reset</th> -->
      </tr>
  </thead>
  <tbody class="sub${semesterNo}">
  <tr>
            <td>1</td>
            <td><input type="" id="subject${semesterNo}_1" placeholder="i.e CSE 202" class="form-control ls-width" id="subject1_1"></td>
            <td>
                <select class="custom-select" id="credit${semesterNo}_1">
                         <option value="NONE" selected>Select Course Unit</option>
                         <option value="5">5</option>
                         <option value="4">4</option>
                         <option value="3">3</option>
                         <option value="2">2</option>
                         <option value="1">1</option>
                         <option value="0">0</option>
                     </select>
                    </td>
                    <td>
                    <select class="custom-select" id="grade${semesterNo}_1" onchange="pointsTot(${semesterNo}, 1)" required>
                        <option value="NONE" selected>---- Select Grade ----</option>
                       <option value="4">A</option>
                       <option value="3.75">AB</option>
                       <option value="3.5">B</option>
                       <option value="3.25">BC</option>
                       <option value="3">C</option>
                       <option value="2.75">CD</option>
                       <option value="2.5">D</option>
                       <option value="2.25">DE</option>
                       <option value="2">E</option>
                       <option value="1.75">EF</option>
                       <option value="1">FF</option>
                       <option value="0.75">F</option>
                       <option value="0.25">PF</option>
                       <option value="0">HF</option>
                        </td>
                        <td><input type="" id="points${semesterNo}_1" placeholder="" class="form-control ls-width" readonly></td>
                        <td><Button class="btn btn-danger text-white delete"><i class="fas fa-trash-alt"></i></Button></td>
            </tr>
            </tbody>
        </table>
        </div>
        </div>
        <div class="card-footer">
            <div class="float-right">
            <button class="btn btn-success" type="submit" onclick="add(${semesterNo})">Add New Row +</button> <button class="btn btn-secondary" onclick="calc(${semesterNo})">Calculate CGPA &nbsp;<i class="fas fa-calculator"></i></button>
            <div id="results${semesterNo}" class="modal fade" role="dialog">
            <div class="modal-dialog">
            </div>
        </div>`;
    createDiv = document.createElement("div");
    createDiv.class = "newSem";
    createDiv.innerHTML = newSem;
    document.body.append(createDiv);
}

function pointsTot(semester, val) {
    unit = parseFloat(document.getElementById(`credit${semester}_${val}`).value);
    grade = parseFloat(document.getElementById(`grade${semester}_${val}`).value);
    points = unit * grade;
    document.getElementById(`points${semester}_${val}`).value = points;
}

async function calc(semester) {
    sum = 0.0;
    pointSum = 0.0;
    subjectNo = tracker[`sem${semester}`];
    for(i=0; i<subjectNo; i++) {
        unit = parseFloat(document.getElementById(`credit${semester}_${i+1}`).value);
        grade = parseFloat(document.getElementById(`grade${semester}_${i+1}`).value);
        points = unit * grade;
        pointSum += unit;
        sum += points;
    }
    tracker[`unit${semester}`] = pointSum;
    tracker[`points${semester}`] = sum;

    gpa = sum/pointSum;
    if(semester == 1) {
        cgpaSum = gpa;
        //data.cgpa = gpa;
    } 
    else {
        newPoints = 0.0;
        newUnit = 0.0;
        for (i=1; i<=semester; i++ ) {
            ppoint = parseDecimal(tracker[`points${i}`]);
            punit = parseDecimal(tracker[`unit${i}`]);
            newPoints += ppoint;
            newUnit += punit;
        }
        cgpaSum = newPoints/newUnit;
    }
    document.getElementById(`results${semester}`).innerHTML = `<div class="card-footer bg-secondary d-flex"><h5 class="text-white"style="color:red">Your score for this semester is : Total Points:&nbsp;</h5> <h5><span class="badge badge-success" style="font-size:18px;">${parseFloat(sum)}</span></h5> &nbsp; <h5 class="text-white">Total Units:</h5> &nbsp; <h5><span class="badge badge-success">${pointSum}<span></h5> &nbsp;<h5 class="text-white">GPA:&nbsp;</h5>  <h5><span class="badge badge-success">${gpa}</span></h5> &nbsp;<h5 class="text-white">CGPA:</h5> &nbsp;<h5><span class="badge badge-success">${cgpaSum}</span></h5>
    </div>`;

}