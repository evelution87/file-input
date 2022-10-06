<?php

namespace Evelution\FileInput\View;

use Illuminate\View\Component;

class FileInputComponent extends Component
{
	
	public $data;
	
	/**
	 * let {{ $data_id = uniqid('data_') }} = {
	 * id: '{{ $data_id }}',
	 * layout: '{{ $layout ?? 'list' }}',
	 * auto: {{ $auto ? 'true' : 'false' }},
	 * multiple: {{ $multiple ? 'true' : 'false' }},
	 * max: {{ false === $max ? 'false' : $max }},
	 * types: {!! false === $types ? 'false' : '\''.$types.'\'' !!},
	 * route: {!! false === $route ? 'null' : '\''.$route.'\'' !!},
	 * name: {!! false === $name ? 'null' : '\''.$name.'\'' !!},
	 * files: {!! json_encode($files) !!},
	 * meta: {!! json_encode($meta) !!}
	 * };
	 */
	
	public function data()
	{
		return json_encode( $this->data );
	}
	
	public function __construct( $route,
	                             $layout = 'list',
	                             $auto = false,
	                             $multiple = false,
	                             $max = false,
	                             $types = false,
	                             $name = false,
	                             $files = [],
	                             $meta = [] )
	{
		$data_id = uniqid( 'data_' );
		//$app_url            = config( 'app.url', '' );
		
		$this->data = compact( 'data_id', 'name', 'route', 'layout', 'auto', 'multiple', 'max', 'types', 'files', 'meta' );
	}
	
	public function render()
	{
		return view( 'file-input::table' );
	}
	
}
