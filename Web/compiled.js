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
//<reference path="../shared/Interfaces.ts" />
System.register("ui/App", ['react', "shared/Utils"], function(exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var React, Utils_1;
    var App;
    return {
        setters:[
            function (React_1) {
                React = React_1;
            },
            function (Utils_1_1) {
                Utils_1 = Utils_1_1;
            }],
        execute: function() {
            App = (function (_super) {
                __extends(App, _super);
                function App(props, context) {
                    _super.call(this, props, context);
                    this.state = {
                        nowShowing: this.props.firstShowing
                    };
                }
                App.prototype.handleNavClick = function (event, nowShowing) {
                    this.setState(function (prev, props) {
                        if (prev.nowShowing === nowShowing)
                            return prev;
                        else
                            return {
                                nowShowing: nowShowing
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
                    return (React.createElement("div", null, React.createElement("nav", null, React.createElement("div", {className: "nav-wrapper"}, React.createElement("span", {className: "brand-logo todo-count"}, React.createElement("strong", null, this.props.count), " ", activeTodoWord, " left"), React.createElement("ul", {className: "filters right hide-on-med-and-down"}, React.createElement("li", {className: cx({ active: this.state.nowShowing == '1' })}, React.createElement("a", {href: "#/", onClick: function (e) { return _this.handleNavClick(e, '1'); }}, "All")), React.createElement("li", {className: cx({ active: this.state.nowShowing == '2' })}, React.createElement("a", {href: "#/active", onClick: function (e) { return _this.handleNavClick(e, '2'); }}, "Active")), React.createElement("li", {className: cx({ active: this.state.nowShowing == '3' })}, React.createElement("a", {href: "#/completed", onClick: function (e) { return _this.handleNavClick(e, '3'); }}, "Completed"))))), clearButton));
                };
                return App;
            }(React.Component));
            exports_2("App", App);
        }
    }
});
//<references path="./shared/Interfaces.ts" />
System.register("index", ['react', 'react-dom', "ui/App"], function(exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var React, ReactDOM, App_1;
    function main() {
        var logger = console;
        logger.log('Test method!');
        ReactDOM.render(React.createElement(App_1.App, {completedCount: 1, firstShowing: "2", count: 1}), document.getElementsByClassName('container')[0]);
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
            function (App_1_1) {
                App_1 = App_1_1;
            }],
        execute: function() {
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGlsZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjaGVhdHNoZWV0LnRzIiwic2hhcmVkL0ludGVyZmFjZXMudHMiLCJzaGFyZWQvVXRpbHMudHMiLCJ1aS9BcHAudHN4IiwiaW5kZXgudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsc0JBQXNCO0FBQ3RCLElBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUNsQixJQUFJLFFBQVEsR0FBWSxJQUFJLENBQUM7QUFDN0IsSUFBSSxRQUFRLEdBQVksRUFBRSxDQUFDO0FBRTNCLDBDQUEwQztBQUMxQyxJQUFJLEtBQUssR0FBUyxjQUFXLENBQUMsQ0FBQztBQVUvQixpQkFBaUI7QUFDakIsOERBQThEO0FBQzlELElBQUksMEJBQTBCLEdBQWtCO0lBQzVDLFNBQVMsRUFBRyxLQUFLO0lBQ2pCLFFBQVEsRUFBRyxLQUFLO0NBQ25CLENBQUE7QUFPRCx5Q0FBeUM7QUFDekMsSUFBSSxTQUFTLEdBQXFCLFVBQVMsTUFBVTtJQUNqRCxNQUFNLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQztBQUMxQixDQUFDLENBQUE7QUFFRCxpRUFBaUU7QUFDakUsSUFBSSxVQUFVLEdBQXVDLEtBQUssQ0FBQztBQUUzRCwyREFBMkQ7QUFDM0QsK0RBQStEO0FBQy9ELHFCQUFxQixNQUE2QztJQUM5RCxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckIsTUFBTSw0QkFBNEIsQ0FBQTtJQUN0QyxDQUFDO0lBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEdBQUcsR0FBRyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUM7QUFDcEQsQ0FBQztBQUVELHVDQUF1QztBQUN2QyxXQUFXLENBQUMsMEJBQTBCLENBQUMsQ0FBQztBQUN4QyxXQUFXLENBQUMsRUFBQyxTQUFTLEVBQUMsRUFBRSxFQUFFLFFBQVEsRUFBQyxFQUFFLEVBQUMsQ0FBQyxDQUFD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QUssQ0FBQyxTQUFTLEdBeUV2QztZQXpFRCxxQkF5RUMsQ0FBQTs7OztBQy9FRCw4Q0FBOEM7Ozs7O0lBWTlDO1FBRUksSUFBSSxNQUFNLEdBQWtCLE9BQU8sQ0FBQztRQUNwQyxNQUFNLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBRTNCLFFBQVEsQ0FBQyxNQUFNLENBQ1gsb0JBQUMsU0FBRyxHQUFDLGNBQWMsRUFBRSxDQUFFLEVBQ2xCLFlBQVksRUFBQyxHQUFHLEVBQ2hCLEtBQUssRUFBRSxDQUFFLEVBQUcsRUFDakIsUUFBUSxDQUFDLHNCQUFzQixDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUNsRCxDQUFDO0lBQ04sQ0FBQztJQVhELHVCQVdDLENBQUE7Ozs7Ozs7Ozs7Ozs7WUFiQSIsInNvdXJjZXNDb250ZW50IjpbIi8vdmFyaWFibGUgZGVjbGFyYXRpb25cclxudmFyIGltcGxpY2l0ID0gJyc7XHJcbnZhciBleHBsaWNpdCA6IHN0cmluZyA9IG51bGw7XHJcbmxldCB1c2luZ0xldCA6IHN0cmluZyA9ICcnO1xyXG5cclxuLy9hbnkgaXMgdXNlZCB0byByZXByZXNlbnQgYW55IHVuc2FmZSB0eXBlXHJcbmxldCBlbXB0eSA6IGFueSA9IGZ1bmN0aW9uKCl7fTtcclxuXHJcbi8vY3JlYXRpbmcgaW50ZXJmYWNlXHJcbmludGVyZmFjZSBJTmFtZWRPYmplY3Qge1xyXG4gICAgZmlyc3ROYW1lOnN0cmluZyxcclxuICAgIGxhc3ROYW1lOnN0cmluZyxcclxuICAgIC8vb3B0aW9uYWwgcHJvcGVydHkgZG9lcyBub3QgbmVlZCB0byBleGlzdFxyXG4gICAgYWdlPzpudW1iZXJcclxufVxyXG5cclxuLy91c2luZyBpbnRlcmZhY2VcclxuLy9pbnRlcmZhY2UgaXMgaW1wbGljaXRseSBpbXBsZW1lbnRlZCBieSBhbnl0aGluZyB0aGF0IG1hdGNoZXNcclxudmFyIG9iamVjdHNJbXBsaWNpdGx5SW1wbGVtZW50IDogSU5hbWVkT2JqZWN0ID0ge1xyXG4gICAgZmlyc3ROYW1lIDogJ0ZvbycsXHJcbiAgICBsYXN0TmFtZSA6ICdCYXInXHJcbn1cclxuXHJcbi8vY3JlYXRpbmcgZnVuY3Rpb24gaW50ZXJmYWNlXHJcbmludGVyZmFjZSBJRmlsdGVyRnVuY3Rpb24ge1xyXG4gICAgKG9iamVjdDphbnkpIDogYm9vbGVhblxyXG59XHJcblxyXG4vL2Z1bmN0aW9uIHRoYXQgY29uZm9ybXMgdG8gdGhlIGludGVyZmFjZVxyXG5sZXQgaXNOb3ROdWxsIDogSUZpbHRlckZ1bmN0aW9uID0gZnVuY3Rpb24ob2JqZWN0OmFueSkge1xyXG4gICAgcmV0dXJuIG9iamVjdCAhPSBudWxsO1xyXG59XHJcblxyXG4vL3dlIGNhbiBmb3JjZSBjYXN0IG9mIGFueXRoaW5nIHRoYXQgZG9lcyBub3QgbWF0Y2ggdGhlIGludGVyZmFjZVxyXG5sZXQgZm9yY2VkQ2FzZSA6IElGaWx0ZXJGdW5jdGlvbiA9IDxJRmlsdGVyRnVuY3Rpb24+IGVtcHR5O1xyXG5cclxuLy9mdW5jdGlvbidzIHBhcmFtZXRlciBjYW4gZGVmaW5lIGV4cGVjdGVkIGludGVyZmFjZSBpbmxpbmVcclxuLy9mdW5jdGlvbiByZWNlaXZlcyBvYmplY3Qgb2YgaW5saW5lIHR5cGUsIGFuZCByZXR1cm5zIGEgc3RyaW5nXHJcbmZ1bmN0aW9uIGdldEZ1bGxOYW1lKG9iamVjdDogeyBmaXJzdE5hbWU6c3RyaW5nLCBsYXN0TmFtZTpzdHJpbmcgfSkgOiBzdHJpbmcge1xyXG4gICAgaWYgKCFpc05vdE51bGwob2JqZWN0KSkge1xyXG4gICAgICAgIHRocm93ICdPYmplY3Qgc2hvdWxkIG5vdCBiZSBudWxsISdcclxuICAgIH1cclxuICAgIHJldHVybiBvYmplY3QuZmlyc3ROYW1lICsgJyAnICsgb2JqZWN0Lmxhc3ROYW1lO1xyXG59XHJcblxyXG4vL2ludGVyZmFjZXMgYXJlIGltcGxpY2l0bHkgaW1wbGVtZW50ZWRcclxuZ2V0RnVsbE5hbWUob2JqZWN0c0ltcGxpY2l0bHlJbXBsZW1lbnQpO1xyXG5nZXRGdWxsTmFtZSh7Zmlyc3ROYW1lOicnLCBsYXN0TmFtZTonJ30pO1xyXG5cclxuLy9pbnRlcmZhY2UgY2FuIHNwZWNpZnkgaG93IGEgY29uc3RydWN0b3Igc2hvdWxkIGxvb2tsaWtlXHJcbmludGVyZmFjZSBJRW5naW5lRmFjdG9yeSB7XHJcbiAgICBuZXcgKGFyZzE6IG51bWJlciwgbmFtZTogc3RyaW5nKTogYW55XHJcbn1cclxuXHJcbi8vY2xhc3MgbG9va3MgbGlrZSB0aGlzXHJcbmNsYXNzIEVsZWN0cmljRW5naW5lIHtcclxuXHJcbiAgICAvL2EgcHJpdmF0ZSBwcm9wZXJ0eVxyXG4gICAgcHJpdmF0ZSBub1dhdHRzOiBudW1iZXI7XHJcbiAgICBjb25zdHJ1Y3Rvcihub1dhdHRzOiBudW1iZXIsIG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMubm9XYXR0cyA9IG5vV2F0dHM7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIEdhc0VuZ2luZSB7XHJcbiAgICAvL3B1YmxpYyBhbmQgcHJpdmF0ZSBrZXl3b3JkIGltbWVkaWF0ZWx5IHNldHMgdGhlIGZpZWxkc1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBub1Bpc3RvbnM6IG51bWJlciwgcHVibGljIG5hbWU6IHN0cmluZykgeyB9XHJcbn1cclxuXHJcbi8vYSBmdW5jdGlvbiBjYW4gcmVjZWl2ZSBpbnRlcmZhY2Ugb2YgYSBjb25zdHJ1Y3RvclxyXG5mdW5jdGlvbiBjcmVhdGVFbmdpbmVzKGZhY3Rvcnk6IElFbmdpbmVGYWN0b3J5KSA6IEFycmF5PGFueT4ge1xyXG4gICAgbGV0IGVuZ2luZXMgOiBBcnJheTxhbnk+ID0gW107XHJcbiAgICAvL2ludGVyZmFjZSBvZiBhIGNvbnN0cnVjdG9yIGlzIHVzZWQgd2l0aCBuZXcgb3BlcmF0b3JcclxuICAgIGVuZ2luZXMucHVzaChuZXcgZmFjdG9yeSgxLCAnZmlyc3QnKSk7XHJcbiAgICBlbmdpbmVzLnB1c2gobmV3IGZhY3RvcnkoMiwgJ3NlY29uZCcpKTtcclxuICAgIHJldHVybiBlbmdpbmVzO1xyXG59XHJcblxyXG4vL2Egc3RhdGljIGNvbnN0cnVjdG9yIGRlZmluaXRpb24gaGFzIHRvIGJlIHBhc3NlZCB0byB0aGUgZnVuY3Rpb25cclxuY3JlYXRlRW5naW5lcyhHYXNFbmdpbmUpO1xyXG5jcmVhdGVFbmdpbmVzKEVsZWN0cmljRW5naW5lKTtcclxuXHJcbihmdW5jdGlvbigpIHtcclxuXHJcblxyXG5cclxuXHJcblxyXG59KSgpOyIsIm5hbWVzcGFjZSBJbnRlcmZhY2VzIHtcclxuXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElBcHBQcm9wcyB7XHJcbiAgICAgICAgY29tcGxldGVkQ291bnQ6IG51bWJlcjtcclxuICAgICAgICBvbkNsZWFyQ29tcGxldGVkPzogYW55O1xyXG4gICAgICAgIGZpcnN0U2hvd2luZzogc3RyaW5nO1xyXG4gICAgICAgIGNvdW50OiBudW1iZXI7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRGVmaW5lcyB0aGUgaW50ZXJmYWNlIG9mIHRoZSBzdHJ1Y3R1cmUgb2YgYSB0YXNrXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElUb2RvIHtcclxuICAgICAgICBpZDogc3RyaW5nLFxyXG4gICAgICAgIHRpdGxlOiBzdHJpbmcsXHJcbiAgICAgICAgY29tcGxldGVkOiBib29sZWFuXHJcbiAgICB9XHJcblxyXG4gICAgLy8gRGVmaW5lcyB0aGUgaW50ZXJmYWNlIG9mIHRoZSBwcm9wZXJ0aWVzIG9mIHRoZSBUb2RvSXRlbSBjb21wb25lbnRcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSVRvZG9JdGVtUHJvcHMge1xyXG4gICAgICAgIGtleTogc3RyaW5nLFxyXG4gICAgICAgIHRvZG86IElUb2RvO1xyXG4gICAgICAgIGVkaXRpbmc/OiBib29sZWFuO1xyXG4gICAgICAgIG9uU2F2ZTogKHZhbDogYW55KSA9PiB2b2lkO1xyXG4gICAgICAgIG9uRGVzdHJveTogKCkgPT4gdm9pZDtcclxuICAgICAgICBvbkVkaXQ6ICgpID0+IHZvaWQ7XHJcbiAgICAgICAgb25DYW5jZWw6IChldmVudDogYW55KSA9PiB2b2lkO1xyXG4gICAgICAgIG9uVG9nZ2xlOiAoKSA9PiB2b2lkO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIERlZmluZXMgdGhlIGludGVyZmFjZSBvZiB0aGUgc3RhdGUgb2YgdGhlIFRvZG9JdGVtIGNvbXBvbmVudFxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJVG9kb0l0ZW1TdGF0ZSB7XHJcbiAgICAgICAgZWRpdFRleHQ6IHN0cmluZ1xyXG4gICAgfVxyXG5cclxuICAgIC8vIERlZmluZXMgdGhlIFRvZG9Nb2RlbCBpbnRlcmZhY2VcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSVRvZG9Nb2RlbCB7XHJcbiAgICAgICAga2V5OiBhbnk7XHJcbiAgICAgICAgdG9kb3M6IEFycmF5PElUb2RvPjtcclxuICAgICAgICBvbkNoYW5nZXM6IEFycmF5PGFueT47XHJcbiAgICAgICAgc3Vic2NyaWJlKG9uQ2hhbmdlKTtcclxuICAgICAgICBpbmZvcm0oKTtcclxuICAgICAgICBhZGRUb2RvKHRpdGxlOiBzdHJpbmcpO1xyXG4gICAgICAgIHRvZ2dsZUFsbChjaGVja2VkKTtcclxuICAgICAgICB0b2dnbGUodG9kb1RvVG9nZ2xlKTtcclxuICAgICAgICBkZXN0cm95KHRvZG8pO1xyXG4gICAgICAgIHNhdmUodG9kb1RvU2F2ZSwgdGV4dCk7XHJcbiAgICAgICAgY2xlYXJDb21wbGV0ZWQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBEZWZpbmVzIHRoZSBpbnRlcmZhY2Ugb2YgdGhlIHN0YXRlIG9mIHRoZSBBcHAgY29tcG9uZW50XHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElBcHBTdGF0ZSB7XHJcbiAgICAgICAgZWRpdGluZz86IHN0cmluZztcclxuICAgICAgICBub3dTaG93aW5nPzogc3RyaW5nXHJcbiAgICB9XHJcbn0iLCJleHBvcnQgY2xhc3MgVXRpbHMge1xyXG5cclxuICAgIC8vIFJlYWN0IGlkaW9tIGZvciBzaG9ydGN1dHRpbmcgdG8gYGNsYXNzU2V0YCBzaW5jZSBpdCdsbCBiZSB1c2VkIG9mdGVuXHJcbiAgICAvL3ZhciBjeCA9IFJlYWN0LmFkZG9ucy5jbGFzc1NldDtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVuZGVyQ2xhc3Mob2JqZWN0OiBhbnkpOiBzdHJpbmcge1xyXG4gICAgICAgIGZvciAodmFyIHByb3AgaW4gb2JqZWN0KSB7XHJcbiAgICAgICAgICAgIGlmIChvYmplY3RbcHJvcF0gPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb3A7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIGdlbmVyYXRlcyBhIG5ldyBVbml2ZXJzYWxseSB1bmlxdWUgaWRlbnRpZnkgKFVVSUQpXHJcbiAgICAvLyB0aGUgVVVJRCBpcyB1c2VkIHRvIGlkZW50aWZ5IGVhY2ggb2YgdGhlIHRhc2tzXHJcbiAgICBwdWJsaWMgc3RhdGljIHV1aWQoKTogc3RyaW5nIHtcclxuICAgICAgICAvKmpzaGludCBiaXR3aXNlOmZhbHNlICovXHJcbiAgICAgICAgdmFyIGksIHJhbmRvbTtcclxuICAgICAgICB2YXIgdXVpZCA9ICcnO1xyXG5cclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgMzI7IGkrKykge1xyXG4gICAgICAgICAgICByYW5kb20gPSBNYXRoLnJhbmRvbSgpICogMTYgfCAwO1xyXG4gICAgICAgICAgICBpZiAoaSA9PT0gOCB8fCBpID09PSAxMiB8fCBpID09PSAxNiB8fCBpID09PSAyMCkge1xyXG4gICAgICAgICAgICAgICAgdXVpZCArPSAnLSc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdXVpZCArPSAoaSA9PT0gMTIgPyA0IDogKGkgPT09IDE2ID8gKHJhbmRvbSAmIDMgfCA4KSA6IHJhbmRvbSkpXHJcbiAgICAgICAgICAgICAgICAudG9TdHJpbmcoMTYpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHV1aWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gYWRkcyAncycgdG8gdGhlIGVuZCBvZiBhIGdpdmVuIHdvcmxkIHdoZW4gY291bnQgPiAxXHJcbiAgICBwdWJsaWMgc3RhdGljIHBsdXJhbGl6ZShjb3VudCwgd29yZCkge1xyXG4gICAgICAgIHJldHVybiBjb3VudCA9PT0gMSA/IHdvcmQgOiB3b3JkICsgJ3MnO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHN0b3JlcyBkYXRhIHVzaW5nIHRoZSBsb2NhbFN0b3JhZ2UgQVBJXHJcbiAgICBwdWJsaWMgc3RhdGljIHN0b3JlKG5hbWVzcGFjZSwgZGF0YT8pIHtcclxuICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbG9jYWxTdG9yYWdlLnNldEl0ZW0obmFtZXNwYWNlLCBKU09OLnN0cmluZ2lmeShkYXRhKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgc3RvcmUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShuYW1lc3BhY2UpO1xyXG4gICAgICAgIHJldHVybiAoc3RvcmUgJiYgSlNPTi5wYXJzZShzdG9yZSkpIHx8IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGp1c3QgYSBoZWxwZXIgZm9yIGluaGVyaXRhbmNlXHJcbiAgICBwdWJsaWMgc3RhdGljIGV4dGVuZCguLi5vYmpzOiBhbnlbXSk6IGFueSB7XHJcbiAgICAgICAgdmFyIG5ld09iaiA9IHt9O1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb2Jqcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgb2JqID0gb2Jqc1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIG9iaikge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3T2JqW2tleV0gPSBvYmpba2V5XTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV3T2JqO1xyXG4gICAgfVxyXG59IiwiLy88cmVmZXJlbmNlIHBhdGg9XCIuLi9zaGFyZWQvSW50ZXJmYWNlcy50c1wiIC8+XHJcblxyXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCdcclxuXHJcbmltcG9ydCB7IFV0aWxzIH0gZnJvbSAnLi4vc2hhcmVkL1V0aWxzJ1xyXG5cclxuZXhwb3J0IGNsYXNzIEFwcCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxJbnRlcmZhY2VzLklBcHBQcm9wcywgeyBub3dTaG93aW5nOiBzdHJpbmcgfT4ge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByb3BzOiBJbnRlcmZhY2VzLklBcHBQcm9wcywgY29udGV4dDogYW55KSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMsIGNvbnRleHQpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIG5vd1Nob3dpbmc6IHRoaXMucHJvcHMuZmlyc3RTaG93aW5nXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGhhbmRsZU5hdkNsaWNrKGV2ZW50OiBSZWFjdC5Nb3VzZUV2ZW50LCBub3dTaG93aW5nOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKChwcmV2LCBwcm9wcykgPT4ge1xyXG4gICAgICAgICAgICBpZiAocHJldi5ub3dTaG93aW5nID09PSBub3dTaG93aW5nKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHByZXY7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbm93U2hvd2luZzogbm93U2hvd2luZ1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVuZGVyKCkge1xyXG5cclxuICAgICAgICB2YXIgYWN0aXZlVG9kb1dvcmQgPSBVdGlscy5wbHVyYWxpemUodGhpcy5wcm9wcy5jb3VudCwgJ2l0ZW0nKTtcclxuICAgICAgICB2YXIgY2xlYXJCdXR0b24gPSBudWxsO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5wcm9wcy5jb21wbGV0ZWRDb3VudCA+IDApIHtcclxuICAgICAgICAgICAgY2xlYXJCdXR0b24gPSAoXHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwid2F2ZXMtZWZmZWN0IHdhdmVzLWxpZ2h0IGJ0bi1sYXJnZSBjbGVhci1jb21wbGV0ZWRcIlxyXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMucHJvcHMub25DbGVhckNvbXBsZXRlZH0+XHJcbiAgICAgICAgICAgICAgICAgICAgQ2xlYXIgY29tcGxldGVkXHJcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBjeCA9IFV0aWxzLnJlbmRlckNsYXNzO1xyXG4gICAgICAgIGxldCBzdGF0ZSA9IHRoaXMuc3RhdGU7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgIDxuYXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJuYXYtd3JhcHBlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJicmFuZC1sb2dvIHRvZG8tY291bnRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzdHJvbmc+e3RoaXMucHJvcHMuY291bnR9PC9zdHJvbmc+IHthY3RpdmVUb2RvV29yZH0gbGVmdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJmaWx0ZXJzIHJpZ2h0IGhpZGUtb24tbWVkLWFuZC1kb3duXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPXtjeCh7IGFjdGl2ZTogdGhpcy5zdGF0ZS5ub3dTaG93aW5nID09ICcxJyB9KSB9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhyZWY9XCIjL1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2UgPT4gdGhpcy5oYW5kbGVOYXZDbGljayhlLCAnMScpIH0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFsbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPXtjeCh7IGFjdGl2ZTogdGhpcy5zdGF0ZS5ub3dTaG93aW5nID09ICcyJyB9KSB9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhyZWY9XCIjL2FjdGl2ZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2UgPT4gdGhpcy5oYW5kbGVOYXZDbGljayhlLCAnMicpIH0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFjdGl2ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPXtjeCh7IGFjdGl2ZTogdGhpcy5zdGF0ZS5ub3dTaG93aW5nID09ICczJyB9KSB9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhyZWY9XCIjL2NvbXBsZXRlZFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2UgPT4gdGhpcy5oYW5kbGVOYXZDbGljayhlLCAnMycpIH0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIENvbXBsZXRlZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L25hdj5cclxuICAgICAgICAgICAgICAgIHtjbGVhckJ1dHRvbn1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufSIsIi8vPHJlZmVyZW5jZXMgcGF0aD1cIi4vc2hhcmVkL0ludGVyZmFjZXMudHNcIiAvPlxyXG5cclxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnXHJcbmltcG9ydCAqIGFzIFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSdcclxuaW1wb3J0IHsgQXBwIH0gZnJvbSAnLi91aS9BcHAnXHJcblxyXG5uYW1lc3BhY2UgdXRpbHMge1xyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJTG9nZ2VyIHtcclxuICAgICAgICBsb2cobWVzc2FnZTogc3RyaW5nKTogdm9pZDtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG1haW4oKTogdm9pZCB7XHJcblxyXG4gICAgbGV0IGxvZ2dlcjogdXRpbHMuSUxvZ2dlciA9IGNvbnNvbGU7XHJcbiAgICBsb2dnZXIubG9nKCdUZXN0IG1ldGhvZCEnKTtcclxuXHJcbiAgICBSZWFjdERPTS5yZW5kZXIoXHJcbiAgICAgICAgPEFwcCBjb21wbGV0ZWRDb3VudD17MX1cclxuICAgICAgICAgICAgIGZpcnN0U2hvd2luZz1cIjJcIlxyXG4gICAgICAgICAgICAgY291bnQ9ezF9IC8+LFxyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2NvbnRhaW5lcicpWzBdXHJcbiAgICApO1xyXG59Il19