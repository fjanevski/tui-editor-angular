webpackJsonp([1,4],{

/***/ 100:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
var environment = {
    production: true
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ 158:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(14)();
// imports


// module
exports.push([module.i, ".editor-container {\n  max-width: 1200px;\n  margin: 50px auto;\n}\n\n.data-display {\n  padding-top: 20px;\n  display: block;\n}\n\n.html-data {\n  padding: 10px;\n  margin-right: 10px;\n  float: left;\n  width: calc(50% - 32px);\n  border: 1px solid lightgray;\n}\n\npre {\n  white-space: pre-line;\n}\n\n.markdown-data {\n  padding: 10px;\n  margin-left: 10px;\n  float: right;\n  width: calc(50% - 32px);\n  border: 1px solid lightgray;\n}\n\n.editor-options {\n  padding: 10px;\n  margin: 20px 0;\n  border: 1px solid lightgray;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 159:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(14)();
// imports


// module
exports.push([module.i, ".cloak-link {\n  background: red !important;\n}\n\n.code-block-header button {\n  display: none;\n}\n\n.cta-button {\n  background: #ff8500 !important;\n  border-radius: 3px !important;\n  padding: 5px !important;\n  color: white !important;\n  text-align: center !important;\n  margin-bottom: 10px;\n}\n\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 393:
/***/ (function(module, exports) {

module.exports = "<div class=\"editor-container\">\n  <h1>TUI Editor POC</h1>\n\n  <div class=\"editor-options\">\n    <input type=\"checkbox\" (change)=\"onShouldRemoveAddInlineCode()\">\n    <label>Remove option to add inline code</label>\n\n  </div>\n\n  <app-editor (onSaveHTMLData)=\"onSaveHTMLData($event)\"\n              (onSaveMarkdownData)=\"onSaveMarkdownData($event)\">\n  </app-editor>\n\n  <div class=\"data-display\">\n    <div class=\"html-data\">\n      <h2>html</h2>\n      <hr>\n      <pre>{{ htmlData }}</pre>\n    </div>\n    <div class=\"markdown-data\">\n      <h2>markdown</h2>\n      <hr>\n      <pre>{{ markdownData }}</pre>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ 394:
/***/ (function(module, exports) {

module.exports = "<div #editor></div>\n"

/***/ }),

/***/ 430:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(88);


/***/ }),

/***/ 54:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_tui_editor__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_tui_editor___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_tui_editor__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CTALinkService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var cloakLinkButtonClickEvent = 'cloakLinkButtonClickEvent';
var saveCloakLinkEvent = 'saveCloakLinkEvent';
var linkWithAttributes = /<a href="([^"]*)"\s(rel=".+?"\sclass=".+?"\starget=".+?)">(.+?)<\/a>/g;
var faleseSanitizedMarkdownClickoutLink = /\\{clickout\\}.+?\\{clickoutend\\}/g;
var htmlclickoutlink = /<a(.+?)(?:href=.+?)(.+?)"(.+?)class="clickout">(.+?)<\/a>/g;
var intermediateHtmlClickoutLink = /{clickout}<a href="(.+?)">(.+?)<\/a>{(.+?)}{clickoutend}/g;
var POPUP_CONTENT = "\n  <label for=\"linkText\">Link text</label>\n    <input type=\"text\" class=\"te-link-text-input\" value=\"{{editorot}}\"/>\n  <label for=\"url\">URL</label>\n    <input type=\"text\" class=\"te-url-input\" />\n  <div class=\"te-button-section\">\n    <button type=\"button\" class=\"te-ok-button\">OK</button>\n    <button type=\"button\" class=\"te-close-button\">Cancel</button>\n  </div>\n";
var CTALinkService = (function () {
    function CTALinkService() {
        this.ctaLinkPopup = null;
    }
    CTALinkService.prototype.registerCloakLink = function (editor) {
        var _this = this;
        this.preparation(editor);
        this.ctaLinkButton = new __WEBPACK_IMPORTED_MODULE_1_tui_editor__["Button"]({
            className: 'cloak-link',
            event: cloakLinkButtonClickEvent,
            tooltip: __WEBPACK_IMPORTED_MODULE_1_tui_editor__["i18n"].get('cta_link')
        });
        editor.eventManager.addEventType(cloakLinkButtonClickEvent);
        editor.eventManager.listen('convertorAfterHtmlToMarkdownConverted', function (markdown) {
            return markdown.replace(faleseSanitizedMarkdownClickoutLink, function (fullmatch) {
                return fullmatch.replace(/\\/g, '');
            });
        });
        editor.eventManager.listen('convertorBeforeHtmlToMarkdownConverted', function (html) {
            return html.replace(linkWithAttributes, function (matched, url, attributes, text) {
                return "{clickout}[" + text + "](" + url + "){" + attributes + "\"}{clickoutend}";
            });
        });
        editor.eventManager.listen('convertorAfterMarkdownToHtmlConverted', function (html) {
            // advanced replacement for links with attributes
            return html.replace(intermediateHtmlClickoutLink, function (matched, url, text, attributes) {
                return "<a href=\"" + url + "\" " + attributes + ">" + text + "</a>";
            });
        });
        editor.eventManager.listen(cloakLinkButtonClickEvent, function () {
            _this.ctaLinkPopup = editor.getUI().createPopup({
                content: POPUP_CONTENT.replace('{{editorot}}', editor.getSelectedText()),
                className: 'tui-editor-popup',
                $target: editor.getUI().$el,
                header: true,
                title: __WEBPACK_IMPORTED_MODULE_1_tui_editor__["i18n"].get('add_cta_link')
            });
            _this.ctaLinkPopup.on('click .te-close-button', function () {
                _this.ctaLinkPopup.hide();
            });
            _this.ctaLinkPopup.on('click .te-ok-button', function () {
                editor.exec('AddCTALink', {
                    linkText: _this.ctaLinkPopup.$el.find('input.te-link-text-input').val(),
                    url: _this.ctaLinkPopup.$el.find('input.te-url-input').val(),
                    attributes: 'rel="nofollow" class="clickout" target="_blank"'
                });
                _this.ctaLinkPopup.hide();
            });
            _this.ctaLinkPopup.show();
        });
        editor.getUI().toolbar.addButton(this.ctaLinkButton);
    };
    CTALinkService.prototype.preparation = function (editor) {
        editor.i18n.setLanguage(['en_US'], {
            'cta_link': 'CTA Link',
            'add_cta_link': 'Add CTA Link'
        });
    };
    return CTALinkService;
}());
CTALinkService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])()
], CTALinkService);

