
function updatedomfromstore(frame, domframe, xid, selectvalue) {
    var callfunction;
    
    let xrf = ""
    //let frame = objcard["columns"][domcolumn.dataset.id]["frames"][domframe.dataset.id]
    let pid = []
    let selectitem = domframe.dataset.selectitem
    
    if (Array.isArray(xid) )
    {
        domframe.dataset.xid = null
        pid=xid
    }
    else
    {   domframe.dataset.xid = xid 
        pid=Array(xid) }
        
    let pstore = objstore[domframe.dataset.storep]
    let xstore = objstore[domframe.dataset.store]
    if (pstore == null) {
        pstore = Array(objstore)
    }
    for (const [defkey, block] of Object.entries(frame.blocks)) {
        if (block.className.includes("FCrow")) {
            
            if (typeof window[block.dataset.function] == "function") {
                callfunction = "init"
            }
            else {
                callfunction = ""
            }
            let domblock = ""

            pstore.forEach(function (xstore, xkey) {
                
                let xpid = pid.findIndex((element) => element == xstore["id"])
                
                if (xpid > -1) {
                    console.log(domframe.dataset.store,xstore)
                    if (xstore[domframe.dataset.store] != null) {
                        if (callfunction == "init") {
                            callfunction = block.dataset.function
                            window[callfunction]("init", xstore, xkey, xstore[domframe.dataset.store], null)
                        }
                        if (callfunction != "") {                        
                            xrf=window[callfunction]("newparent", xstore, xkey, xstore[domframe.dataset.store], null)
                        }
                        
                        xstore[domframe.dataset.store].forEach(function (xtab, xtabkey) {
                            if (selectitem == null || xtab[selectitem] == selectvalue) 
                            {// alle Datenzeilen für store durchlaufen
                                
                                let key = "row_" + xkey + "_" + xtabkey
                                let xrowix = key.split("_")
                                
                                if (callfunction != "") {
                                    if (xrf != "newline") { 
                                        xrf = window[callfunction]("newrow", xtab, xtabkey, xstore[domframe.dataset.store], null)
                                    }
                                    if (xrf == "newline") {
                                        xrf = ""
                                        createdomelement(domframe, frame.blocks[defkey], key, false, "FCblock")
                                        domblock = domframe.querySelector('[data-id=' + key + '].FCblock')
                                    }
                                }
                                else {
                                    createdomelement(domframe, frame.blocks[defkey], key, false, "FCblock")
                                    domblock = domframe.querySelector('[data-id=' + key + '].FCblock')
                                }
                                for (const [ikey, item] of Object.entries(block.items)) {
                                    // allen items in der Ausgabe durchlaufen
                                    if (ikey == "id") {
                                        block.items[ikey].value = xstore["id"]
                                        createdomelement(domblock, block.items[ikey], ikey, false, "")
                                    }
                                    else
                                        if (callfunction != "") {
                                            let xitem = domblock.querySelector('[data-id=' + ikey + ']')

                                            if (xitem != null) {
                                                let xlog = xitem.innerHTML

                                                xitem.innerHTML = window[callfunction](ikey, xtab, xtabkey, xstore[domframe.dataset.store], block.items[ikey])
                                            }
                                            else {
                                                block.items[ikey].value = window[callfunction](ikey, xtab, xtabkey, xstore[domframe.dataset.store], block.items[ikey])
                                                createdomelement(domblock, block.items[ikey], ikey, true, "")
                                            }
                                        }
                                        else
                                            if (xtab[ikey] != null) {
                                                block.items[ikey].value = xtab[ikey]
                                               
                                                if (block.items[ikey].className.includes("FCoutputtime"))
                                                {block.items[ikey].value = timevaltochar(xtab[ikey])}
                                                createdomelement(domblock, block.items[ikey], ikey, true, "")
                                            }
                                            else {
                                                createdomelement(domblock, block.items[ikey], ikey, true, "")
                                            }
                                }
                            }
                        })
                    }
                }
            })
        }
        else {
            pstore.every(function (xstore, xkey) {
                let xpid = pid.findIndex((element) => element == xstore["id"])
                if (xpid > -1) {
                    createdomelement(domframe, frame.blocks[defkey], defkey, false, "FCblock")
                    let domblock = domframe.querySelector('[data-id=' + defkey + '].FCblock')
                    for (const [ikey, item] of Object.entries(block.items)) {
                        if (block.items[ikey].dataset.storeitem != null) {
                            //console.log(block.items[ikey].dataset.storeitem, xstore[block.items[ikey].dataset.storeitem])
                            if (xstore[block.items[ikey].dataset.storeitem] != null) { block.items[ikey].value = xstore[block.items[ikey].dataset.storeitem] }
                        }
                        createdomelement(domblock, block.items[ikey], ikey, true, "")
                    }
                    return false;
                }
                return true;

            })
        }
    }
    sortframe(domframe)
}
function sortframe(domframe)
{
    if (domframe.dataset.sortkey == null) {return}
    let sortkey = domframe.dataset.sortkey.split(",")
    if (sortkey[0] != null) {
        let sortarray = []
        let framechilds = domframe.childNodes
        framechilds.forEach(function (domrow, rowkey) {
            if (domrow.classList.contains("FCrow")) {
                let xvalue = domrow.querySelector('[data-id=' + sortkey[0] + ']')
                if (xvalue != null) {
                    let sortitem = { rowkey: "", sortvalue: "" }
                    sortitem.rowkey = rowkey
                    sortitem.sortvalue = xvalue.innerText
                    if (sortkey[1] == "+" || sortkey[1] == "-")
                    {sortitem.sortvalue = +xvalue.innerText}
                    sortarray.push(sortitem)
                }
            }
        })
        if (sortkey[1]== null)
        {sortarray.sort((a, b) => (a.sortvalue >= b.sortvalue) ? 1 : -1)}
        if (sortkey[1] == "a" || sortkey[1] == "A")
        {sortarray.sort((a, b) => (a.sortvalue >= b.sortvalue) ? 1 : -1)}
        if (sortkey[1] == "d" || sortkey[1] == "D")
        {sortarray.sort((a, b) => (b.sortvalue >= a.sortvalue) ? 1 : -1)}
        if (sortkey[1] == "+")
        {sortarray.sort((a, b) => (a.sortvalue - b.sortvalue) )}
        if (sortkey[1] == "-")
        {sortarray.sort((a, b) => (b.sortvalue - a.sortvalue) )}
        sortarray.forEach(function (sortitem, order) {
            framechilds[sortitem.rowkey]["style"]["order"] = order
        })
    }
    
} 
function loaddomfromstore(xstore, domframe) {
    let domcolumn = domframe.closest(".FCcolumn")
    
    let frame = objcard["columns"][domcolumn.dataset.id]["frames"][domframe.dataset.id]
    for (const [defkey, block] of Object.entries(frame.blocks)) {
        if (block.className.includes("FCrow") && xstore != null) {
            xstore.forEach(function (xtab, xtabkey) {
                // ARRAY
                let key = "row_0_" + xtabkey
                //console.log(defkey,key)
                createdomelement(domframe, frame.blocks[defkey], key, false, "FCblock")
                let domblock = domframe.querySelector('[data-id=' + key + '].FCblock')
                for (const [ikey, item] of Object.entries(block.items)) {
                    if (xtab[ikey] != null) {
                        block.items[ikey].value = xtab[ikey]
                    }
                    createdomelement(domblock, block.items[ikey], ikey, true, "")
                }
            })
        }
        else {
            createdomelement(domframe, frame.blocks[defkey], defkey, false, "FCblock")
            let domblock = domframe.querySelector('[data-id=' + defkey + '].FCblock')
            for (const [ikey, item] of Object.entries(block.items)) {
                createdomelement(domblock, block.items[ikey], ikey, true, "")
            }
        }
    }
}
function updatestorefromline(target) {
    let xrow = target.closest(".FCrow")
    if (xrow == null) { return }
    console.log("updatestorefromline",target.dataset.id)
    let elemid = target.dataset.id
    let xframe = target.closest(".FCframe")
    let xstoreid = xframe.dataset.store
    let xstoreparent = xframe.dataset.storep
    let xstore = null
    let parenti = 0
    //let xrowix = Number(xrow.dataset.id.replace(/\D+/g, ""))
    let xrowix = xrow.dataset.id.split("_")
    console.log("updatestorefromline",target.dataset.id,xrowix,xstoreid,xstoreparent)
    let xrowid = xrow.querySelector('[data-id="id"]')
    let xstoreline = null
    if (xstoreparent != null) {
        //parenti = findindex(objstore[xstoreparent], "id", xrowid.innerText)
        
        xstoreline = objstore[xstoreparent][xrowix[1]][xstoreid][xrowix[2]]
    }
    else {
        xstoreline = objstore[xstoreid][xrowix[2]]
    }
    if (xstoreline == null)
    {
        console.log("noline",xrowix[2])
        return
    }
    let xtab = target.closest(".FCtab")
    let xrowitem = xrow.childNodes
    xrowitem.forEach(function (domitem, ikey) {
        if (domitem.classList.contains("FCvalue") || domitem.classList.contains("FCrowitem")) {
            if (xstoreline.hasOwnProperty(domitem.dataset.id)) {
                if (domitem.classList.contains("FCinputcolor")) {
                    xstoreline[domitem.dataset.id] = domitem.dataset.value
                }
                else { 
                    
                    if  (domitem.classList.contains("FCinputtime"))
                    {
                        let domhh = domitem.querySelector('[data-id="hh"]')
                        let dommm = domitem.querySelector('[data-id="mm"]')
                        let domvalue = timevalcomp(domhh.value, dommm.value)
                        xstoreline[domitem.dataset.id]=domvalue
                    }
                    else
                    {
                        cleardivspan(domitem)
                    xstoreline[domitem.dataset.id] = domitem.innerHTML }}
            }
        }
    })
}
function refreshdomfromstore(target) {
    let xpage = target.closest('.FCpage')
    xpage.querySelectorAll('[data-selectid=' + target.dataset.dropid + '].FCframe')
        .forEach(function (selframe, fkey) {
            let domcolumn = selframe.closest('.FCcolumn')
            let objframe = objcard["columns"][domcolumn.dataset.id]["frames"][selframe.dataset.id]
            while (selframe.firstChild) {
                selframe.removeChild(selframe.firstChild)
            }
            updatedomfromstore(objframe,selframe, target.innerText)
        })
}