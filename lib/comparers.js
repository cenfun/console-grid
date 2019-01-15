var emptyMatch = function (value) {
    if (!value && value !== 0) {
        return true;
    }
    return false;
};

var emptyComparer = function (av, bv, o) {
    var ae = emptyMatch(av);
    var be = emptyMatch(bv);

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

var nullMatch = function (value) {
    if (value === null || typeof (value) === "undefined") {
        return true;
    }
    return false;
};

var blankComparer = function (av, bv, o) {
    var an = nullMatch(av);
    var bn = nullMatch(bv);

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

var stringComparer = function (av, bv, o) {
    var ai = typeof (av) === "string";
    var bi = typeof (bv) === "string";
    //both are string
    if (ai && bi) {
        // ignore case sort
        var au = av.toUpperCase();
        var bu = bv.toUpperCase();
        if (au !== bu) {
            return au > bu ? -1 : 1;
        }
    }
    return av > bv ? -1 : 1;
};

var diffTypeComparer = function (ai, bi, av, bv, o) {
    if (ai) {
        return -1;
    }
    if (bi) {
        return 1;
    }
    return stringComparer(av, bv, o);
};

var numberComparer = function (av, bv, o) {
    var ai = typeof (av) === "number";
    var bi = typeof (bv) === "number";
    //both are number
    if (ai && bi) {
        return av > bv ? -1 : 1;
    }
    return diffTypeComparer(ai, bi, av, bv, o);
};

var indexComparer = function (a, b, o) {
    var ci = a.cg_index > b.cg_index ? 1 : -1;
    return ci;
};

var equalComparer = function (a, b, o) {
    return indexComparer(a, b, o);
};

var comparers = {

    string: function (a, b, o) {
        var av = a[o.sortField];
        var bv = b[o.sortField];

        var cb = blankComparer(av, bv, o);
        if (cb) {
            return o.sortBlankFactor * cb;
        }

        if (cb !== 0 && av !== bv) {
            var cs = stringComparer(av, bv, o);
            if (typeof (cs) === "number") {
                return o.sortFactor * cs;
            }
        }

        return equalComparer(a, b, o);
    },

    number: function (a, b, o) {
        var av = a[o.sortField];
        var bv = b[o.sortField];

        var cb = blankComparer(av, bv, o);
        if (cb) {
            return o.sortBlankFactor * cb;
        }

        if (cb !== 0 && av !== bv) {
            var cn = numberComparer(av, bv, o);
            if (typeof (cn) === "number") {
                return o.sortFactor * cn;
            }
        }

        return equalComparer(a, b, o);
    }

};


module.exports = comparers;