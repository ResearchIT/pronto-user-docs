# Efficient Use of Resources

## Picking the Best Partition For Your Job

On Pronto, servers are divided into partitions based on intended use case. Choosing the correct partition when you submit your job will maximize its performance. If you do not specify a partition when you submit your job, it will run on whatever server happens to be available. This can result in the job taking **5x longer or more**.

The best way to choose a partition is to do a test run of your job on each partition with a **small** subset of your data.

If that is not possible, this page will help you give you a basic idea of which partition is suited to each use case.

### Singled Threaded Jobs

If you are running a single threaded job, we recommend that you use one of the speedy nodes. 

Add this to your batch submission file:

```
#SBATCH --partition=speedy
```

### MPI Compatible Jobs

For mpi enabled jobs, you could consider either biocrunch of speedy depending on the nature of the job.

Add one of these to your batch submission file:

```
#SBATCH --partition=speedy
```

or

```
#SBATCH --partition=biocrunch
```

If your job scales quite well you could consider running on nova as well.

### OpenMP Based or Local Thread Jobs

If your job is multithreaded and scales well with 8 or more cores, use the biocrunch nodes.

Add this to your batch submission file:

```
#SBATCH --partition=biocrunch
```

### Massively Parallel Jobs

Consider the legion nodes, as they have many threads (272) per node, but each thread is rather slow. If your jobs parallelizes extremely well legion may be a good choice.

Add this to your batch submission file:

```
#SBATCH --partition=legion
```

If you find the legion nodes too slow for your application, then nova would be good local choices.

### RAM-Limited jobs

#### Need more than 1.5TB of ram

You should use the bigram partition.

Add this to your batch submission file:

```
#SBATCH --partition=bigram
```

#### Don't need quite that much, but still a lot

Either bigram or biocrunch may be appropriate.

Add one of these to your batch submission file:

```
#SBATCH --partition=bigram
```

or

```
#SBATCH --partition=biocrunch
```

#### Other options

One of the fat nodes under nova may also work.

### Disk Bound Jobs

In this case, you may want to consider transferring to localtmp or ptmp.

### GPU Jobs

Add this to your batch submission file:

```
#SBATCH --gres=gpu:1 #If you just need one gpu, you're done, if you need more you can change the number
#SBATCH --partition=gpu #specify the gpu partition
```

### Interactive Jobs

#### GPU

Use this srun command

```
srun --time=01:00:00 --nodes=1 --cpus-per-task=8 --partition=gpu-interactive --gres=gpu:1 --pty /usr/bin/bash
```

#### Other

Use this srun command

```
srun --time=01:00:00 --nodes=1 --cpus-per-task=8 --partition=interactive --pty /usr/bin/bash
```

### I'm Not Sure

For a complete list of all the available hardware, please refer to this [link](hardware.md).

If you are still not sure the best place to run your job, please contact researchit@iastate.edu and we would be happy to assist you.

## How Many Nodes to Use

The number of nodes to use depends on the problem size and how well the application has been parallelized.

The number of nodes requested will also affect your priority in the job queue, with a dependence on the number of jobs already in a given queue. It may be useful to examine the queue and see how many jobs are ahead of you for a given queue type before deciding how many nodes to request for your job.

Often, applications will require a minimum number of nodes due to large memory requirements. Once we decide the minimum number of nodes we can determine the number of nodes to use for running the application. For example, let's take an MPI parallelization of the Jacobi iteration with N = 4\*1024 and N = 64\*1024 using differing numbers of nodes. Both of these problem sizes can be run on a single node, so the question is how many nodes should one use. The following numbers were obtained running on ISU CyEnce cluster in the fall of 2013.

For N = 4\*1024, it is best to use 1 node for this program if one wants to make best use of the allocation and use 8 nodes to minimize the execution time, see Table 1. For N = 64\*1024, using 64 nodes gives the shortest time and the cost for the allocation is not much different from the best value using only 1 node, see Table 2.

