$("input").keypress(function (event) {
  var inputCode = event.which;
  var currentValue = $(this).val();
  if (inputCode > 0 && (inputCode < 48 || inputCode > 57)) {
      if (inputCode == 46) {
          if (getCursorPosition(this) == 0 && currentValue.charAt(0) == '-') return false;
          if (currentValue.match(/[.]/)) return false;
      } 
      else if (inputCode == 45) {
          if (currentValue.charAt(0) == '-') return false;
          if (getCursorPosition(this) != 0) return false;
      } 
      else if (inputCode == 8) return true;
      else return false;

  } 
  else if (inputCode > 0 && (inputCode >= 48 && inputCode <= 57)) {
      if (currentValue.charAt(0) == '-' && getCursorPosition(this) == 0) return false;
  }
});
function getCursorPosition(element) {
  if (element.selectionStart) return element.selectionStart;
  else if (document.selection)
  {
      element.focus();
      var r = document.selection.createRange();
      if (r == null) return 0;

      var re = element.createTextRange(),
          rc = re.duplicate();
      re.moveToBookmark(r.getBookmark());
      rc.setEndPoint('EndToStart', re);
      return rc.text.length;
  }
  return 0;
}
function getID(i) {
  return document.getElementById(i);
}
function getVal(i) {
  return getID(i).value;
}
function solve() {
  var a = parseFloat(getVal("a"));
      b = parseFloat(getVal("b") );
      c = parseFloat(getVal("c"));
  var D = (b*b - 4 * a * c).toFixed(3);	
  var dis = getID("DIS"),
      nos = getID("NOS"),
      s1  = getID("S1"),
      s2  = getID("S2"),
      con = getID("CON");
      sign = getID("SIGN");
      s1.innerHTML = "";
      s2.innerHTML = "";
      con.innerHTML = "";
      if ( isNaN(a) || isNaN(b) || isNaN(c) ){
        alert("'a','b','c' phải là các số thực")
        return;
      }
      if (a == 0 ){
        alert("'a' phải khác 0");
        return;
      }
  dis.innerHTML = 'Delta (b^2 - 4ac) = <span id="D"></span>';
  var d = getID("D");
  d.innerHTML = D.toString();
  //Phương trình
  if (D < 0) {
    nos.innerHTML = "Phương trình ax^2 + bx + c = 0 vô nghiệm ∀x∈ R";
  } 
  else if (D == 0) {
    var S = (-b / (2 * a)).toFixed(3);
    nos.innerHTML = "Phương trình ax^2 + bx + c = 0 có nghiệm kép: "
    s1.style.display = "inline"
    s1.innerHTML = "x = " + S.toString();
  } 
  else {
    var S1 = (( -b - Math.sqrt(D) ) / (2 * a)).toFixed(3),
        S2 = (( -b + Math.sqrt(D) ) / (2 * a)).toFixed(3);
    nos.innerHTML = "Phương trình ax^2 + bx + c = 0 có 2 nghiệm phân biệt x1, x2 là:"  
    s1.style.display = "inline";
    s2.style.display = "inline";
    s1.innerHTML = "x = " + S1.toString();
    s2.innerHTML = " hoặc x = " + S2.toString();
  }
  //Bất phương trình
      select = document.getElementById('sign');
      option = select.options[select.selectedIndex];
  if ((a > 0 && D < 0 && (option.value == "<" || option.value == "≤")) ||
      (a < 0 && D < 0 && (option.value == ">" || option.value == "≥")) ||
      (a > 0 && D == 0 && option.value == "<") ||
      (a < 0 && D == 0 && option.value == ">")){
    con.innerHTML = "Tập nghiệm của bất phương trình là: S = ∅"
  }
  else if ((a > 0 && D < 0 && option.value == ">")  || 
           (a < 0 && D < 0 && option.value == "<")  ||
           (a < 0 && D < 0 && option.value == "≤")  ||
           (a > 0 && D < 0 && option.value == "≥")  ||
           (a > 0 && D == 0 && option.value == "≥") ||
           (a < 0 && D == 0 && option.value == "≤")) {
    con.innerHTML = "Tập nghiệm của bất phương trình là: S = R"
  }   
  else if ((a > 0 && D == 0 && option.value == ">") || 
           (a < 0 && D == 0 && option.value == "<")){
    con.innerHTML = "Tập nghiệm của bất phương trình là: S = R \\" + "{" + S + "}"
  }
  else if ((a < 0 && D == 0 && option.value == "≥") ||
           (a > 0 && D == 0 && option.value == "≤")){
    con.innerHTML = "Tập nghiệm của bất phương trình là: S = {" + S + "}"
  }
  //D > 0
  else if ((a > 0 && D > 0 && option.value == ">")){
    con.innerHTML = "Tập nghiệm của bất phương trình là: S = (-∞;" + S1 + ") ∪ (" + S2 + ";+∞)"
  }
  else if (a < 0 && D > 0 && option.value == "<") {
    con.innerHTML = "Tập nghiệm của bất phương trình là: S = (-∞;" + S2 + ") ∪ (" + S1 + ";+∞)"
  }
  else if (a > 0 && D > 0 && option.value == "≥"){
    con.innerHTML = "Tập nghiệm của bất phương trình là: S = (-∞;" + S1 + "] ∪ [" + S2 + ";+∞)"
  }
  else if (a < 0 && D > 0 && option.value == "≤"){
    con.innerHTML = "Tập nghiệm của bất phương trình là: S = (-∞;" + S2 + "] ∪ [" + S1 + ";+∞)"
  }
  else if (a > 0 && D > 0 && option.value == "<"){
    con.innerHTML = "Tập nghiệm của bất phương trình là: S = (" + S1 + ";" + S2 + ")"
  }
  else if (a < 0 && D > 0 && option.value == ">"){
    con.innerHTML = "Tập nghiệm của bất phương trình là: S = (" + S2 + ";" + S1 + ")"
  }
  else if (a > 0 && D > 0 && option.value == "≤"){
    con.innerHTML = "Tập nghiệm của bất phương trình là: S = [" + S1 + ";" + S2 + "]"
  }
  else if (a < 0 && D > 0 && option.value == "≥"){
    con.innerHTML = "Tập nghiệm của bất phương trình là: S = [" + S2 + ";" + S1 + "]"
  }
}
function update(){
  select = document.getElementById('sign');
  option = select.options[select.selectedIndex];
}
var selectField = document.getElementById("sign");
    selectField.onclick = function(){
        update()}
var submitButton = document.getElementById("submit");
      submitButton.onclick = function() {
      solve();
};
