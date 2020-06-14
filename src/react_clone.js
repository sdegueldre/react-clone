let currentHolder = null;
export const useState = (defaultVal) => {
    const holder = currentHolder;
    const states = holder.states;
    const currentState = holder.currentState;
    if (!states[currentState]) {
        states.push(defaultVal);
    }
    const ret = [states[currentState], (val) => {
        states[currentState] = val;
        holder.render();
    }];
    holder.currentState++;
    return ret;
};

export default {
    createElement(tag, props, ...children) {
        console.trace('createElement', arguments);
        switch (typeof tag) {
            case 'function': {
                const holder = {
                    states: [],
                    render: function () {
                        currentHolder = this;
                        this.currentState = 0;
                        const rerendered = tag(this.props);
                        console.log('props on render', this.props);
                        this.component.replaceWith(rerendered);
                        this.component = rerendered;
                    },
                    createComponent: function () {
                        currentHolder = this;
                        this.currentState = 0;
                        this.component = tag(this.props);
                        console.log('props on create', this.props);
                        return this.component;
                    },
                    props,
                };
                return holder.createComponent();
            }
            case 'string': {
                const el = document.createElement(tag);
                Object.entries(props).forEach(([key, value]) => {
                    if (key.startsWith('__')) {
                        return;
                    }
                    if (key.startsWith('on')) {
                        el.addEventListener(key.slice(2).toLowerCase(), value);
                    } else {
                        el[key] = value;
                    }
                });
                children.forEach(child => {
                    if (Array.isArray(child)) {
                        child.forEach(subChild => el.append(subChild));
                    } else {
                        el.append(child);
                    }
                });
                return el;
            }
        }
        debugger;
    },
};
