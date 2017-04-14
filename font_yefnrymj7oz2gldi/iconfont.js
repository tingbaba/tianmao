;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-pingguo-copy" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M644.48 205.184c49.344-57.472 44.864-142.528 44.864-142.528S605.12 70.464 555.808 128c-49.344 57.376-44.864 142.592-44.864 142.592S595.136 262.72 644.48 205.184L644.48 205.184zM751.456 536.832c0-72.544 40-135.744 98.976-168.576-41.216-59.52-113.728-92.48-164.096-92.48-60.576 0-144.032 42.784-168.256 42.784-25.728 0-79.648-38.688-151.488-39.744-59.328-0.864-159.008 33.632-193.888 135.968-34.848 102.24-33.216 250.08 39.712 387.424 58.496 109.984 110.208 154.528 160.224 154.528 50.08 0 109.088-38.208 156.096-38.208 46.944 0 90.912 38.208 139.424 38.208 48.416 0 98.432-39.776 134.784-94.688 36.352-55.04 69.76-140.512 69.76-140.512s0.192-2.24 0.672-5.504C802.048 688.192 751.456 618.496 751.456 536.832L751.456 536.832zM751.456 536.832"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-ping" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M959.64939 88.453564H64.469314c-35.155684 0-63.941288 29.344329-63.941288 65.177442v554.186822c0 35.833113 28.785603 65.175395 63.941288 65.175395h415.620929v97.965195H320.235488c-17.655102 0-31.972179 14.591323-31.972179 32.589233 0 17.999956 14.317077 32.586163 31.972179 32.586162h383.64875c17.658172 0 31.969109-14.586207 31.969109-32.586162 0-17.996886-14.310937-32.589233-31.969109-32.589233H544.028461v-97.965195h415.620929c35.155684 0 63.941288-29.341259 63.941288-65.175395V153.631006c0-35.833113-28.785603-65.177442-63.941288-65.177442z m0 619.364264H64.469314V153.631006h895.180076v554.186822z" fill="#252434" ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)