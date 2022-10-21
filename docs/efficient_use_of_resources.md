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
