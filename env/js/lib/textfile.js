define(function () {

  function TextFile(options) {
    this.filename = options.filename;
    if (options.filesize == undefined) {
      this.filesize = 5;
    } else {
      this.filesize = options.filesize;
    }
  }

  TextFile.prototype.run = function (callback) {
    var filename = this.filename;
    var filesize = this.filesize;
    var errorHandler = this.errorHandler;
    window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
    window.webkitStorageInfo.requestQuota(PERSISTENT, filesize * 1024 * 1024, function (grantedBytes) {
      window.requestFileSystem(PERSISTENT, grantedBytes, function (fs) {
        fs.root.getFile(filename, {
          create: true
        }, function (fileEntry) {
          callback(fileEntry);
        }, errorHandler);
      }, errorHandler);
    }, function (e) {
      console.log('Error', e);
    });
  }

  TextFile.prototype.read = function (callback) {
    var errorHandler = this.errorHandler;
    this.run(

    function (fileEntry) {
      fileEntry.file(function (file) {
        var reader = new FileReader();
        reader.onloadend = callback;
        reader.readAsText(file);
      }, errorHandler);
    });
  }

  TextFile.prototype.write = function (content, callback) {
    this.run(

    function (fileEntry) {
      fileEntry.createWriter(function (fileWriter) {
        fileWriter.onwriteend = function (e) {
          callback();
        };
        fileWriter.onerror = function (e) {
          console.log('Failed to write: ' + e.toString());
        };
        fileWriter.seek(fileWriter.length);
        try {
          var blob = new Blob([content], {
            type: 'text/plain'
          });
          fileWriter.write(blob);
        } catch (error) {
          var bb = new(window.BlobBuilder || window.WebKitBlobBuilder)();
          bb.append(content);
          fileWriter.write(bb.getBlob());
        }
      }, this.errorHandler);
    });
  }

  TextFile.prototype.delete = function (callback) {
    this.run(

    function (fileEntry) {
      fileEntry.remove(function () {
        callback();
      }, this.errorHandler);
    });
  }

  TextFile.prototype.errorHandler = function (e) {
    var msg = '';
    switch (e.code) {
      case FileError.QUOTA_EXCEEDED_ERR:
        msg = 'QUOTA_EXCEEDED_ERR';
        break;
      case FileError.NOT_FOUND_ERR:
        msg = 'NOT_FOUND_ERR';
        break;
      case FileError.SECURITY_ERR:
        msg = 'SECURITY_ERR';
        break;
      case FileError.INVALID_MODIFICATION_ERR:
        msg = 'INVALID_MODIFICATION_ERR';
        break;
      case FileError.INVALID_STATE_ERR:
        msg = 'INVALID_STATE_ERR';
        break;
      default:
        msg = 'Unknown Error';
        break;
    };
    console.log('Error: ' + msg);
  }

  return TextFile;

});