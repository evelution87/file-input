<?php

namespace Evelution\FileInput\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class Publish extends Command
{
	/**
	 * The name and signature of the console command.
	 *
	 * @var string
	 */
	protected $signature = 'file-input:publish';
	
	/**
	 * The console command description.
	 *
	 * @var string
	 */
	protected $description = 'Publishes FileInput assets';
	
	/**
	 * Create a new command instance.
	 *
	 * @return void
	 */
	public function __construct()
	{
		parent::__construct();
	}
	
	/**
	 * Execute the console command.
	 *
	 * @return int
	 */
	public function handle()
	{
		
		$this->info( 'Publishing FileInput Assets' );
		
		$this->call( 'vendor:publish', [
			'--provider' => 'Evelution\FileInput\FileInputServiceProvider',
			'--force'    => true,
		] );
		
		return 0;
	}
}
