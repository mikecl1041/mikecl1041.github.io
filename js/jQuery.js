$(".expandIcon").click(function() {
  var clicked = $(this).attr('id');
  $('#obj-'+clicked).toggleClass("objectBoxColapse");
})

