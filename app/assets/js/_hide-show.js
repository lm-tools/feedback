const $ = require('jquery');

$('[data-toggle-visibility-for]').on('click', el => {
  const $currentElement = $(el.target);
  const $target = $($currentElement.data('toggle-visibility-for'));
  $target.toggleClass('js-hidden');
});
