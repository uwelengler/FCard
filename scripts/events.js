
"use strict";
// hier werden alle ereignisse (events) vom User abgearbeitet
/**
 * @param  {} ximg
 */
function getimage(ximg) {
  // im tag für image eingefügt

  if (fid == 'img') {
    ximg.src = dom.preimg.dataset.id
    ximg.dataset.value = dom.preimg.dataset.id
  }

  // ximg.parentElement.dataset.value = dom.preimg.dataset.id
}
function setdialogcolor(event) {
  let xcolor = null
  console.log(event)
  /*if (event.target.id == "inputcolor" )  // input
  {
    xcolor = event.target.value
  }
  console.log(xcolor)*/
}
function setcolor(event) {
  let xcolorkey, xcolorid, xcolor;
  if (event.target.dataset.colorid == null) {
    xcolorid = colorid
  }
  else {
    xcolorid = event.target.dataset.colorid
  }
  if (event.target.id == "inputcolor" || event.target.id == "currentcolor")  // input
  {
    xcolor = event.target.value
  }
  else // button
  {
    xcolor = event.target.dataset.color
    xcolorkey = event.target.dataset.colorkey
  }

  // 
  if (xcolorid == 'cardborder') {
    document.querySelectorAll('.FCpage')
      .forEach(function (userItem) {
        userItem.style.borderColor = xcolor
      })
    setcvchange(true, xcolorid)
    return;

  }
  if (xcolorid == 'cardback') {
    document.querySelectorAll('.FCpage')
      .forEach(function (userItem) {
        userItem.style.backgroundColor = xcolor;
        userItem.dataset.colorkey = xcolorkey
      })
    setcvchange(true, xcolorid)
    return;
  }
  let xselection = window.getSelection()
  let xdiv = xselection.anchorNode
  if (xdiv.nodeName != 'DIV') {
    xdiv = xselection.anchorNode.parentNode
    if (xdiv.nodeName != 'DIV') {
      xdiv = xdiv.closest('div')
    }
  }
  if (xcolorid == 'fieldback' || xcolorid == 'fieldfont') {

    let xcmd = event.target.id

    if (xdiv != null) {
      if (xdiv.classList.contains('FCvalue') || xdiv.classList.contains('FClabel')) {
        setcvchange(true, xcolorkey)
        if (xcolorid == 'fieldback') {
          xdiv.style.backgroundColor = xcolor;
          if (xdiv.classList.contains('FCcolorvalue')) { xdiv.dataset.colorkey = "FCcolorvalue" }
          else { xdiv.dataset.colorkey = xcolorkey }
        }
        else {
          xdiv.style.color = xcolor
        }
      }
    }
  }

  if (xcolorid == 'pageborder') {
    let userItem = xdiv.closest('.FCpage');
    userItem.style.borderColor = xcolor
    setcvchange(true, xcolorid)
  }
  if (xcolorid == 'pageback') {
    let userItem = xdiv.closest('.FCpage');
    userItem.style.backgroundColor = xcolor
    userItem.dataset.colorkey = xcolorkey
    setcvchange(true, xcolorid)
  }

  if (xcolorid == 'pagefont') {
    let userItem = xdiv.closest('.FCpage');
    userItem.style.color = xcolor
    setcvchange(true, xcolorid)
  }

  if (xcolorid == 'blockback') {
    let userItem = xdiv.closest('.FCblock');
    userItem.style.backgroundColor = xcolor
    userItem.dataset.colorkey = xcolorkey
    setcvchange(true, xcolorid)
  }

  if (xcolorid == 'blockfont') {
    let userItem = xdiv.closest('.FCblock');
    userItem.style.color = xcolor
    setcvchange(true, xcolorid)
  }


  if (xcolorid == 'line') {
    setcvchange(true, xcolorid)

    document.querySelectorAll('[data-id="line"]')
      .forEach(function (xline) {

        xline.setAttribute('stroke', xcolor)

        if (xcolor == '#FFFFFF00' || xcolor == "") {
          xline.setAttribute('display', 'none')
        } else {
          xline.setAttribute('display', '')
        }
      })
  }
}
function onchangecheckbox(e) {
  let xid = e.target.dataset.id
  setcvchange(true, xid)
  let xclass = e.target.dataset.class
  let xname = e.target.dataset.name

  if (objcard.checkboxes != null) {
    let x_checkbox = objcard.checkboxes[xid]
    if (x_checkbox != null) {
      let xxc = x_checkbox.checked
      x_checkbox.checked = e.target.checked
      let xxd = x_checkbox.checked
    }
  }
  let xselstr = ""
  if (xid != null) { xselstr = '[data-checkbox="' + xid + '"]' }
  if (xclass != null && xname == null) { xselstr = '.' + xclass }
  if (xclass != null && xname != null) { xselstr = '[data-id="' + xname + '"].' + xclass }
 
  if (xname == "closest") {
    let xitem = activselection.div.closest('.' + xclass)

    if (e.target.checked) {
      if (e.target.dataset.value == "style") {
        let xproperty = e.target.dataset.xtrue.split(":")
        xitem.style.setProperty(xproperty[0], xproperty[1])
      }
      else { xitem.setAttribute(e.target.dataset.value, e.target.dataset.xtrue) }
      //console.log(e.target.checked,xvisibility', "visible")
    } else {
      if (e.target.dataset.value == "style") {
        let xproperty = e.target.dataset.xfalse.split(":")
        xitem.style.setProperty(xproperty[0], xproperty[1])
      }
      else { xitem.setAttribute(e.target.dataset.value, e.target.dataset.xfalse) }
    }
    xselstr = ""
  }
  if (xselstr != "") {
    document.querySelectorAll(xselstr)
      .forEach(function (xitem) {


        if (e.target.checked) {

          if (e.target.dataset.value == "style") {
            let xproperty = e.target.dataset.xtrue.split(":")

            xitem.style.setProperty(xproperty[0], xproperty[1])
          }
          else { xitem.setAttribute(e.target.dataset.value, e.target.dataset.xtrue) }
          //console.log(e.target.checked,xvisibility', "visible")
        }
        else {
          if (e.target.dataset.value == "style") {
            let xproperty = e.target.dataset.xfalse.split(":")

            xitem.style.setProperty(xproperty[0], xproperty[1])
          }
          else { xitem.setAttribute(e.target.dataset.value, e.target.dataset.xfalse) }
        }
      }
      )
  }
}

