<?php

namespace Evelution87\FileInput;

use Illuminate\Support\ServiceProvider;

class FileInputServiceProvider extends ServiceProvider
{
	/**
	 * Bootstrap the application services.
	 */
	public function boot()
	{
		$this->loadViewsFrom( __DIR__ . '/../resources/views', 'file-input' );
		
		if ( $this->app->runningInConsole() ) {
			
			// Publishing assets.
			$this->publishes( [
				__DIR__ . '/../resources/assets' => public_path( 'vendor/file-input' ),
			], 'assets' );
			
			// Publishing resources.
			$this->publishes( [
				__DIR__ . '/../resources/js/FileInput.js' => resource_path( 'js/vendor/file-input/FileInput.js' ),
			], 'resources' );
			
		}
	}
	
	/**
	 * Register the application services.
	 */
	public function register()
	{
		// Register the main class to use with the facade
		$this->app->singleton( 'file-input', function() {
			return new FileInput;
		} );
	}
}
