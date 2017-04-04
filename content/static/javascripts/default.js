// init quotes
function get_random_int(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function get_quote() {
  var quotes = [
    "The future is already here — it’s just not very evenly distributed.",
    "Less is more, more is different.",
    "In theory, there is no difference between theory and practice. But, in"
      + " practice, there is.",
    "The best way to predict future, is to create it.",
    "Hope is a good thing, maybe the best of things, and no good thing ever"
      + " dies",
    "Most of the world's major problems result from machines that fail to work,"
      + " and people who fail to think.",
    "When you don’t create things, you become defined by your tastes rather than"
      + " ability. Your tastes only narrow & exclude people. So create."
  ];

  return quotes[get_random_int(0, quotes.length - 1)];
}

function show_disqus_comments(event) {
  $.ajaxSetup({cache: true});
  $.getScript("http://semantic-ui-forest.disqus.com/embed.js");
  $.ajaxSetup({cache: false});
  setTimeout(function () {
    $('#show-disqus-comments').parent().fadeOut(3000);
  });
}

$(document).ready(function() {
  // put your code here.
  $('.ui.sticky').sticky();
  $('.ui.dropdown').dropdown({on: 'click'});
  $('.item[data-tab]').tab();
  $('.ui.menu:not(nav) .item:not(.dropdown)').on('click', function() {
    $(this).addClass('active').siblings().removeClass('active');
  });
  $(".quote").html(get_quote());
});
