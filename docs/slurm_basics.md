# Slurm Basics

Main Slurm Commands
-------------------

*   **sbatch** - submit a job script.
*   **srun** - run a command on allocated compute node(s).
*   **scancel** - delete a job.
*   **squeue** - show state of jobs.
*   **sinfo** - show state of nodes and partitions (queues).
*   **smap** - show jobs, partitions and nodes in a graphical network topology.
*   **scontrol** - modify jobs or show information about various aspects of the cluster

### sbatch

The sbatch command submits a batch processing job to the slurm queue manager. These scripts typically contain one or more _srun_ commands to queue jobs for processing.

### srun

The **srun** command is used to submit jobs for execution, or to initiate steps of jobs in real time. For the full range of options that can be passed to the _srun_ command, see the UNIX man page for _srun_ (type _man srun_ at the command prompt).

### scancel

The **scancel** command will terminate pending and running job steps. You can also use it to send a unix signal to all processes associated with a running job or job step.

### squeue

The **squeue** command will report the state of running and pending jobs. You can use this command to find out which node your job is running on.

### sinfo

The **sinfo** command will report the status of the available partitions and nodes.

### smap

The **smap** command is similar to the _sinfo_ command, except it displays all of the information in a pseudo-graphical, ncurses terminal.

### scontrol

The **scontrol** command is used to tweak a number of slurm things. You'll most likely use it to modify your jobs while they're in the queue, either number of nodes or number of tasks/cpus. Can also be used to display information about jobs, partition structures, and nodes.

Example Scripts
---------------

### Single node script

Here we have a submission script for a single node job. If you've previously used one of the ResearchIT machines and are used to running your commands in a shell, this is the example you'll want to pay attention to. The fields that you'll most often edit are the --cpus-per-task, --time, and --mem arguments.

```bash
#!/bin/bash

#SBATCH --nodes=1 # request one node
#SBATCH --cpus-per-task=8  # ask for 8 cpus
#SBATCH --mem=128G # Maximum amount of memory this job will be given, try to estimate this to the best of your ability. This asks for 128 GB of ram.
#SBATCH --time=2-02:30:02 # ask that the job be allowed to run for 2 days, 2 hours, 30 minutes, and 2 seconds.

# everything below this line is optional, but are nice to have quality of life things

#SBATCH --output=job.%J.out # tell it to store the output console text to a file called job.<assigned job number>.out
#SBATCH --error=job.%J.err # tell it to store the error messages from the program (if it doesn't write them to normal console output) to a file called job.<assigned job muber>.err
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

### Multiple Node script

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

### Interactive session example

To get an interactive session for an hour on one node with 8 cpus. Any of the arguments you've seen for sbatch can be provided here too

```
srun --time=01:00:00 --nodes=1 --cpus-per-task=8 --partition=interactive --pty /usr/bin/bash
```

### I want a GPU

Add the following line to your existing sbatch script
```
#SBATCH --gres=gpu:1 #If you just need one gpu, you're done, if you need more you can change the number
#SBATCH --partition=gpu #specify the gpu partition
```

### I want a specific type of GPU

To see the available types of GPUs, you can run this:

```
sinfo --partition=gpu -o %G
```

To request a specific type of GPU from that list, you use something like this in your sbatch script:

```
#SBATCH --gres=gpu:rtx_2080_Ti:1
#SBATCH --partition=gpu #specify the gpu partition
```

If the amount of RAM the GPU has is not listed in the name, it might be found on the [Pronto hardware page](https://researchit.las.iastate.edu/pronto_hardware).

### I want to run on a specific machine

This is done by selecting a specific partition if you're looking to for example use the 'biocrunch' machines.

```
#SBATCH --partition=biocrunch # specify which partition your job should be submitted to
```

if you want to get even more advanced, and for some reason you need a specific node

```
#SBATCH --partition=gpu # ask for the gpu machine partition
#SBATCH --nodelist=crysis # specifically say that you need to run on this list of nodes, in this case the single node crysis
```

### I want to use X Forwarding to run a GUI program

Follow the directions in [X Forwarding for Mac and Windows](interactive_computing/x_forwarding.md). Be sure to add the `-X` flag to your ssh command when connecting to pronto.

Then request an interactive session as described above, but add the --x11 flag to the srun command. Example:

```
srun --x11 --time=01:00:00 --nodes=1 --cpus-per-task=8 --pty /usr/bin/bash
```

### I want to know more

Please see the [sbatch documentation](https://slurm.schedmd.com/sbatch.html) for more information.

You can also find this documentation on the cluster by using the man command.

```
man sbatch
```

You can also use man for any other command that you have questions about.

Example Commands
----------------

### Job Info

The scontrol command can be used to display information about submitted jobs, running jobs, and very recently completed jobs.

```
scontrol show job <jobid here>
```

### Partition Info

If you would like to know detailed information about a partition, you can also use scontrol for that

```
scontrol show partition <partition name here>
```

### Node Info

If you would like to know more about a specific node, say one of the nodes from the biocrunch partition, you could get the list of nodes using the above command for getting partition info. With the list of nodes from above, put in the name of one, or more, of the nodes below to get detailed information. You can get the number of cpus in a node, the amount of memory a node has, and the features it supports using this command.

```
scontrol show node <node name here>
```