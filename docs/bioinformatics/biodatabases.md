# Bio Databases

[Xuefeng](https://researchit.las.iastate.edu/people/xuefeng-zhao) from our ResearchIT team has compiled several commonly used BioDatabases so users can reference them without the need to download their own copy.

The shared BioDatabases on pronto, condo, and nova are located at:

```
/work/LAS/BioDatabase
```

They include mpiBLASTdb and BLASTdb for blast, and pre-indexed sequence databases of [iGenomes](https://support.illumina.com/sequencing/sequencing_software/igenome.html) from Illumina Inc. for NGS data analysis, and locally built Gmap-Indexed sequence databases for each genome in iGenomes.

## mpiBLASTdb

nr and nt from NCBI are formatted by mpiformatdb into 46 database volumes, and updated monthly. The path is /work/LAS/BioDatabase/mpiBLASTdb/NCBI.

## BLASTdb
NCBI blast databases nr, nt, refseq_protein, refseqgene, swissprot, taxdb, env_nr, env_nt, pataa, patnt, pdbaa and pdbnt are downloaded from NCBI monthly, the one for the current month is at /work/LAS/BioDatabase/BLASTdb/NCBI, and the archived ones are /work/LAS/BioDatabase/BLASTdb/NCBI/Archives.

## iGenomes

This is on condo only.

A collection of bowtie-indexed, bowtie2-indexed and bwa-indexed sequence databases of commonly analyzed species are downloaded from Illumina Inc., and Gmap-indexed databases for each genome are built locally. The path of the database is /work/LAS/BioDatabase/iGenomes, the backup copy is located at /work/LAS4/BioDatabase/iGenomes. For each genome, the last three releases are maintained, and the data sources include NCBI, Ensemble, UCSD and JGI. For example, the path of the bowtie2-indexed sequence database of Aradopsis TAIR10 from NCBI is /work/LAS/BioDatabase/iGenomes/Arabidopsis_thaliana/NCBI/TAIR10/Sequence/Bowtie2Index.