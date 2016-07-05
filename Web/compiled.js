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
                // React idiom for shortcutting to `classSet` since it'll be used often
                //var cx = React.addons.classSet;
                Utils.renderClass = function (object) {
                    for (var prop in object) {
                        if (object[prop] == true) {
                            return prop;
                        }
                    }
                };
                ;
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
System.register("ui/Editor", ['react'], function(exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var React;
    var Editor;
    return {
        setters:[
            function (React_1) {
                React = React_1;
            }],
        execute: function() {
            Editor = (function (_super) {
                __extends(Editor, _super);
                function Editor(props, context) {
                    _super.call(this, props, context);
                }
                Editor.prototype.handleKeydown = function (event) {
                    if (event.keyCode === 13) {
                        var el = this.refs['newLineText'];
                        if (this.props.lineAdded)
                            this.props.lineAdded(el.value);
                        el.value = '';
                    }
                };
                Editor.prototype.render = function () {
                    var _this = this;
                    return (React.createElement("div", null, React.createElement("ul", null, this.props.lines.map(function (line, index) {
                        return React.createElement("li", {key: index}, line);
                    })), React.createElement("input", {ref: "newLineText", type: "text", onKeyDown: function (e) { return _this.handleKeydown(e); }})));
                };
                return Editor;
            }(React.Component));
            exports_2("Editor", Editor);
        }
    }
});
System.register("ui/App", ['react', "shared/Utils", "ui/Editor"], function(exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var React, Utils_1, Editor_1;
    var App;
    return {
        setters:[
            function (React_2) {
                React = React_2;
            },
            function (Utils_1_1) {
                Utils_1 = Utils_1_1;
            },
            function (Editor_1_1) {
                Editor_1 = Editor_1_1;
            }],
        execute: function() {
            App = (function (_super) {
                __extends(App, _super);
                function App(props, context) {
                    _super.call(this, props, context);
                    this.state = {
                        nowShowing: this.props.firstShowing,
                        lines: ['1', '2', '3', '4']
                    };
                }
                App.prototype.handleNavClick = function (event, nowShowing) {
                    this.setState(function (prev, props) {
                        if (prev.nowShowing === nowShowing)
                            return prev;
                        else
                            return {
                                nowShowing: nowShowing,
                                lines: prev.lines
                            };
                    });
                };
                App.prototype.addLine = function (line) {
                    this.setState(function (prev, props) {
                        var lines = prev.lines;
                        lines.push(line);
                        return {
                            nowShowing: prev.nowShowing,
                            lines: lines
                        };
                    });
                };
                App.prototype.render = function () {
                    var _this = this;
                    var activeTodoWord = Utils_1.Utils.pluralize(this.props.count, 'item');
                    var clearButton = null;
                    if (this.props.completedCount > 0) {
                        clearButton = (React.createElement("button", {className: "waves-effect waves-light btn-large clear-completed", onClick: this.props.onClearCompleted}, "Clear completed"));
                    }
                    var cx = Utils_1.Utils.renderClass;
                    var state = this.state;
                    return (React.createElement("div", null, React.createElement("nav", null, React.createElement("div", {className: "nav-wrapper"}, React.createElement("span", {className: "brand-logo todo-count"}, React.createElement("strong", null, this.props.count), " ", activeTodoWord, " left"), React.createElement("ul", {className: "filters right hide-on-med-and-down"}, React.createElement("li", {className: cx({ active: this.state.nowShowing == '1' })}, React.createElement("a", {href: "#/", onClick: function (e) { return _this.handleNavClick(e, '1'); }}, "All")), React.createElement("li", {className: cx({ active: this.state.nowShowing == '2' })}, React.createElement("a", {href: "#/active", onClick: function (e) { return _this.handleNavClick(e, '2'); }}, "Active")), React.createElement("li", {className: cx({ active: this.state.nowShowing == '3' })}, React.createElement("a", {href: "#/completed", onClick: function (e) { return _this.handleNavClick(e, '3'); }}, "Completed"))))), React.createElement("div", null, React.createElement(Editor_1.Editor, {lineAdded: function (line) { return _this.addLine(line); }, lines: this.state.lines})), clearButton));
                };
                return App;
            }(React.Component));
            exports_3("App", App);
        }
    }
});
//<references path="./shared/Interfaces.ts" />
System.register("index", ['react', 'react-dom', "ui/App"], function(exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var React, ReactDOM, App_1;
    function main() {
        var logger = console;
        logger.log('Test method!');
        ReactDOM.render(React.createElement(App_1.App, {completedCount: 1, firstShowing: "2", count: 1}), document.getElementsByClassName('container')[0]);
    }
    exports_4("main", main);
    return {
        setters:[
            function (React_3) {
                React = React_3;
            },
            function (ReactDOM_1) {
                ReactDOM = ReactDOM_1;
            },
            function (App_1_1) {
                App_1 = App_1_1;
            }],
        execute: function() {
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGlsZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjaGVhdHNoZWV0LnRzIiwic2hhcmVkL0ludGVyZmFjZXMudHMiLCJzaGFyZWQvTW9kZWxzLnRzIiwic2hhcmVkL1V0aWxzLnRzIiwidWkvRWRpdG9yLnRzeCIsInVpL0FwcC50c3giLCJpbmRleC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxzQkFBc0I7QUFDdEIsSUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFDO0FBQ2xCLElBQUksUUFBUSxHQUFZLElBQUksQ0FBQztBQUM3QixJQUFJLFFBQVEsR0FBWSxFQUFFLENBQUM7QUFFM0IsMENBQTBDO0FBQzFDLElBQUksS0FBSyxHQUFTLGNBQVcsQ0FBQyxDQUFDO0FBVS9CLGlCQUFpQjtBQUNqQiw4REFBOEQ7QUFDOUQsSUFBSSwwQkFBMEIsR0FBa0I7SUFDNUMsU0FBUyxFQUFHLEtBQUs7SUFDakIsUUFBUSxFQUFHLEtBQUs7Q0FDbkIsQ0FBQTtBQU9ELHlDQUF5QztBQUN6QyxJQUFJLFNBQVMsR0FBcUIsVUFBUyxNQUFVO0lBQ2pELE1BQU0sQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDO0FBQzFCLENBQUMsQ0FBQTtBQUVELGlFQUFpRTtBQUNqRSxJQUFJLFVBQVUsR0FBdUMsS0FBSyxDQUFDO0FBRTNELDJEQUEyRDtBQUMzRCwrREFBK0Q7QUFDL0QscUJBQXFCLE1BQTZDO0lBQzlELEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyQixNQUFNLDRCQUE0QixDQUFBO0lBQ3RDLENBQUM7SUFDRCxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsR0FBRyxHQUFHLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQztBQUNwRCxDQUFDO0FBRUQsdUNBQXVDO0FBQ3ZDLFdBQVcsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO0FBQ3hDLFdBQVcsQ0FBQyxFQUFDLFNBQVMsRUFBQyxFQUFF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QWRBIiwic291cmNlc0NvbnRlbnQiOlsiLy92YXJpYWJsZSBkZWNsYXJhdGlvblxyXG52YXIgaW1wbGljaXQgPSAnJztcclxudmFyIGV4cGxpY2l0IDogc3RyaW5nID0gbnVsbDtcclxubGV0IHVzaW5nTGV0IDogc3RyaW5nID0gJyc7XHJcblxyXG4vL2FueSBpcyB1c2VkIHRvIHJlcHJlc2VudCBhbnkgdW5zYWZlIHR5cGVcclxubGV0IGVtcHR5IDogYW55ID0gZnVuY3Rpb24oKXt9O1xyXG5cclxuLy9jcmVhdGluZyBpbnRlcmZhY2VcclxuaW50ZXJmYWNlIElOYW1lZE9iamVjdCB7XHJcbiAgICBmaXJzdE5hbWU6c3RyaW5nLFxyXG4gICAgbGFzdE5hbWU6c3RyaW5nLFxyXG4gICAgLy9vcHRpb25hbCBwcm9wZXJ0eSBkb2VzIG5vdCBuZWVkIHRvIGV4aXN0XHJcbiAgICBhZ2U/Om51bWJlclxyXG59XHJcblxyXG4vL3VzaW5nIGludGVyZmFjZVxyXG4vL2ludGVyZmFjZSBpcyBpbXBsaWNpdGx5IGltcGxlbWVudGVkIGJ5IGFueXRoaW5nIHRoYXQgbWF0Y2hlc1xyXG52YXIgb2JqZWN0c0ltcGxpY2l0bHlJbXBsZW1lbnQgOiBJTmFtZWRPYmplY3QgPSB7XHJcbiAgICBmaXJzdE5hbWUgOiAnRm9vJyxcclxuICAgIGxhc3ROYW1lIDogJ0JhcidcclxufVxyXG5cclxuLy9jcmVhdGluZyBmdW5jdGlvbiBpbnRlcmZhY2VcclxuaW50ZXJmYWNlIElGaWx0ZXJGdW5jdGlvbiB7XHJcbiAgICAob2JqZWN0OmFueSkgOiBib29sZWFuXHJcbn1cclxuXHJcbi8vZnVuY3Rpb24gdGhhdCBjb25mb3JtcyB0byB0aGUgaW50ZXJmYWNlXHJcbmxldCBpc05vdE51bGwgOiBJRmlsdGVyRnVuY3Rpb24gPSBmdW5jdGlvbihvYmplY3Q6YW55KSB7XHJcbiAgICByZXR1cm4gb2JqZWN0ICE9IG51bGw7XHJcbn1cclxuXHJcbi8vd2UgY2FuIGZvcmNlIGNhc3Qgb2YgYW55dGhpbmcgdGhhdCBkb2VzIG5vdCBtYXRjaCB0aGUgaW50ZXJmYWNlXHJcbmxldCBmb3JjZWRDYXNlIDogSUZpbHRlckZ1bmN0aW9uID0gPElGaWx0ZXJGdW5jdGlvbj4gZW1wdHk7XHJcblxyXG4vL2Z1bmN0aW9uJ3MgcGFyYW1ldGVyIGNhbiBkZWZpbmUgZXhwZWN0ZWQgaW50ZXJmYWNlIGlubGluZVxyXG4vL2Z1bmN0aW9uIHJlY2VpdmVzIG9iamVjdCBvZiBpbmxpbmUgdHlwZSwgYW5kIHJldHVybnMgYSBzdHJpbmdcclxuZnVuY3Rpb24gZ2V0RnVsbE5hbWUob2JqZWN0OiB7IGZpcnN0TmFtZTpzdHJpbmcsIGxhc3ROYW1lOnN0cmluZyB9KSA6IHN0cmluZyB7XHJcbiAgICBpZiAoIWlzTm90TnVsbChvYmplY3QpKSB7XHJcbiAgICAgICAgdGhyb3cgJ09iamVjdCBzaG91bGQgbm90IGJlIG51bGwhJ1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG9iamVjdC5maXJzdE5hbWUgKyAnICcgKyBvYmplY3QubGFzdE5hbWU7XHJcbn1cclxuXHJcbi8vaW50ZXJmYWNlcyBhcmUgaW1wbGljaXRseSBpbXBsZW1lbnRlZFxyXG5nZXRGdWxsTmFtZShvYmplY3RzSW1wbGljaXRseUltcGxlbWVudCk7XHJcbmdldEZ1bGxOYW1lKHtmaXJzdE5hbWU6JycsIGxhc3ROYW1lOicnfSk7XHJcblxyXG4vL2ludGVyZmFjZSBjYW4gc3BlY2lmeSBob3cgYSBjb25zdHJ1Y3RvciBzaG91bGQgbG9va2xpa2VcclxuaW50ZXJmYWNlIElFbmdpbmVGYWN0b3J5IHtcclxuICAgIG5ldyAoYXJnMTogbnVtYmVyLCBuYW1lOiBzdHJpbmcpOiBhbnlcclxufVxyXG5cclxuLy9jbGFzcyBsb29rcyBsaWtlIHRoaXNcclxuY2xhc3MgRWxlY3RyaWNFbmdpbmUge1xyXG5cclxuICAgIC8vYSBwcml2YXRlIHByb3BlcnR5XHJcbiAgICBwcml2YXRlIG5vV2F0dHM6IG51bWJlcjtcclxuICAgIGNvbnN0cnVjdG9yKG5vV2F0dHM6IG51bWJlciwgbmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5ub1dhdHRzID0gbm9XYXR0cztcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgR2FzRW5naW5lIHtcclxuICAgIC8vcHVibGljIGFuZCBwcml2YXRlIGtleXdvcmQgaW1tZWRpYXRlbHkgc2V0cyB0aGUgZmllbGRzXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIG5vUGlzdG9uczogbnVtYmVyLCBwdWJsaWMgbmFtZTogc3RyaW5nKSB7IH1cclxufVxyXG5cclxuLy9hIGZ1bmN0aW9uIGNhbiByZWNlaXZlIGludGVyZmFjZSBvZiBhIGNvbnN0cnVjdG9yXHJcbmZ1bmN0aW9uIGNyZWF0ZUVuZ2luZXMoZmFjdG9yeTogSUVuZ2luZUZhY3RvcnkpIDogQXJyYXk8YW55PiB7XHJcbiAgICBsZXQgZW5naW5lcyA6IEFycmF5PGFueT4gPSBbXTtcclxuICAgIC8vaW50ZXJmYWNlIG9mIGEgY29uc3RydWN0b3IgaXMgdXNlZCB3aXRoIG5ldyBvcGVyYXRvclxyXG4gICAgZW5naW5lcy5wdXNoKG5ldyBmYWN0b3J5KDEsICdmaXJzdCcpKTtcclxuICAgIGVuZ2luZXMucHVzaChuZXcgZmFjdG9yeSgyLCAnc2Vjb25kJykpO1xyXG4gICAgcmV0dXJuIGVuZ2luZXM7XHJcbn1cclxuXHJcbi8vYSBzdGF0aWMgY29uc3RydWN0b3IgZGVmaW5pdGlvbiBoYXMgdG8gYmUgcGFzc2VkIHRvIHRoZSBmdW5jdGlvblxyXG5jcmVhdGVFbmdpbmVzKEdhc0VuZ2luZSk7XHJcbmNyZWF0ZUVuZ2luZXMoRWxlY3RyaWNFbmdpbmUpO1xyXG5cclxuKGZ1bmN0aW9uKCkge1xyXG5cclxuXHJcblxyXG5cclxuXHJcbn0pKCk7IiwibmFtZXNwYWNlIEludGVyZmFjZXMge1xyXG5cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSUVkaXRvclByb3BzIHtcclxuICAgICAgICBsaW5lczpBcnJheTxzdHJpbmc+O1xyXG4gICAgICAgIGxpbmVBZGRlZD86IChsaW5lOiBzdHJpbmcpPT52b2lkO1xyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSUFwcFByb3BzIHtcclxuICAgICAgICBjb21wbGV0ZWRDb3VudDogbnVtYmVyO1xyXG4gICAgICAgIG9uQ2xlYXJDb21wbGV0ZWQ/OiBhbnk7XHJcbiAgICAgICAgZmlyc3RTaG93aW5nOiBzdHJpbmc7XHJcbiAgICAgICAgY291bnQ6IG51bWJlcjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBEZWZpbmVzIHRoZSBpbnRlcmZhY2Ugb2YgdGhlIHN0cnVjdHVyZSBvZiBhIHRhc2tcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSVRvZG8ge1xyXG4gICAgICAgIGlkOiBzdHJpbmcsXHJcbiAgICAgICAgdGl0bGU6IHN0cmluZyxcclxuICAgICAgICBjb21wbGV0ZWQ6IGJvb2xlYW5cclxuICAgIH1cclxuXHJcbiAgICAvLyBEZWZpbmVzIHRoZSBpbnRlcmZhY2Ugb2YgdGhlIHByb3BlcnRpZXMgb2YgdGhlIFRvZG9JdGVtIGNvbXBvbmVudFxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJVG9kb0l0ZW1Qcm9wcyB7XHJcbiAgICAgICAga2V5OiBzdHJpbmcsXHJcbiAgICAgICAgdG9kbzogSVRvZG87XHJcbiAgICAgICAgZWRpdGluZz86IGJvb2xlYW47XHJcbiAgICAgICAgb25TYXZlOiAodmFsOiBhbnkpID0+IHZvaWQ7XHJcbiAgICAgICAgb25EZXN0cm95OiAoKSA9PiB2b2lkO1xyXG4gICAgICAgIG9uRWRpdDogKCkgPT4gdm9pZDtcclxuICAgICAgICBvbkNhbmNlbDogKGV2ZW50OiBhbnkpID0+IHZvaWQ7XHJcbiAgICAgICAgb25Ub2dnbGU6ICgpID0+IHZvaWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRGVmaW5lcyB0aGUgaW50ZXJmYWNlIG9mIHRoZSBzdGF0ZSBvZiB0aGUgVG9kb0l0ZW0gY29tcG9uZW50XHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElUb2RvSXRlbVN0YXRlIHtcclxuICAgICAgICBlZGl0VGV4dDogc3RyaW5nXHJcbiAgICB9XHJcblxyXG4gICAgLy8gRGVmaW5lcyB0aGUgVG9kb01vZGVsIGludGVyZmFjZVxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJVG9kb01vZGVsIHtcclxuICAgICAgICBrZXk6IGFueTtcclxuICAgICAgICB0b2RvczogQXJyYXk8SVRvZG8+O1xyXG4gICAgICAgIG9uQ2hhbmdlczogQXJyYXk8YW55PjtcclxuICAgICAgICBzdWJzY3JpYmUob25DaGFuZ2UpO1xyXG4gICAgICAgIGluZm9ybSgpO1xyXG4gICAgICAgIGFkZFRvZG8odGl0bGU6IHN0cmluZyk7XHJcbiAgICAgICAgdG9nZ2xlQWxsKGNoZWNrZWQpO1xyXG4gICAgICAgIHRvZ2dsZSh0b2RvVG9Ub2dnbGUpO1xyXG4gICAgICAgIGRlc3Ryb3kodG9kbyk7XHJcbiAgICAgICAgc2F2ZSh0b2RvVG9TYXZlLCB0ZXh0KTtcclxuICAgICAgICBjbGVhckNvbXBsZXRlZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIERlZmluZXMgdGhlIGludGVyZmFjZSBvZiB0aGUgc3RhdGUgb2YgdGhlIEFwcCBjb21wb25lbnRcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSUFwcFN0YXRlIHtcclxuICAgICAgICBlZGl0aW5nPzogc3RyaW5nO1xyXG4gICAgICAgIG5vd1Nob3dpbmc/OiBzdHJpbmdcclxuICAgIH1cclxufSIsIm5hbWVzcGFjZSBNb2RlbHMge1xyXG5cclxufSIsImV4cG9ydCBjbGFzcyBVdGlscyB7XHJcblxyXG4gICAgLy8gUmVhY3QgaWRpb20gZm9yIHNob3J0Y3V0dGluZyB0byBgY2xhc3NTZXRgIHNpbmNlIGl0J2xsIGJlIHVzZWQgb2Z0ZW5cclxuICAgIC8vdmFyIGN4ID0gUmVhY3QuYWRkb25zLmNsYXNzU2V0O1xyXG4gICAgcHVibGljIHN0YXRpYyByZW5kZXJDbGFzcyhvYmplY3Q6IGFueSk6IHN0cmluZyB7XHJcbiAgICAgICAgZm9yICh2YXIgcHJvcCBpbiBvYmplY3QpIHtcclxuICAgICAgICAgICAgaWYgKG9iamVjdFtwcm9wXSA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvcDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLy8gZ2VuZXJhdGVzIGEgbmV3IFVuaXZlcnNhbGx5IHVuaXF1ZSBpZGVudGlmeSAoVVVJRClcclxuICAgIC8vIHRoZSBVVUlEIGlzIHVzZWQgdG8gaWRlbnRpZnkgZWFjaCBvZiB0aGUgdGFza3NcclxuICAgIHB1YmxpYyBzdGF0aWMgdXVpZCgpOiBzdHJpbmcge1xyXG4gICAgICAgIC8qanNoaW50IGJpdHdpc2U6ZmFsc2UgKi9cclxuICAgICAgICB2YXIgaSwgcmFuZG9tO1xyXG4gICAgICAgIHZhciB1dWlkID0gJyc7XHJcblxyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCAzMjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHJhbmRvbSA9IE1hdGgucmFuZG9tKCkgKiAxNiB8IDA7XHJcbiAgICAgICAgICAgIGlmIChpID09PSA4IHx8IGkgPT09IDEyIHx8IGkgPT09IDE2IHx8IGkgPT09IDIwKSB7XHJcbiAgICAgICAgICAgICAgICB1dWlkICs9ICctJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB1dWlkICs9IChpID09PSAxMiA/IDQgOiAoaSA9PT0gMTYgPyAocmFuZG9tICYgMyB8IDgpIDogcmFuZG9tKSlcclxuICAgICAgICAgICAgICAgIC50b1N0cmluZygxNik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdXVpZDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBhZGRzICdzJyB0byB0aGUgZW5kIG9mIGEgZ2l2ZW4gd29ybGQgd2hlbiBjb3VudCA+IDFcclxuICAgIHB1YmxpYyBzdGF0aWMgcGx1cmFsaXplKGNvdW50LCB3b3JkKSB7XHJcbiAgICAgICAgcmV0dXJuIGNvdW50ID09PSAxID8gd29yZCA6IHdvcmQgKyAncyc7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gc3RvcmVzIGRhdGEgdXNpbmcgdGhlIGxvY2FsU3RvcmFnZSBBUElcclxuICAgIHB1YmxpYyBzdGF0aWMgc3RvcmUobmFtZXNwYWNlLCBkYXRhPykge1xyXG4gICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShuYW1lc3BhY2UsIEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBzdG9yZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKG5hbWVzcGFjZSk7XHJcbiAgICAgICAgcmV0dXJuIChzdG9yZSAmJiBKU09OLnBhcnNlKHN0b3JlKSkgfHwgW107XHJcbiAgICB9XHJcblxyXG4gICAgLy8ganVzdCBhIGhlbHBlciBmb3IgaW5oZXJpdGFuY2VcclxuICAgIHB1YmxpYyBzdGF0aWMgZXh0ZW5kKC4uLm9ianM6IGFueVtdKTogYW55IHtcclxuICAgICAgICB2YXIgbmV3T2JqID0ge307XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvYmpzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBvYmogPSBvYmpzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXdPYmpba2V5XSA9IG9ialtrZXldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXdPYmo7XHJcbiAgICB9XHJcbn0iLCIvLzxyZWZlcmVuY2UgcGF0aD1cIi4uL3NoYXJlZC9JbnRlcmZhY2VzLnRzXCIgLz5cclxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnXHJcbmltcG9ydCB7IFV0aWxzIH0gZnJvbSAnLi4vc2hhcmVkL1V0aWxzJ1xyXG5cclxuZXhwb3J0IGNsYXNzIEVkaXRvciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxJbnRlcmZhY2VzLklFZGl0b3JQcm9wcywge30+IHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wczogSW50ZXJmYWNlcy5JRWRpdG9yUHJvcHMsIGNvbnRleHQ6IGFueSkge1xyXG4gICAgICAgIHN1cGVyKHByb3BzLCBjb250ZXh0KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGhhbmRsZUtleWRvd24oZXZlbnQ6IFJlYWN0LktleWJvYXJkRXZlbnQpIHtcclxuICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMTMpIHtcclxuICAgICAgICAgICAgbGV0IGVsID0gdGhpcy5yZWZzWyduZXdMaW5lVGV4dCddIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLmxpbmVBZGRlZClcclxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMubGluZUFkZGVkKGVsLnZhbHVlKTtcclxuICAgICAgICAgICAgZWwudmFsdWUgPSAnJztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgPHVsPlxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5saW5lcy5tYXAoKGxpbmU6IHN0cmluZywgaW5kZXg6bnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPGxpIGtleT17aW5kZXh9PntsaW5lfTwvbGk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgPC91bD5cclxuICAgICAgICAgICAgICAgIDxpbnB1dCByZWY9XCJuZXdMaW5lVGV4dFwiIHR5cGU9XCJ0ZXh0XCIgb25LZXlEb3duPXtlID0+IHRoaXMuaGFuZGxlS2V5ZG93bihlKSB9PlxyXG4gICAgICAgICAgICAgICAgPC9pbnB1dD5cclxuICAgICAgICAgICAgPC9kaXY+KTtcclxuICAgIH1cclxufSIsIi8vPHJlZmVyZW5jZSBwYXRoPVwiLi4vc2hhcmVkL0ludGVyZmFjZXMudHNcIiAvPlxyXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCdcclxuaW1wb3J0IHsgVXRpbHMgfSBmcm9tICcuLi9zaGFyZWQvVXRpbHMnXHJcbmltcG9ydCB7IEVkaXRvciB9IGZyb20gJy4vRWRpdG9yJ1xyXG5cclxuZXhwb3J0IGNsYXNzIEFwcCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxJbnRlcmZhY2VzLklBcHBQcm9wcywgeyBub3dTaG93aW5nOiBzdHJpbmcsIGxpbmVzOiBBcnJheTxzdHJpbmc+IH0+IHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wczogSW50ZXJmYWNlcy5JQXBwUHJvcHMsIGNvbnRleHQ6IGFueSkge1xyXG4gICAgICAgIHN1cGVyKHByb3BzLCBjb250ZXh0KTtcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICBub3dTaG93aW5nOiB0aGlzLnByb3BzLmZpcnN0U2hvd2luZyxcclxuICAgICAgICAgICAgbGluZXM6IFsnMScsICcyJywgJzMnLCAnNCddXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGhhbmRsZU5hdkNsaWNrKGV2ZW50OiBSZWFjdC5Nb3VzZUV2ZW50LCBub3dTaG93aW5nOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKChwcmV2LCBwcm9wcykgPT4ge1xyXG4gICAgICAgICAgICBpZiAocHJldi5ub3dTaG93aW5nID09PSBub3dTaG93aW5nKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHByZXY7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbm93U2hvd2luZzogbm93U2hvd2luZyxcclxuICAgICAgICAgICAgICAgICAgICBsaW5lczogcHJldi5saW5lc1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFkZExpbmUobGluZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSgocHJldiwgcHJvcHMpID0+IHtcclxuICAgICAgICAgICAgdmFyIGxpbmVzID0gcHJldi5saW5lcztcclxuICAgICAgICAgICAgbGluZXMucHVzaChsaW5lKTtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIG5vd1Nob3dpbmc6IHByZXYubm93U2hvd2luZyxcclxuICAgICAgICAgICAgICAgIGxpbmVzOiBsaW5lc1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZW5kZXIoKSB7XHJcblxyXG4gICAgICAgIHZhciBhY3RpdmVUb2RvV29yZCA9IFV0aWxzLnBsdXJhbGl6ZSh0aGlzLnByb3BzLmNvdW50LCAnaXRlbScpO1xyXG4gICAgICAgIHZhciBjbGVhckJ1dHRvbiA9IG51bGw7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmNvbXBsZXRlZENvdW50ID4gMCkge1xyXG4gICAgICAgICAgICBjbGVhckJ1dHRvbiA9IChcclxuICAgICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3YXZlcy1lZmZlY3Qgd2F2ZXMtbGlnaHQgYnRuLWxhcmdlIGNsZWFyLWNvbXBsZXRlZFwiXHJcbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5wcm9wcy5vbkNsZWFyQ29tcGxldGVkfT5cclxuICAgICAgICAgICAgICAgICAgICBDbGVhciBjb21wbGV0ZWRcclxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGN4ID0gVXRpbHMucmVuZGVyQ2xhc3M7XHJcbiAgICAgICAgbGV0IHN0YXRlID0gdGhpcy5zdGF0ZTtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgPG5hdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5hdi13cmFwcGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImJyYW5kLWxvZ28gdG9kby1jb3VudFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHN0cm9uZz57dGhpcy5wcm9wcy5jb3VudH08L3N0cm9uZz4ge2FjdGl2ZVRvZG9Xb3JkfSBsZWZ0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cImZpbHRlcnMgcmlnaHQgaGlkZS1vbi1tZWQtYW5kLWRvd25cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9e2N4KHsgYWN0aXZlOiB0aGlzLnN0YXRlLm5vd1Nob3dpbmcgPT0gJzEnIH0pIH0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaHJlZj1cIiMvXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17ZSA9PiB0aGlzLmhhbmRsZU5hdkNsaWNrKGUsICcxJykgfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQWxsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9e2N4KHsgYWN0aXZlOiB0aGlzLnN0YXRlLm5vd1Nob3dpbmcgPT0gJzInIH0pIH0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaHJlZj1cIiMvYWN0aXZlXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17ZSA9PiB0aGlzLmhhbmRsZU5hdkNsaWNrKGUsICcyJykgfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQWN0aXZlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9e2N4KHsgYWN0aXZlOiB0aGlzLnN0YXRlLm5vd1Nob3dpbmcgPT0gJzMnIH0pIH0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaHJlZj1cIiMvY29tcGxldGVkXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17ZSA9PiB0aGlzLmhhbmRsZU5hdkNsaWNrKGUsICczJykgfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ29tcGxldGVkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvbmF2PlxyXG4gICAgICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgICAgICA8RWRpdG9yIGxpbmVBZGRlZD17bGluZSA9PiB0aGlzLmFkZExpbmUobGluZSkgfSBsaW5lcz17dGhpcy5zdGF0ZS5saW5lc30+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9FZGl0b3I+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIHtjbGVhckJ1dHRvbn1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufSIsIi8vPHJlZmVyZW5jZXMgcGF0aD1cIi4vc2hhcmVkL0ludGVyZmFjZXMudHNcIiAvPlxyXG5cclxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnXHJcbmltcG9ydCAqIGFzIFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSdcclxuaW1wb3J0IHsgQXBwIH0gZnJvbSAnLi91aS9BcHAnXHJcbmltcG9ydCB7IEVkaXRvciB9IGZyb20gJy4vdWkvRWRpdG9yJ1xyXG5cclxubmFtZXNwYWNlIHV0aWxzIHtcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSUxvZ2dlciB7XHJcbiAgICAgICAgbG9nKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQ7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBtYWluKCk6IHZvaWQge1xyXG5cclxuICAgIGxldCBsb2dnZXI6IHV0aWxzLklMb2dnZXIgPSBjb25zb2xlO1xyXG4gICAgbG9nZ2VyLmxvZygnVGVzdCBtZXRob2QhJyk7XHJcblxyXG4gICAgUmVhY3RET00ucmVuZGVyKFxyXG4gICAgICAgIDxBcHAgY29tcGxldGVkQ291bnQ9ezF9XHJcbiAgICAgICAgICAgICBmaXJzdFNob3dpbmc9XCIyXCJcclxuICAgICAgICAgICAgIGNvdW50PXsxfT5cclxuICAgICAgICA8L0FwcD4sXHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnY29udGFpbmVyJylbMF1cclxuICAgICk7XHJcbn0iXX0=