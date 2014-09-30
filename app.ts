/// <reference path="references.d.ts" />
import express = require('express');
import childProcess = require('child_process');
import config = require('./config');
import commonTypes = require("./interfaces");

var app = express();
var spawn = childProcess.spawn;
var cfg = new config.Config();

function restartContainer(restartConfig: commonTypes.IAutoRestartContainer) {
  spawn('docker', ['pull', restartConfig.FullImageTagName]).on('close', () => {
    spawn('docker', ['stop', restartConfig.ContainerName]).on('close', () => {
      spawn('docker', ['rm', restartConfig.ContainerName]).on('close', () => {
        spawn('docker', restartConfig.StartupContainerArguments);
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
  })
})

app.listen(cfg.Port);

