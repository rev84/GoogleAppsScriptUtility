class gas
  @_spreadSheet     = null
  @_sheets          = []
  @_activeSheetName = null

  @getSpreadSheet:->
    @_spreadSheet = SpreadsheetApp.getActiveSpreadsheet() if @_spreadSheet is null
    @_spreadSheet

  @getSheet:(name)->
    return @_sheets[name] if @_sheets[name]?
    
    sheet = @getSpreadSheet().getSheetByName(name)
    return null unless sheet
    @_sheets[name] = sheet

    @_sheets[name]

  @setActiveSheet:(name)->
    return false if @getSheet(name) is null
    @_activeSheetName = name
    true

  @get:(x, y, name = null)->
    name = @_activeSheetName if name is null
    sheet = @getSheet(name)
    return false if sheet is null

    sheet.getRange(x+1, y+1).getValue()

  @set:(val, x, y, name = null, xEnd = null, yEnd = null)->
    name = @_activeSheetName if name is null

    xEnd = x if xEnd is null
    yEnd = y if yEnd is null

    xNum = xEnd - x + 1
    yNum = yEnd - y + 1

    sheet = @getSheet(name)
    return false if sheet is null

    sheet.getRange(x+1, y+1, xNum, yNum).setValue(val)

  @color:(colorCode, x, y, name = null, xEnd = null, yEnd = null)->
    name = @_activeSheetName if name is null

    xEnd = x if xEnd is null
    yEnd = y if yEnd is null

    xNum = xEnd - x + 1
    yNum = yEnd - y + 1

    sheet = @getSheet(name)
    return false if sheet is null

    sheet.getRange(x+1, y+1, xNum, yNum).setBackground(colorCode)

  @clear:(x, y, name = null, xEnd = null, yEnd = null)->
    name = @_activeSheetName if name is null
    
    xEnd = x if xEnd is null
    yEnd = y if yEnd is null

    xNum = xEnd - x + 1
    yNum = yEnd - y + 1

    sheet = @getSheet(name)
    return false if sheet is null

    sheet.getRange(x+1, y+1, xNum, yNum).setBackgrounds(colorCode)
