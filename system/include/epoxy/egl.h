#ifndef EPOXY_EGL_H
#define EPOXY_EGL_H

#include <EGL/egl.h>
#include <EGL/eglext.h>

bool epoxy_has_egl_extension(const char *extension);
int epoxy_egl_version(void);

#endif /* EPOXY_EGL_H */
