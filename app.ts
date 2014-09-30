/// <reference path="references.d.ts" />
import express = require('express');
import childProcess = require('child_process');
import config = require('./config');
import commonTypes = require("./interfaces");

var app = express();
var spawn = childProcess.spawn;
var cfg = new config.Config();

function spawnAndLog(programName: string, programArgs: string[], onFinished: () => void) {
  var program = spawn(programName, programArgs);

  if (onFinished) {
    program.on('close', onFinished);
  }

  program.stdout.on('data', (data) => {
    console.log('INFO:  ' + data);
  });
  program.stderr.on('data', (error) => {
    console.error('ERROR: ' + error);
  })
}

function restartContainer(restartConfig: commonTypes.IAutoRestartContainer) {
  spawnAndLog('docker', ['pull', restartConfig.FullImageTagName], () => {
    spawnAndLog('docker', ['stop', restartConfig.ContainerName], () => {
      spawnAndLog('docker', ['rm', restartConfig.ContainerName], () => {
        spawnAndLog('docker', restartConfig.StartupContainerArguments, null);
      })
    })
  })
}

cfg.Hooks.forEach(hook => {
  app.get(hook.ListeningUrl, (req: express.Request, res: express.Response) => {
    if (hook.AutoRestartContainers) {
      hook.AutoRestartContainers.forEach(restartContainer);
    }

    if (hook.Callback) {
      var hookMessage: commonTypes.IDockerWebhookMessage = JSON.parse(req.body);
      hook.Callback(hookMessage);
    }

    res.send('Hello');
  })
})

app.listen(cfg.Port);

