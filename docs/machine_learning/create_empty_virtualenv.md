# How to create an empty virtual environment in the container

If you need to install a really old version of some package, or make modifications to a package, you can create a completely empty virtual environment in the container. This virtual environment will be isolated from the pre-installed packages and you will need to install everything yourself.

First, get an interactive session on a GPU node.

```
srun --time=01:00:00 --nodes=1 --cpus-per-task=4 --partition=gpu --gres=gpu:1 --pty /usr/bin/bash
```

Load the ml-gpu module

```
module load ml-gpu
```

Next, create a directory to install the packages to. This should be within your group's /work directory. Replace the path in the following command and run:

```
ml-gpu python -m venv /work/LAS/your-lab/emptymlgpuvenv
```

The difference between this command and the one given in previous sections is the removal of the --system-site-packages flag, which isolates the environment.

Now install any packages you need with pip.

```
ml-gpu /work/LAS/your-lab/emptymlgpuvenv/bin/pip3 install somepackage
```

To confirm the packages are installed:

```
ml-gpu /work/LAS/your-lab/emptymlgpuvenv/bin/pip3 freeze | grep somepackage
```

Your package is now installed.

To use this virtual environment in your batch scripts, load the ml-gpu module, then invoke python like this:

```
ml-gpu /work/LAS/your-lab/emptymlgpuvenv/bin/python your_script.py
```

Be sure to replace the path with the actual location you installed the packages.