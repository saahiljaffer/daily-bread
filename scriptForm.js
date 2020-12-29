/*banks name mapped to 1. food bank's name, 2. food bank's adddress, 3. latitude, 4. longitude, 5. income level accepted 6. identification needed 7. proof of address needed 8. Expenses (rent and hydro)
*/

/*var dict = {
  Thorncliffe: ["Thorncliffe Food Bank", "1 Leaside Park Dr, Unit 5B Toronto, ON M4H 1R1", 43.702648, -79.351601, 30000, true, true, 25000],
  divineMercy: ["Divine Mercy Food Bank", "1074 Wyandotte St E, Windsor, ON N9A 3K2", 42.319740, -83.021760, 30000, true, true, 25000]
};*/

document.getElementById("info").onsubmit = function() {myFunction()};

function myFunction() {
  alert("The form was submitted");
}