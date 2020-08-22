function main() {
    this.init = function () {
        this.state = [];
    }

    this.accumulate = function (value, timestamp) {
        this.state.push({ value, timestamp });
    }

    this.computeResult = function () {

        const windows = this.state.reduce((a, c) => {
            (a[c.timestamp] = a[c.timestamp] || []).push(c)
            return a;
        }, {});

        let windowsWithAggregates = {};

        Object.keys(windows).forEach((x, i) => {

            const windowName = i === 0 ? 'lastWindow' : 'currentWindow';

            windowsWithAggregates[windowName] = {
                avg: windows[x].reduce((a, b) => a + b.value, 0) / windows[x].length,
                min: Math.min(...windows[x].map(x => x.value)),
                max: Math.max(...windows[x].map(x => x.value)),
                count: windows[x].length
            }
        });

        return windowsWithAggregates;
    }
}
