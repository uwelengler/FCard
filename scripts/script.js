"use strict";
// Globale Variablen
// var createFcard;
// var xitem;


var xlocale;
var xwinsize ;
var xobj = [];
var objcard;
var objstore;
var xtabobj = [];
var selobjid;
var filehandle;
var masterconfig;

var recentDir;
var colorid;


var tabconvert = [];  // tabelle für konvertieren
var tabinsert = [];   // Tabelle alle Wertebei insert csv
var tabfcard = []; // alle Werte in einer Tabelle
var filetool = new FCfiletool();
var dompicitem;
var bluritemid = "";
var bluritemval;
var bluritemdiv;
var bluritemclass = "FCcard";
var activselection = {  range: null, text: null, div : null}
var xcopytext;
//cv storage für globale Variablen
var cv = {desttabid:0, tabid: 0, change: [], buttons : [], level : 0}
var copyobjelement;
var copyobj;
var copyobjid;
var editbox_obj;
var editboxblock;
var editboxframe;
// dom alle allgemeine dom elemente
var dom = {messages: null, status: null, preimg: null}

var xoldvalue; //p....
// storage für layout
var layout = {id: "", obj: null}
var xframefile;
var xframeindex;
var xfileline;
var xcatfile;
var XLIOAnswer;
var XLIOcallback;
var xmestab = [];
var xmestabi ;
var xstptasten = [3];
var path1;
var menuElement = null;
var timelock = true;
var myWindows = [];
const savechannel = new BroadcastChannel('save_data');

savechannel.addEventListener ('message', (event) => {
  console.log(event.data);
  updatestorefromidb(event.data)
  //updatedomfromidb(event.data)
 }); 
 const openwindowchannel = new BroadcastChannel('open_window');
openwindowchannel.addEventListener('message', (event) => {
  if (storeparm.dialogname == "trainmain") {
    console.log(event.data);
    let fid = event.data.fid
    if (myWindows[fid] != null && myWindows[fid] != undefined) {
      console.log(myWindows[fid])
      if (myWindows[fid].closed == true) {
        console.log("closed")
      }
      else {
        console.log("open")
        //myWindows[fid].blur()
        //myWindows[fid].window.focus()
        return
      }
    }
    console.log("openwin=", fid, event.data.xwin)
    myWindows[fid] = window.open(event.data.xwin, "Train" + fid, event.data.xwinparm)
    if ( myWindows[fid] == null || myWindows[fid] == undefined) {
      console.log("openerror")
      xdlg["xoption"] = "openpopup"
      xdlg["event"] = null
      xdlg["targetdom"] = null
      xdlg["function"] = "openpopup"
      let dlg = document.getElementById("FCdialog")
      let dlgmessage = dlg.querySelector("#dlgmessage")
      let dlgtitle = dlg.querySelector("#dlgtitle")
      dlgtitle.innerText = "open popup"
      dlgmessage.innerText = "Bitte popups erlauben"
      dlg.showModal();
      //window.open("chrome://settings/content/popups")
      //chrome://settings/content/popups
    } 
  }
  console.log(storeparm,event.data.fid)
  let xfid= "Ftrain"+storeparm.trainid
  if (xfid == event.data.fid)
  {
    console.log("setfocus")
    window.blur()
    window.focus()
  }
  //updatestorefromidb(event.data)
  //updatedomfromidb(event.data)
}); 
 const focuschannel = new BroadcastChannel('focus_data');
 focuschannel.addEventListener ('message', (event) => {
  console.log(event.data);
  //updatedomfromidb(event.data)
 });

window.addEventListener("storage", (evt) => {
  // When local storage changes, dump the list to
  // the console.
  console.log(evt);
  console.log(window.localStorage.getItem('save'));
});
// Verknüpfung event mit funktion
document.addEventListener("xlioln", (evt) => {
  xlioln(evt.detail)
});
/**
 * 
 */
function clearmainpage() {
  // löscht alle Karten von der mainpage
  var mainpage = document.getElementById('mainpage');
  while (mainpage.firstChild) {
    mainpage.removeChild(mainpage.firstChild)
  }
}
function clearprintpage() {
  const elements = document.querySelectorAll(".FCprintpage");
  elements.forEach(function (element) {
    element.remove();
  });
}


function createDcard() {
  var mainpage = document.getElementById('domlist')
  var domlist = document.getElementById('FCdomlist')
  if (mainpage == null){return}
  if (!domlist) {
    domlist = document.createElement('div')
    domlist.className = 'FCdomlist flex-container'
    domlist.id = "FCdomlist"
    domlist.style["width"] = "100%";
    domlist.style["border-style"] = "solid solid solid solid"
    mainpage.appendChild(domlist)
  }
}

function createFcard() {
  bluritemid = "" // letzte id löschen
  var mainpage = document.getElementById('mainpage')
  var FredCard = document.createElement('div')
  var xbutton = document.getElementById('buttoncard')
  if (xbutton != null)
 { xbutton.style['display'] = ''}
  FredCard.className = 'FredCard'
  FredCard.id = 'FC0'
  mainpage.appendChild(FredCard)
}

function createFcardButtons() {
  
  if (objcard.buttons) {

    cv.buttons = objcard.buttons

  }
  else {
    cv.buttons = []
  }
  
  setgroupsel()
  setbuttons(cv.buttons)
}

/**
 *  
 * @param {*} ucard 
 */
function updatedom(ucard) {
  let domfcard = document.getElementById('FC0')
  for (const [ckey, cvalue] of Object.entries(ucard.columns)) {
    let xcolumn = ucard.columns[ckey]
    for (const [fkey, value] of Object.entries(xcolumn.frames)) {
      let frame = xcolumn.frames[fkey]
      for (const [key, value] of Object.entries(frame.blocks)) {
        let block = frame.blocks[key]
        for (const [ikey, ivalue] of Object.entries(block.items)) {

          domfcard.querySelectorAll('[data-syncid=' + ikey + '].FCvalue ')
            .forEach(div => updateitem(div, ivalue))
        }
      }
    }
  }
}
/**
 * 
 * @param {*} div 
 * @param {*} ivalue 
 */
function updateitem(div, ivalue) {
  div.innerHTML = ivalue.value
  if (ivalue['style']['background-image']) {
    div.style.backgroundImage = ivalue['style']['background-image']
  }
}

function objtodom() {
  var fcard = objcard
  console.log("startobjtodom")
  var domfcard = document.getElementById('FC0')
  for (const [key, value] of Object.entries(fcard)) {
    if (value.constructor == String) {

      domfcard[key] = fcard[key];
    }
    if (value.constructor == Object) {
    }
  }
  if (fcard.buttons) {
    /* convert buttons to checkboxess */
    for (const [bkey, bvalue] of Object.entries(fcard.buttons)) {
      if (fcard.checkboxes == null) { fcard.checkboxes = {} }
      if (tabcheckboxes[bvalue] != null) { fcard.checkboxes[bvalue] = tabcheckboxes[bvalue]; fcard.buttons.splice(fcard.buttons.indexOf(bvalue), 1) }
    }
  }
  if (fcard.style) {
    for (const [key, value] of Object.entries(fcard.style)) {
      domfcard.style[key] = value;
    }
  }
  if (fcard.pages) {
    for (const [pkey, value] of Object.entries(fcard.pages)) {
      let fpage = fcard.pages[pkey]
      createdomelement(domfcard, fpage, pkey, false, "FCpage")
    }
  }
  createcheckboxes()
  
  
  for (const [ckey, cvalue] of Object.entries(fcard.columns)) {
    let xcolumn = fcard.columns[ckey]
    var dompage = domfcard.querySelector('[data-id=' + xcolumn.page + '].FCpage')
    
    createdomelement(dompage, xcolumn, ckey, false, "FCcolumn")
    var domcolumn = domfcard.querySelector('[data-id=' + ckey + '].FCcolumn')
    
    for (const [fkey, value] of Object.entries(xcolumn.frames)) {
      let frame = xcolumn.frames[fkey]
      createdomelement(domcolumn, frame, fkey, false, "FCframe")
      
      let domframe = domcolumn.querySelector('[data-id=' + fkey + '].FCframe')
      let framestore = null
      if (frame.dataset.store != null)
      {
        if (objstore != null)
        {
          framestore = objstore[frame.dataset.store]
        }
      }
      
      if (framestore != null)
      {
        loaddomfromstore(framestore, domframe)
      }
      else
      {
        for (const [key, value] of Object.entries(frame.blocks)) {
          createdomelement(domframe, frame.blocks[key], key, false, "FCblock")
          
          let block = frame.blocks[key]
          
          let domblock = domframe.querySelector('[data-id=' + key + '].FCblock')
          // ARRAY
          for (const [ikey, ivalue] of Object.entries(block.items)) {
            let xikey = ikey.replace('_', '')
            
            createdomelement(domblock, block.items[ikey], ikey, true, "")
          }
        }
      }
    }
    
  }
  let xdomframefile = document.querySelector('[data-id="framefile"]')
  if (xdomframefile != null) {
    let xdomframeheader = document.querySelector('[data-id="frameheader"]')
    xdomframeheader.style.width = xdomframefile.clientWidth
  }
}

