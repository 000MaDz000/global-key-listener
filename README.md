# install
    npm install global-key-listener

### module
##
it's built on top of <b>node-global-key-listener</b> module
this module fixing the error occurs when packaging the application that built on <b>node-global-key-listener</b>
<br>
<br>
### how that fixed?
##
when the application packaged, the application can read the files that exists in the directory, like <b>WinKeyServer.exe</b>.
but it's still<b style="display:inline">cannot</b> spawn it !
<br>
<br>
this package contains function named <b>createGlobalKeyListener
</b>thats returning instance of <b>GlobalKeyboardListener</b> but with server path config option

when excute this module, it's create a new folder in <b>%appdata%</b> path, and named it with <b>temp</b>.
this folder will contains a copy of binaries that required in <b>node-global-key-listener</b> package, and when you use the exported function of <b>global-key-listener</b>, the function will pass the path of the server to the node-global-key-listener.

in this way, the error will be fixed when <b>node-global-key-listener</b> trying to spawn a program that exacly exists in the operating system.

<br>
<br>