"use strict";
// noch in der Entwicklung noch nicht produktiv
var xdlg = { xoption: {}, event: {}, targetdom: {}, function: "" };
var xcomponent;
var xcomponenttrain;
var xtbline;
var xtbnewsta;
var xspeed;
var xhour;
var xtab1;
var activetrain = { group: null, offset: null}
var storeparm = 
{
   action: "", ind : "dialog", tbheader : "",objectid: "",lineid : "", trainid : "" ,trainids : null , componentid : "" , dialogname: "trainmain", cmd :"init"
}
var storedef =
{
  "version": "1.0",
  "train": {
    "creator": " ",
    "lastupdate": " ",
    "lastuser": " ",
    "id": "D49", // ID des Zuges unique
    "name": "D49",
    "number": "49",
    "type": "D", // Zuggattung
    "remark": "Nordexpress",
    "timetables": [], //alle Einträge für Zugfolge 
    "trainsets": []    , //Objekteinträge für Wagen
    "locomotives": []    , //Objekteinträge für Lokomotiven
    "jobs": []    , //Objekteinträge für Dienste
    "wheels": [], // Anzahl Achsen ab Station
    "tasks": [], // Aufgaben, Rangiertätigkeit in einer Station 
    "groups": [], // alle Gruppen für diesen Zug
    "trainsetlefts": [], // Zugreihung der GZV
    "trainsetrights": [] // Hinweise zur GZV


  },
  "line": {
    "creator": " ",
    "lastupdate": " ",
    "lastuser": " ",
    "id": "1", // ID der line
    "name": "line1",
    "type": "standard", // Bedeutung noch offen
    "stastart":"", // Start Station
    "staend":"", // End Station
    "componenttype":"*", // welche Stationen sollen bei der Erzeugung ausgewählt werden
    "tracktype":"*", // welche Gleise sollen bei der Erzeugung ausgewählt werden
    "trackpart": 50 , // %Anteil der Tracks am Zwischenbereich der Stationen
    "remark": "Hauptbahn",
    "linetracks": [
    ] // alle tracks dieser Linie
  },
  "linetrack":  
    {
      "componentid": "Mis", // station
      "trackid": "11", //  Gleis
      "pos": 0, // Position im Bildfahrplan
      "display": "none", // Anzeige im Bildfahrplan
      "remark": "" 
    }
  ,
  "task":
  {
    "componentid": "Mis",
    "trackid": "11",
    "time1": null,
    "time2": null,
    "type": " ",
    "remark": "",
  },
  "timetable":
  {
    "componentid": "Mis",
    "trackid": "11",
    "time1": null,
    "time2": null,
    "type": " ",
    "remark": ""
  },
  "trainset":
  {
    "stain": "",
    "stainxn": "",
    "staintime": "",
    "staintrack": "",
    "staout": "",
    "staoutxn": "",
    "staouttime": "",
    "staouttrack": "",
    "group": "",
    "object": "",
    "remark": ""
  }
  ,
  "locomotive":
  {
    "stain": "",
    "stainxn": "",
    "staintime": "",
    "staintrack": "",
    "staout": "",
    "staoutxn": "",
    "staouttime": "",
    "staouttrack": "",
    "object": "",
    "remark": ""
  }
  ,
  "job":
  {
    "stain": "",
    "stainxn": "",
    "staintime": "",
    "staintrack": "",
    "staout": "",
    "staoutxn": "",
    "staouttime": "",
    "staouttrack": "",
    "object": "",
    "remark": ""
  }
  ,
  "wheel":
  {
    "stain": "",
    "count": ""
  },
  "trainsetleft":
  {
    "group": "1",
    "remark": "WLAB,WLAB,WLAB, WLAB"
  }
  ,
  "trainsetright": 
  {
    "remark": "rechts"
  },

  "group":
  {
    "object": "P-Zug",
    "remark": ""
  }
  ,
  "component": {
    "creator": "",
    "lastupdate": "",
    "lastuser": "",
    "id": "",
    "name": "",
    "type": "", // station, block, branch, point
    "owner": "",
    "color":"",
    "remark": "",
    "blockborder": "", // merkmal für Blockgrenze
    "tracks": [],// Alle Gleise 
    "inouts": [], // Ein/Ausgangspunkte der Betriebsstelle  
    "connections": [] // interne verbindung der inout über Gleise
  },
  
  "track":
  {
    "trackid": "",
    "name": "",
    "length": "",
    "type": "",
    "color":""
  },
  "connection":
  {
    "connectid": "",
    "ea1": "", // von (für type=dir)
    "time1": "", // Zeit ab/bis Halt-Punkt
    "ea2": "", // nach (für type=dir)
    "time2": "", // Zeit ab/bis Halt-Punkt
    "trackid": "", // Gleis aus track
    "remark": "",
    "type": "" // nondir ungerichtete Verbindung
  },
  "inout":
  {
    "eaid": "",
    "signal": "",
    "pos": "",
    "speed": "",
    "remark": "",
    "display": "none",// only for trainbook, graphictimetable always none
    "type": ""
  },
  
  "route":
  {
    "routeid": "",
    "component1": "",
    "ea1": "",
    "component2": "",
    "ea2": "",
    "pos": "",
    "speed": "",
    "time": "",
    "remark": "",
    "counttracks": "",
    "type": "",
    
  },
  // section entfällt dafür component=point und route
  "section": {
    "id": "",
    "name": "",
    "type": "section", // section (gibt es nur in routes)
    "remark": "",
    "pos": "",
    "speed": "",
    "time": ""
  },

  "objtrainset": {
    "creator": "",
    "lastupdate": "",
    "lastuser": "",
    "objectid": "",
    "remark": "",
    "trains": []
  },
  "objloc": {
    "creator": "",
    "lastupdate": "",
    "lastuser": "",
    "objectid": "",
    "remark": "",
    "trains": []
  },
  "objjob": {
    "creator": "",
    "lastupdate": "",
    "lastuser": "",
    "objectid": "",
    "remark": "",
    "trains": []
  },
  
  "objgroup": {
    "creator": "",
    "lastupdate": "",
    "lastuser": "",
    "objectid": "",
    "remark": "",
    "trains": []
  },
  "traintype":
  {
    "id": "",
    "color": "",
    "width": "",
    "group": "",
    "dashname": "",
    "stoptimes": []
  },
  "stoptime": {
    "componentid": "",
    "time": ""
  }

  // comment

}
function onwheel(e) {

  var divcont = e.target.closest(".FCsvgContainer")
  if (divcont == null) {return}
  var divcontent = divcont.querySelector(".FCsvgContent")
  var svg  = divcontent.querySelector("svg")
  var divheader = divcont.querySelector(".FCsvgHeader")
  var svgh  = divheader.querySelector("svg")
  if (e.ctrlKey) {
    e.preventDefault();
    var w = svg.getAttribute('width')
    var h = svg.getAttribute('height')
    var dw = w * Math.sign(e.deltaY) * 0.05;
    var dh = h * Math.sign(e.deltaY) * 0.05;
    w = w - dw;
    h = h - dh;
    svg.setAttribute('width', `${w}`)
    svg.setAttribute('height', `${h}`)
    var w = svgh.getAttribute('width')
    var h = svgh.getAttribute('height')
    var dw = w * Math.sign(e.deltaY) * 0.05;
    var dh = h * Math.sign(e.deltaY) * 0.05;
    w = w - dw;
    h = h - dh;
    svgh.setAttribute('width', `${w}`)
    svgh.setAttribute('height', `${h}`)
    return;
  }

  if (e.shiftKey) {
    divcontent.scrollLeft = divcontent.scrollLeft + e.deltaY;
    divheader.scrollLeft = divheader.scrollLeft + e.deltaY;
    e.preventDefault()
  }
  else { divcontent.scrollTop = divcontent.scrollTop + e.deltaY; e.preventDefault() }
}
function ontrain(event,svg)
{
  console.log("ontrain",event.type)
  if (event.type == "dblclick")
  { 
    let gtag = event.target.closest("g")
    if (gtag != null)
    {
      if (gtag.id == storeparm.trainid)
      {console.log(event.target.closest("text"),event.target.closest("polyline"));return}
      let xparm1="&trainid="+gtag.id
      console.log(xparm1)
      openwindow("trainwork", "Ftrain"+gtag.id,gtag.id,xparm1)
      //openwindow("trainwork", lines[linesi].id,gtag.id,xparm1)
    }
  }
  if (event.type == "click")
  {
    let coord = getMousePosition(event,svg);
    let gtag = event.target.closest("g")
    if (gtag != null)
    {
      if (gtag.id == storeparm.trainid)
      {
        console.log(event.target.nodeName)
        
        if (event.target.nodeName == "text") {
          console.log(event.target.dataset.tabkey)

          if (event.target.dataset.time1 != null) {
            let inputfield = createsvginput(event.target.dataset.time1, coord.x, coord.y)
            gtag.appendChild(inputfield)
          }
          else {
            if (event.target.dataset.time2 != null) {
              let inputfield = createsvginput(event.target.dataset.time2, coord.x, coord.y)
              gtag.appendChild(inputfield)
            }
          }
        }
      }
    }
    console.log(coord)
    console.log(event.target)
    console.log(event.target.closest("g"))
  }
  if (event.type == "mousedown")
  {
    //console.log(event.target)
    activetrain.group = event.target.closest("g")
    let coord = getMousePosition(event,svg);
    activetrain.offset = getMousePosition(event,svg);
    console.log(activetrain)
    //console.log(activetrain.group.getAttribute('transform'))
    //activetrain.offset.x -= parseFloat(activetrain.group.getAttribute( "x"));
    //activetrain.offset.y -= parseFloat(activetrain.group.getAttribute( "y"));
    //console.log(activetrain.offset)
  }
  if (event.type == "mouseup")
  {
    console.log(activetrain.group)
    if (activetrain.group == null) {return}
    let xtransform = activetrain.group.getAttribute('transform')
    if (xtransform != null)
    {
      console.log(xtransform)
    }
    activetrain.group = null
  }
  if (event.type == "mousemove") {
    if (activetrain.group == null) {return}
    let xgroup = event.target.closest("g")
    //if (xgroup == null) {return}
    //console.log(xgroup.id)
    let coord = getMousePosition(event,svg);
    //console.log((coord.y - activetrain.offset.y))
    //activetrain.group.setAttributeNS(null, "x", coord.x - activetrain.offset.x );
    //activetrain.group.setAttribute( "y", coord.y - activetrain.offset.y);
    let offsety=coord.y - activetrain.offset.y
    activetrain.group.setAttribute('transform','translate(0,'+offsety+')')
    //activetrain.offset = getMousePosition(event);
  }
}
function creategraphictimetable(xpage, line) {
  if (xpage == null) { return }
  let maincolor = "rgb(241, 107, 5)";
  var svg, svgh;
  //var svgCont = xpage.querySelector('[data-id="' + line.id + '"].FCsvgContainer')
  var svgCont = xpage.querySelector('.FCsvgContainer')
  if (!svgCont) {
    svgCont = document.createElement('div')
    //svgCont.id = 'svgContainer'
    svgCont.className = 'FCsvgContainer'
    svgCont.scroll = function (e) {
      myonscroll(e)
    }
    //svgContr.addEventListener("scroll", myonscroll(Event));
    svgCont.dataset.id = line.id;
    svgCont.style["width"] = "200mm";
    svgCont.style["height"] = "288mm";
    svgCont.style["resize"] = "both";
    svgCont.style["overflow"] = "hidden";
    svgCont.style["border-style"] = "solid solid solid solid"
    svgCont.style["border-color"] = maincolor
    svgCont.contentEditable = false
    xpage.appendChild(svgCont)
  }
  
  var svgHeader = svgCont.querySelector('.FCsvgHeader')
  if (!svgHeader ){
    svgHeader = document.createElement('div')
    svgHeader.className = 'FCsvgHeader'
    svgHeader.style["width"] = "100%";
    svgHeader.style["height"] = "fit-content";
    svgHeader.style["overflow"] = "hidden";
    svgHeader.style["border-style"] = "solid solid solid solid"
    svgHeader.style["border-color"] = maincolor
    svgHeader.contentEditable = false
    svgCont.appendChild(svgHeader)
    svgh = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgh.setAttribute("height", "40");
    svgh.setAttribute("width", "1000");
    svgh.setAttribute("viewBox", "0 0 1000 40");
    svgHeader.appendChild(svgh)
  }
  else {
    while (svgHeader.firstChild) {
      svgHeader.removeChild(svgHeader.firstChild)
    }
    svgh = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgh.setAttribute("height", "40");
    svgh.setAttribute("width", "1000");
    svgh.setAttribute("viewBox", "0 0 1000 40");
    svgHeader.appendChild(svgh)
  }
  var svgContent = svgCont.querySelector('.FCsvgContent')
  if (!svgContent)
  {
    svgContent = document.createElement('div')
    svgContent.scroll = function (e) {
      myonscroll(e)
    }
    //svgCont.addEventListener("scroll", myonscroll(e));
    svgContent.className = 'FCsvgContent'
    svgContent.style["width"] = "100%";
    svgContent.style["height"] = "95%";
    svgContent.style["overflow"] = "hidden";
    svgContent.style["border-style"] = "solid solid solid solid"
    svgContent.style["border-color"] = maincolor
    svgContent.contentEditable = false

    svgCont.appendChild(svgContent)
    
    svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute("height", "1440");
    svg.setAttribute("width", "1000");
    svg.setAttribute("viewBox", "0 0 1000 1440");
    xpage.onmousewheel = function (e) {
      onwheel(e)
    }
    xpage.onclick = function (e) {
      ontrain(e,svg)
    }
    xpage.onmouseup = function (e) {
      ontrain(e,svg);
    }
    xpage.ondblclick = function (e) {
      ontrain(e,svg);
    }
    svgContent.appendChild(svg)

  }
  else 
  {
    while (svgContent.firstChild) {
      svgContent.removeChild(svgContent.firstChild)
    }
    svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute("height", "1440");
    svg.setAttribute("width", "1000");
    svg.setAttribute("viewBox", "0 0 1000 1440");
    xpage.onmousewheel = function (e) {
      onwheel(e)
    }
    xpage.onmouseup = function (e) {
      ontrain(e,svg);
    }
    xpage.ondblclick = function (e) {
      ontrain(e,svg);
    }
    svgContent.appendChild(svg)
  }


  
  
  let traintypes = objstore["traintypes"]
 
  let i;
  
  // create hour lines
  for (let i = 0; i <= 24; i++) {
    let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute("id", "H" + i.toString().padStart(2, '0'));
    path.setAttribute("fill", "none");
    path.setAttribute("stroke", maincolor);
    path.setAttribute("stroke-width", ".5");

    let xd = "M 0 " + (i * 60).toString() + " L 1000 " + (i * 60).toString()
    path.setAttribute("d", xd);
    svg.appendChild(path)
    let text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute("dy", "-1");
    svg.appendChild(text)
    let textpath = document.createElementNS('http://www.w3.org/2000/svg', 'textPath');
    textpath.setAttribute("href", "#H" + i.toString().padStart(2, '0'));
    textpath.setAttribute("text-anchor", "end");
    textpath.setAttribute("startOffset", "99%");
    textpath.textContent = i.toString()
    text.appendChild(textpath)
    text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute("dy", "-1");
    text.setAttribute("font-size", "100%");
    svg.appendChild(text)
    textpath = document.createElementNS('http://www.w3.org/2000/svg', 'textPath');
    textpath.setAttribute("href", "#H" + i.toString().padStart(2, '0'));
    textpath.setAttribute("text-anchor", "middle");
    textpath.setAttribute("startOffset", "50%");
    textpath.textContent = i.toString()
    text.appendChild(textpath)
    text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute("dy", "-1");
    text.setAttribute("font-size", "100%");
    svg.appendChild(text)
    textpath = document.createElementNS('http://www.w3.org/2000/svg', 'textPath');
    textpath.setAttribute("href", "#H" + i.toString().padStart(2, '0'));
    textpath.setAttribute("text-anchor", "start");
    textpath.setAttribute("startOffset", "1%");
    textpath.textContent = i.toString()
    text.appendChild(textpath)

  }
  
 createcomponentslines(svg,svgh,line)

// create trains line
   objstore["trains"].forEach(function (xtrain, xtabkey) {
    let traintype = gettabrow(traintypes, "id", xtrain.type)
    if (traintype == null) {
      traintype = traintypes[1]
    }
    createtrainline(xtrain, svg, traintype)
  })
}
function createcomponentslines(svg,svgh,line){
  // create station lines
  let maincolor = "rgb(241, 107, 5)";
  let componentid = ""
  line["linetracks"].forEach(function (linetrack, trackkey) {
    if (linetrack["display"] == "on") {
      
      if (componentid != linetrack["componentid"]) {
        let text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.textContent = linetrack["componentid"]
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("x", (linetrack["pos"]).toString());
        text.setAttribute("y", "15");
        text.setAttribute("font-size", "100%");
        svgh.appendChild(text)
        componentid = linetrack["componentid"]
      }
      let text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.textContent = linetrack["trackid"]
      text.setAttribute("text-anchor", "middle");
      text.setAttribute("x", (linetrack["pos"]).toString());
      text.setAttribute("y", "30");
      text.setAttribute("font-size", "50%");
      svgh.appendChild(text)
      let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute("data-id", linetrack["componentid"] + "." + linetrack["trackid"]);
      path.setAttribute("data-pos", linetrack["pos"]);
      path.setAttribute("fill", "none");
      path.setAttribute("stroke", maincolor);
      path.setAttribute("stroke-width", ".5");

      let xd = "M " + (linetrack["pos"]).toString() + " 24 L " + (linetrack["pos"]).toString() + " 1440"

      path.setAttribute("d", xd);
      svg.appendChild(path)
    }
  }
  )
}
function deletetrainline(xtrain,svg)
{
  let xtrainid = xtrain["id"]
  let group = svg.querySelector('[id="' +xtrainid+ '"]');
  console.log(group)
  svg.removeChild(group);
}
function createsvginput(timeval, posx, posy) {
  let maincolor = "rgb(241, 107, 5)";
  let forObj = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
  forObj.setAttribute("x", posx);
  forObj.setAttribute("y", posy);
  forObj.setAttribute("width", 100);
  forObj.setAttribute("height", 20);
  forObj.style.backgroundColor = maincolor;
  let xdiv = document.createElement("div")
  xdiv.setAttribute("xmlns", "http://www.w3.org/1999/xhtml")
  xdiv.style.backgroundColor = maincolor;
  xdiv.setAttribute("position", "relative")
  xdiv.setAttribute("width", 30);
  xdiv.setAttribute("height", 10);
  xdiv.innerHTML = timevaltoinput(timeval)
  forObj.appendChild(xdiv)
  return (forObj)
}
function createtrainline(xtrain,svg,traintype)
{ 
  
  //let xtimetable = objcard["columns"]["graphic"]["frames"]["timetables"]

  let xtrainid = xtrain["id"]
  let xtrainpos = -1
  let xtraintimepos = 0
  let xpoints = ""
  let pathid = 0
  let svggroup=null
  let startoffset="5%"
  let textanchor = "start"
  xtrain["timetables"].forEach(function (xvalue, xtabkey) {
    let xpos = getposfromsvg(svg, xvalue["componentid"], xvalue["trackid"]);
    
    if (xpos == null) {
      //xtrainpos = -1;
    }
    else {
      xpos = +xpos // convert to number
      if (svggroup == null)
        {
        svggroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        svggroup.setAttribute("id", xtrainid);
        svggroup.setAttribute("font-size", "10px");
        svggroup.setAttribute("font-style", "normal");
        svggroup.setAttribute("font-family", "Arial");
        svggroup.onclick = function (e) {
          ontrain(e,svg);
        }
        
        svggroup.onmousedown = function (e) {
          ontrain(e,svg);
        }
        svggroup.onmousemove = function (e) {
          ontrain(e,svg);
        }
        svggroup.dblclick = function (e) {
          ontrain(e,svg);
        }

        svg.appendChild(svggroup)  
      }
      let time1pos = xvalue["time1"]
      let time2pos = xvalue["time2"]
      if (xtrainpos > -1) {
        pathid = pathid + 1
        let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        let xpathid = "Train" + xtrainid + pathid.toString()
        path.setAttribute("id", xpathid);
        
        let xd=""
        if (xtrainpos <= xpos) {
          startoffset= "15%"
          textanchor= "start"
          xd = "M " + (xtrainpos).toString() + " " + xtraintimepos + " L " + (xpos).toString() + " " + time1pos;
        }
        else {
          startoffset= "85%"
          textanchor= "end"

          xd = "M " + (xpos).toString() + " " + time1pos + " L " + (xtrainpos).toString() + " " + xtraintimepos;
        }
        path.setAttribute("d", xd);
        path.setAttribute("fill", "none");
        path.setAttribute("stroke", traintype.color);
        path.setAttribute("stroke-width", traintype.width);
        svggroup.appendChild(path)
        if (xpoints == "") {
          xpoints = (xtrainpos).toString() + " " + xtraintimepos
        }
        xpoints = xpoints + " " + (xpos).toString() + " " + time1pos

        let text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        /*if (xtrainpos < xpos) {
          text.setAttribute("x", (xtrainpos * 10).toString());
          text.setAttribute("y", xtraintimepos);
        }
        else
        {
          text.setAttribute("text-anchor", "end");
          text.setAttribute("x", (xtrainpos * 10).toString());
          text.setAttribute("y", xtraintimepos);
        }
        
        text.textContent = xtrainid*/
        svggroup.appendChild(text)
        let textpath = document.createElementNS('http://www.w3.org/2000/svg', 'textPath');
        textpath.setAttribute("href", "#" + xpathid);
        textpath.setAttribute("text-anchor", textanchor);
        textpath.setAttribute("startOffset", startoffset);
        textpath.setAttribute("font-size", "14px");
       
        textpath.textContent = xtrainid
        text.appendChild(textpath)
      }
      if (time1pos != time2pos) {
        let text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        //text.textContent = timevalmm(time1pos)
        if (xtrainpos <= xpos) 
        {text.setAttribute("text-anchor", "end");}
        else
        {text.setAttribute("text-anchor", "start");}
        
        text.setAttribute("x", (xpos).toString());
        text.setAttribute("y", (time1pos-2));
        //text.setAttribute("contentEditable","true")
        text.setAttribute("data-tabkey", xtabkey);
        text.setAttribute("data-time1", time1pos);
        svggroup.appendChild(text)

        text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.textContent = timevalmm(time2pos)
        if (xtrainpos <= xpos) 
        {text.setAttribute("text-anchor", "start");}
        else
        {text.setAttribute("text-anchor", "end");}
        text.setAttribute("x", (xpos).toString());
        text.setAttribute("y", (time2pos+8));
        //text.setAttribute("contentEditable","true")
        text.setAttribute("data-tabkey", xtabkey);
        text.setAttribute("data-time2", time2pos);
        
        svggroup.appendChild(text)
        pathid = pathid + 1
        let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        let xpathid = "Train" + xtrainid + pathid.toString()
        path.setAttribute("fill", "none");
        path.setAttribute("stroke", traintype.color);
        path.setAttribute("stroke-width", traintype.width);
        path.setAttribute("id", xpathid);
        let xd = "M " + (xpos).toString() + " " + time1pos + " L " + (xpos).toString() + " " + time2pos;
        path.setAttribute("d", xd);
        svggroup.appendChild(path)
        xpoints = xpoints + " " + (xpos).toString() + " " + time2pos
      }
      else
      {

        let text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.textContent = timevalmm(time1pos)
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("x", (xpos).toString());
        text.setAttribute("y", (time1pos-2));
        text.setAttribute("data-tabkey", xtabkey);
        text.setAttribute("data-time1", time1pos);
        text.setAttribute("data-time2", time2pos);
        svggroup.appendChild(text)
        pathid = pathid + 1
        let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        let xpathid = "Train" + xtrainid + pathid.toString()
        path.setAttribute("id", xpathid);
        path.setAttribute("fill", "none");
        path.setAttribute("stroke", traintype.color);
        path.setAttribute("stroke-width", traintype.width);
        let xd = "M " + (xpos).toString() + " " + (time1pos-5) + " L " + (xpos).toString() + " " + (time2pos+5);
        path.setAttribute("d", xd);
        svggroup.appendChild(path)
      }
      xtrainpos = xpos;
      xtraintimepos = time2pos;
    }
  }
  )
  if (xpoints != "") {
    let xpolyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    xpolyline.setAttribute("fill", "none");
    xpolyline.setAttribute("stroke", traintype.color);
    xpolyline.setAttribute("stroke-width", traintype.width);
    xpolyline.setAttribute("points", xpoints);
    xpolyline.setAttribute("shape-rendering", "geometricPrecision");
    //svg.appendChild(xpolyline)
  }
}
function timetopos(xtime) {
  let xt = xtime.split(":").map(Number)
  //console.log(xt)
  return (xt[0] * 60 + xt[1])
}
function getpos(xframetab, xid, xstaid, xtrackid) {
  for (const [key, row] of Object.entries(xframetab["blocks"])) {
    if (row.className.includes("FCrow")) {
      if (row['items']["id"].value == xid) {
        if (row['items']["componentid"].value == xstaid) {
          if (row['items']["trackid"].value == "*") { return (row['items']['pos'].value) }
          if (row['items']["trackid"].value == xtrackid) { return (row['items']['pos'].value) }
        }
      }
    }
  }

}
function trainsimport(event) {
  importtrainscsv();
}
async function importtrainscsv() {
  const [newHandle] = await window.showOpenFilePicker();
  const fileData = await newHandle.getFile();
  let result = await readData(fileData)
  let tabinsert = parsecsvData(result);
  let train0 = JSON.stringify(storedef.train)
  let trainsi = -1
  let timetable0 = JSON.stringify(storedef.timetable)
  let trainset0 = JSON.stringify(storedef.trainset)
  let group0 = JSON.stringify(storedef.group)
  let job0 = JSON.stringify(storedef.job)
  let loc0 = JSON.stringify(storedef.locomotive)
  let wheel0 = JSON.stringify(storedef.wheel)
  let trainsetleft0 = JSON.stringify(storedef.trainsetleft)
  let trainsetright0 = JSON.stringify(storedef.trainsetright)
  var currentTime = new Date()
  let xind, defspeed;
  const regex = /[a-züäöA-ZÜÄÖ]+/;
  objstore["trains"] = []
  objstore["objtrainset"] =  []
  objstore["objloc"] =  []
  objstore["objjob"] =  []
  objstore["objgroup"] =  []
  for (let i = 1; i < tabinsert.length; i++) {
    if (tabinsert[i][8] == "traindef") {

      trainsi = trainsi + 1;
      objstore['trains'][trainsi] = JSON.parse(train0)
      objstore['trains'][trainsi].creator = "Ulen"
      objstore['trains'][trainsi].lastuser = ""
      objstore['trains'][trainsi].lastupdate = currentTime.toISOString()
      objstore['trains'][trainsi].id = tabinsert[i][9]
      objstore['trains'][trainsi].name = tabinsert[i][9]
      objstore['trains'][trainsi].number = tabinsert[i][0]
      objstore['trains'][trainsi].type = tabinsert[i][2]
      if (objstore['trains'][trainsi].type == "")
     { objstore['trains'][trainsi].type  = tabinsert[i][9].match(regex);}
      objstore['trains'][trainsi].remark = tabinsert[i][10]
      defspeed = tabinsert[i][6]

    }
    if (tabinsert[i][8] == "timetable") {

      const timei = objstore['trains'][trainsi]["timetables"].push(JSON.parse(timetable0)) - 1
      //console.log(timei,objstore['trains'][trainsi]["timetable"])
      objstore['trains'][trainsi]["timetables"][timei].componentid = tabinsert[i][2]
      objstore['trains'][trainsi]["timetables"][timei].trackid = tabinsert[i][3]
      objstore['trains'][trainsi]["timetables"][timei].time1 = timeval(tabinsert[i][4])
      objstore['trains'][trainsi]["timetables"][timei].time2 = timeval(tabinsert[i][5])
      objstore['trains'][trainsi]["timetables"][timei].type = tabinsert[i][6]
      objstore['trains'][trainsi]["timetables"][timei].remark = tabinsert[i][10]
      objstore['trains'][trainsi]["timetables"][timei].trainset = []
    }
    if (tabinsert[i][8] == "job") {
      
      
      const xtabi = "jobs"
      const xind1 = objstore['trains'][trainsi][xtabi].push(JSON.parse(job0)) - 1
      objstore['trains'][trainsi][xtabi][xind1].stain = tabinsert[i][2]
      objstore['trains'][trainsi][xtabi][xind1].staintime = timeval(tabinsert[i][4])
      objstore['trains'][trainsi][xtabi][xind1].stainxn = objstore['trains'][trainsi]["timetables"].findIndex((element) => element["componentid"] == tabinsert[i][2])
      objstore['trains'][trainsi][xtabi][xind1].staout = tabinsert[i][3]
      objstore['trains'][trainsi][xtabi][xind1].staouttime = timeval(tabinsert[i][5])
      objstore['trains'][trainsi][xtabi][xind1].staoutxn  = objstore['trains'][trainsi]["timetables"].findIndex((element) => element["componentid"] == tabinsert[i][3])
      objstore['trains'][trainsi][xtabi][xind1].object = tabinsert[i][7]
      objstore['trains'][trainsi][xtabi][xind1].remark = tabinsert[i][10]
      insertobj(objstore['trains'][trainsi].id,"objjob",tabinsert[i][7],tabinsert[i][10])
    }
    if (tabinsert[i][8] == "trainset") {
      
      if (tabinsert[i][6] == "#")
      {
        const xind1 = objstore['trains'][trainsi]["trainsetrights"].push(JSON.parse(trainsetright0)) - 1
        objstore['trains'][trainsi]["trainsetrights"][xind1].remark = tabinsert[i][10]
      }
      else
      {
        const xind1 = objstore['trains'][trainsi]["trainsetlefts"].push(JSON.parse(trainsetleft0)) - 1
        objstore['trains'][trainsi]["trainsetlefts"][xind1].group = tabinsert[i][6]
        objstore['trains'][trainsi]["trainsetlefts"][xind1].remark = tabinsert[i][10]
      }
      insertobj(objstore['trains'][trainsi].id,"objjob",tabinsert[i][7],tabinsert[i][10])
      if (tabinsert[i][7] != "") {
        const xtabi = "trainsets"
        const xind1 = objstore['trains'][trainsi][xtabi].push(JSON.parse(trainset0)) - 1
        objstore['trains'][trainsi][xtabi][xind1].stain = tabinsert[i][2]
        objstore['trains'][trainsi][xtabi][xind1].staintime = timeval(tabinsert[i][4])
        objstore['trains'][trainsi][xtabi][xind1].stainxn = objstore['trains'][trainsi]["timetables"].findIndex((element) => element["componentid"] == tabinsert[i][2])
        objstore['trains'][trainsi][xtabi][xind1].staout = tabinsert[i][3]
        objstore['trains'][trainsi][xtabi][xind1].staouttime = timeval(tabinsert[i][5])
        objstore['trains'][trainsi][xtabi][xind1].staoutxn = objstore['trains'][trainsi]["timetables"].findIndex((element) => element["componentid"] == tabinsert[i][3])
        objstore['trains'][trainsi][xtabi][xind1].group = tabinsert[i][6]
        objstore['trains'][trainsi][xtabi][xind1].object = tabinsert[i][7]
        objstore['trains'][trainsi][xtabi][xind1].remark = tabinsert[i][10]
        insertobj(objstore['trains'][trainsi].id,"objtrainset",tabinsert[i][7],tabinsert[i][10])
      }
      else {
        //objtrainset[xind].trains.push(objstore['trains'][trainsi].id)
      }
    }

    if (tabinsert[i][8] == "locomotive") {
      xind = objstore['trains'][trainsi]["timetables"].findIndex((element) => element["componentid"] == tabinsert[i][2])
      const xtabi = "locomotives"
      const xind1 = objstore['trains'][trainsi][xtabi].push(JSON.parse(loc0)) - 1
      objstore['trains'][trainsi][xtabi][xind1].stain = tabinsert[i][2]
      objstore['trains'][trainsi][xtabi][xind1].staintime = timeval(tabinsert[i][4])
      objstore['trains'][trainsi][xtabi][xind1].stainxn = objstore['trains'][trainsi]["timetables"].findIndex((element) => element["componentid"] == tabinsert[i][2])
      objstore['trains'][trainsi][xtabi][xind1].staout = tabinsert[i][3]
      objstore['trains'][trainsi][xtabi][xind1].staouttime = timeval(tabinsert[i][5])
      objstore['trains'][trainsi][xtabi][xind1].staoutxn  = objstore['trains'][trainsi]["timetables"].findIndex((element) => element["componentid"] == tabinsert[i][3])
      objstore['trains'][trainsi][xtabi][xind1].object = tabinsert[i][7]
      objstore['trains'][trainsi][xtabi][xind1].remark = tabinsert[i][10]
      insertobj(objstore['trains'][trainsi].id,"objloc",tabinsert[i][7],tabinsert[i][10])
      
    }
    if (tabinsert[i][8] == "wheel") {
      const xtabi = "wheels"
      const xind1 = objstore['trains'][trainsi][xtabi].push(JSON.parse(wheel0)) - 1
      objstore['trains'][trainsi][xtabi][xind1].stain = tabinsert[i][2]
      objstore['trains'][trainsi][xtabi][xind1].count = tabinsert[i][6]
      objstore['trains'][trainsi][xtabi][xind1].remark = tabinsert[i][10]

    }
    if (tabinsert[i][8] == "group") {
      const xtabi = "groups"
      const xind1 = objstore['trains'][trainsi][xtabi].push(JSON.parse(group0)) - 1
      objstore['trains'][trainsi][xtabi][xind1].object = tabinsert[i][7]
      objstore['trains'][trainsi][xtabi][xind1].remark = tabinsert[i][10]
      insertobj(objstore['trains'][trainsi].id,"objgroup",tabinsert[i][7],tabinsert[i][10])
    }
  }

  

}

