# 指定node镜像
FROM node:alpine
# 指定制作人（镜像创建者）
MAINTAINER hap

# 将根目录下的文件都copy到container（运行此镜像的容器）文件系统的app文件夹下
ADD . /app/
# cd到app文件夹下
WORKDIR /app

# 安装项目依赖包 --productions https://docs.npmjs.com/cli/install
# RUN npm install --registry=https://registry.npm.taobao.org

RUN yarn install

# 配置环境变量
ENV HOST 0.0.0.0
ENV PORT 4000

# 容器对外暴露的端口号
EXPOSE 4000

# 容器启动时执行的命令，类似npm run start, node app.js  --no-daemon
CMD [ "yarn", "start" ]