function objtoprint() {
  let domfcard = document.body
  let fcard = objcard
  let xpage;

  // if (fid == "loadjson") {

  if (fcard.pages) {
    for (const [pkey, value] of Object.entries(fcard.pages)) {
      xpage = fcard.pages[pkey]
      createdomelement(domfcard, xpage, pkey, false, "FCprintpage")
    }

  }
  // }
  //pages einfügen !!
  for (const [ckey, cvalue] of Object.entries(fcard.columns)) {
    let xcolumn = fcard.columns[ckey]

    let dompage = domfcard.querySelector('[data-id=' + xcolumn.page + '].FCprintpage')

    // pages dompage ermitteln
    createdomelement(dompage, xcolumn, ckey, false, "FCcolumn")
    console.log(dompage.offsetHeight)
    let domcolumn = domfcard.querySelector('[data-id=' + ckey + '].FCcolumn')
    for (const [fkey, value] of Object.entries(xcolumn.frames)) {
      let frame = xcolumn.frames[fkey]
      createdomelement(domcolumn, frame, fkey, false, "FCframe")

      let domframe = domcolumn.querySelector('[data-id=' + fkey + '].FCframe')
      for (const [key, value] of Object.entries(frame.blocks)) {
        createdomelement(domframe, frame.blocks[key], key, false, "FCblock")
        let block = frame.blocks[key]
        let domblock = domframe.querySelector('[data-id=' + key + '].FCblock')
        for (const [ikey, ivalue] of Object.entries(block.items)) {
          let xikey = ikey.replace('_', '')
          createdomelement(domblock, block.items[ikey], ikey, true, "")
        }
      }
      console.log(domframe.offsetHeight)
      console.log(dompage.offsetHeight)
    }
  }

}
async function trainbookprint() {
  let fcard=objcard
  let domfcard = document.body
  document.body.innerHTML = "";
  //let FCbody = document.getElementById('FCbody');
  //FCbody.remove()
  let xpage;
  let dompage = document.createElement("div")
  let pagenumber=1
  let pageheight=0
  let trainids = []
  if (storeparm.trainids != null)
  {
    trainids = storeparm.trainids
  }
  else
  {
    trainids = Array(storeparm.trainid)
  }
  let header = document.createElement("div")
  let footer = document.createElement("div")
  header.className="FCcenter"
  header.innerText=storeparm.tbheader
  header.style.height="30px"
  domfcard.appendChild(header)
  dompage.className="TBprintpage"
  dompage.dataset.id = "page" + pagenumber
  dompage.dataset.display = "on"
  dompage.dataset.visibility = "visible"
  domfcard.appendChild(dompage)
  footer.innerText="Created by Ulen, Uetersburg, Seitennummer " + pagenumber
  footer.style.height="30px"
  domfcard.appendChild(footer)
  pageheight=header.offsetHeight+30
  
  
  let domcolumn = null
  trainids.forEach(function(trainid, xkey)
  {
  for (const [ckey, cvalue] of Object.entries(fcard.columns)) 
  {
    let xcolumn = fcard.columns[ckey]

    createdomelement(dompage, xcolumn, trainid, false, "FCcolumn")
    domcolumn = dompage.querySelector('[data-id=' + trainid + '].FCcolumn')
    
    // pages dompage ermitteln
    for (const [fkey, value] of Object.entries(xcolumn.frames)) {
      let frame = xcolumn.frames[fkey]
      let cfkey = ckey + fkey
      createdomelement(domcolumn, frame, cfkey, false, "FCframe")
      let domframe = domcolumn.querySelector('[data-id=' + cfkey + '].FCframe')
      for (const [key, value] of Object.entries(frame.blocks)) {
        createdomelement(domframe, frame.blocks[key], key, false, "FCblock")
        let block = frame.blocks[key]
        let domblock = domframe.querySelector('[data-id=' + key + '].FCblock')
        /*for (const [ikey, ivalue] of Object.entries(block.items)) {
          let xikey = ikey.replace('_', '')
          createdomelement(domblock, block.items[ikey], ikey, true, "")
        }*/
      }
      updatedomfromstore(frame, domframe, trainid)
      

      if ((pageheight + domcolumn.offsetHeight) > 1000) {
        console.log(domcolumn.offsetHeight)
        if (domcolumn.offsetHeight > 900)
        {
          createdomelement(dompage, xcolumn, "a"+trainid, false, "FCcolumn")
          domcolumn = dompage.querySelector('[data-id=a' + trainid + '].FCcolumn')
        }
        dompage = document.createElement("div")
        pagenumber = pagenumber + 1
        header = document.createElement("div")
        header.className = "TBnewpage"
        //domfcard.appendChild(header)
        header = document.createElement("div")
        header.className = "FCcenter"
        header.innerText=storeparm.tbheader
        header.style.height = "30px"
        domfcard.appendChild(header)
        dompage.className = "TBprintpage"
        dompage.dataset.id = "page" + pagenumber
        dompage.dataset.display = "on"
        dompage.dataset.visibility = "visible"
        domfcard.appendChild(dompage)
        dompage.appendChild(domcolumn)
        console.log(domcolumn)
        //createdomelement(dompage, xcolumn, trainid, false, "FCcolumn")
        //domcolumn = dompage.querySelector('[data-id=' + trainid + '].FCcolumn')
        footer = document.createElement("div")
        footer.innerText = "Created by Ulen, Uetersburg, Seitennummer " + pagenumber
        footer.style.height = "30px"
        domfcard.appendChild(footer)
        pageheight = header.offsetHeight + 30 
        domcolumn.appendChild(domframe)
      }
      
    }
   
    pageheight=pageheight + domcolumn.offsetHeight

  }
})
  

}
/**
 * 
 * @param {*} fcard 
 * @param {*} fcardold 
 */
