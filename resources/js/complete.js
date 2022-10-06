require('./bootstrap');

import Alpine from 'alpinejs';

import FileInput from './FileInput';
Alpine.data('FileInput', FileInput);

window.Alpine = Alpine;

Alpine.start();
