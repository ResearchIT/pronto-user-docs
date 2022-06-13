# File Transfers

## How do I copy files to and from /work?

All file transfers to/from work to/from other sources like your laptop or LSS must be done through the machine:

```
prontodtn.las.iastate.edu
```

This diagram shows the larger capacity network connections on prontodtn, which explains why we require files to be transferred through prontodtn & not pronto:

![diagram of pronto and prontodtn networks](img/pronto_overview.png)

You can use prontodtn.las.iastate.edu for scp from your desktop or another location and you can also access LSS, mounted at /lss, on prontodtn.

To use scp, you will first need to ssh to prontodtn.las.iastate.edu. You may be prompted for your password twice. You should enter it both times to ensure that you get a Kerberos ticket. If you are not prompted for it a second time, run

```
kinit
```

After entering your password, you can disconnect from ssh. scp should then work.

You can also access your files via SMB share. Enter `\\prontodtn.las.iastate.edu` into your explorer window if you're on Windows, or `smb://prontodtn.las.iastate.edu` in the finder connect dialog if you're on MacOS. You will need to be on campus or connected to the VPN.

Note: The ISU VPN has limited bandwidth. If you have a large amount of data to transfer, or you want to transfer files without using the VPN, we recommend that you use [Globus](globus.md).

