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
                    return (React.createElement("div", null, this.props.hideList ? (React.createElement("div", null)) : (React.createElement("ul", null, this.props.lines.map(function (line, index) {
                        return React.createElement("li", {key: index}, line);
                    }))), React.createElement("input", {ref: "newLineText", type: "text", defaultValue: "Add new line...", onKeyDown: function (e) { return _this.handleKeydown(e); }})));
                };
                Editor.propTypes = {
                    hideList: React.PropTypes.bool.isRequired
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
                    return (React.createElement("div", null, React.createElement("nav", null, React.createElement("div", {className: "nav-wrapper"}, React.createElement("span", {className: "brand-logo todo-count"}, React.createElement("strong", null, this.props.count), " ", activeTodoWord, " left"), React.createElement("ul", {className: "filters right hide-on-med-and-down"}, React.createElement("li", {className: cx({ active: this.state.nowShowing == '1' })}, React.createElement("a", {href: "#/", onClick: function (e) { return _this.handleNavClick(e, '1'); }}, "All")), React.createElement("li", {className: cx({ active: this.state.nowShowing == '2' })}, React.createElement("a", {href: "#/active", onClick: function (e) { return _this.handleNavClick(e, '2'); }}, "Active")), React.createElement("li", {className: cx({ active: this.state.nowShowing == '3' })}, React.createElement("a", {href: "#/completed", onClick: function (e) { return _this.handleNavClick(e, '3'); }}, "Completed"))))), React.createElement("div", null, React.createElement(Editor_1.Editor, {hideList: false, lineAdded: function (line) { return _this.addLine(line); }, lines: this.state.lines})), clearButton));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGlsZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjaGVhdHNoZWV0LnRzIiwic2hhcmVkL0ludGVyZmFjZXMudHMiLCJzaGFyZWQvTW9kZWxzLnRzIiwic2hhcmVkL1V0aWxzLnRzIiwidWkvRWRpdG9yLnRzeCIsInVpL0FwcC50c3giLCJpbmRleC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxzQkFBc0I7QUFDdEIsSUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFDO0FBQ2xCLElBQUksUUFBUSxHQUFZLElBQUksQ0FBQztBQUM3QixJQUFJLFFBQVEsR0FBWSxFQUFFLENBQUM7QUFFM0IsMENBQTBDO0FBQzFDLElBQUksS0FBSyxHQUFTLGNBQVcsQ0FBQyxDQUFDO0FBVS9CLGlCQUFpQjtBQUNqQiw4REFBOEQ7QUFDOUQsSUFBSSwwQkFBMEIsR0FBa0I7SUFDNUMsU0FBUyxFQUFHLEtBQUs7SUFDakIsUUFBUSxFQUFHLEtBQUs7Q0FDbkIsQ0FBQTtBQU9ELHlDQUF5QztBQUN6QyxJQUFJLFNBQVMsR0FBcUIsVUFBUyxNQUFVO0lBQ2pELE1BQU0sQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDO0FBQzFCLENBQUMsQ0FBQTtBQUVELGlFQUFpRTtBQUNqRSxJQUFJLFVBQVUsR0FBdUMsS0FBSyxDQUFDO0FBRTNELDJEQUEyRDtBQUMzRCwrREFBK0Q7QUFDL0QscUJBQXFCLE1BQTZDO0lBQzlELEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyQixNQUFNLDRCQUE0QixDQUFBO0lBQ3RDLENBQUM7SUFDRCxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsR0FBRyxHQUFHLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQztBQUNwRCxDQUFDO0FBRUQsdUNBQXVDO0FBQ3ZDLFdBQVcsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO0FBQ3hDLFdBQVcsQ0FBQyxFQUFDLFNBQVMsRUFBQyxFQUFF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QVEsQ0FBQyxNQUFNLENBQ1gsb0JBQUMsU0FBRyxHQUFDLGNBQWMsRUFBRSxDQUFFLEVBQ2xCLFlBQVksRUFBQyxHQUFHLEVBQ2hCLEtBQUssRUFBRSxDQUFFLEVBQ1IsRUFDTixRQUFRLENBQUMsc0JBQXNCLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQ2xELENBQUM7SUFDTixDQUFDO0lBWkQsdUJBWUMsQ0FBQTs7Ozs7Ozs7Ozs7OztZQWRBIiwic291cmNlc0NvbnRlbnQiOlsiLy92YXJpYWJsZSBkZWNsYXJhdGlvblxyXG52YXIgaW1wbGljaXQgPSAnJztcclxudmFyIGV4cGxpY2l0IDogc3RyaW5nID0gbnVsbDtcclxubGV0IHVzaW5nTGV0IDogc3RyaW5nID0gJyc7XHJcblxyXG4vL2FueSBpcyB1c2VkIHRvIHJlcHJlc2VudCBhbnkgdW5zYWZlIHR5cGVcclxubGV0IGVtcHR5IDogYW55ID0gZnVuY3Rpb24oKXt9O1xyXG5cclxuLy9jcmVhdGluZyBpbnRlcmZhY2VcclxuaW50ZXJmYWNlIElOYW1lZE9iamVjdCB7XHJcbiAgICBmaXJzdE5hbWU6c3RyaW5nLFxyXG4gICAgbGFzdE5hbWU6c3RyaW5nLFxyXG4gICAgLy9vcHRpb25hbCBwcm9wZXJ0eSBkb2VzIG5vdCBuZWVkIHRvIGV4aXN0XHJcbiAgICBhZ2U/Om51bWJlclxyXG59XHJcblxyXG4vL3VzaW5nIGludGVyZmFjZVxyXG4vL2ludGVyZmFjZSBpcyBpbXBsaWNpdGx5IGltcGxlbWVudGVkIGJ5IGFueXRoaW5nIHRoYXQgbWF0Y2hlc1xyXG52YXIgb2JqZWN0c0ltcGxpY2l0bHlJbXBsZW1lbnQgOiBJTmFtZWRPYmplY3QgPSB7XHJcbiAgICBmaXJzdE5hbWUgOiAnRm9vJyxcclxuICAgIGxhc3ROYW1lIDogJ0JhcidcclxufVxyXG5cclxuLy9jcmVhdGluZyBmdW5jdGlvbiBpbnRlcmZhY2VcclxuaW50ZXJmYWNlIElGaWx0ZXJGdW5jdGlvbiB7XHJcbiAgICAob2JqZWN0OmFueSkgOiBib29sZWFuXHJcbn1cclxuXHJcbi8vZnVuY3Rpb24gdGhhdCBjb25mb3JtcyB0byB0aGUgaW50ZXJmYWNlXHJcbmxldCBpc05vdE51bGwgOiBJRmlsdGVyRnVuY3Rpb24gPSBmdW5jdGlvbihvYmplY3Q6YW55KSB7XHJcbiAgICByZXR1cm4gb2JqZWN0ICE9IG51bGw7XHJcbn1cclxuXHJcbi8vd2UgY2FuIGZvcmNlIGNhc3Qgb2YgYW55dGhpbmcgdGhhdCBkb2VzIG5vdCBtYXRjaCB0aGUgaW50ZXJmYWNlXHJcbmxldCBmb3JjZWRDYXNlIDogSUZpbHRlckZ1bmN0aW9uID0gPElGaWx0ZXJGdW5jdGlvbj4gZW1wdHk7XHJcblxyXG4vL2Z1bmN0aW9uJ3MgcGFyYW1ldGVyIGNhbiBkZWZpbmUgZXhwZWN0ZWQgaW50ZXJmYWNlIGlubGluZVxyXG4vL2Z1bmN0aW9uIHJlY2VpdmVzIG9iamVjdCBvZiBpbmxpbmUgdHlwZSwgYW5kIHJldHVybnMgYSBzdHJpbmdcclxuZnVuY3Rpb24gZ2V0RnVsbE5hbWUob2JqZWN0OiB7IGZpcnN0TmFtZTpzdHJpbmcsIGxhc3ROYW1lOnN0cmluZyB9KSA6IHN0cmluZyB7XHJcbiAgICBpZiAoIWlzTm90TnVsbChvYmplY3QpKSB7XHJcbiAgICAgICAgdGhyb3cgJ09iamVjdCBzaG91bGQgbm90IGJlIG51bGwhJ1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG9iamVjdC5maXJzdE5hbWUgKyAnICcgKyBvYmplY3QubGFzdE5hbWU7XHJcbn1cclxuXHJcbi8vaW50ZXJmYWNlcyBhcmUgaW1wbGljaXRseSBpbXBsZW1lbnRlZFxyXG5nZXRGdWxsTmFtZShvYmplY3RzSW1wbGljaXRseUltcGxlbWVudCk7XHJcbmdldEZ1bGxOYW1lKHtmaXJzdE5hbWU6JycsIGxhc3ROYW1lOicnfSk7XHJcblxyXG4vL2ludGVyZmFjZSBjYW4gc3BlY2lmeSBob3cgYSBjb25zdHJ1Y3RvciBzaG91bGQgbG9va2xpa2VcclxuaW50ZXJmYWNlIElFbmdpbmVGYWN0b3J5IHtcclxuICAgIG5ldyAoYXJnMTogbnVtYmVyLCBuYW1lOiBzdHJpbmcpOiBhbnlcclxufVxyXG5cclxuLy9jbGFzcyBsb29rcyBsaWtlIHRoaXNcclxuY2xhc3MgRWxlY3RyaWNFbmdpbmUge1xyXG5cclxuICAgIC8vYSBwcml2YXRlIHByb3BlcnR5XHJcbiAgICBwcml2YXRlIG5vV2F0dHM6IG51bWJlcjtcclxuICAgIGNvbnN0cnVjdG9yKG5vV2F0dHM6IG51bWJlciwgbmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5ub1dhdHRzID0gbm9XYXR0cztcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgR2FzRW5naW5lIHtcclxuICAgIC8vcHVibGljIGFuZCBwcml2YXRlIGtleXdvcmQgaW1tZWRpYXRlbHkgc2V0cyB0aGUgZmllbGRzXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIG5vUGlzdG9uczogbnVtYmVyLCBwdWJsaWMgbmFtZTogc3RyaW5nKSB7IH1cclxufVxyXG5cclxuLy9hIGZ1bmN0aW9uIGNhbiByZWNlaXZlIGludGVyZmFjZSBvZiBhIGNvbnN0cnVjdG9yXHJcbmZ1bmN0aW9uIGNyZWF0ZUVuZ2luZXMoZmFjdG9yeTogSUVuZ2luZUZhY3RvcnkpIDogQXJyYXk8YW55PiB7XHJcbiAgICBsZXQgZW5naW5lcyA6IEFycmF5PGFueT4gPSBbXTtcclxuICAgIC8vaW50ZXJmYWNlIG9mIGEgY29uc3RydWN0b3IgaXMgdXNlZCB3aXRoIG5ldyBvcGVyYXRvclxyXG4gICAgZW5naW5lcy5wdXNoKG5ldyBmYWN0b3J5KDEsICdmaXJzdCcpKTtcclxuICAgIGVuZ2luZXMucHVzaChuZXcgZmFjdG9yeSgyLCAnc2Vjb25kJykpO1xyXG4gICAgcmV0dXJuIGVuZ2luZXM7XHJcbn1cclxuXHJcbi8vYSBzdGF0aWMgY29uc3RydWN0b3IgZGVmaW5pdGlvbiBoYXMgdG8gYmUgcGFzc2VkIHRvIHRoZSBmdW5jdGlvblxyXG5jcmVhdGVFbmdpbmVzKEdhc0VuZ2luZSk7XHJcbmNyZWF0ZUVuZ2luZXMoRWxlY3RyaWNFbmdpbmUpO1xyXG5cclxuKGZ1bmN0aW9uKCkge1xyXG5cclxuXHJcblxyXG5cclxuXHJcbn0pKCk7IiwibmFtZXNwYWNlIEludGVyZmFjZXMge1xyXG5cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSUVkaXRvclByb3BzIHtcclxuICAgICAgICBsaW5lczpBcnJheTxzdHJpbmc+O1xyXG4gICAgICAgIGxpbmVBZGRlZD86IChsaW5lOiBzdHJpbmcpPT52b2lkO1xyXG4gICAgICAgIGhpZGVMaXN0PzogYm9vbGVhblxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSUFwcFByb3BzIHtcclxuICAgICAgICBjb21wbGV0ZWRDb3VudDogbnVtYmVyO1xyXG4gICAgICAgIG9uQ2xlYXJDb21wbGV0ZWQ/OiBhbnk7XHJcbiAgICAgICAgZmlyc3RTaG93aW5nOiBzdHJpbmc7XHJcbiAgICAgICAgY291bnQ6IG51bWJlcjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBEZWZpbmVzIHRoZSBpbnRlcmZhY2Ugb2YgdGhlIHN0cnVjdHVyZSBvZiBhIHRhc2tcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSVRvZG8ge1xyXG4gICAgICAgIGlkOiBzdHJpbmcsXHJcbiAgICAgICAgdGl0bGU6IHN0cmluZyxcclxuICAgICAgICBjb21wbGV0ZWQ6IGJvb2xlYW5cclxuICAgIH1cclxuXHJcbiAgICAvLyBEZWZpbmVzIHRoZSBpbnRlcmZhY2Ugb2YgdGhlIHByb3BlcnRpZXMgb2YgdGhlIFRvZG9JdGVtIGNvbXBvbmVudFxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJVG9kb0l0ZW1Qcm9wcyB7XHJcbiAgICAgICAga2V5OiBzdHJpbmcsXHJcbiAgICAgICAgdG9kbzogSVRvZG87XHJcbiAgICAgICAgZWRpdGluZz86IGJvb2xlYW47XHJcbiAgICAgICAgb25TYXZlOiAodmFsOiBhbnkpID0+IHZvaWQ7XHJcbiAgICAgICAgb25EZXN0cm95OiAoKSA9PiB2b2lkO1xyXG4gICAgICAgIG9uRWRpdDogKCkgPT4gdm9pZDtcclxuICAgICAgICBvbkNhbmNlbDogKGV2ZW50OiBhbnkpID0+IHZvaWQ7XHJcbiAgICAgICAgb25Ub2dnbGU6ICgpID0+IHZvaWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRGVmaW5lcyB0aGUgaW50ZXJmYWNlIG9mIHRoZSBzdGF0ZSBvZiB0aGUgVG9kb0l0ZW0gY29tcG9uZW50XHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElUb2RvSXRlbVN0YXRlIHtcclxuICAgICAgICBlZGl0VGV4dDogc3RyaW5nXHJcbiAgICB9XHJcblxyXG4gICAgLy8gRGVmaW5lcyB0aGUgVG9kb01vZGVsIGludGVyZmFjZVxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJVG9kb01vZGVsIHtcclxuICAgICAgICBrZXk6IGFueTtcclxuICAgICAgICB0b2RvczogQXJyYXk8SVRvZG8+O1xyXG4gICAgICAgIG9uQ2hhbmdlczogQXJyYXk8YW55PjtcclxuICAgICAgICBzdWJzY3JpYmUob25DaGFuZ2UpO1xyXG4gICAgICAgIGluZm9ybSgpO1xyXG4gICAgICAgIGFkZFRvZG8odGl0bGU6IHN0cmluZyk7XHJcbiAgICAgICAgdG9nZ2xlQWxsKGNoZWNrZWQpO1xyXG4gICAgICAgIHRvZ2dsZSh0b2RvVG9Ub2dnbGUpO1xyXG4gICAgICAgIGRlc3Ryb3kodG9kbyk7XHJcbiAgICAgICAgc2F2ZSh0b2RvVG9TYXZlLCB0ZXh0KTtcclxuICAgICAgICBjbGVhckNvbXBsZXRlZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIERlZmluZXMgdGhlIGludGVyZmFjZSBvZiB0aGUgc3RhdGUgb2YgdGhlIEFwcCBjb21wb25lbnRcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSUFwcFN0YXRlIHtcclxuICAgICAgICBlZGl0aW5nPzogc3RyaW5nO1xyXG4gICAgICAgIG5vd1Nob3dpbmc/OiBzdHJpbmdcclxuICAgIH1cclxufSIsIm5hbWVzcGFjZSBNb2RlbHMge1xyXG5cclxufSIsImV4cG9ydCBjbGFzcyBVdGlscyB7XHJcblxyXG4gICAgLy8gUmVhY3QgaWRpb20gZm9yIHNob3J0Y3V0dGluZyB0byBgY2xhc3NTZXRgIHNpbmNlIGl0J2xsIGJlIHVzZWQgb2Z0ZW5cclxuICAgIC8vdmFyIGN4ID0gUmVhY3QuYWRkb25zLmNsYXNzU2V0O1xyXG4gICAgcHVibGljIHN0YXRpYyByZW5kZXJDbGFzcyhvYmplY3Q6IGFueSk6IHN0cmluZyB7XHJcbiAgICAgICAgZm9yICh2YXIgcHJvcCBpbiBvYmplY3QpIHtcclxuICAgICAgICAgICAgaWYgKG9iamVjdFtwcm9wXSA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvcDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLy8gZ2VuZXJhdGVzIGEgbmV3IFVuaXZlcnNhbGx5IHVuaXF1ZSBpZGVudGlmeSAoVVVJRClcclxuICAgIC8vIHRoZSBVVUlEIGlzIHVzZWQgdG8gaWRlbnRpZnkgZWFjaCBvZiB0aGUgdGFza3NcclxuICAgIHB1YmxpYyBzdGF0aWMgdXVpZCgpOiBzdHJpbmcge1xyXG4gICAgICAgIC8qanNoaW50IGJpdHdpc2U6ZmFsc2UgKi9cclxuICAgICAgICB2YXIgaSwgcmFuZG9tO1xyXG4gICAgICAgIHZhciB1dWlkID0gJyc7XHJcblxyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCAzMjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHJhbmRvbSA9IE1hdGgucmFuZG9tKCkgKiAxNiB8IDA7XHJcbiAgICAgICAgICAgIGlmIChpID09PSA4IHx8IGkgPT09IDEyIHx8IGkgPT09IDE2IHx8IGkgPT09IDIwKSB7XHJcbiAgICAgICAgICAgICAgICB1dWlkICs9ICctJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB1dWlkICs9IChpID09PSAxMiA/IDQgOiAoaSA9PT0gMTYgPyAocmFuZG9tICYgMyB8IDgpIDogcmFuZG9tKSlcclxuICAgICAgICAgICAgICAgIC50b1N0cmluZygxNik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdXVpZDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBhZGRzICdzJyB0byB0aGUgZW5kIG9mIGEgZ2l2ZW4gd29ybGQgd2hlbiBjb3VudCA+IDFcclxuICAgIHB1YmxpYyBzdGF0aWMgcGx1cmFsaXplKGNvdW50LCB3b3JkKSB7XHJcbiAgICAgICAgcmV0dXJuIGNvdW50ID09PSAxID8gd29yZCA6IHdvcmQgKyAncyc7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gc3RvcmVzIGRhdGEgdXNpbmcgdGhlIGxvY2FsU3RvcmFnZSBBUElcclxuICAgIHB1YmxpYyBzdGF0aWMgc3RvcmUobmFtZXNwYWNlLCBkYXRhPykge1xyXG4gICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShuYW1lc3BhY2UsIEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBzdG9yZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKG5hbWVzcGFjZSk7XHJcbiAgICAgICAgcmV0dXJuIChzdG9yZSAmJiBKU09OLnBhcnNlKHN0b3JlKSkgfHwgW107XHJcbiAgICB9XHJcblxyXG4gICAgLy8ganVzdCBhIGhlbHBlciBmb3IgaW5oZXJpdGFuY2VcclxuICAgIHB1YmxpYyBzdGF0aWMgZXh0ZW5kKC4uLm9ianM6IGFueVtdKTogYW55IHtcclxuICAgICAgICB2YXIgbmV3T2JqID0ge307XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvYmpzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBvYmogPSBvYmpzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXdPYmpba2V5XSA9IG9ialtrZXldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXdPYmo7XHJcbiAgICB9XHJcbn0iLCIvLzxyZWZlcmVuY2UgcGF0aD1cIi4uL3NoYXJlZC9JbnRlcmZhY2VzLnRzXCIgLz5cclxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnXHJcbmltcG9ydCB7IFV0aWxzIH0gZnJvbSAnLi4vc2hhcmVkL1V0aWxzJ1xyXG5cclxuZXhwb3J0IGNsYXNzIEVkaXRvciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxJbnRlcmZhY2VzLklFZGl0b3JQcm9wcywge30+IHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wczogSW50ZXJmYWNlcy5JRWRpdG9yUHJvcHMsIGNvbnRleHQ6IGFueSkge1xyXG4gICAgICAgIHN1cGVyKHByb3BzLCBjb250ZXh0KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHByb3BUeXBlczphbnkgPSB7XHJcbiAgICAgICAgaGlkZUxpc3Q6IFJlYWN0LlByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWRcclxuICAgIH07XHJcblxyXG4gICAgcHJpdmF0ZSBoYW5kbGVLZXlkb3duKGV2ZW50OiBSZWFjdC5LZXlib2FyZEV2ZW50KSB7XHJcbiAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDEzKSB7XHJcbiAgICAgICAgICAgIGxldCBlbCA9IHRoaXMucmVmc1snbmV3TGluZVRleHQnXSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5saW5lQWRkZWQpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmxpbmVBZGRlZChlbC52YWx1ZSk7XHJcbiAgICAgICAgICAgIGVsLnZhbHVlID0gJyc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmhpZGVMaXN0ID8gKDxkaXYvPikgOiAoXHJcbiAgICAgICAgICAgICAgICA8dWw+XHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmxpbmVzLm1hcCgobGluZTogc3RyaW5nLCBpbmRleDogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPGxpIGtleT17aW5kZXh9PntsaW5lfTwvbGk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgPC91bD4pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICA8aW5wdXQgcmVmPVwibmV3TGluZVRleHRcIiB0eXBlPVwidGV4dFwiIGRlZmF1bHRWYWx1ZT1cIkFkZCBuZXcgbGluZS4uLlwiIG9uS2V5RG93bj17ZSA9PiB0aGlzLmhhbmRsZUtleWRvd24oZSkgfT5cclxuICAgICAgICAgICAgICAgIDwvaW5wdXQ+XHJcbiAgICAgICAgICAgIDwvZGl2Pik7XHJcbiAgICB9XHJcbn0iLCIvLzxyZWZlcmVuY2UgcGF0aD1cIi4uL3NoYXJlZC9JbnRlcmZhY2VzLnRzXCIgLz5cclxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnXHJcbmltcG9ydCB7IFV0aWxzIH0gZnJvbSAnLi4vc2hhcmVkL1V0aWxzJ1xyXG5pbXBvcnQgeyBFZGl0b3IgfSBmcm9tICcuL0VkaXRvcidcclxuXHJcbmV4cG9ydCBjbGFzcyBBcHAgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8SW50ZXJmYWNlcy5JQXBwUHJvcHMsIHsgbm93U2hvd2luZzogc3RyaW5nLCBsaW5lczogQXJyYXk8c3RyaW5nPiB9PiB7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJvcHM6IEludGVyZmFjZXMuSUFwcFByb3BzLCBjb250ZXh0OiBhbnkpIHtcclxuICAgICAgICBzdXBlcihwcm9wcywgY29udGV4dCk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgbm93U2hvd2luZzogdGhpcy5wcm9wcy5maXJzdFNob3dpbmcsXHJcbiAgICAgICAgICAgIGxpbmVzOiBbJzEnLCAnMicsICczJywgJzQnXVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBoYW5kbGVOYXZDbGljayhldmVudDogUmVhY3QuTW91c2VFdmVudCwgbm93U2hvd2luZzogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSgocHJldiwgcHJvcHMpID0+IHtcclxuICAgICAgICAgICAgaWYgKHByZXYubm93U2hvd2luZyA9PT0gbm93U2hvd2luZylcclxuICAgICAgICAgICAgICAgIHJldHVybiBwcmV2O1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIG5vd1Nob3dpbmc6IG5vd1Nob3dpbmcsXHJcbiAgICAgICAgICAgICAgICAgICAgbGluZXM6IHByZXYubGluZXNcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhZGRMaW5lKGxpbmU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoKHByZXYsIHByb3BzKSA9PiB7XHJcbiAgICAgICAgICAgIHZhciBsaW5lcyA9IHByZXYubGluZXM7XHJcbiAgICAgICAgICAgIGxpbmVzLnB1c2gobGluZSk7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBub3dTaG93aW5nOiBwcmV2Lm5vd1Nob3dpbmcsXHJcbiAgICAgICAgICAgICAgICBsaW5lczogbGluZXNcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVuZGVyKCkge1xyXG5cclxuICAgICAgICB2YXIgYWN0aXZlVG9kb1dvcmQgPSBVdGlscy5wbHVyYWxpemUodGhpcy5wcm9wcy5jb3VudCwgJ2l0ZW0nKTtcclxuICAgICAgICB2YXIgY2xlYXJCdXR0b24gPSBudWxsO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5wcm9wcy5jb21wbGV0ZWRDb3VudCA+IDApIHtcclxuICAgICAgICAgICAgY2xlYXJCdXR0b24gPSAoXHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwid2F2ZXMtZWZmZWN0IHdhdmVzLWxpZ2h0IGJ0bi1sYXJnZSBjbGVhci1jb21wbGV0ZWRcIlxyXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMucHJvcHMub25DbGVhckNvbXBsZXRlZH0+XHJcbiAgICAgICAgICAgICAgICAgICAgQ2xlYXIgY29tcGxldGVkXHJcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBjeCA9IFV0aWxzLnJlbmRlckNsYXNzO1xyXG4gICAgICAgIGxldCBzdGF0ZSA9IHRoaXMuc3RhdGU7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgIDxuYXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJuYXYtd3JhcHBlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJicmFuZC1sb2dvIHRvZG8tY291bnRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzdHJvbmc+e3RoaXMucHJvcHMuY291bnR9PC9zdHJvbmc+IHthY3RpdmVUb2RvV29yZH0gbGVmdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJmaWx0ZXJzIHJpZ2h0IGhpZGUtb24tbWVkLWFuZC1kb3duXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPXtjeCh7IGFjdGl2ZTogdGhpcy5zdGF0ZS5ub3dTaG93aW5nID09ICcxJyB9KSB9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhyZWY9XCIjL1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2UgPT4gdGhpcy5oYW5kbGVOYXZDbGljayhlLCAnMScpIH0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFsbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPXtjeCh7IGFjdGl2ZTogdGhpcy5zdGF0ZS5ub3dTaG93aW5nID09ICcyJyB9KSB9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhyZWY9XCIjL2FjdGl2ZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2UgPT4gdGhpcy5oYW5kbGVOYXZDbGljayhlLCAnMicpIH0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFjdGl2ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPXtjeCh7IGFjdGl2ZTogdGhpcy5zdGF0ZS5ub3dTaG93aW5nID09ICczJyB9KSB9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhyZWY9XCIjL2NvbXBsZXRlZFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2UgPT4gdGhpcy5oYW5kbGVOYXZDbGljayhlLCAnMycpIH0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIENvbXBsZXRlZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L25hdj5cclxuICAgICAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPEVkaXRvciBoaWRlTGlzdD17ZmFsc2V9IGxpbmVBZGRlZD17bGluZSA9PiB0aGlzLmFkZExpbmUobGluZSl9IGxpbmVzPXt0aGlzLnN0YXRlLmxpbmVzfT5cclxuICAgICAgICAgICAgICAgICAgICA8L0VkaXRvcj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAge2NsZWFyQnV0dG9ufVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59IiwiLy88cmVmZXJlbmNlcyBwYXRoPVwiLi9zaGFyZWQvSW50ZXJmYWNlcy50c1wiIC8+XHJcblxyXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCdcclxuaW1wb3J0ICogYXMgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJ1xyXG5pbXBvcnQgeyBBcHAgfSBmcm9tICcuL3VpL0FwcCdcclxuaW1wb3J0IHsgRWRpdG9yIH0gZnJvbSAnLi91aS9FZGl0b3InXHJcblxyXG5uYW1lc3BhY2UgdXRpbHMge1xyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJTG9nZ2VyIHtcclxuICAgICAgICBsb2cobWVzc2FnZTogc3RyaW5nKTogdm9pZDtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG1haW4oKTogdm9pZCB7XHJcblxyXG4gICAgbGV0IGxvZ2dlcjogdXRpbHMuSUxvZ2dlciA9IGNvbnNvbGU7XHJcbiAgICBsb2dnZXIubG9nKCdUZXN0IG1ldGhvZCEnKTtcclxuXHJcbiAgICBSZWFjdERPTS5yZW5kZXIoXHJcbiAgICAgICAgPEFwcCBjb21wbGV0ZWRDb3VudD17MX1cclxuICAgICAgICAgICAgIGZpcnN0U2hvd2luZz1cIjJcIlxyXG4gICAgICAgICAgICAgY291bnQ9ezF9PlxyXG4gICAgICAgIDwvQXBwPixcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdjb250YWluZXInKVswXVxyXG4gICAgKTtcclxufSJdfQ==