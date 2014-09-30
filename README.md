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

To Run the script
================

1. Install typescript: `npm install -g typescript`
2. Update `config.ts` with your personal configuration of webhooks
3. Compile the typescript files: `tsc --module commonjs app.ts`
4. Install missing dependencies: `npm install`
5. Run it: `node .`
