// hier sind alle grundlegenden config einstellungen abgelegt
var pgmversion = "1.13.2023.07.08";


var tabcheckboxes =
{
    "color": {
        "className": "FCcheckbox",
        "checked": true,
        "label": {
            "de": "Farbe",
            "en": "color"
        },
        "dataset": {
            "value": "data-color",
            "xtrue": "color",
            "xfalse": "none",
            "id": "color",
            "class": "FCpage",
            "color": "color"
        }
    },
    "border": {
        "className": "FCcheckbox",
        "label": {
            "de": "Rand",
            "en": "border"
        },
        "dataset": {
            "value": "data-border",
            "xtrue": "border",
            "xfalse": "none",
            "id": "border",
            "class": "FCpage",
            "border": "border"
        },
        "checked": true
    },
    "rotatep2": {
        "className": "FCcheckbox",
        "label": {
            "de": "Seite 2 drehen",
            "en": "page 2 rotate"
        },
        "dataset": {
            "value": "data-rotate",
            "xtrue": "180",
            "xfalse": "none",
            "id": "rotatep2",
            "name": "page2",
            "class": "FCpage"
        },
        "checked": true
    },
    "printp3": {
        "className": "FCcheckbox",
        "label": {
            "de": "Seite 3 drucken",
            "en": "page 3 print"
        },
        "dataset": {
            "value": "data-print",
            "xtrue": "on",
            "xfalse": "none",
            "id": "printp3",
            "name": "page3",
            "class": "FCpage"
        },
        "checked": false
    },
    "riv": {
        "className": "FCcheckbox",
        "label": {
            "de": "RIV Symbol",
            "en": "RIV symbol"
        },
        "dataset": {
            "value": "data-backgroundimage",
            "xtrue": "on",
            "xfalse": "none",
            "id": "riv",
            "name": "riv",
            "class": "FCvalue"
        },
        "checked": false
    },
    "modelrailsignalsystem": {
        "className": "FCcheckbox",
        "label": {
            "de": "Widerstandsachse",
            "en": "resitoraxle"
        },
        "dataset": {
            "value": "data-backgroundimage",
            "xtrue": "on",
            "xfalse": "none",
            "id": "modelrailsignalsystem",
            "name": "modelrailsignalsystem",
            "class": "FCvalue"
        },
        "checked": false
    },
    "wagoncarriertruck": {
        "className": "FCcheckbox",
        "label": {
            "de": "Rollbockfähig",
            "en": "wagoncarriertruck"
        },
        "dataset": {
            "value": "data-backgroundimage",
            "xtrue": "on",
            "xfalse": "none",
            "id": "wagoncarriertruck",
            "name": "wagoncarriertruck",
            "class": "FCvalue"
        },
        "checked": false
    },
    "fast": {
        "className": "FCcheckbox",
        "label": {
            "de": "Schneller Läufer",
            "en": "fast car"
        },
        "dataset": {
            "value": "data-visibility",
            "xtrue": "visible",
            "xfalse": "hidden",
            "id": "fast"
        },
        "checked": false
    },
    "superfast": {
        "className": "FCcheckbox",
        "label": {
            "de": "Sehr schneller Läufer",
            "en": "superfast car"
        },
        "dataset": {
            "value": "data-visibility",
            "xtrue": "visible",
            "xfalse": "hidden",
            "id": "superfast"
        },
        "checked": false
    },
    "heater": {
        "className": "FCcheckbox",
        "label": {
            "de": "Heizungsleitung",
            "en": "heater"
        },
        "dataset": {
            "value": "data-visibility",
            "xtrue": "visible",
            "xfalse": "hidden",
            "id": "heater line"
        },
        "checked": false
    },
    "electro": {
        "className": "FCcheckbox",
        "label": {
            "de": "Elektroleitung",
            "en": "electro line"
        },
        "dataset": {
            "value": "data-visibility",
            "xtrue": "visible",
            "xfalse": "hidden",
            "id": "electro"
        },
        "checked": false
    },
    "anchor": {
        "className": "FCcheckbox",
        "label": {
            "de": "Fährbootanker",
            "en": "anchor"
        },
        "dataset": {
            "value": "data-backgroundimage",
            "xtrue": "on",
            "xfalse": "none",
            "id": "anchor",
            "name": "anchor",
            "class": "FCvalue"
        },
        "checked": false
    }
}
var menuoptions = {
    "setwith": {
        "label": "Breite setzen",
        "cmd": "setwith",
        "function": "doline"
    },
    "opencomponentbook": {
        "label": "BFO anzeigen",
        "cmd": "open",
        "function": "docomponentbook"
    },
    "openjobtrainbook": {
        "label": "Buchfahrplan",
        "cmd": "open",
        "function": "dojobtrainbook"
    },
    "openobjects": {
        "label": "trainsets anzeigen",
        "cmd": "open",
        "function": "doobject"
    },
    "opentrainsets": {
        "label": "trainsets anzeigen",
        "cmd": "opentrainsets",
        "function": "doopenobject"
    },
    "setcolorline": {
        "label": "Farbe setzen",
        "cmd": "setcolor",
        "function": "doline"
    },
    "newgraphicline": {
        "label": "Neue Fahrplanlinie",
        "cmd": "new",
        "function": "doline"
    },
    "opengraphic": {
        "label": "Bildfahrplan anzeigen",
        "cmd": "opengraphic",
        "function": "doline"
    },
    "opengraphicwindow": {
        "label": "Bildfahrplan im Fenster anzeigen",
        "cmd": "opengraphicwindow",
        "function": "doline"
    },
    "savetrain": {
        "label": "Speichern",
        "cmd": "store",
        "function": "dostore"
    },
    "createline": {
        "label": "Zeile erstellen",
        "cmd": "create",
        "function": "dostoreline"
    },
    "newline": {
        "label": "Zeile einfügen",
        "cmd": "new",
        "function": "dostoreline"
    },
    "copyline": {
        "label": "Zeile kopieren",
        "cmd": "copy",
        "function": "dostoreline"
    },
    "deleteline": {
        "label": "Zeile löschen",
        "cmd": "delete",
        "function": "dostoreline"
    },
    "newtrain": {
        "label": "Zug anlegen",
        "cmd": "new",
        "function": "dotrain"
    },
    "opentrain": {
        "label": "Zug anzeigen",
        "cmd": "open",
        "function": "dotrain"
    },
    "printtrain": {
        "label": "Zug drucken",
        "cmd": "print",
        "function": "dotrain"
    },
    "copytrain": {
        "label": "Zug kopieren",
        "cmd": "copy",
        "function": "dotrain"
    },
    "deletetrain": {
        "label": "Zug löschen",
        "cmd": "delete",
        "function": "dotrain"
    },
    
    "createtrainline": {
        "label": "Zeile erstellen",
        "cmd": "create",
        "function": "dotrainline"
    },
    "newtrainline": {
        "label": "Zeile einfügen",
        "cmd": "new",
        "function": "dotrainline"
    },
    "copytrainline": {
        "label": "Zeile kopieren",
        "cmd": "copy",
        "function": "dotrainline"
    },
    "deletetrainline": {
        "label": "Zeile löschen",
        "cmd": "delete",
        "function": "dotrainline"
    },
    "recomptrain": {
        "label": "Zug aktualisieren",
        "cmd": "recomp",
        "function": "updatetrain"
    },
    "locktime": {
        "label": "unlock",
        "cmd": "lock",
        "function": "fctimelock"
    }
}
// standeinstellung für die Felder 
var tabheight =
{
    "dirfiles": "30mm",
    "dirimages": "20mm",
    "editbox": "10mm",
    "checkboxes": "60mm",
    "divcolorfields": "30mm",
    "domlist": "20mm"
}
// storage für farben
var tabcolor =
{
    "typE": "#FDA3C1",
    "typF": "#FF02C8",
    "typG": "#FBEB9D",
    "typH": "#FF834A",
    "typT": "#EB9509",
    "typI": "#E3DEDE",
    "typL-Ui-Uai": "#6495ED",
    "typK-O": "#56EB9A",
    "typR-S": "#1F7743",
    "typZ-Uc": "#888888",
    "typDienst": "#8B4513",
    "typLok": "#FF0000",
    "typPWagen": "#106410",
    "colorwhite": "#FFFFFF",
    "colorblack": "#000000",
    "colorclear": "",
    "SBFblack": "#3E3737",
    "SBFgreen": "#5AF207",
    "SBFblue": "#4AB8E8",
    "SBFred": "#FD3030",
    "SBFbrown": "#EC8E22",
    "SBFyellow": "#F9EC34",
    "usersign": "#BA34F9",
    "linegreen": "#5AF207",
    "lineblue": "#4AB8E8",
    "linered": "#FD3030",
    "line": "#000000"
};
// Standardfarben
var tabcolorst =
{
    "typE": "#FDA3C1",
    "typF": "#FF02C8",
    "typG": "#FBEB9D",
    "typH": "#FF834A",
    "typT": "#EB9509",
    "typI": "#E3DEDE",
    "typL-Ui-Uai": "#6495ED",
    "typK-O": "#56EB9A",
    "typR-S": "#1F7743",
    "typZ-Uc": "#888888",
    "typDienst": "#8B4513",
    "typLok": "#FF0000",
    "typPWagen": "#006400",
    "colorwhite": "#FFFFFF",
    "colorblack": "#000000",
    "colorclear": "",
    "SBFblack": "#3E3737",
    "SBFgreen": "#5AF207",
    "SBFblue": "#4AB8E8",
    "SBFred": "#FD3030",
    "SBFbrown": "#EC8E22",
    "SBFyellow": "#F9EC34",
    "usersign": "#BA34F9",
    "linegreen": "#5AF207",
    "lineblue": "#4AB8E8",
    "linered": "#FD3030",
    "line": "#000000"
};
/*var userstore =
[{"fcard":{"creator":"Uwe Lengler","crdate":"2020.02.04","version":"1.0","className":"FCcard","buttons":["setuserstorage"],"pages":{"page1":{"className":"FCpage FCcolor ","style":{"border-color":"rgb(253, 163, 193)","background-color":"rgb(253, 163, 193)"},"dataset":{"display":"on","visibility":"visible","checkbox":"color","color":"none"}}},"columns":{"column1":{"className":"FCcolumn FCtypI","page":"page1","style":{"width":"100%","height":"35mm","border-style":"none"},"frames":{"fr1":{"className":"FCframe","style":{"width":"100%"},"blocks":{"block1":{"className":"FCblock","style":{"width":"100%"},"items":{"_userstorage":{"className":"FClabel  FCcenter ","value":"Ablage","style":{"width":"100%","border-style":"solid"},"dataset":{"display":"on","visibility":"visible"}},"userstorage":{"className":"FCvalue FCleft","value":"<span style=\"font-family: TrainSymbol\" data-id=\"fontsel\" class=\"FCspan\"></span><div><span style=\"font-family: DIN1451Mittelschrift\" data-id=\"fontsel\" class=\"FCspan\">246 0 697 - <span style=\"font-size: 90%\" data-id=\"fontset\" class=\"FCspan\">0</span></span><div><span style=\"font-family: DIN1451Mittelschrift\" data-id=\"fontsel\" class=\"FCspan\"><span style=\"font-size: 100%\" data-id=\"fontset\" class=\"FCspan\">012345678</span></span><span style=\"font-family: TrainSymbol\" data-id=\"fontsel\" class=\"FCspan\"></span></div><div>__________</div></div>","style":{"width":"100%","height":"30mm","border-style":"solid"},"dataset":{"display":"on","visibility":"visible"}}},"dataset":{"display":"on","visibility":"visible"}}},"dataset":{"display":"on","visibility":"visible"}}},"dataset":{"display":"on","visibility":"visible"}}}}}]*/

