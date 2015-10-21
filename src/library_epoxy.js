/*******************************************************************************
 * EMSCRIPTEN EPOXY 1.3.1 emulation
 *
 * What it does:
 * - GL Extensions support, backing up `epoxy/gl.h` and `epoxy/egl.h`
 *
 * Missing:
 * - glx support, wgl support
 *   (as far as I know, emscripten doesn't provide glx or wgl emulation headers at all?)
 *
 * Authors:
 * - Chris Beck <beck.ct@gmail.com>
 ******************************************************************************/

var LibraryEPOXY = {
  $EPOXY__deps: ['glGetString'],
  $EPOXY: {
    extensions: null,

    extensionIsSupported: function(name) {
      if (!EPOXY.extensions) {
        EPOXY.extensions = Pointer_stringify(_glGetString(0x1F03)).split(' ');
      }

      if (EPOXY.extensions.indexOf(name) != -1)
        return 1;

      // extensions from GLEmulations do not come unprefixed
      // so, try with prefix
      return (EPOXY.extensions.indexOf("GL_" + name) != -1);
    },
  },

  ////////////////
  // epoxy/gl.h //
  ////////////////

  epoxy_has_gl_extension: function (name) {
    var ext = Pointer_stringify(name)
    if (!EPOXY.extensionIsSupported(ext))
      return 0;
    return 1;
  },

  epoxy_is_desktop_gl: function () {
    return 0; // WebGL is GLES so we report false here
  },

  epoxy_gl_version: function () {
    return 20; // WebGL is a subset of GLES 2.0... 20 is the best answer
  },

  /////////////////
  // epoxy/egl.h //
  /////////////////

  epoxy_has_egl_extension: function (display, name) {
    return 0; // "Currently, Emscripten does not implement any extensions in the EGL Extension Registry."
              // C.f. https://kripken.github.io/emscripten-site/docs/porting/multimedia_and_graphics/EGL-Support-in-Emscripten.html
  },

  epoxy_egl_version: function () {
    return 14; // emscripten emulates EGL version 1.4
  },
};

autoAddDeps(LibraryEPOXY, '$EPOXY');
mergeInto(LibraryManager.library, LibraryEPOXY);
