$(document).ready(function() {
  // put your code here.
  $('.ui.sticky').sticky();
  $('.ui.dropdown').dropdown({on: 'click'});
  $('.item[data-tab]').tab();
  $('.ui.menu .item').on('click', function() {
    $(this).addClass('active').siblings().removeClass('active');
  });
});