function insertobj(xtrainid,xobj,xobjid,xremark)
{
  // objloc,objjob,objtrainset,objgroup insert
  let currentTime = new Date()
  if (xobjid != "") {
    let xind = objstore[xobj].findIndex((element) => element["objectid"] == xobjid)
    if (xind == -1) {
      xind =  objstore[xobj].push(JSON.parse(JSON.stringify(storedef[xobj]))) - 1;
       objstore[xobj][xind].creator = "Ulen"
       objstore[xobj][xind].lastuser = ""
       objstore[xobj][xind].lastupdate = currentTime.toISOString()
       objstore[xobj][xind].objectid = xobjid
       objstore[xobj][xind].remark = xremark
    }
    objstore[xobj][xind].trains.push(xtrainid)
  }
}
async function componentimport(event) {
  await importcomponentcsv();
  await importroutescsv();
}

async function importcomponentcsv() {
  const [newHandle] = await window.showOpenFilePicker();
  const fileData = await newHandle.getFile();
  let result = await readData(fileData)
  let tabinsert = parsecsvData(result);
  let component0 = JSON.parse(JSON.stringify(storedef.component))
  let componenti = -1
  let components = []
  let track0 = JSON.stringify(storedef.track)
  let connection0 = JSON.stringify(storedef.connection)
  let route0 = JSON.stringify(storedef.route)
  let inout0 = JSON.stringify(storedef.inout)
  let inoutline;
  for (let i = 1; i < tabinsert.length; i++) {
    if (tabinsert[i][5] == "Station") {
      console.log(tabinsert[i][4])
      componenti = componenti + 1;
      components[componenti] = JSON.parse(JSON.stringify(component0))
      //components[componenti] = new component0
      components[componenti].id = tabinsert[i][0]
      components[componenti].name = tabinsert[i][4]
      components[componenti].owner = tabinsert[i][7]
      components[componenti].type = tabinsert[i][6]
      components[componenti].color = "#" + decToHex(+tabinsert[i][8],6)
      let linei = components[componenti]["inouts"].push(JSON.parse(JSON.stringify(storedef.inout))) - 1
      components[componenti]["inouts"][linei].eaid = "ea"
    }
    if (tabinsert[i][5] == "Track") {

      const tracki = components[componenti]["tracks"].push(JSON.parse(JSON.stringify(storedef.track))) - 1
      //console.log(timei,components[componenti]["timetables"])
      components[componenti]["tracks"][tracki].trackid = tabinsert[i][2]
      components[componenti]["tracks"][tracki].length = tabinsert[i][3]
      components[componenti]["tracks"][tracki].name = tabinsert[i][4]
      components[componenti]["tracks"][tracki].type = tabinsert[i][6]
      components[componenti]["tracks"][tracki].color = "#" + decToHex(+tabinsert[i][8],6)
      console.log(tabinsert[i][2],components[componenti]["tracks"][tracki].color,tabinsert[i][8])
      if (tabinsert[i][6] = "main") {
        let linei = components[componenti]["connections"].push(JSON.parse(JSON.stringify(storedef.connection))) - 1
        components[componenti]["connections"][linei].connectid = "con" + i.toString()
        components[componenti]["connections"][linei].ea1 = "ea"
        components[componenti]["connections"][linei].ea2 = "ea"
        components[componenti]["connections"][linei].trackid = tabinsert[i][2]
        components[componenti]["connections"][linei].type = "nondir"
      }
    }


  }
  if (components.length > 0) { objstore["components"] = components }
}
async function importroutescsv() {
  const [newHandle] = await window.showOpenFilePicker();
  const fileData = await newHandle.getFile();
  let result = await readData(fileData)
  let tabinsert = parsecsvData(result);
  let routes = []
  for (let i = 1; i < tabinsert.length; i++) {
    let linei = routes.push(JSON.parse(JSON.stringify(storedef.route))) - 1
    routes[linei].routeid = "routea" + i.toString()
    routes[linei].component1 = tabinsert[i][2]
    routes[linei].ea1 = "ea"
    routes[linei].component2 = tabinsert[i][4]
    routes[linei].ea2 = "ea"
    routes[linei].counttracks = tabinsert[i][7]
    /* let secti = 0;
    routes[linei].sections[secti] = JSON.parse(JSON.stringify(storedef.section))
    //components[componenti] = new component0
    routes[linei].sections[secti].id = "route" + i.toString()
    routes[linei].sections[secti].pos = tabinsert[i][3]
    routes[linei].sections[secti].speed = tabinsert[i][6]
    routes[linei].sections[secti].time = tabinsert[i][8]
    */
    routes[linei].pos = tabinsert[i][3]
    routes[linei].speed = tabinsert[i][6]
    routes[linei].time = tabinsert[i][8]
    linei = routes.push(JSON.parse(JSON.stringify(storedef.route))) - 1
    routes[linei].routeid = "routeb" + i.toString()
    routes[linei].component1 = tabinsert[i][4]
    routes[linei].ea1 = "ea"
    routes[linei].component2 = tabinsert[i][2]
    routes[linei].ea2 = "ea"
    routes[linei].counttracks = tabinsert[i][7]

    /*secti = 0;
    routes[linei].sections[secti] = JSON.parse(JSON.stringify(storedef.section))
    //components[componenti] = new component0
    routes[linei].sections[secti].id = "route" + i.toString()
    routes[linei].sections[secti].pos = tabinsert[i][5]
    routes[linei].sections[secti].speed = tabinsert[i][6]
    routes[linei].sections[secti].time = tabinsert[i][8]*/
    routes[linei].pos = tabinsert[i][5]
    routes[linei].speed = tabinsert[i][6]
    routes[linei].time = tabinsert[i][8]


  }
  objstore["routes"] = routes
}