function onchangelocale(e) {
  let xcmd = e.target.dataset.id
  if (xcmd == "localesel") {
    xlocale = e.target.value
    setlang();
    createcheckboxes();
    //location.reload();
  }
}
function onchangelevel(e) {
  let xcmd = e.target.dataset.id
  if (xcmd == "levelsel") {
    cv.level = e.target.value
    setlevel(cv.level);
    //location.reload();
  }
}


function onselect(event) {

  const selection = event.target.value.substring(event.target.selectionStart, event.target.selectionEnd)
  //console.log(selection)

}
async function openwindow(dialog, fid, title, xparm1) {
  console.log(storeparm.dialogname,cv.tabid,storeparm)
  //let myWindow = await idbKeyval.get("Dialog"+fid) || null
  if (myWindows[fid] != null && myWindows[fid] != undefined) {
    console.log(myWindows[fid])
    if (myWindows[fid].closed == true) {
      console.log("closed")
    }
    else {
      console.log("open")

      myWindows[fid].focus()
      return
    }
  }
  const xparm = "?dialog=" + dialog + "&cmd=open&title=" + title + "&ind=" + cv.tabid + xparm1
  const xwin = location.href.replace(/\/[^\/]+?\.[^\/]+?$/, '/') + "FTrain.html" + xparm
  let screenWidth = window.screen.width
  let screenHeight = window.screen.height
  let winsize = await idbKeyval.get(dialog + "size") || null
  if (winsize != null) {
    screenWidth = winsize.w
    screenHeight = winsize.h
    console.log(winsize)
  }
  const xwinparm = "width=" + screenWidth + ",height=" + screenHeight
  let wparm = {}
  wparm.xwin = xwin
  wparm.fid = fid
  wparm.xwinparm = xwinparm
  console.log(storeparm.dialogname,"openwindow",storeparm,wparm)
  if (storeparm.dialogname == "trainmain") { 
    myWindows[fid] = window.open(xwin, "Train" + fid, xwinparm) 
    console.log(storeparm.dialogname,myWindows[fid])
    if ( myWindows[fid] == null || myWindows[fid] == undefined) {
      console.log("openerror")
      let dlgfile = document.getElementById("FCdialog")
     dlgfile.showModal();
      //window.open("chrome://settings/content/popups")
      //chrome://settings/content/popups
    } 
  }
  else { openwindowchannel.postMessage(wparm); }
  //await idbKeyval.set("Dialog"+fid, myWindow);

}
async function trainbutton(e) {
  let xtt = e.target.dataset.id
  let fid = xtt.split(".")[0]

  if (e.target.value == "opendialog") {
    await filetool.gettraincard()
    let dlgfile = document.getElementById("FCdialogfile")
    dlgfile.showModal();
    return
  }
  if (e.target.value == "openwindow") {
    openwindow(fid, fid, e.target.title, "")
  }
  if (e.target.value == "updatestore") {

    if (storeparm.dialogname == "trainwork") { savestoretrain(); }
    else {
      savestore();
    }
  }
  if (e.target.value == "savewindow") {
    domtoobj(false);
    filetool.storeobjcard();
    savewindowsize()
  }

}
function tabnav(e) {
  let xtt = e.target.dataset.id
  let fid = xtt.split(".")[0]
  let selimage = null
  //console.log(fid)

  if (fid == "imageset") {
    dom.preimg = document.getElementById('preimg')
    selimage = document.getElementById('selimage')


    document.querySelectorAll('[data-id=' + selimage.options[selimage.selectedIndex].value + '].FCvalue')
      .forEach(function (userItem) {
        if (userItem != null) {
          let _tempurl = encodeURI(dom.preimg.dataset.id)
          userItem.style["background-image"] = "url(" + _tempurl + ")";
          userItem.dataset["backgroundimage"] = "on"
        }
      }
      )
    return
  }

  if (fid == 'showhelp') {
    window.open("./help/doku.html");
  }
  if (fid == 'undo') {
    clearmainpage()
  }
  if (fid == 'print') {
    domtoobj()
    clearmainpage()

    objtoprint()
    window.print()
    clearprintpage()
    createFcard()
    objtodom()
    createFcardButtons()
    initDcard();
    return
  }
  if (fid == 'usercard') {
    // führt sonst zu Problemen, es wird der alte Wert gesetzt über itemsync ....
    bluritemdiv = ""
    bluritemid = ""
    bluritemval = ""
    setcvchange(true, "usercard")
    updatedom(usercard[0].fcard)
    return
  }
  if (e.target.classList.contains('buttontab')) {
    setactivtab(fid);
  }
  domtoobj()
  filetool.setid(fid)
  clearmainpage()
  if (xobj != null) {
    createFcard()
    objtodom()
    createFcardButtons()
    initDcard();
  }
}
function initDcard() {
  let xcard = document.getElementById('FC0')
  activselection.div = xcard.getElementsByClassName("FCvalue")[0]
  setbuttons(cv.buttons)
  setobj()
}
function inputblur(e) {

  if (xoldvalue != e.target.value) {
    setcvchange(true, e.target.dataset.id)
    if (e.target.classList.contains('FCtrain')) {
      trainchangevalue(e.target)
    }
  }

}
function itemblur(e) {
  if (xoldvalue != e.target.innerText) {
    setcvchange(true, e.target.dataset.id)
  }

  let xselection = window.getSelection()
  activselection.range = xselection.getRangeAt(0).cloneRange(true)
  activselection.text = activselection.range.cloneContents()
  activselection.div = e.target
  cleardivspan(activselection.div) // da manchmal spans von browser erzeugt werden, wenn im gesamten feld eingefügt wird
  // console.log(activselection.div,activselection.text,activselection.range)
  setbluritemid(e.target)
  if (e.target.classList.contains('FCline')) {
    e.target.style.backgroundColor = e.target.innerText
    e.target.style.color = e.target.innerText
    document.querySelectorAll('[data-id=' + itemid + ']')
      .forEach(function (xdiv) {
        xdiv.style.backgroundColor = e.target.innerText
        xdiv.style.color = e.target.innerText
        xdiv.innerText = e.target.innerText
      })
  }
  if (e.target.classList.contains('barcode') && e.target.classList.contains('FCvalue')) {
    let e_prev = e.target.previousElementSibling;

    let e_next = e.target.nextElementSibling;

    let text = e.target.innerText
    let codeABC = "B"
    let startCode = String.fromCharCode(codeABC.toUpperCase().charCodeAt() + 138);
    let stop = String.fromCharCode(206);

    text = codeABC == 'C' && toSetC(text) || text;

    let check = checkSum128(text, startCode.charCodeAt(0) - 100);

    e_prev.innerText = startCode

    e_next.innerText = check + stop
  }
  if (e.target.classList.contains('qrcode') && e.target.classList.contains('FCvalue')) {
    let e_prev = e.target.previousElementSibling;
    e_prev.innerText = ""
    new QRCode(e_prev, e.target.innerText);
  }
  if (e.target.classList.contains('FCtrain') && e.target.classList.contains('FCvalue')) {

    trainchangevalue(e.target)
    let xrowold = e.target.closest(".FCrow")
    if (xrowold == null) { return }
    let xrownew = xrowold
    if (e.relatedTarget != null) { xrownew = e.relatedTarget.closest(".FCrow") }

    if (xrowold.dataset.id != xrownew.dataset.id) {
      console.log("updatetrain", e.target)
      updatetrain(null, e.target)
      //refreshtrain erzeugt neue childs from frame, daher ist target danach ohne anker
    }
  }
  let xframe = e.target.closest(".FCframe")
  if (xframe == null) {
    console.log("noframe", e.target)
    return
  }
  if (xframe.dataset.store != null) {

    let xrowold = e.target.closest(".FCrow")
    //console.log(xframe.dataset.store,xrowold,e.target)
    if (xrowold == null) { return }
    let xrownew = xrowold
    if (e.relatedTarget != null) {
      xrownew = e.relatedTarget.closest(".FCrow")
      if (xrownew != null) {

        if (xrowold.dataset.id != xrownew.dataset.id) {
          updatestorefromline(e.target)
        }
      }
      else { updatestorefromline(e.target) }
    }
    else { updatestorefromline(e.target) }
  }

}
function itemblurcolor(e) {
  // 
  // nicht notwendig wird durch onchange von input erledigt trainchangevalue(e.target)
  let xrowold = e.target.closest(".FCrow")
  let xrownew = xrowold
  if (e.relatedTarget != null) { xrownew = e.relatedTarget.closest(".FCrow") }
  if (xrowold.dataset.id != xrownew.dataset.id) {
    console.log("itemblurcolor")
  }


}
function itemblurtime(e) {
  // nur für span hh,mm in time1,time2
  // ????? nicht notwendig wird durch onchange von input erledigt trainchangevalue(e.target)
  let xrowold = e.target.closest(".FCrow")
  let xrownew = xrowold
  if (e.relatedTarget != null) { xrownew = e.relatedTarget.closest(".FCrow") }
  if (xrowold.dataset.id != xrownew.dataset.id) {

    updatetrain(null, e.target)
  }


}
function itemsync(div) {
  if (div.classList.contains('FCnosync')) {
  }
  else {
    div.innerHTML = bluritemval
  }
}
function setbluritemid(div) {
  if (div.classList.contains('FCnosync')) {
    bluritemid = "";
    bluritemval = ""
  }
  else {
    bluritemid = div.dataset.syncid;
    bluritemclass = div.dataset.syncclass;
    bluritemval = div.innerHTML;
    bluritemdiv = div;
  }
}
function xonfocus(e) {
  console.log(e.target)
  if (e.target.tagName == "DIV") {
    if (e.target.classList.contains('FCvalue') || e.target.classList.contains('FClabel') || e.target.classList.contains('FCstp') || e.target.classList.contains('FCrowitem')) {
      xoldvalue = e.target.innerText
      let xcard = e.target.closest('.FCcard');
      // console.log(xcard)
      if (xcard != null) {
        dosync();
        //setbackgroundimage(e);
        setbuttons(cv.buttons)
        setblocksel(e)
        activselection.div = e.target
        setobj()
        setcurrentcolorsel(e)

      }
    }
  }
  if (e.target.tagName == "INPUT") {
    xoldvalue = e.target.value
  }
}
function setcurrentcolorsel(e) {
  let currentcolorinput = document.getElementById("currentcolor")
  if (currentcolorinput == null) { return }
  let  userItem = activselection.div;
  currentcolorinput.value = rgbToHex(activselection.div.style["background-color"])
  if (colorid == 'fieldback') {

    currentcolorinput.value = rgbToHex(userItem.style["background-color"])
  }
  if (colorid == 'pageback') {
    userItem = activselection.div.closest('.FCpage');
    currentcolorinput.value = rgbToHex(userItem.style["background-color"])
  }
  if (colorid == 'blockback') {
    userItem = activselection.div.closest('.FCblock');
    currentcolorinput.value = rgbToHex(userItem.style["background-color"])
  }

  document.querySelectorAll('.FCbuttoncolor')
    .forEach(function (xbutton) {
      let xcolorkey = "FC" + userItem.dataset.colorkey
      if (xbutton.dataset.id == xcolorkey) {

        xbutton.classList.add("FCbuttoncoloron")

      }
      else {
        xbutton.classList.remove("FCbuttoncoloron")

      }
    })
}
function setblocksel(e) {
  let xblock = e.target.closest('[data-blockgroup]');
  if (xblock != null) {
    let selectBox = document.getElementById("blocksel")
    while (selectBox.options.length > 0) {
      selectBox.remove(0);
    }
    if (xblock.dataset.blockgroup) {
      setblockselopt(xblock.dataset.blockgroup, xblock.dataset.id)
    }
  }


}
function setblockselopt(xblockgroup, id) {

  let selectBox = document.getElementById("blocksel")
  while (selectBox.options.length > 0) {
    selectBox.remove(0);
  }

  selectBox.dataset.id = xblockgroup
  document.querySelectorAll('[data-blockgroup=' + xblockgroup + ']')
    .forEach(function (xdiv) {
      let xoption = document.createElement("option");
      xoption.text = xdiv.dataset.id;
      xoption.value = xdiv.dataset.id;
      if (id == xdiv.dataset.id) { xoption.selected = true }
      let notfound = true;
      for (let i = 0; i < selectBox.options.length; i++) {

        if (selectBox.options[i].value == xoption.value) {
          notfound = false;

          break;
        }
      }
      //}
      if (notfound == true) { selectBox.add(xoption) }

    })
  //console.log(selectBox.options)



}


