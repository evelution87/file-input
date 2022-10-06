(()=>{"use strict";function e(e){return function(e){if(Array.isArray(e))return t(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,i){if(!e)return;if("string"==typeof e)return t(e,i);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return t(e,i)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function t(e,t){(null==t||t>e.length)&&(t=e.length);for(var i=0,n=new Array(t);i<t;i++)n[i]=e[i];return n}function i(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}function n(){var t,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return{route:n.route||"/ajax",multiple:n.multiple||!1,auto:n.auto||!1,layout:n.layout||"list",meta:n.meta||{},name:n.name||null,maxFiles:n.max||!1,allowedTypes:n.types||!1,files:[],isDragging:!1,progress:0,fileTypeGroups:{image:"jpg,jpeg,png,bmp,webp,jfif,gif,svg".split(","),video:"mp4,mov,avi".split(","),document:"pdf,docx,doc,xlsx,xls,pptx,ppt".split(","),archive:"zip,7z,rar".split(",")},bind:{fileInput:(t={},i(t,"x-on:updateProgress.window",(function(){this.updateProgress(this.$event.detail.file,this.$event.detail.progressEvent)})),i(t,"x-on:dragenter.prevent",(function(){this.isDragging=!0})),i(t,"x-on:dragover.prevent",(function(){this.isDragging=!0})),i(t,"x-on:dragleave.prevent",(function(){this.isDragging=!1})),i(t,"x-on:drop.prevent",(function(e){this.isDragging=!1,this.handleDrop(e)})),t)},setParentData:function(){if(void 0!==this.item){var e=[];this.files.forEach((function(t){void 0!==t.uuid&&e.push(t.uuid)})),this.item[this.collection]=this.multiple?e:e[0]}},getInputName:function(){return name=null!==this.name?this.name:"FileInput['"+(this.meta.collection||this.id)+"']",name+=this.multiple?"[]":"",name},init:function(){var e=this;this.files=Object.values(n.files),this.$watch("files",(function(){return e.setParentData()})),this.files.forEach((function(e){e.progress=e.size,e.uploaded=!0,"svg"===e.extension&&(e.preview_url=e.original_url)})),this.multiple||(this.maxFiles=1),!1===this.allowedTypes||(void 0!==this.fileTypeGroups[this.allowedTypes]?this.allowedTypes=this.fileTypeGroups[this.allowedTypes]:this.allowedTypes=this.allowedTypes.split(","))},formatBytes:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2;if(0===e)return"0 Bytes";var i=1024,n=t<0?0:t,r=["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"],s=Math.floor(Math.log(e)/Math.log(i));return parseFloat((e/Math.pow(i,s)).toFixed(n))+" "+r[s]},handleDrop:function(e){var t=(e.dataTransfer||e.target).files;this.handleFiles(t)},handleFiles:function(t){var i=this;t=e(t),this.multiple||(t=t.slice(0,1)),t.forEach((function(e){i.prepareFile(e)}))},prepareFile:function(e){if(!1!==this.allowedTypes&&!this.allowedTypes.includes(this.getExtension(e.name)))return!1;if(!1!==this.maxFiles&&this.files.length>=this.maxFiles){if(this.multiple)return!1;this.deleteFile(0)}e={name:e.name,lastModified:e.lastModified,size:e.size,preview_url:"",progress:0,percent:1e-4,uploaded:!1,file:e},this.files.push(e);var t=this.files.findIndex((function(t){return t.name===e.name&&t.lastModified===e.lastModified}));this.loadPreview(t),this.auto&&this.uploadFile(this.files[t])},getExtension:function(e){return e.split(".").pop()},canPreview:function(e){return this.fileTypeGroups.image.includes(this.getExtension(e))},loadPreview:function(e){var t=this.files[e];if(this.canPreview(t.name)){var i=new FileReader;i.readAsDataURL(t.file),i.onload=function(){return t.preview_url=i.result}}else console.log(t.name,"cannot be previewed")},deleteFile:function(e){var t=this,i=this.files[e];if(i.hidden=!0,void 0===i.uuid)this.files.splice(e,1);else{var n=new FormData;n.append("file_uuid",i.uuid),axios.post(this.route+"/delete-file",n).then((function(){t.files.splice(e,1)})).catch((function(){i.hidden=!1}))}},startUploads:function(){var e=this;this.files.forEach((function(t){return e.uploadFile(t)}))},uploadFile:function(e){var t=this;if(e.progress)return!1;var i=new FormData;i.append("model",this.model),i.append("collection",this.collection),i.append("file",e.file),axios.post(this.route+"/upload-file",i,{onUploadProgress:function(t){return e.progress=Math.min(t.loaded,e.size)}}).then((function(i){e.uploaded=!0,void 0!==i.data.media&&(e.uuid=i.data.media.uuid),t.setParentData()})).catch((function(){}))}}}document.addEventListener("alpine:init",(function(){window.Alpine.data("FileInput",n)}))})();