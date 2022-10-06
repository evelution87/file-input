/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./resources/js/FileInput.js":
/*!***********************************!*\
  !*** ./resources/js/FileInput.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  var _fileInput;

  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return {
    route: data.route || '/ajax',
    multiple: data.multiple || false,
    auto: data.auto || false,
    layout: data.layout || 'list',
    model: data.model || false,
    collection: data.collection || false,
    maxFiles: data.max || false,
    allowedTypes: data.types || false,
    files: [],
    isDragging: false,
    progress: 0,
    //deleteFiles: '',
    fileTypeGroups: {
      image: 'jpg,jpeg,png,bmp,webp,jfif,gif,svg'.split(','),
      video: 'mp4,mov,avi'.split(','),
      document: 'pdf,docx,doc,xlsx,xls,pptx,ppt'.split(','),
      archive: 'zip,7z,rar'.split(',')
    },
    bind: {
      fileInput: (_fileInput = {}, _defineProperty(_fileInput, 'x-on:updateProgress.window', function xOnUpdateProgressWindow() {
        this.updateProgress(this.$event.detail.file, this.$event.detail.progressEvent);
      }), _defineProperty(_fileInput, 'x-on:dragenter.prevent', function xOnDragenterPrevent(event) {
        this.isDragging = true;
      }), _defineProperty(_fileInput, 'x-on:dragover.prevent', function xOnDragoverPrevent(event) {
        this.isDragging = true;
      }), _defineProperty(_fileInput, 'x-on:dragleave.prevent', function xOnDragleavePrevent(event) {
        this.isDragging = false;
      }), _defineProperty(_fileInput, 'x-on:drop.prevent', function xOnDropPrevent(event) {
        this.isDragging = false;
        this.handleDrop(event);
      }), _fileInput)
    },
    setParentData: function setParentData() {
      if ('undefined' !== typeof this.item) {
        var uuids = [];
        this.files.forEach(function (file) {
          if ('undefined' !== typeof file.uuid) {
            uuids.push(file.uuid);
          }
        });
        this.item[this.collection] = this.multiple ? uuids : uuids[0];
      }
    },
    init: function init() {
      var _this = this;

      this.files = Object.values(data.files);
      this.$watch('files', function () {
        return _this.setParentData();
      });
      this.files.forEach(function (file) {
        file.progress = file.size;
        file.uploaded = true;

        if ('svg' === file.extension) {
          file.preview_url = file.original_url;
        }
      });

      if (!this.multiple) {
        this.maxFiles = 1;
      }

      if (false === this.allowedTypes) {// Do nothing
      } else if ('undefined' !== typeof this.fileTypeGroups[this.allowedTypes]) {
        this.allowedTypes = this.fileTypeGroups[this.allowedTypes];
      } else {
        this.allowedTypes = this.allowedTypes.split(',');
      }
    },
    formatBytes: function formatBytes(bytes) {
      var decimals = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
      if (bytes === 0) return '0 Bytes';
      var k = 1024;
      var dm = decimals < 0 ? 0 : decimals;
      var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
      var i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    },
    handleDrop: function handleDrop(event) {
      var dt = event.dataTransfer || event.target;
      var files = dt.files;
      this.handleFiles(files);
    },
    handleFiles: function handleFiles(files) {
      var _this2 = this;

      files = _toConsumableArray(files);

      if (!this.multiple) {
        files = files.slice(0, 1);
      }

      files.forEach(function (file) {
        //this.uploadFile( file );
        _this2.prepareFile(file);
      });
    },
    prepareFile: function prepareFile(file) {
      if (false !== this.allowedTypes && !this.allowedTypes.includes(this.getExtension(file.name))) {
        // TODO CRAIG Maybe throw an exception
        return false;
      }

      if (false !== this.maxFiles && this.files.length >= this.maxFiles) {
        if (this.multiple) {
          return false;
        } else {
          this.deleteFile(0);
        }
      }

      file = {
        name: file.name,
        lastModified: file.lastModified,
        size: file.size,
        preview_url: '',
        progress: 0,
        percent: 0.0001,
        uploaded: false,
        file: file
      };
      this.files.push(file);
      var index = this.files.findIndex(function (object) {
        return object.name === file.name && object.lastModified === file.lastModified;
      });
      this.loadPreview(index);

      if (this.auto) {
        this.uploadFile(this.files[index]);
      }
    },
    getExtension: function getExtension(filename) {
      return filename.split('.').pop();
    },
    canPreview: function canPreview(filename) {
      return this.fileTypeGroups['image'].includes(this.getExtension(filename));
    },
    loadPreview: function loadPreview(index) {
      var file = this.files[index];

      if (this.canPreview(file.name)) {
        var reader = new FileReader();
        reader.readAsDataURL(file.file);

        reader.onload = function () {
          return file.preview_url = reader.result;
        };
      } else {
        console.log(file.name, 'cannot be previewed');
      }
    },
    deleteFile: function deleteFile(index) {
      var _this3 = this;

      /*if ( 'undefined' !== typeof this.files[index].uuid ) {
          let deleteList = this.deleteFiles.split( '|' );
          deleteList.push( this.files[index].uuid );
          this.deleteFiles = deleteList.join( '|' ).replace(/^\|*|\|*$/g, '');;
      }*/
      var file = this.files[index];
      file.hidden = true;

      if ('undefined' === typeof file.uuid) {
        this.files.splice(index, 1);
      } else {
        var formData = new FormData();
        formData.append('file_uuid', file.uuid);
        axios.post(this.route + '/delete-file', formData).then(function () {
          _this3.files.splice(index, 1);
        })["catch"](function () {
          file.hidden = false;
        });
      }
    },
    startUploads: function startUploads() {
      var _this4 = this;

      this.files.forEach(function (file) {
        return _this4.uploadFile(file);
      });
    },
    uploadFile: function uploadFile(file) {
      var _this5 = this;

      if (file.progress) {
        return false;
      }

      var formData = new FormData();
      formData.append('model', this.model);
      formData.append('collection', this.collection);
      formData.append('file', file.file);
      axios.post(this.route + '/upload-file', formData, {
        onUploadProgress: function onUploadProgress(progressEvent) {
          return file.progress = Math.min(progressEvent.loaded, file.size);
        }
      }).then(function (response) {
        file.uploaded = true;

        if ('undefined' !== typeof response.data.media) {
          file.uuid = response.data.media.uuid;
        }

        _this5.setParentData();
      })["catch"](function () {});
    }
  };
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************************!*\
  !*** ./resources/js/module.js ***!
  \********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _FileInput__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FileInput */ "./resources/js/FileInput.js");

document.addEventListener('alpine:init', function () {
  window.Alpine.data('FileInput', _FileInput__WEBPACK_IMPORTED_MODULE_0__["default"]);
});
})();

/******/ })()
;