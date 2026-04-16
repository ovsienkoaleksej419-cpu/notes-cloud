/**
 * Учебные КИМ по математике профильного уровня (ЕГЭ): первая часть — 12 заданий, по 1 первичному баллу (макс. 12).
 * Типы заданий ориентированы на спецификацию ФИПИ (задания 1–12); тексты учебные, не официальные КИМ.
 * Ответы — целые числа (как в коротком ответе части 1).
 */
(function (global) {
  'use strict';

  var TASK_COUNT = 12;
  var MAX_POINTS = 12;

  var LINE = [
    'Задание 1: многогранники, элементы составной фигуры (ФИПИ, пространственные фигуры)',
    'Задание 2: классическая вероятность (ФИПИ, вероятность)',
    'Задание 3: уравнения и показательная функция (ФИПИ, уравнения)',
    'Задание 4: преобразования выражений, степени и корни (ФИПИ, вычисления)',
    'Задание 5: прикладная задача, движение по этапам (ФИПИ, прикладные задачи)',
    'Задание 6: планиметрия, прямоугольный треугольник (ФИПИ, планиметрия)',
    'Задание 7: производная и график функции (ФИПИ, производная, касательная)',
    'Задание 8: объём многогранника (ФИПИ, стереометрия)',
    'Задание 9: производная функции (ФИПИ, производная)',
    'Задание 10: прикладной смысл производной (ФИПИ, скорость изменения)',
    'Задание 11: арифметическая прогрессия (ФИПИ, прогрессии)',
    'Задание 12: наибольшее/наименьшее значение на отрезке (ФИПИ, оптимизация)'
  ];

  function mathNote(n) {
    var z = n < 10 ? '0' + n : String(n);
    return [{ href: 'notes/mathematics/ege-math-z' + z + '.html', title: 'Конспект: задание ' + n }];
  }

  var REVIEW_LINKS = {
    1: mathNote(1),
    2: mathNote(2),
    3: mathNote(3),
    4: mathNote(4),
    5: mathNote(5),
    6: mathNote(6),
    7: mathNote(7),
    8: mathNote(8),
    9: mathNote(9),
    10: mathNote(10),
    11: mathNote(11),
    12: mathNote(12)
  };

  function reviewLinksFor(num) {
    return REVIEW_LINKS[num] || [{ href: 'notes.html', title: 'Каталог конспектов' }];
  }

  function mono(s) {
    return '<span class="mono">' + s + '</span>';
  }

  function gcd(a, b) {
    var x = Math.abs(a);
    var y = Math.abs(b);
    while (y) {
      var t = y;
      y = x % y;
      x = t;
    }
    return x || 1;
  }

  function task(kim, num) {
    var K = kim + 1;
    var pts = 1;
    var line = LINE[num - 1];
    var html;
    var answer;
    var kind = 'number';

    switch (num) {
      case 1: {
        var V = 8 + 2 * kim;
        var F = 6 + K;
        answer = V + F - 2;
        html =
          'Выпуклый многогранник (как в задачах на склейку/составную фигуру): число вершин <b>V = ' +
          V +
          '</b>, число граней <b>F = ' +
          F +
          '</b>. Используя формулу Эйлера <b>V − E + F = 2</b>, найдите число рёбер <b>E</b>.';
        break;
      }
      case 2: {
        var N = 12 + kim;
        var white = 3 + K;
        var g = gcd(white, N);
        var m = white / g;
        var n = N / g;
        answer = m + n;
        html =
          'В урне <b>' +
          N +
          '</b> шаров, из них <b>' +
          white +
          '</b> белых. Случайно извлекают один шар. Вероятность достать белый запишите несократимой дробью ' +
          mono('m/n') +
          '. В ответе укажите <b>m + n</b>.';
        break;
      }
      case 3: {
        var sumExp = 7 + kim;
        var xVal = 2 + K;
        answer = sumExp - xVal;
        html =
          'Найдите <b>y</b>, если известно, что ' +
          mono('2^{x+y} = 2^{' + sumExp + '}') +
          ' и ' +
          mono('x = ' + xVal) +
          ' (x, y — целые).';
        break;
      }
      case 4: {
        var exp = 3 + K - kim;
        answer = Math.pow(2, exp);
        html =
          'Упростите и вычислите значение выражения ' +
          mono('2^{' + String(4 + K) + '} / 2^{' + String(1 + kim) + '}') +
          ' (показатели — целые, ответ — целое число).';
        break;
      }
      case 5: {
        var t1 = 2 + K;
        var t2 = 3 + kim;
        answer = t1 + t2;
        html =
          'Поезд идёт в два этапа. На первом участке длина пути ' +
          mono(String((4 + kim) * t1) + ' км') +
          ' при постоянной скорости <b>' +
          (4 + kim) +
          ' км/ч</b>. На втором — ' +
          mono(String((5 + K) * t2) + ' км') +
          ' при скорости <b>' +
          (5 + K) +
          ' км/ч</b>. Сколько часов заняло всё путешествие?';
        break;
      }
      case 6: {
        var s = 2 + kim;
        var a = 3 * s;
        var b = 4 * s;
        answer = 5 * s;
        html =
          'В прямоугольном треугольнике катеты равны <b>' +
          a +
          '</b> и <b>' +
          b +
          '</b>. Найдите длину гипотенузы.';
        break;
      }
      case 7: {
        var x0 = 1 + kim;
        answer = 3 * x0 * x0 - 6 * x0 + K;
        html =
          'Дана функция ' +
          mono('f(x) = x^3 − 3x^2 + ' + K + '·x') +
          '. Найдите значение производной ' +
          mono("f'(" + x0 + ')') +
          '.';
        break;
      }
      case 8: {
        answer = 3 * (4 + kim) * (2 + K);
        html =
          'Найдите объём прямоугольного параллелепипеда с рёбрами <b>3</b>, <b>' +
          (4 + kim) +
          '</b> и <b>' +
          (2 + K) +
          '</b> (в одних условных единицах).';
        break;
      }
      case 9: {
        answer = K - 2;
        html =
          'Для функции ' +
          mono('f(x) = x^4 − 2x^3 + ' + K + '·x') +
          ' найдите ' +
          mono("f'(1)") +
          '.';
        break;
      }
      case 10: {
        answer = 23 + kim;
        html =
          'Материальная точка движется по прямой, координата в момент времени t (с) задана законом ' +
          mono('s(t) = 5t^2 + ' + (3 + kim) + '·t + ' + K) +
          ' (м). Найдите мгновенную скорость в момент <b>t = 2 с</b> (в м/с).';
        break;
      }
      case 11: {
        var n11 = 5 + K;
        var a1 = 7;
        var d = 2 + kim;
        answer = (n11 * (2 * a1 + d * (n11 - 1))) / 2;
        html =
          'В арифметической прогрессии ' +
          mono('a_1 = 7') +
          ', разность ' +
          mono('d = ' + d) +
          '. Найдите сумму первых <b>' +
          n11 +
          '</b> членов: ' +
          mono('S_{' + n11 + '}') +
          '.';
        break;
      }
      case 12: {
        answer = K - 18;
        html =
          'Найдите наименьшее значение функции ' +
          mono('f(x) = 2x^2 − 12x + ' + K) +
          ' на отрезке ' +
          mono('[0; ' + String(6 + kim) + ']') +
          '. (Экстремум на отрезке — как в задании 12 профильного уровня.)';
        break;
      }
      default:
        answer = 0;
        html = '';
    }

    return {
      num: num,
      points: pts,
      line: line,
      html: html,
      answer: answer,
      kind: kind,
      okText: 'Верно.',
      reviewLinks: reviewLinksFor(num)
    };
  }

  global.EGE_KIM_TASKS_MATH = {
    LINE: LINE,
    REVIEW_LINKS: REVIEW_LINKS,
    reviewLinksFor: reviewLinksFor,
    taskCount: TASK_COUNT,
    maxPoints: MAX_POINTS,
    buildAll: function (kim) {
      var out = [];
      for (var n = 1; n <= TASK_COUNT; n++) {
        out.push(task(kim, n));
      }
      return out;
    }
  };
})(typeof window !== 'undefined' ? window : globalThis);
