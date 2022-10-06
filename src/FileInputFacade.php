<?php

namespace Evelution\FileInput;

use Illuminate\Support\Facades\Facade;

/**
 * @see \Evelution\FileInput\Skeleton\SkeletonClass
 */
class FileInputFacade extends Facade
{
    /**
     * Get the registered name of the component.
     *
     * @return string
     */
    protected static function getFacadeAccessor()
    {
        return 'file-input';
    }
}
