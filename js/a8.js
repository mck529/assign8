var X_MIN, X_MAX, Y_MIN, Y_MAX;

function get_table_ranges () {
  var temp1, temp2;
  temp1 = parseInt($("#xBegin").val(), 10);
  temp2 = parseInt($("#xEnd").val(), 10);
  if(temp1 >= temp2) {
    X_MAX = temp1;
    X_MIN = temp2;
  } else {
    X_MAX = temp2;
    X_MIN = temp1;
  }
  temp1 = parseInt($("#yBegin").val(), 10);
  temp2 = parseInt($("#yEnd").val(), 10);
  if(temp1 >= temp2) {
    Y_MAX = temp1;
    Y_MIN = temp2;
  } else {
    Y_MAX = temp2;
    Y_MIN = temp1;
  }
  return;
}

function createFirstRow(){
  var temp = "<tr>";
  temp +="<td></td>"; // makes first box empty
  for(var x = X_MIN; x <= X_MAX; x++){
    temp += "<td>" + x + "</td>";
  }
  temp +="</tr>";
  return temp;
}

function finishTable() {
  var temp = '';
  for (var y = Y_MIN; y <= Y_MAX; y++) {
    var row = '<tr>';
    row += "<td>" + y + "</td>";
    for (var x = X_MIN; x <= X_MAX; x++) {
      row += '<td>' + x * y + '</td>';
    }
    temp += row + "</tr>";
  }
  return temp;
}

function resetForm() {
  if(X_MIN == null) {
    $("#xBegin").val("1");
    $("#xEnd").val("10");
    $("#yBegin").val("1");
    $("#yEnd").val("10");
    get_table_ranges();
    var multTable = "<table>" + createFirstRow() + finishTable() + "</table>";
    $("#placeholder").html(multTable);
    $("#tabs").tabs({
      collapsible: true
    });
  }
}

function initSlider(sliderName, inputName, defaultValue) {

  return $("#" + sliderName).slider({
    range: "min",
    value: defaultValue,
    min: 1,
    max: 50,
    slide: function( event, ui) {
      $("#" + inputName).val(ui.value);
      get_table_ranges();
      var multTable = "<table>" + createFirstRow() + finishTable() + "</table>";
      $("#placeholder").html(multTable);
    }
  });
}

function validateAndUpdateTable () {
  $("#inputForm").validate({
    rules: {
      xBegin: {
        required: true,
        digits: true
      },
      xEnd: {
        required: true,
        digits: true
      },
      yBegin: {
        required: true,
        digits: true
      },
      yEnd: {
        required: true,
        digits: true
      }
    }
  });
  if ($("#inputForm").valid()) {
    get_table_ranges();
    var multTable = "<table>" + createFirstRow() + finishTable() + "</table>";
    $("#placeholder").html(multTable);
  }
}

$(document).ready(function(){

  resetForm();
  var slider1 = initSlider("slider1", "xBegin", 1);
  var slider2 = initSlider("slider2", "xEnd", 10);
  var slider3 = initSlider("slider3", "yBegin", 1);
  var slider4 = initSlider("slider4", "yEnd", 10);
  $("#xBegin").change(function(){
    slider1.slider("value", $("#xBegin").val());
    validateAndUpdateTable();
  });

  $("#xEnd").change(function(){
    slider2.slider("value", $("#xEnd").val());
    validateAndUpdateTable();
  });

  $("#yBegin").change(function(){
    slider3.slider("value", $("#yBegin").val());
    validateAndUpdateTable();
  });

  $("#yEnd").change(function(){
    slider4.slider("value", $("#yEnd").val());
    validateAndUpdateTable();
  });

  $("#draw").click(function(event) {
    validateAndUpdateTable();
    var num_tabs = $("div#tabs ul li").length + 1;
    var dimensions = X_MIN + "," + X_MAX + "," + Y_MIN + "," + Y_MAX;
    var multTable = "<div id='placeholder'><table>" + createFirstRow() + finishTable() + "</table></div>";
    $("div#tabs ul").append(
      "<li><a href='#tab" + num_tabs + "'>" + dimensions + "</a></li>"
    );
    $("div#tabs").append(
      "<div id='tab" + num_tabs + "'>" + multTable + "</div>"
    );
    $("div#tabs").tabs("refresh");
  });

  $("#remIndex").click(function(){
    var tabIndex = parseInt($("#remIndexText").val(), 10);
    if (tabIndex != 0) {
      var tab = $( "#tabs" ).find(".ui-tabs-nav li:eq(" + tabIndex + ")").remove();
      $("#tabs").tabs("refresh");
    }
  });

});
