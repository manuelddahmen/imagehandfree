<?php

namespace PhpOffice\PhpSpreadsheet;

use PhpOffice\PhpSpreadsheet\Calculation\Category;
use PhpOffice\PhpSpreadsheet\Calculation\Database;
use PhpOffice\PhpSpreadsheet\Calculation\DateTime;
use PhpOffice\PhpSpreadsheet\Calculation\Engineering;
use PhpOffice\PhpSpreadsheet\Calculation\Financial;
use PhpOffice\PhpSpreadsheet\Calculation\Functions;
use PhpOffice\PhpSpreadsheet\Calculation\Logical;
use PhpOffice\PhpSpreadsheet\Calculation\LookupRef;
use PhpOffice\PhpSpreadsheet\Calculation\MathTrig;
use PhpOffice\PhpSpreadsheet\Calculation\Statistical;
use PhpOffice\PhpSpreadsheet\Calculation\TextData;

if (!defined('CALCULATION_REGEXP_CELLREF')) {
    //    Test for support of \P (multibyte options) in PCRE
    if (defined('PREG_BAD_UTF8_ERROR')) {
        //    Cell reference (cell or range of cells, with or without a sheet reference)
        define('CALCULATION_REGEXP_CELLREF', '((([^\s,!&%^\/\*\+<>=-]*)|(\'[^\']*\')|(\"[^\"]*\"))!)?\$?([a-z]{1,3})\$?(\d{1,7})');
        //    Named Range of cells
        define('CALCULATION_REGEXP_NAMEDRANGE', '((([^\s,!&%^\/\*\+<>=-]*)|(\'[^\']*\')|(\"[^\"]*\"))!)?([_A-Z][_A-Z0-9\.]*)');
    } else {
        //    Cell reference (cell or range of cells, with or without a sheet reference)
        define('CALCULATION_REGEXP_CELLREF', '(((\w*)|(\'[^\']*\')|(\"[^\"]*\"))!)?\$?([a-z]{1,3})\$?(\d+)');
        //    Named Range of cells
        define('CALCULATION_REGEXP_NAMEDRANGE', '(((\w*)|(\'.*\')|(\".*\"))!)?([_A-Z][_A-Z0-9\.]*)');
    }
}

/**
 * Copyright (c) 2006 - 2016 PhpSpreadsheet.
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA
 *
 * @category   PhpSpreadsheet
 *
 * @copyright  Copyright (c) 2006 - 2016 PhpSpreadsheet (https://github.com/PHPOffice/PhpSpreadsheet)
 * @license    http://www.gnu.org/licenses/old-licenses/lgpl-2.1.txt    LGPL
 */
class Calculation
{
    /** Constants                */
    /** Regular Expressions        */
    //    Numeric operand
    const CALCULATION_REGEXP_NUMBER = '[-+]?\d*\.?\d+(e[-+]?\d+)?';
    //    String operand
    const CALCULATION_REGEXP_STRING = '"(?:[^"]|"")*"';
    //    Opening bracket
    const CALCULATION_REGEXP_OPENBRACE = '\(';
    //    Function (allow for the old @ symbol that could be used to prefix a function, but we'll ignore it)
    const CALCULATION_REGEXP_FUNCTION = '@?([A-Z][A-Z0-9\.]*)[\s]*\(';
    //    Cell reference (cell or range of cells, with or without a sheet reference)
    const CALCULATION_REGEXP_CELLREF = CALCULATION_REGEXP_CELLREF;
    //    Named Range of cells
    const CALCULATION_REGEXP_NAMEDRANGE = CALCULATION_REGEXP_NAMEDRANGE;
    //    Error
    const CALCULATION_REGEXP_ERROR = '\#[A-Z][A-Z0_\/]*[!\?]?';

