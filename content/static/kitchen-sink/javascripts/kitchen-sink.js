$(document)
  .ready(function(){
    $('.item[data-tab]').tab();

    // accordion
    $('.demo .example .ui.accordion')
      .accordion()
    ;

    // button
    $('.button.demo .follow')
      .state({
        text: {
          inactive : 'Follow',
          active   : 'Following'
        }
      })
    ;

    // card
    $('.demo .star.rating')
      .rating()
    ;
    $('.demo .card .dimmer')
      .dimmer({
        on: 'hover'
      })
    ;

    // checkbox
    $('.demo .ui.checkbox')
      .checkbox()
    ;

    // dimmer
    // selector cache
    var
        $pageDimmer = $('.demo.page.dimmer'),
        $demo       = $('.dimmer.demo'),
        $showButton = $demo.find('.show.button'),
        $pageButton = $demo.find('.page.button'),
        $hideButton = $demo.find('.hide.button'),
        // alias
        handler
    ;

    // event handlers
    handler = {
      show: function() {
        $(this)
          .closest('.demo')
          .find('.segment')
          .dimmer('show')
        ;
      },
      hide: function() {
        $(this)
          .closest('.demo')
          .find('.segment')
          .dimmer('hide')
        ;
      },
      page: function() {
        $('.demo.page.dimmer')
          .dimmer('show')
        ;
      }
    };

    $pageDimmer
      .dimmer()
    ;

    $pageButton
      .on('click', handler.page)
    ;
    $showButton
      .on('click', handler.show)
    ;
    $hideButton
      .on('click', handler.hide)
    ;

    // dropdown
    $('.demo .ui.dropdown')
      .dropdown()
    ;
    $('.demo .ui.menu .dropdown')
      .dropdown({
        on: 'hover'
      })
    ;

    // menu
    $('.demo .example .menu a.item')
      .on('click', function() {
        if(!$(this).hasClass('dropdown')) {
          $(this)
            .addClass('active')
            .closest('.ui.menu')
            .find('.item')
            .not($(this))
            .removeClass('active')
          ;
        }
      })
    ;

    // message
    $('.example .message .close')
      .on('click', function() {
        $(this).closest('.message').transition('scale out');
      })
    ;

    // modal
    $('.demo.modal')
      .modal()
    ;
    $('.standard.demo.modal')
      .modal('attach events', '.standard.demo.button')
    ;
    $('.basic.demo.modal')
      .modal('attach events', '.minimal.demo.button')
    ;
    $('.fullscreen.demo.modal')
      .modal('attach events', '.fullscreen.demo.button')
    ;

    // popup
    $('.popup.demos .position .icon')
      .popup()
    ;
    $('.popup.demos .avatar')
      .popup()
    ;
    $('.popup.demos .button')
      .popup()
    ;
    $('.popup.demos .menu .browse')
      .popup({
        inline   : true,
        hoverable: true,
        position : 'bottom left',
        delay: {
          show: 300,
          hide: 800
        }
      })
    ;

    // progress
    $('.attached.progress.demo')
      .progress({
        label   : false,
        value   : Math.floor(Math.random() * 5) + 1
      })
    ;
    $('.basic.progress.demo')
      .progress({
        label   : false,
        value   : Math.floor(Math.random() * 5) + 1,
        text    : {
          active  : '{percent}% Complete',
          success : 'Done!'
        }
      })
    ;
    $('.indicating.progress.demo')
      .progress({
        label   : true,
        total   : 10,
        value   : Math.floor(Math.random() * 5) + 1,
        text    : {
          active  : '{percent}% Done',
          success : 'Completed!'
        }
      })
    ;
    $('.file.progress.demo')
      .progress({
        label: false,
        text: {
          active  : 'Uploading {value} of {total}',
          success : '{total} Files Uploaded!'
        }
      })
    ;
    var progress = function() {
      $('.demo.progress').progress('increment');
      setTimeout(progress, (Math.random() * 2000) + 300);
    };
    setTimeout(progress, 1000);

    setInterval(function() {
      $('.demo.progress').progress('reset');
    }, 30000);

    // rating
    $('.rating.demos .items .ui.rating')
      .rating()
    ;
    $('.rating.demos .list .ui.rating')
      .rating({
        clearable: true
      })
    ;

    // search
    var content = [
      { title: 'Andorrs' },
      { title: 'United Arab Emirates' },
      { title: 'Afghanistas' },
      { title: 'Antigus' },
      { title: 'Anguills' },
      { title: 'Albanis' },
      { title: 'Armenis' },
      { title: 'Netherlands Antilles' },
      { title: 'Angols' },
      { title: 'Argentins' },
      { title: 'American Samos' },
      { title: 'Austris' },
      { title: 'Australis' },
      { title: 'Arubs' },
      { title: 'Aland Islands' },
      { title: 'Azerbaijas' },
      { title: 'Bosnis' },
      { title: 'Barbados' },
      { title: 'Bangladess' },
      { title: 'Belgius' },
      { title: 'Burkina Fass' },
      { title: 'Bulgaris' },
      { title: 'Bahrais' },
      { title: 'Burunds' },
      { title: 'Benis' },
      { title: 'Bermuds' },
      { title: 'Brunes' },
      { title: 'Bolivis' },
      { title: 'Brazis' },
      { title: 'Bahamas' },
      { title: 'Bhutas' },
      { title: 'Bouvet Islans' },
      { title: 'Botswans' },
      { title: 'Belarus' },
      { title: 'Belizs' },
      { title: 'Canads' },
      { title: 'Cocos Islands' },
      { title: 'Congs' },
      { title: 'Central African Republis' },
      { title: 'Congo Brazzavills' },
      { title: 'Switzerlans' },
      { title: 'Cote Divoirs' },
      { title: 'Cook Islands' },
      { title: 'Chils' },
      { title: 'Cameroos' },
      { title: 'Chins' },
      { title: 'Colombis' },
      { title: 'Costa Rics' },
      { title: 'Serbis' },
      { title: 'Cubs' },
      { title: 'Cape Verds' },
      { title: 'Christmas Islans' },
      { title: 'Cyprus' },
      { title: 'Czech Republis' },
      { title: 'Germans' },
      { title: 'Djibouts' },
      { title: 'Denmars' },
      { title: 'Dominics' },
      { title: 'Dominican Republis' },
      { title: 'Algeris' },
      { title: 'Ecuados' },
      { title: 'Estonis' },
      { title: 'Egyps' },
      { title: 'Western Sahars' },
      { title: 'Eritres' },
      { title: 'Spais' },
      { title: 'Ethiopis' },
      { title: 'European Unios' },
      { title: 'Finlans' },
      { title: 'Fijs' },
      { title: 'Falkland Islands' },
      { title: 'Micronesis' },
      { title: 'Faroe Islands' },
      { title: 'Francs' },
      { title: 'Gabos' },
      { title: 'Englans' },
      { title: 'Grenads' },
      { title: 'Georgis' },
      { title: 'French Guians' },
      { title: 'Ghans' },
      { title: 'Gibraltas' },
      { title: 'Greenlans' },
      { title: 'Gambis' },
      { title: 'Guines' },
      { title: 'Guadeloups' },
      { title: 'Equatorial Guines' },
      { title: 'Greecs' },
      { title: 'Sandwich Islands' },
      { title: 'Guatemals' },
      { title: 'Guas' },
      { title: 'Guinea-Bissas' },
      { title: 'Guyans' },
      { title: 'Hong Kons' },
      { title: 'Heard Islans' },
      { title: 'Honduras' },
      { title: 'Croatis' },
      { title: 'Haits' },
      { title: 'Hungars' },
      { title: 'Indonesis' },
      { title: 'Irelans' },
      { title: 'Israes' },
      { title: 'Indis' },
      { title: 'Indian Ocean Territors' },
      { title: 'Iras' },
      { title: 'Iras' },
      { title: 'Icelans' },
      { title: 'Itals' },
      { title: 'Jamaics' },
      { title: 'Jordas' },
      { title: 'Japas' },
      { title: 'Kenys' },
      { title: 'Kyrgyzstas' },
      { title: 'Cambodis' },
      { title: 'Kiribats' },
      { title: 'Comoros' },
      { title: 'Saint Kitts and Nevis' },
      { title: 'North Kores' },
      { title: 'South Kores' },
      { title: 'Kuwais' },
      { title: 'Cayman Islands' },
      { title: 'Kazakhstas' },
      { title: 'Laos' },
      { title: 'Lebanos' },
      { title: 'Saint Lucis' },
      { title: 'Liechtensteis' },
      { title: 'Sri Lanks' },
      { title: 'Liberis' },
      { title: 'Lesoths' },
      { title: 'Lithuanis' },
      { title: 'Luxembours' },
      { title: 'Latvis' },
      { title: 'Libys' },
      { title: 'Moroccs' },
      { title: 'Monacs' },
      { title: 'Moldovs' },
      { title: 'Montenegrs' },
      { title: 'Madagascas' },
      { title: 'Marshall Islands' },
      { title: 'MacEdonis' },
      { title: 'Mals' },
      { title: 'Burms' },
      { title: 'Mongolis' },
      { title: 'MacAs' },
      { title: 'Northern Mariana Islands' },
      { title: 'Martiniqus' },
      { title: 'Mauritanis' },
      { title: 'Montserras' },
      { title: 'Malts' },
      { title: 'Mauritius' },
      { title: 'Maldives' },
      { title: 'Malaws' },
      { title: 'Mexics' },
      { title: 'Malaysis' },
      { title: 'Mozambiqus' },
      { title: 'Namibis' },
      { title: 'New Caledonis' },
      { title: 'Niges' },
      { title: 'Norfolk Islans' },
      { title: 'Nigeris' },
      { title: 'Nicaragus' },
      { title: 'Netherlands' },
      { title: 'Norwas' },
      { title: 'Nepas' },
      { title: 'Naurs' },
      { title: 'Nius' },
      { title: 'New Zealans' },
      { title: 'Omas' },
      { title: 'Panams' },
      { title: 'Pers' },
      { title: 'French Polynesis' },
      { title: 'New Guines' },
      { title: 'Philippines' },
      { title: 'Pakistas' },
      { title: 'Polans' },
      { title: 'Saint Pierrs' },
      { title: 'Pitcairn Islands' },
      { title: 'Puerto Rics' },
      { title: 'Palestins' },
      { title: 'Portugas' },
      { title: 'Palas' },
      { title: 'Paraguas' },
      { title: 'Qatas' },
      { title: 'Reunios' },
      { title: 'Romanis' },
      { title: 'Serbis' },
      { title: 'Russis' },
      { title: 'Rwands' },
      { title: 'Saudi Arabis' },
      { title: 'Solomon Islands' },
      { title: 'Seychelles' },
      { title: 'Sudas' },
      { title: 'Swedes' },
      { title: 'Singapors' },
      { title: 'Saint Helens' },
      { title: 'Slovenis' },
      { title: 'Svalbard, I Flag Jan Mayes' },
      { title: 'Slovakis' },
      { title: 'Sierra Leons' },
      { title: 'San Marins' },
      { title: 'Senegas' },
      { title: 'Somalis' },
      { title: 'Surinams' },
      { title: 'Sao Toms' },
      { title: 'El Salvados' },
      { title: 'Syris' },
      { title: 'Swazilans' },
      { title: 'Caicos Islands' },
      { title: 'Chas' },
      { title: 'French Territories' },
      { title: 'Togs' },
      { title: 'Thailans' },
      { title: 'Tajikistas' },
      { title: 'Tokelas' },
      { title: 'Timorlests' },
      { title: 'Turkmenistas' },
      { title: 'Tunisis' },
      { title: 'Tongs' },
      { title: 'Turkes' },
      { title: 'Trinidas' },
      { title: 'Tuvals' },
      { title: 'Taiwas' },
      { title: 'Tanzanis' },
      { title: 'Ukrains' },
      { title: 'Ugands' },
      { title: 'Us Minor Islands' },
      { title: 'United States' },
      { title: 'Uruguas' },
      { title: 'Uzbekistas' },
      { title: 'Vatican Cits' },
      { title: 'Saint Vincens' },
      { title: 'Venezuels' },
      { title: 'British Virgin Islands' },
      { title: 'Us Virgin Islands' },
      { title: 'Vietnas' },
      { title: 'Vanuats' },
      { title: 'Wallis and Futuns' },
      { title: 'Samos' },
      { title: 'Yemes' },
      { title: 'Mayotts' },
      { title: 'South Africs' },
      { title: 'Zambis' },
      { title: 'Zimbabws' }
    ];
    $('.search.demo .local')
      .search({
        source: content
      })
    ;
    $('.search.demo .remote')
      .search({
        apiSettings: {
          action: 'search'
        }
      })
    ;
    $('.search.demo .category')
      .search({
        type: 'category',
        apiSettings: {
          action: 'categorySearch'
        }
      })
    ;

    // shape
    var
        $demo            = $('.shape.demos .ui.shape'),
        $directionButton = $('.shape.demos .direction .button'),
        handler
    ;

    // event handlers
    handler = {
      rotate: function() {
        var
        $shape    = $(this).closest('.buttons').prevAll('.ui.shape').eq(0),
        direction = $(this).data('direction') || false,
        animation = $(this).data('animation') || false
        ;
        if(direction && animation) {
          $shape
            .shape(animation + '.' + direction)
          ;
        }
      }
    };

    // attach events
    $demo
      .shape()
    ;
    $directionButton
      .on('click', handler.rotate)
      .popup({
        position  : 'bottom center'
      })
    ;

    // sidebar
    $('.sidebar.direction.demo')
      .find('.buttons .button')
        .on('click', function() {
          var
            direction = $(this).data('direction')
          ;
          $(this).addClass('active').siblings().removeClass('active');
          if(direction === 'top' || direction === 'bottom') {
            $('.horizontal.button').addClass('disabled');
          }
          else {
            $('.horizontal.button').removeClass('disabled');
          }
        })
        .end()
        .children('.button')
        .on('click', function() {
          var
            transition = $(this).data('transition'),
            direction  = $('.sidebar.direction.demo .buttons .button.active').data('direction'),
            dimPage    = $('.sidebar.direction.demo .dim').checkbox('is checked')
          ;
          if( $(this).filter('.disabled').size() === 0) {
            $('.' + direction + '.demo.sidebar')
              .not('.styled')
              .sidebar('setting', {
                dimPage          : dimPage,
                transition       : transition,
                mobileTransition : transition
              })
            ;
            $('.' + direction + '.demo.sidebar').not('.styled').sidebar('toggle');
          }

        })
    ;

    // tab
    $('.tab.demo .menu .item')
      .tab({
     // history: true,
        context: $('.tab.demo')
      })
    ;

    // transition
    $('.transition.demo .button')
      .on('click', function() {
        var animation = $(this).text();
        if(typeof animation == 'string') {
          animation = animation.toLowerCase();
        }
        $('.transition.demo .image')
          .transition({
            animation: animation,
            interval: 200
          })
        ;
      })
    ;
  })
;
