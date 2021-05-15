$(function () {
  var $btnWrap = $('#mid-bot-btns');
  // 停车等3个按
  $('#mid-bot-controller').on('click', 'a', function () {
    return
    var $this = $(this);
    $.ajax({
      url: 'url',
      type: '',
      data: {
        action: $this.attr('data-action'),
      }
    }).then(function () {

    });
  });
  // 发送
  $('#send-btn-status').on('click', function () {
    return
    var status = {}
    $btnWrap.find('ul').each(function () {

    });

    $.ajax({
      url: 'url',
      type: '',
      data: {
        status,
      },
    }).then(function () {

    });
  });
  // 底部小黄点
  $btnWrap.on('click', 'li', function () {
    var $this = $(this);
    $this.addClass('active').siblings().removeClass('active');
  });
})