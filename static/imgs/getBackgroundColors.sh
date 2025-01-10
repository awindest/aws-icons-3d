#!/bin/sh
arr=(
    "Analytics/Athena.svg"
"App-Integration/API-Gateway.svg"
"Blockchain/Managed-Blockchain.svg"
"Business-Applications/Alexa-For-Business.svg"
"Cloud-Financial-Management/Budgets.svg"
"Compute/App-Runner.svg"
"Containers/ECS-Anywhere.svg"
"Customer-Enablement/Activate.svg"
"Database/Aurora.svg"
"Developer-Tools/Cloud9.svg"
"End-User-Computing/AppStream.svg"
"Front-End-Web-Mobile/Amplify.svg"
"Games/GameKit.svg"
"General-Icons/MarketPlace_Dark.svg"
"Internet-of-Things/FreeRTOS.svg"
"Machine-Learning/CodeGuru.svg"
"Management-Governance/AppConfig.svg"
"Media-Services/Elastic-Transcoder.svg"
"Migration-Transfer/DataSync.svg"
"Networking-Content-Delivery/App-Mesh.svg"
"Quantum-Technologies/Braket.svg"
"Robotics/RoboMaker.svg"
"Satellite/Ground-Station.svg"
"Security-Identity-Compliance/Artifact.svg"
"Storage/Backup.svg"
"VR-AR/Sumerian.svg"
)

for file in "${arr[@]}"
#for file in $(find /Users/william/Documents/Projects/aws-icons-3d/static/imgs -type f);
do
    printf "%s\n" $file
    sed -n -e '/<linearGradient/,/<\/linearGradient>/ p' $file
done