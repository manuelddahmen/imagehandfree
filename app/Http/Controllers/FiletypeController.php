<?php
/**
 * Created by PhpStorm.
 * User: manuel
 * Date: 27-03-17
 * Time: 10:23
 */
namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth


;
class FiletypeController extends Controller
{
    private $list;
    function __construct()
    {
    	if(Auth::user()!=NULL) {
		    $this->list = getDocuments( Auth::user()->email );
	    }
	    else
	    {
	    	echo("FyletypeController construct()");
	    }
    }
    function owner($owner)
    {
        foreach ($this->list as $row)
        {
            if($row["owner"]!=$owner || $owner=="")
            {
                unset($row, $this->list);

            }
        }

    }
    function folder($id)
    {
        foreach ($this->list as $row)
        {
            if($row["folder_id"]!=$id || $id!=NULL)
            {
                unset($row, $this->list);

            }
        }

    }
    function shared($owner)
    {
        foreach ($this->list as $row)
        {
            if($row["owner"]==$owner)
            {
                unset($row, $this->list);

            }
        }

    }
    function image()
    {
        foreach ($this->list as $row)
        {
            $id = $row["id"];
            if(!isImage("", getDBDocument($id)["mime"]))
            {
                unset($row, $this->list);

            }
        }

    }
    function video()
    {
        foreach ($this->list as $row)
        {
            $id = $row["id"];
            if(!isVideo("", getDBDocument($id)["mime"]))
            {
                unset($row, $this->list);

            }
        }
    }
    function text()
    {
        foreach ($this->list as $row)
        {
            $id = $row["id"];
            if(!isTexte("", getDBDocument($id)["mime"]))
            {
                unset($row, $this->list);

            }
        }

    }
    function doc()
    {
        foreach ($this->list as $row)
        {
            $id = $row["id"];
            if(!isDocument("", getDBDocument($id)["mime"]))
            {
                unset($row, $this->list);

            }
        }

    }
    function zip()
    {
        foreach ($this->list as $row)
        {
            $id = $row["id"];
            if(!isArchive("", getDBDocument($id)["mime"]))
            {
                unset($row, $this->list);

            }
        }

    }
    function other()
    {

    }
    function filter($array, $rowName, $rowData)
    {
        foreach ($array as $row)
        {
            if($row[$rowName]!=$rowData)
            {
                unset($row, $array);
            }
        }
    }
}