// texte nach language für die HTMl-Felder (Buttons,...)
var tablang =

{
    "de":
    {
        "open": { "title": "Datei öffnen", "value": "öffnen" },
        "save": { "title": "Datei speichenr", "value": "speichern" },
        "append": { "title": "Karte anhängen", "value": "anhängen" },
        "update": { "title": "update", "value": "update" },
        "dir": { "title": "Projekt Zeichniss auswählen", "value": "Verzeichniss" },
        "getconvertdata": { "title": "Tabelle Umsetzung mimportieren", "value": "Umsetzungstabelle" },
        "file": { "title": "Datei", "value": "Datei" },
        "card": { "title": "Karte bearbeiten", "value": "Karte" },
        "img": { "title": "Zeichung auswählen", "value": "Zeichnung" },
        "tool": { "title": "Werkzeuge", "value": "Werkzeuge" },
        "labelgroupsel": { "title": "Gruppe auswählen", "value": "Gruppe" },
        "labelblocksel": { "title": "Block asuwahlen", "value": "Block" },
        "labellanguage": { "title": "Sprache auswählen", "value": "Sprache" },
        "labelwithcolumn": { "title": "Spalte", "value": "Spalte" },
        "labelwithleft": { "title": "linke", "value": "linke" },
        "labelwithmiddle": { "title": "Mitte", "value": "Mitte" },
        "labelwithright": { "title": "Rechte", "value": "Rechte" },
        "labelwith": { "title": "Breite", "value": "Breite" },
        "labelcard": { "title": "Karte", "value": "Karte" },
        "labelpage": { "title": "Seite", "value": "Seite" },
        "labelcolumn": { "title": "Spalte", "value": "Spalte" },
        "labelblock": { "title": "Block", "value": "Block" },
        "labelfield": { "title": "Feld", "value": "Feld" },
        "showcard": { "title": "Karte anzeigen", "value": "Karte" },
        "delete": { "title": "löschen", "value": "löschen" },
        "copy": { "title": "kopieren", "value": "kopieren" },
        "showhelp": { "title": "Hilfe anzeigenHilfe" },
        "showtab": { "title": "Tabellen anzeigenTabelle" },
        "prev": { "title": "zurrückzurück" },
        "next": { "title": "vorwärtsvorwärts" },
        "copy": { "title": "kopierenkopieren" },
        "delete": { "title": "löschen" },
        "undo": { "title": "zurücknehmen" },
        "print": { "title": "drucken" },
        "unbold": { "title": "normal" },
        "bold": { "title": "fett" },
        "superscript": { "title": "hoch" },
        "subscript": { "title": "tief" },
        "fontup": { "title": "font größer" },
        "fontdown": { "title": "font kleiner" },
        "iconon": { "title": "Icon an" },
        "iconoff": { "title": "Icon aus" },
        "removeformat": { "title": "Formatierung entfernen" },
        "imageon": { "title": "Bild an" },
        "imageoff": { "title": "Bild aus" },
        "cardborder": { "title": "Rand", "value": "Rand" },
        "cardback": { "title": "Hintergrund", "value": "Hintergrund" },
        "cardfont": { "title": "Zeichensatz", "value": "Zeichensatz" },
        "pageborder": { "title": "Rand", "value": "Rand" },
        "pageback": { "title": "Hintergrund", "value": "Hintergrund" },
        "pagefont": { "title": "Zeichensatz", "value": "Zeichensatz" },
        "blockback": { "title": "Hintergrund", "value": "Hintergrund" },
        "blockfont": { "title": "zeichensatz", "value": "zeichensatz" },
        "fieldback": { "title": "Hintergrund", "value": "Hintergrund" },
        "fieldfont": { "title": "Zeichensatz", "value": "Zeichensatz" },
        "FCtypE": { "title": "E", "value": "E" },
        "FCtypF": { "title": "F", "value": "F" },
        "FCtypG": { "title": "G", "value": "G" },
        "FCtypH": { "title": "H", "value": "H" },
        "FCtypT": { "title": "T", "value": "T" },
        "FCtypI": { "title": "I", "value": "I" },
        "FCtypL-Ui-Uai": { "title": "L-Ui-Uai", "value": "L-Ui-Uai" },
        "FCtypK-O": { "title": "K-O", "value": "K-O" },
        "FCtypR-S": { "title": "R-S", "value": "R-S" },
        "FCtypZ-Uc": { "title": "Z-Uc", "value": "Z-Uc" },
        "FCtypDienst": { "title": "Dienstwagen", "value": "Dienst" },
        "FCtypLok": { "title": "Lokomotive", "value": "Lok" },
        "FCtypPWagen": { "title": "Personenwagen", "value": "P-Wagen" },
        "FCcolorclear": { "title": "transparent", "value": "transparent" },
        "FCSBFblack": { "title": "SBF schwarz", "value": "SBF schwarz" },
        "FCSBFgreen": { "title": "SBF grün", "value": "SBF grün" },
        "FCSBFred": { "title": "SBF rot", "value": "SBF rot" },
        "FCSBFblue": { "title": "SBF blau", "value": "SBF blau" },
        "FCSBFbrown": { "title": "SBF braun", "value": "SBF braun" },
        "FCSBFyellow": { "title": "SBF gelb", "value": "SBF gelb" },
        "FCusersign": { "title": "Userfarbe", "value": "Userfarbe" },
        "FCcolorwhite": { "title": "weiß", "value": "weiß" },
        "FCcolorblack": { "title": "schwarz", "value": "schwarz" }

    },
    "en":
    {
        "open": { "title": "open", "value": "open" },
        "save": { "title": "save", "value": "save" },
        "append": { "title": "append", "value": "append" },
        "update": { "title": "update", "value": "update" },
        "dir": { "title": "dir", "value": "dir" },
        "getconvertdata": { "title": "convert", "value": "convert" },
        "file": { "title": "file", "value": "file" },
        "card": { "title": "card", "value": "card" },
        "img": { "title": "img", "value": "img" },
        "tool": { "title": "tool", "value": "tool" },
        "labelgroupsel": { "title": "group select", "value": "group" },
        "labelblocksel": { "title": "block select", "value": "block" },
        "labellanguage": { "title": "Language", "value": "Language" },
        "labelwithcolumn": { "title": "Column", "value": "Column" },
        "labelwithleft": { "title": "left", "value": "left" },
        "labelwithmiddle": { "title": "middle", "value": "middle" },
        "labelwithright": { "title": "right", "value": "right" },
        "labelwith": { "title": "with", "value": "with" },
        "labelcard": { "title": "card", "value": "card" },
        "labelpage": { "title": "page", "value": "page" },
        "labelcolumn": { "title": "column", "value": "columne" },
        "labelblock": { "title": "block", "value": "block" },
        "labelfield": { "title": "field", "value": "field" },
        "showcard": { "title": "Card", "value": "show" },
        "delete": { "title": "delete", "value": "delete" },
        "copy": { "title": "copy", "value": "copy" },
        "showtab": { "title": "Tabelle" },
        "prev": { "title": "Prev" },
        "next": { "title": "Next" },
        "copy": { "title": "copy" },
        "delete": { "title": "delete" },
        "undo": { "title": "undo" },
        "print": { "title": "print" },
        "unbold": { "title": "unbold" },
        "bold": { "title": "bold" },
        "superscript": { "title": "super" },
        "subscript": { "title": "sub" },
        "fontup": { "title": "font" },
        "fontdown": { "title": "font" },
        "iconon": { "title": "Icons" },
        "iconoff": { "title": "Icons" },
        "removeformat": { "title": "remove" },
        "imageon": { "title": "imageon" },
        "imageoff": { "title": "imageoff" },
        "cardborder": { "title": "border", "value": "border" },
        "cardback": { "title": "back", "value": "back" },
        "cardfont": { "title": "font", "value": "font" },
        "blockback": { "title": "back", "value": "back" },
        "blockfont": { "title": "font", "value": "font" },
        "fieldback": { "title": "back", "value": "back" },
        "fieldfont": { "title": "font", "value": "font" },
        "FCtypE": { "title": "E", "value": "E" },
        "FCtypF": { "title": "F", "value": "F" },
        "FCtypG": { "title": "G", "value": "G" },
        "FCtypH": { "title": "H", "value": "H" },
        "FCtypT": { "title": "T", "value": "T" },
        "FCtypI": { "title": "I", "value": "I" },
        "FCtypL-Ui-Uai": { "title": "L-Ui-Uai", "value": "L-Ui-Uai" },
        "FCtypK-O": { "title": "K-O", "value": "K-O" },
        "FCtypR-S": { "title": "R-S", "value": "R-S" },
        "FCtypZ-Uc": { "title": "Z-Uc", "value": "Z-Uc" },
        "FCtypDienst": { "title": "Task", "value": "Task" },
        "FCtypLok": { "title": "Loc", "value": "Loc" },
        "FCtypPWagen": { "title": "Passenger", "value": "Passenger" },
        "FCcolorclear": { "title": "clear", "value": "clear" },
        "FCSBFblack": { "title": "black", "value": "black" },
        "FCSBFgreen": { "title": "green", "value": "green" },
        "FCSBFred": { "title": "red", "value": "red" },
        "FCSBFblue": { "title": "blue", "value": "blue" },
        "FCSBFbrown": { "title": "brown", "value": "brown" },
        "FCSBFyellow": { "title": "yellow", "value": "yellow" },
        "FCusersign": { "title": "usersign", "value": "usersign" },
        "FCcolorwhite": { "title": "white", "value": "white" },
        "FCcolorblack": { "title": "black", "value": "black" }
    },
};