    /** constants */
    const RETURN_ARRAY_AS_ERROR = 'error';
    const RETURN_ARRAY_AS_VALUE = 'value';
    const RETURN_ARRAY_AS_ARRAY = 'array';
    /**
     * Locale-specific translations for Excel constants (True, False and Null).
     *
     * @var string[]
     */
    public static $localeBoolean = [
        'TRUE' => 'TRUE',
        'FALSE' => 'FALSE',
        'NULL' => 'NULL',
    ];
    private static $returnArrayAsType = self::RETURN_ARRAY_AS_VALUE;
    /**
     * Instance of this class.
     *
     * @var \PhpOffice\PhpSpreadsheet\Calculation
     */
    private static $instance;
    /**
     * List of operators that can be used within formulae
     * The true/false value indicates whether it is a binary operator or a unary operator.
     *
     * @var array
     */
    private static $operators = [
        '+' => true, '-' => true, '*' => true, '/' => true,
        '^' => true, '&' => true, '%' => false, '~' => false,
        '>' => true, '<' => true, '=' => true, '>=' => true,
        '<=' => true, '<>' => true, '|' => true, ':' => true,
    ];
    /**
     * List of binary operators (those that expect two operands).
     *
     * @var array
     */
    private static $binaryOperators = [
        '+' => true, '-' => true, '*' => true, '/' => true,
        '^' => true, '&' => true, '>' => true, '<' => true,
        '=' => true, '>=' => true, '<=' => true, '<>' => true,
        '|' => true, ':' => true,
    ];
    /**
     * The current locale setting.
     *
     * @var string
     */
    private static $localeLanguage = 'en_us';
    /**
     * List of available locale settings
     * Note that this is read for the locale subdirectory only when requested.
     *
     * @var string[]
     */
    private static $validLocaleLanguages = [
        'en', //    English        (default language)
    ];
    /**
     * Locale-specific argument separator for function arguments.
     *
     * @var string
     */
    private static $localeArgumentSeparator = ',';
    private static $localeFunctions = [];
    /**
     * Excel constant string translations to their PHP equivalents
     * Constant conversion from text name/value to actual (datatyped) value.
     *
     * @var string[]
     */
    private static $excelConstants = [
        'TRUE' => true,
        'FALSE' => false,
        'NULL' => null,
    ];
    private static $phpSpreadsheetFunctions = [
        'ABS' => [
            'category' => Category::CATEGORY_MATH_AND_TRIG,
            'functionCall' => 'abs',
            'argumentCount' => '1',
        ],
        'ACCRINT' => [
            'category' => Category::CATEGORY_FINANCIAL,
            'functionCall' => [Financial::class, 'ACCRINT'],
            'argumentCount' => '4-7',
        ],
        'ACCRINTM' => [
            'category' => Category::CATEGORY_FINANCIAL,
            'functionCall' => [Financial::class, 'ACCRINTM'],
            'argumentCount' => '3-5',
        ],
        'ACOS' => [
            'category' => Category::CATEGORY_MATH_AND_TRIG,
            'functionCall' => 'acos',
            'argumentCount' => '1',
        ],
        'ACOSH' => [
            'category' => Category::CATEGORY_MATH_AND_TRIG,
            'functionCall' => 'acosh',
            'argumentCount' => '1',
        ],
        'ADDRESS' => [
            'category' => Category::CATEGORY_LOOKUP_AND_REFERENCE,
            'functionCall' => [LookupRef::class, 'cellAddress'],
            'argumentCount' => '2-5',
        ],
        'AMORDEGRC' => [
            'category' => Category::CATEGORY_FINANCIAL,
            'functionCall' => [Financial::class, 'AMORDEGRC'],
            'argumentCount' => '6,7',
        ],
        'AMORLINC' => [
            'category' => Category::CATEGORY_FINANCIAL,
            'functionCall' => [Financial::class, 'AMORLINC'],
            'argumentCount' => '6,7',
        ],
        'AND' => [
            'category' => Category::CATEGORY_LOGICAL,
            'functionCall' => [Logical::class, 'logicalAnd'],
            'argumentCount' => '1+',
        ],
        'AREAS' => [
            'category' => Category::CATEGORY_LOOKUP_AND_REFERENCE,
            'functionCall' => [Functions::class, 'DUMMY'],
            'argumentCount' => '1',
        ],
        'ASC' => [
            'category' => Category::CATEGORY_TEXT_AND_DATA,
            'functionCall' => [Functions::class, 'DUMMY'],
            'argumentCount' => '1',
        ],
        'ASIN' => [
            'category' => Category::CATEGORY_MATH_AND_TRIG,
            'functionCall' => 'asin',
            'argumentCount' => '1',
        ],
        'ASINH' => [
            'category' => Category::CATEGORY_MATH_AND_TRIG,
            'functionCall' => 'asinh',
            'argumentCount' => '1',
        ],
        'ATAN' => [
            'category' => Category::CATEGORY_MATH_AND_TRIG,
            'functionCall' => 'atan',
            'argumentCount' => '1',
        ],
        'ATAN2' => [
            'category' => Category::CATEGORY_MATH_AND_TRIG,
            'functionCall' => [MathTrig::class, 'ATAN2'],
            'argumentCount' => '2',
        ],
        'ATANH' => [
            'category' => Category::CATEGORY_MATH_AND_TRIG,
            'functionCall' => 'atanh',
            'argumentCount' => '1',
        ],
        'AVEDEV' => [
            'category' => Category::CATEGORY_STATISTICAL,
            'functionCall' => [Statistical::class, 'AVEDEV'],
            'argumentCount' => '1+',
        ],
        'AVERAGE' => [
            'category' => Category::CATEGORY_STATISTICAL,
            'functionCall' => [Statistical::class, 'AVERAGE'],
            'argumentCount' => '1+',
        ],
        'AVERAGEA' => [
            'category' => Category::CATEGORY_STATISTICAL,
            'functionCall' => [Statistical::class, 'AVERAGEA'],
            'argumentCount' => '1+',
        ],
        'AVERAGEIF' => [
            'category' => Category::CATEGORY_STATISTICAL,
            'functionCall' => [Statistical::class, 'AVERAGEIF'],
            'argumentCount' => '2,3',
        ],
        'AVERAGEIFS' => [
            'category' => Category::CATEGORY_STATISTICAL,
            'functionCall' => [Functions::class, 'DUMMY'],
            'argumentCount' => '3+',
        ],
        'BAHTTEXT' => [
            'category' => Category::CATEGORY_TEXT_AND_DATA,
            'functionCall' => [Functions::class, 'DUMMY'],
            'argumentCount' => '1',
        ],
        'BESSELI' => [
            'category' => Category::CATEGORY_ENGINEERING,
            'functionCall' => [Engineering::class, 'BESSELI'],
            'argumentCount' => '2',
        ],
        'BESSELJ' => [
            'category' => Category::CATEGORY_ENGINEERING,
            'functionCall' => [Engineering::class, 'BESSELJ'],
            'argumentCount' => '2',
        ],
        'BESSELK' => [
            'category' => Category::CATEGORY_ENGINEERING,
            'functionCall' => [Engineering::class, 'BESSELK'],
            'argumentCount' => '2',
        ],
        'BESSELY' => [
            'category' => Category::CATEGORY_ENGINEERING,
            'functionCall' => [Engineering::class, 'BESSELY'],
            'argumentCount' => '2',
        ],
        'BETADIST' => [
            'category' => Category::CATEGORY_STATISTICAL,
            'functionCall' => [Statistical::class, 'BETADIST'],
            'argumentCount' => '3-5',
        ],
        'BETAINV' => [
            'category' => Category::CATEGORY_STATISTICAL,
            'functionCall' => [Statistical::class, 'BETAINV'],
            'argumentCount' => '3-5',
        ],
        'BIN2DEC' => [
            'category' => Category::CATEGORY_ENGINEERING,
            'functionCall' => [Engineering::class, 'BINTODEC'],
            'argumentCount' => '1',
        ],
        'BIN2HEX' => [
            'category' => Category::CATEGORY_ENGINEERING,
            'functionCall' => [Engineering::class, 'BINTOHEX'],
            'argumentCount' => '1,2',
        ],
        'BIN2OCT' => [
            'category' => Category::CATEGORY_ENGINEERING,
            'functionCall' => [Engineering::class, 'BINTOOCT'],
            'argumentCount' => '1,2',
        ],
        'BINOMDIST' => [
            'category' => Category::CATEGORY_STATISTICAL,
            'functionCall' => [Statistical::class, 'BINOMDIST'],
            'argumentCount' => '4',
        ],
        'CEILING' => [
            'category' => Category::CATEGORY_MATH_AND_TRIG,
            'functionCall' => [MathTrig::class, 'CEILING'],
            'argumentCount' => '2',
        ],
        'CELL' => [
            'category' => Category::CATEGORY_INFORMATION,
            'functionCall' => [Functions::class, 'DUMMY'],
            'argumentCount' => '1,2',
        ],
        'CHAR' => [
            'category' => Category::CATEGORY_TEXT_AND_DATA,
            'functionCall' => [TextData::class, 'CHARACTER'],
            'argumentCount' => '1',
        ],
        'CHIDIST' => [
            'category' => Category::CATEGORY_STATISTICAL,
            'functionCall' => [Statistical::class, 'CHIDIST'],
            'argumentCount' => '2',
        ],
        'CHIINV' => [
            'category' => Category::CATEGORY_STATISTICAL,
            'functionCall' => [Statistical::class, 'CHIINV'],
            'argumentCount' => '2',
        ],
        'CHITEST' => [
            'category' => Category::CATEGORY_STATISTICAL,
            'functionCall' => [Functions::class, 'DUMMY'],
            'argumentCount' => '2',
        ],
        'CHOOSE' => [
            'category' => Category::CATEGORY_LOOKUP_AND_REFERENCE,
            'functionCall' => [LookupRef::class, 'CHOOSE'],
            'argumentCount' => '2+',
        ],
        'CLEAN' => [
            'category' => Category::CATEGORY_TEXT_AND_DATA,
            'functionCall' => [TextData::class, 'TRIMNONPRINTABLE'],
            'argumentCount' => '1',
        ],
        'CODE' => [
            'category' => Category::CATEGORY_TEXT_AND_DATA,
            'functionCall' => [TextData::class, 'ASCIICODE'],
            'argumentCount' => '1',
        ],
        'COLUMN' => [
            'category' => Category::CATEGORY_LOOKUP_AND_REFERENCE,
            'functionCall' => [LookupRef::class, 'COLUMN'],
            'argumentCount' => '-1',
            'passByReference' => [true],
        ],
        'COLUMNS' => [
            'category' => Category::CATEGORY_LOOKUP_AND_REFERENCE,
            'functionCall' => [LookupRef::class, 'COLUMNS'],
            'argumentCount' => '1',
        ],
        'COMBIN' => [
            'category' => Category::CATEGORY_MATH_AND_TRIG,
            'functionCall' => [MathTrig::class, 'COMBIN'],
            'argumentCount' => '2',
        ],
        'COMPLEX' => [
            'category' => Category::CATEGORY_ENGINEERING,
            'functionCall' => [Engineering::class, 'COMPLEX'],
            'argumentCount' => '2,3',
        ],
        'CONCATENATE' => [
            'category' => Category::CATEGORY_TEXT_AND_DATA,
            'functionCall' => [TextData::class, 'CONCATENATE'],
            'argumentCount' => '1+',
        ],
        'CONFIDENCE' => [
            'category' => Category::CATEGORY_STATISTICAL,
            'functionCall' => [Statistical::class, 'CONFIDENCE'],
            'argumentCount' => '3',
        ],
        'CONVERT' => [
            'category' => Category::CATEGORY_ENGINEERING,
            'functionCall' => [Engineering::class, 'CONVERTUOM'],
            'argumentCount' => '3',
        ],
        'CORREL' => [
            'category' => Category::CATEGORY_STATISTICAL,
            'functionCall' => [Statistical::class, 'CORREL'],
            'argumentCount' => '2',
        ],
        'COS' => [
            'category' => Category::CATEGORY_MATH_AND_TRIG,
            'functionCall' => 'cos',
            'argumentCount' => '1',
        ],
        'COSH' => [
            'category' => Category::CATEGORY_MATH_AND_TRIG,
            'functionCall' => 'cosh',
            'argumentCount' => '1',
        ],
        'COUNT' => [
            'category' => Category::CATEGORY_STATISTICAL,
            'functionCall' => [Statistical::class, 'COUNT'],
            'argumentCount' => '1+',
        ],
        'COUNTA' => [
            'category' => Category::CATEGORY_STATISTICAL,
            'functionCall' => [Statistical::class, 'COUNTA'],
            'argumentCount' => '1+',
        ],
        'COUNTBLANK' => [
            'category' => Category::CATEGORY_STATISTICAL,
            'functionCall' => [Statistical::class, 'COUNTBLANK'],
            'argumentCount' => '1',
        ],
        'COUNTIF' => [
            'category' => Category::CATEGORY_STATISTICAL,
            'functionCall' => [Statistical::class, 'COUNTIF'],
            'argumentCount' => '2',
        ],
        'COUNTIFS' => [
            'category' => Category::CATEGORY_STATISTICAL,
            'functionCall' => [Functions::class, 'DUMMY'],
            'argumentCount' => '2',
        ],
        'COUPDAYBS' => [
            'category' => Category::CATEGORY_FINANCIAL,
            'functionCall' => [Financial::class, 'COUPDAYBS'],
            'argumentCount' => '3,4',
        ],
        'COUPDAYS' => [
            'category' => Category::CATEGORY_FINANCIAL,
            'functionCall' => [Financial::class, 'COUPDAYS'],
            'argumentCount' => '3,4',
        ],
        'COUPDAYSNC' => [
            'category' => Category::CATEGORY_FINANCIAL,
            'functionCall' => [Financial::class, 'COUPDAYSNC'],
            'argumentCount' => '3,4',
        ],
        'COUPNCD' => [
            'category' => Category::CATEGORY_FINANCIAL,
            'functionCall' => [Financial::class, 'COUPNCD'],
            'argumentCount' => '3,4',
        ],
        'COUPNUM' => [
            'category' => Category::CATEGORY_FINANCIAL,
            'functionCall' => [Financial::class, 'COUPNUM'],
            'argumentCount' => '3,4',
        ],
        'COUPPCD' => [
            'category' => Category::CATEGORY_FINANCIAL,
            'functionCall' => [Financial::class, 'COUPPCD'],
            'argumentCount' => '3,4',
        ],
        'COVAR' => [
            'category' => Category::CATEGORY_STATISTICAL,
            'functionCall' => [Statistical::class, 'COVAR'],
            'argumentCount' => '2',
        ],
        'CRITBINOM' => [
            'category' => Category::CATEGORY_STATISTICAL,
            'functionCall' => [Statistical::class, 'CRITBINOM'],
            'argumentCount' => '3',
        ],
        'CUBEKPIMEMBER' => [
            'category' => Category::CATEGORY_CUBE,
            'functionCall' => [Functions::class, 'DUMMY'],
            'argumentCount' => '?',
        ],
        'CUBEMEMBER' => [
            'category' => Category::CATEGORY_CUBE,
            'functionCall' => [Functions::class, 'DUMMY'],
            'argumentCount' => '?',
        ],
        'CUBEMEMBERPROPERTY' => [
            'category' => Category::CATEGORY_CUBE,
            'functionCall' => [Functions::class, 'DUMMY'],
            'argumentCount' => '?',
        ],
        'CUBERANKEDMEMBER' => [
            'category' => Category::CATEGORY_CUBE,
            'functionCall' => [Functions::class, 'DUMMY'],
            'argumentCount' => '?',
        ],
        'CUBESET' => [
            'category' => Category::CATEGORY_CUBE,
            'functionCall' => [Functions::class, 'DUMMY'],
            'argumentCount' => '?',
        ],
        'CUBESETCOUNT' => [
            'category' => Category::CATEGORY_CUBE,
            'functionCall' => [Functions::class, 'DUMMY'],
            'argumentCount' => '?',
        ],
        'CUBEVALUE' => [
            'category' => Category::CATEGORY_CUBE,
            'functionCall' => [Functions::class, 'DUMMY'],
            'argumentCount' => '?',
        ],
        'CUMIPMT' => [
            'category' => Category::CATEGORY_FINANCIAL,
            'functionCall' => [Financial::class, 'CUMIPMT'],
            'argumentCount' => '6',
        ],
        'CUMPRINC' => [
            'category' => Category::CATEGORY_FINANCIAL,
            'functionCall' => [Financial::class, 'CUMPRINC'],
            'argumentCount' => '6',
        ],
        'DATE' => [
            'category' => Category::CATEGORY_DATE_AND_TIME,
            'functionCall' => [DateTime::class, 'DATE'],
            'argumentCount' => '3',
        ],
        'DATEDIF' => [
            'category' => Category::CATEGORY_DATE_AND_TIME,
            'functionCall' => [DateTime::class, 'DATEDIF'],
            'argumentCount' => '2,3',
        ],
        'DATEVALUE' => [
            'category' => Category::CATEGORY_DATE_AND_TIME,
            'functionCall' => [DateTime::class, 'DATEVALUE'],
            'argumentCount' => '1',
        ],
        'DAVERAGE' => [
            'category' => Category::CATEGORY_DATABASE,
            'functionCall' => [Database::class, 'DAVERAGE'],
            'argumentCount' => '3',
        ],
        'DAY' => [
            'category' => Category::CATEGORY_DATE_AND_TIME,
            'functionCall' => [DateTime::class, 'DAYOFMONTH'],
            'argumentCount' => '1',
        ],
        'DAYS360' => [
            'category' => Category::CATEGORY_DATE_AND_TIME,
            'functionCall' => [DateTime::class, 'DAYS360'],
            'argumentCount' => '2,3',
        ],
        'DB' => [
            'category' => Category::CATEGORY_FINANCIAL,
            'functionCall' => [Financial::class, 'DB'],
            'argumentCount' => '4,5',
        ],
        'DCOUNT' => [
            'category' => Category::CATEGORY_DATABASE,
            'functionCall' => [Database::class, 'DCOUNT'],
            'argumentCount' => '3',
        ],
        'DCOUNTA' => [
            'category' => Category::CATEGORY_DATABASE,
            'functionCall' => [Database::class, 'DCOUNTA'],
            'argumentCount' => '3',
        ],
        'DDB' => [
            'category' => Category::CATEGORY_FINANCIAL,
            'functionCall' => [Financial::class, 'DDB'],
            'argumentCount' => '4,5',
        ],
        'DEC2BIN' => [
            'category' => Category::CATEGORY_ENGINEERING,
            'functionCall' => [Engineering::class, 'DECTOBIN'],
            'argumentCount' => '1,2',
        ],
        'DEC2HEX' => [
            'category' => Category::CATEGORY_ENGINEERING,
            'functionCall' => [Engineering::class, 'DECTOHEX'],
            'argumentCount' => '1,2',
        ],
        'DEC2OCT' => [
            'category' => Category::CATEGORY_ENGINEERING,
            'functionCall' => [Engineering::class, 'DECTOOCT'],
            'argumentCount' => '1,2',
        ],
        'DEGREES' => [
            'category' => Category::CATEGORY_MATH_AND_TRIG,
            'functionCall' => 'rad2deg',
            'argumentCount' => '1',
        ],
        'DELTA' => [
            'category' => Category::CATEGORY_ENGINEERING,
            'functionCall' => [Engineering::class, 'DELTA'],
            'argumentCount' => '1,2',
        ],
        'DEVSQ' => [
            'category' => Category::CATEGORY_STATISTICAL,
            'functionCall' => [Statistical::class, 'DEVSQ'],
            'argumentCount' => '1+',
        ],
        'DGET' => [
            'category' => Category::CATEGORY_DATABASE,
            'functionCall' => [Database::class, 'DGET'],
            'argumentCount' => '3',
        ],
        'DISC' => [
            'category' => Category::CATEGORY_FINANCIAL,
            'functionCall' => [Financial::class, 'DISC'],
            'argumentCount' => '4,5',
        ],
        'DMAX' => [
            'category' => Category::CATEGORY_DATABASE,
            'functionCall' => [Database::class, 'DMAX'],
            'argumentCount' => '3',
        ],
        'DMIN' => [
            'category' => Category::CATEGORY_DATABASE,
            'functionCall' => [Database::class, 'DMIN'],
            'argumentCount' => '3',
        ],
        'DOLLAR' => [
            'category' => Category::CATEGORY_TEXT_AND_DATA,
            'functionCall' => [TextData::class, 'DOLLAR'],
            'argumentCount' => '1,2',
        ],
        'DOLLARDE' => [
            'category' => Category::CATEGORY_FINANCIAL,
            'functionCall' => [Financial::class, 'DOLLARDE'],
            'argumentCount' => '2',
        ],
        'DOLLARFR' => [
            'category' => Category::CATEGORY_FINANCIAL,
            'functionCall' => [Financial::class, 'DOLLARFR'],
            'argumentCount' => '2',
        ],
        'DPRODUCT' => [
            'category' => Category::CATEGORY_DATABASE,
            'functionCall' => [Database::class, 'DPRODUCT'],
            'argumentCount' => '3',
        ],
        'DSTDEV' => [
            'category' => Category::CATEGORY_DATABASE,
            'functionCall' => [Database::class, 'DSTDEV'],
            'argumentCount' => '3',
        ],
        'DSTDEVP' => [
            'category' => Category::CATEGORY_DATABASE,
            'functionCall' => [Database::class, 'DSTDEVP'],
            'argumentCount' => '3',
        ],
        'DSUM' => [
            'category' => Category::CATEGORY_DATABASE,
            'functionCall' => [Database::class, 'DSUM'],
            'argumentCount' => '3',
        ],
        'DURATION' => [
            'category' => Category::CATEGORY_FINANCIAL,
            'functionCall' => [Functions::class, 'DUMMY'],
            'argumentCount' => '5,6',
        ],
        'DVAR' => [
            'category' => Category::CATEGORY_DATABASE,
            'functionCall' => [Database::class, 'DVAR'],
            'argumentCount' => '3',
        ],
        'DVARP' => [
            'category' => Category::CATEGORY_DATABASE,
            'functionCall' => [Database::class, 'DVARP'],
            'argumentCount' => '3',
        ],
        'EDATE' => [
            'category' => Category::CATEGORY_DATE_AND_TIME,
            'functionCall' => [DateTime::class, 'EDATE'],
            'argumentCount' => '2',
        ],
        'EFFECT' => [
            'category' => Category::CATEGORY_FINANCIAL,
            'functionCall' => [Financial::class, 'EFFECT'],
            'argumentCount' => '2',
        ],
        'EOMONTH' => [
            'category' => Category::CATEGORY_DATE_AND_TIME,
            'functionCall' => [DateTime::class, 'EOMONTH'],
            'argumentCount' => '2',
        ],
        'ERF' => [
            'category' => Category::CATEGORY_ENGINEERING,
            'functionCall' => [Engineering::class, 'ERF'],
            'argumentCount' => '1,2',
        ],
        'ERFC' => [
            'category' => Category::CATEGORY_ENGINEERING,
            'functionCall' => [Engineering::class, 'ERFC'],
            'argumentCount' => '1',
        ],
        'ERROR.TYPE' => [
            'category' => Category::CATEGORY_INFORMATION,
            'functionCall' => [Functions::class, 'errorType'],
            'argumentCount' => '1',
        ],
        'EVEN' => [
            'category' => Category::CATEGORY_MATH_AND_TRIG,
            'functionCall' => [MathTrig::class, 'EVEN'],
            'argumentCount' => '1',
        ],
        'EXACT' => [
            'category' => Category::CATEGORY_TEXT_AND_DATA,
            'functionCall' => [Functions::class, 'DUMMY'],
            'argumentCount' => '2',
        ],
        'EXP' => [
            'category' => Category::CATEGORY_MATH_AND_TRIG,
            'functionCall' => 'exp',
            'argumentCount' => '1',
        ],
        'EXPONDIST' => [
            'category' => Category::CATEGORY_STATISTICAL,
            'functionCall' => [Statistical::class, 'EXPONDIST'],
            'argumentCount' => '3',
        ],
        'FACT' => [
            'category' => Category::CATEGORY_MATH_AND_TRIG,
            'functionCall' => [MathTrig::class, 'FACT'],
            'argumentCount' => '1',
        ],
        'FACTDOUBLE' => [
            'category' => Category::CATEGORY_MATH_AND_TRIG,
            'functionCall' => [MathTrig::class, 'FACTDOUBLE'],
            'argumentCount' => '1',
        ],
        'FALSE' => [
            'category' => Category::CATEGORY_LOGICAL,
            'functionCall' => [Logical::class, 'FALSE'],
            'argumentCount' => '0',
        ],
        'FDIST' => [
            'category' => Category::CATEGORY_STATISTICAL,
            'functionCall' => [Functions::class, 'DUMMY'],
            'argumentCount' => '3',
        ],
        'FIND' => [
            'category' => Category::CATEGORY_TEXT_AND_DATA,
            'functionCall' => [TextData::class, 'SEARCHSENSITIVE'],
            'argumentCount' => '2,3',
        ],
        'FINDB' => [
            'category' => Category::CATEGORY_TEXT_AND_DATA,
            'functionCall' => [TextData::class, 'SEARCHSENSITIVE'],
            'argumentCount' => '2,3',
        ],
        'FINV' => [
            'category' => Category::CATEGORY_STATISTICAL,
            'functionCall' => [Functions::class, 'DUMMY'],
            'argumentCount' => '3',
        ],
        'FISHER' => [
            'category' => Category::CATEGORY_STATISTICAL,
            'functionCall' => [Statistical::class, 'FISHER'],
            'argumentCount' => '1',
        ],
        'FISHERINV' => [
            'category' => Category::CATEGORY_STATISTICAL,
            'functionCall' => [Statistical::class, 'FISHERINV'],
            'argumentCount' => '1',
        ],
        'FIXED' => [
            'category' => Category::CATEGORY_TEXT_AND_DATA,
            'functionCall' => [TextData::class, 'FIXEDFORMAT'],
            'argumentCount' => '1-3',
        ],
        'FLOOR' => [
            'category' => Category::CATEGORY_MATH_AND_TRIG,
            'functionCall' => [MathTrig::class, 'FLOOR'],
            'argumentCount' => '2',
        ],
        'FORECAST' => [
            'category' => Category::CATEGORY_STATISTICAL,
            'functionCall' => [Statistical::class, 'FORECAST'],
            'argumentCount' => '3',
        ],
        'FREQUENCY' => [
            'category' => Category::CATEGORY_STATISTICAL,
            'functionCall' => [Functions::class, 'DUMMY'],
            'argumentCount' => '2',
        ],
        'FTEST' => [
            'category' => Category::CATEGORY_STATISTICAL,
            'functionCall' => [Functions::class, 'DUMMY'],
            'argumentCount' => '2',
        ],
        'FV' => [
            'category' => Category::CATEGORY_FINANCIAL,
            'functionCall' => [Financial::class, 'FV'],
            'argumentCount' => '3-5',
        ],
        'FVSCHEDULE' => [
            'category' => Category::CATEGORY_FINANCIAL,
            'functionCall' => [Financial::class, 'FVSCHEDULE'],
            'argumentCount' => '2',
        ],
        'GAMMADIST' => [
            'category' => Category::CATEGORY_STATISTICAL,
            'functionCall' => [Statistical::class, 'GAMMADIST'],
            'argumentCount' => '4',
        ],
        'GAMMAINV' => [
            'category' => Category::CATEGORY_STATISTICAL,
            'functionCall' => [Statistical::class, 'GAMMAINV'],
            'argumentCount' => '3',
        ],
        'GAMMALN' => [
            'category' => Category::CATEGORY_STATISTICAL,
            'functionCall' => [Statistical::class, 'GAMMALN'],
            'argumentCount' => '1',
        ],
        'GCD' => [
            'category' => Category::CATEGORY_MATH_AND_TRIG,
            'functionCall' => [MathTrig::class, 'GCD'],
            'argumentCount' => '1+',
        ],
        'GEOMEAN' => [
            'category' => Category::CATEGORY_STATISTICAL,
            'functionCall' => [Statistical::class, 'GEOMEAN'],
            'argumentCount' => '1+',
        ],
        'GESTEP' => [
            'category' => Category::CATEGORY_ENGINEERING,
            'functionCall' => [Engineering::class, 'GESTEP'],
            'argumentCount' => '1,2',
        ],
        'GETPIVOTDATA' => [
            'category' => Category::CATEGORY_LOOKUP_AND_REFERENCE,
            'functionCall' => [Functions::class, 'DUMMY'],
            'argumentCount' => '2+',
        ],
        'GROWTH' => [
            'category' => Category::CATEGORY_STATISTICAL,
            'functionCall' => [Statistical::class, 'GROWTH'],
            'argumentCount' => '1-4',
        ],
        'HARMEAN' => [
            'category' => Category::CATEGORY_STATISTICAL,
            'functionCall' => [Statistical::class, 'HARMEAN'],
            'argumentCount' => '1+',
        ],
        'HEX2BIN' => [
            'category' => Category::CATEGORY_ENGINEERING,
            'functionCall' => [Engineering::class, 'HEXTOBIN'],
            'argumentCount' => '1,2',
        ],
        'HEX2DEC' => [
            'category' => Category::CATEGORY_ENGINEERING,
            'functionCall' => [Engineering::class, 'HEXTODEC'],
            'argumentCount' => '1',
        ],
        'HEX2OCT' => [
            'category' => Category::CATEGORY_ENGINEERING,
            'functionCall' => [Engineering::class, 'HEXTOOCT'],
            'argumentCount' => '1,2',
        ],
        'HLOOKUP' => [
            'category' => Category::CATEGORY_LOOKUP_AND_REFERENCE,
            'functionCall' => [LookupRef::class, 'HLOOKUP'],
            'argumentCount' => '3,4',
        ],
        'HOUR' => [
            'category' => Category::CATEGORY_DATE_AND_TIME,
            'functionCall' => [DateTime::class, 'HOUROFDAY'],
            'argumentCount' => '1',
        ],
        'HYPERLINK' => [
            'category' => Category::CATEGORY_LOOKUP_AND_REFERENCE,
            'functionCall' => [LookupRef::class, 'HYPERLINK'],
            'argumentCount' => '1,2',
            'passCellReference' => true,
        ],
        'HYPGEOMDIST' => [
            'category' => Category::CATEGORY_STATISTICAL,
            'functionCall' => [Statistical::class, 'HYPGEOMDIST'],
            'argumentCount' => '4',
        ],
        'IF' => [
            'category' => Category::CATEGORY_LOGICAL,
            'functionCall' => [Logical::class, 'statementIf'],
            'argumentCount' => '1-3',
        ],
        'IFERROR' => [
            'category' => Category::CATEGORY_LOGICAL,
            'functionCall' => [Logical::class, 'IFERROR'],
            'argumentCount' => '2',
        ],
        'IMABS' => [
            'category' => Category::CATEGORY_ENGINEERING,
            'functionCall' => [Engineering::class, 'IMABS'],
            'argumentCount' => '1',
        ],
        'IMAGINARY' => [
            'category' => Category::CATEGORY_ENGINEERING,
            'functionCall' => [Engineering::class, 'IMAGINARY'],
            'argumentCount' => '1',
        ],
        'IMARGUMENT' => [
            'category' => Category::CATEGORY_ENGINEERING,
            'functionCall' => [Engineering::class, 'IMARGUMENT'],
            'argumentCount' => '1',
        ],
        'IMCONJUGATE' => [
            'category' => Category::CATEGORY_ENGINEERING,
            'functionCall' => [Engineering::class, 'IMCONJUGATE'],
            'argumentCount' => '1',
        ],
        'IMCOS' => [
            'category' => Category::CATEGORY_ENGINEERING,
            'functionCall' => [Engineering::class, 'IMCOS'],
            'argumentCount' => '1',
        ],
        'IMDIV' => [
            'category' => Category::CATEGORY_ENGINEERING,
            'functionCall' => [Engineering::class, 'IMDIV'],
            'argumentCount' => '2',
        ],
        'IMEXP' => [
            'category' => Category::CATEGORY_ENGINEERING,
            'functionCall' => [Engineering::class, 'IMEXP'],
            'argumentCount' => '1',
        ],
        'IMLN' => [
            'category' => Category::CATEGORY_ENGINEERING,
            'functionCall' => [Engineering::class, 'IMLN'],
            'argumentCount' => '1',
        ],
        'IMLOG10' => [
            'category' => Category::CATEGORY_ENGINEERING,
            'functionCall' => [Engineering::class, 'IMLOG10'],
            'argumentCount' => '1',
        ],
        'IMLOG2' => [
            'category' => Category::CATEGORY_ENGINEERING,
            'functionCall' => [Engineering::class, 'IMLOG2'],
            'argumentCount' => '1',
        ],
        'IMPOWER' => [
            'category' => Category::CATEGORY_ENGINEERING,
            'functionCall' => [Engineering::class, 'IMPOWER'],
            'argumentCount' => '2',
        ],
        'IMPRODUCT' => [
            'category' => Category::CATEGORY_ENGINEERING,
            'functionCall' => [Engineering::class, 'IMPRODUCT'],
            'argumentCount' => '1+',
        ],
        'IMREAL' => [
            'category' => Category::CATEGORY_ENGINEERING,
            'functionCall' => [Engineering::class, 'IMREAL'],
            'argumentCount' => '1',
        ],
        'IMSIN' => [
            'category' => Category::CATEGORY_ENGINEERING,
            'functionCall' => [Engineering::class, 'IMSIN'],
            'argumentCount' => '1',
        ],
        'IMSQRT' => [
            'category' => Category::CATEGORY_ENGINEERING,
            'functionCall' => [Engineering::class, 'IMSQRT'],
            'argumentCount' => '1',
        ],
        'IMSUB' => [
            'category' => Category::CATEGORY_ENGINEERING,
            'functionCall' => [Engineering::class, 'IMSUB'],
            'argumentCount' => '2',
        ],
        'IMSUM' => [
            'category' => Category::CATEGORY_ENGINEERING,
            'functionCall' => [Engineering::class, 'IMSUM'],
            'argumentCount' => '1+',
        ],
        'INDEX' => [
            'category' => Category::CATEGORY_LOOKUP_AND_REFERENCE,
            'functionCall' => [LookupRef::class, 'INDEX'],
            'argumentCount' => '1-4',
        ],
        'INDIRECT' => [
            'category' => Category::CATEGORY_LOOKUP_AND_REFERENCE,
            'functionCall' => [LookupRef::class, 'INDIRECT'],
            'argumentCount' => '1,2',
            'passCellReference' => true,
        ],
        'INFO' => [
            'category' => Category::CATEGORY_INFORMATION,
            'functionCall' => [Functions::class, 'DUMMY'],
            'argumentCount' => '1',
        ],
        'INT' => [
            'category' => Category::CATEGORY_MATH_AND_TRIG,
            'functionCall' => [MathTrig::class, 'INT'],
            'argumentCount' => '1',
        ],
        'INTERCEPT' => [
            'category' => Category::CATEGORY_STATISTICAL,
            'functionCall' => [Statistical::class, 'INTERCEPT'],
            'argumentCount' => '2',
        ],
        'INTRATE' => [
            'category' => Category::CATEGORY_FINANCIAL,
            'functionCall' => [Financial::class, 'INTRATE'],
            'argumentCount' => '4,5',
        ],
        'IPMT' => [
            'category' => Category::CATEGORY_FINANCIAL,
            'functionCall' => [Financial::class, 'IPMT'],
            'argumentCount' => '4-6',
        ],
        'IRR' => [
            'category' => Category::CATEGORY_FINANCIAL,
            'functionCall' => [Financial::class, 'IRR'],
            'argumentCount' => '1,2',
        ],
        'ISBLANK' => [
            'category' => Category::CATEGORY_INFORMATION,
            'functionCall' => [Functions::class, 'isBlank'],
            'argumentCount' => '1',
        ],
        'ISERR' => [
            'category' => Category::CATEGORY_INFORMATION,
            'functionCall' => [Functions::class, 'isErr'],
            'argumentCount' => '1',
        ],
        'ISERROR' => [
            'category' => Category::CATEGORY_INFORMATION,
            'functionCall' => [Functions::class, 'isError'],
            'argumentCount' => '1',
        ],
        'ISEVEN' => [
            'category' => Category::CATEGORY_INFORMATION,
            'functionCall' => [Functions::class, 'isEven'],
            'argumentCount' => '1',
        ],
        'ISLOGICAL' => [
            'category' => Category::CATEGORY_INFORMATION,
            'functionCall' => [Functions::class, 'isLogical'],
            'argumentCount' => '1',
        ],
        'ISNA' => [
            'category' => Category::CATEGORY_INFORMATION,
            'functionCall' => [Functions::class, 'isNa'],
            'argumentCount' => '1',
        ],
        'ISNONTEXT' => [
            'category' => Category::CATEGORY_INFORMATION,
            'functionCall' => [Functions::class, 'isNonText'],
            'argumentCount' => '1',
        ],
        'ISNUMBER' => [
            'category' => Category::CATEGORY_INFORMATION,
            'functionCall' => [Functions::class, 'isNumber'],
            'argumentCount' => '1',
        ],
        'ISODD' => [
            'category' => Category::CATEGORY_INFORMATION,
            'functionCall' => [Functions::class, 'isOdd'],
            'argumentCount' => '1',
        ],
        'ISPMT' => [
            'category' => Category::CATEGORY_FINANCIAL,
            'functionCall' => [Financial::class, 'ISPMT'],
            'argumentCount' => '4',
        ],
        'ISREF' => [
            'category' => Category::CATEGORY_INFORMATION,
            'functionCall' => [Functions::class, 'DUMMY'],
            'argumentCount' => '1',
        ],
        'ISTEXT' => [
            'category' => Category::CATEGORY_INFORMATION,
            'functionCall' => [Functions::class, 'isText'],
            'argumentCount' => '1',
        ],
        'JIS' => [
            'category' => Category::CATEGORY_TEXT_AND_DATA,
            'functionCall' => [Functions::class, 'DUMMY'],
            'argumentCount' => '1',
        ],
        'KURT' => [
            'category' => Category::CATEGORY_STATISTICAL,
            'functionCall' => [Statistical::class, 'KURT'],
            'argumentCount' => '1+',
        ],
        'LARGE' => [
            'category' => Category::CATEGORY_STATISTICAL,
            'functionCall' => [Statistical::class, 'LARGE'],
            'argumentCount' => '2',
        ],
        'LCM' => [
            'category' => Category::CATEGORY_MATH_AND_TRIG,
            'functionCall' => [MathTrig::class, 'LCM'],
            'argumentCount' => '1+',
        ],
        'LEFT' => [
            'category' => Category::CATEGORY_TEXT_AND_DATA,
            'functionCall' => [TextData::class, 'LEFT'],
            'argumentCount' => '1,2',
        ],
        'LEFTB' => [
            'category' => Category::CATEGORY_TEXT_AND_DATA,
            'functionCall' => [TextData::class, 'LEFT'],
            'argumentCount' => '1,2',
        ],
        'LEN' => [
            'category' => Category::CATEGORY_TEXT_AND_DATA,
            'functionCall' => [TextData::class, 'STRINGLENGTH'],
            'argumentCount' => '1',
        ],
        'LENB' => [
            'category' => Category::CATEGORY_TEXT_AND_DATA,
            'functionCall' => [TextData::class, 'STRINGLENGTH'],
            'argumentCount' => '1',
        ],
        'LINEST' => [
            'category' => Category::CATEGORY_STATISTICAL,
            'functionCall' => [Statistical::class, 'LINEST'],
            'argumentCount' => '1-4',
        ],
        'LN' => [
            'category' => Category::CATEGORY_MATH_AND_TRIG,
            'functionCall' => 'log',
            'argumentCount' => '1',
        ],
        'LOG' => [
            'category' => Category::CATEGORY_MATH_AND_TRIG,
            'functionCall' => [MathTrig::class, 'logBase'],
            'argumentCount' => '1,2',
        ],
        'LOG10' => [
            'category' => Category::CATEGORY_MATH_AND_TRIG,
            'functionCall' => 'log10',
            'argumentCount' => '1',
        ],
        'LOGEST' => [
            'category' => Category::CATEGORY_STATISTICAL,
            'functionCall' => [Statistical::class, 'LOGEST'],
            'argumentCount' => '1-4',
        ],
        'LOGINV' => [
            'category' => Category::CATEGORY_STATISTICAL,
            'functionCall' => [Statistical::class, 'LOGINV'],
            'argumentCount' => '3',
        ],
        'LOGNORMDIST' => [
            'category' => Category::CATEGORY_STATISTICAL,
            'functionCall' => [Statistical::class, 'LOGNORMDIST'],
            'argumentCount' => '3',
        ],
        'LOOKUP' => [
            'category' => Category::CATEGORY_LOOKUP_AND_REFERENCE,
            'functionCall' => [LookupRef::class, 'LOOKUP'],
            'argumentCount' => '2,3',
        ],
        'LOWER' => [
            'category' => Category::CATEGORY_TEXT_AND_DATA,
            'functionCall' => [TextData::class, 'LOWERCASE'],
            'argumentCount' => '1',
        ],
        'MATCH' => [
            'category' => Category::CATEGORY_LOOKUP_AND_REFERENCE,
            'functionCall' => [LookupRef::class, 'MATCH'],
            'argumentCount' => '2,3',
        ],
        'MAX' => [
            'category' => Category::CATEGORY_STATISTICAL,
            'functionCall' => [Statistical::class, 'MAX'],
            'argumentCount' => '1+',
        ],
        'MAXA' => [
            'category' => Category::CATEGORY_STATISTICAL,
            'functionCall' => [Statistical::class, 'MAXA'],
            'argumentCount' => '1+',
        ],
        'MAXIF' => [
            'category' => Category::CATEGORY_STATISTICAL,
            'functionCall' => [Statistical::class, 'MAXIF'],
            'argumentCount' => '2+',
        ],
        'MDETERM' => [
            'category' => Category::CATEGORY_MATH_AND_TRIG,
            'functionCall' => [MathTrig::class, 'MDETERM'],
            'argumentCount' => '1',
        ],
        'MDURATION' => [
            'category' => Category::CATEGORY_FINANCIAL,
            'functionCall' => [Functions::class, 'DUMMY'],
            'argumentCount' => '5,6',
        ],
        'MEDIAN' => [
            'category' => Category::CATEGORY_STATISTICAL,
            'functionCall' => [Statistical::class, 'MEDIAN'],
            'argumentCount' => '1+',
        ],
        'MEDIANIF' => [
            'category' => Category::CATEGORY_STATISTICAL,
            'functionCall' => [Functions::class, 'DUMMY'],
            'argumentCount' => '2+',
        ],
        'MID' => [
            'category' => Category::CATEGORY_TEXT_AND_DATA,
            'functionCall' => [TextData::class, 'MID'],
            'argumentCount' => '3',
        ],
        'MIDB' => [
            'category' => Category::CATEGORY_TEXT_AND_DATA,
            'functionCall' => [TextData::class, 'MID'],
            'argumentCount' => '3',
        ],
        'MIN' => [
            'category' => Category::CATEGORY_STATISTICAL,
            'functionCall' => [Statistical::class, 'MIN'],
            'argumentCount' => '1+',
        ],
        'MINA' => [
            'category' => Category::CATEGORY_STATISTICAL,
            'functionCall' => [Statistical::class, 'MINA'],
            'argumentCount' => '1+',
        ],
        'MINIF' => [
            'category' => Category::CATEGORY_STATISTICAL,
            'functionCall' => [Statistical::class, 'MINIF'],
            'argumentCount' => '2+',
        ],
        'MINUTE' => [
            'category' => Category::CATEGORY_DATE_AND_TIME,
            'functionCall' => [DateTime::class, 'MINUTE'],
            'argumentCount' => '1',
        ],
        'MINVERSE' => [
            'category' => Category::CATEGORY_MATH_AND_TRIG,
            'functionCall' => [MathTrig::class, 'MINVERSE'],
            'argumentCount' => '1',
        ],
        'MIRR' => [
            'category' => Category::CATEGORY_FINANCIAL,
            'functionCall' => [Financial::class, 'MIRR'],
            'argumentCount' => '3',
        ],
        'MMULT' => [
            'category' => Category::CATEGORY_MATH_AND_TRIG,
            'functionCall' => [MathTrig::class, 'MMULT'],
            'argumentCount' => '2',
        ],
        'MOD' => [
            'category' => Category::CATEGORY_MATH_AND_TRIG,
            'functionCall' => [MathTrig::class, 'MOD'],
            'argumentCount' => '2',
        ],
        'MODE' => [
            'category' => Category::CATEGORY_STATISTICAL,
            'functionCall' => [Statistical::class, 'MODE'],
            'argumentCount' => '1+',
        ],
        'MONTH' => [
            'category' => Category::CATEGORY_DATE_AND_TIME,
            'functionCall' => [DateTime::class, 'MONTHOFYEAR'],
            'argumentCount' => '1',
        ],
        'MROUND' => [
            'category' => Category::CATEGORY_MATH_AND_TRIG,
            'functionCall' => [MathTrig::class, 'MROUND'],
            'argumentCount' => '2',
        ],
        'MULTINOMIAL' => [
            'category' => Category::CATEGORY_MATH_AND_TRIG,
            'functionCall' => [MathTrig::class, 'MULTINOMIAL'],
            'argumentCount' => '1+',
        ],
        'N' => [
            'category' => Category::CATEGORY_INFORMATION,
            'functionCall' => [Functions::class, 'n'],
            'argumentCount' => '1',
        ],
        'NA' => [
            'category' => Category::CATEGORY_INFORMATION,
            'functionCall' => [Functions::class, 'NA'],
            'argumentCount' => '0',
        ],
        'NEGBINOMDIST' => [
            'category' => Category::CATEGORY_STATISTICAL,
            'functionCall' => [Statistical::class, 'NEGBINOMDIST'],
            'argumentCount' => '3',
        ],
        'NETWORKDAYS' => [
            'category' => Category::CATEGORY_DATE_AND_TIME,
            'functionCall' => [DateTime::class, 'NETWORKDAYS'],
            'argumentCount' => '2+',
        ],
        'NOMINAL' => [
            'category' => Category::CATEGORY_FINANCIAL,
            'functionCall' => [Financial::class, 'NOMINAL'],
            'argumentCount' => '2',
        ],
        'NORMDIST' => [
            'category' => Category::CATEGORY_STATISTICAL,
            'functionCall' => [Statistical::class, 'NORMDIST'],
            'argumentCount' => '4',
        ],
        'NORMINV' => [
            'category' => Category::CATEGORY_STATISTICAL,
            'functionCall' => [Statistical::class, 'NORMINV'],
            'argumentCount' => '3',
        ],
        'NORMSDIST' => [
            'category' => Category::CATEGORY_STATISTICAL,
            'functionCall' => [Statistical::class, 'NORMSDIST'],
            'argumentCount' => '1',
        ],
        'NORMSINV' => [
            'category' => Category::CATEGORY_STATISTICAL,
            'functionCall' => [Statistical::class, 'NORMSINV'],
            'argumentCount' => '1',
        ],
        'NOT' => [
            'category' => Category::CATEGORY_LOGICAL,
            'functionCall' => [Logical::class, 'NOT'],
            'argumentCount' => '1',
        ],
        'NOW' => [
            'category' => Category::CATEGORY_DATE_AND_TIME,
            'functionCall' => [DateTime::class, 'DATETIMENOW'],
            'argumentCount' => '0',
        ],
        'NPER' => [
            'category' => Category::CATEGORY_FINANCIAL,
            'functionCall' => [Financial::class, 'NPER'],
            'argumentCount' => '3-5',
        ],
        'NPV' => [
            'category' => Category::CATEGORY_FINANCIAL,
            'functionCall' => [Financial::class, 'NPV'],
            'argumentCount' => '2+',
        ],
        'OCT2BIN' => [
            'category' => Category::CATEGORY_ENGINEERING,
            'functionCall' => [Engineering::class, 'OCTTOBIN'],
            'argumentCount' => '1,2',
        ],
        'OCT2DEC' => [
            'category' => Category::CATEGORY_ENGINEERING,
            'functionCall' => [Engineering::class, 'OCTTODEC'],
            'argumentCount' => '1',
        ],
        'OCT2HEX' => [
            'category' => Category::CATEGORY_ENGINEERING,
            'functionCall' => [Engineering::class, 'OCTTOHEX'],
            'argumentCount' => '1,2',
        ],
        'ODD' => [
            'category' => Category::CATEGORY_MATH_AND_TRIG,
            'functionCall' => [MathTrig::class, 'ODD'],
            'argumentCount' => '1',
        ],
        'ODDFPRICE' => [
            'category' => Category::CATEGORY_FINANCIAL,
            'functionCall' => [Functions::class, 'DUMMY'],
            'argumentCount' => '8,9',
        ],
        'ODDFYIELD' => [
            'category' => Category::CATEGORY_FINANCIAL,
            'functionCall' => [Functions::class, 'DUMMY'],
            'argumentCount' => '8,9',
        ],
        'ODDLPRICE' => [
            'category' => Category::CATEGORY_FINANCIAL,
            'functionCall' => [Functions::class, 'DUMMY'],
            'argumentCount' => '7,8',
        ],
        'ODDLYIELD' => [
            'category' => Category::CATEGORY_FINANCIAL,
            'functionCall' => [Functions::class, 'DUMMY'],
            'argumentCount' => '7,8',
        ],
        'OFFSET' => [
            'category' => Category::CATEGORY_LOOKUP_AND_REFERENCE,
            'functionCall' => [LookupRef::class, 'OFFSET'],
            'argumentCount' => '3-5',
            'passCellReference' => true,
            'passByReference' => [true],
        ],
        'OR' => [
            'category' => Category::CATEGORY_LOGICAL,
            'functionCall' => [Logical::class, 'logicalOr'],
            'argumentCount' => '1+',
        ],
        'PEARSON' => [
            'category' => Category::CATEGORY_STATISTICAL,
            'functionCall' => [Statistical::class, 'CORREL'],
            'argumentCount' => '2',
        ],
        'PERCENTILE' => [
            'category' => Category::CATEGORY_STATISTICAL,
            'functionCall' => [Statistical::class, 'PERCENTILE'],
            'argumentCount' => '2',
        ],
        'PERCENTRANK' => [
            'category' => Category::CATEGORY_STATISTICAL,
            'functionCall' => [Statistical::class, 'PERCENTRANK'],
            'argumentCount' => '2,3',
        ],
        'PERMUT' => [
            'category' => Category::CATEGORY_STATISTICAL,
            'functionCall' => [Statistical::class, 'PERMUT'],
            'argumentCount' => '2',
        ],
        'PHONETIC' => [
            'category' => Category::CATEGORY_TEXT_AND_DATA,
            'functionCall' => [Functions::class, 'DUMMY'],
            'argumentCount' => '1',
        ],
        'PI' => [
            'category' => Category::CATEGORY_MATH_AND_TRIG,
            'functionCall' => 'pi',
            'argumentCount' => '0',
        ],
        'PMT' => [
            'category' => Category::CATEGORY_FINANCIAL,
            'functionCall' => [Financial::class, 'PMT'],
            'argumentCount' => '3-5',
        ],
        'POISSON' => [
            'category' => Category::CATEGORY_STATISTICAL,
            'functionCall' => [Statistical::class, 'POISSON'],
            'argumentCount' => '3',
        ],
        'POWER' => [
            'category' => Category::CATEGORY_MATH_AND_TRIG,
            'functionCall' => [MathTrig::class, 'POWER'],
            'argumentCount' => '2',
        ],
        'PPMT' => [
            'category' => Category::CATEGORY_FINANCIAL,
            'functionCall' => [Financial::class, 'PPMT'],
            'argumentCount' => '4-6',
        ],
        'PRICE' => [
            'category' => Category::CATEGORY_FINANCIAL,
            'functionCall' => [Financial::class, 'PRICE'],
            'argumentCount' => '6,7',
        ],
        'PRICEDISC' => [
            'category' => Category::CATEGORY_FINANCIAL,
            'functionCall' => [Financial::class, 'PRICEDISC'],
            'argumentCount' => '4,5',
        ],
        'PRICEMAT' => [
            'category' => Category::CATEGORY_FINANCIAL,
            'functionCall' => [Financial::class, 'PRICEMAT'],
            'argumentCount' => '5,6',
        ],
        'PROB' => [
            'category' => Category::CATEGORY_STATISTICAL,
            'functionCall' => [Functions::class, 'DUMMY'],
            'argumentCount' => '3,4',
        ],
        'PRODUCT' => [
            'category' => Category::CATEGORY_MATH_AND_TRIG,
            'functionCall' => [MathTrig::class, 'PRODUCT'],
            'argumentCount' => '1+',
        ],
        'PROPER' => [
            'category' => Category::CATEGORY_TEXT_AND_DATA,
            'functionCall' => [TextData::class, 'PROPERCASE'],
            'argumentCount' => '1',
        ],
        'PV' => [
            'category' => Category::CATEGORY_FINANCIAL,
            'functionCall' => [Financial::class, 'PV'],
            'argumentCount' => '3-5',
        ],
        'QUARTILE' => [
            'category' => Category::CATEGORY_STATISTICAL,
            'functionCall' => [Statistical::class, 'QUARTILE'],
            'argumentCount' => '2',
        ],
        'QUOTIENT' => [
            'category' => Category::CATEGORY_MATH_AND_TRIG,
            'functionCall' => [MathTrig::class, 'QUOTIENT'],
            'argumentCount' => '2',
        ],
        'RADIANS' => [
            'category' => Category::CATEGORY_MATH_AND_TRIG,
            'functionCall' => 'deg2rad',
            'argumentCount' => '1',
        ],
        'RAND' => [
            'category' => Category::CATEGORY_MATH_AND_TRIG,
            'functionCall' => [MathTrig::class, 'RAND'],
            'argumentCount' => '0',
        ],
        'RANDBETWEEN' => [
            'category' => Category::CATEGORY_MATH_AND_TRIG,
            'functionCall' => [MathTrig::class, 'RAND'],
            'argumentCount' => '2',
        ],
        'RANK' => [
            'category' => Category::CATEGORY_STATISTICAL,
            'functionCall' => [Statistical::class, 'RANK'],
            'argumentCount' => '2,3',
        ],
        'RATE' => [
            'category' => Category::CATEGORY_FINANCIAL,
            'functionCall' => [Financial::class, 'RATE'],
            'argumentCount' => '3-6',
        ],
        'RECEIVED' => [
            'category' => Category::CATEGORY_FINANCIAL,
            'functionCall' => [Financial::class, 'RECEIVED'],
            'argumentCount' => '4-5',
        ],
        'REPLACE' => [
            'category' => Category::CATEGORY_TEXT_AND_DATA,
            'functionCall' => [TextData::class, 'REPLACE'],
            'argumentCount' => '4',
        ],
        'REPLACEB' => [
            'category' => Category::CATEGORY_TEXT_AND_DATA,
            'functionCall' => [TextData::class, 'REPLACE'],
            'argumentCount' => '4',
        ],
        'REPT' => [
            'category' => Category::CATEGORY_TEXT_AND_DATA,
            'functionCall' => 'str_repeat',
            'argumentCount' => '2',
        ],
        'RIGHT' => [
            'category' => Category::CATEGORY_TEXT_AND_DATA,
            'functionCall' => [TextData::class, 'RIGHT'],
            'argumentCount' => '1,2',
        ],
        'RIGHTB' => [
            'category' => Category::CATEGORY_TEXT_AND_DATA,
            'functionCall' => [TextData::class, 'RIGHT'],
            'argumentCount' => '1,2',
        ],
        'ROMAN' => [
            'category' => Category::CATEGORY_MATH_AND_TRIG,
            'functionCall' => [MathTrig::class, 'ROMAN'],
            'argumentCount' => '1,2',
        ],
        'ROUND' => [
            'category' => Category::CATEGORY_MATH_AND_TRIG,
            'functionCall' => 'round',
            'argumentCount' => '2',
        ],
        'ROUNDDOWN' => [
            'category' => Category::CATEGORY_MATH_AND_TRIG,
            'functionCall' => [MathTrig::class, 'ROUNDDOWN'],
            'argumentCount' => '2',
        ],
        'ROUNDUP' => [
            'category' => Category::CATEGORY_MATH_AND_TRIG,
            'functionCall' => [MathTrig::class, 'ROUNDUP'],
            'argumentCount' => '2',
        ],
        'ROW' => [
            'category' => Category::CATEGORY_LOOKUP_AND_REFERENCE,
            'functionCall' => [LookupRef::class, 'ROW'],
            'argumentCount' => '-1',
            'passByReference' => [true],
        ],
        'ROWS' => [
            'category' => Category::CATEGORY_LOOKUP_AND_REFERENCE,
            'functionCall' => [LookupRef::class, 'ROWS'],
            'argumentCount' => '1',
        ],
        'RSQ' => [
            'category' => Category::CATEGORY_STATISTICAL,
            'functionCall' => [Statistical::class, 'RSQ'],
            'argumentCount' => '2',
        ],
        'RTD' => [
            'category' => Category::CATEGORY_LOOKUP_AND_REFERENCE,
            'functionCall' => [Functions::class, 'DUMMY'],
            'argumentCount' => '1+',
        ],
        'SEARCH' => [
            'category' => Category::CATEGORY_TEXT_AND_DATA,
            'functionCall' => [TextData::class, 'SEARCHINSENSITIVE'],
            'argumentCount' => '2,3',
        ],
        'SEARCHB' => [
            'category' => Category::CATEGORY_TEXT_AND_DATA,
            'functionCall' => [TextData::class, 'SEARCHINSENSITIVE'],
            'argumentCount' => '2,3',
        ],
        'SECOND' => [
            'category' => Category::CATEGORY_DATE_AND_TIME,
            'functionCall' => [DateTime::class, 'SECOND'],
            'argumentCount' => '1',
        ],
        'SERIESSUM' => [
            'category' => Category::CATEGORY_MATH_AND_TRIG,
            'functionCall' => [MathTrig::class, 'SERIESSUM'],
            'argumentCount' => '4',
        ],
        'SIGN' => [
            'category' => Category::CATEGORY_MATH_AND_TRIG,
            'functionCall' => [MathTrig::class, 'SIGN'],
            'argumentCount' => '1',
        ],
        'SIN' => [
            'category' => Category::CATEGORY_MATH_AND_TRIG,
            'functionCall' => 'sin',
            'argumentCount' => '1',
        ],
        'SINH' => [
            'category' => Category::CATEGORY_MATH_AND_TRIG,
            'functionCall' => 'sinh',
            'argumentCount' => '1',
        ],
        'SKEW' => [
            'category' => Category::CATEGORY_STATISTICAL,
            'functionCall' => [Statistical::class, 'SKEW'],
            'argumentCount' => '1+',
        ],
        'SLN' => [
            'category' => Category::CATEGORY_FINANCIAL,
            'functionCall' => [Financial::class, 'SLN'],
            'argumentCount' => '3',
        ],
        'SLOPE' => [
            'category' => Category::CATEGORY_STATISTICAL,
            'functionCall' => [Statistical::class, 'SLOPE'],
            'argumentCount' => '2',
        ],
        'SMALL' => [
            'category' => Category::CATEGORY_STATISTICAL,
            'functionCall' => [Statistical::class, 'SMALL'],
            'argumentCount' => '2',
        ],
        'SQRT' => [
            'category' => Category::CATEGORY_MATH_AND_TRIG,
            'functionCall' => 'sqrt',
            'argumentCount' => '1',
        ],
        'SQRTPI' => [
            'category' => Category::CATEGORY_MATH_AND_TRIG,
            'functionCall' => [MathTrig::class, 'SQRTPI'],
            'argumentCount' => '1',
        ],
        'STANDARDIZE' => [
            'category' => Category::CATEGORY_STATISTICAL,
            'functionCall' => [Statistical::class, 'STANDARDIZE'],
            'argumentCount' => '3',
        ],
        'STDEV' => [
            'category' => Category::CATEGORY_STATISTICAL,
            'functionCall' => [Statistical::class, 'STDEV'],
            'argumentCount' => '1+',
        ],
        'STDEVA' => [
            'category' => Category::CATEGORY_STATISTICAL,
            'functionCall' => [Statistical::class, 'STDEVA'],
            'argumentCount' => '1+',
        ],
        'STDEVP' => [
            'category' => Category::CATEGORY_STATISTICAL,
            'functionCall' => [Statistical::class, 'STDEVP'],
            'argumentCount' => '1+',
        ],
        'STDEVPA' => [
            'category' => Category::CATEGORY_STATISTICAL,
            'functionCall' => [Statistical::class, 'STDEVPA'],
            'argumentCount' => '1+',
        ],
        'STEYX' => [
            'category' => Category::CATEGORY_STATISTICAL,
            'functionCall' => [Statistical::class, 'STEYX'],
            'argumentCount' => '2',
        ],
        'SUBSTITUTE' => [
            'category' => Category::CATEGORY_TEXT_AND_DATA,
            'functionCall' => [TextData::class, 'SUBSTITUTE'],
            'argumentCount' => '3,4',
        ],
        'SUBTOTAL' => [
            'category' => Category::CATEGORY_MATH_AND_TRIG,
            'functionCall' => [MathTrig::class, 'SUBTOTAL'],
            'argumentCount' => '2+',
        ],
        'SUM' => [
            'category' => Category::CATEGORY_MATH_AND_TRIG,
            'functionCall' => [MathTrig::class, 'SUM'],
            'argumentCount' => '1+',
        ],
        'SUMIF' => [
            'category' => Category::CATEGORY_MATH_AND_TRIG,
            'functionCall' => [MathTrig::class, 'SUMIF'],
            'argumentCount' => '2,3',
        ],
        'SUMIFS' => [
            'category' => Category::CATEGORY_MATH_AND_TRIG,
            'functionCall' => [MathTrig::class, 'SUMIFS'],
            'argumentCount' => '3+',
        ],
        'SUMPRODUCT' => [
            'category' => Category::CATEGORY_MATH_AND_TRIG,
            'functionCall' => [MathTrig::class, 'SUMPRODUCT'],
            'argumentCount' => '1+',
        ],
        'SUMSQ' => [
            'category' => Category::CATEGORY_MATH_AND_TRIG,
            'functionCall' => [MathTrig::class, 'SUMSQ'],
            'argumentCount' => '1+',
        ],
        'SUMX2MY2' => [
            'category' => Category::CATEGORY_MATH_AND_TRIG,
            'functionCall' => [MathTrig::class, 'SUMX2MY2'],
            'argumentCount' => '2',
        ],
        'SUMX2PY2' => [
            'category' => Category::CATEGORY_MATH_AND_TRIG,
            'functionCall' => [MathTrig::class, 'SUMX2PY2'],
            'argumentCount' => '2',
        ],
        'SUMXMY2' => [
            'category' => Category::CATEGORY_MATH_AND_TRIG,
            'functionCall' => [MathTrig::class, 'SUMXMY2'],
            'argumentCount' => '2',
        ],
        'SYD' => [
            'category' => Category::CATEGORY_FINANCIAL,
            'functionCall' => [Financial::class, 'SYD'],
            'argumentCount' => '4',
        ],
        'T' => [
            'category' => Category::CATEGORY_TEXT_AND_DATA,
            'functionCall' => [TextData::class, 'RETURNSTRING'],
            'argumentCount' => '1',
        ],
        'TAN' => [
            'category' => Category::CATEGORY_MATH_AND_TRIG,
            'functionCall' => 'tan',
            'argumentCount' => '1',
        ],
        'TANH' => [
            'category' => Category::CATEGORY_MATH_AND_TRIG,
            'functionCall' => 'tanh',
            'argumentCount' => '1',
        ],
        'TBILLEQ' => [
            'category' => Category::CATEGORY_FINANCIAL,
            'functionCall' => [Financial::class, 'TBILLEQ'],
            'argumentCount' => '3',
        ],
        'TBILLPRICE' => [
            'category' => Category::CATEGORY_FINANCIAL,
            'functionCall' => [Financial::class, 'TBILLPRICE'],
            'argumentCount' => '3',
        ],
        'TBILLYIELD' => [
            'category' => Category::CATEGORY_FINANCIAL,
            'functionCall' => [Financial::class, 'TBILLYIELD'],
            'argumentCount' => '3',
        ],
        'TDIST' => [
            'category' => Category::CATEGORY_STATISTICAL,
            'functionCall' => [Statistical::class, 'TDIST'],
            'argumentCount' => '3',
        ],
        'TEXT' => [
            'category' => Category::CATEGORY_TEXT_AND_DATA,
            'functionCall' => [TextData::class, 'TEXTFORMAT'],
            'argumentCount' => '2',
        ],
        'TIME' => [
            'category' => Category::CATEGORY_DATE_AND_TIME,
            'functionCall' => [DateTime::class, 'TIME'],
            'argumentCount' => '3',
        ],
        'TIMEVALUE' => [
            'category' => Category::CATEGORY_DATE_AND_TIME,
            'functionCall' => [DateTime::class, 'TIMEVALUE'],
            'argumentCount' => '1',
        ],
        'TINV' => [
            'category' => Category::CATEGORY_STATISTICAL,
            'functionCall' => [Statistical::class, 'TINV'],
            'argumentCount' => '2',
        ],
        'TODAY' => [
            'category' => Category::CATEGORY_DATE_AND_TIME,
            'functionCall' => [DateTime::class, 'DATENOW'],
            'argumentCount' => '0',
        ],
        'TRANSPOSE' => [
            'category' => Category::CATEGORY_LOOKUP_AND_REFERENCE,
            'functionCall' => [LookupRef::class, 'TRANSPOSE'],
            'argumentCount' => '1',
        ],
        'TREND' => [
            'category' => Category::CATEGORY_STATISTICAL,
            'functionCall' => [Statistical::class, 'TREND'],
            'argumentCount' => '1-4',
        ],
        'TRIM' => [
            'category' => Category::CATEGORY_TEXT_AND_DATA,
            'functionCall' => [TextData::class, 'TRIMSPACES'],
            'argumentCount' => '1',
        ],
        'TRIMMEAN' => [
            'category' => Category::CATEGORY_STATISTICAL,
            'functionCall' => [Statistical::class, 'TRIMMEAN'],
            'argumentCount' => '2',
        ],
        'TRUE' => [
            'category' => Category::CATEGORY_LOGICAL,
            'functionCall' => [Logical::class, 'TRUE'],
            'argumentCount' => '0',
        ],
        'TRUNC' => [
            'category' => Category::CATEGORY_MATH_AND_TRIG,
            'functionCall' => [MathTrig::class, 'TRUNC'],
            'argumentCount' => '1,2',
        ],
        'TTEST' => [
            'category' => Category::CATEGORY_STATISTICAL,
            'functionCall' => [Functions::class, 'DUMMY'],
            'argumentCount' => '4',
        ],
        'TYPE' => [
            'category' => Category::CATEGORY_INFORMATION,
            'functionCall' => [Functions::class, 'TYPE'],
            'argumentCount' => '1',
        ],
        'UPPER' => [
            'category' => Category::CATEGORY_TEXT_AND_DATA,
            'functionCall' => [TextData::class, 'UPPERCASE'],
            'argumentCount' => '1',
        ],
        'USDOLLAR' => [
            'category' => Category::CATEGORY_FINANCIAL,
            'functionCall' => [Functions::class, 'DUMMY'],
            'argumentCount' => '2',
        ],
        'VALUE' => [
            'category' => Category::CATEGORY_TEXT_AND_DATA,
            'functionCall' => [TextData::class, 'VALUE'],
            'argumentCount' => '1',
        ],
        'VAR' => [
            'category' => Category::CATEGORY_STATISTICAL,
            'functionCall' => [Statistical::class, 'VARFunc'],
            'argumentCount' => '1+',
        ],
        'VARA' => [
            'category' => Category::CATEGORY_STATISTICAL,
            'functionCall' => [Statistical::class, 'VARA'],
            'argumentCount' => '1+',
        ],
        'VARP' => [
            'category' => Category::CATEGORY_STATISTICAL,
            'functionCall' => [Statistical::class, 'VARP'],
            'argumentCount' => '1+',
        ],
        'VARPA' => [
            'category' => Category::CATEGORY_STATISTICAL,
            'functionCall' => [Statistical::class, 'VARPA'],
            'argumentCount' => '1+',
        ],
        'VDB' => [
            'category' => Category::CATEGORY_FINANCIAL,
            'functionCall' => [Functions::class, 'DUMMY'],
            'argumentCount' => '5-7',
        ],
        'VLOOKUP' => [
            'category' => Category::CATEGORY_LOOKUP_AND_REFERENCE,
            'functionCall' => [LookupRef::class, 'VLOOKUP'],
            'argumentCount' => '3,4',
        ],
        'WEEKDAY' => [
            'category' => Category::CATEGORY_DATE_AND_TIME,
            'functionCall' => [DateTime::class, 'WEEKDAY'],
            'argumentCount' => '1,2',
        ],
        'WEEKNUM' => [
            'category' => Category::CATEGORY_DATE_AND_TIME,
            'functionCall' => [DateTime::class, 'WEEKNUM'],
            'argumentCount' => '1,2',
        ],
        'WEIBULL' => [
            'category' => Category::CATEGORY_STATISTICAL,
            'functionCall' => [Statistical::class, 'WEIBULL'],
            'argumentCount' => '4',
        ],
        'WORKDAY' => [
            'category' => Category::CATEGORY_DATE_AND_TIME,
            'functionCall' => [DateTime::class, 'WORKDAY'],
            'argumentCount' => '2+',
        ],
        'XIRR' => [
            'category' => Category::CATEGORY_FINANCIAL,
            'functionCall' => [Financial::class, 'XIRR'],
            'argumentCount' => '2,3',
        ],
        'XNPV' => [
            'category' => Category::CATEGORY_FINANCIAL,
            'functionCall' => [Financial::class, 'XNPV'],
            'argumentCount' => '3',
        ],
        'YEAR' => [
            'category' => Category::CATEGORY_DATE_AND_TIME,
            'functionCall' => [DateTime::class, 'YEAR'],
            'argumentCount' => '1',
        ],
        'YEARFRAC' => [
            'category' => Category::CATEGORY_DATE_AND_TIME,
            'functionCall' => [DateTime::class, 'YEARFRAC'],
            'argumentCount' => '2,3',
        ],
        'YIELD' => [
            'category' => Category::CATEGORY_FINANCIAL,
            'functionCall' => [Functions::class, 'DUMMY'],
            'argumentCount' => '6,7',
        ],
        'YIELDDISC' => [
            'category' => Category::CATEGORY_FINANCIAL,
            'functionCall' => [Financial::class, 'YIELDDISC'],
            'argumentCount' => '4,5',
        ],
        'YIELDMAT' => [
            'category' => Category::CATEGORY_FINANCIAL,
            'functionCall' => [Financial::class, 'YIELDMAT'],
            'argumentCount' => '5,6',
        ],
        'ZTEST' => [
            'category' => Category::CATEGORY_STATISTICAL,
            'functionCall' => [Statistical::class, 'ZTEST'],
            'argumentCount' => '2-3',
        ],
    ];
    private static $controlFunctions = [
        'MKMATRIX' => [
            'argumentCount' => '*',
            'functionCall' => 'self::mkMatrix',
        ],
    ];
    private static $functionReplaceFromExcel = null;
    private static $functionReplaceToLocale = null;
    private static $functionReplaceFromLocale = null;
    private static $functionReplaceToExcel = null;
    private static $operatorAssociativity = [
        '^' => 0, //    Exponentiation
        '*' => 0, '/' => 0, //    Multiplication and Division
        '+' => 0, '-' => 0, //    Addition and Subtraction
        '&' => 0, //    Concatenation
        '|' => 0, ':' => 0, //    Intersect and Range
        '>' => 0, '<' => 0, '=' => 0, '>=' => 0, '<=' => 0, '<>' => 0, //    Comparison
    ]; //    US English    (default locale)
    private static $comparisonOperators = ['>' => true, '<' => true, '=' => true, '>=' => true, '<=' => true, '<>' => true];
    private static $operatorPrecedence = [
        ':' => 8, //    Range
        '|' => 7, //    Intersect
        '~' => 6, //    Negation
        '%' => 5, //    Percentage
        '^' => 4, //    Exponentiation
        '*' => 3, '/' => 3, //    Multiplication and Division
        '+' => 2, '-' => 2, //    Addition and Subtraction
        '&' => 1, //    Concatenation
        '>' => 0, '<' => 0, '=' => 0, '>=' => 0, '<=' => 0, '<>' => 0, //    Comparison
    ];
    /**
     * Flag to determine how formula errors should be handled
     *        If true, then a user error will be triggered
     *        If false, then an exception will be thrown.
     *
     * @var bool
     */
    public $suppressFormulaErrors = false;
    /**
     * Error message for any error that was raised/thrown by the calculation engine.
     *
     * @var string
     */
    public $formulaError = null;
    /**
     * Number of iterations for cyclic formulae.
     *
     * @var int
     */
    public $cyclicFormulaCount = 1;

