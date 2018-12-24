/**
 * Created by hty on 2018/5/17.
 */
/**
 Core script to handle the entire theme and core functions
 **/
var App = function() {

    // IE mode
    var isRTL = false;
    var isIE8 = false;
    var isIE9 = false;
    var isIE10 = false;

    var resizeHandlers = [];

    var assetsPath = '../assets/';

    var globalImgPath = 'global/img/';

    var globalPluginsPath = 'global/plugins/';

    var globalCssPath = 'global/css/';

    // theme layout color set

    var brandColors = {
        'blue': '#89C4F4',
        'red': '#F3565D',
        'green': '#1bbc9b',
        'purple': '#9b59b6',
        'grey': '#95a5a6',
        'yellow': '#F8CB00'
    };

    // initializes main settings
    var handleInit = function() {

        if ($jq('body').css('direction') === 'rtl') {
            isRTL = true;
        }

        isIE8 = !!navigator.userAgent.match(/MSIE 8.0/);
        isIE9 = !!navigator.userAgent.match(/MSIE 9.0/);
        isIE10 = !!navigator.userAgent.match(/MSIE 10.0/);

        if (isIE10) {
            $jq('html').addClass('ie10'); // detect IE10 version
        }

        if (isIE10 || isIE9 || isIE8) {
            $jq('html').addClass('ie'); // detect IE10 version
        }
    };

    // runs callback functions set by App.addResponsiveHandler().
    var _runResizeHandlers = function() {
        // reinitialize other subscribed elements
        for (var i = 0; i < resizeHandlers.length; i++) {
            var each = resizeHandlers[i];
            each.call();
        }
    };

    // handle the layout reinitialization on window resize
    var handleOnResize = function() {
        var resize;
        if (isIE8) {
            var currheight;
            $jq(window).resize(function() {
                if (currheight == document.documentElement.clientHeight) {
                    return; //quite event since only body resized not window.
                }
                if (resize) {
                    clearTimeout(resize);
                }
                resize = setTimeout(function() {
                    _runResizeHandlers();
                }, 50); // wait 50ms until window resize finishes.                
                currheight = document.documentElement.clientHeight; // store last body client height
            });
        } else {
            $jq(window).resize(function() {
                if (resize) {
                    clearTimeout(resize);
                }
                resize = setTimeout(function() {
                    _runResizeHandlers();
                }, 50); // wait 50ms until window resize finishes.
            });
        }
    };


    // Handles custom checkboxes & radios using jQuery Uniform plugin
    // var handleUniform = function() {
    //     if (!$jq().uniform) {
    //         return;
    //     }
    //     var test = $jq("input[type=checkbox]:not(.toggle, .md-check, .md-radiobtn, .make-switch, .icheck), input[type=radio]:not(.toggle, .md-check, .md-radiobtn, .star, .make-switch, .icheck)");
    //     if (test.size() > 0) {
    //         test.each(function() {
    //             if ($jq(this).parents(".checker").size() === 0) {
    //                 $jq(this).show();
    //                 $jq(this).uniform();
    //             }
    //         });
    //     }
    // };

    // Handlesmaterial design checkboxes
    // var handleMaterialDesign = function() {
    //
    //     // Material design ckeckbox and radio effects
    //     $jq('body').on('click', '.md-checkbox > label, .md-radio > label', function() {
    //         var the = $jq(this);
    //         // find the first span which is our circle/bubble
    //         var el = $jq(this).children('span:first-child');
    //
    //         // add the bubble class (we do this so it doesnt show on page load)
    //         el.addClass('inc');
    //
    //         // clone it
    //         var newone = el.clone(true);
    //
    //         // add the cloned version before our original
    //         el.before(newone);
    //
    //         // remove the original so that it is ready to run on next click
    //         $jq("." + el.attr("class") + ":last", the).remove();
    //     });
    //
    //     if ($jq('body').hasClass('page-md')) {
    //         // Material design click effect
    //         // credit where credit's due; http://thecodeplayer.com/walkthrough/ripple-click-effect-google-material-design
    //         var element, circle, d, x, y;
    //         $jq('body').on('click', 'a.btn, button.btn, input.btn, label.btn', function(e) {
    //             element = $jq(this);
    //
    //             if(element.find(".md-click-circle").length == 0) {
    //                 element.prepend("<span class='md-click-circle'></span>");
    //             }
    //
    //             circle = element.find(".md-click-circle");
    //             circle.removeClass("md-click-animate");
    //
    //             if(!circle.height() && !circle.width()) {
    //                 d = Math.max(element.outerWidth(), element.outerHeight());
    //                 circle.css({height: d, width: d});
    //             }
    //
    //             x = e.pageX - element.offset().left - circle.width()/2;
    //             y = e.pageY - element.offset().top - circle.height()/2;
    //
    //             circle.css({top: y+'px', left: x+'px'}).addClass("md-click-animate");
    //
    //             setTimeout(function() {
    //                 circle.remove();
    //             }, 1000);
    //         });
    //     }
    //
    //     // Floating labels
    //     var handleInput = function(el) {
    //         if (el.val() != "") {
    //             el.addClass('edited');
    //         } else {
    //             el.removeClass('edited');
    //         }
    //     }
    //
    //     $jq('body').on('keydown', '.form-md-floating-label .form-control', function(e) {
    //         handleInput($jq(this));
    //     });
    //     $jq('body').on('blur', '.form-md-floating-label .form-control', function(e) {
    //         handleInput($jq(this));
    //     });
    //
    //     $jq('.form-md-floating-label .form-control').each(function(){
    //         if ($jq(this).val().length > 0) {
    //             $jq(this).addClass('edited');
    //         }
    //     });
    // }

    // Handles custom checkboxes & radios using jQuery iCheck plugin
    // var handleiCheck = function() {
    //     if (!$jq().iCheck) {
    //         return;
    //     }
    //
    //     $jq('.icheck').each(function() {
    //         var checkboxClass = $jq(this).attr('data-checkbox') ? $jq(this).attr('data-checkbox') : 'icheckbox_minimal-grey';
    //         var radioClass = $jq(this).attr('data-radio') ? $jq(this).attr('data-radio') : 'iradio_minimal-grey';
    //
    //         if (checkboxClass.indexOf('_line') > -1 || radioClass.indexOf('_line') > -1) {
    //             $jq(this).iCheck({
    //                 checkboxClass: checkboxClass,
    //                 radioClass: radioClass,
    //                 insert: '<div class="icheck_line-icon"></div>' + $jq(this).attr("data-label")
    //             });
    //         } else {
    //             $jq(this).iCheck({
    //                 checkboxClass: checkboxClass,
    //                 radioClass: radioClass
    //             });
    //         }
    //     });
    // };

    // Handles Bootstrap switches
    // var handleBootstrapSwitch = function() {
    //     if (!$jq().bootstrapSwitch) {
    //         return;
    //     }
    //     $jq('.make-switch').bootstrapSwitch();
    // };

    // Handles Bootstrap confirmations
    var handleBootstrapConfirmation = function() {
        if (!$jq().confirmation) {
            return;
        }
        $jq('[data-toggle=confirmation]').confirmation({ container: 'body', btnOkClass: 'btn btn-sm btn-success', btnCancelClass: 'btn btn-sm btn-danger'});
    }

    // Handles Bootstrap Accordions.
    var handleAccordions = function() {
        $jq('body').on('shown.bs.collapse', '.accordion.scrollable', function(e) {
            App.scrollTo($jq(e.target));
        });
    };

    // Handles Bootstrap Tabs.
    var handleTabs = function() {
        //activate tab if tab id provided in the URL
        if (location.hash) {
            var tabid = encodeURI(location.hash.substr(1));
            $jq('a[href="#' + tabid + '"]').parents('.tab-pane:hidden').each(function() {
                var tabid = $jq(this).attr("id");
                $jq('a[href="#' + tabid + '"]').click();
            });
            $jq('a[href="#' + tabid + '"]').click();
        }

        if ($jq().tabdrop) {
            $jq('.tabbable-tabdrop .nav-pills, .tabbable-tabdrop .nav-tabs').tabdrop({
                text: '<i class="fa fa-ellipsis-v"></i>&nbsp;<i class="fa fa-angle-down"></i>'
            });
        }
    };

    // Handles Bootstrap Modals.
    var handleModals = function() {
        // fix stackable modal issue: when 2 or more modals opened, closing one of modal will remove .modal-open class. 
        $jq('body').on('hide.bs.modal', function() {
            if ($jq('.modal:visible').size() > 1 && $jq('html').hasClass('modal-open') === false) {
                $jq('html').addClass('modal-open');
            } else if ($jq('.modal:visible').size() <= 1) {
                $jq('html').removeClass('modal-open');
            }
        });

        // fix page scrollbars issue
        $jq('body').on('show.bs.modal', '.modal', function() {
            if ($jq(this).hasClass("modal-scroll")) {
                $jq('body').addClass("modal-open-noscroll");
            }
        });

        // fix page scrollbars issue
        $jq('body').on('hide.bs.modal', '.modal', function() {
            $jq('body').removeClass("modal-open-noscroll");
        });

        // remove ajax content and remove cache on modal closed 
        $jq('body').on('hidden.bs.modal', '.modal:not(.modal-cached)', function () {
            $jq(this).removeData('bs.modal');
        });
    };

    // Handles Bootstrap Tooltips.
    var handleTooltips = function() {
        // global tooltips
        $jq('.tooltips').tooltip();

        // portlet tooltips
        $jq('.portlet > .portlet-title .fullscreen').tooltip({
            container: 'body',
            title: 'Fullscreen'
        });
        $jq('.portlet > .portlet-title > .tools > .reload').tooltip({
            container: 'body',
            title: 'Reload'
        });
        $jq('.portlet > .portlet-title > .tools > .remove').tooltip({
            container: 'body',
            title: 'Remove'
        });
        $jq('.portlet > .portlet-title > .tools > .config').tooltip({
            container: 'body',
            title: 'Settings'
        });
        $jq('.portlet > .portlet-title > .tools > .collapse, .portlet > .portlet-title > .tools > .expand').tooltip({
            container: 'body',
            title: 'Collapse/Expand'
        });
    };

    // Handles Bootstrap Dropdowns
    var handleDropdowns = function() {
        /*
          Hold dropdown on click  
        */
        $jq('body').on('click', '.dropdown-menu.hold-on-click', function(e) {
            e.stopPropagation();
        });
    };

    var handleAlerts = function() {
        $jq('body').on('click', '[data-close="alert"]', function(e) {
            $jq(this).parent('.alert').hide();
            $jq(this).closest('.note').hide();
            e.preventDefault();
        });

        $jq('body').on('click', '[data-close="note"]', function(e) {
            $jq(this).closest('.note').hide();
            e.preventDefault();
        });

        $jq('body').on('click', '[data-remove="note"]', function(e) {
            $jq(this).closest('.note').remove();
            e.preventDefault();
        });
    };

    // Handle Hower Dropdowns
    var handleDropdownHover = function() {
        $jq('[data-hover="dropdown"]').not('.hover-initialized').each(function() {
            $jq(this).dropdownHover();
            $jq(this).addClass('hover-initialized');
        });
    };

    // Handle textarea autosize 
    var handleTextareaAutosize = function() {
        if (typeof(autosize) == "function") {
            autosize(document.querySelector('textarea.autosizeme'));
        }
    }

    // Handles Bootstrap Popovers

    // last popep popover
    var lastPopedPopover;

    var handlePopovers = function() {
        $jq('.popovers').popover();

        // close last displayed popover

        $jq(document).on('click.bs.popover.data-api', function(e) {
            if (lastPopedPopover) {
                lastPopedPopover.popover('hide');
            }
        });
    };

    // Handles scrollable contents using jQuery SlimScroll plugin.
    var handleScrollers = function() {
        App.initSlimScroll('.scroller');
    };

    // Handles Image Preview using jQuery Fancybox plugin
    // var handleFancybox = function() {
    //     if (!jQuery.fancybox) {
    //         return;
    //     }
    //
    //     if ($jq(".fancybox-button").size() > 0) {
    //         $jq(".fancybox-button").fancybox({
    //             groupAttr: 'data-rel',
    //             prevEffect: 'none',
    //             nextEffect: 'none',
    //             closeBtn: true,
    //             helpers: {
    //                 title: {
    //                     type: 'inside'
    //                 }
    //             }
    //         });
    //     }
    // };

    // Handles counterup plugin wrapper
    var handleCounterup = function() {
        if (!$jq().counterUp) {
            return;
        }

        $jq("[data-counter='counterup']").counterUp({
            delay: 10,
            time: 1000
        });
    };

    // Fix input placeholder issue for IE8 and IE9
    var handleFixInputPlaceholderForIE = function() {
        //fix html5 placeholder attribute for ie7 & ie8
        if (isIE8 || isIE9) { // ie8 & ie9
            // this is html5 placeholder fix for inputs, inputs with placeholder-no-fix class will be skipped(e.g: we need this for password fields)
            $jq('input[placeholder]:not(.placeholder-no-fix), textarea[placeholder]:not(.placeholder-no-fix)').each(function() {
                var input = $jq(this);

                if (input.val() === '' && input.attr("placeholder") !== '') {
                    input.addClass("placeholder").val(input.attr('placeholder'));
                }

                input.focus(function() {
                    if (input.val() == input.attr('placeholder')) {
                        input.val('');
                    }
                });

                input.blur(function() {
                    if (input.val() === '' || input.val() == input.attr('placeholder')) {
                        input.val(input.attr('placeholder'));
                    }
                });
            });
        }
    };

    // Handle Select2 Dropdowns
    // var handleSelect2 = function() {
    //     if ($jq().select2) {
    //         $jq.fn.select2.defaults.set("theme", "bootstrap");
    //         $jq('.select2me').select2({
    //             placeholder: "Select",
    //             width: 'auto',
    //             allowClear: true
    //         });
    //     }
    // };

    // handle group element heights
    var handleHeight = function() {
        $jq('[data-auto-height]').each(function() {
            var parent = $jq(this);
            var items = $jq('[data-height]', parent);
            var height = 0;
            var mode = parent.attr('data-mode');
            var offset = parseInt(parent.attr('data-offset') ? parent.attr('data-offset') : 0);

            items.each(function() {
                if ($jq(this).attr('data-height') == "height") {
                    $jq(this).css('height', '');
                } else {
                    $jq(this).css('min-height', '');
                }

                var height_ = (mode == 'base-height' ? $jq(this).outerHeight() : $jq(this).outerHeight(true));
                if (height_ > height) {
                    height = height_;
                }
            });

            height = height + offset;

            items.each(function() {
                if ($jq(this).attr('data-height') == "height") {
                    $jq(this).css('height', height);
                } else {
                    $jq(this).css('min-height', height);
                }
            });

            if(parent.attr('data-related')) {
                $jq(parent.attr('data-related')).css('height', parent.height());
            }
        });
    }

    //* END:CORE HANDLERS *//

    return {

        //main function to initiate the theme
        init: function() {
            //IMPORTANT!!!: Do not modify the core handlers call order.

            //Core handlers
            handleInit(); // initialize core variables
            handleOnResize(); // set and handle responsive    

            //UI Component handlers     
            // handleMaterialDesign(); // handle material design
            // handleUniform(); // hanfle custom radio & checkboxes
            // handleiCheck(); // handles custom icheck radio and checkboxes
            // handleBootstrapSwitch(); // handle bootstrap switch plugin
            handleScrollers(); // handles slim scrolling contents 
            // handleFancybox(); // handle fancy box
            // handleSelect2(); // handle custom Select2 dropdowns
            // handlePortletTools(); // handles portlet action bar functionality(refresh, configure, toggle, remove)
            handleAlerts(); //handle closabled alerts
            handleDropdowns(); // handle dropdowns
            handleTabs(); // handle tabs
            handleTooltips(); // handle bootstrap tooltips
            handlePopovers(); // handles bootstrap popovers
            handleAccordions(); //handles accordions 
            handleModals(); // handle modals
            handleBootstrapConfirmation(); // handle bootstrap confirmations
            handleTextareaAutosize(); // handle autosize textareas
            handleCounterup(); // handle counterup instances

            //Handle group element heights
            this.addResizeHandler(handleHeight); // handle auto calculating height on window resize

            // Hacks
            handleFixInputPlaceholderForIE(); //IE8 & IE9 input placeholder issue fix
        },

        // //main function to initiate core javascript after ajax complete
        // initAjax: function() {
        //     handleUniform(); // handles custom radio & checkboxes
        //     handleiCheck(); // handles custom icheck radio and checkboxes
        //     handleBootstrapSwitch(); // handle bootstrap switch plugin
        //     handleDropdownHover(); // handles dropdown hover
        //     handleScrollers(); // handles slim scrolling contents
        //     handleSelect2(); // handle custom Select2 dropdowns
        //     handleFancybox(); // handle fancy box
        //     handleDropdowns(); // handle dropdowns
        //     handleTooltips(); // handle bootstrap tooltips
        //     handlePopovers(); // handles bootstrap popovers
        //     handleAccordions(); //handles accordions
        //     handleBootstrapConfirmation(); // handle bootstrap confirmations
        // },
        //
        // //init main components
        // initComponents: function() {
        //     this.initAjax();
        // },

        //public function to remember last opened popover that needs to be closed on click
        setLastPopedPopover: function(el) {
            lastPopedPopover = el;
        },

        //public function to add callback a function which will be called on window resize
        addResizeHandler: function(func) {
            resizeHandlers.push(func);
        },

        //public functon to call _runresizeHandlers
        runResizeHandlers: function() {
            _runResizeHandlers();
        },

        // wrApper function to scroll(focus) to an element
        scrollTo: function(el, offeset) {
            var pos = (el && el.size() > 0) ? el.offset().top : 0;

            if (el) {
                if ($jq('body').hasClass('page-header-fixed')) {
                    pos = pos - $jq('.page-header').height();
                } else if ($jq('body').hasClass('page-header-top-fixed')) {
                    pos = pos - $jq('.page-header-top').height();
                } else if ($jq('body').hasClass('page-header-menu-fixed')) {
                    pos = pos - $jq('.page-header-menu').height();
                }
                pos = pos + (offeset ? offeset : -1 * el.height());
            }

            $jq('html,body').animate({
                scrollTop: pos
            }, 'slow');
        },

        initSlimScroll: function(el) {
            $jq(el).each(function() {
                if ($jq(this).attr("data-initialized")) {
                    return; // exit
                }

                var height;

                if ($jq(this).attr("data-height")) {
                    height = $jq(this).attr("data-height");
                } else {
                    height = $jq(this).css('height');
                }

                $jq(this).slimScroll({
                    allowPageScroll: true, // allow page scroll when the element scroll is ended
                    size: '7px',
                    color: ($jq(this).attr("data-handle-color") ? $jq(this).attr("data-handle-color") : '#bbb'),
                    wrapperClass: ($jq(this).attr("data-wrapper-class") ? $jq(this).attr("data-wrapper-class") : 'slimScrollDiv'),
                    railColor: ($jq(this).attr("data-rail-color") ? $jq(this).attr("data-rail-color") : '#eaeaea'),
                    position: isRTL ? 'left' : 'right',
                    height: height,
                    alwaysVisible: ($jq(this).attr("data-always-visible") == "1" ? true : false),
                    railVisible: ($jq(this).attr("data-rail-visible") == "1" ? true : false),
                    disableFadeOut: true
                });

                $jq(this).attr("data-initialized", "1");
            });
        },

        destroySlimScroll: function(el) {
            $jq(el).each(function() {
                if ($jq(this).attr("data-initialized") === "1") { // destroy existing instance before updating the height
                    $jq(this).removeAttr("data-initialized");
                    $jq(this).removeAttr("style");

                    var attrList = {};

                    // store the custom attribures so later we will reassign.
                    if ($jq(this).attr("data-handle-color")) {
                        attrList["data-handle-color"] = $jq(this).attr("data-handle-color");
                    }
                    if ($jq(this).attr("data-wrapper-class")) {
                        attrList["data-wrapper-class"] = $jq(this).attr("data-wrapper-class");
                    }
                    if ($jq(this).attr("data-rail-color")) {
                        attrList["data-rail-color"] = $jq(this).attr("data-rail-color");
                    }
                    if ($jq(this).attr("data-always-visible")) {
                        attrList["data-always-visible"] = $jq(this).attr("data-always-visible");
                    }
                    if ($jq(this).attr("data-rail-visible")) {
                        attrList["data-rail-visible"] = $jq(this).attr("data-rail-visible");
                    }

                    $jq(this).slimScroll({
                        wrapperClass: ($jq(this).attr("data-wrapper-class") ? $jq(this).attr("data-wrapper-class") : 'slimScrollDiv'),
                        destroy: true
                    });

                    var the = $jq(this);

                    // reassign custom attributes
                    $jq.each(attrList, function(key, value) {
                        the.attr(key, value);
                    });

                }
            });
        },

        // function to scroll to the top
        scrollTop: function() {
            App.scrollTo();
        },

        // wrApper function to  block element(indicate loading)
        blockUI: function(options) {
            options = $jq.extend(true, {}, options);
            var html = '';
            if (options.animate) {
                html = '<div class="loading-message ' + (options.boxed ? 'loading-message-boxed' : '') + '">' + '<div class="block-spinner-bar"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>' + '</div>';
            } else if (options.iconOnly) {
                html = '<div class="loading-message ' + (options.boxed ? 'loading-message-boxed' : '') + '"><img src="' + this.getGlobalImgPath() + 'loading-spinner-grey.gif" align=""></div>';
            } else if (options.textOnly) {
                html = '<div class="loading-message ' + (options.boxed ? 'loading-message-boxed' : '') + '"><span>&nbsp;&nbsp;' + (options.message ? options.message : 'LOADING...') + '</span></div>';
            } else {
                html = '<div class="loading-message ' + (options.boxed ? 'loading-message-boxed' : '') + '"><img src="' + this.getGlobalImgPath() + 'loading-spinner-grey.gif" align=""><span>&nbsp;&nbsp;' + (options.message ? options.message : 'LOADING...') + '</span></div>';
            }

            if (options.target) { // element blocking
                var el = $jq(options.target);
                if (el.height() <= ($jq(window).height())) {
                    options.cenrerY = true;
                }
                el.block({
                    message: html,
                    baseZ: options.zIndex ? options.zIndex : 1000,
                    centerY: options.cenrerY !== undefined ? options.cenrerY : false,
                    css: {
                        top: '10%',
                        border: '0',
                        padding: '0',
                        backgroundColor: 'none'
                    },
                    overlayCSS: {
                        backgroundColor: options.overlayColor ? options.overlayColor : '#555',
                        opacity: options.boxed ? 0.05 : 0.1,
                        cursor: 'wait'
                    }
                });
            } else { // page blocking
                $jq.blockUI({
                    message: html,
                    baseZ: options.zIndex ? options.zIndex : 1000,
                    css: {
                        border: '0',
                        padding: '0',
                        backgroundColor: 'none'
                    },
                    overlayCSS: {
                        backgroundColor: options.overlayColor ? options.overlayColor : '#555',
                        opacity: options.boxed ? 0.05 : 0.1,
                        cursor: 'wait'
                    }
                });
            }
        },

        // wrApper function to  un-block element(finish loading)
        unblockUI: function(target) {
            if (target) {
                $jq(target).unblock({
                    onUnblock: function() {
                        $jq(target).css('position', '');
                        $jq(target).css('zoom', '');
                    }
                });
            } else {
                $jq.unblockUI();
            }
        },

        startPageLoading: function(options) {
            if (options && options.animate) {
                $jq('.page-spinner-bar').remove();
                $jq('body').append('<div class="page-spinner-bar"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>');
            } else {
                $jq('.page-loading').remove();
                $jq('body').append('<div class="page-loading"><img src="' + this.getGlobalImgPath() + 'loading-spinner-grey.gif"/>&nbsp;&nbsp;<span>' + (options && options.message ? options.message : 'Loading...') + '</span></div>');
            }
        },

        stopPageLoading: function() {
            $jq('.page-loading, .page-spinner-bar').remove();
        },

        alert: function(options) {

            options = $jq.extend(true, {
                container: "", // alerts parent container(by default placed after the page breadcrumbs)
                place: "append", // "append" or "prepend" in container 
                type: 'success', // alert's type
                message: "", // alert's message
                close: true, // make alert closable
                reset: true, // close all previouse alerts first
                focus: true, // auto scroll to the alert after shown
                closeInSeconds: 0, // auto close after defined seconds
                icon: "" // put icon before the message
            }, options);

            var id = App.getUniqueID("App_alert");

            var html = '<div id="' + id + '" class="custom-alerts alert alert-' + options.type + ' fade in">' + (options.close ? '<button type="button" class="close" data-dismiss="alert" aria-hidden="true"></button>' : '') + (options.icon !== "" ? '<i class="fa-lg fa fa-' + options.icon + '"></i>  ' : '') + options.message + '</div>';

            if (options.reset) {
                $jq('.custom-alerts').remove();
            }

            if (!options.container) {
                if ($jq('body').hasClass("page-container-bg-solid") || $jq('body').hasClass("page-content-white")) {
                    $jq('.page-title').after(html);
                } else {
                    if ($jq('.page-bar').size() > 0) {
                        $jq('.page-bar').after(html);
                    } else {
                        $jq('.page-breadcrumb').after(html);
                    }
                }
            } else {
                if (options.place == "append") {
                    $jq(options.container).append(html);
                } else {
                    $jq(options.container).prepend(html);
                }
            }

            if (options.focus) {
                App.scrollTo($jq('#' + id));
            }

            if (options.closeInSeconds > 0) {
                setTimeout(function() {
                    $jq('#' + id).remove();
                }, options.closeInSeconds * 1000);
            }

            return id;
        },

        // initializes uniform elements
        initUniform: function(els) {
            if (els) {
                $jq(els).each(function() {
                    if ($jq(this).parents(".checker").size() === 0) {
                        $jq(this).show();
                        $jq(this).uniform();
                    }
                });
            } else {
                handleUniform();
            }
        },

        //wrApper function to update/sync jquery uniform checkbox & radios
        updateUniform: function(els) {
            $jq.uniform.update(els); // update the uniform checkbox & radios UI after the actual input control state changed
        },

        //public function to initialize the fancybox plugin
        // initFancybox: function() {
        //     handleFancybox();
        // },

        //public helper function to get actual input value(used in IE9 and IE8 due to placeholder attribute not supported)
        getActualVal: function(el) {
            el = $jq(el);
            if (el.val() === el.attr("placeholder")) {
                return "";
            }
            return el.val();
        },

        //public function to get a paremeter by name from URL
        getURLParameter: function(paramName) {
            var searchString = window.location.search.substring(1),
                i, val, params = searchString.split("&");

            for (i = 0; i < params.length; i++) {
                val = params[i].split("=");
                if (val[0] == paramName) {
                    return unescape(val[1]);
                }
            }
            return null;
        },

        // check for device touch support
        isTouchDevice: function() {
            try {
                document.createEvent("TouchEvent");
                return true;
            } catch (e) {
                return false;
            }
        },

        // To get the correct viewport width based on  http://andylangton.co.uk/articles/javascript/get-viewport-size-javascript/
        getViewPort: function() {
            var e = window,
                a = 'inner';
            if (!('innerWidth' in window)) {
                a = 'client';
                e = document.documentElement || document.body;
            }

            return {
                width: e[a + 'Width'],
                height: e[a + 'Height']
            };
        },

        getUniqueID: function(prefix) {
            return 'prefix_' + Math.floor(Math.random() * (new Date()).getTime());
        },

        // check IE8 mode
        isIE8: function() {
            return isIE8;
        },

        // check IE9 mode
        isIE9: function() {
            return isIE9;
        },

        //check RTL mode
        isRTL: function() {
            return isRTL;
        },

        // check IE8 mode
        isAngularJsApp: function() {
            return (typeof angular == 'undefined') ? false : true;
        },

        getAssetsPath: function() {
            return assetsPath;
        },

        setAssetsPath: function(path) {
            assetsPath = path;
        },

        setGlobalImgPath: function(path) {
            globalImgPath = path;
        },

        getGlobalImgPath: function() {
            return assetsPath + globalImgPath;
        },

        setGlobalPluginsPath: function(path) {
            globalPluginsPath = path;
        },

        getGlobalPluginsPath: function() {
            return assetsPath + globalPluginsPath;
        },

        getGlobalCssPath: function() {
            return assetsPath + globalCssPath;
        },

        // get layout color code by color name
        getBrandColor: function(name) {
            if (brandColors[name]) {
                return brandColors[name];
            } else {
                return '';
            }
        },

        getResponsiveBreakpoint: function(size) {
            // bootstrap responsive breakpoints
            var sizes = {
                'xs' : 480,     // extra small
                'sm' : 768,     // small
                'md' : 992,     // medium
                'lg' : 1200     // large
            };

            return sizes[size] ? sizes[size] : 0;
        }
    };

}();

$jq(document).ready(function() {
    App.init();
});