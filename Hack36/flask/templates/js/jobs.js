

// Uris

var linkedinUri =
  "https://www.linkedin.com/jobs/search/?keywords=";

const getData = function(){
    let field = "Software development";
    let keyword = field.split(' ');
    let kw = "";
    for (let i = 0; i < keyword.length; i++) {
        kw += keyword[i];
        kw += "%20";
    }

    uri = linkedinUri + kw;
    console.log(uri);
    
    // document.getElementById("#result").setAttribute('href',uri);
    // $.get(uri, function (data) {
    //     $(".result").html(data);
    //     alert("Load was performed.");
    // });

    // var frame = document.createElement("iframe");

    // frame.setAttribute('src', uri);
    // frame.setAttribute('height', '100px');
    // frame.setAttribute('width', '100px');

    // var result = document.getElementById("result");
    // result.appendChild(frame);

    // var url = "https://anyorigin.com/go?url=" + encodeURIComponent(uri);
    //   $.get(url, function(response) {
    //     console.log(response);
    //   });

    $.getJSON('http://www.anyorigin.com/go?url=' + encodeURIComponent(uri) + '&callback=?', function (data) {
        alert(data.contents);
    });

}

getData();
