module.exports = {
  apps: [
    {
      name: "http_test",
      script: "http_server.js",
      watch: ".",
      instances: 1,
      exec_mode: "fork",
      args: "--arg_1=val_1 -a2 2",
      env: {
        IS_DEBUG: true,
      },
      env_qa: {
        IS_QA: true,
      },
    },
    {
      name: "server",
      script: "server.ts",
      watch: ".",
      instances: 1,
      exec_mode: "fork",
      args: "--arg_1=val_1 -a2 2",
      env: {
        IS_DEBUG: true,
        PORT: 8080,
        HOST: "localhost",
      },
      env_qa: {
        IS_QA: true,
      },
    },
  ],
};
