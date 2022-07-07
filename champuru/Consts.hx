/**
 * Copyright (c) 2022 Université libre de Bruxelles, eeg-ebe Department, Yann Spöri
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package champuru;

import haxe.ds.IntMap;
import haxe.ds.StringMap;

/**
 * Collection of different constants useful for the Champuru program.
 *
 * @author Yann Spoeri
 */
class Consts
{
    /**
     * Final, static map to convert each char to a number.
     */
    @:final
    public static var CHARS_TO_INT:StringMap<Int> = [
        "_" => 0,    "A" => 8,    "C" => 4,    "T" => 2,
        "G" => 1,    "W" => 10,   "S" => 5,    "Y" => 6,
        "R" => 9,    "K" => 3,    "M" => 12,   "B" => 7,
        "D" => 11,   "V" => 13,   "H" => 14,   "N" => 15,
        "?" => 15
    ];
    
    @:final
    public static var INTS_TO_CHAR:IntMap<String> = [
        0 => "_",    8 => "A",    4 => "C",    2 => "T",
        1 => "G",    10 => "W",   5 => "S",    6 => "Y",
        9 => "R",    3 => "K",    12 => "M",   7 => "B",
        11 => "D",   13 => "V",   14 => "H",   15 => "N"
    ];
}
