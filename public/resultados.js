$(document).ready(function(){
  $('.loader-back').hide()
    $('select').formSelect();
    $("#partidos").on('change', function() {
      $('.loader-back').show()
    combinaciones($(this).val())
})
  });


function combinaciones(n)
{
  baseN = Combinatorics.baseN(['L','E','V'], n);
//console.log(baseN.toArray())

var myArray = baseN.toArray()
makeTableHTML(myArray,n)
}

function makeTableHTML(myArray,n) {
    $('#tabla > thead').remove()
    $('#tabla > tbody').remove()
    var result = '<thead>'
    result += "<th class='black white-text center-align'>></th>"
    for(var i=1; i<=n; i++) {
            result += "<th class='black white-text center-align'>"+[i]+"</th>"
    }
    result += '</thead><tbody >'
    for(var i=0; i<myArray.length; i++) {
        result += "<tr>";
        result += "<td class='center-align' style='font-weight:bold;'>"+(parseInt([i])+1)+"</td>"
        for(var j=0; j<myArray[i].length; j++){
            result += "<td class='center-align'>"+myArray[i][j]+"</td>"
        }
        
        result += "</tr>"
    }
    result += '</tbody>'
    $('#tabla').append(result)
    $('.loader-back').hide()
}