    // PhpSpreadsheet functions
    /**
     * Instance of the spreadsheet this Calculation Engine is using.
     *
     * @var PhpSpreadsheet
     */
    private $spreadsheet;

    //    Internal functions used for special control purposes
    /**
     * Calculation cache.
     *
     * @var array
     */
    private $calculationCache = [];
    /**
     * Calculation cache enabled.
     *
     * @var bool
     */
    private $calculationCacheEnabled = true;
    /**
     * The debug log generated by the calculation engine.
     *
     * @var CalcEngine\Logger
     */
    private $debugLog;
    /**
     * An array of the nested cell references accessed by the calculation engine, used for the debug log.
     *
     * @var array of string
     */
    private $cyclicReferenceStack;
    private $cellStack = [];
    /**
     * Current iteration counter for cyclic formulae
     * If the value is 0 (or less) then cyclic formulae will throw an exception,
     * otherwise they will iterate to the limit defined here before returning a result.
     *
     * @var int
     */
    private $cyclicFormulaCounter = 1;
    private $cyclicFormulaCell = '';
    /**
     * Epsilon Precision used for comparisons in calculations.
     *
     * @var float
     */
    private $delta = 0.1e-12;

    public function __construct(Spreadsheet $spreadsheet = null)
    {
        $this->delta = 1 * pow(10, 0 - ini_get('precision'));

        $this->spreadsheet = $spreadsheet;
        $this->cyclicReferenceStack = new CalcEngine\CyclicReferenceStack();
        $this->debugLog = new CalcEngine\Logger($this->cyclicReferenceStack);
    }

