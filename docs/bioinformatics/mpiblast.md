# mpiBlast

## Purpose

Run mpiBlast on 4 node using 64 processors in total to blast TAIR10\_cdna\_2000seq.fa against nt formatted in 62 data volumes.

Query sequence: TAIR10_cdna_2000seq.fa
mpiBlast configuration file: .ncbirc
pre-formatted nt : /ptmp/LAS/BioDatabase/mpiBLASTdb/NCBI/4nodes-62fragments

## Steps

Let us run mpiblast from your working directory on condo: /work/LAS/your-netID/

### Create a test directory and copy the related files to it

```
cd /work/LAS4/xfzhao
mkdir mpiblast-tair10
cd mpiblast-tair10
cp /work/LAS4/xfzhao/tutorial/mpiBLAST/TAIR10_cdna_2000seq.fa ./
cp /work/LAS4/xfzhao/tutorial/mpiBLAST/.ncbirc ./
```

### Make your own blast database or use the pre-formatted database

The pre-formatted nt with 62 fragments is located in

```
/ptmp/LAS/BioDatabase/mpiBLASTdb/NCBI/4nodes-62fragments
```

which is updated monthly.

To build your own formatted nt, link the nt fasta file to your test directory:

```
ln -s /ptmp/LAS/BioDatabase/mpiBLASTdb/NCBI/nt ./
```

Copy the script for mpiformatdb and the qsub script to your test directory, check the two scripts.  
Then submit the job to build the database locally.

```
cp /ptmp/LAS/BioDatabase/mpiBLASTdb/NCBI/4nodes-62fragments/mpiformatdb_run.sh ./
cp /ptmp/LAS/BioDatabase/mpiBLASTdb/NCBI/4nodes-62fragments/mpiformatdb.qsub ./
qsub mpiformatdb.qsub
```

mpiformatdb.qsub submits mpiformatdb\_run.sh to run, which formats nt into 62 fragments.

### Run mpiBLAST

Edit the path in .ncbirc if needed.

"Data" and "BLASTMAT" are the path of the NCBI blast matrices, BLASTDB is for the regular blast database, and "Shared" is the path for blast database formatted by mpiformatdb, and "Local" is the temporary location for mpiblast output.

The command for mpiblast in mpiblast\_TAIR10\_cdna\_2000seq.qsub is:

```
mpiexec -n 64 mpiblast -p blastn -d nt -i TAIR10_cdna_2000seq.fa   -o tair10_blast_output.txt --use-parallel-write   --time-profile=time_profile.txt --removedb
```

Request 4 nodes for total 64 processors, mpiblast 2000 CDNA sequences of TAIR10 against nt which was fragmented into 62 parts. --removedb instructs mpiBLAST to do all temporary work in the local storage space and remove the local copy of the database before terminating execution.