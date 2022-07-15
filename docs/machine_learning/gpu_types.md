# Available GPU Types


| GPU Type | RAM | [Compute Capability](https://developer.nvidia.com/cuda-gpus) | Quantity |
|--------- | --- | ------------------ | -------- |
|a100_1g.5gb|5GB|sm_80|4|
|a100_2g.10gb|10GB|sm_80|12|
|a100_3g.20gb|20GB|sm_80|2|
|a100-pcie|40GB|sm_80|15|
|v100-pcie-16G|16GB|sm_70|3|
|v100-pcie-32G|32GB|sm_70|4|
|v100-sxm2-32G|32GB|sm_70|8|
|rtx_2080_Ti|11GB|sm_75|4|
|rtx_6000|24GB|sm_75|16|
|gtx_1080_ti|11GB|sm_61|8|

This list may not always be up to date. To get the most recent list, you can run this on pronto:

```
sinfo --partition=gpu -o %n,%G
```

## Use a Specific Type of GPU in a Batch Job

Change this line of your batch script:

```
#SBATCH --gres=gpu:1
```

to this:

```
#SBATCH --gres=gpu:rtx_2080_Ti:1
```

Replace `rtx_2080_Ti` with the actual type of GPU you want to use.
