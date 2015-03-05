# Async JS/CSS loader
A JS library to asynchronously load JS and CSS resources

### Dependencies
AsyncResourceLoader requires jQuery.
```javascript
<script src="//code.jquery.com/jquery-1.11.2.min.js"></script>
```

### How to load JS files

```javascript
AsyncResourceLoader.loadJs(fileLocation);
```

or load it with 2000 ms timeout

```javascript
AsyncResourceLoader.loadJs(fileLocation, 2000);
```

or load it with a timeout and **success** and **error** handlers:

```javascript
AsyncResourceLoader.loadJs(fileLocation, 2000, success, error);
```
### How to load CSS files

CSS files might be loaded as JS ones

```javascript
AsyncResourceLoader.loadCss(fileLocation);
AsyncResourceLoader.loadCss(fileLocation, 2000);
AsyncResourceLoader.loadCss(fileLocation, 2000, success, error);
```

### How to load multiple files with one shot

```javascript
AsyncResourceLoader.loadResources({
            timeout: 5000,
            resources: [
                {
                    url: 'sample.css',
                    type: 'css'
                },
                {
                    url: 'sample.js',
                    type: 'js'
                }
            ],
            success: function () {
                console.log("All the files are loaded successfully");
            },
            error: function () {
                console.log("An error occurred while loading JS/CSS resources");
            }
        });
```

If all the files are loaded then **success** event is triggered. If there are 
any issues with loading at least one file or timeout comes then **error** event is triggered.
