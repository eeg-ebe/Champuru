/**
 * Copyright (c) 2019 Université libre de Bruxelles, eeg-ebe Department, Yann Spöri
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
import haxe.ds.Vector;

import haxe.Timer;

/**
 * Entry point of the Champuru program.
 *
 * @author Yann Spoeri
 */
class Champuru {

    /**
     * The list of messages to return / output.
     */
    private static var mMsgs:List<String> = new List<String>();

    /**
     * Add an output.
     */
    public static inline function out(s:String):Void {
        mMsgs.add(s);
    }

    /**
     * Final, static map to convert each char to a number.
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
     * Calculate whether two bases "match".
     */
    public static inline function compareBases(a:String, b:String):Bool {
        var aa:Int = CHARS_TO_INT.get(a);
        var ba:Int = CHARS_TO_INT.get(b);
        return aa & ba != 0;
    }

    @:final
    private static var INTS_TO_CHAR:IntMap<String> = [
        0 => "_",    8 => "A",    4 => "C",    2 => "T",
        1 => "G",    10 => "W",   5 => "S",    6 => "Y",
        9 => "R",    3 => "K",    12 => "M",   7 => "B",
        11 => "D",   13 => "V",   14 => "H",   15 => "N"
    ];

    public static inline function getMatchChar(a:String, b:String):String {
        var ia:Int = CHARS_TO_INT.get(a);
        var ib:Int = CHARS_TO_INT.get(b);
        var c = ia & ib;
        return INTS_TO_CHAR.get(c);
    }

    /**
     * Calculate the score of an overlap.
     */
    public static function calcScore(fwd:String, rev:String, i:Int):{score:Float, matches:Int, mismatches:Int} {
        var matches:Int = 0, mismatches:Int = 0;
        var fwdCorr:Int = (i < 0) ? -i : 0;
        var revCorr:Int = (i > 0) ?  i : 0;
        // minStrLen(=fwdL/revL) - start(=fwdCorr+revCorr)
        var fwdL:Int = fwdCorr + rev.length;
        var revL:Int = revCorr + fwd.length;
        var overlap:Int = ((fwdL < revL) ? fwdL : revL) - (fwdCorr + revCorr);
        for (pos in 0...overlap) {
            var a:String = fwd.charAt(pos + fwdCorr);
            var b:String = rev.charAt(pos + revCorr);
            if (compareBases(a, b)) {
                matches++;
            } else {
                mismatches++;
            }
        }
        return {
            matches : matches,
            mismatches : mismatches,
            score : matches - 0.25 * overlap
        };
    }

    public static function timeToStr(f:Float):String {
        return "" + Math.round(f * 1000);
    }

    /**
     * Calculate overlap scores
     */
    public static function calcOverlapScores(fwd:String, rev:String):Array<{nr:Int, index:Int, score:Float, matches:Int, mismatches:Int}> {
        var result:Array<{nr:Int, index:Int, score:Float, matches:Int, mismatches:Int}> = new Array<{nr:Int, index:Int, score:Float, matches:Int, mismatches:Int}>();
        for (i in -fwd.length+1...rev.length) {
            var score:{score:Float, matches:Int, mismatches:Int} = calcScore(fwd, rev, i);
            result.push({
                nr : i - fwd.length + 1,
                index : i,
                score : score.score,
                matches : score.matches,
                mismatches : score.mismatches
            });
        }
        return result;
    }

    public static function countProblems(s:String):Int {
        var result:Int = 0;
        for (i in 0...s.length) {
            var c:String = s.charAt(i);
            if (c == "_") {
                result++;
            }
        }
        return result;
    }
    public static function countAmb(s:String):Int {
        var result:Int = 0;
        for (i in 0...s.length) {
            var c:String = s.charAt(i);
            if (c == 'A' || c == 'C' || c == 'T' || c == 'G' || c == '_') {
                continue;
            }
            result++;
        }
        return result;
    }

