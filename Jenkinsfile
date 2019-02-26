pipeline {
  agent any
  stages {
    stage('Initialize') {
      steps {
        initialize_function()
      }
    }
    stage('Test') {
      steps {
        test_function()
      }
    }
  }
  post {
    always {
      cleanup_function()
    }
  }
}

def initialize_function() {
  // PLEASE ONLY MODIFY VALUES IN THIS FUNCTION!!!!!
  env.TEST_DOCKER_IMAGE = 'node:6.9'
  env.APP_NAME = 'chat-component'
  env.YARN_VERSION = '0.22.0'
}

def test_function() {
  docker.image(env.TEST_DOCKER_IMAGE).inside('-u root') {
    sh 'node --version'
    sh 'curl -o- -L https://yarnpkg.com/install.sh | bash -s -- --version $YARN_VERSION'
    sh '$HOME/.yarn/bin/yarn --version'
  }
}

def cleanup_function() {
  sh 'sudo rm -rf $WORKSPACE/node_modules'
}
