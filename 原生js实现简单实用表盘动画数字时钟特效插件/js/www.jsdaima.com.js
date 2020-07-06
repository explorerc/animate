var start = null;
var timeEle = document.querySelector('.time');

function update(timestamp) {
  if (!start) start = timestamp;
  let d = new Date();
  let secs = d.getSeconds();
  let sec = document.querySelector('.sec');
  var s = 60 - secs + 15;
  sec.setAttribute("style", "stroke-dashoffset: "+ s +"px;");
  
  let mins = d.getMinutes();
  let min = document.querySelector('.min');
  var m = 60 - mins + 15;
  min.setAttribute("style", "stroke-dashoffset: "+ m +"px;");
  
  let hours = d.getHours();
  let hou = document.querySelector('.hour');
  var h = 12 - hours + 3.5;
  hou.setAttribute("style", "stroke-dashoffset: "+ h +"px;");
  
  let time = ("00" + hours).slice(-2) + ":" + ("00" + mins).slice(-2) + ":" + ("00" + secs).slice(-2);
  timeEle.innerHTML = time;

  console.log(time);
  
  var progress = timestamp - start;
  //console.log('SEC'+progress)
  //if (progress < 7000) {
  window.requestAnimationFrame(update);
  //}
}

window.requestAnimationFrame(update);