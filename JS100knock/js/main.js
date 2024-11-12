let editor;
let currentQuestionIndex = 0;
//問題集
const allQuestions = [
    // \nで改行 indexは0～2
    {
        question: "2つの数値を比較して大きい方を返す関数は？",
        choices: [
            "1.function compareNumbers(a, b) {\n    return a + b;\n}",
            "2.function compareNumbers(a, b) {\n    return a > b ? a : b;\n}",
            "3.function compareNumbers(a, b) {\n    return Math.random(a, b);\n}"
        ],
        correctIndex: 1
    },
    {
        question: "引数の数値が偶数か奇数かを返す関数は？",
        choices: [
            "1.function isEven(num) {\n    return num % 2;\n}",
            "2.function isEven(num) {\n    return num % 2 === 0 ? 'even' : 'odd';\n}",
            "3.function isEven(num) {\n    return num / 2;\n}"
        ],
        correctIndex: 1
    },
    {
        question: "配列の合計値を計算する関数は？",
        choices: [
            "1.function sumArray(arr) {\n    return arr.reduce((a, b) => a + b, 0);\n}",
            "2.function sumArray(arr) {\n    return arr.map(x => x + x);\n}",
            "3.function sumArray(arr) {\n    return arr.length;\n}"
        ],
        correctIndex: 0
    },
    {
        question: "文字列の母音（a,e,i,o,u）の数を数える関数は？",
        choices: [
            "1.function countVowels(str) {\n    return str.length;\n}",
            "2.function countVowels(str) {\n    let count = 0;\n    for(let i = 0; i < str.length; i++) {\n        if(str[i] === 'a' || str[i] === 'e' || str[i] === 'i' || str[i] === 'o' || str[i] === 'u') {\n            count = count + 1;\n        }\n    }\n    return count;\n}",
            "3.function countVowels(str) {\n    let count = 0;\n    const vowels = ['a', 'e', 'i', 'o', 'u'];\n    for(let i = 0; i < str.length; i++) {\n        if(vowels.includes(str[i].toLowerCase())) {\n            count = count + 1;\n        }\n    }\n    return count;\n}"
        ],
        correctIndex: 2
    },
    {
        question: "数値を2乗する関数は？",
        choices: [
            "1.function square(num) {\n    return num * 2;\n}",
            "2.function square(num) {\n    return num * num;\n}",
            "3.function square(num) {\n    return Math.sqrt(num);\n}"
        ],
        correctIndex: 1
    },
    {
        question: "文字列が回文かどうかをチェックする関数は？",
        choices: [
            "1.function isPalindrome(str) {\n    return str === str.split('').reverse().join('');\n}",
            "2.function isPalindrome(str) {\n    return str === str.toUpperCase();\n}",
            "3.function isPalindrome(str) {\n    return str.length;\n}"
        ],
        correctIndex: 0
    },
    {
        question: "摂氏を華氏に変換する関数は？(華氏 = 摂氏 × 9/5 + 32(例：100℃ → 212°F)",
        choices: [
            "1.function celsiusToFahrenheit(celsius) {\n    return celsius + 32;\n}",
            "2.function celsiusToFahrenheit(celsius) {\n    return celsius * 2;\n}",
            "3.function celsiusToFahrenheit(celsius) {\n    return celsius * 9/5 + 32;\n}"
        ],
        correctIndex: 2
    },
    {
        question: "文字列「Hello」の中に「l」は何回出てくるか数える関数は？",
        choices: [
            "1.function countL(str) {\n    return str.length;\n}",
            "2.function countL(str) {\n    let count = 0;\n    for(let i = 0; i < str.length; i++) {\n        if(str[i] === 'l') {\n            count = count + 1;\n        }\n    }\n    return count;\n}",
            "3.function countL(str) {\n    return str[0];\n}"
        ],
        correctIndex: 1
    },
    {
        question: "5の階乗（5!）を計算する関数は？",
        choices: [
            "1.function factorial5() {\n    return 5 + 5 + 5 + 5 + 5;\n}",
            "2.function factorial5() {\n    return 5 * 2;\n}",
            "3.function factorial5() {\n    return 5 * 4 * 3 * 2 * 1;\n}"
        ],
        correctIndex: 2
    },
    {
        question: "文字列の末尾に指定された文字を追加する関数は？",
        choices: [
            "1.function padEnd(str, length, char) {\n    return str + char;\n}",
            "2.function padEnd(str, length, char) {\n    return char + str;\n}",
            "3.function padEnd(str, length, char) {\n    while(str.length < length) {\n        str = str + char;\n    }\n    return str;\n}"
        ],
        correctIndex: 2
    },
    {
        question: "文字列「hello」を「Hello」に変換する関数は？",
        choices: [
            "1.function makeHello(str) {\n    return str.toUpperCase();\n}",
            "2.function makeHello(str) {\n    let firstLetter = str[0];\n    let upperFirstLetter = firstLetter.toUpperCase();\n    let restOfWord = str[1] + str[2] + str[3] + str[4];\n    return upperFirstLetter + restOfWord;\n}",
            "3.function makeHello(str) {\n    return str + str;\n}"
        ],
        correctIndex: 1
    },
    {
        question: "配列の各要素に2を掛ける関数は？", //mapメソッドは各要素を変換した新しい配列を返す
        choices: [
            "1.function doubleArray(arr) {\n    return arr.map(x => x * 2);\n}",
            "2.function doubleArray(arr) {\n    return arr.forEach(x => x * 2);\n}",
            "3.function doubleArray(arr) {\n    return arr.filter(x => x * 2);\n}"
        ],
        correctIndex: 0
    },
    {
        question: "文字列を逆にする関数は？",
        choices: [
            "1.function reverseString(str) {\n    return str.sort().reverse();\n}",
            "2.function reverseString(str) {\n    return str.reverse();\n}",
            "3.function reverseString(str) {\n    return str.split('').reverse().join('');\n}"
        ],
        correctIndex: 2
    },
    {
        question: "配列内の偶数の数を数える関数は？",
        choices: [
            "1.function countEvenNumbers(arr) {\n    return arr.filter(num => num % 2 === 0).length;\n}",
            "2.function countEvenNumbers(arr) {\n    return arr.length;\n}",
            "3.function countEvenNumbers(arr) {\n    return arr.reduce((a, b) => a + b);\n}"
        ],
        correctIndex: 0
    },
    {
        question: "指定された範囲内のランダムな整数を生成する関数は？",
        choices: [
            "1.function randomInteger(min, max) {\n    return Math.random();\n}",
            "2.function randomInteger(min, max) {\n    return Math.floor(Math.random() * (max - min + 1)) + min;\n}",
            "3.function randomInteger(min, max) {\n    return min + max;\n}"
        ],
        correctIndex: 1
    },
    {
        question: "文字列から空白を除去する関数は？",
        choices: [
            "1.function removeSpaces(str) {\n    return str.length;\n}",
            "2.function removeSpaces(str) {\n    return str.split(' ');\n}",
            "3.function removeSpaces(str) {\n    return str.replaceAll(' ', '');\n}"
        ],
        correctIndex: 2
    },
    {
        question: "配列[1, 2, 3]の各数値を2倍にして[2, 4, 6]を作る関数は？",
        choices: [
            "1.function makeDouble(arr) {\n    let result = [];\n    for(let i = 0; i < arr.length; i++) {\n        result.push(arr[i] * 2);\n    }\n    return result;\n}",
            "2.function makeDouble(arr) {\n    for(let i = 0; i < arr.length; i++) {\n        arr[i] * 2;\n    }\n}",
            "3.function makeDouble(arr) {\n    return arr;\n}"
        ],
        correctIndex: 0
    },
    {
        question: "数値が2で割り切れるかどうかを判定する関数は？",
        choices: [
            "1.function isDivisibleByTwo(num) {\n    return num > 2;\n}",
            "2.function isDivisibleByTwo(num) {\n    return num % 2 === 0;\n}",
            "3.function isDivisibleByTwo(num) {\n    return num + 2;\n}"
        ],
        correctIndex: 1
    },
    {
        question: "配列を逆順にする関数は？",
        choices: [
            "1.function reverseArray(arr) {\n    return arr;\n}",
            "2.function reverseArray(arr) {\n    let result = [];\n    for(let i = arr.length - 1; i >= 0; i--) {\n        result.push(arr[i]);\n    }\n    return result;\n}",
            "3.function reverseArray(arr) {\n    return arr.length;\n}"
        ],
        correctIndex: 1
    },
    {
        question: "文字列「I am happy」の中の単語の数（空白で区切られた部分）を数える関数は？",
        choices: [
            "1.function countWords() {\n    return 'I am happy'.length;\n}",
            "2.function countWords() {\n    let words = 0;\n   words = words + 1;\n   words = words + 1;\n   words = words + 1;\n    return words;\n}",
            "3.function countWords() {\n    return 'I';\n}"
        ],
        correctIndex: 1
    },
    {
        question: "配列内の重複を削除する関数は？",
        choices: [
            "1.function removeDuplicates(arr) {\n    return arr.sort();\n}",
            "2.function removeDuplicates(arr) {\n    return arr.new.push();\n}",
            "3.function removeDuplicates(arr) {\n    let result = [];\n    for(let i = 0; i < arr.length; i++) {\n        if(!result.includes(arr[i])) {\n            result.push(arr[i]);\n        }\n    }\n    return result;\n}"
        ],
        correctIndex: 2
    },
    {
        question: "オブジェクトのキーと値を入れ替える関数は？",
        choices: [
            "1.function swapKeysAndValues(obj) {\n    let result = {};\n    for(let key in obj) {\n        result[key] = obj[key];\n    }\n    return result;\n}",
            "2.function swapKeysAndValues(obj) {\n    let result = {};\n    for(let key in obj) {\n        result[obj[key]] = key;\n    }\n    return result;\n}",
            "3.function swapKeysAndValues(obj) {\n    let result = {};\n    let keys = [];\n    for(let key in obj) {\n        keys.push(key);\n        result[key] = obj[key];\n    }\n    return keys;\n}"
        ],
        correctIndex: 1
    },
    {
        question: "配列をチャンク（小さな配列）に分割する関数は？",
        choices: [
            "1.function chunkArray(arr, size) {\n    return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) => \n        arr.slice(i * size, i * size + size));\n}",
            "2.function chunkArray(arr, size) {\n    return arr.slice(0, size);\n}",
            "3.function chunkArray(arr, size) {\n    return [arr];\n}"
        ],
        correctIndex: 0
    },
    {
        question: "文字列内の各文字の出現回数を返すオブジェクトを作成する関数は？",
        choices: [
            "1.function charFrequency(str) {\n    let result = {};\n    for(let i = 0; i < str.length; i++) {\n        result[str[i]] = str.length;\n    }\n    return result;\n}",
            "2.function charFrequency(str) {\n    let result = {};\n    for(let i = 0; i < str.length; i++) {\n        if(result[str[i]]) {\n            result[str[i]] = result[str[i]] + 1;\n        } else {\n            result[str[i]] = 1;\n        }\n    }\n    return result;\n}",
            "3.function charFrequency(str) {\n    let result = {};\n    for(let i = 0; i < str.length; i++) {\n        result[i] = str[i];\n    }\n    return result;\n}"
        ],
        correctIndex: 1
    },
    {
        question: "配列内の要素を指定回数分繰り返す関数は？",
        choices: [
            "1.function repeatElements(arr, n) {\n    let result = [];\n    for(let i = 0; i < n; i++) {\n        for(let j = 0; j < arr.length; j++) {\n            result.push(arr[j]);\n        }\n    }\n    return result;\n}",
            "2.function repeatElements(arr, n) {\n    let result = [];\n    for(let i = 0; i < arr.length; i++) {\n        for(let j = 0; j < n; j++) {\n            result.push(arr[i]);\n        }\n    }\n    return result;\n}",
            "3.function repeatElements(arr, n) {\n    let result = [];\n    for(let i = 0; i < n; i++) {\n        result.push(arr);\n    }\n    return result;\n}"
        ],
        correctIndex: 0
    },
    {
        question: "配列内の最も頻出する要素を見つける関数は？",
        choices: [
            "1.function mostFrequent(arr) {\n    let count = {};\n    let maxCount = 0;\n    let result = arr[0];\n    \n    for(let i = 0; i < arr.length; i++) {\n        if(count[arr[i]]) {\n            count[arr[i]] = count[arr[i]] + 1;\n        } else {\n            count[arr[i]] = 1;\n        }\n        \n        if(count[arr[i]] > maxCount) {\n            maxCount = count[arr[i]];\n            result = arr[i];\n        }\n    }\n    return result;\n}",
            "2.function mostFrequent(arr) {\n    let count = {};\n    for(let i = 0; i < arr.length; i++) {\n        if(count[arr[i]]) {\n            count[arr[i]] = count[arr[i]] + 1;\n        } else {\n            count[arr[i]] = 1;\n        }\n    }\n    return count;\n}",
            "3.function mostFrequent(arr) {\n    let max = arr[0];\n    for(let i = 1; i < arr.length; i++) {\n        if(arr[i] > max) {\n            max = arr[i];\n        }\n    }\n    return max;\n}"
        ],
        correctIndex: 0
    },
    {
        question: "文字列をキャメルケースに変換する関数は？",
        choices: [
            "1.function toCamelCase(str) {\n    let result = '';\n    for(let i = 0; i < str.length; i++) {\n        if(i === 0) {\n            result = result + str[i].toLowerCase();\n        } else {\n            result = result + str[i].toUpperCase();\n        }\n    }\n    return result;\n}",
            "2.function toCamelCase(str) {\n    let result = '';\n    for(let i = 0; i < str.length; i++) {\n        if(str[i] === '_' || str[i] === '-') {\n            i++;\n            if(i < str.length) {\n                result = result + str[i].toUpperCase();\n            }\n        } else {\n            result = result + str[i];\n        }\n    }\n    return result;\n}",
            "3.function toCamelCase(str) {\n    let result = '';\n    let makeUpper = false;\n    for(let i = 0; i < str.length; i++) {\n        if(makeUpper) {\n            result = result + str[i].toUpperCase();\n            makeUpper = false;\n        } else {\n            result = result + str[i].toUpperCase();\n            makeUpper = true;\n        }\n    }\n    return result;\n}"
        ],
        correctIndex: 1
    },
    {
        question: "2つの配列の共通要素を見つける関数は？",
        choices: [
            "1.function findCommonElements(arr1, arr2) {\n    let result = [];\n    for(let i = 0; i < arr1.length; i++) {\n        for(let j = 0; j < arr2.length; j++) {\n            result.push(arr1[i]);\n        }\n    }\n    return result;\n}",
            "2.function findCommonElements(arr1, arr2) {\n    let result = [];\n    for(let i = 0; i < arr1.length; i++) {\n        for(let j = 0; j < arr2.length; j++) {\n            if(arr1[i] === arr2[j]) {\n                result.push(arr1[i]);\n            }\n        }\n    }\n    return result;\n}",
            "3.function findCommonElements(arr1, arr2) {\n    let result = [];\n    for(let i = 0; i < arr1.length; i++) {\n        result.push(arr1[i]);\n    }\n    for(let i = 0; i < arr2.length; i++) {\n        result.push(arr2[i]);\n    }\n    return result;\n}"
        ],
        correctIndex: 1
    },
    {
        question: "文字列を指定の長さで切り詰めて末尾に...を追加する関数は？",
        choices: [
            "1.function truncateString(str, length) {\n    let result = '';\n    if(str.length > length) {\n        for(let i = 0; i < length; i++) {\n            result = result + str[i];\n        }\n        result = result + '...';\n    } else {\n        result = str;\n    }\n    return result;\n}",
            "2.function truncateString(str, length) {\n    let result = '';\n    for(let i = 0; i < length; i++) {\n        result = result + str[i];\n    }\n    return result;\n}",
            "3.function truncateString(str, length) {\n    let result = '';\n    for(let i = str.length - 1; i >= str.length - length; i--) {\n        result = str[i] + result;\n    }\n    return result + '...';\n}"
        ],
        correctIndex: 0
    },
    {
        question: "配列内の数値を指定された桁数に丸める関数は？",
        choices: [
            "1.function roundArray(arr, decimals) {\n    return arr.map(num => Number(num.toFixed(decimals)));\n}",
            "2.function roundArray(arr, decimals) {\n    return arr.map(num => Math.floor(num));\n}",
            "3.function roundArray(arr, decimals) {\n    return arr.map(num => num.toString());\n}"
        ],
        correctIndex: 0
    },
    {
        question: "文字列内の指定された単語を別の単語に置換する関数は？",
        choices: [
            "1.function replaceWord(str, oldWord, newWord) {\n    return str.toUpperCase();\n}",
            "2.function replaceWord(str, oldWord, newWord) {\n    return str.replaceAll(oldWord, newWord);\n}",
            "3.function replaceWord(str, oldWord, newWord) {\n    return str.split(oldWord);\n}"
        ],
        correctIndex: 1
    },
    {
        question: "配列内の数値の3つずつの平均を計算する関数（例：[1,2,3,4,5] → [2,3,4]）は？",
        choices: [
            "1.function calculateGroupAverage(arr) {\n    let result = [];\n    for(let i = 0; i < arr.length - 2; i++) {\n        let sum = arr[i] + arr[i + 1] + arr[i + 2];\n        result.push(sum / 3);\n    }\n    return result;\n}",
            "2.function calculateGroupAverage(arr) {\n    let result = [];\n    for(let i = 0; i < arr.length; i++) {\n        let sum = arr[i] + arr[i + 1] + arr[i + 2];\n        result.push(sum / 3);\n    }\n    return result;\n}",
            "3.function calculateGroupAverage(arr) {\n    let result = [];\n    for(let i = 0; i < arr.length; i = i + 3) {\n        let sum = arr[i] + arr[i + 1] + arr[i + 2];\n        result.push(sum / 3);\n    }\n    return result;\n}"
        ],
        correctIndex: 0
    },
    {
        question: "数値を金額表記に変換する関数（3桁区切りのカンマ付き）は？",
        choices: [
            "1.function formatCurrency(number) {\n    return number.toString();\n}",
            "2.function formatCurrency(number) {\n    return Math.round(number);\n}",
            "3.function formatCurrency(number) {\n    return number.toLocaleString();\n}"
        ],
        correctIndex: 2
    },
    {
        question: "配列内の要素を指定された順序で並べ替える関数は？",
        choices: [
            "1.function customSort(arr, order) {\n    let result = [];\n    for(let i = 0; i < order.length; i++) {\n        result.push(arr[i]);\n    }\n    return result;\n}",
            "2.function customSort(arr, order) {\n    let result = [];\n    for(let i = 0; i < order.length; i++) {\n        for(let j = 0; j < arr.length; j++) {\n            if(order[i] === arr[j]) {\n                result.push(arr[j]);\n            }\n        }\n    }\n    return result;\n}",
            "3.function customSort(arr, order) {\n    let result = [];\n    for(let i = 0; i < arr.length; i++) {\n        for(let j = 0; j < order.length; j++) {\n            if(arr[i] === order[j]) {\n                result.push(arr[i]);\n            }\n        }\n    }\n    return result;\n}"
        ],
        correctIndex: 1
    },
    {
        question: "文字列の中で最も長い単語を見つける関数は？",
        choices: [
            "1.function findLongestWord(str) {\n    return str.split(' ').reduce((longest, word) => \n        word.length > longest.length ? word : longest, '');\n}",
            "2.function findLongestWord(str) {\n    return str.length;\n}",
            "3.function findLongestWord(str) {\n    return str.split(' ')[0];\n}"
        ],
        correctIndex: 0
    },
    {
        question: "日付文字列をフォーマットする関数は？(YYYY-MM-DD → DD/MM/YYYY)",
        choices: [
            "1.function formatDate(dateStr) {\n    return dateStr.replaceAll('-', '/');\n}",
            "2.function formatDate(dateStr) {\n    const [year, month, day] = dateStr.split('-');\n    return `${day}/${month}/${year}`;\n}",
            "3.function formatDate(dateStr) {\n    return dateStr.split('-').join('/');\n}"
        ],
        correctIndex: 1
    },
    {
        question: "配列内の数値を指定された範囲内に収める関数は？",
        choices: [
            "1.function clampNumbers(arr, min, max) {\n    return arr.map(num => Math.min(Math.max(num, min), max));\n}",
            "2.function clampNumbers(arr, min, max) {\n    return arr.filter(num => num >= min && num <= max);\n}",
            "3.function clampNumbers(arr, min, max) {\n    return arr.map(num => min);\n}"
        ],
        correctIndex: 0
    },
    {
        question: "時間文字列を分数に変換する関数は？(例: '2:30' → 150分)",
        choices: [
            "1.function timeToMinutes(timeStr) {\n    return parseInt(timeStr);\n}",
            "2.function timeToMinutes(timeStr) {\n    const [hours, minutes] = timeStr.split(':');\n    return hours * 60 + parseInt(minutes);\n}",
            "3.function timeToMinutes(timeStr) {\n    return timeStr.length;\n}"
        ],
        correctIndex: 1
    },
    {
        question: "文字列を指定された回数繰り返す関数は？",
        choices: [
            "1.function repeatString(str, count) {\n    return str.length * count;\n}",
            "2.function repeatString(str, count) {\n    return str.split('');\n}",
            "3.function repeatString(str, count) {\n    return str.repeat(count);\n}"
        ],
        correctIndex: 2
    },
    {
        question: "配列内の要素を左に1つずらす関数は？",
        choices: [
            "1.function rotateLeft(arr) {\n    const first = arr.shift();\n    arr.push(first);\n    return arr;\n}",
            "2.function rotateLeft(arr) {\n    return arr.reverse();\n}",
            "3.function rotateLeft(arr) {\n    return arr.sort();\n}"
        ],
        correctIndex: 0
    },
    {
        question: "文字列内の数字の合計を計算する関数は？",
        choices: [
            "1.function sumDigits(str) {\n    let sum = 0;\n    for(let i = 0; i < str.length; i++) {\n        if(str[i] === '0') sum = sum + 0;\n        if(str[i] === '1') sum = sum + 1;\n        if(str[i] === '2') sum = sum + 2;\n        if(str[i] === '3') sum = sum + 3;\n        if(str[i] === '4') sum = sum + 4;\n        if(str[i] === '5') sum = sum + 5;\n        if(str[i] === '6') sum = sum + 6;\n        if(str[i] === '7') sum = sum + 7;\n        if(str[i] === '8') sum = sum + 8;\n        if(str[i] === '9') sum = sum + 9;\n    }\n    return sum;\n}",
            "2.function sumDigits(str) {\n    let sum = 0;\n    for(let i = 0; i < str.length; i++) {\n        sum = sum + Number(str[i]);\n    }\n    return sum;\n}",
            "3.function sumDigits(str) {\n    let sum = 0;\n    for(let i = 0; i < str.length; i++) {\n        if(str[i] >= '0' && str[i] <= '9') {\n            sum = sum + Number(str[i]);\n        }\n    }\n    return sum;\n}"
        ],
        correctIndex: 2
    },
    {
        question: "指定された条件に一致する配列の要素のインデックスを全て返す関数は？",
        choices: [
            "1.function findAllIndexes(arr, element) {\n    let result = [];\n    for(let i = 0; i < arr.length; i++) {\n        if(arr[i] === element) {\n            result.push(i);\n            return result;\n        }\n    }\n    return result;\n}",
            "2.function findAllIndexes(arr, element) {\n    let result = [];\n    for(let i = 0; i < arr.length; i++) {\n        if(arr[i] === element) {\n            result.push(arr[i]);\n        }\n    }\n    return result;\n}",
            "3.function findAllIndexes(arr, element) {\n    let result = [];\n    for(let i = 0; i < arr.length; i++) {\n        if(arr[i] === element) {\n            result.push(i);\n        }\n    }\n    return result;\n}"
        ],
        correctIndex: 2
    },
    {
        question: "2つの文字列がアナグラムかどうかをチェックする関数は？",
        choices: [
            "1.function areAnagrams(str1, str2) {\n    if(str1.length !== str2.length) {\n        return false;\n    }\n    let count1 = {};\n    let count2 = {};\n    \n    for(let i = 0; i < str1.length; i++) {\n        if(count1[str1[i]]) {\n            count1[str1[i]] = count1[str1[i]] + 1;\n        } else {\n            count1[str1[i]] = 1;\n        }\n    }\n    \n    for(let i = 0; i < str2.length; i++) {\n        if(count2[str2[i]]) {\n            count2[str2[i]] = count2[str2[i]] + 1;\n        } else {\n            count2[str2[i]] = 1;\n        }\n    }\n    \n    for(let char in count1) {\n        if(count1[char] !== count2[char]) {\n            return false;\n        }\n    }\n    return true;\n}",
            "2.function areAnagrams(str1, str2) {\n    if(str1.length !== str2.length) {\n        return false;\n    }\n    \n    for(let i = 0; i < str1.length; i++) {\n        if(str1[i] !== str2[i]) {\n            return false;\n        }\n    }\n    return true;\n}",
            "3.function areAnagrams(str1, str2) {\n    if(str1.length !== str2.length) {\n        return false;\n    }\n    \n    for(let i = 0; i < str1.length; i++) {\n        let found = false;\n        for(let j = 0; j < str2.length; j++) {\n            if(str1[i] === str2[j]) {\n                found = true;\n                break;\n            }\n        }\n        if(!found) {\n            return false;\n        }\n    }\n    return true;\n}"
        ],
        correctIndex: 0
    },
    {
        question: "配列内の数値の階差数列（隣り合う要素の差）を返す関数は？",
        choices: [
            "1.function getDifferences(arr) {\n    let result = [];\n    for(let i = 0; i < arr.length - 1; i++) {\n        result.push(arr[i + 1] - arr[i]);\n    }\n    return result;\n}",
            "2.function getDifferences(arr) {\n    let result = [];\n    for(let i = 0; i < arr.length - 1; i++) {\n        result.push(arr[i] - arr[i + 1]);\n    }\n    return result;\n}",
            "3.function getDifferences(arr) {\n    let result = [];\n    for(let i = 1; i < arr.length; i++) {\n        result.push(arr[i]);\n    }\n    return result;\n}"
        ],
        correctIndex: 0
    },
    {
        question: "文字列の各単語の最初の文字を大文字にする関数は？",
        choices: [
            "1.function capitalizeWords(str) {\n    let words = str.split(' ');\n    let result = [];\n    for(let i = 0; i < words.length; i++) {\n        let firstLetter = words[i][0].toUpperCase();\n        let restOfWord = words[i].slice(1);\n        result.push(firstLetter + restOfWord);\n    }\n    return result.join(' ');\n}",
            "2.function capitalizeWords(str) {\n    let result = '';\n    for(let i = 0; i < str.length; i++) {\n        result = result + str[i].toUpperCase();\n    }\n    return result;\n}",
            "3.function capitalizeWords(str) {\n    let words = str.split(' ');\n    let result = [];\n    for(let i = 0; i < words.length; i++) {\n        result.push(words[i].toUpperCase());\n    }\n    return result.join(' ');\n}"
        ],
        correctIndex: 0
    },
    {
        question: "配列内の要素を指定された個数ごとにグループ化する関数は？",
        choices: [
            "1.function groupElements(arr, size) {\n    let result = [];\n    let group = [];\n    for(let i = 0; i < arr.length; i++) {\n        group.push(arr[i]);\n        if(group.length === size || i === arr.length - 1) {\n            result.push(group);\n            group = [];\n        }\n    }\n    return result;\n}",
            "2.function groupElements(arr, size) {\n    let result = [];\n    for(let i = 0; i < arr.length; i += size) {\n        let group = [];\n        for(let j = i; j < i + size && j < arr.length; j++) {\n            group.push(arr[j]);\n        }\n        result.push(group);\n    }\n    return result;\n}",
            "3.function groupElements(arr, size) {\n    let result = [];\n    for(let i = 0; i < arr.length; i++) {\n        if(i < size) {\n            result.push([arr[i]]);\n        }\n    }\n    return result;\n}"
        ],
        correctIndex: 1
    },
    {
        question: "配列内の数値を降順（大きい順）にソートする関数は？",
        choices: [
            "1.function sortDescending(arr) {\n    let result = [];\n    for(let i = 0; i < arr.length; i++) {\n        for(let j = i + 1; j < arr.length; j++) {\n            if(arr[i] < arr[j]) {\n                let temp = arr[i];\n                arr[i] = arr[j];\n                arr[j] = temp;\n            }\n        }\n    }\n    return arr;\n}",
            "2.function sortDescending(arr) {\n    let result = [];\n    for(let i = 0; i < arr.length; i++) {\n        result.unshift(arr[i]);\n    }\n    return result;\n}",
            "3.function sortDescending(arr) {\n    let result = [];\n    for(let i = arr.length - 1; i >= 0; i--) {\n        result.push(arr[i]);\n    }\n    return result;\n}"
        ],
        correctIndex: 0
    },
    {
        question: "文字列内の単語を逆順にする関数（単語自体は逆にしない）は？",
        choices: [
            "1.function reverseWords(str) {\n    return str.split(' ').reverse().join(' ');\n}",
            "2.function reverseWords(str) {\n    return str.split('').reverse().join('');\n}",
            "3.function reverseWords(str) {\n    return str.split(' ').join('');\n}"
        ],
        correctIndex: 0
    },
    {
        question: "指定された文字で配列の要素を結合し、前後にも付ける関数は？",
        choices: [
            "1.function wrapJoin(arr, separator) {\n    return arr.join(separator);\n}",
            "2.function wrapJoin(arr, separator) {\n    return arr.toString();\n}",
            "3.function wrapJoin(arr, separator) {\n    return separator + arr.join(separator) + separator;\n}"
        ],
        correctIndex: 2
    },
    {
        question: "オブジェクトから指定されたキーの値だけを取り出す関数は？",
        choices: [
            "1.function pickKeys(obj, keys) {\n    return Object.fromEntries(keys.map(key => [key, obj[key]]));\n}",
            "2.function pickKeys(obj, keys) {\n    return Object.keys(obj);\n}",
            "3.function pickKeys(obj, keys) {\n    return Object.values(obj);\n}"
        ],
        correctIndex: 0
    },
    {
        question: "文字列内の特定のパターンにマッチする部分を数える関数は？",
        choices: [
            "1.function countPattern(str, pattern) {\n    let count = 0;\n    for(let i = 0; i <= str.length - pattern.length; i++) {\n        let match = true;\n        for(let j = 0; j < pattern.length; j++) {\n            if(str[i + j] !== pattern[j]) {\n                match = false;\n                break;\n            }\n        }\n        if(match) {\n            count = count + 1;\n        }\n    }\n    return count;\n}",
            "2.function countPattern(str, pattern) {\n    let count = 0;\n    for(let i = 0; i < str.length; i++) {\n        if(str[i] === pattern[0]) {\n            count = count + 1;\n        }\n    }\n    return count;\n}",
            "3.function countPattern(str, pattern) {\n    let count = 0;\n    let position = 0;\n    while(position < str.length) {\n        position = str.indexOf(pattern, position);\n        if(position === -1) break;\n        count = count + 1;\n        position = position + 1;\n    }\n    return count;\n}"
        ],
        correctIndex: 0
    },
    {
        question: "配列内の重複する要素を指定された回数だけ残す関数は？",
        choices: [
            "1.function limitDuplicates(arr, limit) {\n    const count = {};\n    return arr.filter(item => {\n        count[item] = (count[item] || 0) + 1;\n        return count[item] <= limit;\n    });\n}",
            "2.function limitDuplicates(arr, limit) {\n    return Array.from(new Set(arr));\n}",
            "3.function limitDuplicates(arr, limit) {\n    return arr.slice(0, limit);\n}"
        ],
        correctIndex: 0
    },
    {
        question: "2つの配列の要素を交互に結合する関数は？",
        choices: [
            "1.function interleave(arr1, arr2) {\n    return arr1.concat(arr2);\n}",
            "2.function interleave(arr1, arr2) {\n    return Array.from(\n        { length: Math.max(arr1.length, arr2.length) },\n        (_, i) => [arr1[i], arr2[i]]\n    ).flat().filter(x => x !== undefined);\n}",
            "3.function interleave(arr1, arr2) {\n    return arr1;\n}"
        ],
        correctIndex: 1
    },
    {
        question: "文字列内の連続する重複文字を1つにまとめる関数は？",
        choices: [
            "1.function removeDuplicateChars(str) {\n    let result = '';\n    for(let i = 0; i < str.length; i++) {\n        if(str[i] !== str[i-1]) {\n            result = result + str[i];\n        }\n    }\n    return result;\n}",
            "2.function removeDuplicateChars(str) {\n    let result = '';\n    for(let i = 0; i < str.length; i++) {\n        let isDuplicate = false;\n        for(let j = 0; j < result.length; j++) {\n            if(str[i] === result[j]) {\n                isDuplicate = true;\n                break;\n            }\n        }\n        if(!isDuplicate) {\n            result = result + str[i];\n        }\n    }\n    return result;\n}",
            "3.function removeDuplicateChars(str) {\n    let result = '';\n    for(let i = 0; i < str.length; i++) {\n        if(result.indexOf(str[i]) === -1) {\n            result = result + str[i];\n        }\n    }\n    return result;\n}"
        ],
        correctIndex: 0
    },
    {
        question: "配列内の要素を指定された数で割った余りでグループ化する関数は？",
        choices: [
            "1.function groupByRemainder(arr, divisor) {\n    return arr.reduce((groups, num) => {\n        const remainder = num % divisor;\n        groups[remainder] = [...(groups[remainder] || []), num];\n        return groups;\n    }, {});\n}",
            "2.function groupByRemainder(arr, divisor) {\n    return arr.map(x => x % divisor);\n}",
            "3.function groupByRemainder(arr, divisor) {\n    return Object.fromEntries(arr);\n}"
        ],
        correctIndex: 0
    },
    {
        question: "数値を指定された桁数の文字列に変換する関数（0埋め）は？", //padStartは文字列を指定された長さになるよう穴埋めする
        choices: [
            "1.function padNumber(num, length) {\n    return num.toString();\n}",
            "2.function padNumber(num, length) {\n    return num.padStart(length);\n}",
            "3.function padNumber(num, length) {\n    return String(num).padStart(length, '0');\n}"
        ],
        correctIndex: 2
    },
    {
        question: "文字列の配列から最も多く出現する文字列を見つける関数は？",
        choices: [
            "1.function mostFrequentString(arr) {\n    return arr.reduce((acc, curr) => {\n        acc[curr] = (acc[curr] || 0) + 1;\n        return acc;\n    }, {});\n}",
            "2.function mostFrequentString(arr) {\n    const freq = {};\n    arr.forEach(str => freq[str] = (freq[str] || 0) + 1);\n    return Object.entries(freq).reduce((a, b) => b[1] > a[1] ? b : a)[0];\n}",
            "3.function mostFrequentString(arr) {\n    return arr[0];\n}"
        ],
        correctIndex: 1
    },
    {
        question: "指定された数値範囲内の全ての数値を配列として返す関数は？",
        choices: [
            "1.function range(start, end) {\n    let result = [];\n    for(let i = start; i <= end; i++) {\n        result.push(i);\n    }\n    return result;\n}",
            "2.function range(start, end) {\n    let result = [];\n    result.push(start);\n    result.push(end);\n    return result;\n}",
            "3.function range(start, end) {\n    let result = [];\n    for(let i = 0; i < end; i++) {\n        result.push(i);\n    }\n    return result;\n}"
        ],
        correctIndex: 0
    },
    {
        question: "オブジェクトの配列から特定の条件を満たす要素を検索する関数は？",
        choices: [
            "1.function findByProperty(arr, prop, value) {\n    for(let i = 0; i < arr.length; i++) {\n        if(arr[i][prop] === value) {\n            return arr[i];\n        }\n    }\n    return null;\n}",
            "2.function findByProperty(arr, prop, value) {\n    let result = [];\n    for(let i = 0; i < arr.length; i++) {\n        if(arr[i][prop] === value) {\n            result.push(arr[i]);\n        }\n    }\n    return result;\n}",
            "3.function findByProperty(arr, prop, value) {\n    for(let i = 0; i < arr.length; i++) {\n        if(arr[i] === value) {\n            return arr[i];\n        }\n    }\n    return null;\n}"
        ],
        correctIndex: 0
    },
    {
        question: "文字列を指定された区切り文字で分割し、前後の空白を削除する関数は？",
        choices: [
            "1.function splitAndTrim(str, separator) {\n    let parts = str.split(separator);\n    let result = [];\n    for(let i = 0; i < parts.length; i++) {\n        let trimmed = '';\n        let part = parts[i];\n  let start = 0;\n        while(start < part.length && part[start] === ' ') {\n            start++;\n        }\n   let end = part.length - 1;\n        while(end >= 0 && part[end] === ' ') {\n            end--;\n        }\n   for(let j = start; j <= end; j++) {\n            trimmed = trimmed + part[j];\n        }\n        result.push(trimmed);\n    }\n    return result;\n}",
            "2.function splitAndTrim(str, separator) {\n    return str.split(separator);\n}",
            "3.function splitAndTrim(str, separator) {\n    let parts = str.split(separator);\n    let result = [];\n    for(let i = 0; i < parts.length; i++) {\n        if(parts[i] !== ' ') {\n            result.push(parts[i]);\n        }\n    }\n    return result;\n}"
        ],
        correctIndex: 0
    },
    {
        question: "配列内の要素を指定された数だけ右にローテーションする関数は？",
        choices: [
            "1.function rotateRight(arr, k) {\n    let result = [];\n    for(let i = 0; i < arr.length; i++) {\n        let newPosition = (i + k) % arr.length;\n        result[newPosition] = arr[i];\n    }\n    return result;\n}",
            "2.function rotateRight(arr, k) {\n    let result = [];\n    for(let i = 0; i < arr.length; i++) {\n        result.push(arr[arr.length - 1 - i]);\n    }\n    return result;\n}",
            "3.function rotateRight(arr, k) {\n    let result = [];\n    for(let i = k; i < arr.length; i++) {\n        result.push(arr[i]);\n    }\n    return result;\n}"
        ],
        correctIndex: 0
    },
    {
        question: "文字列の中から指定されたキーワードの前後の文字を抽出する関数は？",
        choices: [
            "1.function extractContext(str, keyword, contextLength) {\n    for(let i = 0; i < str.length; i++) {\n        let found = true;\n  for(let j = 0; j < keyword.length; j++) {\n            if(str[i + j] !== keyword[j]) {\n                found = false;\n                break;\n            }\n        }\n        if(found) {\n            let start = Math.max(0, i - contextLength);\n            let end = Math.min(str.length, i + keyword.length + contextLength);\n            let result = '';\n            for(let k = start; k < end; k++) {\n                result = result + str[k];\n            }\n            return result;\n        }\n    }\n    return '';\n}",
            "2.function extractContext(str, keyword, contextLength) {\n    let result = '';\n    for(let i = 0; i < str.length; i++) {\n        if(str[i] === keyword[0]) {\n            result = result + str[i];\n        }\n    }\n    return result;\n}",
            "3.function extractContext(str, keyword, contextLength) {\n    let result = '';\n    for(let i = 0; i < str.length; i++) {\n        result = result + str[i];\n    }\n    return result;\n}"
        ],
        correctIndex: 0
    },
    {
        question: "配列の中で最も大きい数値とその次に大きい数値を探す関数は？",
        choices: [
            "1.function findTopTwo(arr) {\n    let largest = arr[0];\n    let secondLargest = arr[0];\n    \n    for(let i = 0; i < arr.length; i++) {\n        if(arr[i] > largest) {\n            secondLargest = largest;\n            largest = arr[i];\n        } else if(arr[i] > secondLargest && arr[i] !== largest) {\n            secondLargest = arr[i];\n        }\n    }\n    return [largest, secondLargest];\n}",
            "2.function findTopTwo(arr) {\n    let largest = arr[0];\n    let secondLargest = arr[0];\n    \n    for(let i = 0; i < arr.length; i++) {\n        if(arr[i] > largest) {\n            largest = arr[i];\n        }\n    }\n    return [largest, largest];\n}",
            "3.function findTopTwo(arr) {\n    let result = [];\n    for(let i = 0; i < 2; i++) {\n        result.push(arr[i]);\n    }\n    return result;\n}"
        ],
        correctIndex: 0
    },
    {
        question: "数値の配列から指定された合計値になる2つの要素のインデックスを見つける関数は？",
        choices: [
            "1.function findPairIndices(arr, targetSum) {\n    for(let i = 0; i < arr.length; i++) {\n        for(let j = i + 1; j < arr.length; j++) {\n            if(arr[i] + arr[j] === targetSum) {\n                return [i, j];\n            }\n        }\n    }\n    return null;\n}",
            "2.function findPairIndices(arr, targetSum) {\n    for(let i = 0; i < arr.length; i++) {\n        if(arr[i] === targetSum) {\n            return [i];\n        }\n    }\n    return null;\n}",
            "3.function findPairIndices(arr, targetSum) {\n    for(let i = 0; i < arr.length - 1; i++) {\n        if(arr[i] + arr[i + 1] === targetSum) {\n            return [i, i + 1];\n        }\n    }\n    return null;\n}"
        ],
        correctIndex: 0
    },
    {
        question: "オブジェクトのネストされたキーの値を取得する関数は？",
        choices: [
            "1.function getNestedValue(obj, keyPath) {\n    return obj[keyPath];\n}",
            "2.function getNestedValue(obj, keyPath) {\n    return keyPath.split('.').reduce((o, k) => (o || {})[k], obj);\n}",
            "3.function getNestedValue(obj, keyPath) {\n    return Object.keys(obj);\n}"
        ],
        correctIndex: 1
    },
    {
        question: "配列の中から3より大きい数値を見つけて、その数値と位置を返す関数は？",
        choices: [
            "1.function findLargeNumbers(arr) {\n    let result = [];\n    for(let i = 0; i < arr.length; i++) {\n        result.push(i);\n    }\n    return result;\n}",
            "2.function findLargeNumbers(arr) {\n    let result = [];\n    for(let i = 0; i < arr.length; i++) {\n        if(arr[i] > 3) {\n            result.push(arr[i]);\n        }\n    }\n    return result;\n}",
            "3.function findLargeNumbers(arr) {\n    let result = [];\n    for(let i = 0; i < arr.length; i++) {\n        if(arr[i] > 3) {\n            result.push({\n                number: arr[i],\n                position: i\n            });\n        }\n    }\n    return result;\n}"
        ],
        correctIndex: 2
    },
    {
        question: "文字列の中の指定された文字の位置を全て返す関数は？",
        choices: [
            "1.function findAllPositions(str, char) {\n    let positions = [];\n    for(let i = 0; i < str.length; i++) {\n        if(str[i] === char) {\n            positions.push(i);\n        }\n    }\n    return positions;\n}",
            "2.function findAllPositions(str, char) {\n    let position = -1;\n    for(let i = 0; i < str.length; i++) {\n        if(str[i] === char) {\n            position = i;\n            break;\n        }\n    }\n    return position;\n}",
            "3.function findAllPositions(str, char) {\n    let count = 0;\n    for(let i = 0; i < str.length; i++) {\n        if(str[i] === char) {\n            count = count + 1;\n        }\n    }\n    return count;\n}"
        ],
        correctIndex: 0
    },
    {
        question: "オブジェクトの配列を指定されたキーの値でグループ化する関数は？",
        choices: [
            "1.function groupByKey(arr, key) {\n    let groups = {};\n    for(let i = 0; i < arr.length; i++) {\n        let value = arr[i][key];\n        if(!groups[value]) {\n            groups[value] = [];\n        }\n        groups[value].push(arr[i]);\n    }\n    return groups;\n}",
            "2.function groupByKey(arr, key) {\n    let result = {};\n    for(let i = 0; i < arr.length; i++) {\n        result[arr[i][key]] = arr[i];\n    }\n    return result;\n}",
            "3.function groupByKey(arr, key) {\n    let values = [];\n    for(let i = 0; i < arr.length; i++) {\n        values.push(arr[i][key]);\n    }\n    return values;\n}"
        ],
        correctIndex: 0
    },
    {
        question: "指定された範囲内のランダムな整数を重複なく生成する関数は？",
        choices: [
            "1.function generateUniqueRandom(min, max, count) {\n    let numbers = [];\n    for(let i = min; i <= max; i++) {\n        numbers.push(i);\n    }\n    \n    let result = [];\n    while(result.length < count && numbers.length > 0) {\n        let randomIndex = Math.floor(Math.random() * numbers.length);\n        result.push(numbers[randomIndex]);\n        numbers.splice(randomIndex, 1);\n    }\n    return result;\n}",
            "2.function generateUniqueRandom(min, max, count) {\n    let result = [];\n    for(let i = 0; i < count; i++) {\n        result.push(Math.floor(Math.random() * (max - min + 1)) + min);\n    }\n    return result;\n}",
            "3.function generateUniqueRandom(min, max, count) {\n    let result = [];\n    for(let i = min; i < min + count; i++) {\n        result.push(i);\n    }\n    return result;\n}"
        ],
        correctIndex: 0
    },
    {
        question: "配列内の数値を昇順（小さい順）に並び替える関数は？",
        choices: [
            "1.function sortNumbers(arr) {\n    for(let i = 0; i < arr.length; i++) {\n        for(let j = i + 1; j < arr.length; j++) {\n            if(arr[i] > arr[j]) {\n                let temp = arr[i];\n                arr[i] = arr[j];\n                arr[j] = temp;\n            }\n        }\n    }\n    return arr;\n}",
            "2.function sortNumbers(arr) {\n    let result = [];\n    for(let i = 0; i < arr.length; i++) {\n        result.push(arr[i]);\n    }\n    return result;\n}",
            "3.function sortNumbers(arr) {\n    let result = [];\n    for(let i = arr.length - 1; i >= 0; i--) {\n        result.push(arr[i]);\n    }\n    return result;\n}"
        ],
        correctIndex: 0
    },
    {
        question: "配列内の要素を指定された条件で分割する関数は？",
        choices: [
            "1. function partitionArray(arr, condition) {\n    let trueGroup = [];\n    let falseGroup = [];\n    \n    for(let item of arr) {\n        if(condition(item)) {\n            trueGroup.push(item);\n        } else {\n            falseGroup.push(item);\n        }\n    }\n    return [trueGroup, falseGroup];\n}",
            "2. function partitionArray(arr, condition) {\n    let result = [];\n    \n    for(let item of arr) {\n        if(condition(item)) {\n            result.push(item);\n        }\n    }\n    return result;\n}",
            "3. function partitionArray(arr, condition) {\n    let result = [];\n    \n    for(let item of arr) {\n        result.push(item);\n    }\n    return result;\n}"
        ]
    },
    {
        question: "与えられた年月日の配列から「2024年3月20日」のような形式の文字列を作る関数は？",
        choices: [
            "1.function createDateString(dateArray) {\n    let year = dateArray[0];\n    let month = dateArray[1];\n    let day = dateArray[2];\n    return year + '年' + month + '月' + day + '日';\n}",
            "2.function createDateString(dateArray) {\n    let year = dateArray[0];\n    let month = dateArray[1];\n    let day = dateArray[2];\n    if(month < 10) {\n        month = '0' + month;\n    }\n    if(day < 10) {\n        day = '0' + day;\n    }\n    return year + '年' + month + '月' + day + '日';\n}",
            "3.function createDateString(dateArray) {\n    return dateArray[0] + dateArray[1] + dateArray[2];\n}"
        ],
        correctIndex: 1
    }, {
        question: "配列内の要素を指定された関数で変換し、元の位置を保持する関数は？",
        choices: [
            "1.function mapWithPosition(arr, fn) {\n    let result = [];\n    for(let i = 0; i < arr.length; i++) {\n        result.push({\n            value: fn(arr[i]),\n            originalIndex: i\n        });\n    }\n    return result;\n}",
            "2.function mapWithPosition(arr, fn) {\n    let result = [];\n    for(let i = 0; i < arr.length; i++) {\n        result.push(fn(arr[i]));\n    }\n    return result;\n}",
            "3.function mapWithPosition(arr, fn) {\n    let result = [];\n    for(let i = 0; i < arr.length; i++) {\n        result.push({\n            value: arr[i],\n            originalIndex: i\n        });\n    }\n    return result;\n}"
        ],
        correctIndex: 0
    },
    {
        question: "文字列内の括弧の対応が正しいかチェックする関数は？",
        choices: [
            "1.function checkBrackets(str) {\n    let count = 0;\n    for(let i = 0; i < str.length; i++) {\n        if(str[i] === '(') {\n            count = count + 1;\n        } else if(str[i] === ')') {\n            count = count - 1;\n        }\n        if(count < 0) {\n            return false;\n        }\n    }\n    return count === 0; \n}",
            "2.function checkBrackets(str) {\n    let openCount = 0;\n    let closeCount = 0;\n    for(let i = 0; i < str.length; i++) {\n        if(str[i] === '(') {\n            openCount = openCount + 1;\n        } else if(str[i] === ')') {\n            closeCount = closeCount + 1;\n        }\n    }\n    return openCount === closeCount;  \n}",
            "3.function checkBrackets(str) {\n    let result = 0;\n    for(let i = 0; i < str.length; i++) {\n        if(str[i] === '(' || str[i] === ')') {\n            result = result + 1;\n        }\n    }\n    return result % 2 === 0;\n}"
        ],
        correctIndex: 0
    },
    {
        question: "配列内の指定された要素を別の要素に置換する関数は？",
        choices: [
            "1.function replaceElements(arr, oldVal, newVal) {\n    let result = [];\n    for(let i = 0; i < arr.length; i++) {\n        if(arr[i] === oldVal) {\n            result.push(newVal);\n        } else {\n            result.push(arr[i]);\n        }\n    }\n    return result;\n}",
            "2.function replaceElements(arr, oldVal, newVal) {\n    let result = [];\n    for(let i = 0; i < arr.length; i++) {\n        if(arr[i] === oldVal) {\n            result.push(newVal);\n            break;\n        } else {\n            result.push(arr[i]);\n        }\n    }\n    return result;\n}",
            "3.function replaceElements(arr, oldVal, newVal) {\n    let result = [];\n    for(let i = 0; i < arr.length; i++) {\n        if(arr[i] === oldVal) {\n            continue; \n        }\n        result.push(arr[i]);\n    }\n    return result;\n}"
        ],
        correctIndex: 0
    },
    {
        question: "数値の下位n桁を抽出する関数は？",
        choices: [
            "1.function getLastDigits(num, n) {\n    return num % Math.pow(10, n);\n}",
            "2.function getLastDigits(num, n) {\n    return Number(num.toString().slice(-n));\n}",
            "3.function getLastDigits(num, n) {\n    return num;\n}"
        ],
        correctIndex: 1
    },
    {
        question: "文字列内の全ての数値を合計する関数は？",
        choices: [
            "1.function sumNumbers(str) {\n    let sum = 0;\n    let currentNumber = '';\n    \n    for(let i = 0; i < str.length; i++) {\n        if(str[i] >= '0' && str[i] <= '9') {\n            currentNumber = currentNumber + str[i];\n        } else if(currentNumber !== '') {\n            sum = sum + Number(currentNumber);\n            currentNumber = '';\n        }\n    }\n    if(currentNumber !== '') {\n        sum = sum + Number(currentNumber);\n    }\n    return sum;\n}",
            "2.function sumNumbers(str) {\n    let sum = 0;\n    for(let i = 0; i < str.length; i++) {\n        if(str[i] >= '0' && str[i] <= '9') {\n            sum = sum + Number(str[i]);\n        }\n    }\n    return sum;\n}",
            "3.function sumNumbers(str) {\n    let sum = 0;\n    let currentNumber = '';\n    \n    for(let i = 0; i < str.length; i++) {\n        if(str[i] >= '0' && str[i] <= '9') {\n            sum = sum + 1;\n        }\n    }\n    return sum;\n}"
        ],
        correctIndex: 0
    },
    {
        question: "配列の要素を2つごとに入れ替える関数は？（例：[1,2,3,4] → [2,1,4,3]）",
        choices: [
            "1.function swapPairs(arr) {\n    let result = [];\n    for(let i = 0; i < arr.length; i = i + 2) {\n        if(i + 1 < arr.length) {\n            result.push(arr[i + 1]);\n            result.push(arr[i]);\n        } else {\n            result.push(arr[i]);\n        }\n    }\n    return result;\n}",
            "2.function swapPairs(arr) {\n    let result = [];\n    for(let i = 0; i < arr.length; i++) {\n        result.push(arr[arr.length - 1 - i]);\n    }\n    return result;\n}",
            "3.function swapPairs(arr) {\n    let result = [];\n    for(let i = 0; i < arr.length; i = i + 2) {\n        result.push(arr[i]);\n        if(i + 1 < arr.length) {\n            result.push(arr[i + 1]);\n        }\n    }\n    return result;\n}"
        ],
        correctIndex: 0
    },
    {
        question: "2つの配列の差集合を求める関数は？（配列1にあって配列2にない要素を取り出す）",
        choices: [
            "1.function difference(arr1, arr2) {\n    let result = [];\n    for(let i = 0; i < arr1.length; i++) {\n        let isInArr2 = false;\n        for(let j = 0; j < arr2.length; j++) {\n            if(arr1[i] === arr2[j]) {\n                isInArr2 = true;\n                break;\n            }\n        }\n        if(!isInArr2) {\n            result.push(arr1[i]);\n        }\n    }\n    return result;\n}",
            "2.function difference(arr1, arr2) {\n    let result = [];\n    for(let i = 0; i < arr1.length; i++) {\n        result.push(arr1[i]);\n    }\n    for(let i = 0; i < arr2.length; i++) {\n        result.push(arr2[i]);\n    }\n    return result;\n}",
            "3.function difference(arr1, arr2) {\n    let result = [];\n    for(let i = 0; i < arr1.length; i++) {\n        if(arr1[i] !== arr2[i]) {\n            result.push(arr1[i]);\n        }\n    }\n    return result;\n}"
        ],
        correctIndex: 0
    },
    {
        question: "オブジェクトの特定のキーの値を更新する関数は？",
        choices: [
            "1.function updateObject(obj, key, value) {\n    let result = {};\n    for(let k in obj) {\n        if(k === key) {\n            result[k] = value;\n        } else {\n            result[k] = obj[k];\n        }\n    }\n    return result;\n}",
            "2.function updateObject(obj, key, value) {\n    let result = {};\n    for(let k in obj) {\n        result[k] = obj[k];\n    }\n    return result;\n}",
            "3.function updateObject(obj, key, value) {\n    let result = {};\n    for(let k in obj) {\n        if(k !== key) {\n            result[k] = obj[k];\n        }\n    }\n    return result;\n}"
        ],
        correctIndex: 0
    },
    {
        question: "文字列内の特定のパターンを全て置換する関数は？",
        choices: [
            "1.function replaceAll(str, pattern, replacement) {\n    return str;\n}",
            "2.function replaceAll(str, pattern, replacement) {\n    return str.split(pattern);\n}",
            "3.function replaceAll(str, pattern, replacement) {\n    return str.split(pattern).join(replacement);\n}"
        ],
        correctIndex: 2
    },
    {
        question: "配列内の要素を指定された小数点以下の桁数に丸める関数は？",
        choices: [
            "1.function roundElements(arr, decimals) {\n    let result = [];\n    for(let i = 0; i < arr.length; i++) {\n        let power = Math.pow(10, decimals);\n        let rounded = Math.round(arr[i] * power) / power;\n        result.push(rounded);\n    }\n    return result;\n}",
            "2.function roundElements(arr, decimals) {\n    let result = [];\n    for(let i = 0; i < arr.length; i++) {\n        result.push(Math.ceil(arr[i]));\n    }\n    return result;\n}",
            "3.function roundElements(arr, decimals) {\n    let result = [];\n    for(let i = 0; i < arr.length; i++) {\n        result.push(Math.floor(arr[i]));\n    }\n    return result;\n}"
        ],
        correctIndex: 0
    },
    {
        question: "配列内の要素を指定された間隔で区切る関数は？",
        choices: [
            "1.function insertSeparator(arr, separator, interval) {\n    return arr.reduce((result, item, index) => {\n        result.push(item);\n        if((index + 1) % interval === 0 && index < arr.length - 1) {\n            result.push(separator);\n        }\n        return result;\n    }, []);\n}",
            "2.function insertSeparator(arr, separator, interval) {\n    return arr.join(separator);\n}",
            "3.function insertSeparator(arr, separator, interval) {\n    return arr;\n}"
        ],
        correctIndex: 0
    },
    {
        question: "文字列内の各単語の最後の文字を大文字にする関数は？",
        choices: [
            "1.function capitalizeLastChar(str) {\n    let words = str.split(' ');\n    let result = [];\n    \n    for(let i = 0; i < words.length; i++) {\n        let word = words[i];\n        let lastChar = word[word.length - 1];\n        let restOfWord = '';\n        \n        for(let j = 0; j < word.length - 1; j++) {\n            restOfWord = restOfWord + word[j];\n        }\n        \n        result.push(restOfWord + lastChar.toUpperCase());\n    }\n    \n    return result.join(' ');\n}",
            "2.function capitalizeLastChar(str) {\n    let result = '';\n    for(let i = 0; i < str.length; i++) {\n        if(i === str.length - 1) {\n            result = result + str[i].toUpperCase();\n        } else {\n            result = result + str[i];\n        }\n    }\n    return result;\n}",
            "3.function capitalizeLastChar(str) {\n    let result = '';\n    for(let i = 0; i < str.length; i++) {\n        if(str[i + 1] === ' ' || i === str.length - 1) {\n            result = result + str[i].toLowerCase();\n        } else {\n            result = result + str[i].toUpperCase();\n        }\n    }\n    return result;\n}"
        ],
        correctIndex: 0
    },
    {
        question: "配列内の要素を指定された個数ずつ取り出す関数は？",
        choices: [
            "1.function takeElements(arr, count) {\n    let result = [];\n    for (let i = 0; i < arr.length; i += count) {\n        result.push(arr.slice(i, i + count));\n    }\n    return result;\n}",
            "2.function takeElements(arr, count) {\n    return arr.slice(0, count);\n}",
            "3.function takeElements(arr, count) {\n    return [arr];\n}"
        ],
        correctIndex: 0
    },
    {
        question: "指定された範囲内の数値かどうかをチェックする関数は？",
        choices: [
            "1.function isInRange(num, min, max) {\n    if(num >= min) {\n        if(num <= max) {\n            return true;\n        }\n    }\n    return false;\n}",
            "2.function isInRange(num, min, max) {\n    if(num > min) {\n        if(num < max) {\n            return true;\n        }\n    }\n    return false;\n}",
            "3.function isInRange(num, min, max) {\n    if(num === min) {\n        return true;\n    }\n    if(num === max) {\n        return true;\n    }\n    return false;\n}"
        ],
        correctIndex: 0
    },
    {
        question: "文字列の先頭と末尾の空白を削除する関数は？", //トリミング！！！！
        choices: [
            "1.function trimString(str) {\n    let start = 0;\n    let end = str.length - 1;\n    while (str[start] === ' ') start++;\n    while (str[end] === ' ') end--;\n    return str.slice(start, end + 1);\n}",
            "2.function trimString(str) {\n    return str.trim();\n}",
            "3.function trimString(str) {\n    return str;\n}"
        ],
        correctIndex: 1
    },
    {
        question: "配列内の数値の合計と平均を計算する関数は？",
        choices: [
            "1.function calculateStats(arr) {\n    let sum = 0;\n    for(let i = 0; i < arr.length; i++) {\n        sum = sum + arr[i];\n    }\n    \n    let average = sum / arr.length;\n    \n    return {\n        sum: sum,\n        average: average\n    };\n}",
            "2.function calculateStats(arr) {\n    let sum = 0;\n    for(let i = 0; i < arr.length; i++) {\n        sum = sum + arr[i];\n    }\n    \n    return {\n        sum: sum,\n        average: sum \n    };\n}",
            "3.function calculateStats(arr) {\n    let average = 0;\n    for(let i = 0; i < arr.length; i++) {\n        average = average + arr[i] / arr.length;\n    }\n    \n    return {\n        sum: average * arr.length,\n        average: average\n    };\n}"
        ],
        correctIndex: 0
    },
    {
        question: "指定された文字で文字列を囲む関数は？",
        choices: [
            "1.function wrapString(str, wrapper) {\n    return str;\n}",
            "2.function wrapString(str, wrapper) {\n    return wrapper + str + wrapper;\n}",
            "3.function wrapString(str, wrapper) {\n    return str + wrapper;\n}"
        ],
        correctIndex: 1
    },
    {
        question: "配列内の要素を指定された文字で結合する関数は？",
        choices: [
            "1.function joinWithSeparator(arr, separator) {\n    let result = '';\n    for (let i = 0; i < arr.length; i++) {\n        result += arr[i];\n        if (i < arr.length - 1) result += separator;\n    }\n    return result;\n}",
            "2.function joinWithSeparator(arr, separator) {\n    return arr.join(separator);\n}",
            "3.function joinWithSeparator(arr, separator) {\n    return arr.toString();\n}"
        ],
        correctIndex: 1
    },
    {
        question: "配列内の数値を小数点以下1桁に丸める関数は？",
        choices: [
            "1.function roundToOneDecimal(arr) {\n    return arr.map(num => Math.round(num * 10) / 10);\n}",
            "2.function roundToOneDecimal(arr) {\n    return arr.map(num => Math.floor(num));\n}",
            "3.function roundToOneDecimal(arr) {\n    return arr.map(num => parseInt(num));\n}"
        ],
        correctIndex: 0
    },
    {
        question: "文字列内のスペースを全てハイフンに置き換える関数は？",
        choices: [
            "1.function replaceSpaces(str) {\n    return str.split('');\n}",
            "2.function replaceSpaces(str) {\n    return str.replaceAll(' ', '-');\n}",
            "3.function replaceSpaces(str) {\n    return str.trim();\n}"
        ],
        correctIndex: 1
    },
    {
        question: "配列内の要素を指定された値で埋める関数は？",
        choices: [
            "1.function fillArray(length, value) {\n    return new Array(length).fill(value);\n}",
            "2.function fillArray(length, value) {\n    return [value];\n}",
            "3.function fillArray(length, value) {\n    return Array(length);\n}"
        ],
        correctIndex: 0
    },
    {
        question: "文字列を指定された回数だけ繰り返す関数は？",

        choices: [
            "1.function repeatString(str, times) {\n    return str * times;\n}",
            "2.function repeatString(str, times) {\n    return str.repeat(times);\n}",
            "3.function repeatString(str, times) {\n    let newStr = str;\n    times.forEach(() => {\n        newStr = newStr + str;\n    });\n    return newStr;\n}"
        ],
        correctIndex: 1
    },
    {
        question: "配列内の真偽値をカウントする関数は？",
        choices: [
            "1.function countBooleans(arr) {\n    return {\n        true: arr.filter(x => x === true).length,\n        false: arr.filter(x => x === false).length\n    };\n}",
            "2.function countBooleans(arr) {\n    let trueCount = 0;\n    let falseCount = 0;\n    for(let i = 0; i < arr.length; i++) {\n        if(arr[i] === true) trueCount++;\n        if(arr[i] === false) falseCount++;\n    }\n    return { true: trueCount, false: falseCount };\n}",
            "3.function countBooleans(arr) {\n    return {\n        true: arr.toString().match(/true/g)?.length || 0,\n        false: arr.toString().match(/false/g)?.length || 0\n    };\n}"
        ],
        correctIndex: 0
    },
    {
        question: "文字列の先頭に指定された文字を追加する関数は？",
        choices: [
            "1.function padStart(str, length, char) {\n    let result = str;\n    while(result.length < length) {\n        result = char + result;\n    }\n    return result;\n}",
            "2.function padStart(str, length, char) {\n    let result = '';\n    for(let i = 0; i < length - str.length; i++) {\n        result += char;\n    }\n    return result + str;\n}",
            "3.function padStart(str, length, char) {\n    return char + str + char;\n}"
        ],
        correctIndex: 1
    },
    {
        question: "配列内の数値の最小値と最大値を返す関数は？",
        choices: [
            "1.function getMinMax(arr) {\n    let min = arr[0];\n    let max = arr[0];\n    for(let i = 1; i < arr.length; i++) {\n        if(arr[i] < min) min = arr[i];\n        if(arr[i] > max) max = arr[i];\n    }\n    return { min: min, max: max };\n}",
            "2.function getMinMax(arr) {\n    arr.sort((a,b) => a - b);\n    return {\n        min: arr[0],\n        max: arr[arr.length - 1]\n    };\n}",
            "3.function getMinMax(arr) {\n    let min = arr[0];\n    let max = arr[0];\n    arr.forEach(num => {\n        if(num < min) min = num;\n        if(num > max) max = num;\n    });\n    return { min: min, max: max };\n}"
        ],
        correctIndex: 0
    },
    {
        question: "オブジェクトの全ての値を2倍にする関数は？",
        choices: [
            "1.function doubleValues(obj) {\n    let result = {};\n    for (let key in obj) {\n        result[key] = obj[key] * 2;\n    }\n    return result;\n}",
            "2.function doubleValues(obj) {\n    return Object.keys(obj);\n}",
            "3.function doubleValues(obj) {\n    return obj;\n}"
        ],
        correctIndex: 0
    },
    {
        question: "文字列の各単語の長さを配列として返す関数は？",
        choices: [
            "1.function getWordLengths(str) {\n    return str.split(' ').map(word => word.length);\n}",
            "2.function getWordLengths(str) {\n    return [str.length];\n}",
            "3.function getWordLengths(str) {\n    return str.length;\n}"
        ],
        correctIndex: 0
    },
    {
        question: "配列内の特定の値をすべて削除する関数は？",
        choices: [
            "1.function removeValue(arr, value) {\n    return arr;\n}",
            "2.function removeValue(arr, value) {\n    return arr.splice(0, 1);\n}",
            "3.function removeValue(arr, value) {\n    return arr.filter(item => item !== value);\n}"
        ],
        correctIndex: 2
    }
];
