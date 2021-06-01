//Using NPM readline-sync
const rl = require('readline-sync');
//Declare an array studentResult
var studentResult = [];
//Declare an array studentGrade
var studentGrade = [];
//Call function Addstudent();
mainFunction();

//Function AddStudent()
function mainFunction() {
  //Create a student object once function is run
  var student = {
    name: name,
    marks: marks,
    grade: grade
  };

  //Tell the user to enter "end" to stop
  console.log("\n Type 'end' as name to stop, ");

  for (var i = 0; i <= 100; i++) {
    //Tell user to enter name
    var name = rl.question("\n Please enter your name: ");

    //If the name isn't "end"
    if (name != "end") {
      //Tell user to enter marks
      var marks = rl.question(" Enter your marks: ");
      //Use function Convert2Grade() to convert marks to grade
      var grade = Convert2Grade(marks);
      console.log(" Your grade is " + grade);
      //Push grade into array studentGrade[]
      studentGrade.push(grade);

      //New student
      var student = new Object();
      student.name = name;
      student.marks = marks;
      student.grade = grade;

      //Push user input into array studentResult[]
      studentResult.push({
        name: name,
        marks: marks,
        grade: grade
      });

    } else {
      //if name entered == "end"
      //If there is data in studentResult array execute BestStudent();
      var result = NumberOfGrade(studentGrade);
      GradeResult(result);
      CalculatePercentage(studentGrade);
      if (studentResult.length > 0) {
        //Compare and display best student's name, marks and grade
        BestStudent();
      }
      //Else no data in studentResult array break
      break;
    }
  }
}

//Function CalculatePercentage()
function CalculatePercentage(studentGrade) {
  console.log("\n Percentage of students in each grade:");
  var grade = studentGrade;
  const totalItems = grade.length;
  const uniqueItems = [...new Set(grade)];

  uniqueItems.forEach(currGrade => {
    const numItems = grade.filter(grades => grades === currGrade);
    console.log(" Grade " + "'" + currGrade + "'" + " has " + numItems.length * 100 / totalItems + "%" + " of students.");
  })
}

//Function GradeResult()
function GradeResult(result) {
  //N, P, C, D, HD  // Fail to pass before sort
  //C, D, HD, N, P  // After sort by letter

  //C = [0][0]
  //D = [0][1]
  //HD = [0][2]
  //N = [0][3]
  //P = [0][4]

  //C result = [1][0]
  //D result = [1][1]
  //HD result = [1][2]
  //N result = [1][3]
  //P result = [1][4]
  console.log("\n Result: \n");
  console.log(" Number of students in each grade:");
  for (var i = 0; i < result[0].length; i++) {
    if (result[0][i] === "N" || result[0][i] === "P" || result[0][i] === "C" || result[0][i] === "D" || result[0][i] === "HD") {
      console.log(" Grade " + "'" + result[0][i] + "' has " + result[1][i] + " students.");
    }
  }
}

//Function NumberOfGrade()
function NumberOfGrade(studentGrade) {
  var a = [],
    b = [],
    prev;

  studentGrade.sort();
  for (var i = 0; i < studentGrade.length; i++) {
    if (studentGrade[i] !== prev) {
      a.push(studentGrade[i]);
      b.push(1);
    } else {
      b[b.length - 1]++;
    }
    prev = studentGrade[i];
  }

  return [a, b];
}

//Function BestStudent()
function BestStudent() {
  console.log("\n Student of highest grade:")
  var highestGrades = studentResult.map(
    function(stud, ind) {
      // return a student's name, marks and grade
      return {
        name: stud.name,
        marks: stud.marks,
        grade: stud.grade
      };
    });

  // Sort the marks, compare and get the highest marks
  var bestStudent = highestGrades.sort(function(a, b) {
    return b.marks - a.marks;
  })[0];

  //Display highest marks' name, marks and grade
  console.log(" " + bestStudent.name + " has the highest score of " + bestStudent.marks + " with the grade of " + bestStudent.grade);
}

//Function Convert2Grade()
function Convert2Grade(grade) {
  var hGrade = grade;
  if (hGrade < 49) {
    return hGrade = "N";
    console.log("Your grade is 'N'");
  } else if (hGrade >= 50 && hGrade <= 64) {
    return hGrade = "P";
    console.log("Your grade is 'P'");
  } else if (hGrade >= 65 && hGrade <= 74) {
    return hGrade = "C";
    console.log("Your grade is 'C'");
  } else if (hGrade >= 75 && hGrade <= 84) {
    return hGrade = "D";
    console.log("Your grade is 'D'");
  } else if (hGrade >= 85 && hGrade <= 100) {
    return hGrade = "HD";
    console.log("Your grade is 'HD'");
  } else {
    console.log("You need to enter a number less than 100, please try again.");
  }
}
