# What is Kaboos
Release train management. This was my very first MEANStack application, be gentle. I attempted to still use it as a relational database. Oh me.

# What do I need to use this?
1) Node
2) Docker + MongoDB
3) Robomongo (optional)

# What should I do to get docker mongodb running?
```
docker run --name kaboos-mongodb -p 27017:27017 -d mongo
```

# How do I get this up and running?
1) Run `run_npm.bat`
2) Run `run_gulp.bat`
4) Run `run_node.bat`
5) Visit: http://localhost:8080

# How do I log in?
The application should seed itself on first startup.  Feel free to login using `admin@epixelation.com` and `P@ssw0rd1`. Should you need, you can always register.

# How do I re-seed?
Simply go into mongodb and drop the kaboos collection.