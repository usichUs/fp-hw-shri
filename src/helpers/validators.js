/**
 * @file Домашка по FP ч. 1
 *
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */

import {
  allPass,
  anyPass,
  equals,
  values,
  filter,
  length,
  gte,
  complement,
  prop,
} from "ramda";

// utils
const isColor = (color) => (prop) => equals(color, prop);
const isRed = isColor("red");
const isGreen = isColor("green");
const isBlue = isColor("blue");
const isOrange = isColor("orange");
const isWhite = isColor("white");
const isNotWhite = complement(isWhite);
const isNotRed = complement(isRed);

const countColorInShapes = (color) => (shapes) =>
  length(filter(equals(color), values(shapes)));

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = allPass([
  ({ star }) => isRed(star),
  ({ square }) => isGreen(square),
  ({ triangle }) => isWhite(triangle),
  ({ circle }) => isWhite(circle),
]);

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = (shapes) =>
  gte(countColorInShapes("green")(shapes), 2);

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = (shapes) =>
  equals(countColorInShapes("red")(shapes), countColorInShapes("blue")(shapes));

// 4. Синий круг, красная звезда, оранжевый квадрат треугольник любого цвета
export const validateFieldN4 = allPass([
  ({ circle }) => isBlue(circle),
  ({ star }) => isRed(star),
  ({ square }) => isOrange(square),
]);

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = (shapes) =>
  anyPass([
    () => gte(countColorInShapes("red")(shapes), 3),
    () => gte(countColorInShapes("green")(shapes), 3),
    () => gte(countColorInShapes("blue")(shapes), 3),
    () => gte(countColorInShapes("orange")(shapes), 3),
  ])(shapes);

// 6. Ровно две зеленые фигуры (одна из зелёных – это треугольник), плюс одна красная. Четвёртая оставшаяся любого доступного цвета, но не нарушающая первые два условия
export const validateFieldN6 = allPass([
  (shapes) => equals(countColorInShapes("green")(shapes), 2),
  ({ triangle }) => isGreen(triangle),
  (shapes) => equals(countColorInShapes("red")(shapes), 1),
]);

// 7. Все фигуры оранжевые.
export const validateFieldN7 = allPass([
  ({ star }) => isOrange(star),
  ({ square }) => isOrange(square),
  ({ triangle }) => isOrange(triangle),
  ({ circle }) => isOrange(circle),
]);

// 8. Не красная и не белая звезда, остальные – любого цвета.
export const validateFieldN8 = ({ star }) =>
  allPass([isNotRed, isNotWhite])(star);

// 9. Все фигуры зеленые.
export const validateFieldN9 = allPass([
  ({ star }) => isGreen(star),
  ({ square }) => isGreen(square),
  ({ triangle }) => isGreen(triangle),
  ({ circle }) => isGreen(circle),
]);

// 10. Треугольник и квадрат одного цвета (не белого), остальные – любого цвета
export const validateFieldN10 = ({ triangle, square }) =>
  allPass([() => equals(triangle, square), () => isNotWhite(triangle)])(
    triangle
  );
