# Interactive Session with a GPU

To start an interactive session on a GPU node, run this from the pronto head node:

```
srun --time=01:00:00 --nodes=1 --cpus-per-task=1 --mem=8G --partition=gpu --gres=gpu:1 --pty /usr/bin/bash
```

Then run the following to start python within the ml-gpu container:

```
module load ml-gpu/20220603
ml-gpu python3
```