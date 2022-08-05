(function ($global) { "use strict";
var $estr = function() { return js_Boot.__string_rec(this,''); },$hxEnums = $hxEnums || {},$_;
function $extend(from, fields) {
	var proto = Object.create(from);
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var HxOverrides = function() { };
HxOverrides.__name__ = true;
HxOverrides.now = function() {
	return Date.now();
};
Math.__name__ = true;
var Std = function() { };
Std.__name__ = true;
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
var haxe_ds_List = function() {
	this.length = 0;
};
haxe_ds_List.__name__ = true;
haxe_ds_List.prototype = {
	add: function(item) {
		var x = new haxe_ds__$List_ListNode(item,null);
		if(this.h == null) {
			this.h = x;
		} else {
			this.q.next = x;
		}
		this.q = x;
		this.length++;
	}
	,first: function() {
		if(this.h == null) {
			return null;
		} else {
			return this.h.item;
		}
	}
	,clear: function() {
		this.h = null;
		this.q = null;
		this.length = 0;
	}
	,join: function(sep) {
		var s_b = "";
		var first = true;
		var l = this.h;
		while(l != null) {
			if(first) {
				first = false;
			} else {
				s_b += sep == null ? "null" : "" + sep;
			}
			s_b += Std.string(l.item);
			l = l.next;
		}
		return s_b;
	}
	,__class__: haxe_ds_List
};
var champuru_Champuru = function() { };
champuru_Champuru.__name__ = true;
champuru_Champuru.out = function(s) {
	champuru_Champuru.mMsgs.add(s);
};
champuru_Champuru.compareBases = function(a,b) {
	var aa = champuru_Champuru.CHARS_TO_INT.h[a];
	var ba = champuru_Champuru.CHARS_TO_INT.h[b];
	return (aa & ba) != 0;
};
champuru_Champuru.getMatchChar = function(a,b) {
	var ia = champuru_Champuru.CHARS_TO_INT.h[a];
	var ib = champuru_Champuru.CHARS_TO_INT.h[b];
	var c = ia & ib;
	return champuru_Champuru.INTS_TO_CHAR.h[c];
};
champuru_Champuru.calcScore = function(fwd,rev,i,scoreCalculationMethod) {
	var matches = 0;
	var fullMatches = 0;
	var mismatches = 0;
	var fwdCorr = i < 0 ? -i : 0;
	var revCorr = i > 0 ? i : 0;
	var fwdL = fwdCorr + rev.length;
	var revL = revCorr + fwd.length;
	var overlap = (fwdL < revL ? fwdL : revL) - (fwdCorr + revCorr);
	if(scoreCalculationMethod == 2) {
		var maxScore = 0;
		var cScore = 0;
		var _g = 0;
		var _g1 = overlap;
		while(_g < _g1) {
			var pos = _g++;
			var a = fwd.charAt(pos + fwdCorr);
			var b = rev.charAt(pos + revCorr);
			if(a == b && (a == "A" || a == "C" || a == "G" || a == "T")) {
				++fullMatches;
				++cScore;
			} else {
				var aa = champuru_Champuru.CHARS_TO_INT.h[a];
				var ba = champuru_Champuru.CHARS_TO_INT.h[b];
				if((aa & ba) != 0) {
					++matches;
					++cScore;
				} else {
					++mismatches;
					cScore = 0;
				}
			}
			if(maxScore <= cScore) {
				maxScore = cScore;
			}
		}
		return { matches : matches + fullMatches, mismatches : mismatches, score : maxScore};
	}
	var _g = 0;
	var _g1 = overlap;
	while(_g < _g1) {
		var pos = _g++;
		var a = fwd.charAt(pos + fwdCorr);
		var b = rev.charAt(pos + revCorr);
		if(a == b && (a == "A" || a == "C" || a == "G" || a == "T")) {
			++fullMatches;
		} else {
			var aa = champuru_Champuru.CHARS_TO_INT.h[a];
			var ba = champuru_Champuru.CHARS_TO_INT.h[b];
			if((aa & ba) != 0) {
				++matches;
			} else {
				++mismatches;
			}
		}
	}
	return { matches : matches + fullMatches, mismatches : mismatches, score : scoreCalculationMethod == 0 ? matches + fullMatches - 0.25 * overlap : fullMatches + 0.5 * matches - 0.25 * overlap};
};
champuru_Champuru.timeToStr = function(f) {
	return "" + Math.round(f * 1000);
};
champuru_Champuru.calcOverlapScores = function(fwd,rev,scoreCalculationMethod) {
	var result = [];
	var _g = -fwd.length + 1;
	var _g1 = rev.length;
	while(_g < _g1) {
		var i = _g++;
		var score = champuru_Champuru.calcScore(fwd,rev,i,scoreCalculationMethod);
		result.push({ nr : i - fwd.length + 1, index : i, score : score.score, matches : score.matches, mismatches : score.mismatches});
	}
	return result;
};
champuru_Champuru.countProblems = function(s) {
	var result = 0;
	var _g = 0;
	var _g1 = s.length;
	while(_g < _g1) {
		var i = _g++;
		var c = s.charAt(i);
		if(c == "_") {
			++result;
		}
	}
	return result;
};
champuru_Champuru.getProblematicPositions = function(s) {
	var result = new haxe_ds_List();
	var _g = 0;
	var _g1 = s.length;
	while(_g < _g1) {
		var i = _g++;
		var c = s.charAt(i);
		if(c == "_") {
			result.add(i + 1);
		}
	}
	return result;
};
champuru_Champuru.countAmb = function(s) {
	var result = 0;
	var _g = 0;
	var _g1 = s.length;
	while(_g < _g1) {
		var i = _g++;
		var c = s.charAt(i);
		if(c == "A" || c == "C" || c == "T" || c == "G" || c == "_") {
			continue;
		}
		++result;
	}
	return result;
};
champuru_Champuru.getAmbPositions = function(s) {
	var result = new haxe_ds_List();
	var _g = 0;
	var _g1 = s.length;
	while(_g < _g1) {
		var i = _g++;
		var c = s.charAt(i);
		if(c == "A" || c == "C" || c == "T" || c == "G" || c == "_") {
			continue;
		}
		result.add(i + 1);
	}
	return result;
};
champuru_Champuru.reconstruct = function(fwd,rev,i) {
	var result = new haxe_ds_List();
	var fwdCorr = i < 0 ? -i : 0;
	var revCorr = i > 0 ? i : 0;
	var fwdL = fwdCorr + rev.length;
	var revL = revCorr + fwd.length;
	var overlap = (fwdL < revL ? fwdL : revL) - (fwdCorr + revCorr);
	var _g = 0;
	var _g1 = overlap;
	while(_g < _g1) {
		var pos = _g++;
		var a = fwd.charAt(pos + fwdCorr);
		var b = rev.charAt(pos + revCorr);
		var ia = champuru_Champuru.CHARS_TO_INT.h[a];
		var ib = champuru_Champuru.CHARS_TO_INT.h[b];
		var c = ia & ib;
		var c1 = champuru_Champuru.INTS_TO_CHAR.h[c];
		result.add(c1);
	}
	return result.join("");
};
champuru_Champuru.toInts = function(s) {
	var this1 = new Array(s.length);
	var result = this1;
	var _g = 0;
	var _g1 = s.length;
	while(_g < _g1) {
		var i = _g++;
		var chr = s.charAt(i);
		if(Object.prototype.hasOwnProperty.call(champuru_Champuru.CHARS_TO_INT.h,chr)) {
			result[i] = champuru_Champuru.CHARS_TO_INT.h[chr];
		} else {
			result[i] = 0;
		}
	}
	return result;
};
champuru_Champuru.toString = function(v) {
	var result = new haxe_ds_List();
	var _g = 0;
	while(_g < v.length) {
		var int = v[_g];
		++_g;
		if(champuru_Champuru.INTS_TO_CHAR.h.hasOwnProperty(int)) {
			result.add(champuru_Champuru.INTS_TO_CHAR.h[int]);
		} else {
			result.add("_");
		}
	}
	return result.join("");
};
champuru_Champuru.reverse = function(seq) {
	var this1 = new Array(seq.length);
	var result = this1;
	var i = 1;
	var _g = 0;
	while(_g < seq.length) {
		var val = seq[_g];
		++_g;
		result[seq.length - i] = val;
		++i;
	}
	return result;
};
champuru_Champuru.diff = function(a,b,shift) {
	var this1 = new Array(a.length);
	var result = this1;
	var xPos = new haxe_ds_List();
	var problems = new haxe_ds_List();
	var _g = 0;
	var _g1 = a.length;
	while(_g < _g1) {
		var i = _g++;
		var a_ = a[i];
		var b_ = i + shift >= 0 && i + shift < b.length ? b[i + shift] : 0;
		if(b_ == 0) {
			result[i] = a_;
		} else {
			result[i] = a_ & b_;
			if((a_ | result[i]) != b_) {
				xPos.add(i + 1);
			}
			if(result[i] == 0) {
				problems.add(i + 1);
			}
		}
	}
	return { result : result, pos : xPos, problems : problems};
};
champuru_Champuru.minus = function(orig,cons,idx) {
	var origCorr = idx < 0 ? -idx : 0;
	var this1 = new Array(cons.length);
	var result = this1;
	var _g = 0;
	var _g1 = cons.length;
	while(_g < _g1) {
		var i = _g++;
		var a = orig[i + origCorr];
		var b = cons[i];
		if(a == b && (a == 1 || a == 2 || a == 4 || a == 8)) {
			result[i] = a;
		} else if(a == b) {
			result[i] = a;
		} else {
			result[i] = a - b;
		}
		if(result[i] < 0) {
			throw haxe_Exception.thrown("Self-check failed. There is something is wrong here! It would be nice if you could send your sequences to jflot@ulb.ac.be so that we may fix this problem.");
		}
	}
	return result;
};
champuru_Champuru.reconstructSeq = function(fwd,rev,sequenceA,sequenceB,i,j) {
	console.log("champuru/Champuru.hx:297:","=== Input of reconstruct sequence function ===");
	var fwd_ = champuru_Champuru.toInts(fwd);
	var rev_ = champuru_Champuru.toInts(rev);
	var a_ = champuru_Champuru.toInts(sequenceA);
	var b_ = champuru_Champuru.toInts(sequenceB);
	var restF = champuru_Champuru.minus(fwd_,a_,i);
	var restR = champuru_Champuru.minus(rev_,b_,-j);
	console.log("champuru/Champuru.hx:304:","fwd: " + fwd + " " + Std.string(fwd_));
	console.log("champuru/Champuru.hx:305:","rev: " + rev + " " + Std.string(rev_));
	console.log("champuru/Champuru.hx:306:","sequenceA: " + sequenceA + " " + Std.string(a_));
	console.log("champuru/Champuru.hx:307:","sequenceB: " + sequenceB + " " + Std.string(b_));
	console.log("champuru/Champuru.hx:308:","i: " + i);
	console.log("champuru/Champuru.hx:309:","j: " + j);
	console.log("champuru/Champuru.hx:310:","restF: " + Std.string(restF));
	console.log("champuru/Champuru.hx:311:","restR: " + Std.string(restR));
	var shift = i - j;
	var ashift = 0;
	var bshift = 0;
	if(i > 0) {
		ashift = shift;
		bshift = 0;
	} else if(j > 0) {
		ashift = shift;
		bshift = 0;
	} else {
		ashift = 0;
		bshift = shift;
	}
	var reconstructedA_ = champuru_Champuru.diff(a_,restR,ashift);
	var reconstructedB_ = champuru_Champuru.diff(b_,restF,bshift);
	if(reconstructedA_.problems.length + reconstructedB_.problems.length != 0) {
		reconstructedA_ = champuru_Champuru.diff(a_,restR,0);
		reconstructedB_ = champuru_Champuru.diff(b_,restF,shift);
		if(reconstructedA_.problems.length + reconstructedB_.problems.length != 0) {
			reconstructedA_ = champuru_Champuru.diff(a_,restR,shift);
			reconstructedB_ = champuru_Champuru.diff(b_,restF,0);
			if(reconstructedA_.problems.length + reconstructedB_.problems.length != 0) {
				reconstructedA_ = champuru_Champuru.diff(a_,restR,0);
				reconstructedB_ = champuru_Champuru.diff(b_,restF,-shift);
				if(reconstructedA_.problems.length + reconstructedB_.problems.length != 0) {
					reconstructedA_ = champuru_Champuru.diff(a_,restR,-shift);
					reconstructedB_ = champuru_Champuru.diff(b_,restF,0);
					if(reconstructedA_.problems.length + reconstructedB_.problems.length != 0) {
						reconstructedA_ = champuru_Champuru.diff(a_,restR,ashift);
						reconstructedB_ = champuru_Champuru.diff(b_,restF,bshift);
					}
				}
			}
		}
	}
	var recA = champuru_Champuru.toString(reconstructedA_.result);
	var recB = champuru_Champuru.toString(reconstructedB_.result);
	if(reconstructedA_.problems.length + reconstructedB_.problems.length == 0) {
		if(recA != sequenceA || recB != sequenceB) {
			return champuru_Champuru.reconstructSeq(fwd,rev,recA,recB,i,j);
		}
	}
	return { a : recA, b : recB, fPos : reconstructedB_.pos, rPos : reconstructedA_.pos};
};
champuru_Champuru.genScorePlot = function(scores,high,low) {
	var result = new haxe_ds_List();
	result.add("<svg id='scorePlot' class='plot middle' width='600' height='400'>");
	result.add("<rect width='600' height='400' style='fill:white' />");
	result.add("<text x='010' y='200' text-anchor='middle' style='font-family: monospace; text-size: 12.5px' transform='rotate(270 7.5 195)'>Score</text>");
	result.add("<text x='300' y='395' text-anchor='middle' style='font-family: monospace; text-size: 12.5px'>Offset</text>");
	var d = high - low;
	var i = 0;
	var _g = 0;
	while(_g < scores.length) {
		var score = scores[_g];
		++_g;
		var x = 30 + 560.0 * (i / scores.length);
		var y = 370 - 350 * ((score.score - low) / d);
		var alertMsg = "Offset: " + score.index + "\\nScore: " + score.score + "\\nMatches: " + score.matches + "\\nMismatches: " + score.mismatches;
		result.add("<circle id='c" + score.index + "' cx='" + x + "' cy='" + y + "' r='2' fill='black' title='" + 1 + "' onclick='alert(\"" + alertMsg + "\")' />");
		++i;
	}
	result.add("</svg>");
	return result.join("");
};
champuru_Champuru.genScorePlotHist = function(scores,high,low) {
	var d = high - low;
	var result = new haxe_ds_List();
	result.add("<svg id='scorePlotHist' class='plot middle' width='600' height='400'>");
	result.add("<rect width='600' height='400' style='fill:white' />");
	result.add("<text x='010' y='200' text-anchor='middle' style='font-family: monospace; text-size: 12.5px' transform='rotate(270 7.5 195)'>Frequency</text>");
	result.add("<text x='300' y='395' text-anchor='start' style='font-family: monospace; text-size: 12.5px'>Score</text>");
	result.add("<text x='030' y='380' text-anchor='middle' style='font-family: monospace; text-size: 12.5px'>" + Math.floor(low) + "</text>");
	result.add("<text x='170' y='380' text-anchor='middle' style='font-family: monospace; text-size: 12.5px'>" + Math.round(d / 4) + "</text>");
	result.add("<text x='310' y='380' text-anchor='middle' style='font-family: monospace; text-size: 12.5px'>" + Math.round(d / 2) + "</text>");
	result.add("<text x='450' y='380' text-anchor='middle' style='font-family: monospace; text-size: 12.5px'>" + Math.round(d / 4 * 3) + "</text>");
	result.add("<text x='590' y='380' text-anchor='end' style='font-family: monospace; text-size: 12.5px'>" + Math.ceil(high) + "</text>");
	var hd = d / 28;
	var i = 0;
	var this1 = new Array(28);
	var v = this1;
	v[0] = 0;
	v[1] = 0;
	v[2] = 0;
	v[3] = 0;
	v[4] = 0;
	v[5] = 0;
	v[6] = 0;
	v[7] = 0;
	v[8] = 0;
	v[9] = 0;
	v[10] = 0;
	v[11] = 0;
	v[12] = 0;
	v[13] = 0;
	v[14] = 0;
	v[15] = 0;
	v[16] = 0;
	v[17] = 0;
	v[18] = 0;
	v[19] = 0;
	v[20] = 0;
	v[21] = 0;
	v[22] = 0;
	v[23] = 0;
	v[24] = 0;
	v[25] = 0;
	v[26] = 0;
	v[27] = 0;
	var _g = 0;
	while(_g < scores.length) {
		var score = scores[_g];
		++_g;
		var scoreP = (score.score - low) / d;
		var b = scoreP * 28;
		var i = Math.floor(b);
		if(i >= 28) {
			i = 27;
		}
		v[i] += 1;
	}
	var highest = 0;
	var _g = 0;
	while(_g < v.length) {
		var val = v[_g];
		++_g;
		if(highest <= val) {
			highest = val;
		}
	}
	result.add("<g style='stroke-width:1;stroke:#000;fill:#fff'>");
	var _g = 0;
	while(_g < 28) {
		var i = _g++;
		if(v[i] == 0) {
			continue;
		}
		var val = v[i] / highest;
		var x = 30 + i * 20;
		var h = val * 350;
		var y = 365 - h;
		var from = Math.round((i * hd + low) * 10) / 10.0;
		var to = Math.round(((i + 1) * hd + low) * 10) / 10.0;
		var percentage = Math.round(v[i] / scores.length * 1000) / 10.0;
		var alertMsg = "From: " + from + "\\nTo: " + to + "\\nCount: " + v[i] + " (" + percentage + "%)";
		result.add("<rect x='" + x + "' y='" + y + "' width='20' height='" + h + "' onclick='alert(\"" + alertMsg + "\");' />");
	}
	result.add("</g>");
	result.add("</svg>");
	return result.join("");
};
champuru_Champuru.doChampuru = function(fwd,rev,scoreCalculationMethod,iOffset,jOffset,useThisOffsets) {
	champuru_Champuru.mMsgs.clear();
	var timestamp1 = HxOverrides.now() / 1000;
	var scores = champuru_Champuru.calcOverlapScores(fwd,rev,scoreCalculationMethod);
	var timestamp2 = HxOverrides.now() / 1000;
	var sortedScores = scores.slice();
	sortedScores.sort(function(a,b) {
		var result = b.score - a.score;
		if(result == 0) {
			return a.mismatches - b.mismatches;
		} else if(result > 0) {
			return 1;
		}
		return -1;
	});
	var timestamp3 = HxOverrides.now() / 1000;
	var lowestScore = sortedScores.pop();
	sortedScores.push(lowestScore);
	if(!useThisOffsets) {
		iOffset = sortedScores[0].index;
		jOffset = sortedScores[1].index;
	}
	var sortedScoresStringList = new haxe_ds_List();
	sortedScoresStringList.add("#\tOffset\tScore\tMatches\tMismatches");
	var i = 1;
	var _g = 0;
	while(_g < sortedScores.length) {
		var score = sortedScores[_g];
		++_g;
		sortedScoresStringList.add(i + "\t" + score.index + "\t" + score.score + "\t" + score.matches + "\t" + score.mismatches);
		++i;
	}
	var sortedScoresString = sortedScoresStringList.join("\n");
	var sortedScoresStringB64 = haxe_crypto_Base64.encode(haxe_io_Bytes.ofString(sortedScoresString));
	champuru_Champuru.mMsgs.add("<fieldset>");
	champuru_Champuru.mMsgs.add("<legend>Input</legend>");
	champuru_Champuru.mMsgs.add("<p>Forward sequence of length " + fwd.length + ": <span class='sequence'>");
	champuru_Champuru.mMsgs.add(fwd);
	champuru_Champuru.mMsgs.add("</p><p>Reverse sequence of length " + rev.length + ": <span class='sequence'>");
	champuru_Champuru.mMsgs.add(rev);
	champuru_Champuru.mMsgs.add("</p>");
	champuru_Champuru.mMsgs.add("<p>Score calculation method: " + scoreCalculationMethod + "</p>");
	if(useThisOffsets) {
		champuru_Champuru.mMsgs.add("<p>Offsets to use: " + iOffset + " and " + jOffset + "</p>");
	}
	champuru_Champuru.mMsgs.add("</fieldset>");
	champuru_Champuru.mMsgs.add("<br>");
	champuru_Champuru.mMsgs.add("<fieldset>");
	champuru_Champuru.mMsgs.add("<legend>1. Step - Compatibility score calculation</legend>");
	champuru_Champuru.mMsgs.add("<p>Calculated " + scores.length + " compatibility scores in " + ("" + Math.round((timestamp2 - timestamp1) * 1000)) + "ms. Sorting took " + ("" + Math.round((timestamp3 - timestamp2) * 1000)) + "ms.</p>");
	champuru_Champuru.mMsgs.add("<p>The following table [<a href-lang='text/tsv' title='table.tsv' href='data:text/tsv;base64,\n");
	champuru_Champuru.mMsgs.add(sortedScoresStringB64);
	champuru_Champuru.mMsgs.add("' title='table.tsv' download='table.tsv'>Download</a>] lists the best compatibility scores and their positions:</p>");
	champuru_Champuru.mMsgs.add("<table class='scoreTable center'>");
	champuru_Champuru.mMsgs.add("<tr class='header'>");
	champuru_Champuru.mMsgs.add("<td>#</td><td>Offset</td><td>Score</td><td>Matches</td><td>Mismatches</td>");
	champuru_Champuru.mMsgs.add("</tr>");
	var i = 1;
	var _g = 0;
	while(_g < sortedScores.length) {
		var score = sortedScores[_g];
		++_g;
		champuru_Champuru.mMsgs.add("<tr class='" + (i % 2 == 0 ? "odd" : "even") + "' onmouseover='highlight(\"c" + score.index + "\")' onmouseout='removeHighlight(\"c" + score.index + "\")'>");
		champuru_Champuru.mMsgs.add("<td>" + i + "</td><td>" + score.index + "</td><td>" + score.score + "</td><td>" + score.matches + "</td><td>" + score.mismatches + "</td>");
		champuru_Champuru.mMsgs.add("</tr>");
		++i;
		if(i >= 6) {
			break;
		}
	}
	champuru_Champuru.mMsgs.add("</table>");
	champuru_Champuru.mMsgs.add("<p>Here is a plot of the shift calculation result:</p>");
	var s = champuru_Champuru.genScorePlot(scores,sortedScores[0].score,lowestScore.score);
	champuru_Champuru.mMsgs.add(s);
	champuru_Champuru.mMsgs.add("<p>Warning: Close points may be overlapping!</p>");
	champuru_Champuru.mMsgs.add("<p>And as histogram:</p>");
	var s = champuru_Champuru.genScorePlotHist(scores,sortedScores[0].score,lowestScore.score);
	champuru_Champuru.mMsgs.add(s);
	if(useThisOffsets) {
		champuru_Champuru.mMsgs.add("<p>User requested to use the offsets " + iOffset + " and " + jOffset + " for calculation.</p>");
	} else {
		champuru_Champuru.mMsgs.add("<p>Using offsets " + iOffset + " and " + jOffset + " for calculation.</p>");
	}
	champuru_Champuru.mMsgs.add("<span class='middle'><button onclick='rerunAnalysisWithDifferentOffsets(\"" + fwd + "\", \"" + rev + "\", " + scoreCalculationMethod + ")'>Use different offsets</button></span>");
	champuru_Champuru.mMsgs.add("</fieldset>");
	champuru_Champuru.mMsgs.add("<br>");
	var sequenceA = champuru_Champuru.reconstruct(fwd,rev,iOffset);
	var sequenceB = champuru_Champuru.reconstruct(fwd,rev,jOffset);
	var problemsFwd = champuru_Champuru.countProblems(sequenceA);
	var problemsRev = champuru_Champuru.countProblems(sequenceB);
	var problems = problemsFwd + problemsRev;
	var remainingAmbFwd = champuru_Champuru.countAmb(sequenceA);
	var remainingAmbRev = champuru_Champuru.countAmb(sequenceB);
	champuru_Champuru.mMsgs.add("<fieldset>");
	champuru_Champuru.mMsgs.add("<legend>2. Step - Calculate consensus sequences</legend>");
	champuru_Champuru.mMsgs.add("<p>First consensus sequence: <span id='consensus1' class='sequence'>");
	champuru_Champuru.mMsgs.add(sequenceA);
	champuru_Champuru.mMsgs.add("</span></p>");
	champuru_Champuru.mMsgs.add("<p>Second consensus sequence: <span id='consensus2' class='sequence'>");
	champuru_Champuru.mMsgs.add(sequenceB);
	champuru_Champuru.mMsgs.add("</span></p>");
	if(problems == 1) {
		champuru_Champuru.mMsgs.add("<p>There is 1 incompatible position (indicated with an underscore), please check the input sequences.</p>");
	} else if(problems > 1) {
		champuru_Champuru.mMsgs.add("<p>There are " + problems + " incompatible positions (indicated with underscores), please check the input sequences.</p>");
	}
	if(problems > 0) {
		champuru_Champuru.mMsgs.add("<span class='middle'><button onclick='colorConsensusByIncompatiblePositions()'>Color underscores</button><button onclick='removeColor()'>Remove color</button></span>");
	}
	if(remainingAmbFwd == 1) {
		champuru_Champuru.mMsgs.add("<p>There is 1 ambiguity in the first consensus sequence.</p>");
	} else if(remainingAmbFwd > 1) {
		champuru_Champuru.mMsgs.add("<p>There are " + remainingAmbFwd + " ambiguities in the first consensus sequence.</p>");
	}
	if(remainingAmbRev == 1) {
		champuru_Champuru.mMsgs.add("<p>There is 1 ambiguity in the second consensus sequence.</p>");
	} else if(remainingAmbRev > 1) {
		champuru_Champuru.mMsgs.add("<p>There are " + remainingAmbRev + " ambiguities in the second consensus sequence.</p>");
	}
	if(remainingAmbFwd + remainingAmbRev > 0) {
		champuru_Champuru.mMsgs.add("<span class='middle'><button onclick='colorConsensusByAmbPositions()'>Color ambiguities</button><button onclick='removeColor()'>Remove color</button></span>");
	}
	champuru_Champuru.mMsgs.add("</fieldset>");
	champuru_Champuru.mMsgs.add("<br>");
	var timestamp4 = HxOverrides.now() / 1000;
	var reconstruction = champuru_Champuru.reconstructSeq(fwd,rev,sequenceA,sequenceB,iOffset,jOffset);
	var timestamp5 = HxOverrides.now() / 1000;
	problems = champuru_Champuru.countProblems(reconstruction.a) + champuru_Champuru.countProblems(reconstruction.b);
	var ambPos = champuru_Champuru.countAmb(reconstruction.a) + champuru_Champuru.countAmb(reconstruction.b);
	champuru_Champuru.mMsgs.add("<fieldset class='" + (problems > 0 ? "greyout" : "") + "'>");
	champuru_Champuru.mMsgs.add("<legend>3. Step - Sequence reconstruction</legend>");
	champuru_Champuru.mMsgs.add("<p>Cleaning up ambiguities by sequence comparison took " + ("" + Math.round((timestamp5 - timestamp4) * 1000)) + "ms.</p>");
	champuru_Champuru.mMsgs.add("<p>First reconstructed sequence [<a href='#' onclick='return toClipboard(\"reconstructed1\")'>Copy to clipboard</a>]: <span id='reconstructed1' class='sequence'>");
	champuru_Champuru.mMsgs.add(reconstruction.a);
	champuru_Champuru.mMsgs.add("</span></p>");
	champuru_Champuru.mMsgs.add("<p>Second reconstructed sequence [<a href='#' onclick='return toClipboard(\"reconstructed2\")'>Copy to clipboard</a>]: <span id='reconstructed2' class='sequence'>");
	champuru_Champuru.mMsgs.add(reconstruction.b);
	champuru_Champuru.mMsgs.add("</span></p>");
	if(problems == 0) {
		champuru_Champuru.mMsgs.add("<span class='middle'><button onclick='download()'>Download</button></span>");
	} else if(problems == 1) {
		champuru_Champuru.mMsgs.add("<p>There is 1 problematic position!</p>");
	} else if(problems > 1) {
		champuru_Champuru.mMsgs.add("<p>There are " + problems + " problematic positions!</p>");
	}
	if(problems >= 1) {
		var pF = champuru_Champuru.getProblematicPositions(reconstruction.a);
		var pR = champuru_Champuru.getProblematicPositions(reconstruction.b);
		champuru_Champuru.mMsgs.add("<p>");
		if(pF.length > 0) {
			var s = "Problematic position(s) on forward: <span class='sequence'>" + pF.join(",") + "</span>";
			champuru_Champuru.mMsgs.add(s);
		}
		if(pF.length > 0 && pR.length > 0) {
			champuru_Champuru.mMsgs.add("<br>");
		}
		if(pR.length > 0) {
			var s = "Problematic position(s) on reverse: <span class='sequence'>" + pR.join(",") + "</span>";
			champuru_Champuru.mMsgs.add(s);
		}
		champuru_Champuru.mMsgs.add("</p>");
	}
	if(problems > 0) {
		champuru_Champuru.mMsgs.add("<span class='middle'><button onclick='colorProblems()'>Color problems</button><button onclick='removeColorFinal()'>Remove color</button></span>");
	}
	if(ambPos == 1) {
		champuru_Champuru.mMsgs.add("<p>There is 1 ambiguity left!</p>");
	} else if(ambPos > 1) {
		champuru_Champuru.mMsgs.add("<p>There are " + ambPos + " ambiguities left!</p>");
	}
	if(reconstruction.fPos.length >= 1 || reconstruction.rPos.length >= 1) {
		champuru_Champuru.mMsgs.add("<p>");
		if(reconstruction.fPos.length == 1) {
			var s = "A peak unaccounted for was detected in the forward sequence at position: <span class='sequence'>" + reconstruction.fPos.first() + "</span><br>";
			champuru_Champuru.mMsgs.add(s);
		} else if(reconstruction.fPos.length > 1) {
			var s = "Peaks unaccounted for were detected in the forward sequence at positions: <span class='sequence'>" + reconstruction.fPos.join(",") + "</span><br>";
			champuru_Champuru.mMsgs.add(s);
		}
		if(reconstruction.rPos.length == 1) {
			var s = "A peak unaccounted for was detected in the reverse sequence at position: <span class='sequence'>" + reconstruction.rPos.first() + "</span><br>";
			champuru_Champuru.mMsgs.add(s);
		} else if(reconstruction.rPos.length > 1) {
			var s = "Peaks unaccounted for were detected in the reverse sequence at positions: <span class='sequence'>" + reconstruction.rPos.join(",") + "</span><br>";
			champuru_Champuru.mMsgs.add(s);
		}
		champuru_Champuru.mMsgs.add("</p>");
	}
	if(ambPos >= 1) {
		var pF = champuru_Champuru.getAmbPositions(reconstruction.a);
		var pR = champuru_Champuru.getAmbPositions(reconstruction.b);
		champuru_Champuru.mMsgs.add("<p>");
		if(pF.length > 0) {
			var s = "Ambiguity position(s) on forward: <span class='sequence'>" + champuru_Champuru.getAmbPositions(reconstruction.a).join(",") + "</span>";
			champuru_Champuru.mMsgs.add(s);
		}
		if(pF.length > 0 && pR.length > 0) {
			champuru_Champuru.mMsgs.add("<br>");
		}
		if(pR.length > 0) {
			var s = "Ambiguity position(s) on reverse: <span class='sequence'>" + champuru_Champuru.getAmbPositions(reconstruction.b).join(",") + "</span>";
			champuru_Champuru.mMsgs.add(s);
		}
		champuru_Champuru.mMsgs.add("</p>");
	}
	if(ambPos > 0) {
		champuru_Champuru.mMsgs.add("<span class='middle'><button onclick='colorAmbPos()'>Color ambiguities</button><button onclick='removeColorFinal()'>Remove color</button></span>");
	}
	champuru_Champuru.mMsgs.add("</fieldset>");
	return { result : champuru_Champuru.mMsgs.join(""), problematicPositions : problems, iOffset : iOffset, jOffset : jOffset};
};
champuru_Champuru.onMessage = function(e) {
	try {
		var fwd = js_Boot.__cast(e.data.fwd , String);
		var rev = js_Boot.__cast(e.data.rev , String);
		var scoreCalculationMethod = js_Boot.__cast(e.data.score , Int);
		var i = js_Boot.__cast(e.data.i , Int);
		var j = js_Boot.__cast(e.data.j , Int);
		var use = js_Boot.__cast(e.data.useOffsets , Bool);
		var result = champuru_Champuru.doChampuru(fwd,rev,scoreCalculationMethod,i,j,use);
		champuru_Champuru.workerScope.postMessage(result);
	} catch( _g ) {
		var e = haxe_Exception.caught(_g).unwrap();
		champuru_Champuru.workerScope.postMessage("The following error occurred: " + Std.string(e));
	}
};
champuru_Champuru.main = function() {
	champuru_Champuru.workerScope = self;
	champuru_Champuru.workerScope.onmessage = champuru_Champuru.onMessage;
};
var haxe_IMap = function() { };
haxe_IMap.__name__ = true;
haxe_IMap.__isInterface__ = true;
var haxe_Exception = function(message,previous,native) {
	Error.call(this,message);
	this.message = message;
	this.__previousException = previous;
	this.__nativeException = native != null ? native : this;
};
haxe_Exception.__name__ = true;
haxe_Exception.caught = function(value) {
	if(((value) instanceof haxe_Exception)) {
		return value;
	} else if(((value) instanceof Error)) {
		return new haxe_Exception(value.message,null,value);
	} else {
		return new haxe_ValueException(value,null,value);
	}
};
haxe_Exception.thrown = function(value) {
	if(((value) instanceof haxe_Exception)) {
		return value.get_native();
	} else if(((value) instanceof Error)) {
		return value;
	} else {
		var e = new haxe_ValueException(value);
		return e;
	}
};
haxe_Exception.__super__ = Error;
haxe_Exception.prototype = $extend(Error.prototype,{
	unwrap: function() {
		return this.__nativeException;
	}
	,get_native: function() {
		return this.__nativeException;
	}
	,__class__: haxe_Exception
});
var haxe_ValueException = function(value,previous,native) {
	haxe_Exception.call(this,String(value),previous,native);
	this.value = value;
};
haxe_ValueException.__name__ = true;
haxe_ValueException.__super__ = haxe_Exception;
haxe_ValueException.prototype = $extend(haxe_Exception.prototype,{
	unwrap: function() {
		return this.value;
	}
	,__class__: haxe_ValueException
});
var haxe_io_Bytes = function(data) {
	this.length = data.byteLength;
	this.b = new Uint8Array(data);
	this.b.bufferValue = data;
	data.hxBytes = this;
	data.bytes = this.b;
};
haxe_io_Bytes.__name__ = true;
haxe_io_Bytes.ofString = function(s,encoding) {
	if(encoding == haxe_io_Encoding.RawNative) {
		var buf = new Uint8Array(s.length << 1);
		var _g = 0;
		var _g1 = s.length;
		while(_g < _g1) {
			var i = _g++;
			var c = s.charCodeAt(i);
			buf[i << 1] = c & 255;
			buf[i << 1 | 1] = c >> 8;
		}
		return new haxe_io_Bytes(buf.buffer);
	}
	var a = [];
	var i = 0;
	while(i < s.length) {
		var c = s.charCodeAt(i++);
		if(55296 <= c && c <= 56319) {
			c = c - 55232 << 10 | s.charCodeAt(i++) & 1023;
		}
		if(c <= 127) {
			a.push(c);
		} else if(c <= 2047) {
			a.push(192 | c >> 6);
			a.push(128 | c & 63);
		} else if(c <= 65535) {
			a.push(224 | c >> 12);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		} else {
			a.push(240 | c >> 18);
			a.push(128 | c >> 12 & 63);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		}
	}
	return new haxe_io_Bytes(new Uint8Array(a).buffer);
};
haxe_io_Bytes.prototype = {
	getString: function(pos,len,encoding) {
		if(pos < 0 || len < 0 || pos + len > this.length) {
			throw haxe_Exception.thrown(haxe_io_Error.OutsideBounds);
		}
		if(encoding == null) {
			encoding = haxe_io_Encoding.UTF8;
		}
		var s = "";
		var b = this.b;
		var i = pos;
		var max = pos + len;
		switch(encoding._hx_index) {
		case 0:
			var debug = pos > 0;
			while(i < max) {
				var c = b[i++];
				if(c < 128) {
					if(c == 0) {
						break;
					}
					s += String.fromCodePoint(c);
				} else if(c < 224) {
					var code = (c & 63) << 6 | b[i++] & 127;
					s += String.fromCodePoint(code);
				} else if(c < 240) {
					var c2 = b[i++];
					var code1 = (c & 31) << 12 | (c2 & 127) << 6 | b[i++] & 127;
					s += String.fromCodePoint(code1);
				} else {
					var c21 = b[i++];
					var c3 = b[i++];
					var u = (c & 15) << 18 | (c21 & 127) << 12 | (c3 & 127) << 6 | b[i++] & 127;
					s += String.fromCodePoint(u);
				}
			}
			break;
		case 1:
			while(i < max) {
				var c = b[i++] | b[i++] << 8;
				s += String.fromCodePoint(c);
			}
			break;
		}
		return s;
	}
	,toString: function() {
		return this.getString(0,this.length);
	}
	,__class__: haxe_io_Bytes
};
var haxe_io_Encoding = $hxEnums["haxe.io.Encoding"] = { __ename__:true,__constructs__:null
	,UTF8: {_hx_name:"UTF8",_hx_index:0,__enum__:"haxe.io.Encoding",toString:$estr}
	,RawNative: {_hx_name:"RawNative",_hx_index:1,__enum__:"haxe.io.Encoding",toString:$estr}
};
haxe_io_Encoding.__constructs__ = [haxe_io_Encoding.UTF8,haxe_io_Encoding.RawNative];
var haxe_crypto_Base64 = function() { };
haxe_crypto_Base64.__name__ = true;
haxe_crypto_Base64.encode = function(bytes,complement) {
	if(complement == null) {
		complement = true;
	}
	var str = new haxe_crypto_BaseCode(haxe_crypto_Base64.BYTES).encodeBytes(bytes).toString();
	if(complement) {
		switch(bytes.length % 3) {
		case 1:
			str += "==";
			break;
		case 2:
			str += "=";
			break;
		default:
		}
	}
	return str;
};
var haxe_crypto_BaseCode = function(base) {
	var len = base.length;
	var nbits = 1;
	while(len > 1 << nbits) ++nbits;
	if(nbits > 8 || len != 1 << nbits) {
		throw haxe_Exception.thrown("BaseCode : base length must be a power of two.");
	}
	this.base = base;
	this.nbits = nbits;
};
haxe_crypto_BaseCode.__name__ = true;
haxe_crypto_BaseCode.prototype = {
	encodeBytes: function(b) {
		var nbits = this.nbits;
		var base = this.base;
		var size = b.length * 8 / nbits | 0;
		var out = new haxe_io_Bytes(new ArrayBuffer(size + (b.length * 8 % nbits == 0 ? 0 : 1)));
		var buf = 0;
		var curbits = 0;
		var mask = (1 << nbits) - 1;
		var pin = 0;
		var pout = 0;
		while(pout < size) {
			while(curbits < nbits) {
				curbits += 8;
				buf <<= 8;
				buf |= b.b[pin++];
			}
			curbits -= nbits;
			out.b[pout++] = base.b[buf >> curbits & mask];
		}
		if(curbits > 0) {
			out.b[pout++] = base.b[buf << nbits - curbits & mask];
		}
		return out;
	}
	,__class__: haxe_crypto_BaseCode
};
var haxe_ds_IntMap = function() {
	this.h = { };
};
haxe_ds_IntMap.__name__ = true;
haxe_ds_IntMap.__interfaces__ = [haxe_IMap];
haxe_ds_IntMap.prototype = {
	__class__: haxe_ds_IntMap
};
var haxe_ds__$List_ListNode = function(item,next) {
	this.item = item;
	this.next = next;
};
haxe_ds__$List_ListNode.__name__ = true;
haxe_ds__$List_ListNode.prototype = {
	__class__: haxe_ds__$List_ListNode
};
var haxe_ds_StringMap = function() {
	this.h = Object.create(null);
};
haxe_ds_StringMap.__name__ = true;
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
haxe_ds_StringMap.prototype = {
	__class__: haxe_ds_StringMap
};
var haxe_io_Error = $hxEnums["haxe.io.Error"] = { __ename__:true,__constructs__:null
	,Blocked: {_hx_name:"Blocked",_hx_index:0,__enum__:"haxe.io.Error",toString:$estr}
	,Overflow: {_hx_name:"Overflow",_hx_index:1,__enum__:"haxe.io.Error",toString:$estr}
	,OutsideBounds: {_hx_name:"OutsideBounds",_hx_index:2,__enum__:"haxe.io.Error",toString:$estr}
	,Custom: ($_=function(e) { return {_hx_index:3,e:e,__enum__:"haxe.io.Error",toString:$estr}; },$_._hx_name="Custom",$_.__params__ = ["e"],$_)
};
haxe_io_Error.__constructs__ = [haxe_io_Error.Blocked,haxe_io_Error.Overflow,haxe_io_Error.OutsideBounds,haxe_io_Error.Custom];
var haxe_iterators_ArrayIterator = function(array) {
	this.current = 0;
	this.array = array;
};
haxe_iterators_ArrayIterator.__name__ = true;
haxe_iterators_ArrayIterator.prototype = {
	hasNext: function() {
		return this.current < this.array.length;
	}
	,next: function() {
		return this.array[this.current++];
	}
	,__class__: haxe_iterators_ArrayIterator
};
var js_Boot = function() { };
js_Boot.__name__ = true;
js_Boot.getClass = function(o) {
	if(o == null) {
		return null;
	} else if(((o) instanceof Array)) {
		return Array;
	} else {
		var cl = o.__class__;
		if(cl != null) {
			return cl;
		}
		var name = js_Boot.__nativeClassName(o);
		if(name != null) {
			return js_Boot.__resolveNativeClass(name);
		}
		return null;
	}
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) {
		return "null";
	}
	if(s.length >= 5) {
		return "<...>";
	}
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) {
		t = "object";
	}
	switch(t) {
	case "function":
		return "<function>";
	case "object":
		if(o.__enum__) {
			var e = $hxEnums[o.__enum__];
			var con = e.__constructs__[o._hx_index];
			var n = con._hx_name;
			if(con.__params__) {
				s = s + "\t";
				return n + "(" + ((function($this) {
					var $r;
					var _g = [];
					{
						var _g1 = 0;
						var _g2 = con.__params__;
						while(true) {
							if(!(_g1 < _g2.length)) {
								break;
							}
							var p = _g2[_g1];
							_g1 = _g1 + 1;
							_g.push(js_Boot.__string_rec(o[p],s));
						}
					}
					$r = _g;
					return $r;
				}(this))).join(",") + ")";
			} else {
				return n;
			}
		}
		if(((o) instanceof Array)) {
			var str = "[";
			s += "\t";
			var _g = 0;
			var _g1 = o.length;
			while(_g < _g1) {
				var i = _g++;
				str += (i > 0 ? "," : "") + js_Boot.__string_rec(o[i],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( _g ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") {
				return s2;
			}
		}
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		var k = null;
		for( k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) {
			str += ", \n";
		}
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "string":
		return o;
	default:
		return String(o);
	}
};
js_Boot.__interfLoop = function(cc,cl) {
	if(cc == null) {
		return false;
	}
	if(cc == cl) {
		return true;
	}
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g = 0;
		var _g1 = intf.length;
		while(_g < _g1) {
			var i = _g++;
			var i1 = intf[i];
			if(i1 == cl || js_Boot.__interfLoop(i1,cl)) {
				return true;
			}
		}
	}
	return js_Boot.__interfLoop(cc.__super__,cl);
};
js_Boot.__instanceof = function(o,cl) {
	if(cl == null) {
		return false;
	}
	switch(cl) {
	case Array:
		return ((o) instanceof Array);
	case Bool:
		return typeof(o) == "boolean";
	case Dynamic:
		return o != null;
	case Float:
		return typeof(o) == "number";
	case Int:
		if(typeof(o) == "number") {
			return ((o | 0) === o);
		} else {
			return false;
		}
		break;
	case String:
		return typeof(o) == "string";
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(js_Boot.__downcastCheck(o,cl)) {
					return true;
				}
			} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
				if(((o) instanceof cl)) {
					return true;
				}
			}
		} else {
			return false;
		}
		if(cl == Class ? o.__name__ != null : false) {
			return true;
		}
		if(cl == Enum ? o.__ename__ != null : false) {
			return true;
		}
		return o.__enum__ != null ? $hxEnums[o.__enum__] == cl : false;
	}
};
js_Boot.__downcastCheck = function(o,cl) {
	if(!((o) instanceof cl)) {
		if(cl.__isInterface__) {
			return js_Boot.__interfLoop(js_Boot.getClass(o),cl);
		} else {
			return false;
		}
	} else {
		return true;
	}
};
js_Boot.__cast = function(o,t) {
	if(o == null || js_Boot.__instanceof(o,t)) {
		return o;
	} else {
		throw haxe_Exception.thrown("Cannot cast " + Std.string(o) + " to " + Std.string(t));
	}
};
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") {
		return null;
	}
	return name;
};
js_Boot.__isNativeObj = function(o) {
	return js_Boot.__nativeClassName(o) != null;
};
js_Boot.__resolveNativeClass = function(name) {
	return $global[name];
};
if(typeof(performance) != "undefined" ? typeof(performance.now) == "function" : false) {
	HxOverrides.now = performance.now.bind(performance);
}
if( String.fromCodePoint == null ) String.fromCodePoint = function(c) { return c < 0x10000 ? String.fromCharCode(c) : String.fromCharCode((c>>10)+0xD7C0)+String.fromCharCode((c&0x3FF)+0xDC00); }
String.prototype.__class__ = String;
String.__name__ = true;
Array.__name__ = true;
var Int = { };
var Dynamic = { };
var Float = Number;
var Bool = Boolean;
var Class = { };
var Enum = { };
js_Boot.__toStr = ({ }).toString;
champuru_Champuru.mMsgs = new haxe_ds_List();
champuru_Champuru.CHARS_TO_INT = (function($this) {
	var $r;
	var _g = new haxe_ds_StringMap();
	_g.h["_"] = 0;
	_g.h["A"] = 8;
	_g.h["C"] = 4;
	_g.h["T"] = 2;
	_g.h["G"] = 1;
	_g.h["W"] = 10;
	_g.h["S"] = 5;
	_g.h["Y"] = 6;
	_g.h["R"] = 9;
	_g.h["K"] = 3;
	_g.h["M"] = 12;
	_g.h["B"] = 7;
	_g.h["D"] = 11;
	_g.h["V"] = 13;
	_g.h["H"] = 14;
	_g.h["N"] = 15;
	_g.h["?"] = 15;
	$r = _g;
	return $r;
}(this));
champuru_Champuru.INTS_TO_CHAR = (function($this) {
	var $r;
	var _g = new haxe_ds_IntMap();
	_g.h[0] = "_";
	_g.h[8] = "A";
	_g.h[4] = "C";
	_g.h[2] = "T";
	_g.h[1] = "G";
	_g.h[10] = "W";
	_g.h[5] = "S";
	_g.h[6] = "Y";
	_g.h[9] = "R";
	_g.h[3] = "K";
	_g.h[12] = "M";
	_g.h[7] = "B";
	_g.h[11] = "D";
	_g.h[13] = "V";
	_g.h[14] = "H";
	_g.h[15] = "N";
	$r = _g;
	return $r;
}(this));
haxe_crypto_Base64.CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
haxe_crypto_Base64.BYTES = haxe_io_Bytes.ofString(haxe_crypto_Base64.CHARS);
champuru_Champuru.main();
})(typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
