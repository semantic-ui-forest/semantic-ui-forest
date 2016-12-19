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
  }
};


// attach ready event
$(document)
  .ready(semantic.ready)
;
