var Event = {
	mapping : function(__event) {
		var keycode = __event.which || __event.keyCode || __event.charCode || __event;
		var code = "";
		var args = {};
		if ((keycode < 58 && keycode > 47) || (keycode < 269 && keycode > 258)) {
			args = {
				type : 0,
				value : (keycode - 48)
			};
			code = "KEY_NUMERIC";
		} else {
			var args = {
				modifiers : 0,
				type : 0,
				value : keycode
			};
			switch (keycode) {
			case 269:// up
			case 38:
			case 1:
				code = "KEY_UP";
				break;
			case 270:// down
			case 40:
			case 2:
				code = "KEY_DOWN";
				break;
			case 271:// left
			case 37:
			case 3:
				code = "KEY_LEFT";
				break;
			case 272:// right
			case 39:
			case 4:
				code = "KEY_RIGHT";
				break;
			case 273:// enter
			case 13:
				code = "KEY_SELECT";
				break;
			case 282:// exit
			case 339:
				code = "KEY_EXIT";
				break;
			case 283:// back
			case 8:
			case -32:
			case -11:
			case -7:
			case -14:
			case -31:
			case 32:
			case 0x0008:
			case 340:
				code = "KEY_BACK";
				break;
			case 301:
				code = "KEY_PAGE_UP";
				break;
			case 302:
				code = "KEY_PAGE_DOWN";
				break;
			case 280:
				code = "KEY_BACKSPACE";
				break;
			case 597:
				code = "KEY_MUTE";
				break;
			case 768:
				code = "MEDIA_EVENT";
				break;
			case 67:
				code = "MUTE";
				break;
			}

		}
		return {
			code : code,
			args : args
		};
	}
};
