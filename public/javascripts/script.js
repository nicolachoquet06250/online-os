'use strict';

function get_window_type(type) {
	let types = {
		void: null,
		settings: {
			url: '/settings',
			title: 'Settings',
			logo: 'fa-user-cog'
		}
	};

	if(type && types[type]) {
		return types[type];
	}
}

function add_desktop_wallpaper(url) {
	let desktop_body = document.querySelector('.desktop-body');
	desktop_body.style.backgroundImage = `url("${url}")`;
	desktop_body.style.backgroundSize = 'cover';
	desktop_body.style.backgroundPosition = 'center';
	desktop_body.style.backgroundRepeat = 'no-repeat';
}

function init_desktop() {
	let size_desktop = () => {
		let window_size = window.innerHeight;
		document.querySelector('.desktop-container').style.height = window_size + 'px';
		document.querySelector('.desktop-body').style.height = window_size - 50 + 'px';
	};

	(() => {
		size_desktop();
		window.addEventListener('resize', size_desktop);
	})();
}

function show_start_menu() {
	document.querySelector('.start-menu').classList.remove('hide');
}

function hide_start_menu() {
	document.querySelector('.start-menu').classList.add('hide');
}

function init_start_menu() {
	document.querySelector('.start-menu .logo').addEventListener('click', () => hide_start_menu());
	document.querySelector('.start-menu .settings').addEventListener('click', () => {
		hide_start_menu();
		create_system_window(undefined, 'settings');
	});
}

function init_task_bar() {
	document.querySelector('.task-bar .logo').addEventListener('click', () => show_start_menu());

	let get_hour = () => {
		let date = new Date();
		let hours = date.getHours();
		let minutes = date.getMinutes();
		let secondes = date.getSeconds();

		secondes = secondes < 10 ? '0' + secondes : secondes;
		minutes = minutes < 10 ? '0' + minutes : minutes;
		hours = hours < 10 ? '0' + hours : hours;
		return hours + ':' + minutes + ':' + secondes;
	};
	let write_hour = () => {
		document.querySelector('.task-bar .hour').innerHTML = get_hour();
	};

	write_hour();
	window.setInterval(write_hour, 1000);

}

