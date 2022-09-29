# Job Scheduler Overview

A job scheduler manages the server resources (CPU cores, memory, GPUs, etc.) and allows users to request those resources for their jobs.  This helps to reduce the possibility of one user's job negatively impacting other users.

Jobs can either be interactive or batch jobs. Interactive jobs give you a shell prompt to interact with, much like you did when directly ssh'ing to a server like speedy.

Batch jobs allow you to submit a script to the queue, and it is run as soon as possible (independent of you being logged in).

An example of how to get an interactive session on pronto:

```
srun --nodes 1 --tasks 4 --partition interactive --time 01:00:00 --pty bash
```

Please note however that interactive jobs like this can fail and be terminated if the headnode goes down for whatever reason. Once you've got your program running in an interactive session please switch to an sbatch script if possible.

Batch jobs follow the traditional Slurm process similar to what you may already be familiar with from Condo, Nova, or Legion.