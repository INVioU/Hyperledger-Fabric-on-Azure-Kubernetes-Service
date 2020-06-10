pipeline
{
    options
    {
        buildDiscarder(logRotator(numToKeepStr: '3'))
    }
    agent any
    environment 
    {  
        ORDERER_ORG_SUBSCRIPTION=eeca5b93-a4e3-4a31-8209-5b43a143f619
        ORDERER_ORG_RESOURCE_GROUP='orderers'
        ORDERER_ORG_NAME='Orderer'
        ORDERER_ADMIN_IDENTITY='admin.Orderer'
        CHANNEL_NAME='test'

        PEER_ORG_SUBSCRIPTION='eeca5b93-a4e3-4a31-8209-5b43a143f619'
        PEER_ORG_RESOURCE_GROUP='Org1'
        PEER_ORG_NAME='Org1'
        PEER_ADMIN_IDENTITY='admin.Org1'


        PEER_ORG2_SUBSCRIPTION='eeca5b93-a4e3-4a31-8209-5b43a143f619'
        PEER_ORG2_RESOURCE_GROUP='Org2'
        PEER_ORG2_NAME='Org2'
        PEER_ADMIN2_IDENTITY='admin.Org2'



        STORAGE_SUBSCRIPTION'=eeca5b93-a4e3-4a31-8209-5b43a143f619'
        STORAGE_RESOURCE_GROUP='inviou'
        STORAGE_ACCOUNT='inviou'
        STORAGE_LOCATION='ukSouth'
        STORAGE_FILE_SHARE='inviou'

        CC_NAME="inviou"
        CC_VERSION="1.0.74"
        CC_PATH="/Users/orlavee/Documents/INVIOU/financialAsset"
        CC_LANG="node"
        USER_IDENTITY="admin"

        USER_IDENTITY='admin.Org1'
        PRIVATE_COLLECTION="/Users/orlavee/Documents/INVIOU/financialAsset/collections_config_prod.json"
        USER_IDENTITY2='admin.Org2'
    }
    stages
    {   
        stage('Build preparations')
        {
            steps
            {
                script 
                {
                    slackSend (color: '#FFFF00', message: "STARTED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")

                    // calculate GIT lastest commit short-hash
                    gitCommitHash = sh(returnStdout: true, script: 'git rev-parse HEAD').trim()
                    BRANCH = env.BRANCH_NAME
                    echo "[*] current branch **** ****  ${BRANCH}"
                    
                    // calculate a sample version tag   
                    // VERSION = shortCommitHash
                    // set the build display name
                }
            }
        }
        stage('Build AzhlfTool ')
        {
            steps
            {
                script
                {
                    sh(returnStdout: false, script: "cd azhlfTool && npm install && npm run setup")

                }
            }
        }
        // stage('Docker push')
        // {
        //     steps
        //     {
        //         script
        //         {
        //             // login to ECR - for now it seems that that the ECR Jenkins plugin is not performing the login as expected. I hope it will in the future.
        //             sh("eval \$(aws ecr get-login --no-include-email | sed 's|https://||')")
        //             // Push the Docker image to ECR
        //             docker.withRegistry(ECRURL, ECRCRED)
        //             {
        //                 app.push("${BRANCH}_${VERSION}")
        //                 // docker.image(IMAGE).push() 
        //                 if (BRANCH == 'master') {
        //                     echo 'I only execute on the master branch'
        //                     //  docker.image("${PROJECT}:latest").push()
        //                      app.push("latest")
        //                 } else {
        //                     //  docker.image("${PROJECT}:${BRANCH}_latest").push()
        //                     app.push("${BRANCH}_latest")
        //                 }
                       
        //             }
        //         }
        //     }
        // }
        // stage('Kubernetes Deploy')
        // {
        //     steps
        //     {
        //         script
        //         {
        //             // rollout and wait for 60 sec - the length og time to deploy & start the new pod
                
        //             def refresh_date = "echo `date +'%s'`"
        //             refresh_date = sh(returnStdout: true, script:"${refresh_date}").trim()
        //             // sh(returnStdout: true, script:"/usr/bin/kubectl patch deployment inviou-invoice-api -n inviou --kubeconfig /configs/dev_config  -p  ${jsonString} ")
        //             // sh(returnStdout: true, script:'/usr/bin/kubectl rollout status deployment inviou-invoice-api -n inviou --kubeconfig /configs/dev_config')
        //             def jsonString = "\'{\"spec\":{\"progressDeadlineSeconds\":60,\"template\":{\"metadata\":{\"labels\":{\"date\":\"${refresh_date}\"}}}}}\'"

        //             if (BRANCH == 'master') {
        //                 sh(returnStdout: true, script:"/usr/bin/kubectl patch deployment inviou-invoice-api -n inviou --kubeconfig /configs/config  -p  ${jsonString} ")
        //                 sh(returnStdout: true, script:'/usr/bin/kubectl rollout status deployment inviou-invoice-api -n inviou --kubeconfig /configs/config')
        //              }else 
        //              {
        //                 sh(returnStdout: true, script:"/usr/bin/kubectl patch deployment inviou-invoice-api -n inviou --kubeconfig /configs/dev_config  -p  ${jsonString} ")
        //                 sh(returnStdout: true, script:'/usr/bin/kubectl rollout status deployment inviou-invoice-api -n inviou --kubeconfig /configs/dev_config')
        //              }
        //         }
        //     }   
        // }

        // stage('Test') 
        // {
        //     steps {
        //         sh 'npm test'
        //     }
        // }
    }


    post
    {
        always
        {
            script
            {
                try{
                    // sh(returnStdout: false, script: "docker rmi \$(docker images --filter \"dangling=true\" -q --no-trunc) -f") 
                }
                catch(Exception e)
                {

                }    
                
                 try{
                // make sure that the Docker image is removed
                    //  sh(returnStdout: false, script:"docker rmi \$(docker images |grep '${PROJECT}' ) -f")
                }catch (Exception e)
                {

                }
                
            }
        }
        success{
            slackSend (color: '#00FF00', message: "SUCCESSFUL: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
        }
        failure{
             echo "[*] current branch **** ****  ${BRANCH}"
                slackSend (color: '#FF0000', message: "FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")

                // script{ def recipients = emailextrecipients([ [$class: 'DevelopersRecipientProvider'] ])
                //     //  mail bcc: '', body: "<b>Example</b><br>\n\<br>Project: ${env.JOB_NAME} <br>Build Number: ${env.BUILD_NUMBER} <br> URL de build: ${env.BUILD_URL}", cc: '', charset: 'UTF-8', from: '', mimeType: 'text/html', replyTo: '', subject: "ERROR CI: Project name -> ${env.JOB_NAME}", to: "foo@foomail.com";
                //     emailext(to: "or.lavee@inviou.com;" + recipients,
                //         subject: "Build ${env.JOB_NAME} - ${currentBuild.displayName} ${currentBuild.result}",
                //         body: """Build ${currentBuild.result}
                //         ${env.JOB_URL} 
                //         """,  recipientProviders: [[$class: 'DevelopersRecipientProvider']] )
                // }
        }
    }
} 