function settrainbookline(ikey, xtab, xtabkey, xstoretab, xitem) {

  if (ikey == "init") {
    xspeed = ""
    xhour = []
    xcomponent = ""
    xtbline = 0
    return ("ok")
  }
  if (ikey == "newparent") {
    xspeed = ""
    xhour = []
    xcomponent = ""
    xtbline = 0
    return ("ok")
  }
  if (ikey == "newrow") {
    let xtabkey1 = xtabkey + 1
    xtab1 = xstoretab[xtabkey1]
    if (xtab1 != null) {
      if (xtab["componentid"] == xtab1["componentid"]) { xtbnewsta = 0 }
      else { xtbnewsta = 1 }
    }
    else { xtbnewsta = 2 }
    if (xcomponent != xtab["componentid"]) {
      xcomponent = xtab["componentid"];
      xtbline = 0;
      return ("newline");
    }
    xtbline = xtbline + 1;
    return ("noline")
  }
  if (ikey == "componentname") {
    return (sverweis(objstore["components"], "id", "name", xtab["componentid"]))

  }
  if (ikey == "remark") {
    return (xtab[ikey])

  }
  if (ikey == "pos") {
    if (xtab1 != null) {

      let xroute = objstore["routes"].filter(ele => ele['component1'] == xtab["componentid"] && ele['component2'] == xtab1["componentid"]);
      
      if (xroute[0] == undefined) { return ("") }
      return (xroute[0].pos)
      let xconnection = gettabrow(objstore["component"], "id", xtab["componentid"])["connection"]
      return (sverweis(xconnection, "componentid", "pos", xtab1["componentid"]))
    }
    else {
      if (xstoretab[xtabkey - 1] != null) {
        {
          let xroute = objstore["routes"].filter(ele => ele['component1'] == xtab["componentid"] && ele['component2'] == xstoretab[xtabkey - 1]["componentid"]);
          if (xroute[0] == undefined) { return ("") }
          return (xroute[0].pos)
        }
      }
      return ("")
    }
  }
  let rspeed;
  if (ikey == "speed") {
    if (xtab1 != null) {
      let xroute = objstore["routes"].filter(ele => ele['component1'] == xtab["componentid"] && ele['component2'] == xtab1["componentid"]);
      if (xroute[0] != undefined) {
        rspeed = xroute[0].speed
      }
      /*let xconnection = gettabrow(objstore["component"], "id", xtab["componentid"])["connection"]
      rspeed = sverweis(xconnection, "componentid", "speed", xtab1["componentid"])*/
    }
    else {
      return ("")
    }
    if (xspeed == rspeed) {
      return ("")
    }
    else {
      xspeed = rspeed;
      return (rspeed)
    }

  }
  if (ikey == "hh1") {
    if (xtab["time1"] == xtab["time2"]) { return ("") }
    let rtime = (timevalhh(xtab["time1"]))
    if (xhour[ikey] == rtime) {
      return (" ")
    }
    else {
      xhour[ikey] = rtime
    }
    return (rtime)
  }
  if (ikey == "mm1") {
    if (xtab["time1"] == xtab["time2"]) { return ("") }
    return (timevalmm(xtab["time1"]))
  }
  if (ikey == "hh2") {
    if (xtbnewsta == 0) { return (" ") }
    let rtime = (timevalhh(xtab["time2"]))
    if (xhour[ikey] == rtime) {
      return (" ")
    }
    else {
      xhour[ikey] = rtime
    }
    return (rtime)
  }
  if (ikey == "mm2") {
    return (timevalmm(xtab["time2"]))
  }
  if (ikey == "tt1") {
    if (xtab["time1"] == xtab["time2"]) { return ("") }
    return (":")
  }
  if (ikey == "tt2") {
    return (":")
  }
  return (xtab[ikey])
  /*if (xitem.className.includes("FCchartime")) {
    rtime = timevaltochar(xtab[ikey])
    if (xhour[ikey] == rtime.slice(0, 2)) {
      rtime = "__" + rtime.slice(2, 5)
    }
    else
    {
      xhour[ikey]  = rtime.slice(0, 2)
    }
    
    return (rtime)
     
  }*/


}
function setcomponentbookline(ikey, xtab, xtabkey, xstoretab, xitem) {

  if (ikey == "init") {
    xcomponenttrain = ""
    return ("ok")
  }
  if (ikey == "newparent") {
    xhour = []
    if (xcomponenttrain != xtab["id"])
    {
      xcomponenttrain = xtab["id"]
      return ("newline")
    }
    return ("ok")
  }
  if (ikey == "newrow") {
    /*if (xcomponent != xtab["componentid"]) {
      xcomponent = xtab["componentid"];
      xtbline = 0;
      return ("newline");
    }*/
    return ("newline")
  }
  if (ikey == "componentname") {
    return (sverweis(objstore["components"], "id", "name", xtab["componentid"]))

  }
  if (ikey == "trainid") {
    console.log(xcomponenttrain)
    return (xcomponenttrain)
  }
  if (ikey == "remark") {
    return (xtab[ikey])

  }
 
  if (ikey == "hh1") {
    if (xtab["time1"] == xtab["time2"]) { return ("") }
    let rtime = (timevalhh(xtab["time1"]))
    if (xhour[ikey] == rtime) {
      return (" ")
    }
    else {
      xhour[ikey] = rtime
    }
    return (rtime)
  }
  if (ikey == "mm1") {
    if (xtab["time1"] == xtab["time2"]) { return ("") }
    return (timevalmm(xtab["time1"]))
  }
  if (ikey == "hh2") {
    if (xtbnewsta == 0) { return (" ") }
    let rtime = (timevalhh(xtab["time2"]))
    if (xhour[ikey] == rtime) {
      return (" ")
    }
    else {
      xhour[ikey] = rtime
    }
    return (rtime)
  }
  if (ikey == "mm2") {
    return (timevalmm(xtab["time2"]))
  }
  if (ikey == "tt1") {
    if (xtab["time1"] == xtab["time2"]) { return ("") }
    return (":")
  }
  if (ikey == "tt2") {
    return (":")
  }
  return (xtab[ikey])
  


}
function settimetableline(ikey, xtab, xtabkey, xstoretab, xitem) {
  if (ikey == "init") {
    return ("ok")
  }
  if (ikey == "newparent") {
    return ("ok")
  }
  if (ikey == "newrow") {
    let xtabkey1 = xtabkey + 1
    xtab1 = xstoretab[xtabkey1]
    return ("newline")
  }
  
  if (ikey == "remark") {
    return (xtab[ikey])

  }
  if (ikey == "trackid") {
    return (xtab[ikey])

  }
  if (ikey == "componentid") {
    return (xtab[ikey])

  }
  if (ikey == "time1") {
    return (timevaltoinput(xtab[ikey]))
  }
  if (ikey == "time2") {
    return (timevaltoinput(xtab[ikey]))
  }

  return (xtab[ikey])
}
function settrainobjline(ikey, xtab, xtabkey, xstoretab, xitem) {
  if (ikey == "init") {
    return ("ok")
  }
  if (ikey == "newparent") {
    return ("ok")
  }
  if (ikey == "newrow") {
    return ("newline")
  }
  if (ikey == "staintime") {
    return (timevaltoinput(xtab[ikey]))
  }
  if (ikey == "staouttime") {
    return (timevaltoinput(xtab[ikey]))
  }

  return (xtab[ikey])
}
function trainchangevalue(target) {
  //console.log(e.target.dataset.id,xoldvalue,e.target.tagName)
  let elemid = target.dataset.id
  let xrow = target.closest(".FCrow")
  let xtab = target.closest(".FCtab")
  let xrowid = xrow.querySelector('[data-id="id"]')
  if (xrowid == null || xtab == null || xrow == null ) {return}
  //let xrowix = Number(xrow.dataset.id.replace(/\D+/g, ""))
  let xrowix = xrow.dataset.id.split("_")
  let xtraini = findindex(objstore["trains"], "id", xrowid.innerText)
  if (xtraini == null) {return}
  console.log(xrow, xtraini,xtab.dataset.store,xrowix)
  let xstoreline = objstore["trains"][xtraini][xtab.dataset.store][xrowix[2]]
  switch (elemid) {
    case "id":
      break;
    case "remark":
      xstoreline[elemid] = target.innerHTML
      break;
    case "component1":
    case "component2":
    case "componentid":
      xstoreline[elemid] = target.innerText
      console.log(target.innerText, target.innerHTML)
      break;
    case "trackid":
      xstoreline[elemid] = target.innerText
      break;
    case "object":
      xstoreline[elemid] = target.innerText
      break;
    case "group":
      xstoreline[elemid] = target.innerText
      break;
    case "time1":
    case "time2":
      /*gespeichert wird erst bei verlassen der Zeile oder auslösen
      var timexval = []
      timexval[0]=timeval(xstoreline[elemid])
      timexval[1]=timeval(target.value)
      dx=timedif(timexval[0],timexval[1])
      console.log(dx,timexval,xstoreline[elemid],target.value)
      //xstoreline[elemid] = e.target.value
      */
      break;
    default:
      console.log("default", elemid)

  }
}
function timeval(v1) {
  if (v1 == null) { return (0) }
  let t1 = v1.split(":")
  let nt1 = Number(t1[0]) * 60 + Number(t1[1])
  return (nt1)
}
function timevalcomp(xhh, xmm) {
  let nt1 = Number(xhh) * 60 + Number(xmm)
  return (nt1)
}
function timevalhh(t1) {
  let hh = ("00" + Math.floor(t1 / 60)).slice(-2)
  return (hh)
}
function timevalmm(t1) {
  let mm = ("00" + (t1 % 60)).slice(-2)
  return (mm)
}
function timevaltochar(t1) {
  let hh = ("00" + Math.floor(t1 / 60)).slice(-2)
  let mm = ("00" + (t1 % 60)).slice(-2)
  return (hh + ":" + mm)
}
function onchangecolor(e) {
  let xdiv = e.target.closest(".FCvalue")
  let xcolor = xdiv.querySelector('[data-id="inputcolor"]')
  xdiv.dataset.value=e.target.value
  console.log(e.target.value)
}
function onchangetime(e) {
  let xdiv = e.target.closest(".FCvalue")
  let xhh = xdiv.querySelector('[data-id="hh"]')
  let xmm = xdiv.querySelector('[data-id="mm"]')
  if (e.target.dataset.id == "mm") {

    if (e.target.value == -1) {
      e.target.value = 59
      xhh.value = xhh.value - 1
    }
    if (e.target.value == 60) {
      e.target.value = 0
      xhh.value = xhh.value - (-1) // + geht nicht, da das string concat ist
    }
  }
  if (xhh.value < 0) { xhh.value = 0 }
  if (xhh.value > 23) { xhh.value = 23 }
  xhh.value = ("00" + xhh.value).slice(-2)
  xmm.value = ("00" + xmm.value).slice(-2)
  changeinputtime(xdiv, xhh, xmm)
}
function colorvaltoinput(color) {
  return ("<input data-id='inputcolor' type='color' onblur='itemblurcolor(event)' onchange='onchangecolor(event)' style='width:90%' value='" + color + "' data-oldvalue='" + color + "'> ")
}
function timevaltoinput(t1) {
  let hh = ("00" + Math.floor(t1 / 60)).slice(-2)
  let mm = ("00" + (t1 % 60)).slice(-2)
  return ("<input data-id='hh' type='number' onblur='itemblurtime(event)' onchange='onchangetime(event)' min=0 max=23 style='width:45%' value='" + hh + "' data-oldvalue='" + hh + "'> <input type='number' data-id='mm' onblur='itemblurtime(event)' onchange='onchangetime(event)' min=-1 max=60 style='width:45%' value='" + mm + "' data-oldvalue='" + mm + "'>")
}
function timedif(nt1, nt2) {
  let d1 = nt2 - nt1
  return (d1)
}
function changeinputtime(xdiv, xhh, xmm) {
  let timexval = []
  let xrow = xdiv.closest(".FCrow")
  let xvalue = timevalcomp(xhh.value, xmm.value)
  let xoldvalue = timevalcomp(xhh.dataset.oldvalue, xmm.dataset.oldvalue)
  xhh.dataset.oldvalue = xhh.value
  xmm.dataset.oldvalue = xmm.value
  let yhh, ymm, ydiv, dx, yoldvalue;
 
  if (xdiv.dataset.id == 'time1') {
    ydiv = xrow.querySelector('[data-id="time2"]')
    yhh = ydiv.querySelector('[data-id="hh"]')
    ymm = ydiv.querySelector('[data-id="mm"]')
    let yvalue = timevalcomp(yhh.value, ymm.value)
    yoldvalue = timevalcomp(yhh.dataset.oldvalue, ymm.dataset.oldvalue)
    dx = timedif(xvalue, yvalue)
  }
  else {
    if (xdiv.dataset.id == 'time2') {
      ydiv = xrow.querySelector('[data-id="time1"]')
      yhh = ydiv.querySelector('[data-id="hh"]')
      ymm = ydiv.querySelector('[data-id="mm"]')
      let yvalue = timevalcomp(yhh.value, ymm.value)
      yoldvalue = timevalcomp(yhh.dataset.oldvalue, ymm.dataset.oldvalue)
      dx = timedif(yvalue, xvalue)
    }
    else { return }
  }

  if (timelock) {
    let yvalue = Number(yoldvalue) + Number(timedif(xoldvalue, xvalue))
    yhh.value = ("00" + Math.floor(yvalue / 60)).slice(-2)
    ymm.value = ("00" + (yvalue % 60)).slice(-2)
    yhh.dataset.oldvalue = yhh.value
    ymm.dataset.oldvalue = ymm.value
  }
  else {
    if (dx <= 0) {
      console.log("gleichsetzen")
      yhh.value = ("00" + Math.floor(xvalue / 60)).slice(-2)
      ymm.value = ("00" + (xvalue % 60)).slice(-2)         // Werte gleichsetzen
    }
  }
  }
