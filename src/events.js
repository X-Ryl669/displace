import {
	generateMoveFn
} from 'utils';

const move = generateMoveFn();

// mouse events
export function mousedown(e){
	const opts = this.opts;
	if (opts.highlightInputs){
		// allow for selection of text in inputs/textareas
		const target = e.target.tagName.toLowerCase();
		if (target === 'input' || target === 'textarea'){
			return;
		}
	}

	const el = this.el;
	const events = this.events;


	if (typeof opts.onMouseDown === 'function'){
		opts.onMouseDown(el, e);
	}

	let wOff = e.clientX - el.offsetLeft;
	let hOff = e.clientY - el.offsetTop;
    this.data.down = { x:el.offsetLeft, y:el.offsetTop, dx: wOff, dy: hOff };

	events.mousemove = mousemove.bind(this, wOff, hOff);

	document.addEventListener('mousemove', events.mousemove, false);
	document.addEventListener('mouseup', events.mouseup, false);
};

export function mousemove(offsetW, offsetH, e){
	const el = this.el;
	const opts = this.opts;
	const data = this.data;

	if (typeof opts.onMouseMove === 'function'){
		opts.onMouseMove(el, e);
	}

	let x = e.clientX - offsetW;
	let y = e.clientY - offsetH;
    // clamp values if out of range
    let p = opts.constrainFunc.call(this, el, x, y);	
	move(el, p.x, p.y);

	// prevent highlighting text when dragging
	e.preventDefault();
	return false;
};

export function mouseup(e){
	const el = this.el;
	const opts = this.opts;
	const events = this.events;

	if (typeof opts.onMouseUp === 'function'){
		opts.onMouseUp(el, e);
	}

	document.removeEventListener('mouseup', events.mouseup, false);
	document.removeEventListener('mousemove', events.mousemove, false);
};


// touch events
export function touchstart(e){
	const opts = this.opts;
	if (opts.highlightInputs){
		// allow for selection of text in inputs/textareas
		const target = e.target.tagName.toLowerCase();
		if (target === 'input' || target === 'textarea'){
			return;
		}
	}
	
	const el = this.el;
	const events = this.events;

	if (typeof opts.onTouchStart === 'function'){
		opts.onTouchStart(el, e);
	}

	const touch = e.targetTouches[0];
	let wOff = touch.clientX - el.offsetLeft;
	let hOff = touch.clientY - el.offsetTop;
    this.data.down = { x:el.offsetLeft, y:el.offsetTop, dx: wOff, dy: hOff };

	events.touchmove = touchmove.bind(this, wOff, hOff);

	document.addEventListener('touchmove', events.touchmove, false);
	document.addEventListener('touchend', events.touchstop, false);
	document.addEventListener('touchcancel', events.touchstop, false);
};

export function touchmove(offsetW, offsetH, e){
	const el = this.el;
	const opts = this.opts;
	const data = this.data;

	if (typeof opts.onTouchMove === 'function'){
		opts.onTouchMove(el, e);
	}

	const touch = e.targetTouches[0];
	let x = touch.clientX - offsetW;
	let y = touch.clientY - offsetH;
    // clamp values if out of range
    let p = opts.constrainFunc.call(this, el, x, y);	
	move(el, p.x, p.y);

	// prevent highlighting text when dragging
	e.preventDefault();
	return false;
};

export function touchstop(e){
	const el = this.el;
	const opts = this.opts;
	const events = this.events;

	if (typeof opts.onTouchStop === 'function'){
		opts.onTouchStop(el, e);
	}

	document.removeEventListener('touchmove', events.touchmove, false);
	document.removeEventListener('touchend', events.touchstop, false);
	document.removeEventListener('touchcancel', events.touchstop, false);
};