# How to upgrade existing Python packages

To upgrade existing packages in the container, you will need to get an interactive session on a GPU node.

```
srun --time=01:00:00 --nodes=1 --cpus-per-task=4 --partition=gpu --gres=gpu:1 --pty /usr/bin/bash
```

Load the version of the ml-gpu module you want to use. For example:

```
module load ml-gpu/20220603
```

Next, create a directory to install the upgraded packages to. This should be within your group's /work directory, and specific to the version of the ml-gpu container that you're using.

```
ml-gpu python -m venv --system-site-packages /work/LAS/your-lab/mlgpuvenv-20220603
```

Now you can upgrade the packages with pip.

```
ml-gpu /work/LAS/your-lab/mlgpuvenv-20220603/bin/pip3 install --upgrade somepackage
```

To confirm the packages are upgraded:

```
ml-gpu /work/LAS/your-lab/mlgpuvenv-20220603/bin/pip3 freeze | grep somepackage
```

Your upgraded package is now installed.

To use these upgraded packages in your batch scripts, load the ml-gpu module, then invoke python like this:

```
ml-gpu /work/LAS/your-lab/mlgpuvenv-20220603/bin/python your_script.py
```

Be sure to replace the path with the actual location you installed the packages.