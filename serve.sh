echo "> Ensure you have deployed the project once before before emulating locally"
cd ./functions
firebase functions:config:get > .runtimeconfig.json
firebase functions:shell
cd ..
firebase emulators:start