//# sourceMappingURL=cloakLink.service.js.map

/***/ }),

/***/ 55:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_tui_editor__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_tui_editor___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_tui_editor__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__editor_types__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ctaLink_cloakLink_service__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__commands_markdownCommands_AddCTALink__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__commands_wysiwygCommands_AddCTALink__ = __webpack_require__(98);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditorComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var EditorComponent = (function () {
    function EditorComponent(ctaLinkService) {
        this.ctaLinkService = ctaLinkService;
        this.onSaveHTMLData = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* EventEmitter */]();
        this.onSaveMarkdownData = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* EventEmitter */]();
        this.editor = null;
        this.addInlineCode = null;
    }
    EditorComponent.prototype.ngOnInit = function () {
        this.editor = new __WEBPACK_IMPORTED_MODULE_1_tui_editor__({
            el: this.child.nativeElement,
            initialEditType: __WEBPACK_IMPORTED_MODULE_2__editor_types__["a" /* EDITOR_TYPE */].WYSIWYG,
            previewStyle: 'vertical',
            height: '300px',
            events: {
                load: this.onLoad.bind(this),
                change: this.onChange.bind(this),
                blur: function () {
                    // implementation of actual saving
                },
                paste: this.onPaste.bind(this),
                drop: this.onPreventDrop.bind(this),
            }
        });
        // Register Markdown commands
        this.editor.addCommand(__WEBPACK_IMPORTED_MODULE_4__commands_markdownCommands_AddCTALink__["a" /* MdAddCTALink */]);
        // Register Wysiwyg commands
        this.editor.addCommand(__WEBPACK_IMPORTED_MODULE_5__commands_wysiwygCommands_AddCTALink__["a" /* WwAddCTALink */]);
        // this.editor.eventManager.listen('convertorBeforeHtmlToMarkdownConverted', (html) => {
        //   return html.replace(/<a href="(.+?)"(?: rel="nofollow")>(.+?)<\/a>/, function (founded, href, text) {
        //     return `[${text}](${href}){: rel="nofollow"}`;
        //   });
        // });
        //
        // this.editor.eventManager.listen('convertorAfterHtmlToMarkdownConverted', (markdown) => {
        //   return markdown.replace(/\\/g, '');
        // });
        //
        // this.editor.eventManager.listen('convertorAfterMarkdownToHtmlConverted', (html) => {
        //   return html.replace(/{:.+}/g, '');
        // });
        this.ctaLinkService.registerCloakLink(this.editor);
        this.onChange();
    };
    EditorComponent.prototype.ngOnDestroy = function () {
        this.onSaveMarkdownData.unsubscribe();
        this.onSaveHTMLData.unsubscribe();
    };
    EditorComponent.prototype.removeAddInlineCodeButton = function () {
        this.editor.getUI().toolbar.$el.find('.tui-code').remove();
    };
    EditorComponent.prototype.addInlineCodeButton = function () {
        this.editor.getUI().toolbar.addButton(this.addInlineCode.button, this.addInlineCode.index + 1);
    };
    EditorComponent.prototype.onLoad = function (editor) {
        // Remove codeblock button
        editor.getUI().toolbar.$el.find('.tui-codeblock').remove();
        var intermediateHtmlClickoutLink = /{clickout}<a href="(.+?)">(.+?)<\/a>{(.+?)}{clickoutend}/g;
        var value = '{clickout}<a href="https://www.google.com">texxxt</a>{rel="nofollow" class="clickout" target="_blank"}{clickoutend}'.replace(intermediateHtmlClickoutLink, function (matched, url, text, attributes) {
            return "<a href=\"" + url + "\" " + attributes + ">" + text + "</a>";
        });
        console.log(value);
        editor.setHtml(value);
        // editor.setValue(editor.convertor.toHTML(value));
        // Remove H1 from Headings
        editor.getUI().popupAddHeading.$el.find("li[data-value=1]").remove();
        this.addInlineCode = this.getInlineCodeButton(editor);
    };
    EditorComponent.prototype.onChange = function () {
        var markdownData = this.editor.getMarkdown();
        this.onSaveMarkdownData.emit(markdownData);
        var htmlData = this.editor.getHtml();
        this.onSaveHTMLData.emit(htmlData);
    };
    ;
    EditorComponent.prototype.onPaste = function (event) {
        event.data.preventDefault();
        var text = event.data.clipboardData.getData('text/plain');
        if (event.source === __WEBPACK_IMPORTED_MODULE_2__editor_types__["a" /* EDITOR_TYPE */].MARKDOWN) {
            var content = this.editor.convertor.toMarkdown(text);
            this.editor.mdEditor.replaceSelection(content);
            this.editor.setMarkdown(this.editor.mdEditor.getValue(), true);
        }
        else {
            var content = this.editor.convertor.toHTML(text);
            this.editor.wwEditor.replaceSelection(content);
            this.editor.setHtml(this.editor.wwEditor.getValue(), true);
        }
        this.onChange();
    };
    EditorComponent.prototype.onPreventDrop = function (event) {
        // to be implemented
    };
    EditorComponent.prototype.getInlineCodeButton = function (editor) {
        var index = editor.getUI().toolbar.buttons.findIndex(function (_a) {
            var className = _a.className;
            return className.includes('tui-code');
        });
        return {
            button: editor.getUI().toolbar.buttons[index],
            index: index
        };
    };
    return EditorComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* ViewChild */])('editor', { read: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* ElementRef */] }),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* ElementRef */]) === "function" && _a || Object)
], EditorComponent.prototype, "child", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Output */])(),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* EventEmitter */]) === "function" && _b || Object)
], EditorComponent.prototype, "onSaveHTMLData", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Output */])(),
    __metadata("design:type", typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* EventEmitter */]) === "function" && _c || Object)
], EditorComponent.prototype, "onSaveMarkdownData", void 0);
EditorComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* Component */])({
        selector: 'app-editor',
        template: __webpack_require__(394),
        styles: [__webpack_require__(156), __webpack_require__(157), __webpack_require__(155), __webpack_require__(159)],
        encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["q" /* ViewEncapsulation */].None,
        providers: [__WEBPACK_IMPORTED_MODULE_3__ctaLink_cloakLink_service__["a" /* CTALinkService */]]
    }),
    __metadata("design:paramtypes", [typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__ctaLink_cloakLink_service__["a" /* CTALinkService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ctaLink_cloakLink_service__["a" /* CTALinkService */]) === "function" && _d || Object])
], EditorComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=editor.component.js.map

