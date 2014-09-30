/// <reference path="references.d.ts" />
import commonTypes = require("./interfaces");

export class Config {
  public Port: number = 1337;
  public Host: string = '0.0.0.0';
  public Hooks: commonTypes.IHook[] = [];

  constructor() {
    this.Hooks.push({
      ListeningUrl: '/USER/IMAGE',
      AutoRestartContainers: [
        {
          FullImageTagName: 'USER/IMAGE:latest',
          ContainerName: 'IMAGE_LATEST',
          StartupContainerArguments: [
            'run', '-t', '-d', '-p', '8080:80', '--name="IMAGE_LATEST"',
            '--link', 'OTHER_IMAGE:OTHER_IMAGE', 'USER/IMAGE:latest'
          ]
        },
        {
          FullImageTagName: 'USER/IMAGE:TAG1',
          ContainerName: 'IMAGE_TAG1',
          StartupContainerArguments: [
            'run', '-t', '-d', '-p', '8081:80', '--name="IMAGE_TAG1"',
            '--link', 'OTHER_IMAGE:OTHER_IMAGE', 'USER/IMAGE:TAG1'
          ]
         }
      ]
    });
  }
}