function setgroupsel() {

  let selectBox = document.getElementById("groupsel")
  if (selectBox == null) { return }
  while (selectBox.options.length > 0) {
    selectBox.remove(0);
  }
  let xoption = document.createElement("option");
  xoption.text = "none";
  xoption.value = "none";
  selectBox.add(xoption)

  document.querySelectorAll('[data-blockgroup]')
    .forEach(function (xdiv) {
      xoption = document.createElement("option");
      xoption.text = xdiv.dataset.blockgroup;
      xoption.value = xdiv.dataset.blockgroup;
      let notfound = true;
      for (let i = 0; i < selectBox.options.length; i++) {
        if (selectBox.options[i].value == xoption.value) {
          notfound = false;
          break;
        }
      }
      if (notfound == true) { selectBox.add(xoption) }
    })
  setblockselopt("none", "")
}
function setbuttons(tbuttons) {
  let xbuttoncardadd = document.getElementById("buttoncardadd")
  if (xbuttoncardadd == null) { return }
  let xbchilds = xbuttoncardadd.childNodes
  xbchilds.forEach(function (xbutton, xkey) {
    if (xbutton.nodeName == "DIV" || xbutton.nodeName == "LABEL" || xbutton.nodeName == "INPUT" || xbutton.nodeName == "BUTTON" || xbutton.nodeName == "DIV") {
      if (tbuttons.includes(xbutton.dataset.id)) {
        xbutton.style.display = ""
      }
      else {
        xbutton.style.display = "none"
      }
    }
  })
  xbuttoncardadd.querySelectorAll('[dropid]')
    .forEach(function (selectBox, xkey) {

      while (selectBox.options.length > 0) {
        selectBox.remove(0);
      }
      document.querySelectorAll('[data-dropid=' + selectBox.getAttribute("dropid") + '].FCvalue')
        .forEach(function (xdiv) {
          let xoption = document.createElement("option");
          xoption.text = xdiv.value;
          xoption.value = xdiv.value;
          selectBox.add(xoption)
        })
    })
}

