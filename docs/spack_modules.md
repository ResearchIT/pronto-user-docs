# Software Modules

## Overview

We use a tool called [Spack](https://spack.io/) to build loadable modules for many popular software titles.

A full list of software available to build with Spack is available [here](https://spack.readthedocs.io/en/latest/package_list.html#package-list).

## Available Modules

To see what we have installed, just run the following command on any of our servers:

To see the full list:

```
module avail
```

To search for a package:

```
module spider python
```

## Load a Module

You will need to ensure that you are on a [compute node](getting_started.md#allocating-a-compute-node) node and **not** the login node. The software will not work on the login node.


For most software, loading and using a module is as simple as:

```
module load beast2
beast
```

That's all! No compiling! No finding obscure dependencies! We've already done all that. All you have to do is load a module and start issuing commands. 

For some programs with special dependencies (e.g. non-default compilers), you'll need to load one of those modules first to 'unlock' that part of the module tree.

```
$ module spider satsuma

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  satsuma2: satsuma2/2016-11-22-pvrcjoi
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    You will need to load all module(s) on any one of the lines below before the "satsuma2/2016-11-22-pvrcjoi" module is available to load.

      gcc/7.3.0-xegsmw4
 
    Help:
      Satsuma2 is an optimized version of Satsuma, a tool to reliably align
      large and complex DNA sequences providing maximum sensitivity (to find
      all there is to find), specificity (to only find real homology) and
      speed (to accommodate the billions of base pairs in vertebrate genomes).
```

Let's load those modules, and try again:

```
$ module load gcc/7.3.0-xegsmw4

module load satsuma2
```

That seemed to work. Let's check the list of currently loaded modules:

```
$ module list

Currently Loaded Modules:
  1) gmp/6.1.2-5odxtlx   2) mpfr/3.1.5-gzm2jew   3) zlib/1.2.11-vhzh5cf   4) mpc/1.0.3-5gvknf2
  5) isl/0.18-3wslknu   6) gcc/7.3.0-xegsmw4   7) satsuma2/2016-11-22-pvrcjoi
```

Now we can run satsuma as usual.

For more information on the topic of module hierarchies, Lmod has a good explanation here: [http://lmod.readthedocs.io/en/latest/080_hierarchy.html](http://lmod.readthedocs.io/en/latest/080_hierarchy.html)


## Using the 'module' command

To use the module command, simply type **module** in your shell prompt, followed by the command you want to use. To display the help menu, you can type 'module help'. This command will display everything that you can do with the module system. 

Some of the more useful commands (and their use) include:

*   **module help**: Displays a help menu. The Research IT group has written our own. 
*   **module avail**: Short for 'available'. This command shows you a list of every module that can be loaded into your environment, and their modulefile (a set of instructions telling your environment how to access the program).
*   **module spider <module name>:** Spider does a wildcard search for a module by name, and tells you what other modules might needed loaded first
*   **module load <modulefile>**: Loads the specified modulefile into your environment.
*   **module unload <modulefile>**​: Remove the specified modulefile from your working environment.
*   **module keyword <string>**: Searches through all of the modulefiles, looking for the specified keyword. When finished, it will print the matching modulefiles to the terminal.
*   **module list**: Shows a list of the modulefiles currently loaded into the environment
*   **module use <path>:** add a path on the system to search for module files
*   **module unuse <path>:** remove a path from the system to search for module files

Please note that you can use these commands on the **head** node. You should **not** be running applications on the **head** node, but you should instead run them on a **compute** node (via salloc/srun). If you are unfamiliar with these commands, please refer to the [slurm basics](job_scheduler/index.md) guide. 

## Installing your own sub-packages and libraries

Maybe you're working with R, and need some R packages that you don't see modules for.  You have a couple options:

1.  Email researchit@iastate.edu and request for the package to be installed
2.  Try to install it yourself in your /work directory using CRAN, PIP, CPAN, etc.

Requesting an install from ResearchIT is always fine, but especially appropriate if there are a lot of dependencies for the package you need, or if you think it will be widely used by other users. 

If you're in a hurry, or just want to quickly experiment with a package - you can try to install it on your own. Python, Perl, and R all have methods to allow you to define your own install directory that doesn't require administrative rights to write to. For installing R packages, please refer to this [link](r.md).

### Install Python packages using pip

The recommended way to install additional Python packages is with a [Python virtual environment](python.md).

### Install R packages using install.packages

Please see our guide [How to run R on pronto](r.md) for instructions.

### Installing perl packages using cpanm

```
$ module load perl

$ cpanm --local-lib /work/LAS/<your-lab>/<YourNetID>/perl-lib --mirror http://cpan.metacpan.org/ File::Slurp

--> Working on File::Slurp

Fetching http://cpan.metacpan.org/authors/id/C/CA/CAPOEIRAB/File-Slurp-9999.32.tar.gz ... OK
Configuring File-Slurp-9999.32 ... OK
Building and testing File-Slurp-9999.32 ... OK
Successfully installed File-Slurp-9999.32
```

### Setting up a 'conda' environment

Please see our guide on [properly setting up a conda environment](conda.md).

## Compatibility

When running software on Pronto, you will most likely encounter a few issues loading modules. This will most likely be a compatibility issue.

### Examples

Suppose I run the following:

```
$ module load python/3.7.6-y2hnyr4
```

The command works as expected. What if we try and run and older version of python in the same session using:

```
$ module load python/2.7.15-h2cedbf
```

We run into this error:

```
**Lmod has detected the following error:**  These module(s) exist but cannot be loaded as requested:

"libiconv/1.15-vlje6ju"

   Try: "module spider libiconv/1.15-vlje6ju" to see how to load the module(s).
```

In this scenario, we're trying to load a certain version of python 2.7 after loading python 3. If we want to run python 2.7, we can simply just run:

```
$ module purge

$ module load  python/2.7.15-h2cedbf
```

The "module purge" will clear all the module that we have currently loaded.

Let's say we have python 2.7 loaded, and we load python 3.7. What happens now?

```
$ module load python/3.7.6-y2hnyr4
```

We get the following message:

```
The following have been reloaded with a version change:

  1) bzip2/1.0.8-fslu4ek => bzip2/1.0.8-etzfbao          9) ncurses/6.0-3ncf3bb => ncurses/6.0-ws245kv

  2) expat/2.2.5-7wtpegy => expat/2.2.9-ihwvsxo         10) openssl/1.1.1c-otnl3ib => openssl/1.1.1f-dljuelf

  3) gdbm/1.14.1-7zby6of => gdbm/1.18.1-xr242f2         11) python/2.7.15-h2cedbf => python/3.7.6-y2hnyr4

  4) gettext/0.19.8.1-eruqa52 => gettext/0.20.1-x6e33jv 12) readline/7.0-jushdjv => readline/8.0-maed2yl

  5) libbsd/0.9.1-li3rs5m => libbsd/0.10.0-wgsg6tq      13) sqlite/3.28.0-2l6wl2y => sqlite/3.30.1-ydsrzlu

  6) libffi/3.2.1-4s3dshk => libffi/3.2.1-sacvu6i       14) tar/1.31-wiqmehf => tar/1.32-gem5z6s

  7) libiconv/1.15-vlje6ju => libiconv/1.16-xcmzb6a     15) xz/5.2.4-rh7gav6 => xz/5.2.5-evgwz4v

  8) libxml2/2.9.9-hionxpg => libxml2/2.9.9-oqe2ao3     16) zlib/1.2.11-vhzh5cf => zlib/1.2.11-zolwez4
```

This is simply upgrading all the dependencies python 2.7 uses for the new module you just loaded (which is python 3).

### A few side notes

* If you get a bunch of warnings about version changes after loading modules, you may be in an incompatible state. 
* The more modules that Lmod reports (in the error/warning messages), the more likely you'll be incompatible for the job you're working on.
* Incompatible libraries may still work to start a job, but they may error out at some point.

## Reproducibility

Beyond providing a more stable and easier to administer software environment, [Spack](https://spack.io) can also help ensure the software environment used for your research is documented and reproducible.

When you issue a `module avail` command, you'll notice an extra 7 characters at the end of each of the module names:

```
------------------------- /opt/rit/spack-modules/lmod/linux-rhel7-x86_64/Core --------------------------
   albert/4.0a_opt4-jqtjblk                            openmpi/3.0.0-3r57wrr                    (D)
   alglib/3.11.0-ayonf3n                               openssl/1.0.2n-mplvsup
   andi/0.10-52v4hqe                                   pacbio-daligner/2017-08-05-ba2pxqd
   angsd/0.919-5lvjrfr                                   pacbio-damasker/2017-02-11-ydnig2t
```

The extra characters are a truncated sha1 hash of the package specification (spec) that takes into account all of the variances and dependencies used to install the package. 

You can find the full expansion of these details in the package 'spec' files located in our GitHub account: [https://github.com/ResearchIT/isu-spack](https://github.com/ResearchIT/isu-spack).  You can include these spec files in your lab notebook, manuscript, or supplementary information to document exactly what versions of software were used for your research.  This file can also be used to redeploy the software on another server, or at another institution.

For more information or help with the use of spec files, please contact [researchit@iastate.edu](mailto:researchit@iastate.edu)

### Self Managed Spack Installs

Besides being the tool used to produce the modules for the Research Computing environment across the University, you can also use Spack in your work directory if you want to install different versions or variants of packages.  The process to install in your work directory and get started is straight forward, and Spack provides good introductory [documentation](https://spack.readthedocs.io/en/latest/getting_started.html).

#### Quick start

```bash
module load git
git clone https://github.com/spack/spack.git
. spack/share/spack/setup-env.sh
spack install hdf5
```

While you can get started quickly this way, it's also easy for your Spack directory to get large & messy quickly. Be sure to keep an eye on your disk space utilization, and uninstall packages that you're done using or testing if you start running low.
