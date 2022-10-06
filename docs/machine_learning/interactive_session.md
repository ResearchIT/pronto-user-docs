# Interactive Session with a GPU

To get an interactive session for an hour on one node with 1 CPU and 1 GPU:


```
srun --time=01:00:00 --nodes=1 --cpus-per-task=1 --mem=8G --partition=gpu --gres=gpu:1 --pty /usr/bin/bash
```

Any of the [arguments you can use with sbatch](../slurm_basics.md) can be provided here too. You can also use the [job script generator](../job_scheduler/job_script_generator.md).

When you do this you should consider protecting your session with [tmux](../interactive_computing/tmux.md) or [screen](../interactive_computing/screen.md).

Then run the following to start python within the ml-gpu container:

```
module load ml-gpu/20220603
ml-gpu python3
```