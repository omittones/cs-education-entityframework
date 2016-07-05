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
                function App() {
                    _super.apply(this, arguments);
                }
                App.prototype.handleNavClick = function (button) {
                    this.setState(function (prev, props) {
                        debugger;
                        return prev;
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
                    var nowShowing = this.props.nowShowing;
                    return (React.createElement("div", null, React.createElement("nav", null, React.createElement("div", {className: "nav-wrapper"}, React.createElement("span", {className: "brand-logo todo-count"}, React.createElement("strong", null, this.props.count), " ", activeTodoWord, " left"), React.createElement("ul", {className: "filters right hide-on-med-and-down"}, React.createElement("li", null, React.createElement("a", {href: "#/", className: cx({ active: nowShowing == '1' }), onClick: function (e) { return _this.handleNavClick('1'); }}, "All")), React.createElement("li", null, React.createElement("a", {href: "#/active", className: cx({ active: nowShowing == '2' }), onClick: function (e) { return _this.handleNavClick('2'); }}, "Active")), React.createElement("li", null, React.createElement("a", {href: "#/completed", className: cx({ active: nowShowing == '3' }), onClick: function (e) { return _this.handleNavClick('3'); }}, "Completed"))))), clearButton));
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
        var model = { nowShowing: '1', completedCount: 0, count: 0, onClearCompleted: null };
        ReactDOM.render(React.createElement(App_1.App, {completedCount: 1, nowShowing: "2", count: 1}), document.getElementsByClassName('container')[0]);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGlsZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjaGVhdHNoZWV0LnRzIiwic2hhcmVkL0ludGVyZmFjZXMudHMiLCJzaGFyZWQvVXRpbHMudHMiLCJ1aS9BcHAudHN4IiwiaW5kZXgudHN4IiwidWkvTWFpbi50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxzQkFBc0I7QUFDdEIsSUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFDO0FBQ2xCLElBQUksUUFBUSxHQUFZLElBQUksQ0FBQztBQUM3QixJQUFJLFFBQVEsR0FBWSxFQUFFLENBQUM7QUFFM0IsMENBQTBDO0FBQzFDLElBQUksS0FBSyxHQUFTLGNBQVcsQ0FBQyxDQUFDO0FBVS9CLGlCQUFpQjtBQUNqQiw4REFBOEQ7QUFDOUQsSUFBSSwwQkFBMEIsR0FBa0I7SUFDNUMsU0FBUyxFQUFHLEtBQUs7SUFDakIsUUFBUSxFQUFHLEtBQUs7Q0FDbkIsQ0FBQTtBQU9ELHlDQUF5QztBQUN6QyxJQUFJLFNBQVMsR0FBcUIsVUFBUyxNQUFVO0lBQ2pELE1BQU0sQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDO0FBQzFCLENBQUMsQ0FBQTtBQUVELGlFQUFpRTtBQUNqRSxJQUFJLFVBQVUsR0FBdUMsS0FBSyxDQUFDO0FBRTNELDJEQUEyRDtBQUMzRCwrREFBK0Q7QUFDL0QscUJBQXFCLE1BQTZDO0lBQzlELEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyQixNQUFNLDRCQUE0QixDQUFBO0lBQ3RDLENBQUM7SUFDRCxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsR0FBRyxHQUFHLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQztBQUNwRCxDQUFDO0FBRUQsdUNBQXVDO0FBQ3ZDLFdBQVcsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO0FBQ3hDLFdBQVcsQ0FBQyxFQUFDLFNBQVMsRUFBQyxFQUFFLEVBQUUsUUFBUSxFQUFDLEVBQUUsRUFBQyxDQUFDLENBQUM7QUFPekMsdUJBQXVCO0FBQ3ZCO0lBSUksd0JBQVksT0FBZSxFQUFFLElBQVk7UUFDckMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDM0IsQ0FBQztJQUNMLHFCQUFDO0FBQUQsQ0FBQyxBQVBELElBT0M7QUFFRDtJQUNJLHdEQUF3RDtJQUN4RCxtQkFBb0IsU0FBaUIsRUFBUyxJQUFZO1FBQXRDLGNBQVMsR0FBVCxTQUFTLENBQVE7UUFBUyxTQUFJLEdBQUosSUFBSSxDQUFRO0lBQUksQ0FBQztJQUNuRSxnQkFBQztBQUFELENBQUMsQUFIRCxJQUdDO0FBRUQsbURBQW1EO0FBQ25ELHVCQUF1QixPQUF1QjtJQUMxQyxJQUFJLE9BQU8sR0FBZ0IsRUFBRSxDQUFDO0lBQzlCLHNEQUFzRDtJQUN0RCxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksT0FBTyxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQ3RDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxPQUFPLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFDdkMsTUFBTSxDQUFDLE9BQU8sQ0FBQztBQUNuQixDQUFDO0FBRUQsa0VBQWtFO0FBQ2xFLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUN6QixhQUFhLENBQUMsY0FBYyxDQUFDLENBQUM7QUFFOUIsQ0FBQztBQU1ELENBQUMsQ0FBQyxFQUFFLENBQUM7QUNuQ0o7Ozs7Ozs7WUNyREQ7Z0JBQUE7Z0JBMkRBLENBQUM7Z0JBekRHLHVFQUF1RTtnQkFDdkUsaUNBQWlDO2dCQUNuQixpQkFBVyxHQUF6QixVQUEwQixNQUFXO29CQUNqQyxHQUFHLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDO3dCQUN0QixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQzs0QkFDdkIsTUFBTSxDQUFDLElBQUksQ0FBQzt3QkFDaEIsQ0FBQztvQkFDTCxDQUFDO2dCQUNMLENBQUM7O2dCQUVELHFEQUFxRDtnQkFDckQsaURBQWlEO2dCQUNuQyxVQUFJLEdBQWxCO29CQUNJLHlCQUF5QjtvQkFDekIsSUFBSSxDQUFDLEVBQUUsTUFBTSxDQUFDO29CQUNkLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQztvQkFFZCxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQzt3QkFDdEIsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO3dCQUNoQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQzs0QkFDOUMsSUFBSSxJQUFJLEdBQUcsQ0FBQzt3QkFDaEIsQ0FBQzt3QkFDRCxJQUFJLElBQUksQ0FBQyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDOzZCQUMxRCxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7b0JBQ3RCLENBQUM7b0JBRUQsTUFBTSxDQUFDLElBQUksQ0FBQztnQkFDaEIsQ0FBQztnQkFFRCxzREFBc0Q7Z0JBQ3hDLGVBQVMsR0FBdkIsVUFBd0IsS0FBSyxFQUFFLElBQUk7b0JBQy9CLE1BQU0sQ0FBQyxLQUFLLEtBQUssQ0FBQyxHQUFHLElBQUksR0FBRyxJQUFJLEdBQUcsR0FBRyxDQUFDO2dCQUMzQyxDQUFDO2dCQUVELHlDQUF5QztnQkFDM0IsV0FBSyxHQUFuQixVQUFvQixTQUFTLEVBQUUsSUFBSztvQkFDaEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzt3QkFDUCxNQUFNLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUNqRSxDQUFDO29CQUVELElBQUksS0FBSyxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQzVDLE1BQU0sQ0FBQyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUM5QyxDQUFDO2dCQUVELGdDQUFnQztnQkFDbEIsWUFBTSxHQUFwQjtvQkFBcUIsY0FBYzt5QkFBZCxXQUFjLENBQWQsc0JBQWMsQ0FBZCxJQUFjO3dCQUFkLDZCQUFjOztvQkFDL0IsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO29CQUNoQixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQzt3QkFDbkMsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNsQixHQUFHLENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDOzRCQUNsQixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQ0FDMUIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQzs0QkFDM0IsQ0FBQzt3QkFDTCxDQUFDO29CQUNMLENBQUM7b0JBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBQztnQkFDbEIsQ0FBQztnQkFDTCxZQUFDO1lBQUQsQ0FBQyxBQTNERCxJQTJEQztZQTNERCx5QkEyREMsQ0FBQTs7OztBQzNERCw4Q0FBOEM7Ozs7Ozs7Ozs7Ozs7OztZQU05QztnQkFBeUIsdUJBQTBDO2dCQUFuRTtvQkFBeUIsOEJBQTBDO2dCQWtFbkUsQ0FBQztnQkFoRVksNEJBQWMsR0FBdkIsVUFBd0IsTUFBYTtvQkFDakMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFDLElBQUksRUFBRSxLQUFLO3dCQUN0QixRQUFRLENBQUM7d0JBRVQsTUFBTSxDQUFDLElBQUksQ0FBQztvQkFDaEIsQ0FBQyxDQUFDLENBQUM7Z0JBQ1AsQ0FBQztnQkFFTSxvQkFBTSxHQUFiO29CQUFBLGlCQXVEQztvQkFyREcsSUFBSSxjQUFjLEdBQUcsYUFBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztvQkFDL0QsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDO29CQUV2QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNoQyxXQUFXLEdBQUcsQ0FDVixxQkFBQyxNQUFNLElBQ0gsU0FBUyxFQUFDLG9EQUFvRCxFQUM5RCxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBaUIscUJBRWhDLENBQ1osQ0FBQztvQkFDTixDQUFDO29CQUVELElBQUksRUFBRSxHQUFHLGFBQUssQ0FBQyxXQUFXLENBQUM7b0JBQzNCLElBQUksVUFBVSxHQUFXLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDO29CQUMvQyxNQUFNLENBQUMsQ0FDSCxxQkFBQyxHQUFHLFNBQ0EscUJBQUMsR0FBRyxTQUNBLHFCQUFDLEdBQUcsSUFBQyxTQUFTLEVBQUMsYUFBYSxHQUN4QixxQkFBQyxJQUFJLElBQUMsU0FBUyxFQUFDLHVCQUF1QixHQUNuQyxxQkFBQyxNQUFNLFNBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFNLENBQVMsT0FBRSxjQUFlLFVBQ2pELEVBQ1AscUJBQUMsRUFBRSxJQUFDLFNBQVMsRUFBQyxvQ0FBb0MsR0FDOUMscUJBQUMsRUFBRSxTQUNDLHFCQUFDLENBQUMsSUFDRSxJQUFJLEVBQUMsSUFBSSxFQUNULFNBQVMsRUFBRSxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsVUFBVSxJQUFJLEdBQUcsRUFBRSxDQUFFLEVBQzdDLE9BQU8sRUFBRSxVQUFBLENBQUMsSUFBSSxPQUFBLEtBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQXhCLENBQXlCLFNBRXZDLENBQ0gsRUFDTCxxQkFBQyxFQUFFLFNBQ0MscUJBQUMsQ0FBQyxJQUNFLElBQUksRUFBQyxVQUFVLEVBQ2YsU0FBUyxFQUFFLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxVQUFVLElBQUksR0FBRyxFQUFFLENBQUUsRUFDN0MsT0FBTyxFQUFFLFVBQUEsQ0FBQyxJQUFJLE9BQUEsS0FBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBeEIsQ0FBeUIsWUFFdkMsQ0FDSCxFQUNMLHFCQUFDLEVBQUUsU0FDQyxxQkFBQyxDQUFDLElBQ0UsSUFBSSxFQUFDLGFBQWEsRUFDbEIsU0FBUyxFQUFFLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxVQUFVLElBQUksR0FBRyxFQUFFLENBQUcsRUFDOUMsT0FBTyxFQUFFLFVBQUEsQ0FBQyxJQUFJLE9BQUEsS0FBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBeEIsQ0FBeUIsZUFFdkMsQ0FDSCxDQUNKLENBQ0gsQ0FDSixFQUNMLFdBQVksQ0FDWCxDQUNULENBQUM7Z0JBQ04sQ0FBQztnQkFDTCxVQUFDO1lBQUQsQ0FBQyxBQWxFRCxDQUF5QixLQUFLLENBQUMsU0FBUyxHQWtFdkM7WUFsRUQscUJBa0VDLENBQUE7Ozs7QUN4RUQsOENBQThDOzs7OztJQVk5QztRQUVJLElBQUksTUFBTSxHQUFrQixPQUFPLENBQUM7UUFDcEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUUzQixJQUFJLEtBQUssR0FBeUIsRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLGNBQWMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxnQkFBZ0IsRUFBRSxJQUFJLEVBQUUsQ0FBQztRQUUzRyxRQUFRLENBQUMsTUFBTSxDQUNYLG9CQUFDLFNBQUcsR0FBQyxjQUFjLEVBQUUsQ0FBRSxFQUNsQixVQUFVLEVBQUMsR0FBRyxFQUNkLEtBQUssRUFBRSxDQUFFLEVBQUcsRUFDakIsUUFBUSxDQUFDLHNCQUFzQixDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUNsRCxDQUFDO0lBQ04sQ0FBQztJQWJELHVCQWFDLENBQUE7Ozs7Ozs7Ozs7Ozs7WUFmQTs7O0FDVkQsOENBQThDIiwic291cmNlc0NvbnRlbnQiOlsiLy92YXJpYWJsZSBkZWNsYXJhdGlvblxyXG52YXIgaW1wbGljaXQgPSAnJztcclxudmFyIGV4cGxpY2l0IDogc3RyaW5nID0gbnVsbDtcclxubGV0IHVzaW5nTGV0IDogc3RyaW5nID0gJyc7XHJcblxyXG4vL2FueSBpcyB1c2VkIHRvIHJlcHJlc2VudCBhbnkgdW5zYWZlIHR5cGVcclxubGV0IGVtcHR5IDogYW55ID0gZnVuY3Rpb24oKXt9O1xyXG5cclxuLy9jcmVhdGluZyBpbnRlcmZhY2VcclxuaW50ZXJmYWNlIElOYW1lZE9iamVjdCB7XHJcbiAgICBmaXJzdE5hbWU6c3RyaW5nLFxyXG4gICAgbGFzdE5hbWU6c3RyaW5nLFxyXG4gICAgLy9vcHRpb25hbCBwcm9wZXJ0eSBkb2VzIG5vdCBuZWVkIHRvIGV4aXN0XHJcbiAgICBhZ2U/Om51bWJlclxyXG59XHJcblxyXG4vL3VzaW5nIGludGVyZmFjZVxyXG4vL2ludGVyZmFjZSBpcyBpbXBsaWNpdGx5IGltcGxlbWVudGVkIGJ5IGFueXRoaW5nIHRoYXQgbWF0Y2hlc1xyXG52YXIgb2JqZWN0c0ltcGxpY2l0bHlJbXBsZW1lbnQgOiBJTmFtZWRPYmplY3QgPSB7XHJcbiAgICBmaXJzdE5hbWUgOiAnRm9vJyxcclxuICAgIGxhc3ROYW1lIDogJ0JhcidcclxufVxyXG5cclxuLy9jcmVhdGluZyBmdW5jdGlvbiBpbnRlcmZhY2VcclxuaW50ZXJmYWNlIElGaWx0ZXJGdW5jdGlvbiB7XHJcbiAgICAob2JqZWN0OmFueSkgOiBib29sZWFuXHJcbn1cclxuXHJcbi8vZnVuY3Rpb24gdGhhdCBjb25mb3JtcyB0byB0aGUgaW50ZXJmYWNlXHJcbmxldCBpc05vdE51bGwgOiBJRmlsdGVyRnVuY3Rpb24gPSBmdW5jdGlvbihvYmplY3Q6YW55KSB7XHJcbiAgICByZXR1cm4gb2JqZWN0ICE9IG51bGw7XHJcbn1cclxuXHJcbi8vd2UgY2FuIGZvcmNlIGNhc3Qgb2YgYW55dGhpbmcgdGhhdCBkb2VzIG5vdCBtYXRjaCB0aGUgaW50ZXJmYWNlXHJcbmxldCBmb3JjZWRDYXNlIDogSUZpbHRlckZ1bmN0aW9uID0gPElGaWx0ZXJGdW5jdGlvbj4gZW1wdHk7XHJcblxyXG4vL2Z1bmN0aW9uJ3MgcGFyYW1ldGVyIGNhbiBkZWZpbmUgZXhwZWN0ZWQgaW50ZXJmYWNlIGlubGluZVxyXG4vL2Z1bmN0aW9uIHJlY2VpdmVzIG9iamVjdCBvZiBpbmxpbmUgdHlwZSwgYW5kIHJldHVybnMgYSBzdHJpbmdcclxuZnVuY3Rpb24gZ2V0RnVsbE5hbWUob2JqZWN0OiB7IGZpcnN0TmFtZTpzdHJpbmcsIGxhc3ROYW1lOnN0cmluZyB9KSA6IHN0cmluZyB7XHJcbiAgICBpZiAoIWlzTm90TnVsbChvYmplY3QpKSB7XHJcbiAgICAgICAgdGhyb3cgJ09iamVjdCBzaG91bGQgbm90IGJlIG51bGwhJ1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG9iamVjdC5maXJzdE5hbWUgKyAnICcgKyBvYmplY3QubGFzdE5hbWU7XHJcbn1cclxuXHJcbi8vaW50ZXJmYWNlcyBhcmUgaW1wbGljaXRseSBpbXBsZW1lbnRlZFxyXG5nZXRGdWxsTmFtZShvYmplY3RzSW1wbGljaXRseUltcGxlbWVudCk7XHJcbmdldEZ1bGxOYW1lKHtmaXJzdE5hbWU6JycsIGxhc3ROYW1lOicnfSk7XHJcblxyXG4vL2ludGVyZmFjZSBjYW4gc3BlY2lmeSBob3cgYSBjb25zdHJ1Y3RvciBzaG91bGQgbG9va2xpa2VcclxuaW50ZXJmYWNlIElFbmdpbmVGYWN0b3J5IHtcclxuICAgIG5ldyAoYXJnMTogbnVtYmVyLCBuYW1lOiBzdHJpbmcpOiBhbnlcclxufVxyXG5cclxuLy9jbGFzcyBsb29rcyBsaWtlIHRoaXNcclxuY2xhc3MgRWxlY3RyaWNFbmdpbmUge1xyXG5cclxuICAgIC8vYSBwcml2YXRlIHByb3BlcnR5XHJcbiAgICBwcml2YXRlIG5vV2F0dHM6IG51bWJlcjtcclxuICAgIGNvbnN0cnVjdG9yKG5vV2F0dHM6IG51bWJlciwgbmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5ub1dhdHRzID0gbm9XYXR0cztcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgR2FzRW5naW5lIHtcclxuICAgIC8vcHVibGljIGFuZCBwcml2YXRlIGtleXdvcmQgaW1tZWRpYXRlbHkgc2V0cyB0aGUgZmllbGRzXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIG5vUGlzdG9uczogbnVtYmVyLCBwdWJsaWMgbmFtZTogc3RyaW5nKSB7IH1cclxufVxyXG5cclxuLy9hIGZ1bmN0aW9uIGNhbiByZWNlaXZlIGludGVyZmFjZSBvZiBhIGNvbnN0cnVjdG9yXHJcbmZ1bmN0aW9uIGNyZWF0ZUVuZ2luZXMoZmFjdG9yeTogSUVuZ2luZUZhY3RvcnkpIDogQXJyYXk8YW55PiB7XHJcbiAgICBsZXQgZW5naW5lcyA6IEFycmF5PGFueT4gPSBbXTtcclxuICAgIC8vaW50ZXJmYWNlIG9mIGEgY29uc3RydWN0b3IgaXMgdXNlZCB3aXRoIG5ldyBvcGVyYXRvclxyXG4gICAgZW5naW5lcy5wdXNoKG5ldyBmYWN0b3J5KDEsICdmaXJzdCcpKTtcclxuICAgIGVuZ2luZXMucHVzaChuZXcgZmFjdG9yeSgyLCAnc2Vjb25kJykpO1xyXG4gICAgcmV0dXJuIGVuZ2luZXM7XHJcbn1cclxuXHJcbi8vYSBzdGF0aWMgY29uc3RydWN0b3IgZGVmaW5pdGlvbiBoYXMgdG8gYmUgcGFzc2VkIHRvIHRoZSBmdW5jdGlvblxyXG5jcmVhdGVFbmdpbmVzKEdhc0VuZ2luZSk7XHJcbmNyZWF0ZUVuZ2luZXMoRWxlY3RyaWNFbmdpbmUpO1xyXG5cclxuKGZ1bmN0aW9uKCkge1xyXG5cclxuXHJcblxyXG5cclxuXHJcbn0pKCk7IiwibmFtZXNwYWNlIEludGVyZmFjZXMge1xyXG5cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSUFwcFByb3BzIHtcclxuICAgICAgICBjb21wbGV0ZWRDb3VudDogbnVtYmVyO1xyXG4gICAgICAgIG9uQ2xlYXJDb21wbGV0ZWQ/OiBhbnk7XHJcbiAgICAgICAgbm93U2hvd2luZzogc3RyaW5nO1xyXG4gICAgICAgIGNvdW50OiBudW1iZXI7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRGVmaW5lcyB0aGUgaW50ZXJmYWNlIG9mIHRoZSBzdHJ1Y3R1cmUgb2YgYSB0YXNrXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElUb2RvIHtcclxuICAgICAgICBpZDogc3RyaW5nLFxyXG4gICAgICAgIHRpdGxlOiBzdHJpbmcsXHJcbiAgICAgICAgY29tcGxldGVkOiBib29sZWFuXHJcbiAgICB9XHJcblxyXG4gICAgLy8gRGVmaW5lcyB0aGUgaW50ZXJmYWNlIG9mIHRoZSBwcm9wZXJ0aWVzIG9mIHRoZSBUb2RvSXRlbSBjb21wb25lbnRcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSVRvZG9JdGVtUHJvcHMge1xyXG4gICAgICAgIGtleTogc3RyaW5nLFxyXG4gICAgICAgIHRvZG86IElUb2RvO1xyXG4gICAgICAgIGVkaXRpbmc/OiBib29sZWFuO1xyXG4gICAgICAgIG9uU2F2ZTogKHZhbDogYW55KSA9PiB2b2lkO1xyXG4gICAgICAgIG9uRGVzdHJveTogKCkgPT4gdm9pZDtcclxuICAgICAgICBvbkVkaXQ6ICgpID0+IHZvaWQ7XHJcbiAgICAgICAgb25DYW5jZWw6IChldmVudDogYW55KSA9PiB2b2lkO1xyXG4gICAgICAgIG9uVG9nZ2xlOiAoKSA9PiB2b2lkO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIERlZmluZXMgdGhlIGludGVyZmFjZSBvZiB0aGUgc3RhdGUgb2YgdGhlIFRvZG9JdGVtIGNvbXBvbmVudFxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJVG9kb0l0ZW1TdGF0ZSB7XHJcbiAgICAgICAgZWRpdFRleHQ6IHN0cmluZ1xyXG4gICAgfVxyXG5cclxuICAgIC8vIERlZmluZXMgdGhlIFRvZG9Nb2RlbCBpbnRlcmZhY2VcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSVRvZG9Nb2RlbCB7XHJcbiAgICAgICAga2V5OiBhbnk7XHJcbiAgICAgICAgdG9kb3M6IEFycmF5PElUb2RvPjtcclxuICAgICAgICBvbkNoYW5nZXM6IEFycmF5PGFueT47XHJcbiAgICAgICAgc3Vic2NyaWJlKG9uQ2hhbmdlKTtcclxuICAgICAgICBpbmZvcm0oKTtcclxuICAgICAgICBhZGRUb2RvKHRpdGxlOiBzdHJpbmcpO1xyXG4gICAgICAgIHRvZ2dsZUFsbChjaGVja2VkKTtcclxuICAgICAgICB0b2dnbGUodG9kb1RvVG9nZ2xlKTtcclxuICAgICAgICBkZXN0cm95KHRvZG8pO1xyXG4gICAgICAgIHNhdmUodG9kb1RvU2F2ZSwgdGV4dCk7XHJcbiAgICAgICAgY2xlYXJDb21wbGV0ZWQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBEZWZpbmVzIHRoZSBpbnRlcmZhY2Ugb2YgdGhlIHN0YXRlIG9mIHRoZSBBcHAgY29tcG9uZW50XHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElBcHBTdGF0ZSB7XHJcbiAgICAgICAgZWRpdGluZz86IHN0cmluZztcclxuICAgICAgICBub3dTaG93aW5nPzogc3RyaW5nXHJcbiAgICB9XHJcbn0iLCJleHBvcnQgY2xhc3MgVXRpbHMge1xyXG5cclxuICAgIC8vIFJlYWN0IGlkaW9tIGZvciBzaG9ydGN1dHRpbmcgdG8gYGNsYXNzU2V0YCBzaW5jZSBpdCdsbCBiZSB1c2VkIG9mdGVuXHJcbiAgICAvL3ZhciBjeCA9IFJlYWN0LmFkZG9ucy5jbGFzc1NldDtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVuZGVyQ2xhc3Mob2JqZWN0OiBhbnkpOiBzdHJpbmcge1xyXG4gICAgICAgIGZvciAodmFyIHByb3AgaW4gb2JqZWN0KSB7XHJcbiAgICAgICAgICAgIGlmIChvYmplY3RbcHJvcF0gPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb3A7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIGdlbmVyYXRlcyBhIG5ldyBVbml2ZXJzYWxseSB1bmlxdWUgaWRlbnRpZnkgKFVVSUQpXHJcbiAgICAvLyB0aGUgVVVJRCBpcyB1c2VkIHRvIGlkZW50aWZ5IGVhY2ggb2YgdGhlIHRhc2tzXHJcbiAgICBwdWJsaWMgc3RhdGljIHV1aWQoKTogc3RyaW5nIHtcclxuICAgICAgICAvKmpzaGludCBiaXR3aXNlOmZhbHNlICovXHJcbiAgICAgICAgdmFyIGksIHJhbmRvbTtcclxuICAgICAgICB2YXIgdXVpZCA9ICcnO1xyXG5cclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgMzI7IGkrKykge1xyXG4gICAgICAgICAgICByYW5kb20gPSBNYXRoLnJhbmRvbSgpICogMTYgfCAwO1xyXG4gICAgICAgICAgICBpZiAoaSA9PT0gOCB8fCBpID09PSAxMiB8fCBpID09PSAxNiB8fCBpID09PSAyMCkge1xyXG4gICAgICAgICAgICAgICAgdXVpZCArPSAnLSc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdXVpZCArPSAoaSA9PT0gMTIgPyA0IDogKGkgPT09IDE2ID8gKHJhbmRvbSAmIDMgfCA4KSA6IHJhbmRvbSkpXHJcbiAgICAgICAgICAgICAgICAudG9TdHJpbmcoMTYpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHV1aWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gYWRkcyAncycgdG8gdGhlIGVuZCBvZiBhIGdpdmVuIHdvcmxkIHdoZW4gY291bnQgPiAxXHJcbiAgICBwdWJsaWMgc3RhdGljIHBsdXJhbGl6ZShjb3VudCwgd29yZCkge1xyXG4gICAgICAgIHJldHVybiBjb3VudCA9PT0gMSA/IHdvcmQgOiB3b3JkICsgJ3MnO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHN0b3JlcyBkYXRhIHVzaW5nIHRoZSBsb2NhbFN0b3JhZ2UgQVBJXHJcbiAgICBwdWJsaWMgc3RhdGljIHN0b3JlKG5hbWVzcGFjZSwgZGF0YT8pIHtcclxuICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbG9jYWxTdG9yYWdlLnNldEl0ZW0obmFtZXNwYWNlLCBKU09OLnN0cmluZ2lmeShkYXRhKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgc3RvcmUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShuYW1lc3BhY2UpO1xyXG4gICAgICAgIHJldHVybiAoc3RvcmUgJiYgSlNPTi5wYXJzZShzdG9yZSkpIHx8IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGp1c3QgYSBoZWxwZXIgZm9yIGluaGVyaXRhbmNlXHJcbiAgICBwdWJsaWMgc3RhdGljIGV4dGVuZCguLi5vYmpzOiBhbnlbXSk6IGFueSB7XHJcbiAgICAgICAgdmFyIG5ld09iaiA9IHt9O1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb2Jqcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgb2JqID0gb2Jqc1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIG9iaikge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3T2JqW2tleV0gPSBvYmpba2V5XTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV3T2JqO1xyXG4gICAgfVxyXG59IiwiLy88cmVmZXJlbmNlIHBhdGg9XCIuLi9zaGFyZWQvSW50ZXJmYWNlcy50c1wiIC8+XHJcblxyXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCdcclxuXHJcbmltcG9ydCB7IFV0aWxzIH0gZnJvbSAnLi4vc2hhcmVkL1V0aWxzJ1xyXG5cclxuZXhwb3J0IGNsYXNzIEFwcCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxJbnRlcmZhY2VzLklBcHBQcm9wcywgYW55PiB7XHJcblxyXG4gICAgcHJpdmF0ZSAgaGFuZGxlTmF2Q2xpY2soYnV0dG9uOnN0cmluZyk6dm9pZCB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSgocHJldiwgcHJvcHMpID0+IHtcclxuICAgICAgICAgICAgZGVidWdnZXI7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcHJldjtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVuZGVyKCkge1xyXG5cclxuICAgICAgICB2YXIgYWN0aXZlVG9kb1dvcmQgPSBVdGlscy5wbHVyYWxpemUodGhpcy5wcm9wcy5jb3VudCwgJ2l0ZW0nKTtcclxuICAgICAgICB2YXIgY2xlYXJCdXR0b24gPSBudWxsO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5wcm9wcy5jb21wbGV0ZWRDb3VudCA+IDApIHtcclxuICAgICAgICAgICAgY2xlYXJCdXR0b24gPSAoXHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwid2F2ZXMtZWZmZWN0IHdhdmVzLWxpZ2h0IGJ0bi1sYXJnZSBjbGVhci1jb21wbGV0ZWRcIlxyXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMucHJvcHMub25DbGVhckNvbXBsZXRlZH0+XHJcbiAgICAgICAgICAgICAgICAgICAgQ2xlYXIgY29tcGxldGVkXHJcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBjeCA9IFV0aWxzLnJlbmRlckNsYXNzO1xyXG4gICAgICAgIGxldCBub3dTaG93aW5nOiBzdHJpbmcgPSB0aGlzLnByb3BzLm5vd1Nob3dpbmc7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgIDxuYXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJuYXYtd3JhcHBlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJicmFuZC1sb2dvIHRvZG8tY291bnRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzdHJvbmc+e3RoaXMucHJvcHMuY291bnR9PC9zdHJvbmc+IHthY3RpdmVUb2RvV29yZH0gbGVmdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJmaWx0ZXJzIHJpZ2h0IGhpZGUtb24tbWVkLWFuZC1kb3duXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaHJlZj1cIiMvXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7IGFjdGl2ZTogbm93U2hvd2luZyA9PSAnMScgfSl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2UgPT4gdGhpcy5oYW5kbGVOYXZDbGljaygnMScpfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQWxsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBocmVmPVwiIy9hY3RpdmVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHsgYWN0aXZlOiBub3dTaG93aW5nID09ICcyJyB9KX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17ZSA9PiB0aGlzLmhhbmRsZU5hdkNsaWNrKCcyJyl9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBY3RpdmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhyZWY9XCIjL2NvbXBsZXRlZFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goeyBhY3RpdmU6IG5vd1Nob3dpbmcgPT0gJzMnIH0pIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17ZSA9PiB0aGlzLmhhbmRsZU5hdkNsaWNrKCczJyl9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb21wbGV0ZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9uYXY+XHJcbiAgICAgICAgICAgICAgICB7Y2xlYXJCdXR0b259XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn0iLCIvLzxyZWZlcmVuY2VzIHBhdGg9XCIuL3NoYXJlZC9JbnRlcmZhY2VzLnRzXCIgLz5cclxuXHJcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQgKiBhcyBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nXHJcbmltcG9ydCB7IEFwcCB9IGZyb20gJy4vdWkvQXBwJ1xyXG5cclxubmFtZXNwYWNlIHV0aWxzIHtcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSUxvZ2dlciB7XHJcbiAgICAgICAgbG9nKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQ7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBtYWluKCk6IHZvaWQge1xyXG5cclxuICAgIGxldCBsb2dnZXI6IHV0aWxzLklMb2dnZXIgPSBjb25zb2xlO1xyXG4gICAgbG9nZ2VyLmxvZygnVGVzdCBtZXRob2QhJyk7XHJcblxyXG4gICAgbGV0IG1vZGVsOiBJbnRlcmZhY2VzLklBcHBQcm9wcyA9IHsgbm93U2hvd2luZzogJzEnLCBjb21wbGV0ZWRDb3VudDogMCwgY291bnQ6IDAsIG9uQ2xlYXJDb21wbGV0ZWQ6IG51bGwgfTtcclxuXHJcbiAgICBSZWFjdERPTS5yZW5kZXIoXHJcbiAgICAgICAgPEFwcCBjb21wbGV0ZWRDb3VudD17MX1cclxuICAgICAgICAgICAgIG5vd1Nob3dpbmc9XCIyXCJcclxuICAgICAgICAgICAgIGNvdW50PXsxfSAvPixcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdjb250YWluZXInKVswXVxyXG4gICAgKTtcclxufSIsIi8vPHJlZmVyZW5jZSBwYXRoPVwiLi4vc2hhcmVkL0ludGVyZmFjZXMudHNcIiAvPlxyXG5cclxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnXHJcbmltcG9ydCB7IFV0aWxzIH0gZnJvbSAnLi4vc2hhcmVkL1V0aWxzJyJdfQ==