    public static function reconstruct(fwd:String, rev:String, i:Int):String {
        var result:List<String> = new List<String>();
        var fwdCorr:Int = (i < 0) ? -i : 0;
        var revCorr:Int = (i > 0) ?  i : 0;
        var fwdL:Int = fwdCorr + rev.length;
        var revL:Int = revCorr + fwd.length;
        var overlap:Int = ((fwdL < revL) ? fwdL : revL) - (fwdCorr + revCorr);
        for (pos in 0...overlap) {
            var a:String = fwd.charAt(pos + fwdCorr);
            var b:String = rev.charAt(pos + revCorr);
            var c:String = getMatchChar(a, b);
            result.add(c);
        }
        return result.join("");
    }

    public static function toInts(s:String):Vector<Int> {
        var result:Vector<Int> = new Vector<Int>(s.length);
        for (i in 0...s.length) {
            var chr:String = s.charAt(i);
            result[i] = CHARS_TO_INT.get(chr);
        }
        return result;
    }
    public static function toString(v:Vector<Int>):String {
        var result:List<String> = new List<String>();
        for (int in v) {
            result.add(INTS_TO_CHAR.get(int));
        }
        return result.join("");
    }

    public static function getPart(fwd:String, rev:String, i:Int):{a:String, b:String} {
        var fwdCorr:Int = (i < 0) ? -i : 0;
        var revCorr:Int = (i > 0) ?  i : 0;
        var fwdL:Int = fwdCorr + rev.length;
        var revL:Int = revCorr + fwd.length;
        var overlap:Int = ((fwdL < revL) ? fwdL : revL) - (fwdCorr + revCorr);
        return null;
    }

    public static function reconstructSeq(fwd:String, rev:String, sequenceA:String, sequenceB:String, i:Int, j:Int):{a:String, b:String} {
        var a:Vector<Int> = toInts(sequenceA), b:Vector<Int> = toInts(sequenceB);
        // fwd
        // rev
// TODO
        var found:Bool = true;
        while (found) {
            found = false;
            
        }
        return {
            a : toString(a),
            b : toString(b)
        };
    }

    public static function genScorePlot(scores:Array<{nr:Int, index:Int, score:Float, matches:Int, mismatches:Int}>, high:Float, low:Float):String {
        var result:List<String> = new List<String>();
        result.add("<svg class='plot middle' width='600' height='400'>"); // 600
        result.add("<rect width='600' height='400' style='fill:white' />");
        result.add("<text x='010' y='200' text-anchor='middle' style='font-family: monospace; text-size: 12.5px' transform='rotate(270 7.5 195)'>Score</text>");
        result.add("<text x='300' y='395' text-anchor='middle' style='font-family: monospace; text-size: 12.5px'>Offset</text>");
        var d:Float = high - low;
        var i:Int = 0;
        for (score in scores) {
            var x:Float = 30 + (560.0 * (i / scores.length));
            var y:Float = 370 - (350 * ((score.score - low) / d));
            result.add("<circle cx='" + x + "' cy='" + y + "' r='2' fill='black' />");
            i++;
        }
        result.add("</svg>");
        return result.join("");
    }
    public static function genScorePlotHist(scores:Array<{nr:Int, index:Int, score:Float, matches:Int, mismatches:Int}>, high:Float, low:Float):String {
        var d:Float = high - low;
        var result:List<String> = new List<String>();
        result.add("<svg class='plot middle' width='600' height='400'>"); // 600
        result.add("<rect width='600' height='400' style='fill:white' />");
        result.add("<text x='010' y='200' text-anchor='middle' style='font-family: monospace; text-size: 12.5px' transform='rotate(270 7.5 195)'>Frequency</text>");
        result.add("<text x='300' y='395' text-anchor='start' style='font-family: monospace; text-size: 12.5px'>Score</text>");
        result.add("<text x='030' y='380' text-anchor='middle' style='font-family: monospace; text-size: 12.5px'>" + Math.floor(low) + "</text>");
        result.add("<text x='170' y='380' text-anchor='middle' style='font-family: monospace; text-size: 12.5px'>" + Math.round(d / 4) + "</text>");
        result.add("<text x='310' y='380' text-anchor='middle' style='font-family: monospace; text-size: 12.5px'>" + Math.round(d / 2) + "</text>");
        result.add("<text x='450' y='380' text-anchor='middle' style='font-family: monospace; text-size: 12.5px'>" + Math.round(d / 4 * 3) + "</text>");
        result.add("<text x='590' y='380' text-anchor='end' style='font-family: monospace; text-size: 12.5px'>" + Math.ceil(high) + "</text>");
        var hd:Float = d / 28;
        var i:Int = 0;
        var v:Vector<Int> = new Vector<Int>(28);
        for (i in 0...28) {
            v[i] = 0;
        }
        for (score in scores) {
            var scoreP:Float = ((score.score - low) / d);
            var b:Float = scoreP * 28;
            var i:Int = Math.floor(b);
            if (i >= 28) {
                i = 27;
            }
            v[i]++;
        }
        var highest:Int = 0;
        for (val in v) {
            highest = (highest > val) ? highest : val;
        }
        result.add("<g style='stroke-width:1;stroke:#000;fill:#fff'>");
        for (i in 0...28) {
            if (v[i] == 0) {
                continue;
            }
            var val:Float = v[i] / highest;
            var x:Float = 30 + i * 20;
            var h:Float = val * 350;
            var y:Float = 365 - h;
            result.add("<rect x='" + x + "' y='" + y + "' width='20' height='" + h + "' />");
        }
        result.add("</g>");
        result.add("</svg>");
        return result.join("");
    }

