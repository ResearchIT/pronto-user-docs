# Pronto User Documentation

## local testing

To build the documentation for local testing:

```
python3 -mvenv env
. env/bin/activate
pip install -r requirements.txt
mkdocs build
python3 -m http.server --directory site
```

## deploy

Openshift will automatically build this when pushed for production.

## hardware update

Use this to generate a new sinfo dump and save to data/sinfo.txt
```
sinfo --noheader -o '%n|%P|%X|%Y|%Z|%m|%f|%G'
```

GPU RAM and compute capability is defined in main.py (search for gpu_info)

## ml-gpu update

Use this to gather the information needed for docs/machine_learning/preinstalled_software.md

```
singularity exec --nv /opt/rit/singularity/images/ml-gpu/VERSION/ml-gpu.sif python3 --version
singularity exec --nv /opt/rit/singularity/images/ml-gpu/VERSION/ml-gpu.sif R --version | head -n 1
singularity exec --nv /opt/rit/singularity/images/ml-gpu/VERSION/ml-gpu.sif python3 -c 'import torch; print(torch.__version__)'
singularity exec --nv /opt/rit/singularity/images/ml-gpu/VERSION/ml-gpu.sif python3 -c 'import tensorflow; print(tensorflow.__version__)'
singularity exec --nv /opt/rit/singularity/images/ml-gpu/VERSION/ml-gpu.sif python3 -c 'import keras; print(keras.__version__)'
singularity exec --nv /opt/rit/singularity/images/ml-gpu/VERSION/ml-gpu.sif python3 -m pip freeze
```

