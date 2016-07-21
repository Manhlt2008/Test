//function showTooltips(){
//	$('.tooltips').tooltip();
//}
function showPopoversHTML(){
	//$('.popovers-html').popover({title: 'title', html: true});
	$('.popovers-html').on('shown.bs.popover', function () {
	  	$('.close-popover').on('click', function(event) {
			$('.popovers-html').popover('hide');
		});
	});
	$('.popovers-html').on('click', function(event) {
		$('.popovers-html').not(this).popover('hide');
	});
}
function tabRadio(){
	$('.tab-radio input[type="radio"]').click(function () {
	    $(this).tab('show');
	});
}
function treeviewCheckbox(){
	var plus = $('.tree-view-checkbox i');
	plus.on('click',function() {
		var curPlus=$(this);
		if($(this).hasClass('fa-caret-right')){
			var eCollapse = $(this).parent('li').children('ul').collapse('show');
			eCollapse.on('shown.bs.collapse',function(){
				curPlus.removeClass('fa-caret-right').addClass('fa-caret-down');
			});
		}else{
			$(this).addClass('fa-caret-right').removeClass('fa-caret-down').parent('li').children('ul').collapse('hide');
		}
	});
}
function treeviewtable(){
	var plus = $('.tree-view-table i.fa-caret-right');
	plus.on('click', function(event) {
		if($(this).hasClass('fa-caret-right')){
			var target = $(this).removeClass('fa-caret-right').addClass('fa-caret-down').attr('data-target');
			$('#'+target).collapse('show');
		}else{
			var target = $(this).addClass('fa-caret-right').removeClass('fa-caret-down').attr('data-target');
			$('#'+target).collapse('hide');
		}
	});
}
function collapseTable(){
	var td = $('.table .td-collapse');
	td.on('click', function(event) {
		var tdPlus = $(this).find('.fa');
		if(tdPlus.hasClass('fa-plus-square-o')){
			var target = tdPlus.removeClass('fa-plus-square-o').addClass('fa-minus-square-o').parent().attr('data-target');
			$(target).collapse('show');
		}else{
			var target = tdPlus.addClass('fa-plus-square-o').removeClass('fa-minus-square-o').parent().attr('data-target');
			$(target).collapse('hide');
		}
	});
}
$(document).ready(function() {
	// Tab-radio
	tabRadio();
	//showTooltips();
	showPopoversHTML();
	treeviewCheckbox();
	treeviewtable();
	collapseTable();
});