function fctimelock(xoption, target) {
  if (timelock) {
    timelock = false
    xoption.label = "lock"
  }
  else {
    timelock = true
    xoption.label = "unlock"
  }
}
function dochangetrain(e) {
  updatetrain(null, e.target)
}
function domenuchangetrain(e) {
  updatetrain(null, menuElement)
}

function dojobtrainbook(xoption, target, e) {
  let xrow = target.closest(".FCrow")
  if (xrow == null) { return }
  if (xoption.cmd == "open") {
    let xrowix = xrow.dataset.id.split("_")
    let selarray = objstore["objjob"][xrowix[2]]["trains"]
    let sortarray=[]
    selarray.forEach(function (trainid)
    {
      let sortitem = { trainid: "", sortvalue: "" }
      sortitem.trainid=trainid
      let xtraini = findindex(objstore["trains"], "id", trainid)
      let xjobi = findindex(objstore["trains"][xtraini]["jobs"], "id", e.target.innerText)
      let trainjobline = (objstore["trains"][xtraini]["jobs"][xjobi])
      sortitem.sortvalue = +trainjobline.staintime
      sortarray.push(sortitem)
    })
    
    sortarray.sort((a, b) => (a.sortvalue - b.sortvalue))
    let trainids = ""
    sortarray.forEach(function (sortitem) {
      if (trainids == "")
      {trainids = sortitem.trainid }
      else
      {trainids = trainids + "," + sortitem.trainid }
    })
    const xparm = "?dialog=trainbook&cmd=open=FtrainPrint"+ target.innerText +"&cmd=print&ind="+cv.tabid+"&trainids="+trainids+"&tbheader="+target.innerText
    const xwin = location.href.replace(/\/[^\/]+?\.[^\/]+?$/, '/') + "FTrain.html" + xparm
    const screenWidth = window.screen.width
    const screenHeight = window.screen.height
    const xwinparm = "width=" + screenWidth + ",height=" + screenHeight
    var myWindow = window.open(xwin, "Train" + target.innerText, xwinparm);
}
}
function docomponentbook(xoption, target, e) {

  let xrow = target.closest(".FCrow")
  if (xrow == null) { return }
  if (xoption.cmd == "open") {
    let xpage = target.closest('.FCpage')
    xpage.querySelectorAll('[data-selectid=stationbook].FCframe')
      .forEach(function (selframe, fkey) {
        let domcolumn = selframe.closest('.FCcolumn')
        let objframe = objcard["columns"][domcolumn.dataset.id]["frames"][selframe.dataset.id]
        while (selframe.firstChild) {
          selframe.removeChild(selframe.firstChild)
        }
        let selarray = objstore["trains"].map((currentValue) => {
            return (currentValue.id)
        });
        updatedomfromstore(objframe,selframe, selarray, target.innerText)
      })  
  }
}
function doline(xoption, target, e) {
  let xrow = target.closest(".FCrow")
  
  if (xrow == null) { xrow = e.target.closest(".FCrow") }
  if (xrow == null) { return }
  domtoobj();
  let linesi = Number(xrow.dataset.id.replace(/\D+/g, ""))
  let lines = objstore["lines"]
  if (xoption.cmd == "new") {
    let xfp = { "sta": "search", "components": "" }
    let xcomponents = lines[linesi].stastart + ","
    xfp.components = ""
    xfp = findpath(lines[linesi].stastart, "ea", lines[linesi].staend, 0, xcomponents, xfp)
    console.log(lines[linesi], xfp)
    xfp.components = lines[linesi].stastart + "," + xfp.components
    createline(lines[linesi], xfp.components)
    filetool.storeobj(xobj)
    let xrowid = xrow.querySelector('[data-id="id"]')
    refreshdomfromstore(xrowid)
  }
  if (xoption.cmd == "opengraphic") {
    let xpage = target.closest(".FCpage")
    creategraphictimetable(xpage, lines[linesi])
    if (storeparm.trainid != null)
    {
      let xtraini = findindex(objstore["trains"], "id", storeparm.trainid)
      let xtrain = objstore["trains"][xtraini]
      refreshtrain(xpage,storeparm.trainid,xtrain)
    }
  }
  if (xoption.cmd == "opengraphicwindow") {
    let xparm1="&lineid="+lines[linesi].id
    openwindow("graphicplan", lines[linesi].id,lines[linesi].remark,xparm1)
  }
  if (xoption.cmd == "setcolor") {
    let dlgcolor = document.getElementById("FCdialogcolor")
    xdlg["xoption"] = xoption
    xdlg["event"] = e
    xdlg["targetdom"] = target
    xdlg["function"] = "setdialogcolor"
    dlgcolor.style.left = `${e.clientX}px`;
    dlgcolor.style.top = `${e.clientY}px`;
    dlgcolor.showModal();
  }
  if (xoption.cmd == "setwith") {
    let dlgwith = document.getElementById("FCwith")
    xdlg["xoption"] = xoption
    xdlg["event"] = e
    xdlg["targetdom"] = target
    xdlg["function"] = "setwith"
    dlgwith.style.left = `${e.clientX}px`;
    dlgwith.style.top = `${e.clientY}px`;
    dlgwith.showModal();
  }
}
async function doopenobject(xoption, target, e) {
  if (xoption.cmd == "opentrainsets") {
    let xparm1="&objstore=objtrainset&objectid="+target.innerText
    openwindow("objtraintrainset", "Ftrain"+target.innerText,target.innerText,xparm1)
  }
}
async function dotrain(xoption, target, e) {
  
  if (xoption.cmd == "new") {
    let dlgnew = document.getElementById("FCtrainnew")
    xdlg["xoption"] = xoption
    xdlg["event"] = e
    xdlg["targetdom"] = target
    xdlg["function"] = "dodialogtrainnew"
    dlgnew.style.left = `${e.clientX}px`;
    dlgnew.style.top = `${e.clientY}px`;
    let dlgtraindatalist = document.getElementById("trainnewdatalist")
    let dlgtypedatalist = document.getElementById("traintypedatalist")
    let dlgstartsta = dlgnew.querySelector('[data-id="startsta"]')
    let dlgstarttime = dlgnew.querySelector('[data-id="starttime"]')
    let dlgendsta = dlgnew.querySelector('[data-id="endsta"]')
    let dlglocdatalist = document.getElementById("objlocdatalist")
    let dlgjobdatalist = document.getElementById("objjobdatalist")
    setdlglist(dlglocdatalist,"objloc","objectid","objectid")
    setdlglist(dlgjobdatalist,"objjob","objectid","objectid")
    setdlglist(dlgtypedatalist,"traintypes","id","id")
    setcomponentsel(dlgstartsta)
    setcomponentsel(dlgendsta)
    settraindatalist(dlgtraindatalist)
    dlgstarttime.innerHTML = timevaltoinput(0)
    dlgnew.showModal();
  }
  if (xoption.cmd == "open") {
    console.log(target.innerText,e.target.innerText)
    /*const xparm = "?dialog=trainwork&cmd=open&title=Ftrain"+target.innerText+"&ind="+cv.tabid+"&trainid=" + target.innerText
    const xwin = location.href.replace(/\/[^\/]+?\.[^\/]+?$/, '/') + "FTrain.html" + xparm
    let screenWidth = window.screen.width
    let screenHeight = window.screen.height
    let winsize = await idbKeyval.get("trainworksize") || null
    if (winsize != null)
    {
     screenWidth = winsize.w
     screenHeight = winsize.h
     console.log(winsize)
    }
    const xwinparm = "width=" + screenWidth + ",height=" + screenHeight
    var myWindow = window.open(xwin, "Train" + target.innerText, xwinparm);*/
    let xparm1="&trainid="+target.innerText
    openwindow("trainwork", "Ftrain"+target.innerText,target.innerText,xparm1)
  }
  if (xoption.cmd == "print") {
    console.log(target.innerText,e.target.innerText)
    const xparm = "?dialog=trainbook&cmd=open&title=FtrainPrint"+ target.innerText +"&cmd=print&ind="+cv.tabid+"&trainid=" + target.innerText+"&tbheader=" + target.innerText
    const xwin = location.href.replace(/\/[^\/]+?\.[^\/]+?$/, '/') + "FTrain.html" + xparm
    const screenWidth = window.screen.width
    const screenHeight = window.screen.height
    const xwinparm = "width=" + screenWidth + ",height=" + screenHeight
    var myWindow = window.open(xwin, "Train" + target.innerText, xwinparm);
  }
  if (xoption.cmd == "delete") {
    let xrow = target.closest(".FCrow")
    deletestoreline(target,xrow)
  }
}
function dostoreline(xoption, target, e) {
  if (xoption.cmd == "new") {
    let xrow = target.closest(".FCrow")
    insertstoreline(target,xrow,xoption.cmd)
    return
  }
  if (xoption.cmd == "copy") {
    let xrow = target.closest(".FCrow")
    insertstoreline(target,xrow,xoption.cmd)
    return
  }
  if (xoption.cmd == "create") {
    let xrow = target.closest(".FCblock")
    insertstoreline(target,xrow,xoption.cmd)
    return
  }
  if (xoption.cmd == "delete") {
    let xrow = target.closest(".FCrow")
    deletestoreline(target,xrow)
    return
  }

}
function dotrainline(xoption, target, e) {
  xdlg["xoption"] = xoption
  xdlg["event"] = e
  xdlg["targetdom"] = target
  xdlg["function"] = ""
  //xdlg["function"]="dodialogtrain"
  let dlg = document.getElementById("FCdialog")
  let dlgmessage = dlg.querySelector("#dlgmessage")
  let dlgtitle = dlg.querySelector("#dlgtitle")
  dlgtitle.innerText = xoption.label
  dlgmessage.innerText = target.innerText
  dlg.style.left = `${e.clientX}px`;
  dlg.style.top = `${e.clientY}px`;
  if (xoption.cmd == "create") {
    let xrow = target.closest(".FCblock")
    insertstoretrainline(xrow,xoption.cmd)
    return
  }
  if (xoption.cmd == "new") {
    let xrow = target.closest(".FCrow")
    if (xrow == null)
      {xrow = target.closest(".FCtabheader")}
    insertstoretrainline(xrow,xoption.cmd)
    return
  }
  if (xoption.cmd == "copy") {
    let xrow = target.closest(".FCrow")
    insertstoretrainline(xrow,xoption.cmd)
    return
  }
  if (xoption.cmd == "delete") {
    let xrow = target.closest(".FCrow")
    dlgmessage.innerText = deletestoretrainline(xrow);
    if (dlgmessage.innerText != "delete") { dlg.showModal(); }
    return

  }
  


}

