"use strict";
function FCfiletool() {
  {
    this.basedir = null;
    this.currentdir = null;
    this.tabhandle = [];
    this.tabpath = [];
    this.objcard = null;
    this.pathArr = null;
    
  }
  
  this.initold = async function () {
    xlocale = await idbKeyval.get('locale') || "de";
    cv.level = await idbKeyval.get('level') || "0";
    xwinsize = await idbKeyval.get(storeparm.dialogname + "size") || null
    let xwinlocation = await idbKeyval.get('winlocation') || "";
    if (xwinlocation != window.location.href) {
      window.confirm("The programm-location was changed, please start init")
      this.setid("init")
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
      this.tabhandle[xid] = await idbKeyval.get(xid) || [];
      this.tabpath[xid] = await idbKeyval.get(xid + "path") || [];
      cv.change[xid] = false
    }
    for (let xid of ["tab1", "tab2", "tab3", "tab4"]) {
      if (this.tabhandle[xid].name != null) { document.querySelector('[data-id="' + xid + '"]').innerText = this.tabhandle[xid].name.split(".")[0] }
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
    this.basedir = await idbKeyval.get('basedir') || null;
    this.id = "xxxx";
    if (this.basedir == undefined || this.basedir == null) {
      window.confirm("Please press once the init button on the left side and select in the filebrowser the directory 'projects'")
      this.setid("init")
    }
    dom.preimg = document.getElementById('preimg');
    dom.preimg.src = this.tabhandle["img"];
    dom.preimg.dataset.id = this.tabhandle["img"];
    this.pathArr = [" "];
    this.setfilebutton("dir");
    this.setimageid("img")
    
    xobj[0] = firstmessage[0]
    objcard = xobj[0]['fcard']
    objstore = xobj[0]['fcard']['store']
    createFcard()
    objtodom();
  };
  
  this.setid = async function (fid) {
   
    if (fid == 'init' || fid == 'card' || fid == 'file' || fid == 'tool' || fid == 'dialog' || fid == 'tab1' || fid == 'tab2' || fid == 'tab3' || fid == 'tab4') {
      if (this.basedir == undefined || this.basedir == null ) {
        if (fid == "init")
        {}
        else
        {window.alert("Please select in the next window the directory 'projects' ")
        setbasedir()}
      }
      if (this.id != fid) {
        console.log(this.id,fid)
        xobj=xtabobj[fid]
        if (xobj != null)
        {
        objcard = xobj[0]['fcard']
        objstore = xobj[0]['fcard']['store']}
        this.id = fid;
        //this.filehandle = this.tabhandle[this.id];
        this.currentdir = this.basedir;
        if (this.tabhandle[this.id] == undefined){
          this.pathArr = this.tabpath[this.id]
          console.log("undefine",this.pathArr);
          this.setfilebutton("dir");
        }
        else
        {
        if (this.tabhandle[this.id].kind == "file") {
          this.pathArr = await this.basedir.resolve(this.tabhandle[this.id]) || [];
          this.setfilebutton("file");

        }
        else {
          this.pathArr = this.tabpath[this.id]
          console.log("notfile",this.pathArr);
          this.setfilebutton("dir");
        }
        }

        //this.setfilebutton();
        this.currentdir = this.basedir;
        document.getElementById('pgmversion').innerText = "PGM Version : " + pgmversion;
        console.log(this.basedir)
        await verifyPermission(this.basedir, true);
        try{
           
          const dirmaster = await this.basedir.getDirectoryHandle("master", { create: false });
          const dirconfig = await dirmaster.getDirectoryHandle("config", { create: false });
          const configfile = await dirconfig.getFileHandle("config.json", { create: false });
          //console.log(configfile)
          const configData = await configfile.getFile();
          let result = null
          result = await readData(configData);
          
          if (result != null)
          {
          masterconfig=JSON.parse(result);
          console.log(masterconfig)
          document.getElementById('projectsversion').innerText = "Template Version : " + masterconfig.version;}
        }
        catch (err) {
          document.getElementById('projectsversion').innerText = "Template Version ?" ;
        }
       

        for (let i = 0; i < this.pathArr.length; i++) {
          
          try{
            //console.log(this.pathArr[i])
            const subdir = await this.currentdir.getDirectoryHandle(this.pathArr[i], { create: false });
            this.currentdir = subdir;
            
          }
          catch (err) {
            console.log(err);
            console.log(this.pathArr[i])
            break;
          }
        }
        this.showdir(this.currentdir,fid);
        setlevel(cv.level)
        cv.tabid=fid
        let xdomtabid=document.querySelector('[data-id="'+fid+'"]')
        if (xdomtabid != null)
        {if (cv.change[fid] == false)  {
          xdomtabid.innerText= this.tabhandle[fid].name.split(".")[0]
        }
        else {
          xdomtabid.innerText= this.tabhandle[fid].name.split(".")[0]+"*"
        }}
        //console.log(xdomtabid.innerText)
        if (cv.change[fid] == false)  {
          document.querySelectorAll('[data-id="save"]').forEach(function (xdiv) {xdiv.style.backgroundColor = "rgb(199, 199, 199)"})
        }
        else
        {
          document.querySelectorAll('[data-id="save"]').forEach(function (xdiv) {xdiv.style.backgroundColor = "rgb(173, 1, 1)"}) 
        }
      }
      

    }
    
    
  }
  this.setimageid = async function (fid) {
    if (fid == 'img') {
      if (this.basedir == undefined || this.basedir == null ) {
        if (fid == "init")
        {}
        else
        {window.alert("Please select in the next window the directory 'projects' ")
        setbasedir()}
      }
        let r = document.getElementById("button1");
        if (r != null) {r.style.width= "100%";}
        if (r != null) {r.style.display= "";}
        r = document.getElementById("preimg");
        if (r != null) {r.style.display=""}
        //this.filehandle = this.tabhandle[this.id];
        this.imgcurrentdir = this.basedir;
        if (this.tabhandle[fid] == undefined){
          this.imgpathArr = this.tabpath[fid]
          console.log("undefine",this.pathArr);
          this.setimagebutton("dir");
        }
        else
        {
        if (this.tabhandle[fid].kind == "file") {
          this.imgpathArr = await this.basedir.resolve(this.tabhandle[fid]) || [];
          this.setimagebutton("file");

        }
        else {
          this.imgpathArr = this.tabpath[fid]
          this.setimagebutton("dir");
        }
        }
        this.imgcurrentdir = this.basedir;
        await verifyPermission(this.basedir, true);
        for (let i = 0; i < this.imgpathArr.length; i++) {
          try{
            
            const subdir = await this.currentdir.getDirectoryHandle(this.imgpathArr[i], { create: false });
            this.imgcurrentdir = subdir;
          }
          catch (err) {
            console.log(err);
            console.log(this.imgpathArr[i])
            break;
          }
        }
        this.showdir(this.imgcurrentdir,fid);
      }  
  }
  this.getFile = async function (filehandle,fid) {   
    await verifyPermission(filehandle, true);
    const fileData = await filehandle.getFile();
    if (fid == "getcatalog" && fileData.type == "application/json") {
      let result = await readData(fileData);
      try{
        xcatfile = JSON.parse(result)||[];
      }
      catch (err) {
        //console.log(filehandle)
      }
      
      
    }
    if (fid == "recent" && fileData.type == "application/json") {
      clearmainpage()
      //localStorage.setItem("FCcard", "")
      // await idbKeyval.set("FCcard", "");
      xobj = null;
      
      let result = await readData()
      
      let tx_obj = JSON.parse(result);
      if (Array.isArray(tx_obj)) {
      }
      else {
        tx_obj = [tx_obj];
      }
      await idbKeyval.set(this.id+"FCcard", JSON.stringify(tx_obj));
      xtabobj[this.id] = tx_obj;
      xobj =  tx_obj ;
      objcard = xobj[0]['fcard']
      objstore = xobj[0]['fcard']['store']
      //await idbKeyval.set("FCcard", JSON.stringify(tx_obj));
      //localStorage.setItem('FCcard', JSON.stringify(tx_obj))
      FCX = document.getElementById("FC0");
      if (!FCX) { createFcard(); FCX = document.getElementById("FC0"); };
      objtodom();
      createFcardButtons()
      initDcard()
      await idbKeyval.set(this.id, filehandle);
      await idbKeyval.set(this.id + "path", this.pathArr);
      this.tabhandle[this.id] = filehandle;
      this.setfilebutton("file");
    }
    if (fid == "open" && fileData.type == "application/json") {
      clearmainpage()
      xobj = null;
     
      let result = await readData(fileData)
      
      let tx_obj = JSON.parse(result);
      if (Array.isArray(tx_obj)) {
      }
      else {
          tx_obj = [tx_obj];
      }
      if (cv.tabid==null){cv.tabid="tab1",this.id="tab1"}
      if (cv.desttabid == "self")
        {
          cv.change[this.id] = false ;
        }
      else
        {
          cv.tabid=cv.desttabid; 
          let newfilename=cv.desttabid+"new.json";
          this.pathArr = await this.basedir.resolve(this.tabhandle[cv.desttabid]) || [];
          if (this.tabhandle[cv.desttabid].kind =="directory")
          {
            this.pathArr.push("dummy")
          }
          this.filedir=this.basedir;
          for (let i = 0; i <this.pathArr.length-1; i++) {
            const subdir = await this.filedir.getDirectoryHandle(this.pathArr[i], { create: false });
            this.filedir = subdir;
          }
          filehandle = await this.filedir.getFileHandle(newfilename,{create: true})
          this.tabhandle[cv.desttabid]=filehandle
          this.setid(cv.desttabid); 
          setactivtab(cv.tabid);
        }
      await idbKeyval.set(this.id+"FCcard", JSON.stringify(tx_obj));
      xtabobj[this.id] = tx_obj;
      xobj =  tx_obj;
      console.log("getfile",this.id)
      if (this.objcard == null || objcard == null)
      {objcard = xobj[0]['fcard']}
      objstore = xobj[0]['fcard']['store']
      let FCX = document.getElementById("FC0");
      if (!FCX) { createFcard(); FCX = document.getElementById("FC0"); };
      objtodom();
      createFcardButtons()
      initDcard()
      //this.filehandle = filehandle;
      this.tabhandle[this.id] = filehandle;
      this.pathArr = await this.basedir.resolve(filehandle) || [];
      await idbKeyval.set(this.id,filehandle);
      await idbKeyval.set(this.id + "path", this.pathArr);
      this.setfilebutton("file");
    }
  }
   
  this.setfilebutton = function (xtype) {
    cv.tabid=this.id
    let buttondiv=  document.getElementById("recentFile");;
    if (this.id == "dialog")
    {buttondiv = document.getElementById("recentDialog");}
    while (buttondiv.firstChild) {
      buttondiv.removeChild(buttondiv.firstChild)
    }
    buttondiv.innertext = "Datei: ";
    let button = document.createElement('button')
    button.dataset.id = "0";
    button.className = "buttonpath";
    button.type = "button";
    button.innerText = this.basedir.name;
    button.onclick = function () { filetool.getsubdir(event) };
    
    buttondiv.appendChild(button);
    let i = 1;
    this.pathArr.forEach(path => {
      button.innerText= button.innerText + "/"
      button = document.createElement('button')
      button.dataset.id = i + "";
      button.className = "buttonpath";
      button.type = "button";
      button.innerText = path;
      if (i == 1) {path1=path}
      
      button.onclick = function () { filetool.getsubdir(event) };
      buttondiv.appendChild(button);
      i += 1;
    });
    
    if (button.innerText == "")
      {
        button.innerText=".json"
      }
    if (xtype=="dir")
    {
      button.id = "filename";
      button.className = "FCfilename";
      button.contentEditable = "true";
      button = null;
    }
    if (xtype=="file")
    {
      
      button.id = "filename";
      button.className = "FCfilename";
      button.contentEditable = "true";
      button = null;
    }
    
  }
  this.setimagebutton = function (xtype) {
    //console.log(xtype)
    let buttondiv = document.getElementById("recentImage");
    while (buttondiv.firstChild) {
      buttondiv.removeChild(buttondiv.firstChild)
    }
    buttondiv.innertext = "Datei: ";
    let button = document.createElement('button')
    button.dataset.id = "0";
    button.className = "buttonpath";
    button.type = "button";
    button.innerText = this.basedir.name;
    button.onclick = function () { filetool.getsubdir(event) };
    buttondiv.appendChild(button);
    let i = 1;
    this.imgpathArr.forEach(path => {
      button.innerText= button.innerText + "/"
      button = document.createElement('button')
      button.dataset.id = i + "";
      button.className = "buttonpath";
      button.type = "button";
      button.innerText = path;
      //if (i == 1) {setsave(path)}
      
      button.onclick = function () { filetool.getsubdir(event) };
      buttondiv.appendChild(button);
      i += 1;
    });
   
    if (xtype=="dir")
    {
      button.id = "filename";
      button.className = "FCfilename";
      button.contentEditable = "true";
      button = null;
    }
    if (xtype=="file")
    {
      button.id = "filename";
      button.className = "FCfilename";
      button.contentEditable = "true";
      button = null;
    }
    
  }
  this.inittrain = async function()
  {
    //console.log(xtype)
    xwinsize = await idbKeyval.get(storeparm.dialogname+"size") || null
    console.log(storeparm.dialogname,xwinsize)
    if (xwinsize != null)
    {
      console.log(xwinsize)
      console.log(window.innerHeight)
      window.resizeTo(xwinsize.w,xwinsize.h)
      console.log(window.innerHeight)
    }
    this.pathArr = [" "];
    this.basedir = await idbKeyval.get('basedir') || null;
    console.log(this.basedir)
    let xid="dialog"
    this.tabhandle[xid] = await idbKeyval.get(xid) || [];
    this.tabpath[xid] = await idbKeyval.get(xid + "path") || [];
    this.pathArr = this.tabpath[xid]
    this.id = xid;
    cv.tabid=xid
    //this.filehandle = this.tabhandle[this.id];
    this.currentdir = this.basedir;
    await this.setdialogbutton("dir")
  }
  this.setdialogbutton = async function (xtype) {
    
    dom.messages = document.getElementById("xmessages")
    dom.status = document.getElementById("xstatus")
    let buttondiv = document.getElementById("recentDialog");
    while (buttondiv.firstChild) {
      buttondiv.removeChild(buttondiv.firstChild)
    }
    buttondiv.innertext = "Datei: ";
    let button = document.createElement('button')
    button.dataset.id = "0";
    button.className = "buttonpath";
    button.type = "button";
    button.innerText = this.basedir.name;
    
    button.onclick = function () { filetool.getsubdir(event) };
    buttondiv.appendChild(button);
    let i = 1;
    this.pathArr.forEach(path => {
      button.innerText= button.innerText + "/"
      button = document.createElement('button')
      button.dataset.id = i + "";
      button.className = "buttonpath";
      button.type = "button";
      button.innerText = path;
      //if (i == 1) {setsave(path)}
      
      button.onclick = function () { filetool.getsubdir(event) };
      buttondiv.appendChild(button);
      i += 1;
    });
   
    if (xtype=="dir")
    {
      button.id = "filename";
      button.className = "FCfilename";
      button.contentEditable = "true";
      button = null;
    }
    if (xtype=="file")
    {
      button.id = "filename";
      button.className = "FCfilename";
      button.contentEditable = "true";
      button = null;
    }
    
  }
  
  this.getallsubdir = async function(dir,xid,level,path) {
    let i = 0;
    let list = [];
    //console.log(level,i,dir,path);
    if (level <= 30)
    { 
    
      for await (const entry of dir.entries()) {
       { list.push({ dir: entry, kind: entry[1].kind, name: entry[0], index: i })
        i = i + 1;}
      };
      for (let i = 0; i < list.length; i++) {
        //console.log(list[i].)
        if (list[i].kind == "file")
        { 
          //console.log(list[i].name)
          if ((list[i].name.split(".")[1]=="json"  && list[i].name != "tab2new.json" && list[i].name != "tab3new.json" && list[i].name != "tab4new.json")  )
          {
            await this.getFile(list[i].dir[1],"getcatalog");  
            
            
            if (xcatfile[0] != null)
            {if (xcatfile[0]["fcard"] != null)
            {if (xcatfile[0]["fcard"]["columns"]["catalog"] == null)
            {
              xframeindex=xframeindex+1
              xframefile["blocks"]["xline"+xframeindex]=JSON.parse(xfileline)
              xframefile["blocks"]["xline"+xframeindex]["items"]["filename"].value=list[i].name
              xframefile["blocks"]["xline"+xframeindex]["items"]["filename"].sortvalue = list[i].name;
              xframefile["blocks"]["xline"+xframeindex]["items"]["path"].value=path
              xframefile["blocks"]["xline"+xframeindex]["items"]["path"].sortvalue=path
              xframefile["blocks"]["xline"+xframeindex]["entry"]=list[i].dir[1]
              for (const [ckey, xcolumn] of Object.entries(xcatfile[0]["fcard"].columns)) {
                for (const [fkey, frame] of Object.entries(xcolumn.frames)) {
                  for (const [bkey, block] of Object.entries(frame.blocks)) {
                    for (const [ikey, ivalue] of Object.entries(block.items)) {
                      if (xframefile["blocks"]["xline"+xframeindex]["items"][ikey] != null)
                      {
                        xframefile["blocks"]["xline"+xframeindex]["items"][ikey].value = ivalue.value;
                        dom.messages.innerHTML =ivalue.value
                        xframefile["blocks"]["xline"+xframeindex]["items"][ikey].sortvalue = dom.messages.innerText;
                        xframefile["blocks"]["xline"+xframeindex]["items"][ikey].style["background-image"] = ivalue.style["background-image"];
                      }
                    }
                }
              }
            }}}
          }
          }
        }
      
        if (list[i].kind == "directory")
        { 
          const subdir = await dir.getDirectoryHandle(list[i].name, { create: false });
          await this.getallsubdir(subdir,"dir",level+1,path+"/"+list[i].name)}
      }
   
    }
    
  };


  this.getsubdir = async function (evt) {
    let elem = evt.target;
    console.log(elem)
    if (elem.parentElement.id== "recentDialog")
    {
      this.currentdir = this.basedir; 
       for (let i = 0; i < elem.dataset.id; i++) {
        try {
          const subdir = await this.currentdir.getDirectoryHandle(this.pathArr[i], { create: false });
          this.currentdir = subdir;
        } catch (error) {
          break
        }
       
      }
      this.showdir(this.currentdir,"dialog");
    }
    else
    if (elem.parentElement.id== "recentImage")
    {
      this.imgcurrentdir = this.basedir; 
       for (let i = 0; i < elem.dataset.id; i++) {
        try {
          const subdir = await this.imgcurrentdir.getDirectoryHandle(this.imgpathArr[i], { create: false });
          this.imgcurrentdir = subdir;
        } catch (error) {
          break
        }
       
      }
      this.showdir(this.imgcurrentdir,"img");
      setlevel(cv.level);
    }
    else
    {
      this.currentdir = this.basedir;
      let i=0;
      for (i = 0; i < elem.dataset.id; i++) {
        try {
          const subdir = await this.currentdir.getDirectoryHandle(this.pathArr[i], { create: false });
          this.currentdir = subdir;
        } catch (error) {
          break
        }
       
      }
      if (i < this.pathArr.length-1)
      {
        this.pathArr = await this.basedir.resolve(this.currentdir) || [];
        this.pathArr.push(" ")
        this.setfilebutton("dir");
        this.tabhandle[this.id]=this.currentdir
       
      }
     
      this.showdir(this.currentdir,"file");
    }
    
  }
  

  this.showdir = async function(dir,fid) {

    await verifyPermission(dir, true);
    let selectElement;
    if (this.id == "dialog")
    {selectElement = document.getElementById("dirDialog");}
    else
    if (fid == "img")
    {selectElement = document.getElementById("dirimages");}
    else
    {
      selectElement = document.getElementById("dirfiles");
      //this.tabhandle[cv.tabid]=dir
    }
    
    
    for (let i = selectElement.length - 1; i >= 0; i--) {
      selectElement.remove(i);
    }
    let i = 0;
    let list = [];
    try {
      for await (const entry of dir.entries()) {
        if (entry[0] == 'master' && cv.level <= 1)
        {}
        else
       { list.push({ kind: entry[1].kind, name: entry[0], index: i })
        i = i + 1;}
      };
      list.sort((a, b) => (a.kind > b.kind) ? 1 : (a.kind === b.kind) ? ((a.name > b.name) ? 1 : -1) : -1);
      for (let i = 0; i < list.length; i++) {
        let option = document.createElement("OPTION");
        option.value = list[i].index;
        option.dataset.name=list[i].name;
        option.text = list[i].name;
        selectElement.options[i] = option;
      }
    }
    catch  { // nicht Standard
      //setbasedir()
    }
    
  }
  
  this.DOButton = async function (evt) {
    let xfid = evt.target.dataset.id.split(".")[0];
    cv.desttabid = evt.target.dataset.id.split(".")[1]||"self";
    let buttoncmd = evt.target.dataset.id.split(".")[2]||"select";
    
    let xdomfilename=document.getElementById("filename")
    let selectElement;
    let xfilename ="";
    
    dom.status.innerText=xfid
    
    if (xfid == "reset") {
      await idbKeyval.clear();
      setbasedir();
    }
    if (xfid == "init") {
      setbasedir();
    }
    if (this.basedir == null || this.basedir == undefined) {
      setbasedir();
    }
    if (document.querySelector('[data-id="'+this.id+'"]')==null)
        {cv.tabid="tab1",this.id="tab1"}
    if (this.id == "dialog") {
      if (this.basedir == undefined || this.basedir == null ) {
        
        window.alert("Please select in the next window the directory 'projects' ")
        setbasedir()
      }
     selectElement = document.getElementById('dirDialog');
      await verifyPermission(this.basedir, true);
      if (this.currentdir.name == this.basedir.name) {
        this.currentdir = this.basedir;
        for (let i = 0; i < this.pathArr.length - 1; i++) {
          const subdir = await this.currentdir.getDirectoryHandle(this.pathArr[i], { create: false });
          this.currentdir = subdir;
        }
        this.showdir(this.currentdir, "dialog");
      }
    }
    else { selectElement = document.getElementById('dirfiles'); }
    if (xfid == "dir") {
      setbasedir();
    }
    if (xfid == "save"  ) {
      domtoobj()
      let i = 0;
      this.filedir=this.basedir;

      for (let i = 0; i <this.pathArr.length-1; i++) {
        const subdir = await this.filedir.getDirectoryHandle(this.pathArr[i], { create: false });
        this.filedir = subdir;
      }
      if (xdomfilename==null) 
      {xfilename=""}
      else
      { xfilename = xdomfilename.innerText;}
      console.log(this.filedir,xfilename)
      if (xfid == "save" ){
        let xtabf=xfilename.split(".")
        if (xtabf[0] == "" )
        {
          xtabf[0] = "dummy"
        }
        if (xtabf[1] == "JSON" ||  xtabf[1] == "json" )
        {

        }
        else
        {
          xfilename = xtabf[0]+ ".json"
          document.getElementById("filename").innerText=xfilename
        }
        
        if( xfilename == "")
        {
          dom.status.innerText="Error"
          dom.messages.innerText="no filename"
        }
        else
        {this.tabhandle[this.id] = await this.filedir.getFileHandle(xfilename,{create: true});
        //console.log(this.tabhandle[this.id])
        localStorage.setItem('save',  this.pathArr.join("/"));
        saveFile(JSON.stringify(xobj, 0, 0), this.tabhandle[this.id]);
        if (this.objcard != null)
        {
          let objcardfilename = storeparm.dialogname + storeparm.ind + ".json"
          let objcardhandle = await this.filedir.getFileHandle(objcardfilename,{create: true})
          saveFile(JSON.stringify(this.objcard, 0, 0), objcardhandle);
        }
        cv.change[this.id] = false
        document.querySelectorAll('[data-id="save"]').forEach(function (xdiv) {xdiv.style.backgroundColor = "rgb(199, 199, 199)"})
        document.querySelector('[data-id="'+this.id+'"]').innerText= this.tabhandle[this.id].name.split(".")[0]
        // alle speichern
        dom.status.innerText="OK"
        dom.messages.innerText="file save"}
      }
      
      
      
    }
    if (xfid == "openimg") {
      const stext = selectElement.options[selectElement.selectedIndex].text;
      if (this.basedir.name == "projects") {
        imgpath = "./" + this.basedir.name + "/" + this.pathArr.join("/") + "/" + stext;
      }
      else {
        imgpath = "./projects/" + this.basedir.name + "/" + this.pathArr.join("/") + "/" + stext;
      }
      this.imgitem.src = imgpath;
      this.imgitem.parentElement.dataset.value = imgpath;
      await idbKeyval.set("img", imgpath);

    }
    if (xfid == "sort" ) {
      for (const [ckey, column] of Object.entries(objcard.columns)) {
        for (const [fkey, frame] of Object.entries(column.frames)) {
          if (fkey == "framefile")
          {xframefile=frame; break;}
        }
      }
      xframefile.blocks = Object.fromEntries(
          Object.entries(xframefile.blocks).sort(([,a],[,b]) =>  (a.items[cv.desttabid].sortvalue >= b.items[cv.desttabid].sortvalue) ? 1 : -1))
      clearmainpage();
      createFcard()
      objtodom();
      setbuttons(cv.buttons)
    }
    if (xfid == "open" ) {
      
      if (buttoncmd == "select")
      {xfilename ="";
      try {
        xfilename = selectElement.options[selectElement.selectedIndex].innerText;
      } 
      catch (error) {
        xfilename = document.getElementById("filename").innerText
      }
      console.log(xfilename,cv.desttabid,this.id,this.currentdir.entries())
      for await (const entry of this.currentdir.entries()) {
        console.log(entry)
        if (entry[1].name == xfilename) {

          if (entry[1].kind == "directory") {
          this.pathArr = await this.basedir.resolve(entry[1]) || [];
          this.pathArr.push(" ")
          this.tabhandle[this.id]=entry[1];
          console.log(this.pathArr)
          await idbKeyval.set(this.id + "path", this.pathArr);
          await idbKeyval.set(this.id, this.tabhandle[this.id]);
            this.setfilebutton("dir");
            this.currentdir = entry[1];
            this.showdir(this.currentdir,this.id);
          }
          if (entry[1].kind == "file") { 
            await this.getFile(entry[1],xfid);  
            document.querySelectorAll('[data-id="save"]').forEach(function (xdiv) {xdiv.style.backgroundColor = "rgb(199, 199, 199"})
            document.querySelector('[data-id="'+this.id+'"]').innerText= entry[1].name.split(".")[0]
            if (layout.id==this.id) {layout.id="";layout.obj={}}
            if (this.id == "dialog")
            {
              document.getElementById('ButtonTrainMain').style.display=""
              document.getElementById('FCdialogfile').close();
            }
          } 
          break;
        }
      }
      console.log(xfilename,cv.desttabid,this.id)}
      if (buttoncmd == "line")
      {
        //console.log(evt.target.parentElement)
        let xentry=(xframefile["blocks"][evt.target.parentElement.dataset.id]["entry"])
        
       if (xentry.kind == "file") { 
            await this.getFile(xentry,xfid); 
            document.querySelectorAll('[data-id="save"]').forEach(function (xdiv) {xdiv.style.backgroundColor = "rgb(199, 199, 199"})
            document.querySelector('[data-id="'+this.id+'"]').innerText= xentry.name.split(".")[0]
          } 
      }
    };
    if ( xfid == 'importcsv') {
     
      
    }
    if (xfid == "newdir" ) {
      
      xfilename = prompt("Please enter the new directoryname"," ")
      if (xfilename !=null && xfilename != " ")
        {
            this.currentdir.getDirectoryHandle(xfilename,{create: true});
            this.showdir(this.currentdir,this.id);
        }
    
      
    };
    if (xfid == "remove" ) {
      
      {xfilename ="";
      try {
        xfilename = selectElement.options[selectElement.selectedIndex].innerText;
      } 
      catch (error) {
        xfilename = document.getElementById("filename").innerText
      }
      
      for await (const entry of this.currentdir.entries()) {
        if (entry[1].name == xfilename) {

          if (entry[1].kind == "directory") {
            if (confirm("Delete directory: " + xfilename))
            {this.currentdir.removeEntry(xfilename,{recursive: true})
            this.showdir(this.currentdir,this.id);}
          }
          if (entry[1].kind == "file") { 
            if (confirm("Delete file: " + xfilename)){
            this.currentdir.removeEntry(xfilename)
            this.showdir(this.currentdir,this.id);
            }
          } 
          break;
        }
      }
    }};
    if (xfid == "removeimg" ) {
      selectElement = document.getElementById('dirimages');
      xfilename ="";
      try {
        xfilename = selectElement.options[selectElement.selectedIndex].innerText;
      } 
      catch (error) {
        xfilename = document.getElementById("filename").innerText
      }
      
      for await (const entry of this.imgcurrentdir.entries()) {
        if (entry[1].name == xfilename) {
          if (entry[1].kind == "file") { 
            if (confirm("Delete image: " + xfilename)){
            this.imgcurrentdir.removeEntry(xfilename)
            this.showdir(this.imgcurrentdir,"img");
            }
          } 
          break;
        }
      }
      };
    if (xfid == "setlayout" ) {
      layout.id=this.id
      layout.obj = JSON.parse(JSON.stringify(xobj[0]));
   }
   if (xfid == "getcatalog" ) {
    xfilename ="";
    xframefile=null;
    xframeindex=0;
  
    xobj=mastercatalog;
    objcard = xobj[0]['fcard']
    objstore = xobj[0]['fcard']['store']
    
    for (const [ckey, column] of Object.entries(objcard.columns)) {
      for (const [fkey, frame] of Object.entries(column.frames)) {
        if (fkey == "framefile")
          {xframefile=frame; 
            for (const key in xframefile.blocks) {
              if (key != "fileline") {
                delete xframefile.blocks[key];
              }
              if (key == "fileline") {
                xfileline = JSON.stringify(xframefile.blocks[key]);
                delete xframefile.blocks[key];
              }
            }
          }
      }
    }
    if (selectElement.selectedIndex >= 0)  
      {
        xfilename = selectElement.options[selectElement.selectedIndex].innerText;
        for await (const entry of this.currentdir.entries()) {
          if (entry[1].name == xfilename) {
            if (entry[1].kind == "directory") {
              let xpathArr = await this.basedir.resolve(entry[1]) || [];
              await this.getallsubdir(entry[1],this.id,0,xpathArr.join("/"));
            }
            else
            {
              let xpathArr = await this.basedir.resolve(this.currentdir) || [];
              await this.getallsubdir(this.currentdir,this.id,0,xpathArr.join("/"));
            }
            break;
          }
        }
      } 
    else
      {
        let xpathArr = await this.basedir.resolve(this.currentdir) || [];
        await this.getallsubdir(this.currentdir,this.id,0,xpathArr.join("/"));
        
      }
    xframefile.blocks = Object.fromEntries(
    Object.entries(xframefile.blocks).sort(([,a],[,b]) =>  (a.items.filename.value > b.items.filename.value) ? 1 : -1))
    clearmainpage();
    await idbKeyval.set(this.id+"FCcard", JSON.stringify(xobj));
    xtabobj[this.id] = JSON.parse(JSON.stringify(xobj));
    createFcardButtons()
    createFcard()
    objtodom();
    setbuttons(cv.buttons)
    
 }
   if (xfid == "updatelayout" ) {
     cv.change[this.id] = true
     domtoobj();
     clearmainpage();
     tx_obj = JSON.parse(JSON.stringify(layout.obj));
     updateobj(tx_obj.fcard,objcard)
     xobj[0]=JSON.parse(JSON.stringify(tx_obj));
     objcard = xobj[0]['fcard']
     objstore = xobj[0]['fcard']['store']
     FCX = document.getElementById("FC0");
     if (!FCX) { createFcard(); FCX = document.getElementById("FC0"); };
     objtodom();
     createFcardButtons()
     initDcard()
   }
   if (xfid == 'imagecopy') {
    const pickerOpts = {
      types: [
        {
          description: "Images",
          accept: {
            "image/*": [".png", ".gif", ".jpeg", ".jpg"],
          },
        },
      ],
      excludeAcceptAllOption: true,
      multiple: false,
    };
   
    //console.log(this.imgcurrentdir)
    this.getcopyfile(pickerOpts,this.imgcurrentdir )
    this.showdir(this.imgcurrentdir,"img");
  }
  if (xfid == 'filecopy') {
    const pickerOpts = {
      types: [
        {
          description: "JSON",
          accept: {
            "txt/*": [".json", ".JSON"],
          },
        },
      ],
      excludeAcceptAllOption: true,
      multiple: false,
    };
   
    //console.log(this.imgcurrentdir)
    this.getcopyfile(pickerOpts,this.currentdir )
    this.showdir(this.currentdir,this.id);
  }
   console.log(this.id,xfid,xfilename)
   this.updatechange()
  }

  this.dblclick = async function (evt) {
    
    let elem = evt.target;
    let i = 0;
    init
    for await (const entry of this.currentdir.entries()) {
      if (entry[1].name == elem.dataset.name) {
        
        if (entry[1].kind == "directory") {
          this.currentdir=entry[1];
          this.pathArr = await this.basedir.resolve(entry[1]) || [];
          this.pathArr.push(" ")
          this.setfilebutton("dir");
          this.tabhandle[this.id]=entry[1];
          await idbKeyval.set(this.id + "path", this.pathArr);
          await idbKeyval.set(this.id, this.tabhandle[this.id]);
          this.showdir(this.currentdir,"file");
        }
        if (entry[1].kind == "file" ) {
          this.pathArr = await this.basedir.resolve(entry[1]) || [];
          this.tabhandle[this.id]=entry[1];
          await idbKeyval.set(this.id + "path", this.pathArr);
          await idbKeyval.set(this.id, this.tabhandle[this.id]);
          this.setfilebutton("file");
        }
        break;
      }
      i += 1;
    };
  }
  this.imgdblclick = async function (evt) {
    let elem = evt.target;
    let i = 0;
    init
    for await (const entry of this.imgcurrentdir.entries()) {
      if (entry[1].name == elem.dataset.name) {
        if (entry[1].kind == "directory") {
          this.imgcurrentdir = entry[1];
          this.imgpathArr = await this.basedir.resolve(entry[1]) || [];
          this.imgpathArr.push(" ")
          this.setimagebutton("dir");
          await idbKeyval.set("imgpath", this.imgpathArr);
          this.showdir(this.imgcurrentdir, "img");
          setlevel(cv.level)

        }
      }
      i += 1;
    };
  }
  this.onchange = async function (evt) {
    let elem = evt.target;
    let imgpath = "";
    if (elem.id == "dirimages") {
      let selectElement = document.getElementById('dirimages');
      const stext = selectElement.options[selectElement.selectedIndex].text;
      if (this.basedir.name == "projects") {
        imgpath = "./" + this.basedir.name + "/" + this.imgpathArr.join("/") 
      }
      else {
        imgpath = "./projects/" + this.basedir.name + "/" + this.imgpathArr.join("/") 
      }
      imgpath=imgpath.trim() + stext;
      
      //console.log("thisimg",this.imgitem);
      //console.log("thisparent",this.imgitem.parentElement);
      dom.preimg = document.getElementById('preimg');
      dom.preimg.src = imgpath;
      dom.preimg.dataset.id = imgpath;
      await idbKeyval.set("imgpath", this.imgpathArr);
      await idbKeyval.set("img", imgpath);
      setlevel(cv.level)

    };

  }
  this.updatechange = function ()
{
    document.querySelectorAll('[data-id="save"]').forEach(function (xdiv) { xdiv.style.backgroundColor = "rgb(199, 199, 199)" })
    for (let xid of ["tab1", "tab2", "tab3", "tab4"]) {
      let domxtab = document.querySelector('[data-id="' + xid + '"]')
      if (domxtab != null) {
        domxtab.style.backgroundColor = ""
        if (this.tabhandle[xid].name != null) {
          if (cv.change[xid] == false) {
            domxtab.innerText = this.tabhandle[xid].name.split(".")[0]
          }
          else {
            domxtab.innerText = this.tabhandle[xid].name.split(".")[0] + "*"
          }
        }
        if (xid == layout.id) {
          domxtab.style.backgroundColor = "rgb(255, 0, 0)"
        }
      }
    }
}
this.getcopyfile = async function (pickeropts,path)
  {
    const [oldHandle] = await window.showOpenFilePicker(pickeropts);
    const copyfilehandler = await oldHandle.getFile();
    let copydata = await readAsArrayBuffer(copyfilehandler)
    let newHandle = await path.getFileHandle(copyfilehandler.name,{create: true});
    saveFile(copydata,newHandle)
  }
  this.storeobj = async function (store_obj)
  {
    await idbKeyval.set(this.id+"FCcard", JSON.stringify(store_obj));
  }
  this.storeobjcard = async function () {
    if (this.objcard != null) {
      let objcardfilename = storeparm.dialogname  + "dialog.json"
      let objcardhandle = await this.currentdir.getFileHandle(objcardfilename, { create: true })
      saveFile(JSON.stringify(this.objcard, 0, 0), objcardhandle);
    }
  }
  this.gettraincard = async function () {
    this.basedir = await idbKeyval.get('basedir') || null;
    if (this.basedir == undefined || this.basedir == null ) {
     window.alert("Please select in the next window the directory 'projects' ")
      setbasedir()
    }
    await verifyPermission(this.basedir, true);
    if (this.currentdir == null)
    { this.currentdir = this.basedir}
    
    if (this.currentdir  != null) {
     
      if (this.currentdir.name == this.basedir.name) {
        this.currentdir = this.basedir;
        for (let i = 0; i < this.pathArr.length - 1; i++) {
          
          const subdir = await this.currentdir.getDirectoryHandle(this.pathArr[i], { create: false });
          
          this.currentdir = subdir;
        }

        this.showdir(this.currentdir, "dialog");
        let traincardfile = null
        
        try {
          traincardfile = await this.currentdir.getFileHandle(storeparm.dialogname + "dialog.json", { create: false });
        } catch (error) {
          
        }
        
        
        if (traincardfile != null) {
          const traincardData = await traincardfile.getFile();
          if (traincardData != null) {
            {
              let result = await readData(traincardData);
              this.objcard = JSON.parse(result);
              objcard = this.objcard[0]['fcard']
              return;
            }
          }
        }
      }
    }


    const dirmaster = await this.basedir.getDirectoryHandle("master", { create: false });
    if (dirmaster != null) {
      const dirtemplate = await dirmaster.getDirectoryHandle("templates", { create: false });
      if (dirtemplate != null) {
        const dirtrain = await dirtemplate.getDirectoryHandle("trains", { create: false });
        if (dirtrain != null) {
          const traincardfile = await dirtrain.getFileHandle(storeparm.dialogname + ".json", { create: false });
          if (traincardfile != null) {
            const traincardData = await traincardfile.getFile();
            if (traincardData != null) {
              {
                let result = await readData(traincardData);
                this.objcard = JSON.parse(result);
                objcard = this.objcard[0]['fcard']
              }
            }
          }
        }
      }
    }
  }
};


function listFonts() {
  // wird nicht genutzt
  let { fonts } = document;
  const it = fonts.entries();

  let arr = [];
  let done = false;

  while (!done) {
    const font = it.next();
    if (!font.done) {
      arr.push(font.value[0].family);
    } else {
      done = font.done;
    }
  }

  // converted to set then arr to filter repetitive values
  return [...new Set(arr)];
}

async function setbasedir()
{
  const handle = await window.showDirectoryPicker();
  //console.log(handle)
  if (handle.name != "projects")
  {
    window.alert("Wrong directory, not  'projects' ")
  }
  else
  {
    await idbKeyval.set("basedir", handle);
    await idbKeyval.set("winlocation", window.location.href);
    location.reload();
  }
}