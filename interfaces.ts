export interface IHook {
  ListeningUrl: string;
  AutoRestartContainers?: IAutoRestartContainer[];
  Callback?: (message: IDockerWebhookMessage) => void;
}

export interface IAutoRestartContainer {
  FullImageTagName: string;
  ContainerName: string;
  StartupContainerArguments: string[];
}

export interface IDockerWebhookMessage {
  push_data: {
    pushed_at: number;
    images: any[];
    pusher: string;
  }
  callback_url: string;
  repository: {
    status: string;
    description: string;
    is_trusted: boolean;
    full_description: string;
    repo_url: string;
    owner: string;
    is_official: boolean;
    is_private: boolean;
    name: string;
    namespace: string;
    star_count: number;
    comment_count: number;
    date_created: number;
    dockerfile: string;
    repo_name: string;
  }
}