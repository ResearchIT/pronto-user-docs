# How To Submit a Job to a GPU node

Below is an example script that runs python code that simply says hello world and saves the output in a .out file:

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

module load ml-gpu/{{ recommended_mlgpu_version() }}

# let's make sure we're where we expect to be in the filesystem tree (my working directory is specified here)
cd /work/LAS/jones-lab/ml

# the commands we're running are below, this executes my python code
ml-gpu python3 hello.py
```

You can also use the [job script generator](../job_scheduler/job_script_generator.md).

After saving this somewhere in my /work directory, I could submit it to the [Slurm job manager](../job_scheduler/index.md) with:

```
sbatch /path/to/job/script
```

After the script runs, I would end up with a .err and .out file in my directory. If I check my .out file, we can see below that my python code works as intended:

![ml_container_result](img/ml_container_result.png)
