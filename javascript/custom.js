/*!
 * Scripts
 */
head.ready(function() {
	(function(globals){
		"use strict";
		globals.GLOB = {};
	}(this));
	var $ = jQuery.noConflict();
	var 
		html_tag = $('html'),
		body_tag = $('body'),
		
		footer_id = $('#footer'),
		heading_id = $('#heading'),
		nav_id = $('#nav'),
		root_id = $('#root'),
		top_id = $('#top'),
		
		check_a = $('.check-a'),
		checklist_pin = $('.checklist-pin'),
		file_a = $('.file-a'),
		form_a = $('.form-a'),
		gallery_a = $('.gallery-a'),
		list_charts = $('.list-charts'),
		list_inline = $('.list-inline'),
		popup_tag = $('[class^=popup]'),
		selec_tag = $('select'),
		table_tag = $('table'),
		tabs_class = $('[class*="tabs"]:not(.tabs-inner, .tabs-header)')
	;
	var Default = {
		utils : {
			links : function(){
				$('a[rel*=external]').on('click',function(e){
					e.preventDefault();
					window.open($(this).attr('href'));						  
				});
			},
			mails : function(){
				$('.email:not(:input, div)').each(function(index){
					em = $(this).text().replace('//','@').replace(/\//g,'.');
					$(this).text(em).attr('href','mailto:'+em);
				});
			},
			forms : function(){
				form_a.add(list_inline).find('label:not(.hidden) + :input:not(select,button)').each(function(){
					$(this).attr('placeholder',$(this).parent().children('label').text()).parent().children('label').addClass('hidden');
				});
				
				xa = $('form > *, fieldset > *');
				xb = parseInt(xa.length,0);
				xa.each(function(){ $(this).css('z-index',xb); xb--; });
				
				$('input[type="checkbox"], input[type="radio"]').each(function(){ if($(this).is('[checked]')){ $(this).prop('checked',true).parent('label').addClass('active'); } else { $(this).prop('checked',false).removeAttr('checked'); } });
				heading_id.add(checklist_pin).add(gallery_a).add(check_a).find('label').append('<div class="input"></div>').each(function(){$(this).addClass($(this).children('input').attr('type'));}).children('input').addClass('hidden').on('click',function(){
					if($(this).parent().hasClass('radio')) { 
						$(this).parent('label').parents('p,ul').find('label').removeClass('active');
					}
					$(this).parent('label').toggleClass('active'); 
				});	

				selec_tag.wrap('<span class="select"></span>');
				
				file_a.find('label').each(function(){
					$(this).prepend('<input type="text" class="text" placeholder="'+$(this).text().trim()+'" readonly>');
					$(this).find('input[type="file"]').on('change',function(){
						$(this).parents('label').find('input[type="text"]').val($(this).val());
					});
				});
			},
			date : function(){
				footer_id.find('.date').text((new Date()).getFullYear());
			},
			top : function(){
				top_id.add(heading_id).append('<div class="menu"></div>');
				nav_id.find('li > ul').parent().addClass('sub').append('<span class="toggle"></span>').children('span.toggle').on('click',function(){
					$(this).parent().toggleClass('toggle');
					return false;
				});
				root_id.append('<nav id="mobile"></nav><div id="shadow"></div>');
				var mobile_id = $('#mobile');
				$('#shadow').add(top_id.children('.menu')).on('click',function(){ html_tag.removeClass('heading-active').toggleClass('menu-active'); return false; });
				heading_id.children('.menu').on('click',function(){ html_tag.removeClass('menu-active').toggleClass('heading-active'); return false; });

				nav_id.children().clone().appendTo(mobile_id);
				mobile_id.find('li.sub > span.toggle').on('click',function(){ $(this).parent().toggleClass('toggle'); return false; });		
			},
			popups : function(){
				popup_tag.wrapInner('<div class="box-outer"><div class="box-inner"><div class="box-inset"></div></div></div>');
				popup_tag.find('.box-outer').add(popup_tag.find('.box-inset')).append('<a class="close">Close</a>');
				
				function prepareUrl(str){
					str = str===undefined?'':str;
					str = str.toLowerCase();
					str = str.replace(/ /g, '-');
					str = str.replace(/'/g, '-');
					return str;
				}
				function removeHash(){
					if ('pushState' in history) { history.pushState('', document.title, window.location.pathname + window.location.search); }
					else { window.location = window.location.href.replace(/#.*/, ""); }
				}
				function setUrl(url){ window.location.hash = '!' + prepareUrl(url); return true; }
								
				var $trg=0;
				body_tag.on('click','a[data-popup]',function(){
					if(!$(this).is('.disabled')){
						popup_tag.removeClass('shown');
						$trg = $('*[class^=popup][data-title="'+$(this).attr('data-popup')+'"]');
						setUrl($trg.attr('data-title'));
						$trg.addClass('shown');
						html_tag.addClass('popup-shown');
						return false;
					}
				});
				
				popup_tag.find('.close').on('click',function(){ popup_tag.removeClass('shown'); html_tag.removeClass('popup-shown'); removeHash(); });
				$(window).on('keydown',function(e){ if(e.which == 27){ popup_tag.removeClass('shown'); html_tag.removeClass('popup-shown'); removeHash(); } });
				if(document.location.hash.length){
					$('a[data-popup="'+ document.location.hash.substring(2) +'"]').click();
					$('*[class^=popup].shown'); 
					html_tag.addClass('popup-shown');
				}				
			},
			tabs : function(){
				tabs_class.each(function(){
					$(this).children('div').each(function(){
						$(this).children().wrapInner('<div class="tabs-inner"></div>');
						$(this).children('*:not(:first-child)').addClass('hidden');
					});
					$(this).children('ul').each(function(){
						$(this).children('li:first-child').addClass('active');
						$(this).find('a').on('click',function(){
							$(this).parents('ul').children('li').removeClass('active');
							$(this).parent('li').addClass('active').parents('ul').next('div').children().addClass('hidden').parent().children(':eq('+$(this).parent().index()+')').removeClass('hidden');
							return false;
						}).each(function(){ 
							$(this).clone().addClass('tabs-header mobile-only').prependTo($(this).parents('ul').next('div').children(':eq('+$(this).parent().index()+')')); 
						});					
					});
					$(this).find('.tabs-header').on('click',function(){ $(this).toggleClass('toggle').next('.tabs-inner').toggleClass('toggle'); return false; });	
				});
			},
			offclick : function(){
				html_tag.on('click',function(){
					nav_id.find('li.toggle').removeClass('toggle');	
				});
				nav_id.find('li > ul').on('click',function(e){ e.stopPropagation(); });
			},
			charts : function(){
				list_charts.find('figure').append('<canvas class="line-chart"></canvas>').find('img').addClass('hidden');
				if($('.line-chart').size()){
					var ctx = $('.line-chart');
					ctx.each(function(){
						var i = 0,ari=[],arl=[];
						while(i<10){
							r = Math.floor(Math.random()*10);
							arl.push(r.toString());
							ari.push(r);
							i++; 
						}
						var chart = new Chart($(this), {
							type: 'line',
								data: {
									labels: arl,
									datasets: [{
									labels: [],
									borderWidth: 2,
									borderColor: '#b953cb',
									backgroundColor: '#e5f3f9',
									pointBackgroundColor: '#ffffff',
									pointHoverBackgroundColor: '#ffffff',
									pointBorderColor: '#212739',
									pointBorderWidth: 2,
									pointRadius: 3,
									pointHoverRadius: 3,
									lineTension: 0,
									data: ari,
									fill: true
								}]
							},
							options: {
								maintainAspectRatio: false,
								responsive: true,
								legend : {
									display: false
								},
								labels : {
									display: false
								},
								title: {
									display: false
								},
								tooltips: {
									enabled: false
								},
								scales: {
									xAxes: [{
										display: false
									}],
									yAxes: [{
										display: false
									}]
								},
								showTooltips: false,
								animation: {
									duration: 0
								},
								hover: {
									animationDuration: 0
								},
								responsiveAnimationDuration: 0,
								layout: {
									padding: {
										top: 4,
										right: 4,
										bottom: 4,
										left: 4
									}
								},
							}
						});
					});		
				}
			},
			miscellaneous : function(){
				list_inline.parent('.double').children(':header').addClass('before-list-inline');
				list_inline.find('form').each(function(){
					$(this).append('<a class="toggle"></a>').children('a.toggle').on('click',function(){ $(this).parents('form').toggleClass('toggle'); return false; });
				});
				table_tag.wrap('<div class="table-wrapper"></div>');
			}
		},
		ie : {
			css : function() {
				html_tag.each(function(){ 				
					if($(this).is('.lt-ie11')){ $('input[placeholder], textarea[placeholder]').placeholder(); }
					if($(this).is('.lt-ie9')){
						body_tag.append('<p class="lt-ie9">Your browser is ancient! Please <a target="_blank" href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>').css('padding-top','28px');
						$(':last-child').addClass('last-child');
					}
				});
			}
		}

	};

	Default.utils.links();
	Default.utils.mails();
	Default.utils.forms();
	Default.utils.date();
	Default.utils.miscellaneous();
	Default.utils.offclick();
	Default.utils.popups();
	Default.utils.tabs();
	Default.utils.top();
	Default.utils.charts();
	Default.ie.css();
});

/*!*/