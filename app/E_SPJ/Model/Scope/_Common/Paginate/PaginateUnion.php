<?php

trait PaginateUnion
{
    # only used to union table
    /**
     * $value (array) / ['no' => 1]
     * $perPage (int)
     *
     * return paginator($included_library->get(), 50);
     */
    function PaginateUnion($value, $perPage)
    {
        //Define how many items we want to be visible in each page
        // $perPage = 5;

        //Create a new Laravel collection from the array data
        $collection = new Illuminate\Database\Eloquent\Collection($value);

        //Slice the collection to get the items to display in current page
        $currentPageSearchResults = $collection
            ->slice($currentPage * $perPage, $perPage)
            ->all();

        //Create our paginator and pass it to the view
        $paginatedSearchResults = new Illuminate\Pagination\LengthAwarePaginator($currentPageSearchResults, count($collection), $perPage);

        return $paginatedSearchResults;
    }    
}
