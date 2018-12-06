/*!
 * bootstrap-tokenfield
 * https://github.com/sliptree/bootstrap-tokenfield
 * Copyright 2013-2014 Sliptree and other contributors; Licensed MIT
 */

(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    // For CommonJS and CommonJS-like environments where a window with jQuery
    // is present, execute the factory with the jQuery instance from the window object
    // For environments that do not inherently posses a window with a document
    // (such as Node.js), expose a Tokenfield-making factory as module.exports
    // This accentuates the need for the creation of a real window or passing in a jQuery instance
    // e.g. require("bootstrap-tokenfield")(window); or require("bootstrap-tokenfield")(jQuery);
    module.exports = global.window && global.window.jQuery ?
      factory( global.window.jQuery ) :
      function( input ) {
        if ( !input.jQuery && !input.fn ) {
          throw new Error( "Tokenfield requires a window object with jQuery or a jQuery instance" );
        }
        return factory( input.jQuery || input );
      };
  } else {
    // Browser globals
    factory(jQuery, window);
  }
}(function (jQuery, window) {

  "use strict"; // jshint ;_;

 /* TOKENFIELD PUBLIC CLASS DEFINITION
  * ============================== */

  var Tokenfield = function (element, options) {
    var _self = this

    this.jQueryelement = jQuery(element)
    this.textDirection = this.jQueryelement.css('direction');

    // Extend options
    this.options = jQuery.extend(true, {}, jQuery.fn.tokenfield.defaults, { tokens: this.jQueryelement.val() }, this.jQueryelement.data(), options)

    // Setup delimiters and trigger keys
    this._delimiters = (typeof this.options.delimiter === 'string') ? [this.options.delimiter] : this.options.delimiter
    this._triggerKeys = jQuery.map(this._delimiters, function (delimiter) {
      return delimiter.charCodeAt(0);
    });
    this._firstDelimiter = this._delimiters[0];

    // Check for whitespace, dash and special characters
    var whitespace = jQuery.inArray(' ', this._delimiters)
      , dash = jQuery.inArray('-', this._delimiters)

    if (whitespace >= 0)
      this._delimiters[whitespace] = '\\s'

    if (dash >= 0) {
      delete this._delimiters[dash]
      this._delimiters.unshift('-')
    }

    var specialCharacters = ['\\', 'jQuery', '[', '{', '^', '.', '|', '?', '*', '+', '(', ')']
    jQuery.each(this._delimiters, function (index, character) {
      var pos = jQuery.inArray(character, specialCharacters)
      if (pos >= 0) _self._delimiters[index] = '\\' + character;
    });

    // Store original input width
    var elRules = (window && typeof window.getMatchedCSSRules === 'function') ? window.getMatchedCSSRules( element ) : null
      , elStyleWidth = element.style.width
      , elCSSWidth
      , elWidth = this.jQueryelement.width()

    if (elRules) {
      jQuery.each( elRules, function (i, rule) {
        if (rule.style.width) {
          elCSSWidth = rule.style.width;
        }
      });
    }

    // Move original input out of the way
    var hidingPosition = jQuery('body').css('direction') === 'rtl' ? 'right' : 'left',
        originalStyles = { position: this.jQueryelement.css('position') };
    originalStyles[hidingPosition] = this.jQueryelement.css(hidingPosition);

    this.jQueryelement
      .data('original-styles', originalStyles)
      .data('original-tabindex', this.jQueryelement.prop('tabindex'))
      .css('position', 'absolute')
      .css(hidingPosition, '-10000px')
      .prop('tabindex', -1)

    // Create a wrapper
    this.jQuerywrapper = jQuery('<div class="tokenfield form-control" />')
    if (this.jQueryelement.hasClass('input-lg')) this.jQuerywrapper.addClass('input-lg')
    if (this.jQueryelement.hasClass('input-sm')) this.jQuerywrapper.addClass('input-sm')
    if (this.textDirection === 'rtl') this.jQuerywrapper.addClass('rtl')

    // Create a new input
    var id = this.jQueryelement.prop('id') || new Date().getTime() + '' + Math.floor((1 + Math.random()) * 100)
    this.jQueryinput = jQuery('<input type="'+this.options.inputType+'" class="token-input" autocomplete="off" />')
                    .appendTo( this.jQuerywrapper )
                    .prop( 'placeholder',  this.jQueryelement.prop('placeholder') )
                    .prop( 'id', id + '-tokenfield' )
                    .prop( 'tabindex', this.jQueryelement.data('original-tabindex') )

    // Re-route original input label to new input
    var jQuerylabel = jQuery( 'label[for="' + this.jQueryelement.prop('id') + '"]' )
    if ( jQuerylabel.length ) {
      jQuerylabel.prop( 'for', this.jQueryinput.prop('id') )
    }

    // Set up a copy helper to handle copy & paste
    this.jQuerycopyHelper = jQuery('<input type="text" />').css('position', 'absolute').css(hidingPosition, '-10000px').prop('tabindex', -1).prependTo( this.jQuerywrapper )

    // Set wrapper width
    if (elStyleWidth) {
      this.jQuerywrapper.css('width', elStyleWidth);
    }
    else if (elCSSWidth) {
      this.jQuerywrapper.css('width', elCSSWidth);
    }
    // If input is inside inline-form with no width set, set fixed width
    else if (this.jQueryelement.parents('.form-inline').length) {
      this.jQuerywrapper.width( elWidth )
    }

    // Set tokenfield disabled, if original or fieldset input is disabled
    if (this.jQueryelement.prop('disabled') || this.jQueryelement.parents('fieldset[disabled]').length) {
      this.disable();
    }

    // Set tokenfield readonly, if original input is readonly
    if (this.jQueryelement.prop('readonly')) {
      this.readonly();
    }

    // Set up mirror for input auto-sizing
    this.jQuerymirror = jQuery('<span style="position:absolute; top:-999px; left:0; white-space:pre;"/>');
    this.jQueryinput.css('min-width', this.options.minWidth + 'px')
    jQuery.each([
        'fontFamily',
        'fontSize',
        'fontWeight',
        'fontStyle',
        'letterSpacing',
        'textTransform',
        'wordSpacing',
        'textIndent'
    ], function (i, val) {
        _self.jQuerymirror[0].style[val] = _self.jQueryinput.css(val);
    });
    this.jQuerymirror.appendTo( 'body' )

    // Insert tokenfield to HTML
    this.jQuerywrapper.insertBefore( this.jQueryelement )
    this.jQueryelement.prependTo( this.jQuerywrapper )

    // Calculate inner input width
    this.update()

    // Create initial tokens, if any
    this.setTokens(this.options.tokens, false, ! this.jQueryelement.val() && this.options.tokens )

    // Start listening to events
    this.listen()

    // Initialize autocomplete, if necessary
    if ( ! jQuery.isEmptyObject( this.options.autocomplete ) ) {
      var side = this.textDirection === 'rtl' ? 'right' : 'left'
       ,  autocompleteOptions = jQuery.extend({
            minLength: this.options.showAutocompleteOnFocus ? 0 : null,
            position: { my: side + " top", at: side + " bottom", of: this.jQuerywrapper }
          }, this.options.autocomplete )

      this.$input.autocomplete( autocompleteOptions )
    }

    // Initialize typeahead, if necessary
    if ( ! jQuery.isEmptyObject( this.options.typeahead ) ) {

      var typeaheadOptions = this.options.typeahead
        , defaults = {
            minLength: this.options.showAutocompleteOnFocus ? 0 : null
          }
        , args = jQuery.isArray( typeaheadOptions ) ? typeaheadOptions : [typeaheadOptions, typeaheadOptions]

      args[0] = jQuery.extend( {}, defaults, args[0] )

      this.jQueryinput.typeahead.apply( this.jQueryinput, args )
      this.typeahead = true
    }
  }

  Tokenfield.prototype = {

    constructor: Tokenfield

  , createToken: function (attrs, triggerChange) {
      var _self = this

      if (typeof attrs === 'string') {
        attrs = { value: attrs, label: attrs }
      } else {
        // Copy objects to prevent contamination of data sources.
        attrs = jQuery.extend( {}, attrs )
      }

      if (typeof triggerChange === 'undefined') {
         triggerChange = true
      }

      // Normalize label and value
      attrs.value = jQuery.trim(attrs.value.toString());
      attrs.label = attrs.label && attrs.label.length ? jQuery.trim(attrs.label) : attrs.value

      // Bail out if has no value or label, or label is too short
      if (!attrs.value.length || !attrs.label.length || attrs.label.length <= this.options.minLength) return

      // Bail out if maximum number of tokens is reached
      if (this.options.limit && this.getTokens().length >= this.options.limit) return

      // Allow changing token data before creating it
      var createEvent = jQuery.Event('tokenfield:createtoken', { attrs: attrs })
      this.jQueryelement.trigger(createEvent)

      // Bail out if there if attributes are empty or event was defaultPrevented
      if (!createEvent.attrs || createEvent.isDefaultPrevented()) return

      var jQuerytoken = jQuery('<div class="token" />')
            .append('<span class="token-label" />')
            .append('<a href="#" class="close" tabindex="-1">&times;</a>')
            .data('attrs', attrs)

      // Insert token into HTML
      if (this.jQueryinput.hasClass('tt-input')) {
        // If the input has typeahead enabled, insert token before it's parent
        this.jQueryinput.parent().before( jQuerytoken )
      } else {
        this.jQueryinput.before( jQuerytoken )
      }

      // Temporarily set input width to minimum
      this.jQueryinput.css('width', this.options.minWidth + 'px')

      var jQuerytokenLabel = jQuerytoken.find('.token-label')
        , jQuerycloseButton = jQuerytoken.find('.close')

      // Determine maximum possible token label width
      if (!this.maxTokenWidth) {
        this.maxTokenWidth =
          this.jQuerywrapper.width() - jQuerycloseButton.outerWidth() -
          parseInt(jQuerycloseButton.css('margin-left'), 10) -
          parseInt(jQuerycloseButton.css('margin-right'), 10) -
          parseInt(jQuerytoken.css('border-left-width'), 10) -
          parseInt(jQuerytoken.css('border-right-width'), 10) -
          parseInt(jQuerytoken.css('padding-left'), 10) -
          parseInt(jQuerytoken.css('padding-right'), 10)
          parseInt(jQuerytokenLabel.css('border-left-width'), 10) -
          parseInt(jQuerytokenLabel.css('border-right-width'), 10) -
          parseInt(jQuerytokenLabel.css('padding-left'), 10) -
          parseInt(jQuerytokenLabel.css('padding-right'), 10)
          parseInt(jQuerytokenLabel.css('margin-left'), 10) -
          parseInt(jQuerytokenLabel.css('margin-right'), 10)
      }

      jQuerytokenLabel.css('max-width', this.maxTokenWidth)
      if (this.options.html)
        jQuerytokenLabel.html(attrs.label)
      else
        jQuerytokenLabel.text(attrs.label)

      // Listen to events on token
      jQuerytoken
        .on('mousedown',  function (e) {
          if (_self._disabled || _self._readonly) return false
          _self.preventDeactivation = true
        })
        .on('click',    function (e) {
          if (_self._disabled || _self._readonly) return false
          _self.preventDeactivation = false

          if (e.ctrlKey || e.metaKey) {
            e.preventDefault()
            return _self.toggle( jQuerytoken )
          }

          _self.activate( jQuerytoken, e.shiftKey, e.shiftKey )
        })
        .on('dblclick', function (e) {
          if (_self._disabled || _self._readonly || !_self.options.allowEditing ) return false
          _self.edit( jQuerytoken )
        })

      jQuerycloseButton
          .on('click',  jQuery.proxy(this.remove, this))

      // Trigger createdtoken event on the original field
      // indicating that the token is now in the DOM
      this.jQueryelement.trigger(jQuery.Event('tokenfield:createdtoken', {
        attrs: attrs,
        relatedTarget: jQuerytoken.get(0)
      }))

      // Trigger change event on the original field
      if (triggerChange) {
        this.jQueryelement.val( this.getTokensList() ).trigger( jQuery.Event('change', { initiator: 'tokenfield' }) )
      }

      // Update tokenfield dimensions
      var _self = this
      setTimeout(function () {
        _self.update()
      }, 0)

      // Return original element
      return this.jQueryelement.get(0)
    }

  , setTokens: function (tokens, add, triggerChange) {
      if (!add) this.jQuerywrapper.find('.token').remove()

      if (!tokens) return

      if (typeof triggerChange === 'undefined') {
          triggerChange = true
      }

      if (typeof tokens === 'string') {
        if (this._delimiters.length) {
          // Split based on delimiters
          tokens = tokens.split( new RegExp( '[' + this._delimiters.join('') + ']' ) )
        } else {
          tokens = [tokens];
        }
      }

      var _self = this
      jQuery.each(tokens, function (i, attrs) {
        _self.createToken(attrs, triggerChange)
      })

      return this.jQueryelement.get(0)
    }

  , getTokenData: function(jQuerytoken) {
      var data = jQuerytoken.map(function() {
        var jQuerytoken = jQuery(this);
        return jQuerytoken.data('attrs')
      }).get();

      if (data.length == 1) {
        data = data[0];
      }

      return data;
    }

  , getTokens: function(active) {
      var self = this
        , tokens = []
        , activeClass = active ? '.active' : '' // get active tokens only
      this.jQuerywrapper.find( '.token' + activeClass ).each( function() {
        tokens.push( self.getTokenData( jQuery(this) ) )
      })
      return tokens
  }

  , getTokensList: function(delimiter, beautify, active) {
      delimiter = delimiter || this._firstDelimiter
      beautify = ( typeof beautify !== 'undefined' && beautify !== null ) ? beautify : this.options.beautify

      var separator = delimiter + ( beautify && delimiter !== ' ' ? ' ' : '')
      return jQuery.map( this.getTokens(active), function (token) {
        return token.value
      }).join(separator)
  }

  , getInput: function() {
    return this.jQueryinput.val()
  }
      
  , setInput: function (val) {
      if (this.jQueryinput.hasClass('tt-input')) {
          // Typeahead acts weird when simply setting input value to empty,
          // so we set the query to empty instead
          this.jQueryinput.typeahead('val', val)
      } else {
          this.jQueryinput.val(val)
      }
  }

  , listen: function () {
      var _self = this

      this.jQueryelement
        .on('change',   jQuery.proxy(this.change, this))

      this.jQuerywrapper
        .on('mousedown',jQuery.proxy(this.focusInput, this))

      this.jQueryinput
        .on('focus',    jQuery.proxy(this.focus, this))
        .on('blur',     jQuery.proxy(this.blur, this))
        .on('paste',    jQuery.proxy(this.paste, this))
        .on('keydown',  jQuery.proxy(this.keydown, this))
        .on('keypress', jQuery.proxy(this.keypress, this))
        .on('keyup',    jQuery.proxy(this.keyup, this))

      this.jQuerycopyHelper
        .on('focus',    jQuery.proxy(this.focus, this))
        .on('blur',     jQuery.proxy(this.blur, this))
        .on('keydown',  jQuery.proxy(this.keydown, this))
        .on('keyup',    jQuery.proxy(this.keyup, this))

      // Secondary listeners for input width calculation
      this.jQueryinput
        .on('keypress', jQuery.proxy(this.update, this))
        .on('keyup',    jQuery.proxy(this.update, this))

      this.jQueryinput
        .on('autocompletecreate', function() {
          // Set minimum autocomplete menu width
          var jQuery_menuElement = jQuery(this).data('ui-autocomplete').menu.element

          var minWidth = _self.jQuerywrapper.outerWidth() -
              parseInt( jQuery_menuElement.css('border-left-width'), 10 ) -
              parseInt( jQuery_menuElement.css('border-right-width'), 10 )

          jQuery_menuElement.css( 'min-width', minWidth + 'px' )
        })
        .on('autocompleteselect', function (e, ui) {
          if (_self.createToken( ui.item )) {
            _self.jQueryinput.val('')
            if (_self.jQueryinput.data( 'edit' )) {
              _self.unedit(true)
            }
          }
          return false
        })
        .on('typeahead:selected typeahead:autocompleted', function (e, datum, dataset) {
          // Create token
          if (_self.createToken( datum )) {
            _self.jQueryinput.typeahead('val', '')
            if (_self.jQueryinput.data( 'edit' )) {
              _self.unedit(true)
            }
          }
        })

      // Listen to window resize
      jQuery(window).on('resize', jQuery.proxy(this.update, this ))

    }

  , keydown: function (e) {

      if (!this.focused) return

      var _self = this

      switch(e.keyCode) {
        case 8: // backspace
          if (!this.jQueryinput.is(document.activeElement)) break
          this.lastInputValue = this.jQueryinput.val()
          break

        case 37: // left arrow
          leftRight( this.textDirection === 'rtl' ? 'next': 'prev' )
          break

        case 38: // up arrow
          upDown('prev')
          break

        case 39: // right arrow
          leftRight( this.textDirection === 'rtl' ? 'prev': 'next' )
          break

        case 40: // down arrow
          upDown('next')
          break

        case 65: // a (to handle ctrl + a)
          if (this.jQueryinput.val().length > 0 || !(e.ctrlKey || e.metaKey)) break
          this.activateAll()
          e.preventDefault()
          break

        case 9: // tab
        case 13: // enter

          // We will handle creating tokens from autocomplete in autocomplete events
          if (this.jQueryinput.data('ui-autocomplete') && this.jQueryinput.data('ui-autocomplete').menu.element.find("li:has(a.ui-state-focus), li.ui-state-focus").length) break

          // We will handle creating tokens from typeahead in typeahead events
          if (this.jQueryinput.hasClass('tt-input') && this.jQuerywrapper.find('.tt-cursor').length ) break
          if (this.jQueryinput.hasClass('tt-input') && this.jQuerywrapper.find('.tt-hint').val() && this.jQuerywrapper.find('.tt-hint').val().length) break

          // Create token
          if (this.jQueryinput.is(document.activeElement) && this.jQueryinput.val().length || this.jQueryinput.data('edit')) {
            return this.createTokensFromInput(e, this.jQueryinput.data('edit'));
          }

          // Edit token
          if (e.keyCode === 13) {
            if (!this.jQuerycopyHelper.is(document.activeElement) || this.jQuerywrapper.find('.token.active').length !== 1) break
            if (!_self.options.allowEditing) break
            this.edit( this.jQuerywrapper.find('.token.active') )
          }
      }

      function leftRight(direction) {
        if (_self.jQueryinput.is(document.activeElement)) {
          if (_self.jQueryinput.val().length > 0) return

          direction += 'All'
          var jQuerytoken = _self.jQueryinput.hasClass('tt-input') ? _self.jQueryinput.parent()[direction]('.token:first') : _self.jQueryinput[direction]('.token:first')
          if (!jQuerytoken.length) return

          _self.preventInputFocus = true
          _self.preventDeactivation = true

          _self.activate( jQuerytoken )
          e.preventDefault()

        } else {
          _self[direction]( e.shiftKey )
          e.preventDefault()
        }
      }

      function upDown(direction) {
        if (!e.shiftKey) return

        if (_self.jQueryinput.is(document.activeElement)) {
          if (_self.jQueryinput.val().length > 0) return

          var jQuerytoken = _self.jQueryinput.hasClass('tt-input') ? _self.jQueryinput.parent()[direction + 'All']('.token:first') : _self.jQueryinput[direction + 'All']('.token:first')
          if (!jQuerytoken.length) return

          _self.activate( jQuerytoken )
        }

        var opposite = direction === 'prev' ? 'next' : 'prev'
          , position = direction === 'prev' ? 'first' : 'last'

        _self.jQueryfirstActiveToken[opposite + 'All']('.token').each(function() {
          _self.deactivate( jQuery(this) )
        })

        _self.activate( _self.jQuerywrapper.find('.token:' + position), true, true )
        e.preventDefault()
      }

      this.lastKeyDown = e.keyCode
    }

  , keypress: function(e) {

      // Comma
      if (jQuery.inArray( e.which, this._triggerKeys) !== -1 && this.jQueryinput.is(document.activeElement)) {
        if (this.jQueryinput.val()) {
          this.createTokensFromInput(e)
        }
        return false;
      }
    }

  , keyup: function (e) {
      this.preventInputFocus = false

      if (!this.focused) return

      switch(e.keyCode) {
        case 8: // backspace
          if (this.jQueryinput.is(document.activeElement)) {
            if (this.jQueryinput.val().length || this.lastInputValue.length && this.lastKeyDown === 8) break

            this.preventDeactivation = true
            var jQueryprevToken = this.jQueryinput.hasClass('tt-input') ? this.jQueryinput.parent().prevAll('.token:first') : this.jQueryinput.prevAll('.token:first')

            if (!jQueryprevToken.length) break

            this.activate( jQueryprevToken )
          } else {
            this.remove(e)
          }
          break

        case 46: // delete
          this.remove(e, 'next')
          break
      }
      this.lastKeyUp = e.keyCode
    }

  , focus: function (e) {
      this.focused = true
      this.jQuerywrapper.addClass('focus')

      if (this.jQueryinput.is(document.activeElement)) {
        this.jQuerywrapper.find('.active').removeClass('active')
        this.jQueryfirstActiveToken = null

        if (this.options.showAutocompleteOnFocus) {
          this.search()
        }
      }
    }

  , blur: function (e) {

      this.focused = false
      this.jQuerywrapper.removeClass('focus')

      if (!this.preventDeactivation && !this.jQueryelement.is(document.activeElement)) {
        this.jQuerywrapper.find('.active').removeClass('active')
        this.jQueryfirstActiveToken = null
      }

      if (!this.preventCreateTokens && (this.jQueryinput.data('edit') && !this.jQueryinput.is(document.activeElement) || this.options.createTokensOnBlur )) {
        this.createTokensFromInput(e)
      }

      this.preventDeactivation = false
      this.preventCreateTokens = false
    }

  , paste: function (e) {
      var _self = this

      // Add tokens to existing ones
      if (_self.options.allowPasting) {
        setTimeout(function () {
          _self.createTokensFromInput(e)
        }, 1)
      }
    }

  , change: function (e) {
      if ( e.initiator === 'tokenfield' ) return // Prevent loops

      this.setTokens( this.jQueryelement.val() )
    }

  , createTokensFromInput: function (e, focus) {
      if (this.jQueryinput.val().length < this.options.minLength)
        return // No input, simply return

      var tokensBefore = this.getTokensList()
      this.setTokens( this.jQueryinput.val(), true )

      if (tokensBefore == this.getTokensList() && this.jQueryinput.val().length)
        return false // No tokens were added, do nothing (prevent form submit)

      this.setInput('')

      if (this.jQueryinput.data( 'edit' )) {
        this.unedit(focus)
      }

      return false // Prevent form being submitted
    }

  , next: function (add) {
      if (add) {
        var jQueryfirstActiveToken = this.jQuerywrapper.find('.active:first')
          , deactivate = jQueryfirstActiveToken && this.jQueryfirstActiveToken ? jQueryfirstActiveToken.index() < this.jQueryfirstActiveToken.index() : false

        if (deactivate) return this.deactivate( jQueryfirstActiveToken )
      }

      var jQuerylastActiveToken = this.jQuerywrapper.find('.active:last')
        , jQuerynextToken = jQuerylastActiveToken.nextAll('.token:first')

      if (!jQuerynextToken.length) {
        this.jQueryinput.focus()
        return
      }

      this.activate(jQuerynextToken, add)
    }

  , prev: function (add) {

      if (add) {
        var jQuerylastActiveToken = this.jQuerywrapper.find('.active:last')
          , deactivate = jQuerylastActiveToken && this.jQueryfirstActiveToken ? jQuerylastActiveToken.index() > this.jQueryfirstActiveToken.index() : false

        if (deactivate) return this.deactivate( jQuerylastActiveToken )
      }

      var jQueryfirstActiveToken = this.jQuerywrapper.find('.active:first')
        , jQueryprevToken = jQueryfirstActiveToken.prevAll('.token:first')

      if (!jQueryprevToken.length) {
        jQueryprevToken = this.jQuerywrapper.find('.token:first')
      }

      if (!jQueryprevToken.length && !add) {
        this.jQueryinput.focus()
        return
      }

      this.activate( jQueryprevToken, add )
    }

  , activate: function (jQuerytoken, add, multi, remember) {

      if (!jQuerytoken) return

      if (typeof remember === 'undefined') var remember = true

      if (multi) var add = true

      this.jQuerycopyHelper.focus()

      if (!add) {
        this.jQuerywrapper.find('.active').removeClass('active')
        if (remember) {
          this.jQueryfirstActiveToken = jQuerytoken
        } else {
          delete this.jQueryfirstActiveToken
        }
      }

      if (multi && this.jQueryfirstActiveToken) {
        // Determine first active token and the current tokens indicies
        // Account for the 1 hidden textarea by subtracting 1 from both
        var i = this.jQueryfirstActiveToken.index() - 2
          , a = jQuerytoken.index() - 2
          , _self = this

        this.jQuerywrapper.find('.token').slice( Math.min(i, a) + 1, Math.max(i, a) ).each( function() {
          _self.activate( jQuery(this), true )
        })
      }

      jQuerytoken.addClass('active')
      this.jQuerycopyHelper.val( this.getTokensList( null, null, true ) ).select()
    }

  , activateAll: function() {
      var _self = this

      this.jQuerywrapper.find('.token').each( function (i) {
        _self.activate(jQuery(this), i !== 0, false, false)
      })
    }

  , deactivate: function(jQuerytoken) {
      if (!jQuerytoken) return

      jQuerytoken.removeClass('active')
      this.jQuerycopyHelper.val( this.getTokensList( null, null, true ) ).select()
    }

  , toggle: function(jQuerytoken) {
      if (!jQuerytoken) return

      jQuerytoken.toggleClass('active')
      this.jQuerycopyHelper.val( this.getTokensList( null, null, true ) ).select()
    }

  , edit: function (jQuerytoken) {
      if (!jQuerytoken) return

      var attrs = jQuerytoken.data('attrs')

      // Allow changing input value before editing
      var options = { attrs: attrs, relatedTarget: jQuerytoken.get(0) }
      var editEvent = jQuery.Event('tokenfield:edittoken', options)
      this.jQueryelement.trigger( editEvent )

      // Edit event can be cancelled if default is prevented
      if (editEvent.isDefaultPrevented()) return

      jQuerytoken.find('.token-label').text(attrs.value)
      var tokenWidth = jQuerytoken.outerWidth()

      var jQuery_input = this.jQueryinput.hasClass('tt-input') ? this.jQueryinput.parent() : this.jQueryinput

      jQuerytoken.replaceWith( jQuery_input )

      this.preventCreateTokens = true

      this.jQueryinput.val( attrs.value )
                .select()
                .data( 'edit', true )
                .width( tokenWidth )

      this.update();

      // Indicate that token is now being edited, and is replaced with an input field in the DOM
      this.jQueryelement.trigger(jQuery.Event('tokenfield:editedtoken', options ))
    }

  , unedit: function (focus) {
      var jQuery_input = this.jQueryinput.hasClass('tt-input') ? this.jQueryinput.parent() : this.jQueryinput
      jQuery_input.appendTo( this.jQuerywrapper )

      this.jQueryinput.data('edit', false)
      this.jQuerymirror.text('')

      this.update()

      // Because moving the input element around in DOM
      // will cause it to lose focus, we provide an option
      // to re-focus the input after appending it to the wrapper
      if (focus) {
        var _self = this
        setTimeout(function () {
          _self.jQueryinput.focus()
        }, 1)
      }
    }

  , remove: function (e, direction) {
      if (this.jQueryinput.is(document.activeElement) || this._disabled || this._readonly) return

      var jQuerytoken = (e.type === 'click') ? jQuery(e.target).closest('.token') : this.jQuerywrapper.find('.token.active')

      if (e.type !== 'click') {
        if (!direction) var direction = 'prev'
        this[direction]()

        // Was it the first token?
        if (direction === 'prev') var firstToken = jQuerytoken.first().prevAll('.token:first').length === 0
      }

      // Prepare events and their options
      var options = { attrs: this.getTokenData( jQuerytoken ), relatedTarget: jQuerytoken.get(0) }
        , removeEvent = jQuery.Event('tokenfield:removetoken', options)

      this.jQueryelement.trigger(removeEvent);

      // Remove event can be intercepted and cancelled
      if (removeEvent.isDefaultPrevented()) return

      var removedEvent = jQuery.Event('tokenfield:removedtoken', options)
        , changeEvent = jQuery.Event('change', { initiator: 'tokenfield' })

      // Remove token from DOM
      jQuerytoken.remove()

      // Trigger events
      this.jQueryelement.val( this.getTokensList() ).trigger( removedEvent ).trigger( changeEvent )

      // Focus, when necessary:
      // When there are no more tokens, or if this was the first token
      // and it was removed with backspace or it was clicked on
      if (!this.jQuerywrapper.find('.token').length || e.type === 'click' || firstToken) this.jQueryinput.focus()

      // Adjust input width
      this.jQueryinput.css('width', this.options.minWidth + 'px')
      this.update()

      // Cancel original event handlers
      e.preventDefault()
      e.stopPropagation()
    }

    /**
     * Update tokenfield dimensions
     */
  , update: function (e) {
      var value = this.jQueryinput.val()
        , inputPaddingLeft = parseInt(this.jQueryinput.css('padding-left'), 10)
        , inputPaddingRight = parseInt(this.jQueryinput.css('padding-right'), 10)
        , inputPadding = inputPaddingLeft + inputPaddingRight

      if (this.jQueryinput.data('edit')) {

        if (!value) {
          value = this.jQueryinput.prop("placeholder")
        }
        if (value === this.jQuerymirror.text()) return

        this.jQuerymirror.text(value)

        var mirrorWidth = this.jQuerymirror.width() + 10;
        if ( mirrorWidth > this.jQuerywrapper.width() ) {
          return this.jQueryinput.width( this.jQuerywrapper.width() )
        }

        this.jQueryinput.width( mirrorWidth )
      }
      else {
        //temporary reset width to minimal value to get proper results
        this.jQueryinput.width(this.options.minWidth);
        
        var w = (this.textDirection === 'rtl')
              ? this.jQueryinput.offset().left + this.jQueryinput.outerWidth() - this.jQuerywrapper.offset().left - parseInt(this.jQuerywrapper.css('padding-left'), 10) - inputPadding - 1
              : this.jQuerywrapper.offset().left + this.jQuerywrapper.width() + parseInt(this.jQuerywrapper.css('padding-left'), 10) - this.jQueryinput.offset().left - inputPadding;
        //
        // some usecases pre-render widget before attaching to DOM,
        // dimensions returned by jquery will be NaN -> we default to 100%
        // so placeholder won't be cut off.
        isNaN(w) ? this.jQueryinput.width('100%') : this.jQueryinput.width(w);
      }
    }

  , focusInput: function (e) {
      if ( jQuery(e.target).closest('.token').length || jQuery(e.target).closest('.token-input').length || jQuery(e.target).closest('.tt-dropdown-menu').length ) return
      // Focus only after the current call stack has cleared,
      // otherwise has no effect.
      // Reason: mousedown is too early - input will lose focus
      // after mousedown. However, since the input may be moved
      // in DOM, there may be no click or mouseup event triggered.
      var _self = this
      setTimeout(function() {
        _self.jQueryinput.focus()
      }, 0)
    }

  , search: function () {
      if ( this.jQueryinput.data('ui-autocomplete') ) {
        this.jQueryinput.autocomplete('search')
      }
    }

  , disable: function () {
      this.setProperty('disabled', true);
    }

  , enable: function () {
      this.setProperty('disabled', false);
    }

  , readonly: function () {
      this.setProperty('readonly', true);
    }

  , writeable: function () {
      this.setProperty('readonly', false);
    }

  , setProperty: function(property, value) {
      this['_' + property] = value;
      this.jQueryinput.prop(property, value);
      this.jQueryelement.prop(property, value);
      this.jQuerywrapper[ value ? 'addClass' : 'removeClass' ](property);
  }

  , destroy: function() {
      // Set field value
      this.jQueryelement.val( this.getTokensList() );
      // Restore styles and properties
      this.jQueryelement.css( this.jQueryelement.data('original-styles') );
      this.jQueryelement.prop( 'tabindex', this.jQueryelement.data('original-tabindex') );

      // Re-route tokenfield label to original input
      var jQuerylabel = jQuery( 'label[for="' + this.jQueryinput.prop('id') + '"]' )
      if ( jQuerylabel.length ) {
        jQuerylabel.prop( 'for', this.jQueryelement.prop('id') )
      }

      // Move original element outside of tokenfield wrapper
      this.jQueryelement.insertBefore( this.jQuerywrapper );

      // Remove tokenfield-related data
      this.jQueryelement.removeData('original-styles')
                   .removeData('original-tabindex')
                   .removeData('bs.tokenfield');

      // Remove tokenfield from DOM
      this.jQuerywrapper.remove();
      this.jQuerymirror.remove();

      var jQuery_element = this.jQueryelement;

      return jQuery_element;
  }

  }


 /* TOKENFIELD PLUGIN DEFINITION
  * ======================== */

  var old = jQuery.fn.tokenfield

  jQuery.fn.tokenfield = function (option, param) {
    var value
      , args = []

    Array.prototype.push.apply( args, arguments );

    var elements = this.each(function () {
      var jQuerythis = jQuery(this)
        , data = jQuerythis.data('bs.tokenfield')
        , options = typeof option == 'object' && option

      if (typeof option === 'string' && data && data[option]) {
        args.shift()
        value = data[option].apply(data, args)
      } else {
        if (!data && typeof option !== 'string' && !param) {
          jQuerythis.data('bs.tokenfield', (data = new Tokenfield(this, options)))
          jQuerythis.trigger('tokenfield:initialize')
        }
      }
    })

    return typeof value !== 'undefined' ? value : elements;
  }

  jQuery.fn.tokenfield.defaults = {
    minWidth: 60,
    minLength: 0,
    html: true,
    allowEditing: true,
    allowPasting: true,
    limit: 0,
    autocomplete: {},
    typeahead: {},
    showAutocompleteOnFocus: false,
    createTokensOnBlur: false,
    delimiter: ',',
    beautify: true,
    inputType: 'text'
  }

  jQuery.fn.tokenfield.Constructor = Tokenfield


 /* TOKENFIELD NO CONFLICT
  * ================== */

  jQuery.fn.tokenfield.noConflict = function () {
    jQuery.fn.tokenfield = old
    return this
  }

  return Tokenfield;

}));
