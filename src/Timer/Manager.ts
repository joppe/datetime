import {Timer} from './Timer';

/**
 * @interface TimersRegistryInterface
 */
interface TimersRegistryInterface {
    /**
     * @type {Timer}
     */
    [id:string]:Timer;
}

/**
 * @interface ManagerInterface
 */
export interface ManagerInterface {
    /**
     * @param {string} id
     * @returns {Timer}
     */
    get(id:string):Timer;

    /**
     * @param {string} id
     * @returns {Timer}
     */
    start(id:string):Timer;

    /**
     * @param {string} id
     * @returns {Timer}
     */
    end(id:string):Timer;

    /**
     * @param {string} id
     * @returns {number}
     */
    duration(id:string):number;

    [Symbol.iterator]():Iterator<Timer>;
}

const timers:TimersRegistryInterface = {};

/**
 * @type {ManagerInterface}
 */
export const Manager:ManagerInterface  = {
    /**
     * @param {string} id
     * @returns {Timer}
     */
    get(id:string):Timer {
        if (undefined === timers[id]) {
            timers[id] = new Timer();
        }

        return timers[id];
    },

    /**
     * @param {string} id
     * @returns {Timer}
     */
    start(id:string):Timer {
        let timer:Timer = Manager.get(id);

        timer.start();

        return timer;
    },

    /**
     * @param {string} id
     * @returns {Timer}
     */
    end(id:string):Timer {
        let timer = Manager.get(id);

        timer.stop();

        return timer;
    },

    /**
     * @param {string} id
     * @returns {number}
     */
    duration(id:string):number {
        return Manager.get(id).getDuration();
    },

    /**
     * Iterator over the times
     *
     * @returns {Iterator<Timer>}
     */
    [Symbol.iterator]():Iterator<Timer> {
        let index:number = 0;
        const ids:string[] = Object.keys(timers);

        return {
            next():IteratorResult<Timer> {
                if (index < ids.length) {
                    const value = timers[ids[index]];

                    index += 1;

                    return {
                        done: false,
                        value
                    }
                } else {
                    return {
                        done: true,
                        value: undefined
                    }
                }
            }
        };
    }
};