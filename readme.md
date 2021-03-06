### Matrix

This is a blogging engine that I wrote for personal use. I designed the application with a few things in mind:

##### Simple, no-frills dashboard

I don't like static site generators because the interface is the command line. I've also used Wordpress but found it to be too complex and too slow. The Matrix admin dashboard is simple as hell. Upon logging in, you see your list of files. If you're looking for a particular set of files, you can either filter the list or search for a specific file. Common operations like creating a new file or updating an existing file are also straightforward and fast.

##### Powerful editor

I really like the Stackoverflow editor and I'm not ashamed to say that I set out to copy it. I don't like writing markdown, so using something like vim is a pain in the ass. With the Matrix editor, I can set custom key bindings that format my content with markdown. What's more, I can even preview the html right beside my editor so I know how it'll appear on my blog.

##### Relational

Language in thought is abstract. You think in terms of symbols and their relationships with each other. Since writing is an extension of my thought, my writing tool should also allow me to represent abstractions. I should be able to relate or connect content with other content as well as group or generalize them by their similarities. Matrix allows me to do both easily using fast-(hyper)linking (creates a hyperlink in a file to another file with a short key combo) and file labeling (tagging).

##### Stack

* Yeoman
* Require
* Backbone
* Node
