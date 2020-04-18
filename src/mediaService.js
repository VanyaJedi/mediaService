class MediaService {
    constructor(settings) {
        this.subscriptionsByScreenSize = {};
        this.subscriptionsById = {};
        if (settings) {
            settings.forEach(({ key, matchMedia }) => {
                this.addMatchMedia(key, matchMedia)
            });
        }
    }

    static getListenerNameByKey(key) {
        return `mql${key}`;
    }

    addMatchMedia(key, matchMedia) {
        const isRightArguments = !key || !matchMedia || typeof key !== 'string' || typeof matchMedia !== 'string';
        if (isRightArguments) {
            throw new Error(`Wrong arguments in method addMatchMedia`);
        }
        if (this.isScreenTypeExist(key)) {
            throw new Error(`The key already exists: ${key}`);
        }
        const name = MediaService.getListenerNameByKey(key);
        this[name] = window.matchMedia(matchMedia)
        this[name].addListener(this._listener(key).bind(this))
        this.subscriptionsByScreenSize[key] = []
    }

    removeMatchMedia(key) {
        if (!this.isScreenTypeExist(key)) {
            return;
        }
        const name = MediaService.getListenerNameByKey(key);
        delete this[name];
        const ids = this.subscriptionsByScreenSize[key];
        ids.forEach(id => {
            delete this.subscriptionsById[id];
        });
        delete this.subscriptionsByScreenSize[key];
    }

    _listener(key) {
        return (evt) => {
            if (evt.matches) {
                this.subscriptionsByScreenSize[key].forEach(id => {
                    this.subscriptionsById[id].whenHappens();
                })
            } else {
                this.subscriptionsByScreenSize[key].forEach(id => {
                    this.subscriptionsById[id].whenNotHappens();
                })
            }
        }
    }

    _deleteIdByScreenSize(id) {
        for (const screen of Object.keys(this.subscriptionsByScreenSize)) {
            const subscription = this.subscriptionsByScreenSize[screen];
            if (subscription.includes(id)) {
                subscription.splice(subscription.indexOf(id), 1);
                break;
            }
        }
    }

    isScreenTypeExist(key) {
        return !!this.subscriptionsByScreenSize[key];
    }

    isSubscribed(id) {
        return !!this.subscriptionsById[id];
    }

    subscribe(id, screenType, whenHappens, whenNotHappens) {
        if (!this.subscriptionsByScreenSize[screenType]) {
            throw new Error(`There is no such type of screen - ${screenType}`);
        }

        if (this.isSubscribed(id)) {
            this._deleteIdByScreenSize(id, this.subscriptionsByScreenSize);
        }

        this.subscriptionsById[id] = {
            whenHappens,
            whenNotHappens
        }

        this.subscriptionsByScreenSize[screenType].push(id);
    }

    unsubscribe(id) {
        if (!this.isSubscribed(id)) {
            return;
        }

        this._deleteIdByScreenSize(id);
        delete this.subscriptionsById[id];
    }
}