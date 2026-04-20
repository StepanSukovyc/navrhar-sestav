var _ = function () {
    document.body.innerHTML = '<h1>jres:25000155</h1>jres:25000156';  

    if (sessionStorage.getItem("fallback2024redirect") !== "1") { // obrana proti nekonecnemu zacykleni, kdyby redirect z nejakeho duvodu opet volal cached verzi stranky
        sessionStorage.setItem("fallback2024redirect", "1");

        (async function (url) {
            await fetch(url, {
                headers: {
                    Pragma: 'no-cache',
                    Expires: '-1',
                    'Cache-Control': 'no-cache',
                },
            });
            window.location.href = url;
            window.location.reload();
        })(window.location.href);
    }  
        
}

if (document.body) _();
else document.addEventListener('DOMContentLoaded', _);

if (typeof GINISLoader !== 'undefined') GINISLoader.prototype.ready = function () { }; 