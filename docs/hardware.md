# Hardware

On Pronto, servers are divided into partitions based on intended use case. 

To specify a partition when you submit your job, add this to your batch submission script:

```
#SBATCH --partition=PARTITIONNAME
```

Replace PARTITIONNAME with the name of the partition you want.

Choosing the [correct partition](picking_the_best_resource.md) when you submit your job will maximize its performance. If you do not specify a partition, your job will run on whatever server happens to be available. 

Jobs on most partitions have a time limit of 31 days, and [time slicing](job_scheduler/time_slicing.md) is enabled.

## interactive

interactive is intended for interactive terminal sessions.

{{ partition_info_section('interactive') }}

{{ partition_hardware_table('interactive') }}

## biocrunch

biocrunch is intended for jobs that do multithreaded computation.

{{ partition_hardware_table('biocrunch') }}

## speedy

speedy is intended for jobs that cannot be parallelized and require the fastest CPU.

{{ partition_hardware_table('speedy') }}

## bigram

bigram is intended for jobs that cannot be parallelized and require a large amount of RAM, such as de novo genome assembly.

{{ partition_hardware_table('bigram') }}

## gpu

gpu is intended for jobs that need a gpu.

When submitting jobs to the gpu partition, you also need to add this to your batch script:

```
#SBATCH --partition=gpu
#SBATCH --gres=gpu:1
```

If you want a specific type of GPU, see the instructions under [GPU types](#gpu-types) instead.

### Servers
{{ gpu_partition_hardware_table() }}

### GPU Types

To use a specific type of GPU, add this to your batch file:
```
#SBATCH --partition=gpu
#SBATCH --gres=gpu:GPUTYPE:1
```

Replace GPUTYPE with one of these types:

{{ gpu_types_table() }}

You can also use the [job script generator](job_scheduler/job_script_generator.md).

## legion

The Legion servers are best for problems which can be highly parallelized (particularly where each thread is doing something slightly different from the others).

Each legion node has a very large number of cores available, but those cores are slower than those found on a typical Intel Xeon processor like you'll find on our other servers.

Due to the large number of cores, these servers are faster at processing particular types of workloads such as molecular dynamics, genome alignment, and monte carlo simulations.

{{ partition_hardware_table('legion') }}

## swift

A hybrid between biocrunch and speedy. Faster core speed, and more of them. With better IPC and memory bandwidth.

{{ partition_hardware_table('swift') }}