var fs = require('fs')
	, path = require('path')
	, inherits = require('util').inherits
	, events = require('events')
	;

module.exports = function (path, options) {
	var f = new FileEmitter(options);
	
	f.process(path);
	
	return f
};

module.exports.FileEmitter = FileEmitter;

function FileEmitter(options) {
	var self = this;
	
	events.EventEmitter.call(this);

	self.statCount = 0;
	self.statRequired = 0;
	
	self.options = options || {
		recursive : false
		, followLinks : false
	};
	
	if (self.options.followLinks) {
		self.on('__link', function (stat) {
			self.statRequired += 1;
			
			fs.stat(stat.path, function (err, newStat) {
				newStat.path = stat.path;
				newStat.name = stat.name;
				
				self.emitEvents(newStat);
				
				self.statCount +=1;
			});
		});
	}
	
	if (self.options.recursive) {
		self.on('directory', function (stat) {
			self.statRequired += 1;
			self.process(stat.path, true);
		});
	}
};

inherits(FileEmitter, events.EventEmitter);

FileEmitter.prototype.process = function (basePath, recursing) {
	var self = this;
	
	basePath = path.resolve(basePath);
	
	fs.readdir(basePath, function (err, files) {
		if (err) {
			console.error(err);
			return self.emit('error', err);
		}
		
		if (!files.length) {
			return self.emit('end');
		}
		
		self.statRequired += files.length;
		var statCount = 0;
		
		files.forEach(function (file, ix) {
			var filePath = path.join(basePath, file);
			
			fs.lstat(filePath, function (err, stat) {
				if (err) {
					console.error(err);
					
					self.emit('error', err);
				}
				
				stat.path = filePath;
				stat.name = file;
				
				self.emitEvents(stat);
				
				self.statCount +=1;
				statCount += 1;
				
				if (recursing && statCount === files.length) {
					self.statCount += 1;
				}
				
				if (self.statCount === self.statRequired) {
					self.emit('end');
				}
			});
		});
	});
};

FileEmitter.prototype.emitEvents = function (stat) {
	var self = this;
	
	if (stat.isSymbolicLink()) {
		if (!self.options.followLinks) {
			self.emit('link', stat);
		}
		else {
			self.emit('__link', stat);
		}
	}
	else if (stat.isFile()) {
		self.emit('file', stat);
	}
	else if (stat.isDirectory()) {
		self.emit('directory', stat);
	}
	else if (stat.isBlockDevice()) {
		self.emit('blockDevice', stat);
	}
	else if (stat.isCharacterDevice()) {
		self.emit('characterDevice', stat);
	}
	else if (stat.isFIFO()) {
		self.emit('fifo', stat);
	}
	else if (stat.isSocket()) {
		self.emit('socket', stat);
	}
};
