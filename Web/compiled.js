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
        ReactDOM.render(React.createElement(Footer_1.Footer, {model: model}), document.getElementsByClassName('app-container')[0]);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGlsZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjaGVhdHNoZWV0LnRzIiwic2hhcmVkL0ludGVyZmFjZXMudHMiLCJzaGFyZWQvVXRpbHMudHMiLCJ1aS9Gb290ZXIudHN4IiwiaW5kZXgudHN4IiwidWkvTWFpbi50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxzQkFBc0I7QUFDdEIsSUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFDO0FBQ2xCLElBQUksUUFBUSxHQUFZLElBQUksQ0FBQztBQUM3QixJQUFJLFFBQVEsR0FBWSxFQUFFLENBQUM7QUFFM0IsMENBQTBDO0FBQzFDLElBQUksS0FBSyxHQUFTLGNBQVcsQ0FBQyxDQUFDO0FBVS9CLGlCQUFpQjtBQUNqQiw4REFBOEQ7QUFDOUQsSUFBSSwwQkFBMEIsR0FBa0I7SUFDNUMsU0FBUyxFQUFHLEtBQUs7SUFDakIsUUFBUSxFQUFHLEtBQUs7Q0FDbkIsQ0FBQTtBQU9ELHlDQUF5QztBQUN6QyxJQUFJLFNBQVMsR0FBcUIsVUFBUyxNQUFVO0lBQ2pELE1BQU0sQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDO0FBQzFCLENBQUMsQ0FBQTtBQUVELGlFQUFpRTtBQUNqRSxJQUFJLFVBQVUsR0FBdUMsS0FBSyxDQUFDO0FBRTNELDJEQUEyRDtBQUMzRCwrREFBK0Q7QUFDL0QscUJBQXFCLE1BQTZDO0lBQzlELEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyQixNQUFNLDRCQUE0QixDQUFBO0lBQ3RDLENBQUM7SUFDRCxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsR0FBRyxHQUFHLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQztBQUNwRCxDQUFDO0FBRUQsdUNBQXVDO0FBQ3ZDLFdBQVcsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO0FBQ3hDLFdBQVcsQ0FBQyxFQUFDLFNBQVMsRUFBQyxFQUFFLEVBQUUsUUFBUSxFQUFDLEVB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QVMsRUFBRSxFQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsVUFBVSxJQUFJLEdBQUcsRUFBRSxDQUFHLGVBRWhELENBQ0gsQ0FDSixFQUNKLFdBQVksQ0FDUixDQUNaLENBQUM7Z0JBQ04sQ0FBQztnQkFDTCxhQUFDO1lBQUQsQ0FBQyxBQTlERCxDQUE0QixLQUFLLENBQUMsU0FBUyxHQThEMUM7WUE5REQsMkJBOERDLENBQUE7Ozs7QUNwRUQsOENBQThDOzs7OztJQVk5QztRQUVJLElBQUksTUFBTSxHQUFrQixPQUFPLENBQUM7UUFDcEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUUzQixJQUFJLEtBQUssR0FBNEIsRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLGNBQWMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxnQkFBZ0IsRUFBRSxJQUFJLEVBQUUsQ0FBQztRQUU5RyxRQUFRLENBQUMsTUFBTSxDQUNYLG9CQUFDLGVBQU0sR0FBQyxLQUFLLEVBQUUsS0FBTSxFQUFFLEVBQ3ZCLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FDdEQsQ0FBQztJQUNOLENBQUM7SUFYRCx1QkFXQyxDQUFBOzs7Ozs7Ozs7Ozs7O1lBYkE7OztBQ1ZELDhDQUE4QyIsInNvdXJjZXNDb250ZW50IjpbIi8vdmFyaWFibGUgZGVjbGFyYXRpb25cclxudmFyIGltcGxpY2l0ID0gJyc7XHJcbnZhciBleHBsaWNpdCA6IHN0cmluZyA9IG51bGw7XHJcbmxldCB1c2luZ0xldCA6IHN0cmluZyA9ICcnO1xyXG5cclxuLy9hbnkgaXMgdXNlZCB0byByZXByZXNlbnQgYW55IHVuc2FmZSB0eXBlXHJcbmxldCBlbXB0eSA6IGFueSA9IGZ1bmN0aW9uKCl7fTtcclxuXHJcbi8vY3JlYXRpbmcgaW50ZXJmYWNlXHJcbmludGVyZmFjZSBJTmFtZWRPYmplY3Qge1xyXG4gICAgZmlyc3ROYW1lOnN0cmluZyxcclxuICAgIGxhc3ROYW1lOnN0cmluZyxcclxuICAgIC8vb3B0aW9uYWwgcHJvcGVydHkgZG9lcyBub3QgbmVlZCB0byBleGlzdFxyXG4gICAgYWdlPzpudW1iZXJcclxufVxyXG5cclxuLy91c2luZyBpbnRlcmZhY2VcclxuLy9pbnRlcmZhY2UgaXMgaW1wbGljaXRseSBpbXBsZW1lbnRlZCBieSBhbnl0aGluZyB0aGF0IG1hdGNoZXNcclxudmFyIG9iamVjdHNJbXBsaWNpdGx5SW1wbGVtZW50IDogSU5hbWVkT2JqZWN0ID0ge1xyXG4gICAgZmlyc3ROYW1lIDogJ0ZvbycsXHJcbiAgICBsYXN0TmFtZSA6ICdCYXInXHJcbn1cclxuXHJcbi8vY3JlYXRpbmcgZnVuY3Rpb24gaW50ZXJmYWNlXHJcbmludGVyZmFjZSBJRmlsdGVyRnVuY3Rpb24ge1xyXG4gICAgKG9iamVjdDphbnkpIDogYm9vbGVhblxyXG59XHJcblxyXG4vL2Z1bmN0aW9uIHRoYXQgY29uZm9ybXMgdG8gdGhlIGludGVyZmFjZVxyXG5sZXQgaXNOb3ROdWxsIDogSUZpbHRlckZ1bmN0aW9uID0gZnVuY3Rpb24ob2JqZWN0OmFueSkge1xyXG4gICAgcmV0dXJuIG9iamVjdCAhPSBudWxsO1xyXG59XHJcblxyXG4vL3dlIGNhbiBmb3JjZSBjYXN0IG9mIGFueXRoaW5nIHRoYXQgZG9lcyBub3QgbWF0Y2ggdGhlIGludGVyZmFjZVxyXG5sZXQgZm9yY2VkQ2FzZSA6IElGaWx0ZXJGdW5jdGlvbiA9IDxJRmlsdGVyRnVuY3Rpb24+IGVtcHR5O1xyXG5cclxuLy9mdW5jdGlvbidzIHBhcmFtZXRlciBjYW4gZGVmaW5lIGV4cGVjdGVkIGludGVyZmFjZSBpbmxpbmVcclxuLy9mdW5jdGlvbiByZWNlaXZlcyBvYmplY3Qgb2YgaW5saW5lIHR5cGUsIGFuZCByZXR1cm5zIGEgc3RyaW5nXHJcbmZ1bmN0aW9uIGdldEZ1bGxOYW1lKG9iamVjdDogeyBmaXJzdE5hbWU6c3RyaW5nLCBsYXN0TmFtZTpzdHJpbmcgfSkgOiBzdHJpbmcge1xyXG4gICAgaWYgKCFpc05vdE51bGwob2JqZWN0KSkge1xyXG4gICAgICAgIHRocm93ICdPYmplY3Qgc2hvdWxkIG5vdCBiZSBudWxsISdcclxuICAgIH1cclxuICAgIHJldHVybiBvYmplY3QuZmlyc3ROYW1lICsgJyAnICsgb2JqZWN0Lmxhc3ROYW1lO1xyXG59XHJcblxyXG4vL2ludGVyZmFjZXMgYXJlIGltcGxpY2l0bHkgaW1wbGVtZW50ZWRcclxuZ2V0RnVsbE5hbWUob2JqZWN0c0ltcGxpY2l0bHlJbXBsZW1lbnQpO1xyXG5nZXRGdWxsTmFtZSh7Zmlyc3ROYW1lOicnLCBsYXN0TmFtZTonJ30pO1xyXG5cclxuLy9pbnRlcmZhY2UgY2FuIHNwZWNpZnkgaG93IGEgY29uc3RydWN0b3Igc2hvdWxkIGxvb2tsaWtlXHJcbmludGVyZmFjZSBJRW5naW5lRmFjdG9yeSB7XHJcbiAgICBuZXcgKGFyZzE6IG51bWJlciwgbmFtZTogc3RyaW5nKTogYW55XHJcbn1cclxuXHJcbi8vY2xhc3MgbG9va3MgbGlrZSB0aGlzXHJcbmNsYXNzIEVsZWN0cmljRW5naW5lIHtcclxuXHJcbiAgICAvL2EgcHJpdmF0ZSBwcm9wZXJ0eVxyXG4gICAgcHJpdmF0ZSBub1dhdHRzOiBudW1iZXI7XHJcbiAgICBjb25zdHJ1Y3Rvcihub1dhdHRzOiBudW1iZXIsIG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMubm9XYXR0cyA9IG5vV2F0dHM7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIEdhc0VuZ2luZSB7XHJcbiAgICAvL3B1YmxpYyBhbmQgcHJpdmF0ZSBrZXl3b3JkIGltbWVkaWF0ZWx5IHNldHMgdGhlIGZpZWxkc1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBub1Bpc3RvbnM6IG51bWJlciwgcHVibGljIG5hbWU6IHN0cmluZykgeyB9XHJcbn1cclxuXHJcbi8vYSBmdW5jdGlvbiBjYW4gcmVjZWl2ZSBpbnRlcmZhY2Ugb2YgYSBjb25zdHJ1Y3RvclxyXG5mdW5jdGlvbiBjcmVhdGVFbmdpbmVzKGZhY3Rvcnk6IElFbmdpbmVGYWN0b3J5KSA6IEFycmF5PGFueT4ge1xyXG4gICAgbGV0IGVuZ2luZXMgOiBBcnJheTxhbnk+ID0gW107XHJcbiAgICAvL2ludGVyZmFjZSBvZiBhIGNvbnN0cnVjdG9yIGlzIHVzZWQgd2l0aCBuZXcgb3BlcmF0b3JcclxuICAgIGVuZ2luZXMucHVzaChuZXcgZmFjdG9yeSgxLCAnZmlyc3QnKSk7XHJcbiAgICBlbmdpbmVzLnB1c2gobmV3IGZhY3RvcnkoMiwgJ3NlY29uZCcpKTtcclxuICAgIHJldHVybiBlbmdpbmVzO1xyXG59XHJcblxyXG4vL2Egc3RhdGljIGNvbnN0cnVjdG9yIGRlZmluaXRpb24gaGFzIHRvIGJlIHBhc3NlZCB0byB0aGUgZnVuY3Rpb25cclxuY3JlYXRlRW5naW5lcyhHYXNFbmdpbmUpO1xyXG5jcmVhdGVFbmdpbmVzKEVsZWN0cmljRW5naW5lKTtcclxuXHJcbihmdW5jdGlvbigpIHtcclxuXHJcblxyXG5cclxuXHJcblxyXG59KSgpOyIsIm5hbWVzcGFjZSBJbnRlcmZhY2VzIHtcclxuXHJcbiAgICAvLyBEZWZpbmVzIHRoZSBpbnRlcmZhY2Ugb2YgdGhlIHN0cnVjdHVyZSBvZiBhIHRhc2tcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSVRvZG8ge1xyXG4gICAgICAgIGlkOiBzdHJpbmcsXHJcbiAgICAgICAgdGl0bGU6IHN0cmluZyxcclxuICAgICAgICBjb21wbGV0ZWQ6IGJvb2xlYW5cclxuICAgIH1cclxuXHJcbiAgICAvLyBEZWZpbmVzIHRoZSBpbnRlcmZhY2Ugb2YgdGhlIHByb3BlcnRpZXMgb2YgdGhlIFRvZG9JdGVtIGNvbXBvbmVudFxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJVG9kb0l0ZW1Qcm9wcyB7XHJcbiAgICAgICAga2V5OiBzdHJpbmcsXHJcbiAgICAgICAgdG9kbzogSVRvZG87XHJcbiAgICAgICAgZWRpdGluZz86IGJvb2xlYW47XHJcbiAgICAgICAgb25TYXZlOiAodmFsOiBhbnkpID0+IHZvaWQ7XHJcbiAgICAgICAgb25EZXN0cm95OiAoKSA9PiB2b2lkO1xyXG4gICAgICAgIG9uRWRpdDogKCkgPT4gdm9pZDtcclxuICAgICAgICBvbkNhbmNlbDogKGV2ZW50OiBhbnkpID0+IHZvaWQ7XHJcbiAgICAgICAgb25Ub2dnbGU6ICgpID0+IHZvaWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRGVmaW5lcyB0aGUgaW50ZXJmYWNlIG9mIHRoZSBzdGF0ZSBvZiB0aGUgVG9kb0l0ZW0gY29tcG9uZW50XHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElUb2RvSXRlbVN0YXRlIHtcclxuICAgICAgICBlZGl0VGV4dDogc3RyaW5nXHJcbiAgICB9XHJcblxyXG4gICAgLy8gRGVmaW5lcyB0aGUgaW50ZXJmYWNlIG9mIHRoZSBwcm9wZXJ0aWVzIG9mIHRoZSBGb290ZXIgY29tcG9uZW50XHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElGb290ZXJQcm9wcyB7XHJcbiAgICAgICAgY29tcGxldGVkQ291bnQ6IG51bWJlcjtcclxuICAgICAgICBvbkNsZWFyQ29tcGxldGVkOiBhbnk7XHJcbiAgICAgICAgbm93U2hvd2luZzogc3RyaW5nO1xyXG4gICAgICAgIGNvdW50OiBudW1iZXI7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRGVmaW5lcyB0aGUgVG9kb01vZGVsIGludGVyZmFjZVxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJVG9kb01vZGVsIHtcclxuICAgICAgICBrZXk6IGFueTtcclxuICAgICAgICB0b2RvczogQXJyYXk8SVRvZG8+O1xyXG4gICAgICAgIG9uQ2hhbmdlczogQXJyYXk8YW55PjtcclxuICAgICAgICBzdWJzY3JpYmUob25DaGFuZ2UpO1xyXG4gICAgICAgIGluZm9ybSgpO1xyXG4gICAgICAgIGFkZFRvZG8odGl0bGU6IHN0cmluZyk7XHJcbiAgICAgICAgdG9nZ2xlQWxsKGNoZWNrZWQpO1xyXG4gICAgICAgIHRvZ2dsZSh0b2RvVG9Ub2dnbGUpO1xyXG4gICAgICAgIGRlc3Ryb3kodG9kbyk7XHJcbiAgICAgICAgc2F2ZSh0b2RvVG9TYXZlLCB0ZXh0KTtcclxuICAgICAgICBjbGVhckNvbXBsZXRlZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIERlZmluZXMgdGhlIGludGVyZmFjZSBvZiB0aGUgcHJvcGVydGllcyBvZiB0aGUgQXBwIGNvbXBvbmVudFxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJQXBwUHJvcHMge1xyXG4gICAgICAgIG1vZGVsOiBJVG9kb01vZGVsO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIERlZmluZXMgdGhlIGludGVyZmFjZSBvZiB0aGUgc3RhdGUgb2YgdGhlIEFwcCBjb21wb25lbnRcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSUFwcFN0YXRlIHtcclxuICAgICAgICBlZGl0aW5nPzogc3RyaW5nO1xyXG4gICAgICAgIG5vd1Nob3dpbmc/OiBzdHJpbmdcclxuICAgIH1cclxufSIsImV4cG9ydCBjbGFzcyBVdGlscyB7XHJcblxyXG4gICAgLy8gZ2VuZXJhdGVzIGEgbmV3IFVuaXZlcnNhbGx5IHVuaXF1ZSBpZGVudGlmeSAoVVVJRClcclxuICAgIC8vIHRoZSBVVUlEIGlzIHVzZWQgdG8gaWRlbnRpZnkgZWFjaCBvZiB0aGUgdGFza3NcclxuICAgIHB1YmxpYyBzdGF0aWMgdXVpZCgpOiBzdHJpbmcge1xyXG4gICAgICAgIC8qanNoaW50IGJpdHdpc2U6ZmFsc2UgKi9cclxuICAgICAgICB2YXIgaSwgcmFuZG9tO1xyXG4gICAgICAgIHZhciB1dWlkID0gJyc7XHJcblxyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCAzMjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHJhbmRvbSA9IE1hdGgucmFuZG9tKCkgKiAxNiB8IDA7XHJcbiAgICAgICAgICAgIGlmIChpID09PSA4IHx8IGkgPT09IDEyIHx8IGkgPT09IDE2IHx8IGkgPT09IDIwKSB7XHJcbiAgICAgICAgICAgICAgICB1dWlkICs9ICctJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB1dWlkICs9IChpID09PSAxMiA/IDQgOiAoaSA9PT0gMTYgPyAocmFuZG9tICYgMyB8IDgpIDogcmFuZG9tKSlcclxuICAgICAgICAgICAgICAgIC50b1N0cmluZygxNik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdXVpZDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBhZGRzICdzJyB0byB0aGUgZW5kIG9mIGEgZ2l2ZW4gd29ybGQgd2hlbiBjb3VudCA+IDFcclxuICAgIHB1YmxpYyBzdGF0aWMgcGx1cmFsaXplKGNvdW50LCB3b3JkKSB7XHJcbiAgICAgICAgcmV0dXJuIGNvdW50ID09PSAxID8gd29yZCA6IHdvcmQgKyAncyc7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gc3RvcmVzIGRhdGEgdXNpbmcgdGhlIGxvY2FsU3RvcmFnZSBBUElcclxuICAgIHB1YmxpYyBzdGF0aWMgc3RvcmUobmFtZXNwYWNlLCBkYXRhPykge1xyXG4gICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShuYW1lc3BhY2UsIEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBzdG9yZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKG5hbWVzcGFjZSk7XHJcbiAgICAgICAgcmV0dXJuIChzdG9yZSAmJiBKU09OLnBhcnNlKHN0b3JlKSkgfHwgW107XHJcbiAgICB9XHJcblxyXG4gICAgLy8ganVzdCBhIGhlbHBlciBmb3IgaW5oZXJpdGFuY2VcclxuICAgIHB1YmxpYyBzdGF0aWMgZXh0ZW5kKC4uLm9ianM6IGFueVtdKTogYW55IHtcclxuICAgICAgICB2YXIgbmV3T2JqID0ge307XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvYmpzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBvYmogPSBvYmpzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXdPYmpba2V5XSA9IG9ialtrZXldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXdPYmo7XHJcbiAgICB9XHJcbn0iLCIvLzxyZWZlcmVuY2UgcGF0aD1cIi4uL3NoYXJlZC9JbnRlcmZhY2VzLnRzXCIgLz5cclxuXHJcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0J1xyXG5cclxuaW1wb3J0IHsgVXRpbHMgfSBmcm9tICcuLi9zaGFyZWQvVXRpbHMnXHJcblxyXG5leHBvcnQgY2xhc3MgRm9vdGVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PEludGVyZmFjZXMuSUZvb3RlclByb3BzLCB7fT4ge1xyXG5cclxuICAgIHB1YmxpYyByZW5kZXIoKSB7XHJcblxyXG4gICAgICAgIHZhciBhY3RpdmVUb2RvV29yZCA9IFV0aWxzLnBsdXJhbGl6ZSh0aGlzLnByb3BzLmNvdW50LCAnaXRlbScpO1xyXG4gICAgICAgIHZhciBjbGVhckJ1dHRvbiA9IG51bGw7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmNvbXBsZXRlZENvdW50ID4gMCkge1xyXG4gICAgICAgICAgICBjbGVhckJ1dHRvbiA9IChcclxuICAgICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJjbGVhci1jb21wbGV0ZWRcIlxyXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMucHJvcHMub25DbGVhckNvbXBsZXRlZH0+XHJcbiAgICAgICAgICAgICAgICAgICAgQ2xlYXIgY29tcGxldGVkXHJcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFJlYWN0IGlkaW9tIGZvciBzaG9ydGN1dHRpbmcgdG8gYGNsYXNzU2V0YCBzaW5jZSBpdCdsbCBiZSB1c2VkIG9mdGVuXHJcbiAgICAgICAgLy92YXIgY3ggPSBSZWFjdC5hZGRvbnMuY2xhc3NTZXQ7XHJcbiAgICAgICAgdmFyIGN4ID0gZnVuY3Rpb24ob2JqZWN0OmFueSkge1xyXG4gICAgICAgICAgICBmb3IodmFyIHByb3AgaW4gb2JqZWN0KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqZWN0W3Byb3BdID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJvcDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHZhciBub3dTaG93aW5nOnN0cmluZyA9IHRoaXMucHJvcHMubm93U2hvd2luZztcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8Zm9vdGVyIGNsYXNzTmFtZT1cImZvb3RlclwiPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidG9kby1jb3VudFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzdHJvbmc+e3RoaXMucHJvcHMuY291bnR9PC9zdHJvbmc+IHthY3RpdmVUb2RvV29yZH0gbGVmdFxyXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cImZpbHRlcnNcIj5cclxuICAgICAgICAgICAgICAgICAgICA8bGk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBocmVmPVwiIy9cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7IHNlbGVjdGVkOiBub3dTaG93aW5nID09ICcxJyB9KSB9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQWxsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICAgICAgICAgIHsnICd9XHJcbiAgICAgICAgICAgICAgICAgICAgPGxpPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaHJlZj1cIiMvYWN0aXZlXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goeyBzZWxlY3RlZDogbm93U2hvd2luZyA9PSAnMicgfSkgfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFjdGl2ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgICAgICAgICB7JyAnfVxyXG4gICAgICAgICAgICAgICAgICAgIDxsaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhyZWY9XCIjL2NvbXBsZXRlZFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHsgc2VsZWN0ZWQ6IG5vd1Nob3dpbmcgPT0gJzMnIH0pIH0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb21wbGV0ZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICAgICAgICAge2NsZWFyQnV0dG9ufVxyXG4gICAgICAgICAgICA8L2Zvb3Rlcj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59IiwiLy88cmVmZXJlbmNlcyBwYXRoPVwiLi9zaGFyZWQvSW50ZXJmYWNlcy50c1wiIC8+XHJcblxyXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCdcclxuaW1wb3J0ICogYXMgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJ1xyXG5pbXBvcnQgeyBGb290ZXIgfSBmcm9tICcuL3VpL0Zvb3RlcidcclxuXHJcbm5hbWVzcGFjZSB1dGlscyB7XHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElMb2dnZXIge1xyXG4gICAgICAgIGxvZyhtZXNzYWdlOiBzdHJpbmcpOiB2b2lkO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbWFpbigpOiB2b2lkIHtcclxuXHJcbiAgICBsZXQgbG9nZ2VyOiB1dGlscy5JTG9nZ2VyID0gY29uc29sZTtcclxuICAgIGxvZ2dlci5sb2coJ1Rlc3QgbWV0aG9kIScpO1xyXG5cclxuICAgIGxldCBtb2RlbDogSW50ZXJmYWNlcy5JRm9vdGVyUHJvcHMgPSB7IG5vd1Nob3dpbmc6ICcxJywgY29tcGxldGVkQ291bnQ6IDAsIGNvdW50OiAwLCBvbkNsZWFyQ29tcGxldGVkOiBudWxsIH07XHJcblxyXG4gICAgUmVhY3RET00ucmVuZGVyKFxyXG4gICAgICAgIDxGb290ZXIgbW9kZWw9e21vZGVsfS8+LFxyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FwcC1jb250YWluZXInKVswXVxyXG4gICAgKTtcclxufSIsIi8vPHJlZmVyZW5jZSBwYXRoPVwiLi4vc2hhcmVkL0ludGVyZmFjZXMudHNcIiAvPlxyXG5cclxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnXHJcbmltcG9ydCB7IFV0aWxzIH0gZnJvbSAnLi4vc2hhcmVkL1V0aWxzJyJdfQ==