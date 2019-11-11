import ReversePolishNotation from '../../src/library/ReversePolishNotation'

describe('Reverse Polish Notification', () => {
  test('convert', () => {
    let arr = ['10', '+', '20', '×', '30', '-', '40', '+', '50']
    expect(ReversePolishNotation.convert(arr)).toEqual([ '10', '20', '30', '×', '+', '40', '-', '50', '+'])
  })
  test('convert[括弧あり]', () => {
    let arr = ['(', '1', '+', '2', '+', '(', '1', '+', '2', ')', '×', '3', ')', '×', '3']
    expect(ReversePolishNotation.convert(arr)).toEqual(['1', '2', '+', '1', '2', '+', '3', '×', '+', '3', '×'])
  })
  test('calculation', () => {
    let arr = [10, 20, 30, '×', '+', 40, '-', 50, '+']
    expect(ReversePolishNotation.calculation(arr)).toBe('620')
  })
})

describe('convertテスト', () => {
  test('加算パターン', () => {
    const str = "1+2+3+4+5"
    expect(ReversePolishNotation.convert(str)).toEqual(["1", "2", "+", "3", "+", "4", "+", "5", "+"])
  })
  test('減算パターン', () => {
    const str = "1-2-3-4-5"
    expect(ReversePolishNotation.convert(str)).toEqual(["1", "2", "-", "3", "-", "4", "-", "5", "-"])
  })
  test('乗算パターン', () => {
    const str = "1+2-3×4+5"
    expect(ReversePolishNotation.convert(str)).toEqual(["1", "2", "+", "3", "4", "×", "-", "5", "+"])
  })
  test('除算パターン', () => {
    const str = "1+2-3×4÷5"
    expect(ReversePolishNotation.convert(str)).toEqual(["1", "2", "+", "3", "4", "×", "5", "÷", "-"])
  })
  test('括弧ありパターン', () => {
    const str = "1×(2+3)×4÷5"
    expect(ReversePolishNotation.convert(str)).toEqual(["1", "2", "3", "+", "×", "4", "×", "5", "÷"])
  })
})

describe('preConvertテスト', () => {
  test('1+1のパターン', () => {
    expect(ReversePolishNotation.preConvert('1+1')).toEqual(["1", "+", "1"])
  })
  test('1-1のパターン', () => {
    expect(ReversePolishNotation.preConvert('1-1')).toEqual(["1", "-", "1"])
  })
  test('(2-1)×2のパターン', () => {
    expect(ReversePolishNotation.preConvert('(2-1)×2')).toEqual(["(", "2", "-", "1", ")", "×", "2"])
  })
  test('-1+2のパターン', () => {
    expect(ReversePolishNotation.preConvert('-1+2')).toEqual(["-1", "+",  "2"])
  })
  test('-(1+2)のパターン', () => {
    expect(ReversePolishNotation.preConvert('-(1+2)')).toEqual(["-1", "×", "(", "1", "+", "2", ")"])
  })
})

describe('decimalLengthテスト', () => {
  test('1のパターン', () => {
    expect(ReversePolishNotation.decimalLength('1')).toEqual(0)
  })
  test('1-1のパターン', () => {
    expect(ReversePolishNotation.decimalLength('-100')).toEqual(0)
  })
  test('0.001のパターン', () => {
    expect(ReversePolishNotation.decimalLength('0.001')).toEqual(3)
  })
  test('-0.001のパターン', () => {
    expect(ReversePolishNotation.decimalLength('-0.001')).toEqual(3)
  })
})

describe('convertNumbersテスト', () => {
  test('パターン1', () => {
    const n1 = '100'
    const n2 = '1'
    const result = {
      n1: 100,
      n2: 1,
      index: 0
    }
    expect(ReversePolishNotation.convertNumbers({n1, n2})).toEqual(result)
  })
  test('パターン2', () => {
    const n1 = '100'
    const n2 = '1.22'
    const result = {
      n1: 10000,
      n2: 122,
      index: 2
    }
    expect(ReversePolishNotation.convertNumbers({n1, n2})).toEqual(result)
  })
  test('パターン3', () => {
    const n1 = '-100'
    const n2 = '-1.22'
    const result = {
      n1: -10000,
      n2: -122,
      index: 2
    }
    expect(ReversePolishNotation.convertNumbers({n1, n2})).toEqual(result)
  })
})

