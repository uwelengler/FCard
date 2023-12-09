"use strict";
function moverow(event) {
  let fcarddom = document.getElementById("FC0")
    domtoobj();
   
    let dir = event.target.dataset.id
    
    let domobj=activselection.div.closest(".FCtabcol")
    let domtab, domobjclass;
    if (domobj == null)  {
      domtab=activselection.div.closest(".FCtab")
      if (domtab == null)  {return}
   // console.log(domtab)
      domobj=activselection.div.closest(".FCrow")
      if (domobj == null)  {return}
      domobjclass="FCrow"
    }
    else
    {
      domobjclass="FCtabcol"
    }
   
    let domcolumn=activselection.div.closest(".FCcolumn")
    let xlobj;
    //console.log(domcolumn)
    if (domobjclass == "FCrow")
    {xlobj = objcard['columns'][domcolumn.dataset.id]['frames'][domtab.dataset.id]["blocks"]}
    else
    {xlobj = objcard['columns']}
    let nobjs = xlobj;
   // console.log(xlobj)
    
    let lkeys = Object.keys(xlobj)
    let selobj = domobj
    selobjid = domobj.dataset.id
  
    //nextIndex = lkeys.indexOf(e_target.dataset.itemid);
    if (dir == "copy") {
      copyobjid=""
      copyobjelement = xlobj[domobj.dataset.id];
      return
    }
    if (dir == "repeat") {
      copyobjid=""
      copyobjelement = xlobj[domobj.dataset.id];
      dir="insert"
      setcvchange(true,domobj.dataset.id)
    }
    if (dir == "move") {
      copyobjid = domobj.dataset.id
      copyobjelement = xlobj[domobj.dataset.id];
      return
    }
  
    if (dir == "delete") {
      //console.log(domobj.dataset.id)
      delete xlobj[domobj.dataset.id];
      lkeys = Object.keys(xlobj)
      nobjs = xlobj;
      setcvchange(true,domobj.dataset.id)
  
    }
    if (dir == "refresh") {
      //console.log(domobj.dataset.id)
      nobjs = xlobj;
    }
    if (dir == "insert") {
        nobjs = {}
        
        if (copyobjid == "")
        {
          //console.log("leer")
          //console.log(incrementString('foo9'));
          for (const [key, value] of Object.entries(xlobj)) {
            if (value.className.includes(domobjclass))
            {
            if (copyobjid <= key && copyobjid.length == key.length )
            {
              console.log(copyobjid,key)
              copyobjid = key;
            }
            if (copyobjid.length < key.length )
            {
              copyobjid = key;
            }
            }
  
          }
         
          copyobjid = incrementString(copyobjid)
          
        }
        for (const [key, value] of Object.entries(xlobj)) {
          if (key != copyobjid) { nobjs[key] = value }
          if (key == selobjid) {
            nobjs[copyobjid] = JSON.parse(JSON.stringify(copyobjelement))
          }
        }
       
    }
    if (domobjclass == "FCrow")
    {
      objcard['columns'][domcolumn.dataset.id]['frames'][domtab.dataset.id]["blocks"] = nobjs
    }
    else
    {
      objcard['columns'] = nobjs
    }
    clearmainpage();
    createFcard()
    objtodom();
    createFcardButtons()
    setobj()
  }


function exporttabcsv() {
    let domtab = activselection.div.closest(".FCtab")
    if (domtab == null) { return }
    // console.log(domtab)
    let domcolumn = activselection.div.closest(".FCcolumn")
    //console.log(domcolumn)
    let xframetab = objcard['columns'][domcolumn.dataset.id]['frames'][domtab.dataset.id]
    let strcsv = tabtocsv(xframetab)
    saveFile(strcsv, null)


  }
  async function getcopyfileold(pickeropts,newfile)
  {
    const [oldHandle] = await window.showOpenFilePicker(pickeropts);
    console.log(oldHandle)
    const readableStream = await oldHandle.getReader
    console.log(readableStream)
    const [newHandle] = await window.showOpenFilePicker(pickeropts);
    const writableStream = await newHandle.createWritable();
    readableStream.pipeTo(writableStream)
  }
  
