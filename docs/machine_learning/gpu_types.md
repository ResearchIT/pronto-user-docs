# Available GPU Types

{{ gpu_types_table() }}

This list may not always be up to date. To get the most recent list, you can run this on pronto:

```
sinfo --partition=gpu -o %n,%G
```

## Use a Specific Type in a Batch Job

Change this line of your batch script:

```
#SBATCH --gres=gpu:1
```

to this:

```
#SBATCH --gres=gpu:rtx_2080_Ti:1
```

Replace `rtx_2080_Ti` with the actual type of GPU you want to use.
