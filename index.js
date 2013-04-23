
(function (window) {
  function strip(txt) {
    return txt.replace(/^\s+/, '').replace(/\s+$/, '');
  }
  function make_points(text) {
    var points = {};
    var lines = text.split('\n');
    for (var i=0; i<lines.length; i++) {
      var parts = strip(lines[i]).split(/\s+/);
      if (parts.length < 3) continue;
      points[parts[0]] = parseFloat(parts[2]);
    }
    return points;
  }
  var points;
    
  function calculate() {
    var text = document.getElementById('main-input').value;
    var output = document.getElementById('output');
    var lines = text.split('\n');
    var earned = 0, total = 0;
    for (var i=0; i<lines.length; i++) {
      if (lines[i].slice(0, 2) == '  ' && lines[i][2] !== ' ') {
        var parts = strip(lines[i]).split(/\s+/);
        if (parts.length < 3) continue;
        var grade = parts[parts.length-1];
        var weight = parts[parts.length-2];
        if (!points[grade]) {
          console.log('Skipping! ' + lines[i]);
          continue;
        }
        weight = parseFloat(weight);
        earned += weight * points[grade];
        total += weight;
      }
    }
    if (!total) {
      output.innerHTML = 'No courses found...';
    } else {
      output.innerHTML = 'Earned: '+earned.toFixed(2)+'<br/>Attempted: '+total.toFixed(2)+'<br/>GPA: '+(earned/total).toFixed(2);
    }
  }

  function main() {
    document.getElementById('submit').onclick = calculate;
    points = make_points(document.getElementById('scoring').innerHTML);
    console.log(points);
  }

  window.onload = main;
})(window)

