pipeline
{
    options
    {
        buildDiscarder(logRotator(numToKeepStr: '3'))
    }
    agent any
    environment 
    {
        
        // VERSION = 'latest'
        // PROJECT = 'inviou-api'
        // IMAGE = 'inviou-api:latest'
        // ECRURL = 'https://724122376450.dkr.ecr.eu-west-2.amazonaws.com'
        // ECRCRED = 'ecr:eu-west-2:8f2fb7ca-4abb-472c-8f9f-942335d74de1'
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
                    // BRANCH = env.BRANCH_NAME
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