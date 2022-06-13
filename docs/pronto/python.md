# Python Virtual Environments

Python has a built-in virtual environment, which contains a particular version of python with additional packages/modules that can be activated/deactivated at will. This guide will cover the basics on how to create an environment and install packages on it.

Create a New Virtual Environment
--------------------------------

This should be done from an interactive session on a compute node.

To get an interactive session on a compute node, run the following:

```
srun --time=01:00:00 --nodes=1 --cpus-per-task=8 --partition=interactive --pty /usr/bin/bash
```

### Set Up

To setup a python virtual environment, you will need to load your specific version of python. To find a list of available versions, you can run:

```
$ module spider python
```

Next, I would have to see if there are any prerequesite modules for python.

```
module spider <version-of-python-here>
```

For example:

```
module spider python/3.8.8-ucekvff
```

The output of this says that the python/3.8.8-ucekvff module requires gcc/10.2.0-zuvaafu . So we must load it first before we can load the python module. 

For example:

```
$ module load gcc/10.2.0-zuvaafu
$ module load python/3.8.8-ucekvff
```

Before proceeding, ensure that you are in your **/work** directory and not your **/home** directory. 

After running your module, create your virtual environment by typing in:

```
$ python -m venv <name-of-environment>
```

This will create a directory that contains the environment.

### Activate the Environment

Activate the environment by running:

```
$ source <name-of-environment>/bin/activate
```

Your terminal will now look like this:

```
(<name-of-environment>) [user@bigram2 jones-lab]$ 
```

### Install packages

To search for certain packages, you can type in:

```
$ pip search <package-name>
```

If you wish to install a certain package, you can use:

```
$ pip install <package-name>
```

If you want a certain version of said package, you can give the package name followed by "==" with the version number:

```
$ pip install <package-name>==1.0.0
```

### Deactivate the Environment

To get out of the environment simply type:

```
$ deactivate
```

(This will **not** disconnect you from pronto/the node you are currently on)

Use a Virtual Environment in a Batch Job
----------------------------------------

```
# Load the python module. This should be the same version that was used to create the environment
module load gcc/10.2.0-zuvaafu
module load python/3.8.8-ucekvff
# Activate the environment as before. Replace /work/LAS/jones-lab/<name-of-environment> with the actual path to the environment.
source /work/LAS/jones-lab/<name-of-environment>/bin/activate
# Run your script. It will have access to all of the modules you installed in the environment.
python my_script.py
```

More Information
----------------

If you plan on creating more environments, please ensure that you are creating them in **/work** instead of **/home**.

For more commands and further documentation, please visit: [https://docs.python.org/3/tutorial/venv.html](https://docs.python.org/3/tutorial/venv.html)