// Tabelle für die Konvertierung aus anderen Programmen, wird nicht mehr genutzt..
var convertdata =
    [
        "fcard|fieldname|fielddescription|_roadnumber|roadnumber|_roadname|roadname|_era0|era0|_era1|era1|_era2|era2|eratext|_uic|uic|_comment|comment|_brake|brake|_speed|speed|_axleload|axleload|_wheelarrangement|wheelarrangement|_weight|weight|seats1|seats2|_lob|lob|_axlespacing|axlespacing|_cargoload|cargoload|_loadinglength|loadinglength|_loadingarea|loadingarea|_loadingvolume|loadingvolume|_loadnotes|loadnotes|rivpic|riv|line1|line2|line3|circulationpic|_homestation|homestation|_homedepot|homedepot|_heater|heater|_power|power|_notes|notes|_quantity|quantity|_useperiod|useperiod|_wagoncarriertruck|wagoncarriertruck|_modellabel|modellabel|_modelfeatures|modelfeatures|_owner|owner|_springbuffer|springbuffer|_coupler|coupler|_couplerhead|couplerhead|_wheelset|wheelset|_manufacturer|manufacturer|_modellob|modellob|_modelweight|modelweight|_wagonsign|wagonsign|_maintenance|maintenance|handlebars|signalholder|aged|nemshaft|kkkinematics|_wheelsetmanufacturer|wheelsetmanufacturer|innerdimension|flangeheight|_prototype|prototype|_mass|mass|_storagelocation|storagelocation|_drivelevels|drivelevels|dummy|_dccaddress|dccaddress|_protocol|protocol|light|analog|_roadpic|roadpic|_wagonpic|wagonpic|F0|F1|F2|F3|F4|F5|F6|F7|F8|F9|F10|F11|F12",
        "de-DE||||Nummer||Verwaltung||0. Epoche ||Epoche||2. Epoche|Gattungsbezeichnung||UIC||Beschreibung||Bremse||Geschwindigkeit||Achslast||Achsfolge||Gesamtgewicht|Sitzplätze 1|Sitzplätze 2||LÜP||Achsstand||Nutzlast||Ladelänge||Ladefläche||Ladevolumen||Ladehinweise|RIV|RIV|Linie1|Linie2|Linie3|Umlauf||HeimatBahnhof||HeimatBW||Heizung||Leistung||SonstigeHinweise||Stückzahl||Einsatzzeit||Rollbockfähig||Modellbeschriftung||Modellmerkmale||Eigentümer||Federpuffer||Kupplung||Kupplungskopf||Radsatznorm||Hersteller||ModellLÜP||Modellgewicht||Merkmal Wagenboden||Revision|Griffstangen|Signalhalter|Gealtert|NEMSchacht|KKKinematik||Radsatzhersteller|Innenmaß|Spurkranzhöhe||Vorbild||Masse||Ablageort||Fahrstufen|leer||Decoderaddresse||DCC Protokoll|Licht|Decoder analog||||Fahrzeugbild|F0|F1|F2|F3|F4|F5|F6|F7|F8|F9|F10|F11|F12",
        "en-US||||roadnumber||roadname||0. Era||Era||2. Era|Era ||uic||comment||brake||speed||axleload||wheelarrangement||weight|seats1|seats2||Lengthoverbuffer||axlespacing||cargoload||loadinglength||loadingarea||loadingvolume||loadnotes|rivpic|riv|line1|line2|line3|circulationpic||homestation||homedepot||heater||power||notes||quantity||useperiod||wagoncarriertruck ||modellabel||modelfeatures||owner||springbuffer||coupler||couplerhead||wheelset||Manufacturer||modellob||modelweight||wagonsign||maintenance|handlebars|signalholder|aged|nemshaft|kkkinematics||wheelsetManufacturer|innerdimension|flangeheight||prototype||mass||storagelocation||drivelevels|dummy||dccaddress||protocol|light|analog||||wagonpic|F0|F1|F2|F3|F4|F5|F6|F7|F8|F9|F10|F11|F12",
        "jmri||||locomotive.roadNumber||locomotive.roadName|||||||||||locomotive.comment||||locomotive.maxSpeed||||||||||||||||||||||||||||||||||||||||||||||||||locomotive.owner||||||||||locomotive.mfg||||||||||||||||||||||||||||locomotive.dccAddress|||||||||||||||||||||"
    ];
