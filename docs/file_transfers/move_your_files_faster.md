When working with large datasets, you often need to move files around between servers, storage systems, or between institutions.  Below, we describe common problems people run into when moving data around and we give some recommendations on how to move your data faster.

### I'm in a hurry:

*   Use a server that already has both source & destination mounted
    *   /work and /lss are mounted on all ResearchIT servers, as well as the cluster data transfer nodes (prontodtn, condodtn, cyencedtn, etc.)
    *   Use rsync between the two:
            ```
            $ rsync --progress /work/LAS/jones-lab/myproject /lss/research/jones-lab/
            ```
*   Avoid using desktop transfer tools (e.g. winscp, filezilla, cyberduck) unless that's the only option
*   If you have to move data across the network, use the fastest network available
*   If you're in doubt at all, email [researchit@iastate.edu](mailto:researchit@iastate.edu) before starting your transfer

### In depth explanation:

**Transfers from one system to another within the University:**

A brief networking explanation:

*   Our servers are connected to each other, and to the scratch /work storage at 100Gbps
*   Our servers are connected to /lss at 10Gbps
*   Your desktop/laptop is connected to the rest of the University network at 1Gbps at best (likely that 1Gbps connection is shared with your whole building)

The most common mistake we see is when people unnecessarily put their own computer in the loop during the transfer, which slows it down dramatically (10-100 times slower).

Example:

You open up CyberDuck on your Mac, and connect to Speedy, and you have LSS connected directly on your Mac and you start a copy of your 1TB file from /work/LAS/jones-lab/myproject to lss/jones-lab on your Mac.

The path the data takes during the transfer is now:

```
Speedy===10Gbps===>Leaving Durham---1Gbps--->Your Building...0.5Gbps...>Your laptop on WIFI...>Your Building...>Durham..>LSS
```

Once you bottleneck the transfer going across your computer, it won't go any faster than the slowest point in the chain.  This transfer may take roughly 5 hours (if it doesn't timeout).

Your labmate instead, logs into speedy, notices that both /work and /lss are already mounted and uses rsync to copy their 1TB file between the two.

Their data path looks like this:

```
Speedy===10Gbps===>LSS
```

Your lab member's transfer will be done in closer to 15 minutes

**Transfers to/from another institution:**

If you have data you need to get to/from another institution, keep the same principles in mind and try to route the transfer over the best path using the fastest network available. 

For example, say you have some data sitting on Pylon storage at Xsede. We recommend using a tool like [Globus](globus.md) to move your final results back to [LSS](https://researchit.las.iastate.edu/large-scale-storage-lss) for long-term storage.  When you initiate your transfer, be sure to pick an endpoint like Condodtn (which has a fast network connection to LSS), rather than routing the globus traffic through your desktop connection to LSS.