# Picking the Best Resource For Your Job

On Pronto, servers are divided into partitions based on intended use case. Choosing the correct partition when you submit your job will maximize its performance. If you do not specify a partition when you submit your job, it will run on whatever server happens to be available. This can result in the job taking **5x longer or more**, and result in **missed paper submission deadlines**.

The best way to choose a partition is to do a test run of your job on each partition with a **small** subset of your data.

If that is not possible, this page will help you give you a basic idea of which partition is suited to each use case.

Singled Threaded Jobs
---------------------

If you are running a single threaded job, we recommend that you use one of the speedy nodes. 

Add this to your batch submission file:

```
#SBATCH --partition=speedy
```

MPI Compatible Jobs
-------------------

For mpi enabled jobs, you could consider either biocrunch of speedy depending on the nature of the job.

Add one of these to your batch submission file:

```
#SBATCH --partition=speedy
```

or

```
#SBATCH --partition=biocrunch
```

If your job scales quite well you could consider running on condo or nova as well.

OpenMP Based or Local Thread Jobs
---------------------------------

If your job is multithreaded and scales well with 8 or more cores, use the biocrunch nodes.

Add this to your batch submission file:

```
#SBATCH --partition=biocrunch
```

Massively Parallel Jobs
-----------------------

Consider the legion nodes, as they have many threads (272) per node, but each thread is rather slow. If your jobs parallelizes extremly well legion may be a good choice.

Add this to your batch submission file:

```
#SBATCH --partition=legion
```

If you find the legion nodes too slow for your application, then condo or nova would be good local choices.

RAM-Limited jobs
----------------

### Need more than 1.5TB of ram

You should use the bigram partition.

Add this to your batch submission file:

```
#SBATCH --partition=bigram
```

### Don't need quite that much, but still a lot

Either bigram or biocrunch may be appropriate.

Add one of these to your batch submission file:

```
#SBATCH --partition=bigram
```

or

```
#SBATCH --partition=biocrunch
```

### Other options

One of the fat nodes under condo or nova may also work.

Disk Bound Jobs
---------------

In this case, you may want to consider transferring to localtmp or ptmp.

GPU Jobs
--------

Add this to your batch submission file:

```
#SBATCH --gres=gpu:1 #If you just need one gpu, you're done, if you need more you can change the number
#SBATCH --partition=gpu #specify the gpu partition
```

Interactive Jobs
----------------

### GPU

Use this srun command

```
srun --time=01:00:00 --nodes=1 --cpus-per-task=8 --partition=gpu-interactive --gres=gpu:1 --pty /usr/bin/bash
```

### Other

Use this srun command

```
srun --time=01:00:00 --nodes=1 --cpus-per-task=8 --partition=interactive --pty /usr/bin/bash
```

I'm Not Sure
------------

For a complete list of all the available hardware, please refer to this link:

[https://researchit.las.iastate.edu/hardware](https://researchit.las.iastate.edu/hardware)

If you are still not sure the best place to run your job, please contact researchit@iastate.edu and we would be happy to assist you.