async function xButton(evt) {
  let fid = evt.target.dataset.id;

  if (fid == "setusercard") {
    usercard[0] = JSON.parse(JSON.stringify(xobj[0]));

    await idbKeyval.set("usercard", usercard);
  }

  if (fid == "setcatalog") {
    mastercatalog[0] = JSON.parse(JSON.stringify(xobj[0]));

    await idbKeyval.set("mastercatalog", mastercatalog);
  }



  if (fid == "settabcolor") {

    domtoobj()


    let xcolumnname = activselection.div.closest('.FCcolumn').dataset.id;

    for (const [key, value] of Object.entries(tabcolor)) {


      if (objcard['columns'][xcolumnname]['frames']['colors']['blocks']['colors']['items'][key] != null) {
        //console.log(key,value,objcard['columns']['colors']['frames']['colors']['blocks']['colors']['items'][key]['style']['background-color'])
        tabcolor[key] = objcard['columns'][xcolumnname]['frames']['colors']['blocks']['colors']['items'][key]['style']['background-color']
      }
    }
    await idbKeyval.set("tabcolor", tabcolor)
    setcolortobutton()
  }
}
function oncontextmenu(e) {
  console.log(e)
}

function oncm(e) {
  console.log(e)
}
function setobj() {

  let xcard = activselection.div.closest('.FCcard');
  let xcolumn = activselection.div.closest('.FCcolumn');
  let xframe = activselection.div.closest('.FCframe');
  let xblock = activselection.div.closest('.FCblock');
  if (xframe.dataset.store != null || xframe.dataset.selectid != null) {
    //xblock = xframe.querySelector('.FCrow')
  }
  createDcard();
  console.log(activselection.div)
  listtodom(xcard, xcolumn, xframe, xblock, activselection.div)

}

