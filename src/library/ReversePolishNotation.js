/**
 * 逆ポーランド記法
 * @param str
 * @returns Array
 */
const convert = (str) => {
  // 前処理
  const arr = preConvert(str)
  // +と-は優先順位は同じ
  // *は+と-より優先順位が高い
  // /は*より優先順位が高い
  const priorities = {
    '+': 1,
    '-': 1,
    '÷': 2,
    '×': 3,
  }
  const stack  = []
  const result = []
  for (let i = 0; i < arr.length; i++) {
    const s = arr[i]
    /** 数字の場合 **/
    if (isRationalNumber(s)) {
      result.push(s)
      continue
    }

    /** 括弧の場合 **/
    if (isLeftBrackets(s)) {
      stack.push(s)
      continue
    }

    if (isRightBrackets(s)) {
      let tail = stack.pop()
      do {
        if (!isLeftBrackets(tail)) {
          result.push(tail)
          tail = stack.pop()
        }
      } while(!isLeftBrackets(tail))
      continue
    }

    /** 演算子の場合 **/
    const priority = priorities[s] // 演算子の優先度

    // スタックが空の場合
    if (stack.length === 0) {
      stack.push(s)
      continue
    }

    do {
      const index        = stack.length - 1
      const tail         = stack[index]     // スタックの先頭
      const tailPriority = priorities[tail] // スタックの先頭の優先度

      // スタックの先頭の優先度が低い場合
      if (tailPriority >= priority) {
        // スタックの内容を書き出す
        result.push(stack.pop())
      } else {
        break
      }
    } while (stack.length > 0)

    stack.push(s)
  }
  while (stack.length > 0) {
    // スタックの内容を書き出す
    result.push(stack.pop())
  }

  return result
}


/**
 * 逆ポーランド記法変換前の前処理
 * @param str String
 * @returns {Array}
 */
const preConvert = (str) => {
  const stack = []
  for (let i = 0; i < str.length; i++) {
    const before = (stack.length === 0) ? '' : stack[stack.length - 1]
    // 数字の場合
    if (isInteger(str[i]) && /^-*[0-9]+\.?(?:[0-9]+)?$/.test(before)) {
      stack[stack.length - 1] = `${before}${str[i]}`
      continue
    }
    // "."「ドット」 & 前が整数の場合
    if (isDecimalPoint(str[i]) && isInteger(before)) {
      stack[stack.length - 1] = `${before}${str[i]}`
      continue
    }
    stack.push(str[i])
  }

  if (stack.length < 2) {
    return stack
  }

  // 変換するのは2パターン
  /**
   * 特別変換するのは"-"から始まる2パターン
   * 1. "-" 後ろに数字 例: -1+2
   * 2. "-" 後ろに"("  例: -(1+2)
   */
  // "-"から始まらない場合
  if (!isSubtractionOperator(stack[0])) {
    return stack
  }

  if (isInteger(stack[1])) {
    stack[1] = `-${stack[1]}`
    return stack.slice(1)
  }

  if (isLeftBrackets(stack[1])) {
    return ['-1', '×'].concat(stack.slice(1))
  }

  return stack
}

/**
 * 小数点以下の桁数を返す
 *
 * @param str
 * @returns {number}
 */
const decimalLength = (str) => {
  const numbers = str.split('.')

  return (numbers.length >= 2) ? numbers[1].length : 0
}

/**
 * 整数に変換 & 小数点以下の桁数を返す
 *
 * @param n1
 * @param n2
 * @returns {{n1: number, n2: number, index: number}}
 */
const convertNumbers = ({n1, n2}) => {
  let number1 = `${n1}`
  let number2 = `${n2}`
  const length1 = decimalLength(number1)
  const length2 = decimalLength(number2)

  number1 = number1.replace('.', '')
  number2 = number2.replace('.', '')
  if (length1 >= length2) {
    number2 = number2 + ('0'.repeat(length1 - length2))
    return {
      n1: parseInt(number1),
      n2: parseInt(number2) ,
      index: length1
    }
  } else {
    number1 = number1 + ('0'.repeat(length2 - length1))
    return {
      n1: parseInt(number1),
      n2: parseInt(number2) ,
      index: length2
    }
  }
}

/**
 * 計算
 * @param list
 * @returns
 */
const calculation = (list) => {
  const stack = []
  for (let i = 0; i < list.length; i++) {
    const s = list[i]
    /** 数字の場合 **/
    if (isRationalNumber(s)) {
      stack.push(s)
      continue
    }

    /** 演算子の場合 **/
    const n1 = stack.pop() // スタックの先頭
    const n2 = stack.pop() // スタックの先頭から2番目
    const numbers = convertNumbers({n1, n2})
    let amount = 0
    switch (s) {
      case '+':
        amount = numbers.n2 + numbers.n1
        break
      case '-':
        amount = numbers.n2 - numbers.n1
        break
      case '×':
        amount = numbers.n2 * numbers.n1
        break
      case '÷':
        // 0割の場合
        if (n1 === 0) {
          throw new Error('0割しています')
        }
        amount = numbers.n2 / numbers.n1
        break
      default:
      // 何もしない
    }
    if (numbers.index > 0) {
      const n = 10 ** numbers.index
      amount /= n
    }
    stack.push(`${amount}`)
  }

  return stack.pop()
}

/**
 * 整数判定
 * @param n
 * @returns {Boolean}
 */
const isInteger = (n) => {
  return /^-*[0-9]+$/.test(n)
}

