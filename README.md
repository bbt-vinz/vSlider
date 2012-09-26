# vSlider - dynamic slider / carousel plugin

vSlider (current version: 2.0.1) is a flexible and dynamic carousel/slider plugin. 

It is designed to help you build a slideshow with ease. The plugin currently supports sliding transtions. 

It has most of the necessary features such as pagination, navigation (previous and next to navigate around carousel and/or each slide). 

The main goal for this plugin is to have, if not all, most of the control over the markup and html structure each time user creates a slideshow. 

The plugin has been tested and supports most of the major browsers - Firefox/Safari/Chrome and IE7+ 
 
NOTE: It is required to have [Modernizr](2.0.6+) and [jQuery](1.7+) installed prior to include this plugin. 

[jQuery]: http://www.jquery.com 
[Modernizr]: http://www.modernizr.com 

## Options 

Current options are listed below for the 2.0.1 release: 

* `itemsperslide`: user can specify the amount of images vslider will slide each time.
* `spacing`: user can specify spacing between images (in pixel). 
* `auto`: slides between images automatically. (true if value is more than 0 (in millisecond)). 
* `title`: displays title of the image. 
* `description`: displays description of the image. 
* `divider`: appends divider to each slide. 

## Implementation 

First, make sure to include Modernizr and jQuery inside <head>:

```js
<script type="text/javascript" src="https://raw.github.com/Modernizr/Modernizr/master/modernizr.js"></script>
<script type="text/javascript" src="http://code.jquery.com/jquery-1.8.2.min.js"></script>
```

Then include css for the vSlider inside the <head>:

```css
<link rel="icon" type="image/x-icon" href="https://raw.github.com/bbt-vinz/vSlider/master/vslider-2.0.1.css" />
```

Below is the basic HTML structures. User can rearrange order of the structurse in any way they want but only to make sure they stay inside the div.vslider. You can put this anywhere inside the <body>.

```html
<div class="vslider">
        <div class="prev-pane unselectable"></div> 
        <div class="next-pane unselectable"></div>
        <div class="img-pane unselectable">
           <img src="[vslider:default-img]" alt=""/> 
        </div>
        <div class="controls">
            <div class="navigation">
                <div class="screen">
                     [vslider:thumbs]
                </div>
            </div>
            <div class="prev unselectable"></div>
            <div class="next unselectable"></div>
        </div>
        <!--pagination-->
        <nav class="pagination">
           <ul></ul>
           <div class="clear"></div>
        </nav>
        <div class="info-pane"><h2></h2><span></span></div>
</div>
``` 

Here's the simple call function:

```js 
$( element ).vSlider( options ); 
``` 
