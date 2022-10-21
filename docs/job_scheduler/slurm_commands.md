# Main Slurm Commands

*   **sbatch** - submit a job script.
*   **srun** - run a command on allocated compute node(s).
*   **scancel** - delete a job.
*   **squeue** - show state of jobs.
*   **sinfo** - show state of nodes and partitions (queues).
*   **smap** - show jobs, partitions and nodes in a graphical network topology.
*   **scontrol** - modify jobs or show information about various aspects of the cluster

## sbatch

The sbatch command submits a batch processing job to the slurm queue manager. These scripts typically contain one or more _srun_ commands to queue jobs for processing.

## srun

The **srun** command is used to submit jobs for execution, or to initiate steps of jobs in real time. For the full range of options that can be passed to the _srun_ command, see the UNIX man page for _srun_ (type _man srun_ at the command prompt).

## scancel

The **scancel** command will terminate pending and running job steps. You can also use it to send a unix signal to all processes associated with a running job or job step.

## squeue

The **squeue** command will report the state of running and pending jobs. You can use this command to find out which node your job is running on.

## sinfo

The **sinfo** command will report the status of the available partitions and nodes.

## smap

The **smap** command is similar to the _sinfo_ command, except it displays all of the information in a pseudo-graphical, ncurses terminal.

## scontrol

The **scontrol** command is used to tweak a number of slurm things. You'll most likely use it to modify your jobs while they're in the queue, either number of nodes or number of tasks/cpus. Can also be used to display information about jobs, partition structures, and nodes.

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