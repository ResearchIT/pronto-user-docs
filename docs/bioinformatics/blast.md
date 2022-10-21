# BLAST

## Using multiple threads

Benchmark the performance of ncbi-blast+ using multiple threads.

### Data Sets

Query Sequences: 2000 cdna sequences of Aradopsis ( TAIR10\_cdna\_2000seq.fa) \-db option: nt
BLASTDB: export BLASTDB=/work/LAS4/BioDatabase/BLASTdb/NCBI/Archives/Current(downloaded on 20171115)

### Command

```
time blastn -db nt -query TAIR10_cdna_2000seq.fa -out TAIR10_cdna_2000seq.fa.out -num_threads 4
```

### Results

#### Case 1

Only one blast job is running while 16 cores are allocated. The input file has 2,000 sequences.
core(s) -- Time(real/user/sys)

```
1 -- 16m53/15m48/0m55   2 -- 09m54/16mxx/0m54   4 -- 06m22/16m29/0m55   8 -- 04m37/17mxx/0m56   16 -- 03m43/18mxx/0m59
```

#### Case 2

Two blast jobs are running, 2,000 sequences/8 cores/each, all 16 cores are used for 4,000 sequences.

```
8 -- 05m26/17m09/0m54   8 -- 05m26/17m10/0m56
```

#### Case 3

Four blast jobs are running, 2,000 sequences/4 cores/each, all 16 cores are used for 8,000 sequences.

```
4 -- 10m35/17m41/0m54   4 -- 10m55/18m07/0m55   4 -- 11m03/18m27/0m55   4 -- 10m54/18m15/0m55
```

#### Case 4

Estimate the run time for blasting 80,000 sequences in various settings:

```
16 cores/job, 1 job/node --- 40*03m43=148.7m=2.5h   08 cores/job, 2 jobs/node --- 20*05m26=108.7m=1.8h   04 cores/job, 4 jobs/node ----10*10m52=108.7m=1.8h
```

### Observation while blast running

1. Sequences are processed in a batch mode, and the output is done through one thread. No matter how many threads were used while blasting TAIR10\_cdna\_2000seq.fa in Case 1, the first batch of 162 sequences were processed, then the rest sequences ( 2000-162) are processed in the 2nd batch. As the query sequences are cDNA of Arabidopsis, there are huge amount of hits, without restricting the output, the time is significant for writing output the 2nd batch of blasting through one thread.  
    **Suggestion:** set evalue and max\_target\_seqs to restrict outputs.

2. Use parallel to distribute blast jobs over a few nodes.

Based on the estimation on run time to blast 80,000 sequences, the difference in the run times is not significant among the three cases:

1. Using 16 cores and not splitting the sequence file;
2. Using 8 cores and split the sequence file into 2 files; or
3. Using 4 cores/job and splitting the sequence file into 4 files.

Suggestion: for blasting ~ 1 million sequences on condo, allocate one node for 16 cores, and set -num\_threads =16.

If you have a few million sequences, you may be better off if you split the large sequence file into a few small ones, files, allocate more than one node, using gnu parallel to distribute the jobs over the nodes, and each job will use 8 or 4 cores.

## Using GNU Parallel

Demonstrate how to use gnu parallel to do blast for millions of query sequences.

**The following section demo:**

1. Split the large sequence file into 8 small ones
2. Allocate 2 nodes with 32 cores, distribute the 8 jobs over the two nodes using parallel, each job uses 4 cores.

**Example:**
Split a huge sequence file into 8 small ones, and run parallel to distribute 8 blast jobs over 32 cores of 2 nodes.

**Demo Scripts:**
1node-parallel-blast\_interactive.sh
1-or-2-node-parallel-blast.script

Interactively split the large file into 8 using pyfasta on a computational node
Ref for pyfasta: https://pypi.python.org/pypi/pyfasta/

```
head-node>salloc -N -n 1 -t 1:0:0
compute-node> cd /to/your/sequence/dir
compute-node> module load python
```

pyfasta does not allow the duplicated sequences in the fasta file
to remove the duplicated sequences

```
compute-node> /work/LAS4/rit/tutorial/BLAST+/remove_duplicate_fasta.py huge_DNA_fasta.fa huge_DNA_fasta_uniq.fa
compute-node> pyfasta split -n 8 huge_DNA_fasta_uniq.fa
```

the output files are huge\_DNA\_fasta\_uniq.\[0...7\].fa.

The following is a slurm queue script to distribute the 8 blast jobs for 8 sequence files (huge\_DNA\_fasta\_uniq.\[0...7\].fa) over 32 cores of 2 nodes.

```
#!/bin/bash
#SBATCH -N 2 # allocate 2 nodes
#SBATCH -n 16 # 16 cores/node
#SBATCH -t 2:0:0 # 2 hours

# cd to where the sbatch script was submitted.

cd $SLURM_SUBMIT_DIR

mkdir output

module load parallel
module load ncbi-blast
export BLASTDB=/work/LAS4/BioDatabase/BLASTdb/NCBI/Archives/Current

#the env needs to be exported to the remote node through the env PARALLEL from the head node

export PARALLEL="--env BLASTDB "
export PARALLEL="$PARALLEL --workdir . --env PATH --env LD_LIBRARY_PATH "
export PARALLEL="$PARALLEL --env LOADEDMODULES --env _LMFILES_ --env MODULE_VERSION --env MODULEPATH --env MODULEVERSION_STACK --env MODULESHOME "
export PARALLEL="$PARALLEL --env OMP_DYNAMICS --env OMP_MAX_ACTIVE_LEVELS --env OMP_NESTED --env OMP_NUM_THREADS --env OMP_SCHEDULE "   export PARALLEL="$PARALLEL --env OMP_STACKSIZE --env OMP_THREAD_LIMIT --env OMP_WAIT_POLICY"

# run 8 blast jobs in one node, each job will use 2 threads.

# --noswap: if OS is busy doing memory swap in and out, not issue another job

ls huge_DNA_fasta_uniq.*.fa | parallel --sshloginfile $PBS_NODEFILE --workdir $SLURM_SUBMIT_DIR -j 8 --noswap 'blastn -db nt -query {} -out output-1node/{}.out -num_threads 2'

# run 8 blast jobs in two nodes, each job will use 4 threads.

ls huge_DNA_fasta_uniq.*.fa | parallel --sshloginfile $PBS_NODEFILE --workdir $SLURM_SUBMIT_DIR -j 8 --noswap 'blastn -db nt -query {} -out output-2node/{}.out -num_threads 4'
```