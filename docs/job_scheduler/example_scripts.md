# Example Slurm scripts

## Single node script

Here we have a submission script for a single node job. If you've previously used one of the ResearchIT machines and are used to running your commands in a shell, this is the example you'll want to pay attention to. The fields that you'll most often edit are the --cpus-per-task, --time, and --mem arguments.

```bash
#!/bin/bash

#SBATCH --nodes=1 # request one node
#SBATCH --cpus-per-task=8  # ask for 8 cpus
#SBATCH --mem=128G # Maximum amount of memory this job will be given, try to estimate this to the best of your ability. This asks for 128 GB of ram.
#SBATCH --time=2-02:30:02 # ask that the job be allowed to run for 2 days, 2 hours, 30 minutes, and 2 seconds.

# everything below this line is optional, but are nice to have quality of life things

#SBATCH --output=job.%J.out # tell it to store the output console text to a file called job.<assigned job number>.out
#SBATCH --error=job.%J.err # tell it to store the error messages from the program (if it doesn't write them to normal console output) to a file called job.<assigned job number>.err
#SBATCH --job-name="example job" # a nice readable name to give your job so you know what it is when you see it in the queue, instead of just numbers


# under this we just do what we would normally do to run the program, everything above this line is used by slurm to tell it what your job needs for resources

# let's load the modules we need to do what we're going to do

module load gcc/7.3.0-xegsmw4

module load bamtools/2.5.1-7rljcju

# let's make sure we're where we expect to be in the filesystem tree

cd /work/LAS/whatever-lab/user/thing-im-working-on

# the commands we're running are below

bamtools sort -in input.bam -out input_sorted.bam -byname

```

To submit the script, just run

```
sbatch _jobscript_
```

## Multiple Node script

If you have a job that'll actually scale across multiple nodes (in almost all circumstances this'll need to be an MPI enabled program. If you don't know what this means there's a very good chance that this isn't for you and doesn't apply to your program.)

```bash
#!/bin/bash

#SBATCH --nodes=2 # request one node
#SBATCH --ntasks=544 # the number of tasks that our mpi process will run(this is equal to the -np argument you may have used with mpirun in the past)
#SBATCH --mem=128G #128GB of ram PER NODE, if you need more granular control lookup the --mem-per-cpu argument in the man page for sbatch
#SBATCH --time=24-00:00:00 # ask that the job be allowed to run for 24 days

# optional nice stuff below

#SBATCH --error=job.%J.err # tell it to store the error messages to a file
#SBATCH --output=job.%J.out # tell it to store the console text output to a file
#SBATCH --job-name="gromacs I guess" # a nice name for the job to have

# let's load some modules

module load gromacs/2018.1-openmpi3-5ds3yf7

# here we use the srun command in place of mpirun, since it has much better integration with the scheduler.

srun --ntasks=544 gmx_mpi mdrun -s science.tpr -maxh 0.80

```

To submit the script, just run

```
sbatch _jobscript_
```