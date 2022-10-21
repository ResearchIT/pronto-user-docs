# Singularity

## What is Singularity?

Singularity allows users to put their entire pipeline/workflow into one package (known as a container). You can securely create, import, share and store your containers in the Sylabs [cloud repository](https://cloud.sylabs.io/library). Singularity containers allow you to run code with environment configurations not otherwise available on the servers.

## What is a container?

A container is a file containing all necessary executables, dependencies, and configuration to run a pipeline. Containers can be encrypted and shared with other individuals. Once a container is created, anyone can use it without reinstalling dependencies or going through a bunch of configuration.

If you already have a container defined in Docker, that's fine. Docker containers can easily be imported to Singularity.

## How do I convert a Docker container to Singularity?

To convert a docker container to Singularity you need need to use the **_build_** command using the Singularity command line. Usually, you'll want to build the container on your local system using your root permissions. Once built, the container will not need to run as root.

If you need to build a container and do not have local root access on your machine, please contact [researchit@iastate.edu](mailto:researchit@iastate.edu).

The syntax for building a singularity container from a docker image is:

```
singularity build example.sif docker://<Path to container goes here>
```

The resultant file, example.sif, can be uploaded and run on Nova, Condo, Pronto, etc.

## Can I be root in the container?

In general, no, you cannot become the root user in a singularity container. The sole exception being on your personal system -- usually during the build process.

## How do I get data in/out of the container?

The Singularity module automatically maps certain paths from the running system into the container. For example: the path to /work is automatically brought in so you can process your data in /work/LAS/my-lab/... without copying in and out of the container.

Here is a list of other available pre-existing mounts available within the container:

* $HOME
* /tmp
* /var/tmp
* /scratch
* /work
* /ptmp

If you need to access a path not included in this pre-existing list, then invoke:

```
singularity --bind /src/path:/dst/path
```

This command essentially binds the two specified paths into a container.

## Helpful Links

Specific hardware information about Singularity can be found [here](singularity-0).

You can also share and download various images from Sylabs [here](https://cloud.sylabs.io/home). 

Please refer to [this guide](private-singularity-image-repositories) if you are looking for a guide on how to use the cloud repository. 

For a more detailed and complete documentation about Singularity, you can visit this link: [https://sylabs.io/docs/](https://sylabs.io/docs/)