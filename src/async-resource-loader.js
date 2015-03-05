AsyncResourceLoader = {
    defaultTimeout: 1000,
    loadJs: function (resource, timeout, success, error) {
        var requestTimeOut = timeout ? timeout : this.defaultTimeout;
        $.ajax(resource, {
            timeout: requestTimeOut,
            success: function (resp) {
                var jsLink = $("<script type='text/javascript'>");
                jsLink.append(resp.data);
                $("head").append(jsLink);
                success();
            },
            error: function () {
                error();
            }
        });
    },
    loadCss: function (resource, timeout, success, error) {
        var requestTimeOut = timeout ? timeout : this.defaultTimeout;
        $.ajax(resource, {
            timeout: requestTimeOut,
            success: function (resp) {
                $("<style></style>").appendTo("head").html(resp);
                if (success) {
                    success();
                }
            },
            error: function () {
                if (error) {
                    error();
                }
            }
        });
    },
    loadResources: function (data) {
        if (!data || !data.resources) {
            return;
        }

        var timeout = data.timeout ? data.timeout : this.timeout;
        var count = data.resources.length;

        var runtime = {
            count : count,
            completed : false,
            resourceLoadCompleted : function() {
                this.count--;
                if (this.count === 0) {
                    this.success();
                }
            },
            resourceLoadFailed : function() {
                this.error();
            },
            success: function() {
                if (!this.completed && data.success) {
                    this.completed = true;
                    data.success();
                }
            },
            error: function() {
                if (!this.completed && data.error) {
                    this.completed = true;
                    data.error();
                }
            }
        };

        var self = this;

        data.resources.forEach(function(resource) {
            if (resource.type === 'css') {
                self.loadCss(resource.url,
                    timeout,
                    runtime.resourceLoadCompleted.bind(runtime),
                    runtime.resourceLoadFailed.bind(runtime));
            }
            else if (resource.type === 'js') {
                self.loadJs(resource.url,
                    timeout,
                    runtime.resourceLoadCompleted.bind(runtime),
                    runtime.resourceLoadFailed.bind(runtime));
            }
            else {
                runtime.error();
            }
        });
    }
};