# Common Issues

## CUDA Error: no kernel image is available

You might receive this error when using an old version of the container or if you installed pytorch in a virtual environment.

To resolve this, please either:

* Re-install pytorch following [these directions](install_python_packages.md#pytorch).
* Try re-running your job with a [GPU type](gpu_types.md) of lower compute capability, such as gtx_1080_ti.

## NVIDIA A100 is not compatible with the current PyTorch

You might receive this error when using an old version of the container or if you installed pytorch in a virtual environment.

To resolve this, please either:

* Re-install pytorch following [these directions](install_python_packages.md#pytorch).
* Try re-running your job with a [GPU type](gpu_types.md) of lower compute capability, such as gtx_1080_ti.
