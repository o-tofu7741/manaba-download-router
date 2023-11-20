# manaba-download-router
manabaからファイルをダウンロードする時に、コース名でフォルダを作成してその中にダウンロードするChrome拡張機能。


## どんなもの？

manabaからファイルをダウンロードする際に、`manaba-downloads` フォルダとその中にコース名(科目名)でフォルダを作成し、そこへファイルをダウンロードする拡張機能です。

例：科目名 "哲学" のコースページでファイル(講義資料-01.pdf)をダウンロードした場合、`manaba-downloads/哲学/講義資料-01.pdf` に保存されます。

## Chromeウェブストアリンク
https://chrome.google.com/webstore/detail/manaba-download-router/bipkihgholcgopmmaacjjhgoejhficfd?hl=ja&authuser=3

## 便利な使い方
本拡張機能は必ず`manaba-downloads`フォルダ配下に保存するため、`manaba-downloads`という名でシンボリックリンクを作成することで任意の場所に保存することが出来ます。
