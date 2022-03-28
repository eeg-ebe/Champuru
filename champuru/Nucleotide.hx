/**
 * Copyright (c) 2021 Université libre de Bruxelles, eeg-ebe Department, Yann Spöri
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
 * Class representing a single nucleotide.
 *
 * @author Yann Spoeri
 */
class Nucleotide {

    /**
     * A map indicating which number represents which nucleotide character.
     */
    @:final
    private static var INTS_TO_CHAR:IntMap<String> = [
        0 => "_",    8 => "A",    4 => "C",    2 => "T",
        1 => "G",    10 => "W",   5 => "S",    6 => "Y",
        9 => "R",    3 => "K",    12 => "M",   7 => "B",
        11 => "D",   13 => "V",   14 => "H",   15 => "N"
    ];

    /**
     * A map indicating which nucleotide character is represented by which number.
     */
    @:final
    private static var CHARS_TO_INT:StringMap<Int> = [
        "_" => 0,    "A" => 8,    "C" => 4,    "T" => 2,
        "G" => 1,    "W" => 10,   "S" => 5,    "Y" => 6,
        "R" => 9,    "K" => 3,    "M" => 12,   "B" => 7,
        "D" => 11,   "V" => 13,   "H" => 14,   "N" => 15,
        "?" => 15
    ];

    /**
     * An integer representing the nucleotide.
     *
     * A = 8, C = 4, T = 2, G = 1 and so on. See above tables.
     */
    private var mNuc:Int = 0;

    /**
     *Create a new Nucleotide.
     */
    public inline function new(i:Int) {
        if (0 <= i && i < 16) {
            mNuc = i;
        } else {
            throw "Illegal integer " + i + " to represent a nucleotide!";
        }
    }

    /**
     * Create a Nucleotide object by a character.
     */
    public static inline function byChar(s:String):Nucleotide {
        if (s == null) {
            throw "Nucleotide char must not be null!";
        }
        var i:Int = CHARS_TO_INT.get(s);
        if (i == null) {
            throw "Illegal character '" + s + "' for nucleotid!";
        }
        return new Nucleotide(i);
    }

    /**
     * Check whether this nucleotide matches another.
     */
    public inline function matches(o:Nucleotide):Bool {
        return mNuc & o.mNuc != 0;
    }

    /**
     * Check whether this nucleotide fully matches another.
     */
    public inline function fullMatch(o:Nucleotide):Bool {
        return mNuc == o.mNuc;
    }

    public inline function getMatch(o:Nucleotide):Nucleotide {
        return new Nucleotide(mNuc & o.mNuc);
    }

    public inline function countPossibilities():Int {
        var count:Int = 0;
        if (containsA()) ++count;
        if (containsC()) ++count;
        if (containsT()) ++count;
        if (containsG()) ++count;
        return count;
    }

    public inline function toString():String {
        return INTS_TO_CHAR.get(mNuc);
    }

    public inline function containsA():Bool {
        return mNuc & 8 != 0;
    }
    public inline function containsC():Bool {
        return mNuc & 4 != 0;
    }
    public inline function containsT():Bool {
        return mNuc & 2 != 0;
    }
    public inline function containsG():Bool {
        return mNuc & 1 != 0;
    }
    public inline function isA():Bool {
        return mNuc == 8;
    }
    public inline function isC():Bool {
        return mNuc == 4;
    }
    public inline function isT():Bool {
        return mNuc == 2;
    }
    public inline function isG():Bool {
        return mNuc == 1;
    }

    public static function main() {}
}