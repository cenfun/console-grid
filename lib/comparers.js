const emptyMatch = function(value) {
    if (!value && value !== 0) {
        return true;
    }
    return false;
};

const emptyComparer = function(av, bv, o) {
    const ae = emptyMatch(av);
    const be = emptyMatch(bv);

    if (ae && be) {
        return 0;
    }

    if (ae) {
        return 1;
    }

    if (be) {
        return -1;
    }

};

const nullMatch = function(value) {
    if (value === null || typeof value === 'undefined') {
        return true;
    }
    return false;
};

const blankComparer = function(av, bv, o) {
    const an = nullMatch(av);
    const bn = nullMatch(bv);

    if (an && bn) {
        return 0;
    }

    if (an) {
        return 1;
    }

    if (bn) {
        return -1;
    }

    return emptyComparer(av, bv, o);

};

const stringComparer = function(av, bv, o) {
    const ai = typeof av === 'string';
    const bi = typeof bv === 'string';
    //both are string
    if (ai && bi) {
        // ignore case sort
        const au = av.toUpperCase();
        const bu = bv.toUpperCase();
        if (au !== bu) {
            return au > bu ? -1 : 1;
        }
    }
    return av > bv ? -1 : 1;
};

const diffTypeComparer = function(ai, bi, av, bv, o) {
    if (ai) {
        return -1;
    }
    if (bi) {
        return 1;
    }
    return stringComparer(av, bv, o);
};

const numberComparer = function(av, bv, o) {
    const ai = typeof av === 'number';
    const bi = typeof bv === 'number';
    //both are number
    if (ai && bi) {
        return av > bv ? -1 : 1;
    }
    return diffTypeComparer(ai, bi, av, bv, o);
};

const indexComparer = function(a, b, o) {
    const ci = a.cg_index > b.cg_index ? 1 : -1;
    return ci;
};

const equalComparer = function(a, b, o) {
    return indexComparer(a, b, o);
};

const comparers = {

    string: function(a, b, o) {
        const av = a[o.sortField];
        const bv = b[o.sortField];

        const cb = blankComparer(av, bv, o);
        if (cb) {
            return o.sortBlankFactor * cb;
        }

        if (cb !== 0 && av !== bv) {
            const cs = stringComparer(av, bv, o);
            if (typeof cs === 'number') {
                return o.sortFactor * cs;
            }
        }

        return equalComparer(a, b, o);
    },

    number: function(a, b, o) {
        const av = a[o.sortField];
        const bv = b[o.sortField];

        const cb = blankComparer(av, bv, o);
        if (cb) {
            return o.sortBlankFactor * cb;
        }

        if (cb !== 0 && av !== bv) {
            const cn = numberComparer(av, bv, o);
            if (typeof cn === 'number') {
                return o.sortFactor * cn;
            }
        }

        return equalComparer(a, b, o);
    }

};


module.exports = comparers;
