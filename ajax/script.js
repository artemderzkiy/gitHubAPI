"use strict";


var elemS=document.getElementById("repoInput");
var elemGf=document.getElementById("inputGf");
var elemGt=document.getElementById("textGf");



elemS.onkeyup = function(e) {
	var repoP=elemS.value;
	var list=sendToServSearch(repoP);
	//var list=setTimeout(sendToServ(repoP), 1000);
	return repoP;
}

//console.log(elem.onkeyup.list)



function sendToServSearch(str) {	
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
       	temlpateSearchGen(ans);
       }
    }
 }
 return ans;
}

function temlpateSearchGen(obj) {

	var tmpl = document.getElementById('search-template').innerHTML.trim();
	tmpl = _.template(tmpl);
	document.getElementById('search-holder').innerHTML = tmpl({
		items: obj
	});
}

function gist() {
	var  gistOb = (function() {
		return {
			"description": "the description for this gist",
			"public": true,
			"files": {
				[elemGf.value]: {
					"content": elemGt.value
				}
			}
		}
	})();
	var gistObJ=JSON.stringify(gistOb);
	console.log(gistObJ);
	sendToServGist(gistObJ);

}

function sendToServGist(str) {	
	var ans;
	var xhrR = new XMLHttpRequest();	
	xhrR.open('POST','https://api.github.com/gists', true);
	xhrR.send(str);
	xhrR.onreadystatechange = function() {
		if (xhrR.readyState === XMLHttpRequest.DONE) {

			if (xhrR.status != 201) {
          alert( xhrR.status + ': ' + xhrR.statusText ); // пример вывода: 404: Not Found
       } else {    	
       	
       	ans = JSON.parse(xhrR.responseText);
       	console.log(ans);
       	temlpateGistGen(ans);
       }
    }
 }
 return ans;
}


function temlpateGistGen(obj) {
	var tmpl = document.getElementById('gist-template').innerHTML.trim();
	tmpl = _.template(tmpl);
	document.getElementById('gist-holder').innerHTML = tmpl({
		items: obj
	});
}

