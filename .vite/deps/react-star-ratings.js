import {
  require_prop_types
} from "./chunk-Q4O2WPEZ.js";
import "./chunk-KXMNDRCQ.js";
import {
  require_react
} from "./chunk-JFTBQ7A7.js";
import {
  __commonJS
} from "./chunk-AC2VUBZ6.js";

// node_modules/classnames/index.js
var require_classnames = __commonJS({
  "node_modules/classnames/index.js"(exports, module) {
    (function() {
      "use strict";
      var hasOwn = {}.hasOwnProperty;
      var nativeCodeString = "[native code]";
      function classNames() {
        var classes = [];
        for (var i = 0; i < arguments.length; i++) {
          var arg = arguments[i];
          if (!arg)
            continue;
          var argType = typeof arg;
          if (argType === "string" || argType === "number") {
            classes.push(arg);
          } else if (Array.isArray(arg)) {
            if (arg.length) {
              var inner = classNames.apply(null, arg);
              if (inner) {
                classes.push(inner);
              }
            }
          } else if (argType === "object") {
            if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes("[native code]")) {
              classes.push(arg.toString());
              continue;
            }
            for (var key in arg) {
              if (hasOwn.call(arg, key) && arg[key]) {
                classes.push(key);
              }
            }
          }
        }
        return classes.join(" ");
      }
      if (typeof module !== "undefined" && module.exports) {
        classNames.default = classNames;
        module.exports = classNames;
      } else if (typeof define === "function" && typeof define.amd === "object" && define.amd) {
        define("classnames", [], function() {
          return classNames;
        });
      } else {
        window.classNames = classNames;
      }
    })();
  }
});