describe('calculationテスト', () => {
  test('加算のパターン', () => {
    let arr = ["1", "2", "+", "3", "+", "4", "+", "5", "+"]
    expect(ReversePolishNotation.calculation(arr)).toBe('15')
  })
  test('減算のパターン', () => {
    let arr = ["5", "4", "-", "3", "-", "2", "-", "1", "-"]
    expect(ReversePolishNotation.calculation(arr)).toBe('-5')
  })
  test('乗算のパターン', () => {
    let arr = ["1", "2", "×", "3", "×", "4", "×", "5", "×"]
    expect(ReversePolishNotation.calculation(arr)).toBe('120')
  })
  test('余算のパターン', () => {
    let arr = ["120", "5", "÷", "4", "÷", "3", "÷", "2", "÷", "1", "÷"]
    expect(ReversePolishNotation.calculation(arr)).toBe('1')
  })
  test('演算子混合のパターン1', () => {
    // 例: (1 + 2) * 3 / 3
    let arr = ["1", "2", "+", "3", "3", "÷", "×"]
    expect(ReversePolishNotation.calculation(arr)).toBe('3')
  })
  test('演算子混合のパターン2', () => {
    // 例: 6 * 5 / 3 + 2 - 2
    let arr = ["6", "5", "×", "3", "÷", "2", "+", "2", "-"]
    expect(ReversePolishNotation.calculation(arr)).toBe('10')
  })
})

describe('isIntegerテスト', () => {
  test('正整数のパターン', () => {
    expect(ReversePolishNotation.isInteger('100')).toEqual(true)
  })
  test('負整数のパターン', () => {
    expect(ReversePolishNotation.isInteger('-100')).toEqual(true)
  })
  test('数字以外のパターン(乗算演算子の)', () => {
    expect(ReversePolishNotation.isInteger('×')).toEqual(false)
  })
})

describe('isRationalNumberテスト', () => {
  test('正整数のパターン', () => {
    expect(ReversePolishNotation.isRationalNumber('100')).toEqual(true)
  })
  test('負整数のパターン', () => {
    expect(ReversePolishNotation.isRationalNumber('-100')).toEqual(true)
  })
  test('正少数のパターン', () => {
    expect(ReversePolishNotation.isRationalNumber('1.22')).toEqual(true)
  })
  test('負少数のパターン', () => {
    expect(ReversePolishNotation.isRationalNumber('-1.22')).toEqual(true)
  })
  test('有理数以外のパターン(乗算演算子の)', () => {
    expect(ReversePolishNotation.isRationalNumber('1.')).toEqual(false)
  })
})

describe('isOperatorテスト', () => {
  test('加算演算子のパターン', () => {
    expect(ReversePolishNotation.isOperator('+')).toEqual(true)
  })
  test('減算演算子のパターン', () => {
    expect(ReversePolishNotation.isOperator('-')).toEqual(true)
  })
  test('乗算演算子のパターン', () => {
    expect(ReversePolishNotation.isOperator('×')).toEqual(true)
  })
  test('除算演算子のパターン', () => {
    expect(ReversePolishNotation.isOperator('÷')).toEqual(true)
  })
  test('演算子以外(数字)のパターン', () => {
    expect(ReversePolishNotation.isOperator('１')).toEqual(false)
  })
})

describe('isAdditionOperatorテスト', () => {
  test('加算演算子のパターン', () => {
    expect(ReversePolishNotation.isAdditionOperator('+')).toEqual(true)
  })
  test('加算演算子以外のパターン(乗算演算子)', () => {
    expect(ReversePolishNotation.isAdditionOperator('×')).toEqual(false)
  })
})

