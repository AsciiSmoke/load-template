[See Miketimmerman's Original Plugin](https://github.com/miketimmerman/load-template)

# Load template with jQuery helper
This forked version of Mike Timmerman's load-template plugin allows you to define a sub-template in markup and have it loaded automatically.


# How to use it?
Refer to Mike's documentation for an understanding of the base plugin

To define your sub-template in markup add it to your mustache / handlebars template like this

    <template type="handlebars" name="[name of the template]"
    data-src="[path to the template]"
    data-options="[JSON String of template data]"></template>
    
<br/>
# Example usage:
<br/>
Sub-Template file contents (find-out-more-button.handlebars):

    {{#.}}
        <a href="{{href}}" target="{{target}}" id="{{ID}}" class="secondary-btn {{css}}"
            {{{atts}}}><span>{{text}}{{^text}}Find out more{{/text}}</span></a>
    {{/.}}
    

<br/>
Parent-file contents:

    {{#.}}
        <div class="innerSpacing {{css}}" id="{{ID}}">
            <div class="signpost">{{signpost}}</div>
            
            <a class="Heading" href="{{href}}">{{linktext}}</a>
            
            <div class="Description">
                {{description}}
            </div>
            
            <template type="handlebars" name="find-out-more-button"
                      data-src="/find-out-more-button.handlebars"
                      data-options="{'href': 'http://www.google.co.uk', 'text': 'click me!!!'}"></template>
        </div>
    {{/.}}
