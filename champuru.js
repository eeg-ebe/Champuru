// Generated by Haxe 3.4.4
(function ($global) { "use strict";
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
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
champuru_Champuru.calcScore = function(fwd,rev,i) {
	var matches = 0;
	var mismatches = 0;
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
		var aa = __map_reserved[a] != null ? _this.getReserved(a) : _this.h[a];
		var _this1 = champuru_Champuru.CHARS_TO_INT;
		var ba = __map_reserved[b] != null ? _this1.getReserved(b) : _this1.h[b];
		if((aa & ba) != 0) {
			++matches;
		} else {
			++mismatches;
		}
	}
	return { matches : matches, mismatches : mismatches, score : matches - 0.25 * overlap};
};
champuru_Champuru.timeToStr = function(f) {
	return "" + Math.round(f * 1000);
};
champuru_Champuru.calcOverlapScores = function(fwd,rev) {
	var result = [];
	var _g1 = -fwd.length + 1;
	var _g = rev.length;
	while(_g1 < _g) {
		var i = _g1++;
		var score = champuru_Champuru.calcScore(fwd,rev,i);
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
		result[i] = __map_reserved[chr] != null ? _this.getReserved(chr) : _this.h[chr];
	}
	return result;
};
champuru_Champuru.toString = function(v) {
	var result = new List();
	var _g = 0;
	while(_g < v.length) {
		var $int = v[_g];
		++_g;
		result.add(champuru_Champuru.INTS_TO_CHAR.h[$int]);
	}
	return result.join("");
};
champuru_Champuru.getPart = function(fwd,rev,i) {
	var fwdCorr = i < 0 ? -i : 0;
	var revCorr = i > 0 ? i : 0;
	var fwdL = fwdCorr + rev.length;
	var revL = revCorr + fwd.length;
	var overlap = (fwdL < revL ? fwdL : revL) - (fwdCorr + revCorr);
	return null;
};
champuru_Champuru.reconstructSeq = function(fwd,rev,sequenceA,sequenceB,i,j) {
	var a = champuru_Champuru.toInts(sequenceA);
	var b = champuru_Champuru.toInts(sequenceB);
	var found = true;
	while(found) found = false;
	return { a : champuru_Champuru.toString(a), b : champuru_Champuru.toString(b)};
};
champuru_Champuru.genScorePlot = function(scores,high,low) {
	var result = new List();
	result.add("<svg class='plot middle' width='600' height='400'>");
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
		result.add("<circle cx='" + x + "' cy='" + y + "' r='2' fill='black' />");
		++i;
	}
	result.add("</svg>");
	return result.join("");
};
champuru_Champuru.genScorePlotHist = function(scores,high,low) {
	var d = high - low;
	var result = new List();
	result.add("<svg class='plot middle' width='600' height='400'>");
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
		result.add("<rect x='" + x + "' y='" + y + "' width='20' height='" + h + "' />");
	}
	result.add("</g>");
	result.add("</svg>");
	return result.join("");
};
champuru_Champuru.doChampuru = function(fwd,rev) {
	champuru_Champuru.mMsgs.clear();
	var timestamp1 = new Date().getTime() / 1000;
	var scores = champuru_Champuru.calcOverlapScores(fwd,rev);
	var timestamp2 = new Date().getTime() / 1000;
	var sortedScores = scores.slice();
	sortedScores.sort(function(a,b) {
		return Math.ceil(b.score - a.score);
	});
	var timestamp3 = new Date().getTime() / 1000;
	var lowestScore = sortedScores.pop();
	sortedScores.push(lowestScore);
	champuru_Champuru.mMsgs.add("<fieldset>");
	champuru_Champuru.mMsgs.add("<legend>1. Step - Compatibility score calculation</legend>");
	var s = "<p>Calculated " + scores.length + " compatibility scores in " + champuru_Champuru.timeToStr(timestamp2 - timestamp1) + "ms. Sorting took " + champuru_Champuru.timeToStr(timestamp3 - timestamp2) + "ms.</p>";
	champuru_Champuru.mMsgs.add(s);
	champuru_Champuru.mMsgs.add("<p>The following table lists the best compatibility scores and their positions:</p>");
	champuru_Champuru.mMsgs.add("<table class='scoreTable center'>");
	champuru_Champuru.mMsgs.add("<tr class='header'>");
	champuru_Champuru.mMsgs.add("<td>#</td><td>Offset</td><td>Score</td><td>Matches</td><td>Mismatches</td>");
	champuru_Champuru.mMsgs.add("</tr>");
	var i = 1;
	var _g = 0;
	while(_g < sortedScores.length) {
		var score = sortedScores[_g];
		++_g;
		champuru_Champuru.mMsgs.add("<tr class='" + (i % 2 == 0 ? "odd" : "even") + "'>");
		champuru_Champuru.mMsgs.add("<td>" + i + "</td><td>" + score.index + "</td><td>" + score.score + "</td><td>" + score.matches + "</td><td>" + score.mismatches + "</td>");
		champuru_Champuru.mMsgs.add("</tr>");
		++i;
		if(i >= 6) {
			break;
		}
	}
	champuru_Champuru.mMsgs.add("</table>");
	champuru_Champuru.mMsgs.add("<p>Here is a plot of the shift calculation result:</p>");
	var s1 = champuru_Champuru.genScorePlot(scores,sortedScores[0].score,lowestScore.score);
	champuru_Champuru.mMsgs.add(s1);
	champuru_Champuru.mMsgs.add("<p>Warning: Close points may be overlapping!</p>");
	champuru_Champuru.mMsgs.add("<p>And as histogram:</p>");
	var s2 = champuru_Champuru.genScorePlotHist(scores,sortedScores[0].score,lowestScore.score);
	champuru_Champuru.mMsgs.add(s2);
	champuru_Champuru.mMsgs.add("</fieldset>");
	champuru_Champuru.mMsgs.add("<br>");
	var sequenceA = champuru_Champuru.reconstruct(fwd,rev,sortedScores[0].index);
	var sequenceB = champuru_Champuru.reconstruct(fwd,rev,sortedScores[1].index);
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
		champuru_Champuru.mMsgs.add("<p>There is 1 incompatible position (indicated with an underscore), please check the input sequences.");
	} else if(problems > 1) {
		champuru_Champuru.mMsgs.add("<p>There are " + problems + " incompatible positions (indicated with underscores), please check the input sequences.");
	}
	if(problems > 0) {
		champuru_Champuru.mMsgs.add("<span class='middle'><button onclick='colorConsensusByIncompatiblePositions()'>Color underscores</button><button onclick='removeColor()'>Remove color</button></span>");
	}
	if(remainingAmbFwd == 1) {
		champuru_Champuru.mMsgs.add("<p>There is 1 ambigiouty in the first consensus sequence.</p>");
	} else if(remainingAmbFwd > 1) {
		champuru_Champuru.mMsgs.add("<p>There are " + remainingAmbFwd + " ambigiouties in the first consensus sequence.</p>");
	}
	if(remainingAmbRev == 1) {
		champuru_Champuru.mMsgs.add("<p>There is 1 ambigiouty in the second consensus sequence.</p>");
	} else if(remainingAmbRev > 1) {
		champuru_Champuru.mMsgs.add("<p>There are " + remainingAmbRev + " ambigiouties in the second consensus sequence.</p>");
	}
	if(remainingAmbFwd + remainingAmbRev > 0) {
		champuru_Champuru.mMsgs.add("<span class='middle'><button onclick='colorConsensusByAmbPositions()'>Color ambigiouties</button><button onclick='removeColor()'>Remove color</button></span>");
	}
	champuru_Champuru.mMsgs.add("</fieldset>");
	champuru_Champuru.mMsgs.add("<br>");
	var timestamp4 = new Date().getTime() / 1000;
	var reconstruction = champuru_Champuru.reconstructSeq(fwd,rev,sequenceA,sequenceB,sortedScores[0].index,sortedScores[1].index);
	var timestamp5 = new Date().getTime() / 1000;
	problems = champuru_Champuru.countProblems(reconstruction.a) + champuru_Champuru.countProblems(reconstruction.b);
	var ambPos = champuru_Champuru.countAmb(reconstruction.a) + champuru_Champuru.countAmb(reconstruction.b);
	champuru_Champuru.mMsgs.add("<fieldset>");
	champuru_Champuru.mMsgs.add("<legend>3. Step - Sequence reconstruction</legend>");
	var s3 = "<p>Cleaning up ambiguities by sequence comparison took " + champuru_Champuru.timeToStr(timestamp5 - timestamp4) + "ms.</p>";
	champuru_Champuru.mMsgs.add(s3);
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
		champuru_Champuru.mMsgs.add("<p>There is 1 ambigiouty left!</p>");
	} else if(ambPos > 1) {
		champuru_Champuru.mMsgs.add("<p>There are " + ambPos + " ambigiouties left!</p>");
	}
	if(ambPos > 0) {
		champuru_Champuru.mMsgs.add("<span class='middle'><button onclick='colorAmbPos()'>Color Ambigiouties</button><button onclick='removeColorFinal()'>Remove color</button></span>");
	}
	champuru_Champuru.mMsgs.add("</fieldset>");
	return champuru_Champuru.mMsgs.join("");
};
champuru_Champuru.onMessage = function(e) {
	try {
		var fwd = js_Boot.__cast(e.data.fwd , String);
		var rev = js_Boot.__cast(e.data.rev , String);
		var result = champuru_Champuru.doChampuru(fwd,rev);
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
	,__class__: haxe_ds_StringMap
};
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
js_Boot.__toStr = ({ }).toString;
champuru_Champuru.main();
})(typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
