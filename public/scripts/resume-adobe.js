const CLIENT_ID = '2790fcbdde474a0fafe7e2e3dda1573e';
const PDF_URL = '/assets/Resume.pdf';

let sdkReady = false;

function ensureAdobeScript() {
	if (document.querySelector('script[data-adobe-view-sdk="true"]')) return Promise.resolve();

	return new Promise((resolve, reject) => {
		const s = document.createElement('script');
		s.src = 'https://acrobatservices.adobe.com/view-sdk/viewer.js';
		s.async = true;
		s.dataset.adobeViewSdk = 'true';
		s.onload = () => resolve();
		s.onerror = () => reject(new Error('Failed to load adobe SDK D:'));
		document.head.appendChild(s);
	});
}

async function openResume() {
	await ensureAdobeScript();
	for (let i = 0; i < 100; i++) {
		if (window.AdobeDC?.View) break;
		await new Promise((r) => setTimeout(r, 50));
	}

	const AdobeDC = window.AdobeDC;
	if (!AdobeDC?.View) {
		console.error('AdobeDC.View not available.');
		return;
	}

	const view = new AdobeDC.View({ clientId: CLIENT_ID });

	view.previewFile(
		{
			content: { location: { url: PDF_URL } },
			metaData: { fileName: 'Resume.pdf' }
		},
		{ embedMode: 'LIGHT_BOX', defaultViewMode: 'FIT_PAGE' }
	);
}

function setup() {
	const btn = document.getElementById('resumeBtn');
	if (!btn) return;

	btn.addEventListener('click', () => {
		openResume();
	});
}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', setup);
} else {
	setup();
}
