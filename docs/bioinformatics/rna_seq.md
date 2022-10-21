# Pipeline for RNA-Seq data analysis

The pipeline is for RNA-Seq data analysis on condo, located in:

```
/work/LAS4/xfzhao/tutorial/RNA-Seq/ensembl_gm01
```

for gsnap and tophatp.

The configuration file for the pipeline is proj.cfg in:

```
ensembl_gm01/tophat(gsnap)-cufflinks-htseq
```

## Steps to run the pipeline

### Transfer your data your home on /work/LAS/your-lab

Do a:

* md5sum check if needed  
* fastqc if needed.  
* clean the reads if needed.

### Select the pre-built indexed database for your species in:

```
/ptmp/LAS/BioDatabase/iGenomes
```

or use your own indexed database.

  
Pre-build Indexed Databases are:

```
/ptmp/LAS/BioDatabase/iGenomes/Species/DataSource/BuildVersion/Sequence/Pre-IndexedDatbase
```

Species: commonly anaylized ones. Add other species upon request.  
DataSource: NCBI, Ensembl and UCSD  
BuildVersion: last three builds are online  
Pre-indexed Database: BWAIndex, Bowtie2Index, BowtieIndex, GmapIndex

The annotation file is in:

```
/ptmp/LAS/BioDatabase/iGenomes/species/DataSource/build/Annotation
```

### Edit proj.cfg for RNA-Seq pipeline

The sample data is for Glycin Max, sequenced on 3 lanes for each sample, and combined together during alignment using gsnap or tophat.  
The annotation is Gm01 from Ensembl. After the alignment, the raw read was counted using HTseq-count, and FPKM was calculated by cufflinks.  
The tab-delimited FPKM/raw count summary files are created using the script summary\_fpkm\_ct.sh and summary\_htseq\_ct.sh for  
the down-stream statistical analysis.

Example : RNA\_Seq analysis using GSNAP, HTseq-count, and cufflinks.

Copy the:

```
/work/LAS4/xfzhao/tutorial/RNA-Seq/ensembl_gm01/gsnap-cufflinks-htseq
```

to your home. Edit the project configuration file:

```
gsnap-cufflinks-htseq/proj.cfg
```

The meaning of the parameters is self explanatory.

### run gsnap

```
cd gsnap-cufflinks-htseq/aln

# check up gsnap\_align\_.sh

qsub parallel-aln.qsub
```

### run HTSeq-count

cd gsnap-cufflinks-htseq/htseq

check gsnap\_HTseq\_count\_.sh

then submit parallel-HTseq\_ct.qsub.

The scripts summary\_htseq\_ct.sh and summary\_htseq\_ct\_run.sh are for making the raw count summary file.

### run cufflinks

cd gsnap-cufflinks-htseq/clout,

check gsnap\_cufflinks\_.sh.

then submit parallel-cufflinks.qsub to run the job.  
The scripts summary\_fpkm\_ct.sh and summary\_fpkm\_ct\_run.sh are for making the tab-delimited FPKM summary file.