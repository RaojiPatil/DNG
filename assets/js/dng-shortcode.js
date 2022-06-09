// (function ($) {
// 	$(document).ready(function () {
// 		var xhrRequest = "",
// 			debounce = "";

// 		const makeAPICall = function () {
// 			// if (xhrRequest) {
// 			// 	xhrRequest.abort();
// 			// }

// 			// const name = $('#dng-search-query-input').val();
// 			// let tlds = JSON.parse($('#dng-search-tlds-input').val());
// 			// const max_length = $('#dng-maxlength').val();
// 			// const use_dashes = $('#dng-use-dashes').is(':checked');
// 			// const use_numbers = $('#dng-use-numbers').is(':checked');
// 			// const use_idns = $('#dng-use-idns').is(':checked');
// 			// const include_registered = $('#dng-include-registered').is(
// 			// 	':checked'
// 			// );

// 			const newTlds = [];
// 			tlds.forEach(function (item) {
// 				newTlds.push(item.value);
// 			});

// 			tlds = newTlds;

// 			if (!name) {
// 				return;
// 			}

// 			const response_container = $('.dng-row-layout');
// 			// response_container.empty();
// 			response_container.append('<div id="dng-loader"></div>');

// 			const postData = {
// 				action: 'dng_search_domain',
// 				name,
// 				tlds,
// 				max_length,
// 				use_dashes,
// 				use_idns,
// 				use_numbers,
// 				include_registered,
// 				nonce: dngData.dng_search_nonce,
// 			};

// 			xhrRequest = $.ajax({
// 				type: 'POST',
// 				data: postData,
// 				url: dngData.ajax_url,
// 				success(response) {
// 					if (response.success) {
// 						console.log(response.data);
// 					}

// 					// response_container.empty();
// 					response_container.append(response.data);
// 				},
// 			});
// 		};

// 		$('#dng-search-query-submit').on('click', function (e) {
// 			clearTimeout(debounce);
// 			debounce = setTimeout(function () {
// 				makeAPICall();
// 			}, );
// 		});

// 		tagify1 = new Tagify(
// 			document.querySelector('input[name=dng-search-tlds-input]'),
// 			{
// 				whitelist: dngData.tlds,
// 			}
// 		);

// 		$('body').on('click', '.dng-manage-favourite', function () {
// 			const response_container = $(this).find('.dng-status');
// 			$.ajax({
// 				type: 'POST',
// 				data: {
// 					action: 'dng_manage_favourite',
// 					nonce: dngData.dng_dng_manage_favourite_nonce,
// 					domain: $(this)
// 						.parent('.dng-col')
// 						.find('span.dng-domain-name')
// 						.text()
// 						.trim(),
// 				},

// 				url: dngData.ajax_url,
// 				success(response) {
// 					if (
// 						response.hasOwnProperty('success') &&
// 						response.success
// 					) {
// 						response_container.empty();

// 						response_container.append(response.data.icon);
// 						$('.dng_popover__content')
// 							.empty()
// 							.append(response.data.lists);
// 					}
// 				},
// 			});
// 		});

// 		let availableTags = [];

// 		const autoCompNodeId = 'dng-search-query-input';

// 		$('#' + autoCompNodeId).autocomplete({
// 			source(requestObj, responseFunc) {
// 				availableTags = StartupNameGenerator(
// 					requestObj.term.replace(/ /g, '')
// 				);

// 				let matchArry = availableTags.slice(); //-- Copy the array
// 				const srchTerms = $.trim(requestObj.term).split(/\s+/);

// 				// For each search term, remove non-matches.
// 				$.each(srchTerms, function (J, term) {
// 					const regX = new RegExp(term, 'i');
// 					matchArry = $.map(matchArry, function (item) {
// 						return regX.test(item) ? item : null;
// 					});
// 				});

// 				// Return the match results.
// 				responseFunc(matchArry);
// 			},
// 			open(event, ui) {
// 				debugger;
// 				/* This function provides no hooks to the results list;
//                   so, we have to trust the selector, for now. */

// 				const resultsList = $(
// 					'ul.ui-autocomplete > li.ui-menu-item > a'
// 				);

// 				const srchTerm = $.trim($('#' + autoCompNodeId).val())
// 					.split(/\s+/)
// 					.join('|');

// 				// Loop through the results list and highlight the terms.
// 				resultsList.each(function () {
// 					const jThis = $(this);
// 					const regX = new RegExp('(' + srchTerm + ')', 'ig');
// 					const oldTxt = jThis.text();

// 					jThis.html(
// 						oldTxt.replace(
// 							regX,
// 							'<span class="srchHilite">$1</span>'
// 						)
// 					);
// 				});
// 			},
// 		});
// 	});
// })(jQuery);
