(function (SubTemplater, $) {

    var LoadTemplate = function (selector, template, data) {

        this.selector = selector;

        // Store template name and data.
        this.tempName = template;
        this.data = data || null;

    };

    LoadTemplate.prototype.create = function (callback) {
        var req = new XMLHttpRequest();
        var that = this;

        // check if the file name already has an extension.
        if (
            this.tempName.indexOf('.handlebars', this.length - '.handlebars'.length) === -1
            && this.tempName.indexOf('.mustache', this.length - '.mustache'.length) === -1
        ) {
            this.tempName += '.handlebars';
        }

        req.open('get', this.tempName, true);

        // Wait for request to complete.
        req.onreadystatechange = function () {
            if (req.readyState == 4 && req.status == 200) {
                //Compile HB template, add data (if defined) and place in parent element.
                var compiled = Handlebars.compile(req.response);
                $(that.selector).replaceWith(compiled(that.data));

                // Execute callback function
                if (typeof callback === "function") {
                    callback();
                }
            }
        };

        // Send request.
        req.send();
    };

    LoadTemplate.prototype.createAndWait = function (callback) {
        var req = new XMLHttpRequest();
        var that = this;

        // Define parameters for request.
        req.open('get', this.tempName + '.handlebars', true);

        // Wait for request to complete.
        req.onreadystatechange = function () {
            if (req.readyState == 4 && req.status == 200) {
                //Compile HB template, but wait..
                var compiled = Handlebars.compile(req.response);

                // Execute callback function and parse variables.
                callback(compiled, that.selector);
            }
        };

        // Send request.
        req.send();
    };

    // Wait until document.ready is finished
    $(window).load(function () {
        $("template[type='handlebars']").each(function (i, e) {
            var $e = $(e);
            var name = 'Template[name="' + $e.attr("name") + '"]';
            var src = $e.data("src");
            var options = $e.data("options").replace("'", '"');
            new LoadTemplate(name, src, options).create();
        });
    });

}(window.SubTemplater = window.SubTemplater || {}, jQuery));
