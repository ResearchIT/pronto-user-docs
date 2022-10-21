# Bio Databases

[Xuefeng](https://researchit.las.iastate.edu/people/xuefeng-zhao) from our ResearchIT team has compiled several commonly used BioDatabases so users can reference them without the need to download their own copy.

The shared BioDatabases on pronto, and nova are located at:

```
/work/LAS/BioDatabase
```

They include mpiBLASTdb and BLASTdb for blast, and pre-indexed sequence databases of [iGenomes](https://support.illumina.com/sequencing/sequencing_software/igenome.html) from Illumina Inc. for NGS data analysis, and locally built Gmap-Indexed sequence databases for each genome in iGenomes.

## mpiBLASTdb

nr and nt from NCBI are formatted by mpiformatdb into 46 database volumes, and updated monthly. The path is /work/LAS/BioDatabase/mpiBLASTdb/NCBI.

## BLASTdb
NCBI blast databases nr, nt, refseq_protein, refseqgene, swissprot, taxdb, env_nr, env_nt, pataa, patnt, pdbaa and pdbnt are downloaded from NCBI monthly, the one for the current month is at /work/LAS/BioDatabase/BLASTdb/NCBI, and the archived ones are /work/LAS/BioDatabase/BLASTdb/NCBI/Archives.