function updatetrain(xoption, target, e) {


  let elemid = target.dataset.id
  let xframe = target.closest(".FCframe")

  let xrow = target.closest(".FCrow")
  let xta24b = target.closest(".FCtab")
  let xid = xframe.dataset.xid
  //let xrowix = Number(xrow.dataset.id.replace(/\D+/g, ""))
  let xrowix = xrow.dataset.id.split("_")
  let xtraini = findindex(objstore["trains"], "id", xid)
  let xtrain = objstore["trains"][xtraini]
  if (xframe.dataset.store == "timetables") {
    let xtimetable = xtrain["timetables"][xrowix[2]]
   
    let xd1 = timegetdif(xrow, "time1", xtimetable)
    let xd2 = timegetdif(xrow, "time2", xtimetable)
    
    
    changetrain(xtrain, xd1, xd2, xrowix[2])
    
    
    let xpage = target.closest('.FCpage')
    refreshtrain(xpage, xid, xtrain)
    
    
  }
  if (xframe.dataset.store == "trainsets") {
    console.log("updatetraintrainsets", target, xframe, xtraini, xid)
  }  

}
function refreshtrain(xpage, xid, xtrain) {
  let traintypes = objstore["traintypes"]
  if (storeparm.trainid == xid) {
    xpage.querySelectorAll('[data-selectid=trainid].FCframe')
    .forEach(function (selframe, fkey) {
      let domcolumn = selframe.closest('.FCcolumn')
      let objframe = objcard["columns"][domcolumn.dataset.id]["frames"][selframe.dataset.id]
      while (selframe.firstChild) {
        selframe.removeChild(selframe.firstChild)
      }
      updatedomfromstore(objframe,selframe, xid)
    })
  }
  let traintype = gettabrow(traintypes, "id", xtrain.type)
    if (traintype == null) {
      traintype = traintypes[1]
    }
  xpage.querySelectorAll('.FCsvgContent')
    .forEach(function (divcontent, fkey) {
      let svg = divcontent.querySelector("svg")
      deletetrainline(xtrain, svg)
      createtrainline(xtrain, svg, traintype)
  })
}
function changetrain(xtrain, xd1, xd2, xi) {
  
  let xcomponentid, xtime1, xtime2;
  xtrain["timetables"].forEach(function (xtrainline, xkey) {
    if (xkey < xi) {
      xtrainline["time1"] = xtrainline["time1"] + xd1
      xtrainline["time2"] = xtrainline["time2"] + xd1
    }
    if (xkey == xi) {
      xcomponentid = xtrainline["componentid"]
      xtime1 = xtrainline["time1"]
      xtime2 = xtrainline["time2"]
      xtrainline["time1"] = xtrainline["time1"] + xd1
      xtrainline["time2"] = xtrainline["time2"] + xd2
    }
    if (xkey > xi) {
      xtrainline["time1"] = xtrainline["time1"] + xd2
      xtrainline["time2"] = xtrainline["time2"] + xd2
    }
   
  })
  
  let xtrainchilds = ["trainsets"]
  
  xtrainchilds.forEach(function (xtrainchild) {
    xtrain[xtrainchild].forEach(function (xtrainline, xkey) {

      if (xtrainline["stain"] == xcomponentid && ((xtime1 <= xtime2 && xtime1 <= xtrainline["staintime"]) && xtrainline["staintime"] <= xtime2)) {
        if (xtraintype == "trainsets" || xtraintype == "locomotives") {
          xtrainline["staintime"] = xtrainline["staintime"] + xd2
     
        }
        else {
          xtrainline["staintime"] = xtrainline["staintime"] + xd1
        }
      }
      else {
        if (xtime1 > xtrainline["staintime"]) {
          xtrainline["staintime"] = xtrainline["staintime"] + xd1
        }
        else
          if (xtime2 < xtrainline["staintime"]) {
            xtrainline["staintime"] = xtrainline["staintime"] + xd2
          }
      }
      if (xtrainline["staout"] == xcomponentid && ((xtime1 <= xtime2 && xtime1 <= xtrainline["staouttime"]) && xtrainline["staouttime"] <= xtime2)) {
        if (xtrainchild == "trainsets" || xtrainchild == "locomotives") {
          xtrainline["staouttime"] = xtrainline["staouttime"] + xd2
        }
        else {
          xtrainline["staouttime"] = xtrainline["staouttime"] + xd1
        }
      }
      else {
        if (xtime1 > xtrainline["staouttime"]) {
          xtrainline["staouttime"] = xtrainline["staouttime"] + xd1
        }
        else
          if (xtime2 < xtrainline["staouttime"]) {
            xtrainline["staouttime"] = xtrainline["staouttime"] + xd2
          }
      }
    })
  })
}
function timegetdif(xrow, xt, xtimetable) {
  let ydiv = xrow.querySelector('[data-id="' + xt + '"]')
  let yhh = ydiv.querySelector('[data-id="hh"]')
  let ymm = ydiv.querySelector('[data-id="mm"]')
  
  let yvalue = timevalcomp(yhh.value, ymm.value)

  let dx = timedif(xtimetable[xt], yvalue)
  return (dx)
}
function getposfromsvg(svg, xsta, xtrack) {
  let xsel = xsta + "." + xtrack
  let xcomponentline = svg.querySelector('[data-id="' + xsel + '"]')
  if (xcomponentline == null) {
    xsel = xsta + ".*"
    xcomponentline = svg.querySelector('[data-id="' + xsel + '"]')
  }

  if (xcomponentline == null) {
    return (null)
  }
  return (xcomponentline.getAttribute("data-pos"))
}
function dodialogtrain(dlg) {
  let xrow = xdlg.targetdom.closest(".FCrow")
  if (xdlg.xoption.cmd == "copy") {
    insertstoretrainline(xrow,xdlg.xoption.cmd)
  }
}
function getdlgfield(xdlg,xfield)
{
  return xdlg.querySelector('[data-id="'+xfield+'"]')
}
async function dodialogtrainnew(dlg) {
  if (xdlg.xoption.cmd == "new") {
    let dlgstartsta = getdlgfield(dlg,"startsta")
    let dlgendsta =getdlgfield(dlg,"endsta")
    let dlgloc = getdlgfield(dlg,"objloc")
    let dlgjob = getdlgfield(dlg,"objjob")
    let dlgtrainset = getdlgfield(dlg,"trainset")
    let dlgstarttime = getdlgfield(dlg,"starttime")
    let domhh = dlgstarttime.querySelector('[data-id="hh"]')
    let dommm = dlgstarttime.querySelector('[data-id="mm"]')
    let starttimeval = timevalcomp(domhh.value, dommm.value)
    let trainid = document.getElementById('trainnewid')
    let xfp = { "sta": "search", "components": "" }
    let xcomponents = dlgstartsta.value + ","
    xfp.components = ""
    xfp = findpath(dlgstartsta.value, "ea", dlgendsta.value, 0, xcomponents, xfp)

    xfp.components = dlgstartsta.value + "," + xfp.components
    
    createtrain(trainid.value, xfp.components,starttimeval,dlgtrainset.value,dlgloc.value,dlgjob.value)
    await filetool.storeobj(xobj)
  
    let xframe=xdlg["targetdom"].closest(".FCframe")
    
    while (xframe.firstChild) {
      xframe.removeChild(xframe.firstChild)
    }
    loaddomfromstore(objstore[xframe.dataset.store], xframe)
    //loaddomfromstore(objstore[xstoreid], xframe)
    
  }


}
function dodialoglinenew(dlg) {
  if (xdlg.xoption.cmd == "new") {
    
  }


}
function createline(line, xcomponents) {
  var currentTime = new Date()
  const r = /\d+/;
  const sumPropertyValue = (items, prop) => items.reduce((a, b) => +a + +b[prop], 0);
  let tabcomponents = xcomponents.split(",")
  /*let linesi = lines.push(JSON.parse(JSON.stringify(storedef.line))) - 1
  lines[linesi].id = lineid
  lines[linesi].linetracks = []
  lines[linesi].creator = "Ulen"
  lines[linesi].lastuser = ""
  lines[linesi].lastupdate = currentTime.toISOString()
  lines[linesi].type = "standard"
  lines[linesi].remark = ""*/
  let componentprev = ""
  let componentpos = 0;
  let trackpos = 0;
  let componentposadd = Math.round(1000 / (tabcomponents.length - 1));
  let trackposadd = Math.round((componentposadd * line["trackpart"])/ 1000);
  console.log(trackposadd, componentposadd, line["trackpart"], tabcomponents.length)
  line["linetracks"] = []
  let components = objstore["components"]
  let countcomponents = 0
  tabcomponents.forEach(function (station, skey) {
    let staind = components.findIndex((element) => element["id"] == station)
    if (staind > -1) {

      if (line.componenttype.includes(components[staind].type) || line.componenttype == "*") {
        countcomponents = countcomponents + 1
        const tracki = line["linetracks"].push(JSON.parse(JSON.stringify(storedef.linetrack))) - 1
        line["linetracks"][tracki].componentid = station
        line["linetracks"][tracki].trackid = "*"
        line["linetracks"][tracki].pos = componentpos
        line["linetracks"][tracki].remark = ""
        line["linetracks"][tracki].display = "on"
        trackpos = componentpos + trackposadd
        components[staind].tracks.forEach(function (track, tkey) {
          const tracki = line["linetracks"].push(JSON.parse(JSON.stringify(storedef.linetrack))) - 1
          line["linetracks"][tracki].componentid = station
          line["linetracks"][tracki].trackid = track.trackid
          line["linetracks"][tracki].pos = trackpos
          trackpos = trackpos + trackposadd
          line["linetracks"][tracki].remark = track.remark
          if (line.tracktype.includes(track.type) || line.tracktype == "*") {
            line["linetracks"][tracki].display = "on"
          }
          else {
            line["linetracks"][tracki].display = "none"
          }
        })
        componentpos = componentpos + componentposadd
        let xroute = objstore["routes"].filter(ele => ele['component1'] == componentprev && ele['component2'] == station);
        console.log(xroute)
        componentprev = station
      }
    }
  })
  console.log(line)
}
function createtrain(trainid, components,starttime,xtrainset,xloc,xjob) {
  var currentTime = new Date()
  const r = /\d+/;
  const sumPropertyValue = (items, prop) => items.reduce((a, b) => +a + +b[prop], 0);
  let timetable0 = JSON.stringify(storedef.timetable)
  let tabcomponents = components.split(",")
  let trainsi = objstore['trains'].push(JSON.parse(JSON.stringify(storedef.train))) - 1
  objstore['trains'][trainsi].id = trainid
  objstore['trains'][trainsi].loc = []
  objstore['trains'][trainsi].job = []
  objstore['trains'][trainsi].wheel = []
  objstore['trains'][trainsi].timetables = []
  objstore['trains'][trainsi].creator = "Ulen"
  objstore['trains'][trainsi].lastuser = ""
  objstore['trains'][trainsi].lastupdate = currentTime.toISOString()
  objstore['trains'][trainsi].id = trainid
  objstore['trains'][trainsi].name = trainid
  objstore['trains'][trainsi].number = trainid.match(r)
  objstore['trains'][trainsi].type = ""
  objstore['trains'][trainsi].remark = ""
  let componentprev = ""
  let componentstart = ""
  let time1 = starttime
  let time2 = starttime
  let locline = JSON.parse(JSON.stringify(storedef["locomotive"])); 
  let jobline = JSON.parse(JSON.stringify(storedef["job"])); 
  let trainsetleft = {}; 
  let group = 1
  tabcomponents.forEach(function (station, skey) {
    if (station != "") {
      
      let timeadd = 0
      const timei = objstore['trains'][trainsi]["timetables"].push(JSON.parse(timetable0)) - 1
      objstore['trains'][trainsi]["timetables"][timei].componentid = station
      let xroute = objstore["routes"].filter(ele => ele['component1'] == componentprev && ele['component2'] == station);
      console.log(xroute)
      if (xroute[0] == undefined) { timeadd = 0 }
      else {
        timeadd = +xroute[0].time // sumPropertyValue(xroute[0].sections, 'time');
      }
      time1 = time1 + timeadd
      time2 = time2 + timeadd
      console.log(time1,time2,timeadd)
      objstore['trains'][trainsi]["timetables"][timei].time1 = time1
      objstore['trains'][trainsi]["timetables"][timei].time2 = time2
      console.log(timeadd,xroute[0])
      if (componentstart == "") {
        componentstart = station
        locline.stain = station
        locline.staintime = time1
        jobline.stain = station
        jobline.staintime = time1
      }
      else {
        locline.staout = station
        locline.staouttime = time1
        jobline.staout = station
        jobline.staouttime = time1
        if (xtrainset == "Verteiler") {
          trainsetleft = JSON.parse(JSON.stringify(storedef["trainsetleft"]));
          trainsetleft.group = group
          group = group + 1
          trainsetleft.remark = sverweis(objstore["components"], "id", "name", station)
          objstore['trains'][trainsi]["trainsetlefts"].push(trainsetleft)
        }
      }
      componentprev = station
    }
  })
  if (xloc != null && xloc != "") {
    locline.object = xloc
    objstore['trains'][trainsi]["locomotives"].push(locline)
    insertobj(objstore['trains'][trainsi].id,"objloc",xloc,xloc)
  }
  if (xjob != null && xjob != "") {
    jobline.object = xjob
    objstore['trains'][trainsi]["jobs"].push(jobline)
    insertobj(objstore['trains'][trainsi].id,"objjob",xjob,xjob)
  }
  if (xtrainset != "Verteiler") {
    trainsetleft = JSON.parse(JSON.stringify(storedef["trainsetleft"]));
    trainsetleft.group = group
    group = group + 1
    trainsetleft.remark = xtrainset
    objstore['trains'][trainsi]["trainsetlefts"].push(trainsetleft)
  }
 
}
function insertstoretrainline(xrow,xcmd) {
  let nobjs = []
  let xframe = xrow.closest(".FCframe")
  let xstoreid = xframe.dataset.store
  
  let xid = xframe.dataset.xid
  console.log(xrow,xid,xstoreid)
  //let xrowix = 1
  let xrowix = xrow.dataset.id.split("_")
  let xtraini = findindex(objstore["trains"], "id", xid)
  let xtrain = objstore["trains"][xtraini]
  let newline = {}
  let xstoredef = xstoreid.substring(0, xstoreid.length - 1)
  if (xcmd == "create") { 
    newline = JSON.parse(JSON.stringify(storedef[xstoredef])); 
    nobjs.push(newline) }
  else {
    xtrain[xstoreid].forEach(function (xtrainline, xkey) {

      let xrowkey = "row" + xkey.toString()
      nobjs.push(xtrainline)
      if (xkey == xrowix[2]) {

        if (xcmd == "new" ) { newline = JSON.parse(JSON.stringify(storedef[xstoredef])) }
        else { newline = JSON.parse(JSON.stringify(xtrainline)) }
        if (xstoreid == "timetables") { newline["time1"] = newline["time2"] }
        nobjs.push(newline)
      }
    }
    )
  }
  xtrain[xstoreid] = nobjs;
  let xpage = xrow.closest('.FCpage')
  refreshtrain(xpage, xid , xtrain)
}
function insertstoreline(target,xrow,xcmd) {
  let nobjs = []
  let xframe = target.closest(".FCframe")
  let xid = xframe.dataset.xid
  let xstoreid = xframe.dataset.store
  let xstoreparent = xframe.dataset.storep
  let xstore = null
  let parenti=0
  if (xstoreparent != null)
  {
    parenti = findindex(objstore[xstoreparent], "id", xid)
    xstore = objstore[xstoreparent][parenti][xstoreid]
  }
  else
  {
    xstore = objstore[xstoreid]
  }
  //let xrowix = Number(xrow.dataset.id.replace(/\D+/g, ""))
  let xrowix = xrow.dataset.id.split("_")
  let xstoredef = xstoreid.substring(0, xstoreid.length - 1)
  let newline = {}
  
  console.log(xrowix)
  if (xcmd == "create") { 
    newline = JSON.parse(JSON.stringify(storedef[xstoredef])); 
    nobjs.push(newline) }
  else {
    xstore.forEach(function (xstoreline, xkey) {

      let xrowkey = "row" + xkey.toString()
      nobjs.push(xstoreline)
      if (xkey == xrowix[2]) {

        if (xcmd == "new") { newline = JSON.parse(JSON.stringify(storedef[xstoredef])) }
        else {
          newline = JSON.parse(JSON.stringify(xstoreline))
          console.log(newline)
          if (newline["id"] != null) {
            newline["id"] = newline["id"] + "_copy"
          }
        }
        nobjs.push(newline)
      }
    }
    )
  }
  while (xframe.firstChild) {
    xframe.removeChild(xframe.firstChild)
  }
  //xstore = nobjs; // reicht nicht als Zuweisung !
  if (xstoreparent != null)
  {
    objstore[xstoreparent][parenti][xstoreid]=nobjs
    loaddomfromstore(objstore[xstoreparent][parenti][xstoreid], xframe)
  }
  else
  {
    objstore[xstoreid]=nobjs;
    loaddomfromstore(objstore[xstoreid], xframe)
  }
 
  
}
function deletestoreline(target,xrow) {
  let nobjs = []
  let xframe = target.closest(".FCframe")
  let xid = xframe.dataset.xid
  let xstoreid = xframe.dataset.store
  let xstoreparent = xframe.dataset.storep
  let xstore = null
  let xrowix = xrow.dataset.id.split("_")
  let parenti=0
  
  if (xstoreparent != null)
  {
    parenti = findindex(objstore[xstoreparent], "id", xid)
    xstore = objstore[xstoreparent][parenti][xstoreid]
  }
  else
  {
    xstore = objstore[xstoreid]
  }
  xstore.forEach(function (xstoreline, xkey) {
    if (xkey != xrowix[2]) {
      nobjs.push(xstoreline)
    }
  }
  )
  while (xframe.firstChild) {
    xframe.removeChild(xframe.firstChild)
  }
  //xstore = nobjs; // reicht nicht als Zuweisung !
  if (xstoreparent != null)
  {
    objstore[xstoreparent][parenti][xstoreid]=nobjs
    loaddomfromstore(objstore[xstoreparent][parenti][xstoreid], xframe)
  }
  else
  {
    objstore[xstoreid]=nobjs;
    loaddomfromstore(objstore[xstoreid], xframe)
  }
 
}
function deletestoretrainline(xrow) {
  let nobjs = []
  let xframe = xrow.closest(".FCframe")
  let xid = xframe.dataset.xid
  let xstoreid = xframe.dataset.store
  let xrowix = xrow.dataset.id.split("_")
  let xtraini = findindex(objstore["trains"], "id", xid)
  let xtrain = objstore["trains"][xtraini]
  let rmessage = "delete"
  xtrain[xstoreid].forEach(function (xtrainline, xkey) {
    let xrowkey = "row" + xkey.toString()
    if (xkey != xrowix[2]) {
      nobjs.push(xtrainline)
    }
    else {
      if (xstoreid == "timetables") {
        if (xtrainline["time1"] != xtrainline["time2"]) {
          rmessage = " löschen nicht möglich, da Haltezeit größer null"
          nobjs.push(xtrainline)
        }
      }
    }
  }
  )
  xtrain[xstoreid] = nobjs;
  //console.log(xtrain["timetables"])
  //console.log(objstore["trains"][xtraini]["timetables"])
  let xpage = xrow.closest('.FCpage')
  refreshtrain(xpage, xid , xtrain)
  return (rmessage)
}
function testfindpath() {
  let xfp = { "sta": "search", "components": "" }
  let xcomponents = "Mis,"
  xfp.components = ""
  xfp = findpath("Mis", "ea", "Vta", 0, xcomponents, xfp)
  console.log(xfp)
  xcomponents = "Pa,"
  xfp.sta = "search"
  xfp.components = ""
  xfp = findpath("Pa", "ea", "Ef", 0, xcomponents, xfp)
  console.log(xfp)

}
function findpath(sta1, ea1, sta2, xx, xcomponents, xfp) {
  if (xfp.sta != "search") { return (xfp) }
  let xsta1con = sverweis(objstore["components"], "id", "connections", sta1)
  console.log(sta1,xsta1con)
  let rsta = ""
  let xea1;
  xx = xx + 1
  if (xx > 100) { console.log("end", xx); xfp.sta = "end"; return (xfp) }
  xsta1con.forEach(function (xcon, xkey) {
    if (xfp.sta != "search") { return (xfp) }
    xea1 = xcon.ea1 + ","
    if (rsta.includes(xea1) == false) {
      rsta = rsta + xea1;
      let xroute = objstore["routes"].filter(ele => ele['component1'] == sta1 && ele['ea1'] == xcon.ea1);
      xroute.forEach(function (xr, xrkey) {
        if (xfp.sta != "search") { return (xfp) }
        let xrsta2 = xr.component2 + ","
        if (xcomponents.includes(xrsta2) == false) {
          xcomponents = xcomponents + xrsta2
          if (xr.component2 == sta2) {
            console.log("found", xx, xcomponents);
            xfp.sta = "found"
          }
          else { xfp = findpath(xr.component2, xr.ea2, sta2, xx, xcomponents, xfp); }
          if (xfp.sta == "found") { xfp.components = xr.component2 + "," + xfp.components }
        }
      })
    }
  })
  return (xfp)
}
function settrainsel(selectBox) {

  while (selectBox.options.length > 0) {
    selectBox.remove(0);
  }
  let xoption = document.createElement("option");
  let trains = objstore["trains"]
  trains.forEach(function (train, tkey) {
    xoption = document.createElement("option");
    xoption.text = train.id
    xoption.value = train.id
    selectBox.add(xoption)
  })
}
function setcomponentsel(selectBox) {
  if (selectBox == null) {return}
  while (selectBox.options.length > 0) {
    selectBox.remove(0);
  }
  let xoption = document.createElement("option");
  let components = objstore["components"]
  components.forEach(function (component, tkey) {
    xoption = document.createElement("option");
    xoption.text = component.name
    xoption.value = component.id
    selectBox.add(xoption)
  })
}
function settraindatalist(datalist) {

  while (datalist.firstChild) {
    datalist.removeChild(datalist.firstChild);
  }
  let xoption = document.createElement("option");
  let trains = objstore["trains"]
  trains.forEach(function (train, tkey) {
    xoption = document.createElement("option");
    xoption.text = train.id
    xoption.value = train.id
    datalist.appendChild(xoption)
  })
}
function setdlglist(datalist,xstore,xtext,xvalue) {

  while (datalist.firstChild) {
    datalist.removeChild(datalist.firstChild);
  }
  let xoption = document.createElement("option");
  let xelements = objstore[xstore]
  xelements.forEach(function (xele, tkey) {
    xoption = document.createElement("option");
    xoption.text = xele[xtext]
    xoption.value = xele[xvalue]
    datalist.appendChild(xoption)
  })
}
function dostore(xoption, target, e)
{
   console.log(xoption)
   if (xoption.cmd == "store")
   {
    savestoretrain()
   }
}
async function savestore()
{
  console.log(storeparm)
  let savestore = objstore["trains"][xtraini]
  console.log(savestore)
  let saveid = storeparm.ind + storeparm.trainid
  await idbKeyval.set(saveid, JSON.stringify(savestore));
  //storeparm.action="savetrain"
  //savechannel.postMessage(storeparm);
}
async function savestoretrain()
{
  console.log(storeparm)
  if (storeparm.trainid == "") {return} 
  let xtraini = findindex(objstore["trains"], "id", storeparm.trainid)
  if (xtraini == null) {return}
  let savestore = objstore["trains"][xtraini]
  console.log(savestore)
  let saveid = storeparm.ind + storeparm.trainid
  await idbKeyval.set(saveid, JSON.stringify(savestore));
  storeparm.action="savetrain"
  savechannel.postMessage(storeparm);
}
function updatedomfromidbold(xparm)
{
  // wird nicht genutzt 
  console.log(xparm,storeparm)
  if (xparm.ind == storeparm.ind) {
    let xtraini = findindex(objstore["trains"], "id", xparm.trainid)
    let xtrain = objstore["trains"][xtraini]
    let xpage = document.querySelector('[data-id=' + storeparm.dialogname + '].FCpage')
    console.log(xpage)
    if (xpage != null)
    {refreshtrain(xpage, xparm.trainid, xtrain)}
    //console.log(objstore["trains"][xtraini])
    
  }
}
async function updatestorefromidb(xparm)
{
  console.log("updatestorefromidb",xparm,storeparm)
  
  if (xparm.ind == storeparm.ind) {
    let xtraini = findindex(objstore["trains"], "id", xparm.trainid)
    let saveid = xparm.ind + xparm.trainid
    let result = await idbKeyval.get(saveid)
    let updatestore = JSON.parse(result);
    objstore["trains"][xtraini] = updatestore;
    let xpage = document.querySelector('[data-id=' + storeparm.dialogname + '].FCpage')
    console.log("page",xpage)
    if (xpage != null)
    {refreshtrain(xpage, xparm.trainid, updatestore)}
    //console.log(objstore["trains"][xtraini])
    
  }
  if (storeparm.dialogname == "trainmain")
    {
      let result = await idbKeyval.get(xparm.ind)
      xobj=JSON.parse(result);
      let xtraini = findindex(xobj[0]["fcard"]["store"]["trains"], "id", xparm.trainid)
      let saveid = xparm.ind + xparm.trainid
      result = await idbKeyval.get(saveid)
      let updatestore = JSON.parse(result);
      //console.log(updatestore)
      xobj[0]["fcard"]["store"]["trains"][xtraini] = updatestore;
      //console.log("savetoidb")
      await idbKeyval.set(xparm.ind, JSON.stringify(xobj));
      let ltabid = xparm.ind.substring(0,4)
      setcvtabidchange(true,xparm.trainid,ltabid)
    }
  
}
function getMousePosition(evt,svg) {
  var CTM = svg.getScreenCTM();
  return {
    x: (evt.clientX - CTM.e) / CTM.a,
    y: (evt.clientY - CTM.f) / CTM.d
  };
}