function updateobj(fcard, fcardold) {
  for (const [ckey, column] of Object.entries(fcard.columns)) {
    for (const [fkey, frame] of Object.entries(column.frames)) {
      for (const [bkey, block] of Object.entries(frame.blocks)) {
        let xcolumn = fcardold.columns[ckey]
        if (xcolumn != null) {
          let xframe = xcolumn.frames[fkey]
          if (xframe != null) {
            let xblock = xframe.blocks[bkey]
            if (xblock != null) {
              if (xblock.dataset.display != null) { block.dataset.display = xblock.dataset.display }
              if (xblock.dataset.visibility != null) { block.dataset.visibility = xblock.dataset.visibility }              
              
              for (const [ikey, item] of Object.entries(block.items)) {
                let xitem = null
                xitem = xblock.items[ikey]
                if (xitem != null) {
                  item.value = xitem.value;
                  if (xitem.dataset.display != null) { item.dataset.display = xitem.dataset.display }
                  if (xitem.dataset.visibility != null) { item.dataset.visibility = xitem.dataset.visibility }
                }
                else {
                  for (const [xxfkey, xxframe] of Object.entries(xcolumn.frames)) {
                    for (const [xxbkey, xxblock] of Object.entries(xxframe.blocks)) {
                      for (const [xxikey, xxitem] of Object.entries(xxblock.items)) {
                        if (xxikey == ikey) {
                          //console.log(xxikey,xxitem.value)
                          item.value = xxitem.value;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
/**
 * 
 */
function createcheckboxes() {
  let xbuttoncardadd = document.getElementById("checkboxes")
  if (xbuttoncardadd == null ) {return}
  while (xbuttoncardadd.firstChild) {
    xbuttoncardadd.removeChild(xbuttoncardadd.firstChild)
  }
  let xcheckboxes = objcard['checkboxes']
  if (xcheckboxes) {
    for (const [pkey, xcheckbox] of Object.entries(xcheckboxes)) {
     
      let Item = document.createElement("div")
      Item.dataset["id"] = xcheckbox.dataset.id
      xbuttoncardadd.appendChild(Item)
      let Itembox = document.createElement("INPUT")
      Itembox.type = 'checkbox';
      Itembox.checked = xcheckbox.checked || false;
      for (const [dkey, dvalue] of Object.entries(xcheckbox.dataset)) {
        Itembox.dataset[dkey] = dvalue
      }
      Itembox.setAttribute("onchange", "onchangecheckbox(event)");
      Item.appendChild(Itembox)
      let Itemlabel = document.createElement("LABEL")
      if (xcheckbox.label) {
        Itemlabel.innerText = " " + xcheckbox.label[xlocale]
        if (Itemlabel.innerText == " undefined") { Itemlabel.innerText = " " + xcheckbox.label['en'] }
      }
      else { Itemlabel.innerText = " " + xcheckbox.value }
      Itemlabel.dataset["id"] = xcheckbox.dataset.id
      Itemlabel.for = xcheckbox.dataset.id
      Item.appendChild(Itemlabel)
    }
  }
}
/**
 * 
 * @param {*} xcard 
 * @param {*} xlist 
 * @param {*} xframe 
 * @param {*} pblock 
 * @param {*} xelement 
 */
function listtodom(xcard, xlist, xframe, pblock, xelement) {
  let domlist = document.getElementById("FCdomlist")
  if (domlist == null){return}
  let xclass = document.getElementById("Selectobj").value
  let selobjdetail = document.getElementById("Selobjdetail")
  let Itembutton = document.getElementById("insertobj")
  let Item = null
  let Itembox = null
  let xselid = ""
  let children = null
  Itembutton.dataset.itemid = xelement.dataset.id
  //console.log(Itembutton.dataset.itemid)
  let pblock_id=pblock.dataset.id
  if (pblock.classList.contains("FCrow"))
  {pblock_id="row0"}
  
  Itembutton.dataset.blockid = pblock_id
  Itembutton.dataset.columid = xlist.dataset.id
  Itembutton.dataset.frameid = xframe.dataset.id
  while (domlist.firstChild) {
    domlist.removeChild(domlist.firstChild)
  }
  if (xclass == "FCrowitem") { children = pblock.getElementsByClassName(xclass); xselid = xelement.dataset.id }
  if (xclass == "FCstp") { children = pblock.getElementsByClassName(xclass); xselid = xelement.dataset.id }
  if (xclass == "FCvalue") { children = pblock.getElementsByClassName(xclass); xselid = xelement.dataset.id }
  if (xclass == "FClabel") { children = pblock.getElementsByClassName(xclass); xselid = xelement.dataset.id }
  if (xclass == "FCblock") { children = xframe.getElementsByClassName(xclass); xselid = pblock.dataset.id }
  if (xclass == "FCframe") { children = xlist.getElementsByClassName(xclass); xselid = xframe.dataset.id }
  if (xclass == "FCcolumn") { children = xcard.getElementsByClassName(xclass); xselid = xlist.dataset.id }
  if (xclass == "FCcard") { children = xcard.getElementsByClassName(xclass); xselid = xcard.dataset.id }
  if (xclass == "FCpage") { children = xcard.getElementsByClassName(xclass); xselid = xlist.dataset.id }
  if (xclass == "FCcheckbox") { children = xcard.getElementsByClassName(xclass); xselid = xlist.dataset.id }
  let plobj = getobj(xclass, xlist, xframe, pblock)
  
  
  if (xclass == "xFCcard") {
    Item = document.createElement("div")
    Item.dataset.id = "fcard"
    Item.style["width"] = "10%";
    domlist.appendChild(Item)
    Itembutton = document.createElement("BUTTON")
    Itembutton.dataset.itemid = "fcard"
    Itembutton.dataset.blockid = pblock_id
    Itembutton.dataset.columid = xlist.dataset.id
    Itembutton.dataset.frameid = xframe.dataset.id
    Itembutton.innerHTML = "select";
    Itembutton.onclick = function (e) {
      editobj(e.target, "select")
    }
    Item.appendChild(Itembutton)
  }
  else {
    Item = document.createElement("div")
    Item.style["width"] = "45%";
    domlist.appendChild(Item)
    Item = document.createElement("div")
    Item.style["width"] = "5%";
    domlist.appendChild(Item)
    Itembox = document.createElement("INPUT")
    Itembox.style["width"] = "100%";
    Itembox.type = 'checkbox';
    Itembox.checked = false;
    Itembox.onclick = function (e) {
      editboxsetselect(e.target)
    }
    Item.appendChild(Itembox)
    Item = document.createElement("div")
    Item.style["width"] = "50%";
    domlist.appendChild(Item)
    for (const child in plobj) {
      //console.log(child)
      Item = document.createElement("div")
      Item.innerHTML = child //children[child].dataset.id
      Item.style["width"] = "45%";
      let xon = "off"
      if (plobj[child].dataset) { xon = plobj[child].dataset.display || "on" }
      if (xon == "on") {
        Item.style["background-color"] = "rgb(199, 199, 199)";
      }
      if (child == xselid) {
        Item.style["background-color"] = "rgb(170, 170, 170)";
      }

      domlist.appendChild(Item)

      Item = document.createElement("div")
      Item.dataset.id = child //children[child].dataset.id
      Item.style["width"] = "5%";
      Item.style["height"] = "5mm";
      domlist.appendChild(Item)
      Item.style["background-color"] = "rgb(199, 199, 199)";
      
      Itembox = document.createElement("INPUT")
      Itembox.style["width"] = "100%";
      Itembox.type = 'checkbox';
      Itembox.checked = false;
      Itembox.dataset.itemid = child
      Itembox.dataset.blockid = pblock_id
      Itembox.dataset.columid = xlist.dataset.id
      Itembox.dataset.frameid = xframe.dataset.id
      //Itembox.setAttribute("onchange", "onchangecheckbox(event)");
      Item.appendChild(Itembox)
      
      Item = document.createElement("div")
      Item.dataset.id = child //children[child].dataset.id
      Item.style["width"] = "5%";
      Item.style["height"] = "5mm";
      domlist.appendChild(Item)
      Itembutton = document.createElement("BUTTON")
      Itembutton.style["background-color"] = "rgb(199, 199, 199)";
      Itembutton.dataset.itemid = child //children[child].dataset.id
      Itembutton.dataset.blockid = pblock_id
      Itembutton.dataset.columid = xlist.dataset.id
      Itembutton.dataset.frameid = xframe.dataset.id
      Itembutton.innerHTML = "<";
      Itembutton.onclick = function (e) {
        moveobj(e.target, "up")
      }
      //Item.style["width"] = "15%";
      Item.appendChild(Itembutton)

      Item = document.createElement("div")
      Item.dataset.id = child // children[child].dataset.id
      Item.style["width"] = "5%";
      Item.style["height"] = "5mm";
      domlist.appendChild(Item)
      Itembutton = document.createElement("BUTTON")
      Itembutton.style["background-color"] = "rgb(199, 199, 199)";
      Itembutton.dataset.itemid = child //children[child].dataset.id
      Itembutton.dataset.blockid = pblock_id
      Itembutton.dataset.columid = xlist.dataset.id
      Itembutton.dataset.frameid = xframe.dataset.id
      Itembutton.innerHTML = ">";
      Itembutton.onclick = function (e) {
        moveobj(e.target, "down")
      }
      Item.appendChild(Itembutton)

      Item = document.createElement("div")
      Item.dataset.id = child // children[child].dataset.id
      Item.style["width"] = "10%";
      Item.style["height"] = "5mm";

      domlist.appendChild(Item)
      Itembutton = document.createElement("BUTTON")
      Itembutton.style["background-color"] = "rgb(199, 199, 199)";
      Itembutton.dataset.itemid = child // children[child].dataset.id
      Itembutton.dataset.blockid = pblock_id
      Itembutton.dataset.columid = xlist.dataset.id
      Itembutton.dataset.frameid = xframe.dataset.id
      Itembutton.innerHTML = "select";
      Itembutton.onclick = function (e) {
        editobj(e.target, "select")
      }
      Item.appendChild(Itembutton)



      Item = document.createElement("div")
      Item.dataset.id = child // children[child].dataset.id
      Item.style["width"] = "10%";
      Item.style["height"] = "5mm";
      domlist.appendChild(Item)
      Itembutton = document.createElement("BUTTON")
      Itembutton.style["background-color"] = "rgb(199, 199, 199)";
      Itembutton.dataset.itemid = child // children[child].dataset.id
      Itembutton.dataset.blockid = pblock_id
      Itembutton.dataset.columid = xlist.dataset.id
      Itembutton.dataset.frameid = xframe.dataset.id
      Itembutton.innerHTML = "copy";
      Itembutton.onclick = function (e) {
        moveobj(e.target, "copy")
      }
      Item.appendChild(Itembutton)
      Item = document.createElement("div")
      Item.dataset.id = child // children[child].dataset.id
      Item.style["width"] = "10%";
      Item.style["height"] = "5mm";
      domlist.appendChild(Item)
      Itembutton = document.createElement("BUTTON")
      Itembutton.style["background-color"] = "rgb(199, 199, 199)";
      Itembutton.dataset.itemid = child // children[child].dataset.id
      Itembutton.dataset.blockid = pblock_id
      Itembutton.dataset.columid = xlist.dataset.id
      Itembutton.dataset.frameid = xframe.dataset.id
      Itembutton.innerHTML = "del";
      Itembutton.onclick = function (e) {
        moveobj(e.target, "del")
      }
      Item.appendChild(Itembutton)
      // if (children[child].dataset.id == xselid)
      if (child == xselid) {
        editobj(Itembutton, "select")
      }


    }
  }

}
/**
 * 
 * @param {*} e_target 
 * @param {*} dir 
 * @returns 
 */
function editboxsetselect(e_target)
{
  domlist = document.getElementById("FCdomlist")
  domlist.querySelectorAll('[type=checkbox]')
  .forEach(function (xcheckbox) {
    xcheckbox.checked = e_target.checked})

}

function moveobj(e_target, dir) {
  //xcolumn=document.querySelector('[data-id='+e.target.dataset.columid+']')
  //xblock=xcolumn.querySelector('[data-id='+e.target.dataset.itemid+']')
  let domcopyobjid = document.getElementById("copyobjid")
  let dominsertobj = document.getElementById("insertobj")
  //console.log(insertobj.dataset)
  let fcarddom = document.getElementById("FC0")
  let xclass = document.getElementById("Selectobj").value

  let xcolumn = fcarddom.querySelector('[data-id=' + e_target.dataset.columid + '].FCcolumn')

  let xframe = xcolumn.querySelector('[data-id=' + e_target.dataset.frameid + '].FCframe')

  let xblock = xframe.querySelector('[data-id=' + e_target.dataset.blockid + '].FCblock')

  //let domobj = xblock.querySelector('[data-id=' + e_target.dataset.itemid + '].' + xclass)
  /*if (xclass=="FCvalue")  {lobj=objcard['columns'][e_target.dataset.columid]['frames'][e_target.dataset.frameid]['blocks'][e_target.dataset.blockid]['items'][e_target.dataset.itemid]}
  if (xclass=="FClabel")  {lobj=objcard['columns'][e_target.dataset.columid]['frames'][e_target.dataset.frameid]['blocks'][e_target.dataset.blockid]['items'][e_target.dataset.itemid]}
  if (xclass=="FCblock")  {lobj=objcard['columns'][e_target.dataset.columid]['frames'][e_target.dataset.frameid]['blocks'][e_target.dataset.itemid]}
  if (xclass=="FCframe")  {lobj=objcard['columns'][e_target.dataset.columid]['frames'][e_target.dataset.itemid]}
  if (xclass=="FCcolumn")  {lobj=objcard['columns'][e_target.dataset.itemid]}
  if (xclass=="FCpage")  {lobj=objcard['pages'][e_target.dataset.itemid]}
  //if (xclass=="FCcheckbox")  {lobj=objcard['checkboxes'][e_target.dataset.itemid]}
  */
  let xlobj;
  if (xclass == "FCcard") { xlobj = objcard }
  if (xclass == "FCrowitem") { xlobj = objcard['columns'][e_target.dataset.columid]['frames'][e_target.dataset.frameid]['blocks'][e_target.dataset.blockid]['items'] }
  if (xclass == "FCstp") { xlobj = objcard['columns'][e_target.dataset.columid]['frames'][e_target.dataset.frameid]['blocks'][e_target.dataset.blockid]['items'] }
  if (xclass == "FCvalue") { xlobj = objcard['columns'][e_target.dataset.columid]['frames'][e_target.dataset.frameid]['blocks'][e_target.dataset.blockid]['items'] }
  if (xclass == "FClabel") { xlobj = objcard['columns'][e_target.dataset.columid]['frames'][e_target.dataset.frameid]['blocks'][e_target.dataset.blockid]['items'] }
  if (xclass == "FCblock") { xlobj = objcard['columns'][e_target.dataset.columid]['frames'][e_target.dataset.frameid]['blocks'] }
  if (xclass == "FCframe") { xlobj = objcard['columns'][e_target.dataset.columid]['frames'] }
  if (xclass == "FCcolumn") { xlobj = objcard['columns'] }
  if (xclass == "FCpage") { xlobj = objcard['pages'] }
  if (xclass == "FCcheckbox") {
    xlobj = objcard['checkboxes']
    if (xlobj == null) {
      objcard['checkboxes'] = {}
      xlobj = objcard['checkboxes']
    }
  }
  let nobjs;
  let lkeys = Object.keys(xlobj)
  let xnextid;
  let selobj = xlobj[e_target.dataset.itemid]

  let nextIndex = lkeys.indexOf(e_target.dataset.itemid);
  if (dir == "copy") {
    copyobj = xlobj[e_target.dataset.itemid];
    //console.log(copyobj)
    dominsertobj.dataset.itemid = e_target.dataset.itemid
    //console.log(e_target.dataset.itemid, dominsertobj.dataset)
    domcopyobjid.value = e_target.dataset.itemid
    return
  }
  if (dir == "del") {

    delete xlobj[e_target.dataset.itemid];
    lkeys = Object.keys(xlobj)
    nobjs = xlobj;

  }
  if (dir == "insert") {
    nobjs = xlobj;
   
    if (copyobj.className.includes(xclass)) {
      //console.log("yes")
      nobjs = {}
      for (const [key, value] of Object.entries(xlobj)) {
        if (key != domcopyobjid.value) { nobjs[key] = value }
        if (key == selobjid) {
          nobjs[domcopyobjid.value] = JSON.parse(JSON.stringify(copyobj))
        }
      }
      if (Object.keys(nobjs).length == 0)
      {
       
        nobjs[domcopyobjid.value] = JSON.parse(JSON.stringify(copyobj))
      }
     
    }
    // selobj=xlobj[domcopyobjid.value]
    // lkeys=Object.keys(xlobj)
    // nobjs=xlobj;
    // nextIndex = lkeys.indexOf(selobjid) ;
    // xnextid=domcopyobjid.value
    // console.log(xclass,selobjid,nextIndex,domcopyobjid.value)
    //console.log(xlobj)
  }
  if (dir == "up" || dir == "down") {
    nobjs = {};
    if (dir == "up") {
      nextIndex = nextIndex - 1;
      xnextid = e_target.dataset.itemid

    }
    if (dir == "down") {
      nextIndex = nextIndex + 1;
      xnextid = e_target.dataset.itemid

    }
    //console.log(nextIndex,lkeys.length)
    if (nextIndex < 0 || nextIndex >= lkeys.length) {
      //console.log(nextIndex)
      return;
    }

    let nextobj = xlobj[lkeys[nextIndex]];
    //console.log(nextobj,e_target.dataset.itemid)

    for (const [key, value] of Object.entries(xlobj)) {
      //console.log(key,value)            
      if (key == xnextid) {
        nobjs[lkeys[nextIndex]] = nextobj;
      }
      else {
        if (key == lkeys[nextIndex]) {
          nobjs[xnextid] = selobj;
        }
        else { nobjs[key] = value; }
      }
    }
  }
  if (xclass == "FCrowitem") { objcard['columns'][e_target.dataset.columid]['frames'][e_target.dataset.frameid]['blocks'][e_target.dataset.blockid]['items'] = nobjs }
  if (xclass == "FCstp") { objcard['columns'][e_target.dataset.columid]['frames'][e_target.dataset.frameid]['blocks'][e_target.dataset.blockid]['items'] = nobjs }
  if (xclass == "FCvalue") { objcard['columns'][e_target.dataset.columid]['frames'][e_target.dataset.frameid]['blocks'][e_target.dataset.blockid]['items'] = nobjs }
  if (xclass == "FClabel") { objcard['columns'][e_target.dataset.columid]['frames'][e_target.dataset.frameid]['blocks'][e_target.dataset.blockid]['items'] = nobjs }
  if (xclass == "FCblock") { objcard['columns'][e_target.dataset.columid]['frames'][e_target.dataset.frameid]['blocks'] = nobjs }
  if (xclass == "FCframe") { objcard['columns'][e_target.dataset.columid]['frames'] = nobjs }
  if (xclass == "FCcolumn") { objcard['columns'] = nobjs }
  if (xclass == "FCcheckbox") { objcard['checkboxes'] = nobjs }
  if (xclass == "FCpage") { objcard['pages'] = nobjs}
  clearmainpage();
  createFcard()
  objtodom();
  createFcardButtons()
  setobj()
}
/**
 * 
 * @param {*} e_target 
 * @param {*} dir 
 */
function editobj(e_target, dir) {
  //xcolumn=document.querySelector('[data-id='+e_target.dataset.columid+']')
  //xblock=xcolumn.querySelector('[data-id='+e_target.dataset.itemid+']')

  let editbox = document.getElementById("editbox")
  let fcarddom = document.getElementById("FC0")
  let xclass = document.getElementById("Selectobj").value
  let xcolumn = fcarddom.querySelector('[data-id=' + e_target.dataset.columid + '].FCcolumn')
  let xframe = xcolumn.querySelector('[data-id=' + e_target.dataset.frameid + '].FCframe')
  let xblock = xframe.querySelector('[data-id=' + e_target.dataset.blockid + '].FCblock')
  //let domobj = xblock.querySelector('[data-id=' + e_target.dataset.itemid + '].' + xclass)
  let xlobj = objcard
  if (xclass == "FCrowitem") { xlobj = objcard['columns'][e_target.dataset.columid]['frames'][e_target.dataset.frameid]['blocks'][e_target.dataset.blockid]['items'] }
  if (xclass == "FCstp") { xlobj = objcard['columns'][e_target.dataset.columid]['frames'][e_target.dataset.frameid]['blocks'][e_target.dataset.blockid]['items'] }
  if (xclass == "FCvalue") { xlobj = objcard['columns'][e_target.dataset.columid]['frames'][e_target.dataset.frameid]['blocks'][e_target.dataset.blockid]['items'] }
  if (xclass == "FClabel") { xlobj = objcard['columns'][e_target.dataset.columid]['frames'][e_target.dataset.frameid]['blocks'][e_target.dataset.blockid]['items'] }
  if (xclass == "FCblock") { xlobj = objcard['columns'][e_target.dataset.columid]['frames'][e_target.dataset.frameid]['blocks'] }
  if (xclass == "FCframe") { xlobj = objcard['columns'][e_target.dataset.columid]['frames'] }
  if (xclass == "FCcolumn") { xlobj = objcard['columns'] }
  if (xclass == "FCpage") { xlobj = objcard['pages'] }
  if (xclass == "FCcheckbox") { xlobj = objcard['checkboxes'] }
  if (xclass == "FCcard") { xlobj = objcard }

  let lkeys = Object.keys(xlobj)

  if (dir == "select") {
    editboxframe=xcolumn.querySelector('[data-id=' + e_target.dataset.frameid + '].FCframe')
    editboxblock=xframe.querySelector('[data-id=' + e_target.dataset.blockid + '].FCblock')
    editbox_obj = xlobj[e_target.dataset.itemid]
   
    selobjid = e_target.dataset.itemid
    while (editbox.firstChild) {
      editbox.removeChild(editbox.firstChild)
    }
    let Itemdiv = document.createElement("div")
    Itemdiv.style["width"] = "100%";
    editbox.appendChild(Itemdiv)
    let Itemname = document.createElement("span")
    Itemname.innerText = "Object-Name : ";
    let Itemvalue = document.createElement("span")
    //Itemvalue.contentEditable = true;
    Itemvalue.innerText = e_target.dataset.itemid  
    Itemdiv.appendChild(Itemname)
    Itemdiv.appendChild(Itemvalue)
    if (typeof editbox_obj === 'string') {
      Itemdiv = document.createElement("div")
      Itemdiv.style["width"] = "100%";
      editbox.appendChild(Itemdiv)
      Itemname = document.createElement("span")
      Itemname.innerHTML = e_target.dataset.itemid + " : "

      Itemvalue = document.createElement("span")
      Itemvalue.className = "FCspanEdit"
      Itemvalue.contentEditable = true;
      Itemvalue.innerText = editbox_obj
      Itemvalue.dataset.ckey = e_target.dataset.itemid
      Itemvalue.dataset.dkey = ""
      Itemvalue.onblur = function (e) {
        editboxonblur(e)
      }
      Itemvalue.onfocus = function (e) {
        editboxonfocus(e)
      }
      Itemdiv.appendChild(Itemname)
      Itemdiv.appendChild(Itemvalue)
    }
    if (typeof editbox_obj === 'object') {
      for (const [ckey, cvalue] of Object.entries(editbox_obj)) {

        if (typeof cvalue === 'object')
          for (const [dkey, dvalue] of Object.entries(cvalue)) {
            if (typeof dvalue === 'string') {
              Itemdiv = document.createElement("div")
              Itemdiv.style["width"] = "100%";
              editbox.appendChild(Itemdiv)
              Itemname = document.createElement("span")
              Itemname.innerHTML = ckey + "." + dkey + " : "

              Itemvalue = document.createElement("span")
              Itemvalue.className = "FCspanEdit"
              Itemvalue.contentEditable = true;
              Itemvalue.innerText = dvalue
              Itemvalue.dataset.ckey = ckey
              Itemvalue.dataset.dkey = dkey

              Itemdiv.appendChild(Itemname)
              Itemvalue.onblur = function (e) {
                editboxonblur(e)
              }
              Itemvalue.onfocus = function (e) {
                editboxonfocus(e)
              }
              Itemdiv.appendChild(Itemvalue)
            }
          }
        if (typeof cvalue === 'string') {
          Itemdiv = document.createElement("div")
          Itemdiv.style["width"] = "100%";
          editbox.appendChild(Itemdiv)
          Itemname = document.createElement("span")
          Itemname.innerHTML = ckey + " : "

          Itemvalue = document.createElement("span")
          Itemvalue.className = "FCspanEdit"
          Itemvalue.contentEditable = true;
          Itemvalue.innerText = cvalue
          Itemvalue.dataset.ckey = ckey
          Itemvalue.dataset.dkey = ""
          Itemvalue.onblur = function (e) {
            editboxonblur(e)
          }
          Itemvalue.onfocus = function (e) {
            editboxonfocus(e)
          }
          Itemdiv.appendChild(Itemname)
          Itemdiv.appendChild(Itemvalue)
        }
      }


      Itemdiv = document.createElement("div")
      Itemdiv.style["width"] = "100%";

      editbox.appendChild(Itemdiv)

      let Itemckey = document.createElement("span")
      Itemckey.className = "FCspanEdit"
      Itemckey.contentEditable = true;
      Itemckey.id = "ckey"
      Itemckey.innerText = ""
      let Itemdkey = document.createElement("span")

      Itemdkey.id = "dkey"
      Itemdkey.className = "FCspanEdit";
      Itemdkey.contentEditable = true;
      Itemdkey.innerText = ""
      Itemvalue = document.createElement("span")
      Itemvalue.id = "value"
      Itemvalue.contentEditable = true;
      Itemvalue.className = "FCspanEdit"
      Itemvalue.innerText = ""

      Itemdiv.appendChild(Itemckey)
      let Itemdot = document.createElement("span")
      Itemdot.innerText = "."
      Itemdiv.appendChild(Itemdot)
      Itemdiv.appendChild(Itemdkey)
      Itemdot = document.createElement("span")
      Itemdot.innerText = " : "
      Itemdiv.appendChild(Itemdot)
      Itemdiv.appendChild(Itemvalue)
      Itemdot = document.createElement("span")
      Itemdot.innerText = "  "
      Itemdiv.appendChild(Itemdot)
      let Itembutton = document.createElement("BUTTON")
      Itembutton.className = "button"
      Itembutton.innerHTML = "insert";
      Itembutton.onclick = function (e) {
        editboxonclick(e, "insert")
      }
      Itembutton.style["width"] = "30%";
      Itemdiv.appendChild(Itembutton)
      Itembutton = document.createElement("BUTTON")
      Itembutton.className = "button"
      Itembutton.innerHTML = "delete";
      Itembutton.onclick = function (e) {
        editboxonclick(e, "delete")
      }
      Itembutton.style["width"] = "30%";
      Itemdiv.appendChild(Itembutton)
      Itembutton = document.createElement("BUTTON")
      Itembutton.className = "button"
      Itembutton.innerHTML = "setall";
      Itembutton.onclick = function (e) {
        editboxonclick(e, "setall")
      }
      Itembutton.style["width"] = "30%";
      Itemdiv.appendChild(Itembutton)
      Itembutton = document.createElement("BUTTON")
      Itembutton.className = "button"
      Itembutton.innerHTML = "setsel";
      Itembutton.onclick = function (e) {
        editboxonclick(e, "setsel")
      }
      Itembutton.style["width"] = "30%";
      Itemdiv.appendChild(Itembutton)
    }
  }

}
/**
 * 
 * @param {*} e 
 */
function editboxonblur(e) {
  e.target.innerText = e.target.innerText.replace(/\s+/g, ' ') /* ungültige zeichen entfernen */
  
  if (typeof editbox_obj === 'object')
  {
    if (e.target.dataset.dkey == "") { editbox_obj[e.target.dataset.ckey] = e.target.innerText }
    else { editbox_obj[e.target.dataset.ckey][e.target.dataset.dkey] = e.target.innerText }
  }
  else
  { //editbox_obj[e.target.dataset.ckey]  = e.target.innerText; 
  }
  if (editboxblock.className.includes("FCtabheader"))
  {
   
    if (e.target.dataset.ckey =="xstyle" && e.target.dataset.dkey == "xwidth")
    {
      
      Object.entries(editboxframe["blocks"]).filter(([key,value]) => value.className.includes("FCrow")).forEach(function (xrow)
      {
        
        xrow[1]["items"][selobjid][e.target.dataset.ckey][e.target.dataset.dkey] = e.target.innerText
      })
    }
  }

  clearmainpage();
  createFcard()
  objtodom();
  createFcardButtons()
  //setobj(e)
}
/**
 * 
 * @param {*} e 
 * @param {*} xcmd 
 */
function editboxonclick(e, xcmd) {
  let editbox, xeditbox_obj;
  editbox = document.getElementById("editbox")
  if (xcmd == "insert") {
    if (typeof editbox_obj === 'object')
    {
      if (editbox.querySelector('[id=dkey]').innerText == "") { editbox_obj[editbox.querySelector('[id=ckey]').innerText] = editbox.querySelector('[id=value]').innerText }
      else {
        xeditbox_obj = editbox_obj[editbox.querySelector('[id=ckey]').innerText]
        if (xeditbox_obj == null) {
          editbox_obj[editbox.querySelector('[id=ckey]').innerText] = []
          xeditbox_obj = editbox_obj[editbox.querySelector('[id=ckey]').innerText]
        }
        xeditbox_obj[editbox.querySelector('[id=dkey]').innerText] = editbox.querySelector('[id=value]').innerText
      }
    }
    else
    {
      
      editbox_obj = editbox.querySelector('[id=value]').innerText
    }
  }
  if (xcmd == "delete" && typeof editbox_obj === 'object') {
    
    if (editbox.querySelector('[id=dkey]').innerText == "") { delete editbox_obj[editbox.querySelector('[id=ckey]').innerText] }
    else {
      xeditbox_obj = editbox_obj[editbox.querySelector('[id=ckey]').innerText]
      //console.log(Array.isArray(xeditbox_obj),typeof(xeditbox_obj))
      if (Array.isArray(xeditbox_obj) == true)
      {
        //console.log(editbox.querySelector('[id=dkey]').innerText)
        xeditbox_obj.splice(editbox.querySelector('[id=dkey]').innerText, 1);
        //console.log(xeditbox_obj)
        if ( xeditbox_obj.length == 0)
        {
          delete editbox_obj[editbox.querySelector('[id=ckey]').innerText] 
        }
        //xeditbox_objn = xeditbox_obj.filter(e => e !== editbox.querySelector('[id=dkey]').innerText)
        
        //console.log(xeditbox_objn)
      }
      else
      {delete xeditbox_obj[editbox.querySelector('[id=dkey]').innerText]}
    }
  }
  if (xcmd == "setall") {
  if (editbox_obj.className.includes("FCblock"))
  {
    //console.log("setallblock")
    Object.entries(editboxframe["blocks"]).forEach(function (xblock)
      {
        
        if (editbox.querySelector('[id=dkey]').innerText == "") { 
          xblock[1][editbox.querySelector('[id=ckey]').innerText ] = editbox.querySelector('[id=value]').innerText
        }
        else {
          let xxblock =xblock[1][editbox.querySelector('[id=ckey]').innerText]
          if (xxblock == null) {
            xblock[1][editbox.querySelector('[id=ckey]').innerText] = []
            xxblock = xblock[1][editbox.querySelector('[id=ckey]').innerText]
          }
          xxblock[editbox.querySelector('[id=dkey]').innerText] = editbox.querySelector('[id=value]').innerText
        }
        
      })
    
  }
  if (editbox_obj.className.includes("FCvalue") || editbox_obj.className.includes("FCstp") || editbox_obj.className.includes("FCrowitem"))
  {
    //console.log("setallvalue")
    Object.entries(editboxframe["blocks"]).forEach(function (xblock)
      {
      let xitem = xblock[1]["items"][selobjid]
      if (xitem != null)
      {
        if (editbox.querySelector('[id=dkey]').innerText == "") { 
          xitem[editbox.querySelector('[id=ckey]').innerText ] = editbox.querySelector('[id=value]').innerText
        }
        else {
          let xxitem =xitem[editbox.querySelector('[id=ckey]').innerText]
          if (xxitem == null) {
            xitem[editbox.querySelector('[id=ckey]').innerText] = []
            xxitem = xitem[editbox.querySelector('[id=ckey]').innerText]
          }
          xxitem[editbox.querySelector('[id=dkey]').innerText] = editbox.querySelector('[id=value]').innerText
        }}
        
      
    })

    
  }
  }
  if (xcmd == "setsel") {
    if (editbox_obj.className.includes("FCblock"))
    {
    //console.log("setallblock")
    Object.entries(editboxframe["blocks"]).forEach(function (xblock)
      {
        var domlist = document.getElementById('FCdomlist')
        let xitemsel = domlist.querySelector('[data-itemid='+xblock[0]+']')
        
        if (xitemsel != null)
        {
          if (xitemsel.checked == true)
          {
            if (editbox.querySelector('[id=dkey]').innerText == "") {
              xblock[1][editbox.querySelector('[id=ckey]').innerText] = editbox.querySelector('[id=value]').innerText
            }
            else {
              let xxblock = xblock[1][editbox.querySelector('[id=ckey]').innerText]
              if (xxblock == null) {
                xblock[1][editbox.querySelector('[id=ckey]').innerText] = []
                xxblock = xblock[1][editbox.querySelector('[id=ckey]').innerText]
              }
              xxblock[editbox.querySelector('[id=dkey]').innerText] = editbox.querySelector('[id=value]').innerText
            }
          }
        }
        
      })
    
    }
    if (editbox_obj.className.includes("FCvalue") || editbox_obj.className.includes("FCstp") || editbox_obj.className.includes("FCrowitem"))
    {
      //console.log("setallvalue")
      Object.entries(editboxblock["items"]).forEach(function (x0item) 
        {
          
        var domlist = document.getElementById('FCdomlist')
        let xitemsel = domlist.querySelector('[data-itemid='+x0item[0]+']')
        let xitem=x0item[1]
        
        if (xitemsel != null)
        {
          if (xitemsel.checked == true)
          {
            if (editbox.querySelector('[id=dkey]').innerText == "") { 
              xitem[editbox.querySelector('[id=ckey]').innerText ] = editbox.querySelector('[id=value]').innerText
            }
            else {
              let xxitem =xitem[editbox.querySelector('[id=ckey]').innerText]
              if (xxitem == null) {
                xitem[editbox.querySelector('[id=ckey]').innerText] = []
                xxitem = xitem[editbox.querySelector('[id=ckey]').innerText]
              }
              xxitem[editbox.querySelector('[id=dkey]').innerText] = editbox.querySelector('[id=value]').innerText
            }
          }
        }
          
        
      })
  
      
    }
    }
  clearmainpage();
  createFcard()
  objtodom();
  createFcardButtons()

  /*if (e.target.dataset.dkey == "")
  {editbox.querySelector('[id=dkey]').contentEditable = false}
  else  {editbox.querySelector('[id=dkey]').contentEditable = true}*/
}
function editboxonfocus(e) {

  let editbox = document.getElementById("editbox")
  //console.log(e.target, editbox.querySelector('[id=value]'))
  if (typeof editbox_obj === 'object')
  {editbox.querySelector('[id=ckey]').innerText = e.target.dataset.ckey
  editbox.querySelector('[id=dkey]').innerText = e.target.dataset.dkey
  editbox.querySelector('[id=value]').innerText = e.target.innerText}
  /*if (e.target.dataset.dkey == "")
  {editbox.querySelector('[id=dkey]').contentEditable = false}
  else  {editbox.querySelector('[id=dkey]').contentEditable = true}*/
}

/**
 * 
 * @param {*} parent 
 * @param {*} xitem 
 * @param {*} xkey 
 * @param {*} Xedit 
 * @param {*} Xclass 
 */
function createdomelement(parent, xitem, xkey, Xedit, Xclass) {

  // erzeugen und einfügen div Element
  //Item = parent.querySelector('[data-id=' + xkey + ']' + Xclass)
  let xtag = xitem.tag || "div"
  let Item = document.createElement(xtag);
  if (xtag == "button") {
    
    Item.type = "button";
    Item.dataset.id = xkey;
    Item.title = xitem.title;
    /*Item.onclick = function () { filetool.DOButton(event);}; geht nicht muss addeventlistener sein */
    if (xitem.onclick == "opengraphictimetable")
    {
      Item.addEventListener('click', (e) => {
        opengraphictimetable(e);
    })
    }
    else
    { 
      Item.addEventListener('click', (e) => {
      filetool.DOButton(e);
      })
    }
    parent.appendChild(Item);
    
  }
  else { // normale dom Elemente eingentlich Hier nur div
    Item.dataset.id = xkey
    Item.dataset.display = "on"
    Item.dataset.visibility = "visible"
    Item.contentEditable = Xedit
    Item.onSelect = function (e) { onselect(e); }
    Item.setAttribute("data-syncid", xkey)  // erstmal alle sync, kann überschrieben werden
    Item.setAttribute("data-syncclass", "FCcard")  // erstmal alle in FCcard
    if (Xedit) {
      Item.onChange = function (e) {
        console.log("onchange")
        //feuert nicht für div
      }
      Item.addEventListener("onchange", function () {
        // feuert nicht für div
        console.log("onchangeevent")
        setcvchange(true, e.target.dataset.id)
      });

      Item.onkeyup = function (e) {
        keyup(e)
        //onselect(e);
      }
      Item.onmouseup = function (e) {
        itemmouse("mouseup", e);
        //onselect(e);
      }
      Item.onblur = function (e) {
        console.log("onblur")
        itemblur(e);
      }
      Item.onfocus = function (e) {
        console.log("onfocus")
        xonfocus(e);
      }
      /*Item.oncontextmenu = function (e) {
        //xedit(e); Macht keinen Sinn bei divs Nov 2023
      }*/
      /*Item.onclick = function (e) {
        //setbackgroundimage(e);
      }*/
    }
    //}

    parent.appendChild(Item)
    //parent.append(Item)



  }
  let xxvalue=xitem.value
  //console.log(xkey,parent,xitem)
  if (xitem.value != null && xitem.value !== undefined) 
  { Item.innerHTML = xitem.value; }

  if (xtag == 'img') {
    //Item.innerHTML = '<img onclick="getimage(this)" src="' + xitem.value + '" alt="" border="0" style="width:100%">'
    Item.setAttribute("onclick", "getimage(this)");
    Item.setAttribute("src", xitem.value);
    //Item["src"]=xitem.value; // geht nicht wenn svgs im dom sind !!
    Item.dataset.value = xitem.value

  }


  for (const [key, value] of Object.entries(xitem)) {

    if (Item instanceof SVGElement) {
      if (key != "items" && key != "tag") {
        Item.setAttribute(key, xitem[key])
      }
    }
    else {
      if (key == "className") { Item[key] = xitem[key]; }
      else {
        if (key != "style" && key != "dataset" && xtag != "button") { Item[key] = xitem[key]; }
      }

    }
  }
  if (Xclass != "") { Item.classList.add(Xclass) }
  if (Item.classList.contains('FClabel') && cv.level <= 1) {
    Item.contentEditable = false
  }
  if (Item.classList.contains('FCstp') && cv.level <= 1) {
    Item.contentEditable = false
  }
  if (Item.classList.contains('FCinputcolor') ) {
    Item.dataset.value = xitem.value
    Item.innerHTML = colorvaltoinput(xitem.value)
    Item.contentEditable = false
  }
  if (Item.classList.contains('FCbuttons')) {
    Item.contentEditable = false
  }
  if (xitem.style) {
    for (const [key, value] of Object.entries(xitem.style)) {

      Item.style.setProperty(key, value)
      if (key == "background-image") 
      {
        console.log(value)
      }
      if (key == "background-color")  
      { if (Item.classList.contains('FCcolorvalue'))
      {}
      else
        {
        let xhexvalue=rgbToHex(value)
        for (const [stkey, stvalue] of Object.entries(tabcolorst)) {
          if (stvalue == xhexvalue)
          { 
            
            Item.dataset['colorkey'] = stkey
            Item.style['background-color'] = tabcolor[stkey]
            
          }
        }}
      }
      //Item.style[key] = value; funktioniert nicht für alle properties 
    }
  }
  if (xitem.dataset) {
    for (const [key, value] of Object.entries(xitem.dataset)) {
      Item.dataset[key] = value;
      if (key == "colorkey")  { Item.style['background-color'] = tabcolor[value]}
    }
  }
  if (xitem.dropcontent) {
    Item.classList.add("dropdown")
    let DropItem = document.createElement("div")
    DropItem.dataset.id = xkey
    DropItem.className="dropdown-content FCnoprint"
    parent.appendChild(DropItem)
    for (const dropcontent of xitem.dropcontent){
      let Itembutton = document.createElement("BUTTON")
      Itembutton.dataset.id = xkey
      Itembutton.innerText = dropcontent
      Itembutton.onclick = function (e) {xseldrop(e)}
      DropItem.appendChild(Itembutton)
    }
  }
  if (xitem.dropid) {
    Item.classList.add("dropdown")
    //Item.dataset.selectid=xitem.dropid keine selectid bei value mehr
    let DropItem = document.createElement("div")
    DropItem.dataset.id = xkey
    //DropItem["style"]["width"]="100%"
    DropItem.className="dropdown-content FCnoprint"
    parent.appendChild(DropItem)
    Item.onfocus = function (e) {
      
      xonfocus(e);
      createdropitem(e);
    }
   
  }
}
function createdropitem(e)
{
  let xitem=e.target
  let parent = xitem.closest('.FCblock')
  let DropItem = parent.querySelector('[data-id='+xitem.dataset.id+'].dropdown-content')
  while (DropItem.firstChild) {
    DropItem.removeChild(DropItem.firstChild)
  }

  document.querySelectorAll('[data-dropid='+xitem.dropid+'].FCvalue')
  .forEach(function (dropitem) {
  let Itembutton = document.createElement("BUTTON")
  //Itembutton.classList.add("FCdropbutton")
  Itembutton.dataset.id = xitem.dataset.id
  
  Itembutton.innerHTML = dropitem.value
  Itembutton.title = dropitem.title
  Itembutton.style['font-family'] = dropitem.style['font-family']
  Itembutton.style['color'] = dropitem.style['color']
  Itembutton.style['background-color'] = dropitem.style['background-color']
  Itembutton.dataset.colorkey = dropitem.dataset.colorkey
  Itembutton.onclick = function (e) {xseldrop(e)}
  DropItem.appendChild(Itembutton)
  
  })
}

function isParseError(parsedDocument) {
  // parser and parsererrorNS could be cached on startup for efficiency
  var parser = new DOMParser(),
    errorneousParse = parser.parseFromString('<', 'text/xml'),
    parsererrorNS = errorneousParse.getElementsByTagName('parsererror')[0].namespaceURI

  if (parsererrorNS === 'http://www.w3.org/1999/xhtml') {
    // In PhantomJS the parseerror element doesn't seem to have a special namespace, so we are just guessing here :(
    return parsedDocument.getElementsByTagName('parsererror').length > 0
  }

  return parsedDocument.getElementsByTagNameNS(parsererrorNS, 'parsererror').length > 0
}
function xmltocard(xmlDoc, FCXID) {
  var x, y, i,z,z1, txt
  x = xmlDoc.documentElement
  y = xmlDoc.documentElement.childNodes
  const tjmri = tabconvert.find(element => element[0] == "jmri");
  let fcard = document.getElementById(FCXID)
  let cfcard = fcard.childNodes
  cfcard.forEach(function (dompage, pkey) {
    let cfpage = dompage.childNodes
    //pages einfügen forEcah pages
    cfpage.forEach(function (xcolumn, ckey) {

      for (let i = 0; i < y.length; i++) {
        let element = y[i]
        if (element.nodeName == 'locomotive') {
          for (let name of element.getAttributeNames()) {
            let xindex = tjmri.indexOf('locomotive.' + name)
            if (xindex >= 0) {
              let xname = tabconvert[0][xindex]
              var el = xcolumn.querySelector('[data-id=' + xname + '].FCvalue')
              if (el) {
                el.innerHTML = element.getAttribute(name);
              }
            }
          }
          for (z = 0; z < element.childNodes.length; z++) {
            if (element.childNodes[z].nodeName == 'decoder') {
              let elflabel = element.childNodes[z]
              for (let name of elflabel.getAttributeNames()) {
                let xindex = tjmri.indexOf('decoder.' + name)
                if (xindex >= 0) {
                  let xname = tabconvert[0][xindex]
                  var el = xcolumn.querySelector('[data-id=' + xname + '].FCvalue')
                  if (el) { el.innerText = element.getAttribute(name) }
                }
              }
            }
            if (element.childNodes[z].nodeName == 'functionlabels') {
              let elflabel = element.childNodes[z]
              for (z1 = 0; z1 < elflabel.childNodes.length; z1++) {
                if (elflabel.childNodes[z1].nodeName == 'functionlabel') {
                  let xnum = 'F' + elflabel.childNodes[z1].getAttribute('num')
                  var el = xcolumn.querySelector('[data-id=' + xnum + '].FCvalue')
                  if (el) { el.innerText = elflabel.childNodes[z1].childNodes[0].nodeValue; }
                }
              }
            }
          }
        }
      }
    })
  })
}
function setdataset(objitem, domitem) {
  if (objitem["dataset"] == undefined) {
    objitem["dataset"] = {}
  }
  if (domitem.dataset != null) {
    for (const [key, value] of Object.entries(domitem.dataset)) {
      if (key == "id" || key == "syncid" || key == "syncclass") { } // müssen im object gesetzt werden nicht über dom
      else { setobjitem(objitem["dataset"], key, value); }
    }

  }


}

function setstyle(objitem, domitem) {
  setobjitem(objitem["style"], 'background-color', domitem.style.backgroundColor);
  setobjitem(objitem["style"], 'border-color', domitem.style.borderColor);
  setobjitem(objitem["style"], 'color', domitem.style.color);
  setobjitem(objitem["style"], 'background-image', domitem.style.backgroundImage);
  setobjitem(objitem["style"], 'background-size', domitem.style.backgroundSize);
  setobjitem(objitem["style"], 'width', domitem.style.width);
  setobjitem(objitem["style"], 'height', domitem.style.height);
  setobjitem(objitem["style"], 'border-style', domitem.style.borderStyle);
  setobjitem(objitem["style"], 'line-height', domitem.style.lineHeight);
  setobjitem(objitem["style"], 'font-size', domitem.style.fontSize);
  setobjitem(objitem["style"], 'margin', domitem.style.margin);
}

function setobjitem(objitem, xname, domitem) {
  if (objitem == null) { objitem = {} }
  if (domitem != null) {
    objitem[xname] = domitem;
    if (objitem[xname] == "" || objitem[xname] == undefined || objitem[xname] == null) {
      delete objitem[xname]
    }
  }
}
function dosync() {
  var xdomsync;
  var xclass;
  //console.log("dosnyc", bluritemid, bluritemclass)
  if (bluritemid != '') {
    xdomsync = bluritemdiv.closest('.' + bluritemclass)
    xdomsync.querySelectorAll('[data-syncid=' + bluritemid + '].FCvalue')
      .forEach(div => itemsync(div))
    bluritemid = ''
  }
}
function domtoobj(setvalue) {
  //saveuserstore ()
  // FCXID = "FC0" //+ ix.toString()
  dosync();
  if (setvalue == null)
  {
    setvalue = true
  }
  var fcard = document.getElementById('FC0')
  if (fcard != null) {
    try {
      objcard['className'] = fcard.className
    }
    catch (error) {
      dom.status.innerText = "Error"
      messages.innxerText = "on dom to card"
      return
    }
    let cfcard = fcard.childNodes
    cfcard.forEach(function (dompage, pkey) {
      let cfpage = dompage.childNodes


      setstyle(objcard['pages'][dompage.dataset.id], dompage)
      setdataset(objcard['pages'][dompage.dataset.id], dompage)

      //pages einfügen cfcard.forEach(function (dompage,pkey) { cfpage = dompage.childnodes}
      cfpage.forEach(function (domcolumn, ckey) {
        if (domcolumn.classList.contains("FCcolumn")) {
          let cdomcolumn = domcolumn.childNodes
          setstyle(objcard['columns'][domcolumn.dataset.id], domcolumn)
          setdataset(objcard['columns'][domcolumn.dataset.id], domcolumn)
          cdomcolumn.forEach(function (domframe, bkey) {
            let cdomframe = domframe.childNodes
            setstyle(objcard['columns'][domcolumn.dataset.id]['frames'][domframe.dataset.id], domframe)
            setdataset(objcard['columns'][domcolumn.dataset.id]['frames'][domframe.dataset.id], domframe)
            
            cdomframe.forEach(function (domblock, bkey) {
              if (objcard['columns'][domcolumn.dataset.id]['frames'][domframe.dataset.id]['blocks'][domblock.dataset.id] != null) {
                let xitems = objcard['columns'][domcolumn.dataset.id]['frames'][domframe.dataset.id]['blocks'][domblock.dataset.id]['items']
                let cdomitem = domblock.childNodes
                setstyle(objcard['columns'][domcolumn.dataset.id]['frames'][domframe.dataset.id]['blocks'][domblock.dataset.id], domblock)

                setdataset(objcard['columns'][domcolumn.dataset.id]['frames'][domframe.dataset.id]['blocks'][domblock.dataset.id], domblock)
                cdomitem.forEach(function (domitem, ikey) {
                  if (domitem instanceof SVGElement) {
                    xitems[domitem.dataset.id].value = domitem.innerHTML
                    if (ikey != "items" && ikey != "tag") {
                      xitems[domitem.dataset.id]["stroke"] = domitem.getAttribute("stroke")
                      xitems[domitem.dataset.id]["display"] = domitem.getAttribute("display")
                    }
                  }
                  else {
                    if (domframe.dataset.store != null)
                    {

                    }
                    else
                    {
                      if (domitem.classList.contains("FCvalue") || domitem.classList.contains("FClabel") || domitem.classList.contains("FCstp") || domitem.classList.contains("FCrowitem")) {
                        if (xitems[domitem.dataset.id] != null) {
                          if (domitem.dataset.id == "time1") {console.log("domtoobjtime1")}
                          if (setvalue)
                          {xitems[domitem.dataset.id].value = domitem.innerHTML }// inklusive formatierung, value wird nicht aktualisert
                          setdataset(xitems[domitem.dataset.id], domitem)
                          setstyle(xitems[domitem.dataset.id], domitem)
                        }
                      }


                      if (domitem.tagName == "TEXTAREA") { // da nur value aktualisiert wird 
                        if (setvalue) {xitems[domitem.dataset.id].value = domitem.value}
                      }
                      if (domitem.tagName == "INPUT") { // da nur value aktualisiert wird 
                        if (setvalue) {xitems[domitem.dataset.id].value = domitem.value}
                      }
                      if (typeof domitem.dataset.value !== 'undefined') {
                        if (setvalue) {xitems[domitem.dataset.id].value = domitem.dataset.value}
                      }
                    }
                  }
                }

                )
              }
            })
          })
        }
      })
    })
    //  var xjsonstr = JSON.stringify(xobj)
    // console.log(xjsonstr)
    //localStorage.setItem('FCcard', xjsonstr)
    console.log(xobj)
    filetool.storeobj(xobj)
  }
}
async function setidbKeyval(key, value) {
  await idbKeyval.set(key, value);
}
async function inittrain()
{
 

  
  storeparm.dialogname = "trainmain"
  document.title=storeparm.dialogname
  var xparm = location.search.slice(1).split("&");
  console.log(xparm)
  xparm.forEach((element) => {
    var xp = element.split("=")
    if (xp[0] == "ind") {
      storeparm.ind = xp[1] + "FCcard"
    }
    if (xp[0] == "cmd") {
      storeparm.cmd = xp[1]
    }
    if (xp[0] == "dialog") {
      storeparm.dialogname = xp[1]
    }
    if (xp[0] == "title") {
      document.title = decodeURI(xp[1])
    }
    if (xp[0] == "objectid") {
      storeparm.objectid = decodeURI(xp[1])
    }
    if (xp[0] == "objstore") {
      storeparm.objstore = decodeURI(xp[1])
    }
    if (xp[0] == "trainid") {
      storeparm.trainid = decodeURI(xp[1])
    }
    if (xp[0] == "trainids") {
      storeparm.trainids = decodeURI(xp[1]).split(",")
      console.log(storeparm.trainids)
    }
    if (xp[0] == "componentid") {
      storeparm.componentid = decodeURI(xp[1])
    }
    if (xp[0] == "lineid") {
      storeparm.lineid = decodeURI(xp[1])
    }
    if (xp[0] == "tbheader") {
      storeparm.tbheader = decodeURI(xp[1])
    }
  })
  console.log(0, storeparm)
  xlocale = await idbKeyval.get('locale') || "de";
  cv.level = await idbKeyval.get('level') || "0";
  //setlang();
  //createFcard()
  await filetool.inittrain()
  if (storeparm.dialogname == "trainmain")
  {
    document.getElementById('ButtonTrainFile').style.display=""
    document.getElementById('ButtonTrainMain').style.display="none"
    document.getElementById('ButtonTrainSub').style.display="none"
  }
  else
  {
    document.getElementById('ButtonTrainFile').style.display="none"
    document.getElementById('ButtonTrainMain').style.display="none"
    document.getElementById('ButtonTrainSub').style.display=""
  }
  var mainpage = document.getElementById('mainpage')
  var FredCard = document.createElement('div')
  FredCard.className = 'FredCard'
  FredCard.id = "FC0"
  FredCard.style.width="100%"
  FredCard.style.height="100%"
  mainpage.appendChild(FredCard)
  //filetool.init("init")
  if (storeparm.cmd == "init")
  {
    return
  }
  await filetool.gettraincard()
  var result = await idbKeyval.get(storeparm.ind)
  console.log(storeparm.ind)
  xobj = JSON.parse(result);
  objstore = xobj[0]['fcard']['store']
  
  
  console.log(storeparm)
  if (storeparm.cmd == "print") {
    console.log("print");
    trainbookprint();
    /*setTimeout(() => { // Needed for large documents
       window.print();
     }, 1)
     setTimeout(() => { 
       window.close(); 
     }, 1)
    */
    return
  }
  objtodom();
  if (storeparm.trainid != "") {

    
    document.querySelectorAll('[data-selectid=trainid].FCframe')
      .forEach(function (selframe, fkey) {
        console.log(selframe)
        let domcolumn = selframe.closest('.FCcolumn')
        let objframe = objcard["columns"][domcolumn.dataset.id]["frames"][selframe.dataset.id]
        while (selframe.firstChild) {
          selframe.removeChild(selframe.firstChild)
        }
        updatedomfromstore(objframe, selframe, storeparm.trainid)
      })

  }
  if (storeparm.lineid != "") {

    let xpage = document.querySelector(".FCpage")
    let lines = objstore["lines"]
    let linesi = lines.findIndex((element) => element["id"] == storeparm.lineid)
    console.log(xpage, lines[linesi])
    creategraphictimetable(xpage, lines[linesi])

  }

  if (storeparm.objectid != "") {
    let xpage = document.querySelector(".FCpage")
    let domcolumn = xpage.querySelector('.FCcolumn')
    let domframe = xpage.querySelector('.FCframe')
    let objframe = objcard["columns"][domcolumn.dataset.id]["frames"][domframe.dataset.id]
    while (domframe.firstChild) {
      domframe.removeChild(domframe.firstChild)
    }
    let xstorei = findindex(objstore[storeparm.objstore], "objectid", storeparm.objectid)
    console.log(xstorei,domframe.dataset.selarray)
    let selarray = objstore[storeparm.objstore][xstorei]["trains"]
    console.log(storeparm,xstorei,selarray)
    updatedomfromstore(objframe, domframe, selarray, storeparm.objectid)

  }








}
async function init() {
  console.log("startinit")
  //console.log(navigator)
  //console.log(window.location.href,window.location.hostname,window.location.pathname)
  //directoryHandle = await navigator.storage.getDirectory()
  //console.log(directoryHandle)
  dom.messages = document.getElementById("xmessages")
  dom.status = document.getElementById("xstatus")
  dom.preimg = document.getElementById('preimg')
  
  if (dom.status != null) { dom.status.innerText = "startinit" }
  document.onkeyup = keyup(Event); /* noch keine keys belegt */
  document.onpaste = "return false;" /*  kein paste ! */

  // tabconvert erzeugen aus convertdata von config.js
  convertdata.forEach(res => {
    tabconvert.push(res.split("|"));
  });

  filetool_init();

}
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

  script.onload = () => callback(script);

  document.head.append(script);
}
async function filetool_init() {
  xlocale = await idbKeyval.get('locale') || "de";
  cv.level = await idbKeyval.get('level') || "0";
  xwinsize = await idbKeyval.get(storeparm.dialogname + "size") || null
  let xwinlocation = await idbKeyval.get('winlocation') || "";
  if (xwinlocation != window.location.href) {
    window.confirm("The programm-location was changed, please start init")
    filetool.setid("init")
  }
  loadScript('./projects/master/config/masterpath.js', function () {
    console.log(masterpath)
  });
  let xwidth = await idbKeyval.get('withleft') || 25;
  if (xwidth < 10) { xwidth = 10 }
  let r = document.querySelector('[data-id=withleft]')
  if (r != null) { r.value = xwidth }
  xwidth = xwidth + "%"
  document.querySelectorAll('[data-id=columnleft]')
    .forEach(function (xdiv) { xdiv.style.width = xwidth })
  xwidth = await idbKeyval.get('withmiddle') || 50;
  if (xwidth < 10) { xwidth = 10 }
  r = document.querySelector('[data-id=withmiddle]')
  if (r != null) { r.value = xwidth }
  xwidth = xwidth + "%"
  document.querySelectorAll('[data-id=columnmiddle]')
    .forEach(function (xdiv) { xdiv.style.width = xwidth })
  xwidth = await idbKeyval.get('withright') || 25;
  if (xwidth < 10) { xwidth = 10 }
  r = document.querySelector('[data-id=withright]')
  if (r != null) { r.value = xwidth }
  xwidth = xwidth + "%"
  document.querySelectorAll('[data-id=columnright]')
    .forEach(function (xdiv) { xdiv.style.width = xwidth })
  for (let xid of ["tab1", "tab2", "tab3", "tab4", "img"]) {
    filetool.tabhandle[xid] = await idbKeyval.get(xid) || [];
    filetool.tabpath[xid] = await idbKeyval.get(xid + "path") || [];
    cv.change[xid] = false
  }
  for (let xid of ["tab1", "tab2", "tab3", "tab4"]) {
    if (filetool.tabhandle[xid].name != null) { document.querySelector('[data-id="' + xid + '"]').innerText = filetool.tabhandle[xid].name.split(".")[0] }
  }
  tabcolor = await idbKeyval.get('tabcolor') || tabcolor;
  setcolortobutton();
  setlang();
  setlevel(-1);
  tabheight = await idbKeyval.get('tabheight') || tabheight;
  setheight();
  usercard = await idbKeyval.get('usercard') || usercard;
  mastercatalog = await idbKeyval.get('mastercatalog') || mastercatalog;
  convertdata = await idbKeyval.get('convertdata') || convertdata;
  filetool.basedir = await idbKeyval.get('basedir') || null;
  filetool.id = "xxxx";
  if (filetool.basedir == undefined || filetool.basedir == null) {
    window.confirm("Please press once the init button on the left side and select in the filebrowser the directory 'projects'")
    filetool.setid("init")
  }
  dom.preimg = document.getElementById('preimg');
  dom.preimg.src = filetool.tabhandle["img"];
  dom.preimg.dataset.id = filetool.tabhandle["img"];
  filetool.pathArr = [" "];
  filetool.setfilebutton("dir");
  filetool.setimageid("img")
  
  xobj[0] = firstmessage[0]
  objcard = xobj[0]['fcard']
  objstore = xobj[0]['fcard']['store']
  createFcard()
  objtodom();
};
function savewindowsize() {
  let size = { w: 0, h: 0 }
  size.w = window.innerWidth;
  size.h = window.innerHeight;
  console.log(size)
  setidbKeyval(storeparm.dialogname + "size", size)
}
function saveheight() {
  for (const [key, value] of Object.entries(tabheight)) {

    //var xbutton = document.getElementById("FC"+key)
    let xdiv = document.getElementById(key)
    if (xdiv != null) {
      xvalue = xdiv.style["height"]
      tabheight[key] = xvalue
    }
  }
  setidbKeyval("tabheight", tabheight)

}
function setheight() {
  for (const [key, value] of Object.entries(tabheight)) {

    //var xbutton = document.getElementById("FC"+key)
    let xdiv = document.getElementById(key)
    if (xdiv != null) {
      //console.log(key, value)
      xdiv.style.setProperty("height", value)
    }
  }
}
function setcolortobutton() {
  for (const [key, value] of Object.entries(tabcolor)) {

    //var xbutton = document.getElementById("FC"+key)
    document.querySelectorAll('[data-id=FC' + key + ']')
      .forEach(function (xbutton) {
        if (xbutton != null) {
          xbutton.dataset.color = value;
          xbutton.dataset.colorkey = key;

          //xbutton.style.backgroundColor=value;
          xbutton.style.setProperty("background-color", value)
        }
      })
  }
}
function setlang() {
  setidbKeyval('locale', xlocale)
  document.getElementById("input-locale").value = xlocale
  for (const [key, value] of Object.entries(tablang[xlocale])) {
    document.querySelectorAll('[data-id=' + key + ']')
      .forEach(function (xbutton) {
        if (value["title"]) { xbutton.title = value["title"]; }
        if (value["value"]) { xbutton.innerHTML = value["value"]; }

      })
  }
  var xsel = document.getElementById("selimage")
  for (let i = 0; i < xsel.length; i++) {
    let xoption = xsel.options[i]
    if (xoption.dataset.locale != xlocale) { xoption.style.setProperty("display", "none") }
    else { xoption.style.setProperty("display", "") }
  }

}
function setlevel(level) {
  if (level >=0)
  {setidbKeyval('level', level)}
  
  document.getElementById("input-level").value = level
  document.querySelectorAll('[data-showlevel]')
    .forEach(function (xdiv) {

      if (xdiv.dataset.showlevel <= level) { xdiv.style.display = ""; }
      else { xdiv.style.display = "none"; }
    })
  document.querySelectorAll('[data-tabid]')
    .forEach(function (xdiv) {
      if (xdiv.dataset.tabid == cv.tabid && xdiv.dataset.showlevel <= level) { xdiv.style.display = ""; }
      else { xdiv.style.display = "none"; }
    });
    if (level >= 0 ) {setsave(level );}

}
function setsave(level) {
  //console.log(path1)
  let xdisplay=""
  if ((level <= 2 && path1 == "master") || (level <= 1 && path1 == "public")) { xdisplay = "none" }
  document.querySelectorAll('[data-id="save"]')
    .forEach(function (xdiv) {
      { xdiv.style.display = xdisplay; }
    })
  document.querySelectorAll('[data-id="remove"]')
    .forEach(function (xdiv) {
      { xdiv.style.display = xdisplay; }
    })
  document.querySelectorAll('[data-id="newdir"]')
    .forEach(function (xdiv) {
      { xdiv.style.display = xdisplay; }
    })

}
function getobj(xclass, xlist, xframe, xblock) {
  let plobj = null
  let xblock_id=xblock.dataset.id
  if (xframe.dataset.store != null) {
    if (xblock.classList.contains("FCrow")) { xblock_id = "row0" }
  }
  if (xclass == "FCrowitem") { plobj = objcard['columns'][xlist.dataset.id]['frames'][xframe.dataset.id]['blocks'][xblock_id]['items'] }
  if (xclass == "FCstp") { plobj = objcard['columns'][xlist.dataset.id]['frames'][xframe.dataset.id]['blocks'][xblock_id]['items'] }
  if (xclass == "FCvalue") { plobj = objcard['columns'][xlist.dataset.id]['frames'][xframe.dataset.id]['blocks'][xblock_id]['items'] }
  if (xclass == "FClabel") { plobj = objcard['columns'][xlist.dataset.id]['frames'][xframe.dataset.id]['blocks'][xblock_id]['items'] }
  if (xclass == "FCblock") { plobj = objcard['columns'][xlist.dataset.id]['frames'][xframe.dataset.id]['blocks'] }
  if (xclass == "FCframe") { plobj = objcard['columns'][xlist.dataset.id]['frames'] }
  if (xclass == "FCcolumn") { plobj = objcard['columns'] }
  if (xclass == "FCcard") { plobj = objcard }
  if (xclass == "FCpage") { plobj = objcard['pages'] }
  if (xclass == "FCcheckbox") { plobj = objcard['checkboxes'] }
  return (plobj)
}
function setcvchange(xv, xid) {
  setcvtabidchange(xv,xid,cv.tabid)
}
function setcvtabidchange(xv, xid, ptabid) {
  cv.change[ptabid] = xv
  if (dom.status != null)
 { dom.status.innerText = "please store"
  dom.messages.innerText = "change value " + xid}
  if (cv.tabid == ptabid)
  {document.querySelectorAll('[data-id="save"]')
    .forEach(function (xdiv) {
      xdiv.style.backgroundColor = "rgb(173, 1, 1)"
    })}
  let xdomtabid = document.querySelector('[data-id="' + ptabid + '"]')
  //console.log(xdomtabid)
  if (xdomtabid != null) {
    xdomtabid.innerText = xdomtabid.innerText.split("*")[0] + "*"
  }
}
function xseldrop (e) {
  let xele = e.target.closest('button')
  let xparent = xele.closest('.dropdown-content')
  let xid=xparent.dataset.id
  
  let xblock=xparent.parentNode
  let xelediv = xblock.querySelector('[data-id=' + xid + '].dropdown')
  
  xelediv.innerHTML=xele.innerHTML
  xelediv.style['color'] = xele.style['color']
  //if (xele.style['background-color'] != "")  {xelediv.style['background-color'] = xele.style['background-color']}
  xelediv.style['background-color'] = xele.style['background-color']
  xelediv.dataset.colorkey = xele.dataset.colorkey
  setbluritemid(xelediv)
  setcvchange(true,xelediv.dataset.id)
  if (xelediv.classList.contains('FCtrain') && xelediv.classList.contains('FCvalue'))
  {
    trainchangevalue(xelediv)
  }
  xelediv.focus();
}
function incrementString(text) {
  return text.replace(/(\d*)$/, (_, t) => (+t + 1).toString().padStart(t.length, 0));
}



function sverweis(xtab,xsea,xret,xval)
{
  let xind = xtab.findIndex((element) => element[xsea] == xval) 
  if (xind == -1 )
  { return (0)
  }
  return (xtab[xind][xret])

}
function findindex(xtab,xsea,xval)
{
  let xind = xtab.findIndex((element) => element[xsea] == xval) 
  if (xind == -1 )
  { return (0)
  }
  return (xind)

}
function gettabrow(xtab,xsea,xval)
{
  let xind = xtab.findIndex((element) => element[xsea] == xval) 
  if (xind == -1 )
  { return (null)
  }
  return (xtab[xind])

}