//VS Code APIのインポート（ここでNode.jsを使う！）
//import * as vscode from 'vscode';でもOK（※.tsの場合はimportを使う）
const vscode = require('vscode');

//クラスを使って引き継がせる
class GrowthTreeViewProvider {
    constructor(extensionUri) {
        this._extensionUri = extensionUri;
    }
    resolveWebviewView(webviewView) {
        webviewView.webview.options = {
            enableScripts: true
        };
        webviewView.webview.html = this._getHtmlForWebview();
    }
    _getHtmlForWebview() { //基本的に貼り付けでOK。＄の部分だけ注意
        return `<!DOCTYPE html>
<html lang="ja">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Growth Tree</title>
    <style>
        body {
            font-family: "Hiragino Kaku Gothic ProN", "メイリオ", sans-serif;
            margin: 0;
            padding: 20px;
        }

        .card {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }

        .card-header {
            background: #4caf50;
            color: white;
            padding: 15px;
            margin: 0;
            text-align: center;
        }

        .card-content {
            position: relative;
            height: 400px;
            background: linear-gradient(to bottom, #e1f5fe, #b3e5fc);
            overflow: hidden;
        }

        #garden-area {
            position: relative;
            width: 100%;
			height:100%;
        }

        .message-bubble {
			color: #000;
            position: absolute;
            background: rgba(255, 255, 255, 0.9);
            border-radius: 15px;
            padding: 10px 15px;
            font-size: 14px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.5s ease-out;
            max-width: 150px;
            text-align: center;
            z-index: 2;
        }

        .flower {
            position: absolute;
            opacity: 0;
            transform: scale(0);
            transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .flower-center {
            width: 20px;
            height: 20px;
            background: #ffd700;
            border-radius: 50%;
            position: relative;
        }

        .petal {
            position: absolute;
            width: 15px;
            height: 15px;
            background: #ff69b4;
            border-radius: 50%;
        }

        .leaf {
            position: absolute;
            width: 25px;
            height: 12px;
            background: #4caf50;
            border-radius: 12px 12px 0 0;
            transform-origin: bottom center;
        }

        button {
            display: block;
            margin: 20px auto;
            padding: 12px 24px;
            color: white;
            border: none;
            border-radius: 25px;
            font-size: 16px;
            cursor: pointer;
            transition: transform 0.2s ease;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        button:hover {
            background: #f1cde8;
            transform: translateY(-2px);
        }

        button:active {
            transform: translateY(0);
        }
    </style>
</head>

<body>
    <div class="card">
        <h1 class="card-header">褒めワード</h1>
        <div class="card-content">
            <div id="garden-area"></div>
        </div>
        <button id="add-achievement">🌸</button>
    </div>
    <script>
        let achievementCount = 0;
        const encouragements =
            [
                "エラーは成長のチャンス！",
                "大事な一歩",
                "確実に前進中",
                "デバッグ達人への道",
                "今日も頑張ってる！",
                "努力の継続サイコ～",
                "しょげない、めげない、泣いちゃダメ",
                "今日も最高の1日",
                "まだ慌てる時間じゃない",
                "大丈夫、大丈夫",
                "ナイファイ！",
                "こういう日があっても良き",
                "チョコザップでも行く？",
                "スクワットはすべてを解決する",
                "テストステロンを信じろ",
                "為せば成る",
                "一回paizaはさむ？"
            ];

        const gardenArea = document.querySelector("#garden-area");

        function createFlower(x, y) {
            const flower = document.createElement('div');
            flower.className = "flower";
            flower.style.left = x + "px";
            flower.style.top = y + "px";

            //花の中心部分
            const center = document.createElement('div');
            center.className = "flower-center";

			//花びらを追加
			for (let i = 0; i < 8; i++) { 
			const petal = document.createElement('div'); 
			petal.className = "petal"; 
			const angle = (i * 45) * Math.PI / 180; 
			const distance = 15; 
			petal.style.left = \`\${distance * Math.cos(angle)}px\`; 
			petal.style.top = \`\${distance * Math.sin(angle)}px\`; 
			center.appendChild(petal); }

            //葉を追加
            const leaf1 = document.createElement("div");
            leaf1.className = "leaf";
            leaf1.style.transform = "rotate(-45deg)";
            leaf1.style.left = "-20px";
            leaf1.style.top = "10px";

            const leaf2 = document.createElement("div");
            leaf2.className = "leaf";
            leaf2.style.transform = "rotate(45deg)";
            leaf2.style.left = "-20px";
            leaf2.style.top = "10px";

            flower.appendChild(center);
            flower.appendChild(leaf1);
            flower.appendChild(leaf2);

            return flower;
        }

        function createMessageBubble(text, x, y) {
            const bubble = document.createElement("div");
            bubble.className = "message-bubble";
            bubble.textContent = text;
            bubble.style.left = x + "px";
            bubble.style.top = y + "px";
            return bubble;
        }

        function addAchievement() {
            const gardenRect = gardenArea.getBoundingClientRect();
            const marginX = 100; //左右の余白
            const marginY = 100; //上下の余白

            //ランダムな位置
            const x = Math.random() * (gardenRect.width - marginX * 2) + marginX;
            const y = Math.random() * (gardenRect.height - marginY * 2) + marginY;

            //花を追加
            const flower = createFlower(x - 25, y - 25);
            gardenArea.appendChild(flower);

            //メッセージを追加
            const message = createMessageBubble(
                encouragements[Math.floor(Math.random() * encouragements.length)],
                x - 75,
                y - 80
            );
            gardenArea.appendChild(message);

            //アニメーション開始
            requestAnimationFrame(() => {
                flower.style.opacity = "1";
                flower.style.transform = "scale(1)";
                message.style.opacity = "1";
                message.style.transform = "translateY(0)";
            });

            //少し経過してメッセージを消す
            setTimeout(() => {
                message.style.opacity = "0";
                setTimeout(() => message.remove(), 500);
            }, 3000);

            achievementCount++;
        }

        document.getElementById("add-achievement").addEventListener("click", addAchievement);

    </script>
</body>

</html>`;
    }
}