/***/ }),

/***/ 87:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 87;


/***/ }),

/***/ 88:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(100);




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 95:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__editor_editor_component__ = __webpack_require__(55);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AppComponent = (function () {
    function AppComponent() {
        this.shouldAddInlineCode = false;
    }
    AppComponent.prototype.onSaveHTMLData = function (htmlData) {
        this.htmlData = htmlData;
    };
    AppComponent.prototype.onSaveMarkdownData = function (markdownData) {
        this.markdownData = markdownData;
    };
    AppComponent.prototype.onShouldRemoveAddInlineCode = function () {
        if (!this.shouldAddInlineCode) {
            this.editorComponent.removeAddInlineCodeButton();
        }
        else {
            this.editorComponent.addInlineCodeButton();
        }
        this.shouldAddInlineCode = !this.shouldAddInlineCode;
    };
    return AppComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1__editor_editor_component__["a" /* EditorComponent */]),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__editor_editor_component__["a" /* EditorComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__editor_editor_component__["a" /* EditorComponent */]) === "function" && _a || Object)
], AppComponent.prototype, "editorComponent", void 0);
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__(393),
        styles: [__webpack_require__(158)]
    })
], AppComponent);

var _a;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 96:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__editor_editor_component__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__editor_ctaLink_cloakLink_service__ = __webpack_require__(54);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_5__editor_editor_component__["a" /* EditorComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */]
        ],
        providers: [__WEBPACK_IMPORTED_MODULE_6__editor_ctaLink_cloakLink_service__["a" /* CTALinkService */]],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 97:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tui_editor__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tui_editor___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_tui_editor__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MdAddCTALink; });

