// ==UserScript==
// @name		Links To Keys
// @namespace	linkstokeys
// @version		0.02
// @grant		none
// ==/UserScript==

document.addEventListener('DOMContentLoaded', function(){
	var links	= document.querySelectorAll('a');
	var nums	= [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
	var buttons = [];
	var input	= false;
	var shift	= false;
	var ready	= false;
	var buffer	= '';
	var button;
	var link;
	var timer;
	var i;

	for(i = 0; i < links.length; i++) {
		// Create new element
		button = document.createElement('span');
		button.appendChild( document.createTextNode(i) );

		button.className = 'links-to-keys-button';

		// Set styles to element
		button.style.display			= 'none';
		button.style.position			= 'absolute';
		button.style.padding			= '2px';
		button.style.backgroundColor	= 'yellow';
		button.style.fontSize			= '10px';
		button.style.color				= 'red';

		links[i].className += ' linkstokeys-'+i;

		links[i].parentNode.insertBefore( button, links[i] );

		buttons.push( button );
	}

	window.addEventListener('keypress', function(event){
		var activeNode = document.activeElement;

		if (
			( activeNode.nodeName.toLowerCase() == 'input' ) ||
			( activeNode.nodeName.toLowerCase() == 'textarea' ) ||
			( activeNode.hasAttribute('contenteditable') && activeNode.getAttribute('contenteditable') == true )
			) {
			return true;
		}

		if ( ( event.key.toLowerCase() == 'f' ) && !event.ctrlKey ) {
			shift = event.shiftKey;

			for(i = 0; i < buttons.length; i++) {
				if ( buttons[i].style.display == 'none' ) {
					buttons[i].style.display = 'inline';
					ready = true;
				} else {
					buttons[i].style.display = 'none';
					ready = false;
				}
			}

			event.preventDefault();
			return false;
		}

		if ( event.key in nums && ready ) {
			clearTimeout(timer);

			buffer = buffer + event.key;

			timer = setTimeout(
						function(){
							var a = document.querySelector( 'a.linkstokeys-' + buffer );

							if ( a ) {
								if ( shift ) {
									a.setAttribute('target', '_blank');

									for(i = 0; i < buttons.length; i++)
										buttons[i].style.display = 'none';

									ready = false;
								}

								a.click();
							}

							buffer = '';
						},
						300
			);

			event.preventDefault();
			return false;
		}

		return true;
	});
});
