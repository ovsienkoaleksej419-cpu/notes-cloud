/**
 * Разбор ошибок через нейросеть (OpenRouter на Netlify).
 * Тот же endpoint, что и у bot.html.
 */
(function (global) {
  'use strict';

  var API_PATH = '/.netlify/functions/openrouter';

  function stripHtml(html) {
    if (!html) return '';
    var d = document.createElement('div');
    d.innerHTML = html;
    return (d.textContent || d.innerText || '').replace(/\s+/g, ' ').trim();
  }

  function buildMistakePrompt(opts) {
    var line = opts.line || 'ЕГЭ информатика';
    var plain = opts.plainTask || '';
    var ua = opts.userAnswer;
    if (ua === undefined || ua === null || String(ua).trim() === '') ua = '(не указан)';
    var ca = opts.correctAnswer;
    if (ca === undefined || ca === null) ca = '—';
    return (
      'Ученик выполнил учебное задание по информатике и ошибся.\n\n' +
      'Тема: ' +
      line +
      '\n' +
      'Текст задания:\n' +
      plain +
      '\n\n' +
      'Ответ ученика: ' +
      ua +
      '\n' +
      'Правильный ответ: ' +
      ca +
      '\n\n' +
      'Кратко (до 10 предложений) разбери: в чём типичная ошибка, какой ход рассуждений помогает, ' +
      'напомни нужную формулу или правило. Можно один конкретный шаг к решению. ' +
      'Пиши по-русски, без осуждения.'
    );
  }

  /**
   * @returns {Promise<string>}
   */
  function explainMistake(opts) {
    var prompt = buildMistakePrompt(opts);
    return fetch(API_PATH, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: prompt, mode: 'ege' })
    }).then(function (res) {
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return res.json();
    }).then(function (data) {
      return (data && data.reply) || 'Нет ответа от модели.';
    });
  }

  global.LogicUpAI = {
    explainMistake: explainMistake,
    stripHtml: stripHtml,
    buildMistakePrompt: buildMistakePrompt,
    apiPath: API_PATH
  };
})(typeof window !== 'undefined' ? window : globalThis);