// node_modules/react-star-ratings/build/star.js
var require_star = __commonJS({
  "node_modules/react-star-ratings/build/star.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _createClass = function() {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor)
            descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      return function(Constructor, protoProps, staticProps) {
        if (protoProps)
          defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
          defineProperties(Constructor, staticProps);
        return Constructor;
      };
    }();
    var _react = require_react();
    var _react2 = _interopRequireDefault(_react);
    var _classnames = require_classnames();
    var _classnames2 = _interopRequireDefault(_classnames);
    var _propTypes = require_prop_types();
    var _propTypes2 = _interopRequireDefault(_propTypes);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _possibleConstructorReturn(self, call) {
      if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
      if (superClass)
        Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }
    var Star = function(_React$Component) {
      _inherits(Star2, _React$Component);
      function Star2() {
        _classCallCheck(this, Star2);
        return _possibleConstructorReturn(this, (Star2.__proto__ || Object.getPrototypeOf(Star2)).apply(this, arguments));
      }
      _createClass(Star2, [{
        key: "render",
        value: function render() {
          var _props = this.props, changeRating = _props.changeRating, hoverOverStar = _props.hoverOverStar, unHoverOverStar = _props.unHoverOverStar, svgIconViewBox = _props.svgIconViewBox, svgIconPath = _props.svgIconPath;
          return _react2.default.createElement(
            "div",
            {
              className: "star-container",
              style: this.starContainerStyle,
              onMouseEnter: hoverOverStar,
              onMouseLeave: unHoverOverStar,
              onClick: changeRating
            },
            _react2.default.createElement(
              "svg",
              {
                viewBox: svgIconViewBox,
                className: this.starClasses,
                style: this.starSvgStyle
              },
              _react2.default.createElement("path", {
                className: "star",
                style: this.pathStyle,
                d: svgIconPath
              })
            )
          );
        }
      }, {
        key: "starContainerStyle",
        get: function get() {
          var _props2 = this.props, changeRating = _props2.changeRating, starSpacing = _props2.starSpacing, isFirstStar = _props2.isFirstStar, isLastStar = _props2.isLastStar, ignoreInlineStyles = _props2.ignoreInlineStyles;
          var starContainerStyle = {
            position: "relative",
            display: "inline-block",
            verticalAlign: "middle",
            paddingLeft: isFirstStar ? void 0 : starSpacing,
            paddingRight: isLastStar ? void 0 : starSpacing,
            cursor: changeRating ? "pointer" : void 0
          };
          return ignoreInlineStyles ? {} : starContainerStyle;
        }
      }, {
        key: "starSvgStyle",
        get: function get() {
          var _props3 = this.props, ignoreInlineStyles = _props3.ignoreInlineStyles, isCurrentHoveredStar = _props3.isCurrentHoveredStar, starDimension = _props3.starDimension;
          var starSvgStyle = {
            width: starDimension,
            height: starDimension,
            transition: "transform .2s ease-in-out",
            transform: isCurrentHoveredStar ? "scale(1.1)" : void 0
          };
          return ignoreInlineStyles ? {} : starSvgStyle;
        }
      }, {
        key: "pathStyle",
        get: function get() {
          var _props4 = this.props, isStarred = _props4.isStarred, isPartiallyFullStar = _props4.isPartiallyFullStar, isHovered = _props4.isHovered, hoverMode = _props4.hoverMode, starEmptyColor = _props4.starEmptyColor, starRatedColor = _props4.starRatedColor, starHoverColor = _props4.starHoverColor, gradientPathName = _props4.gradientPathName, fillId = _props4.fillId, ignoreInlineStyles = _props4.ignoreInlineStyles;
          var fill = void 0;
          if (hoverMode) {
            if (isHovered)
              fill = starHoverColor;
            else
              fill = starEmptyColor;
          } else {
            if (isPartiallyFullStar)
              fill = "url('" + gradientPathName + "#" + fillId + "')";
            else if (isStarred)
              fill = starRatedColor;
            else
              fill = starEmptyColor;
          }
          var pathStyle = {
            fill,
            transition: "fill .2s ease-in-out"
          };
          return ignoreInlineStyles ? {} : pathStyle;
        }
      }, {
        key: "starClasses",
        get: function get() {
          var _props5 = this.props, isSelected = _props5.isSelected, isPartiallyFullStar = _props5.isPartiallyFullStar, isHovered = _props5.isHovered, isCurrentHoveredStar = _props5.isCurrentHoveredStar, ignoreInlineStyles = _props5.ignoreInlineStyles;
          var starClasses = (0, _classnames2.default)({
            "widget-svg": true,
            "widget-selected": isSelected,
            "multi-widget-selected": isPartiallyFullStar,
            "hovered": isHovered,
            "current-hovered": isCurrentHoveredStar
          });
          return ignoreInlineStyles ? {} : starClasses;
        }
      }]);
      return Star2;
    }(_react2.default.Component);
    Star.propTypes = {
      fillId: _propTypes2.default.string.isRequired,
      changeRating: _propTypes2.default.func,
      hoverOverStar: _propTypes2.default.func,
      unHoverOverStar: _propTypes2.default.func,
      isStarred: _propTypes2.default.bool.isRequired,
      isPartiallyFullStar: _propTypes2.default.bool.isRequired,
      isHovered: _propTypes2.default.bool.isRequired,
      hoverMode: _propTypes2.default.bool.isRequired,
      isCurrentHoveredStar: _propTypes2.default.bool.isRequired,
      isFirstStar: _propTypes2.default.bool.isRequired,
      isLastStar: _propTypes2.default.bool.isRequired,
      starDimension: _propTypes2.default.string.isRequired,
      starSpacing: _propTypes2.default.string.isRequired,
      starHoverColor: _propTypes2.default.string.isRequired,
      starRatedColor: _propTypes2.default.string.isRequired,
      starEmptyColor: _propTypes2.default.string.isRequired,
      gradientPathName: _propTypes2.default.string.isRequired,
      ignoreInlineStyles: _propTypes2.default.bool.isRequired,
      svgIconPath: _propTypes2.default.string.isRequired,
      svgIconViewBox: _propTypes2.default.string.isRequired
    };
    exports.default = Star;
  }
});