/**
 * 有理数判定
 * @param n
 * @returns {Boolean}
 */
const isRationalNumber = (n) => {
  // 例: '100' or '-100' or '1.2'
  return /^-*[0-9]+(?:\.[0-9]+)?$/.test(n)
}


/**
 * 演算子判定
 * @param str
 * @returns {Boolean}
 */
const isOperator = (str) => {
  return isAdditionOperator(str)
    || isSubtractionOperator(str)
    || isMultiplicationOperator(str)
    || isDivisionOperator(str)
}

/**
 * 加算演算子判定
 * @param str
 * @returns {Boolean}
 */
const isAdditionOperator = (str) => {
  return str === '+'
}

/**
 * 減算演算子判定
 * @param str
 * @returns {Boolean}
 */
const isSubtractionOperator = (str) => {
  return str === '-'
}

/**
 * 乗算演算子判定
 * @param str
 * @returns {Boolean}
 */
const isMultiplicationOperator = (str) => {
  return str === '×'
}

/**
 * 除算演算子判定
 * @param str
 * @returns {Boolean}
 */
const isDivisionOperator = (str) => {
  return str === '÷'
}

/**
 * 括弧判定
 * @param str
 * @returns {Boolean}
 */
const isBrackets = (str) => {
  return isRightBrackets(str) || isLeftBrackets(str)
}

/**
 * 右括弧判定
 * @param str
 * @returns {Boolean}
 */
const isRightBrackets = (str) => {
  return str === ')'
}

/**
 * 左括弧判定
 * @param str
 * @returns {Boolean}
 */
const isLeftBrackets = (str) => {
  return str === '('
}

/**
 * ピリオド判定
 *
 * @param str
 * @returns {boolean}
 */
const isDecimalPoint = (str) => {
  return str === '.'
}

/**
 * 式の文法チェック
 *
 * @param str
 * @returns {Boolean}
 */
const checkFormula = (str) => {
  // 括弧の並び順チェック
  let result = checkBrackets(str)

  if (!result) {
    return false
  }
  const list = preConvert(str)
  return checkList(list)
}

/**
 * 文字と前後の文字が数式的にOKか確認する
 * @param s
 * @param before
 * @param after
 * @returns {boolean}
 */
const check = (s, before, after) => {
  /** 数字の場合 **/
  if (isRationalNumber(s)) {
    // 前は "文頭" or "演算子" or "左括弧" の場合
    if (before === null || isOperator(before) || isLeftBrackets(before)) {

      // 後は "文末" or "演算子" or "右括弧" の場合
      if (after === null || isOperator(after) || isRightBrackets(after)) {
        return true
      }
    }
    return false
  }

  /** "."の場合 **/
  if (isDecimalPoint(s)) {
    // 前は "数字"の場合
    if (isRationalNumber(before)) {

      // 後は "数字" の場合
      if (isRationalNumber(after)) {
        return true
      }
    }

    return false
  }

  // 左括弧の場合
  if (isLeftBrackets(s)) {
    // 前は "文頭" or "演算子" or "左括弧" の場合
    if (before === null || isOperator(before) || isLeftBrackets(before)) {

      // 後は "数字" or "左括弧" の場合
      if (isRationalNumber(after) || isLeftBrackets(after)) {
        return true
      }
    }

    return false
  }

  // 右括弧の場合
  if (isRightBrackets(s)) {
    // 前は "数字" or "右括弧" の場合
    if (isRationalNumber(before) || isRightBrackets(before)) {

      // 後は "文末" or "演算子" or "右括弧" の場合
      if (after === null || isOperator(after) || isRightBrackets(after)) {
        return true
      }
    }

    return false
  }

  // 演算子の場合
  if (isOperator(s)) {
    // 前は "数字" or "右括弧" の場合
    if (isRationalNumber(before) || isRightBrackets(before)) {

      // 後は "数字" or "左括弧" の場合
      if (isRationalNumber(after) || isLeftBrackets(after)) {
        return true
      }
    }
    return false
  }
  return false
}

/**
 * 括弧の並び順チェック
 * @param str
 * @returns {boolean}
 */
const checkBrackets = (str) => {
  let isContinue = true
  let left = 0
  let right = 0
  do {
    const match = /[()]/g.exec(str)
    if (match) {
      if (isRightBrackets(match[0])) {
        right += 1
        // "右括弧" > "左括弧" の場合
        if (right > left) {
          return false
        }
      } else {
        left += 1
      }
      str = str.slice(match.index + 1)
    } else {
      isContinue = false
    }
  } while(isContinue)

  return left === right
}

/**
 * リストが数式的にOKか確認する
 * @param list
 */
const checkList = (list) => {
  for (let i = 0; i < list.length; i++) {
    let head = null
    let tail = null

    if (i !== 0) {
      head = list[i - 1]
    }
    if (i !== list.length - 1) {
      tail = list[i + 1]
    }
    if (!check(list[i], head, tail)) {
      return false
    }
  }

  return true
}

// exports.convert = convert
export default {
  convert,
  preConvert,
  decimalLength,
  convertNumbers,
  calculation,
  isInteger,
  isRationalNumber,
  isOperator,
  isAdditionOperator,
  isSubtractionOperator,
  isMultiplicationOperator,
  isDivisionOperator,
  isBrackets,
  isRightBrackets,
  isLeftBrackets,
  isDecimalPoint,
  checkFormula,
  check,
  checkBrackets,
  checkList
}
