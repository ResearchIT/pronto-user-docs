# How to run R on pronto
R is a programming language that is tailored towards Statistical computing. This guide will briefly cover how to run and execute R scripts. For more information, you can find out more here: [https://www.r-project.org/](https://www.r-project.org/)

If you are looking for ISU's mirror link for browsing packages, you can find it here: [https://mirror.las.iastate.edu/CRAN/](https://mirror.las.iastate.edu/CRAN/)

## Start Here

The following sections will not work if run from the head node (pronto).

After you connect to pronto, follow the instructions in the [slurm basics](slurm_basics.md) guide to get an interactive session on a compute node.

Alternatively, you can run RStudio on Pronto using the [Interactive Desktop on Open OnDemand](ondemand/interactive_desktop.md).

## Copying your R scripts to pronto

You will need to be comfortable with using the scp command (Mac/Linux) or WinSCP (Windows) for transferring your R files.  

Please refer to [this documentation](file_transfers/scp.md) for examples on how to transfer files

Windows users can download WinSCP via Windows Software Center: [https://researchit.las.iastate.edu/how-use-software-center-windows](https://researchit.las.iastate.edu/how-use-software-center-windows)

(or [here](https://winscp.net/eng/index.php) if you are using a personal device)

SCP should be available via terminal on Mac/Linux.

You will need your R script(s) available and ready prior to transferring. (A simple "hello world" script will suffice)

## Loading R

### Recommended modules

These R modules generally work well:

```
module purge
module load gcc/10.2.0-zuvaafu
module load r/4.0.4-py3-4khjixy
```

or

```
module purge
module load r/3.6.3-py3-sxv6dw3
```

If these don't meet your needs, you could try the one of the others.

### See available versions

To see what versions of R are available, run:

```
module spider r
```

### Load an R module

If I wanted to load this version of R:

```
r/3.6.3-py3-sxv6dw3
```

I would run:

```
module load r/3.6.3-py3-sxv6dw3
```

Some versions may result in an error like the following:

```
Lmod has detected the following error:  These module(s) or extension(s) exist but cannot be loaded as requested: "r/4.0.4-py3-4khjixy"
   Try: "module spider r/4.0.4-py3-4khjixy" to see how to load the module(s).
```
If we follow the suggestion, we find we need to load another module before we load this R module.

```
module load gcc/10.2.0-zuvaafu
module load r/4.0.4-py3-4khjixy
```

Please note that packages installed using one R module may not work with other R modules.  Please be sure to use the same R module every time you install packages.


## Installing packages 

If your R task requires a package, you will need to install them first. 

By default, R installs in your **home** directory. Home directories on pronto have a quota of 10GB, so it's a good idea to install packages to your /work directory instead.

To ensure that packages are installed to your /work directory, run the following in your interactive session or batch script before starting R:

```
export R_LIBS_USER=/work/LAS/your-lab/yournetid/Rlibs
mkdir -p $R_LIBS_USER
```

Replace /work/LAS/your-lab/yournetid/Rlibs with the location you want to install the libraries.

Next, run the R intepreter by running:

```
R
```

Please note that packages installed using one R module may not work with other R modules.  Please be sure to use the same R module every time you install packages.

Once the interpreter is running, the command to install packages is:

```
install.packages('<somepackage>')
```

For more detailed and extensive documentation, please visit the following link: [https://www.rdocumentation.org/packages/utils/versions/3.6.2/topics/install.packages](https://www.rdocumentation.org/packages/utils/versions/3.6.2/topics/install.packages)

**Note:** You may prompted asking if you would like to create a personal library. Type in yes and soon you will be asked which CRAN mirror to use, please use the Iowa (IA) mirror. 

The package(s) you have chosen will take some time to install. 

If you wish to browse a complete list of available R packages, please visit: [https://mirror.las.iastate.edu/CRAN/](https://mirror.las.iastate.edu/CRAN/)

### Install packages from GitHub

To install packages from GitHub, you will need to install the devtools library

```
install.packages("devtools")
```

To install the package, run the following.

```
devtools::install_github("githubusername/githubreponame")
```

### Install packages in a script

To install packages in a script, you will need to specify both the location to save them and the repository to use.

```
install.packages("RColorBrewer", lib="/work/LAS/your-lab/yournetid/Rlibs", repos="https://mirror.las.iastate.edu/CRAN")
```

## Executing your R job

Now that we have our packages installed, we need to create a slurm job script (i.e. bash script). 

Navigate to your work directory and then use your favorite editor to write your script (i.e. vim/nano).

Name it "<FileName>.sh" when finished. 

You can use this as a sample template:

```bash 
#!/bin/bash

#SBATCH --nodes=1 # request one node
#SBATCH --cpus-per-task=1  # ask for 1 cpu
#SBATCH --mem=2G #  asks for 2 GB of RAM
#SBATCH --time=00:30:02 # ask that the job be allowed to run for 30 minutes and 2 seconds.

# everything below this line is optional, but are nice to have quality of life things
#SBATCH --output=job.%J.out # tell it to store the output console text to a file called job.<assigned job number>.out
#SBATCH --error=job.%J.err # tell it to store the error messages from the program (if it doesn't write them to normal console output) to a file called job.<assigned job number>.err

module load <VersionOfR>
cd /work/LAS/<YourLabDirectory>
Rscript <ScriptName>
```

(If you copy and paste this script, be aware that this may add hidden characters and may cause your script to error out)

You can read more information about job scripts under the"Single Node Script" section [here](slurm_basics.md). 

Here, we specify all the modules we want to load (the existing packages) along with our working directory prior to executing our script. You can add additional commands and tailor the script to however you wish.

Now run:

```bash
sbatch <FileName>.sh
```

You will get a .out and .err file, the .out contains the output of your scripts and the .err file contains an error log.

## Using the parallel library

If you are using the parallel library, you need to make some changes to your batch script and R script.

In your batch script, include the following

```
#SBATCH --nodes=1 # this must be 1
#SBATCH --cpus-per-task=4  # this should be the number of CPUs you want to use
```

Then in your R script, near the top, you need to include the following:

```
nCores <- as.integer(Sys.getenv("SLURM_CPUS_PER_TASK"))
print(paste("nCores",nCores))
myCluster <- parallel::makeCluster(nCores)
doParallel::registerDoParallel(myCluster)
```
This tells the parallel library to use the number of cores you requested in your batch job.

## Common Issues

### Errors when installing a package

You may get an error while trying to install some R packages. This happens especially often when trying to install packages that use C extensions. For example:

```
/usr/bin/ld: cannot find -llibexample
```

**Potential fix:** Load dependencies and try install again

Exit your R session by typing

```
quit() 
```

Now try searching for a module with a name similar to the error message.

```
module spider libexample
```

If this returns a result, load that module with

```
module load libexample
```

Then restart R and try installing your package again.

**Potential fix:** Pre-packaged R modules

Some R libraries with complicated requirements are pre-packaged on pronto. These packages are tied to specific R versions.

To see if an R package you need already exists on Pronto you can run: 

```
$ module purge
module avail
```

This will list all the available packages. You can navigate through the list to see which R packages are available. (You can go down the list by pressing the spacebar or 'D' key)

Alternatively, you can run `module spider <package_name>` to search for a specific package.

Please read the next section for some issues with this solution.

### Pre-packaged modules may not be compatible with each other

Be aware of the modules that you are loading and ensure the versions you are using are compatible. 

Say if I loaded both of the following modules: "war-formatr/1.5-py2-r3.4..." and "r-plyr/1.8.4-py2-r3.5..."

Note that **both** of these are running py2, but their versions of R are different, which is r3.4 and r3.5. Because of this, you may run into library conflicts and your job may error out.

The best way to combat this is by keeping the amount of modules used in your job to a minimum and keeping track of the modules you are loading. (A similar issue could happen if the packages contains py2 and py3)

### Avoid using different R modules

Using 'module spider' as discussed above, you may notice there are multiple modules available for some R versions. For example, for R 3.6.3, the follow modules exist:

```
        r/3.6.3-py3-jvakygf
        r/3.6.3-py3-oywcw22
        r/3.6.3-py3-sxv6dw3
```

If you use one install.packages to install modules in your home directory using any of these, those packages will be installed into the same folder in your home directory, and will work under that R module. However, if you later load a different R module, those packages you installed might not work when you try to use this with this R module. This happens frequently for packages with compiled C extensions. We recommend you use the load same R module each time you install packages and in all of your scripts.