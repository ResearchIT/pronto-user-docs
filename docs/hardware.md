# Hardware

On Pronto, servers are divided into partitions based on intended use case. Choosing the correct partition when you submit your job will maximize its performance. If you do not specify a partition when you submit your job, it will run on whatever server happens to be available. 

## interactive

interactive is intended for interactive terminal sessions.

{{ partition_hardware_table('interactive') }}

## biocrunch

biocrunch is intended for jobs that do multithreaded computation.

{{ partition_hardware_table('biocrunch') }}

## speedy

speedy is intended for jobs that cannot be parallelized and require the fastest CPU.

{{ partition_hardware_table('speedy') }}

## bigram

bigram is intended for jobs that cannot be parallelized and require a large amount of RAM memory, such as de novo genome assembly.

{{ partition_hardware_table('bigram') }}

## gpu

gpu is intended for jobs that need a gpu.

{{ gpu_partition_hardware_table() }}

{{ gpu_types_table() }}

## legion

The Legion servers are best for problems which can be highly parallelized (particularly where each thread is doing something slightly different from the others).

Each legion node has a very large number of cores available, but those cores are slower than those found on a typical Intel Xeon processor like you'll find on our other servers.

Due to the large number of cores, these servers are faster at processing particular types of workloads such as molecular dynamics, genome alignment, and monte carlo simulations.

{{ partition_hardware_table('legion') }}

## swift

A hybrid between biocrunch and speedy. Faster core speed, and more of them. With better IPC and memory bandwidth.

{{ partition_hardware_table('swift') }}