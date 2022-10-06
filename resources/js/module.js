import FileInput from './FileInput';

document.addEventListener( 'alpine:init', () => {
	window.Alpine.data( 'FileInput', FileInput );
} );