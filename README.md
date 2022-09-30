# SBDI 2.0 Deployment Platform

One might regard SBDI to consist primarily of three tiers:
1. Computation Platform (hardware)
2. Deployment Platform (KVM:s and Ansbile scripts) 
3. Applications, i.e. Docker Swarm Services
	
## (1) Computation Platform

The Computation Platform consists of; hardware, networking, processors, operating system, hypervisor etc. 
We are using [OpenStack](https://www.openstack.org/)  to administer this tier.

## (2) Deployment Platform
This current repository contains mainly the second tier of SBDI 2.0 deployment.
- This second tier is in essence a set of [KVM:s](https://en.wikipedia.org/wiki/Kernel-based_Virtual_Machine) 
- and a set of Ansible scripts that together provide the following services:

1. An automated setup of the deployment platform (by the Ansible scripts). 
    this approach makes it possible to set up identical deployments environments; production, staging and test.
3. Resource configuration. All resources allocated to the deployment platform, like type of machine, disk sizes etc is configured in one file.
4. Automatic deployment of the third tier of Docker Swarm Services (by Ansible scripts).
5. Running a set of Docker Swarm Services.
6. A framework for configuring, naming and grouping the SBDI Docker Swarm Services into convenient packages (referred to as “docker apps”).
7. Tools for maintenance and supervision of the docker Swarm Services (i.e. starting, stopping, overviewing, monitoring health and resources used etc).
8. Backup and restore of the entire deployment of Docker Swarm Services (data and configuration).
9. Off site backup safekeeping.
10. The possibility to take the backup of one deployment, i.e. Docker Swarm Services including data and configuration, and restoring it on another. This is typically useful when loading a staging environment with production data or moving the SBDI to another location altogether. 
11. Security and isolation, i.e. ensuring that the any external party may not intrude or access any data and services in an undesired way.
12. Redundancy that will ensure that if a virtual machine crashes ore a data volume is corrupted the system will run on with zero downtime. In case the computation platform consists of physical servers any one of those servers should be allowed to fail or be shut down without downtime.
13. Automated software upgrade of the Deployment platform without downtime.
14. Centralized logging for analysis of errors and intrusions.
15. Automated supervision of the platform and the Docker Swarm Services. The supervision system will issue alarms when problems or errors are detected. 


# About this repository

SBDI Deployment Platform automated maintenance and setup

## The ansible subdirectory

In the ansible subdirectory all configuration and scripts for seting up an SBDI 2.0 deployemnt are found.
Currently documention is ongoing.

## The microstack subdirectory

In the microstack directory we find a set of scripts for setting up a development Computaion Platform in microstack.



Note: This git repo contains other SBDI git repos as submodules

To clone; ```git clone --recurse-submodules git@github.com:biodiversitydata-se/automation.git```