<div class="wy-table-responsive">
<table class="docutils">
	<thead>
		<tr>
			<th>Number of Nodes</th>
			<th>Seconds for N =4*1024</th>
			<th>Node-Seconds for N = 4*1024</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>1</td>
			<td>3.3</td>
			<td>3.3</td>
		</tr>
		<tr>
			<td>2</td>
			<td>2.3</td>
			<td>4.6</td>
		</tr>
		<tr>
			<td>4</td>
			<td>1.3</td>
			<td>5.2</td>
		</tr>
		<tr>
			<td>8</td>
			<td>0.8</td>
			<td>6.4</td>
		</tr>
		<tr>
			<td>16</td>
			<td>1.8</td>
			<td>28.8</td>
		</tr>
	</tbody>
</table>
</div>

Table 1: Jacobi iteration with N = 4*1024 using different numbers of nodes.

<div class="wy-table-responsive">
    <table class="docutils">
<table border="1" cellpadding="1" cellspacing="1">
	<thead>
		<tr>
			<th>Number of Nodes</th>
			<th>Seconds for N = 64*1024</th>
			<th>Node-Seconds for N = 64*1024</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>1</td>
			<td>875.6</td>
			<td>875.6</td>
		</tr>
		<tr>
			<td>2</td>
			<td>442.4</td>
			<td>884.8</td>
		</tr>
		<tr>
			<td>4</td>
			<td>224.7</td>
			<td>898.8</td>
		</tr>
		<tr>
			<td>8</td>
			<td>113.8</td>
			<td>910.4</td>
		</tr>
		<tr>
			<td>16</td>
			<td>59.4</td>
			<td>950.4</td>
		</tr>
		<tr>
			<td>32</td>
			<td>32.6</td>
			<td>1,043.2</td>
		</tr>
		<tr>
			<td>64</td>
			<td>17.2</td>
			<td>1,100.8</td>
		</tr>
	</tbody>
</table>
</div>

Table 2: Jacobi iteration with N = 64*1024 using different numbers of nodes.

Reference: "How to use the Condo and CyEnce Cluster" by Gleen R. Luecke, Summer 2015

## Checking CPU/Memory utilization