    public static function doChampuru(fwd:String, rev:String):String {
        mMsgs.clear();

        var timestamp1:Float = Timer.stamp();
        var scores:Array<{nr:Int, index:Int, score:Float, matches:Int, mismatches:Int}> = calcOverlapScores(fwd, rev);
        var timestamp2:Float = Timer.stamp();
        var sortedScores:Array<{nr:Int, index:Int, score:Float, matches:Int, mismatches:Int}> = scores.copy();
        sortedScores.sort(function(a:{nr:Int, index:Int, score:Float, matches:Int, mismatches:Int}, b:{nr:Int, index:Int, score:Float, matches:Int, mismatches:Int}):Int {
            return Math.ceil(b.score - a.score);
        });
        var timestamp3:Float = Timer.stamp();
        // hey why is there no function to get but not remove the last element of an array?
        var lowestScore:{nr:Int, index:Int, score:Float, matches:Int, mismatches:Int} = sortedScores.pop();
        sortedScores.push(lowestScore);

        out("<fieldset>");
        out("<legend>1. Step - Compatibility score calculation</legend>");
        out("<p>Calculated " + scores.length + " compatibility scores in " + timeToStr(timestamp2 - timestamp1) + "ms. Sorting took " + timeToStr(timestamp3 - timestamp2) + "ms.</p>");
        out("<p>The following table lists the best compatibility scores and their positions:</p>");
        out("<table class='scoreTable center'>");
        out("<tr class='header'>");
        out("<td>#</td><td>Offset</td><td>Score</td><td>Matches</td><td>Mismatches</td>");
        out("</tr>");
        var i:Int = 1;
        for (score in sortedScores) {
            out("<tr class='" + ((i % 2 == 0) ? "odd" : "even") + "'>");
            out("<td>" + i + "</td><td>" + score.index + "</td><td>" + score.score + "</td><td>" +  score.matches + "</td><td>" + score.mismatches + "</td>");
            out("</tr>");
            i++;
            if (i >= 6) { break; }
        }
        out("</table>");
        out("<p>Here is a plot of the shift calculation result:</p>");
        out(genScorePlot(scores, sortedScores[0].score, lowestScore.score));
        out("<p>Warning: Close points may be overlapping!</p>");
        out("<p>And as histogram:</p>");
        out(genScorePlotHist(scores, sortedScores[0].score, lowestScore.score));
        out("</fieldset>");
        out("<br>");

        var sequenceA:String = reconstruct(fwd, rev, sortedScores[0].index);
        var sequenceB:String = reconstruct(fwd, rev, sortedScores[1].index);

        var problemsFwd:Int = countProblems(sequenceA);
        var problemsRev:Int = countProblems(sequenceB);
        var problems:Int = problemsFwd + problemsRev;

        var remainingAmbFwd:Int = countAmb(sequenceA);
        var remainingAmbRev:Int = countAmb(sequenceB);

        out("<fieldset>");
        out("<legend>2. Step - Calculate consensus sequences</legend>");
        out("<p>First consensus sequence: <span id='consensus1' class='sequence'>");
        out(sequenceA);
        out("</span></p>");
        out("<p>Second consensus sequence: <span id='consensus2' class='sequence'>");
        out(sequenceB);
        out("</span></p>");
        if (problems == 1) {
            out("<p>There is 1 incompatible position (indicated with an underscore), please check the input sequences.");
        } else if (problems > 1) {
            out("<p>There are " + problems + " incompatible positions (indicated with underscores), please check the input sequences.");
        }
        if (problems > 0) {
            out("<span class='middle'><button onclick='colorConsensusByIncompatiblePositions()'>Color underscores</button><button onclick='removeColor()'>Remove color</button></span>");
        }
        if (remainingAmbFwd == 1) {
            out("<p>There is 1 ambigiouty in the first consensus sequence.</p>");
        } else if (remainingAmbFwd > 1) {
            out("<p>There are " + remainingAmbFwd + " ambigiouties in the first consensus sequence.</p>");
        }
        if (remainingAmbRev == 1) {
            out("<p>There is 1 ambigiouty in the second consensus sequence.</p>");
        } else if (remainingAmbRev > 1) {
            out("<p>There are " + remainingAmbRev + " ambigiouties in the second consensus sequence.</p>");
        }
        if (remainingAmbFwd + remainingAmbRev > 0) {
            out("<span class='middle'><button onclick='colorConsensusByAmbPositions()'>Color ambigiouties</button><button onclick='removeColor()'>Remove color</button></span>");
        }
        out("</fieldset>");
        out("<br>");

        var timestamp4:Float = Timer.stamp();
        var reconstruction:{a:String, b:String} = reconstructSeq(fwd, rev, sequenceA, sequenceB, sortedScores[0].index, sortedScores[1].index);
        var timestamp5:Float = Timer.stamp();
        problems = countProblems(reconstruction.a) + countProblems(reconstruction.b);
        var ambPos:Int = countAmb(reconstruction.a) + countAmb(reconstruction.b);

        out("<fieldset>");
        out("<legend>3. Step - Sequence reconstruction</legend>");
        out("<p>Cleaning up ambiguities by sequence comparison took " + timeToStr(timestamp5 - timestamp4) + "ms.</p>");
        out("<p>First reconstructed sequence: <span id='reconstructed1' class='sequence'>");
        out(reconstruction.a);
        out("</span></p>");
        out("<p>Second reconstructed sequence: <span id='reconstructed2' class='sequence'>");
        out(reconstruction.b);
        out("</span></p>");
        if (problems == 0) {
            out("<span class='middle'><button onclick='download()'>Download</button></span>");            
        } else if (problems == 1) {
            out("<p>There is 1 problematic position!</p>");
        } else if (problems > 1) {
            out("<p>There are " + problems + " problematic positions!</p>");
        }
        if (problems > 0) {
            out("<span class='middle'><button onclick='colorProblems()'>Color problems</button><button onclick='removeColorFinal()'>Remove color</button></span>");
        }
        if (ambPos == 1) {
            out("<p>There is 1 ambigiouty left!</p>");
        } else if (ambPos > 1) {
            out("<p>There are " + ambPos + " ambigiouties left!</p>");
        }
        if (ambPos > 0) {
            out("<span class='middle'><button onclick='colorAmbPos()'>Color Ambigiouties</button><button onclick='removeColorFinal()'>Remove color</button></span>");
        }
        out("</fieldset>");

        return mMsgs.join("");
    }

    #if js
    static var workerScope:js.html.DedicatedWorkerGlobalScope;

    public static function onMessage(e:js.html.MessageEvent):Void {
        try {
            var fwd:String = cast(e.data.fwd, String);
            var rev:String = cast(e.data.rev, String);
            var result:String = doChampuru(fwd, rev);
            workerScope.postMessage(result);
        } catch(e:Dynamic) {
            workerScope.postMessage("The following error occurred: " + e);
        }
    }
    #end

    public static function main() {
        #if js
        workerScope = untyped self;
        workerScope.onmessage = onMessage;
        #end
    }

}
