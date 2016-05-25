'use strict';

module.exports = {
    isLiveStyleMarker(marker) {
        return 'livestyle' in marker.getProperties();
    },

    elem(name, attrs, content) {
        if (attrs && !isPlainObject(attrs)) {
            content = attrs;
            attrs = null;
        }

        var elem = document.createElement(name);
        if (attrs) {
            Object.keys(attrs).forEach(k => {
                if (k === 'class' || k === 'className') {
                    elem.className = attrs[k];
                } else {
                    elem.setAttribute(k, attrs[k]);
                }
            });
        }

        return module.exports.appendToElement(elem, content);
    },

    appendToElement(elem, content) {
        if (!Array.isArray(content)) {
            content = [content];
        }

        content
        .filter(value => value != null)
        .forEach(item => {
            if (typeof item !== 'object') {
                item = document.createTextNode(item);
            }
            elem.appendChild(item);
        });

        return elem;
    },

    emptyNode(node) {
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
        return node;
    },

    bem(name) {
    	const prefixes = {'-' : '__', '_': '_'};
    	return (...args) => args
    		.filter(a => a || a === '')
    		.map(a => {
    			if (a === '') {
    				a = name;
    			} else if (a.charAt(0) in prefixes) {
    				a = name + prefixes[a.charAt(0)] + a.slice(1);
    			}
    			return a;
    		})
    		.join(' ');
    }
};

function isPlainObject(obj) {
    return obj && typeof obj === 'object' && !Array.isArray(obj) && !('nodeType' in obj);
}