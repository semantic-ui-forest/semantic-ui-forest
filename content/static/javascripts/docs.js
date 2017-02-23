// namespace
window.semantic = {
  handler: {}
};

// ready event
semantic.ready = function() {

  // selector cache
  var
    $document            = $(document),
    $ui                  = $('.ui').not('.hover, .down'),
    $demo                = $('.demo'),

    $sticky              = $('.ui.sticky'),
    $tocSticky           = $('.toc .ui.sticky'),

    $fullHeightContainer = $('.pusher > .full.height'),

    $container           = $('.demo.container .tab'),

    $allHeaders          = $('.main.container > h2, .main.container > .tab > h2, .main.container > .tab > .examples h2'),
    $sectionHeaders      = $container.children('h2'),
    $followMenu          = $container.find('.following.menu'),
    $sectionExample      = $container.find('.example'),
    $exampleHeaders      = $sectionExample.children('h4'),
    $footer              = $('.page > .footer'),
    $pageTabs            = $('.vertical.segment .tabs.menu .item'),
    $example             = $('.example'),

    $swap                = $('.theme.menu .item'),
    $footer              = $('.page > .footer'),
    $pageDropdown        = $('.ui.main.menu .page.dropdown'),
    $popupExample        = $example.not('.no'),
    $shownExample        = $example.filter('.shown'),
    $prerenderedExample  = $example.has('.ui.checkbox, .ui.dropdown, .ui.search, .ui.progress, .ui.rating, .ui.dimmer, .ui.embed'),
    $visibilityExample   = $example.filter('.visiblity').find('.overlay, .demo.segment, .items img'),

    $code                = $('div.code').not('.existing'),
    $existingCode        = $('.existing.code'),

    expertiseLevel       = ($.cookie !== undefined)
      ? $.cookie('expertiseLevel') || 0
      : 0,
    languageDropdownUsed = false,

    requestAnimationFrame = window.requestAnimationFrame
      || window.mozRequestAnimationFrame
      || window.webkitRequestAnimationFrame
      || window.msRequestAnimationFrame
      || function(callback) { setTimeout(callback, 0); },


    // alias
    handler
  ;


  // event handlers
  handler = {

    createWaypoints: function() {
      $sectionHeaders
        .visibility({
          observeChanges: false,
          once: false,
          offset: 50,
          onTopPassed: handler.activate.section,
          onTopPassedReverse: handler.activate.previous
        })
      ;

      $sectionExample
        .visibility({
          observeChanges: false,
          once: false,
          offset: 200,
          onTopPassed: handler.activate.example,
          onBottomPassedReverse: handler.activate.example
        })
      ;

      // Tab example in Modules tab
      $sectionExample.filter(":nth-last-child(2)").filter(function() {return $(this).parent().is('.demo.container .tab:last-child');})
        .visibility({
          observeChanges: false,
          once: false,
          offset: 300,
          onTopPassed: handler.activate.example,
          onBottomPassedReverse: handler.activate.example
        })
      ;

      // Transition example in Modules tab
      $sectionExample.filter(":nth-last-child(1)").filter(function() {return $(this).parent().is('.demo.container .tab:last-child');})
        .visibility({
          observeChanges: false,
          once: false,
          //offset: 360,
          onBottomVisible: handler.activate.example
        })
      ;

      $footer
        .visibility({
          observeChanges: false,
          once: false,
          onBottomVisible: function(calculations) {
            var
              $title = $followMenu.find('> .item > .title').last()
            ;
            $followMenu
              .accordion('open', $title)
            ;
          }
        })
      ;
    },

    activate: {
      previous: function() {
        var
          $menuItems  = $followMenu.children('.item'),
          $section    = $menuItems.filter('.active'),
          index       = $menuItems.index($section)
        ;
        if($section.prev().length > 0) {
          $section
            .removeClass('active')
            .prev('.item')
            .addClass('active')
          ;
          $followMenu
            .accordion('open', index - 1)
          ;
        }
      },
      accordion: function() {
        var
          $section       = $(this),
          index          = $sectionHeaders.index($section),
          $followSection = $followMenu.children('.item'),
          $activeSection = $followSection.eq(index)
        ;
      },
      section: function() {
        var
          $section       = $(this),
          index          = $sectionHeaders.index($section),
          $followSection = $followMenu.children('.item'),
          $activeSection = $followSection.eq(index),
          isActive       = $activeSection.hasClass('active')
        ;
        if(!isActive) {
          $followSection.filter('.active')
            .removeClass('active')
          ;
          $activeSection
            .addClass('active')
          ;
          $followMenu
            .accordion('open', index)
          ;
        }
      },
      example: function() {
        var
          $section       = $(this).children('h4').eq(0),
          index          = $exampleHeaders.index($section),
          $followSection = $followMenu.find('.menu > .item'),
          $activeSection = $followSection.eq(index),
          inClosedTab    = ($(this).closest('.tab:not(.active)').length > 0),
          anotherExample = ($(this).filter('.another.example').length > 0),
          isActive       = $activeSection.hasClass('active')
        ;
        if(index !== -1 && !inClosedTab && !anotherExample && !isActive) {
          $followSection.filter('.active')
            .removeClass('active')
          ;
          $activeSection
            .addClass('active')
          ;
        }
      }
    },

    tryCreateMenu: function(event) {
      if($(window).width() > 640 && !$('body').hasClass('basic')) {
        if($container.length > 0 && $container.find('.following.menu').length === 0) {
          handler.createMenu();
          handler.createWaypoints();
          $(window).off('resize.menu');
        }
      }
    },

    createAnchors: function() {
      $allHeaders
        .each(function() {
          var
            $section = $(this),
            text     = handler.getText($section),
            safeName = handler.getSafeName(text),
            id       = window.escape(safeName),
            $anchor  = $('<a />').addClass('anchor').attr('id', id)
          ;
          $section
            .append($anchor)
          ;
        })
      ;
      $example
        .each(function() {
          var
            $title   = $(this).children('h4').eq(0),
            text     = handler.getText($title),
            safeName = handler.getSafeName(text),
            id       = window.escape(safeName),
            $anchor  = $('<a />').addClass('anchor').attr('id', id)
          ;
          if($title.length > 0) {
            $title.after($anchor);
          }
        })
      ;

    },

    getPageTitle: function() {
      return $.trim($('h2.huge.header').eq(0).contents().filter(function() { return this.nodeType == 3; }).text().toLowerCase());
    },
    getSafeName: function(text) {
      return text.replace(/\s+/g, '-').replace(/[^-,'A-Za-z0-9]+/g, '').toLowerCase();
    },

    getText: function($element) {
      $element = ($element.find('a').not('.label, .anchor').length > 0)
        ? $element.find('a')
        : $element
      ;
      var
        $text = $element.contents().filter(function(){
          return this.nodeType == 3;
        })
      ;
      return ($text.length > 0)
        ? $text[0].nodeValue.trim()
        : $element.find('a').text().trim()
      ;
    },

    createMenu: function() {
      // grab each h3
      var
        html      = '',
        pageTitle = handler.getPageTitle(),
        title     = pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1),
        $sticky,
        $rail
      ;
      $sectionHeaders
        .each(function(index) {
          var
            $currentHeader = $(this),
            $nextElements  = $currentHeader.nextUntil('h2'),
            $examples      = $nextElements.find('.example:not(.another)').addBack().filter('.example:not(.another)'),
            activeClass    = (index === 0)
              ? 'active '
              : '',
            text     = handler.getText($currentHeader),
            safeName = handler.getSafeName(text),
            id       = window.escape(safeName),
            $anchor  = $('<a />').addClass('anchor').attr('id', id)
          ;
          html += '<div class="item">';
          if($examples.length === 0) {
            html += '<a class="'+activeClass+'title" href="#'+ id +'"><b>' + $(this).text() + '</b></a>';
          }
          else {
            html += '<a class="'+activeClass+'title"><i class="dropdown icon"></i> <b>' + $(this).text() + '</b></a>';
          }
          if($examples.length > 0) {
            html += '<div class="'+activeClass+'content menu">';
            $examples
              .each(function() {
                var
                  $title   = $(this).children('h4').eq(0),
                  text     = handler.getText($title),
                  safeName = handler.getSafeName(text),
                  id       = window.escape(safeName),
                  $anchor  = $('<a />').addClass('anchor').attr('id', id)
                ;
                if($title.length > 0) {
                  html += '<a class="item" href="#'+id+'">' + text + '</a>';
                }
              })
            ;
            html += '</div>';
          }
          html += '</div>';
        })
      ;
      $followMenu = $('<div />')
        .addClass('ui vertical following fluid accordion text menu')
        .html(html)
      ;
      /* Advert
      var $advertisement = $('<div />')
        .addClass('advertisement')
        .html('<script type="text/javascript" src="//cdn.carbonads.com/carbon.js?zoneid=1673&serve=C6AILKT&placement=semanticuicom" id="_carbonads_js"></script>')
      ;
      */
      $sticky = $('<div />')
        .addClass('ui sticky')
        .html($followMenu)
        //.prepend($advertisement)
        .prepend('<h4 class="ui header"><a href="#content">' + title + '</a></h4>')
      ;
      $rail = $('<div />')
        .addClass('ui dividing right rail')
        .html($sticky)
        .prependTo($container)
      ;
      $sticky.sticky({
        silent: true,
        context: $container,
        offset: 30
      });
      $followMenu
        .accordion({
          exclusive: false,
          animateChildren: false,
          onChange: function() {
            $('.ui.sticky').sticky('refresh');
          }
        })
        .find('.menu a[href], .title[href]')
          .on('click', handler.scrollTo)
      ;
    },

    scrollTo: function(event) {
      var
        id       = $(this).attr('href').replace('#', ''),
        $element = $('.tab.active .example:has(#' + id + ')'),
        position = $element.offset().top - 30
      ;
      $('#' + id)
        .addClass('active')
      ;
      $('html, body')
        .animate({
          scrollTop: position
        }, 500)
      ;
      location.hash = '#' + id;
      event.stopImmediatePropagation();
      event.preventDefault();
      return false;
    },

    create: {
      examples: function(json) {
        var
          types      = json['Types'],
          text       = json['Text'],
          states     = json['States'],
          variations = json['Variations'],

          $element,
          html
        ;
        $.each(types, function(name, type){
          html += '<h2 class="ui dividing header">' + name + '</h2';
          if($.isPlainObject(type)) {
            $.each(type, function(name, subType) {
              $element = $.zc(subType);
              $element = handler.create.text($element, text);
              html += '<h3 class="ui header">' + name + '</h3';
              html += handler.create.variations($element, variations);
            });
          }
          else {
            $element = $.zc(type);
            $element = handler.create.text($element);
            html += handler.create.variations($element, variations);
          }
        });
        // Each TYPE
        //   show type name
        //   html = koan (html)
        //   each text
        //     find label
        //     if(obj)
        //       replace random text
        //     else
        //       replace text
        //   end
        //   Each variation
        //     (if obj)
        //       each
        //         add class
        //     (else)
        //       add class
        //     label = property
        //     class = class
        //     show html
        //   end
        // end
      },
      element: function(koan, type, text, variation) {

      },
      variations: function($element, variations) {
        $.each(variations, function(name, variation){

        });
      },
      text: function($element, text) {
        $.each(text, function(selector, text) {
          $element.find(selector).text(text);
        });
        return $element;
      }
    },

      refreshSticky: function() {
      $sectionHeaders.visibility('refresh');
      $sectionExample.visibility('refresh');
      $('.ui.sticky').sticky('refresh');
      $footer.visibility('refresh');
    },

    createIcon: function() {
      if (window.location.pathname.startsWith('/themes')) {
        $example
          .each(function(){
            var
              $insertPoint = $(this).is('.another')
                ? $(this).children().eq(0)
                : $(this).children().eq(1)
            ;
            $('<i/>')
              .addClass('icon code')
              .insertBefore( $insertPoint )
            ;
          })
          .find('i.code')
            .on('click', handler.createCode)
        ;
      }
    },

    less: {

      parseFile: function(content) {
        var
          variables = {},
          lines = content.match(/^\s*(@[\s|\S]+?;)/gm),
          name,
          value
        ;
        if(lines) {
          $.each(lines, function(index, line) {
            // clear whitespace
            line = $.trim(line);
            // match variables only
            if(line[0] == '@') {
              name = line.match(/^@(.+?):/);
              value = line.match(/:\s*([\s|\S]+?;)/);
              if( ($.isArray(name) && name.length >= 2) && ($.isArray(value) && value.length >= 2) ) {
                name = name[1];
                value = value[1];
                variables[name] = value;
              }
            }
          });
        }
        console.log(variables);
        return variables;
      },
    },

    getIndent: function(text) {
      var
        lines           = text.split("\n"),
        firstLine       = (lines[0] === '')
          ? lines[1]
          : lines[0],
        spacesPerIndent = 2,
        leadingSpaces   = (firstLine !== undefined)
          ? firstLine.length - firstLine.replace(/^\s*/g, '').length
          : false,
        indent
      ;
      if(!leadingSpaces) {
        return ($pageTabs.length > 0)
          ? 6
          : 4
        ;
      }
      if(leadingSpaces !== 0) {
        indent = leadingSpaces;
      }
      else {
        // string has already been trimmed, get first indented line and subtract 2
        $.each(lines, function(index, line) {
          leadingSpaces = line.length - line.replace(/^\s*/g, '').length;
          if(leadingSpaces !== 0) {
            indent = leadingSpaces - spacesPerIndent;
            return false;
          }
        });
      }
      return indent || 4;
    },

    generateCode: function() {
      var
        $example    = $(this).closest('.example'),
        $annotation = $example.find('.annotation'),
        $code       = $annotation.find('.code'),
        $intro      = $example.children().not('.ignored, h4:first-child').filter('.ui, i:not(.code)').eq(0).prevAll(),
        $ignored    = $('i.code:last-child, .wireframe, .anchor, .code, .existing, .instructive, .language.label, .annotation, br, .ignore, .ignored'),
        $demo       = $example.children().not($intro).not($ignored),
        code        = ''
      ;
      if( $code.length === 0) {
        $demo
          .each(function() {
            var
              $this      = $(this).clone(false),
              $wireframe = $this.find('.wireframe').add($this.filter('.wireframe'))
            ;
            $wireframe
              .each(function() {
                var
                  src       = $(this).attr('src'),
                  image     = (src.search('image') !== -1),
                  paragraph = (src.search('paragraph') !== -1)
                ;
                if(paragraph) {
                  $(this).replaceWith('<p></p>');
                }
                else if(image) {
                  $(this).replaceWith('<img>');
                }
              })
            ;

            // remove wireframe images
            $this.find('.wireframe').remove();

            if($this.not('br').not('.wireframe')) {
              // allow inline styles only with this one class
              if($this.is('.my-container')) {
                code += $this.get(0).outerHTML + "\n";
              }
              else {
                code += $this.removeAttr('style').get(0).outerHTML + "\n";
              }
            }
          })
        ;
      }
      $example.data('code', code);
      return code;
    },

    copyCode: function() {
      $(this)
        .popup('change content', 'Copied to clipboard')
      ;
    },

    createCode: function() {
      var
        $example        = $(this).closest('.example'),
        $intro          = $example.children().not('.ignored, h4:first-child').filter('.ui, i:not(.code)').eq(0).prevAll(),
        $annotation     = $example.find('.annotation'),
        $code           = $annotation.find('.code'),
        $html           = $example.children('.html'),
        $ignoredContent = $('.ui.popup, i.code:last-child, .anchor, .code, .existing.segment, .instructive, .language.label, .annotation, .ignore, style, script, .ignored'),
        $demo           = $example.children().not($intro).not($ignoredContent),
        code            = $example.data('code') || $.proxy(handler.generateCode, this)(),
        $copyCode,
        $label
      ;

      // process existing code first
      if( $code.hasClass('existing') ) {
        $code.removeClass('existing');
        $.proxy(handler.initializeCode, $code)(true);
      }

      // create annotation wrapper
      if($annotation.length === 0) {
        $annotation = $('<div/>')
          .addClass('annotation')
          .hide()
          .insertAfter($demo.last())
        ;
      }

      if($html.length === 0) {
        $html     = $('<div class="html">').insertBefore($annotation);
        $label    = $('<div class="ui top attached label">').html('Example <i data-content="Copy code" class="copy link icon"></i>');
        $copyCode = $label.find('i.copy');
        $copyCode
          .on('click', handler.copyCode)
          .popup({
            variation    : 'inverted',
            offset       : -12,
            distanceAway : 6
          })
        ;
        $label
          .prependTo($html)
        ;
        new Clipboard($copyCode.get(0), {
          text: function() {
            var
              code = $copyCode.closest('.example').data('code') || ''
            ;
            return handler.formatCode(code);
          }
        });
        if($demo.length === 0) {
          $html.addClass('empty');
        }
        else {
          $demo
            .detach()
            .prependTo($html)
          ;
        }
      }

      // create code inside annotation wrapper
      if( $example.find('.instructive').length === 0) {
        $code = $('<div/>')
          .data('type', 'html')
          .addClass('code')
          .html(code)
          .hide()
          .appendTo($annotation)
        ;
        $.proxy(handler.initializeCode, $code)(true);
      }
      if( $annotation.hasClass('visible') ) {
        $annotation.transition('hide');
        $html.removeClass('ui top attached segment');
      }
      else {
        $html.addClass('ui top attached segment');
        $intro.css('display', '');
        $annotation.transition('show');
      }
      setTimeout(function() {
        handler.refreshSticky();
      }, 400);
    },


    refreshSticky: function() {
      $sectionHeaders.visibility('refresh');
      $sectionExample.visibility('refresh');
      $('.ui.sticky').sticky('refresh');
      $footer.visibility('refresh');
      $visibilityExample.visibility('refresh');
    },

    createAnnotation: function() {
      if(!$(this).data('type')) {
        $(this).data('type', 'html');
      }
      $(this)
        .wrap('<div class="annotation">')
        .parent()
        .hide()
      ;
    },

    makeCode: function() {
      if(window.hljs !== undefined) {
        $code
          .filter(':visible')
          .each(handler.initializeCode)
        ;
        $existingCode
          .each(handler.createAnnotation)
        ;
      }
      else {
        console.log('Syntax highlighting not found');
      }
    },

   formatCode: function(code) {
      var
        indent     = handler.getIndent(code) || 2,
        whiteSpace = new RegExp('\\n\\s{' + indent + '}', 'g')
      ;
      return $.trim(code).replace(whiteSpace, '\n');
    },

    initializeCode: function(codeSample) {
      var
        $code         = $(this).show(),
        $codeTag      = $('<code />'),
        codeSample    = codeSample || false,
        code          = $code.html(),
        existingCode  = $code.hasClass('existing'),
        evaluatedCode = $code.hasClass('evaluated'),
        contentType   = $code.data('type')     || 'html',
        title         = $code.data('title')    || false,
        less          = $code.data('less')     || false,
        demo          = $code.data('demo')     || false,
        eval          = $code.data('eval')     || false,
        preview       = $code.data('preview')  || false,
        label         = $code.data('label')    || false,
        preserve      = $code.data('preserve') || false,
        escape        = $code.data('escape') || false,
        displayType   = {
          html       : 'HTML',
          javascript : 'Javascript',
          css        : 'CSS',
          text       : 'Command Line',
          sh         : 'Command Line'
        },
        padding    = 20,
        name = (codeSample === true)
          ? 'instructive bottom attached'
          : 'existing',
        formattedCode = code,
        styledCode,
        $example,
        $label,
        codeHeight
      ;
      var entityMap = {
        "&amp;"  : "&",
        "&lt;"   : "<",
        "&gt;"   : ">",
        '&quot;' : '"',
        '&#39;'  : "'",
        '&#x2F;' : "/"
      };
      contentType = contentType.toLowerCase();

      function escapeHTML(string) {
        return $('<div>').html(string).text();
      }


      // escape html entities
      if(contentType != 'html' || escape) {
        code = escapeHTML(code);
      }

      // evaluate if specified
      if(evaluatedCode) {
        window.eval(code);
      }

      // should trim whitespace
      if(preserve) {
        formattedCode = code;
      }
      else {
        formattedCode = handler.formatCode(code);
      }

      // color code
      formattedCode = window.hljs.highlightAuto(formattedCode);

      // create <code> tag
      $codeTag
        .addClass($code.attr('class'))
        .addClass(formattedCode.language) 
        .html(formattedCode.value)
      ;

      // replace <div> with <code>
      $code.replaceWith($codeTag);
      $code = $codeTag;
      $code
        .wrap('<div class="ui ' + name + ' segment"></div>')
        .wrap('<pre></pre>')
      ;

      // add label
      if(title) {
        $('<div>')
          .addClass('ui attached top label')
          .html('<span class="title">' + title + '</span>' + '<em>' + (displayType[contentType] || contentType) + '</em>')
          .prependTo( $code.closest('.segment') )
        ;
      }
      if(label) {
        $('<div>')
          .addClass('ui pointing below ignored language label')
          .html(displayType[contentType] || contentType)
          .insertBefore ( $code.closest('.segment') )
        ;
      }
      // add apply less button
      if(less) {
        $('<a>')
          .addClass('ui black pointing below ignored label')
          .html('Apply Theme')
          .on('click', function() {
            window.less.modifyVars( handler.less.parseFile( code ) );
          })
          .insertBefore ( $code.closest('.segment') )
        ;
      }
      // add run code button
      if(demo) {
        $('<a>')
          .addClass('ui black pointing below ignored label')
          .html('Run Code')
          .on('click', function() {
            if(eval) {
              window.eval(eval);
            }
            else {
              window.eval(code);
            }
          })
          .insertBefore ( $code.closest('.segment') )
        ;
      }
      // add preview if specified
      if(preview) {
        $(code)
          .insertAfter( $code.closest('.segment') )
        ;
      }

      $code.removeClass('hidden');

    },

    selectAll: function () {
      this.setSelectionRange(0, this.value.length);
    },

    chooseStandalone: function() {
      $downloads
        .find('.grid')
        .hide()
        .filter('.standalone.grid')
          .show()
      ;
      $downloadPopup.popup('reposition');
    },

    chooseFramework: function() {
      $downloads
        .find('.grid')
        .hide()
        .filter('.framework.grid')
          .show()
      ;
      $downloadPopup.popup('reposition');
    },

    swapStyle: function() {
      var
        theme = $(this).data('theme')
      ;
      $(this)
        .addClass('active')
        .siblings()
          .removeClass('active')
      ;
      $('head link.ui')
        .each(function() {
          var
            href         = $(this).attr('href'),
            subDirectory = href.split('/')[3],
            newLink      = href.replace(subDirectory, theme)
          ;
          $(this)
            .attr('href', newLink)
          ;
        })
      ;
    }


  };

  semantic.handler = handler;

  // add anchors to docs headers
  handler.createAnchors();

  // load page tabs
  if( $pageTabs.length > 0 ) {
    $pageTabs
      .tab({
        context      : '.demo.container',
        childrenOnly : true,
        history      : true,
        onFirstLoad  : function() {
/*
        $container = ($('.fixed.column').length > 0 )
          ? $(this).find('.examples')
          : $(this)
          ;
*/
//      $container = $('> .basic.segment', this);
        $container = $(this);
          $(this).find('> .rail .ui.sticky, .fixed .ui.sticky')
            .sticky({
              context: $container,
              silent: true,
              offset: 30
            })
          ;
          $sectionHeaders = $container.children('h2');
          $sectionExample = $container.find('.example');
          $exampleHeaders = $sectionExample.children('h4');
          handler.tryCreateMenu();
          $(window).on('resize.menu', function() {
            handler.tryCreateMenu();
          });
        },
        onLoad : function() {
          $tocSticky
            .sticky('refresh')
          ;
          $(this).find('.ui.sticky')
            .sticky('refresh')
          ;
        }
      })
    ;
  }
  else {
    handler.tryCreateMenu();
    $(window).on('resize.menu', function() {
      handler.tryCreateMenu();
    });
  };

  // code highlighting languages
  window.hljs.configure({
    classPrefix : '',
    languages   : [
      'xml',
      'bash',
      'css',
      'less',
      'javascript'
    ]
  });

  // register less files
  window.less.registerStylesheets();

  $shownExample
    .each(handler.createCode)
  ;
  $prerenderedExample
    .each(handler.generateCode)
  ;

  handler.createIcon();

  if(expertiseLevel < 2 && $(window).width() > 640) {
    $popupExample
      .each(function() {
        $(this)
          .popup({
            preserve: false,
            on       : 'hover',
            variation: 'inverted',
            delay: {
              show: 100,
              hide: 100
            },
            position : 'top left',
            offset   : -5,
            content  : 'View Source',
            target   : $(this).find('i.code')
          })
          .find('i.code')
            .on('click', function() {
              $.cookie('expertiseLevel', 2, {
                expires: 365
              });
            })
        ;
      })
    ;
  }

  $swap
    .on('click', handler.swapStyle)
  ;

  $pageDropdown
    .dropdown({
      on       : 'hover',
      action   : 'nothing',
      allowTab : false
    })
  ;

};


// attach ready event
$(document)
  .ready(semantic.ready)
;
