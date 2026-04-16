/**
 * Учебные КИМ: 27 заданий на вариант (как на ЕГЭ по информатике: 1–25 × 1 балл, 26–27 × 2 балла).
 * Тексты составлены для тренировки; задания с файлами заменены краткими числовыми аналогами.
 */
(function (global) {
  'use strict';

  /** Подписи совпадают с текстом задания (учебный аналог линии КИМ). */
  var LINE = [
    'Перевод из двоичной системы в десятичную',
    'Алгебра логики (истинность выражения)',
    'Сумма арифметической прогрессии (аналог таблицы Excel)',
    'Мощность алфавита при равномерном двоичном коде',
    'Пошаговое вычисление в программе (присваивания)',
    'Исполнитель: программа из команд',
    'Системы счисления: основание по значению записи',
    'Комбинаторика: размещения P(n, k)',
    'Сумма по «таблице» из единиц (аналог электронной таблицы)',
    'Текстовый сценарий: арифметика (аналог правки в редакторе)',
    'Информация: число символов × бит на символ',
    'Сети: число хостов по числу бит узла',
    'Перебор упорядованных пар (аналог запроса к таблице)',
    'Системы счисления: двузначная запись и основание',
    'Логика и делимость целого числа',
    'Последовательность, заданная рекуррентно (как числа Фибоначчи)',
    'Подсчёт пар индексов (аналог массива в файле)',
    'Формула по двум ячейкам (аналог таблицы)',
    'Теория игр: куча, ходы 1 или 2',
    'Теория игр: куча, ходы 1–3, последний выигрывает',
    'Перебор целых значений параметра на отрезке',
    'Арифметическая прогрессия (аналог строки таблицы)',
    'Сочетания: неупорядоченные пары из n элементов',
    'Подстроки фиксированной длины в строке',
    'Вычисление выражения со степенями в десятичной системе',
    'Формула с параметром n (аналог расчёта в таблице, 2 балла)',
    'Числовое выражение с двумя переменными (аналог программы, 2 балла)'
  ];

  /** Конспекты строго под тип задачи выше (пути как в notes.json). */
  var REVIEW_LINKS = {
    1: [
      { href: 'notes/information/infzad14.html', title: 'Задание 14 — системы счисления' },
      { href: 'notes/information/zad12.html', title: 'Задание 12 — системы счисления' }
    ],
    2: [
      { href: 'notes/information/infzad2.html', title: 'Задание 2 — таблицы истинности' },
      { href: 'notes/information/imp%20and%20ekv.html', title: 'Импликация и эквивалентность' }
    ],
    3: [{ href: 'notes/information/infzad9.html', title: 'Задание 9 — табличные данные' }],
    4: [
      { href: 'notes/information/infzad7.html', title: 'Задание 7 — кодирование' },
      { href: 'notes/information/fano_law.html', title: 'Закон Фано (задание 4)' }
    ],
    5: [{ href: 'notes/information/infzad5.html', title: 'Задание 5 — анализ алгоритмов' }],
    6: [{ href: 'notes/information/16zadania.html', title: 'Задание 16 — исполнитель и рекурсия' }],
    7: [
      { href: 'notes/information/infzad14.html', title: 'Задание 14 — системы счисления' },
      { href: 'notes/information/zad12.html', title: 'Задание 12 — системы счисления' }
    ],
    8: [{ href: 'notes/information/infzad8.html', title: 'Задание 8 — комбинаторика' }],
    9: [{ href: 'notes/information/infzad9.html', title: 'Задание 9 — обработка табличных данных' }],
    10: [
      { href: 'notes.html', title: 'Каталог конспектов' },
      { href: 'notes/information/infzad5.html', title: 'Задание 5 — логика вычислений' }
    ],
    11: [
      { href: 'notes/information/infzad7.html', title: 'Задание 7 — кодирование и биты' },
      { href: 'notes/information/infzad11.html', title: 'Задание 11 — объём сообщения' }
    ],
    12: [{ href: 'notes/information/infzad13.html', title: 'Задание 13 — IP-адреса и маски' }],
    13: [
      { href: 'notes/information/infzad8.html', title: 'Задание 8 — комбинаторика (пары)' },
      { href: 'notes/information/infzad9.html', title: 'Задание 9 — работа с таблицей данных' }
    ],
    14: [
      { href: 'notes/information/infzad14.html', title: 'Задание 14 — системы счисления' },
      { href: 'notes/information/zad12.html', title: 'Задание 12 — системы счисления' }
    ],
    15: [{ href: 'notes/information/infzad15.html', title: 'Задание 15 — логика и ДЕЛ' }],
    16: [{ href: 'notes/information/16zadania.html', title: 'Задание 16 — рекурсивные алгоритмы' }],
    17: [
      { href: 'notes/information/infzad8.html', title: 'Задание 8 — комбинаторика (подсчёт)' },
      { href: 'notes/information/infzad17.html', title: 'Задание 17 — массивы и перебор' }
    ],
    18: [{ href: 'notes/information/infzad9.html', title: 'Задание 9 — таблицы и формулы' }],
    19: [{ href: 'notes/information/infzad19.html', title: 'Задания 19–21 — теория игр' }],
    20: [{ href: 'notes/information/infzad19.html', title: 'Задания 19–21 — теория игр' }],
    21: [
      { href: 'notes/information/infzad15.html', title: 'Задание 15 — параметры и отрезки' },
      { href: 'notes/information/infzad8.html', title: 'Задание 8 — перебор вариантов' }
    ],
    22: [
      { href: 'notes/information/infzad9.html', title: 'Задание 9 — таблицы' },
      { href: 'notes/information/infzad26.html', title: 'Задание 26 — прогрессии и сортировка' }
    ],
    23: [
      { href: 'notes/information/infzad8.html', title: 'Задание 8 — комбинаторика (сочетания)' },
      { href: 'notes/information/infzad23.html', title: 'Задание 23 — динамическое программирование' }
    ],
    24: [{ href: 'notes/information/infzad24.html', title: 'Задание 24 — обработка строк' }],
    25: [{ href: 'notes/information/infzad14.html', title: 'Задание 14 — вычисления в десятичной системе' }],
    26: [
      { href: 'notes/information/infzad9.html', title: 'Задание 9 — таблицы' },
      { href: 'notes/information/infzad26.html', title: 'Задание 26 — сортировка и жадность' }
    ],
    27: [
      { href: 'notes/information/infzad27.html', title: 'Задание 27 — эффективные алгоритмы' },
      { href: 'notes/information/infzad14.html', title: 'Задание 14 — вычисления в программе' }
    ]
  };

  function reviewLinksFor(num) {
    return REVIEW_LINKS[num] || [{ href: 'notes.html', title: 'Каталог конспектов по информатике' }];
  }

  function mono(s) {
    return '<span class="mono">' + s + '</span>';
  }

  function onesCount(n) {
    var s = n.toString(2);
    var c = 0;
    for (var i = 0; i < s.length; i++) if (s[i] === '1') c++;
    return c;
  }

  function task(kim, num) {
    var K = kim + 1;
    var pts = num <= 25 ? 1 : 2;
    var line = LINE[num - 1];
    var note = '';
    var html;
    var answer;
    var kind = 'number';

    switch (num) {
      case 1: {
        var dec = 18 + K * 7;
        html = 'Чему равно число ' + mono(dec.toString(2) + '₂') + ' в десятичной системе счисления?';
        answer = dec;
        break;
      }
      case 2: {
        var A = K % 2;
        var B = 1;
        var C = (K + 1) % 2;
        var res = !((A && B) || !C);
        answer = res ? 1 : 0;
        html =
          'Переменные A, B, C — логические (0 — ложь, 1 — истина). Чему равно ' +
          mono('¬((A ∧ B) ∨ ¬C)') +
          ' при A = ' + A + ', B = ' + B + ', C = ' + C +
          '? В ответе укажите ' + mono('1') + ', если выражение истинно, и ' + mono('0') + ', если ложно.';
        kind = 'logic';
        break;
      }
      case 3: {
        var n = 12 + kim;
        answer = (n * (n + 1)) / 2;
        html =
          'В экзамене — работа с электронной таблицей. Аналог: в первом столбце записаны числа от 1 до ' +
          n + ' по одному в строке. Чему равна сумма всех этих чисел?';
        break;
      }
      case 4: {
        var bits = 6 + kim;
        answer = Math.pow(2, bits);
        html =
          'Сообщение кодируется равномерным двоичным кодом; на один символ приходится ровно ' +
          bits +
          ' бит. Сколько различных символов можно закодировать (мощность алфавита)?';
        break;
      }
      case 5: {
        var x = 2 + K;
        answer = x * x + 3 * x;
        html =
          'В программе задано x := ' +
          x +
          '; затем x := x * x + 3 * x. Чему равно значение x после выполнения?';
        break;
      }
      case 6: {
        var s = 4 + K;
        answer = ((s * 2 - 1) * 2 - 1) * 2;
        html =
          'Исполнитель умеет команды: ' +
          mono('1') +
          ' — умножить на 2, ' +
          mono('2') +
          ' — вычесть 1. Начальное число ' +
          s +
          '. Программа ' +
          mono('112') +
          '. Чему равен результат?';
        break;
      }
      case 7: {
        var d1 = K + 2;
        var d0 = 4;
        var Nans = 8 + K;
        var rhs = d1 * Nans + d0;
        answer = Nans;
        html =
          'Запись числа ' +
          mono(String(d1) + String(d0)) +
          ' в системе счисления с основанием N равна ' +
          rhs +
          ' в десятичной. Найдите N.';
        break;
      }
      case 8: {
        var m = 5 + kim;
        answer = m * (m - 1) * (m - 2);
        html = 'Сколько существует различных перестановок из трёх различных предметов, выбранных из ' + m + '?';
        break;
      }
      case 9: {
        var rows = 20 + K * 2;
        var cols = 3 + kim;
        answer = rows * cols;
        html =
          'В КИМ — таблица. Аналог: таблица из ' +
          rows +
          ' строк и ' +
          cols +
          ' столбцов заполнена числами 1. Чему равна сумма всех чисел в таблице?';
        break;
      }
      case 10: {
        var w = 40 + K * 5;
        answer = w * 2 - 15;
        html =
          'В КИМ — текстовый документ. Аналог: в документе ' +
          w +
          ' слов; после правки число слов удвоили и удалили 15. Сколько слов стало?';
        break;
      }
      case 11: {
        var sym = 200 + K * 40;
        var bps = 4 + kim;
        answer = sym * bps;
        html =
          'Сообщение из ' +
          sym +
          ' символов кодируется ' +
          bps +
          ' битами на символ (равномерно). Сколько всего бит занимает сообщение?';
        break;
      }
      case 12: {
        var hostBits = 6 - kim;
        if (hostBits < 2) hostBits = 2;
        answer = Math.pow(2, hostBits) - 2;
        html =
          'В подсети ровно ' +
          hostBits +
          ' бит отведено под номер узла (хоста). Сколько можно назначить адресов хостов, если два адреса зарезервированы под сеть и широковещание?';
        break;
      }
      case 13: {
        var rec = 100 + K * 25;
        answer = rec * (rec - 1);
        html =
          'В КИМ — запрос к БД. Аналог: если бы в таблице было ' +
          rec +
          ' записей и нужно было перебрать все упорядоченные пары различных записей, сколько было бы пар?';
        break;
      }
      case 14: {
        var rhs = 100 + K * 11;
        answer = rhs - 4;
        html =
          'Запись числа ' +
          mono('14') +
          ' в системе счисления с основанием N (цифры 1 и 4) равна ' +
          rhs +
          ' в десятичной. Найдите N.';
        break;
      }
      case 15: {
        var div = 3 + kim;
        var d = 20 + K * 7;
        answer = d % div === 0 ? 1 : 0;
        html =
          'Учебный аналог логики и чисел: высказывание «число ' +
          d +
          ' делится нацело на ' +
          div +
          '». В ответе: ' +
          mono('1') +
          ' — истина, ' +
          mono('0') +
          ' — ложь.';
        kind = 'logic';
        break;
      }
      case 16: {
        var f0 = 1;
        var f1 = 2 + kim;
        var f2 = f0 + f1;
        var f3 = f1 + f2;
        answer = f2 + f3;
        html =
          'Последовательность: F(0)=' +
          f0 +
          ', F(1)=' +
          f1 +
          ', F(n)=F(n−1)+F(n−2) при n≥2. Чему равно F(2)+F(3)?';
        break;
      }
      case 17: {
        var len = 8 + K;
        answer = len * (len - 1);
        html =
          'В КИМ — массив в файле. Аналог: массив из ' +
          len +
          ' чисел. Сколько существует упорядоченных пар различных индексов (i, j), где i < j?';
        break;
      }
      case 18: {
        var a = 3 + kim;
        var b = 5 + K;
        answer = a * b + (a + b);
        html =
          'Аналог вычисления по таблице: A=' +
          a +
          ', B=' +
          b +
          ', C = A*B + (A+B). Чему равно C?';
        break;
      }
      case 19: {
        var p = 20 + K * 3;
        answer = p % 3 !== 0 ? 1 : 2;
        html =
          'В куче ' +
          p +
          ' камней. За ход можно взять 1 или 2 камня. Проигрывает тот, кто не может ходить. Кто выигрывает при безошибочной игре, если первым ходит игрок 1? В ответе: ' +
          mono('1') +
          ' — первый, ' +
          mono('2') +
          ' — второй.';
        kind = 'logic';
        break;
      }
      case 20: {
        var stones = 15 + K + kim;
        answer = stones % 4 === 0 ? 2 : 1;
        html =
          'Позиционная игра: из кучи ' +
          stones +
          ' камней за ход берут 1…3. Выигрывает взявший последний камень. Кто выигрывает при оптимальной игре, если первым ходит игрок 1? ' +
          mono('1') +
          ' — первый, ' +
          mono('2') +
          ' — второй.';
        kind = 'logic';
        break;
      }
      case 21: {
        var lo = 10 + K;
        var hi = lo + 8 + kim;
        answer = hi - lo + 1;
        html =
          'Сколько целых значений параметра A удовлетворяют неравенству ' +
          lo +
          ' ≤ A ≤ ' +
          hi +
          '?';
        break;
      }
      case 22: {
        var base = 100 + K * 10;
        answer = base + 7 * 4;
        html =
          'Аналог таблицы: в первой строке арифметическая прогрессия с шагом 4, первый элемент ' +
          base +
          '. Чему равен 8-й элемент строки?';
        break;
      }
      case 23: {
        var n = 10 + K + kim;
        answer = (n * (n - 1)) / 2;
        html =
          'Учебный аналог перебора пар: сколько существует неупорядоченных пар различных чисел из множества {1, 2, …, ' +
          n +
          '}? (Считать пары {a,b} и {b,a} одной и той же.)';
        break;
      }
      case 24: {
        var strLen = 12 + kim * 2;
        answer = strLen - 2;
        html =
          'В КИМ — обработка строки из файла. Аналог: строка из ' +
          strLen +
          ' символов. Сколько в нё подстрок длины 3 (считая перекрывающиеся)?';
        break;
      }
      case 25: {
        var a = 2 + K;
        var b = 3 + kim;
        answer = a * a * a + b * b * b;
        html = 'Вычислите ' + mono(String(a) + '³ + ' + String(b) + '³') + ' в десятичной системе.';
        break;
      }
      case 26: {
        var n = 50 + K * 5;
        answer = n * n + 2 * n;
        html =
          'В КИМ — расширенная работа с таблицей. Аналог: при n = ' +
          n +
          ' вычислите n² + 2n. (Задание на 2 первичных балла.)';
        break;
      }
      case 27: {
        var p = 7 + kim;
        var q = 4 + K;
        answer = p * p + q * q * q;
        html =
          'В КИМ — программа и файлы. Аналог: пусть a=' +
          p +
          ', b=' +
          q +
          '. Чему равно a² + b³? (Задание на 2 первичных балла.)';
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
      note: note,
      html: html,
      answer: answer,
      kind: kind,
      okText: 'Верно.',
      reviewLinks: reviewLinksFor(num)
    };
  }

  global.EGE_KIM_TASKS = {
    LINE: LINE,
    REVIEW_LINKS: REVIEW_LINKS,
    reviewLinksFor: reviewLinksFor,
    buildAll: function (kim) {
      var out = [];
      for (var n = 1; n <= 27; n++) {
        out.push(task(kim, n));
      }
      return out;
    },
    maxPoints: 29
  };
})(typeof window !== 'undefined' ? window : globalThis);
