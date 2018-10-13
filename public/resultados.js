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
      filtrar();
    });
  });

function filtrar(){
  var tbl = document.getElementById("tabla");
  var numRows = tbl.rows.length;
  var array = new Array();
  for (var i = 1; i < numRows; i++) {
      var ID = tbl.rows[i].id;
      var cells = tbl.rows[i].getElementsByTagName('td');
      array[i] = new Array();
      for (var ic=0,it=cells.length;ic<it;ic++) {
          var value = cells[ic].innerHTML;
          array[i].push(value);
      }
      //console.log(array[i]);
  }
  //console.log(array)
  
  var dataUnique = array.reduce(function (out, item) {
  return out.concat(out.filter(function (comp) {
    var value = comp.toString();
    var x = value.substr(value.indexOf(',')+1);
    //console.log(x);
    var y = item.toString().substr(value.indexOf(',')+1);
      return y == x;
    }).length ? [] : [item]);
  }, []);
  
  arr_diff(array, dataUnique)
  
  //console.log(array, dataUnique);
  //console.log(arr_diff(array, dataUnique));

}


function arr_diff (a1, a2) {

    var a = [], diff = [];

    for (var i = 0; i < a1.length; i++) {
        a[a1[i]] = true;
    }

    for (var i = 0; i < a2.length; i++) {
        if (a[a2[i]]) {
            delete a[a2[i]];
        } else {
            a[a2[i]] = true;
        }
    }

    for (var k in a) {
      var x = k.substr(0,k.indexOf(','));
      //console.log(x);
       if(x){
         var row = 'row_' + x;
         //console.log(row)
         document.getElementsByClassName(row)[0].style.display="none";
       }
       
        diff.push(k);
    }

    return diff;
}


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
        result += "<tr class='row_"+(parseInt([i])+1)+"' style='padding: 0px;'>";
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