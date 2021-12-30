---
sidebar_position: 2
---

# System Architecture

## Overview

Initially, the software will be pretty simple.

It has a NodeJS server running behind a NGNIX load balancer.
The server has access to a relational(PostgreSQL) database and also a in-memory (Redis) database.

![Architectural Diagram](/img/arch-diagram.png)

## Deep dive

### Load Balancer

This is an NGINX webserver. It has two main goals:

1. Serve as a reverse proxy, to make everything HTTPs compliant.
2. Serve as a load balancer to distribute the requests between all the server nodes.

### Server

This is a REST API written in NodeJS.
Here we have all the business logic of our software.
You can see more details of it at: HERE.

### PostgreSQL

We'll use a PostgreSQL database used to persist everything related to the business logic.

### Redis

We use Redis to serve as cache database. It's particularly helpful for performance and also for some features like authentication where we have a whitelist of JWTs.

### S3

This is our blob storage.
We'll use Amazon S3 to store static assets such as:

- Pictures
- Videos
- Documents
