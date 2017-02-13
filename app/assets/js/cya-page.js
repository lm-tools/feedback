/*
 All of the css selectors here should start with [data-page-id="cya"] in order to target
 choose your activity page only.
 */

$(document).ready(() => {
  $('[data-page-id="cya"] input[type=radio][name=reason]').change(function () {
    if (this.value === 'reasonOther') {
      $('.reasonOther-visibility').removeClass('js-hidden');
    } else {
      $('.reasonOther-visibility').addClass('js-hidden');
    }
  });
});