    /**
     * Get an instance of this class.
     *
     * @param Spreadsheet $spreadsheet Injected spreadsheet for working with a PhpSpreadsheet Spreadsheet object,
     *                                    or NULL to create a standalone claculation engine
     *
     * @return Calculation
     */
    public static function getInstance(Spreadsheet $spreadsheet = null)
    {
        if ($spreadsheet !== null) {
            $instance = $spreadsheet->getCalculationEngine();
            if (isset($instance)) {
                return $instance;
            }
        }

        if (!isset(self::$instance) || (self::$instance === null)) {
            self::$instance = new \PhpOffice\PhpSpreadsheet\Calculation();
        }

        return self::$instance;
    }

    /**
     * Return the locale-specific translation of TRUE.
     *
     * @return string locale-specific translation of TRUE
     */
    public static function getTRUE()
    {
        return self::$localeBoolean['TRUE'];
    }

    /**
     * Return the locale-specific translation of FALSE.
     *
     * @return string locale-specific translation of FALSE
     */
    public static function getFALSE()
    {
        return self::$localeBoolean['FALSE'];
    }

    /**
     * Set the Array Return Type (Array or Value of first element in the array).
     *
     * @param string $returnType Array return type
     *
     * @return bool Success or failure
     */
    public static function setArrayReturnType($returnType)
    {
        if (($returnType == self::RETURN_ARRAY_AS_VALUE) ||
            ($returnType == self::RETURN_ARRAY_AS_ERROR) ||
            ($returnType == self::RETURN_ARRAY_AS_ARRAY)
        ) {
            self::$returnArrayAsType = $returnType;

            return true;
        }

        return false;
    }

    /**
     * Return the Array Return Type (Array or Value of first element in the array).
     *
     * @return string $returnType Array return type
     */
    public static function getArrayReturnType()
    {
        return self::$returnArrayAsType;
    }

    private static function mkMatrix(...$args)
    {
        return $args;
    }

    /**
     * Unset an instance of this class.
     *
     * @param Spreadsheet $spreadsheet Injected spreadsheet identifying the instance to unset
     */
    public function __destruct()
    {
        $this->workbook = null;
    }

    /**
     * Flush the calculation cache for any existing instance of this class
     *        but only if a \PhpOffice\PhpSpreadsheet\Calculation instance exists.
     */
    public function flushInstance()
    {
        $this->clearCalculationCache();
    }

    /**
     * Clear calculation cache.
     */
    public function clearCalculationCache()
    {
        $this->calculationCache = [];
    }

    /**
     * Get the Logger for this calculation engine instance.
     *
     * @return CalcEngine\Logger
     */
    public function getDebugLog()
    {
        return $this->debugLog;
    }

    /**
     * __clone implementation. Cloning should not be allowed in a Singleton!
     *
     * @throws Calculation\Exception
     */
    final public function __clone()
    {
        throw new Calculation\Exception('Cloning the calculation engine is not allowed!');
    }

    /**
     * Enable calculation cache.
     */
    public function enableCalculationCache()
    {
        $this->setCalculationCacheEnabled(true);
    }

    /**
     * Disable calculation cache.
     */
    public function disableCalculationCache()
    {
        $this->setCalculationCacheEnabled(false);
    }

