/*jslint devel: true, evil: true*/
/*globals define, console, document, head*/

(function (global) {
    'use strict';

    define(function () {

        function loadScript(url, onLoaded, onFailed) {
            var script = document.createElement('script');

            if (onLoaded) {
                script.onload = onLoaded;
            }

            if (onFailed) {
                script.onerror = onFailed;
            }

            script.async = 'async';
            script.src = url;
            document.head.insertBefore(script, head.firstChild);
        }

        function Request(options) {

            if (!options || typeof options !== 'object') {
                throw new Error('[ajax > Request constructor] argument "options" is not an object');
            }

            this.xhrObject = null;
            this.done = false;
            this.timeout = 30000;
            this.timeoutID = null;

            this.options = {
                url: options.url || document.URL,
                withCredentials: options.withCredentials || false,
                XRequestedWith: options.XRequestedWith || false,
                // Data to send. Could be as Array, Object or String
                dontSerializeData: options.dontSerializeData || false,
                data: options.data || '',
                // Details: http://www.w3.org/TR/XMLHttpRequest/#the-open-method
                method: (options.method) ? options.method.toUpperCase() : 'GET',
                async: options.async || true,
                cache: options.cache || false,
                // dataType can be html, json, jsonp, script, or text
                dataType: options.dataType || 'json',
                // Set to false if you want to parse respond based on your type of response
                dataTypeFromHeader: options.dataTypeFromHeader || true,
                // The content types that are acceptable for the response. It is the responsibility of the server to consider this requirement.
                acceptContentType: options.acceptContentType || null,
                // Used only in POST method.
                // This overrides the default header sent to the server and lets the
                // server know we're going to be sending the data as a POST.
                postDataType: options.postDataType || 'application/x-www-form-urlencoded',
                user: options.user || null,
                password: options.password || null,
                success: (typeof options.success === 'function') ? options.success : String,
                error: (typeof options.error === 'function') ? options.error : String,
                cancel: (typeof options.cancel === 'function') ? options.cancel : String
            };

            this.createXHRobject();
            this.make(options);
            return this;
        }

        // Details: https://developer.mozilla.org/en-US/docs/DOM/XMLHttpRequest?redirectlocale=en-US&redirectslug=XMLHttpRequest#Properties
        Request.prototype.HTTP_RESPONSE = {
            unsent: 0,
            opened: 1,
            headers_received: 2,
            loading: 3,
            completed: 4
        };

        // HTTP response codes: https://developer.mozilla.org/en-US/docs/Web/HTTP/Response_codes
        Request.prototype.HTTP_STATUS = {
            OK: 200,
            FAILED_EXPR: /\b[45]\d\d\b/
        };

        Request.prototype.createXHRobject = function () {
            if (global.XMLHttpRequest) {
                this.xhrObject = new global.XMLHttpRequest();
            } else if (global.ActiveXObject) {
                this.xhrObject = new global.ActiveXObject('Microsoft.XMLHTTP');
            } else {
                throw new Error('XMLHttpRequest not supported');
            }

            return this.xhrObject;
        };

        Request.prototype.make = function (options) {
            var self = this,
                xhr = this.xhrObject,
                hashIndex;

            // JSONP section
            if (options.dataType === 'jsonp') {
                options.url = options.url + (/\?/.test(options.url) ? '&' : '?') + (options.jsonpCallback || 'jscodejsonp' + (+new Date())) + '=';
                return this.jsonp(options);
            }

            // Drop <fragment> from url. URL fragment (the part after the #) is not sent to the server. See: http://www.w3.org/TR/XMLHttpRequest/#the-open-method, point 7
            hashIndex = options.url.indexOf('#');

            if (hashIndex > 0) {
                options.url = options.url.substring(0, hashIndex);
            }

            if (options.method === 'GET' && options.data) {
                options.url = options.url + (/\?/.test(options.url) ? '&' : '?') + this.serializeObject(options.data);
            }

            if (!options.dontSerializeData) {
                options.data = this.serializeObject(options.data);
            }

            try {
                // , options.async, options.user, options.password
                xhr.open(options.method, options.url);
            } catch (errorThrown) {
                options.error(xhr, xhr.statusText, errorThrown);
                return false;
            }

            if (options.acceptContentType) {
                xhr.setRequestHeader('Accept', options.acceptContentType);
            }

            /*
             * According to the CORS spec (http://www.w3.org/TR/cors/),
             * any Content-Type other than application/x-www-form-urlencoded,
             * multipart/form-data, or text/plain triggers the preflight.
             */
            xhr.setRequestHeader('Content-Type', this.options.postDataType);

            // Some info for server so that it can be identified as a AJAX request
            if (options.XRequestedWith) {
                xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            }

            if (options.overrideMimeType && xhr.overrideMimeType) {
                xhr.overrideMimeType(options.overrideMimeType);
            }

            if (options.withCredentials && this.isWithCredentials()) {
                xhr.withCredentials = true;
            }

            if (options.cache && options.method === 'GET' && (options.dataType !== 'script')) {
                // According to http://www.w3.org/Protocols/rfc2616/rfc2616-sec3.html#sec3.3.1
                xhr.setRequestHeader('If-Modified-Since', 'Sat, 01 Jan 1990 00:00:00 GMT');
                xhr.setRequestHeader('Cache-Control', 'no-cache');
            }

            function stateChange() {

                var xhrResponse,
                    returnData,
                    contentType,
                    statusText;

                if (xhr.readyState === self.HTTP_RESPONSE.completed && xhr.getResponseHeader('Content-Type') !== null) {

                    contentType = xhr.getResponseHeader('Content-Type').toLowerCase();
                    statusText = xhr.statusText || '';

                    if (xhr.status === self.HTTP_STATUS.OK) {

                        self.done = true;
                        xhr.onreadystatechange = null;
                        xhrResponse = xhr.responseText;

                        if (xhrResponse) {

                            if ((!options.dataTypeFromHeader && options.dataType === 'json') || (contentType.indexOf('json') !== -1)) {

                                try {
                                    returnData = global.JSON.parse(xhrResponse);
                                } catch (errorThrown) {
                                    options.error(xhr, '[Request.prototype.stateChange] Could not parse JSON in response', errorThrown);
                                }

                            } else if ((!options.dataTypeFromHeader && options.dataType === 'javascript') || (/(ecma|java)script/).test(contentType)) {

                                try {
                                    self.executeScript(xhrResponse);
                                } catch (errorThrown) {
                                    options.error(xhr, 'There was an error in the script file.', errorThrown);
                                }
                            } else {
                                returnData = xhrResponse;
                            }
                        }

                        global.clearTimeout(self.timeoutID);
                        options.success(returnData, statusText, xhr);

                    } else if (self.HTTP_STATUS.FAILED_EXPR.test(xhr.status)) {

                        global.clearTimeout(self.timeoutID);
                        options.error(xhr, xhr.statusText);
                    }
                }
            }

            function abort() {
                if (!self.done) {
                    self.done = true;
                    global.clearTimeout(self.timeoutID);
                    xhr.onreadystatechange = null;
                    xhr.abort();
                    self.options.cancel(xhr, xhr.statusText);
                }
            }

            xhr.onreadystatechange = stateChange;

            try {

                if (/POST|PUT/.test(options.method)) {
                    xhr.send(options.data);
                } else {
                    xhr.send();
                }

                if (!this.done) {
                    this.timeoutID = global.setTimeout(abort, this.timeout);
                }
            } catch (errorThrown) {
                xhr.onreadystatechange = null;
                this.done = true;
                options.error(xhr, xhr.statusText, errorThrown);
                return false;
            }

        };

        /**
         * @method
         * Serialize object
         * @param {Object} obj Serialize object to URL param and value (key=value&key1=value1[...]).
         */

        Request.prototype.serializeObject = function (obj, prefix) {

            var str = [],
                key,
                paramKey,
                val;

            for (key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    paramKey = prefix ? prefix + '[' + key + ']' : key;
                    val = obj[key];

                    if (typeof val === 'object') {
                        if (val !== null && val !== undefined) {
                            str[str.length] = this.serializeObject(val, paramKey);
                        }
                    } else {
                        str[str.length] = (paramKey + '=' + this.global.encodeURIComponent(String(val)));
                    }
                }
            }

            return str.join('&');
        };

        /**
         * @method serializeForm
         * Collection of data from given <form>
         */

        Request.prototype.getOptionValue = function (o) {
            return (o.value || (o.hasAttribute('value') ? o.value : o.text));
        };

        Request.prototype.serializeForm = function (f) {
            var elms = f.elements,
                i,
                iLen = elms.length,
                j,
                jLen,
                result = [],
                elm,
                optElm,
                nameAttr,
                elmType,
                reCheck = new RegExp('^(checkbox|radio)$'),
                reText = new RegExp('^(text|password|hidden|textarea)$'),
                add = function (n, v) {
                    result[result.length] = this.encodeUrlParam(n) + '=' + this.encodeUrlParam(v);
                };

            for (i = 0; i < iLen; i += 1) {
                elm = elms[i];
                nameAttr = elm.name;

                if (nameAttr && (elm.getAttribute('disabled') !== 'disabled' || elm.getAttribute('disabled') === false)) {
                    elmType = elm.type;

                    if (reText.test(elmType)) {
                        add(nameAttr, elm.value);
                    } else if (reCheck.test(elmType)) {
                        if (elm.checked) {
                            add(nameAttr, elm.value || 'on');
                        }
                    } else if (elmType.indexOf('select') !== -1) {
                        if (elm.multiple === false) {
                            if (elm.selectedIndex >= 0) {
                                add(nameAttr, this.getOptionValue(elm.options[elm.selectedIndex]));
                            }
                        } else {
                            jLen = elm.options.length;
                            for (j = 0; j < jLen; j += 1) {
                                optElm = elm.options[j];
                                if (optElm.selected) {
                                    add(nameAttr, this.getOptionValue(optElm));
                                }
                            }
                        }
                    }
                }
            }

            return result.join('&');
        };

        Request.prototype.xmlParser = (function () {
            var parseXMLstring,
                parser,
                xml;

            if (global.DOMParser) {
                parseXMLstring = function (s) {
                    parser = new global.DOMParser();
                    xml = parser.parseFromString(s, 'text/xml');
                    return xml;
                };
            } else if (global.ActiveXObject) {
                parseXMLstring = function (s) {
                    xml = new global.ActiveXObject('Microsoft.XMLDOM');
                    xml.async = false;
                    xml.loadXML(s);
                };
            }

            return parseXMLstring;
        }());

        Request.prototype.isWithCredentials = function () {
            return this.xhrObject.withCredentials !== undefined;
        };

        Request.prototype.encodeUrlParam = function (urlParam, options) {
            if (typeof urlParam !== 'string') {
                return '';
            }

            urlParam = global.encodeURIComponent(urlParam).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A');

            if (options.encodeSpace) {
                urlParam = urlParam.replace(/%20/g, '+');
            }

            return urlParam;
        };

        Request.prototype.decodeUrlParam = function (s) {
            if (typeof s !== 'string') {
                return '';
            }
            return global.decodeURIComponent(s.replace(/\+/g, '%20'));
        };

        Request.prototype.executeScript = function (str) {
            var s = document.createElement('script');
            s.text = str;
            document.body.appendChild(s);
            s.parentElement.removeChild(s);
        };

        // Shortcuts for XMLHttpRequest methods

        Request.send = function (options) {
            return new Request(options);
        };

        Request.jsonp = function (options) {

            var url,
                params,
                timeout,
                callbackName,
                retry,
                success,
                error,
                noop = function () {
                    return;
                };

            options = options || {};

            console.log('[http / jsonp]', options.url, options.data);

            callbackName = options.jsonpCallback || 'jsonp' + (+new Date());
            params = (options.data ? this.serializeObject(options.data) + '&' : '') + (options.jsonp || 'callback') + '=' + callbackName;
            url = options.url + (/\?/.test(options.url) ? '&' : '?') + params;

            retry = function () {
                console.log('[http / jsonp] retrying:', options);
                options.retry -= 1;
                if (typeof options.retryCallback === 'function') {
                    options.retryCallback(options.retry);
                }
                Request.jsonp(options);
            };

            success = function (args) {
                if (global[callbackName]) {
                    global[callbackName] = null;
                }
                global.clearTimeout(timeout);
                options.success.apply(null, args);
            };

            error = function () {
                if (global[callbackName]) {
                    global[callbackName] = null;
                }
                global.clearTimeout(timeout);
                if (options.retry > 0) {
                    console.warn('[http / jsonp] retry:', options.retry);
                    retry();
                } else {
                    console.error('[http / jsonp] error');
                    if (typeof options.error === 'function') {
                        options.error();
                    }
                }
            };

            global[callbackName] = function () {
                console.log('[http / jsonp] response:', arguments);
                if (arguments.length === 0) {
                    error();
                } else {
                    success(arguments);
                }
            };

            console.log('[http / jsonp] url:', url);

            loadScript(url, noop, error);
            timeout = global.setTimeout(error, options.timeout || 20000);
        };

        function JsonpException(message) {
            this.name = 'JsonpException';
            this.message = message || '';
        }

        JsonpException.prototype = Error.prototype;

        return Request;
    });

}(this));
