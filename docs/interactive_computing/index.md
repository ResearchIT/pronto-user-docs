# Interactive Computing

## I want a command line session

To get an interactive session for an hour on one node with 8 cpus:

```
srun --time=01:00:00 --nodes=1 --cpus-per-task=8 --partition=interactive --pty /usr/bin/bash
```

Any of the [arguments you can use with sbatch](../slurm_basics.md) can be provided here too.

When you do this you should consider protecting your session with [tmux](tmux.md) or [screen](screen.md).

## I want a command line session with a GPU

To get an interactive session for an hour on one node with 8 cpus:

```
srun --time=01:00:00 --nodes=1 --cpus-per-task=8 --partition=gpu --gres=gpu:1 --pty /usr/bin/bash
```

Any of the [arguments you can use with sbatch](../slurm_basics.md) can be provided here too.

When you do this you should consider protecting your session with [tmux](tmux.md) or [screen](screen.md).

## I want a complete Desktop Environment

Please see the article for [Interactive Desktop on Open OnDemand](../ondemand/interactive_desktop.md).

## I want to use X Forwarding to run a GUI program

Please see the article [X Forwarding for Mac and Windows](x_forwarding.md)