    /**
     * Clear calculation cache for a specified worksheet.
     *
     * @param string $worksheetName
     */
    public function clearCalculationCacheForWorksheet($worksheetName)
    {
        if (isset($this->calculationCache[$worksheetName])) {
            unset($this->calculationCache[$worksheetName]);
        }
    }

    /**
     * Rename calculation cache for a specified worksheet.
     *
     * @param string $fromWorksheetName
     * @param string $toWorksheetName
     */
    public function renameCalculationCacheForWorksheet($fromWorksheetName, $toWorksheetName)
    {
        if (isset($this->calculationCache[$fromWorksheetName])) {
            $this->calculationCache[$toWorksheetName] = &$this->calculationCache[$fromWorksheetName];
            unset($this->calculationCache[$fromWorksheetName]);
        }
    }

    /**
     * Get the currently defined locale code.
     *
     * @return string
     */
    public function getLocale()
    {
        return self::$localeLanguage;
    }

    /**
     * Set the locale code.
     *
     * @param string $locale The locale to use for formula translation
     *
     * @return bool
     */
    public function setLocale($locale = 'en_us')
    {
        //    Identify our locale and language
        $language = $locale = strtolower($locale);
        if (strpos($locale, '_') !== false) {
            list($language) = explode('_', $locale);
        }

        if (count(self::$validLocaleLanguages) == 1) {
            self::loadLocales();
        }
        //    Test whether we have any language data for this language (any locale)
        if (in_array($language, self::$validLocaleLanguages)) {
            //    initialise language/locale settings
            self::$localeFunctions = [];
            self::$localeArgumentSeparator = ',';
            self::$localeBoolean = ['TRUE' => 'TRUE', 'FALSE' => 'FALSE', 'NULL' => 'NULL'];
            //    Default is English, if user isn't requesting english, then read the necessary data from the locale files
            if ($locale != 'en_us') {
                //    Search for a file with a list of function names for locale
                $functionNamesFile = __DIR__ . '/locale/' . str_replace('_', DIRECTORY_SEPARATOR, $locale) . DIRECTORY_SEPARATOR . 'functions';
                if (!file_exists($functionNamesFile)) {
                    //    If there isn't a locale specific function file, look for a language specific function file
                    $functionNamesFile = __DIR__ . '/locale/' . $language . DIRECTORY_SEPARATOR . 'functions';
                    if (!file_exists($functionNamesFile)) {
                        return false;
                    }
                }
                //    Retrieve the list of locale or language specific function names
                $localeFunctions = file($functionNamesFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
                foreach ($localeFunctions as $localeFunction) {
                    list($localeFunction) = explode('##', $localeFunction); //    Strip out comments
                    if (strpos($localeFunction, '=') !== false) {
                        list($fName, $lfName) = explode('=', $localeFunction);
                        $fName = trim($fName);
                        $lfName = trim($lfName);
                        if ((isset(self::$phpSpreadsheetFunctions[$fName])) && ($lfName != '') && ($fName != $lfName)) {
                            self::$localeFunctions[$fName] = $lfName;
                        }
                    }
                }
                //    Default the TRUE and FALSE constants to the locale names of the TRUE() and FALSE() functions
                if (isset(self::$localeFunctions['TRUE'])) {
                    self::$localeBoolean['TRUE'] = self::$localeFunctions['TRUE'];
                }
                if (isset(self::$localeFunctions['FALSE'])) {
                    self::$localeBoolean['FALSE'] = self::$localeFunctions['FALSE'];
                }

                $configFile = __DIR__ . '/locale/' . str_replace('_', DIRECTORY_SEPARATOR, $locale) . DIRECTORY_SEPARATOR . 'config';
                if (!file_exists($configFile)) {
                    $configFile = __DIR__ . '/locale/' . $language . DIRECTORY_SEPARATOR . 'config';
                }
                if (file_exists($configFile)) {
                    $localeSettings = file($configFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
                    foreach ($localeSettings as $localeSetting) {
                        list($localeSetting) = explode('##', $localeSetting); //    Strip out comments
                        if (strpos($localeSetting, '=') !== false) {
                            list($settingName, $settingValue) = explode('=', $localeSetting);
                            $settingName = strtoupper(trim($settingName));
                            switch ($settingName) {
                                case 'ARGUMENTSEPARATOR':
                                    self::$localeArgumentSeparator = trim($settingValue);
                                    break;
                            }
                        }
                    }
                }
            }

            self::$functionReplaceFromExcel = self::$functionReplaceToExcel =
            self::$functionReplaceFromLocale = self::$functionReplaceToLocale = null;
            self::$localeLanguage = $locale;

            return true;
        }

        return false;
    }

    private static function loadLocales()
    {
        $localeFileDirectory = __DIR__ . '/locale/';
        foreach (glob($localeFileDirectory . '/*', GLOB_ONLYDIR) as $filename) {
            $filename = substr($filename, strlen($localeFileDirectory) + 1);
            if ($filename != 'en') {
                self::$validLocaleLanguages[] = $filename;
            }
        }
    }

    public function _translateFormulaToLocale($formula)
    {
        if (self::$functionReplaceFromExcel === null) {
            self::$functionReplaceFromExcel = [];
            foreach (array_keys(self::$localeFunctions) as $excelFunctionName) {
                self::$functionReplaceFromExcel[] = '/(@?[^\w\.])' . preg_quote($excelFunctionName) . '([\s]*\()/Ui';
            }
            foreach (array_keys(self::$localeBoolean) as $excelBoolean) {
                self::$functionReplaceFromExcel[] = '/(@?[^\w\.])' . preg_quote($excelBoolean) . '([^\w\.])/Ui';
            }
        }

        if (self::$functionReplaceToLocale === null) {
            self::$functionReplaceToLocale = [];
            foreach (array_values(self::$localeFunctions) as $localeFunctionName) {
                self::$functionReplaceToLocale[] = '$1' . trim($localeFunctionName) . '$2';
            }
            foreach (array_values(self::$localeBoolean) as $localeBoolean) {
                self::$functionReplaceToLocale[] = '$1' . trim($localeBoolean) . '$2';
            }
        }

        return self::translateFormula(self::$functionReplaceFromExcel, self::$functionReplaceToLocale, $formula, ',', self::$localeArgumentSeparator);
    }

    /**
     * @param string $fromSeparator
     * @param string $toSeparator
     * @param mixed $from
     * @param mixed $to
     * @param mixed $formula
     */
    private static function translateFormula($from, $to, $formula, $fromSeparator, $toSeparator)
    {
        //    Convert any Excel function names to the required language
        if (self::$localeLanguage !== 'en_us') {
            $inBraces = false;
            //    If there is the possibility of braces within a quoted string, then we don't treat those as matrix indicators
            if (strpos($formula, '"') !== false) {
                //    So instead we skip replacing in any quoted strings by only replacing in every other array element after we've exploded
                //        the formula
                $temp = explode('"', $formula);
                $i = false;
                foreach ($temp as &$value) {
                    //    Only count/replace in alternating array entries
                    if ($i = !$i) {
                        $value = preg_replace($from, $to, $value);
                        $value = self::translateSeparator($fromSeparator, $toSeparator, $value, $inBraces);
                    }
                }
                unset($value);
                //    Then rebuild the formula string
                $formula = implode('"', $temp);
            } else {
                //    If there's no quoted strings, then we do a simple count/replace
                $formula = preg_replace($from, $to, $formula);
                $formula = self::translateSeparator($fromSeparator, $toSeparator, $formula, $inBraces);
            }
        }

        return $formula;
    }

    public static function translateSeparator($fromSeparator, $toSeparator, $formula, &$inBraces)
    {
        $strlen = mb_strlen($formula);
        for ($i = 0; $i < $strlen; ++$i) {
            $chr = mb_substr($formula, $i, 1);
            switch ($chr) {
                case '{':
                    $inBraces = true;
                    break;
                case '}':
                    $inBraces = false;
                    break;
                case $fromSeparator:
                    if (!$inBraces) {
                        $formula = mb_substr($formula, 0, $i) . $toSeparator . mb_substr($formula, $i + 1);
                    }
            }
        }

        return $formula;
    }

    public function _translateFormulaToEnglish($formula)
    {
        if (self::$functionReplaceFromLocale === null) {
            self::$functionReplaceFromLocale = [];
            foreach (array_values(self::$localeFunctions) as $localeFunctionName) {
                self::$functionReplaceFromLocale[] = '/(@?[^\w\.])' . preg_quote($localeFunctionName) . '([\s]*\()/Ui';
            }
            foreach (array_values(self::$localeBoolean) as $excelBoolean) {
                self::$functionReplaceFromLocale[] = '/(@?[^\w\.])' . preg_quote($excelBoolean) . '([^\w\.])/Ui';
            }
        }

        if (self::$functionReplaceToExcel === null) {
            self::$functionReplaceToExcel = [];
            foreach (array_keys(self::$localeFunctions) as $excelFunctionName) {
                self::$functionReplaceToExcel[] = '$1' . trim($excelFunctionName) . '$2';
            }
            foreach (array_keys(self::$localeBoolean) as $excelBoolean) {
                self::$functionReplaceToExcel[] = '$1' . trim($excelBoolean) . '$2';
            }
        }

        return self::translateFormula(self::$functionReplaceFromLocale, self::$functionReplaceToExcel, $formula, self::$localeArgumentSeparator, ',');
    }

    /**
     * Calculate cell value (using formula from a cell ID)
     * Retained for backward compatibility.
     *
     * @param Cell $pCell Cell to calculate
     *
     * @throws Calculation\Exception
     *
     * @return mixed
     */
    public function calculate(Cell $pCell = null)
    {
        try {
            return $this->calculateCellValue($pCell);
        } catch (Exception $e) {
            throw new Calculation\Exception($e->getMessage());
        }
    }

    /**
     * Calculate the value of a cell formula.
     *
     * @param Cell $pCell Cell to calculate
     * @param bool $resetLog Flag indicating whether the debug log should be reset or not
     *
     * @throws Calculation\Exception
     *
     * @return mixed
     */
    public function calculateCellValue(Cell $pCell = null, $resetLog = true)
    {
        if ($pCell === null) {
            return null;
        }

        $returnArrayAsType = self::$returnArrayAsType;
        if ($resetLog) {
            //    Initialise the logging settings if requested
            $this->formulaError = null;
            $this->debugLog->clearLog();
            $this->cyclicReferenceStack->clear();
            $this->cyclicFormulaCounter = 1;

            self::$returnArrayAsType = self::RETURN_ARRAY_AS_ARRAY;
        }

        //    Execute the calculation for the cell formula
        $this->cellStack[] = [
            'sheet' => $pCell->getWorksheet()->getTitle(),
            'cell' => $pCell->getCoordinate(),
        ];
        try {
            $result = self::unwrapResult($this->_calculateFormulaValue($pCell->getValue(), $pCell->getCoordinate(), $pCell));
            $cellAddress = array_pop($this->cellStack);
            $this->spreadsheet->getSheetByName($cellAddress['sheet'])->getCell($cellAddress['cell']);
        } catch (Exception $e) {
            $cellAddress = array_pop($this->cellStack);
            $this->spreadsheet->getSheetByName($cellAddress['sheet'])->getCell($cellAddress['cell']);
            throw new Calculation\Exception($e->getMessage());
        }

        if ((is_array($result)) && (self::$returnArrayAsType != self::RETURN_ARRAY_AS_ARRAY)) {
            self::$returnArrayAsType = $returnArrayAsType;
            $testResult = Calculation\Functions::flattenArray($result);
            if (self::$returnArrayAsType == self::RETURN_ARRAY_AS_ERROR) {
                return Calculation\Functions::VALUE();
            }
            //    If there's only a single cell in the array, then we allow it
            if (count($testResult) != 1) {
                //    If keys are numeric, then it's a matrix result rather than a cell range result, so we permit it
                $r = array_keys($result);
                $r = array_shift($r);
                if (!is_numeric($r)) {
                    return Calculation\Functions::VALUE();
                }
                if (is_array($result[$r])) {
                    $c = array_keys($result[$r]);
                    $c = array_shift($c);
                    if (!is_numeric($c)) {
                        return Calculation\Functions::VALUE();
                    }
                }
            }
            $result = array_shift($testResult);
        }
        self::$returnArrayAsType = $returnArrayAsType;

        if ($result === null) {
            return 0;
        } elseif ((is_float($result)) && ((is_nan($result)) || (is_infinite($result)))) {
            return Calculation\Functions::NAN();
        }

        return $result;
    }

    /**
     * Remove quotes used as a wrapper to identify string values.
     *
     * @param mixed $value
     *
     * @return mixed
     */
    public static function unwrapResult($value)
    {
        if (is_string($value)) {
            if ((isset($value[0])) && ($value[0] == '"') && (substr($value, -1) == '"')) {
                return substr($value, 1, -1);
            }
            //    Convert numeric errors to NAN error
        } elseif ((is_float($value)) && ((is_nan($value)) || (is_infinite($value)))) {
            return Calculation\Functions::NAN();
        }

        return $value;
    }

    /**
     * Parse a cell formula and calculate its value.
     *
     * @param string $formula The formula to parse and calculate
     * @param string $cellID The ID (e.g. A3) of the cell that we are calculating
     * @param Cell $pCell Cell to calculate
     *
     * @throws Calculation\Exception
     *
     * @return mixed
     */
    public function _calculateFormulaValue($formula, $cellID = null, Cell $pCell = null)
    {
        $cellValue = null;

        //    Basic validation that this is indeed a formula
        //    We simply return the cell value if not
        $formula = trim($formula);
        if ($formula[0] != '=') {
            return self::wrapResult($formula);
        }
        $formula = ltrim(substr($formula, 1));
        if (!isset($formula[0])) {
            return self::wrapResult($formula);
        }

        $pCellParent = ($pCell !== null) ? $pCell->getWorksheet() : null;
        $wsTitle = ($pCellParent !== null) ? $pCellParent->getTitle() : "\x00Wrk";
        $wsCellReference = $wsTitle . '!' . $cellID;

        if (($cellID !== null) && ($this->getValueFromCache($wsCellReference, $cellValue))) {
            return $cellValue;
        }

        if (($wsTitle[0] !== "\x00") && ($this->cyclicReferenceStack->onStack($wsCellReference))) {
            if ($this->cyclicFormulaCount <= 0) {
                $this->cyclicFormulaCell = '';

                return $this->raiseFormulaError('Cyclic Reference in Formula');
            } elseif ($this->cyclicFormulaCell === $wsCellReference) {
                ++$this->cyclicFormulaCounter;
                if ($this->cyclicFormulaCounter >= $this->cyclicFormulaCount) {
                    $this->cyclicFormulaCell = '';

                    return $cellValue;
                }
            } elseif ($this->cyclicFormulaCell == '') {
                if ($this->cyclicFormulaCounter >= $this->cyclicFormulaCount) {
                    return $cellValue;
                }
                $this->cyclicFormulaCell = $wsCellReference;
            }
        }

        //    Parse the formula onto the token stack and calculate the value
        $this->cyclicReferenceStack->push($wsCellReference);
        $cellValue = $this->processTokenStack($this->_parseFormula($formula, $pCell), $cellID, $pCell);
        $this->cyclicReferenceStack->pop();

        // Save to calculation cache
        if ($cellID !== null) {
            $this->saveValueToCache($wsCellReference, $cellValue);
        }

        //    Return the calculated value
        return $cellValue;
    }

    /**
     * Wrap string values in quotes.
     *
     * @param mixed $value
     *
     * @return mixed
     */
    public static function wrapResult($value)
    {
        if (is_string($value)) {
            //    Error values cannot be "wrapped"
            if (preg_match('/^' . self::CALCULATION_REGEXP_ERROR . '$/i', $value, $match)) {
                //    Return Excel errors "as is"
                return $value;
            }
            //    Return strings wrapped in quotes
            return '"' . $value . '"';
            //    Convert numeric errors to NaN error
        } elseif ((is_float($value)) && ((is_nan($value)) || (is_infinite($value)))) {
            return Calculation\Functions::NAN();
        }

        return $value;
    }

    public function getValueFromCache($cellReference, &$cellValue)
    {
        // Is calculation cacheing enabled?
        // Is the value present in calculation cache?
        $this->debugLog->writeDebugLog('Testing cache value for cell ', $cellReference);
        if (($this->calculationCacheEnabled) && (isset($this->calculationCache[$cellReference]))) {
            $this->debugLog->writeDebugLog('Retrieving value for cell ', $cellReference, ' from cache');
            // Return the cached result
            $cellValue = $this->calculationCache[$cellReference];

            return true;
        }

        return false;
    }

    protected function raiseFormulaError($errorMessage)
    {
        $this->formulaError = $errorMessage;
        $this->cyclicReferenceStack->clear();
        if (!$this->suppressFormulaErrors) {
            throw new Calculation\Exception($errorMessage);
        }
        trigger_error($errorMessage, E_USER_ERROR);
    }

    /**
     * @param string $cellID
     * @param mixed $tokens
     */
    private function processTokenStack($tokens, $cellID = null, Cell $pCell = null)
    {
        if ($tokens == false) {
            return false;
        }

        //    If we're using cell caching, then $pCell may well be flushed back to the cache (which detaches the parent cell collection),
        //        so we store the parent cell collection so that we can re-attach it when necessary
        $pCellWorksheet = ($pCell !== null) ? $pCell->getWorksheet() : null;
        $pCellParent = ($pCell !== null) ? $pCell->getParent() : null;
        $stack = new Calculation\Token\Stack();

        //    Loop through each token in turn
        foreach ($tokens as $tokenData) {
            $token = $tokenData['value'];
            // if the token is a binary operator, pop the top two values off the stack, do the operation, and push the result back on the stack
            if (isset(self::$binaryOperators[$token])) {
                //    We must have two operands, error if we don't
                if (($operand2Data = $stack->pop()) === null) {
                    return $this->raiseFormulaError('Internal error - Operand value missing from stack');
                }
                if (($operand1Data = $stack->pop()) === null) {
                    return $this->raiseFormulaError('Internal error - Operand value missing from stack');
                }

                $operand1 = self::dataTestReference($operand1Data);
                $operand2 = self::dataTestReference($operand2Data);

                //    Log what we're doing
                if ($token == ':') {
                    $this->debugLog->writeDebugLog('Evaluating Range ', $this->showValue($operand1Data['reference']), ' ', $token, ' ', $this->showValue($operand2Data['reference']));
                } else {
                    $this->debugLog->writeDebugLog('Evaluating ', $this->showValue($operand1), ' ', $token, ' ', $this->showValue($operand2));
                }

                //    Process the operation in the appropriate manner
                switch ($token) {
                    //    Comparison (Boolean) Operators
                    case '>':            //    Greater than
                    case '<':            //    Less than
                    case '>=':            //    Greater than or Equal to
                    case '<=':            //    Less than or Equal to
                    case '=':            //    Equality
                    case '<>':            //    Inequality
                        $this->executeBinaryComparisonOperation($cellID, $operand1, $operand2, $token, $stack);
                        break;
                    //    Binary Operators
                    case ':':            //    Range
                        $sheet1 = $sheet2 = '';
                        if (strpos($operand1Data['reference'], '!') !== false) {
                            list($sheet1, $operand1Data['reference']) = explode('!', $operand1Data['reference']);
                        } else {
                            $sheet1 = ($pCellParent !== null) ? $pCellWorksheet->getTitle() : '';
                        }
                        if (strpos($operand2Data['reference'], '!') !== false) {
                            list($sheet2, $operand2Data['reference']) = explode('!', $operand2Data['reference']);
                        } else {
                            $sheet2 = $sheet1;
                        }
                        if ($sheet1 == $sheet2) {
                            if ($operand1Data['reference'] === null) {
                                if ((trim($operand1Data['value']) != '') && (is_numeric($operand1Data['value']))) {
                                    $operand1Data['reference'] = $pCell->getColumn() . $operand1Data['value'];
                                } elseif (trim($operand1Data['reference']) == '') {
                                    $operand1Data['reference'] = $pCell->getCoordinate();
                                } else {
                                    $operand1Data['reference'] = $operand1Data['value'] . $pCell->getRow();
                                }
                            }
                            if ($operand2Data['reference'] === null) {
                                if ((trim($operand2Data['value']) != '') && (is_numeric($operand2Data['value']))) {
                                    $operand2Data['reference'] = $pCell->getColumn() . $operand2Data['value'];
                                } elseif (trim($operand2Data['reference']) == '') {
                                    $operand2Data['reference'] = $pCell->getCoordinate();
                                } else {
                                    $operand2Data['reference'] = $operand2Data['value'] . $pCell->getRow();
                                }
                            }

                            $oData = array_merge(explode(':', $operand1Data['reference']), explode(':', $operand2Data['reference']));
                            $oCol = $oRow = [];
                            foreach ($oData as $oDatum) {
                                $oCR = Cell::coordinateFromString($oDatum);
                                $oCol[] = Cell::columnIndexFromString($oCR[0]) - 1;
                                $oRow[] = $oCR[1];
                            }
                            $cellRef = Cell::stringFromColumnIndex(min($oCol)) . min($oRow) . ':' . Cell::stringFromColumnIndex(max($oCol)) . max($oRow);
                            if ($pCellParent !== null) {
                                $cellValue = $this->extractCellRange($cellRef, $this->spreadsheet->getSheetByName($sheet1), false);
                            } else {
                                return $this->raiseFormulaError('Unable to access Cell Reference');
                            }
                            $stack->push('Cell Reference', $cellValue, $cellRef);
                        } else {
                            $stack->push('Error', Calculation\Functions::REF(), null);
                        }
                        break;
                    case '+':            //    Addition
                        $this->executeNumericBinaryOperation($cellID, $operand1, $operand2, $token, 'plusEquals', $stack);
                        break;
                    case '-':            //    Subtraction
                        $this->executeNumericBinaryOperation($cellID, $operand1, $operand2, $token, 'minusEquals', $stack);
                        break;
                    case '*':            //    Multiplication
                        $this->executeNumericBinaryOperation($cellID, $operand1, $operand2, $token, 'arrayTimesEquals', $stack);
                        break;
                    case '/':            //    Division
                        $this->executeNumericBinaryOperation($cellID, $operand1, $operand2, $token, 'arrayRightDivide', $stack);
                        break;
                    case '^':            //    Exponential
                        $this->executeNumericBinaryOperation($cellID, $operand1, $operand2, $token, 'power', $stack);
                        break;
                    case '&':            //    Concatenation
                        //    If either of the operands is a matrix, we need to treat them both as matrices
                        //        (converting the other operand to a matrix if need be); then perform the required
                        //        matrix operation
                        if (is_bool($operand1)) {
                            $operand1 = ($operand1) ? self::$localeBoolean['TRUE'] : self::$localeBoolean['FALSE'];
                        }
                        if (is_bool($operand2)) {
                            $operand2 = ($operand2) ? self::$localeBoolean['TRUE'] : self::$localeBoolean['FALSE'];
                        }
                        if ((is_array($operand1)) || (is_array($operand2))) {
                            //    Ensure that both operands are arrays/matrices
                            self::checkMatrixOperands($operand1, $operand2, 2);
                            try {
                                //    Convert operand 1 from a PHP array to a matrix
                                $matrix = new Shared\JAMA\Matrix($operand1);
                                //    Perform the required operation against the operand 1 matrix, passing in operand 2
                                $matrixResult = $matrix->concat($operand2);
                                $result = $matrixResult->getArray();
                            } catch (Exception $ex) {
                                $this->debugLog->writeDebugLog('JAMA Matrix Exception: ', $ex->getMessage());
                                $result = '#VALUE!';
                            }
                        } else {
                            $result = '"' . str_replace('""', '"', self::unwrapResult($operand1) . self::unwrapResult($operand2)) . '"';
                        }
                        $this->debugLog->writeDebugLog('Evaluation Result is ', $this->showTypeDetails($result));
                        $stack->push('Value', $result);
                        break;
                    case '|':            //    Intersect
                        $rowIntersect = array_intersect_key($operand1, $operand2);
                        $cellIntersect = $oCol = $oRow = [];
                        foreach (array_keys($rowIntersect) as $row) {
                            $oRow[] = $row;
                            foreach ($rowIntersect[$row] as $col => $data) {
                                $oCol[] = Cell::columnIndexFromString($col) - 1;
                                $cellIntersect[$row] = array_intersect_key($operand1[$row], $operand2[$row]);
                            }
                        }
                        $cellRef = Cell::stringFromColumnIndex(min($oCol)) . min($oRow) . ':' . Cell::stringFromColumnIndex(max($oCol)) . max($oRow);
                        $this->debugLog->writeDebugLog('Evaluation Result is ', $this->showTypeDetails($cellIntersect));
                        $stack->push('Value', $cellIntersect, $cellRef);
                        break;
                }

                // if the token is a unary operator, pop one value off the stack, do the operation, and push it back on
            } elseif (($token === '~') || ($token === '%')) {
                if (($arg = $stack->pop()) === null) {
                    return $this->raiseFormulaError('Internal error - Operand value missing from stack');
                }
                $arg = $arg['value'];
                if ($token === '~') {
                    $this->debugLog->writeDebugLog('Evaluating Negation of ', $this->showValue($arg));
                    $multiplier = -1;
                } else {
                    $this->debugLog->writeDebugLog('Evaluating Percentile of ', $this->showValue($arg));
                    $multiplier = 0.01;
                }
                if (is_array($arg)) {
                    self::checkMatrixOperands($arg, $multiplier, 2);
                    try {
                        $matrix1 = new Shared\JAMA\Matrix($arg);
                        $matrixResult = $matrix1->arrayTimesEquals($multiplier);
                        $result = $matrixResult->getArray();
                    } catch (Exception $ex) {
                        $this->debugLog->writeDebugLog('JAMA Matrix Exception: ', $ex->getMessage());
                        $result = '#VALUE!';
                    }
                    $this->debugLog->writeDebugLog('Evaluation Result is ', $this->showTypeDetails($result));
                    $stack->push('Value', $result);
                } else {
                    $this->executeNumericBinaryOperation($cellID, $multiplier, $arg, '*', 'arrayTimesEquals', $stack);
                }
            } elseif (preg_match('/^' . self::CALCULATION_REGEXP_CELLREF . '$/i', $token, $matches)) {
                $cellRef = null;
                if (isset($matches[8])) {
                    if ($pCell === null) {
                        //                        We can't access the range, so return a REF error
                        $cellValue = Calculation\Functions::REF();
                    } else {
                        $cellRef = $matches[6] . $matches[7] . ':' . $matches[9] . $matches[10];
                        if ($matches[2] > '') {
                            $matches[2] = trim($matches[2], "\"'");
                            if ((strpos($matches[2], '[') !== false) || (strpos($matches[2], ']') !== false)) {
                                //    It's a Reference to an external spreadsheet (not currently supported)
                                return $this->raiseFormulaError('Unable to access External Workbook');
                            }
                            $matches[2] = trim($matches[2], "\"'");
                            $this->debugLog->writeDebugLog('Evaluating Cell Range ', $cellRef, ' in worksheet ', $matches[2]);
                            if ($pCellParent !== null) {
                                $cellValue = $this->extractCellRange($cellRef, $this->spreadsheet->getSheetByName($matches[2]), false);
                            } else {
                                return $this->raiseFormulaError('Unable to access Cell Reference');
                            }
                            $this->debugLog->writeDebugLog('Evaluation Result for cells ', $cellRef, ' in worksheet ', $matches[2], ' is ', $this->showTypeDetails($cellValue));
                        } else {
                            $this->debugLog->writeDebugLog('Evaluating Cell Range ', $cellRef, ' in current worksheet');
                            if ($pCellParent !== null) {
                                $cellValue = $this->extractCellRange($cellRef, $pCellWorksheet, false);
                            } else {
                                return $this->raiseFormulaError('Unable to access Cell Reference');
                            }
                            $this->debugLog->writeDebugLog('Evaluation Result for cells ', $cellRef, ' is ', $this->showTypeDetails($cellValue));
                        }
                    }
                } else {
                    if ($pCell === null) {
                        //                        We can't access the cell, so return a REF error
                        $cellValue = Calculation\Functions::REF();
                    } else {
                        $cellRef = $matches[6] . $matches[7];
                        if ($matches[2] > '') {
                            $matches[2] = trim($matches[2], "\"'");
                            if ((strpos($matches[2], '[') !== false) || (strpos($matches[2], ']') !== false)) {
                                //    It's a Reference to an external spreadsheet (not currently supported)
                                return $this->raiseFormulaError('Unable to access External Workbook');
                            }
                            $this->debugLog->writeDebugLog('Evaluating Cell ', $cellRef, ' in worksheet ', $matches[2]);
                            if ($pCellParent !== null) {
                                $cellSheet = $this->spreadsheet->getSheetByName($matches[2]);
                                if ($cellSheet && $cellSheet->cellExists($cellRef)) {
                                    $cellValue = $this->extractCellRange($cellRef, $this->spreadsheet->getSheetByName($matches[2]), false);
                                    $pCell->attach($pCellParent);
                                } else {
                                    $cellValue = null;
                                }
                            } else {
                                return $this->raiseFormulaError('Unable to access Cell Reference');
                            }
                            $this->debugLog->writeDebugLog('Evaluation Result for cell ', $cellRef, ' in worksheet ', $matches[2], ' is ', $this->showTypeDetails($cellValue));
                        } else {
                            $this->debugLog->writeDebugLog('Evaluating Cell ', $cellRef, ' in current worksheet');
                            if ($pCellParent->isDataSet($cellRef)) {
                                $cellValue = $this->extractCellRange($cellRef, $pCellWorksheet, false);
                                $pCell->attach($pCellParent);
                            } else {
                                $cellValue = null;
                            }
                            $this->debugLog->writeDebugLog('Evaluation Result for cell ', $cellRef, ' is ', $this->showTypeDetails($cellValue));
                        }
                    }
                }
                $stack->push('Value', $cellValue, $cellRef);

                // if the token is a function, pop arguments off the stack, hand them to the function, and push the result back on
            } elseif (preg_match('/^' . self::CALCULATION_REGEXP_FUNCTION . '$/i', $token, $matches)) {
                $functionName = $matches[1];
                $argCount = $stack->pop();
                $argCount = $argCount['value'];
                if ($functionName != 'MKMATRIX') {
                    $this->debugLog->writeDebugLog('Evaluating Function ', self::localeFunc($functionName), '() with ', (($argCount == 0) ? 'no' : $argCount), ' argument', (($argCount == 1) ? '' : 's'));
                }
                if ((isset(self::$phpSpreadsheetFunctions[$functionName])) || (isset(self::$controlFunctions[$functionName]))) {    // function
                    if (isset(self::$phpSpreadsheetFunctions[$functionName])) {
                        $functionCall = self::$phpSpreadsheetFunctions[$functionName]['functionCall'];
                        $passByReference = isset(self::$phpSpreadsheetFunctions[$functionName]['passByReference']);
                        $passCellReference = isset(self::$phpSpreadsheetFunctions[$functionName]['passCellReference']);
                    } elseif (isset(self::$controlFunctions[$functionName])) {
                        $functionCall = self::$controlFunctions[$functionName]['functionCall'];
                        $passByReference = isset(self::$controlFunctions[$functionName]['passByReference']);
                        $passCellReference = isset(self::$controlFunctions[$functionName]['passCellReference']);
                    }
                    // get the arguments for this function
                    $args = $argArrayVals = [];
                    for ($i = 0; $i < $argCount; ++$i) {
                        $arg = $stack->pop();
                        $a = $argCount - $i - 1;
                        if (($passByReference) &&
                            (isset(self::$phpSpreadsheetFunctions[$functionName]['passByReference'][$a])) &&
                            (self::$phpSpreadsheetFunctions[$functionName]['passByReference'][$a])
                        ) {
                            if ($arg['reference'] === null) {
                                $args[] = $cellID;
                                if ($functionName != 'MKMATRIX') {
                                    $argArrayVals[] = $this->showValue($cellID);
                                }
                            } else {
                                $args[] = $arg['reference'];
                                if ($functionName != 'MKMATRIX') {
                                    $argArrayVals[] = $this->showValue($arg['reference']);
                                }
                            }
                        } else {
                            $args[] = self::unwrapResult($arg['value']);
                            if ($functionName != 'MKMATRIX') {
                                $argArrayVals[] = $this->showValue($arg['value']);
                            }
                        }
                    }
                    //    Reverse the order of the arguments
                    krsort($args);
                    if (($passByReference) && ($argCount == 0)) {
                        $args[] = $cellID;
                        $argArrayVals[] = $this->showValue($cellID);
                    }

                    if ($functionName != 'MKMATRIX') {
                        if ($this->debugLog->getWriteDebugLog()) {
                            krsort($argArrayVals);
                            $this->debugLog->writeDebugLog('Evaluating ', self::localeFunc($functionName), '( ', implode(self::$localeArgumentSeparator . ' ', Calculation\Functions::flattenArray($argArrayVals)), ' )');
                        }
                    }

                    //    Process the argument with the appropriate function call
                    if ($passCellReference) {
                        $args[] = $pCell;
                    }

                    if (!is_array($functionCall)) {
                        foreach ($args as &$arg) {
                            $arg = Calculation\Functions::flattenSingleValue($arg);
                        }
                        unset($arg);
                    }

                    $result = call_user_func_array($functionCall, $args);

                    if ($functionName != 'MKMATRIX') {
                        $this->debugLog->writeDebugLog('Evaluation Result for ', self::localeFunc($functionName), '() function call is ', $this->showTypeDetails($result));
                    }
                    $stack->push('Value', self::wrapResult($result));
                }
            } else {
                // if the token is a number, boolean, string or an Excel error, push it onto the stack
                if (isset(self::$excelConstants[strtoupper($token)])) {
                    $excelConstant = strtoupper($token);
                    $stack->push('Constant Value', self::$excelConstants[$excelConstant]);
                    $this->debugLog->writeDebugLog('Evaluating Constant ', $excelConstant, ' as ', $this->showTypeDetails(self::$excelConstants[$excelConstant]));
                } elseif ((is_numeric($token)) || ($token === null) || (is_bool($token)) || ($token == '') || ($token[0] == '"') || ($token[0] == '#')) {
                    $stack->push('Value', $token);
                    // if the token is a named range, push the named range name onto the stack
                } elseif (preg_match('/^' . self::CALCULATION_REGEXP_NAMEDRANGE . '$/i', $token, $matches)) {
                    $namedRange = $matches[6];
                    $this->debugLog->writeDebugLog('Evaluating Named Range ', $namedRange);

                    if (substr($namedRange, 0, 6) === '_xlfn.') {
                        return $this->raiseFormulaError("undefined named range / function '$token'");
                    }

                    $cellValue = $this->extractNamedRange($namedRange, ((null !== $pCell) ? $pCellWorksheet : null), false);
                    $pCell->attach($pCellParent);
                    $this->debugLog->writeDebugLog('Evaluation Result for named range ', $namedRange, ' is ', $this->showTypeDetails($cellValue));
                    $stack->push('Named Range', $cellValue, $namedRange);
                } else {
                    return $this->raiseFormulaError("undefined variable '$token'");
                }
            }
        }
        // when we're out of tokens, the stack should have a single element, the final result
        if ($stack->count() != 1) {
            return $this->raiseFormulaError('internal error');
        }
        $output = $stack->pop();
        $output = $output['value'];

//        if ((is_array($output)) && (self::$returnArrayAsType != self::RETURN_ARRAY_AS_ARRAY)) {
//            return array_shift(Calculation\Functions::flattenArray($output));
//        }
        return $output;
    }

    private static function dataTestReference(&$operandData)
    {
        $operand = $operandData['value'];
        if (($operandData['reference'] === null) && (is_array($operand))) {
            $rKeys = array_keys($operand);
            $rowKey = array_shift($rKeys);
            $cKeys = array_keys(array_keys($operand[$rowKey]));
            $colKey = array_shift($cKeys);
            if (ctype_upper($colKey)) {
                $operandData['reference'] = $colKey . $rowKey;
            }
        }

        return $operand;
    }

    /**
     * Format details of an operand for display in the log (based on operand type).
     *
     * @param mixed $value First matrix operand
     *
     * @return mixed
     */
    private function showValue($value)
    {
        if ($this->debugLog->getWriteDebugLog()) {
            $testArray = Calculation\Functions::flattenArray($value);
            if (count($testArray) == 1) {
                $value = array_pop($testArray);
            }

            if (is_array($value)) {
                $returnMatrix = [];
                $pad = $rpad = ', ';
                foreach ($value as $row) {
                    if (is_array($row)) {
                        $returnMatrix[] = implode($pad, array_map([$this, 'showValue'], $row));
                        $rpad = '; ';
                    } else {
                        $returnMatrix[] = $this->showValue($row);
                    }
                }

                return '{ ' . implode($rpad, $returnMatrix) . ' }';
            } elseif (is_string($value) && (trim($value, '"') == $value)) {
                return '"' . $value . '"';
            } elseif (is_bool($value)) {
                return ($value) ? self::$localeBoolean['TRUE'] : self::$localeBoolean['FALSE'];
            }
        }

        return Calculation\Functions::flattenSingleValue($value);
    }

    private function executeBinaryComparisonOperation($cellID, $operand1, $operand2, $operation, &$stack, $recursingArrays = false)
    {
        //    If we're dealing with matrix operations, we want a matrix result
        if ((is_array($operand1)) || (is_array($operand2))) {
            $result = [];
            if ((is_array($operand1)) && (!is_array($operand2))) {
                foreach ($operand1 as $x => $operandData) {
                    $this->debugLog->writeDebugLog('Evaluating Comparison ', $this->showValue($operandData), ' ', $operation, ' ', $this->showValue($operand2));
                    $this->executeBinaryComparisonOperation($cellID, $operandData, $operand2, $operation, $stack);
                    $r = $stack->pop();
                    $result[$x] = $r['value'];
                }
            } elseif ((!is_array($operand1)) && (is_array($operand2))) {
                foreach ($operand2 as $x => $operandData) {
                    $this->debugLog->writeDebugLog('Evaluating Comparison ', $this->showValue($operand1), ' ', $operation, ' ', $this->showValue($operandData));
                    $this->executeBinaryComparisonOperation($cellID, $operand1, $operandData, $operation, $stack);
                    $r = $stack->pop();
                    $result[$x] = $r['value'];
                }
            } else {
                if (!$recursingArrays) {
                    self::checkMatrixOperands($operand1, $operand2, 2);
                }
                foreach ($operand1 as $x => $operandData) {
                    $this->debugLog->writeDebugLog('Evaluating Comparison ', $this->showValue($operandData), ' ', $operation, ' ', $this->showValue($operand2[$x]));
                    $this->executeBinaryComparisonOperation($cellID, $operandData, $operand2[$x], $operation, $stack, true);
                    $r = $stack->pop();
                    $result[$x] = $r['value'];
                }
            }
            //    Log the result details
            $this->debugLog->writeDebugLog('Comparison Evaluation Result is ', $this->showTypeDetails($result));
            //    And push the result onto the stack
            $stack->push('Array', $result);

            return true;
        }

        //    Simple validate the two operands if they are string values
        if (is_string($operand1) && $operand1 > '' && $operand1[0] == '"') {
            $operand1 = self::unwrapResult($operand1);
        }
        if (is_string($operand2) && $operand2 > '' && $operand2[0] == '"') {
            $operand2 = self::unwrapResult($operand2);
        }

        // Use case insensitive comparaison if not OpenOffice mode
        if (Calculation\Functions::getCompatibilityMode() != Calculation\Functions::COMPATIBILITY_OPENOFFICE) {
            if (is_string($operand1)) {
                $operand1 = strtoupper($operand1);
            }
            if (is_string($operand2)) {
                $operand2 = strtoupper($operand2);
            }
        }

        $useLowercaseFirstComparison = is_string($operand1) && is_string($operand2) && Calculation\Functions::getCompatibilityMode() == Calculation\Functions::COMPATIBILITY_OPENOFFICE;

        //    execute the necessary operation
        switch ($operation) {
            //    Greater than
            case '>':
                if ($useLowercaseFirstComparison) {
                    $result = $this->strcmpLowercaseFirst($operand1, $operand2) > 0;
                } else {
                    $result = ($operand1 > $operand2);
                }
                break;
            //    Less than
            case '<':
                if ($useLowercaseFirstComparison) {
                    $result = $this->strcmpLowercaseFirst($operand1, $operand2) < 0;
                } else {
                    $result = ($operand1 < $operand2);
                }
                break;
            //    Equality
            case '=':
                if (is_numeric($operand1) && is_numeric($operand2)) {
                    $result = (abs($operand1 - $operand2) < $this->delta);
                } else {
                    $result = strcmp($operand1, $operand2) == 0;
                }
                break;
            //    Greater than or equal
            case '>=':
                if (is_numeric($operand1) && is_numeric($operand2)) {
                    $result = ((abs($operand1 - $operand2) < $this->delta) || ($operand1 > $operand2));
                } elseif ($useLowercaseFirstComparison) {
                    $result = $this->strcmpLowercaseFirst($operand1, $operand2) >= 0;
                } else {
                    $result = strcmp($operand1, $operand2) >= 0;
                }
                break;
            //    Less than or equal
            case '<=':
                if (is_numeric($operand1) && is_numeric($operand2)) {
                    $result = ((abs($operand1 - $operand2) < $this->delta) || ($operand1 < $operand2));
                } elseif ($useLowercaseFirstComparison) {
                    $result = $this->strcmpLowercaseFirst($operand1, $operand2) <= 0;
                } else {
                    $result = strcmp($operand1, $operand2) <= 0;
                }
                break;
            //    Inequality
            case '<>':
                if (is_numeric($operand1) && is_numeric($operand2)) {
                    $result = (abs($operand1 - $operand2) > 1E-14);
                } else {
                    $result = strcmp($operand1, $operand2) != 0;
                }
                break;
        }

        //    Log the result details
        $this->debugLog->writeDebugLog('Evaluation Result is ', $this->showTypeDetails($result));
        //    And push the result onto the stack
        $stack->push('Value', $result);

        return true;
    }

    /**
     * Ensure that paired matrix operands are both matrices and of the same size.
     *
     * @param mixed &$operand1 First matrix operand
     * @param mixed &$operand2 Second matrix operand
     * @param int $resize Flag indicating whether the matrices should be resized to match
     *                                        and (if so), whether the smaller dimension should grow or the
     *                                        larger should shrink.
     *                                            0 = no resize
     *                                            1 = shrink to fit
     *                                            2 = extend to fit
     */
    private static function checkMatrixOperands(&$operand1, &$operand2, $resize = 1)
    {
        //    Examine each of the two operands, and turn them into an array if they aren't one already
        //    Note that this function should only be called if one or both of the operand is already an array
        if (!is_array($operand1)) {
            list($matrixRows, $matrixColumns) = self::getMatrixDimensions($operand2);
            $operand1 = array_fill(0, $matrixRows, array_fill(0, $matrixColumns, $operand1));
            $resize = 0;
        } elseif (!is_array($operand2)) {
            list($matrixRows, $matrixColumns) = self::getMatrixDimensions($operand1);
            $operand2 = array_fill(0, $matrixRows, array_fill(0, $matrixColumns, $operand2));
            $resize = 0;
        }

        list($matrix1Rows, $matrix1Columns) = self::getMatrixDimensions($operand1);
        list($matrix2Rows, $matrix2Columns) = self::getMatrixDimensions($operand2);
        if (($matrix1Rows == $matrix2Columns) && ($matrix2Rows == $matrix1Columns)) {
            $resize = 1;
        }

        if ($resize == 2) {
            //    Given two matrices of (potentially) unequal size, convert the smaller in each dimension to match the larger
            self::resizeMatricesExtend($operand1, $operand2, $matrix1Rows, $matrix1Columns, $matrix2Rows, $matrix2Columns);
        } elseif ($resize == 1) {
            //    Given two matrices of (potentially) unequal size, convert the larger in each dimension to match the smaller
            self::resizeMatricesShrink($operand1, $operand2, $matrix1Rows, $matrix1Columns, $matrix2Rows, $matrix2Columns);
        }

        return [$matrix1Rows, $matrix1Columns, $matrix2Rows, $matrix2Columns];
    }

    /**
     * Read the dimensions of a matrix, and re-index it with straight numeric keys starting from row 0, column 0.
     *
     * @param mixed &$matrix matrix operand
     *
     * @return int[] An array comprising the number of rows, and number of columns
     */
    private static function getMatrixDimensions(&$matrix)
    {
        $matrixRows = count($matrix);
        $matrixColumns = 0;
        foreach ($matrix as $rowKey => $rowValue) {
            $matrixColumns = max(count($rowValue), $matrixColumns);
            if (!is_array($rowValue)) {
                $matrix[$rowKey] = [$rowValue];
            } else {
                $matrix[$rowKey] = array_values($rowValue);
            }
        }
        $matrix = array_values($matrix);

        return [$matrixRows, $matrixColumns];
    }

    /**
     * Ensure that paired matrix operands are both matrices of the same size.
     *
     * @param mixed &$matrix1 First matrix operand
     * @param mixed &$matrix2 Second matrix operand
     * @param int $matrix1Rows Row size of first matrix operand
     * @param int $matrix1Columns Column size of first matrix operand
     * @param int $matrix2Rows Row size of second matrix operand
     * @param int $matrix2Columns Column size of second matrix operand
     */
    private static function resizeMatricesExtend(&$matrix1, &$matrix2, $matrix1Rows, $matrix1Columns, $matrix2Rows, $matrix2Columns)
    {
        if (($matrix2Columns < $matrix1Columns) || ($matrix2Rows < $matrix1Rows)) {
            if ($matrix2Columns < $matrix1Columns) {
                for ($i = 0; $i < $matrix2Rows; ++$i) {
                    $x = $matrix2[$i][$matrix2Columns - 1];
                    for ($j = $matrix2Columns; $j < $matrix1Columns; ++$j) {
                        $matrix2[$i][$j] = $x;
                    }
                }
            }
            if ($matrix2Rows < $matrix1Rows) {
                $x = $matrix2[$matrix2Rows - 1];
                for ($i = 0; $i < $matrix1Rows; ++$i) {
                    $matrix2[$i] = $x;
                }
            }
        }

        if (($matrix1Columns < $matrix2Columns) || ($matrix1Rows < $matrix2Rows)) {
            if ($matrix1Columns < $matrix2Columns) {
                for ($i = 0; $i < $matrix1Rows; ++$i) {
                    $x = $matrix1[$i][$matrix1Columns - 1];
                    for ($j = $matrix1Columns; $j < $matrix2Columns; ++$j) {
                        $matrix1[$i][$j] = $x;
                    }
                }
            }
            if ($matrix1Rows < $matrix2Rows) {
                $x = $matrix1[$matrix1Rows - 1];
                for ($i = 0; $i < $matrix2Rows; ++$i) {
                    $matrix1[$i] = $x;
                }
            }
        }
    }

    /**
     * Ensure that paired matrix operands are both matrices of the same size.
     *
     * @param mixed &$matrix1 First matrix operand
     * @param mixed &$matrix2 Second matrix operand
     * @param int $matrix1Rows Row size of first matrix operand
     * @param int $matrix1Columns Column size of first matrix operand
     * @param int $matrix2Rows Row size of second matrix operand
     * @param int $matrix2Columns Column size of second matrix operand
     */
    private static function resizeMatricesShrink(&$matrix1, &$matrix2, $matrix1Rows, $matrix1Columns, $matrix2Rows, $matrix2Columns)
    {
        if (($matrix2Columns < $matrix1Columns) || ($matrix2Rows < $matrix1Rows)) {
            if ($matrix2Rows < $matrix1Rows) {
                for ($i = $matrix2Rows; $i < $matrix1Rows; ++$i) {
                    unset($matrix1[$i]);
                }
            }
            if ($matrix2Columns < $matrix1Columns) {
                for ($i = 0; $i < $matrix1Rows; ++$i) {
                    for ($j = $matrix2Columns; $j < $matrix1Columns; ++$j) {
                        unset($matrix1[$i][$j]);
                    }
                }
            }
        }

        if (($matrix1Columns < $matrix2Columns) || ($matrix1Rows < $matrix2Rows)) {
            if ($matrix1Rows < $matrix2Rows) {
                for ($i = $matrix1Rows; $i < $matrix2Rows; ++$i) {
                    unset($matrix2[$i]);
                }
            }
            if ($matrix1Columns < $matrix2Columns) {
                for ($i = 0; $i < $matrix2Rows; ++$i) {
                    for ($j = $matrix1Columns; $j < $matrix2Columns; ++$j) {
                        unset($matrix2[$i][$j]);
                    }
                }
            }
        }
    }

    /**
     * Format type and details of an operand for display in the log (based on operand type).
     *
     * @param mixed $value First matrix operand
     *
     * @return string|null
     */
    private function showTypeDetails($value)
    {
        if ($this->debugLog->getWriteDebugLog()) {
            $testArray = Calculation\Functions::flattenArray($value);
            if (count($testArray) == 1) {
                $value = array_pop($testArray);
            }

            if ($value === null) {
                return 'a NULL value';
            } elseif (is_float($value)) {
                $typeString = 'a floating point number';
            } elseif (is_int($value)) {
                $typeString = 'an integer number';
            } elseif (is_bool($value)) {
                $typeString = 'a boolean';
            } elseif (is_array($value)) {
                $typeString = 'a matrix';
            } else {
                if ($value == '') {
                    return 'an empty string';
                } elseif ($value[0] == '#') {
                    return 'a ' . $value . ' error';
                }
                $typeString = 'a string';
            }

            return $typeString . ' with a value of ' . $this->showValue($value);
        }
    }

    //    Binary Operators
    //    These operators always work on two values
    //    Array key is the operator, the value indicates whether this is a left or right associative operator

    /**
     * Compare two strings in the same way as strcmp() except that lowercase come before uppercase letters.
     *
     * @param string $str1 First string value for the comparison
     * @param string $str2 Second string value for the comparison
     *
     * @return int
     */
    private function strcmpLowercaseFirst($str1, $str2)
    {
        $inversedStr1 = Shared\StringHelper::strCaseReverse($str1);
        $inversedStr2 = Shared\StringHelper::strCaseReverse($str2);

        return strcmp($inversedStr1, $inversedStr2);
    }

    //    Comparison (Boolean) Operators
    //    These operators work on two values, but always return a boolean result

    /**
     * Extract range values.
     *
     * @param string &$pRange String based range representation
     * @param Worksheet $pSheet Worksheet
     * @param bool $resetLog Flag indicating whether calculation log should be reset or not
     *
     * @throws Calculation\Exception
     *
     * @return mixed Array of values in range if range contains more than one element. Otherwise, a single value is returned.
     */
    public function extractCellRange(&$pRange = 'A1', Worksheet $pSheet = null, $resetLog = true)
    {
        // Return value
        $returnValue = [];

        if ($pSheet !== null) {
            $pSheetName = $pSheet->getTitle();
            if (strpos($pRange, '!') !== false) {
                list($pSheetName, $pRange) = Worksheet::extractSheetTitle($pRange, true);
                $pSheet = $this->spreadsheet->getSheetByName($pSheetName);
            }

            // Extract range
            $aReferences = Cell::extractAllCellReferencesInRange($pRange);
            $pRange = $pSheetName . '!' . $pRange;
            if (!isset($aReferences[1])) {
                //    Single cell in range
                sscanf($aReferences[0], '%[A-Z]%d', $currentCol, $currentRow);
                if ($pSheet->cellExists($aReferences[0])) {
                    $returnValue[$currentRow][$currentCol] = $pSheet->getCell($aReferences[0])->getCalculatedValue($resetLog);
                } else {
                    $returnValue[$currentRow][$currentCol] = null;
                }
            } else {
                // Extract cell data for all cells in the range
                foreach ($aReferences as $reference) {
                    // Extract range
                    sscanf($reference, '%[A-Z]%d', $currentCol, $currentRow);
                    if ($pSheet->cellExists($reference)) {
                        $returnValue[$currentRow][$currentCol] = $pSheet->getCell($reference)->getCalculatedValue($resetLog);
                    } else {
                        $returnValue[$currentRow][$currentCol] = null;
                    }
                }
            }
        }

        return $returnValue;
    }

    //    Operator Precedence
    //    This list includes all valid operators, whether binary (including boolean) or unary (such as %)
    //    Array key is the operator, the value is its precedence

    /**
     * @param string $matrixFunction
     * @param mixed $cellID
     * @param mixed $operand1
     * @param mixed $operand2
     * @param mixed $operation
     */
    private function executeNumericBinaryOperation($cellID, $operand1, $operand2, $operation, $matrixFunction, &$stack)
    {
        //    Validate the two operands
        if (!$this->validateBinaryOperand($cellID, $operand1, $stack)) {
            return false;
        }
        if (!$this->validateBinaryOperand($cellID, $operand2, $stack)) {
            return false;
        }

        //    If either of the operands is a matrix, we need to treat them both as matrices
        //        (converting the other operand to a matrix if need be); then perform the required
        //        matrix operation
        if ((is_array($operand1)) || (is_array($operand2))) {
            //    Ensure that both operands are arrays/matrices of the same size
            self::checkMatrixOperands($operand1, $operand2, 2);

            try {
                //    Convert operand 1 from a PHP array to a matrix
                $matrix = new Shared\JAMA\Matrix($operand1);
                //    Perform the required operation against the operand 1 matrix, passing in operand 2
                $matrixResult = $matrix->$matrixFunction($operand2);
                $result = $matrixResult->getArray();
            } catch (Exception $ex) {
                $this->debugLog->writeDebugLog('JAMA Matrix Exception: ', $ex->getMessage());
                $result = '#VALUE!';
            }
        } else {
            if ((Calculation\Functions::getCompatibilityMode() != Calculation\Functions::COMPATIBILITY_OPENOFFICE) &&
                ((is_string($operand1) && !is_numeric($operand1) && strlen($operand1) > 0) ||
                    (is_string($operand2) && !is_numeric($operand2) && strlen($operand2) > 0))
            ) {
                $result = Calculation\Functions::VALUE();
            } else {
                //    If we're dealing with non-matrix operations, execute the necessary operation
                switch ($operation) {
                    //    Addition
                    case '+':
                        $result = $operand1 + $operand2;
                        break;
                    //    Subtraction
                    case '-':
                        $result = $operand1 - $operand2;
                        break;
                    //    Multiplication
                    case '*':
                        $result = $operand1 * $operand2;
                        break;
                    //    Division
                    case '/':
                        if ($operand2 == 0) {
                            //    Trap for Divide by Zero error
                            $stack->push('Value', '#DIV/0!');
                            $this->debugLog->writeDebugLog('Evaluation Result is ', $this->showTypeDetails('#DIV/0!'));

                            return false;
                        }
                        $result = $operand1 / $operand2;

                        break;
                    //    Power
                    case '^':
                        $result = pow($operand1, $operand2);
                        break;
                }
            }
        }

        //    Log the result details
        $this->debugLog->writeDebugLog('Evaluation Result is ', $this->showTypeDetails($result));
        //    And push the result onto the stack
        $stack->push('Value', $result);

        return true;
    }

    // Convert infix to postfix notation

    private function validateBinaryOperand($cellID, &$operand, &$stack)
    {
        if (is_array($operand)) {
            if ((count($operand, COUNT_RECURSIVE) - count($operand)) == 1) {
                do {
                    $operand = array_pop($operand);
                } while (is_array($operand));
            }
        }
        //    Numbers, matrices and booleans can pass straight through, as they're already valid
        if (is_string($operand)) {
            //    We only need special validations for the operand if it is a string
            //    Start by stripping off the quotation marks we use to identify true excel string values internally
            if ($operand > '' && $operand[0] == '"') {
                $operand = self::unwrapResult($operand);
            }
            //    If the string is a numeric value, we treat it as a numeric, so no further testing
            if (!is_numeric($operand)) {
                //    If not a numeric, test to see if the value is an Excel error, and so can't be used in normal binary operations
                if ($operand > '' && $operand[0] == '#') {
                    $stack->push('Value', $operand);
                    $this->debugLog->writeDebugLog('Evaluation Result is ', $this->showTypeDetails($operand));

                    return false;
                } elseif (!Shared\StringHelper::convertToNumberIfFraction($operand)) {
                    //    If not a numeric or a fraction, then it's a text string, and so can't be used in mathematical binary operations
                    $stack->push('Value', '#VALUE!');
                    $this->debugLog->writeDebugLog('Evaluation Result is a ', $this->showTypeDetails('#VALUE!'));

                    return false;
                }
            }
        }

        //    return a true if the value of the operand is one that we can use in normal binary operations
        return true;
    }

    public static function localeFunc($function)
    {
        if (self::$localeLanguage !== 'en_us') {
            $functionName = trim($function, '(');
            if (isset(self::$localeFunctions[$functionName])) {
                $brace = ($functionName != $function);
                $function = self::$localeFunctions[$functionName];
                if ($brace) {
                    $function .= '(';
                }
            }
        }

        return $function;
    }

    // evaluate postfix notation

    /**
     * Extract range values.
     *
     * @param string &$pRange String based range representation
     * @param Worksheet $pSheet Worksheet
     * @param bool $resetLog Flag indicating whether calculation log should be reset or not
     *
     * @throws Calculation\Exception
     *
     * @return mixed Array of values in range if range contains more than one element. Otherwise, a single value is returned.
     */
    public function extractNamedRange(&$pRange = 'A1', Worksheet $pSheet = null, $resetLog = true)
    {
        // Return value
        $returnValue = [];

        if ($pSheet !== null) {
            $pSheetName = $pSheet->getTitle();
            if (strpos($pRange, '!') !== false) {
                list($pSheetName, $pRange) = Worksheet::extractSheetTitle($pRange, true);
                $pSheet = $this->spreadsheet->getSheetByName($pSheetName);
            }

            // Named range?
            $namedRange = NamedRange::resolveRange($pRange, $pSheet);
            if ($namedRange !== null) {
                $pSheet = $namedRange->getWorksheet();
                $pRange = $namedRange->getRange();
                $splitRange = Cell::splitRange($pRange);
                //    Convert row and column references
                if (ctype_alpha($splitRange[0][0])) {
                    $pRange = $splitRange[0][0] . '1:' . $splitRange[0][1] . $namedRange->getWorksheet()->getHighestRow();
                } elseif (ctype_digit($splitRange[0][0])) {
                    $pRange = 'A' . $splitRange[0][0] . ':' . $namedRange->getWorksheet()->getHighestColumn() . $splitRange[0][1];
                }
            } else {
                return Calculation\Functions::REF();
            }

            // Extract range
            $aReferences = Cell::extractAllCellReferencesInRange($pRange);
            if (!isset($aReferences[1])) {
                //    Single cell (or single column or row) in range
                list($currentCol, $currentRow) = Cell::coordinateFromString($aReferences[0]);
                if ($pSheet->cellExists($aReferences[0])) {
                    $returnValue[$currentRow][$currentCol] = $pSheet->getCell($aReferences[0])->getCalculatedValue($resetLog);
                } else {
                    $returnValue[$currentRow][$currentCol] = null;
                }
            } else {
                // Extract cell data for all cells in the range
                foreach ($aReferences as $reference) {
                    // Extract range
                    list($currentCol, $currentRow) = Cell::coordinateFromString($reference);
                    if ($pSheet->cellExists($reference)) {
                        $returnValue[$currentRow][$currentCol] = $pSheet->getCell($reference)->getCalculatedValue($resetLog);
                    } else {
                        $returnValue[$currentRow][$currentCol] = null;
                    }
                }
            }
        }

        return $returnValue;
    }

    private function _parseFormula($formula, Cell $pCell = null)
    {
        if (($formula = $this->convertMatrixReferences(trim($formula))) === false) {
            return false;
        }

        //    If we're using cell caching, then $pCell may well be flushed back to the cache (which detaches the parent worksheet),
        //        so we store the parent worksheet so that we can re-attach it when necessary
        $pCellParent = ($pCell !== null) ? $pCell->getWorksheet() : null;

        $regexpMatchString = '/^(' . self::CALCULATION_REGEXP_FUNCTION .
            '|' . self::CALCULATION_REGEXP_CELLREF .
            '|' . self::CALCULATION_REGEXP_NUMBER .
            '|' . self::CALCULATION_REGEXP_STRING .
            '|' . self::CALCULATION_REGEXP_OPENBRACE .
            '|' . self::CALCULATION_REGEXP_NAMEDRANGE .
            '|' . self::CALCULATION_REGEXP_ERROR .
            ')/si';

        //    Start with initialisation
        $index = 0;
        $stack = new Calculation\Token\Stack();
        $output = [];
        $expectingOperator = false; //    We use this test in syntax-checking the expression to determine when a
        //        - is a negation or + is a positive operator rather than an operation
        $expectingOperand = false; //    We use this test in syntax-checking the expression to determine whether an operand
        //        should be null in a function call
        //    The guts of the lexical parser
        //    Loop through the formula extracting each operator and operand in turn
        while (true) {
            $opCharacter = $formula[$index]; //    Get the first character of the value at the current index position
            if ((isset(self::$comparisonOperators[$opCharacter])) && (strlen($formula) > $index) && (isset(self::$comparisonOperators[$formula[$index + 1]]))) {
                $opCharacter .= $formula[++$index];
            }

            //    Find out if we're currently at the beginning of a number, variable, cell reference, function, parenthesis or operand
            $isOperandOrFunction = preg_match($regexpMatchString, substr($formula, $index), $match);

            if ($opCharacter == '-' && !$expectingOperator) {                //    Is it a negation instead of a minus?
                $stack->push('Unary Operator', '~'); //    Put a negation on the stack
                ++$index; //        and drop the negation symbol
            } elseif ($opCharacter == '%' && $expectingOperator) {
                $stack->push('Unary Operator', '%'); //    Put a percentage on the stack
                ++$index;
            } elseif ($opCharacter == '+' && !$expectingOperator) {            //    Positive (unary plus rather than binary operator plus) can be discarded?
                ++$index; //    Drop the redundant plus symbol
            } elseif ((($opCharacter == '~') || ($opCharacter == '|')) && (!$isOperandOrFunction)) {    //    We have to explicitly deny a tilde or pipe, because they are legal
                return $this->raiseFormulaError("Formula Error: Illegal character '~'"); //        on the stack but not in the input expression
            } elseif ((isset(self::$operators[$opCharacter]) or $isOperandOrFunction) && $expectingOperator) {    //    Are we putting an operator on the stack?
                while ($stack->count() > 0 &&
                    ($o2 = $stack->last()) &&
                    isset(self::$operators[$o2['value']]) &&
                    @(self::$operatorAssociativity[$opCharacter] ? self::$operatorPrecedence[$opCharacter] < self::$operatorPrecedence[$o2['value']] : self::$operatorPrecedence[$opCharacter] <= self::$operatorPrecedence[$o2['value']])) {
                    $output[] = $stack->pop(); //    Swap operands and higher precedence operators from the stack to the output
                }
                $stack->push('Binary Operator', $opCharacter); //    Finally put our current operator onto the stack
                ++$index;
                $expectingOperator = false;
            } elseif ($opCharacter == ')' && $expectingOperator) {            //    Are we expecting to close a parenthesis?
                $expectingOperand = false;
                while (($o2 = $stack->pop()) && $o2['value'] != '(') {        //    Pop off the stack back to the last (
                    if ($o2 === null) {
                        return $this->raiseFormulaError('Formula Error: Unexpected closing brace ")"');
                    }
                    $output[] = $o2;
                }
                $d = $stack->last(2);
                if (preg_match('/^' . self::CALCULATION_REGEXP_FUNCTION . '$/i', $d['value'], $matches)) {    //    Did this parenthesis just close a function?
                    $functionName = $matches[1]; //    Get the function name
                    $d = $stack->pop();
                    $argumentCount = $d['value']; //    See how many arguments there were (argument count is the next value stored on the stack)
                    $output[] = $d; //    Dump the argument count on the output
                    $output[] = $stack->pop(); //    Pop the function and push onto the output
                    if (isset(self::$controlFunctions[$functionName])) {
                        $expectedArgumentCount = self::$controlFunctions[$functionName]['argumentCount'];
                        $functionCall = self::$controlFunctions[$functionName]['functionCall'];
                    } elseif (isset(self::$phpSpreadsheetFunctions[$functionName])) {
                        $expectedArgumentCount = self::$phpSpreadsheetFunctions[$functionName]['argumentCount'];
                        $functionCall = self::$phpSpreadsheetFunctions[$functionName]['functionCall'];
                    } else {    // did we somehow push a non-function on the stack? this should never happen
                        return $this->raiseFormulaError('Formula Error: Internal error, non-function on stack');
                    }
                    //    Check the argument count
                    $argumentCountError = false;
                    if (is_numeric($expectedArgumentCount)) {
                        if ($expectedArgumentCount < 0) {
                            if ($argumentCount > abs($expectedArgumentCount)) {
                                $argumentCountError = true;
                                $expectedArgumentCountString = 'no more than ' . abs($expectedArgumentCount);
                            }
                        } else {
                            if ($argumentCount != $expectedArgumentCount) {
                                $argumentCountError = true;
                                $expectedArgumentCountString = $expectedArgumentCount;
                            }
                        }
                    } elseif ($expectedArgumentCount != '*') {
                        $isOperandOrFunction = preg_match('/(\d*)([-+,])(\d*)/', $expectedArgumentCount, $argMatch);
                        switch ($argMatch[2]) {
                            case '+':
                                if ($argumentCount < $argMatch[1]) {
                                    $argumentCountError = true;
                                    $expectedArgumentCountString = $argMatch[1] . ' or more ';
                                }
                                break;
                            case '-':
                                if (($argumentCount < $argMatch[1]) || ($argumentCount > $argMatch[3])) {
                                    $argumentCountError = true;
                                    $expectedArgumentCountString = 'between ' . $argMatch[1] . ' and ' . $argMatch[3];
                                }
                                break;
                            case ',':
                                if (($argumentCount != $argMatch[1]) && ($argumentCount != $argMatch[3])) {
                                    $argumentCountError = true;
                                    $expectedArgumentCountString = 'either ' . $argMatch[1] . ' or ' . $argMatch[3];
                                }
                                break;
                        }
                    }
                    if ($argumentCountError) {
                        return $this->raiseFormulaError("Formula Error: Wrong number of arguments for $functionName() function: $argumentCount given, " . $expectedArgumentCountString . ' expected');
                    }
                }
                ++$index;
            } elseif ($opCharacter == ',') {            //    Is this the separator for function arguments?
                while (($o2 = $stack->pop()) && $o2['value'] != '(') {        //    Pop off the stack back to the last (
                    if ($o2 === null) {
                        return $this->raiseFormulaError('Formula Error: Unexpected ,');
                    }
                    $output[] = $o2; // pop the argument expression stuff and push onto the output
                }
                //    If we've a comma when we're expecting an operand, then what we actually have is a null operand;
                //        so push a null onto the stack
                if (($expectingOperand) || (!$expectingOperator)) {
                    $output[] = ['type' => 'NULL Value', 'value' => self::$excelConstants['NULL'], 'reference' => null];
                }
                // make sure there was a function
                $d = $stack->last(2);
                if (!preg_match('/^' . self::CALCULATION_REGEXP_FUNCTION . '$/i', $d['value'], $matches)) {
                    return $this->raiseFormulaError('Formula Error: Unexpected ,');
                }
                $d = $stack->pop();
                $stack->push($d['type'], ++$d['value'], $d['reference']); // increment the argument count
                $stack->push('Brace', '('); // put the ( back on, we'll need to pop back to it again
                $expectingOperator = false;
                $expectingOperand = true;
                ++$index;
            } elseif ($opCharacter == '(' && !$expectingOperator) {
                $stack->push('Brace', '(');
                ++$index;
            } elseif ($isOperandOrFunction && !$expectingOperator) {    // do we now have a function/variable/number?
                $expectingOperator = true;
                $expectingOperand = false;
                $val = $match[1];
                $length = strlen($val);

                if (preg_match('/^' . self::CALCULATION_REGEXP_FUNCTION . '$/i', $val, $matches)) {
                    $val = preg_replace('/\s/u', '', $val);
                    if (isset(self::$phpSpreadsheetFunctions[strtoupper($matches[1])]) || isset(self::$controlFunctions[strtoupper($matches[1])])) {    // it's a function
                        $stack->push('Function', strtoupper($val));
                        $ax = preg_match('/^\s*(\s*\))/ui', substr($formula, $index + $length), $amatch);
                        if ($ax) {
                            $stack->push('Operand Count for Function ' . strtoupper($val) . ')', 0);
                            $expectingOperator = true;
                        } else {
                            $stack->push('Operand Count for Function ' . strtoupper($val) . ')', 1);
                            $expectingOperator = false;
                        }
                        $stack->push('Brace', '(');
                    } else {    // it's a var w/ implicit multiplication
                        $output[] = ['type' => 'Value', 'value' => $matches[1], 'reference' => null];
                    }
                } elseif (preg_match('/^' . self::CALCULATION_REGEXP_CELLREF . '$/i', $val, $matches)) {
                    //    Watch for this case-change when modifying to allow cell references in different worksheets...
                    //    Should only be applied to the actual cell column, not the worksheet name

                    //    If the last entry on the stack was a : operator, then we have a cell range reference
                    $testPrevOp = $stack->last(1);
                    if ($testPrevOp['value'] == ':') {
                        //    If we have a worksheet reference, then we're playing with a 3D reference
                        if ($matches[2] == '') {
                            //    Otherwise, we 'inherit' the worksheet reference from the start cell reference
                            //    The start of the cell range reference should be the last entry in $output
                            $startCellRef = $output[count($output) - 1]['value'];
                            preg_match('/^' . self::CALCULATION_REGEXP_CELLREF . '$/i', $startCellRef, $startMatches);
                            if ($startMatches[2] > '') {
                                $val = $startMatches[2] . '!' . $val;
                            }
                        } else {
                            return $this->raiseFormulaError('3D Range references are not yet supported');
                        }
                    }

                    $output[] = ['type' => 'Cell Reference', 'value' => $val, 'reference' => $val];
                } else {    // it's a variable, constant, string, number or boolean
                    //    If the last entry on the stack was a : operator, then we may have a row or column range reference
                    $testPrevOp = $stack->last(1);
                    if ($testPrevOp['value'] == ':') {
                        $startRowColRef = $output[count($output) - 1]['value'];
                        $rangeWS1 = '';
                        if (strpos('!', $startRowColRef) !== false) {
                            list($rangeWS1, $startRowColRef) = explode('!', $startRowColRef);
                        }
                        if ($rangeWS1 != '') {
                            $rangeWS1 .= '!';
                        }
                        $rangeWS2 = $rangeWS1;
                        if (strpos('!', $val) !== false) {
                            list($rangeWS2, $val) = explode('!', $val);
                        }
                        if ($rangeWS2 != '') {
                            $rangeWS2 .= '!';
                        }
                        if ((is_int($startRowColRef)) && (ctype_digit($val)) &&
                            ($startRowColRef <= 1048576) && ($val <= 1048576)
                        ) {
                            //    Row range
                            $endRowColRef = ($pCellParent !== null) ? $pCellParent->getHighestColumn() : 'XFD'; //    Max 16,384 columns for Excel2007
                            $output[count($output) - 1]['value'] = $rangeWS1 . 'A' . $startRowColRef;
                            $val = $rangeWS2 . $endRowColRef . $val;
                        } elseif ((ctype_alpha($startRowColRef)) && (ctype_alpha($val)) &&
                            (strlen($startRowColRef) <= 3) && (strlen($val) <= 3)
                        ) {
                            //    Column range
                            $endRowColRef = ($pCellParent !== null) ? $pCellParent->getHighestRow() : 1048576; //    Max 1,048,576 rows for Excel2007
                            $output[count($output) - 1]['value'] = $rangeWS1 . strtoupper($startRowColRef) . '1';
                            $val = $rangeWS2 . $val . $endRowColRef;
                        }
                    }

                    $localeConstant = false;
                    if ($opCharacter == '"') {
                        //    UnEscape any quotes within the string
                        $val = self::wrapResult(str_replace('""', '"', self::unwrapResult($val)));
                    } elseif (is_numeric($val)) {
                        if ((strpos($val, '.') !== false) || (stripos($val, 'e') !== false) || ($val > PHP_INT_MAX) || ($val < -PHP_INT_MAX)) {
                            $val = (float)$val;
                        } else {
                            $val = (int)$val;
                        }
                    } elseif (isset(self::$excelConstants[trim(strtoupper($val))])) {
                        $excelConstant = trim(strtoupper($val));
                        $val = self::$excelConstants[$excelConstant];
                    } elseif (($localeConstant = array_search(trim(strtoupper($val)), self::$localeBoolean)) !== false) {
                        $val = self::$excelConstants[$localeConstant];
                    }
                    $details = ['type' => 'Value', 'value' => $val, 'reference' => null];
                    if ($localeConstant) {
                        $details['localeValue'] = $localeConstant;
                    }
                    $output[] = $details;
                }
                $index += $length;
            } elseif ($opCharacter == '$') {    // absolute row or column range
                ++$index;
            } elseif ($opCharacter == ')') {    // miscellaneous error checking
                if ($expectingOperand) {
                    $output[] = ['type' => 'NULL Value', 'value' => self::$excelConstants['NULL'], 'reference' => null];
                    $expectingOperand = false;
                    $expectingOperator = true;
                } else {
                    return $this->raiseFormulaError("Formula Error: Unexpected ')'");
                }
            } elseif (isset(self::$operators[$opCharacter]) && !$expectingOperator) {
                return $this->raiseFormulaError("Formula Error: Unexpected operator '$opCharacter'");
            } else {    // I don't even want to know what you did to get here
                return $this->raiseFormulaError('Formula Error: An unexpected error occured');
            }
            //    Test for end of formula string
            if ($index == strlen($formula)) {
                //    Did we end with an operator?.
                //    Only valid for the % unary operator
                if ((isset(self::$operators[$opCharacter])) && ($opCharacter != '%')) {
                    return $this->raiseFormulaError("Formula Error: Operator '$opCharacter' has no operands");
                }
                break;
            }
            //    Ignore white space
            while (($formula[$index] == "\n") || ($formula[$index] == "\r")) {
                ++$index;
            }
            if ($formula[$index] == ' ') {
                while ($formula[$index] == ' ') {
                    ++$index;
                }
                //    If we're expecting an operator, but only have a space between the previous and next operands (and both are
                //        Cell References) then we have an INTERSECTION operator
                if (($expectingOperator) && (preg_match('/^' . self::CALCULATION_REGEXP_CELLREF . '.*/Ui', substr($formula, $index), $match)) &&
                    ($output[count($output) - 1]['type'] == 'Cell Reference')
                ) {
                    while ($stack->count() > 0 &&
                        ($o2 = $stack->last()) &&
                        isset(self::$operators[$o2['value']]) &&
                        @(self::$operatorAssociativity[$opCharacter] ? self::$operatorPrecedence[$opCharacter] < self::$operatorPrecedence[$o2['value']] : self::$operatorPrecedence[$opCharacter] <= self::$operatorPrecedence[$o2['value']])) {
                        $output[] = $stack->pop(); //    Swap operands and higher precedence operators from the stack to the output
                    }
                    $stack->push('Binary Operator', '|'); //    Put an Intersect Operator on the stack
                    $expectingOperator = false;
                }
            }
        }

        while (($op = $stack->pop()) !== null) {    // pop everything off the stack and push onto output
            if ((is_array($op) && $op['value'] == '(') || ($op === '(')) {
                return $this->raiseFormulaError("Formula Error: Expecting ')'"); // if there are any opening braces on the stack, then braces were unbalanced
            }
            $output[] = $op;
        }

        return $output;
    }

    private function convertMatrixReferences($formula)
    {
        static $matrixReplaceFrom = ['{', ';', '}'];
        static $matrixReplaceTo = ['MKMATRIX(MKMATRIX(', '),MKMATRIX(', '))'];

        //    Convert any Excel matrix references to the MKMATRIX() function
        if (strpos($formula, '{') !== false) {
            //    If there is the possibility of braces within a quoted string, then we don't treat those as matrix indicators
            if (strpos($formula, '"') !== false) {
                //    So instead we skip replacing in any quoted strings by only replacing in every other array element after we've exploded
                //        the formula
                $temp = explode('"', $formula);
                //    Open and Closed counts used for trapping mismatched braces in the formula
                $openCount = $closeCount = 0;
                $i = false;
                foreach ($temp as &$value) {
                    //    Only count/replace in alternating array entries
                    if ($i = !$i) {
                        $openCount += substr_count($value, '{');
                        $closeCount += substr_count($value, '}');
                        $value = str_replace($matrixReplaceFrom, $matrixReplaceTo, $value);
                    }
                }
                unset($value);
                //    Then rebuild the formula string
                $formula = implode('"', $temp);
            } else {
                //    If there's no quoted strings, then we do a simple count/replace
                $openCount = substr_count($formula, '{');
                $closeCount = substr_count($formula, '}');
                $formula = str_replace($matrixReplaceFrom, $matrixReplaceTo, $formula);
            }
            //    Trap for mismatched braces and trigger an appropriate error
            if ($openCount < $closeCount) {
                if ($openCount > 0) {
                    return $this->raiseFormulaError("Formula Error: Mismatched matrix braces '}'");
                }

                return $this->raiseFormulaError("Formula Error: Unexpected '}' encountered");
            } elseif ($openCount > $closeCount) {
                if ($closeCount > 0) {
                    return $this->raiseFormulaError("Formula Error: Mismatched matrix braces '{'");
                }

                return $this->raiseFormulaError("Formula Error: Unexpected '{' encountered");
            }
        }

        return $formula;
    }

    /**
     * @param string $cellReference
     * @param mixed $cellValue
     */
    public function saveValueToCache($cellReference, $cellValue)
    {
        if ($this->calculationCacheEnabled) {
            $this->calculationCache[$cellReference] = $cellValue;
        }
    }

    /**
     * Validate and parse a formula string.
     *
     * @param string $formula Formula to parse
     *
     * @throws Calculation\Exception
     *
     * @return array
     */
    public function parseFormula($formula)
    {
        //    Basic validation that this is indeed a formula
        //    We return an empty array if not
        $formula = trim($formula);
        if ((!isset($formula[0])) || ($formula[0] != '=')) {
            return [];
        }
        $formula = ltrim(substr($formula, 1));
        if (!isset($formula[0])) {
            return [];
        }

        //    Parse the formula and return the token stack
        return $this->_parseFormula($formula);
    }

    // trigger an error, but nicely, if need be

    /**
     * Calculate the value of a formula.
     *
     * @param string $formula Formula to parse
     * @param string $cellID Address of the cell to calculate
     * @param Cell $pCell Cell to calculate
     *
     * @throws Calculation\Exception
     *
     * @return mixed
     */
    public function calculateFormula($formula, $cellID = null, Cell $pCell = null)
    {
        //    Initialise the logging settings
        $this->formulaError = null;
        $this->debugLog->clearLog();
        $this->cyclicReferenceStack->clear();

        if ($this->spreadsheet !== null && $cellID === null && $pCell === null) {
            $cellID = 'A1';
            $pCell = $this->spreadsheet->getActiveSheet()->getCell($cellID);
        } else {
            //    Disable calculation cacheing because it only applies to cell calculations, not straight formulae
            //    But don't actually flush any cache
            $resetCache = $this->getCalculationCacheEnabled();
            $this->calculationCacheEnabled = false;
        }

        //    Execute the calculation
        try {
            $result = self::unwrapResult($this->_calculateFormulaValue($formula, $cellID, $pCell));
        } catch (Exception $e) {
            throw new Calculation\Exception($e->getMessage());
        }

        if ($this->spreadsheet === null) {
            //    Reset calculation cacheing to its previous state
            $this->calculationCacheEnabled = $resetCache;
        }

        return $result;
    }

    /**
     * Is calculation caching enabled?
     *
     * @return bool
     */
    public function getCalculationCacheEnabled()
    {
        return $this->calculationCacheEnabled;
    }

    /**
     * Enable/disable calculation cache.
     *
     * @param bool $pValue
     */
    public function setCalculationCacheEnabled($pValue = true)
    {
        $this->calculationCacheEnabled = $pValue;
        $this->clearCalculationCache();
    }

    /**
     * Get a list of all implemented functions as an array of function objects.
     *
     * @return array of Calculation\Category
     */
    public function getFunctions()
    {
        return self::$phpSpreadsheetFunctions;
    }

    /**
     * Get a list of implemented Excel function names.
     *
     * @return array
     */
    public function getImplementedFunctionNames()
    {
        $returnValue = [];
        foreach (self::$phpSpreadsheetFunctions as $functionName => $function) {
            if ($this->isImplemented($functionName)) {
                $returnValue[] = $functionName;
            }
        }

        return $returnValue;
    }

    /**
     * Is a specific function implemented?
     *
     * @param string $pFunction Function Name
     *
     * @return bool
     */
    public function isImplemented($pFunction)
    {
        $pFunction = strtoupper($pFunction);
        $notImplemented = !isset(self::$phpSpreadsheetFunctions[$pFunction]) || (is_array(self::$phpSpreadsheetFunctions[$pFunction]['functionCall']) && self::$phpSpreadsheetFunctions[$pFunction]['functionCall'][1] === 'DUMMY');

        return !$notImplemented;
    }
}
