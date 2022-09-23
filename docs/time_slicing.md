# Time Slicing

Most partitions on Pronto have time slicing enabled.

When a partition with time slicing has more jobs to run than resources available, jobs will take turns running in increments. 

Each job runs for 2 minutes, then pauses for 2 minutes to let another job run, and then runs for another 2 minutes. This process repeats until the job is done.

This improves responsiveness and utilization by allowing more jobs to begin running sooner. Shorter-running jobs no longer have to wait in a queue behind longer-running jobs. Instead they can be run "in parallel" with the longer-running jobs, which will allow them to start and finish quicker.

However, this does mean jobs sometimes take up to twice their requested time limit to finish running.