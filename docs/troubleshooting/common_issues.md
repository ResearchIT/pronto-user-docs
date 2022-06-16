# Common Issues

## What is an 'illegal instruction', and how do I fix it?

In most cases, adding `--constraint=AVX2` to your slurm job command (i.e. sbatch/srun) will resolve the issue.

The problem usually occurs when a program or library is compiled on a newer CPU but executed on an older one. (Newer CPUs are built with new instructions. When code is compiled, the resulting executable may reference the new instructions. If the executable is then run on an old CPU without the necessary instructions, you'll be told an 'illegal' instruction was encountered.)

## I encounter "Program not found" when trying to use X. What's going wrong?

First, make sure you are not on the **head** node. You are on the head node if your terminal says

```
[YourNetID@pronto ~]$
```

or if the output of the 'hostname' command is 'pronto.las.iastate.edu'. If you are on the **head** node, you'll want to allocate a **compute** node. Please refer to the [slurm basics guide](../slurm_basics.md). 

Second, if you are on a **compute** node and getting the error, make sure you've [loaded the module](../spack_modules.md) you need.

Third, try using bash's tab-based auto-completion. Type part of the command, then press tab to complete the rest. (Press tab twice to see a list if there are multiple matches.)

Finally, try looking in the $PATH folders for the command under a slightly different name. Sometimes commands get a prefix or capitalization. (Linux is case-sensitive.)

## How do I get past the "Permission denied" errors?

If you are authorized for a file/folder and got a 'Permission denied' message, there is a good chance your kerberos ticket has expired. Check the kerberos expiration by running:

```
klist
```

This should list all the credentials that you have. If you kerberos ticket has expired, you will need to run:

```
kinit
```

After supplying your password, klist should show a new ticket that won't expire for several hours.

## My connection errors out with a "packet\_write\_wait: Connection to 2610:130:108:81::a5a:422 port 22: Broken pipe" message. Why is this happening and is there a fix?

Assuming your network connection is stable, the most likely cause of this error is feature of IPv6 called the 'Privacy Extension' (RFC 4941). The privacy extension results in your computer getting a temporary address that changes after some fixed time interval. Whenever the address changes, you will get disconnected from your SSH session.

You can work around this issue by either [disabling IPv6 Privacy](how-disable-ipv6-privacy-mode) (recommended) or [forcing IPv4 connections](how-force-ipv4-connections).

## I get an error 'No space left on device' while trying to copy files.

If you are trying to copy files to LSS, this likely means your LSS share is full. Please see [this guide](https://researchit.las.iastate.edu/guides/lss/usage/) to check your usage or [this guide](https://researchit.las.iastate.edu/guides/lss/usage/) to purchase more space.

If you are running some software, this likely means it is trying to write to your home directory, your home directory is full. Home directories on pronto are limited to 10GB. Files used for jobs should be stored in your /work directory.

## Other issues

For other issues, please email [researchit@iastate.edu](mailto:researchit@iastate.edu)