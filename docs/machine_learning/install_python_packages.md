# How to install additional Python packages for use in the container

To install additional packages for use in the container, you will need to get an interactive session on a GPU node.

```
srun --time=01:00:00 --nodes=1 --cpus-per-task=4 --partition=gpu --gres=gpu:1 --pty /usr/bin/bash
```

Load the ml-gpu module

```
module load ml-gpu
```

Next, create a directory to install the packages to. This should be within your group's /work directory. Replace the path in the following command and run:

```
ml-gpu python -m venv --system-site-packages /work/LAS/your-lab/mlgpuvenv
```

Now you can install the additional packages with pip.

```
ml-gpu /work/LAS/your-lab/mlgpuvenv/bin/pip3 install somepackage
```

To confirm the packages are installed:

```
ml-gpu /work/LAS/your-lab/mlgpuvenv/bin/pip3 freeze | grep somepackage
```

Your package is now installed.

To use these additional packages in your batch scripts, load the ml-gpu module, then invoke python like this:

```
ml-gpu /work/LAS/your-lab/mlgpuvenv/bin/python your_script.py
```

Be sure to replace the path with the actual location you installed the packages.