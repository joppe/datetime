import {timestamp} from './timestamp';

/**
 * @class Timer
 */
export class Timer {
    /**
     * @type {number}
     * @private
     */
    private _startTime:number;

    /**
     * @type {number}
     * @private
     */
    private _stopTime:number;

    /**
     * Start the times
     */
    start():void {
        this._startTime = timestamp();
    }

    /**
     * Stop the timer
     */
    stop():void {
        this._stopTime = timestamp();
    }

    /**
     * @returns {number}
     * @throws {Error}
     */
    getDuration():number {
        if (undefined === this._stopTime || undefined === this._startTime) {
            throw new Error('Timer never stopped and/or started');
        }

        return this._stopTime - this._startTime;
    }
}
