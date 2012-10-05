var fileEmitter = require('./')
	, path = require('path')
	;


exports['test non-recursive'] = function (test) {
	var f = fileEmitter('./test')
		, base = path.resolve('./')
		, files = []
		;
	
	f.on('link', function (file) {
		files.push(file.path.replace(base,''));
	});
	
	f.on('file', function (file) {
		files.push(file.path.replace(base,''));
	});

	f.on('directory', function (file) {
		files.push(file.path.replace(base,''));
	});
	
	f.on('end', function () {
		files.sort();
		
		test.deepEqual(files, [
			'/test/hello.txt',
			'/test/test.lnk',
			'/test/test2'
		]);
		
		test.done();
	});
};

exports['test recursive do not follow symbolic links'] = function (test) {
	var f = fileEmitter('./test', { recursive : true })
		, base = path.resolve('./')
		, files = []
		;
	
	f.on('link', function (file) {
		files.push(file.path.replace(base,''));
	});
	
	f.on('file', function (file) {
		files.push(file.path.replace(base,''));
	});

	f.on('directory', function (file) {
		files.push(file.path.replace(base,''));
	});
	
	f.on('end', function () {
		files.sort();
		
		test.deepEqual(files, [
			'/test/hello.txt',
			'/test/test.lnk',
			'/test/test2',
			'/test/test2/test3',
			'/test/test2/test3/good-bye.txt',
			'/test/test2/world.txt' 
		]);
		
		test.done();
	});
};

exports['test recursive following symbolic links'] = function (test) {
	var f = fileEmitter('./test', { recursive : true, followLinks : true })
		, base = path.resolve('./')
		, files = []
		;
	
	f.on('link', function (file) {
		files.push(file.path.replace(base,''));
	});
	
	f.on('file', function (file) {
		files.push(file.path.replace(base,''));
	});

	f.on('directory', function (file) {
		files.push(file.path.replace(base,''));
	});
	
	f.on('end', function () {
		files.sort();
		
		test.deepEqual(files, [
			'/test/hello.txt',
			'/test/test.lnk',
			'/test/test.lnk/good-bye.txt',
			'/test/test2',
			'/test/test2/test3',
			'/test/test2/test3/good-bye.txt',
			'/test/test2/world.txt' 
		]);
		
		test.done();
	});
};