describe('isSubtractionOperatorテスト', () => {
  test('減算演算子のパターン', () => {
    expect(ReversePolishNotation.isSubtractionOperator('-')).toEqual(true)
  })
  test('減算演算子以外のパターン(乗算演算子)', () => {
    expect(ReversePolishNotation.isSubtractionOperator('×')).toEqual(false)
  })
})

describe('isMultiplicationOperatorテスト', () => {
  test('乗算演算子のパターン', () => {
    expect(ReversePolishNotation.isMultiplicationOperator('×')).toEqual(true)
  })
  test('乗算演算子以外のパターン(除算演算子)', () => {
    expect(ReversePolishNotation.isMultiplicationOperator('÷')).toEqual(false)
  })
})

describe('isDivisionOperatorテスト', () => {
  test('除算演算子のパターン', () => {
    expect(ReversePolishNotation.isDivisionOperator('÷')).toEqual(true)
  })
  test('除算演算子以外のパターン(乗算演算子)', () => {
    expect(ReversePolishNotation.isDivisionOperator('×')).toEqual(false)
  })
})

describe('isBracketsテスト', () => {
  test('左括弧のパターン', () => {
    expect(ReversePolishNotation.isBrackets('(')).toEqual(true)
  })
  test('右括弧のパターン', () => {
    expect(ReversePolishNotation.isBrackets(')')).toEqual(true)
  })
  test('括弧以外(数字)のパターン', () => {
    expect(ReversePolishNotation.isBrackets('１')).toEqual(false)
  })
})

describe('isRightBracketsテスト', () => {
  test('右括弧のパターン', () => {
    expect(ReversePolishNotation.isRightBrackets(')')).toEqual(true)
  })
  test('左括弧のパターン', () => {
    expect(ReversePolishNotation.isRightBrackets('(')).toEqual(false)
  })
  test('右括弧以外(数字)のパターン', () => {
    expect(ReversePolishNotation.isRightBrackets('１')).toEqual(false)
  })
})

describe('isLeftBracketsテスト', () => {
  test('左括弧のパターン', () => {
    expect(ReversePolishNotation.isLeftBrackets('(')).toEqual(true)
  })
  test('右括弧のパターン', () => {
    expect(ReversePolishNotation.isLeftBrackets(')')).toEqual(false)
  })
  test('左括弧以外(数字)のパターン', () => {
    expect(ReversePolishNotation.isLeftBrackets('１')).toEqual(false)
  })
})

describe('isDecimalPointテスト', () => {
  test('"."パターン', () => {
    expect(ReversePolishNotation.isDecimalPoint('.')).toEqual(true)
  })
  test('"."以外(*)のパターン', () => {
    expect(ReversePolishNotation.isDecimalPoint('*')).toEqual(false)
  })
})

describe('checkFormulaテスト', () => {
  test('OKパターン', () => {
    const list = ["1", "+", "(", "2", "+", "3", ")", "+", "4", "+", "5"]
    expect(ReversePolishNotation.checkFormula(list)).toEqual(true)
  })
  test(' 括弧の並び順がNGパターン', () => {
    const list = ["1", "+", ")", "2", "+", "3", "(", "+", "4", "+", "5"]
    expect(ReversePolishNotation.checkFormula(list)).toEqual(false)
  })
  test('リストの並び順がNG パターン', () => {
    const list = ["1", "+", "+", "+", "3", "+", "4", "+", "5"]
    expect(ReversePolishNotation.checkFormula(list)).toEqual(false)
  })
})