We have the program [htop](https://hisham.hm/htop/) installed on all of our servers, and we find this to be the most friendly way to see what's going on. Once you are logged in just run the htop command, and you'll get a view that looks something like this:

```
  1  [|||||||||||||||||||||||||||           60.8%]    9  [|||||||||||||||||||||||||||           62.1%]   17 [||||||||||||||                        28.1%]    
  2  [||||||||||||||||||||||||||            59.7%]    10 [|||||||||||||||||||||||               51.3%]   18 [||||||||||||||||||||                  43.8%]   
  3  [|||||||||||||||||||||                 46.1%]    11 [|||||||||||||||                       31.8%]   19 [|||||||||||||||||||                   40.5%]   
  4  [|||||||||||||||||                     37.7%]    12 [|||||||||||                           23.7%]   20 [|||||||||||||||||||||||||||||         64.7%]    
  5  [||||||||||||||||||                    38.3%]    13 [||||||||||||||||||||                  45.8%]   21 [||||||||||||||||||||||||              53.2%]    
  6  [|||||||||||||||||                     37.9%]    14 [||||||||||||||||||||||||||            60.0%]   22 [||||||||||||||||||||||                48.7%]    
  7  [||||||||||||||||||||||||||||||||      72.4%]    15 [||||||||||||||||                      33.8%]   23 [||||||||||                            20.4%]    
  8  [|||||||||||||||||||||||||||||||||||   78.1%]    16 [|||||||||||||||||||                   42.2%]   24 [|||||||||                             18.2%]    
  Mem[|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||  42.4G/252G]   Tasks: 155, 67 thr; 12 running 
  Swp[|                                                                                    169M/16.0G]   Load average: 12.95 11.56 11.63 

                                                                                                         Uptime: 21 days, 19:31:25

   PID USER      PRI  NI  VIRT   RES   SHR S CPU% MEM%   TIME+  Command 

113053 howard     20   0  191M  9076  3372 R 101.  0.0 36h46:47 /usr/bin/ssh -x -oForwardAgent=no -oPermitLocalCommand=no -oClearAllForwardings=yes 
113048 howard     20   0  185M  7216  2244 R 30.6  0.0 11h21:22 scp -r phantoon.las.iastate.edu:/oldwork/LAS/jones-lab/copied_from_LSS . 
 24881 marshal    20   0  401M  197M  1636 R 27.3  0.1  0:00.42 /home/marshal/anaconda2/bin/trinity-2.0.6/Chrysalis/GraphFromFasta -i /home/marshal 
 25026 marshal    20   0  401M  274M  1640 R 26.7  0.1  0:00.41 /home/marshal/anaconda2/bin/trinity-2.0.6/Chrysalis/GraphFromFasta -i /home/marshal
```
 
The top section with bar graphs is showing you the percent of each compute core that is in use. Directly below the CPU usage, there is a bar graph representing the amount of memory in use, and some statistics to the right.

Below the graphs and statistics is a list of processes. Use the 'u' key to filter the list if you want to see how your processes are performing (this is a good way to confirm that your application is using the expected number of cores / RAM)

## Checking GPU utilization

On servers that contain Nvidia GPUs, you'll need to use the [nvidia-smi](http://developer.download.nvidia.com/compute/DCGM/docs/nvidia-smi-367.38.pdf) command to gauge GPU utilization, in addition to htop which will continue to show CPU and system RAM (different than GPU memory).

The output of the nvidia-smi command is a point in time snapshot (it doesn't auto-update like htop) , and output will look something like this:

```
+-----------------------------------------------------------------------------+ 
| NVIDIA-SMI 396.37                 Driver Version: 396.37                    | 
|-------------------------------+----------------------+----------------------+ 
| GPU  Name        Persistence-M| Bus-Id        Disp.A | Volatile Uncorr. ECC | 
| Fan  Temp  Perf  Pwr:Usage/Cap|         Memory-Usage | GPU-Util  Compute M. | 
|===============================+======================+======================| 
|   0  GeForce GTX 108...  Off  | 00000000:1B:00.0 Off |                  N/A | 
| 25%   36C    P2    71W / 250W |  10781MiB / 11178MiB |     32%      Default | 
+-------------------------------+----------------------+----------------------+ 
|   1  GeForce GTX 108...  Off  | 00000000:1C:00.0 Off |                  N/A | 
| 25%   31C    P2    60W / 250W |  10781MiB / 11178MiB |     30%      Default | 
+-------------------------------+----------------------+----------------------+ 
|   2  GeForce GTX 108...  Off  | 00000000:1D:00.0 Off |                  N/A | 
| 25%   34C    P2    87W / 250W |  10781MiB / 11178MiB |     29%      Default | 
+-------------------------------+----------------------+----------------------+ 
|   3  GeForce GTX 108...  Off  | 00000000:1E:00.0 Off |                  N/A | 
| 25%   33C    P2    68W / 250W |  10781MiB / 11178MiB |     30%      Default | 
+-------------------------------+----------------------+----------------------+ 
|   4  GeForce GTX 108...  Off  | 00000000:3D:00.0 Off |                  N/A | 
| 25%   26C    P8    11W / 250W |      0MiB / 11178MiB |      0%      Default | 
+-------------------------------+----------------------+----------------------+ 
|   5  GeForce GTX 108...  Off  | 00000000:3F:00.0 Off |                  N/A | 
| 25%   26C    P8    11W / 250W |      0MiB / 11178MiB |      0%      Default | 
+-------------------------------+----------------------+----------------------+ 
|   6  GeForce GTX 108...  Off  | 00000000:40:00.0 Off |                  N/A | 
| 25%   28C    P8    16W / 250W |      0MiB / 11178MiB |      0%      Default | 
+-------------------------------+----------------------+----------------------+ 
|   7  GeForce GTX 108...  Off  | 00000000:41:00.0 Off |                  N/A | 
| 25%   25C    P8    11W / 250W |      0MiB / 11178MiB |      0%      Default | 
+-------------------------------+----------------------+----------------------+ 
                                                                                
+-----------------------------------------------------------------------------+ 
| Processes:                                                       GPU Memory | 
|  GPU       PID   Type   Process name                             Usage      | 
|=============================================================================| 
|    0    122537      C   python36                                   10771MiB | 
|    1    122537      C   python36                                   10771MiB | 
|    2    122537      C   python36                                   10771MiB | 
|    3    122537      C   python36                                   10771MiB | 
+-----------------------------------------------------------------------------+
```

In this example, you can see that 4 of the 8 GPUs in the system are currently using approx 30% of their GPU cores, and the memory on these cards is fully utilized. nvidia-smi doesn't show memory as a percentage, but we know that this model of GPU has approx 11GB of memory per card.
