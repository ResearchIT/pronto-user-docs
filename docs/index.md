# Pronto Job Manager

We have moved our servers behind a common job scheduler.  Previously, most of our servers were directly accessible over SSH as shared user machines, which has led to some scheduling and contention issues as our user base has grown.

To help provide a more well-managed environment, we have created pronto.las.iastate.edu as a job scheduler for ResearchIT resources.

### How do I access pronto ?

SSH to pronto.las.iastate.edu and log in with your NetID and University password (same as email) as usual.  For example:

```
ssh jones@pronto.las.iastate.edu
```

### How do I access pronto from off campus?

You can use the VPN, but if you are going to transfer data off campus or if the VPN is congested you can ssh directly into prontodtn. You will have to set up public key authentication first by following the directions at [https://researchit.las.iastate.edu/how-generate-ssh-keys](https://researchit.las.iastate.edu/how-generate-ssh-keys). Note, you'll need to have set this up by logging in via the vpn and following the directions in that link. Once you've done that you will no longer need the vpn to access prontodtn and can disconnect the vpn.

Once you've connected to prontodtn:

```
ssh jones@prontodtn.las.iastate.edu
```

you can ssh to pronto from prontodtn

```
ssh jones@pronto.las.iastate.edu
```

Once you're on pronto, you'll need to use the slurm job scheduler to run a job (either interactively or in batch mode)

### What is the slurm job scheduler ?

A job scheduler manages the server resources (CPU cores, memory, GPUs, etc.) and allows users to request those resources for their jobs.  This helps to reduce the possibility of one user's job negatively impacting other users.

Jobs can either be interactive or batch jobs. Interactive jobs give you a shell prompt to interact with, much like you did when directly ssh'ing to a server like speedy.

Batch jobs allow you to submit a script to the queue, and it is run as soon as possible (independent of you being logged in).

An example of how to get an interactive session on pronto:

```
srun --nodes 1 --tasks 4 --partition interactive --time 01:00:00 --pty bash
```

Please note however that interactive jobs like this can fail and be terminated if the headnode goes down for whatever reason. Once you've got your program running in an interactive session please switch to an sbatch script if possible.

We are working on some shortcuts to make this more user-friendly.  Look for more info on this topic in the next few months.

Batch jobs follow the traditional slurm process similar to what you may already be familiar with from Condo, Nova, or Legion.  More info about how to use slurm can be found on the [Slurm Basics](slurm_basics.md) page.

### FAQ

*   How do I request a GPU?
    *   add --gres=gpu:1 and --partition=gpu to your srun or sbatch parameters
*   Can I access LSS from pronto?
    *   Yes, but we recommend using prontodtn.las.iastate.edu to transfer data, which has a bigger network connection and will be faster to move data
    *   LSS cannot be accessed directly from the nodes which pronto manages, so you need to copy your data to /work for use while processing. Note that best practice has always been to copy data from LSS to faster storage to work on it.
*   Can I access /work from pronto?
    *   Yes, this is the preferred location to use for your jobs
    *   The /work on pronto is common across all ResearchIT servers
    *   The /work on Condo is independent
    *   The /work on Nova is independent
*   Can I put data in my home directory?
    *   Your home directory should only be used for small scripts, profile data, etc.  Files for your jobs (scripts and data) should go in /work under your lab directory
*   How does pronto's time slicing work?
    *   Jobs run in 2 minute increments.
        *   It runs the job for 2 minutes, pauses and then run for another 2 minutes. It repeats this process until the job is done.
    *   It is similar to the concept of multiplexing and carves nodes in 120 second increments.
    *   Jobs that take a short period of time to run are often prioritized through the queue.