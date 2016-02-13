class gas
  @_spreadSheet     = null
  @_sheets          = []
  @_activeSheetName = null

  @getSpreadSheet:->
    @_spreadSheet = SpreadsheetApp.getActiveSpreadsheet() if @_spreadSheet is null
    @_spreadSheet

  # シートを取得・メモ化
  @getSheet:(name)->
    unless @_sheets[name]?
      sheet = @getSpreadSheet().getSheetByName(name)
      return null unless sheet
      @_sheets[name] = sheet

    @_sheets[name]

  # アクティブシートを切り替える（各メソッドでname引数が省略された時のデフォルト対象シート）
  @as:(name)->
    return false if @getSheet(name) is null
    @_activeSheetName = name
    true

  # セルの値を取得
  @get:(x, y, name = @_activeSheetName)->
    sheet = @getSheet(name)
    return false if sheet is null

    sheet.getRange(y+1, x+1).getValue()

  # セルの値を設定
  @set:(val, x, y, xEnd = x, yEnd = y, name = @_activeSheetName)->
    xNum = xEnd - x + 1
    yNum = yEnd - y + 1

    sheet = @getSheet(name)
    return false if sheet is null

    sheet.getRange(y+1, x+1, yNum, xNum).setValue(val)

  # セルの色を変更
  @color:(colorCode, x, y, xEnd = x, yEnd = y, name = @_activeSheetName)->
    xNum = xEnd - x + 1
    yNum = yEnd - y + 1

    sheet = @getSheet(name)
    return false if sheet is null

    sheet.getRange(y+1, x+1, yNum, xNum).setBackground(colorCode)

  # セルをクリア
  @clear:(x, y, xEnd = x, yEnd = y, name = @_activeSheetName)->
    xNum = xEnd - x + 1
    yNum = yEnd - y + 1

    sheet = @getSheet(name)
    return false if sheet is null

    sheet.getRange(y+1, x+1, yNum, xNum).clear()

  # 垂直方向に完全一致文字列検索、最初にヒットしたy座標を返す
  @searchVertical:(x, content, yStart = 0, yEnd = null, name = @_activeSheetName)->
    yEnd = @countY(name)-1 if yEnd is null

    for y in [yStart..yEnd]
      return y if @get(x, y, name) is content
    false

  # 垂直方向に完全一致文字列を検索、全y座標を返す
  @searchVerticalAll:(x, content, yStart = 0, yEnd = null, name = @_activeSheetName)->
    yEnd = @countY(name)-1 if yEnd is null

    res = []
    for y in [yStart..yEnd]
      res.push y if @get(x, y, name) is content
    res

  # 水平方向に完全一致文字列検索、最初にヒットしたx座標を返す
  @searchHorizon:(y, content, xStart = 0, xEnd = null, name = @_activeSheetName)->
    xEnd = @countX(name)-1 if yEnd is null

    for x in [xStart..xEnd]
      return x if @get(x, y, name) is content
    false

  # 水平方向に完全一致文字列を検索、全x座標を返す
  @searchHorizonAll:(y, content, xStart = 0, xEnd = null, name = @_activeSheetName)->
    xEnd = @countX(name)-1 if xEnd is null

    res = []
    for x in [xStart..xEnd]
      res.push x if @get(x, y, name) is content
    res

  # シートに何列あるか
  @countX:(name = @_activeSheetName)->
    sheet = @getSheet(name)
    return false if sheet is null

    sheet.getLastColumn()

  # シートに何行あるか
  @countY:(name = @_activeSheetName)->
    sheet = @getSheet(name)
    return false if sheet is null

    sheet.getLastRow()

  # EXCEL座標記法を、0スタートのx,y座標記法に直す
  @s2xy:(s)->
    s = s.toUpperCase()
    return false unless res = s.match /^([A-Z]+)(\d)+$/
    [@s2x(res[1]), Number(res[2])-1]

  # 0スタートのx,y座標を、EXCEL座標記法に直す
  @xy2s:(x, y)->
    @x2s(x)+(y+1)

  # x軸のEXCEL座標記法記法を、0スタートのx座標記法に直す
  @s2x:(s)->
    s = s.toUpperCase()
    x = 0
    for i in [0...s.length]
      x = (x * 26) + (s.charCodeAt(i) - 'A'.charCodeAt(0) + 1)
    x-1

  # 0スタートのx座標記法を、x軸のEXCEL座標記法記法に直す
  @x2s:(x)->
    x++
    s = ''
    while x >= 1
      x--
      s = String.fromCharCode('A'.charCodeAt(0) + (x % 26)) + s
      x = Math.floor(x / 26)
    s

  # アラートを出す
  @alert:(message)->
    Browser.msgBox message

  # ログを出す
  @log:(message)->
    Logger.log message