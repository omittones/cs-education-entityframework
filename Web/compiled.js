var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//variable declaration
var implicit = '';
var explicit = null;
var usingLet = '';
//any is used to represent any unsafe type
var empty = function () { };
//using interface
//interface is implicitly implemented by anything that matches
var objectsImplicitlyImplement = {
    firstName: 'Foo',
    lastName: 'Bar'
};
//function that conforms to the interface
var isNotNull = function (object) {
    return object != null;
};
//we can force cast of anything that does not match the interface
var forcedCase = empty;
//function's parameter can define expected interface inline
//function receives object of inline type, and returns a string
function getFullName(object) {
    if (!isNotNull(object)) {
        throw 'Object should not be null!';
    }
    return object.firstName + ' ' + object.lastName;
}
//interfaces are implicitly implemented
getFullName(objectsImplicitlyImplement);
getFullName({ firstName: '', lastName: '' });
//class looks like this
var ElectricEngine = (function () {
    function ElectricEngine(noWatts, name) {
        this.noWatts = noWatts;
    }
    return ElectricEngine;
}());
var GasEngine = (function () {
    //public and private keyword immediately sets the fields
    function GasEngine(noPistons, name) {
        this.noPistons = noPistons;
        this.name = name;
    }
    return GasEngine;
}());
//a function can receive interface of a constructor
function createEngines(factory) {
    var engines = [];
    //interface of a constructor is used with new operator
    engines.push(new factory(1, 'first'));
    engines.push(new factory(2, 'second'));
    return engines;
}
//a static constructor definition has to be passed to the function
createEngines(GasEngine);
createEngines(ElectricEngine);
(function () {
})();
System.register("shared/Utils", [], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Utils;
    return {
        setters:[],
        execute: function() {
            Utils = (function () {
                function Utils() {
                }
                // generates a new Universally unique identify (UUID)
                // the UUID is used to identify each of the tasks
                Utils.uuid = function () {
                    /*jshint bitwise:false */
                    var i, random;
                    var uuid = '';
                    for (i = 0; i < 32; i++) {
                        random = Math.random() * 16 | 0;
                        if (i === 8 || i === 12 || i === 16 || i === 20) {
                            uuid += '-';
                        }
                        uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random))
                            .toString(16);
                    }
                    return uuid;
                };
                // adds 's' to the end of a given world when count > 1
                Utils.pluralize = function (count, word) {
                    return count === 1 ? word : word + 's';
                };
                // stores data using the localStorage API
                Utils.store = function (namespace, data) {
                    if (data) {
                        return localStorage.setItem(namespace, JSON.stringify(data));
                    }
                    var store = localStorage.getItem(namespace);
                    return (store && JSON.parse(store)) || [];
                };
                // just a helper for inheritance
                Utils.extend = function () {
                    var objs = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        objs[_i - 0] = arguments[_i];
                    }
                    var newObj = {};
                    for (var i = 0; i < objs.length; i++) {
                        var obj = objs[i];
                        for (var key in obj) {
                            if (obj.hasOwnProperty(key)) {
                                newObj[key] = obj[key];
                            }
                        }
                    }
                    return newObj;
                };
                return Utils;
            }());
            exports_1("Utils", Utils);
        }
    }
});
//<reference path="../shared/Interfaces.ts" />
System.register("ui/Footer", ['react', "shared/Utils"], function(exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var React, Utils_1;
    var Footer;
    return {
        setters:[
            function (React_1) {
                React = React_1;
            },
            function (Utils_1_1) {
                Utils_1 = Utils_1_1;
            }],
        execute: function() {
            Footer = (function (_super) {
                __extends(Footer, _super);
                function Footer() {
                    _super.apply(this, arguments);
                }
                Footer.prototype.render = function () {
                    var activeTodoWord = Utils_1.Utils.pluralize(this.props.count, 'item');
                    var clearButton = null;
                    if (this.props.completedCount > 0) {
                        clearButton = (React.createElement("button", {className: "clear-completed", onClick: this.props.onClearCompleted}, "Clear completed"));
                    }
                    // React idiom for shortcutting to `classSet` since it'll be used often
                    //var cx = React.addons.classSet;
                    var cx = function (object) {
                        for (var prop in object) {
                            if (object[prop] == true) {
                                return prop;
                            }
                        }
                    };
                    var nowShowing = this.props.nowShowing;
                    return (React.createElement("footer", {className: "footer"}, React.createElement("span", {className: "todo-count"}, React.createElement("strong", null, this.props.count), " ", activeTodoWord, " left"), React.createElement("ul", {className: "filters"}, React.createElement("li", null, React.createElement("a", {href: "#/", className: cx({ selected: nowShowing == '1' })}, "All")), ' ', React.createElement("li", null, React.createElement("a", {href: "#/active", className: cx({ selected: nowShowing == '2' })}, "Active")), ' ', React.createElement("li", null, React.createElement("a", {href: "#/completed", className: cx({ selected: nowShowing == '3' })}, "Completed"))), clearButton));
                };
                return Footer;
            }(React.Component));
            exports_2("Footer", Footer);
        }
    }
});
//<references path="./shared/Interfaces.ts" />
System.register("index", ['react', 'react-dom', "ui/Footer"], function(exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var React, ReactDOM, Footer_1;
    function main() {
        var logger = console;
        logger.log('Test method!');
        var model = { nowShowing: '1', completedCount: 0, count: 0, onClearCompleted: null };
        ReactDOM.render(React.createElement(Footer_1.Footer, {completedCount: 1, nowShowing: "2", count: 1}), document.getElementsByClassName('app-container')[0]);
    }
    exports_3("main", main);
    return {
        setters:[
            function (React_2) {
                React = React_2;
            },
            function (ReactDOM_1) {
                ReactDOM = ReactDOM_1;
            },
            function (Footer_1_1) {
                Footer_1 = Footer_1_1;
            }],
        execute: function() {
        }
    }
});
//<reference path="../shared/Interfaces.ts" />
System.register("ui/Main", [], function(exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    return {
        setters:[],
        execute: function() {
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGlsZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjaGVhdHNoZWV0LnRzIiwic2hhcmVkL0ludGVyZmFjZXMudHMiLCJzaGFyZWQvVXRpbHMudHMiLCJ1aS9Gb290ZXIudHN4IiwiaW5kZXgudHN4IiwidWkvTWFpbi50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxzQkFBc0I7QUFDdEIsSUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFDO0FBQ2xCLElBQUksUUFBUSxHQUFZLElBQUksQ0FBQztBQUM3QixJQUFJLFFBQVEsR0FBWSxFQUFFLENBQUM7QUFFM0IsMENBQTBDO0FBQzFDLElBQUksS0FBSyxHQUFTLGNBQVcsQ0FBQyxDQUFDO0FBVS9CLGlCQUFpQjtBQUNqQiw4REFBOEQ7QUFDOUQsSUFBSSwwQkFBMEIsR0FBa0I7SUFDNUMsU0FBUyxFQUFHLEtBQUs7SUFDakIsUUFBUSxFQUFHLEtBQUs7Q0FDbkIsQ0FBQTtBQU9ELHlDQUF5QztBQUN6QyxJQUFJLFNBQVMsR0FBcUIsVUFBUyxNQUFVO0lBQ2pELE1BQU0sQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDO0FBQzFCLENBQUMsQ0FBQTtBQUVELGlFQUFpRTtBQUNqRSxJQUFJLFVBQVUsR0FBdUMsS0FBSyxDQUFDO0FBRTNELDJEQUEyRDtBQUMzRCwrREFBK0Q7QUFDL0QscUJBQXFCLE1BQTZDO0lBQzlELEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyQixNQUFNLDRCQUE0QixDQUFBO0lBQ3RDLENBQUM7SUFDRCxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsR0FBRyxHQUFHLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQztBQUNwRCxDQUFDO0FBRUQsdUNBQXVDO0FBQ3ZDLFdBQVcsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO0FBQ3hDLFdBQVcsQ0FBQyxFQUFDLFNBQVMsRUFBQyxFQUFFLEVBQUUsUUFBUSxFQUFDLEVB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QVMsRUFBRSxFQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsVUFBVSxJQUFJLEdBQUcsRUFBRSxDQUFHLGVBRWhELENBQ0gsQ0FDSixFQUNKLFdBQVksQ0FDUixDQUNaLENBQUM7Z0JBQ04sQ0FBQztnQkFDTCxhQUFDO1lBQUQsQ0FBQyxBQTlERCxDQUE0QixLQUFLLENBQUMsU0FBUyxHQThEMUM7WUE5REQsMkJBOERDLENBQUE7Ozs7QUNwRUQsOENBQThDOzs7OztJQVk5QztRQUVJLElBQUksTUFBTSxHQUFrQixPQUFPLENBQUM7UUFDcEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUUzQixJQUFJLEtBQUssR0FBNEIsRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLGNBQWMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxnQkFBZ0IsRUFBRSxJQUFJLEVBQUUsQ0FBQztRQUU5RyxRQUFRLENBQUMsTUFBTSxDQUNYLG9CQUFDLGVBQU0sR0FBQyxjQUFjLEVBQUUsQ0FBRSxFQUNsQixVQUFVLEVBQUMsR0FBRyxFQUNkLEtBQUssRUFBRSxDQUFFLEVBQUcsRUFDcEIsUUFBUSxDQUFDLHNCQUFzQixDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUN0RCxDQUFDO0lBQ04sQ0FBQztJQWJELHVCQWFDLENBQUE7Ozs7Ozs7Ozs7Ozs7WUFmQTs7O0FDVkQsOENBQThDIiwic291cmNlc0NvbnRlbnQiOlsiLy92YXJpYWJsZSBkZWNsYXJhdGlvblxyXG52YXIgaW1wbGljaXQgPSAnJztcclxudmFyIGV4cGxpY2l0IDogc3RyaW5nID0gbnVsbDtcclxubGV0IHVzaW5nTGV0IDogc3RyaW5nID0gJyc7XHJcblxyXG4vL2FueSBpcyB1c2VkIHRvIHJlcHJlc2VudCBhbnkgdW5zYWZlIHR5cGVcclxubGV0IGVtcHR5IDogYW55ID0gZnVuY3Rpb24oKXt9O1xyXG5cclxuLy9jcmVhdGluZyBpbnRlcmZhY2VcclxuaW50ZXJmYWNlIElOYW1lZE9iamVjdCB7XHJcbiAgICBmaXJzdE5hbWU6c3RyaW5nLFxyXG4gICAgbGFzdE5hbWU6c3RyaW5nLFxyXG4gICAgLy9vcHRpb25hbCBwcm9wZXJ0eSBkb2VzIG5vdCBuZWVkIHRvIGV4aXN0XHJcbiAgICBhZ2U/Om51bWJlclxyXG59XHJcblxyXG4vL3VzaW5nIGludGVyZmFjZVxyXG4vL2ludGVyZmFjZSBpcyBpbXBsaWNpdGx5IGltcGxlbWVudGVkIGJ5IGFueXRoaW5nIHRoYXQgbWF0Y2hlc1xyXG52YXIgb2JqZWN0c0ltcGxpY2l0bHlJbXBsZW1lbnQgOiBJTmFtZWRPYmplY3QgPSB7XHJcbiAgICBmaXJzdE5hbWUgOiAnRm9vJyxcclxuICAgIGxhc3ROYW1lIDogJ0JhcidcclxufVxyXG5cclxuLy9jcmVhdGluZyBmdW5jdGlvbiBpbnRlcmZhY2VcclxuaW50ZXJmYWNlIElGaWx0ZXJGdW5jdGlvbiB7XHJcbiAgICAob2JqZWN0OmFueSkgOiBib29sZWFuXHJcbn1cclxuXHJcbi8vZnVuY3Rpb24gdGhhdCBjb25mb3JtcyB0byB0aGUgaW50ZXJmYWNlXHJcbmxldCBpc05vdE51bGwgOiBJRmlsdGVyRnVuY3Rpb24gPSBmdW5jdGlvbihvYmplY3Q6YW55KSB7XHJcbiAgICByZXR1cm4gb2JqZWN0ICE9IG51bGw7XHJcbn1cclxuXHJcbi8vd2UgY2FuIGZvcmNlIGNhc3Qgb2YgYW55dGhpbmcgdGhhdCBkb2VzIG5vdCBtYXRjaCB0aGUgaW50ZXJmYWNlXHJcbmxldCBmb3JjZWRDYXNlIDogSUZpbHRlckZ1bmN0aW9uID0gPElGaWx0ZXJGdW5jdGlvbj4gZW1wdHk7XHJcblxyXG4vL2Z1bmN0aW9uJ3MgcGFyYW1ldGVyIGNhbiBkZWZpbmUgZXhwZWN0ZWQgaW50ZXJmYWNlIGlubGluZVxyXG4vL2Z1bmN0aW9uIHJlY2VpdmVzIG9iamVjdCBvZiBpbmxpbmUgdHlwZSwgYW5kIHJldHVybnMgYSBzdHJpbmdcclxuZnVuY3Rpb24gZ2V0RnVsbE5hbWUob2JqZWN0OiB7IGZpcnN0TmFtZTpzdHJpbmcsIGxhc3ROYW1lOnN0cmluZyB9KSA6IHN0cmluZyB7XHJcbiAgICBpZiAoIWlzTm90TnVsbChvYmplY3QpKSB7XHJcbiAgICAgICAgdGhyb3cgJ09iamVjdCBzaG91bGQgbm90IGJlIG51bGwhJ1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG9iamVjdC5maXJzdE5hbWUgKyAnICcgKyBvYmplY3QubGFzdE5hbWU7XHJcbn1cclxuXHJcbi8vaW50ZXJmYWNlcyBhcmUgaW1wbGljaXRseSBpbXBsZW1lbnRlZFxyXG5nZXRGdWxsTmFtZShvYmplY3RzSW1wbGljaXRseUltcGxlbWVudCk7XHJcbmdldEZ1bGxOYW1lKHtmaXJzdE5hbWU6JycsIGxhc3ROYW1lOicnfSk7XHJcblxyXG4vL2ludGVyZmFjZSBjYW4gc3BlY2lmeSBob3cgYSBjb25zdHJ1Y3RvciBzaG91bGQgbG9va2xpa2VcclxuaW50ZXJmYWNlIElFbmdpbmVGYWN0b3J5IHtcclxuICAgIG5ldyAoYXJnMTogbnVtYmVyLCBuYW1lOiBzdHJpbmcpOiBhbnlcclxufVxyXG5cclxuLy9jbGFzcyBsb29rcyBsaWtlIHRoaXNcclxuY2xhc3MgRWxlY3RyaWNFbmdpbmUge1xyXG5cclxuICAgIC8vYSBwcml2YXRlIHByb3BlcnR5XHJcbiAgICBwcml2YXRlIG5vV2F0dHM6IG51bWJlcjtcclxuICAgIGNvbnN0cnVjdG9yKG5vV2F0dHM6IG51bWJlciwgbmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5ub1dhdHRzID0gbm9XYXR0cztcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgR2FzRW5naW5lIHtcclxuICAgIC8vcHVibGljIGFuZCBwcml2YXRlIGtleXdvcmQgaW1tZWRpYXRlbHkgc2V0cyB0aGUgZmllbGRzXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIG5vUGlzdG9uczogbnVtYmVyLCBwdWJsaWMgbmFtZTogc3RyaW5nKSB7IH1cclxufVxyXG5cclxuLy9hIGZ1bmN0aW9uIGNhbiByZWNlaXZlIGludGVyZmFjZSBvZiBhIGNvbnN0cnVjdG9yXHJcbmZ1bmN0aW9uIGNyZWF0ZUVuZ2luZXMoZmFjdG9yeTogSUVuZ2luZUZhY3RvcnkpIDogQXJyYXk8YW55PiB7XHJcbiAgICBsZXQgZW5naW5lcyA6IEFycmF5PGFueT4gPSBbXTtcclxuICAgIC8vaW50ZXJmYWNlIG9mIGEgY29uc3RydWN0b3IgaXMgdXNlZCB3aXRoIG5ldyBvcGVyYXRvclxyXG4gICAgZW5naW5lcy5wdXNoKG5ldyBmYWN0b3J5KDEsICdmaXJzdCcpKTtcclxuICAgIGVuZ2luZXMucHVzaChuZXcgZmFjdG9yeSgyLCAnc2Vjb25kJykpO1xyXG4gICAgcmV0dXJuIGVuZ2luZXM7XHJcbn1cclxuXHJcbi8vYSBzdGF0aWMgY29uc3RydWN0b3IgZGVmaW5pdGlvbiBoYXMgdG8gYmUgcGFzc2VkIHRvIHRoZSBmdW5jdGlvblxyXG5jcmVhdGVFbmdpbmVzKEdhc0VuZ2luZSk7XHJcbmNyZWF0ZUVuZ2luZXMoRWxlY3RyaWNFbmdpbmUpO1xyXG5cclxuKGZ1bmN0aW9uKCkge1xyXG5cclxuXHJcblxyXG5cclxuXHJcbn0pKCk7IiwibmFtZXNwYWNlIEludGVyZmFjZXMge1xyXG5cclxuICAgIC8vIERlZmluZXMgdGhlIGludGVyZmFjZSBvZiB0aGUgc3RydWN0dXJlIG9mIGEgdGFza1xyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJVG9kbyB7XHJcbiAgICAgICAgaWQ6IHN0cmluZyxcclxuICAgICAgICB0aXRsZTogc3RyaW5nLFxyXG4gICAgICAgIGNvbXBsZXRlZDogYm9vbGVhblxyXG4gICAgfVxyXG5cclxuICAgIC8vIERlZmluZXMgdGhlIGludGVyZmFjZSBvZiB0aGUgcHJvcGVydGllcyBvZiB0aGUgVG9kb0l0ZW0gY29tcG9uZW50XHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElUb2RvSXRlbVByb3BzIHtcclxuICAgICAgICBrZXk6IHN0cmluZyxcclxuICAgICAgICB0b2RvOiBJVG9kbztcclxuICAgICAgICBlZGl0aW5nPzogYm9vbGVhbjtcclxuICAgICAgICBvblNhdmU6ICh2YWw6IGFueSkgPT4gdm9pZDtcclxuICAgICAgICBvbkRlc3Ryb3k6ICgpID0+IHZvaWQ7XHJcbiAgICAgICAgb25FZGl0OiAoKSA9PiB2b2lkO1xyXG4gICAgICAgIG9uQ2FuY2VsOiAoZXZlbnQ6IGFueSkgPT4gdm9pZDtcclxuICAgICAgICBvblRvZ2dsZTogKCkgPT4gdm9pZDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBEZWZpbmVzIHRoZSBpbnRlcmZhY2Ugb2YgdGhlIHN0YXRlIG9mIHRoZSBUb2RvSXRlbSBjb21wb25lbnRcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSVRvZG9JdGVtU3RhdGUge1xyXG4gICAgICAgIGVkaXRUZXh0OiBzdHJpbmdcclxuICAgIH1cclxuXHJcbiAgICAvLyBEZWZpbmVzIHRoZSBpbnRlcmZhY2Ugb2YgdGhlIHByb3BlcnRpZXMgb2YgdGhlIEZvb3RlciBjb21wb25lbnRcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSUZvb3RlclByb3BzIHtcclxuICAgICAgICBjb21wbGV0ZWRDb3VudDogbnVtYmVyO1xyXG4gICAgICAgIG9uQ2xlYXJDb21wbGV0ZWQ/OiBhbnk7XHJcbiAgICAgICAgbm93U2hvd2luZzogc3RyaW5nO1xyXG4gICAgICAgIGNvdW50OiBudW1iZXI7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRGVmaW5lcyB0aGUgVG9kb01vZGVsIGludGVyZmFjZVxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJVG9kb01vZGVsIHtcclxuICAgICAgICBrZXk6IGFueTtcclxuICAgICAgICB0b2RvczogQXJyYXk8SVRvZG8+O1xyXG4gICAgICAgIG9uQ2hhbmdlczogQXJyYXk8YW55PjtcclxuICAgICAgICBzdWJzY3JpYmUob25DaGFuZ2UpO1xyXG4gICAgICAgIGluZm9ybSgpO1xyXG4gICAgICAgIGFkZFRvZG8odGl0bGU6IHN0cmluZyk7XHJcbiAgICAgICAgdG9nZ2xlQWxsKGNoZWNrZWQpO1xyXG4gICAgICAgIHRvZ2dsZSh0b2RvVG9Ub2dnbGUpO1xyXG4gICAgICAgIGRlc3Ryb3kodG9kbyk7XHJcbiAgICAgICAgc2F2ZSh0b2RvVG9TYXZlLCB0ZXh0KTtcclxuICAgICAgICBjbGVhckNvbXBsZXRlZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIERlZmluZXMgdGhlIGludGVyZmFjZSBvZiB0aGUgcHJvcGVydGllcyBvZiB0aGUgQXBwIGNvbXBvbmVudFxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJQXBwUHJvcHMge1xyXG4gICAgICAgIG1vZGVsOiBJVG9kb01vZGVsO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIERlZmluZXMgdGhlIGludGVyZmFjZSBvZiB0aGUgc3RhdGUgb2YgdGhlIEFwcCBjb21wb25lbnRcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSUFwcFN0YXRlIHtcclxuICAgICAgICBlZGl0aW5nPzogc3RyaW5nO1xyXG4gICAgICAgIG5vd1Nob3dpbmc/OiBzdHJpbmdcclxuICAgIH1cclxufSIsImV4cG9ydCBjbGFzcyBVdGlscyB7XHJcblxyXG4gICAgLy8gZ2VuZXJhdGVzIGEgbmV3IFVuaXZlcnNhbGx5IHVuaXF1ZSBpZGVudGlmeSAoVVVJRClcclxuICAgIC8vIHRoZSBVVUlEIGlzIHVzZWQgdG8gaWRlbnRpZnkgZWFjaCBvZiB0aGUgdGFza3NcclxuICAgIHB1YmxpYyBzdGF0aWMgdXVpZCgpOiBzdHJpbmcge1xyXG4gICAgICAgIC8qanNoaW50IGJpdHdpc2U6ZmFsc2UgKi9cclxuICAgICAgICB2YXIgaSwgcmFuZG9tO1xyXG4gICAgICAgIHZhciB1dWlkID0gJyc7XHJcblxyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCAzMjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHJhbmRvbSA9IE1hdGgucmFuZG9tKCkgKiAxNiB8IDA7XHJcbiAgICAgICAgICAgIGlmIChpID09PSA4IHx8IGkgPT09IDEyIHx8IGkgPT09IDE2IHx8IGkgPT09IDIwKSB7XHJcbiAgICAgICAgICAgICAgICB1dWlkICs9ICctJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB1dWlkICs9IChpID09PSAxMiA/IDQgOiAoaSA9PT0gMTYgPyAocmFuZG9tICYgMyB8IDgpIDogcmFuZG9tKSlcclxuICAgICAgICAgICAgICAgIC50b1N0cmluZygxNik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdXVpZDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBhZGRzICdzJyB0byB0aGUgZW5kIG9mIGEgZ2l2ZW4gd29ybGQgd2hlbiBjb3VudCA+IDFcclxuICAgIHB1YmxpYyBzdGF0aWMgcGx1cmFsaXplKGNvdW50LCB3b3JkKSB7XHJcbiAgICAgICAgcmV0dXJuIGNvdW50ID09PSAxID8gd29yZCA6IHdvcmQgKyAncyc7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gc3RvcmVzIGRhdGEgdXNpbmcgdGhlIGxvY2FsU3RvcmFnZSBBUElcclxuICAgIHB1YmxpYyBzdGF0aWMgc3RvcmUobmFtZXNwYWNlLCBkYXRhPykge1xyXG4gICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShuYW1lc3BhY2UsIEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBzdG9yZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKG5hbWVzcGFjZSk7XHJcbiAgICAgICAgcmV0dXJuIChzdG9yZSAmJiBKU09OLnBhcnNlKHN0b3JlKSkgfHwgW107XHJcbiAgICB9XHJcblxyXG4gICAgLy8ganVzdCBhIGhlbHBlciBmb3IgaW5oZXJpdGFuY2VcclxuICAgIHB1YmxpYyBzdGF0aWMgZXh0ZW5kKC4uLm9ianM6IGFueVtdKTogYW55IHtcclxuICAgICAgICB2YXIgbmV3T2JqID0ge307XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvYmpzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBvYmogPSBvYmpzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXdPYmpba2V5XSA9IG9ialtrZXldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXdPYmo7XHJcbiAgICB9XHJcbn0iLCIvLzxyZWZlcmVuY2UgcGF0aD1cIi4uL3NoYXJlZC9JbnRlcmZhY2VzLnRzXCIgLz5cclxuXHJcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0J1xyXG5cclxuaW1wb3J0IHsgVXRpbHMgfSBmcm9tICcuLi9zaGFyZWQvVXRpbHMnXHJcblxyXG5leHBvcnQgY2xhc3MgRm9vdGVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PEludGVyZmFjZXMuSUZvb3RlclByb3BzLCBhbnk+IHtcclxuXHJcbiAgICBwdWJsaWMgcmVuZGVyKCkge1xyXG5cclxuICAgICAgICB2YXIgYWN0aXZlVG9kb1dvcmQgPSBVdGlscy5wbHVyYWxpemUodGhpcy5wcm9wcy5jb3VudCwgJ2l0ZW0nKTtcclxuICAgICAgICB2YXIgY2xlYXJCdXR0b24gPSBudWxsO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5wcm9wcy5jb21wbGV0ZWRDb3VudCA+IDApIHtcclxuICAgICAgICAgICAgY2xlYXJCdXR0b24gPSAoXHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiY2xlYXItY29tcGxldGVkXCJcclxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLnByb3BzLm9uQ2xlYXJDb21wbGV0ZWR9PlxyXG4gICAgICAgICAgICAgICAgICAgIENsZWFyIGNvbXBsZXRlZFxyXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBSZWFjdCBpZGlvbSBmb3Igc2hvcnRjdXR0aW5nIHRvIGBjbGFzc1NldGAgc2luY2UgaXQnbGwgYmUgdXNlZCBvZnRlblxyXG4gICAgICAgIC8vdmFyIGN4ID0gUmVhY3QuYWRkb25zLmNsYXNzU2V0O1xyXG4gICAgICAgIHZhciBjeCA9IGZ1bmN0aW9uKG9iamVjdDphbnkpIHtcclxuICAgICAgICAgICAgZm9yKHZhciBwcm9wIGluIG9iamVjdCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9iamVjdFtwcm9wXSA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByb3A7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB2YXIgbm93U2hvd2luZzpzdHJpbmcgPSB0aGlzLnByb3BzLm5vd1Nob3dpbmc7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGZvb3RlciBjbGFzc05hbWU9XCJmb290ZXJcIj5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRvZG8tY291bnRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8c3Ryb25nPnt0aGlzLnByb3BzLmNvdW50fTwvc3Ryb25nPiB7YWN0aXZlVG9kb1dvcmR9IGxlZnRcclxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJmaWx0ZXJzXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxpPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaHJlZj1cIiMvXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goeyBzZWxlY3RlZDogbm93U2hvd2luZyA9PSAnMScgfSkgfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFsbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgICAgICAgICB7JyAnfVxyXG4gICAgICAgICAgICAgICAgICAgIDxsaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhyZWY9XCIjL2FjdGl2ZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHsgc2VsZWN0ZWQ6IG5vd1Nob3dpbmcgPT0gJzInIH0pIH0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBBY3RpdmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgICAgICAgICAgeycgJ31cclxuICAgICAgICAgICAgICAgICAgICA8bGk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBocmVmPVwiIy9jb21wbGV0ZWRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7IHNlbGVjdGVkOiBub3dTaG93aW5nID09ICczJyB9KSB9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQ29tcGxldGVkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICAgICAgPC91bD5cclxuICAgICAgICAgICAgICAgIHtjbGVhckJ1dHRvbn1cclxuICAgICAgICAgICAgPC9mb290ZXI+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufSIsIi8vPHJlZmVyZW5jZXMgcGF0aD1cIi4vc2hhcmVkL0ludGVyZmFjZXMudHNcIiAvPlxyXG5cclxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnXHJcbmltcG9ydCAqIGFzIFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSdcclxuaW1wb3J0IHsgRm9vdGVyIH0gZnJvbSAnLi91aS9Gb290ZXInXHJcblxyXG5uYW1lc3BhY2UgdXRpbHMge1xyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJTG9nZ2VyIHtcclxuICAgICAgICBsb2cobWVzc2FnZTogc3RyaW5nKTogdm9pZDtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG1haW4oKTogdm9pZCB7XHJcblxyXG4gICAgbGV0IGxvZ2dlcjogdXRpbHMuSUxvZ2dlciA9IGNvbnNvbGU7XHJcbiAgICBsb2dnZXIubG9nKCdUZXN0IG1ldGhvZCEnKTtcclxuXHJcbiAgICBsZXQgbW9kZWw6IEludGVyZmFjZXMuSUZvb3RlclByb3BzID0geyBub3dTaG93aW5nOiAnMScsIGNvbXBsZXRlZENvdW50OiAwLCBjb3VudDogMCwgb25DbGVhckNvbXBsZXRlZDogbnVsbCB9O1xyXG5cclxuICAgIFJlYWN0RE9NLnJlbmRlcihcclxuICAgICAgICA8Rm9vdGVyIGNvbXBsZXRlZENvdW50PXsxfVxyXG4gICAgICAgICAgICAgICAgbm93U2hvd2luZz1cIjJcIlxyXG4gICAgICAgICAgICAgICAgY291bnQ9ezF9IC8+LFxyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FwcC1jb250YWluZXInKVswXVxyXG4gICAgKTtcclxufSIsIi8vPHJlZmVyZW5jZSBwYXRoPVwiLi4vc2hhcmVkL0ludGVyZmFjZXMudHNcIiAvPlxyXG5cclxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnXHJcbmltcG9ydCB7IFV0aWxzIH0gZnJvbSAnLi4vc2hhcmVkL1V0aWxzJyJdfQ==