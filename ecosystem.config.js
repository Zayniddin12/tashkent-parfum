module.exports = {
  apps: [
    {
      name: 'Tashkent Parfume',
      port: 3045,
      exec_mode: 'cluster',
      instances: '1',
      script: './.output/server/index.mjs',
      args: 'preview',
    },
  ],
}