var MdAddCTALink = __WEBPACK_IMPORTED_MODULE_0_tui_editor__["CommandManager"].command('markdown', {
    name: 'AddCTALink',
    exec: function (mde, data) {
        var cm = mde.getEditor();
        var doc = cm.getDoc();
        var range = mde.getCurrentRange();
        var from = {
            line: range.from.line,
            ch: range.from.ch
        };
        var to = {
            line: range.to.line,
            ch: range.to.ch
        };
        var linkText = data.linkText, url = data.url, attributes = data.attributes;
        var replaceText = "{clickout}[" + linkText + "](" + url + "){" + attributes + "}{clickoutend}";
        doc.replaceRange(replaceText, from, to);
        cm.focus();
    }
});
//# sourceMappingURL=AddCTALink.js.map

/***/ }),

/***/ 98:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tui_editor__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tui_editor___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_tui_editor__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WwAddCTALink; });

var WwAddCTALink = __WEBPACK_IMPORTED_MODULE_0_tui_editor__["CommandManager"].command('wysiwyg', {
    name: 'AddCTALink',
    exec: function (wwe, data) {
        var sq = wwe.getEditor();
        var url = data.url, linkText = data.linkText;
        var link = sq.createElement('a', { href: url, rel: 'nofollow', class: 'clickout', target: '_blank' });
        link.innerHTML = linkText;
        sq.insertElement(link);
        wwe.focus();
    }
});
//# sourceMappingURL=AddCTALink.js.map

/***/ }),

/***/ 99:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EDITOR_TYPE; });
var EDITOR_TYPE = {
    MARKDOWN: 'markdown',
    WYSIWYG: 'wysiwyg'
};
//# sourceMappingURL=editor.types.js.map

/***/ })

},[430]);
//# sourceMappingURL=main.bundle.js.map