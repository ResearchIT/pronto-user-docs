# How to submit a batch file and compile code in the container via GPU node

## Overview 
To submit a batch file and/or run code, you will need to use the slurm job manager. If you are unfamiliar with it, you can find the complete documentation [here](../slurm_basics.md). Specifically, you will need to know how to run a job and submit the batch file to the node(s) you are using.

Below is a simple example that compiles python code that simply says hello world and saves the output in a .out file: (Part of this was taken from the single node script section linked above)

```bash
#!/bin/bash
#SBATCH --nodes=1 # request one node
#SBATCH --cpus-per-task=1 # ask for 1 cpu
#SBATCH --mem=8G # Maximum amount of memory this job will be given, try to estimate this to the best of your ability. This asks for 8 GB of ram.
#SBATCH --time=0-00:30:00 # ask that the job be allowed to run for 30 minutes.
#SBATCH --gres=gpu:1 #If you just need one gpu, you're done, if you need more you can change the number
#SBATCH --partition=gpu #specify the gpu partition

# everything below this line is optional, but are nice to have quality of life things
#SBATCH --output=job.%J.out # tell it to store the output console text to a file called job.<assigned job number>.out
#SBATCH --error=job.%J.err # tell it to store the error messages from the program (if it doesn't write them to normal console output) to a file called job.<assigned job number>.err
#SBATCH --job-name="example job" # a nice readable name to give your job so you know what it is when you see it in the queue, instead of just numbers

# under this we just do what we would normally do to run the program, everything above this line is used by slurm to tell it what your job needs for resources
# let's load the modules we need to do what we're going to do

module load ml-gpu/20220603

# let's make sure we're where we expect to be in the filesystem tree (my working directory is specified here)
cd /work/LAS/jones-lab/ml

# the commands we're running are below, this executes my python code
ml-gpu python3 hello.py
```

After submitting this sample script to the slurm job manager, I would end up with a .err and .out file in my directory. If I check my .out file, we can see below that my python code works as intended:

![ml_container_result](img/ml_container_result.png)

## Requesting a Specific Type of GPU

To see the available types of GPUs, you can run this:

```
sinfo --partition=gpu -o %G
```

The list looks like this:

```
a100_1g.5gb
a100_2g.10gb
a100_3g.20gb
a100-pcie
gtx_1080_ti
rtx_2080_Ti
rtx_6000
v100-pcie-16G
v100-pcie-32G
v100-sxm2-32G
```

To request a specific type of GPU from that list, you use something like this in your sbatch script:

```
#SBATCH --gres=gpu:rtx_2080_Ti:1
#SBATCH --partition=gpu #specify the gpu partition
```

If the amount of RAM the GPU has is not listed in the name, it might be found on the [Pronto hardware page](https://researchit.las.iastate.edu/pronto_hardware).