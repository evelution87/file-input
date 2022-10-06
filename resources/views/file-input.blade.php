@props(['id'=>'','auto'=>false,'multiple'=>false,'layout'=>'list','model'=>'','collection'=>'images','max'=>false,'files'=>[],'types'=>false,'name'=>false])

<script>
    @php($data_id = uniqid('data_'))
    let {{ $data_id }} = {
        auto: {{ $auto ? 'true' : 'false' }},
        multiple: {{ $multiple ? 'true' : 'false' }},
        layout: '{{ $layout ?? 'list' }}',
        max: {{ false === $max ? 'false' : $max }},
        route: '{{ route('ajax.base') }}',
        model: '{!! addslashes($model) !!}',
        collection: '{{ $collection ?? 'images' }}',
        files: {!! json_encode($files) !!},
        types: {!! false === $types ? 'false' : '\''.$types.'\'' !!}
    };
</script>

<div x-data="FileInput({{ $data_id }})" x-bind="bind.fileInput" :class="isDragging ? 'border-emerald-600 bg-emerald-50 border-dashed' : 'border-gray-300 bg-neutral-50'"
    {{ $attributes->merge(['class'=>'border shadow-sm p-2']) }}>
    <div class="flex items-center justify-center grid grid-cols-1 gap-2" x-show="files.length">
        <template x-for="(file,i) in files">
            <div class="flex gap-2 items-center" x-show="'undefined' === typeof file.hidden || !file.hidden">
                <div class="flex-shrink-0 w-24 h-24 relative">
                    <img x-show="canPreview(file.file_name)" :src="file.preview_url" class="w-full h-full object-cover"/>
                    <div x-show="!canPreview(file.file_name)" x-text="getExtension(file.file_name)" class="flex items-center justify-center border-2 uppercase font-bold text-2xl h-full"></div>
                    <progress :max="file.size" value="0.0001" :value="Math.min(file.progress,file.size)" class="max-w-full h-2 absolute inset-0 top-auto"
                              x-show="!file.uploaded"></progress>
                </div>
                <div class="flex-grow text-sm self-start">
                    <div x-text="'Name: '+(file.file_name || file.name)"></div>
                    {{--<div x-text="'Uploaded: '+formatBytes(file.progress)"></div>--}}
                    <div x-text="'Size: '+formatBytes(file.size)"></div>
                </div>
                <div class="p-2 flex-shrink-0 self-start flex gap-1">
                    <template x-if="file.original_url">
                        <a :href="file.original_url" target="_blank" download class="hover:text-lime-600 cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                      d="M12 9.75v6.75m0 0l-3-3m3 3l3-3m-8.25 6a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"/>
                            </svg>
                        </a>
                    </template>
                    <template x-if="file.original_url">
                        <a :href="file.original_url" target="_blank" class="hover:text-lime-600 cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                      d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"/>
                            </svg>
                        </a>
                    </template>
                    <a x-on:click="deleteFile(i)" title="Delete Image" class="hover:text-red-500 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                        </svg>
                    </a>
                </div>
            </div>
        </template>
    </div>

    <div x-show="!maxFiles || files.length < maxFiles" class="p-4">
        Drop <span x-text="multiple ? 'files' : 'a file'"></span> or
        <label class="underline cursor-pointer"><input id="{{ $id }}" type="file" x-on:change="handleDrop" class="hidden" :multiple="multiple"/>click here</label> to browse.
    </div>

    <template x-if="!auto">
        <button type="button" x-show="files.length" x-on:click="startUploads">Upload</button>
    </template>

    <template x-for="(file,i) in files">
        <input type="checkbox" class="hidden" x-bind:name="'{{ $name ?? 'uploadedFiles[\'+collection+\']' }}'+(multiple ? '[]':'')" x-bind:value="file.uuid || ''" checked/>
    </template>

    {{--<input type="hidden" class="w-full" name="deleteFiles[]" value="" x-model="deleteFiles"/>--}}

</div>