async function importtabcsv(tabcsv) {
    let domtab = activselection.div.closest(".FCtab")
    if (domtab == null) { return }
    // console.log(domtab)
    let domcolumn = activselection.div.closest(".FCcolumn")
    //console.log(domcolumn)
    let xframetab = objcard['columns'][domcolumn.dataset.id]['frames'][domtab.dataset.id]
    const [newHandle] = await window.showOpenFilePicker();
    const fileData = await newHandle.getFile();
    domtoobj();
    let result = await readData(fileData)
    let tabinsert = parsecsvData(result);
    let tabrowdef = null
    let xframetab_blocks = {}
    for (const [key, block] of Object.entries(xframetab.blocks)) {


      if (block.className.includes("FCrow")) {
        if (tabrowdef == null) {
          tabrowdef = JSON.parse(JSON.stringify(block))
        }
      }
      else {
        xframetab_blocks[key] = xframetab.blocks[key]
      }
    }
    console.log(tabrowdef,tabinsert.length)
    for (let i = 1; i < tabinsert.length; i++) {

      for (const [ikey, item] of Object.entries(tabrowdef.items)) {
        let xindex = tabinsert[0].indexOf(ikey)

        if (xindex > 0) {
          tabrowdef.items[ikey].value = tabinsert[i][xindex]
        }
        let xindex1 = tabinsert[0].indexOf(ikey + '.title')

        if (xindex1 > 0) {
          tabrowdef.items[ikey]['title'] = tabinsert[i][xindex1]
        }
        xindex1 = tabinsert[0].indexOf(ikey + '_dataset_ivalue')

        if (xindex1 > 0) {
          tabrowdef.items[ikey]['dataset']['ivalue'] = tabinsert[i][xindex1]
        }
      }
      if (tabinsert[i][0] != "") {
        let xrow = "row" + i
        xframetab_blocks[xrow] = JSON.parse(JSON.stringify(tabrowdef))
      }
    }
    xframetab.blocks = JSON.parse(JSON.stringify(xframetab_blocks))
    clearmainpage();
    createFcard()
    objtodom();
    createFcardButtons()
  }

function tabtocsv(xframetab) {
    //gettabrows(xframetab,"addr","101","name");
    var xtabstr = new Array(0);
    let xindex=0 
    for (const [key, row] of Object.entries(xframetab["blocks"])) {
      if (row.className.includes("FCtabheader"))
      {
        xtabstr[0]='"header"'
        for (const [ikey, item] of Object.entries(row["items"])) {
           xtabstr[0]= xtabstr[0] + '|"' + ikey + '"'
           if (item.dataset.ivalue)
           {
            xtabstr[0]= xtabstr[0] + '|"' + ikey + '_dataset_ivalue"'
           }
        }
      }
      if (row.className.includes("FCrow"))
      {
        xindex=xindex +1
        xtabstr[xindex]='"'+key+'"'
        for (const [ikey, item] of Object.entries(row["items"])) {
           if (isNaN(item.value))
           {xtabstr[xindex]= xtabstr[xindex] + '|"' + item.value + '"'}
           else
           {xtabstr[xindex]= xtabstr[xindex] + '|' + item.value }
           if (item.dataset.ivalue)
           {
            xtabstr[xindex]= xtabstr[xindex] + '|"' + item.dataset.ivalue + '"'
           }
           
        }
      }
    }
    return (xtabstr.join('\n'));
  }

  function gettabrows(xframetab,xkey,xvalue,xret) {
    
    //xrows=Object.values(xframetab["blocks"]).filter(row => row.className.includes("FCrow") && row['items'][xkey].value== xvalue);
    
    //console.log(xrows[0]['items'][xret].value)
    for (const [key, row] of Object.entries(xframetab["blocks"])) {
      if (row.className.includes("FCrow"))
      {
        if (row['items'][xkey].value== xvalue)
        {
          return(row['items'][xret].value)
        }
      }
    }
  }
  function objsverweis(xframetab,xkey,xvalue,xret) {
    
    //xrows=Object.values(xframetab["blocks"]).filter(row => row.className.includes("FCrow") && row['items'][xkey].value== xvalue);
    
    //console.log(xrows[0]['items'][xret].value)
    for (const [key, row] of Object.entries(xframetab["blocks"])) {
      if (row.className.includes("FCrow"))
      {
        if (row['items'][xkey].value== xvalue)
        {
          return(row['items'][xret].value)
        }
      }
    }
    
  }