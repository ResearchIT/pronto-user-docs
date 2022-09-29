# Frequently Asked Questions

## Interactive session example

To get an interactive session for an hour on one node with 8 cpus. Any of the arguments you've seen for sbatch can be provided here too

```
srun --time=01:00:00 --nodes=1 --cpus-per-task=8 --partition=interactive --pty /usr/bin/bash
```

## I want a GPU

Add the following line to your existing sbatch script
```
#SBATCH --gres=gpu:1 #If you just need one gpu, you're done, if you need more you can change the number
#SBATCH --partition=gpu #specify the gpu partition
```

If you want a specific type of GPU, see our article about [GPU types](../machine_learning/gpu_types.md).

## I want to run on a specific machine

This is done by selecting a specific partition if you're looking to for example use the 'biocrunch' machines.

```
#SBATCH --partition=biocrunch # specify which partition your job should be submitted to
```

if you want to get even more advanced, and for some reason you need a specific node

```
#SBATCH --partition=gpu # ask for the gpu machine partition
#SBATCH --nodelist=crysis # specifically say that you need to run on this list of nodes, in this case the single node crysis
```

## I want to use X Forwarding to run a GUI program

Follow the directions in [X Forwarding for Mac and Windows](../interactive_computing/x_forwarding.md). Be sure to add the `-X` flag to your ssh command when connecting to pronto.

Then request an interactive session as described above, but add the --x11 flag to the srun command. Example:

```
srun --x11 --time=01:00:00 --nodes=1 --cpus-per-task=8 --pty /usr/bin/bash
```

## I want to know more

Please see the [sbatch documentation](https://slurm.schedmd.com/sbatch.html) for more information.

You can also find this documentation on the cluster by using the man command.

```
man sbatch
```