//グローバル変数として宣言
let statusBarItem;
let isTimerRunning = false;
let timerInterval = null;  // setIntervalを保持する変数


/**
 * @param {vscode.ExtensionContext} context //テンプレートにあったからそのまま使う（これはTypeScriptらしい）
 */
function activate(context) { //contextもVSCode APIが提供するオブジェクトなのであまり考えず使う
    let startTime = Date.now();

    //コマンドはすべてpackage.jsonで定義済み　＝　コマンド名は一致必須！
    //registerCommandメソッドを使う

    //サイドバーにWebviewを追加する（元気のなる木）
    const treeViewProvider = new GrowthTreeViewProvider(context.extensionUri);
    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider('growthTreeView', treeViewProvider)
    );

    //Growth Treeを表示する
    let disposableShowGrowthTree = vscode.commands.registerCommand('extension.showGrowthTree', () => {
        vscode.commands.executeCommand('workbench.view.extension.encourageBuddy');
    });

    //タイマーを開始するコマンド
    let disposableStartTimer = vscode.commands.registerCommand('extension.encourageBuddy', function () {
        if (!isTimerRunning) {
            isTimerRunning = true;
            startTime = Date.now();
            vscode.window.showInformationMessage("タイマーON");
            checkTime();
        } else {
            vscode.window.showInformationMessage("タイマーはすでにONだよ！");
        }
    });

    //タイマー停止のコマンド
    let disposableStopTimer = vscode.commands.registerCommand('extension.stopEncourageBuddy', function () {
        if (isTimerRunning) {
            isTimerRunning = false;
            if (timerInterval) {
                clearInterval(timerInterval);
                timerInterval = null;
            }
            vscode.window.showInformationMessage("タイマーOFF！");
        } else {
            vscode.window.showInformationMessage("タイマーはすでにOFFだよ！");
        }
    });

    //タイマーとメッセージを表示する関数
    let isWorkTime = true; //作業中かどうかを確認（true:作業中/false:休憩中）
    function checkTime() {
        timerInterval = setInterval(() => {
            const elapsedTime = Date.now() - startTime; //現在時刻マイナス開始時刻
            if (isWorkTime && elapsedTime >= 1500000) { //25分だと1500000。デモは10秒（10000）。
                vscode.window.showInformationMessage("25分経過！5分休憩しよ！🌟");
                isWorkTime = false; //休憩中へ切り替え
                startTime = Date.now(); //タイマーをリセット
            }
            else if (!isWorkTime && elapsedTime >= 300000) { //5分だと300000。
                vscode.window.showInformationMessage("再開！💪");
                isWorkTime = true; //作業中へ切り替え
                startTime = Date.now(); //タイマーをリセット
            }
        }, 10000); //10秒ごとに時間をチェック
        context.subscriptions.push(new vscode.Disposable(() => clearInterval(timerInterval)));
    }
    context.subscriptions.push(disposableStartTimer);

    const questions = [
        {
            question: "2つの数値を比較して大きい方を返す関数は？",
            template: "function compareNumbers(a, b) { }",
            test: `compareNumbers(3, 4) === 4`
        },
        {
            question: "配列の各要素に2を掛ける関数は？",
            template: "function doubleArray(arr) { }",
            test: `JSON.stringify(doubleArray([1, 2, 3])) === JSON.stringify([2, 4, 6])`
        },
        {
            question: "文字列を逆にする関数は？",
            template: "function reverseString(str) { }",
            test: `reverseString("hello") === "olleh"`
        },
        {
            question: "引数の数値が偶数か奇数かを返す関数は？",
            template: "function isEven(num) { }",
            test: `isEven(4) === "even" && isEven(3) === "odd"`
        },
        {
            question: "配列の合計値を計算する関数は？",
            template: "function sumArray(arr) { }",
            test: `sumArray([1, 2, 3, 4, 5]) === 15`
        },
        {
            question: "文字列の母音の数を数える関数は？",
            template: "function countVowels(str) { }",
            test: `countVowels("hello") === 2`
        },
        {
            question: "数値を2乗する関数は？",
            template: "function square(num) { }",
            test: `square(4) === 16`
        },
        {
            question: "配列の最大値を見つける関数は？",
            template: "function findMax(arr) { }",
            test: `findMax([1, 5, 3, 9, 2]) === 9`
        },
        {
            question: "文字列が回文かどうかをチェックする関数は？",
            template: "function isPalindrome(str) { }",
            test: `isPalindrome("level") === true && isPalindrome("hello") === false`
        },
        {
            question: "配列の平均値を計算する関数は？",
            template: "function calculateAverage(arr) { }",
            test: `calculateAverage([1, 2, 3, 4, 5]) === 3`
        } //他の問題を追加するならここに
    ];

    //Webviewパネル（JS問題集）を表示するコマンド
    let disposableShowPracticeQuestion = vscode.commands.registerCommand('extension.showPracticeQuestion', function () {
        const panel = vscode.window.createWebviewPanel(
            'practiceQuestion', //内部で使用される識別子
            'JavaScript Practice', //パネルのタイトル
            vscode.ViewColumn.One, //エディターのカラムに表示
            {
                enableScripts: true //Webview内でスクリプトを有効にする
            }
        );
        //問題集
        const initialQuestion = questions[Math.floor(Math.random() * questions.length)];
        panel.webview.html = getWebviewContent({
            initialQuestion: initialQuestion,
            questions: questions  //全問題データも渡す
        });
    });
    context.subscriptions.push(disposableShowPracticeQuestion);

    //ステータスバーにボタンを追加 
    statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBarItem.command = 'extension.showPracticeQuestion';
    statusBarItem.text = 'JS関数練習';
    statusBarItem.show();
    context.subscriptions.push(statusBarItem);
}

