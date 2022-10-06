export default function ( data = {} ) {
	return {
		
		route: data.route || '/ajax',
		multiple: data.multiple || false,
		auto: data.auto || false,
		layout: data.layout || 'list',
		meta: data.meta || {},
		name: data.name || null,
		maxFiles: data.max || false,
		allowedTypes: data.types || false,
		
		files: [],
		isDragging: false,
		progress: 0,
		//deleteFiles: '',
		fileTypeGroups: {
			image: 'jpg,jpeg,png,bmp,webp,jfif,gif,svg'.split( ',' ),
			video: 'mp4,mov,avi'.split( ',' ),
			document: 'pdf,docx,doc,xlsx,xls,pptx,ppt'.split( ',' ),
			archive: 'zip,7z,rar'.split( ',' )
		},
		
		bind: {
			fileInput: {
				['x-on:updateProgress.window']() {
					this.updateProgress( this.$event.detail.file, this.$event.detail.progressEvent );
				},
				['x-on:dragenter.prevent']() {
					this.isDragging = true;
				},
				['x-on:dragover.prevent']() {
					this.isDragging = true;
				},
				['x-on:dragleave.prevent']() {
					this.isDragging = false;
				},
				['x-on:drop.prevent']( event ) {
					this.isDragging = false;
					this.handleDrop( event );
				}
				// TODO Add event to trigger uploads when parent form is submitted (might need to bind to form in init() to preventDefault)
			}
		},
		
		setParentData() {
			if ( 'undefined' !== typeof this.item ) {
				let uuids = [];
				this.files.forEach( file => {
					if ( 'undefined' !== typeof file.uuid ) {
						uuids.push( file.uuid );
					}
				} );
				this.item[this.collection] = this.multiple ? uuids : uuids[0];
			}
		},
		
		getInputName() {
			name = null !== this.name ? this.name : 'FileInput[\'' + (this.meta.collection || this.id) + '\']';
			name += (this.multiple ? '[]' : '');
			return name;
		},
		
		init() {
			this.files = Object.values( data.files );
			
			this.$watch( 'files', () => this.setParentData() );
			
			this.files.forEach( file => {
				file.progress = file.size;
				file.uploaded = true;
				if ( 'svg' === file.extension ) {
					file.preview_url = file.original_url;
				}
			} );
			if ( !this.multiple ) {
				this.maxFiles = 1;
			}
			if ( false === this.allowedTypes ) {
				// Do nothing
			} else if ( 'undefined' !== typeof this.fileTypeGroups[this.allowedTypes] ) {
				this.allowedTypes = this.fileTypeGroups[this.allowedTypes];
			} else {
				this.allowedTypes = this.allowedTypes.split( ',' );
			}
		},
		
		formatBytes( bytes, decimals = 2 ) {
			if ( bytes === 0 ) return '0 Bytes';
			
			const k = 1024;
			const dm = decimals < 0 ? 0 : decimals;
			const sizes = [ 'Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB' ];
			
			const i = Math.floor( Math.log( bytes ) / Math.log( k ) );
			
			return parseFloat( (bytes / Math.pow( k, i )).toFixed( dm ) ) + ' ' + sizes[i];
		},
		
		handleDrop( event ) {
			let dt = event.dataTransfer || event.target;
			let files = dt.files;
			
			this.handleFiles( files );
		},
		
		handleFiles( files ) {
			files = [ ...files ];
			if ( !this.multiple ) {
				files = files.slice( 0, 1 );
			}
			files.forEach( file => {
				//this.uploadFile( file );
				this.prepareFile( file );
			} );
		},
		
		prepareFile( file ) {
			
			if ( false !== this.allowedTypes && !this.allowedTypes.includes( this.getExtension( file.name ) ) ) {
				// TODO CRAIG Maybe throw an exception
				return false;
			}
			
			if ( false !== this.maxFiles && this.files.length >= this.maxFiles ) {
				if ( this.multiple ) {
					return false;
				} else {
					this.deleteFile( 0 );
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
				file
			};
			this.files.push( file );
			let index = this.files.findIndex( object => {
				return object.name === file.name && object.lastModified === file.lastModified;
			} );
			this.loadPreview( index );
			if ( this.auto ) {
				this.uploadFile( this.files[index] );
			}
		},
		
		getExtension( filename ) {
			return filename.split( '.' ).pop();
		},
		
		canPreview( filename ) {
			return this.fileTypeGroups['image'].includes( this.getExtension( filename ) );
		},
		
		loadPreview( index ) {
			let file = this.files[index];
			if ( this.canPreview( file.name ) ) {
				let reader = new FileReader();
				reader.readAsDataURL( file.file );
				reader.onload = () => file.preview_url = reader.result;
			} else {
				console.log( file.name, 'cannot be previewed' );
			}
		},
		
		deleteFile( index ) {
			
			/*if ( 'undefined' !== typeof this.files[index].uuid ) {
				let deleteList = this.deleteFiles.split( '|' );
				deleteList.push( this.files[index].uuid );
				this.deleteFiles = deleteList.join( '|' ).replace(/^\|*|\|*$/g, '');;
			}*/
			
			let file = this.files[index];
			file.hidden = true;
			
			if ( 'undefined' === typeof file.uuid ) {
				
				this.files.splice( index, 1 );
				
			} else {
				
				let formData = new FormData();
				formData.append( 'file_uuid', file.uuid );
				
				axios.post( this.route + '/delete-file', formData )
					.then( () => {
						this.files.splice( index, 1 );
					} )
					.catch( () => {
						file.hidden = false;
					} );
				
			}
		},
		
		startUploads() {
			this.files.forEach( file => this.uploadFile( file ) );
		},
		
		uploadFile( file ) {
			if ( file.progress ) {
				return false;
			}
			let formData = new FormData();
			formData.append( 'model', this.model );
			formData.append( 'collection', this.collection );
			formData.append( 'file', file.file );
			
			axios.post( this.route + '/upload-file', formData, {
					onUploadProgress: ( progressEvent ) => file.progress = Math.min( progressEvent.loaded, file.size )
				} )
				.then( response => {
					file.uploaded = true;
					if ( 'undefined' !== typeof response.data.media ) {
						file.uuid = response.data.media.uuid;
					}
					this.setParentData();
				} )
				.catch( () => {
				} );
		}
		
	};
}
