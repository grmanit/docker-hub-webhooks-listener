docker-hub-webhooks-listener
============================

A simple ExpressJS-based script which can be used to listen to Docker Hub 
webhooks in order to perform actions, like pulling the new docker image, 
restarting a container or performing any other actions.

The script is written in [TypeScript](http://www.typescriptlang.org/) so you'll
need to install typescript (`npm install -g typescript`) in order to compile
it to JavaScript.

Configure the script by changing `config.ts` where you can already find a
sample configuration. Afterwards run 

    tsc --module commonjs app.ts
    
to compile it to JavaScript.
