# Using screen to Protect Your Process

Screen: a Good Habit
--------------------

[Screen is a deprecated utility. Please consider using tmux instead.](tmux.md)

When you connect to a remote server via ssh in order to do some work on it, what should be your first command?

It should be to start a screen session:

```
screen
```

This opens a new screen session and changes your connection from being vulnerable to network failure to being protected against it.

Detaching from Your Screen
--------------------------

After starting screen, you can start your long-running job. Then, leave your screen session running with your job running inside it by detaching from your screen session. Screen commands start with control-a and then another letter. Control-a and then the "d" key detaches:

Ctrl-a d
```
screen  
[detached from 13335.pts-9.biocrunch]
```
Now you can close your ssh session (or the network can go down) and go home.

Reattaching to Your Screen Session
----------------------------------

Log back into the server via ssh. Reattach to your screen session by typing

```
screen -r
```

Poof! You are right back inside your screen session.

Scrolling in your Screen Session
--------------------------------

If you try to scroll back in your session, you'll notice it doesn't work.  First, use ctrl+a, escape - you can then scroll in your session. Use the escape key to return back to the command prompt

Changing up your Screen configuration
-------------------------------------

There are quite a few changes that you can make to the screen configuration. The configuration file is /home/<username>/.screenrc

Here is an example .screenrc configuration file similar to the one that I use on a regular basis. Just copy the text and paste it into your favorite editor. 

```
# example .screenrc
 

# Turn off the startup message
startup_message off

# Always use a logon shell
shell -$SHELL

# Never turn this off!!! If you close your session, it will autodetach and not close.
autodetach on

# allows you to keep what was displayed on your terminal when exiting things like man, less rather than having your terminal cleared
altscreen on

# Cleaner shell title
shelltitle ''

# Show sessions in utmp
deflogin on

# We always want to use bash, but this could be changed if you want...
defshell bash

# Enable scrollback to hold 102k lines
defscrollback 102400

# Set default to UTF-8
defutf8 on

# Uncomment this to see fun messages on the screen rather than the default screen messages.
# nethack on

# Bells and Whistles. This will make the bar at the bottom flash when something happens.
vbell on
vbell_msg "   !! Something interesting has happened !!   "
activity "%c activity -> %n%f %t"
bell "%c bell -> %n%f %t^G"

# Deal with flaky ssh connections better
# defnonblock on

# Message wait time
# msgwait 3

# Password protect shell
password WVrhdlfqa1N66

# TermCap
termcapinfo xterm*|rxvt*|kterm*|Eterm* hs:ts=\E]0;:fs=\007:ds=\E]0;\007
termcapinfo xterm*|linux*|rvxt*|Eterm* OP

# Bind some useful keys for changing windows.
# This lets you select the screen to the left and right of the current selection by
# pressing CTRL and the left arrow key.
bindkey "[[1;5D" prev  # change window with ctrl-left
bindkey "[[1;5C" next  # change window with ctrl-right

# Hard status strings. This makes the bottom bar show a "tab list" of available sessions
hardstatus on
hardstatus alwayslastline
hardstatus alwayslastline "%{= kG}[ %{W}%H%{= kG} ]%{=kW}[%{= ck}%-w%{= Bw}%n %t%{-}%+w %-=%{=kW}]%{= kG}[ %{r}%l%{w} ]%{w}[%{r} %d/%m/%y %c.%s %{w}]%{w}"
sorendition "+b kG"

# Set control key to `
# I don't like having the default control set to CTRL-a, so I set it to the "backtick" key
escape ``

# Default Screen.
# Set up a shell on screen 1 and use bash.
screen -t shell 1 bash
select 1
```

Other Reading
-------------

Here's a great [tutorial on screen](https://www.rackaid.com/blog/linux-screen-tutorial-and-how-to/).