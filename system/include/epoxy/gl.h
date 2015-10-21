#ifndef EPOXY_GL_H
#define EPOXY_GL_H

#include <GL/gl.h>
#include <GL/glext.h>

#include <GLES2/gl2.h>
#include <GLES2/gl2ext.h>

bool epoxy_has_gl_extension(const char *extension);
bool epoxy_is_desktop_gl(void);
int epoxy_gl_version(void);

#endif /* EPOXY_GL_H */
