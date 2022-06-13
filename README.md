# Pronto User Documentation

To build the documentation for local testing:

```
python3 -mvenv env
. env/bin/activate
pip install mkdocs
mkdocs build
python3 -m http.server --directory site
```

Openshift will automatically build this when pushed for production.