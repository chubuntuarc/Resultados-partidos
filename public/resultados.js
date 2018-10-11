var cantidad = 0;
$(document).ready(function(){
  $('.loader-back').hide();
  $('#select-filtro-div').hide();
  $('#select-partido-div').hide();
    $('select').formSelect();
    $("#partidos").on('change', function() {
      $('.loader-back').show();
      $('#select-filtro-div').show();
      combinaciones($(this).val());
      cantidad = $(this).val();
    });
    
    $("#select-filtro").on('change', function() {
      $('#select-filtro').attr('disabled', true);
      $('#select-partido-div').show();
      $('select').formSelect();
    });
    
    $("#select-partido").on('change', function() {
      $('#select-filtro').attr('disabled', false);
      $('#select-filtro-div').hide();
      $('#select-partido-div').hide();
      var filtro = $('#select-filtro').val();
      var columna = $('#select-partido').val();
      if(filtro == 1){
       $('.col_'+columna).text('L');
      }
      if(filtro == 2){
       $('.col_'+columna).text('E'); 
      }
      if(filtro == 3){
       $('.col_'+columna).text('V');
      }
      $('select').formSelect();
    });
  });


function combinaciones(n)
{
  baseN = Combinatorics.baseN(['L','E','V'], n);
  //console.log(baseN.toArray())

  var myArray = baseN.toArray();
  makeTableHTML(myArray,n);
}

function makeTableHTML(myArray,n) {
    $('#tabla > thead').remove();
    $('#tabla > tbody').remove();
    var result = '<thead>';
    result += "<th class='black white-text center-align' style='padding: 4px;'>></th>";
    for(var i=1; i<=n; i++) {
            result += "<th class='black white-text center-align' style='padding: 4px;'>"+[i]+"</th>";
    }
    result += '</thead><tbody >';
    for(var i=0; i<myArray.length; i++) {
        result += "<tr>";
        result += "<td class='center-align' style='font-weight:bold;padding: 4px;'>"+(parseInt([i])+1)+"</td>";
        for(var j=0; j<myArray[i].length; j++){
            result += "<td class='center-align col_"+(parseInt([j])+1)+"' style='padding: 4px;'>"+myArray[i][j]+"</td>";
        }
        result += "</tr>";
    }
    result += '</tbody>';
    $('#tabla').append(result);
    $('.loader-back').hide();
}