function FConpaste(e) {
 
  e.preventDefault()
  let vselection = window.getSelection()
  let vselectionrange = vselection.getRangeAt(0).cloneRange(true)
  let vtext = vselectionrange.extractContents()
  //console.log(vtext)
  vselectionrange.insertNode(xcopytext)

  xcopytext = vselectionrange.cloneContents()
  
}
function FCclose(e) {

  if (cv.change["tab1"] == true || cv.change["tab2"] == true || cv.change["tab3"] == true || cv.change["tab3"] == true) {
    e.preventDefault(); // If you prevent default behavior in Mozilla Firefox prompt will always be shown
    // Chrome requires returnValue to be set

    e.returnValue = 'Willst du wirklich';
  }
  saveheight()
  savewindowsize()

}
function FConcopy(e) {
  // console.log("oncopy",e.cancelable)

  let xselection = window.getSelection()
  let xcopyrange = xselection.getRangeAt(0).cloneRange(true)
  //console.log(xcopyrange.commonAncestorContainer.nodeName)
  xcopytext = xcopyrange.cloneContents()

  let xelement = xcopyrange.commonAncestorContainer  // erster gemeinsamer vorfahre
  // xcopyrange.startContainer.parentElement
  if (xelement.nodeName == "#text") {
    xelement = xcopyrange.commonAncestorContainer.parentElement  // nächster vorfahre da nur text und nur echte node interessieren
  }
  //while (xelement.classList.contains('FCspan') && (xelement.innerText == xcopytext.textContent))
  while (xelement.classList.contains('') && (xelement.textContent == xcopytext.textContent)) // alle mit gleichem inhalt und vom typ FCspan
  {
    xcopytext = xelement
    //console.log(xelement.textContent,xcopytext.textContent)
    xelement = xelement.parentElement
  }

}
function FConcut(e) {
  //console.log("oncopy",e.cancelable)
  let xselection = window.getSelection()
  let xcopyrange = xselection.getRangeAt(0).cloneRange(true)
  xcopytext = xcopyrange.cloneContents()
  let xelement = xcopyrange.commonAncestorContainer  // erster gemeinsamer vorfahre
  if (xelement.nodeName == "#text") {
    xelement = xcopyrange.commonAncestorContainer.parentElement  // nächster vorfahre da nur text und nur echte node interessieren
  }
  while (xelement.classList.contains('FCspan') && (xelement.textContent == xcopytext.textContent)) // alle mit gleichem inhalt und vom typ FCspan
  {
    xcopytext = xelement
    xelement = xelement.parentElement
  }
}

function keyup(e) {
  //console.log(e)
  if (e.ctrlKey && e.keyCode == 67) {

  }
  if (e.ctrlKey && e.keyCode == 86) {

    //e.preventDefault()
    //e.stopPropagation()
    
  }
}
function nextpe(xnext) {
  if (xnext.parentElement) {
    //console.log(xnext.parentElement)
    nextpe(xnext.parentElement)
  }
  else {
    //console.log("Ende")
  }

}
function itemmouse(xcmd, e) {



  if (xcmd == "mouseup") {
    let xselection = window.getSelection()
    //console.log(xselection)
    activselection.range = xselection.getRangeAt(0).cloneRange(true)
    activselection.text = activselection.range.cloneContents()

    //nextpe(activselection.range.startContainer)
    activselection.div = xselection.anchorNode
    if (activselection.div.nodeName != 'DIV') {
      activselection.div = xselection.anchorNode.parentNode
      if (activselection.div.nodeName != 'DIV') {
        activselection.div = activselection.div.closest('div')
      }
    }
    //console.log(activselection.range.startContainer.parentNode.outerHTML,activselection.text)
    let xfontSize = parseInt(activselection.range.startContainer.parentNode.style.fontSize)
    if (isNaN(xfontSize)) { xfontSize = '100' }
    let docfontsize = document.getElementById('xfontsize')
    if (docfontsize != null) { docfontsize.value = xfontSize }

  }

}

