import aws_cdk as core
import aws_cdk.assertions as assertions

from cdk_docker_lambda.cdk_docker_lambda_stack import CdkDockerLambdaStack

# example tests. To run these tests, uncomment this file along with the example
# resource in cdk_docker_lambda/cdk_docker_lambda_stack.py
def test_sqs_queue_created():
    app = core.App()
    stack = CdkDockerLambdaStack(app, "cdk-docker-lambda")
    template = assertions.Template.from_stack(stack)

#     template.has_resource_properties("AWS::SQS::Queue", {
#         "VisibilityTimeout": 300
#     })
