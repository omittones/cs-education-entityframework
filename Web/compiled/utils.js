var EnableDecorator = (function () {
    function EnableDecorator(inner, enabled) {
        this.inner = inner;
        //very nice
        if (enabled) {
            this.log = inner.log.bind(inner);
        }
    }
    EnableDecorator.prototype.log = function (message) {
    };
    return EnableDecorator;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi91dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFJQTtJQUNDLHlCQUFvQixLQUFhLEVBQUUsT0FBZTtRQUE5QixVQUFLLEdBQUwsS0FBSyxDQUFRO1FBQ2hDLFdBQVc7UUFDWCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ2IsSUFBSSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNsQyxDQUFDO0lBQ0YsQ0FBQztJQUVNLDZCQUFHLEdBQVYsVUFBVyxPQUFjO0lBQ3pCLENBQUM7SUFDRixzQkFBQztBQUFELENBQUMsQUFWRCxJQVVDIiwic291cmNlc0NvbnRlbnQiOlsiaW50ZXJmYWNlIElMb2dnZXIge1xyXG5cdGxvZyAobWVzc2FnZTpzdHJpbmcpOnZvaWQ7XHJcbn1cclxuXHJcbmNsYXNzIEVuYWJsZURlY29yYXRvciBpbXBsZW1lbnRzIElMb2dnZXIge1xyXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgaW5uZXI6SUxvZ2dlciwgZW5hYmxlZDpib29sZWFuKSB7XHJcblx0XHQvL3ZlcnkgbmljZVxyXG5cdFx0aWYgKGVuYWJsZWQpIHtcclxuXHRcdFx0dGhpcy5sb2cgPSBpbm5lci5sb2cuYmluZChpbm5lcik7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgbG9nKG1lc3NhZ2U6c3RyaW5nKTp2b2lkIHtcclxuXHR9XHJcbn0iXX0=