"use strict";

var elem=document.getElementById("repoInput");
elem.onkeyup = function(e) {
	var repoP=elem.value;
	console.log(repoP)
	

	var list=sendToServ(repoP);
	//var list=setTimeout(sendToServ(repoP), 1000);
		return repoP;
}

//console.log(elem.onkeyup.list)



function sendToServ(str) {	
var ans;
var xhrR = new XMLHttpRequest();
var param = 'q='+encodeURIComponent(str);
xhrR.open('GET','https://api.github.com/search/repositories?'+param, true);
xhrR.send();
xhrR.onreadystatechange = function() {
    if (xhrR.readyState === XMLHttpRequest.DONE) {

        if (xhrR.status != 200) {
          // обработать ошибку
          alert( xhrR.status + ': ' + xhrR.statusText ); // пример вывода: 404: Not Found
        } else {
            ans = JSON.parse(xhrR.responseText).items.slice(0, 3);
             temlpateGen(ans);

            console.log(ans)
                 }
    }
}
return ans;
}

function temlpateGen(obj) {

  var tmpl = document.getElementById('search-template').innerHTML.trim();
  tmpl = _.template(tmpl);
  document.getElementById('search-holder').innerHTML = tmpl({
    items: obj
  });
}


