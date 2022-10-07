# How to Port Forward with SSH

Port Forwarding (also known as SSH tunneling) allows a user to create a secure connection between a local machine and a remote machine. In this guide, we will discuss how to Port Forward with ssh. This will allow a **local machine** to connect to the **server's localhost**, remotely. 

Allocating a node
-----------------

First, ssh to pronto as you normally would.

```
ssh <YourNetID>@pronto.las.iastate.edu
```

Allocate a node using salloc: 

```
salloc --time=00:30:00 --nodes=1
```

If you are not familiar with allocating nodes or wish to specify other configurations, please refer to [this guide](../job_scheduler/index.md).

Connect to the node
-------------------

After allocating the node, you will need to SSH to it with a new terminal. Here you will need to specify the -L flag and port numbers you wish to forward. Below is what the command should look like:

```
ssh <YourNetID>@<NodeName>.las.iastate.edu -L <SpecifiedPortNumber>:127.0.0.1:<SpecifiedPortNumber>
```

If I was assigned speedy3 as a node and I wanted to forward port 9999, my ssh command would look like this:

```
ssh jones@speedy3.las.iastate.edu -L 9999:127.0.0.1:9999
```

When you ssh to the node, you will simply be placed on it and the port you specified will be available to you. If you wish to verify that everything was setup correctly, you may refer to the _Running Jupyter Notebook_ section in the [How to Run Jupyter Notebook guide](how-run-jupyter-notebook).

X Forwarding vs Port Forwarding
-------------------------------

X Forwarding redirects graphical components (like a Firefox window or other GUI). Port Forwarding simply redirects network traffic on certain ports.

If you need to redirect graphical components, please refer to the [X Forwarding guide](x_forwarding.md).