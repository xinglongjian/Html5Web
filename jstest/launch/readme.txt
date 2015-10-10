chrome插件启动本地应用的步骤
1、安装chrome插件
2、将本目录下的manifest.json放到特定目录下，如c:\\native\manifest.json
3、修改注册表
   运行-> Regedit -> HKEY_LOCAL_MACHINE->Software->Google->Chrome->
   新建一个叫NativeMessagingHosts的项->新建一个叫com.my_company.my_application的项,  同时在这个项里默认值设置为我们Native Messaging 的 位置 C:\\Native\\manifest.json
4、新建html网页，按钮触发启动