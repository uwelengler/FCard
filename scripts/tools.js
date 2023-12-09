"use strict";
  
  function isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item));
  }
  function deepMerge(target, source) {
    if (typeof target !== 'object' || typeof source !== 'object') return false; // target or source or both ain't objects, merging doesn't make sense
    for (var prop in source) {
      if (source[prop] == null) continue;
      if (!source.hasOwnProperty(prop)) continue; // take into consideration only object's own properties.
      if (prop in target) { // handling merging of two properties with equal names
        
        if (typeof target[prop] !== 'object') {
          
            target[prop] = source[prop];
         
         
        } else {
          if (typeof source[prop] !== 'object') {
            
              target[prop] = source[prop];
            
          } else {
            
            if (target[prop].concat && source[prop].concat) { // two arrays get concatenated
              target[prop] = target[prop].concat(source[prop]);
            } else { // two objects get merged recursively
              target[prop] = deepMerge(target[prop], source[prop]);
            }
          }
        }
      } else { // new properties get added to target
        target[prop] = source[prop];
      }
    }
    return target;
  }
  
  async function saveFile(Blob,fileHandle) {
    //console.log(fileHandle.name,Blob)
    if (fileHandle != null) {
      const writableStream = await fileHandle.createWritable();
      await writableStream.write(Blob);
      await writableStream.close();
    }
    else {
      const newHandle = await window.showSaveFilePicker();
      const writableStream = await newHandle.createWritable();
      await writableStream.write(Blob);
      await writableStream.close();
    }
    
  }
  async function openFile(pickersoption) {
      const newHandle = await window.showOpenFilePicker(pickersoption);
      const fileData = await newHandle.getFile();
      await readStream.read(Blob);
      await readStream.close();
     
    
  }
  function inclcl(xitem, xstr) {
    if (xitem.className) {
      return (xitem.className.includes(xstr));
    }
    else { return (false); }
  }
  function parsecsvData(data){
    let csvData = [];
    let lbreak = data.split("\n");
    lbreak.forEach(res => {
        csvData.push(res.split("|").map(x => x.replace(/^"+|"+$/g, '')));
    });
    return csvData;
  }
  function parsetobiData(data){
  let csvData = [];
  let lbreak = data.split("\n");
  csvData.push([]);
  csvData.push([]);
  csvData[0][0]="tobi";
  csvData[1][0]="0";
  var xepoche=""
  lbreak.forEach(res => {
    //console.log(res+"**")
      xx=res.split("=");
      
      if (xx.length > 1)
      {
        if (xx[0].trim() =="epoche" )
        {
         xepoche="gattung_ep"+xx[1].trim()
        }
        if (xx[0].trim() ==xepoche)
        {
          csvData[0].push("eratext");
          csvData[1].push(xx[1].trim());
        }
        csvData[0].push(xx[0].trim());
        csvData[1].push(xx[1].trim());
      }
     
      
  });
  return csvData;
  }

async function verifyPermission(fileHandle, withWrite) {
  const opts = {};
  if (withWrite) {
    opts.writable = true;
    // For Chrome 86 and later...
    opts.mode = 'readwrite';
  }
  // Check if we already have permission, if so, return true.
  if (await fileHandle.queryPermission(opts) === 'granted') {
    return true;
  }
  // Request permission to the file, if the user grants permission, return true.
  if (await fileHandle.requestPermission(opts) === 'granted') {
    return true;
  }
  // The user did nt grant permission, return false.
  return false;
}
function readAsArrayBuffer(file)
{
 return new Promise((resolve, reject) => {
    let fr = new FileReader();
    fr.onload = x=> resolve(fr.result);
    fr.readAsArrayBuffer(file) 
  })
}

function readData(file)
{
  return new Promise((resolve, reject) => {
    let fr = new FileReader();
    fr.onload = x=> resolve(fr.result);
    fr.readAsText(file) // 
})}

function setactivtab(ytabid)
{
  var buttons = document.getElementsByClassName('buttontab')
    if (buttons != undefined) {
      Array.from(buttons).forEach(button => {
        
        if (button.dataset.id  == ytabid)
        {
          button.classList.add('buttonon')
        }
        else
        {
          button.classList.remove('buttonon')
        }
      })
    }
   

}
function unEscape(htmlStr) {
  htmlStr = htmlStr.replace(/&lt;/g , "<");	 
  htmlStr = htmlStr.replace(/&gt;/g , ">");     
  htmlStr = htmlStr.replace(/&quot;/g , "\"");  
  htmlStr = htmlStr.replace(/&#39;/g , "\'");   
  htmlStr = htmlStr.replace(/&amp;/g , "&");
  return htmlStr;
}

function rgbToHex(a){
  if (a=="") {a="rgb(0,0,0)"}
  a=a.replace(/[^\d,]/g,"").split(","); 
  return"#"+((1<<24)+(+a[0]<<16)+(+a[1]<<8)+ +a[2]).toString(16).toUpperCase().slice(1)
}
function decToHex(decimal, length) {
  const hexadecimal = decimal.toString(16);
  return hexadecimal.padStart(length, '0');
  }