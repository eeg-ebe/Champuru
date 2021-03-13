// Generated by Haxe 3.4.4
(function ($global) { "use strict";
var $estr = function() { return js_Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var HxOverrides = function() { };
HxOverrides.__name__ = true;
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) {
		return undefined;
	}
	return x;
};
var List = function() {
	this.length = 0;
};
List.__name__ = true;
List.prototype = {
	add: function(item) {
		var x = new _$List_ListNode(item,null);
		if(this.h == null) {
			this.h = x;
		} else {
			this.q.next = x;
		}
		this.q = x;
		this.length++;
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
	,__class__: List
};
var _$List_ListNode = function(item,next) {
	this.item = item;
	this.next = next;
};
_$List_ListNode.__name__ = true;
_$List_ListNode.prototype = {
	__class__: _$List_ListNode
};
Math.__name__ = true;
var Std = function() { };
Std.__name__ = true;
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
var champuru_Champuru = function() { };
champuru_Champuru.__name__ = true;
champuru_Champuru.out = function(s) {
	champuru_Champuru.mMsgs.add(s);
};
champuru_Champuru.compareBases = function(a,b) {
	var _this = champuru_Champuru.CHARS_TO_INT;
	var aa = __map_reserved[a] != null ? _this.getReserved(a) : _this.h[a];
	var _this1 = champuru_Champuru.CHARS_TO_INT;
	var ba = __map_reserved[b] != null ? _this1.getReserved(b) : _this1.h[b];
	return (aa & ba) != 0;
};
champuru_Champuru.getMatchChar = function(a,b) {
	var _this = champuru_Champuru.CHARS_TO_INT;
	var ia = __map_reserved[a] != null ? _this.getReserved(a) : _this.h[a];
	var _this1 = champuru_Champuru.CHARS_TO_INT;
	var ib = __map_reserved[b] != null ? _this1.getReserved(b) : _this1.h[b];
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
		var _g1 = 0;
		var _g = overlap;
		while(_g1 < _g) {
			var pos = _g1++;
			var a = fwd.charAt(pos + fwdCorr);
			var b = rev.charAt(pos + revCorr);
			if(a == b && (a == "A" || a == "C" || a == "G" || a == "T")) {
				++fullMatches;
				++cScore;
			} else {
				var _this = champuru_Champuru.CHARS_TO_INT;
				var aa = __map_reserved[a] != null ? _this.getReserved(a) : _this.h[a];
				var _this1 = champuru_Champuru.CHARS_TO_INT;
				var ba = __map_reserved[b] != null ? _this1.getReserved(b) : _this1.h[b];
				if((aa & ba) != 0) {
					++matches;
					++cScore;
				} else {
					++mismatches;
					cScore = 0;
				}
			}
			if(maxScore > cScore) {
				maxScore = maxScore;
			} else {
				maxScore = cScore;
			}
		}
		return { matches : matches + fullMatches, mismatches : mismatches, score : maxScore};
	}
	var _g11 = 0;
	var _g2 = overlap;
	while(_g11 < _g2) {
		var pos1 = _g11++;
		var a1 = fwd.charAt(pos1 + fwdCorr);
		var b1 = rev.charAt(pos1 + revCorr);
		if(a1 == b1 && (a1 == "A" || a1 == "C" || a1 == "G" || a1 == "T")) {
			++fullMatches;
		} else {
			var _this2 = champuru_Champuru.CHARS_TO_INT;
			var aa1 = __map_reserved[a1] != null ? _this2.getReserved(a1) : _this2.h[a1];
			var _this3 = champuru_Champuru.CHARS_TO_INT;
			var ba1 = __map_reserved[b1] != null ? _this3.getReserved(b1) : _this3.h[b1];
			if((aa1 & ba1) != 0) {
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
	var _g1 = -fwd.length + 1;
	var _g = rev.length;
	while(_g1 < _g) {
		var i = _g1++;
		var score = champuru_Champuru.calcScore(fwd,rev,i,scoreCalculationMethod);
		result.push({ nr : i - fwd.length + 1, index : i, score : score.score, matches : score.matches, mismatches : score.mismatches});
	}
	return result;
};
champuru_Champuru.countProblems = function(s) {
	var result = 0;
	var _g1 = 0;
	var _g = s.length;
	while(_g1 < _g) {
		var i = _g1++;
		var c = s.charAt(i);
		if(c == "_") {
			++result;
		}
	}
	return result;
};
champuru_Champuru.countAmb = function(s) {
	var result = 0;
	var _g1 = 0;
	var _g = s.length;
	while(_g1 < _g) {
		var i = _g1++;
		var c = s.charAt(i);
		if(c == "A" || c == "C" || c == "T" || c == "G" || c == "_") {
			continue;
		}
		++result;
	}
	return result;
};
champuru_Champuru.reconstruct = function(fwd,rev,i) {
	var result = new List();
	var fwdCorr = i < 0 ? -i : 0;
	var revCorr = i > 0 ? i : 0;
	var fwdL = fwdCorr + rev.length;
	var revL = revCorr + fwd.length;
	var overlap = (fwdL < revL ? fwdL : revL) - (fwdCorr + revCorr);
	var _g1 = 0;
	var _g = overlap;
	while(_g1 < _g) {
		var pos = _g1++;
		var a = fwd.charAt(pos + fwdCorr);
		var b = rev.charAt(pos + revCorr);
		var _this = champuru_Champuru.CHARS_TO_INT;
		var ia = __map_reserved[a] != null ? _this.getReserved(a) : _this.h[a];
		var _this1 = champuru_Champuru.CHARS_TO_INT;
		var ib = __map_reserved[b] != null ? _this1.getReserved(b) : _this1.h[b];
		var c = ia & ib;
		var c1 = champuru_Champuru.INTS_TO_CHAR.h[c];
		result.add(c1);
	}
	return result.join("");
};
champuru_Champuru.toInts = function(s) {
	var length = s.length;
	var this1 = new Array(length);
	var result = this1;
	var _g1 = 0;
	var _g = s.length;
	while(_g1 < _g) {
		var i = _g1++;
		var chr = s.charAt(i);
		var _this = champuru_Champuru.CHARS_TO_INT;
		if(__map_reserved[chr] != null ? _this.existsReserved(chr) : _this.h.hasOwnProperty(chr)) {
			var _this1 = champuru_Champuru.CHARS_TO_INT;
			result[i] = __map_reserved[chr] != null ? _this1.getReserved(chr) : _this1.h[chr];
		} else {
			result[i] = 0;
		}
	}
	return result;
};
champuru_Champuru.toString = function(v) {
	var result = new List();
	var _g = 0;
	while(_g < v.length) {
		var $int = v[_g];
		++_g;
		if(champuru_Champuru.INTS_TO_CHAR.h.hasOwnProperty($int)) {
			result.add(champuru_Champuru.INTS_TO_CHAR.h[$int]);
		} else {
			result.add("_");
		}
	}
	return result.join("");
};
champuru_Champuru.reverse = function(seq) {
	var length = seq.length;
	var this1 = new Array(length);
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
	var length = a.length;
	var this1 = new Array(length);
	var result = this1;
	var _g1 = 0;
	var _g = a.length;
	while(_g1 < _g) {
		var i = _g1++;
		var a_ = a[i];
		var b_ = i + shift >= 0 && i + shift < b.length ? b[i + shift] : 0;
		if(b_ == 0) {
			result[i] = a_;
		} else {
			result[i] = a_ & b_;
		}
	}
	return result;
};
champuru_Champuru.minus = function(orig,cons,idx) {
	var origCorr = idx < 0 ? -idx : 0;
	var length = cons.length;
	var this1 = new Array(length);
	var result = this1;
	var _g1 = 0;
	var _g = cons.length;
	while(_g1 < _g) {
		var i = _g1++;
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
			throw new js__$Boot_HaxeError("Self-check failed. There is something is wrong here! It would be nice if you could send your sequences to jflot@ulb.ac.be so that we may fix this problem.");
		}
	}
	return result;
};
champuru_Champuru.reconstructSeq = function(fwd,rev,sequenceA,sequenceB,i,j) {
	var fwd_ = champuru_Champuru.toInts(fwd);
	var rev_ = champuru_Champuru.toInts(rev);
	var a_ = champuru_Champuru.toInts(sequenceA);
	var b_ = champuru_Champuru.toInts(sequenceB);
	var restF = champuru_Champuru.minus(fwd_,a_,i);
	var restR = champuru_Champuru.minus(rev_,b_,-j);
	var shift = i - j;
	var ashift = 0;
	var bshift = 0;
	if(i > 0) {
		if(j > 0) {
			ashift = shift;
			bshift = 0;
		} else {
			ashift = 0;
			bshift = shift;
		}
	} else if(j > 0) {
		ashift = shift;
		bshift = 0;
	} else {
		ashift = 0;
		bshift = shift;
	}
	var reconstructedA_ = champuru_Champuru.diff(a_,restR,ashift);
	var reconstructedB_ = champuru_Champuru.diff(b_,restF,bshift);
	var recA = champuru_Champuru.toString(reconstructedA_);
	var recB = champuru_Champuru.toString(reconstructedB_);
	if(recA != sequenceA || recB != sequenceB) {
		return champuru_Champuru.reconstructSeq(fwd,rev,recA,recB,i,j);
	}
	return { a : recA, b : recB};
};
champuru_Champuru.genScorePlot = function(scores,high,low) {
	var result = new List();
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
	var result = new List();
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
	var _g = 0;
	while(_g < 28) {
		var i1 = _g++;
		v[i1] = 0;
	}
	var _g1 = 0;
	while(_g1 < scores.length) {
		var score = scores[_g1];
		++_g1;
		var scoreP = (score.score - low) / d;
		var b = scoreP * 28;
		var i2 = Math.floor(b);
		if(i2 >= 28) {
			i2 = 27;
		}
		var tmp = i2;
		var tmp1 = v[tmp];
		v[tmp] = tmp1 + 1;
	}
	var highest = 0;
	var _g2 = 0;
	while(_g2 < v.length) {
		var val = v[_g2];
		++_g2;
		if(highest > val) {
			highest = highest;
		} else {
			highest = val;
		}
	}
	result.add("<g style='stroke-width:1;stroke:#000;fill:#fff'>");
	var _g3 = 0;
	while(_g3 < 28) {
		var i3 = _g3++;
		if(v[i3] == 0) {
			continue;
		}
		var val1 = v[i3] / highest;
		var x = 30 + i3 * 20;
		var h = val1 * 350;
		var y = 365 - h;
		var from = Math.round((i3 * hd + low) * 10) / 10.0;
		var to = Math.round(((i3 + 1) * hd + low) * 10) / 10.0;
		var percentage = Math.round(v[i3] / scores.length * 1000) / 10.0;
		var alertMsg = "From: " + from + "\\nTo: " + to + "\\nCount: " + v[i3] + " (" + percentage + "%)";
		result.add("<rect x='" + x + "' y='" + y + "' width='20' height='" + h + "' onclick='alert(\"" + alertMsg + "\");' />");
	}
	result.add("</g>");
	result.add("</svg>");
	return result.join("");
};
champuru_Champuru.doChampuru = function(fwd,rev,scoreCalculationMethod,iOffset,jOffset,useThisOffsets) {
	champuru_Champuru.mMsgs.clear();
	var timestamp1 = new Date().getTime() / 1000;
	var scores = champuru_Champuru.calcOverlapScores(fwd,rev,scoreCalculationMethod);
	var timestamp2 = new Date().getTime() / 1000;
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
	var timestamp3 = new Date().getTime() / 1000;
	var lowestScore = sortedScores.pop();
	sortedScores.push(lowestScore);
	if(!useThisOffsets) {
		iOffset = sortedScores[0].index;
		jOffset = sortedScores[1].index;
	}
	var sortedScoresStringList = new List();
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
	var i1 = 1;
	var _g1 = 0;
	while(_g1 < sortedScores.length) {
		var score1 = sortedScores[_g1];
		++_g1;
		champuru_Champuru.mMsgs.add("<tr class='" + (i1 % 2 == 0 ? "odd" : "even") + "' onmouseover='highlight(\"c" + score1.index + "\")' onmouseout='removeHighlight(\"c" + score1.index + "\")'>");
		champuru_Champuru.mMsgs.add("<td>" + i1 + "</td><td>" + score1.index + "</td><td>" + score1.score + "</td><td>" + score1.matches + "</td><td>" + score1.mismatches + "</td>");
		champuru_Champuru.mMsgs.add("</tr>");
		++i1;
		if(i1 >= 6) {
			break;
		}
	}
	champuru_Champuru.mMsgs.add("</table>");
	champuru_Champuru.mMsgs.add("<p>Here is a plot of the shift calculation result:</p>");
	var s = champuru_Champuru.genScorePlot(scores,sortedScores[0].score,lowestScore.score);
	champuru_Champuru.mMsgs.add(s);
	champuru_Champuru.mMsgs.add("<p>Warning: Close points may be overlapping!</p>");
	champuru_Champuru.mMsgs.add("<p>And as histogram:</p>");
	var s1 = champuru_Champuru.genScorePlotHist(scores,sortedScores[0].score,lowestScore.score);
	champuru_Champuru.mMsgs.add(s1);
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
	var timestamp4 = new Date().getTime() / 1000;
	var reconstruction = champuru_Champuru.reconstructSeq(fwd,rev,sequenceA,sequenceB,iOffset,jOffset);
	var timestamp5 = new Date().getTime() / 1000;
	problems = champuru_Champuru.countProblems(reconstruction.a) + champuru_Champuru.countProblems(reconstruction.b);
	var ambPos = champuru_Champuru.countAmb(reconstruction.a) + champuru_Champuru.countAmb(reconstruction.b);
	champuru_Champuru.mMsgs.add("<fieldset>");
	champuru_Champuru.mMsgs.add("<legend>3. Step - Sequence reconstruction</legend>");
	champuru_Champuru.mMsgs.add("<p>Cleaning up ambiguities by sequence comparison took " + ("" + Math.round((timestamp5 - timestamp4) * 1000)) + "ms.</p>");
	champuru_Champuru.mMsgs.add("<p>First reconstructed sequence: <span id='reconstructed1' class='sequence'>");
	champuru_Champuru.mMsgs.add(reconstruction.a);
	champuru_Champuru.mMsgs.add("</span></p>");
	champuru_Champuru.mMsgs.add("<p>Second reconstructed sequence: <span id='reconstructed2' class='sequence'>");
	champuru_Champuru.mMsgs.add(reconstruction.b);
	champuru_Champuru.mMsgs.add("</span></p>");
	if(problems == 0) {
		champuru_Champuru.mMsgs.add("<span class='middle'><button onclick='download()'>Download</button></span>");
	} else if(problems == 1) {
		champuru_Champuru.mMsgs.add("<p>There is 1 problematic position!</p>");
	} else if(problems > 1) {
		champuru_Champuru.mMsgs.add("<p>There are " + problems + " problematic positions!</p>");
	}
	if(problems > 0) {
		champuru_Champuru.mMsgs.add("<span class='middle'><button onclick='colorProblems()'>Color problems</button><button onclick='removeColorFinal()'>Remove color</button></span>");
	}
	if(ambPos == 1) {
		champuru_Champuru.mMsgs.add("<p>There is 1 ambiguity left!</p>");
	} else if(ambPos > 1) {
		champuru_Champuru.mMsgs.add("<p>There are " + ambPos + " ambiguities left!</p>");
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
		var $use = js_Boot.__cast(e.data.useOffsets , Bool);
		var result = champuru_Champuru.doChampuru(fwd,rev,scoreCalculationMethod,i,j,$use);
		champuru_Champuru.workerScope.postMessage(result);
	} catch( e1 ) {
		if (e1 instanceof js__$Boot_HaxeError) e1 = e1.val;
		champuru_Champuru.workerScope.postMessage("The following error occurred: " + Std.string(e1));
	}
};
champuru_Champuru.main = function() {
	champuru_Champuru.workerScope = self;
	champuru_Champuru.workerScope.onmessage = champuru_Champuru.onMessage;
};
var haxe_IMap = function() { };
haxe_IMap.__name__ = true;
var haxe_io_Bytes = function(data) {
	this.length = data.byteLength;
	this.b = new Uint8Array(data);
	this.b.bufferValue = data;
	data.hxBytes = this;
	data.bytes = this.b;
};
haxe_io_Bytes.__name__ = true;
haxe_io_Bytes.ofString = function(s) {
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
	getString: function(pos,len) {
		if(pos < 0 || len < 0 || pos + len > this.length) {
			throw new js__$Boot_HaxeError(haxe_io_Error.OutsideBounds);
		}
		var s = "";
		var b = this.b;
		var fcc = String.fromCharCode;
		var i = pos;
		var max = pos + len;
		while(i < max) {
			var c = b[i++];
			if(c < 128) {
				if(c == 0) {
					break;
				}
				s += fcc(c);
			} else if(c < 224) {
				s += fcc((c & 63) << 6 | b[i++] & 127);
			} else if(c < 240) {
				var c2 = b[i++];
				s += fcc((c & 31) << 12 | (c2 & 127) << 6 | b[i++] & 127);
			} else {
				var c21 = b[i++];
				var c3 = b[i++];
				var u = (c & 15) << 18 | (c21 & 127) << 12 | (c3 & 127) << 6 | b[i++] & 127;
				s += fcc((u >> 10) + 55232);
				s += fcc(u & 1023 | 56320);
			}
		}
		return s;
	}
	,toString: function() {
		return this.getString(0,this.length);
	}
	,__class__: haxe_io_Bytes
};
var haxe_crypto_Base64 = function() { };
haxe_crypto_Base64.__name__ = true;
haxe_crypto_Base64.encode = function(bytes,complement) {
	if(complement == null) {
		complement = true;
	}
	var str = new haxe_crypto_BaseCode(haxe_crypto_Base64.BYTES).encodeBytes(bytes).toString();
	if(complement) {
		var _g = bytes.length % 3;
		switch(_g) {
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
		throw new js__$Boot_HaxeError("BaseCode : base length must be a power of two.");
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
			out.b[pout++] = base.b[buf >> curbits & mask] & 255;
		}
		if(curbits > 0) {
			out.b[pout++] = base.b[buf << nbits - curbits & mask] & 255;
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
var haxe_ds_StringMap = function() {
	this.h = { };
};
haxe_ds_StringMap.__name__ = true;
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
haxe_ds_StringMap.prototype = {
	setReserved: function(key,value) {
		if(this.rh == null) {
			this.rh = { };
		}
		this.rh["$" + key] = value;
	}
	,getReserved: function(key) {
		if(this.rh == null) {
			return null;
		} else {
			return this.rh["$" + key];
		}
	}
	,existsReserved: function(key) {
		if(this.rh == null) {
			return false;
		}
		return this.rh.hasOwnProperty("$" + key);
	}
	,__class__: haxe_ds_StringMap
};
var haxe_io_Error = { __ename__ : true, __constructs__ : ["Blocked","Overflow","OutsideBounds","Custom"] };
haxe_io_Error.Blocked = ["Blocked",0];
haxe_io_Error.Blocked.toString = $estr;
haxe_io_Error.Blocked.__enum__ = haxe_io_Error;
haxe_io_Error.Overflow = ["Overflow",1];
haxe_io_Error.Overflow.toString = $estr;
haxe_io_Error.Overflow.__enum__ = haxe_io_Error;
haxe_io_Error.OutsideBounds = ["OutsideBounds",2];
haxe_io_Error.OutsideBounds.toString = $estr;
haxe_io_Error.OutsideBounds.__enum__ = haxe_io_Error;
haxe_io_Error.Custom = function(e) { var $x = ["Custom",3,e]; $x.__enum__ = haxe_io_Error; $x.toString = $estr; return $x; };
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	this.message = String(val);
	if(Error.captureStackTrace) {
		Error.captureStackTrace(this,js__$Boot_HaxeError);
	}
};
js__$Boot_HaxeError.__name__ = true;
js__$Boot_HaxeError.wrap = function(val) {
	if((val instanceof Error)) {
		return val;
	} else {
		return new js__$Boot_HaxeError(val);
	}
};
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
	__class__: js__$Boot_HaxeError
});
var js_Boot = function() { };
js_Boot.__name__ = true;
js_Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) {
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
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) {
					return o[0];
				}
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) {
						str += "," + js_Boot.__string_rec(o[i],s);
					} else {
						str += js_Boot.__string_rec(o[i],s);
					}
				}
				return str + ")";
			}
			var l = o.length;
			var i1;
			var str1 = "[";
			s += "\t";
			var _g11 = 0;
			var _g2 = l;
			while(_g11 < _g2) {
				var i2 = _g11++;
				str1 += (i2 > 0 ? "," : "") + js_Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") {
				return s2;
			}
		}
		var k = null;
		var str2 = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str2.length != 2) {
			str2 += ", \n";
		}
		str2 += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str2 += "\n" + s + "}";
		return str2;
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
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
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
		if((o instanceof Array)) {
			return o.__enum__ == null;
		} else {
			return false;
		}
		break;
	case Bool:
		return typeof(o) == "boolean";
	case Dynamic:
		return true;
	case Float:
		return typeof(o) == "number";
	case Int:
		if(typeof(o) == "number") {
			return (o|0) === o;
		} else {
			return false;
		}
		break;
	case String:
		return typeof(o) == "string";
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) {
					return true;
				}
				if(js_Boot.__interfLoop(js_Boot.getClass(o),cl)) {
					return true;
				}
			} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
				if(o instanceof cl) {
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
		return o.__enum__ == cl;
	}
};
js_Boot.__cast = function(o,t) {
	if(js_Boot.__instanceof(o,t)) {
		return o;
	} else {
		throw new js__$Boot_HaxeError("Cannot cast " + Std.string(o) + " to " + Std.string(t));
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
var js_html_compat_ArrayBuffer = function(a) {
	if((a instanceof Array) && a.__enum__ == null) {
		this.a = a;
		this.byteLength = a.length;
	} else {
		var len = a;
		this.a = [];
		var _g1 = 0;
		var _g = len;
		while(_g1 < _g) {
			var i = _g1++;
			this.a[i] = 0;
		}
		this.byteLength = len;
	}
};
js_html_compat_ArrayBuffer.__name__ = true;
js_html_compat_ArrayBuffer.sliceImpl = function(begin,end) {
	var u = new Uint8Array(this,begin,end == null ? null : end - begin);
	var result = new ArrayBuffer(u.byteLength);
	var resultArray = new Uint8Array(result);
	resultArray.set(u);
	return result;
};
js_html_compat_ArrayBuffer.prototype = {
	slice: function(begin,end) {
		return new js_html_compat_ArrayBuffer(this.a.slice(begin,end));
	}
	,__class__: js_html_compat_ArrayBuffer
};
var js_html_compat_Uint8Array = function() { };
js_html_compat_Uint8Array.__name__ = true;
js_html_compat_Uint8Array._new = function(arg1,offset,length) {
	var arr;
	if(typeof(arg1) == "number") {
		arr = [];
		var _g1 = 0;
		var _g = arg1;
		while(_g1 < _g) {
			var i = _g1++;
			arr[i] = 0;
		}
		arr.byteLength = arr.length;
		arr.byteOffset = 0;
		arr.buffer = new js_html_compat_ArrayBuffer(arr);
	} else if(js_Boot.__instanceof(arg1,js_html_compat_ArrayBuffer)) {
		var buffer = arg1;
		if(offset == null) {
			offset = 0;
		}
		if(length == null) {
			length = buffer.byteLength - offset;
		}
		if(offset == 0) {
			arr = buffer.a;
		} else {
			arr = buffer.a.slice(offset,offset + length);
		}
		arr.byteLength = arr.length;
		arr.byteOffset = offset;
		arr.buffer = buffer;
	} else if((arg1 instanceof Array) && arg1.__enum__ == null) {
		arr = arg1.slice();
		arr.byteLength = arr.length;
		arr.byteOffset = 0;
		arr.buffer = new js_html_compat_ArrayBuffer(arr);
	} else {
		throw new js__$Boot_HaxeError("TODO " + Std.string(arg1));
	}
	arr.subarray = js_html_compat_Uint8Array._subarray;
	arr.set = js_html_compat_Uint8Array._set;
	return arr;
};
js_html_compat_Uint8Array._set = function(arg,offset) {
	if(js_Boot.__instanceof(arg.buffer,js_html_compat_ArrayBuffer)) {
		var a = arg;
		if(arg.byteLength + offset > this.byteLength) {
			throw new js__$Boot_HaxeError("set() outside of range");
		}
		var _g1 = 0;
		var _g = arg.byteLength;
		while(_g1 < _g) {
			var i = _g1++;
			this[i + offset] = a[i];
		}
	} else if((arg instanceof Array) && arg.__enum__ == null) {
		var a1 = arg;
		if(a1.length + offset > this.byteLength) {
			throw new js__$Boot_HaxeError("set() outside of range");
		}
		var _g11 = 0;
		var _g2 = a1.length;
		while(_g11 < _g2) {
			var i1 = _g11++;
			this[i1 + offset] = a1[i1];
		}
	} else {
		throw new js__$Boot_HaxeError("TODO");
	}
};
js_html_compat_Uint8Array._subarray = function(start,end) {
	var a = js_html_compat_Uint8Array._new(this.slice(start,end));
	a.byteOffset = start;
	return a;
};
String.prototype.__class__ = String;
String.__name__ = true;
Array.__name__ = true;
Date.prototype.__class__ = Date;
Date.__name__ = ["Date"];
var Int = { __name__ : ["Int"]};
var Dynamic = { __name__ : ["Dynamic"]};
var Float = Number;
Float.__name__ = ["Float"];
var Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = { __name__ : ["Class"]};
var Enum = { };
var __map_reserved = {};
var ArrayBuffer = $global.ArrayBuffer || js_html_compat_ArrayBuffer;
if(ArrayBuffer.prototype.slice == null) {
	ArrayBuffer.prototype.slice = js_html_compat_ArrayBuffer.sliceImpl;
}
var Uint8Array = $global.Uint8Array || js_html_compat_Uint8Array._new;
champuru_Champuru.mMsgs = new List();
champuru_Champuru.CHARS_TO_INT = (function($this) {
	var $r;
	var _g = new haxe_ds_StringMap();
	if(__map_reserved["_"] != null) {
		_g.setReserved("_",0);
	} else {
		_g.h["_"] = 0;
	}
	if(__map_reserved["A"] != null) {
		_g.setReserved("A",8);
	} else {
		_g.h["A"] = 8;
	}
	if(__map_reserved["C"] != null) {
		_g.setReserved("C",4);
	} else {
		_g.h["C"] = 4;
	}
	if(__map_reserved["T"] != null) {
		_g.setReserved("T",2);
	} else {
		_g.h["T"] = 2;
	}
	if(__map_reserved["G"] != null) {
		_g.setReserved("G",1);
	} else {
		_g.h["G"] = 1;
	}
	if(__map_reserved["W"] != null) {
		_g.setReserved("W",10);
	} else {
		_g.h["W"] = 10;
	}
	if(__map_reserved["S"] != null) {
		_g.setReserved("S",5);
	} else {
		_g.h["S"] = 5;
	}
	if(__map_reserved["Y"] != null) {
		_g.setReserved("Y",6);
	} else {
		_g.h["Y"] = 6;
	}
	if(__map_reserved["R"] != null) {
		_g.setReserved("R",9);
	} else {
		_g.h["R"] = 9;
	}
	if(__map_reserved["K"] != null) {
		_g.setReserved("K",3);
	} else {
		_g.h["K"] = 3;
	}
	if(__map_reserved["M"] != null) {
		_g.setReserved("M",12);
	} else {
		_g.h["M"] = 12;
	}
	if(__map_reserved["B"] != null) {
		_g.setReserved("B",7);
	} else {
		_g.h["B"] = 7;
	}
	if(__map_reserved["D"] != null) {
		_g.setReserved("D",11);
	} else {
		_g.h["D"] = 11;
	}
	if(__map_reserved["V"] != null) {
		_g.setReserved("V",13);
	} else {
		_g.h["V"] = 13;
	}
	if(__map_reserved["H"] != null) {
		_g.setReserved("H",14);
	} else {
		_g.h["H"] = 14;
	}
	if(__map_reserved["N"] != null) {
		_g.setReserved("N",15);
	} else {
		_g.h["N"] = 15;
	}
	if(__map_reserved["?"] != null) {
		_g.setReserved("?",15);
	} else {
		_g.h["?"] = 15;
	}
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
js_Boot.__toStr = ({ }).toString;
js_html_compat_Uint8Array.BYTES_PER_ELEMENT = 1;
champuru_Champuru.main();
})(typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
