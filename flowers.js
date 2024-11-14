//ストップウォッチに必要な変数
let startTime;    //開始時刻
let timerId;      //setIntervalのID
let elapsedTime = 0; //経過時間
let count = 0; //花を変化させるためのカウント
let lastCountTime = 0; //リセット用

//カウント1~3:小
//カウント4~9:中
//カウント10~:大

//スタートクリック時の処理
$('#start').click(function () {
    //開始時刻を記録
    startTime = Date.now() - elapsedTime;

    //10ミリ秒ごとに時間を更新
    timerId = setInterval(updateTime, 10);

    $(this).prop('disabled', true);
    $('#stop').prop('disabled', false);
    $('#reset').prop('disabled', false);
});

//時間を更新する関数
function updateTime() {
    //現在の経過時間を計算
    elapsedTime = Date.now() - startTime; //今 - スタートボタン押下時刻 = 経過時間

    //10秒経過チェック
    const currentSeconds = Math.floor(elapsedTime / 1000);  //現在の秒数
    if (currentSeconds >= lastCountTime + 10) {
        count++;
        lastCountTime = currentSeconds;  //最後にカウントした時間を更新
    }

    // 時、分、秒、ミリ秒を計算
    const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
    const milliseconds = elapsedTime % 1000;

    // 表示形式に整形
    const timeString =
        String(hours).padStart(2, '0') + ':' +
        String(minutes).padStart(2, '0') + ':' +
        String(seconds).padStart(2, '0') + '.' +
        String(milliseconds).padStart(3, '0');

    // 画面に表示
    $('#time').text(timeString);
    $('#count').text(`カウント: ${count}`);
}

//ストップボタン押下時
$('#stop').click(function () {
    // setIntervalを止める
    clearInterval(timerId);
    $(this).prop('disabled', true);
    $('#start').prop('disabled', false);
    $('#reset').prop('disabled', false);
});

//リセットボタン押下時
$('#reset').click(function () {
    clearInterval(timerId);
    elapsedTime = 0;
    count = 0;
    lastCountTime = 0;
    $('#time').text('00:00:00.000');
    $('#start').prop('disabled', false);
    $('#stop').prop('disabled', true);
    $(this).prop('disabled', true);  // リセットボタンを無効化
    $('#count').text(`カウント: ${count}`);
});

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
        petal.style.left = `${distance * Math.cos(angle)}px`;
        petal.style.top = `${distance * Math.sin(angle)}px`;
        if (count > 1) {
            petal.style.width = `${10}px`;
            petal.style.height = `${10}px`;
        }
        center.appendChild(petal);
    }

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
