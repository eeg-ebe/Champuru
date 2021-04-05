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

import haxe.crypto.Base64;

import haxe.ds.IntMap;
import haxe.ds.StringMap;
import haxe.ds.Vector;

import haxe.io.Bytes;

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
    public static function calcScore(fwd:String, rev:String, i:Int, scoreCalculationMethod:Int):{score:Float, matches:Int, mismatches:Int} {
        var matches:Int = 0, fullMatches:Int = 0, mismatches:Int = 0;

        var fwdCorr:Int = (i < 0) ? -i : 0;
        var revCorr:Int = (i > 0) ?  i : 0;
        // minStrLen(=fwdL/revL) - start(=fwdCorr+revCorr)
        var fwdL:Int = fwdCorr + rev.length;
        var revL:Int = revCorr + fwd.length;
        var overlap:Int = ((fwdL < revL) ? fwdL : revL) - (fwdCorr + revCorr);

        if (scoreCalculationMethod == 2) {
            var maxScore:Int = 0;
            var cScore:Int = 0;
            for (pos in 0...overlap) {
                var a:String = fwd.charAt(pos + fwdCorr);
                var b:String = rev.charAt(pos + revCorr);
                if (a == b && (a == 'A' || a == 'C' || a == 'G' || a == 'T')) {
                    fullMatches++;
                    cScore++;
                } else if (compareBases(a, b)) {
                    matches++;
                    cScore++;
                } else {
                    mismatches++;
                    cScore = 0;
                }
                maxScore = (maxScore > cScore) ? maxScore : cScore;
            }
            return {
                matches : matches + fullMatches,
                mismatches : mismatches,
                score : maxScore
            };
        }

        for (pos in 0...overlap) {
            var a:String = fwd.charAt(pos + fwdCorr);
            var b:String = rev.charAt(pos + revCorr);
            if (a == b && (a == 'A' || a == 'C' || a == 'G' || a == 'T')) {
                fullMatches++;
            } else if (compareBases(a, b)) {
                matches++;
            } else {
                mismatches++;
            }
        }
        return {
            matches : matches + fullMatches,
            mismatches : mismatches,
            score : (scoreCalculationMethod == 0) ? matches + fullMatches - 0.25 * overlap : fullMatches + 0.5 * matches - 0.25 * overlap
        };
    }

    public static inline function timeToStr(f:Float):String {
        return "" + Math.round(f * 1000);
    }

    /**
     * Calculate overlap scores
     */
    public static function calcOverlapScores(fwd:String, rev:String, scoreCalculationMethod:Int):Array<{nr:Int, index:Int, score:Float, matches:Int, mismatches:Int}> {
        var result:Array<{nr:Int, index:Int, score:Float, matches:Int, mismatches:Int}> = new Array<{nr:Int, index:Int, score:Float, matches:Int, mismatches:Int}>();
        for (i in -fwd.length+1...rev.length) {
            var score:{score:Float, matches:Int, mismatches:Int} = calcScore(fwd, rev, i, scoreCalculationMethod);
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
    public static function getProblematicPositions(s:String):List<Int> {
        var result:List<Int> = new List<Int>();
        for (i in 0...s.length) {
            var c:String = s.charAt(i);
            if (c == "_") {
                result.add((i + 1));
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
    public static function getAmbPositions(s:String):List<Int> {
        var result:List<Int> = new List<Int>();
        for (i in 0...s.length) {
            var c:String = s.charAt(i);
            if (c == 'A' || c == 'C' || c == 'T' || c == 'G' || c == '_') {
                continue;
            }
            result.add((i + 1));
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
            if (CHARS_TO_INT.exists(chr)) {
                result[i] = CHARS_TO_INT.get(chr);
            } else {
                result[i] = 0;
            }
        }
        return result;
    }
    public static function toString(v:Vector<Int>):String {
        var result:List<String> = new List<String>();
        for (int in v) {
            if (INTS_TO_CHAR.exists(int)) {
                result.add(INTS_TO_CHAR.get(int));
            } else {
                result.add("_");
            }
        }
        return result.join("");
    }

    public static function reverse(seq:Vector<Int>):Vector<Int> {
        var result:Vector<Int> = new Vector<Int>(seq.length);
        var i:Int = 1;
        for (val in seq) {
            result[seq.length - i] = val;
            ++i;
        }
        return result;
    }
    public static function diff(a:Vector<Int>, b:Vector<Int>, shift:Int):{ result : Vector<Int>, pos:List<Int> } {
        var result:Vector<Int> = new Vector<Int>(a.length);
        var xPos:List<Int> = new List<Int>();
        for (i in 0...a.length) {
            var a_:Int = a[i];
            var b_:Int = (i + shift >= 0 && i + shift < b.length) ? b[i + shift] : 0;
            if (b_ == 0) {
                result[i] = a_;
            } else {
                result[i] = a_ & b_;
                if ((a_ | result[i]) != b_) {
                    xPos.add(i + 1);
                }
            }
        }
        return {
            result : result,
            pos : xPos,
        };
    }
    public static function minus(orig:Vector<Int>, cons:Vector<Int>, idx:Int):Vector<Int> {
        var origCorr:Int = (idx < 0) ? -idx : 0;
        var result:Vector<Int> = new Vector<Int>(cons.length);
        for (i in 0...cons.length) {
            var a:Int = orig[i + origCorr];
            var b:Int = cons[i];
            if (a == b && (a == 1 || a == 2 || a == 4 || a == 8)) {
                result[i] = a;
            } else if (a == b) {
                result[i] = a;
            } else {
                result[i] = a - b;
            }
            if (result[i] < 0) throw "Self-check failed. There is something is wrong here! It would be nice if you could send your sequences to jflot@ulb.ac.be so that we may fix this problem.";
        }
        return result;
    }
    public static function reconstructSeq(fwd:String, rev:String, sequenceA:String, sequenceB:String, i:Int, j:Int):{a:String, b:String, fPos:List<Int>, rPos:List<Int> } {
        var fwd_:Vector<Int> = toInts(fwd), rev_:Vector<Int> = toInts(rev), a_:Vector<Int> = toInts(sequenceA), b_:Vector<Int> = toInts(sequenceB);

//trace("=== " + i + ", " + j + " " + (-j));

        var restF:Vector<Int> = minus(fwd_, a_, i);
        var restR:Vector<Int> = minus(rev_, b_, -j);

/*
trace("-- " + i);
trace("      " + fwd);
trace("      " + sequenceA);
trace("restF " + toString(restF));
trace("--" + (-j));
trace("      " + rev);
trace("      " + sequenceB);
trace("restR " + toString(restR));
*/

        var shift:Int = i - j;
        var ashift:Int = 0, bshift:Int = 0;
        if (i > 0) {
            ashift = shift;
            bshift = 0;
        } else {
            if (j > 0) {
                ashift = shift;
                bshift = 0;
            } else {
                ashift = 0;
                bshift = shift;
            }
        }
        var reconstructedA_:{ result : Vector<Int>, pos:List<Int> } = diff(a_, restR, ashift);
        var reconstructedB_:{ result : Vector<Int>, pos:List<Int> } = diff(b_, restF, bshift);

        var recA:String = toString(reconstructedA_.result);
        var recB:String = toString(reconstructedB_.result);

        if (recA != sequenceA || recB != sequenceB) {
            return reconstructSeq(fwd, rev, recA, recB, i, j);
        }

        return {
            a : recA,
            b : recB,
            fPos : reconstructedB_.pos,
            rPos : reconstructedA_.pos,
        };
    }

    public static function genScorePlot(scores:Array<{nr:Int, index:Int, score:Float, matches:Int, mismatches:Int}>, high:Float, low:Float):String {
        var result:List<String> = new List<String>();
        result.add("<svg id='scorePlot' class='plot middle' width='600' height='400'>");
        result.add("<rect width='600' height='400' style='fill:white' />");
        result.add("<text x='010' y='200' text-anchor='middle' style='font-family: monospace; text-size: 12.5px' transform='rotate(270 7.5 195)'>Score</text>");
        result.add("<text x='300' y='395' text-anchor='middle' style='font-family: monospace; text-size: 12.5px'>Offset</text>");
        var d:Float = high - low;
        var i:Int = 0;
        for (score in scores) {
            var x:Float = 30 + (560.0 * (i / scores.length));
            var y:Float = 370 - (350 * ((score.score - low) / d));
            var alertMsg:String = "Offset: " + score.index + "\\nScore: " + score.score + "\\nMatches: " + score.matches + "\\nMismatches: " + score.mismatches;
            result.add("<circle id='c" + score.index + "' cx='" + x + "' cy='" + y + "' r='2' fill='black' title='" + 1 + "' onclick='alert(\"" + alertMsg + "\")' />");
            i++;
        }
        result.add("</svg>");
        return result.join("");
    }
    public static function genScorePlotHist(scores:Array<{nr:Int, index:Int, score:Float, matches:Int, mismatches:Int}>, high:Float, low:Float):String {
        var d:Float = high - low;
        var result:List<String> = new List<String>();
        result.add("<svg id='scorePlotHist' class='plot middle' width='600' height='400'>");
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
            var from:Float = Math.round((i * hd + low) * 10) / 10.0;
            var to:Float = Math.round(((i + 1) * hd + low) * 10) / 10.0;
            var percentage:Float = (Math.round(v[i] / scores.length * 1000) / 10.0);
            var alertMsg:String = "From: " + from + "\\nTo: " + to + "\\nCount: " + v[i] + " (" + percentage + "%)";
            result.add("<rect x='" + x + "' y='" + y + "' width='20' height='" + h + "' onclick='alert(\"" + alertMsg + "\");' />");
        }
        result.add("</g>");
        result.add("</svg>");
        return result.join("");
    }

    public static function doChampuru(fwd:String, rev:String, scoreCalculationMethod:Int, iOffset:Int, jOffset:Int, useThisOffsets:Bool) {
        mMsgs.clear();

        var timestamp1:Float = Timer.stamp();
        var scores:Array<{nr:Int, index:Int, score:Float, matches:Int, mismatches:Int}> = calcOverlapScores(fwd, rev, scoreCalculationMethod);
        var timestamp2:Float = Timer.stamp();
        var sortedScores:Array<{nr:Int, index:Int, score:Float, matches:Int, mismatches:Int}> = scores.copy();
        sortedScores.sort(function(a:{nr:Int, index:Int, score:Float, matches:Int, mismatches:Int}, b:{nr:Int, index:Int, score:Float, matches:Int, mismatches:Int}):Int {
            var result:Float = b.score - a.score;
            if (result == 0) {
                return a.mismatches - b.mismatches;
            } else if (result > 0) {
                return 1;
            }
            return -1;
        });
        var timestamp3:Float = Timer.stamp();
        // hey why is there no function to get but not remove the last element of an array?
        var lowestScore:{nr:Int, index:Int, score:Float, matches:Int, mismatches:Int} = sortedScores.pop();
        sortedScores.push(lowestScore);

        if (!useThisOffsets) {
            iOffset = sortedScores[0].index;
            jOffset = sortedScores[1].index;
        }

        var sortedScoresStringList:List<String> = new List<String>();
        sortedScoresStringList.add("#\tOffset\tScore\tMatches\tMismatches");
        var i:Int = 1;
        for (score in sortedScores) {
            sortedScoresStringList.add(i + "\t" + score.index + "\t" + score.score + "\t" + score.matches + "\t" + score.mismatches);
            i++;
        }
        var sortedScoresString:String = sortedScoresStringList.join("\n");
        var sortedScoresStringB64:String = Base64.encode(Bytes.ofString(sortedScoresString)); //ofString returns UTF-8 encoded string, which is ok

        out("<fieldset>");
        out("<legend>Input</legend>");
        out("<p>Forward sequence of length " + (fwd.length) + ": <span class='sequence'>");
        out(fwd);
        out("</p><p>Reverse sequence of length " + (rev.length) + ": <span class='sequence'>");
        out(rev);
        out("</p>");
        out("<p>Score calculation method: " + scoreCalculationMethod + "</p>");
        if (useThisOffsets) {
            out("<p>Offsets to use: " + iOffset + " and " + jOffset + "</p>");
        }
        out("</fieldset>");
        out("<br>");

        out("<fieldset>");
        out("<legend>1. Step - Compatibility score calculation</legend>");
        out("<p>Calculated " + scores.length + " compatibility scores in " + timeToStr(timestamp2 - timestamp1) + "ms. Sorting took " + timeToStr(timestamp3 - timestamp2) + "ms.</p>");
        out("<p>The following table [<a href-lang='text/tsv' title='table.tsv' href='data:text/tsv;base64,\n");
        out(sortedScoresStringB64);
        out("' title='table.tsv' download='table.tsv'>Download</a>] lists the best compatibility scores and their positions:</p>");
        out("<table class='scoreTable center'>");
        out("<tr class='header'>");
        out("<td>#</td><td>Offset</td><td>Score</td><td>Matches</td><td>Mismatches</td>");
        out("</tr>");
        var i:Int = 1;
        for (score in sortedScores) {
            out("<tr class='" + ((i % 2 == 0) ? "odd" : "even") + "' onmouseover='highlight(\"c" + score.index + "\")' onmouseout='removeHighlight(\"c" + score.index + "\")'>");
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
        if (useThisOffsets) {
            out("<p>User requested to use the offsets " + iOffset + " and " + jOffset + " for calculation.</p>");
        } else {
            out("<p>Using offsets " + iOffset + " and " + jOffset + " for calculation.</p>");
        }
        out("<span class='middle'><button onclick='rerunAnalysisWithDifferentOffsets(\"" + fwd + "\", \"" + rev + "\", " + scoreCalculationMethod + ")'>Use different offsets</button></span>");
        out("</fieldset>");
        out("<br>");

        var sequenceA:String = reconstruct(fwd, rev, iOffset);
        var sequenceB:String = reconstruct(fwd, rev, jOffset);

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
            out("<p>There is 1 incompatible position (indicated with an underscore), please check the input sequences.</p>");
        } else if (problems > 1) {
            out("<p>There are " + problems + " incompatible positions (indicated with underscores), please check the input sequences.</p>");
        }
        if (problems > 0) {
            out("<span class='middle'><button onclick='colorConsensusByIncompatiblePositions()'>Color underscores</button><button onclick='removeColor()'>Remove color</button></span>");
        }
        if (remainingAmbFwd == 1) {
            out("<p>There is 1 ambiguity in the first consensus sequence.</p>");
        } else if (remainingAmbFwd > 1) {
            out("<p>There are " + remainingAmbFwd + " ambiguities in the first consensus sequence.</p>");
        }
        if (remainingAmbRev == 1) {
            out("<p>There is 1 ambiguity in the second consensus sequence.</p>");
        } else if (remainingAmbRev > 1) {
            out("<p>There are " + remainingAmbRev + " ambiguities in the second consensus sequence.</p>");
        }
        if (remainingAmbFwd + remainingAmbRev > 0) {
            out("<span class='middle'><button onclick='colorConsensusByAmbPositions()'>Color ambiguities</button><button onclick='removeColor()'>Remove color</button></span>");
        }
        out("</fieldset>");
        out("<br>");

        var timestamp4:Float = Timer.stamp();
        var reconstruction:{a:String, b:String, fPos:List<Int>, rPos:List<Int>} = reconstructSeq(fwd, rev, sequenceA, sequenceB, iOffset, jOffset);
        var timestamp5:Float = Timer.stamp();
        problems = countProblems(reconstruction.a) + countProblems(reconstruction.b);
        var ambPos:Int = countAmb(reconstruction.a) + countAmb(reconstruction.b);

        out("<fieldset class='" + ((problems > 0) ? "greyout" : "") + "'>");
        out("<legend>3. Step - Sequence reconstruction</legend>");
        out("<p>Cleaning up ambiguities by sequence comparison took " + timeToStr(timestamp5 - timestamp4) + "ms.</p>");
        out("<p>First reconstructed sequence [<a href='#' onclick='return toClipboard(\"reconstructed1\")'>Copy to clipboard</a>]: <span id='reconstructed1' class='sequence'>");
        out(reconstruction.a);
        out("</span></p>");
        out("<p>Second reconstructed sequence [<a href='#' onclick='return toClipboard(\"reconstructed2\")'>Copy to clipboard</a>]: <span id='reconstructed2' class='sequence'>");
        out(reconstruction.b);
        out("</span></p>");
        if (problems == 0) {
            out("<span class='middle'><button onclick='download()'>Download</button></span>");            
        } else if (problems == 1) {
            out("<p>There is 1 problematic position!</p>");
        } else if (problems > 1) {
            out("<p>There are " + problems + " problematic positions!</p>");
        }
        if (problems >= 1)  {
            var pF:List<Int> = getProblematicPositions(reconstruction.a);
            var pR:List<Int> = getProblematicPositions(reconstruction.b);
            out("<p>");
            if (pF.length > 0) {
                out("Problematic position(s) on forward: <span class='sequence'>" + pF.join(",") + "</span>");
            }
            if (pF.length > 0 && pR.length > 0) {
                out("<br>");
            }
            if (pR.length > 0) {
                out("Problematic position(s) on reverse: <span class='sequence'>" + pR.join(",") + "</span>");
            }
            out("</p>");
        }
        if (problems > 0) {
            out("<span class='middle'><button onclick='colorProblems()'>Color problems</button><button onclick='removeColorFinal()'>Remove color</button></span>");
        }
        if (ambPos == 1) {
            out("<p>There is 1 ambiguity left!</p>");
        } else if (ambPos > 1) {
            out("<p>There are " + ambPos + " ambiguities left!</p>");
        }
        if (reconstruction.fPos.length >= 1 || reconstruction.rPos.length >= 1) {
            out("<p>");
            if (reconstruction.fPos.length == 1) {
                out("A peak unaccounted for was detected in the forward sequence at position: <span class='sequence'>" + reconstruction.fPos.first() + "</span><br>");
            } else if (reconstruction.fPos.length > 1) {
                out("Peaks unaccounted for were detected in the forward sequence at positions: <span class='sequence'>" + (reconstruction.fPos.join(",")) + "</span><br>");
            }
            if (reconstruction.rPos.length == 1) {
                out("A peak unaccounted for was detected in the reverse sequence at position: <span class='sequence'>" + reconstruction.rPos.first() + "</span><br>");
            } else if (reconstruction.rPos.length > 1) {
                out("Peaks unaccounted for were detected in the reverse sequence at positions: <span class='sequence'>" + (reconstruction.rPos.join(",")) + "</span><br>");
            }
            out("</p>");
        }
        if (ambPos >= 1) {
            var pF:List<Int> = getAmbPositions(reconstruction.a);
            var pR:List<Int> = getAmbPositions(reconstruction.b);
            out("<p>");
            if (pF.length > 0) {
                out("Ambiguity position(s) on forward: <span class='sequence'>" + getAmbPositions(reconstruction.a).join(",") + "</span>");
            }
            if (pF.length > 0 && pR.length > 0) {
                out("<br>");
            }
            if (pR.length > 0) {
                out("Ambiguity position(s) on reverse: <span class='sequence'>" + getAmbPositions(reconstruction.b).join(",") + "</span>");
            }
            out("</p>");
        }
        if (ambPos > 0) {
            out("<span class='middle'><button onclick='colorAmbPos()'>Color ambiguities</button><button onclick='removeColorFinal()'>Remove color</button></span>");
        }
        out("</fieldset>");

        return {
            result : mMsgs.join(""),
            problematicPositions : problems,
            iOffset : iOffset,
            jOffset : jOffset,
        };
    }

    #if js
    static var workerScope:js.html.DedicatedWorkerGlobalScope;

    public static function onMessage(e:js.html.MessageEvent):Void {
        try {
            var fwd:String = cast(e.data.fwd, String);
            var rev:String = cast(e.data.rev, String);
            var scoreCalculationMethod:Int = cast(e.data.score, Int);
            var i:Int = cast(e.data.i, Int);
            var j:Int = cast(e.data.j, Int);
            var use:Bool = cast(e.data.useOffsets, Bool);
            var result = doChampuru(fwd, rev, scoreCalculationMethod, i, j, use);
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
