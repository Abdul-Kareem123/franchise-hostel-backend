pipeline {
    agent any

    environment {
        AWS_ACCOUNT_ID = credentials('aws-account-id')
        REGION = "ap-south-1"
        REGISTRY = "${AWS_ACCOUNT_ID}.dkr.ecr.${REGION}.amazonaws.com/franchise_backend"
        IMAGE_TAG = "1.0.0-${BUILD_NUMBER}"
    }

    stages {
        stage('Git Pull') {
            steps {
                cleanWs()
                checkout scm // This uses Jenkins' built-in SCM integration to checkout the code
                git credentialsId: 'pixclick-github', branch: 'main', url: " https://github.com/Pixaliveworks/franchise_backend.git"

                echo "Debug: Completed git pull stage"
            }
        }

        stage('Build and Test') {
            steps {
                sh 'npm install --force'
                sh 'npm install pm2 axios'
            }
        }

        stage('Docker Build') {
            steps {
                script {
                    sh 'docker build -t franchise_backend:1.0.0 .'
                }
            }
        }

        stage('Image Push to ECR') {
            steps {
                script {
                    withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'aws-credentials']]) {
                        sh """
                            aws ecr get-login-password --region ${REGION} | docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${REGION}.amazonaws.com
                            docker tag franchise_backend:1.0.0 ${REGISTRY}:${IMAGE_TAG}
                            docker push ${REGISTRY}:${IMAGE_TAG}
                        """
                    }
                }
            }
        }

        stage("Update the Deployment Tags") {
            steps {
                sh '''
                   cd argo_cd
                   cd k8-deployment
                   cat deployment.yaml
                   sed -i "s|franchise_backend:.*|franchise_backend:${IMAGE_TAG}|g" deployment.yaml
                   cat deployment.yaml
                   sed -i '29s/$/"/' deployment.yaml
                   cat deployment.yaml
                '''
            }
        }

        stage("Push the changed deployment file to Git") {
            steps {
                sh """
                   cd argo_cd
                   cd k8-deployment
                   git config --global user.name "kabeer"
                   git config --global user.email "kabeer@pixalive.me"
                   git add deployment.yaml
                   git commit -m "Updated Deployment Manifest"
                """
                withCredentials([gitUsernamePassword(credentialsId: 'pixclick-github', gitToolName: 'Default')]) {
                    sh "git push https://github.com/Pixaliveworks/franchise_backend.git"
                }
            }
        }
    }

    post {
        success {
            mail bcc: '', body: "Job success - ${JOB_BASE_NAME}\nJenkins URL - ${JOB_URL}", cc: 'rajasekar@pixalive.me,mohanraj@pixalive.me,prashanth@pixalive.me,imraz@pixalive.me,haripriyan@pixalive.me', from: 'kiran@pixalive.me', replyTo: '', subject: "The Pipeline success - ${JOB_NAME}", to: 'kabeer@pixalive.me,kiran@pixalive.me'
        }
        failure {
            mail bcc: '', body: "Job Failed - ${JOB_BASE_NAME}\nJenkins URL - ${JOB_URL}", cc: 'rajasekar@pixalive.me,mohanraj@pixalive.me,prashanth@pixalive.me,imraz@pixalive.me,haripriyan@pixalive.me', from: 'kiran@pixalive.me', replyTo: '', subject: "The Pipeline failed - ${JOB_NAME}", to: 'kabeer@pixalive.me,kiran@pixalive.me'
        }
    }
}

