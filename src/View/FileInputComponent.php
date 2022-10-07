<?php

namespace Evelution\FileInput\View;

use Illuminate\View\Component;

class FileInputComponent extends Component
{
	
	public $inputData;
	public $data_id;
	
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
	
	public function inputData()
	{
		return json_encode( $this->inputData );
	}
	
	public function __construct( $route = '',
	                             $layout = 'list',
	                             $auto = false,
	                             $multiple = false,
	                             $max = false,
	                             $types = false,
	                             $name = false,
	                             $files = [],
	                             $meta = [] )
	{
		$id = $this->data_id = uniqid( 'data_' );
		//$app_url            = config( 'app.url', '' );
		
		$this->inputData = compact( 'id', 'name', 'route', 'layout', 'auto', 'multiple', 'max', 'types', 'files', 'meta' );
	}
	
	public function render()
	{
		return view( 'file-input::file-input' );
	}
	
}