function onchangeset(e) {
  /* setzen Anzeige Spaltenbreite */
  let xwid = e.target.dataset.id
  if (e.target.value < 10) { e.target.value = 10 }
  if (e.target.value > 100) { e.target.value = 100 }
  let xwidth = e.target.value + "%"
  setidbKeyval(xwid, e.target.value)
  if (xwid == "withleft") {
    document.querySelectorAll('[data-id=columnleft]')
      .forEach(function (xdiv) { xdiv.style.width = xwidth })
  }
  if (xwid == "withmiddle") {
    document.querySelectorAll('[data-id=columnmiddle]')
      .forEach(function (xdiv) { xdiv.style.width = xwidth })
  }
  if (xwid == "withright") {
    document.querySelectorAll('[data-id=columnright]')
      .forEach(function (xdiv) { xdiv.style.width = xwidth })
  }
}

function exportData(e) {
  // export Datenvalues einzelner  Karte
  // FCXID = "FC0" //+ ix.toString()
  let fcard = document.getElementById('FC0')
  let cfcard = fcard.childNodes
  let ex_obj = {}
  ex_obj.fcard = { 'columns': {} }
  cfcard.forEach(function (domcolumn, ckey) {
    let cdomcolumn = domcolumn.childNodes
    ex_obj.fcard.columns[domcolumn.dataset.id] = {}
    ex_obj['fcard']['columns'][domcolumn.dataset.id] = { 'blocks': {} }
    cdomcolumn.forEach(function (domblock, bkey) {
      let cdomitem = domblock.childNodes
      ex_obj['fcard']['columns'][domcolumn.dataset.id]['blocks'][domblock.dataset.id] = { 'items': {} }
      cdomitem.forEach(function (domitem, ikey) {
        ex_obj['fcard']['columns'][domcolumn.dataset.id]['blocks'][domblock.dataset.id]['items'][domitem.dataset.id] = { 'value': {} }
        ex_obj['fcard']['columns'][domcolumn.dataset.id]['blocks'][domblock.dataset.id]['items'][domitem.dataset.id].value = domitem.innerHTML
        if (domitem.dataset.value) {
          ex_obj['fcard']['columns'][domcolumn.dataset.id]['blocks'][domblock.dataset.id]['items'][domitem.dataset.id].value = domitem.dataset.value
        }
      })
    })
  })
  saveFile(JSON.stringify(ex_obj, 0, 2), null)
}
function onchangeblocksel(e) {
  let xblockgroup = e.target.dataset.id

  document.querySelectorAll('[data-blockgroup=' + xblockgroup + ']')
    .forEach(function (xdiv) {

      xdiv.dataset.display = "none"
      xdiv.setAttribute('display', 'none')
      if (e.target.value == xdiv.dataset.id) {
        xdiv.setAttribute('display', '')
        xdiv.dataset.display = ""
      }

    })
}
function onchangegroupsel(e) {
  let xblockgroup = e.target.value

  setblockselopt(xblockgroup, "")
}