describe('checkテスト', () => {
  describe('数字の場合', () => {
    test('前=>文頭 & 後=>文末のパターン', () => {
      const s = 1
      const before = null
      const after = null
      expect(ReversePolishNotation.check(s, before, after)).toEqual(true)
    })
    test('前=>演算子 & 後=>演算子のパターン', () => {
      const s = 1
      const before = '+'
      const after = '-'
      expect(ReversePolishNotation.check(s, before, after)).toEqual(true)
    })
    test('前=>左括弧 & 後=>右括弧のパターン', () => {
      const s = 1
      const before = '('
      const after = ')'
      expect(ReversePolishNotation.check(s, before, after)).toEqual(true)
    })
    test('NGパターン', () => {
      const s = 1
      const before = ')'
      const after = '×'
      expect(ReversePolishNotation.check(s, before, after)).toEqual(false)
    })
  })

  describe('左括弧の場合', () => {
    test('前=>文頭 & 後=>数字のパターン', () => {
      const s = '('
      const before = null
      const after = '1'
      expect(ReversePolishNotation.check(s, before, after)).toEqual(true)
    })
    test('前=>演算子 & 後=>左括弧のパターン', () => {
      const s = '('
      const before = '+'
      const after = '('
      expect(ReversePolishNotation.check(s, before, after)).toEqual(true)
    })
    test('前=>左括弧 & 後=>左括弧のパターン', () => {
      const s = '('
      const before = '('
      const after = '('
      expect(ReversePolishNotation.check(s, before, after)).toEqual(true)
    })
    test('NGパターン', () => {
      const s = '('
      const before = ')'
      const after = '×'
      expect(ReversePolishNotation.check(s, before, after)).toEqual(false)
    })
  })

  describe('右括弧の場合', () => {
    test('前=>数字 & 後=>文末のパターン', () => {
      const s = ')'
      const before = '1'
      const after = null
      expect(ReversePolishNotation.check(s, before, after)).toEqual(true)
    })
    test('前=>右括弧 & 後=>演算子のパターン', () => {
      const s = ')'
      const before = ')'
      const after = '+'
      expect(ReversePolishNotation.check(s, before, after)).toEqual(true)
    })
    test('前=>数字 & 後=>右括弧のパターン', () => {
      const s = ')'
      const before = '1'
      const after = ')'
      expect(ReversePolishNotation.check(s, before, after)).toEqual(true)
    })
    test('NGパターン', () => {
      const s = ')'
      const before = '('
      const after = '×'
      expect(ReversePolishNotation.check(s, before, after)).toEqual(false)
    })
  })

  describe('演算子の場合', () => {
    test('前=>数字 & 後=>数字のパターン', () => {
      const s = '+'
      const before = '1'
      const after = '1'
      expect(ReversePolishNotation.check(s, before, after)).toEqual(true)
    })
    test('前=>右括弧 & 後=>左括弧のパターン', () => {
      const s = '+'
      const before = ')'
      const after = '('
      expect(ReversePolishNotation.check(s, before, after)).toEqual(true)
    })
    test('NGのパターン', () => {
      const s = '+'
      const before = '('
      const after = ')'
      expect(ReversePolishNotation.check(s, before, after)).toEqual(false)
    })
  })
})

describe('checkBracketsテスト', () => {
  test('括弧1つのパターン', () => {
    expect(ReversePolishNotation.checkBrackets('(1+1)')).toEqual(true)
  })
  test('括弧2つのパターン', () => {
    expect(ReversePolishNotation.checkBrackets('(1+1)+(2+2)')).toEqual(true)
  })
  test('括弧の中に括弧があるパターン', () => {
    expect(ReversePolishNotation.checkBrackets('((1+2)×3)×(4+5)')).toEqual(true)
  })
  test('括弧の並び順がおかしいパターン', () => {
    expect(ReversePolishNotation.checkBrackets(')1+1(')).toEqual(false)
  })
})

describe('checkListテスト', () => {
  test('OKパターン', () => {
    const list = ["1", "+", "2", "+", "3", "+", "4", "+", "5"]
    expect(ReversePolishNotation.checkList(list)).toEqual(true)
  })
  test('NGパターン', () => {
    const list = ["1", "+", "+", "+", "3", "+", "4", "+", "5"]
    expect(ReversePolishNotation.checkList(list)).toEqual(false)
  })
})