import { p as push, c as pop, d as current_component } from './index-CTQaAGnt.js';

function onDestroy(fn) {
  var context = (
    /** @type {Component} */
    current_component
  );
  (context.d ??= []).push(fn);
}
var GameState = /* @__PURE__ */ ((GameState2) => {
  GameState2["READY"] = "ready";
  GameState2["PLAYING"] = "playing";
  GameState2["PAUSED"] = "paused";
  GameState2["GAME_OVER"] = "gameOver";
  GameState2["SUCCESS"] = "success";
  return GameState2;
})(GameState || {});
function SnakeGame_1($$payload, $$props) {
  push();
  GameState.READY;
  onDestroy(() => {
    return;
  });
  $$payload.out += `<div class="game-container">`;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div>`;
  pop();
}
function _page($$payload) {
  $$payload.out += `<div class="min-h-screen bg-gray-900"><div class="container mx-auto px-4 py-8"><div class="max-w-4xl mx-auto">`;
  SnakeGame_1($$payload);
  $$payload.out += `<!----></div></div></div>`;
}

export { _page as default };
//# sourceMappingURL=_page.svelte-DpSEb4Bk.js.map
