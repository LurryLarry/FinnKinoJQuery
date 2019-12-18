$(document).ready(function() {        //jQueryllä on suositeltava aloittaa functiot document ready funktiolla
$("#hae").click(function() {

  var teatteri = document.getElementById("teatteri").value;  // haetaan form controllin valinnan arvo ja lisätään se urliin
  console.log(teatteri);
  var url = "https://www.finnkino.fi/xml/Schedule/?area=" + teatteri + "&dt=";
  $.ajax({            // jqueryn ajax kutsu
    type: "GET",
    url: "https://www.finnkino.fi/xml/Schedule/?area=" + teatteri + "&dt=",
    dataType: "xml",

    error: function (e) {    //error jos luku ei onnistu
        console.log("XML lukua ei voitu suorittaa ", e);
    },

    success: function (response) {  // funktio joka suoritetaan kun ajax kutsu onnistuu


     console.log(response);
  
   
 
     pic = response.getElementsByTagName("EventLargeImageLandscape");  // asetetaan responsen osia muuttujiin HUOM. JQuerya on hankala käyttää XML tiedostoon koska (Please note that most jQuery operations don't support text nodes and comment nodes. The few that do will have an explicit note on their API documentation page.)
      title = response.getElementsByTagName("Title");
      rating = response.getElementsByTagName("RatingImageUrl");
      osto = response.getElementsByTagName("ShowURL");
      tiedot = response.getElementsByTagName("EventURL");
      console.log(tiedot.innerHTML);

      var out = '<div class="card-columns">';
      for (i = 0; i <= title.length; i++) {  // loopataan otsikoiden mukaan
        var showstart = response.getElementsByTagName("dttmShowStart")[i].innerHTML.slice(11, 16);  // formatoidaan aika objektit
     
        var showend = response.getElementsByTagName("dttmShowEnd")[i].innerHTML.slice(11, 16);
        var title = response.getElementsByTagName("Title")[i].firstChild.nodeValue; 
        // luodaan muuttujia, koodin selkeyden vuoksi minusta hyvä tapa sijoitella elementteihin verrattuna esim. pic[i].childNodes[0].nodeValue,
        // ei tosin jostain syystä toiminut kaikkiin kohtiin.
        var sali = response.getElementsByTagName("TheatreAndAuditorium")[i].firstChild.nodeValue;
        out += '<div class="col-12">';
        out += '<div class="card blue-grey lighten-4">';
        out += '<img class="card-img-top" src="' + pic[i].childNodes[0].nodeValue + '" alt="Elokuvan kuva" style=width:100%">';
        out += '<div class="card-content">';
        out += '<span class="card-title">';
        out += '<h3>' + title + '</h3>';
        out += '</span>';
        out += "<p>" + sali + "</p>";
        out += '<p>' + showstart + " - " + showend +'</p>';
        out += '<p id="rating"><img src="' + rating[i].childNodes[0].nodeValue + '" align="right" alt="Ikärating"></p>'
        out += '<a id="osto" class="btn btn-success" href="' + osto[i].innerHTML + '">Varaa</a>';
        out += '<a id="tiedot" class="btn btn-info" href="' + tiedot[i].innerHTML + '">Esittely</a>';
        out += '</div>';
        out += '</div>';
        out += '</div>';

       
      }

      out += '</div>';
      document.getElementById("kontentti").innerHTML = out;  // lisätään luuppaukset kontentti paraan

    }
  }
  )});
});

$(document).ready(function() {           // click funktio nappulaan korttien värien muuttamiseksi
$("#koko").click(function() {
  $(".card-content").css("background-color", "orange");
  
});
});