var usercard = [{ "fcard": { "creator": "Uwe Lengler", "crdate": "2020.02.04", "version": "1.0", "className": "FCcard", "pages": { "page1": { "className": "FCpage FCcolor ", "style": { "border-color": "rgb(253, 163, 193)", "background-color": "rgb(253, 163, 193)" }, "dataset": { "display": "on", "visibility": "visible", "checkbox": "color", "color": "none" } } }, "columns": { "column1": { "className": "FCcolumn FCtypI", "page": "page1", "style": { "width": "148mm", "height": "10mm", "border-style": "none none solid solid" }, "frames": { "fr1": { "className": "FCframe", "style": { "width": "100%" }, "blocks": { "dummy": { "className": "FCblock", "style": { "width": "70%" }, "items": { "dummy": { "className": "FCvalue  FCcenter ", "value": "", "style": { "width": "100%", "height": "10mm" }, "dataset": { "display": "on", "visibility": "hidden" } } }, "dataset": { "display": "on", "visibility": "hidden" } }, "owner1": { "className": "FCblock", "style": { "width": "30%" }, "items": { "owner": { "className": "FCvalue  FCcenter ", "value": "<span style=\"font-size: 92%\" data-id=\"fontset\" class=\"FCspan\">Unbekannt, Tupfingen&nbsp;\nAblage: Kasten 42&nbsp;</span>", "style": { "width": "90%", "height": "10mm" }, "dataset": { "display": "on", "visibility": "visible" } }, "ownersign": { "className": "FCvalue ", "value": " ", "style": { "width": "10%", "height": "10mm", "background-image": "url(\"./projects/public/pictures/dreikreise.png\")" }, "dataset": { "display": "on", "visibility": "visible" } } }, "dataset": { "display": "on", "visibility": "visible" } } }, "dataset": { "display": "on", "visibility": "visible" } } }, "dataset": { "display": "on", "visibility": "visible" } } } } }]

    ;
