// ==UserScript==
// @name		Links To Keys
// @namespace	linkstokeys
// @version		0.04
// @grant		none
// ==/UserScript==

document.addEventListener('DOMContentLoaded', function(){
	var nums	= [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
	var input	= false;
	var shift	= false;
	var ready	= false;
	var buffer	= '';
	var force;
	var buttons;
	var button;
	var links;
	var link;
	var timer;
	var i;

	window.addEventListener('keypress', function(event){
		if ( ( event.key.toLowerCase() == 'f' ) && !event.ctrlKey ) {
			force = event.altKey;

			if ( !force ) {
				var activeNode = document.activeElement;

				if (
					( activeNode.nodeName.toLowerCase() == 'input' ) ||
					( activeNode.nodeName.toLowerCase() == 'textarea' ) ||
					( activeNode.hasAttribute('contenteditable') && activeNode.getAttribute('contenteditable').toString() == 'true' )
					) {
					return true;
				}
			}

			if ( !ready ) {
				// Build helpers
				links	= document.querySelectorAll('a');
				buttons	= [];

				for(i = 0; i < links.length; i++) {
					// Create new element
					button = document.createElement('span');
					button.appendChild( document.createTextNode(i) );

					button.className = 'links-to-keys-button';

					// Set styles to element
					button.style.display			= 'inline';
					button.style.position			= 'absolute';
					button.style.padding			= '2px';
					button.style.backgroundColor	= 'yellow';
					button.style.fontSize			= '10px';
					button.style.color				= 'red';

					links[i].className += ' linkstokeys-'+i;

					links[i].parentNode.insertBefore( button, links[i] );

					buttons.push( button );
				}
			} else {
				for(i = 0; i < buttons.length; i++) {
					links[i].className = links[i].className.replace( ' linkstokeys-' + i, '' );
					buttons[i].parentNode.removeChild(buttons[i]);
				}
			}

			ready = !ready;
			shift = event.shiftKey;

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
								if ( shift )
									a.setAttribute('target', '_blank');

								a.click();

								for(i = 0; i < buttons.length; i++) {
									links[i].className = links[i].className.replace( ' linkstokeys-' + i, '' );
									buttons[i].parentNode.removeChild(buttons[i]);
								}

								ready = false;
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
