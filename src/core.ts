import { randomInteger } from "./utils";

export type OperationKey = 'addition' | 'subtraction' | 'multiplication' | 'division';
export type OpSymbol = '+' | '-' | 'x' | '/'

export type ConfigEntry = { title: string, symbol: OpSymbol }

export type OpConfig = { [P in OperationKey]: ConfigEntry };
export const config: OpConfig = {
  addition: { title: 'Addition', symbol: '+' },
  subtraction: { title: 'Subtraction', symbol: '-' },
  multiplication: { title: 'Multiplication', symbol: 'x' },
  division: { title: 'Division', symbol: '/' }
}
export interface Operands { operand1: number, operand2: number }
type OperandsMap = { [P in OperationKey]: () => Operands }

const operandGenerator: OperandsMap = {
  addition: () => ({
    operand1: randomInteger(1, 20),
    operand2: randomInteger(1, 20)
  }),
  multiplication: () => ({
    operand1: randomInteger(1, 10),
    operand2: randomInteger(1, 10)
  }),
  subtraction: () => {
    const left = randomInteger(1, 20);
    const right = randomInteger(1, 20);
    return {
      operand1: left + right,
      operand2: left
    }
  },
  division: () => {
    const left = randomInteger(1, 10);
    const right = randomInteger(1, 10);
    return {
      operand1: left * right,
      operand2: left
    }
  }
}

type Checker = { [P in OperationKey]: (lh: number, rh: number) => number }
const checker: Checker = {
  addition: (lh, rh) => lh + rh,
  subtraction: (lh, rh) => lh - rh,
  multiplication: (lh, rh) => lh * rh,
  division: (lh, rh) => lh / rh
}


export const generateOperands = (operation: OperationKey) => operandGenerator[operation]();

export const isCorrect = (operation: OperationKey) => (operands: Operands) => (answer: number) => {
  const { operand1, operand2 } = operands
  return answer === checker[operation](operand1, operand2);
}