function xedit(e) {
  // call from onclick HTML
  let xonoff = 'on'
  let xelement;
  let xcmd = e.target.dataset.id
  let xselectedtext = activselection.range.cloneContents()
  let startcont = activselection.range.startContainer
  if (xselectedtext.textContent == activselection.range.commonAncestorContainer.textContent) {
    
    xelement = activselection.range.startContainer.parentElement
    let parent = xelement.parentNode
    //console.log(xelement)
    let xstartelement = activselection.range.commonAncestorContainer
    if (xelement.nodeName == "SPAN") {
      //console.log("span",xelement)
      if (xelement.textContent == xstartelement.textContent) {
        //console.log("gleich",xelement)
        if (xcmd == "fontsel" && xelement.dataset.id == xcmd) {
          xelement.setAttribute('style', 'font-family: ' + e.target.value)
          xonoff = 'off'
        }
        if (xcmd == "fontset" && xelement.dataset.id == xcmd) {
          xsize = e.target.value + "%"
          xelement.setAttribute('style', 'font-size: ' + xsize)
          xonoff = 'off'
        }
        if (xcmd == "bold" || xcmd == "unbold" || xcmd == "superscript" || xcmd == "subscript") {
          if (xelement.dataset.id == xcmd) {
            xonoff = 'off'

            // move all children out of the element
            while (xelement.firstChild) parent.insertBefore(xelement.firstChild, xelement)
            // remove the empty element
            parent.removeChild(xelement)
            //console.log("gleichremove",xcmd)
          }
        }


      }
    }
    if (xonoff == "on") {
      if (xelement.classList.contains("FClabel") || xelement.classList.contains("FCvalue") || xelement.classList.contains("FCblock")) { xelement = null }
      else {
        while (xelement) {
          //console.log("step1",xelement)
          xelement = xelement.parentElement || null
          if (xelement) {
            if (xelement.classList.contains("FCvalue") || xelement.classList.contains("FClabel")) { xelement = null }
            else {

              if (xelement.textContent == xstartelement.textContent) {
                //console.log("gleich",xelement)
                if (xcmd == "fontsel" && xelement.dataset.id == xcmd) {
                  xelement.setAttribute('style', 'font-family: ' + e.target.value)
                  xonoff = 'off'
                }
                if (xcmd == "fontset" && xelement.dataset.id == xcmd) {
                  xsize = e.target.value + "%"
                  xelement.setAttribute('style', 'font-size: ' + xsize)
                  xonoff = 'off'
                }
                if (xcmd == "bold" || xcmd == "unbold" || xcmd == "superscript" || xcmd == "subscript") {
                  if (xelement.dataset.id == xcmd) {
                    xonoff = 'off'
                  }
                }
              }

            }
          }
        }
      }
    }
    //})
  }
  //console.log(xonoff)
  let xdiv = activselection.div

  if (xdiv != null) {
    if (xdiv.classList.contains('FCvalue') || xdiv.classList.contains('FClabel')) {

    }
    if (xdiv.classList.contains('FCblock')) {
      return
    }
  } else {
    return
  }
  if (xcmd == 'removeformat') {
    {
      xdiv.innerHTML = xdiv.innerText
      xonoff = 'off'
    }
  }
  if (xcmd == "fontsel") {

  }


  if (xcmd == "imageon") {
    xdiv.dataset["backgroundimage"] = "on"//|| "url("+dom.preimg.dataset.id+")"
    return
  }
  if (xcmd == "imageset") {
    //console.log(xdiv.dataset["backgroundimage"])
    xdiv.style["background-image"] = "url(" + dom.preimg.dataset.id + ")"
    xdiv.dataset["backgroundimage"] = "on"
    return
  }
  if (xcmd == "imagedel") {
    xdiv.style["background-image"] = ""
    xdiv.dataset["backgroundimage"] = "none"
    return
  }
  if (xcmd == "imageoff") {
    xdiv.dataset["backgroundimage"] = "none"
    return
  }

  if (xcmd != 'removeformat') {
    {
      let echilds = xselectedtext.querySelectorAll('[data-id=' + xcmd + ']')
      echilds.forEach(function (childnode, nodei) {
        if (childnode.nodeName == 'SPAN' && (xonoff == 'on')) {
          //console.log("remove")
          let parent = childnode.parentNode
          // move all children out of the element
          while (childnode.firstChild) parent.insertBefore(childnode.firstChild, childnode)
          // remove the empty element
          parent.removeChild(childnode)
          if (xcmd == 'fontsel' || xcmd == "fontset") { xonoff = 'on1' }
          else { xonoff = 'off' }

          let xxtext = activselection.range.extractContents()
          activselection.range.insertNode(xselectedtext)
          xselectedtext = activselection.range.cloneContents()
        }
      })
    }

    // console.log("change",echilds)
    // if (xcmd == 'fontsel' || xcmd=="fontset")  {xonoff="on"}
    if (xonoff == 'on' || xonoff == "on1") {
      let anc = document.createElement('SPAN')
      if (xcmd == "fontsel") {
        anc.setAttribute('style', 'font-family: ' + e.target.value)
      }
      if (xcmd == "fontset") {
        let xsize = e.target.value + "%"
        anc.setAttribute('style', 'font-size: ' + xsize)
        //anc.setAttribute('data-fontsize',  xsize)
      }
      if (xcmd == 'fontup') {
        anc.setAttribute('style', 'font-size: 105%;')
      }
      if (xcmd == 'iconon') {
        anc.setAttribute('style', 'font-family: FREMO-Icon;')
      }
      if (xcmd == 'fontdown') {
        anc.setAttribute('style', 'font-size: 95%;')
      }
      if (xcmd == 'unbold') {
        anc.setAttribute('style', 'font-weight: normal;')
      }
      if (xcmd == 'bold') {
        anc.setAttribute('style', 'font-weight: bold;')
      }
      if (xcmd == 'superscript') {
        anc.setAttribute('style', 'vertical-align: super; font-size: smaller;')
      }
      if (xcmd == 'subscript') {
        anc.setAttribute('style', 'vertical-align: sub; font-size: smaller;')
      }
      if (xcmd == 'removeformat') {
        xxtext = activselection.range.extractContents()
        activselection.range.insertNode(xselectedtext)
      } else {
        anc.dataset.id = xcmd
        anc.className = "FCspan"
        anc.appendChild(xselectedtext)
        let xxtext = activselection.range.extractContents()
        activselection.range.insertNode(anc)
      }

      // console.log("on",anc)
    }
  }


  let echilds = xdiv.querySelectorAll('span')
  echilds.forEach(function (childnode, nodei) {
    if (childnode.nodeName == 'SPAN') {
      // console.log(childnode.style,childnode.dataset.id,childnode.textContent)

      if (!(childnode.classList.contains('FCspan'))) {
        if (childnode.dataset.id) {
          childnode.className = "FCspan"
        }
        else {
          let tnode = document.createTextNode(childnode.innerHTML)
          childnode.parentNode.replaceChild(tnode, childnode);
        }
      }
    }
    if (childnode.textContent.length == 0) {
      //console.log("remove",childnode.nodeName,childnode.textContent.length)
      let xparent = childnode.parentNode
      xparent.removeChild(childnode)
    }

  })

  setbluritemid(xdiv)

}
function cleardivspan(xdiv) {
  let echilds = xdiv.querySelectorAll('span')
  echilds.forEach(function (childnode, nodei) {
    if (childnode.nodeName == 'SPAN') {
      console.log("spandelete", childnode)
      if (!(childnode.classList.contains('FCspan'))) {
        if (childnode.dataset.id) {
          childnode.className = "FCspan"
        }
        else {
          let children = childnode.childNodes;
          children.forEach(function (item) {
            if (item.nodeName == "#text") { childnode.insertAdjacentText("beforebegin", item.textContent) }
            else { childnode.insertAdjacentElement("beforebegin", item) }
          });
          let xparent = childnode.parentNode
          xparent.removeChild(childnode)
        }
      }
    }
    if (childnode.textContent.length == 0) {
      //console.log("remove",childnode.nodeName,childnode.textContent.length)
      let xparent = childnode.parentNode
      xparent.removeChild(childnode)
    }

  })
}
function setcolortarget(e) {
  colorid = e.target.dataset.id

  if (e.target.classList.contains('buttonc')) {
    let buttons = document.getElementsByClassName('buttoncon')
    if (buttons != undefined) {
      Array.from(buttons).forEach(button => {
        button.classList.remove('buttoncon')
      })
    }
    e.target.classList.add('buttoncon')
  }
}
function setbackgroundimage(e) {
  // kannweg    im tag für image eingefügt
  /*
  if (fid == 'img') {
    dom.preimg = document.getElementById('preimg')

    let userItem = e.target.closest('.FCvalue, .FClabel');
    if (userItem != null) { userItem.style["background-image"] = "url(" + dom.preimg.dataset.id + ")" }
  }
  */
  // ximg.p(arentElement.dataset.value = dom.preimg.dataset.id
}
function FConclick(e) {
  let menu = document.getElementById('FCmenu')
  menu.style.display = "none";
  menuElement = null
}
function FConcontextmenu(e) {
  let menuElement;
  let target = e.target;
  if (e.target.dataset.menu != null) {
    menuElement = e.target
  }
  else {
    menuElement = e.target.closest('[data-menu]')
  }
  if (menuElement != null) {
    e.preventDefault()
    let menu = document.getElementById('FCmenu')
    while (menu.firstChild) {
      menu.removeChild(menu.firstChild)
    }

    for (const [xoptionkey, xoption] of Object.entries(menuoptions)) {

      if (menuElement.dataset.menu.includes(xoptionkey + ",")) {
        let Item = document.createElement("div")
        Item.className = "FCoption"
        Item.innerHTML = xoption.label
        if (typeof window[xoption.function] == "function") {
          Item.addEventListener("click", function (e) {
            window[xoption.function](xoption, target, e)
          });
        }
        menu.appendChild(Item)
      }
    }
    menu.style.display = "block";

    let rX = 0
    let rY = 0
    if (document.documentElement && document.documentElement.scrollTop) {
      rX = document.documentElement.scrollLeft;
      rY = document.documentElement.scrollTop;
    }
    else if (document.body) {
      rX = document.body.scrollLeft;
      rY = document.body.scrollTop;
    }

    menu.style.left = `${e.clientX + rX}px`;
    menu.style.top = `${e.clientY + rY}px`;

  }
}
function openpopup()
{
  console.log("openpopupwindow")
  window.open("chrome:")
  //window.open("chrome://settings/content/popups")
}
function dialogButton(e) {
  let dlg = e.target.closest("dialog")
  if (typeof window[xdlg.function] == "function") {
    window[xdlg.function](dlg)
  }
  dlg.close(e.target.dataset.id);
}
function onprint(event) {
  console.log(event)
}
function FCdblclick(e) {

  if (e.target.dataset.dropid != null) {
    let xpage = e.target.closest('.FCpage')
    let domcolumn = e.target.closest('.FCcolumn')
    let domframe = e.target.closest('.FCframe')
    let xrow = e.target.closest('.FCrow')
    let objframe = objcard["columns"][domcolumn.dataset.id]["frames"][domframe.dataset.id]

    xpage.querySelectorAll('[data-selectid=' + e.target.dataset.dropid + '].FCtab')
      .forEach(function (selframe, fkey) {
        objframe = objcard["columns"][domcolumn.dataset.id]["frames"][selframe.dataset.id]
        while (selframe.firstChild) {
          selframe.removeChild(selframe.firstChild)
        }
        if (domframe.dataset.selarray != null) {
          let xrowix = xrow.dataset.id.split("_")
          let selarray = objstore[domframe.dataset.store][xrowix[2]][domframe.dataset.selarray]
          updatedomfromstore(objframe, selframe, selarray, e.target.innerText)
        }
        else { updatedomfromstore(objframe, selframe, e.target.innerText) }
      })
  }
}
function copytoclipboard(element) {
  // nicht notwendig
  console.log(element)
  let xrow = element.closest('.FCrow')
  console.log(xrow.innerHTML)
  const type = "text/html";
  const blob = new Blob([xrow.innerHTML], { type });
  const data = [new ClipboardItem({ [type]: blob })];

  navigator.clipboard.write(data).then(function () {
    xrow.style.opacity = '0.4';

    setTimeout(function () {
      xrow.style.opacity = '1';
    }, 80)

  }, function () {
    console.log("fallback")
    // Fallback in case the copy did not work
  });
}
