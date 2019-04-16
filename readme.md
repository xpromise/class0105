# git管理仓库
## 1、本地仓库管理
* 建立忽略文件
  * .gitignore
  * 一定要在add之前
* git init
* git add ./*/-A
* git commit -m 'xxx'

## 2、远程仓库管理
* 新建远程仓库

## 3、本地和远程的使用
* 本地仓库和远程仓库关联
  * git remote add origin xxxx
* 本地仓库提交代码到远程仓库去
  * git push origin master
* 本地仓库更新远程仓库最新的代码
  * git pull origin master
* 本地仓库需要拉取远程仓库的dev分支内容
  * 注意：默认clone下来是master分支
  * git fetch origin dev1:dev2  拉取远程仓库dev1分支的内容到本地的dev2分支上

* git插件
  * octotree


