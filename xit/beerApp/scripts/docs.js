//js xit/scripts/doc.js

load('steal/rhino/rhino.js');
steal("documentjs", function(DocumentJS){
	DocumentJS('xit/index.html', {
		out: 'xit/docs',
		markdown : ['xit', 'steal', 'jquery', 'can', 'funcunit'],
		parent : 'xit'
	});
});