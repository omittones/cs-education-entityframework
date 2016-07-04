export interface ILogger {
	log (message:string):void;
}

export class EnableDecorator implements ILogger {
	constructor(private inner:ILogger, enabled:boolean) {
		//very nice
		if (enabled) {
			this.log = inner.log.bind(inner);
		}
	}

	public log(message:string):void {
	}
}