/**
 * @file Домашка по FP ч. 2
 *
 * Подсказки:
 * Метод get у инстанса Api – каррированый
 * GET / https://animals.tech/{id}
 *
 * GET / https://api.tech/numbers/base
 * params:
 * – number [Int] – число
 * – from [Int] – из какой системы счисления
 * – to [Int] – в какую систему счисления
 *
 * Иногда промисы от API будут приходить в состояние rejected, (прямо как и API в реальной жизни)
 * Ответ будет приходить в поле {result}
 */

import Api from "../tools/api";
import { modulo, lt, gt, allPass, test } from "ramda";

const processSequence = ({ value, writeLog, handleSuccess, handleError }) => {
  const isValidInput = allPass([
    (val) => typeof val === "string",
    (val) => gt(val.length, 2) && lt(val.length, 10),
    (val) => test(/^[0-9]+\.?[0-9]*$/, val),
    (val) => !isNaN(Number(val)),
    (val) => Number(val) > 0,
  ]);

  writeLog(value);

  if (!isValidInput(value)) {
    handleError("ValidationError");
    return;
  }

  const api = new Api();

  const roundedValue = Math.round(Number(value));
  writeLog(roundedValue);

  api
    .get("https://api.tech/numbers/base", {
      number: roundedValue,
      from: 10,
      to: 2,
    })
    .then((response) => {
      if (!response || !response.result) {
        throw new Error("Invalid API response");
      }

      const binary = response.result;
      writeLog(binary);

      const digitCount = binary.length;
      writeLog(digitCount);

      const squared = digitCount ** 2;
      writeLog(squared);

      const remainder = modulo(squared, 3);
      writeLog(remainder);

      return api.get(`https://animals.tech/${remainder}`, {});
    })
    .then((response) => {
      if (!response || !response.result) {
        throw new Error("Invalid animal response");
      }
      handleSuccess(response.result);
    })
    .catch((error) => {
      writeLog(`API Error: ${error.message}`);
      handleError("NetworkError");
    });
};

export default processSequence;
