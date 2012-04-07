scrolloffset = 0
scrolltiming = 0

$(document).ready(->
    filterpath = (string) ->
        string.replace(/^\//,'')
        .replace(/(index|default).[a-zA-Z]{3,4}$/,'')
        .replace(/\/$/,'')
        
    locationPath = filterPath(location.pathname)
    scrollElem = scrollableElement('html', 'body')
    
    $('a[href*=#]').each(->
        thisPath = filterPath(this.pathname) or locationPath;
        
        if locationPath is thisPath and location.hostname is this.hostname or !this.hostname
            
        
    )
)