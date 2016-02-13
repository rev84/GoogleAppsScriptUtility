// Generated by CoffeeScript 1.10.0
var gas;

gas = (function() {
  function gas() {}

  gas._spreadSheet = null;

  gas._sheets = [];

  gas._activeSheetName = null;

  gas.getSpreadSheet = function() {
    if (this._spreadSheet === null) {
      this._spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
    }
    return this._spreadSheet;
  };

  gas.getSheet = function(name) {
    var sheet;
    if (this._sheets[name] == null) {
      sheet = this.getSpreadSheet().getSheetByName(name);
      if (!sheet) {
        return null;
      }
      this._sheets[name] = sheet;
    }
    return this._sheets[name];
  };

  gas.as = function(name) {
    if (this.getSheet(name) === null) {
      return false;
    }
    this._activeSheetName = name;
    return true;
  };

  gas.get = function(x, y, name) {
    var sheet;
    if (name == null) {
      name = this._activeSheetName;
    }
    sheet = this.getSheet(name);
    if (sheet === null) {
      return false;
    }
    return sheet.getRange(y + 1, x + 1).getValue();
  };

  gas.set = function(val, x, y, xEnd, yEnd, name) {
    var sheet, xNum, yNum;
    if (xEnd == null) {
      xEnd = x;
    }
    if (yEnd == null) {
      yEnd = y;
    }
    if (name == null) {
      name = this._activeSheetName;
    }
    xNum = xEnd - x + 1;
    yNum = yEnd - y + 1;
    sheet = this.getSheet(name);
    if (sheet === null) {
      return false;
    }
    return sheet.getRange(y + 1, x + 1, yNum, xNum).setValue(val);
  };

  gas.color = function(colorCode, x, y, xEnd, yEnd, name) {
    var sheet, xNum, yNum;
    if (xEnd == null) {
      xEnd = x;
    }
    if (yEnd == null) {
      yEnd = y;
    }
    if (name == null) {
      name = this._activeSheetName;
    }
    xNum = xEnd - x + 1;
    yNum = yEnd - y + 1;
    sheet = this.getSheet(name);
    if (sheet === null) {
      return false;
    }
    return sheet.getRange(y + 1, x + 1, yNum, xNum).setBackground(colorCode);
  };

  gas.clear = function(x, y, xEnd, yEnd, name) {
    var sheet, xNum, yNum;
    if (xEnd == null) {
      xEnd = x;
    }
    if (yEnd == null) {
      yEnd = y;
    }
    if (name == null) {
      name = this._activeSheetName;
    }
    xNum = xEnd - x + 1;
    yNum = yEnd - y + 1;
    sheet = this.getSheet(name);
    if (sheet === null) {
      return false;
    }
    return sheet.getRange(y + 1, x + 1, yNum, xNum).clear();
  };

  gas.searchVertical = function(x, content, yStart, yEnd, name) {
    var j, ref, ref1, y;
    if (yStart == null) {
      yStart = 0;
    }
    if (yEnd == null) {
      yEnd = null;
    }
    if (name == null) {
      name = this._activeSheetName;
    }
    if (yEnd === null) {
      yEnd = this.countY(name) - 1;
    }
    for (y = j = ref = yStart, ref1 = yEnd; ref <= ref1 ? j <= ref1 : j >= ref1; y = ref <= ref1 ? ++j : --j) {
      if (this.get(x, y, name) === content) {
        return y;
      }
    }
    return false;
  };

  gas.searchVerticalAll = function(x, content, yStart, yEnd, name) {
    var j, ref, ref1, res, y;
    if (yStart == null) {
      yStart = 0;
    }
    if (yEnd == null) {
      yEnd = null;
    }
    if (name == null) {
      name = this._activeSheetName;
    }
    if (yEnd === null) {
      yEnd = this.countY(name) - 1;
    }
    res = [];
    for (y = j = ref = yStart, ref1 = yEnd; ref <= ref1 ? j <= ref1 : j >= ref1; y = ref <= ref1 ? ++j : --j) {
      if (this.get(x, y, name) === content) {
        res.push(y);
      }
    }
    return res;
  };

  gas.searchHorizon = function(y, content, xStart, xEnd, name) {
    var j, ref, ref1, x;
    if (xStart == null) {
      xStart = 0;
    }
    if (xEnd == null) {
      xEnd = null;
    }
    if (name == null) {
      name = this._activeSheetName;
    }
    if (yEnd === null) {
      xEnd = this.countX(name) - 1;
    }
    for (x = j = ref = xStart, ref1 = xEnd; ref <= ref1 ? j <= ref1 : j >= ref1; x = ref <= ref1 ? ++j : --j) {
      if (this.get(x, y, name) === content) {
        return x;
      }
    }
    return false;
  };

  gas.searchHorizonAll = function(y, content, xStart, xEnd, name) {
    var j, ref, ref1, res, x;
    if (xStart == null) {
      xStart = 0;
    }
    if (xEnd == null) {
      xEnd = null;
    }
    if (name == null) {
      name = this._activeSheetName;
    }
    if (xEnd === null) {
      xEnd = this.countX(name) - 1;
    }
    res = [];
    for (x = j = ref = xStart, ref1 = xEnd; ref <= ref1 ? j <= ref1 : j >= ref1; x = ref <= ref1 ? ++j : --j) {
      if (this.get(x, y, name) === content) {
        res.push(x);
      }
    }
    return res;
  };

  gas.countX = function(name) {
    var sheet;
    if (name == null) {
      name = this._activeSheetName;
    }
    sheet = this.getSheet(name);
    if (sheet === null) {
      return false;
    }
    return sheet.getLastColumn();
  };

  gas.countY = function(name) {
    var sheet;
    if (name == null) {
      name = this._activeSheetName;
    }
    sheet = this.getSheet(name);
    if (sheet === null) {
      return false;
    }
    return sheet.getLastRow();
  };

  gas.s2xy = function(s) {
    var res;
    s = s.toUpperCase();
    if (!(res = s.match(/^([A-Z]+)(\d)+$/))) {
      return false;
    }
    return [this.s2x(res[1]), Number(res[2]) - 1];
  };

  gas.xy2s = function(x, y) {
    return this.x2s(x) + (y + 1);
  };

  gas.s2x = function(s) {
    var i, j, ref, x;
    s = s.toUpperCase();
    x = 0;
    for (i = j = 0, ref = s.length; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
      x = (x * 26) + (s.charCodeAt(i) - 'A'.charCodeAt(0) + 1);
    }
    return x - 1;
  };

  gas.x2s = function(x) {
    var s;
    x++;
    s = '';
    while (x >= 1) {
      x--;
      s = String.fromCharCode('A'.charCodeAt(0) + (x % 26)) + s;
      x = Math.floor(x / 26);
    }
    return s;
  };

  gas.alert = function(message) {
    return Browser.msgBox(message);
  };

  gas.log = function(message) {
    return Logger.log(message);
  };

  return gas;

})();
