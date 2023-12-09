"use strict";
// Hier sind alle Teile für das Stellpult

// button vom Stellpult bearbeiten
function stpbtn(e) {
  let obj_value;
  let obj_ix;
  let xselOBJ = e.target.dataset.id
  let xstpdefs = objcard['columns']['Stellpult']['frames']["Elements"]["blocks"]
  Object.entries(xstpdefs).forEach(function (xrow) { if (xrow[1]["className"].includes("FCrow") && xrow[1]['items']["name"].value == xselOBJ) { obj_value = xrow[1]['items']["addr"].value; obj_ix = xrow[1]['items']["ixTaste"].value } })

  let xmesstr = "XLIO40" + "0000"
  xmesstr = xmesstr + obj_value.toString().padStart(4, '0')
  xmesstr = xmesstr + "0178" // x"B2" 

  if (e.target.classList.contains("btnon")) {
    xmesstr = xmesstr + "0001";
    e.target.classList.remove("btnon")
    xstptasten[obj_ix] = obj_value

  }
  else {
    if (xstptasten[obj_ix] == 0) {
      xstptasten[obj_ix] = obj_value
    }
    else {
      xstptasten[1] = 0;
      xstptasten[2] = 0;
      document.querySelectorAll('.btnon').forEach(function (xdiv) { xdiv.classList.remove("btnon") })
    }
    e.target.classList.add("btnon")
    xmesstr = xmesstr + "0000"
    xstptasten[obj_ix] = obj_value
  }

  writetostream(xmesstr)
}
// sende einen Loconet Befehl über serial writetostream
function sendlnto(event) {
  let  xselAX = document.getElementById("selAX").value
  let xselOP = document.getElementById("selOP").value
  let xselOBJ = document.getElementById("selOBJ").value
  let xtarget = event.target.dataset.id;
  let xstpdefs = objcard['columns']['Stellpult']['frames']["Elements"]["blocks"]
  let xax = objcard['columns']['Def']['frames']["AX"]["blocks"]
  let xop = objcard['columns']['Def']['frames']["OP"]["blocks"]

  Object.entries(xax).forEach(function (xrow) { if (xrow[1]["className"].includes("FCrow") && xrow[1]['items']["cond"].value == xselAX) { ax_value = xrow[1]['items']["cond"].dataset.ivalue } })
  Object.entries(xop).forEach(function (xrow) { if (xrow[1]["className"].includes("FCrow") && xrow[1]['items']["cond"].value == xselOP) { op_value = xrow[1]['items']["cond"].dataset.ivalue } });
  Object.entries(xstpdefs).forEach(function (xrow) { if (xrow[1]["className"].includes("FCrow") && xrow[1]['items']["name"].value == xselOBJ) { obj_value = xrow[1]['items']["addr"].value } })
  let xmesstr = "XLIO40" + "0000"
  xmesstr = xmesstr + obj_value.toString().padStart(4, '0')
  xmesstr = xmesstr + parseInt(op_value, 16).toString().padStart(4, '0')
  xmesstr = xmesstr + parseInt(ax_value, 16).toString().padStart(4, '0')
  writetostream(xmesstr)
}
// Ausgabe Arduino configtabelle toboard oder als file
function writeto(event) {
  let xselbau = document.getElementById("selbau").value
  let xtarget = event.target.dataset.id;
  console.log(xtarget)
  let xstpdefs = objcard['columns']['Stellpult']['frames']["Elements"]["blocks"]
  let xconddefs = objcard['columns']['Cond']['frames']["Conditions"]["blocks"]
  let xele = objcard['columns']['Def']['frames']["ELE"]["blocks"]
  let xax = objcard['columns']['Def']['frames']["AX"]["blocks"]
  let xio = objcard['columns']['Def']['frames']["IO"]["blocks"]
  let xop = objcard['columns']['Def']['frames']["OP"]["blocks"]
  let xcond = objcard['columns']['Def']['frames']["COND"]["blocks"]
  let xioc = objcard['columns']['IOC']['frames']["IOC"]["blocks"]
  let xpin = objcard['columns']['Pin']['frames']["PIN"]["blocks"]
  let xtabaddr = []
  let xtabax = []
  let xtabio = []
  let xtabop = []
  let xtabcond = []
  let xtabpin = []
  let xmestab = []
  Object.entries(xcond).forEach(function (xrow) { if (xrow[1]["className"].includes("FCrow")) { xtabcond.push({ "cond": xrow[1]['items']["cond"].value, "ival": xrow[1]['items']["cond"].dataset.ivalue }) } })
  Object.entries(xop).forEach(function (xrow) { if (xrow[1]["className"].includes("FCrow")) { xtabop.push({ "cond": xrow[1]['items']["cond"].value, "ival": xrow[1]['items']["cond"].dataset.ivalue }) } })
  Object.entries(xio).forEach(function (xrow) { if (xrow[1]["className"].includes("FCrow")) { xtabio.push({ "cond": xrow[1]['items']["cond"].value, "ival": xrow[1]['items']["cond"].dataset.ivalue }) } })
  Object.entries(xax).forEach(function (xrow) { if (xrow[1]["className"].includes("FCrow")) { xtabax.push({ "cond": xrow[1]['items']["cond"].value, "ival": xrow[1]['items']["cond"].dataset.ivalue }) } })
  Object.entries(xpin).forEach(function (xrow) { if (xrow[1]["className"].includes("FCrow")) { xtabpin.push({ "cond": xrow[1]['items']["cond"].value, "ival": xrow[1]['items']["cond"].dataset.ivalue }) } })
  ///console.log(xtabbau,xtabop,xtabio,xtabax,xtabpin);
  xmestab[0] = "XLIO0612341234123412341234123412324"
  i = 0;
  xmesstr = "XLIO07" + i.toString().padStart(4, '0') + "00000000"
  xmestab.push(xmesstr);
  i = i + 1;
  Object.entries(xstpdefs).forEach(function (xstprow) {
    if (xstprow[1]["className"].includes("FCrow")) {
      xtabaddr.push({ "name": xstprow[1]['items']["name"].value, "addr": xstprow[1]['items']["addr"].value })
      xmestab.push("XLIO07" + i.toString().padStart(4, '0') + xstprow[1]['items']["addr"].value.toString().padStart(4, '0') + xstprow[1]['items']["ixTaste"].value.toString().padStart(4, '0') + "0000");
      i = i + 1;
    }

  })
  let xanzaddr = i;
  i = 0;
  xmesstr = "XLIO08" + i.toString().padStart(4, '0') + "00000000000000000000"
  xmestab.push(xmesstr);
  i = i + 1;
  Object.entries(xioc).forEach(function (xstprow) {
    if (xstprow[1]["className"].includes("FCrow") && xstprow[1]['items']["modul"].value == xselbau) {
      xmesstr = "XLIO08" + i.toString().padStart(4, '0')
      xmesstr = xmesstr + findindex(xtabaddr, "name", xstprow[1]['items']["name"].value).toString().padStart(4, '0')
      xmesstr = xmesstr + sverweis(xtabpin, "cond", "ival", xstprow[1]['items']["pin"].value).toString().padStart(4, '0')
      xmesstr = xmesstr + sverweis(xtabio, "cond", "ival", xstprow[1]['items']["IO"].value).toString().padStart(4, '0')
      xmesstr = xmesstr + parseInt(sverweis(xtabop, "cond", "ival", xstprow[1]['items']["OP"].value), 16).toString().padStart(4, '0')
      xmesstr = xmesstr + parseInt(sverweis(xtabax, "cond", "ival", xstprow[1]['items']["AX"].value), 16).toString().padStart(4, '0')
      xmesstr = xmesstr + "0000"
      xmestab.push(xmesstr);
      i = i + 1;
    }

  })
  let xanzio = i;
  let i = 0;
  xmesstr = "XLIO09" + i.toString().padStart(4, '0') + "00000000000000000000"
  xmestab.push(xmesstr);
  i = i + 1;
  Object.entries(xconddefs).forEach(function (xstprow) {

    if (xstprow[1]["className"].includes("FCrow") && xstprow[1]['items']["_modul"].value == xselbau) {
      xmesstr = "XLIO09" + i.toString().padStart(4, '0')
      xmesstr = xmesstr + findindex(xtabaddr, "name", xstprow[1]['items']["_ADDR"].value).toString().padStart(4, '0')
      xmesstr = xmesstr + findindex(xtabaddr, "name", xstprow[1]['items']["_T1"].value).toString().padStart(4, '0')
      xmesstr = xmesstr + findindex(xtabaddr, "name", xstprow[1]['items']["_T2"].value).toString().padStart(4, '0')
      xmesstr = xmesstr + parseInt(sverweis(xtabop, "cond", "ival", xstprow[1]['items']["_OP"].value), 16).toString().padStart(4, '0')
      xmesstr = xmesstr + parseInt(sverweis(xtabax, "cond", "ival", xstprow[1]['items']["_AX"].value), 16).toString().padStart(4, '0')
      xmestab.push(xmesstr);
      i = i + 1;
    }

  })
  let xanzcond1 = i;
  i = 0;

  Object.entries(xconddefs).forEach(function (xstprow) {
    if (xstprow[1]["className"].includes("FCtabheader")) {
      let xanzcond2 = 0;
      xmesstr = "XLIO10" + i.toString().padStart(4, '0')
      Object.entries(xstprow[1]["items"]).forEach(function (xconditem) {
        if (xconditem[0].substring(0, 1) == "_") {
        }
        else {
          xanzcond2 = xanzcond2 + 1

          xind = xtabaddr.findIndex((element) => element["name"] == xconditem[1].value) + 1
          xmesstr = xmesstr + xind.toString().padStart(4, '0')
        }
      })

      xmestab.push(xmesstr);
      i = i + 1;

    }

    if (xstprow[1]["className"].includes("FCrow") && xstprow[1]['items']["_modul"].value == xselbau) {
      xmesstr = "XLIO10" + i.toString().padStart(4, '0')

      Object.entries(xstprow[1]["items"]).forEach(function (xconditem) {
        if (xconditem[0].substring(0, 1) == "_") {

        }
        else {
          xmesstr = xmesstr + parseInt(sverweis(xtabcond, "cond", "ival", xconditem[1].value), 16).toString().padStart(4, '0')
        }
      })
      //console.log(xmesstr)
      xmestab.push(xmesstr);
      i = i + 1;

    }

  })

  xmesstr = "XLIO06" + "00000002";
  xmesstr = xmesstr + xanzaddr.toString().padStart(4, '0')
  xmesstr = xmesstr + xanzio.toString().padStart(4, '0')
  xmesstr = xmesstr + xanzcond1.toString().padStart(4, '0')
  xmesstr = xmesstr + xanzcond2.toString().padStart(4, '0')
  xmestab[0] = xmesstr;

  if (xtarget == "writetoboard") {
    writetostream("XLIOX00000");
  } // start transmit
  if (xtarget == "writetofile") {
    saveFile(xmestab.join("\r\n"))
  }
  //console.log(xmestab)


}



