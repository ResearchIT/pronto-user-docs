# Connect to Pronto

## On Campus

SSH to pronto.las.iastate.edu and log in with your NetID and University password (same as email) as usual.  For example:

```
ssh jones@pronto.las.iastate.edu
```

## Off campus

You can use the VPN, but if you are going to transfer data off campus or if the VPN is congested you can ssh directly into prontodtn. You will have to set up public key authentication first by following the directions [here](ssh_keys.md). Note, you'll need to have set this up by logging in via the vpn and following the directions in that link. Once you've done that you will no longer need the vpn to access prontodtn and can disconnect the vpn.

Once you've connected to prontodtn:

```
ssh jones@prontodtn.las.iastate.edu
```

you can ssh to pronto from prontodtn

```
ssh jones@pronto.las.iastate.edu
```

Once you're on pronto, you'll need to use the slurm job scheduler to run a job (either interactively or in batch mode)