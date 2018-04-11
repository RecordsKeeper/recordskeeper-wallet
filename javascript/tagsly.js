(function($) {

  $.fn.tagsly = function(params) {
    // Split tags when comma or space is pressed
    var SPLIT_ON = [13, 188];
    // Remove the previous tag when backspace is pressed
    var REMOVE_ON = [8];

    var suggestions;
    if (params && params['suggestions']) {
      suggestions = params['suggestions'];
    }
    
    var suggestOnFocus = params && params['suggestOnFocus'];

    var maxItems;
    if (params && params['maxItems']) {
      maxItems = params['maxItems'];
    }

    var maxItemSize;
    if (params && params['maxItemSize']) {
      maxItemSize = params['maxItemSize'];
    }

    var placeholder = '';
    if (params && params['placeholder']) {
      placeholder = params['placeholder'];
    }

    // Create the wrapper
    var wrapper = $('<div/>', {
      'class': 'tagsly'
    });

    // Create the textbox
    var input = $('<input/>', {
      'type': 'text',
      'class': 'tag-textbox',
    });
    input.prop('placeholder', placeholder);
    if (maxItemSize) {
      input.prop('maxlength', maxItemSize);
    }

    var suggest = $('<ul/>', {
      'class': 'suggest'
    });

    // Keep track of the text input to store the comma separated values
    var backing = this;

    var items = 0;

    function split() {
      var value = input.val();

      // If empty don't create a tag
      if (value == '') {
        return;
      }

      if (maxItems && items >= maxItems) {
        return;
      }

      // Build and add the tag span
      var tag =  $('<span/>', {
        'class': 'tag',
        'text': value,
        'tabindex': '-1'
      });
      var close = $('<a/>', {
        'text': 'x',
        'href': '#',
        'tabindex': '-1'
      });
      close.click(function() {
        remove(tag);
      });
      tag.append(close);
      input.before(tag);

      // Reset the textbox
      input.val('');

      // Add the text to the backing textbox
      backing.val(function(i, val) { 
        return val + (val ? ',' : '') + value;
      });

      suggest.hide();
      suggest.offset({ left: input.position().left });

      items++;
      if (maxItems && items >= maxItems) {
        input.prop('disabled', true);
        input.prop('placeholder', '');
      }
    }

    function remove(tag) {
      // Remove the tag from the DOM
      tag.find('a').remove();
      var value = tag.text();
      tag.remove();
      input.focus();

      // Remove the text from the backing textbox
      var tags = backing.val().split(',');
      tags = tags.map(function(e) {
        return e.trim();
      });
      tags.splice(tags.indexOf(value), 1);
      backing.val(tags.join(','));

      suggest.hide();
      suggest.offset({ left: input.position().left });

      items--;
      if (maxItems && items < maxItems) {
        input.prop('disabled', false);
        input.prop('placeholder', placeholder);
      }
    }

    input.focus(function(e) {
      if (suggestOnFocus) {
        triggerSuggestionRequest();
      }
    });

    input.focusout(function(e) {
      split();
      suggest.hide();
    });

    input.keydown(function(e) {
      if (SPLIT_ON.indexOf(e.which) != -1) {
        split();
        return false;
      }
      if (REMOVE_ON.indexOf(e.which) != -1) {
        if (input.val() == '') {
          remove(input.prev());
          return false;
        }
      }
      if (e.which == 38) {
        // Up arrow key
        var active = suggest.find('li.active');
        var activate;
        if (active.length > 0) {
          activate = active.prev();
          active.removeClass('active');
        } else {
          activate = suggest.children().last();
        }
        activate.addClass('active');
        input.val(activate.text());
        return false;
      }
      if (e.which == 40) {
        // Down arrow key
        var active = suggest.find('li.active');
        var activate;
        if (active.length > 0) {
          activate = active.next();
          active.removeClass('active');
        } else {
          activate = suggest.children().first();
        }
        activate.addClass('active');
        input.val(activate.text());
        return false;
      }
      if (e.which == 27) {
        suggest.hide();
      }
    });

    input.on('input', triggerSuggestionRequest);

    var lastSuggestionAt = 0;
    function triggerSuggestionRequest() {
      if (suggestions) {
        var now = new Date();
        suggestions(input.val(), function(results) {
          if (lastSuggestionAt < now) {
            showSuggestions(results);
            lastSuggestionAt = now;
          }
        });
      }
    }

    function showSuggestions(items) {
      suggest.show();
      suggest.empty();
      for (var i = 0; i < items.length; i++) {
        var suggestion = $('<li/>', {
          'text': items[i]
        });
        suggestion.mousedown(function(e) {
          input.val($(this).text());
          split();
          setTimeout(function() { 
            input.focus(); 
          }, 0);
        });
        suggest.append(suggestion);
      }
    }

    // Throw a wrapper around the targeted input and hide it
    this.wrap(wrapper);
    this.parent().append(input);
    this.parent().append(suggest);
    this.parent().click(function() {
      input.focus();
    });
    this.hide();

    var initial = this.val();
    if (initial.length > 0) {
      this.val('');
      initial = initial.split(',');
      for (var i = 0; i < initial.length; i++) {
        input.val(initial[i]);
        split();
      }
    }

    // For chaining
    return this;
  };

})(jQuery);
