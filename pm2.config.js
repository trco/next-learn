module.exports = {
    apps: [{
      name: "next-learn",
      script: "./node_modules/next/dist/bin/next",
      args: ["-p", "8080"],
      // exec_mode: "cluster",
      instances: process.env["API_INSTANCES"] || 1,
      autorestart: true,
      watch: false,
      vizion: false,
      output: "/dev/null",
      error: "/dev/null",
      log: "/var/log/api.log",
      merge_logs: true
    }]
  };
  