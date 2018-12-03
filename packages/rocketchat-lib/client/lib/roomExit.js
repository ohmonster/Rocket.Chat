/* globals currentTracker */
import { Blaze } from 'meteor/blaze';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

this.roomExit = function() {
	// 7370 - Close flex-tab when opening a room on mobile UI
	if (window.matchMedia('(max-width: 500px)').matches) {
		const flex = document.querySelector('.flex-tab');
		if (flex) {
			const templateData = Blaze.getData(flex);
			templateData && templateData.tabBar && templateData.tabBar.close();
		}
	}
	RocketChat.callbacks.run('roomExit');
	BlazeLayout.render('main', {
		center: 'none',
	});

	if (typeof currentTracker !== 'undefined') {
		currentTracker.stop();
	}
	const mainNode = document.querySelector('.main-content');
	if (mainNode == null) {
		return;
	}
	return Array.forEach(mainNode.children).forEach((child) => {
		if (child == null) {
			return;
		}
		if (child.classList.contains('room-container')) {
			const wrapper = child.querySelector('.messages-box > .wrapper');
			if (wrapper) {
				if (wrapper.scrollTop >= wrapper.scrollHeight - wrapper.clientHeight) {
					child.oldScrollTop = 10e10;
				} else {
					child.oldScrollTop = wrapper.scrollTop;
				}
			}
		}
		mainNode.removeChild(child);
	});
};