// node_modules/react-star-ratings/build/star-ratings.js
var require_star_ratings = __commonJS({
  "node_modules/react-star-ratings/build/star-ratings.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _createClass = function() {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor)
            descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      return function(Constructor, protoProps, staticProps) {
        if (protoProps)
          defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
          defineProperties(Constructor, staticProps);
        return Constructor;
      };
    }();
    var _react = require_react();
    var _react2 = _interopRequireDefault(_react);
    var _propTypes = require_prop_types();
    var _propTypes2 = _interopRequireDefault(_propTypes);
    var _star = require_star();
    var _star2 = _interopRequireDefault(_star);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _possibleConstructorReturn(self, call) {
      if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
      if (superClass)
        Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }
    var StarRatings = function(_React$Component) {
      _inherits(StarRatings2, _React$Component);
      function StarRatings2() {
        var _ref;
        var _temp, _this, _ret;
        _classCallCheck(this, StarRatings2);
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = StarRatings2.__proto__ || Object.getPrototypeOf(StarRatings2)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
          highestStarHovered: -Infinity
        }, _this.fillId = "starGrad" + Math.random().toFixed(15).slice(2), _this.hoverOverStar = function(starRating) {
          return function() {
            _this.setState({
              highestStarHovered: starRating
            });
          };
        }, _this.unHoverOverStar = function() {
          _this.setState({
            highestStarHovered: -Infinity
          });
        }, _temp), _possibleConstructorReturn(_this, _ret);
      }
      _createClass(StarRatings2, [{
        key: "stopColorStyle",
        value: function stopColorStyle(color) {
          var stopColorStyle2 = {
            stopColor: color,
            stopOpacity: "1"
          };
          return this.props.ignoreInlineStyles ? {} : stopColorStyle2;
        }
      }, {
        key: "render",
        value: function render() {
          var _props = this.props, starRatedColor = _props.starRatedColor, starEmptyColor = _props.starEmptyColor;
          return _react2.default.createElement(
            "div",
            {
              className: "star-ratings",
              title: this.titleText,
              style: this.starRatingsStyle
            },
            _react2.default.createElement(
              "svg",
              {
                className: "star-grad",
                style: this.starGradientStyle
              },
              _react2.default.createElement(
                "defs",
                null,
                _react2.default.createElement(
                  "linearGradient",
                  { id: this.fillId, x1: "0%", y1: "0%", x2: "100%", y2: "0%" },
                  _react2.default.createElement("stop", { offset: "0%", className: "stop-color-first", style: this.stopColorStyle(starRatedColor) }),
                  _react2.default.createElement("stop", { offset: this.offsetValue, className: "stop-color-first", style: this.stopColorStyle(starRatedColor) }),
                  _react2.default.createElement("stop", { offset: this.offsetValue, className: "stop-color-final", style: this.stopColorStyle(starEmptyColor) }),
                  _react2.default.createElement("stop", { offset: "100%", className: "stop-color-final", style: this.stopColorStyle(starEmptyColor) })
                )
              )
            ),
            this.renderStars
          );
        }
      }, {
        key: "starRatingsStyle",
        get: function get() {
          var starRatingsStyle = {
            position: "relative",
            boxSizing: "border-box",
            display: "inline-block"
          };
          return this.props.ignoreInlineStyles ? {} : starRatingsStyle;
        }
      }, {
        key: "starGradientStyle",
        get: function get() {
          var starGradientStyle = {
            position: "absolute",
            zIndex: "0",
            width: "0",
            height: "0",
            visibility: "hidden"
          };
          return this.props.ignoreInlineStyles ? {} : starGradientStyle;
        }
      }, {
        key: "titleText",
        get: function get() {
          var _props2 = this.props, typeOfWidget = _props2.typeOfWidget, selectedRating = _props2.rating;
          var hoveredRating = this.state.highestStarHovered;
          var currentRating = hoveredRating > 0 ? hoveredRating : selectedRating;
          var formattedRating = parseFloat(currentRating.toFixed(2)).toString();
          if (Number.isInteger(currentRating)) {
            formattedRating = String(currentRating);
          }
          var starText = typeOfWidget + "s";
          if (formattedRating === "1") {
            starText = typeOfWidget;
          }
          return formattedRating + " " + starText;
        }
      }, {
        key: "offsetValue",
        get: function get() {
          var rating = this.props.rating;
          var ratingIsInteger = Number.isInteger(rating);
          var offsetValue = "0%";
          if (!ratingIsInteger) {
            var firstTwoDecimals = rating.toFixed(2).split(".")[1].slice(0, 2);
            offsetValue = firstTwoDecimals + "%";
          }
          return offsetValue;
        }
      }, {
        key: "renderStars",
        get: function get() {
          var _this2 = this;
          var _props3 = this.props, changeRating = _props3.changeRating, selectedRating = _props3.rating, numberOfStars = _props3.numberOfStars, starDimension = _props3.starDimension, starSpacing = _props3.starSpacing, starRatedColor = _props3.starRatedColor, starEmptyColor = _props3.starEmptyColor, starHoverColor = _props3.starHoverColor, gradientPathName = _props3.gradientPathName, ignoreInlineStyles = _props3.ignoreInlineStyles, svgIconPath = _props3.svgIconPath, svgIconViewBox = _props3.svgIconViewBox, name = _props3.name;
          var highestStarHovered = this.state.highestStarHovered;
          var numberOfStarsArray = Array.apply(null, Array(numberOfStars));
          return numberOfStarsArray.map(function(_, index) {
            var starRating = index + 1;
            var isStarred = starRating <= selectedRating;
            var hoverMode = highestStarHovered > 0;
            var isHovered = starRating <= highestStarHovered;
            var isCurrentHoveredStar = starRating === highestStarHovered;
            var isPartiallyFullStar = starRating > selectedRating && starRating - 1 < selectedRating;
            var isFirstStar = starRating === 1;
            var isLastStar = starRating === numberOfStars;
            return _react2.default.createElement(_star2.default, {
              key: starRating,
              fillId: _this2.fillId,
              changeRating: changeRating ? function() {
                return changeRating(starRating, name);
              } : null,
              hoverOverStar: changeRating ? _this2.hoverOverStar(starRating) : null,
              unHoverOverStar: changeRating ? _this2.unHoverOverStar : null,
              isStarred,
              isPartiallyFullStar,
              isHovered,
              hoverMode,
              isCurrentHoveredStar,
              isFirstStar,
              isLastStar,
              starDimension,
              starSpacing,
              starHoverColor,
              starRatedColor,
              starEmptyColor,
              gradientPathName,
              ignoreInlineStyles,
              svgIconPath,
              svgIconViewBox
            });
          });
        }
      }]);
      return StarRatings2;
    }(_react2.default.Component);
    StarRatings.propTypes = {
      rating: _propTypes2.default.number.isRequired,
      numberOfStars: _propTypes2.default.number.isRequired,
      changeRating: _propTypes2.default.func,
      starHoverColor: _propTypes2.default.string.isRequired,
      starRatedColor: _propTypes2.default.string.isRequired,
      starEmptyColor: _propTypes2.default.string.isRequired,
      starDimension: _propTypes2.default.string.isRequired,
      starSpacing: _propTypes2.default.string.isRequired,
      gradientPathName: _propTypes2.default.string.isRequired,
      ignoreInlineStyles: _propTypes2.default.bool.isRequired,
      svgIconPath: _propTypes2.default.string.isRequired,
      svgIconViewBox: _propTypes2.default.string.isRequired,
      name: _propTypes2.default.string
    };
    StarRatings.defaultProps = {
      rating: 0,
      typeOfWidget: "Star",
      numberOfStars: 5,
      changeRating: null,
      starHoverColor: "rgb(230, 67, 47)",
      starRatedColor: "rgb(109, 122, 130)",
      starEmptyColor: "rgb(203, 211, 227)",
      starDimension: "50px",
      starSpacing: "7px",
      gradientPathName: "",
      ignoreInlineStyles: false,
      svgIconPath: "m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z",
      svgIconViewBox: "0 0 51 48"
    };
    exports.default = StarRatings;
  }
});

// node_modules/react-star-ratings/build/index.js
var require_build = __commonJS({
  "node_modules/react-star-ratings/build/index.js"(exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _starRatings = require_star_ratings();
    var _starRatings2 = _interopRequireDefault(_starRatings);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    Number.isInteger = Number.isInteger || function(value) {
      return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
    };
    exports.default = _starRatings2.default;
  }
});
export default require_build();
/*! Bundled license information:

classnames/index.js:
  (*!
  	Copyright (c) 2018 Jed Watson.
  	Licensed under the MIT License (MIT), see
  	http://jedwatson.github.io/classnames
  *)
*/
//# sourceMappingURL=react-star-ratings.js.map