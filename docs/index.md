# Pronto

Pronto is a compute cluster that uses Slurm workload manager. It is available through SSH or from your web browser using [Open OnDemand](ondemand/index.md).

We have a mix of [server types](hardware.md) for both single and multi-core jobs. We have several GPU servers with NVIDIA 1080Ti, V100, and A100 cards for molecular dynamics, deep learning, etc. We also have a many-core cluster built on Intel Knights Landing architecture that's great for multi-threaded work like Monte-Carlo simulations.

## How do I register to use pronto?

If you are a new member in a lab that already uses pronto, please ask your advisor/PI to visit our [Self-Service Portal](https://diy.las.iastate.edu/) and add you to their lab list. The site is only accessible from on-campus or through use of the VPN service.

If you are a PI and would like access to any of our resources, please email researchit@iastate.edu.  Our access is all handled via group membership in a -lab group.  If your netid is jones, then we will create a group called 'jones-lab'. This group will be granted access to a correspondingly named LSS folder, working folder, and will be used for server/cluster access.

### How do I connect to pronto ?

SSH to pronto.las.iastate.edu and log in with your NetID and University password (same as email) as usual.  For example:

```
ssh jones@pronto.las.iastate.edu
```

### How do I connect to pronto from off campus?

You can use the VPN, but if you are going to transfer data off campus or if the VPN is congested you can ssh directly into prontodtn. You will have to set up public key authentication first by following the directions at [https://researchit.las.iastate.edu/how-generate-ssh-keys](https://researchit.las.iastate.edu/how-generate-ssh-keys). Note, you'll need to have set this up by logging in via the vpn and following the directions in that link. Once you've done that you will no longer need the vpn to access prontodtn and can disconnect the vpn.

Once you've connected to prontodtn:

```
ssh jones@prontodtn.las.iastate.edu
```

you can ssh to pronto from prontodtn

```
ssh jones@pronto.las.iastate.edu
```

Once you're on pronto, you'll need to use the slurm job scheduler to run a job (either interactively or in batch mode)