function createcond() {
  let newcond =
  {
    "className": "FCvalue FCnosync FCcenter",
    "value": "-",
    "style": {
      "width": "2%"
    },
    "dataset": {
      "display": "on",
      "visibility": "visible"
    },
    "dropid": "cond"
  }
  let xstpdefs = objcard['columns']['Stellpult']['frames']["Elements"]["blocks"]
  let xconddefs = objcard['columns']['Cond']['frames']["Conditions"]["blocks"]
  let xtabname = []
  Object.entries(xstpdefs).forEach(function (xstprow) {

    if (xstprow[1]["className"].includes("FCrow")) {
      let xname = xstprow[1]["items"]["name"].value
      let xtix = xstprow[1]["items"]["ixTaste"].value

      if (xtix == 1) {
        xtabname.push(xname)
        Object.entries(xconddefs).forEach(function (xcondrow) {
          if (xcondrow[1]["className"].includes("FCtabheader") || xcondrow[1]["className"].includes("FCrow")) {
            if (xcondrow[1]['items'][xname] != null) {
              let xcondstr = JSON.stringify(xcondrow[1]['items'][xname])
              delete xcondrow[1]['items'][xname]
              xcondrow[1]['items'][xname] = JSON.parse(xcondstr)
            }
            else {
              xcondrow[1]['items'][xname] = JSON.parse(JSON.stringify(newcond))

              if (xcondrow[1]["className"].includes("FCtabheader")) {
                xcondrow[1]['items'][xname].value = xname
                delete xcondrow[1]['items'][xname]["dropid"]
              }
            }
          }

        })
      }
    }
  })

  Object.entries(xconddefs).forEach(function (xcondrow) {

    Object.entries(xcondrow[1]["items"]).forEach(function (xconditem) {
      if (xconditem[0].substring(0, 1) == "_" || xtabname.includes(xconditem[0])) {
        // console.log("ok",xconditem[0])
      }
      else {
        //console.log("delete",xconditem[0])
        delete xcondrow[1]["items"][xconditem[0]]
      }
    }
    )

  })

  clearmainpage();
  createFcard()
  objtodom();
  createFcardButtons()
}
function stpconnect(event) {
  let xcbutton = event.target
  if (xcbutton.innerText == "connect") {
    xcbutton.innerText = "disconnect";
    XLIOAnswer = "XLIO.ANZ";
    XLIOcallback = xlioanz;

    connect(stpline);
  }
  else {
    xcbutton.innerText = "connect";
    disconnectPort();
  }

}
// serielle Zeile erhalten
function stpline(xelement) {

  if (xelement.substring(0, 4) == "XLIO") {
    let xarr0 = xelement.split("=")
    if (xarr0.length > 1) {
      let xarr = xarr0[1].split(",")
      const last = xarr[xarr.length - 1];
      //console.log(last,xarr0[0])
      if (last == "#") {
        if (xarr0[0] == XLIOAnswer) {
          XLIOcallback(xarr);
        }
        if (xarr0[0] == "XLIO.XTON") {
          // Beginn tabelle der condition übertragen
          xmestabi = 0
          xliomes(xarr);
        }
        if (xarr0[0] == "XLIO.NEXT") {
          // nächster Eintrag aus Tabelle
          xliomes(xarr);
        }
        if (xarr0[0] == "XLIO.LN") {
          // ein Loconet Befehl ist angekommen, also einen event auslösen
          const event = new CustomEvent("xlioln", { detail: xarr });
          document.dispatchEvent(event);
          //console.log(event)
          //xlioln(xarr);
        }
      }
    }
  }
}
function xlioanz(xarr) {
  console.log(xarr)
}
function xliomes(xarr) {

  if (xmestabi < xmestab.length) { writetostream(xmestab[xmestabi]) }
  xmestabi = xmestabi + 1;
}
// Loconet message von serial per event getriggert
function xlioln(xarr) {
  xlnop = xarr[0]
  xlnaddr = xarr[1]
  xlnax = xarr[2]
  obj_name = ""
  obj_ix = 0
  xstpdefs = objcard['columns']['Stellpult']['frames']["Elements"]["blocks"]
  Object.entries(xstpdefs).forEach(function (xrow) { if (xrow[1]["className"].includes("FCrow") && xrow[1]['items']["addr"].value == xlnaddr) { obj_name = xrow[1]['items']["name"].value; obj_ix = xrow[1]['items']["ixTaste"].value } })
  console.log(xlnop, xlnaddr, obj_name, xlnax);
  if (xlnop == 178) //B2 setsensor
  {
    xbtn = document.querySelector('[data-id=' + obj_name + '].btn')
    //console.log(xbtn)
    if (xlnax == 0) {
      xbtn.classList.add("btnon")
    }
    else {
      xbtn.classList.remove("btnon")
    }
  }
  if (xlnop == 177) //B1 weichenlage
  {
    document.querySelectorAll('[data-id=' + obj_name + '][data-ax]')
      .forEach(function (xdiv) {

        if (xdiv.dataset.ax == xlnax) {
          xdiv.classList.remove("FCnone")
        }
        else {
          xdiv.classList.add("FCnone")
        }
      })
  }
  if (xlnop == 228) //E4 signalsetzen
  {
    document.querySelectorAll('[data-id=' + obj_name + '][data-ax]')
      .forEach(function (xdiv) {

        if (xdiv.dataset.ax == xlnax) {
          xdiv.classList.remove("FCnone")
        }
        else {
          xdiv.classList.add("FCnone")
        }
      })
  }
}


