/*banks name mapped to 1. food bank's name, 2. food bank's adddress, 3. latitude, 4. longitude, 5. income level accepted 6. identification needed 7. proof of address needed 8. Expenses (rent and hydro)
*/

var dict = {
  Thorncliffe: ["Thorncliffe Food Bank", "1 Leaside Park Dr, Unit 5B Toronto, ON M4H 1R1", 43.702648, -79.351601, 30000, "yes", "yes", 25000],
  divineMercy: ["Divine Mercy Food Bank", "1074 Wyandotte St E, Windsor, ON N9A 3K2", 42.319740, -83.021760, 30000, "yes", "no", 25000]
};


function onSubmition() {
  var income = parseInt(document.getElementById("income").value);
  var distance = parseInt(document.getElementById("distance").value);
  var identification = document.getElementById("identification").value;
  var proof_Address = document.getElementById("proof_Address").value;
  var expenses = parseInt(document.getElementById("expenses").value);

  var display = check_if_Valid(income, distance, identification, proof_Address, expenses);
  showEligible(display);

  //alert(display);

  //code to submit data to php file which enters data in database
  formData = $("#submit").serialize();
  $.ajax({
  url: "dataHandler.php",
  type: "post",
  data: formData,
  success: function(d) {},
  error: function (request, status, error) {
    console.log(request.responseText);
    }
  });
  e.preventDefault();

  //update dict with list of food banks in the area
  $.ajax({
  url: "dataHandler.php",
  type: "get",
  data: foodBankData,
  success: function(d) {
    dict = foodBankData;
  },
  error: function (request, status, error) {
    console.log(request.responseText);
    }
  });

}

function check_if_Valid(income, distance, identification, proof_Address, expenses) {
  var display = "";
  for (var key in dict) {
    if (dict.hasOwnProperty(key)) {   
        if (income >= dict[key][4] || identification != dict[key][5] || proof_Address != dict[key][6]) {
          /*display = display + "Eligible for " + dict[key][0] +": No\n"*/
        } else {
          display = display + "Eligible for " + dict[key][0] +"<br>"
        }
        /*var arrayLength = dict[key].length;
        for (var i = 0; i < arrayLength; i++) {
            display = display + dict[key][i];
        }*/
    } 
  }
  return display;
}

function showEligible(text) {
  document.getElementById("content").innerHTML = text;
  document.getElementById('dash_of_foodbanks').style.display = "block";
}