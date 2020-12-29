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
  // formData = $("#submit").serialize();
  // $.ajax({
  // url: "dataHandler.php",
  // type: "post",
  // data: formData,
  // success: function(d) {},
  // error: function (request, status, error) {
  //   console.log(request.responseText);
  //   }
  // });
  // e.preventDefault();

  //update dict with list of food banks in the area
  // $.ajax({
  // url: "dataHandler.php",
  // type: "get",
  // data: foodBankData,
  // success: function(d) {
  //   dict = foodBankData;
  // },
  // error: function (request, status, error) {
  //   console.log(request.responseText);
  //   }
  // });

}

function check_if_Valid(income, distance, identification, proof_Address, expenses) {
  var eligibleFoodBanks = {};
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
  //document.getElementById("content").innerHTML = text;
  initMap(a)
  document.getElementById('map').style.display = "block";
}

function initMap(arrayOfEligible) {
      var options = {
        zoom: 7,
        center: { lat:43.6532, lng: -79.3832 },
      };
      let icon = {
        url: "./logobread.jpg",
        scaledSize: { width: 30, height: 30 },
      };
      var map = new google.maps.Map(document.getElementById("map"), options);

      const details = `<h3>Details</h3>`
      addMarker({
          coords: {lat: dict.DivineMercy[6], lng: dict.DivineMercy[7] },
          iconImage: {
          url: "./redapple.png",
          scaledSize: { width: 40, height: 40 },},
      content: formatDetails(dict.DivineMercy[0], dict.DivineMercy[1], dict.DivineMercy[2], dict.DivineMercy[3], dict.DivineMercy[4], dict.DivineMercy[5])
      });
      addMarker({ 
          coords:{lat: dict.Thorncliffe[6], lng: dict.Thorncliffe[7]},
          iconImage: { 
          url: "./greenapple.png",
          scaledSize: { width: 40, height: 40 },},
          content: formatDetails(dict.Thorncliffe[0], dict.Thorncliffe[1], dict.Thorncliffe[2], dict.Thorncliffe[3], dict.Thorncliffe[4], dict.Thorncliffe[5])
      });
      addMarker({ 
          coords:{lat: dict.DailyBread[6], lng:dict.DailyBread[7]},
          iconImage: { 
          url: "./yellowapple.png",
          scaledSize: { width: 40, height: 40 },},
          content: formatDetails(dict.DailyBread[0], dict.DailyBread[1], dict.DailyBread[2], dict.DailyBread[3], dict.DailyBread[4], dict.DailyBread[5])
      });


      function formatDetails(name, address, incomeLevel, identification, proofOfAddress, expenses){
          const html = `
          <p>${name}</p><br>
          <p>${address}</p><br>
          <p>maximum income: ${incomeLevel}</p><br>
          <p>proof of address required: ${proofOfAddress}</p><br>
          <p>expenses: ${expenses}</p><br>
          `;
          return html;        
      }

      function addMarker(props) {
        var marker = new google.maps.Marker({
          position: props.coords,
          map: map,
          icon: props.iconImage,
        });
      

      if(props.content){
          var infoWindow = new google.maps.InfoWindow({
        content: props.content,
      });

      marker.addListener("click", function() {
        infoWindow.open(map, marker);
      });
      }
    }
    }