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

#if js
#end

/**
 * Entry point of the Champuru program.
 *
 * @author Yann Spoeri
 */
class Champuru {

    #if js
    static var workerScope:js.html.DedicatedWorkerGlobalScope;

    public static function onMessage(e:js.html.MessageEvent):Void {
        try {
            var fwd:String = cast(e.data.fwd, String);
            var rev:String = cast(e.data.rev, String);
            var result:String = "Hello World";
            workerScope.postMessage(result);
        } catch(e) {
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
