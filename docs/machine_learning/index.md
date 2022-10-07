# Machine Learning / GPU Container
ResearchIT maintains a machine learning container (ml-gpu) that contains the CUDA drivers and has many [machine learning frameworks available](preinstalled_software.md).

The [singularity](https://researchit.las.iastate.edu/singularity) recipe that builds this container can be found [here](https://github.com/researchit/singularity-ml).

The latest version of the container is ml-gpu/{{ recommended_mlgpu_version() }}.

To start python within the container, run the following in an [interactive session](../interactive_computing/index.md) on a GPU node:

```bash
module load ml-gpu/{{ recommended_mlgpu_version() }}
ml-gpu python3 hello.py
```
