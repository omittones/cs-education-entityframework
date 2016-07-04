System.register([], function(exports_1, context_1) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zaGFyZWQvVXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztZQUFBO2dCQUFBO2dCQWlEQSxDQUFDO2dCQS9DRyxxREFBcUQ7Z0JBQ3JELGlEQUFpRDtnQkFDbkMsVUFBSSxHQUFsQjtvQkFDSSx5QkFBeUI7b0JBQ3pCLElBQUksQ0FBQyxFQUFFLE1BQU0sQ0FBQztvQkFDZCxJQUFJLElBQUksR0FBRyxFQUFFLENBQUM7b0JBRWQsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7d0JBQ3RCLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQzt3QkFDaEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7NEJBQzlDLElBQUksSUFBSSxHQUFHLENBQUM7d0JBQ2hCLENBQUM7d0JBQ0QsSUFBSSxJQUFJLENBQUMsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQzs2QkFDMUQsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO29CQUN0QixDQUFDO29CQUVELE1BQU0sQ0FBQyxJQUFJLENBQUM7Z0JBQ2hCLENBQUM7Z0JBRUQsc0RBQXNEO2dCQUN4QyxlQUFTLEdBQXZCLFVBQXdCLEtBQUssRUFBRSxJQUFJO29CQUMvQixNQUFNLENBQUMsS0FBSyxLQUFLLENBQUMsR0FBRyxJQUFJLEdBQUcsSUFBSSxHQUFHLEdBQUcsQ0FBQztnQkFDM0MsQ0FBQztnQkFFRCx5Q0FBeUM7Z0JBQzNCLFdBQUssR0FBbkIsVUFBb0IsU0FBUyxFQUFFLElBQUs7b0JBQ2hDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7d0JBQ1AsTUFBTSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDakUsQ0FBQztvQkFFRCxJQUFJLEtBQUssR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUM1QyxNQUFNLENBQUMsQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDOUMsQ0FBQztnQkFFRCxnQ0FBZ0M7Z0JBQ2xCLFlBQU0sR0FBcEI7b0JBQXFCLGNBQWM7eUJBQWQsV0FBYyxDQUFkLHNCQUFjLENBQWQsSUFBYzt3QkFBZCw2QkFBYzs7b0JBQy9CLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztvQkFDaEIsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7d0JBQ25DLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDbEIsR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQzs0QkFDbEIsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0NBQzFCLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7NEJBQzNCLENBQUM7d0JBQ0wsQ0FBQztvQkFDTCxDQUFDO29CQUNELE1BQU0sQ0FBQyxNQUFNLENBQUM7Z0JBQ2xCLENBQUM7Z0JBQ0wsWUFBQztZQUFELENBQUMsQUFqREQsSUFpREM7WUFqREQseUJBaURDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgVXRpbHMge1xyXG5cclxuICAgIC8vIGdlbmVyYXRlcyBhIG5ldyBVbml2ZXJzYWxseSB1bmlxdWUgaWRlbnRpZnkgKFVVSUQpXHJcbiAgICAvLyB0aGUgVVVJRCBpcyB1c2VkIHRvIGlkZW50aWZ5IGVhY2ggb2YgdGhlIHRhc2tzXHJcbiAgICBwdWJsaWMgc3RhdGljIHV1aWQoKTogc3RyaW5nIHtcclxuICAgICAgICAvKmpzaGludCBiaXR3aXNlOmZhbHNlICovXHJcbiAgICAgICAgdmFyIGksIHJhbmRvbTtcclxuICAgICAgICB2YXIgdXVpZCA9ICcnO1xyXG5cclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgMzI7IGkrKykge1xyXG4gICAgICAgICAgICByYW5kb20gPSBNYXRoLnJhbmRvbSgpICogMTYgfCAwO1xyXG4gICAgICAgICAgICBpZiAoaSA9PT0gOCB8fCBpID09PSAxMiB8fCBpID09PSAxNiB8fCBpID09PSAyMCkge1xyXG4gICAgICAgICAgICAgICAgdXVpZCArPSAnLSc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdXVpZCArPSAoaSA9PT0gMTIgPyA0IDogKGkgPT09IDE2ID8gKHJhbmRvbSAmIDMgfCA4KSA6IHJhbmRvbSkpXHJcbiAgICAgICAgICAgICAgICAudG9TdHJpbmcoMTYpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHV1aWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gYWRkcyAncycgdG8gdGhlIGVuZCBvZiBhIGdpdmVuIHdvcmxkIHdoZW4gY291bnQgPiAxXHJcbiAgICBwdWJsaWMgc3RhdGljIHBsdXJhbGl6ZShjb3VudCwgd29yZCkge1xyXG4gICAgICAgIHJldHVybiBjb3VudCA9PT0gMSA/IHdvcmQgOiB3b3JkICsgJ3MnO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHN0b3JlcyBkYXRhIHVzaW5nIHRoZSBsb2NhbFN0b3JhZ2UgQVBJXHJcbiAgICBwdWJsaWMgc3RhdGljIHN0b3JlKG5hbWVzcGFjZSwgZGF0YT8pIHtcclxuICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbG9jYWxTdG9yYWdlLnNldEl0ZW0obmFtZXNwYWNlLCBKU09OLnN0cmluZ2lmeShkYXRhKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgc3RvcmUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShuYW1lc3BhY2UpO1xyXG4gICAgICAgIHJldHVybiAoc3RvcmUgJiYgSlNPTi5wYXJzZShzdG9yZSkpIHx8IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGp1c3QgYSBoZWxwZXIgZm9yIGluaGVyaXRhbmNlXHJcbiAgICBwdWJsaWMgc3RhdGljIGV4dGVuZCguLi5vYmpzOiBhbnlbXSk6IGFueSB7XHJcbiAgICAgICAgdmFyIG5ld09iaiA9IHt9O1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb2Jqcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgb2JqID0gb2Jqc1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIG9iaikge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3T2JqW2tleV0gPSBvYmpba2V5XTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV3T2JqO1xyXG4gICAgfVxyXG59Il19