function create_system_window(callback, window_type = 'void') {
	let center_window = _window => {
		_window.style.top = ((window.innerHeight - parseInt(_window.style.height.replace('px', ''))) / 2) + 'px';
		_window.style.left = ((window.innerWidth - parseInt(_window.style.height.replace('px', ''))) / 2) + 'px';
	};
	let insert_app_into_task_bar = (_window, url_logo, title) => {
		let create_id_for_app_card = (title, i = 0) => {
			if(i > 0) {
				if (document.querySelector('#app-launcher-' + title.replace(' ', '_').toLowerCase() + '_' + i) !== null) {
					return create_id_for_app_card(title, i + 1);
				}
				return {
					id: 'app-launcher-' + title.replace(' ', '_').toLowerCase() + '_' + i,
					i: i
				};
			}
			else {
				if (document.querySelector('#app-launcher-' + title.replace(' ', '_').toLowerCase())) {
					return create_id_for_app_card(title, i + 1);
				}
				return {
					id: 'app-launcher-' + title.replace(' ', '_').toLowerCase(),
					i: i
				};
			}
		};

		let app_card = document.createElement('div');
		app_card.style.height = '50px';
		app_card.style.maxWidth = '150px';
		app_card.style.color = 'white';
		app_card.style.cursor = 'pointer';
		app_card.style.paddingRight = '15px';
		app_card.style.paddingLeft = '15px';
		app_card.classList.add('app-launcher');

		let id_object = create_id_for_app_card(title);

		app_card.setAttribute('id', id_object.id);
		_window.setAttribute('data_i', id_object.i.toString());

		app_card.addEventListener('mouseover', () => {
			app_card.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
		});
		app_card.addEventListener('mouseout', () => {
			app_card.style.backgroundColor = 'transparent';
		});

		let app_card_logo;
		if(url_logo.substr(0, 3) === 'fa-') {
			app_card_logo = document.createElement('div');
			app_card_logo.classList.add('fa');
			app_card_logo.classList.add(url_logo);
			app_card_logo.style.fontSize = '30px';
			app_card_logo.style.paddingTop = '5px';
			app_card_logo.style.paddingLeft = '5px';
			app_card_logo.style.paddingRight = '5px';
			app_card_logo.style.height = '45px';
			app_card_logo.style.width = '45px';
		}
		else {
			app_card_logo = document.createElement('img');
			app_card_logo.src = url_logo;
			app_card_logo.style.height = '45px';
			app_card_logo.style.width = '45px';
		}
		let app_card_title = document.createElement('span');
		app_card_title.innerHTML = title;
		app_card_title.style.fontSize = '15px';
		app_card_title.style.color = 'white';
		app_card_title.style.cursor = 'pointer';

		app_card.append(app_card_logo);
		app_card.append(app_card_title);

		app_card.addEventListener('click', () =>
			_window.classList.contains('minimized') ? unminimize_system_window(_window) : minimize_system_window(_window));

		document.querySelector('.task-bar .apps-launcher').append(app_card);
	};
	let create_top_bar = (_window, window_type) => {
		let create_logo = (_window, logo, url, title, callback) => {
			logo.style.position = 'absolute';
			logo.style.left = '0';

			let img;
			if(window_type.logo.substr(0, 3) === 'fa-') {
				img = document.createElement('div');
				img.classList.add('fa');
				img.classList.add(window_type.logo);
				img.style.fontSize = '30px';
				img.style.paddingTop = '5px';
				img.style.paddingLeft = '5px';
				img.style.paddingRight = '5px';
				img.style.height = '45px';
				img.style.width = '45px';
			}
			else {
				img = document.createElement('img');
				img.style.height = '40px';
				img.style.width = '40px';
				img.style.textAlign = 'center';
				img.style.cursor = 'default';
				img.src = url;
			}
			if (callback !== undefined) {
				img.addEventListener('click', () => callback(_window));
			}

			let title_txt = document.createElement('span');
			title_txt.style.fontSize = '15px';
			title_txt.style.cursor = 'default';
			title_txt.innerHTML = title;

			logo.append(img);
			logo.append(title_txt);
		};
		let create_close_btn = (_window, buttons, callback, title) => {
			let close_btn = document.createElement('div');
			close_btn.style.height = '40px';
			close_btn.style.width = '40px';
			close_btn.style.paddingTop = '10px';
			close_btn.style.textAlign = 'center';
			close_btn.style.fontSize = '20px';
			close_btn.style.cursor = 'pointer';
			close_btn.classList.add('fa');
			close_btn.classList.add('fa-times');
			close_btn.addEventListener('mouseover', () => {
				close_btn.style.backgroundColor = 'red';
			});
			close_btn.addEventListener('mouseout', () => {
				close_btn.style.backgroundColor = 'transparent';
			});
			close_btn.addEventListener('click', () => callback(_window, title));

			buttons.append(close_btn);
		};
		let create_minimize_btn = (_window, buttons, callback, title) => {
			let minimize_btn = document.createElement('div');
			minimize_btn.style.height = '40px';
			minimize_btn.style.width = '40px';
			minimize_btn.style.paddingTop = '10px';
			minimize_btn.style.textAlign = 'center';
			minimize_btn.style.fontSize = '20px';
			minimize_btn.style.cursor = 'pointer';
			minimize_btn.classList.add('fa');
			minimize_btn.classList.add('fa-window-minimize');
			minimize_btn.addEventListener('mouseover', () => {
				minimize_btn.style.backgroundColor = 'purple';
			});
			minimize_btn.addEventListener('mouseout', () => {
				minimize_btn.style.backgroundColor = 'transparent';
			});
			minimize_btn.addEventListener('click', () => callback(_window, title));

			buttons.append(minimize_btn);
		};
		let create_maximize_btn = (_window, buttons, callback, title) => {
			let maximize_btn = document.createElement('div');
			maximize_btn.style.height = '40px';
			maximize_btn.style.width = '40px';
			maximize_btn.style.paddingTop = '10px';
			maximize_btn.style.textAlign = 'center';
			maximize_btn.style.fontSize = '20px';
			maximize_btn.style.cursor = 'pointer';
			maximize_btn.classList.add('fa');
			maximize_btn.classList.add('fa-window-maximize');
			maximize_btn.addEventListener('mouseover', () => {
				maximize_btn.style.backgroundColor = 'purple';
			});
			maximize_btn.addEventListener('mouseout', () => {
				maximize_btn.style.backgroundColor = 'transparent';
			});
			maximize_btn.addEventListener('click', () => callback(_window, title));

			buttons.append(maximize_btn);
		};

		let title = window_type.title;

		let top_bar = document.createElement('div');
		top_bar.classList.add('top-bar');

		let buttons = document.createElement('div');
		buttons.classList.add('buttons');

		let logo = document.createElement('div');

		create_logo(_window, logo, window_type.logo, title);
		create_minimize_btn(_window, buttons, minimize_system_window, title);
		create_maximize_btn(_window, buttons, _window =>
			_window.classList.contains('maximized') ? unmaximize_system_window(_window) : maximize_system_window(_window), title);
		create_close_btn(_window, buttons, close_system_window, title);

		top_bar.append(logo);
		top_bar.append(buttons);
		_window.append(top_bar);

		let callback_mousemove = e => {
			let mouse_X = e.pageX;
			let mouse_Y = e.pageY;

			let window_X = _window.offsetLeft;
			let window_Y = _window.offsetTop;

			if(top_bar.hasAttribute('data-mouse_x') && top_bar.hasAttribute('data-mouse_y')) {
				let old_mouse_x = top_bar.getAttribute('data-mouse_x');
				let old_mouse_y = top_bar.getAttribute('data-mouse_y');

				let current_mouse_x = mouse_X;
				let current_mouse_y = mouse_Y;

				let diff_x = current_mouse_x - old_mouse_x;
				let diff_y = current_mouse_y - old_mouse_y;

				_window.style.top = window_Y + diff_y + 'px';
				_window.style.left = window_X + diff_x + 'px';
			}
			top_bar.setAttribute('data-mouse_x', mouse_X);
			top_bar.setAttribute('data-mouse_y', mouse_Y);
		};

		top_bar.addEventListener('mousedown', () => top_bar.addEventListener('mousemove', callback_mousemove));

		top_bar.addEventListener('mouseup', () => {
			top_bar.removeAttribute('data-mouse_X');
			top_bar.removeAttribute('data-mouse_Y');
			top_bar.removeEventListener('mousemove', callback_mousemove);
		});

		insert_app_into_task_bar(_window, window_type.logo, title);
	};
	let create_window_body = (_window, window_type) => {
		let body = document.createElement('div');
		body.setAttribute('href', window_type.url);
		body.classList.add('window-body');
		let type_url_source = '';
		$.ajax({
			url: window_type.url,
			type: 'get',
			async: false
		}).done(data => {
			type_url_source = data;
		});
		body.innerHTML = type_url_source;
		_window.append(body);
	};

	((callback, window_type) => {
		let window_container = document.querySelector('.window-container');
		let _window = document.createElement('div');
		_window.classList.add('window');
		_window.style.position = 'absolute';
		_window.style.resize = 'both';
		_window.style.width = '500px';
		_window.style.height = '500px';
		_window.style.border = '1px solid black';
		center_window(_window);
		create_top_bar(_window, window_type);
		create_window_body(_window, window_type);

		function on_mouse_move(e) {
			let mouse_x = e.layerX;
			let mouse_y = e.layerY;

			let move_cursor_marge = 45;

			if(mouse_x < move_cursor_marge || mouse_x > _window.offsetWidth - move_cursor_marge) {
				_window.style.cursor = 'col-resize';
				if(mouse_x < move_cursor_marge) {
					// left
					_window.addEventListener('mousedown', position => {
						_window.setAttribute('data-old_mouse_x', position.offsetX.toString());
						_window.setAttribute('data-direction', 'left');
					});
					_window.addEventListener('mouseup', () => {
						_window.removeAttribute('data-old_mouse_x');
						_window.removeAttribute('data-direction');
					});
				}
				else if (mouse_x > _window.offsetWidth - move_cursor_marge) {
					// right
					_window.addEventListener('mousedown', position => {
						_window.setAttribute('data-old_mouse_x', position.layerX.toString());
						_window.setAttribute('data-direction', 'right');
					});
					_window.addEventListener('mouseup', () => {
						_window.removeAttribute('data-old_mouse_x');
						_window.removeAttribute('data-direction');
					});
				}
			}
			else if (mouse_y > _window.offsetHeight - move_cursor_marge) {
				_window.style.cursor = 'row-resize';
				if (mouse_y > _window.offsetWidth - move_cursor_marge) {
					// bottom
					_window.addEventListener('mousedown', position => {
						_window.setAttribute('data-old_mouse_y', position.layerY.toString());
						_window.setAttribute('data-direction', 'bottom');
					});
					_window.addEventListener('mouseup', () => {
						_window.removeAttribute('data-old_mouse_y');
						_window.removeAttribute('data-direction');
					});
				}
			}
			else {
				_window.style.cursor = 'default';
				// _window.querySelector('.window-body').removeEventListener('mousemove', on_mouse_move);
			}

			let direction = _window.getAttribute('data-direction');

			let diff;
			let current_height = _window.offsetHeight;
			let current_width = _window.offsetWidth;
			switch (direction) {
				case 'left':
					console.log('left');
					diff = e.offsetX - parseInt(_window.getAttribute('data-old_mouse_x'));
					diff = diff > 0 ? 1 : -1;

					_window.style.width = current_width - diff + 'px';
					_window.style.left = _window.offsetLeft + diff + 'px';
					break;
				case 'right':
					console.log('right');
					diff = e.layerX - parseInt(_window.getAttribute('data-old_mouse_x'));
					diff = diff > 0 ? 1 : -1;

					_window.style.width = current_width + diff + 'px';
					let current_right = _window.style.right.replace('px', '') === '' ? _window.style.left.replace('px', '') : _window.style.right.replace('px', '');
					_window.style.right = parseInt(current_right) - diff + 'px';
					break;
				case 'bottom':
					// console.log('bottom');
					diff = e.layerY - parseInt(_window.getAttribute('data-old_mouse_y'));
					diff = diff > 0 ? 1 : -1;

					_window.style.height = current_height + diff + 'px';
					console.log(current_height + diff + 'px');
					break;
				default:
					break;
			}
		}

		_window.querySelector('.window-body').addEventListener('mouseenter', () => {
			_window.querySelector('.window-body').addEventListener('mousemove', on_mouse_move);
		});

		window_container.append(_window);
		window.addEventListener('resize', () => center_window(_window));
		if(callback !== undefined) {
			callback();
		}
	})(callback, get_window_type(window_type));
}

function close_system_window(_window, title) {
	let i = parseInt(_window.getAttribute('data_i'));
	_window.remove();
	document.querySelector('#app-launcher-' + title.replace(' ', '_').toLowerCase() + (i > 0 ? '_' + i.toString() : '')).remove();
}

function minimize_system_window(_window) {
	_window.classList.add('minimized');
}

function unminimize_system_window(_window) {
	_window.classList.remove('minimized');
}

function maximize_system_window(_window) {
	_window.classList.add('maximized');
}

function unmaximize_system_window(_window) {
	_window.classList.remove('maximized');
}

window.onload = () => {
	init_desktop();
	add_desktop_wallpaper('/images/ubuntu-wallpaper-2.jpg');
	init_start_menu();
	init_task_bar();
};