var firstmessage = [{"fcard":{"creator":"Uwe Lengler","crdate":"2020.02.04","version":"1.0","className":"FCcard","buttons":["",null,null],"pages":{"page1":{"className":"FCpage FCborder FCcolor","style":{"border-color":"rgb(44, 136, 175)","background-color":"rgb(235, 149, 9)"},"dataset":{"display":"on","visibility":"visible","checkbox":"color","color":"none","colorkey":"typT","border":"border"}}},"columns":{"column1":{"className":"FCcolumn FCtypI","page":"page1","style":{"width":"148mm","height":"100%","border-style":"none"},"frames":{"fr1":{"className":"FCframe","style":{"width":"100%","border-style":"none"},"blocks":{"first":{"className":"FCblock","style":{"width":"100%","background-color":"rgb(245, 154, 50)","height":"100%","border-style":"none"},"items":{"message":{"className":"FCvalue FCbig FCcenter","value":"<div><br></div>Willkommen bei Fcard.&nbsp;<div><br></div><div>&nbsp;Bitte wähle links oben einen Tab aus.&nbsp;</div><div><br></div><div>&nbsp;Und dann bestätige die Nachfrage.&nbsp;</div><div><br></div><div>&nbsp;Viel Spass und Erfolg.</div>","style":{"width":"100%","height":"100mm","color":"rgb(32, 87, 254)"},"dataset":{"display":"on","visibility":"visible"}}},"dataset":{"display":"on","visibility":"visible","colorkey":"undefined"}}},"dataset":{"display":"on","visibility":"visible"}}},"dataset":{"display":"on","visibility":"visible"}}},"checkboxes":{}}}]
;
// Standardansicht für den Catalog
var mastercatalog = [{ "fcard": { "creator": "Uwe Lengler", "crdate": "2020.02.04", "version": "1.0", "className": "FCcard", "buttons": [], "pages": { "page1": { "className": "FCpage FCcolor ", "style": { "border-color": "rgb(253, 163, 193)", "background-color": "rgb(253, 163, 193)", "heigth": "fit-content", "max-height": "215mm" }, "dataset": { "catalog": "yes", "display": "on", "visibility": "visible", "checkbox": "color", "color": "none" } } }, "columns": { "catalog": { "className": "FCcolumn FCtypI", "page": "page1", "style": { "width": "200mm", "border-style": "none none solid solid", "align-items": "top", "flex-direction": "column", "heigth": "fit-content", "max-height": "215mm" }, "frames": { "frameheader": { "className": "FCframe", "style": { "width": "755px", "align-items": "top", "flex-direction": "column", "height": "6mm" }, "blocks": { "fileheader": { "className": "FCblock", "style": { "width": "100%" }, "items": { "path": { "tag": "button", "className": "button FCButton", "onclick": "filetool.DOButton(event);", "title": "path", "sortvalue": "", "value": "Path", "style": { "width": "39%" }, "dataset": { "id": "sort.path", "showlevel": "0" } }, "filename": { "tag": "button", "className": "button FCButton", "onclick": "filetool.DOButton(event);", "title": "filename", "sortvalue": "", "value": "Filename", "style": { "width": "15%" }, "dataset": { "id": "sort.filename", "showlevel": "0" } }, "roadnumber": { "tag": "button", "className": "button FCButton", "onclick": "filetool.DOButton(event);", "title": "roadnumber", "sortvalue": "", "value": "Roadnumber", "style": { "width": "10%" }, "dataset": { "id": "sort.roadnumber", "showlevel": "0" } }, "uic": { "tag": "button", "className": "button FCButton", "onclick": "filetool.DOButton(event);", "title": "uic", "sortvalue": "", "value": "UIC", "style": { "width": "5%" }, "dataset": { "id": "sort.uic", "showlevel": "0" } }, "eratext": { "tag": "button", "className": "button FCButton", "onclick": "filetool.DOButton(event);", "title": "era", "sortvalue": "", "value": "Era", "style": { "width": "10%" }, "dataset": { "id": "sort.eratext", "showlevel": "0" } }, "roadpic": { "tag": "button", "className": "button FCButton", "onclick": "filetool.DOButton(event);", "title": "pic", "sortvalue": "", "value": "pic", "style": { "width": "5%" }, "dataset": { "id": "sort.roadpic", "showlevel": "0" } } }, "dataset": { "display": "on", "visibility": "visible" } } }, "dataset": { "display": "on", "visibility": "visible" } }, "framefile": { "className": "FCframe", "style": { "width": "100%", "align-items": "top", "heigth": "fit-content", "flex-direction": "row", "overflow-x": "hidden", "scrollbar-width": "none", "max-height": "208mm" }, "blocks": { "fileline": { "className": "FCblock", "style": { "width": "100%" }, "items": { "path": { "className": "FCvalue FCleft FCnosync", "sortvalue": "", "value": "path", "style": { "width": "39%" }, "dataset": { "display": "on", "visibility": "visible" } }, "filename": { "className": "FCvalue FCleft FCnosync", "sortvalue": "", "value": "&nbsp;file", "style": { "width": "15%" }, "dataset": { "display": "on", "visibility": "visible" } }, "roadnumber": { "className": "FCvalue FCcenter FCnosync", "sortvalue": "", "value": "number", "style": { "width": "10%" }, "dataset": { "display": "on", "visibility": "visible" } }, "uic": { "className": "FCvalue FCcenter FCnosync", "sortvalue": "", "value": "uic", "style": { "width": "5%" }, "dataset": { "display": "on", "visibility": "visible" } }, "eratext": { "className": "FCvalue FCcenter FCnosync", "sortvalue": "", "value": "era", "style": { "width": "10%" }, "dataset": { "display": "on", "visibility": "visible" } }, "roadpic": { "className": "FCvalue FCcenter FCnosync", "sortvalue": "", "value": "pic", "style": { "width": "5%" }, "dataset": { "display": "on", "visibility": "visible" } }, "buttontab2": { "tag": "button", "className": "button", "onclick": "filetool.DOButton(event);", "title": "tab2", "value": ">2 ", "style": { "width": "5%" }, "dataset": { "id": "open.tab2.line", "tabid": "tab1", "showlevel": "0" } }, "buttontab3": { "tag": "button", "className": "button", "onclick": "filetool.DOButton(event);", "title": "tab3", "value": ">3 ", "style": { "width": "5%" }, "dataset": { "id": "open.tab3.line", "tabid": "tab1", "showlevel": "0" } }, "buttontab4": { "tag": "button", "className": "button", "onclick": "filetool.DOButton(event);", "title": "tab4", "value": ">4", "style": { "width": "5%" }, "dataset": { "id": "open.tab4.line", "tabid": "tab1", "showlevel": "0" } } }, "dataset": { "display": "on", "visibility": "visible" } } }, "dataset": { "catalog": "yes", "display": "on", "visibility": "visible" } } }, "dataset": { "catalog": "yes", "display": "on", "visibility": "visible" } } }, "checkboxes": {} } }];// Standard user karte

