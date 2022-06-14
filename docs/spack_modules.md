# Spack based software modules

Quick start
------------

**We have started building software modules using a new process, and you need to know about a few key changes that will affect you:**

*   Most modules will work just like before, with some exceptions for things like python, R, and perl that each have their own libraries or packages
    *   R, python, and perl packages have their own module files now, and need explicitly loaded (e.g. `module load r-rmpi` or `module load py-numpy`)
*   Module naming or capitalization may be different
*   Some modules are now organized in a hierarchy to present a cleaner list, and prevent conflicts.  You may need to use `module spider` to find the right module, and get instructions on how to load it (other modules may need to be loaded first)

You can find a full list of Spack packages here: [http://spack.readthedocs.io/en/latest/package_list.html](http://spack.readthedocs.io/en/latest/package_list.html)

To see what we have installed, just run the following command on any of our servers:

To see the full list:

```
module avail
```

To search for a package:

```
module spider python
```

For more detailed information, keep reading.

* * *

Why we changed from RISA to Spack
----------------------------------

As our RISA library grew to hundreds of software titles, continuing to build packages by hand and keep up with new software versions, new OS versions, etc. was becoming cumbersome, and changing underlying dependencies introduced fragility. Our new process utilizes a tool called [Spack](https://spack.io/), that uses python scripts to create a flexible and reproducible process for installing software.

Using the 'module' command
--------------------------

To use the module command, simply type **module** in your shell prompt, followed by the command you want to use. To display the help menu, you can type 'module help'. This command will display everything that you can do with the module system. 

Some of the more useful commands (and their use) include:

*   **module help**: Displays a help menu. The Research IT group has written our own. 
*   **module avail**: Short for 'available'. This command shows you a list of every module that can be loaded into your environment, and their modulefile (a set of instructions telling your environment how to access the program).
*   **module spider <module name>:** Spider does a wildcard search for a module by name, and tells you what other modules might needed loaded first
*   **module load <modulefile>**: Loads the specified modulefile into your environment.
*   **module unload <modulefile>**​: Remove the specified modulefile from your working environment.
*   **module keyword <string>**: Searches through all of the modulefiles, looking for the specified keyword. When finished, it will print the matching modulefiles to the terminal.
*   **module list**: Shows a list of the modulefiles currently loaded into the environment
*   **module use <path>:** add a path on the system to search for module files
*   **module unuse <path>:** remove a path from the system to search for module files

Please note that you can use these commands on the **head** node. You should **not** be running applications on the **head** node, but you should instead run them on a **compute** node (via salloc/srun). If you are unfamiliar with these commands, please refer to the [slurm basics](slurm_basics.md) guide. 

## Module hierarchy

For most software, you will continue to use the modules just as you have been:

```
module load beast2
beast
```

That's all! No compiling! No finding obscure dependencies! We've already done all that. All you have to do is load a module and start issuing commands. You will need to ensure that you are on a **compute** node and **not** the login node. The software will not work on the login node.

For some programs with special dependencies (e.g. non-default compilers), you'll need to load one of those modules first to 'unlock' that part of the module tree.

```
$ module spider satsuma

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  satsuma2: satsuma2/2016-11-22-pvrcjoi
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    You will need to load all module(s) on any one of the lines below before the "satsuma2/2016-11-22-pvrcjoi" module is available to load.

      gcc/7.3.0-xegsmw4
 
    Help:
      Satsuma2 is an optimsed version of Satsuma, a tool to reliably align
      large and complex DNA sequences providing maximum sensitivity (to find
      all there is to find), specificity (to only find real homology) and
      speed (to accomodate the billions of base pairs in vertebrate genomes).
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
  1) gmp/6.1.2-5odxtlx   2) mpfr/3.1.5-gzm2jew   3) zlib/1.2.11-vhzh5cf   4) mpc/1.0.3-5gvknf2
  5) isl/0.18-3wslknu   6) gcc/7.3.0-xegsmw4   7) satsuma2/2016-11-22-pvrcjoi
```

Now we can run satsuma as usual.

For more information on the topic of module hierarchies, Lmod has a good explanation here: [http://lmod.readthedocs.io/en/latest/080_hierarchy.html](http://lmod.readthedocs.io/en/latest/080_hierarchy.html)


## Packages of packages

For software that provides its own packages or libraries (such as perl, python, and R), under the [RISA](https://researchit.las.iastate.edu/research-it-software-archive) model, we installed those sub-packages or libraries into the application tree for the parent package, and those sub-packages or libraries were obscured to the users. As a user, you just had to try loading the python module, and then check to see what was provided.  This also didn't leave any flexibility for having multiple versions of a sub-package installed under the same parent program (we couldn't have two versions of numpy under the python module for example).

Going forward, each of these sub-packages will be their own module.  This will mean more `module load` statements for you, but less ambiguity about which sub-packages you're using, and more control and a more reproducible environment.

If your program depends on several independent sub-packages or libraries, each of these will need to be loaded independently.  If you have a sub-package that depends on another however, those dependencies will automatically be loaded.  Take py-pandas for example:

```
$ module load py-pandas
$ module list

Currently Loaded Modules:
  1) bzip2/1.0.6-v5xhjvn      5) readline/7.0-pf63r2a
  2) ncurses/6.0-4v63qrr      6) sqlite/3.21.0-ude2ads
  3) zlib/1.2.11-lafowlw      7) python/2.7.14-i3qxhgc
  4) openssl/1.0.2n-mplvsup   8) openblas/0.2.20-lyrpuwt

...

```

Loading the py-pandas module has loaded all of the dependencies for pandas.  If my python program also needs py-pillow, I would need to load that as well.

### Installing your own sub-packages and libraries

Maybe you're working with R, and need some R packages that you don't see modules for.  You have a couple options:

1.  Email researchit@iastate.edu and request for the package to be installed
2.  Try to install it yourself in your home directory using CRAN, PIP, CPAN, etc.

Requesting an install from ResearchIT is always fine, but especially appropriate if there are a lot of dependencies for the package you need, or if you think it will be widely used by other users. 

If you're in a hurry, or just want to quickly experiment with a package - you can try to install it on your own. Python, Perl, and R all have methods to allow you to define your own install directory that doesn't require administrative rights to write to. For installing R packages, please refer to this [link](r.md).

### Install python packages using pip

The recommended way to install additional Python packages is with a [Python virtual environment](python.md).

### Install R packages using install.packages

Please see our guide [How to run R on pronto](r.md) for instructions.

### Installing perl packages using cpanm

```
$ module load perl

$ cpanm --local-lib /home/<YourNetID>/perl-lib --mirror http://cpan.metacpan.org/ File::Slurp

--> Working on File::Slurp

Fetching http://cpan.metacpan.org/authors/id/C/CA/CAPOEIRAB/File-Slurp-9999.32.tar.gz ... OK

Configuring File-Slurp-9999.32 ... OK

Building and testing File-Slurp-9999.32 ... OK

Successfully installed File-Slurp-9999.32
```

### Setting up a 'conda' environment

Use of conda is discouraged. The recommended way to install additional Python packages is with a [Python virtual environment](python.md). If you need software that we don't available as a module, but that is already [available as a Spack package](https://spack.readthedocs.io/en/latest/package_list.html), see the Self Managed Spack Installs section of this guide.

If you absolutely must use conda, please see our guide on [properly setting up a conda environment](conda.md).


## Reproducibility & self-managed installs

### Reproducibility with Spack package specs

Beyond providing a more stable and easier to administer software environment, [Spack](https://spack.io) can also help ensure the software environment used for your research is documented and reproducible.

When you issue a `module avail` command, you'll notice an extra 7 characters at the end of each of the module names:

```
------------------------- /opt/rit/spack-modules/lmod/linux-rhel7-x86_64/Core --------------------------
   albert/4.0a_opt4-jqtjblk                            openmpi/3.0.0-3r57wrr                    (D)
   alglib/3.11.0-ayonf3n                               openssl/1.0.2n-mplvsup
   andi/0.10-52v4hqe                                   pacbio-daligner/2017-08-05-ba2pxqd
   angsd/0.919-5lvjrfr                                   pacbio-damasker/2017-02-11-ydnig2t
```

The extra characters are a truncated sha1 hash of the package specification (spec) that takes into account all of the variances and dependencies used to install the package. 

You can find the full expansion of these details in the package 'spec' files located in our GitHub account: [https://github.com/ResearchIT/isu-spack](https://github.com/ResearchIT/isu-spack).  You can include these spec files in your lab notebook, manuscript, or supplementary information to document exactly what versions of software were used for your research.  This file can also be used to redeploy the software on another server, or at another institution.

For more information or help with the use of spec files, please contact [researchit@iastate.edu](mailto:researchit@iastate.edu)

### Self Managed Spack Installs

Besides being the tool used to produce the modules for the Research Computing environment across the University, you can also use Spack in your work directory if you want to install different versions or variants of packages.  The process to install in your work directory and get started is straight forward, and Spack provides good introductory [documentation](https://spack.readthedocs.io/en/latest/getting_started.html).

#### Quick start

```bash
module load git
git clone https://github.com/spack/spack.git
. spack/share/spack/setup-env.sh
spack install hdf5
```

While you can get started quickly this way, it's also easy for your Spack directory to get large & messy quickly. Be sure to keep an eye on your disk space utilization, and uninstall packages that you're done using or testing if you start running low.