pipeline {
  agent any
  options {
    timeout(time: 1, unit: 'HOURS')
  }
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
    sh 'curl -o- -L https://yarnpkg.com/install.sh | bash -s -- --version $YARN_VERSION'
    sh 'cp -rT $WORKSPACE /code'
    sh 'cd /code && $HOME/.yarn/bin/yarn install && $HOME/.yarn/bin/yarn test'
  }
}

def cleanup_function() {
  sh 'sudo rm -rf $WORKSPACE/node_modules'
}