function getWebviewContent({ initialQuestion, questions }) {
    return `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JavaScript 練習問題</title>
    <style>
        body {
            padding: 20px;
            display: flex;
            flex-direction: column;
            gap: 20px;
        }
        h1 {
            color: #bdbbbb;
            margin-bottom: 20px;
            font-size: 1.5rem;
        }
        #editor {
            width: 600px;
            height: 300px;
            border: 1px solid #ccc;
        }
        .button-container{
            display:flex;
            gap:10px;
        }
        button {
            padding: 8px 16px;
            background-color: #007acc;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        button:hover {
            background-color: #005999;
        }
        #next-button {
            background-color: #28a745;
        }
        #next-button:hover{
            background-color: #218838;
        }
        #message {
            margin-top: 10px;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <h1 id="question">${initialQuestion.question}</h1>
    <div id="editor"></div>
    <div class="button-container">
        <button onclick="checkAnswer()">実行</button>
        <button id="next-button" onclick="nextQuestion()">次の問題</button>
    </div>
    <div id="message"></div>

    <!-- Monaco Editor の読み込み -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.44.0/min/vs/loader.js"></script>
    <script>
        const vscode = acquireVsCodeApi();
        let editor;

    // 問題データの定義
    const allQuestions = ${JSON.stringify(questions)};
    let currentQuestionIndex = ${questions.findIndex(q => q.question === initialQuestion.question)};

        require.config({
            paths: {
                'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.44.0/min/vs'
            }
        });

        require(['vs/editor/editor.main'], function() {
        //エディタの初期化
            editor = monaco.editor.create(document.getElementById('editor'), {
                value: allQuestions[currentQuestionIndex].template,
                language: 'javascript',
                theme: 'vs-dark', //ダークテーマを使用
                minimap: { enabled: false }, //ミニマップは非表示
                lineNumbers: 'on',
                roundedSelection: false,
                scrollBeyondLastLine: false,
                readOnly: false,
                fontSize: 14,
                tabSize: 2,
                automaticLayout: true //コンテナのリサイズに対応
            });
        });

        function checkAnswer() {
            const code = editor.getValue();
            try {
                eval(code);
                if (eval(allQuestions[currentQuestionIndex].test)) {
                    vscode.postMessage({ type: 'success' });
                    document.getElementById('message').textContent = '正解！🌸';
                    document.getElementById('message').style.color = '#4caf50';
                } else {
                    vscode.postMessage({ type: 'failure' });
                    document.getElementById('message').textContent = '残念！もう一回挑戦しよ！';
                    document.getElementById('message').style.color = '#f44336';
                }
            } catch (error) {
                vscode.postMessage({ type: 'error', message: error.message });
                document.getElementById('message').textContent = 'エラー: ' + error.message;
                document.getElementById('message').style.color = '#f44336';
            }
        }

        function nextQuestion(){
        let nextIndex;
        do {
            nextIndex = Math.floor(Math.random()*allQuestions.length);
        }while(nextIndex === currentQuestionIndex && allQuestions.length > 1);
            
        currentQuestionIndex = nextIndex;
        const nextQuestion = allQuestions[currentQuestionIndex];
        
         // 問題文を更新
        document.getElementById("question").textContent = nextQuestion.question;
        
        // エディタの内容を更新
        editor.setValue(nextQuestion.template);
        
        // メッセージをクリア
        document.getElementById("message").textContent ="";
        }
    </script>
</body>
</html>`;
}


//以下はいじってないです
// 拡張機能を無効にするときの関数
function deactivate() { }

module.exports = {
    activate,
    deactivate
}