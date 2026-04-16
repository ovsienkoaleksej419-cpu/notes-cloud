/**
 * Учебные КИМ по физике: 26 заданий, до 45 первичных баллов (как в спецификации ЕГЭ: часть 1 + 21–26).
 * Тексты учебные, не официальные КИМ ФИПИ; где на экзамене нужен развёрнутый ответ — краткий числовой аналог.
 */
(function (global) {
  'use strict';

  var KIM_POINTS = [
    1, 1, 1, 1, 2, 2, 1, 1, 2, 2, 1, 1, 1, 2, 2, 1, 2, 2, 1, 1, 3, 2, 2, 3, 3, 4
  ];

  var LINE = [
    'Механика: равномерное прямолинейное движение',
    'Механика: средняя скорость',
    'Механика: равноускоренное движение',
    'Механика: свободное падение (g = 10 м/с²)',
    'Динамика: второй закон Ньютона',
    'Механика: работа силы',
    'Механика: мощность',
    'Механика: кинетическая энергия',
    'Механика: потенциальная энергия (поле тяжести, g = 10)',
    'Механика: импульс тела',
    'МКТ и термодинамика: изопроцесс (учебный числовой аналог)',
    'Термодинамика: количество теплоты (учебный аналог)',
    'Электростатика: взаимодействие зарядов (учебная модель)',
    'Электростатика: однородное поле и напряжённость',
    'Электростатика: конденсатор (ёмкость и заряд)',
    'Постоянный ток: закон Ома для участка',
    'Постоянный ток: последовательное соединение',
    'Постоянный ток: параллельное соединение (два одинаковых резистора)',
    'Постоянный ток: работа тока',
    'Магнитное поле: сила Ампера (учебный аналог)',
    'Электромагнитная индукция (учебный числовой аналог)',
    'Переменный ток: связь амплитудного и действующего напряжения (числовой аналог)',
    'Механические колебания: частота и период',
    'Волны: длина волны и скорость распространения',
    'Оптика / кванты: учебный комбинированный расчёт',
    'Атомное ядро: учебный числовой аналог (состав ядра)'
  ];

  /** Ссылки на конспекты после неверного ответа (как в КИМ по информатике). */
  var REVIEW_LINKS = {
    1: [{ href: 'notes/physics/ege-kinematika.html', title: 'Кинематика' }],
    2: [{ href: 'notes/physics/ege-kinematika.html', title: 'Кинематика' }],
    3: [
      { href: 'notes/physics/ege-kinematika.html', title: 'Кинематика' },
      { href: 'notes/physics/ege-dinamika.html', title: 'Динамика' }
    ],
    4: [{ href: 'notes/physics/ege-kinematika.html', title: 'Кинематика' }],
    5: [{ href: 'notes/physics/ege-dinamika.html', title: 'Динамика' }],
    6: [
      { href: 'notes/physics/ege-zakony-sohraneniya.html', title: 'Работа и энергия' },
      { href: 'notes/physics/ege-dinamika.html', title: 'Динамика' }
    ],
    7: [{ href: 'notes/physics/ege-zakony-sohraneniya.html', title: 'Работа и мощность' }],
    8: [{ href: 'notes/physics/ege-zakony-sohraneniya.html', title: 'Кинетическая энергия' }],
    9: [{ href: 'notes/physics/ege-zakony-sohraneniya.html', title: 'Потенциальная энергия' }],
    10: [{ href: 'notes/physics/ege-zakony-sohraneniya.html', title: 'Импульс' }],
    11: [
      { href: 'notes/physics/mkt.html', title: 'МКТ и газовые законы' },
      { href: 'notes/physics/ege-termodinamika.html', title: 'Термодинамика' }
    ],
    12: [{ href: 'notes/physics/ege-termodinamika.html', title: 'Термодинамика' }],
    13: [{ href: 'notes/physics/ege-elektrostatika.html', title: 'Электростатика' }],
    14: [{ href: 'notes/physics/ege-elektrostatika.html', title: 'Напряжённость поля' }],
    15: [{ href: 'notes/physics/ege-elektrostatika.html', title: 'Конденсатор' }],
    16: [{ href: 'notes/physics/ege-elektricheskie-tsepi.html', title: 'Постоянный ток' }],
    17: [{ href: 'notes/physics/ege-elektricheskie-tsepi.html', title: 'Законы Ома и Кирхгофа' }],
    18: [{ href: 'notes/physics/ege-elektricheskie-tsepi.html', title: 'Соединение резисторов' }],
    19: [{ href: 'notes/physics/ege-elektricheskie-tsepi.html', title: 'Работа и мощность тока' }],
    20: [{ href: 'notes/physics/ege-magnetizm.html', title: 'Магнитное поле' }],
    21: [{ href: 'notes/physics/ege-magnetizm.html', title: 'Индукция' }],
    22: [{ href: 'notes/physics/ege-peremennyy-tok.html', title: 'Переменный ток' }],
    23: [{ href: 'notes/physics/ege-kolebaniya.html', title: 'Механические колебания' }],
    24: [{ href: 'notes/physics/ege-volny-optika.html', title: 'Волны и оптика' }],
    25: [
      { href: 'notes/physics/ege-volny-optika.html', title: 'Оптика' },
      { href: 'notes/physics/ege-kvanty-fotoeffekt.html', title: 'Кванты' }
    ],
    26: [{ href: 'notes/physics/ege-atom-yadro.html', title: 'Атом и ядро' }]
  };

  function reviewLinksFor(num) {
    return REVIEW_LINKS[num] || [{ href: 'notes.html', title: 'Каталог конспектов (физика)' }];
  }

  function mono(s) {
    return '<span class="mono">' + s + '</span>';
  }

  function task(kim, num) {
    var K = kim + 1;
    var pts = KIM_POINTS[num - 1];
    var line = LINE[num - 1];
    var html;
    var answer;
    var kind = 'number';

    switch (num) {
      case 1: {
        var v = 10 + K + kim;
        var t = 2 + kim;
        answer = v * t;
        html =
          'Тело движется равномерно по прямой со скоростью ' +
          v +
          ' м/с. Какой путь оно пройдёт за ' +
          t +
          ' с? Ответ в метрах.';
        break;
      }
      case 2: {
        var tt = 4 + kim;
        var vavg = 10 + K + kim;
        var s2 = tt * vavg;
        answer = vavg;
        html =
          'Материальная точка за время ' +
          tt +
          ' с прошла путь ' +
          s2 +
          ' м по прямой без разворотов. Чему равна средняя скорость (м/с)?';
        break;
      }
      case 3: {
        var ta = 2 + kim;
        var aa = 3 + K;
        var v0 = 4 + kim;
        var v1 = v0 + aa * ta;
        answer = aa;
        html =
          'Скорость тела равномерно изменилась с ' +
          v0 +
          ' м/с до ' +
          v1 +
          ' м/с за ' +
          ta +
          ' с. Чему равно ускорение (м/с²)?';
        break;
      }
      case 4: {
        var tf = 2 + kim;
        answer = 5 * tf * tf;
        html =
          'Тело падает из состояния покоя с ускорением свободного падения g = 10 м/с². Какой путь оно пройдёт за ' +
          tf +
          ' с? Ответ в метрах (h = gt²/2).';
        break;
      }
      case 5: {
        var m = 2 + kim;
        var a = 4 + K;
        answer = m * a;
        html = 'Сила, сообщающая телу массой ' + m + ' кг ускорение ' + a + ' м/с². Чему равна сила (Н)?';
        break;
      }
      case 6: {
        var Ff = 15 + K * 2;
        var dd = 4 + kim;
        answer = Ff * dd;
        html = 'Равнодействующая сила ' + Ff + ' Н смещает тело на ' + dd + ' м вдоль силы. Чему равна работа (Дж)?';
        break;
      }
      case 7: {
        var tj = 10 + kim;
        var Pw = 30 + K + kim;
        var Aj = tj * Pw;
        answer = Pw;
        html =
          'Сила совершила работу ' +
          Aj +
          ' Дж за ' +
          tj +
          ' с постоянной мощности. Чему равна мощность (Вт)?';
        break;
      }
      case 8: {
        var mm = 4 + 2 * kim;
        var vv = 5 + K;
        answer = (mm * vv * vv) / 2;
        html =
          'Кинетическая энергия тела массой ' +
          mm +
          ' кг, движущегося со скоростью ' +
          vv +
          ' м/с. E = mv²/2. Ответ в джоулях (целое число).';
        break;
      }
      case 9: {
        var m2 = 3 + kim;
        var hh = 4 + K;
        answer = m2 * 10 * hh;
        html =
          'Потенциальная энергия тела массой ' +
          m2 +
          ' кг на высоте ' +
          hh +
          ' м (g = 10 м/с²). E<sub>p</sub> = mgh. Ответ в джоулях.';
        break;
      }
      case 10: {
        var m3 = 4 + K;
        var v3 = 5 + kim;
        answer = m3 * v3;
        html = 'Импульс тела массой ' + m3 + ' кг со скоростью ' + v3 + ' м/с. p = mv. Ответ в кг·м/с.';
        break;
      }
      case 11: {
        var fac = 3 + kim;
        var Pa = 10 + K;
        var Pb = 5 + K;
        var P1 = fac * Pa;
        var V1 = Pb;
        var V2 = fac;
        answer = Pa * Pb;
        html =
          'Изотермически: P₁V₁ = P₂V₂. Было P₁ = ' +
          P1 +
          ' Па, V₁ = ' +
          V1 +
          ' (усл. ед.), стало V₂ = ' +
          V2 +
          ' (те же ед.). Найдите P₂ (Па).';
        break;
      }
      case 12: {
        var aa = 10 + K;
        var bb = 5 + kim;
        answer = aa * bb;
        html =
          'Учебный аналог: количество теплоты Q = a·b, где a = ' +
          aa +
          ', b = ' +
          bb +
          ' (все величины подобраны так, что Q целое в джоулях). Найдите Q.';
        break;
      }
      case 13: {
        var q1 = 2 + kim;
        var q2 = 4 + K;
        answer = q1 * q2;
        html =
          'Учебная модель: сила взаимодействия F = q₁q₂ (в условных единицах), где q₁ = ' +
          q1 +
          ', q₂ = ' +
          q2 +
          '. Найдите F.';
        break;
      }
      case 14: {
        var dist = 3 + kim;
        var Eu = 5 + K;
        var Uu = dist * Eu;
        answer = Eu;
        html =
          'Однородное поле: разность потенциалов на расстоянии ' +
          dist +
          ' м равна ' +
          Uu +
          ' В. Модуль напряжённости E = U/d (В/м).';
        break;
      }
      case 15: {
        var Uc = 6 + kim;
        var Cc = 4 + K;
        var Qc = Uc * Cc;
        answer = Cc;
        html =
          'Заряд конденсатора ' +
          Qc +
          ' мкКл, напряжение на нём ' +
          Uc +
          ' В. Ёмкость C = Q/U (мкФ).';
        break;
      }
      case 16: {
        var R0 = 3 + kim;
        var I0 = 5 + K;
        var U0 = R0 * I0;
        answer = I0;
        html = 'Участок цепи: напряжение ' + U0 + ' В, сопротивление ' + R0 + ' Ом. Сила тока I (А)?';
        break;
      }
      case 17: {
        var Ra = 8 + kim;
        var Rb = 10 + K;
        answer = Ra + Rb;
        html = 'Последовательно соединены резисторы ' + Ra + ' Ом и ' + Rb + ' Ом. Полное сопротивление (Ом)?';
        break;
      }
      case 18: {
        var X = 12 + 4 * kim + 2 * K;
        answer = X / 2;
        html =
          'Два одинаковых резистора сопротивлением по ' +
          X +
          ' Ом соединены параллельно. Чему равно полное сопротивление (Ом)?';
        break;
      }
      case 19: {
        var Iw = 2 + kim;
        var Uw = 10 + K;
        var tw = 8 + kim;
        answer = Iw * Uw * tw;
        html =
          'Постоянный ток I = ' +
          Iw +
          ' А, напряжение U = ' +
          Uw +
          ' В, время t = ' +
          tw +
          ' с. Работа тока A = UIt (Дж).';
        break;
      }
      case 20: {
        var Ib = 4 + K;
        var Lb = 2 + kim;
        var Bb = 2;
        answer = Ib * Lb * Bb;
        html =
          'Провод длиной ' +
          Lb +
          ' м перпендикулярен вектору индукции. Ток ' +
          Ib +
          ' А, B = ' +
          Bb +
          ' Т. F = IℓB (максимальная сила Ампера). Ответ в ньютонах.';
        break;
      }
      case 21: {
        var Nn = 50 + K * 5;
        var dFi = 4 + kim;
        var dt = 2;
        answer = (Nn * dFi) / dt;
        html =
          'Учебный аналог закона Фарадея: ЭДС = N·|ΔΦ|/Δt, N = ' +
          Nn +
          ' витков, |ΔΦ| = ' +
          dFi +
          ' (усл. ед.), Δt = ' +
          dt +
          ' с. Найдите ЭДС (целое).';
        break;
      }
      case 22: {
        var Um = 20 + K * 4;
        answer = (Um * Um) / 2;
        html =
          'Для синусоидального напряжения U<sub>действ</sub> = U<sub>m</sub>/√2. При U<sub>m</sub> = ' +
          Um +
          ' В чему равно (U<sub>действ</sub>)² в В²? (Целое число: U<sub>m</sub>²/2.)';
        break;
      }
      case 23: {
        var Tp = 2 + kim;
        answer = 60 / Tp;
        html =
          'Колебания с периодом T = ' +
          Tp +
          ' с. Частота f = 1/T (Гц). Для проверки введите значение 60/T (целое число).';
        break;
      }
      case 24: {
        var ff = 50 + K * 5;
        var lam = 6 + kim;
        answer = ff * lam;
        html =
          'Волна: частота f = ' +
          ff +
          ' Гц, длина волны λ = ' +
          lam +
          ' м (учебные значения). v = fλ. Скорость распространения (м/с)?';
        break;
      }
      case 25: {
        var n1 = 2 + kim;
        var n2 = 3 + K;
        answer = n1 + n2;
        html =
          'Учебный комбинированный расчёт: показатель преломления первой среды n₁ = ' +
          n1 +
          ', второй n₂ = ' +
          n2 +
          '. Чему равна сумма n₁ + n₂ (для проверки ввода)?';
        break;
      }
      case 26: {
        var Z = 10 + K;
        var Nnuc = 20 + kim;
        answer = Nnuc - Z;
        html =
          'В ядре изотопа число нуклонов A = ' +
          Nnuc +
          ', зарядовое число Z = ' +
          Z +
          '. Чему равно число нейтронов N = A − Z?';
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

  global.EGE_KIM_TASKS_PHYSICS = {
    LINE: LINE,
    REVIEW_LINKS: REVIEW_LINKS,
    reviewLinksFor: reviewLinksFor,
    TASK_POINTS: KIM_POINTS,
    taskCount: 26,
    maxPoints: 45,
    buildAll: function (kim) {
      var out = [];
      for (var n = 1; n <= 26; n++) {
        out.push(task(kim, n));
      }
      return out;
    }
  };
})(typeof window !== 'undefined' ? window : globalThis);
